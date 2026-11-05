/**
 * 正文 Markdown 的分节与引用处理工具。
 *
 * 正文由 Astro 自身的 Markdown 管线渲染。astro:content 的 render() 组件（<Content />）
 * 内部渲染的正是 entry.rendered.html；这里在构建期读取同一份渲染结果，按标题切成小节，
 * 使详情页能够逐节装配：
 * - 二级标题切分出「来龙去脉 / 历时性分析 / 共时性横向对标 / 七维深度分析 / 争议与不确定性 / 信源与核验」等小节；
 * - 七维深度分析内部再按三级标题切分为七个小节；
 * - 表格由正文 Markdown 解析后交给 TimelineTable / BenchmarkTable 等组件渲染，
 *   因此这里会把 HTML 中的表格片段剔除，避免同一张表出现两次。
 *
 * 注意：引用标记的链接化只做一次，由调用方在输出 HTML 前调用 linkifyCitations。
 */

/** 正文中的一级（Markdown 二级标题）小节 */
export interface BodySection {
  /** 标题锚点 id */
  id: string;
  /** 标题纯文本 */
  title: string;
  /** 该小节的正文 HTML（已剔除表格，未做引用链接化） */
  html: string;
}

/** 七维深度分析下的三级标题小节 */
export interface BodySubsection {
  /** 标题纯文本 */
  title: string;
  /** 该小节的正文 HTML */
  html: string;
}

/** 七维深度分析小节的切分结果 */
export interface BodySubsectionGroup {
  /** 首个三级标题之前的引言 HTML */
  lead: string;
  /** 七个小节 */
  chunks: BodySubsection[];
}

/** 匹配 HTML 标题标签的正则（捕获层级、id 与标题文本） */
const HEADING_REGEX = /<h([23]) id="([^"]*)">([\s\S]*?)<\/h\1>/g;

/** 匹配 HTML 表格片段的正则 */
const TABLE_REGEX = /<table[\s\S]*?<\/table>/g;

/** 匹配 Markdown 引用标记 [S1] 的正则 */
const CITATION_REGEX = /\[S(\d+)\]/g;

/**
 * 去掉字符串中的 HTML 标签，只保留纯文本。
 * @param html 含 HTML 的字符串
 * @returns 纯文本
 */
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

/**
 * 剔除 HTML 中的表格片段（表格改由专用组件渲染）。
 * @param html 含表格的 HTML
 * @returns 不含表格的 HTML
 */
export function stripTables(html: string): string {
  return html.replace(TABLE_REGEX, '').trim();
}

/**
 * 把正文中的 [S1] 引用标记转换为指向信源锚点的链接。
 * @param html 正文 HTML
 * @returns 含引用链接的 HTML
 */
export function linkifyCitations(html: string): string {
  return html.replace(
    CITATION_REGEX,
    (_match, id: string) => `<a class="cite" href="#source-${id}">[S${id}]</a>`,
  );
}

/**
 * 把渲染后的正文 HTML 按二级标题切成小节。
 * @param renderedHtml Astro 渲染出的正文 HTML
 * @returns 小节数组，顺序与正文一致
 */
export function splitBodySections(renderedHtml: string): BodySection[] {
  const matches = [...renderedHtml.matchAll(HEADING_REGEX)].filter((match) => match[1] === '2');
  return matches.map((match, index) => {
    const headingStart = match.index ?? 0;
    // 首个小节需要把首个标题之前的前言内容一并带上
    const start = index === 0 ? 0 : headingStart + match[0].length;
    const end =
      index + 1 < matches.length
        ? matches[index + 1].index ?? renderedHtml.length
        : renderedHtml.length;
    return {
      id: match[2],
      title: stripTags(match[3]),
      html: stripTables(renderedHtml.slice(start, end)),
    };
  });
}

/**
 * 把七维深度分析小节内部按三级标题切成七个小节。
 * @param sectionHtml 「七维深度分析」小节的 HTML
 * @returns 引言与七个小节
 */
export function splitSubsectionChunks(sectionHtml: string): BodySubsectionGroup {
  const matches = [...sectionHtml.matchAll(HEADING_REGEX)].filter((match) => match[1] === '3');
  const lead = matches.length > 0 ? sectionHtml.slice(0, matches[0].index ?? 0).trim() : sectionHtml.trim();
  const chunks = matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end =
      index + 1 < matches.length
        ? matches[index + 1].index ?? sectionHtml.length
        : sectionHtml.length;
    return {
      title: stripTags(match[3]),
      html: sectionHtml.slice(start, end).trim(),
    };
  });
  return { lead, chunks };
}

/**
 * 把表格单元格中的 [S1] 引用标记转换为指向信源锚点的链接。
 * @param text 单元格纯文本
 * @returns 含引用链接的 HTML
 */
export function cellCitations(text: string): string {
  return linkifyCitations(text);
}
