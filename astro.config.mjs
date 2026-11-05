import { defineConfig } from 'astro/config';

// 站点配置：纯静态输出，部署到 Cloudflare Pages
export default defineConfig({
  site: 'https://opc-story.pages.dev',
  output: 'static',
  build: {
    // 生成 /projects/xxx/index.html 形式的目录式路由
    format: 'directory',
  },
});
