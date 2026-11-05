/**
 * 内容契约共享常量与纯函数。
 * 该文件被 `src/content.config.ts`（Astro schema）与 `scripts/validate-content.mjs`（校验脚本）共同引用，
 * 保证"取值枚举 / 必填标题 / 表格结构"等规则只有一份定义，避免两处实现漂移。
 */

/** 合法的 category 标签枚举 */
/** @type {readonly ['AI生成', 'AI助手', 'Agent', '开发者工具', '内容创作', '教育', '垂直应用', '基础设施']} */
export const CATEGORIES = [
  'AI生成',
  'AI助手',
  'Agent',
  '开发者工具',
  '内容创作',
  '教育',
  '垂直应用',
  '基础设施',
];

/** 合法的 aiType 枚举 */
/** @type {readonly ['ai-native', 'ai-embedded', 'ai-enabled-ops']} */
export const AI_TYPES = ['ai-native', 'ai-embedded', 'ai-enabled-ops'];

/** 合法的信源类型枚举 */
/** @type {readonly ['primary', 'secondary', 'database', 'aggregator', 'community']} */
export const SOURCE_TYPES = ['primary', 'secondary', 'database', 'aggregator', 'community'];

/** 合法的营收推算置信度枚举 */
/** @type {readonly ['A', 'B', 'C']} */
export const CONFIDENCE_LEVELS = ['A', 'B', 'C'];

/** 合法的 launchDate 精度枚举 */
/** @type {readonly ['day', 'month', 'year']} */
export const LAUNCH_DATE_PRECISIONS = ['day', 'month', 'year'];

/** 正文必须存在的二级标题（不含 # 前缀） */
export const REQUIRED_SECTION_TITLES = [
  '来龙去脉',
  '历时性分析',
  '共时性横向对标',
  '七维深度分析',
  '争议与不确定性',
  '信源与核验',
];

/** 正文"七维深度分析"下必须存在的三级标题（不含 # 前缀） */
export const REQUIRED_DIMENSION_TITLES = [
  '1. 产品功能',
  '2. 面向客群',
  '3. 解决痛点',
  '4. 预估年化营收',
  '5. 融资进展',
  '6. 市场评价',
  '7. 投入成本与合规风险',
];

/**
 * frontmatter 必填字段路径清单（校验脚本据此判断"必填字段齐全"）。
 * 嵌套字段使用点号路径，如 revenueEstimate.value。
 */
export const REQUIRED_FRONTMATTER_PATHS = [
  'title',
  'slug',
  'summary',
  'founder',
  'founded',
  'launchDate',
  'launchDatePrecision',
  'hq',
  'teamSize',
  'category',
  'aiType',
  'aiRole',
  'revenueEstimate',
  'revenueEstimate.value',
  'revenueEstimate.basis',
  'revenueEstimate.confidence',
  'funding',
  'website',
  'metrics',
  'metrics.views',
  'metrics.likes',
  'metrics.shares',
  'dimensions',
  'dimensions.product',
  'dimensions.audience',
  'dimensions.painPoint',
  'dimensions.revenue',
  'dimensions.funding',
  'dimensions.evaluation',
  'dimensions.costRisk',
  'sources',
];

/** 时间线表格必须包含的表头关键词 */
export const TIMELINE_TABLE_HEADERS = ['日期', '信源'];

/** 横向对标表格必须包含的表头关键词 */
export const BENCHMARK_TABLE_HEADERS = ['对标项目', '信源'];

/** 横向对标表格最少数据行数（不含表头与分隔行） */
export const BENCHMARK_MIN_ROWS = 3;

/** 单篇内容最少信源数量 */
export const MIN_SOURCES = 5;

/** 单篇内容最少 primary（一手信源）数量 */
export const MIN_PRIMARY_SOURCES = 1;

/** 单篇内容最少独立发布方数量（按标准化后的 publisher 去重） */
export const MIN_DISTINCT_PUBLISHERS = 2;

/** aiRole 最少字符数 */
export const MIN_AI_ROLE_LENGTH = 15;

/** summary 最长字符数 */
export const MAX_SUMMARY_LENGTH = 120;

/**
 * 标准化发布方名称，用于判定信源是否彼此独立。
 * 规则：转小写、去首尾空白、去掉开头定冠词 The/the、去掉结尾的 ", Inc." / ", Ltd." 等公司后缀。
 * @param {unknown} publisher 原始发布方名称
 * @returns {string} 标准化后的发布方名称
 */
export function normalizePublisher(publisher) {
  if (typeof publisher !== 'string') return '';
  return publisher
    .trim()
    .toLowerCase()
    .replace(/^the\s+/, '')
    .replace(/[,.\s]+(inc|ltd|llc|co|corp|gmbh|plc)\.?$/, '')
    .trim();
}

/**
 * 从正文抽取全部 [S<n>] 形式的信源引用编号。
 * @param {string} body Markdown 正文
 * @returns {number[]} 去重后的引用编号数组
 */
export function extractCitations(body) {
  const ids = new Set();
  const regex = /\[S(\d+)\]/g;
  let match;
  while ((match = regex.exec(body)) !== null) {
    ids.add(Number.parseInt(match[1], 10));
  }
  return [...ids];
}

/**
 * 在文本中查找 Markdown 表格。
 * @param {string} text 待检索文本
 * @returns {{headers: string[], rows: string[][]} | null} 解析出的表格；未找到返回 null
 */
export function findMarkdownTable(text) {
  const lines = text.split('\n').map((line) => line.trim());
  const tableLines = [];
  for (const line of lines) {
    if (/^\|.*\|$/.test(line)) {
      tableLines.push(line);
      continue;
    }
    if (tableLines.length > 0) break;
  }
  if (tableLines.length < 2) return null;

  const splitRow = (row) =>
    row
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());

  const headers = splitRow(tableLines[0]);
  // 第二行必须是分隔行（|---|---|），否则不认为是合法表格
  if (!/^\|[\s:|-]+\|$/.test(tableLines[1])) return null;
  const rows = tableLines.slice(2).map(splitRow);
  return { headers, rows };
}

/**
 * 判断表格的表头是否同时包含给定的关键词。
 * @param {{headers: string[]} | null} table 表格对象
 * @param {string[]} keywords 关键词数组
 * @returns {boolean} 是否全部包含
 */
export function tableHasHeaders(table, keywords) {
  if (!table) return false;
  const headers = table.headers.join(' ');
  return keywords.every((keyword) => headers.includes(keyword));
}

/**
 * 截取某个标题之后、下一个标题之前的正文片段。
 * @param {string} body 完整 Markdown 正文
 * @param {string} title 目标标题文本（不含 # 前缀）
 * @returns {string} 片段内容；未找到标题返回空字符串
 */
export function extractSection(body, title) {
  const lines = body.split('\n');
  const titleRegex = new RegExp(`^#{1,6}\\s*${escapeRegExp(title)}\\s*$`);
  let start = -1;
  for (let i = 0; i < lines.length; i++) {
    if (titleRegex.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }
  if (start === -1) return '';

  const section = [];
  for (let i = start; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i].trim())) break;
    section.push(lines[i]);
  }
  return section.join('\n');
}

/**
 * 判断正文中是否存在指定标题（允许标题前后有空格）。
 * @param {string} body 完整 Markdown 正文
 * @param {string} title 标题文本（不含 # 前缀）
 * @returns {boolean} 是否存在
 */
export function hasHeading(body, title) {
  const titleRegex = new RegExp(`^#{1,6}\\s*${escapeRegExp(title)}\\s*$`);
  return body.split('\n').some((line) => titleRegex.test(line.trim()));
}

/**
 * 按点号路径读取对象属性，缺失时返回 undefined。
 * @param {Record<string, unknown>} data 数据对象
 * @param {string} path 点号路径
 * @returns {unknown} 属性值
 */
export function getByPath(data, path) {
  return path.split('.').reduce((acc, key) => {
    if (acc === null || acc === undefined || typeof acc !== 'object') return undefined;
    return acc[key];
  }, data);
}

/**
 * 转义正则表达式中的特殊字符。
 * @param {string} value 原始字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
