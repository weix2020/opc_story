#!/usr/bin/env node
/**
 * 信源台账（source ledger）生成器
 *
 * 从 100 篇深度报告的「资料来源」区块解析每条信源，记录：
 *   - 编号、核验等级、评级、类型、标题、发布方、日期、URL、域名
 *   - 该信源在正文中支撑的具体句子（claims）
 *   - 可选的 Wayback 存档地址
 *
 * 输出：site/data/sources.json
 *
 * 用法：
 *   node scripts/build-source-ledger.js               生成台账（不联网）
 *   node scripts/build-source-ledger.js --archive     额外查询 Wayback 存档（带本地缓存）
 *   node scripts/build-source-ledger.js --archive --limit=50
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CASES_FILE = path.join(ROOT, 'site/data/cases.json');
const REPORT_DIR = path.join(ROOT, 'site/report');
const OUT_FILE = path.join(ROOT, 'site/data/sources.json');
const CACHE_FILE = path.join(ROOT, 'archive/research/wayback-cache.json');

const args = process.argv.slice(2);
const DO_ARCHIVE = args.includes('--archive');
const LIMIT_ARG = args.find(function (a) { return a.startsWith('--limit='); });
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split('=')[1], 10) : Infinity;

function stripTags(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractDate(text) {
  const s = String(text || '');
  let m = s.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[0];
  m = s.match(/(\d{4})-(\d{2})/);
  if (m) return m[1] + '-' + m[2];
  m = s.match(/(\d{4})/);
  return m ? m[1] : null;
}

function domainOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return null; }
}

/** 解析单个 <li id="ref-N" class="src"> 区块 */
function parseSource(id, block) {
  const level = (block.match(/class="idx (verified|cross|partial)"/) || [])[1] || null;
  const rating = stripTags((block.match(/class="rt">([\s\S]*?)<\/span>/) || [])[1]);
  const type = stripTags((block.match(/class="st">([\s\S]*?)<\/span>/) || [])[1]);
  const title = stripTags((block.match(/class="ti">([\s\S]*?)<\/div>/) || [])[1]);
  const mt = (block.match(/class="mt">([\s\S]*?)<\/div>/) || [])[1] || '';
  const note = stripTags((block.match(/class="note">([\s\S]*?)<\/div>/) || [])[1]);

  const publisherRaw = (mt.match(/<b>来源：<\/b>([\s\S]*?)(?:　<b>|<\/div>|$)/) || [])[1] || '';
  const dateRaw = (mt.match(/<b>发布日期：<\/b>([\s\S]*?)(?:<br>|<\/div>|$)/) || [])[1] || '';
  const urlMatch = mt.match(/<a[^>]+href="([^"]+)"/);
  const url = urlMatch ? urlMatch[1].replace(/&amp;/g, '&') : null;

  return {
    ref: id,
    level: level,
    rating: rating || null,
    type: type || null,
    title: title || null,
    publisher: stripTags(publisherRaw) || null,
    date: stripTags(dateRaw) || null,
    date_iso: extractDate(stripTags(dateRaw)),
    url: url,
    domain: url ? domainOf(url) : null,
    note: note || null,
    claims: []
  };
}

/** 从正文中提取每条信源支撑的句子（最多 3 条，去重） */
function extractClaims(html, sources) {
  const srcStart = html.indexOf('<section id="sec-9"');
  const secStart = html.indexOf('<section id="sec-1"');
  const body = html.slice(secStart > 0 ? secStart : 0, srcStart > 0 ? srcStart : html.length);

  const marked = body
    .replace(/<a[^>]*class="cref[^"]*"[^>]*href="#ref-(\d+)"[^>]*>[\s\S]*?<\/a>/g, ' [[$1]] ')
    .replace(/<sup[^>]*class="cite[^"]*"[^>]*>[\s\S]*?href="#ref-(\d+)"[\s\S]*?<\/sup>/g, ' [[$1]] ');

  const text = stripTags(marked);
  const claims = {};
  const re = /\[\[(\d+)\]\]/g;
  let m;
  while ((m = re.exec(text))) {
    const n = parseInt(m[1], 10);
    // 向前找最近的句末标点，向后找最近的句末标点，取完整句
    let start = Math.max(0, m.index - 190);
    for (let i = m.index - 1; i >= start; i--) {
      if ('。！？!?'.includes(text[i])) { start = i + 1; break; }
    }
    let end = Math.min(text.length, m.index + 170);
    for (let i = m.index; i < end; i++) {
      if ('。！？!?'.includes(text[i])) { end = i + 1; break; }
    }
    let snippet = text.slice(start, end)
      .replace(/\[\[\d+\]\]/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/^[，、；：:）)\]】」』\s]+/, '')
      .trim();
    if (snippet.length < 12) continue;
    if (snippet.length > 190) snippet = snippet.slice(0, 190) + '…';

    const norm = function (s) { return s.replace(/[\s，。；：、（）()「」]/g, ''); };
    claims[n] = claims[n] || [];
    if (claims[n].length >= 2) continue;
    if (claims[n].some(function (c) { return norm(c).includes(norm(snippet)) || norm(snippet).includes(norm(c)); })) continue;
    claims[n].push(snippet);
  }
  sources.forEach(function (s) {
    s.claims = claims[s.ref] || [];
    s.cited = s.claims.length > 0;
  });
}

function sourcesHash(srcBlocks) {
  const normalized = srcBlocks.map(function (b) { return b.replace(/\s+/g, ' ').trim(); }).join('\n');
  return crypto.createHash('sha1').update(normalized).digest('hex').slice(0, 16);
}

async function checkWayback(urls) {
  let cache = {};
  if (fs.existsSync(CACHE_FILE)) {
    try { cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')); } catch (e) { cache = {}; }
  }
  const todo = urls.filter(function (u) { return !(u in cache); }).slice(0, LIMIT);
  console.log('Wayback 查询：待查 ' + todo.length + ' 条（缓存命中 ' + (urls.length - todo.length) + ' 条）');

  let done = 0;
  let found = 0;
  const queue = todo.slice();
  async function worker() {
    while (queue.length) {
      const url = queue.shift();
      let result = null;
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(function () { ctrl.abort(); }, 12000);
        const res = await fetch('https://archive.org/wayback/available?url=' + encodeURIComponent(url), { signal: ctrl.signal });
        clearTimeout(timer);
        if (res.ok) {
          const j = await res.json();
          const snap = j && j.archived_snapshots && j.archived_snapshots.closest;
          if (snap && snap.available) result = snap.url.replace(/^http:/, 'https:');
        }
      } catch (e) { /* 网络失败按无存档处理 */ }
      cache[url] = result;
      if (result) found++;
      done++;
      if (done % 50 === 0) console.log('  已查 ' + done + '/' + todo.length + '，命中 ' + found);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 1));
  console.log('Wayback 查询完成：命中 ' + found + ' 条，缓存已更新');
  return cache;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(CASES_FILE, 'utf8'));
  const cases = data.cases || [];
  const out = [];
  const stats = { cases: 0, sources: 0, without_url: 0, without_date: 0, no_claims: 0, by_level: {} };
  const allUrls = new Set();

  for (const c of cases) {
    const urlSlug = String(c.url || '').split('/report/')[1].replace(/\/$/, '');
    const file = path.join(REPORT_DIR, urlSlug, 'index.html');
    if (!fs.existsSync(file)) {
      console.error('跳过（缺少报告）：' + urlSlug);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    const blocks = [];
    const re = /<li id="ref-(\d+)" class="src">([\s\S]*?)<\/li>/g;
    let m;
    while ((m = re.exec(html))) blocks.push({ id: parseInt(m[1], 10), html: m[0], inner: m[2] });

    const sources = blocks.map(function (b) { return parseSource(b.id, b.inner); });
    extractClaims(html, sources);

    sources.sort(function (a, b) { return a.ref - b.ref; });
    sources.forEach(function (s) {
      if (!s.url) stats.without_url++;
      else allUrls.add(s.url);
      if (!s.date_iso) stats.without_date++;
      if (!s.claims.length) stats.no_claims++;
      stats.by_level[s.level || 'unknown'] = (stats.by_level[s.level || 'unknown'] || 0) + 1;
    });

    out.push({
      slug: c.slug,
      name: c.name,
      founder: c.founder || null,
      track: c.track,
      report_url: c.url,
      source_count: sources.length,
      sources_hash: sourcesHash(blocks.map(function (b) { return b.html; })),
      sources: sources
    });
    stats.cases++;
    stats.sources += sources.length;
  }

  if (DO_ARCHIVE) {
    const cache = await checkWayback(Array.from(allUrls));
    out.forEach(function (c) {
      c.sources.forEach(function (s) {
        if (s.url && cache[s.url]) s.archive_url = cache[s.url];
      });
    });
    stats.archive_checked = Object.keys(cache).length;
    stats.archive_hit = Object.values(cache).filter(Boolean).length;
  }

  const domains = {};
  out.forEach(function (c) {
    c.sources.forEach(function (s) { if (s.domain) domains[s.domain] = (domains[s.domain] || 0) + 1; });
  });
  const topDomains = Object.keys(domains).sort(function (a, b) { return domains[b] - domains[a]; }).slice(0, 15)
    .map(function (d) { return { domain: d, count: domains[d] }; });

  const ledger = {
    meta: {
      description: 'OPC Story 信源台账：每条信源的可回溯元数据与正文引用句，生成自各报告「资料来源」区块。',
      total_cases: stats.cases,
      total_sources: stats.sources,
      unique_urls: allUrls.size,
      unique_domains: Object.keys(domains).length,
      by_level: stats.by_level,
      without_url: stats.without_url,
      without_date: stats.without_date,
      without_claims: stats.no_claims,
      archive_checked: stats.archive_checked || 0,
      archive_hits: stats.archive_hit || 0,
      top_domains: topDomains,
      fields: {
        level: 'verified=已核验（≥2 独立信源交叉）；cross=多源印证（单一权威可回溯）；partial=部分映证（自述/转述）',
        rating: 'A-/A/B+/B，报告内原始评级',
        date_iso: '从发布日期提取的 ISO 日期，可能只有年月',
        claims: '该信源在正文中支撑的句子，最多 3 条',
        sources_hash: '信源区块内容哈希，用于校验台账是否过期'
      }
    },
    cases: out
  };

  fs.writeFileSync(OUT_FILE, JSON.stringify(ledger, null, 2));
  const kb = (fs.statSync(OUT_FILE).size / 1024).toFixed(0);
  console.log('已生成 ' + path.relative(ROOT, OUT_FILE) + '（' + kb + 'KB）');
  console.log('案例 ' + stats.cases + ' · 信源 ' + stats.sources + ' · 唯一 URL ' + allUrls.size + ' · 域名 ' + Object.keys(domains).length);
  console.log('缺失 URL ' + stats.without_url + ' · 缺失日期 ' + stats.without_date + ' · 无引用句 ' + stats.no_claims);
  console.log('等级分布 ' + JSON.stringify(stats.by_level));
}

main().catch(function (e) { console.error(e); process.exit(1); });
