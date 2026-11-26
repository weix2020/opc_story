/* Pages Function · /api/count
   GET  ?slugs=a,b,c              → 批量读取全站计数 { slug: {view, like, share} }
   POST {slug, kind, vid, delta}  → 去重后自增（like 传 delta:-1 为取消）
   数据表见根目录 schema.sql，D1 绑定名 DB */

const KINDS = ['view', 'like', 'share'];
const SLUG = /^[a-z0-9-]{1,64}$/;
const VID = /^[A-Za-z0-9-]{8,64}$/;

const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});

const utcDay = () => new Date().toISOString().slice(0, 10);

function shape(rows, slugs) {
  const data = Object.fromEntries(slugs.map(s => [s, { view: 0, like: 0, share: 0 }]));
  for (const r of rows) if (data[r.slug]) data[r.slug][r.kind] = r.n;
  return data;
}

export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'D1 binding DB missing' }, 503);

  const raw = new URL(request.url).searchParams.get('slugs') || '';
  const slugs = [...new Set(raw.split(','))].filter(s => SLUG.test(s)).slice(0, 200);
  if (!slugs.length) return json({ ok: true, data: {} });

  /* D1 单条 SQL 的绑定变量上限为 100，超出会抛异常 → Worker 500（error 1101）。
     实测 100 条正常、110 条即 500，故按 50 一批分片，留出余量。 */
  const CHUNK = 50;
  const rows = [];
  for (let i = 0; i < slugs.length; i += CHUNK) {
    const part = slugs.slice(i, i + CHUNK);
    const { results } = await env.DB.prepare(
      `SELECT slug, kind, n FROM counter WHERE slug IN (${part.map(() => '?').join(',')})`
    ).bind(...part).all();
    rows.push(...(results || []));
  }

  return json({ ok: true, data: shape(rows, slugs) });
}

export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'D1 binding DB missing' }, 503);

  let body;
  try { body = await request.json(); } catch { return json({ ok: false, error: 'invalid json' }, 400); }

  const slug = String(body.slug || '');
  const kind = String(body.kind || '');
  const vid = String(body.vid || '');
  const delta = body.delta === -1 ? -1 : 1;
  if (!SLUG.test(slug) || !KINDS.includes(kind) || !VID.test(vid)) {
    return json({ ok: false, error: 'invalid params' }, 400);
  }

  if (kind === 'like' && delta === -1) {
    // 取消点赞：删掉这条唯一记录，计数减一（不为负）
    const del = await env.DB.prepare(
      'DELETE FROM dedupe WHERE slug = ? AND kind = ? AND vid = ? AND day = ?'
    ).bind(slug, kind, vid, '').run();
    if (del.meta.changes) {
      await env.DB.prepare(
        'UPDATE counter SET n = max(n - 1, 0) WHERE slug = ? AND kind = ?'
      ).bind(slug, kind).run();
    }
  } else {
    // like 终身只记一次（day 固定空串）；view / share 每天只记一次
    const day = kind === 'like' ? '' : utcDay();
    const ins = await env.DB.prepare(
      'INSERT OR IGNORE INTO dedupe (slug, kind, vid, day) VALUES (?, ?, ?, ?)'
    ).bind(slug, kind, vid, day).run();
    if (ins.meta.changes) {
      await env.DB.prepare(
        'INSERT INTO counter (slug, kind, n) VALUES (?, ?, 1) ON CONFLICT(slug, kind) DO UPDATE SET n = n + 1'
      ).bind(slug, kind).run();
    }
  }

  const { results } = await env.DB.prepare('SELECT slug, kind, n FROM counter WHERE slug = ?').bind(slug).all();
  return json({ ok: true, data: shape(results || [], [slug])[slug] });
}
