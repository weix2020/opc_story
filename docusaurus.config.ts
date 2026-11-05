import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'node:path';
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL, DATA_CUTOFF, DISCLAIMER } from './src/lib/site';

/**
 * 站点配置：纯静态输出（SSG），部署目标 Cloudflare Pages。
 * 案例数据由自定义插件 plugins/opc-projects.ts 加载并生成 /projects/:slug 路由。
 */
const config: Config = {
  title: SITE_NAME,
  tagline: SITE_TAGLINE,
  favicon: '/favicon.svg',
  url: SITE_URL,
  baseUrl: '/',
  trailingSlash: true,
  // 自定义页面与插件路由均为完整 HTML，链接断链只警告不阻断构建
  onBrokenLinks: 'warn',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },
  presets: [
    [
      'classic',
      {
        // 不使用 docs / blog 内置插件，案例内容由自定义插件驱动
        docs: false,
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [path.resolve('./plugins/opc-projects.ts')],
  themeConfig: {
    metadata: [
      { name: 'description', content: SITE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:locale', content: 'zh_CN' },
      { property: 'og:image', content: `${SITE_URL}/og-default.svg` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${SITE_URL}/og-default.svg` },
    ],
    navbar: {
      title: SITE_NAME,
      items: [
        { to: '/', label: '首页', position: 'left' },
        { to: '/methodology', label: '方法论', position: 'left' },
      ],
    },
    footer: {
      style: 'light',
      copyright: `数据检索截止时间：${DATA_CUTOFF} · ${SITE_NAME} · 静态内容站点，部署于 Cloudflare Pages`,
    },
  },
  customFields: {
    // 计数后端地址（可选）。未配置时站点以"本地模式"运行，功能完整。
    metricsEndpoint: process.env.PUBLIC_METRICS_ENDPOINT ?? '',
  },
};

export default config;
