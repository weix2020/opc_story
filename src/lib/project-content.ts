/**
 * 从案例正文中解析结构化数据（时间线表、横向对标表）。
 * 解析规则复用 src/lib/content-contract.mjs 中与校验脚本相同的实现，保证页面与校验口径一致。
 */
import {
  extractSection,
  findMarkdownTable,
  tableHasHeaders,
  TIMELINE_TABLE_HEADERS,
  BENCHMARK_TABLE_HEADERS,
} from './content-contract.mjs';

/** 时间线表格的一行 */
export interface TimelineRow {
  /** 日期 */
  date: string;
  /** 事件描述 */
  event: string;
  /** 信源标记（如 [S1]） */
  source: string;
}

/** 横向对标表格的一行 */
export interface BenchmarkRow {
  /** 对标项目名称 */
  project: string;
  /** 成立时间 */
  founded: string;
  /** 团队规模 */
  teamSize: string;
  /** 变现模式 */
  businessModel: string;
  /** 营收规模 */
  revenue: string;
  /** 融资状态 */
  funding: string;
  /** 信源标记（如 [S1]） */
  source: string;
}

/**
 * 在表头数组中查找包含指定关键词的列下标。
 * @param headers 表头数组
 * @param keyword 关键词
 * @returns 列下标；未找到返回 -1
 */
function columnIndex(headers: string[], keyword: string): number {
  return headers.findIndex((header) => header.includes(keyword));
}

/**
 * 读取指定列的单元格文本，列不存在时返回空字符串。
 * @param row 数据行
 * @param index 列下标
 * @returns 单元格文本
 */
function cell(row: string[], index: number): string {
  return index >= 0 && index < row.length ? row[index] : '';
}

/**
 * 从正文 Markdown 中解析「来龙去脉」章节的时间线表格。
 * @param body 正文 Markdown 原文
 * @returns 时间线数据行；未找到合法表格时返回空数组
 */
export function parseTimelineRows(body: string): TimelineRow[] {
  const section = extractSection(body, '来龙去脉');
  const table = findMarkdownTable(section);
  if (!table || !tableHasHeaders(table, TIMELINE_TABLE_HEADERS)) return [];

  const dateIndex = columnIndex(table.headers, '日期');
  const eventIndex = columnIndex(table.headers, '事件');
  const sourceIndex = columnIndex(table.headers, '信源');

  return table.rows.map((row) => ({
    date: cell(row, dateIndex),
    event: cell(row, eventIndex),
    source: cell(row, sourceIndex),
  }));
}

/**
 * 从正文 Markdown 中解析「共时性横向对标」章节的对标表格。
 * @param body 正文 Markdown 原文
 * @returns 对标数据行；未找到合法表格时返回空数组
 */
export function parseBenchmarkRows(body: string): BenchmarkRow[] {
  const section = extractSection(body, '共时性横向对标');
  const table = findMarkdownTable(section);
  if (!table || !tableHasHeaders(table, BENCHMARK_TABLE_HEADERS)) return [];

  const projectIndex = columnIndex(table.headers, '对标项目');
  const foundedIndex = columnIndex(table.headers, '成立时间');
  const teamIndex = columnIndex(table.headers, '团队规模');
  const modelIndex = columnIndex(table.headers, '变现模式');
  const revenueIndex = columnIndex(table.headers, '营收规模');
  const fundingIndex = columnIndex(table.headers, '融资状态');
  const sourceIndex = columnIndex(table.headers, '信源');

  return table.rows.map((row) => ({
    project: cell(row, projectIndex),
    founded: cell(row, foundedIndex),
    teamSize: cell(row, teamIndex),
    businessModel: cell(row, modelIndex),
    revenue: cell(row, revenueIndex),
    funding: cell(row, fundingIndex),
    source: cell(row, sourceIndex),
  }));
}
