/**
 * 案例详情页（由插件注册为 /projects/:slug 路由组件）。
 * 数据在构建期经路由模块 props 注入，正文 HTML 已完成分节与引用链接化；
 * 本组件负责页面装配、互动计数（阅读/点赞/分享）与导航。
 */
import { useEffect, useRef, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import AiTypeTag from './AiTypeTag';
import ConfidenceTag from './ConfidenceTag';
import MetricIcon from './MetricIcon';
import SourceList from './SourceList';
import TimelineTable from './TimelineTable';
import BenchmarkTable from './BenchmarkTable';
import DimensionSection from './DimensionSection';
import { configureMetrics, formatCount, getLocalCounts, mergeCounts, recordShare, recordView, readLocalState, toggleLike, postRemoteDelta, fetchRemoteCounts } from '../lib/metrics';
import type { MetricCounts } from '../lib/metrics';
import { formatLaunchDate } from '../lib/labels';
import { normalizePublisher } from '../lib/content-contract.mjs';
import type { ProjectData } from '../lib/types';

interface Props {
  /** 构建期注入的案例详情数据 */
  project: ProjectData;
}

/** 详情页组件 */
export default function ProjectDetailPage({ project }: Props) {
  const { siteConfig } = useDocusaurusContext();

  // 互动计数状态：SSR/首帧渲染种子值，挂载后叠加本地增量与远端聚合
  const seed = project.metrics;
  const [counts, setCounts] = useState<MetricCounts>(seed);
  const [liked, setLiked] = useState(false);
  /** 缓存远端聚合计数，点赞/分享后仍能与本地增量合并展示 */
  const remoteRef = useRef<MetricCounts | null>(null);

  useEffect(() => {
    // 注入远程计数端点；未配置时保持纯本地模式
    configureMetrics(siteConfig.customFields?.metricsEndpoint as string | undefined);
    // 进入详情页即计一次阅读（同一会话同一案例只计一次）
    recordView(project.slug);
    setLiked(readLocalState(project.slug).liked);
    // 远程模式：拉取远端聚合并合并展示；完成后刷新展示值
    void fetchRemoteCounts(project.slug).then((remote) => {
      remoteRef.current = remote;
      setCounts(paintCounts());
    });
    setCounts(paintCounts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug]);

  /** 计算当前应展示的计数：远端绝对值 + 未同步本地增量，或种子值 + 本地增量 */
  const paintCounts = (): MetricCounts => {
    const remote = remoteRef.current;
    return remote ? mergeCounts(project.slug, seed, remote) : getLocalCounts(project.slug, seed);
  };

  /** 点赞切换：本地状态 + 远端增量提交 */
  const handleLike = (): void => {
    const next = toggleLike(project.slug);
    setLiked(next);
    void postRemoteDelta(project.slug, 'likes', next ? 1 : -1);
    setCounts(paintCounts());
  };

  /** 分享计数：本地累加 + 远端增量提交，并尽可能调用系统分享 */
  const handleShare = (): void => {
    recordShare(project.slug);
    void postRemoteDelta(project.slug, 'shares', 1);
    setCounts(paintCounts());
    const shareData = { title: document.title, url: window.location.href };
    if (navigator.share) {
      navigator.share(shareData).catch(() => undefined);
    } else if (navigator.clipboard) {
      void navigator.clipboard.writeText(window.location.href).catch(() => undefined);
    }
  };

  // 核验统计
  const sources = project.verification.sources;
  const sourceCount = sources.length;
  const primaryCount = sources.filter((source) => source.type === 'primary').length;
  const publisherCount = new Set(sources.map((source) => normalizePublisher(source.publisher)).filter(Boolean)).size;

  const launchLabel = formatLaunchDate(project.launchDate, project.launchDatePrecision);

  return (
    <Layout
      title={project.title}
      description={project.summary}
    >
      <main className="container main">
        <article className="article detail" data-project-detail={project.slug}>
          <nav className="breadcrumb" aria-label="面包屑">
            <Link to="/">首页</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.title}</span>
          </nav>

          <header className="detail-head">
            <h1 className="detail-title">{project.title}</h1>
            <div className="tags">
              {project.category.map((category) => (
                <span className="tag" key={category}>
                  {category}
                </span>
              ))}
              <AiTypeTag type={project.aiType} />
            </div>
          </header>

          <section className="overview" aria-label="速览">
            <p className="overview-summary">{project.summary}</p>
            <dl className="overview-grid">
              <div className="overview-item">
                <dt>创始人</dt>
                <dd>{project.founder}</dd>
              </div>
              <div className="overview-item">
                <dt>成立年份</dt>
                <dd>{project.founded}</dd>
              </div>
              <div className="overview-item">
                <dt>上线时间</dt>
                <dd>{launchLabel}</dd>
              </div>
              <div className="overview-item">
                <dt>总部</dt>
                <dd>{project.hq}</dd>
              </div>
              <div className="overview-item">
                <dt>当前团队规模</dt>
                <dd>{project.teamSize}</dd>
              </div>
              <div className="overview-item">
                <dt>融资状态</dt>
                <dd>{project.funding}</dd>
              </div>
              <div className="overview-item overview-item-wide">
                <dt>营收预估</dt>
                <dd>
                  <strong>{project.revenueEstimate.value}</strong>
                  <ConfidenceTag level={project.revenueEstimate.confidence} withTitle />
                  <span className="overview-basis">推算方法：{project.revenueEstimate.basis}</span>
                </dd>
              </div>
              <div className="overview-item overview-item-wide">
                <dt>AI 作用</dt>
                <dd>
                  <AiTypeTag type={project.aiType} withTitle />
                  <span className="overview-basis">{project.aiRole}</span>
                </dd>
              </div>
              <div className="overview-item overview-item-wide">
                <dt>官网</dt>
                <dd>
                  <a href={project.website} target="_blank" rel="noopener noreferrer">
                    {project.website}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section className="detail-actions" aria-label="互动">
            <div className="detail-metrics">
              <span className="metric" data-metric="views" title="阅读量">
                <MetricIcon name="views" />
                <span data-value>{formatCount(counts.views)}</span>
              </span>
              <span className="metric" data-metric="likes" title="点赞量">
                <MetricIcon name="likes" />
                <span data-value>{formatCount(counts.likes)}</span>
              </span>
              <span className="metric" data-metric="shares" title="分享量">
                <MetricIcon name="shares" />
                <span data-value>{formatCount(counts.shares)}</span>
              </span>
            </div>
            <div className="action-buttons">
              <button
                type="button"
                className={`action-button${liked ? ' is-liked' : ''}`}
                data-action="like"
                aria-pressed={liked}
                onClick={handleLike}
              >
                <MetricIcon name="likes" />
                <span>点赞</span>
              </button>
              <button type="button" className="action-button" data-action="share" onClick={handleShare}>
                <MetricIcon name="shares" />
                <span>分享</span>
              </button>
            </div>
          </section>

          {project.timeline.rows.length > 0 || project.timeline.prose ? (
            <section className="prose-section" id="来龙去脉">
              <h2>来龙去脉</h2>
              {project.timeline.prose && (
                <div className="prose" dangerouslySetInnerHTML={{ __html: project.timeline.prose }} />
              )}
              <TimelineTable rows={project.timeline.rows} />
            </section>
          ) : null}

          {project.history.prose && (
            <section className="prose-section" id="历时性分析">
              <h2>历时性分析</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.history.prose }} />
            </section>
          )}

          {project.benchmark.prose || project.benchmark.rows.length > 0 ? (
            <section className="prose-section" id="共时性横向对标">
              <h2>共时性横向对标</h2>
              {project.benchmark.prose && (
                <div className="prose" dangerouslySetInnerHTML={{ __html: project.benchmark.prose }} />
              )}
              <BenchmarkTable rows={project.benchmark.rows} />
            </section>
          ) : null}

          {project.dimensions.chunks.length > 0 && (
            <section className="prose-section" id="七维深度分析">
              <h2>七维深度分析</h2>
              {project.dimensions.lead && (
                <div className="prose" dangerouslySetInnerHTML={{ __html: project.dimensions.lead }} />
              )}
              <div className="dimension-list">
                {project.dimensions.chunks.map((chunk, index) => (
                  <DimensionSection title={chunk.title} index={index + 1} key={chunk.title}>
                    <div className="prose" dangerouslySetInnerHTML={{ __html: chunk.html }} />
                  </DimensionSection>
                ))}
              </div>
            </section>
          )}

          {project.controversy.prose && (
            <section className="prose-section prose-section-callout" id="争议与不确定性">
              <h2>争议与不确定性</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: project.controversy.prose }} />
            </section>
          )}

          {project.verification.prose || sources.length > 0 ? (
            <section className="prose-section" id="信源与核验">
              <h2>信源与核验</h2>
              {project.verification.prose && (
                <div className="prose" dangerouslySetInnerHTML={{ __html: project.verification.prose }} />
              )}
              <ul className="verification-stats">
                <li>
                  信源总数：<strong>{sourceCount}</strong> 条
                </li>
                <li>
                  一手信源：<strong>{primaryCount}</strong> 条
                </li>
                <li>
                  独立发布方：<strong>{publisherCount}</strong> 个
                </li>
              </ul>
              <SourceList sources={sources} />
            </section>
          ) : null}

          <nav className="pager" aria-label="案例导航">
            {project.nav.prev ? (
              <Link className="pager-link pager-prev" to={`/projects/${project.nav.prev.slug}/`}>
                <span className="pager-label">上一案例</span>
                <span className="pager-title">{project.nav.prev.title}</span>
              </Link>
            ) : (
              <span className="pager-link pager-empty" aria-hidden="true" />
            )}
            {project.nav.next ? (
              <Link className="pager-link pager-next" to={`/projects/${project.nav.next.slug}/`}>
                <span className="pager-label">下一案例</span>
                <span className="pager-title">{project.nav.next.title}</span>
              </Link>
            ) : (
              <span className="pager-link pager-empty" aria-hidden="true" />
            )}
          </nav>

          {project.nav.related.length > 0 && (
            <section className="related" aria-label="同类别推荐">
              <h2 className="related-title">同类别推荐</h2>
              <ul className="related-list">
                {project.nav.related.map((item) => (
                  <li className="related-item" key={item.slug}>
                    <Link to={`/projects/${item.slug}/`}>{item.title}</Link>
                    <span className="related-meta">
                      {item.categories.join(' · ')} · 上线于 {formatLaunchDate(item.launchDate, item.launchDatePrecision)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>
      </main>
    </Layout>
  );
}
