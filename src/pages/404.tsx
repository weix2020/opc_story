/**
 * 自定义 404 页：Docusaurus 会把 src/pages/404.tsx 构建为站点根的 404.html。
 */
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

/** 404 页组件 */
export default function NotFoundPage() {
  return (
    <Layout
      title="页面不存在"
      description="你访问的页面不存在或已被移动，可以返回首页浏览全部案例。"
    >
      <main className="container main">
        <section className="notfound">
          <p className="notfound-code">404</p>
          <h1 className="notfound-title">页面不存在</h1>
          <p className="notfound-text">
            你访问的地址可能已被移动或删除。可以回到首页浏览全部收录案例，或查看方法论页了解本站的收录与推算口径。
          </p>
          <div className="notfound-actions">
            <Link className="button button-primary" to="/">
              返回首页
            </Link>
            <Link className="button button-ghost" to="/methodology/">
              阅读方法论
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
