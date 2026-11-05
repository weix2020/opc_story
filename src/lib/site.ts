/**
 * 站点级常量：站点名称、SEO 默认信息、数据检索截止时间与免责说明。
 * 页面（BaseLayout / 方法论 / 404）统一从这里取值，避免各页面写死重复文案。
 */

/** 站点名称 */
export const SITE_NAME = 'OPC Story';

/** 站点一句话定位 */
export const SITE_TAGLINE = '全球 AI 一人公司（OPC）成功案例库';

/** 站点默认 SEO 描述 */
export const SITE_DESCRIPTION =
  '收录全球范围内由单人创立、以 AI 为核心生产力的公司案例，记录其成立背景、营收推算、融资进展与市场评价，并标注信源等级与推算置信度。';

/** 站点主域名（与 astro.config.mjs 的 site 保持一致） */
export const SITE_URL = 'https://opc-story.pages.dev';

/** 数据检索截止时间（占位值，内容更新时同步维护） */
export const DATA_CUTOFF = '2026-11-04';

/** 站点数据来源说明 */
export const DATA_SOURCES =
  '一手信源（官方定价页、公告、访谈）、媒体报道、公开数据库、聚合站与社区讨论。';

/** 页脚免责声明 */
export const DISCLAIMER =
  '本站为公开资料整理型案例库，营收与团队规模等指标多为基于公开信息的推算值，已标注置信度等级，不代表官方披露口径；引用请以信源链接的原始内容为准。';

/** 生成一个指向站点内页面的绝对 URL */
export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_URL).toString();
}
