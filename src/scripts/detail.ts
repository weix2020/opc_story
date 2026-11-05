/**
 * 详情页的互动逻辑：记录阅读、点赞切换、分享计数，以及计数展示刷新。
 * 阅读量每会话每案例只计 1 次；点赞可切换；每次点击分享计 1 次。
 */
import {
  fetchRemoteCounts,
  formatCount,
  getLocalCounts,
  mergeCounts,
  postRemoteDelta,
  readLocalState,
  recordShare,
  recordView,
  toggleLike,
  type MetricCounts,
} from '../lib/metrics';

/**
 * 读取页面上配置的种子计数。
 * @returns 种子计数
 */
function readSeed(): MetricCounts {
  const read = (name: string): number => {
    const node = document.querySelector<HTMLElement>(`[data-seed-${name}]`);
    return Number(node?.getAttribute(`data-seed-${name}`)) || 0;
  };
  return { views: read('views'), likes: read('likes'), shares: read('shares') };
}

/** 主流程：绑定计数按钮并初始化展示 */
async function init(): Promise<void> {
  const root = document.querySelector<HTMLElement>('[data-project-detail]');
  if (!root) return;

  const slug = root.dataset.projectDetail ?? '';
  const seed = readSeed();

  // 进入详情页即计一次阅读（同一会话同一案例只计一次）
  recordView(slug);

  // 缓存远端聚合计数，切换点赞/分享后仍能与本地增量合并展示
  let remote: MetricCounts | null = null;

  /**
   * 刷新页面上的计数展示。
   * @returns 无返回值
   */
  const paint = (): void => {
    const counts = remote ? mergeCounts(slug, seed, remote) : getLocalCounts(slug, seed);
    const values: Record<string, number> = {
      views: counts.views,
      likes: counts.likes,
      shares: counts.shares,
    };
    document.querySelectorAll<HTMLElement>('[data-metric]').forEach((node) => {
      const key = node.dataset.metric;
      const value = key ? values[key] : undefined;
      const target = node.querySelector<HTMLElement>('[data-value]');
      if (target && value !== undefined) target.textContent = formatCount(value);
    });

    const likeButton = document.querySelector<HTMLButtonElement>('[data-action="like"]');
    if (likeButton) {
      const liked = readLocalState(slug).liked;
      likeButton.classList.toggle('is-liked', liked);
      likeButton.setAttribute('aria-pressed', liked ? 'true' : 'false');
    }
  };

  const likeButton = document.querySelector<HTMLButtonElement>('[data-action="like"]');
  likeButton?.addEventListener('click', () => {
    const liked = toggleLike(slug);
    void postRemoteDelta(slug, 'likes', liked ? 1 : -1);
    paint();
  });

  const shareButton = document.querySelector<HTMLButtonElement>('[data-action="share"]');
  shareButton?.addEventListener('click', () => {
    recordShare(slug);
    void postRemoteDelta(slug, 'shares', 1);
    paint();

    // 尽可能调用系统分享能力，失败时静默降级
    const shareData = { title: document.title, url: window.location.href };
    if (navigator.share) {
      navigator.share(shareData).catch(() => undefined);
    } else if (navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href).catch(() => undefined);
    }
  });

  // 远程模式：拉取远端聚合并合并展示；未配置端点时保持纯本地模式
  remote = await fetchRemoteCounts(slug);
  paint();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    void init();
  });
} else {
  void init();
}
