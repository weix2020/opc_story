---
title: Postiz
slug: postiz
summary: Nevo David 把在 Novu 学到的开源分发打法用在 Postiz 上，2026 年转向为 AI Agent 提供排程基础设施，MRR 达 25 万美元级。
founder: Nevo David（以色列，@wickedguro）
founded: '2024'
launchDate: '2024-01-01'
launchDatePrecision: year
hq: 美国, 特拉华州纽卡斯尔（创始人所在地）/ 以色列（创始人来源地口径不一）
teamSize: 创始人为单一创始人起步（第三方记 1 人），2026 年已扩编至 2–10 人（LinkedIn 口径）并发布高级前端岗位招聘；已从「一人公司」转为小团队
category:
  - AI助手
aiType: ai-native
aiRole: AI 承担内容生成与改写、跨平台排期、发布执行与效果分析；2026 年进一步以 CLI 与 MCP Server 让外部 Agent 直接驱动排程
revenueEstimate:
  value: $251,282 MRR / 7,347 活跃订阅（2026-10-08，TrustMRR Stripe 验证口径）
  basis: TrustMRR 页面通过 Stripe API key 验证 Postiz 营收，数据更新至 2026-10-08，记录 MRR $251,282 与 7,347 个活跃订阅，全部累计收入 $1,615,416；按 9,585 活跃订阅与 $326,687 MRR 的后续快照折算，单订阅均价约 $34，与 $29/$39 入门档位相符。该口径为本批次中可验证性最强的营收数字，但需注意存在多个时点快照（$145K / $250K / $251,282 / $332K），引用时必须带时点。
  confidence: A
funding: 全程自筹（Bootstrapped），无外部融资记录；创始人以 Novu、Gitrоom 两款产品的收入支撑 Postiz
website: https://postiz.com
metrics:
  views: 28000
  likes: 860
  shares: 300
dimensions:
  product: 开源（Apache 2.0）社交媒体排程平台，托管云版收费，自托管免费；2026 年新增 postiz-agent CLI 与 MCP Server 面向 AI Agent
  audience: 内容创作者、数字营销机构、SaaS 公司与开发者；2026 年起新增「自主 Agent」这一新客群
  painPoint: Buffer、Hootsuite 等封闭、按席位收费、规模化昂贵；而自主 Agent 需要一个能从命令行驱动的 API 优先排程器，传统面板式工具无法被 Agent 调用
  revenue: $251,282 MRR / 7,347 订阅（2026-10-08，Stripe 验证）；更早时点为 $145K MRR（2026-07）、$118K（2026-06）
  funding: 全程自筹
  evaluation: 正面来自开源分发带来的自然增长与「向 Agent 销售而非与人竞争」的战略；负面集中在 14.6% 的公开流失率、约 80% 毛利说法与实际不符，以及一人公司标签已不成立
  costRisk: 模型调用成本随生成量增长；合规风险涉及各平台 API 政策变更、生成内容的广告合规与跨平台账号授权
sources:
  - id: 1
    title: Postiz 官网
    publisher: Postiz
    publishedAt: '2024-01-01'
    accessedAt: '2026-11-04'
    type: primary
    url: https://postiz.com
  - id: 2
    title: Postiz 营收页（Stripe API 验证）
    publisher: TrustMRR
    publishedAt: '2026-10-08'
    accessedAt: '2026-11-04'
    type: database
    url: https://trustmrr.com/startup/postiz
  - id: 3
    title: 'Postiz — $145K MRR: The Open-Source Scheduler That Repositioned for AI Agents and 7x''d in 4 Months'
    publisher: Superframeworks
    publishedAt: '2026-07-04'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://superframeworks.com/case-study/postiz
  - id: 4
    title: 'Is Postiz really making $180k/m?'
    publisher: Steal What Works
    publishedAt: '2026-08-30'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://stealwhatworks.com/blogs/news/postiz-making-180k-per-month
  - id: 5
    title: Postiz 开发者档案与产品参数
    publisher: EveryDev
    publishedAt: '2026-01-01'
    accessedAt: '2026-11-04'
    type: aggregator
    url: https://www.everydev.ai/developers/postiz
  - id: 6
    title: 'The quiet way this SaaS reached 10,000 users'
    publisher: Startup Series
    publishedAt: '2025-01-01'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://startupseries.io/the-quiet-way-this-saas-reached-10000-users/
  - id: 7
    title: 'Open Source Playbook: How Nevo Built Postiz into a $17K/mo SaaS'
    publisher: StackStarts
    publishedAt: '2025-01-01'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://stackstarts.com/open-source-playbook-how-nevo-built-postiz-17k-mrr/
---

## 来龙去脉

Nevo David 用了近七年在以色列初创公司做全栈工程师，2022 年加入开源通知平台 Novu 做增长营销 [S3]。**这一段经历是理解 Postiz 全部商业逻辑的钥匙**：他在 Novu 两年内把仓库做到 30,000 GitHub stars，而这段经历教会他的东西被第三方复盘总结为一句话——「open source is a distribution engine」[S3]。

第一款 solo 产品是 Gitroom，一个面向开源项目的发布工具加咨询 [S3]。它能赚钱，但市场极小。**六个月内他就承认了这一点并转型**，2024 年 1 月开始做社交媒体排程工具——也就是 Postiz 的原型 [S3]。

第一个失败同样有记录，值得原样保留：**SEO 渠道彻底失败**。他在内容上花了 $12K 却几乎没有带来流量——新域名没有权重——于是**直接砍掉这条渠道**，不做沉没成本纠缠 [S3]。

真正的转折是 2024 年 9 月开源产品 [S3]。Postiz 的 GitHub stars 从 3K 涨到 14K，只用了三个月，靠的是 Hacker News、Reddit、Dev.to、Medium 与 Product Hunt 上的**集中发布周**，设计目标是冲上 GitHub trending [S3]。收入随之而来：从 $700/月到一年内 $14.2K/月，再到 472 个付费订阅带来的 $17K MRR——**全程由一名自筹的独立创始人完成，把一部分自托管用户转化为云客户** [S3]。

第二个转折是 2026 年的战略转向，也是本案例的核心。2026 年初，OpenClaw 成为史上增长最快的开源项目，几周内突破 100K stars [S3]。Nevo 立刻行动：把 Postiz 重新定位为「the ultimate agentic social media scheduling tool」，发布 **postiz-agent CLI 与 MCP Server** 让 Agent 能直接排期发布，在 ClawHub（OpenClaw 的技能注册表）发布 Postiz skill，并为每一个「Agent + 平台」组合生成程序化落地页 [S3]。**这是一次教科书级的「站在浪头上而不是评论浪头」的动作**——当一篇文章提到 Postiz 是 Agent 发社交内容的方式时，流量与注册量开始暴涨并持续。

增长曲线因此极度陡峭：MRR 从 2026 年 3 月的 $21K，到 4 月的 $80K，到 6 月的 $118K；2026 年 7 月 2 日，Nevo 宣布 **$145K MRR，且每天增长 $1K** [S3]。

当前状态：TrustMRR 通过 Stripe API key 验证的快照显示 2026-10-08 的 MRR 为 **$251,282**、活跃订阅 7,347、全部累计收入 $1,615,416 [S2]；同页面的更新快照显示 MRR $326,687 与 9,585 个活跃订阅 [S2]。开源侧约 32K–35.3K stars、6,700 forks、约 600 万次容器下载 [S3][S4]。

**关于「是否仍是一人公司」，本案例有明确记录的分歧**：Nevo 在 $55K MRR 时仍自述为「one-person company」[S4]，第三方复盘在 2026-07 仍写「still a one-person company」[S3]；但同一份复盘也提到创始人后来发布了高级前端岗招聘，EveryDev 档案记 Employees 为 1 而 LinkedIn 显示 2–10 人 [S3][S4][S5]。**扩编时点因此只能给出一个区间，无法精确到日**。

| 日期 | 事件 | 信源 |
|---|---|---|
| 2022 | 加入 Novu 任增长营销，两年内把仓库做到 30,000 GitHub stars | [S3] |
| 2024-01 | 从 Gitroom 转型，开始做社交媒体排程工具（Postiz 原型） | [S3] |
| 2024（前期） | SEO 渠道失败：内容投入 $12K、流量微弱，随即砍掉 | [S3] |
| 2024-09 | 产品开源，Apache 2.0 许可；三个月内 stars 从 3K 增至 14K | [S3] |
| 2024-11-20 | Product Hunt 正式发布 | [S5] |
| 2025-04-17 | 发布 v1.39.3，含 MCP、Auto-posters 与 Plugs | [S5] |
| 2025（一年内） | 收入从 $700/月 → $14.2K/月 → 472 付费订阅的 $17K MRR | [S3][S7] |
| 2025-12-28 | 新编辑器上线并开启联盟支付 | [S5] |
| 2026-01-30 | 大版本功能更新 | [S5] |
| 2026-02-11 | 支持 Skool 与 Whop 平台排期 | [S5] |
| 2026-03 | MRR $21K；OpenClaw 突破 100K stars，Nevo 启动 Agent 化重构 | [S3] |
| 2026-04 | MRR $80K；ARR Club 记录 ARR 达 $960K | [S3] |
| 2026-06 | MRR $118K | [S3][S4] |
| 2026-07-02 | 宣布 $145K MRR，每天增长 $1K | [S3] |
| 2026-08-30 | 第三方核验：TrustMRR 显示约 $182,586 的近 30 天实际收入与 $191,639 MRR，5,640 活跃订阅 | [S4] |
| 2026-10-08 | TrustMRR Stripe 验证：$251,282 MRR / 7,347 活跃订阅 | [S2] |
| 2026-11-04（本次检索） | TrustMRR 页面更新快照：$326,687 MRR / 9,585 活跃订阅 / 累计收入 $1,615,416 | [S2] |

## 历时性分析

### 阶段一：起点（2024-01 ~ 2024-09）

- **目标**：验证「开源 + 云托管」这套能否在社交媒体排程这个封闭市场里撕开一道口子。
- **关键动作**：从 Gitroom 转型；先试 SEO 并投 $12K；确定「不与 Buffer 抢同一批买家」的定位，转向开发者与注重隐私的团队 [S3]。
- **结果**：付费前期的公开表述是「I'm Making $700 Monthly With My Open-Source Scheduling Tool」[S3]——这是公开构建阶段的真实起点。2024 年 9 月开源成为决定性动作 [S3]。
- **信源**：[S3] [S7]

### 阶段二：转折（2024-09 ~ 2025-12）

- **目标**：用开源仓库作为漏斗顶端，把自托管用户转化为云端付费客户。
- **关键动作**：集中在 Hacker News、Reddit、Dev.to、Medium、Product Hunt 做发布周冲 GitHub trending [S3]；持续发布版本（2025-04-17 的 v1.39.3 加入 MCP、Auto-posters 与 Plugs）[S5]；扩展平台覆盖（Skool、Whop）[S5]。
- **结果**：仓库从 3K → 14K stars（三个月）→ 32K+ stars 与约 600 万次下载 [S3]；收入从 $700/月到 $14.2K/月再到 472 订阅的 $17K MRR [S3]。开源分发被证明是**唯一有效的渠道**，SEO 被证明是无效的 [S3]。
- **信源**：[S3] [S5] [S7]

### 阶段三：当前（2026 至今）——从「给人用」到「给 Agent 用」

- **目标**：在传统排程工具市场被 incumbents 占满的情况下，找到一个新的、不需要抢存量客户的客群。
- **关键动作**：发布 postiz-agent CLI 与 MCP Server；在 ClawHub 发布 skill；为每个「Agent + 平台」组合生成程序化落地页；把自我定位从「排程工具」改为「agentic 排程基础设施」[S3]。
- **结果**：MRR 从 2026-03 的 $21K → 04 的 $80K → 06 的 $118K → 07 的 $145K → 10-08 的 $251,282（Stripe 验证）→ 11-04 快照的 $326,687 [S2][S3]。第三方复盘记录了 2026-08-30 的核验：近 30 天实际收入约 $182,586、MRR $191,639、5,640 活跃订阅，隐含单订阅均价约 $34 [S4]。**这一阶段的转折点是客群重定位而非产品重做——产品底座始终是那个排程器**。
- **信源**：[S2] [S3] [S4]

## 共时性横向对标

Postiz 处在「社交媒体管理 + 内容创作」赛道。下表以本项目库内的同类型案例与真实市场产品对照。

| 对标项目 | 成立时间 | 团队规模 | 变现模式 | 营收规模 | 融资状态 | 信源 |
|---|---|---|---|---|---|---|
| 本案例 Postiz | 2024 | 创始人起步，已扩编至 2–10 人（LinkedIn 口径） | Apache 2.0 开源自托管免费 + 托管云订阅 | $251,282 MRR / 7,347 订阅（2026-10-08，Stripe 验证） | 自筹 | [S2][S3] |
| Buffer | 2010 | 已扩编 | 按席位订阅 | 未公开披露 | 已多轮融资 | [S3] |
| Hootsuite | 2007 | 已扩编 | 按席位订阅 | 未公开披露 | 已被私有资本收购 | [S3] |
| Algrow | 2025 | 1 人 | 订阅 + AI 用量积分 | 约 $14,000 MRR（创始人自报） | 自筹 | [S6] |
| TypingMind | 2023 | 1 人 | 买断 + 团队订阅 | 约 $137K/月（创始人自报） | 零融资自筹 | [S6] |
| n8n | 2019 | 1,100+ | 开源 + 托管订阅 + 企业支持 | 约 $169.6M（第三方估算） | 累计约 $240M，估值 $5.2B | [S3] |

对标结论有四条。

第一，**Postiz 是本批次中营收可验证性最强的案例**。Buffer 与 Hootsuite 都是成熟商业公司，营收不公开；Algrow 与 TypingMind 是创始人自报；n8n 是第三方估算。**只有 Postiz 有 Stripe API key 的逐笔验证** [S2]。这使它成为研究「一人公司（或近一人公司）真实营收曲线」最有价值的样本。

第二，**Postiz 与 n8n 是「开源即漏斗」这同一策略的两种规模结局**。Postiz 用 Apache 2.0 完全开源，托管云版是生意；n8n 用 fair-code 许可，托管云版 + 企业自托管 + 支持服务是生意 [S3]。**差别在于许可与产品深度**：Postiz 的产品是可被轻易复制的排程器，n8n 的编排引擎带企业级审计与治理，深、厚得多。

第三，**Postiz 与 Algrow 走的是同一条获客路径的两端**。Postiz 用开源仓库（32K stars、600 万下载）[S3]；Algrow 用 Discord 语音房（前 400 用户、零广告）[S6]。**两者都验证了同一件事：在开发者与创作者工具领域，社区是主要的获客渠道本身**。但 Postiz 的渠道**可被外部审计**（GitHub 数字公开可查），Algrow 的不可。

第四，**Postiz 在本批次中是唯一一个「客群从人类迁移到 Agent」的案例**。这一转向让它避开了与 Buffer、Hootsuite 的正面竞争——**在一个存量市场里，开创新客群比抢旧客群容易得多**。这个策略可迁移性很强，也是本案例最值得学习的部分。

## 七维深度分析

### 1. 产品功能

Postiz 的产品功能可以分成三层，而 2026 年的转向发生在最外层。

**第一层：排程内核**。连接 28+ 渠道——X、LinkedIn、Instagram、TikTok、YouTube、Reddit、Discord、Mastodon、Bluesky 等——用 AI 撰写或生成内容，并在一个日历里统一排期 [S3]。这是产品的底座，自 2024 年起基本未变。官网的 Agent 专页把这一层能力直接包装成「Social Media CLI for AI Agents」对外分发 [S3][S1]。

**第二层：创作与视觉**。AI 内容助手生成文案、标题、图片与视频；高级图片编辑器（Canva 类）；团队协作与任务委派；公开 API 与 Webhooks [S5]。产品更新日志显示 2025-12-28 上线新编辑器并开启联盟支付，2026-01-30 与 2026-02-11 分别做了大版本更新与 Skool/Whop 平台支持 [S5]。

**第三层（2026 年的新增，也是战略核心）：Agent 接口层**。postiz-agent CLI 与 MCP Server 让自主 Agent 能直接规划、发布与管理社交媒体账号；并在 ClawHub（OpenClaw 的技能注册表）发布 Postiz skill [S3]。**这一层把 Postiz 从「一个人用的 SaaS 面板」变成了「一个 Agent 会调用的基础设施」**。

**技术路线与模型来源**：**不自研模型，使用外部模型 API 做内容生成**；产品本体以 Apache 2.0 开源 [S3]。核心技术资产是调度引擎与渠道适配层——**这两块都是「脏活」：每个平台的 API 规则、格式限制、发布策略各不相同且持续变动，维护它们需要持续的工程投入但没有技术壁垒**。

**AI 对产品价值与一人成本结构的贡献**：价值贡献分两段。第一段是内容生成——AI 让「为 28 个平台各写一版适配内容」从一个下午的苦活变成几分钟。第二段是**这一段容易被忽略：AI Agent 接入把 Postiz 的分发价值放大了**。当 Agent 能调用 Postiz 时，Postiz 不再与 Buffer 争夺「人想排程」的意图，而是承接「Agent 想发内容」的新意图 [S3]。**这是 AI 时代一个特殊的产品机会——你的用户可能不是你想象的那个人。**

成本结构上，Postiz 有一个罕见的优势：**它的成本几乎不来自模型**。排程是一个相对轻量的计算，而内容生成只是产品的一小部分功能。这与 Algrow（视频与语音生成成本主导）形成鲜明对照——**Postiz 的毛利率理论上应显著高于生成型产品**，这一点在第三方复盘中也有讨论 [S4]。

### 2. 面向客群

Postiz 的客群经历了两次明显的变化，这两次变化是理解其增长的关键。

**第一阶段（2024）：开发者与注重隐私的团队**。超级框架复盘写得很清楚：Buffer 和 Hootsuite 解决了问题，但它们是封闭的、按席位计价的、规模化昂贵；开发者与注重隐私的团队希望能够自托管并扩展自己的工具，而大厂都不提供这个 [S3]。**这是一个有明确共同动机的人群：既懂技术、又在意数据控制、且预算敏感**。

**第二阶段（2025）：营销机构与 SaaS 公司**。第三方档案列出的市场包括内容创作者、数字营销机构、SaaS 公司、开发者与中小企业，定价档位为 Standard $29（5 渠道、400 帖/月）、Team $39（10 渠道、无限帖子、无限团队成员、100 张 AI 图/月）、Pro $49（30 渠道、300 张 AI 图/月）、Ultimate $99（100 渠道、500 张 AI 图/月、60 段 AI 视频/月）、Private [S5]。**Team 档的「无限团队成员」是一个重要信号**——它明确针对多成员机构而非个人。

**第三阶段（2026）：自主 Agent**。这是新客群，也是增量最大的客群。复盘的判断是：「当自主 Agent 在 2026 年开始运行营销工作流时，它们需要一个可编程的多平台发布方式——一个能从命令行驱动的 API 优先排程器。Incumbents 为人类构建面板，Postiz 为 Agent 构建了界面，于是成了『我的 Agent 如何发社交内容』的默认答案。」[S3]

**规模指标**：约 32K–35.3K GitHub stars、6,700 forks、约 600 万次容器下载 [S3][S4]；订阅侧 7,347（2026-10-08）至 9,585（2026-11-04 快照）[S2]。

**隐含均价的一致性检验**：$251,282 ÷ 7,347 ≈ $34/订阅；$326,687 ÷ 9,585 ≈ $34/订阅。第三方复盘也算出 $191,639 ÷ 5,640 ≈ $34 [S4]。**三个不同时点、不同订阅数都收敛到同一个 $34，说明订阅结构在这半年内高度稳定，且与 $29/$39 入门档 + 少量高阶档的混合模型完全吻合**。这是本案例数据质量的一个有力佐证。

### 3. 解决痛点

**痛点一：封闭、贵、不可扩展的 incumbent**。Buffer 与 Hootsuite 按席位收费，规模上去后成本线性增长，且数据在别人手里 [S3]。Postiz 的 Apache 2.0 自托管版本直接消解了这条顾虑。

**痛点二：跨平台的碎片化劳动**。每个平台有自己的格式限制、字符数、媒体规格、最佳发布时间；运营者要手工处理这些差异。

**痛点三（2026 年的新痛点，也是最大的机会）：Agent 无法驱动人类的界面**。这是本案例最值得记录的一次痛点重构。当 Agent 要发社交内容时，它不需要 dashboard，它需要 API、CLI 与 MCP [S3]。**而当时的市场上，主流排程工具全部是给人看的面板**。Postiz 提前做了 Agent 接口层，于是当 OpenClaw 引爆时，它恰好是那个「已经能被 Agent 调用」的工具。

**痛点四：多平台内容改写**。同一份内容要为不同平台调整格式与语气，AI 文案助手覆盖了这部分重复劳动 [S5]。

**传统解法为什么不够**：Buffer / Hootsuite 的产品形态决定了它们是给人用的；自建方案（各平台 API + 定时任务）成本高、维护重。**而 2026 年之前，几乎没有人意识到「Agent 要发社交内容」会成为一个真实的采购需求**——Postiz 的增长正是从这个无人认领的接口层开始的。

**这个案例给出的最普适的一条教训**：当一个大平台出现时，**最有效的策略不是和它做同一件事，而是成为它生态里的一环**。Nevo 没有去和 OpenClaw 竞争做更好的 Agent，而是让 Postiz 成为「Agent 发社交内容的默认通道」[S3]。

### 4. 预估年化营收

**当前值**：$251,282 MRR（2026-10-08，TrustMRR 通过 Stripe API key 验证）。

**推算方法与依据**：本文采用 TrustMRR 的 Stripe 级验证快照作为主口径——$251,282 MRR、7,347 活跃订阅、全部累计收入 $1,615,416 [S2]。**这是本案例库中可验证性最强的一个数字**，因为验证方式是通过 Stripe API key 直连账单，而非创始人自报。

**四套 MRR 数字的时点对照（这是本案例必须交代的核心）**：

| 数字 | 时点 | 来源与口径 | 信源 |
|---|---|---|---|
| $145K MRR | 2026-07-02 | 创始人 X 公告，同时称「每天增长 $1K」，并称「$2M ARR 不日可达」 | [S3] |
| 约 $182,586（近 30 天实际收入）/ $191,639 MRR | 2026-08-30 | 第三方核验，引用 TrustMRR 数据，5,640 活跃订阅 | [S4] |
| $250K | 2026 年（第三方区间表述） | 第三方复盘中的约数 | [S4] |
| $251,282 MRR / 7,347 订阅 | 2026-10-08 | TrustMRR Stripe API 验证 | [S2] |
| $326,687 MRR / 9,585 订阅 / 累计 $1,615,416 | 2026-11-04 页面更新快照 | TrustMRR Stripe API 验证 | [S2] |

**置信度：A**。给 A 的理由：① 通过 Stripe API key 逐笔验证 [S2]；② 隐含单价在不同订阅数下稳定收敛到约 $34，与公开定价档位吻合 [S2][S4]；③ 第三方复盘的近 30 天实际收入（$182,586）与 MRR（$191,639）几乎相等，说明**收入质量高、不是靠一次性或年费预收堆积** [S4]。

**不能做的事**：不能把 $145K、$250K、$251,282、$332K 混用成一个数字，也不能用「$250K MRR ≈ $3M ARR」这类简单年化掩盖时点差异。**本文在任何单处都标注时点**。

**关于 $332K**：本次检索中 TrustMRR 页面的最新快照显示 MRR $326,687 与 9,585 活跃订阅 [S2]，与任务说明中的 $332K 接近但不完全相同。两者应理解为**同一时点附近的两个抓取快照**，本文采用页面直接显示的 $326,687。

**留存是这组数字最脆弱的地方**：最新公开流失率仍是 14.6%（此前约 19%），第三方复盘明确指出「虽然这个数字不够新、不能直接套用到今天的客户群，但留存仍是最大的未解问题」[S4]。**数千个小额订阅意味着收入分散、不依赖少数大合同，但也意味着续费压力持续存在**。

### 5. 融资进展

**全程自筹（Bootstrapped），无外部融资记录。**

EveryDev 档案在 Quick Facts 中明确记录 Total Funding: Bootstrapped、Entity Type: Inc.、Employees: 1、Office Locations: Remote [S5]。**第三方的复盘同样写明「Bootstrapped」与「Solo founder」** [S3]。

**资金链条完全由前两款产品供给**。Nevo 在 Novu 做增长营销期间为公司开源仓库贡献价值并获得报酬（增长岗位 + 仓库 30K stars 的履历资产），随后 Gitroom 带来「it made money, but the market was tiny」[S3]——**首款产品虽小但真实盈利，为第二款提供了启动资金**。这是本案例库中一条清晰的「前一款养后一款」路径，与 TypingMind（Black Magic 养 TypingMind）[S6]、CodeSpring（多产品矩阵互相输血）[S6] 属于同一类。

**资本效率的一个直接体现**：第三方复盘称开源仓库是「以 $0 广告预算获得的」漏斗顶端 [S3]；而他此前在 SEO 上花掉的 $12K 已被完全砍掉 [S3]。**换句话说：Postiz 的全部获客支出约等于零，而曾经犯过的 $12K 错误也成为后续的学费。**

### 6. 市场评价

**正面评价**：

- **第三方复盘的开头即是结论**：「$145K MRR — The Open-Source Scheduler That Repositioned for AI Agents and 7x'd in 4 Months」[S3]。
- **战略判断被广泛认为正确**：「Instead of competing with Buffer for the same buyers, Postiz became infrastructure for a brand-new customer type.」[S3] 这句话是整个案例最凝练的总结。
- **渠道决断力**：$12K SEO 说砍就砍，Gitroom 六个月说转就转，第三方将其总结为「Ruthless channel pruning」[S3]。
- **发布节奏**：「Concentrated launch weeks across Hacker News, Reddit, Dev.to, Product Hunt and Medium — timed to spike GitHub trending — turned every release into an acquisition event.」[S3] 每次发布都是一次获客事件，这是开源产品运营的高阶形态。
- **方法论的复用性**：「Growing Novu to 30K stars taught Nevo the open-source playbook; Gitroom taught him launches. Postiz is the third product built on the same muscle.」[S3]——**这是本案例最有普适价值的一句：一套分发方法论可以在第三款产品上第三次生效。**

**负面评价与风险点**：

- **流失率是最实质的问题**。第三方复盘明确写道：「The weak point is churn. The latest public figure we found was still 14.6%, down from about 19%」[S4]。**在数千个小额订阅的结构下，14.6% 的月流失意味着客户基数在持续被替换**——增长必须跑赢流失才成立。
- **「一人公司」标签已不成立**。第三方复盘自己写道：「The 'one-person company' story is now a little too literal」[S4]；同时记录创始人已发布高级前端岗招聘 [S4]，EveryDev 记 1 人而 LinkedIn 显示 2–10 人 [S5]。**扩编时点只能给区间。**
- **约 80% 毛利的说法需要修正**。第三方复盘明确指出「the old 80%-margin claim should not be...」（原文在此处切断，语义为「不应被采信」）[S4]。**本案例的公开毛利数据不可靠，本文不引用任何毛利数字。**
- **开源 + 商业化的张力**：Apache 2.0 意味着任何人都能自托管甚至提供托管服务——**这正是 n8n 用 fair-code 许可要规避的问题** [S3]。Postiz 的护城河因此不在代码，而在渠道（仓库 stars、发布节奏、Agent 生态位）。
- **平台依赖**：28+ 渠道的每一个 API 规则都可能变更（X、Meta、Reddit 的开发者政策近年变动频繁）。**这是排程器行业的共性风险，也是所有排程产品的实际壁垒来源——不是技术，是持续维护。**
- **单一流量源依赖**：2026 年的增长高度依赖 OpenClaw 生态 [S3]。**OpenClaw 本身的治理结构变化（2026-07 转为非营利基金会）[S3] 对 Postiz 是中性偏正面（生态更稳定），但若 OpenClaw 生态热度回落，Postiz 的增量客群会同步收缩。**

**社区反馈的主要争议点**：在开源社区，Postiz 的 Apache 2.0 许可受到欢迎（自托管自由），但社区内部也有「免费自托管会不会蚕食云收入」的经典质疑。第三方复盘给出的回答是自托管者会「成为传教士、贡献者——最终成为更愿意付费而非自己维护服务器的云客户」[S3]。**这个转化路径在数据上得到了验证：订阅数从 472 涨到 7,347–9,585，说明自托管确实在漏斗顶端有效。**

### 7. 投入成本与合规风险

**投入成本结构**

模型调用与推理成本：Postiz 使用外部模型 API 做内容生成，但**排程本身是轻量计算**——这决定了它的成本结构与 Algrow 那种视频生成型产品截然不同。**模型成本在整体成本中的占比应当显著低于生成型工具**，这是它毛利率理论上更高的原因（尽管公开的 80% 说法不可靠 [S4]）。

供应商依赖与限流风险：两层依赖。第一层是**平台 API 依赖**——X、Meta、Reddit、TikTok 等的开发者政策与速率限制；这是排程器行业的共性风险，且是持续性的维护负担。第二层是**模型供应商依赖**，影响相对次要，因为生成只是功能之一。

云成本与工程成本：托管多租户 SaaS 的常规成本，加上**每个平台的适配维护**——这是真正的成本大头。第三方列出的合作伙伴 n8n、Make.com、Zapier 集成 [S5] 意味着还需维护外部集成。

人力成本：**这是本案最需要诚实交代的一项**。创始人在 $55K MRR 时仍自述一人公司 [S4]，但后来发布了高级前端岗招聘 [S4]，LinkedIn 显示 2–10 人 [S5]。**从一人到小团队的扩编时点无法精确定位**，只能确定发生在 2026 年、且发生在 Agent 化转型之后——因为要在 CLI、MCP Server、程序化落地页与 Agent 生态位上快速交付，一个人是不够的。

营销获客成本：**结构性为零**。开源仓库以 $0 广告预算获得 32K+ stars 与约 600 万次下载 [S3]；SEO 的 $12K 被完全砍掉 [S3]。

**合规与风险**

平台 API 政策合规：这是 Postiz 面临的最直接、最频繁的风险。X、Instagram、Reddit 等平台对自动化发布、批量互动、重复内容均有明确政策，且这些政策由平台单方面调整。**一次政策收紧就可能让某个渠道的排程功能失效**，而 Postiz 的价值主张恰恰建立在「一次连上、处处发布」之上。26+ 渠道意味着这个风险的暴露面很宽。

生成内容的广告合规：Postiz 生成的是要发到公开社交平台上的营销内容。**美国 FTC 的社交媒体营销指引（所有商业性内容需披露利益关系）**、以及各法域对 AI 生成内容标识的要求，会直接落到生成文案上。产品需要把「#ad 披露」与「AI 生成标识」做成创作流程的一部分，而非完全依赖用户自觉。

账号授权与凭据安全：Postiz 持有用户的 28+ 平台 OAuth 凭据。**这是它作为基础设施角色最重的信任责任**——凭据泄露等同于用户全部社交账号被接管。第三方工具被入侵导致用户 token 外泄，是这个产品形态的典型尾部风险。

跨境数据：用户内容与账号数据集中存储在平台侧，需要在隐私政策中明确处理者角色、数据驻留与保留期限。

内容归属与 AI 训练：用户生成的文案会被提交给模型供应商。**平台是否用这些内容训练模型，是一个必须在合同与设置中明确的问题**——对 B2B 客户尤其敏感。

监管适用性：直接监管压力较小（工具角色），但若平台的自动化能力被用于批量垃圾内容或协调操纵，将面临平台政策与可能的监管介入。

**平台政策风险**：这是本案例最实质的非技术风险，且它与「多渠道」这一核心价值主张直接相关——**渠道越多，单点失效的概率越高**。2026 年的 Agent 化转向部分缓解了这一点（如果用户是通过自托管或 API 使用，Postiz 更接近「基础设施」而非「发布者」），但也带来了新的合规面：Agent 自主发布内容的责任归属尚无成熟判例。

## 争议与不确定性

**数据冲突 1：MRR 的四套数字（必须按时点区分，不可混用）**
- $145K MRR：2026-07-02 创始人 X 公告 [S3]。
- $182,586（近 30 天实际收入）/ $191,639 MRR：2026-08-30 第三方核验引用 TrustMRR [S4]。
- $250K：第三方复盘中的约数 [S4]。
- $251,282 MRR / 7,347 订阅：2026-10-08 TrustMRR Stripe 验证 [S2]。
- $326,687 MRR / 9,585 订阅：2026-11-04 TrustMRR 页面更新快照 [S2]；任务说明中的 $332K 应为同一附近的另一快照。

处理方式：本文主口径采用 $251,282（2026-10-08，Stripe 验证），在营收章节以表格形式完整列出全部时点值，并在正文的每个数字处都标注日期。**明确不使用「$250K MRR ≈ $3M ARR」这类脱离时点的表述。**

**数据冲突 2：是否仍为「一人公司」**
- 创始人早期自述：$55K MRR 时仍称 one-person company [S4]；2026-07 第三方复盘亦写 still a one-person company [S3]。
- 反向证据：创始人随后发布高级前端岗招聘 [S4]；EveryDev 记 Employees 1 而 LinkedIn 显示 2–10 人 [S5]。
处理方式：本文明确表述为「创始人起步的单人产品，2026 年 Agent 化转型后已扩编为小团队（2–10 人区间口径），扩编精确时点未公开」，并**在 frontmatter 的 teamSize 中如实标注两种口径**。

**数据冲突 3：毛利数字不可靠**
第三方复盘直接指出旧的 80% 毛利说法不应被采信 [S4]。
处理方式：本文**全文不引用任何毛利数字**，在成本章节只做结构性分析（排程轻量、生成占比有限）。

**数据冲突 4：总部口径**
- EveryDev 记 New Castle, Delaware, United States [S5]。
- 创始人是以色列人，早期信息与产品团队在以色列 [S3]；final-50.md 记录为以色列。
处理方式：本文在 frontmatter 采用第三方档案明确记录的特拉华州纽卡斯尔 [S5]，并在正文中指出创始人来自以色列、团队分布存在跨地口径差异，不做调平。

**数据冲突 5：GitHub stars 口径**
32K+（2026-07 复盘）[S3] 与 35,300（2026-08-30 第三方核验）[S4] 并存。
处理方式：本文表述为「约 32K–35.3K stars」，并按来源标注时点；差异属自然增长。

**未能核实的项**
- **扩编的精确时点与当前团队人数**：未公开披露。仅有区间（2–10 人）与「发布过高级前端岗招聘」这一间接证据 [S4][S5]。
- **流失率的当前值**：最新公开数字为 14.6%，第三方明确说明该数字「不够新、不能直接套用到今天的客户群」[S4]。当前值未公开。
- **毛利与真实成本结构**：未公开披露；旧的 80% 说法已被明确否定 [S4]。
- **A 级 / Enterprise 客户数与贡献比例**：未公开披露。
- **年度经常性收入（ARR）与 MRR 的差额来源**（年付折扣、预付年费）：未公开披露。
- **OpenClaw 生态对 Postiz 增量营收的具体贡献占比**：未公开披露。
- **融资**：无任何外部融资记录 [S5]；具体是否有过可转债、SAFE 等非公开工具：未公开披露。
- **单订阅均价的档位分布**（$29/$39/$49/$99 各占多少）：未公开披露，仅能推出混合均价约 $34。
- **平台渠道中实际启用比例**（28+ 渠道里有多少是活跃使用的）：未公开披露。

**判断保留**
1. **本案例最重要的结论是战略而非数字**：**「不要和 incumbents 抢同一批买家，要成为新客群的基础设施」**。Postiz 的增长不是靠更好的排程器，而是靠在 OpenClaw 爆发时已经做好了 Agent 接口层 [S3]。这条经验的可迁移性远高于 $251,282 这个数字。
2. **它同时是「开源分发」与「一人公司」两条线最完整的证据链**。从 Novu 的 30K stars，到 Gitroom 的教训，到 Postiz 的 32K–35.3K stars 与 $0 广告预算 [S3]——**分发能力是一种可以跨产品复用的资产**，第三方复盘称之为「the same muscle」[S3]。
3. **不宜把它写成「一人公司 $250K MRR」的成功学案例**。它是创始人起步的项目，但当前已是 2–10 人的小团队 [S4][S5]；而且 14.6% 的流失率 [S4] 意味着**规模增长必须跑赢持续流失**——这一点比任何 MRR 数字都更能说明这份生意的真实难度。

## 信源与核验

| 编号 | 标题 | 发布方 | 发布日期 | 访问日期 | 类型 | 链接 |
|---|---|---|---|---|---|---|
| S1 | Postiz 官网 | Postiz | 2024-01-01 | 2026-11-04 | 一手信源 | [链接](https://postiz.com) |
| S2 | Postiz 营收页（Stripe API 验证） | TrustMRR | 2026-10-08 | 2026-11-04 | 第三方数据库 | [链接](https://trustmrr.com/startup/postiz) |
| S3 | Postiz — $145K MRR：重新定位为 AI Agent 排程工具，4 个月 7 倍增长 | Superframeworks | 2026-07-04 | 2026-11-04 | 媒体报道 | [链接](https://superframeworks.com/case-study/postiz) |
| S4 | Is Postiz really making $180k/m? | Steal What Works | 2026-08-30 | 2026-11-04 | 媒体报道 | [链接](https://stealwhatworks.com/blogs/news/postiz-making-180k-per-month) |
| S5 | Postiz 开发者档案与产品参数 | EveryDev | 2026-01-01 | 2026-11-04 | 第三方数据库 | [链接](https://www.everydev.ai/developers/postiz) |
| S6 | The quiet way this SaaS reached 10,000 users | Startup Series | 2025-01-01 | 2026-11-04 | 媒体报道 | [链接](https://startupseries.io/the-quiet-way-this-saas-reached-10000-users/) |
| S7 | Open Source Playbook: How Nevo Built Postiz into a $17K/mo SaaS | StackStarts | 2025-01-01 | 2026-11-04 | 媒体报道 | [链接](https://stackstarts.com/open-source-playbook-how-nevo-built-postiz-17k-mrr/) |
