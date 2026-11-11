# 部署指南 — 国内 AI 一人公司案例墙

站点为**纯静态双页**（无构建步骤）：`site/` 目录即全部发布内容。

```
site/
├── index.html      # OPC 案例墙（60 个国内案例，动态筛选/排序/本地计数）
├── guixu.html      # 深度案例报告：《归墟》（榜首案例，26 条信源核验）
├── favicon.svg / og-default.svg
├── robots.txt / _headers   # Cloudflare Pages 自动读取 _headers
```

日常更新：编辑 `site/index.html` 中的 `CASES` 数组（每案例一行），保存后重新部署即可，数据底稿与信源见 `data/domestic-pool.md`。

## 方式一：Cloudflare Pages 拖拽上传（最快，1 分钟）

1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. 项目名填 `opc-wall`（即访问域名 `opc-wall.pages.dev`）
3. 把整个 `site/` 文件夹拖入 → **Deploy**
4. 完成，访问 `https://opc-wall.pages.dev`

## 方式二：Wrangler CLI（可重复部署）

```bash
npm i -g wrangler          # 首次安装（Node ≥18）
wrangler login             # 浏览器授权
wrangler pages deploy site --project-name opc-wall
```

之后每次更新内容，重跑最后一条命令即可。

## 方式三：Git 自动化（推荐长期）

1. 把本仓库推送到 GitHub → Cloudflare Pages → **Connect to Git**
2. 构建配置：**Build command 留空**，**Build output directory** 填 `site`
3. 以后 `git push` 即自动发布

## 绑定自定义域名

Pages 项目 → **Custom domains** → 添加域名并按提示加 DNS CNAME 记录。国内可直接访问 `*.pages.dev`，无需备案；绑定自有域名同样无需备案（静态站）。

## 可选增强（当前未启用）

- **全局计数**：案例墙的阅读/赞/分享目前存浏览器本地（localStorage）。若要全站汇总，可在 Cloudflare Pages 挂 KV + Function（参考归档工程 `archive/global-site/functions/api/metrics.ts`，接口契约见该文件头注释），前端把本地计数改为请求端点即可。
- **新案例上线**：往 `site/index.html` 的 `CASES` 数组按时间锚点插入新行、更新序号，重新部署。
