/**
 * AI 契合类型徽章（悬停展示类型释义）。
 */
import { AI_TYPE_DESCRIPTIONS, aiTypeLabel } from '../lib/labels';

interface Props {
  /** AI 契合类型：ai-native / ai-embedded / ai-enabled-ops */
  type: string;
  /** 是否展示类型释义（悬停提示） */
  withTitle?: boolean;
}

/** AI 契合类型徽章组件 */
export default function AiTypeTag({ type, withTitle = false }: Props) {
  const label = aiTypeLabel(type);
  const description = AI_TYPE_DESCRIPTIONS[type];
  return (
    <span
      className={`badge badge-ai badge-ai-${type}`}
      title={withTitle && description ? description : undefined}
    >
      {label}
    </span>
  );
}
