/**
 * 首页案例卡片：标题、简介、元信息、类别标签与右下角三计数。
 * 计数展示值由父组件（首页）传入"种子值 + 本地增量"后的有效值。
 */
import Link from '@docusaurus/Link';
import type { ProjectMeta } from '../lib/types';
import { formatLaunchDate } from '../lib/labels';
import { formatCount } from '../lib/metrics';
import AiTypeTag from './AiTypeTag';
import MetricIcon from './MetricIcon';

interface Props {
  /** 案例元数据 */
  project: ProjectMeta;
  /** 展示用计数（本地有效值） */
  counts: { views: number; likes: number; shares: number };
}

/** 首页案例卡片组件 */
export default function ProjectCard({ project, counts }: Props) {
  const launchLabel = formatLaunchDate(project.launchDate, project.launchDatePrecision);
  return (
    <article className="card" data-slug={project.slug}>
      <div className="card-head">
        <h2 className="card-title">
          <Link to={`/projects/${project.slug}/`}>{project.title}</Link>
        </h2>
        <AiTypeTag type={project.aiType} withTitle />
      </div>

      <p className="card-summary">{project.summary}</p>

      <div className="card-meta">
        <span>{project.hq}</span>
        <span aria-hidden="true">·</span>
        <span>成立于 {project.founded}</span>
        <span aria-hidden="true">·</span>
        <span>上线于 {launchLabel}</span>
      </div>

      <div className="card-foot">
        <div className="tags">
          {project.category.map((category) => (
            <span className="tag" key={category}>
              {category}
            </span>
          ))}
        </div>
        <div className="card-metrics">
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
      </div>
    </article>
  );
}
