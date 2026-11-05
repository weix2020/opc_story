/**
 * 自定义 Docusaurus 插件：加载 src/content/projects/*.md 的 50 篇案例，
 * 构建期解析 frontmatter 与正文，并：
 * 1. 通过 globalData 向首页分发排序后的案例元数据（插件名 opc-projects）；
 * 2. 为每个 slug 生成 /projects/:slug 静态路由，详情数据经路由模块 props 注入。
 *
 * 内容文件保持 Astro 版本的原目录与格式不变；校验规则仍由 scripts/validate-content.mjs
 * （构建前置）把关，本插件只负责解析与装配。
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import GithubSlugger from 'github-slugger';
import { parseTimelineRows, parseBenchmarkRows } from '../src/lib/project-content';
import { splitBodySections, splitSubsectionChunks, linkifyCitations } from '../src/lib/body-sections';
import { sortProjects } from '../src/lib/sorting';
import type { ProjectData, ProjectMeta, Source } from '../src/lib/types';

/** 内容目录（与 Astro 版本保持一致） */
const CONTENT_DIR = join(__dirname, '..', 'src', 'content', 'projects');

/**
 * 将 Markdown 正文渲染为 HTML，并为 h2/h3 注入标题锚点 id（与 Astro 的 slugger 行为一致）。
 * @param body Markdown 正文
 * @returns 渲染后的 HTML
 */
function renderMarkdown(body: string): string {
  const html = marked.parse(body, { async: false }) as string;
  const slugger = new GithubSlugger();
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = slugger.slug(text);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

/**
 * 剔除小节 HTML 开头的二级标题（页面会自行渲染小节标题，避免重复）。
 * @param html 小节 HTML
 * @returns 去掉首个 h2 后的 HTML
 */
function stripLeadingHeading(html: string): string {
  return html.replace(/^<h2[^>]*>[\s\S]*?<\/h2>/, '').trim();
}

/**
 * 读取并解析单篇案例 Markdown，装配为详情页所需的数据结构。
 * @param filePath 内容文件路径
 * @returns 完整案例数据
 */
function loadProject(filePath: string): ProjectData {
  const raw = readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: body } = matter(raw);
  const html = renderMarkdown(body);

  // 正文按二级标题切分；表格改由专用组件渲染
  const sections = splitBodySections(html);
  const sectionByTitle = (title: string) => sections.find((section) => section.title === title);

  const timelineSection = sectionByTitle('来龙去脉');
  const historySection = sectionByTitle('历时性分析');
  const benchmarkSection = sectionByTitle('共时性横向对标');
  const dimensionSection = sectionByTitle('七维深度分析');
  const controversySection = sectionByTitle('争议与不确定性');
  const verificationSection = sectionByTitle('信源与核验');

  const { lead: dimensionLead, chunks: dimensionChunks } = splitSubsectionChunks(
    dimensionSection?.html ?? '',
  );

  const meta: ProjectMeta = {
    slug: String(frontmatter.slug),
    title: String(frontmatter.title),
    summary: String(frontmatter.summary),
    founder: String(frontmatter.founder),
    founded: String(frontmatter.founded),
    launchDate: String(frontmatter.launchDate),
    launchDatePrecision: String(frontmatter.launchDatePrecision),
    hq: String(frontmatter.hq),
    teamSize: String(frontmatter.teamSize),
    category: (frontmatter.category as string[]) ?? [],
    aiType: String(frontmatter.aiType),
    aiRole: String(frontmatter.aiRole),
    funding: String(frontmatter.funding),
    website: String(frontmatter.website),
    revenueEstimate: frontmatter.revenueEstimate as ProjectMeta['revenueEstimate'],
    metrics: frontmatter.metrics as ProjectMeta['metrics'],
  };

  const sources = (frontmatter.sources as Source[]) ?? [];

  return {
    ...meta,
    timeline: {
      prose: linkifyCitations(stripLeadingHeading(timelineSection?.html ?? '')),
      rows: parseTimelineRows(body),
    },
    history: { prose: linkifyCitations(historySection?.html ?? '') },
    benchmark: {
      prose: linkifyCitations(stripLeadingHeading(benchmarkSection?.html ?? '')),
      rows: parseBenchmarkRows(body),
    },
    dimensions: {
      lead: linkifyCitations(dimensionLead),
      chunks: dimensionChunks.map((chunk) => ({ title: chunk.title, html: linkifyCitations(chunk.html) })),
    },
    controversy: { prose: linkifyCitations(controversySection?.html ?? '') },
    verification: { prose: linkifyCitations(verificationSection?.html ?? ''), sources },
    nav: { prev: undefined, next: undefined, related: [] },
  };
}

/**
 * 计算上一 / 下一 / 同类别推荐导航（与首页使用同一排序规则）。
 * @param sorted 全部案例（已按统一规则排序）
 * @returns 无返回值；原地写回每个案例的 nav 字段
 */
function wireNav(sorted: ProjectData[]): void {
  sorted.forEach((project, index) => {
    project.nav.prev = index > 0 ? { slug: sorted[index - 1].slug, title: sorted[index - 1].title } : undefined;
    project.nav.next =
      index < sorted.length - 1 ? { slug: sorted[index + 1].slug, title: sorted[index + 1].title } : undefined;
    project.nav.related = sorted
      .filter((item) => item.slug !== project.slug)
      .filter((item) => item.category.some((category) => project.category.includes(category)))
      .slice(0, 4)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        categories: item.category,
        launchDate: item.launchDate,
        launchDatePrecision: item.launchDatePrecision,
      }));
  });
}

/**
 * 从完整案例数据中摘出首页所需的元数据（剔除正文 HTML 与导航上下文）。
 * @param project 完整案例数据
 * @returns 首页元数据
 */
function pickMeta(project: ProjectData): ProjectMeta {
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    founder: project.founder,
    founded: project.founded,
    launchDate: project.launchDate,
    launchDatePrecision: project.launchDatePrecision,
    hq: project.hq,
    teamSize: project.teamSize,
    category: project.category,
    aiType: project.aiType,
    aiRole: project.aiRole,
    funding: project.funding,
    website: project.website,
    revenueEstimate: project.revenueEstimate,
    metrics: project.metrics,
  };
}

/** 插件工厂：返回 Docusaurus 插件定义 */
export default function opcProjectsPlugin() {
  return {
    name: 'opc-projects',

    /** 构建期加载并解析全部案例内容 */
    loadContent(): { projects: ProjectData[] } {
      let files: string[] = [];
      try {
        files = readdirSync(CONTENT_DIR)
          .filter((name) => name.endsWith('.md'))
          .sort();
      } catch (error) {
        throw new Error(`无法读取内容目录 ${CONTENT_DIR}：${(error as Error).message}`);
      }

      const projects = files.map((name) => loadProject(join(CONTENT_DIR, name)));
      const sorted = sortProjects(
        projects.map((project) => ({
          slug: project.slug,
          launchDate: project.launchDate,
          views: project.metrics.views,
          project,
        })),
      ).map((item) => item.project);

      wireNav(sorted);
      return { projects: sorted };
    },

    /** 注册详情页路由并向首页分发元数据 */
    async contentLoaded({
      content,
      actions,
    }: {
      content: { projects: ProjectData[] };
      actions: {
        addRoute: (route: unknown) => void;
        setGlobalData: (data: unknown) => void;
        /** 把内容序列化写入 .docusaurus 临时目录，返回可被 bundle 引用的文件路径 */
        createData: (name: string, content: string) => Promise<string>;
      };
    }): Promise<void> {
      const { addRoute, setGlobalData, createData } = actions;

      // 首页数据：仅元数据（不含正文 HTML），控制在 globalData 体积内
      setGlobalData({ projects: content.projects.map(pickMeta) });

      for (const project of content.projects) {
        // 路由模块只接受文件路径：每篇详情数据先落盘为 JSON，再以模块形式注入 props
        const dataPath = await createData(`opc-project-${project.slug}.json`, JSON.stringify(project));
        addRoute({
          path: `/projects/${project.slug}`,
          component: '@site/src/components/ProjectDetailPage',
          exact: true,
          modules: { project: dataPath },
        });
      }
    },
  };
}