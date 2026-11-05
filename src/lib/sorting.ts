/**
 * 案例排序规则（构建期与客户端共用）。
 * 主规则：上线时间降序；上线时间相同时按阅读量降序。
 * 该顺序在首页列表与详情页的上一/下一案例导航中保持一致。
 */

/** 参与排序的最小数据结构 */
export interface SortableProject {
  /** 上线日期（ISO 字符串） */
  launchDate: string;
  /** 阅读量种子值 */
  views: number;
  /** 案例 slug（用于同分时的稳定排序） */
  slug: string;
}

/**
 * 比较两个案例的排序权重。
 * @param a 案例 A
 * @param b 案例 B
 * @returns 负数表示 A 排在前面，正数表示 B 排在前面，0 表示顺序相同
 */
export function compareProjects(a: SortableProject, b: SortableProject): number {
  const timeA = new Date(a.launchDate).getTime();
  const timeB = new Date(b.launchDate).getTime();
  const safeA = Number.isNaN(timeA) ? 0 : timeA;
  const safeB = Number.isNaN(timeB) ? 0 : timeB;

  if (safeA !== safeB) return safeB - safeA;
  if (a.views !== b.views) return b.views - a.views;
  return a.slug.localeCompare(b.slug);
}

/**
 * 按统一规则对案例列表排序（返回新数组）。
 * @param projects 待排序列表
 * @returns 排序后的新数组
 */
export function sortProjects<T extends SortableProject>(projects: T[]): T[] {
  return [...projects].sort(compareProjects);
}
