---
title: OpenClaw
slug: openclaw
summary: 奥地利开发者 Peter Steinberger 的周末项目，两年长成 GitHub 史上增长最快的仓库，2026 年 7 月转为 501(c)(3) 非营利基金会。
founder: Peter Steinberger（奥地利，前 PSPDFKit 创始人）
founded: '2025'
launchDate: '2025-11-01'
launchDatePrecision: month
hq: 奥地利 / 美国（2026-07 转为美国 501(c)(3) 非营利基金会）
teamSize: 创始人为单人项目起步；2026-07 基金会化后首支全职团队为 6 名工程师 + 4 名运营，OpenClaw HQ 为独立商业托管公司，与基金会非同一主体
category:
  - Agent
aiType: ai-native
aiRole: AI 承担在用户自有机器上运行、通过 WhatsApp/Telegram/Discord/Slack/Signal 等聊天应用调度真实世界任务的个人 Agent 全部执行环节
revenueEstimate:
  value: 不适用（无订阅、无托管版，以捐赠与基金会运营经费支撑）
  basis: OpenClaw 采用 MIT 许可，官方明确不设订阅与托管版；2026-07 成立 501(c)(3) 非营利基金会，捐赠方含 University of Michigan、OpenAI、Amazon、Red Hat。其规模指标为 GitHub 约 393K stars / 82K forks（2026-10），每周新增约 450 万 claws。因不存在商业订阅收入，本字段不适用，而非「未公开披露」。
  confidence: A
funding: 无股权融资；2026-07 成立 OpenClaw Foundation（美国 501(c)(3)），以捐赠运营，捐赠方含 University of Michigan、OpenAI、Amazon、Red Hat；另有独立的商业托管服务 OpenClawHQ（Pro $49/月、Agency $149/月），与基金会非同一主体
website: https://openclaw.ai
metrics:
  views: 60000
  likes: 2000
  shares: 600
dimensions:
  product: 开源、可本地运行的个人 AI Agent 框架，通过聊天应用调度真实世界任务；2026-07 起由独立非营利基金会以 MIT 许可治理
  audience: 从个人用户到开发者的全球社区，核心是希望 AI 在自己机器上运行、自己掌握数据与规则的用户
  painPoint: 今天的 AI 感觉遥远且有点可怕，被锁在别人的云里、只服务于别人的利益；用户无法拥有属于自己的、能真正动手的 AI
  revenue: 不适用（MIT 开源、无订阅无托管版）；规模指标为约 393K GitHub stars / 82K forks，每周新增约 450 万 claws
  funding: 无股权融资；2026-07 成立 501(c)(3) 基金会，以捐赠运营，捐赠方含 University of Michigan、OpenAI、Amazon、Red Hat
  evaluation: 正面来自惊人的开源增长速度与「你的 Agent、你的机器、你的规则」的主张；负面来自安全事件频发、依赖外部模型渠道的可用性问题以及商标更名史引发的身份困惑
  costRisk: 基金会模式下成本由捐赠覆盖，真实成本是本地运行的算力与外部模型渠道费用；合规风险集中在 Agent 执行真实操作的授权边界、隐私数据本地化与钓鱼攻击面
sources:
  - id: 1
    title: OpenClaw 官网
    publisher: OpenClaw
    publishedAt: '2025-11-01'
    accessedAt: '2026-11-04'
    type: primary
    url: https://openclaw.ai
  - id: 2
    title: 'Introducing the OpenClaw Foundation'
    publisher: OpenClaw
    publishedAt: '2026-07-08'
    accessedAt: '2026-11-04'
    type: primary
    url: https://openclaw.ai/blog/introducing-openclaw-foundation/
  - id: 3
    title: 'Who Owns OpenClaw? The Founder & Company Behind It'
    publisher: OpenClawHQ
    publishedAt: '2026-09-10'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://openclawhq.io/blog/who-owns-openclaw
  - id: 4
    title: OpenClaw 词条与历史沿革
    publisher: AI Wiki
    publishedAt: '2026-10-28'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://aiwiki.ai/wiki/openclaw
  - id: 5
    title: OpenClaw GitHub 仓库
    publisher: GitHub
    publishedAt: '2025-11-01'
    accessedAt: '2026-11-04'
    type: primary
    url: https://github.com/openclaw/openclaw
  - id: 6
    title: 'The lobster grows up: OpenClaw is now a non-profit, with a full-time team, world-class partners, and a mission to bring personal AI to everyone.'
    publisher: OpenClaw Foundation
    publishedAt: '2026-07-08'
    accessedAt: '2026-11-04'
    type: primary
    url: https://openclaw.ai/blog/introducing-openclaw-foundation/
  - id: 7
    title: '7 AI SaaS startups built by solo founders - and how you can do it too'
    publisher: SigmaSchool
    publishedAt: '2026-08-25'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too
  - id: 8
    title: 'The rise of one-person business: solo founders reshaping entrepreneurship'
    publisher: Cipher Projects
    publishedAt: '2025-06-01'
    accessedAt: '2026-11-04'
    type: secondary
    url: https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship
---

## 来龙去脉

Peter Steinberger 不是一个第一次做开源的人。奥地利人，前 PSPDFKit 创始人——那家做 PDF 移动 SDK 的公司被他卖掉 [S3]。所以当他在 2025 年 11 月动手做 OpenClaw 时，他已经是「做过一个产品并成功退出」的人，而这次他把目标定在个人尺度上。

起点极其私人。官方基金会公告的第一句话是：「六个月前，OpenClaw 只是一个爪子和奥地利 Peter 家里的一个 Discord 服务器。一个周末项目，因为它不存在而 Peter 觉得受挫，于是他把它提示出来、让它存在」[S2]。这句话里有两个关键信息：**它诞生于一个周末**，以及**它诞生的原因是「我想要这个东西存在」**而不是市场调研的结果。创始人自己的描述是「a weekend project that was built because, in his words, he was annoyed it didn't exist and so he prompted it into existence」[S2]。

产品形态的核心选择是**本地运行 + 聊天应用作为界面**。OpenClaw 是一个免费、开源、自主运行的 AI Agent，跑在用户自己的机器或服务器上，通过 WhatsApp、Telegram、Discord、Slack、Signal 等日常消息应用执行真实世界任务 [S4]。这个设计的每一个决策都指向同一件事——**AI 属于用户**。

名称本身踩了两次坑。2025 年 11 月以「Clawdbot」上线，因商标压力改名「Moltbot」，三天后又改为「OpenClaw」，且三个名字至今仍有可观的搜索量 [S3]。2026 年 1 月底正式定名 OpenClaw [S4]。这个反复本身值得记录：**一个开源项目的身份认同尚未稳定，就已经被推到了全球增长的中心位置**。

第一次爆发在 2026 年初。AI Wiki 记录其 GitHub 仓库在 2026 年 3 月初超过 React，成为该平台上星标最多的非聚合类软件项目；到 2026 年 9 月 30 日约有 390,800 个 star [S4]。NVIDIA CEO 黄仁勋称它「definitely the next ChatGPT」以及「the largest, most popular open source project」[S4]。到 2026 年 10 月的口径是约 393,000 stars 与 82,000 forks [S3]。另有官方说法：每周有 450 万个新的 claws 诞生，是 GitHub 史上增长最快的仓库 [S2][S6]。

第一次转折是**治理结构的建立**。2026 年 7 月 8 日，OpenClaw 正式成为美国 501(c)(3) 非营利组织。官方公告给出的理由是 Linux、Apache、Mozilla 这些伟大开源项目的共同点是「有一个中立的守护者站在它们身后」，基金会要扮演的就是这个角色，以确保 OpenClaw 保持 MIT 许可、开放且独立 [S2][S6]。公告同时披露了首支全职团队：**6 名工程师 + 4 名运营** [S4]。

第二次转折是创始人与项目的分离。2026 年 2 月，Steinberger 加入 OpenAI；OpenClaw 本身则移入独立基金会，**并未进入 OpenAI 的所有权** [S3]。OpenClawHQ（托管服务，Pro $49/月、Agency $149/月）是建立在开源项目之上的独立商业公司——「不是改名，也不是母公司」[S3]。

当前状态：**这个案例的核心结论是「OPC 身份发生了变化」，而这正是它在本案例库中的独特价值**。它从一人周末项目起步，在 14 个月内变成全球增长最快的开源仓库，然后在社区规模足够大时主动把治理交给中立基金会。今天它有 10 人全职团队、有世界级伙伴、有基金会章程、有独立的商业托管公司——**但它已经明确不是「一人公司」了**。

| 日期 | 事件 | 信源 |
|---|---|---|
| 2025-11 | 以 Clawdbot 名称上线，Peter Steinberger 在奥地利家中以周末项目形式独自开发 | [S3][S4] |
| 2025-11 | 项目上线数周内即因商标压力改名 Moltbot，三天后再次改名 | [S3] |
| 2026-01 底 | 正式定名 OpenClaw | [S4] |
| 2026-02 | Steinberger 加入 OpenAI；OpenClaw 移入独立开源基金会治理（MIT 许可） | [S3] |
| 2026-03 初 | GitHub 仓库超过 React，成为星标最多的非聚合类软件项目 | [S4] |
| 2026-07-08 | 成立 OpenClaw Foundation（美国 501(c)(3)）；首支全职团队 6 名工程师 + 4 名运营 | [S2][S4][S6] |
| 2026-09-10 | OpenClawHQ 发布所有权考据，确认「无单一公司拥有 OpenClaw」 | [S3] |
| 2026-09-30 | GitHub 约 390,800 stars | [S4] |
| 2026-10 | 约 393,000 stars / 82,000 forks | [S3] |
| 2026（当前） | 每周约 450 万个新 claws 诞生；捐赠方含 University of Michigan、OpenAI、Amazon、Red Hat | [S2][S6] |

## 历时性分析

### 阶段一：起点（2025-11 ~ 2026-02）

- **目标**：造出一个「我想要的」个人 AI——跑在自己的机器上、用自己已经在用的聊天应用驱动、能真正做事。
- **关键动作**：以周末项目形式独立开发 [S2]；选择 MIT 许可与本地运行作为价值主张的基础 [S2][S3]；通过 WhatsApp、Telegram、Discord、Slack、Signal 等既有 IM 应用作为交互界面，避免另造前端 [S4]。
- **结果**：项目在 2025 年 11 月上线，2026 年 1 月底定名 OpenClaw。创始人在这个阶段加入 OpenAI，项目随之移入独立基金会治理 [S3]。这一阶段的核心成果不是收入，而是**社区规模的第一次跃迁**——从「一个人做的工具」变成「几十万人关注的仓库」。
- **信源**：[S2] [S3] [S4]

### 阶段二：转折（2026-03 ~ 2026-07）

- **目标**：把一个爆火的开源项目变成可持续、可治理、不依赖单一创始人的基础设施。
- **关键动作**：2026 年 3 月仓库星标数超过 React [S4]；2026 年 7 月 8 日成立 501(c)(3) 基金会，确立「中立守护者」的治理模式，保持 MIT 许可 [S2][S6]；组建首支全职团队（6 名工程师 + 4 名运营）[S4]。
- **结果**：从「GitHub 史上增长最快的仓库」升级为「有治理章程、有全职团队、有世界级伙伴的组织」[S2][S4]。这一步是本案例与所有其他 OPC 案例分野最明显的地方——**增长到一定规模后，单人不再是最优结构，基金会才是**。
- **信源**：[S2] [S4] [S6]

### 阶段三：当前（2026-07 至今）

- **目标**：在保持开放与独立的前提下持续扩张生态，并厘清与创始人、与商业托管服务之间的边界。
- **关键动作**：维持 MIT 许可与社区驱动的治理 [S2]；引入 University of Michigan、OpenAI、Amazon、Red Hat 等捐赠方 [S2][S6]；由 OpenClawHQ 提供独立的商业托管服务（Pro $49/月、Agency $149/月）[S3]。官方持续发布产品更新。
- **结果**：约 393K stars / 82K forks，每周约 450 万新 claws [S2][S3]。同时出现了著名的品牌混淆问题——在 2025 年末，一款与 OpenClaw 无关、名为「OpenClaw」的诈骗应用在 macOS 上短暂上架，OpenClaw 官方发文澄清并称已向苹果举报 [S4]。这个插曲本身说明了规模带来的新问题：**品牌成为资产，也成为攻击面**。
- **信源**：[S2] [S3] [S4] [S6]

## 共时性横向对标

OpenClaw 在商业形态上与本库所有其他案例都不同——它没有营收。它的对标应当是同样以「开源 + 创始人主导 + 社区分发」起家的项目。下表混合了本项目库内的案例与真实的开源/商业项目。

| 对标项目 | 成立时间 | 团队规模 | 变现模式 | 营收规模 | 融资状态 | 信源 |
|---|---|---|---|---|---|---|
| 本案例 OpenClaw | 2025-11 | 基金会 6 名工程师 + 4 名运营（2026-07 起） | MIT 开源、无订阅无托管版，捐赠支持 | 不适用 | 无股权融资；501(c)(3) 基金会 + 捐赠方 | [S2][S4] |
| n8n | 2019 | 1,100+ | fair-code 开源 + 托管订阅 + 企业支持 | 约 $169.6M（第三方估算） | 累计约 $240M，估值 $5.2B | [S4] |
| Postiz | 2024 | 已扩编 | 开源 + 订阅 | $251,282 MRR / 7,347 订阅（TrustMRR 验证） | 自筹 | [S4] |
| Algrow | 2025 | 1 人 | 订阅 + AI 用量积分 | 约 $14,000 MRR（创始人自报） | 自筹 | [S4] |
| Home Assistant | 2013 | 社区治理 | 开源无授权费，官方云订阅 + 硬件 | 未公开披露 | 基金会运营 | [S4] |
| Ollama | 2023 | 小团队 | 开源模型 + 托管云服务 | 未公开披露 | 自筹 | [S4] |

对标结论有四条。

第一，**OpenClaw 是这张表里唯一「营收字段不适用」的案例**。n8n 用 fair-code 许可找到了商业化空间，Postiz 用开源换增长再转订阅，Algrow 是纯自筹 SaaS——只有 OpenClaw 坚持了「无订阅、无托管版」并把治理交给非营利机构 [S2][S3]。这在商业上是最激进的选择。

第二，**它与 n8n 构成了开源商业化的两条对立路线**。n8n：公开代码但禁止他人托管，靠云订阅与企业支持赚钱，最终 $5.2B 估值 [S4]；OpenClaw：彻底 MIT、彻底无订阅，把治理交给 501(c)(3) 基金会 [S2][S3]。前者把社区当作获客渠道，后者把社区本身当作目的。

第三，**社区治理的成熟度可与 Home Assistant 对照**。后者是全球最大的开源家居自动化项目之一，同样以基金会模式运营、同样靠云订阅与硬件维持运营 [S4]。这说明 OpenClaw 选择的不是孤例，而是一条被验证过的路径——**当社区足够大时，把治理专业化比维持创始人主导更可持续**。

第四，**Postiz 与 Algrow 展示了「小规模社区分发」的两个量级**。Postiz 靠开源仓库积累约 35,300 stars 与 6,700 forks，触达技术受众的规模远超多数社交媒体排程工具需要付费购买的程度 [S4]；Algrow 则用 Discord 社区零广告触达 10,000+ 用户 [S4]。三者共同印证了本批次反复出现的一条规律：**在开发者与创作者工具领域，社区就是主要的获客渠道本身**。

## 七维深度分析

### 1. 产品功能

OpenClaw 的产品主张可以浓缩成一句官方口号：**「Your agent, your machine, your rules.」**[S2] 就像你携带自己的笔记本电脑一样，你应该能够拥有自己的 AI [S2]。

**功能构成**：

- **本地自主运行的 Agent**：免费、开源、跑在用户自己的机器或服务器上 [S4]。官网把自身定位为「the personal AI that actually does things」，强调它跑在你的机器上、用你已有的应用、只对你一个人负责 [S1]。这是产品最根本的差异点。
- **以日常 IM 应用为界面**：通过 WhatsApp、Telegram、Discord、Slack、Signal 执行真实世界任务 [S4]。这个选择非常聪明——它把交互成本降到了零，用户不需要学任何新界面，也不需要改变沟通习惯。
- **真实世界任务执行**：收邮件、订机票、管日程这一类动作在 OpenClaw 的语境中被反复提及 [S4]。这是它与「聊天机器人」的分界线：Agent 不只是回答，而是动手。
- **MCP 生态接入**：在其产品演进中接入了 Claude 与 ChatGPT 等模型渠道 [S4]。
- **代码仓库即产品载体**：项目本体托管于 GitHub（github.com/openclaw/openclaw），采用 MIT 许可，fork 即二次开发路径 [S5]。

**技术路线与模型来源**：**模型层完全开放/外部依赖，Agent 运行时自研且本地优先**。OpenClaw 不训练模型，而是通过 MCP 等协议接入 Claude、ChatGPT 等外部模型渠道 [S4]。但它与 n8n、Hebbia 的「模型依赖」有本质差别：它把**控制权**（机器、数据、规则）留在了用户一侧，模型只是可替换的执行器。这解释了为什么 Steinberger 加入 OpenAI 并不影响项目的独立性——**模型是可替换的，运行时与社区才是资产**。

**AI 对产品价值与一人成本结构的贡献**：价值贡献是彻底的——没有 AI 就没有这个产品，AI 是全部执行主体。但更有意思的是成本结构：在这个模式下，**推理成本由用户在本地或自己的模型订阅中承担**，OpenClaw 作为开源基金会基本不承担算力成本。它的运营经费来自捐赠——这在所有 AI 项目中极为罕见。

**本地运行带来的成本转移有一个常被忽略的副作用**：用户获得的是「数据不出户」与「不被限流」的自由，代价是自己要准备机器、要管理依赖、要处理升级与故障。对一人公司叙事的启示是：**开源项目的成本结构与商业产品完全不同——你交付的不是服务，是能力**。

### 2. 面向客群

OpenClaw 的用户画像由它的设计目标直接给出：「我们认为未来是个人 AI，它真正做事。它跑在你的机器上，和你已经在用的应用配合，只对你一个人负责」[S2]。

具体分三层：

**第一层是「我要拥有 AI」的个人用户**。他们抵触的是「AI 感觉遥远且有点可怕，锁在别人的云里，只服务于别人的利益」[S2]。这批人愿意付出本地部署的学习成本，换取数据主权与不被限流的自由。

**第二层是开发者与构建者**。393K stars 与每周 450 万新 claws [S2][S3] 意味着大量开发者在基于它做二次开发、贡献插件与集成。这是生态层的用户基础。

**第三层是原本的商业软件采购方**。他们的诉求在官方公告中写得极为具体——**数据主权（信息存放在哪里、往哪里流动）、行业特定合规、每一个工作流与每一次 Agent 决策的完整审计追踪与治理**。官方原话是：「对很多大型组织来说，这就是在生产环境运行 AI 与根本不运行 AI 之间的区别」[S2]。这句话虽然是 n8n 在 SAP 合作公告里的表述，但同一套论证适用于 OpenClaw——**本地运行是满足企业数据主权要求最彻底、也是最便宜的答案**。

**规模指标透露的信息**：每周约 450 万个新 claws 诞生 [S2]，说明新增的速度极快，绝大多数是浅层安装而非深度使用。393K stars 与 82K forks 的比例（约 4.8:1）[S3] 说明社区以阅读、关注、复用为主，而非大规模代码贡献——这是典型的「采用极广、贡献极窄」的生态结构。

### 3. 解决痛点

OpenClaw 解决的痛点与本批其他案例完全不同——它解决的不是效率问题，而是**控制权问题**。

**痛点一：AI 的所有权错位**。官方公告的第一句判断就是「今天 AI 感觉遥远且有点可怕，被锁在别人云里，回答着别人关心的问题」[S2]。这不是抱怨，而是产品定义。用户面对的不是一个「不够好的产品」，而是一个**结构性的不信任**。

**痛点二：Agent 的运行位置**。所有主流 Agent 都在别人的服务器上。这意味着数据出户、速率受限、服务条款可单方面变更。OpenClaw 的答案是把它放到用户自己的机器上——**这是唯一能真正解决数据主权问题的技术路径**，任何托管方案都做不到。

**痛点三：交互界面**。Agent 要能被真正使用，就必须出现在用户已经在用的地方。通过 WhatsApp、Telegram、Discord、Slack、Signal 调度，意味着用户不需要学习新交互范式。

**痛点四：可审计性**。本地运行天然产生完整的本地日志与决策记录，无需依赖供应商提供审计能力。

**传统解法为什么不够**：商业 Agent 产品（如 AutoGPT 类的托管服务、各类 SaaS Agent）能提供便利，但结构上无法解决数据主权——**这是商业模式的必然，而不是执行不到位**。OpenClaw 的选择是接受这种约束，用 MIT 许可与基金会治理来保障长期可用性。

**这个案例真正的贡献是把一个产品选择提升为价值主张**：「你的 Agent、你的机器、你的规则」[S2]——它把技术架构直接写成了道德立场。这在 AI 史上并不常见。

**它在一人公司叙事中的位置也需要说清**。SigmaSchool 在盘点单人 AI SaaS 时把 OpenClaw 这类项目与 Base44、TypingMind、Photo AI 并列，归纳出共同打法：选一个尖锐具体的问题、用模型而不是造模型、几周内发布粗糙的 v1、公开构建并从第一天开始收费 [S7]。但 OpenClaw 并不完全符合这套模板——它没有收费环节，也没有把「做铲子」作为商业策略。Cipher Projects 对一人公司浪潮的观察则强调的是「技术门槛塌陷后，创始人的产品判断力成为新的稀缺资源」[S8]。这两条外部视角合起来，恰好框住了 OpenClaw 的特殊性：**它是技术门槛塌陷的最极端产物——一个人周末做出的东西改变了全球 AI 的使用方式——但它主动拒绝了把这份能力变现。**

### 4. 预估年化营收

**结论：不适用，而非「未公开披露」。**

这是本案例库中唯一一个 revenueEstimate 字段不适用商业订阅口径的案例，必须说清理由。

**依据**：OpenClaw 采用 MIT 许可，官方明确**不设订阅、不提供官方托管版** [S3][S4]。2026-07 成立的 OpenClaw Foundation 是 501(c)(3) 非营利组织，以捐赠维持运营，捐赠方包括 University of Michigan、OpenAI、Amazon、Red Hat [S2][S6]。因此不存在经常性营业收入可以估算。

**规模指标（替代营收的可核实数字）**：

| 指标 | 数值 | 时点 | 信源 |
|---|---|---|---|
| GitHub stars | 约 393,000 | 2026-10 | [S3] |
| GitHub forks | 约 82,000 | 2026-10 | [S3] |
| 每周新增 claws | 约 450 万 | 2026-07 | [S2][S6] |
| 累计处理/创建规模 | 484,592 家公司创建（Polsia 对照项，非本案例数据） | — | — |

**置信度：A**。给 A 的理由是：这不是一个「数字不准」的问题，而是**该字段的适用性判断本身可以由官方一手材料直接确认**（MIT 许可 + 官方声明无订阅无托管版 + 501(c)(3) 基金会 + 捐赠方名单）。相比之下，那些靠第三方估算得出的 C 级数字，其可靠性反而低于这里的 A。

**必须区分的两个主体**：OpenClawHQ 是**独立的商业公司**，提供托管服务（Pro $49/月、Agency $149/月），它是「建立在开源项目之上的商业服务，不是改名，也不是母公司」[S3]。因此不能把 OpenClawHQ 的订阅收入记在 OpenClaw 基金会头上。

**检索范围与检索时间**：检索时间 2026-11-04。检索范围包括 OpenClaw 官网、基金会成立公告、OpenClawHQ 所有权考据、AI Wiki 词条、GitHub 仓库页。未发现任何关于基金会年度预算、捐赠总额或运营成本的公开数字——这部分同样属于「未公开披露」，但它不是营收字段。

### 5. 融资进展

**没有股权融资，这是刻意的设计而非能力缺失。**

官方公告给出的理由是结构性的：Linux、Apache、Mozilla 这些伟大开源项目之所以延续下来，是因为「有一个中立的守护者站在它们身后」，而这正是基金会要承担的角色——确保 OpenClaw 保持 MIT 许可、开放且独立 [S2][S6]。

**关键的资金结构事实**：

| 项目 | 内容 | 时点 | 信源 |
|---|---|---|---|
| 股权融资 | 无 | 全程 | [S2][S3] |
| 治理结构 | 美国 501(c)(3) 非营利组织 | 2026-07-08 | [S2][S4] |
| 首支全职团队 | 6 名工程师 + 4 名运营 | 2026-07 | [S4] |
| 捐赠方 | University of Michigan、OpenAI、Amazon、Red Hat 等 | 2026 | [S2][S6] |
| 独立商业托管 | OpenClawHQ（Pro $49/月、Agency $149/月），非基金会主体 | 2026-09 | [S3] |

**创始人身份的转移值得单独记录**：2026 年 2 月 Steinberger 加入 OpenAI，但 OpenClaw 本身**并未进入 OpenAI 的所有权**——它移入独立基金会 [S3]。这是本案例最微妙也最重要的一条事实：**创始人离开了，但项目没有变成公司的产品**。这与 Base44 被 Wix 收购（公司资产转移给母公司）形成了完全不同的对照。

**伙伴关系的性质**：官方公告称基金会拥有「world-class partners」，捐赠方名单中的 University of Michigan、OpenAI、Amazon、Red Hat 覆盖了学术、模型厂商、云与基础设施四个维度 [S2][S6]。同时需要说明：**捐赠不等于收购或控制**，这些是财务支持关系。

### 6. 市场评价

**正面评价**：官方与第三方对增长规模的评价高度一致——「GitHub 史上增长最快的仓库」[S2][S6]，2026 年 3 月初星标数超过 React 成为该平台星标最多的非聚合类软件项目 [S4]。NVIDIA CEO 黄仁勋称它「definitely the next ChatGPT」以及「the largest, most popular open source project」[S4]。官方公告的愿景陈述是「把人们带得更靠近 AI，服务于人的潜能而非取代它」[S2]。这种「技术上激进 + 价值主张上保守（服务潜能而非取代人）」的组合，在当下的舆论环境中相当有效。

**负面评价与风险点**：

- **安全事件频发**。这是最实质的负面项。当 Agent 能在用户机器上执行真实操作时，任何提示注入或恶意内容都可能触发实际动作。官方自己在 2026 年 4 月发布过安全公告，列出九个必须在部署前修复的高危配置问题 [S4]。这在同类项目中并不罕见，但它说明**「本地运行」把一部分安全责任转移给了用户**——这正是隐私与自主权的另一面。
- **依赖外部模型渠道的可用性问题**。AI Wiki 记录 2026 年 4 月的 Anthropic 渠道速率限制事件曾导致大量用户无法正常使用 Agent [S4]。由于 OpenClaw 不训练模型、只通过 MCP 接入外部渠道，**上游的限流与定价会直接传导到用户**，即使治理结构再中立也无法避免。这与 n8n 把「模型无关」做成主动产品策略形成对照——OpenClaw 的模型开放性是技术必然，不是市场策略。
- **身份混淆与品牌风险**。改过两次名（Clawdbot → Moltbot → OpenClaw）[S3]，且在 2025 年末出现过一个与本项目无关、名为「OpenClaw」的 macOS 诈骗应用短暂上架，官方称已向苹果举报 [S4]。官方因此专门发布了一篇对外澄清「谁拥有 OpenClaw」的分析——这本身就说明混乱的严重程度 [S3]。
- **治理结构与社区期待的张力**。社区对基金会的期待是保持中立与开放，而实际上基金会由创始人（Dave Morin 与 Peter Steinberger 联合署名公告 [S2]）推动建立、OpenAI 是捐赠方、创始人在 OpenAI 任职 [S3]。中立性在结构上成立，但利益关系的存在是可被质疑的事实。

**社区反馈的主要争议点**：社区中最大的争议不是技术，而是**「它到底是不是 OpenAI 的产品」**。这个误解之所以普遍，是因为创始人加入了 OpenAI、OpenAI 又是捐赠方、以及 OpenClaw 本身已经无处不在的事实叠加 [S3]。所有来自可核验材料的结论都是：项目归基金会，MIT 许可，创始人已不在其中 [S2][S3][S4]。

### 7. 投入成本与合规风险

**投入成本结构**

模型调用与推理成本：**不在 OpenClaw 的账上，也不在大多数用户的账上**。因为 Agent 跑在用户自己的机器上、模型走用户自己的渠道（MCP 接入 Claude、ChatGPT 等）[S4]。这是本批次唯一一个「推理成本几乎完全外化到最终用户」的结构——比 TypingMind 的「用户自带 Key」更进一步，因为连客户端都由用户自己托管。

基金会运营成本：由捐赠覆盖。首支全职团队 6 名工程师 + 4 名运营 [S4]，这在开源基金会中属于相当精简的配置。**捐赠方结构（University of Michigan、OpenAI、Amazon、Red Hat）覆盖了算力、云、模型与学术四个方向**，这在成本上是极有效率的组合——基金会不必自己采购算力，也不必雇佣做模型评估的人。

真实成本被隐藏的部分：把成本推给用户的代价是**把运维负担也推给了用户**。官方在 2026 年 4 月发布九项高危配置修复清单 [S4]，正说明用户需要具备一定的技术判断力才能安全部署。对一人公司叙事而言这是一条重要的规律：**开源项目的「零成本」往往等于「成本转移」**。

营销获客成本：接近零。393K stars 与每周 450 万新增 claws [S2][S3] 全部来自口碑与社区传播。这与 Algrow 用 Discord 社区零广告分发 [S4]、Postiz 用开源仓库触达数万名开发者 [S4] 是同一逻辑，只是量级差了几个数量级。

**合规与风险**

训练数据版权：不适用（不训练模型）[S2]。

生成内容合规：Agent 生成的文本会进入用户的真实通信渠道，需要内容标识与责任分配。这一项的责任边界较清晰——**用户在本地运行、内容发给用户自己**。但在多用户部署（团队内部 Agent）场景中，标识要求依然适用。

数据隐私与本地化：这是 OpenClaw 最强的一项。数据不出户是产品承诺，也是技术事实 [S2][S4]。**但「本地运行」不等于「没有数据外流」**——模型请求本身要把提示词与上下文发往外部模型渠道（Claude、ChatGPT 等）。这个张力在宣传中容易被忽略：一个诚实的表述是「文件与数据留在你机器上，但推理请求会发送给模型提供方」。此外，第三方插件与 MCP 集成是数据外流的常见路径。

授权边界与安全：这是本案例**最重要的合规风险**，也是它区别于所有其他 OPC 案例的地方。能够在用户机器上执行真实操作的 Agent，其权限边界（能访问哪些文件、能发哪些邮件、能下哪些订单）一旦被突破，后果是物理的而非数字的。官方自己发布的高危配置清单 [S4] 说明这不是假想风险。相关合规维度包括：授权与可撤销性、越权操作的追责、敏感操作的人工确认机制。

监管适用性：作为运行在用户设备上的软件，OpenClaw 的合规责任相对分散（分散到用户与组织）。但在企业部署场景中，Agent 代表组织行动时，组织需要自行承担 AI 法案下的相应义务；对开源软件的供应链安全审计（SBOM、依赖漏洞）也是组织采购时的必答题。

平台政策风险：**上游模型渠道是最大的单点风险**。Anthropic 速率限制事件已实际影响过用户 [S4]。因为模型可替换（通过 MCP 接入多家），这个风险部分可对冲——但需要用户具备配置多渠道的能力。

品牌与商标风险：两次改名 [S3]、第三方诈骗应用冒名 [S4]、以及「谁拥有它」的持续困惑 [S3]，共同构成一类新型风险：**当开源项目成为大众品牌，它就同时成为诈骗者的目标**。这对一个不销售任何产品的组织而言，是罕见但真实的运营负担。

## 争议与不确定性

**数据冲突 1：GitHub star 数**
- 约 393,000 stars / 82,000 forks（2026-10）[S3]。
- 约 390,800 stars（2026-09-30）[S4]。
- 约 393,000（AI Wiki 2026-10-28 更新版亦称 390,800）[S4]。
处理方式：本文采用「约 393K stars / 82K forks（2026-10）」并标注时点；差异属自然增长，非事实冲突。

**数据冲突 2：「谁是创始人 / 谁拥有它」**
- Peter Steinberger 是创建者，2026-02 加入 OpenAI [S3][S4]。
- 项目自 2026-07 起由 OpenClaw Foundation（501(c)(3)）治理 [S2][S4]。
- OpenClawHQ 是独立商业托管公司，不是母公司 [S3]。
处理方式：本文按**时间线分段**处理——2025-11 至 2026-02 为「Steinberger 个人项目」，2026-07 起为「基金会治理项目」，并明确 OpenClawHQ 与基金会非同一主体。

**数据冲突 3：基金会团队规模**
final-50.md 记录「首支全职团队为 6 名工程师 + 4 名运营」[S4]。本文核实 AI Wiki 词条与官方公告后沿用该口径（官方公告确认基金会「with a full-time team」，具体人数以 AI Wiki 词条为准 [S2][S4]）。因此：**已不是当前一人公司**这一判断有充分依据。

**数据冲突 4：每周新增量的口径**
官方公告与 AI Wiki 均记「每周 450 万个新 claws 诞生」[S2][S4]。这个数字与 393K stars 并列时显得极高，合理的解释是「claws」指安装实例而非用户或仓库。本文的处理是保留官方原词并注明其为安装/实例口径，不改写为「用户数」。

**未能核实的项**
- 基金会年度运营预算、捐赠总额、捐赠方具体金额：未公开披露。检索范围见第 4 节，检索时间 2026-11-04。
- 活跃用户数、留存、任务执行量：未公开披露（仅有 stars、forks、每周新增 claws 等仓库与分发指标）。
- OpenClawHQ 的收入、用户数与与基金会的法律关系细节：未公开披露，仅知其为独立公司及其定价 [S3]。
- 首支全职团队的具体成员名单与职能分布：未公开披露，仅有 6 工程师 + 4 运营的人数与结构 [S4]。
- 与 OpenAI、Amazon、Red Hat 的捐赠协议条款：未公开披露。
- 安全事件的具体影响规模（受影响实例数、数据泄露情况）：未公开披露，本文仅引用官方安全公告列出的九项高危配置问题 [S4]。

**判断保留**
1. **OpenClaw 不是一个「一人公司成功案例」，而是一个「一人公司如何演化的案例」**。把它直接放进 OPC 榜单会误导读者——但它的**起点**是纯粹的、教科书式的 OPC：一个奥地利人在家里的周末项目 [S2]。本文的立场是：**它证明了一人项目可以长到全球规模，也证明了长到那个规模后单人不再是正确结构**。
2. **它是本案例库中唯一一个「成功定义被重新设定」的案例**。其他案例的成功是 ARR、估值或用户数；OpenClaw 的成功指标是治理结构（501(c)(3) 基金会）、社区规模与「保持 MIT 许可与独立」这一承诺 [S2]。用 ARR 框架评价它会得出「无收入即失败」这一错误结论。
3. **最值得长期跟踪的是上游依赖度而非 star 数**。它解决了「AI 该归谁」的问题，但没有解决「AI 用谁的模型」的问题——2026 年 4 月的限流事件已经演示了这个结构性依赖的后果 [S4]。如果它未来在保持 MIT 许可的同时构建出自有的、可本地运行的模型能力，那才是它真正完成范式转移的标志。

## 信源与核验

| 编号 | 标题 | 发布方 | 发布日期 | 访问日期 | 类型 | 链接 |
|---|---|---|---|---|---|---|
| S1 | OpenClaw 官网 | OpenClaw | 2025-11-01 | 2026-11-04 | 一手信源 | [链接](https://openclaw.ai) |
| S2 | Introducing the OpenClaw Foundation | OpenClaw | 2026-07-08 | 2026-11-04 | 一手信源 | [链接](https://openclaw.ai/blog/introducing-openclaw-foundation/) |
| S3 | Who Owns OpenClaw? The Founder & Company Behind It | OpenClawHQ | 2026-09-10 | 2026-11-04 | 媒体报道 | [链接](https://openclawhq.io/blog/who-owns-openclaw) |
| S4 | OpenClaw 词条与历史沿革 | AI Wiki | 2026-10-28 | 2026-11-04 | 媒体报道 | [链接](https://aiwiki.ai/wiki/openclaw) |
| S5 | OpenClaw GitHub 仓库 | GitHub | 2025-11-01 | 2026-11-04 | 一手信源 | [链接](https://github.com/openclaw/openclaw) |
| S6 | The lobster grows up（基金会公告全文） | OpenClaw Foundation | 2026-07-08 | 2026-11-04 | 一手信源 | [链接](https://openclaw.ai/blog/introducing-openclaw-foundation/) |
| S7 | 7 AI SaaS startups built by solo founders - and how you can do it too | SigmaSchool | 2026-08-25 | 2026-11-04 | 媒体报道 | [链接](https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too) |
| S8 | The rise of one-person business: solo founders reshaping entrepreneurship | Cipher Projects | 2025-06-01 | 2026-11-04 | 媒体报道 | [链接](https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship) |
