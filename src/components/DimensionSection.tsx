/**
 * 七维深度分析的单个小节容器：序号圆点 + 标题 + 正文插槽。
 */
import type { ReactNode } from 'react';

interface Props {
  /** 小节标题（如「1. 产品功能」） */
  title: string;
  /** 小节序号（1-7），用于展示序号圆点 */
  index?: number;
  /** 小节正文 */
  children: ReactNode;
}

/** 七维分析小节容器组件 */
export default function DimensionSection({ title, index, children }: Props) {
  return (
    <section className="dimension">
      <h3 className="dimension-title">
        {index !== undefined && (
          <span className="dimension-index" aria-hidden="true">
            {index}
          </span>
        )}
        <span>{title}</span>
      </h3>
      <div className="dimension-body">{children}</div>
    </section>
  );
}
