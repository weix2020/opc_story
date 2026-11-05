/**
 * 可选的 Cloudflare Pages Function：互动计数的远程聚合端点。
 *
 * 该函数属于「可选启用」能力：
 * - 默认不启用。若未绑定 KV 命名空间，所有请求直接返回 404，静态站点不受影响。
 * - 启用方式：在 Cloudflare Pages 项目中绑定 KV 命名空间并设置环境变量
 *   METRICS_KV_NAMESPACE = "METRICS"，函数会自动把计数写入该 KV。
 * - 前端通过环境变量 PUBLIC_METRICS_ENDPOINT 指向本函数地址后自动切换到远程模式。
 *
 * 接口契约（与 src/lib/metrics.ts 中的说明一致）：
 *   GET  /api/metrics?slug={slug}  →  { views: number, likes: number, shares: number }
 *   POST /api/metrics                body: { slug: string, metric: 'views'|'likes'|'shares', delta: number }
 *
 * 防刷策略：同一 slug + metric 在限频窗口（默认 10 秒）内只接受一次写入，
 * 超频请求返回 429。限频时间戳同样存放在 KV 中。
 */

/** 本函数支持的计数指标 */
type MetricName = 'views' | 'likes' | 'shares';

/** 计数指标集合 */
type MetricCounts = Record<MetricName, number>;

/** Cloudflare KV 命名空间的最小类型声明 */
interface KVNamespaceLike {
  /** 读取键值 */
  get(key: string): Promise<string | null>;
  /** 写入键值 */
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

/** Pages Functions 的环境变量 */
interface Env {
  /** 计数存储使用的 KV 命名空间 */
  METRICS?: KVNamespaceLike;
}

/** Pages Function 上下文 */
interface EventContext {
  /** 传入请求 */
  request: Request;
  /** 绑定的环境变量 */
  env: Env;
}

/** Pages Function 处理函数类型 */
type PagesFunction = (context: EventContext) => Response | Promise<Response>;

/** 允许的指标集合 */
const METRIC_NAMES: MetricName[] = ['views', 'likes', 'shares'];

/** 同一 slug + metric 的写入限频窗口（秒） */
const RATE_LIMIT_SECONDS = 10;

/** KV 中计数键的前缀 */
const COUNT_KEY_PREFIX = 'metrics:count:';

/** KV 中限频时间戳键的前缀 */
const RATE_KEY_PREFIX = 'metrics:rate:';

/**
 * 生成计数在 KV 中的键。
 * @param slug 案例 slug
 * @returns KV 键
 */
function countKey(slug: string): string {
  return `${COUNT_KEY_PREFIX}${slug}`;
}

/**
 * 生成限频时间戳在 KV 中的键。
 * @param slug 案例 slug
 * @param metric 计数指标
 * @returns KV 键
 */
function rateKey(slug: string, metric: MetricName): string {
  return `${RATE_KEY_PREFIX}${slug}:${metric}`;
}

/**
 * 判断字符串是否为合法的指标名。
 * @param value 待判断的字符串
 * @returns 是否为合法指标名
 */
function isMetricName(value: unknown): value is MetricName {
  return typeof value === 'string' && (METRIC_NAMES as string[]).includes(value);
}

/**
 * 读取 JSON 并解析为对象，失败时返回空对象。
 * @param raw JSON 字符串
 * @returns 解析后的对象
 */
function parseJson(raw: string | null): Record<string, unknown> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/**
 * 生成 JSON 响应。
 * @param data 响应体
 * @param status HTTP 状态码
 * @returns Response 对象
 */
function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

/**
 * 读取某个 slug 的计数聚合值。
 * @param context Pages Function 上下文
 * @param slug 案例 slug
 * @returns 计数聚合值
 */
async function readCounts(context: EventContext, slug: string): Promise<MetricCounts> {
  const stored = parseJson(await context.env.METRICS?.get(countKey(slug)));
  return {
    views: Number(stored.views) || 0,
    likes: Number(stored.likes) || 0,
    shares: Number(stored.shares) || 0,
  };
}

/**
 * 处理 GET 请求：返回指定 slug 的聚合计数。
 * @param context Pages Function 上下文
 * @returns Response 对象
 */
async function handleGet(context: EventContext): Promise<Response> {
  if (!context.env.METRICS) return json({ error: 'metrics kv not bound' }, 404);

  const url = new URL(context.request.url);
  const slug = (url.searchParams.get('slug') ?? '').trim();
  if (!slug) return json({ error: 'missing slug' }, 400);

  return json(await readCounts(context, slug));
}

/**
 * Pages Function 入口：按请求方法分发。
 * @param context Pages Function 上下文
 * @returns Response 对象
 */
export const onRequest: PagesFunction = async (context) => {
  if (!context.env.METRICS) return json({ error: 'metrics kv not bound' }, 404);

  if (context.request.method === 'GET') return handleGet(context);
  if (context.request.method === 'POST') {
    let payload: Record<string, unknown>;
    try {
      payload = (await context.request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: 'invalid json body' }, 400);
    }

    const slug = typeof payload.slug === 'string' ? payload.slug.trim() : '';
    const metric = payload.metric;
    const delta = Number(payload.delta);

    if (!slug) return json({ error: 'missing slug' }, 400);
    if (!isMetricName(metric)) return json({ error: 'invalid metric' }, 400);
    if (!Number.isFinite(delta) || delta === 0) return json({ error: 'invalid delta' }, 400);

    // 防刷：同一 slug + metric 在限频窗口内只接受一次写入
    const now = Date.now();
    const lastSeen = Number(await context.env.METRICS.get(rateKey(slug, metric)));
    if (Number.isFinite(lastSeen) && lastSeen > 0 && now - lastSeen < RATE_LIMIT_SECONDS * 1000) {
      return json({ error: 'rate limited' }, 429);
    }
    await context.env.METRICS.put(rateKey(slug, metric), String(now), {
      expirationTtl: RATE_LIMIT_SECONDS * 2,
    });

    const counts = await readCounts(context, slug);
    counts[metric] = Math.max(0, counts[metric] + delta);
    await context.env.METRICS.put(countKey(slug), JSON.stringify(counts));

    return json(counts);
  }

  return json({ error: 'method not allowed' }, 405);
};
