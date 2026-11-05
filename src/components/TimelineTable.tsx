/**
 * 「来龙去脉」时间线表格：单元格内的 [S1] 引用标记转换为信源锚点链接。
 */
import { cellCitations } from '../lib/body-sections';
import type { TimelineRow } from '../lib/types';

interface Props {
  /** 时间线数据行 */
  rows: TimelineRow[];
}

/** 时间线表格组件 */
export default function TimelineTable({ rows }: Props) {
  if (rows.length === 0) return null;
  return (
    <div className="table-scroll">
      <table className="timeline-table">
        <thead>
          <tr>
            <th>日期</th>
            <th>事件</th>
            <th>信源</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="timeline-date">{row.date}</td>
              <td dangerouslySetInnerHTML={{ __html: cellCitations(row.event) }} />
              <td dangerouslySetInnerHTML={{ __html: cellCitations(row.source) }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
