# Tasks

> 变更 ID：`build-opc-cases-platform`
> 规格：`spec.md` ｜ 校验清单：`checklist.md`
> 全部任务完成后，在 `checklist.md` 中逐项勾选。

---

## Task 0：项目脚手架与内容模型

- [x] **Task 0.1**：初始化 Astro + TypeScript 静态站点
  - [x] SubTask 0.1.1：`package.json` 依赖 `astro`、`typescript`，脚本包含 `dev` / `build` / `preview` / `validate`
  - [x] SubTask 0.1.2：`astro.config.mjs` 设置 `output: 'static'`，`site` 指向占位域名
  - [x] SubTask 0.1.3：`tsconfig.json` 继承 astro 配置；建立 `src/{pages,layouts,components,styles,lib,content}` 目录结构
  - [x] SubTask 0.1.4：`public/_headers` 写入缓存与安全响应头（`/assets/*` 长缓存、文档页短缓存、基础安全头）

- [x] **Task 1：内容集合 schema 与校验脚本**
  - [x] SubTask 1.1：定义 `src/content/projects` 集合 schema，字段包含：标题、slug、简介、创始人、成立/上线时间、总部、团队规模、类别标签、**AI 契合类型（枚举：ai-native / ai-embedded / ai-enabled-ops）**、**AI 作用说明**、营收预估（值 + 口径 + 置信度）、融资状态、官网、七维要点（七段文本）、信源数组（编号/标题/发布方/发布日期/访问日期/类型/链接）、正文
  - [x] SubTask 1.2：schema 对必填字段与类型做强校验，缺失直接导致构建失败
  - [x] SubTask 1.3：`scripts/validate-content.mjs` 实现内容级校验：信源 ≥5、一手 ≥1、独立 ≥2、七维小节齐备、**AI 契合类型取值合法且 AI 作用说明非空**、历时性阶段与横向对标表格存在、正文引用编号可对应信源；失败以非零退出码结束并列出文件与问题
  - [x] SubTask 1.4：`npm run build` 前置调用校验脚本，校验不通过则不产出 `dist/`

---

## Task 2：站点功能实现（页面 / 排序 / 计数 / 方法论）

- [x] **Task 2.1**：布局与基础组件
  - [x] SubTask 2.1.1：`BaseLayout.astro`（SEO meta、OG 标签、导航、页脚、favicon）
  - [x] SubTask 2.1.2：`ProjectCard.astro`——标题、简介、上线时间、类别标签、**AI 契合类型标签**，**右下角**渲染阅读量/点赞量/分享量三个数值
  - [x] SubTask 2.1.3：`SourceList.astro`——信源列表（编号、标题、发布方、发布日期、访问日期、类型、链接）
  - [x] SubTask 2.1.4：`ConfidenceTag.astro` / `TimelineTable.astro` / `BenchmarkTable.astro` / `DimensionSection.astro` / `AiTypeTag.astro`

- [x] **Task 2.2**：首页列表页
  - [x] SubTask 2.2.1：构建期按 `launchDate` 降序、时间相同按阅读量降序生成列表
  - [x] SubTask 2.2.2：客户端关键词过滤 + 类别筛选 + **AI 契合类型筛选**，筛选后排序规则保持有效
  - [x] SubTask 2.2.3：计数本地增量后重新排序，保证列表顺序与计数一致

- [x] **Task 2.3**：详情页
  - [x] SubTask 2.3.1：`/projects/[slug]` 渲染速览（含 AI 契合类型与 AI 作用说明）、来龙去脉、历时性分析、共时性横向对标、七维深度分析、信源与核验、争议与不确定性
  - [x] SubTask 2.3.2：正文引用编号锚定到信源列表对应条目
  - [x] SubTask 2.3.3：上/下一个案例导航 + 同类别案例推荐

- [x] **Task 2.4**：计数链路
  - [x] SubTask 2.4.1：`src/lib/metrics.ts` 实现种子值 + 本地覆盖层合并（浏览按会话计一次、点赞可切换、分享触发计数）
  - [x] SubTask 2.4.2：可选远程端点开关（env 控制），远程模式上报事件并合并远端聚合值
  - [x] SubTask 2.4.3：分享按钮交互与计数上报

- [x] **Task 2.5**：方法论页与 404 页
  - [x] SubTask 2.5.1：`/methodology` 说明 OPC 定义与"一人 + AI"判定口径、**AI 相关性三分法及判定示例**、信源类型、A/B/C 置信度分级、营收推算方法、冲突数据处理、未公开披露原则、检索截止时间
  - [x] SubTask 2.5.2：`404.astro`

---

## Task 3：案例研究（50 个）与内容撰写

- [x] **Task 3.1**：建立候选池与研究协议
  - [x] SubTask 3.1.1：`data/pool.md` 沉淀 ≥60 个候选 OPC 项目，逐条记录名称、创始人、总部、成立年份、官网、类别、**AI 契合类型（ai-native / ai-embedded / ai-enabled-ops）与 AI 作用一句话说明**、初步判定、来源 URL
  - [x] SubTask 3.1.2：按收录标准（**AI 相关为硬性门槛**）筛选出 50 个正式案例，记录淘汰原因；因非 AI 相关被淘汰的候选单独归类统计
  - [x] SubTask 3.1.3：确认 50 个案例中 ai-native ≥30；若不足则补充候选后重新筛选
  - [x] SubTask 3.1.4：`data/research-log.md` 记录每个案例的检索关键词、命中来源、排除来源、冲突点

- [x] **Task 3.2**：分批检索与撰写 50 篇案例（**5 个批次 × 10 篇，可并行**）
  - [x] SubTask 3.2.1 Batch A：类别"AI 生成 / 图像视频创作工具"10 篇
  - [x] SubTask 3.2.2 Batch B：类别"AI 助手 / Agent / 生产力应用"10 篇
  - [x] SubTask 3.2.3 Batch C：类别"AI 开发者工具 / API / 基础设施"10 篇
  - [x] SubTask 3.2.4 Batch D：类别"AI 内容 / 创作者经济 / 教育"10 篇
  - [x] SubTask 3.2.5 Batch E：类别"AI 垂直应用 / 行业服务 / 一人 + AI 运营型业务"10 篇
  - [x] 每篇必须满足：**AI 契合类型判定明确且 AI 作用说明非空**、信源 ≥5（≥1 一手、≥2 独立）、七维小节齐备、含时间线与 ≥3 个对标项目、关键数字交叉验证或标注未交叉验证

- [x] **Task 3.3**：交叉一致性复核
  - [x] SubTask 3.3.1：全量案例的营收/融资口径一致性检查（口径、币种、时点标注）
  - [x] SubTask 3.3.2：时间线日期、团队规模、类别标签、AI 契合类型标注统一规范
  - [x] SubTask 3.3.3：AI 相关性复核——抽查每篇的"产品功能"维，确认 AI 描述有引用支撑且非泛泛而谈

---

## Task 4：验证与构建

- [x] **Task 4.1**：运行 `npm run validate`，修复所有校验错误直至通过
- [x] **Task 4.2**：运行 `npm run build`，确认 `dist/` 生成 50 个详情页 + 首页 + 方法论页
- [x] **Task 4.3**：本地预览并用浏览器实测列表排序、筛选、计数、详情页跳转、信源锚点

---

## Task 5：交付与部署

- [x] **Task 5.1**：编写部署文档（Cloudflare Pages 创建步骤、构建命令、输出目录、Node 版本、环境变量、KV 计数后端可选启用）
- [x] **Task 5.2**：核对 `dist/` 产物可独立打开（相对路径、`_headers` 生效、无外部依赖阻塞）
- [x] **Task 5.3**：更新 `tasks.md` 勾选状态与 `checklist.md` 校验结果

---

# Task Dependencies

- Task 0 → Task 1 → Task 2（脚手架与 schema 先于页面实现）
- Task 0 + Task 1 → Task 3（内容 schema 稳定后才能批量写案例）
- Task 1 → Task 3.2（案例 frontmatter 必须匹配 schema）
- Task 2 与 Task 3 可部分并行：Task 2.1/2.2/2.4/2.5（组件与列表页）不依赖案例数据，可与 Task 3.1/3.2 并行；Task 2.3 详情页渲染需 Task 3.2 的样例内容先就位
- Task 3.2 五个批次互相独立，**可并行执行**
- Task 3.3 依赖 Task 3.2 全部完成
- Task 4 依赖 Task 2 与 Task 3 全部完成
- Task 5 依赖 Task 4
