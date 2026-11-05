#!/usr/bin/env node
/**
 * 内容校验脚本：逐篇检查 src/content/projects/*.md 是否符合内容契约。
 * 校验项与 Astro schema 共用 src/lib/content-contract.mjs 中的常量，避免规则重复实现。
 * 任何一篇不合格即以 exit code 1 结束，供 `npm run build` 前置拦截。
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import {
  AI_TYPES,
  BENCHMARK_MIN_ROWS,
  BENCHMARK_TABLE_HEADERS,
  MIN_AI_ROLE_LENGTH,
  MIN_DISTINCT_PUBLISHERS,
  MIN_PRIMARY_SOURCES,
  MIN_SOURCES,
  REQUIRED_DIMENSION_TITLES,
  REQUIRED_FRONTMATTER_PATHS,
  REQUIRED_SECTION_TITLES,
  TIMELINE_TABLE_HEADERS,
  extractCitations,
  extractSection,
  findMarkdownTable,
  getByPath,
  hasHeading,
  normalizePublisher,
  tableHasHeaders,
} from '../src/lib/content-contract.mjs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'projects');

/**
 * 校验单篇内容的 frontmatter 与正文，返回问题列表。
 * @param {Record<string, unknown>} data 解析后的 frontmatter
 * @param {string} body Markdown 正文
 * @returns {string[]} 问题列表，空数组表示通过
 */
function validateProject(data, body) {
  const problems = [];

  // 检查项 1：frontmatter 必填字段齐全、aiType 取值合法、aiRole 长度
  for (const path of REQUIRED_FRONTMATTER_PATHS) {
    const value = getByPath(data, path);
    if (value === undefined || value === null || value === '') {
      problems.push(`缺少必填字段 frontmatter.${path}`);
    }
  }
  if (data.aiType !== undefined && !AI_TYPES.includes(String(data.aiType))) {
    problems.push(`frontmatter.aiType 取值非法："${data.aiType}"，合法取值为 ${AI_TYPES.join(' / ')}`);
  }
  if (typeof data.aiRole === 'string' && data.aiRole.trim().length < MIN_AI_ROLE_LENGTH) {
    problems.push(`frontmatter.aiRole 长度不足 ${MIN_AI_ROLE_LENGTH} 字符（当前 ${data.aiRole.trim().length}）`);
  }

  const sources = Array.isArray(data.sources) ? data.sources : [];

  // 检查项 2：信源总数不少于 5
  if (sources.length < MIN_SOURCES) {
    problems.push(`信源数量不足：当前 ${sources.length} 条，至少需要 ${MIN_SOURCES} 条`);
  }

  // 检查项 3：至少 1 条 primary 信源
  const primaryCount = sources.filter((source) => source && source.type === 'primary').length;
  if (primaryCount < MIN_PRIMARY_SOURCES) {
    problems.push(`primary（一手信源）数量不足：当前 ${primaryCount} 条，至少需要 ${MIN_PRIMARY_SOURCES} 条`);
  }

  // 检查项 4：标准化去重后独立发布方不少于 2 个
  const publishers = new Set(
    sources
      .filter((source) => source && typeof source.publisher === 'string')
      .map((source) => normalizePublisher(source.publisher))
      .filter((publisher) => publisher.length > 0),
  );
  if (publishers.size < MIN_DISTINCT_PUBLISHERS) {
    problems.push(
      `独立信源不足：标准化后仅 ${publishers.size} 个不同发布方（${[...publishers].join('、') || '无'}），至少需要 ${MIN_DISTINCT_PUBLISHERS} 个`,
    );
  }

  // 检查项 5：正文包含全部必需标题
  for (const title of REQUIRED_SECTION_TITLES) {
    if (!hasHeading(body, title)) {
      problems.push(`正文缺少必需标题：## ${title}`);
    }
  }
  for (const title of REQUIRED_DIMENSION_TITLES) {
    if (!hasHeading(body, title)) {
      problems.push(`正文缺少必需标题：### ${title}`);
    }
  }

  // 检查项 6：来龙去脉章节含时间线表格
  const timelineSection = extractSection(body, '来龙去脉');
  const timelineTable = findMarkdownTable(timelineSection);
  if (!timelineTable) {
    problems.push('「来龙去脉」章节缺少 Markdown 时间线表格');
  } else if (!tableHasHeaders(timelineTable, TIMELINE_TABLE_HEADERS)) {
    problems.push(
      `时间线表格表头必须同时包含「${TIMELINE_TABLE_HEADERS.join('」「')}」，当前为：${timelineTable.headers.join(' | ')}`,
    );
  }

  // 检查项 7：共时性横向对标章节含对标表格且至少 3 行数据
  const benchmarkSection = extractSection(body, '共时性横向对标');
  const benchmarkTable = findMarkdownTable(benchmarkSection);
  if (!benchmarkTable) {
    problems.push('「共时性横向对标」章节缺少 Markdown 对标表格');
  } else if (!tableHasHeaders(benchmarkTable, BENCHMARK_TABLE_HEADERS)) {
    problems.push(
      `横向对标表格表头必须同时包含「${BENCHMARK_TABLE_HEADERS.join('」「')}」，当前为：${benchmarkTable.headers.join(' | ')}`,
    );
  } else if (benchmarkTable.rows.length < BENCHMARK_MIN_ROWS) {
    problems.push(
      `横向对标表格数据行不足：当前 ${benchmarkTable.rows.length} 行，至少需要 ${BENCHMARK_MIN_ROWS} 行`,
    );
  }

  // 检查项 8：正文引用编号与 frontmatter 信源 id 双向一致
  const citedIds = extractCitations(body);
  const sourceIds = new Set(
    sources.filter((source) => source && typeof source.id === 'number').map((source) => source.id),
  );
  const dangling = citedIds.filter((id) => !sourceIds.has(id));
  if (dangling.length > 0) {
    problems.push(`正文引用了 frontmatter 中不存在的信源编号：${dangling.map((id) => `[S${id}]`).join('、')}`);
  }
  const uncited = [...sourceIds].filter((id) => !citedIds.includes(id));
  if (uncited.length > 0) {
    problems.push(`以下信源在正文中从未被引用：${uncited.map((id) => `[S${id}]`).join('、')}`);
  }

  // 检查项 9：launchDate 可被 Date 解析
  if (data.launchDate !== undefined && Number.isNaN(new Date(String(data.launchDate)).getTime())) {
    problems.push(`frontmatter.launchDate 无法被解析为日期："${data.launchDate}"`);
  }

  return problems;
}

/**
 * 主流程：扫描内容目录并逐篇校验，输出结果汇总。
 * 支持通过命令行参数按文件名或 slug 过滤，只校验指定的若干篇。
 * @returns {void}
 */
function main() {
  const filters = process.argv.slice(2).map((arg) => arg.trim().toLowerCase()).filter(Boolean);

  let files = [];
  try {
    files = readdirSync(CONTENT_DIR)
      .filter((name) => name.endsWith('.md'))
      .sort();
  } catch (error) {
    console.error(`[FAIL] 无法读取内容目录 ${CONTENT_DIR}：${error.message}`);
    process.exit(1);
  }

  // 按命令行过滤条件筛选目标文件（匹配文件名不含扩展名或 frontmatter.slug）
  if (filters.length > 0) {
    files = files.filter((name) => {
      const key = basename(name, '.md').toLowerCase();
      if (filters.includes(key)) return true;
      try {
        const raw = readFileSync(join(CONTENT_DIR, name), 'utf-8');
        const { data } = matter(raw);
        return typeof data.slug === 'string' && filters.includes(data.slug.toLowerCase());
      } catch {
        return false;
      }
    });
    if (files.length === 0) {
      console.log(`未匹配到任何内容文件（过滤条件：${filters.join('、')}）。`);
      return;
    }
  }

  if (files.length === 0) {
    console.log(`内容目录为空：${CONTENT_DIR}（暂无案例内容，跳过校验）`);
    console.log('校验完成：文件总数 0，检查项总数 0，全部通过。');
    return;
  }

  const failed = [];
  let checkCount = 0;

  for (const name of files) {
    const filePath = join(CONTENT_DIR, name);
    let problems = [];

    try {
      const raw = readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);
      problems = validateProject(data, content);
    } catch (error) {
      problems = [`文件解析失败：${error.message}`];
    }

    checkCount += 9;
    if (problems.length === 0) {
      console.log(`[OK] ${name}`);
    } else {
      failed.push(name);
      console.log(`[FAIL] ${name}`);
      for (const problem of problems) {
        console.log(`    - ${problem}`);
      }
    }
  }

  console.log('');
  console.log(`校验完成：文件总数 ${files.length}，检查项总数 ${checkCount}。`);
  if (failed.length > 0) {
    console.log(`结果：${failed.length} 篇不合格（${failed.join('、')}）。`);
    process.exit(1);
  }
  console.log('结果：全部通过。');
}

main();
