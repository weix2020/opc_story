/**
 * 营收推算置信度徽章（悬停展示等级释义）。
 */
import { CONFIDENCE_DESCRIPTIONS, confidenceLabel } from '../lib/labels';

interface Props {
  /** 置信度等级：A / B / C */
  level: string;
  /** 是否展示等级释义（悬停提示） */
  withTitle?: boolean;
}

/** 置信度徽章组件 */
export default function ConfidenceTag({ level, withTitle = false }: Props) {
  const label = confidenceLabel(level);
  const description = CONFIDENCE_DESCRIPTIONS[level];
  return (
    <span
      className={`badge badge-conf badge-conf-${level}`}
      title={withTitle && description ? description : undefined}
    >
      {label}
    </span>
  );
}
