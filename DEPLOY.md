# 部署指南 — OPC Story（Cloudflare Pages）

纯静态站点（Astro 构建产物 `dist/`），推荐部署到 Cloudflare Pages。

## 本地预览与校验

```bash
npm install        # 安装依赖
npm run build      # 内容校验 + 构建（校验失败则不产出 dist/）
npm run preview    # 本地预览，默认 http://localhost:4321
npm run validate   # 仅运行内容校验（50 篇案例结构/信源/引用检查）
```

## 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐，自动 CI）

1. 将本仓库推送到 GitHub / GitLab
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. 选择本仓库，配置构建：
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Settings → Environment variables** 添加：
   - `NODE_VERSION` = `22`（Astro 5 要求 Node ≥18.17，建议 22）
5. 点击 **Save and Deploy**，首次构建完成后即可通过 `https://<project-name>.pages.dev` 访问

> 如需绑定自定义域名：项目 **Custom domains** 中添加并按提示配置 DNS。

### 方式二：Wrangler CLI 直接上传（无 Git）

```bash
npm run build
npx wrangler pages deploy dist --project-name opc-story
```

首次运行会引导浏览器登录 Cloudflare 授权。

### 方式三：Dashboard 手动上传

Dashboard → Workers & Pages → Create → Pages → **Upload assets**，将 `dist/` 目录拖入即可。

## 环境变量说明

| 变量 | 必填 | 默认 | 说明 |
|---|---|---|---|
| `NODE_VERSION` | 否 | `22` | Pages 构建使用的 Node 版本 |
| `PUBLIC_METRICS_ENDPOINT` | 否 | 未设置 | 计数后端地址。**未设置时站点以"本地模式"运行**（种子值 + 浏览器本地增量），功能完整；设置后启用远程计数聚合 |

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

## 产物结构（dist/）

- `/` 首页：50 案例列表，构建期排序（上线时间降序 → 阅读量降序），客户端搜索/筛选
- `/projects/<slug>/` 50 个案例详情页
- `/methodology/` 方法论页（收录口径、AI 三分法、信源与置信度规则）
- `/_headers` 缓存与安全响应头（Cloudflare Pages 自动读取）
- `/404.html`、`/favicon.svg`、`/robots.txt`

## 更新内容

新增或修改案例：编辑 `src/content/projects/*.md` 后重新构建部署。内容必须满足 `src/content.config.ts` schema 与 `npm run validate` 检查，否则构建失败（这是有意设计，防止残缺案例上线）。

## 数据检索截止时间

案例数据检索截止：**2026-11-04**。营收、融资等数字为该时点的公开信息快照，推算口径与置信度标注见各详情页与 `/methodology/`。
