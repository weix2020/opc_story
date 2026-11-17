# 部署指南 — 国内 AI 一人公司案例墙

站点为**纯静态双页**（无构建步骤）：`site/` 目录即全部发布内容。

```
site/                       # 静态发布目录
├── index.html              # OPC 案例墙（90 个国内案例，动态筛选/排序 + 全站计数）
│                           #   CASES 数组每条含 s:"slug"，作为深度报告的目录名与计数主键
├── report/<slug>/index.html  # 深度案例报告（每案例一篇，URL 形如 /report/guixu/）
│   └── guixu/index.html    # 《归墟》深度报告（26 条信源核验）
├── favicon.svg / og-default.svg
├── robots.txt / _headers   # Cloudflare Pages 自动读取 _headers
functions/api/count.js      # Pages Function：全站阅读/点赞/分享计数（D1）
schema.sql                  # D1 表结构
wrangler.toml               # Pages + D1 绑定配置
```

注意：`functions/` 必须放在**项目根目录**（Pages 规定不能放进静态目录），否则接口不会生效。

日常更新案例：编辑 `site/index.html` 中的 `CASES` 数组（每案例一行，`s` 为 slug），保存后重新部署即可；数据底稿与信源见 `data/domestic-pool.md`。

新增一篇深度报告的固定流程：
1. 检索调研（按收录口径 + 信源核验），底稿追加到 `data/domestic-pool.md`；
2. 以 `site/report/guixu/index.html` 为模板，新建 `site/report/<slug>/index.html`（slug 与案例墙 CASES 中的 `s` 一致）；
3. 在案例墙 CASES 中给该案例的 `href` 填 `"report/<slug>/"`，卡片标题即出现 ↗ 链接；
4. 重新部署。报告内部资源用相对路径（返回链接 `../../index.html`、favicon `../../favicon.svg`）。

## 方式一：Cloudflare Pages 拖拽上传（仅静态站，不含全站计数）

> 拖拽上传不支持 Pages Functions，启用全站计数后此方式只能发布页面、`/api/count` 会 404（前端自动降级为本地计数）。需要计数请用方式二或方式三。

1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. 项目名填 `opc-wall`（即访问域名 `opc-wall.pages.dev`）
3. 把整个 `site/` 文件夹拖入 → **Deploy**
4. 完成，访问 `https://opc-wall.pages.dev`

## 方式二：Wrangler CLI（推荐，含 Functions + D1）

```bash
npm i -g wrangler          # 首次安装（Node ≥18）
wrangler login             # 浏览器授权
wrangler pages deploy      # 读取 wrangler.toml：输出 site/、上传 functions/、绑定 D1
```

之后每次更新内容，重跑最后一条命令即可。首次使用前需按「全站互动计数」一节创建 D1 库并填入 `database_id`。

## 方式三：Git 自动化（推荐长期）

1. 把本仓库推送到 GitHub → Cloudflare Pages → **Connect to Git**
2. 构建配置：**Build command 留空**，**Build output directory** 填 `site`
3. 以后 `git push` 即自动发布

## 绑定自定义域名

Pages 项目 → **Custom domains** → 添加域名并按提示加 DNS CNAME 记录。国内可直接访问 `*.pages.dev`，无需备案；绑定自有域名同样无需备案（静态站）。

## 全站互动计数（D1，已启用）

案例墙的阅读 / 点赞 / 分享是全站共享的真实计数，由根目录 `functions/api/count.js` + D1 提供；同一访客点赞终身计一次、阅读与分享每天各计一次。接口不可用（如本地直接打开 HTML）时前端自动降级为浏览器本地计数，页面不受影响。

> 重要：Cloudflare 的**拖拽上传（Direct Upload）不支持 Functions**，启用计数后必须改用 Wrangler 或 Git 集成部署。

**首次启用（只需做一次）**

```bash
npm i -g wrangler                                   # Node ≥18
wrangler login
wrangler d1 create opc-counts                       # 复制返回的 database_id
# 把 database_id 填入 wrangler.toml 的 [[d1_databases]]
wrangler d1 execute opc-counts --remote --file=schema.sql
wrangler pages deploy                               # 读取 wrangler.toml：上传 site/ + functions/ 并绑定 D1
```

本地调试：`wrangler pages dev`（默认 http://localhost:8788，会带本地 D1）。

**验证**：访问 `https://<项目域名>/api/count?slugs=sitesfy`，应返回
`{"ok":true,"data":{"view":0,"like":0,"share":0}}`；用两个浏览器各点一次阅读，数字应累加（同一浏览器同一天重复点击只算一次）。

**接口约定**

- `GET /api/count?slugs=a,b,c` → `{ ok, data: { slug: {view, like, share} } }`
- `POST /api/count` body `{ slug, kind: 'view'|'like'|'share', vid, delta }`，`delta:-1` 取消点赞
- `vid` 由浏览器首次访问生成并存在 localStorage，服务端据此去重
- 缺 D1 绑定时接口返回 503，前端走本机降级

## 可选增强（当前未启用）

- **新案例上线**：往 `site/index.html` 的 `CASES` 数组按时间锚点插入新行、更新序号，重新部署。计数以 `s`（slug）为主键，调整序号不会影响已有数据。
