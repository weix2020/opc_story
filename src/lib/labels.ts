/**
 * 枚举值到中文展示文案的映射。
 * 取值范围由 src/lib/content-contract.mjs 的契约常量限定，此处只负责展示层文案。
 */

/** AI 契合类型中文标签 */
export const AI_TYPE_LABELS: Record<string, string> = {
  'ai-native': 'AI 原生',
  'ai-embedded': 'AI 嵌入',
  'ai-enabled-ops': 'AI 驱动运营',
};

/** AI 契合类型一句话释义 */
export const AI_TYPE_DESCRIPTIONS: Record<string, string> = {
  'ai-native': 'AI 直接构成产品的核心能力，交付物主要由模型生成。',
  'ai-embedded': 'AI 作为增强模块嵌入既有产品，核心功能不以模型生成为主。',
  'ai-enabled-ops': '模型主要承担内部运营与交付提效，产品本身形态传统。',
};

/** 信源类型中文标签 */
export const SOURCE_TYPE_LABELS: Record<string, string> = {
  primary: '一手信源',
  secondary: '媒体报道',
  database: '数据库',
  aggregator: '聚合站',
  community: '社区',
};

/** 置信度等级中文标签 */
export const CONFIDENCE_LABELS: Record<string, string> = {
  A: '高置信 A',
  B: '中置信 B',
  C: '推算 C',
};

/** 置信度等级说明 */
export const CONFIDENCE_DESCRIPTIONS: Record<string, string> = {
  A: '多源交叉验证且包含一手信源，结论可直接引用。',
  B: '有一手信源或多个独立来源支持，但存在口径差异。',
  C: '基于公开信息的推算，仅供参考，需谨慎引用。',
};

/**
 * 按 AI 契合类型取中文标签，未知取值回退为原始值。
 * @param aiType AI 契合类型枚举值
 * @returns 中文标签文案
 */
export function aiTypeLabel(aiType: string): string {
  return AI_TYPE_LABELS[aiType] ?? aiType;
}

/**
 * 按信源类型取中文标签，未知取值回退为原始值。
 * @param sourceType 信源类型枚举值
 * @returns 中文标签文案
 */
export function sourceTypeLabel(sourceType: string): string {
  return SOURCE_TYPE_LABELS[sourceType] ?? sourceType;
}

/**
 * 按置信度等级取中文标签，未知取值回退为原始值。
 * @param level 置信度等级（A/B/C）
 * @returns 中文标签文案
 */
export function confidenceLabel(level: string): string {
  return CONFIDENCE_LABELS[level] ?? level;
}

/**
 * 将上线日期按精度格式化为中文展示文案。
 * day 显示到日，month 显示到月，year 只显示到年。
 * @param launchDate ISO 日期字符串
 * @param precision 日期精度（day/month/year）
 * @returns 中文日期文案
 */
export function formatLaunchDate(launchDate: string, precision: string): string {
  const date = new Date(launchDate);
  if (Number.isNaN(date.getTime())) return launchDate;
  const year = date.getUTCFullYear();
  if (precision === 'year') return `${year}年`;
  const month = date.getUTCMonth() + 1;
  if (precision === 'month') return `${year}年${month}月`;
  const day = date.getUTCDate();
  return `${year}年${month}月${day}日`;
}

/**
 * 将 ISO 日期格式化为 YYYY-MM-DD，用于表格中的纯日期展示。
 * @param dateString ISO 日期字符串
 * @returns YYYY-MM-DD 格式文案，无效输入返回原值
 */
export function formatIsoDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toISOString().slice(0, 10);
}
