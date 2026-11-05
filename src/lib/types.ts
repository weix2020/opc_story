/**
 * 案例数据的前端类型定义。
 * 自定义插件（plugins/opc-projects.ts）在构建期解析 frontmatter 与正文后，
 * 以这些结构向首页（globalData）与详情页（路由模块 props）分发数据。
 */

/** 三个计数的聚合结构（阅读 / 点赞 / 分享） */
export interface MetricCounts {
  views: number;
  likes: number;
  shares: number;
}

/** 单条信源 */
export interface Source {
  id: number;
  title: string;
  publisher: string;
  publishedAt: string;
  accessedAt: string;
  type: string;
  url: string;
}

/** 首页卡片与排序所需的最小元数据集合 */
export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  founder: string;
  founded: string;
  launchDate: string;
  launchDatePrecision: string;
  hq: string;
  teamSize: string;
  category: string[];
  aiType: string;
  aiRole: string;
  funding: string;
  website: string;
  revenueEstimate: { value: string; basis: string; confidence: string };
  metrics: MetricCounts;
}

/** 时间线表格的一行 */
export interface TimelineRow {
  date: string;
  event: string;
  source: string;
}

/** 横向对标表格的一行 */
export interface BenchmarkRow {
  project: string;
  founded: string;
  teamSize: string;
  businessModel: string;
  revenue: string;
  funding: string;
  source: string;
}

/** 详情页导航上下文（上一 / 下一 / 同类别推荐） */
export interface ProjectNav {
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
  related: Array<{
    slug: string;
    title: string;
    categories: string[];
    launchDate: string;
    launchDatePrecision: string;
  }>;
}

/** 单篇案例的完整详情数据（构建期注入路由模块） */
export interface ProjectData extends ProjectMeta {
  /** 「来龙去脉」：散文 HTML（已剔除表格并链接化引用）+ 时间线数据行 */
  timeline: { prose: string; rows: TimelineRow[] };
  /** 「历时性分析」散文 HTML */
  history: { prose: string };
  /** 「共时性横向对标」：散文 HTML + 对标数据行 */
  benchmark: { prose: string; rows: BenchmarkRow[] };
  /** 「七维深度分析」：引言 HTML + 七个小节 */
  dimensions: { lead: string; chunks: Array<{ title: string; html: string }> };
  /** 「争议与不确定性」散文 HTML */
  controversy: { prose: string };
  /** 「信源与核验」散文 HTML + 信源列表 */
  verification: { prose: string; sources: Source[] };
  /** 上一 / 下一 / 同类别推荐 */
  nav: ProjectNav;
}
