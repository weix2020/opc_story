/**
 * 内联 SVG 计数图标，避免引入外部图标依赖。
 */
interface Props {
  /** 图标类型：views（阅读）/ likes（点赞）/ shares（分享） */
  name: 'views' | 'likes' | 'shares';
  /** 图标尺寸（像素） */
  size?: number;
}

/** 共用 SVG 属性 */
const svgProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

/** 阅读 / 点赞 / 分享三个计数图标 */
export default function MetricIcon({ name, size = 14 }: Props) {
  if (name === 'views') {
    return (
      <svg className="metric-icon" width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (name === 'likes') {
    return (
      <svg className="metric-icon" width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
    );
  }
  return (
    <svg className="metric-icon" width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
