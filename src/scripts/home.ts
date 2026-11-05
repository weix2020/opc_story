/**
 * 首页列表的客户端交互：关键词搜索、类别筛选、AI 契合类型筛选、
 * 结果计数、空状态提示，以及按「时间降序 → 阅读量降序」重新排序。
 *
 * 阅读量会因浏览行为在本地产生增量，排序时使用「种子值 + 本地增量」的有效值，
 * 保证列表顺序与展示数字始终一致。
 */
import { getLocalCounts, formatCount, type MetricCounts } from '../lib/metrics';
import { compareProjects } from '../lib/sorting';

/** 从卡片元素上读取的原始数据 */
interface CardData {
  /** 卡片 DOM 元素 */
  element: HTMLElement;
  /** 案例 slug */
  slug: string;
  /** 上线日期（ISO） */
  launchDate: string;
  /** 阅读量种子值 */
  seedViews: number;
  /** 点赞量种子值 */
  seedLikes: number;
  /** 分享量种子值 */
  seedShares: number;
  /** 标题 */
  title: string;
  /** 简介 */
  summary: string;
  /** 创始人 */
  founder: string;
  /** 类别列表 */
  categories: string[];
  /** AI 契合类型 */
  aiType: string;
}

/**
 * 从卡片元素的 data-* 属性中还原案例数据。
 * @param element 卡片元素
 * @returns 卡片数据
 */
function readCard(element: HTMLElement): CardData {
  const read = (name: string): string => element.dataset[name] ?? '';
  return {
    element,
    slug: read('slug'),
    launchDate: read('launch'),
    seedViews: Number(read('views')) || 0,
    seedLikes: Number(read('likes')) || 0,
    seedShares: Number(read('shares')) || 0,
    title: read('title'),
    summary: read('summary'),
    founder: read('founder'),
    categories: read('categories')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    aiType: read('aiType'),
  };
}

/** 主流程：绑定搜索、筛选与排序 */
function init(): void {
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');
  const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
  const countElement = document.querySelector<HTMLElement>('[data-result-count]');
  const emptyElement = document.querySelector<HTMLElement>('[data-empty-state]');
  if (!grid) return;

  const cards = [...grid.querySelectorAll<HTMLElement>('[data-slug]')].map(readCard);
  const activeCategories = new Set<string>();
  const activeAiTypes = new Set<string>();
  let keyword = '';

  /**
   * 计算案例当前的本地有效计数（种子值 + 本地增量）。
   * @param card 卡片数据
   * @returns 有效计数
   */
  const effectiveCounts = (card: CardData): MetricCounts =>
    getLocalCounts(card.slug, {
      views: card.seedViews,
      likes: card.seedLikes,
      shares: card.seedShares,
    });

  /**
   * 把卡片上的计数文本刷新为本地有效值。
   * @param card 卡片数据
   * @returns 无返回值
   */
  const paintMetrics = (card: CardData): void => {
    const counts = effectiveCounts(card);
    const values: Record<string, number> = {
      views: counts.views,
      likes: counts.likes,
      shares: counts.shares,
    };
    card.element.querySelectorAll<HTMLElement>('[data-metric]').forEach((node) => {
      const key = node.dataset.metric;
      const value = key ? values[key] : undefined;
      const target = node.querySelector<HTMLElement>('[data-value]');
      if (target && value !== undefined) target.textContent = formatCount(value);
    });
  };

  /**
   * 判断卡片是否命中当前筛选条件。
   * @param card 卡片数据
   * @returns 是否命中
   */
  const matches = (card: CardData): boolean => {
    if (activeCategories.size > 0 && !card.categories.some((item) => activeCategories.has(item))) {
      return false;
    }
    if (activeAiTypes.size > 0 && !activeAiTypes.has(card.aiType)) return false;
    if (keyword) {
      const haystack = [card.title, card.summary, card.founder, ...card.categories]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  };

  /**
   * 应用筛选条件、刷新排序与结果计数。
   * @returns 无返回值
   */
  const apply = (): void => {
    const visible = cards.filter(matches);

    // 按统一规则排序：上线时间降序 → 阅读量（本地有效值）降序
    const ordered = [...visible].sort((a, b) =>
      compareProjects(
        { launchDate: a.launchDate, views: effectiveCounts(a).views, slug: a.slug },
        { launchDate: b.launchDate, views: effectiveCounts(b).views, slug: b.slug },
      ),
    );

    // 用 CSS order 重排，避免真实搬运 DOM 节点
    ordered.forEach((card, index) => {
      card.element.style.order = String(index);
      card.element.hidden = false;
    });
    cards
      .filter((card) => !visible.includes(card))
      .forEach((card) => {
        card.element.hidden = true;
      });

    cards.forEach(paintMetrics);

    if (countElement) countElement.textContent = `共 ${visible.length} 个案例`;
    if (emptyElement) emptyElement.hidden = visible.length > 0;
  };

  /**
   * 切换某个筛选按钮的选中状态。
   * @param button 按钮元素
   * @param activeSet 记录该组选中状态的集合
   * @param value 按钮代表的取值
   * @returns 无返回值
   */
  const toggleButton = (
    button: HTMLButtonElement,
    activeSet: Set<string>,
    value: string,
  ): void => {
    const pressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', pressed ? 'false' : 'true');
    button.classList.toggle('is-active', !pressed);
    if (pressed) activeSet.delete(value);
    else activeSet.add(value);
    apply();
  };

  searchInput?.addEventListener('input', () => {
    keyword = searchInput.value.trim().toLowerCase();
    apply();
  });

  document.querySelectorAll<HTMLButtonElement>('[data-category-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      toggleButton(button, activeCategories, button.dataset.categoryFilter ?? '');
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-ai-type-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      toggleButton(button, activeAiTypes, button.dataset.aiTypeFilter ?? '');
    });
  });

  // 初次进入时按本地增量刷新计数与顺序
  apply();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
