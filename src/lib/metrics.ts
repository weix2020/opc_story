/**
 * 互动计数链路（阅读 / 点赞 / 分享）。
 *
 * 两种模式：
 * 1. 本地模式（默认）：以 frontmatter 的 metrics 作为种子值，浏览器本地叠加增量。
 *    - 阅读：每个会话每个案例只计 1 次（sessionStorage 记录"本会话已计"标记，计数结果写入 localStorage，刷新后保留）。
 *    - 点赞：可切换，localStorage 保存点赞状态。
 *    - 分享：每次点击分享按钮计 1 次。
 * 2. 远程模式（可选）：当环境变量 PUBLIC_METRICS_ENDPOINT 存在时启用，
 *    事件会 POST 到该端点，并 GET 远端聚合值与本地值合并显示；未配置时完全不影响站点功能。
 *
 * 远程接口契约：
 *   GET  {endpoint}?slug={slug}  →  { views: number, likes: number, shares: number }
 *        返回该 slug 的绝对累计值（服务端以 frontmatter 种子值为起点累加）。
 *   POST {endpoint}  body: { slug: string, metric: 'views' | 'likes' | 'shares', delta: number }
 *        服务端把 delta 累加到对应计数上；响应体可省略。
 *
 * 展示值计算：远程模式下为「远端绝对值 + 尚未被远端确认的本地增量」，
 * 本地模式下为「种子值 + 本地增量」。
 */

/** 计数指标名称 */
export type MetricName = 'views' | 'likes' | 'shares';

/** 三个计数的聚合结构 */
export interface MetricCounts {
  views: number;
  likes: number;
  shares: number;
}

/** 单个案例的本地存储状态 */
interface LocalState {
  /** 本地累计的阅读增量 */
  views: number;
  /** 本地累计的分享增量 */
  shares: number;
  /** 是否已点赞 */
  liked: boolean;
  /** 已成功提交到远端的增量 */
  synced: MetricCounts;
}

/** 远程计数端点；未配置时为空字符串，即纯本地模式。
 * 通过 configureMetrics() 在页面组件挂载时从 Docusaurus siteConfig.customFields 注入。 */
let metricsEndpoint = '';

/**
 * 注入远程计数端点（来自 docusaurus.config.ts 的 customFields.metricsEndpoint）。
 * @param endpoint 端点地址，可为空字符串
 */
export function configureMetrics(endpoint: string | undefined): void {
  metricsEndpoint = (endpoint ?? '').trim();
}

/** localStorage 中存放本地状态的键前缀 */
const STORAGE_PREFIX = 'opc:metrics:';

/** sessionStorage 中存放"本会话已计阅读"标记的键前缀 */
const SESSION_PREFIX = 'opc:viewed:';

/**
 * 生成 localStorage 中某个案例的状态键。
 * @param slug 案例 slug
 * @returns 存储键
 */
function storageKey(slug: string): string {
  return `${STORAGE_PREFIX}${slug}`;
}

/**
 * 生成 sessionStorage 中某个案例的"已计阅读"标记键。
 * @param slug 案例 slug
 * @returns 存储键
 */
function sessionKey(slug: string): string {
  return `${SESSION_PREFIX}${slug}`;
}

/**
 * 读取默认（空）本地状态。
 * @returns 全零的本地状态
 */
function emptyState(): LocalState {
  return { views: 0, shares: 0, liked: false, synced: { views: 0, likes: 0, shares: 0 } };
}

/**
 * 判断当前环境是否可用浏览器存储。
 * @returns 是否处于浏览器环境
 */
function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/**
 * 从 localStorage 读取某个案例的本地状态。
 * @param slug 案例 slug
 * @returns 本地状态；无记录或解析失败时返回空状态
 */
export function readLocalState(slug: string): LocalState {
  if (!hasStorage()) return emptyState();
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<LocalState>;
    const synced = parsed.synced ?? { views: 0, likes: 0, shares: 0 };
    return {
      views: Number.isFinite(parsed.views) ? Number(parsed.views) : 0,
      shares: Number.isFinite(parsed.shares) ? Number(parsed.shares) : 0,
      liked: Boolean(parsed.liked),
      synced: {
        views: Number.isFinite(synced.views) ? Number(synced.views) : 0,
        likes: Number.isFinite(synced.likes) ? Number(synced.likes) : 0,
        shares: Number.isFinite(synced.shares) ? Number(synced.shares) : 0,
      },
    };
  } catch {
    return emptyState();
  }
}

/**
 * 将本地状态写回 localStorage。
 * @param slug 案例 slug
 * @param state 待写入的本地状态
 * @returns 无返回值
 */
function writeLocalState(slug: string, state: LocalState): void {
  if (!hasStorage()) return;
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(state));
  } catch {
    /* 隐私模式下写入可能失败，忽略即可 */
  }
}

/**
 * 判断本次会话是否已经为该案例计过阅读。
 * @param slug 案例 slug
 * @returns 是否已计过
 */
export function hasCountedView(slug: string): boolean {
  if (typeof window === 'undefined' || typeof window.sessionStorage === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(sessionKey(slug)) !== null;
  } catch {
    return false;
  }
}

/**
 * 记录一次阅读：每个会话每个案例只计 1 次，增量持久化到 localStorage。
 * @param slug 案例 slug
 * @returns 本次是否真正计入了增量（已计过则返回 false）
 */
export function recordView(slug: string): boolean {
  if (typeof window === 'undefined') return false;
  if (hasCountedView(slug)) return false;
  try {
    window.sessionStorage.setItem(sessionKey(slug), '1');
  } catch {
    /* 忽略存储异常 */
  }
  const state = readLocalState(slug);
  state.views += 1;
  writeLocalState(slug, state);
  return true;
}

/**
 * 切换点赞状态。
 * @param slug 案例 slug
 * @returns 切换后的点赞状态
 */
export function toggleLike(slug: string): boolean {
  const state = readLocalState(slug);
  state.liked = !state.liked;
  writeLocalState(slug, state);
  return state.liked;
}

/**
 * 记录一次分享。
 * @param slug 案例 slug
 * @returns 本地累计的分享增量
 */
export function recordShare(slug: string): number {
  const state = readLocalState(slug);
  state.shares += 1;
  writeLocalState(slug, state);
  return state.shares;
}

/**
 * 计算本地模式下的展示计数：种子值 + 本地增量。
 * @param slug 案例 slug
 * @param seed frontmatter 中的种子计数
 * @returns 展示用计数
 */
export function getLocalCounts(slug: string, seed: MetricCounts): MetricCounts {
  const state = readLocalState(slug);
  return {
    views: seed.views + state.views,
    likes: seed.likes + (state.liked ? 1 : 0),
    shares: seed.shares + state.shares,
  };
}

/**
 * 向远端提交一次计数增量。
 * @param slug 案例 slug
 * @param metric 计数指标
 * @param delta 增量（可为负，用于取消点赞）
 * @returns 提交是否成功
 */
export async function postRemoteDelta(
  slug: string,
  metric: MetricName,
  delta: number,
): Promise<boolean> {
  if (!metricsEndpoint) return false;
  try {
    const response = await fetch(metricsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, metric, delta }),
    });
    if (!response.ok) return false;
    const state = readLocalState(slug);
    state.synced[metric] += delta;
    writeLocalState(slug, state);
    return true;
  } catch {
    return false;
  }
}

/**
 * 拉取远端聚合计数。
 * @param slug 案例 slug
 * @returns 远端计数；未配置端点或请求失败时返回 null
 */
export async function fetchRemoteCounts(slug: string): Promise<MetricCounts | null> {
  if (!metricsEndpoint) return null;
  try {
    const response = await fetch(`${metricsEndpoint}?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) return null;
    const data = (await response.json()) as Partial<MetricCounts>;
    return {
      views: Number.isFinite(data.views) ? Number(data.views) : 0,
      likes: Number.isFinite(data.likes) ? Number(data.likes) : 0,
      shares: Number.isFinite(data.shares) ? Number(data.shares) : 0,
    };
  } catch {
    return null;
  }
}

/**
 * 合并远端计数与本地状态，得到最终展示值。
 * 远端绝对值 + 本地尚未同步成功的增量；远端不可用时退化为纯本地模式。
 * @param slug 案例 slug
 * @param seed frontmatter 中的种子计数
 * @param remote 远端聚合计数，可为 null
 * @returns 最终展示计数
 */
export function mergeCounts(slug: string, seed: MetricCounts, remote: MetricCounts | null): MetricCounts {
  const state = readLocalState(slug);
  if (!remote) return getLocalCounts(slug, seed);
  const localLikeDelta = state.liked ? 1 : 0;
  return {
    views: remote.views + Math.max(0, state.views - state.synced.views),
    likes: remote.likes + Math.max(0, localLikeDelta - state.synced.likes),
    shares: remote.shares + Math.max(0, state.shares - state.synced.shares),
  };
}

/**
 * 把数值格式化为中文习惯的计数文案（万 / 亿）。
 * @param value 原始数值
 * @returns 格式化后的文案，例如 123456 → "12.3万"
 */
export function formatCount(value: number): string {
  const safe = Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  if (safe >= 100_000_000) return `${trimZero(safe / 100_000_000)}亿`;
  if (safe >= 10_000) return `${trimZero(safe / 10_000)}万`;
  return String(safe);
}

/**
 * 保留一位小数并去掉多余的 ".0"。
 * @param value 数值
 * @returns 形如 "12.3" 的字符串
 */
function trimZero(value: number): string {
  return value.toFixed(1).replace(/\.0$/, '');
}
