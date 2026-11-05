/**
 * 「共时性横向对标」表格：单元格内的 [S1] 引用标记转换为信源锚点链接。
 */
import { cellCitations } from '../lib/body-sections';
import type { BenchmarkRow } from '../lib/types';

interface Props {
  /** 对标数据行 */
  rows: BenchmarkRow[];
}

/** 横向对标表格组件 */
export default function BenchmarkTable({ rows }: Props) {
  if (rows.length === 0) return null;
  return (
    <div className="table-scroll">
      <table className="benchmark-table">
        <thead>
          <tr>
            <th>对标项目</th>
            <th>成立时间</th>
            <th>团队规模</th>
            <th>变现模式</th>
            <th>营收规模</th>
            <th>融资状态</th>
            <th>信源</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="benchmark-project">{row.project}</td>
              <td>{row.founded}</td>
              <td>{row.teamSize}</td>
              <td>{row.businessModel}</td>
              <td>{row.revenue}</td>
              <td>{row.funding}</td>
              <td dangerouslySetInnerHTML={{ __html: cellCitations(row.source) }} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
