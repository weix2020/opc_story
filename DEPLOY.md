# 部署指南 — OPC Story（Cloudflare Pages）

纯静态站点（Docusaurus 构建产物 `build/`），推荐部署到 Cloudflare Pages。

## 本地预览与校验

```bash
npm install        # 安装依赖（Node >= 22）
npm run build      # 内容校验 + 构建（校验失败则不产出 build/）
npm run preview    # 本地预览构建产物，默认 http://localhost:3000
npm run dev        # 开发模式（热更新）
npm run validate   # 仅运行内容校验（50 篇案例结构/信源/引用检查）
npm run typecheck  # TypeScript 类型检查
```

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐，自动 CI）

1. 将本仓库推送到 GitHub / GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择本仓库，配置构建：
   - **Framework preset**: `Docusaurus`
   - **Build command**: `npm run build`
   - **Build output directory**: `build`
4. **Settings → Environment variables** 添加：
   - `NODE_VERSION` = `22`（Docusaurus 3 要求 Node ≥18，建议 22）
5. 点击 **Save and Deploy**，首次构建完成后即可通过 `https://<project-name>.pages.dev` 访问

> 如需绑定自定义域名：项目 **Custom domains** 中添加并按提示配置 DNS。

### 方式二：Wrangler CLI 直接上传（无 Git）

```bash
npm run build
npx wrangler pages deploy build --project-name opc-story
```

首次运行会引导浏览器登录 Cloudflare 授权。

### 方式三：Dashboard 手动上传

Dashboard → Workers & Pages → Create → Pages → **Upload assets**，将 `build/` 目录拖入即可。

## 环境变量说明

| 变量 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `NODE_VERSION` | 否 | `22` | Pages 构建使用的 Node 版本 |
| `PUBLIC_METRICS_ENDPOINT` | 否 | 未设置 | 计数后端地址。**未设置时站点以"本地模式"运行**（种子值 + 浏览器本地增量），功能完整；设置后启用远程计数聚合（经 `docusaurus.config.ts` 的 `customFields.metricsEndpoint` 注入前端） |

## 可选：启用 KV 计数后端

`functions/api/metrics.ts` 是一个 Cloudflare Pages Function，配合 KV 实现真实的阅读/点赞/分享聚合与限频防刷。默认**不启用**，站点完全不受影响。

启用步骤：

1. Pages 项目 → **Settings → Functions → KV namespace bindings**：
   - 创建一个 KV namespace（如 `METRICS_KV`），绑定到变量名 `METRICS_KV`
2. Pages 项目 → **Settings → Environment variables** 添加：
   - `PUBLIC_METRICS_ENDPOINT` = `https://<你的域名>/api/metrics`（生产域名）
3. 重新部署

接口契约（前端 `src/lib/metrics.ts` 已实现对接）：

```
GET  /api/metrics?slug=<slug>          → { "views": n, "likes": n, "shares": n }
POST /api/metrics  { slug, metric, delta }  → 更新计数（metric ∈ views|likes|shares，带限频防刷）
```

## 产物结构（build/）

- `/` 首页：50 案例列表，构建期排序（上线时间降序 → 阅读量降序），客户端搜索/筛选
- `/projects/<slug>/` 50 个案例详情页（由自定义插件 `plugins/opc-projects.ts` 生成）
- `/methodology/` 方法论页（收录口径、AI 三分法、信源与置信度规则）
- `/_headers` 缓存与安全响应头（源文件位于 `static/_headers`，构建时复制到 `build/`，Cloudflare Pages 自动读取）
- `/404.html`、`/sitemap.xml`、`/favicon.svg`、`/robots.txt`

## 架构说明（Docusaurus）

- 案例内容保持 `src/content/projects/*.md` 不变，frontmatter 契约由 `src/lib/content-contract.mjs` 定义
- `plugins/opc-projects.ts`：构建期解析全部案例 → 首页元数据注入 globalData（插件名 `opc-projects`）→ 每个 slug 生成 `/projects/:slug` 静态路由（详情数据经 `createData` 落盘为 JSON 后注入路由 props）
- 页面组件：`src/pages/index.tsx`（首页）、`src/pages/methodology.tsx`（方法论）、`src/pages/404.tsx`（404）、`src/components/ProjectDetailPage.tsx`（详情）
- Markdown 正文由插件用 `marked` 渲染并注入标题锚点，分节与 `[S1]` 引用链接化复用 `src/lib/body-sections.ts`

## 更新内容

新增或修改案例：编辑 `src/content/projects/*.md` 后重新构建部署。内容必须满足 `npm run validate` 检查（枚举、必填标题、信源数量、引用双向一致等），否则构建失败（这是有意设计，防止残缺案例上线）。

## 数据检索截止时间

案例数据检索截止：**2026-11-04**。营收、融资等数字为该时点的公开信息快照，推算口径与置信度标注见各详情页与 `/methodology/`。
