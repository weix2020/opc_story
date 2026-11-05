/**
 * 首页：案例列表（含右下角阅读/点赞/分享三数值）+ 关键词搜索 + 类别/AI 类型双维筛选。
 * 排序规则：上线时间降序 → 阅读量（本地有效值）降序；本地增量在挂载后叠加。
 */
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import ProjectCard from '../components/ProjectCard';
import { CATEGORIES } from '../lib/content-contract.mjs';
import { AI_TYPE_LABELS } from '../lib/labels';
import { compareProjects } from '../lib/sorting';
import { configureMetrics, getLocalCounts } from '../lib/metrics';
import { DATA_SOURCES, SITE_DESCRIPTION, SITE_TAGLINE } from '../lib/site';
import type { MetricCounts } from '../lib/metrics';
import type { ProjectMeta } from '../lib/types';

/** 插件 globalData 的结构 */
interface OpcGlobalData {
  projects: ProjectMeta[];
}

/** 首页组件 */
export default function HomePage() {
  const { siteConfig } = useDocusaurusContext();
  const { projects } = usePluginData('opc-projects') as unknown as OpcGlobalData;
  const total = projects.length;

  const [keyword, setKeyword] = useState('');
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());
  const [activeAiTypes, setActiveAiTypes] = useState<Set<string>>(new Set());
  // 挂载标记：首次渲染使用种子计数保证 SSR 一致，挂载后叠加本地增量并重排
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    configureMetrics(siteConfig.customFields?.metricsEndpoint as string | undefined);
    setMounted(true);
  }, [siteConfig]);

  /**
   * 计算案例当前的本地有效计数（种子值 + 本地增量）。
   * @param project 案例元数据
   * @returns 有效计数
   */
  const effectiveCounts = (project: ProjectMeta): MetricCounts =>
    mounted ? getLocalCounts(project.slug, project.metrics) : project.metrics;

  /**
   * 判断案例是否命中当前筛选条件。
   * @param project 案例元数据
   * @returns 是否命中
   */
  const matches = (project: ProjectMeta): boolean => {
    if (activeCategories.size > 0 && !project.category.some((item) => activeCategories.has(item))) {
      return false;
    }
    if (activeAiTypes.size > 0 && !activeAiTypes.has(project.aiType)) return false;
    if (keyword) {
      const haystack = [project.title, project.summary, project.founder, ...project.category]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  };

  // 筛选 + 排序：上线时间降序 → 阅读量（本地有效值）降序
  const visible = useMemo(() => {
    return projects
      .filter(matches)
      .sort((a, b) =>
        compareProjects(
          { launchDate: a.launchDate, views: effectiveCounts(a).views, slug: a.slug },
          { launchDate: b.launchDate, views: effectiveCounts(b).views, slug: b.slug },
        ),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, keyword, activeCategories, activeAiTypes, mounted]);

  /**
   * 切换某个筛选值（多选）。
   * @param setter 当前选中集合的 state setter
   * @param value 待切换的取值
   */
  const toggle = (setter: Dispatch<SetStateAction<Set<string>>>, value: string): void => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  return (
    <Layout title={SITE_TAGLINE} description={SITE_DESCRIPTION}>
      <main className="container main">
        <section className="hero">
          <h1 className="hero-title">{SITE_TAGLINE}</h1>
          <p className="hero-lead">
            本站收录全球范围内<strong>由单人创立、且以 AI 作为核心生产力</strong>的公司案例，
            逐篇记录其成立背景、历时性节奏、同期横向对标、七维深度拆解与争议点，
            并为每条结论标注信源与置信度。
          </p>
          <dl className="hero-stats">
            <div className="hero-stat">
              <dt>收录案例</dt>
              <dd>{total}</dd>
            </div>
            <div className="hero-stat">
              <dt>类别覆盖</dt>
              <dd>{CATEGORIES.length}</dd>
            </div>
            <div className="hero-stat">
              <dt>信源类型</dt>
              <dd>5 类</dd>
            </div>
          </dl>
          <p className="hero-note">收录口径：{DATA_SOURCES}</p>
        </section>

        <section className="filters" aria-label="案例筛选">
          <div className="filter-row">
            <label className="filter-search">
              <span className="filter-label">关键词</span>
              <input
                type="search"
                placeholder="搜索标题、简介、创始人或类别"
                autoComplete="off"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value.trim().toLowerCase())}
              />
            </label>
            <p className="filter-count" aria-live="polite">
              共 {visible.length} 个案例
            </p>
          </div>

          <div className="filter-row">
            <span className="filter-label">类别</span>
            <div className="filter-buttons" role="group" aria-label="按类别筛选">
              {CATEGORIES.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={`filter-button${activeCategories.has(category) ? ' is-active' : ''}`}
                  aria-pressed={activeCategories.has(category)}
                  onClick={() => toggle(setActiveCategories, category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">AI 契合类型</span>
            <div className="filter-buttons" role="group" aria-label="按 AI 契合类型筛选">
              {Object.entries(AI_TYPE_LABELS).map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={`filter-button${activeAiTypes.has(value) ? ' is-active' : ''}`}
                  aria-pressed={activeAiTypes.has(value)}
                  onClick={() => toggle(setActiveAiTypes, value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {total === 0 ? (
          <section className="article">
            <h2>案例内容尚未导入</h2>
            <p className="meta">
              内容目录 <code>src/content/projects/</code> 当前为空，后续将批量写入案例。
            </p>
          </section>
        ) : (
          <section className="grid" data-project-grid>
            {visible.map((project) => (
              <ProjectCard project={project} counts={effectiveCounts(project)} key={project.slug} />
            ))}
          </section>
        )}

        {visible.length === 0 && total > 0 && (
          <p className="empty-state">没有匹配的案例，换个关键词或调整筛选条件试试。</p>
        )}
      </main>
    </Layout>
  );
}
