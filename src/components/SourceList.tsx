/**
 * 信源清单表格：每条信源带 source-N 锚点，供正文 [S1] 引用跳转。
 */
import type { Source } from '../lib/types';
import { formatIsoDate, sourceTypeLabel } from '../lib/labels';

interface Props {
  /** 信源列表 */
  sources: Source[];
}

/** 信源清单组件 */
export default function SourceList({ sources }: Props) {
  return (
    <div className="table-scroll">
      <table className="source-table">
        <thead>
          <tr>
            <th>编号</th>
            <th>标题</th>
            <th>发布方</th>
            <th>发布日期</th>
            <th>访问日期</th>
            <th>类型</th>
            <th>链接</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr id={`source-${source.id}`} key={source.id}>
              <td className="source-id">[S{source.id}]</td>
              <td>{source.title}</td>
              <td>{source.publisher}</td>
              <td>{formatIsoDate(source.publishedAt)}</td>
              <td>{formatIsoDate(source.accessedAt)}</td>
              <td>
                <span className={`badge badge-source badge-source-${source.type}`}>
                  {sourceTypeLabel(source.type)}
                </span>
              </td>
              <td>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  查看原文
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
