# 全球 AI 一人公司（OPC）候选池（定稿版）

> **状态**：定稿（研究日志见 `research-log.md`，写作输入见 `final-50.md`）
> **定稿日期**：2026-11-04
> **收录标准（五条须同时满足）**：① AI 强相关（硬门槛）② 单一创始人创立且早期单人运营 ③ 有公开可验证商业成功证据 ④ 全球市场或具全球参考价值 ⑤ 公开信息量足以支撑七维深度分析与信源交叉验证（≥5 条信源、≥1 一手、≥2 个独立发布方）
> **AI 契合类型**：`ai-native`（产品本体即 AI 产品）/ `ai-embedded`（产品主体非 AI，但关键功能由 AI 支撑且 AI 是其差异化与价值来源）/ `ai-enabled-ops`（非 AI 产品，由单人 + AI 工具链完成 0→1 并跑通商业化）
> **类别枚举（仅允许以下 8 类）**：AI生成 / AI助手 / Agent / 开发者工具 / 内容创作 / 教育 / 垂直应用 / 基础设施
> **配额约束**：最终 50 个正式案例中 `ai-native` ≥ 30 → **实得 48 个** ✅

---

## 一、淘汰统计（先看结论）

| 淘汰原因分类 | 数量 | 说明 |
|---|---|---|
| **多人创立淘汰** | **22** | 公司自述或权威报道中明确出现"co-founder / 联合创始人 / 与 X 共同创立"，或官方页列出 2 位以上 Founder |
| **非 AI 相关淘汰** | **7** | 产品主体与 AI 无关，AI 既非核心能力也非差异化来源 |
| **证据不足淘汰** | **41** | 创始人未公开、来源 URL 无效/占位、营收与商业成功不可查、官网无法访问验证、信源不足 5 条等 |
| **重复条目淘汰** | **3** | 同一产品在不同批次重复出现（含 X38/D6 Photopea 二选一、X27 无效混条） |
| **AI 法律赛道空缺** | **4** | 非淘汰，属"经检索后确认无合格候选"，单列说明 |
| **合计候选池** | **124 条原始候选 → 50 收录 + 74 淘汰** | — |

> **AI 法律/合规赛道**：本轮已定向检索 TrustMRR legal 类目、Casewise AI、Setaicomply、Pakistan Lawbot、LegalOn AI、Robin AI 等，最大者仅 $740 MRR 量级且无合格"单人 + AI 原生 + 可验证"组合，**故本批次无法律垂类正式案例**——这是真实空缺，不做凑数收录。
> **AI 搜索/研究赛道**：仅 Hebbia + Algrow + Durable 三例可收，其中 Algrow / Durable 本身仍属"开发者工具/搜索"边界，已按 ai-native 标注并在"AI 作用"列写清。

---

## 二、正式收录（50 个，即最终定稿）

> 编号 A1–A13、B1–B12、C1–C6、D1–D10、E1–E2 为本轮重新编号后的顺序编号；"定稿序号"对应 `final-50.md` 的 1–50。

| 定稿序号 | 名称 | 创始人 | 总部 | 成立年份 | 官网 | 类别 | AI 契合类型 | AI 作用 | 判定 | 淘汰原因 | 创始人核实方式 | 来源 URL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Midjourney | David Holz | San Francisco, 美国 | 2021 | midjourney.com | AI生成 | ai-native | 自研扩散模型，文本提示词生成图像 | 收录 | — | 官网/第三方创始人访谈署名 | https://sacra.com/c/midjourney ; https://startupfounderstories.com/stories/david-holz-midjourney-bootstrapped ; https://valueaddvc.com/blog/how-does-midjourney-make-money-500m-arr-zero-funding-and-the-ai-image-business-model-explained |
| 2 | Photo AI | Pieter Levels | 巴黎, 法国（远程） | 2023 | photoai.com | AI生成 | ai-native | 自研图像模型微调，批量生成职业写真与头像 | 收录 | — | 创始人个人博客 levels.io 自述 | https://photoai.com ; https://levels.io ; https://aiforautomation.io/cases/photoai-pieter-levels |
| 3 | Interior AI | Pieter Levels | 巴黎, 法国（远程） | 2023 | interiorai.com | AI生成 | ai-native | 上传房间照片生成装修效果图与虚拟布景 | 收录 | — | 创始人个人博客 levels.io 自述 | https://interiorai.com ; https://levels.io ; https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too |
| 4 | HeadshotPro | Danny Postma | 巴厘岛 / 荷兰 | 2022 | headshotpro.com | AI生成 | ai-native | Stable Diffusion 微调，批量产出职业头像 | 收录 | — | 官网 About 页创始人署名 | https://headshotpro.com/about ; https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too |
| 5 | Revid | Thibault Louis-Lucas | 巴黎, 法国（远程） | 2024 | revid.ai | AI生成 | ai-native | AI 视频生成 + 数字人，用于短视频与广告素材 | 收录 | — | 官网与创始人公开署名 | https://revid.ai ; https://indiemakerlist.com/categories/ai ; https://www.aicitybuilders.com/review |
| 6 | StoryShort | Samuel Rondot | 法国（远程） | 2024 | storyshort.ai | AI生成 | ai-native | AI 短剧本生成 + 分镜视频，面向短视频创作者 | 收录 | — | 官网 + TrustMRR 创始人页 | https://storyshort.ai ; https://trustmrr.com/startup/story-short ; https://www.mrrstory.com/ |
| 7 | Flibbo | Sina Sinry | 土耳其 | 2026 | flibbo.com | AI生成 | ai-native | 把长视频拆成短视频片段的产品（AI 驱动） | 收录 | — | 官网 + TrustMRR 创始人页 | https://flibbo.com ; https://trustmrr.com/startup/flibbo ; https://www.builtplain.com/ |
| 8 | AutoShorts.ai | Eric Smith | 美国 | 2024 | autoshorts.ai | AI生成 | ai-native | AI 自动生成短视频（配旁白/字幕） | 收录 | — | 官网 + 第三方营收记录 | https://autoshorts.ai ; https://indiemakerlist.com/categories/ai ; https://www.systemaic.com/teardowns/ |
| 9 | TransClipper | Sergiu Chiriac | 葡萄牙 | 2026 | transclipper.ai | AI生成 | ai-native | AI 长视频转竖版短视频 + 智能字幕 | 收录 | — | 官网 Founder 自述 | https://transclipper.ai ; https://trustmrr.com/startup/transclipper ; https://www.mrrstory.com/ |
| 10 | Visualizee.ai | Piotr Obidowski | 波兰, 华沙 | 2023 | visualizee.ai | AI生成 | ai-native | AI 图表/信息图生成器 | 收录 | — | TrustMRR 创始人页 + Starter Story | https://trustmrr.com/startup/visualizee-ai ; https://visualizee.ai ; https://www.starterstory.com/ |
| 11 | BoredHumans | Nick Dobos | 匈牙利 / 远程 | 2023 | boredhumans.com | AI生成 | ai-native | AI 驱动的趣玩/广告型内容站 | 收录 | — | 官网 + 第三方营收记录 | https://boredhumans.com ; https://indiemakerlist.com/categories/ai ; https://www.systemaic.com/teardowns/ |
| 12 | Musicfy | Arib Khan | 印度 / 远程 | 2025 | musicfy.lol | AI生成 | ai-native | AI 音乐生成与歌曲改写（Lo-fi 等风格） | 收录 | — | 官网 + 第三方报道 | https://musicfy.lol ; https://indiemakerlist.com/categories/ai ; https://www.mrrstory.com/ |
| 13 | aiCarousels | Fernando Pessagno | 阿根廷裔 / 瑞典 | 2024 | aicarousels.com | AI生成 | ai-native | AI 自动生成社媒轮播图（Carousel） | 收录 | — | 创始人个人站署名 | https://aicarousels.com ; https://indiemakerlist.com/categories/ai ; https://www.systemaic.com/teardowns/ |
| 14 | Base44 | Maor Shlomo | 特拉维夫, 以色列 | 2025 | base44.com | 开发者工具 | ai-native | 自然语言生成含数据库/认证/存储的完整 Web 应用 | 收录 | — | Wix 官方新闻稿署名 + 官网 | https://www.wix.com/press-room ; https://base44.com ; https://www.solobusinesshub.com/success-stories/one-person-company-examples |
| 15 | TypingMind | Tony Dinh | 越南 / 远程 | 2023 | typingmind.com | AI助手 | ai-native | 多模型聚合的 ChatGPT 增强前端（插件/提示词/多模型） | 收录 | — | 官网 + 创始人公开数据 | https://typingmind.com ; https://indiemakerlist.com/revenue/typingmind ; https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too |
| 16 | n8n | Jan Oberhauser | 柏林, 德国 | 2019 | n8n.io | 基础设施 | ai-native | 可视化工作流引擎，2022 起转型 AI 编排/多 Agent | 收录 | — | 官网 press 页 + Solo Founders 专访 | https://n8n.io/press ; https://solofounders.com/blog/how-a-solo-founder-turned-a-side-project-into-a-2-5b-workflow-automation-giant ; https://www.solobusinesshub.com/success-stories/one-person-company-examples |
| 17 | AssemblyAI | Dylan Fox | San Francisco, 美国 | 2017 | assemblyai.com | 基础设施 | ai-native | 自研 Speech AI 模型，提供语音转写/理解 API | 收录 | — | 官网 Media Kit 署名 + 创始人访谈 | https://assemblyai.com/media ; https://yespress.io/dylan-fox ; https://www.solobusinesshub.com/success-stories/one-person-company-examples |
| 18 | Hebbia | George Sivulka | San Francisco, 美国 | 2020 | hebbia.com | 开发者工具 | ai-native | 多模态文档矩阵 Agent（Matrix），投研/尽调/报告生成 | 收录 | — | 官网 Blog（CTO 2025-09 加入时间可证创始人独立创始期） | https://hebbia.com/blog/why-i-joined-hebbia-as-cto ; https://finance.yahoo.com/news/ai-startup-hebbia-raised-130m-230429049.html |
| 19 | OpenClaw | Peter Steinberger | 奥地利 | 2025 | openclaw.ai | Agent | ai-native | 开源本地运行 AI Agent 框架，工具调用 + 多模型接入 | 收录 | — | 官网 #foundation 公告 + 官方 Blog | https://openclaw.ai ; https://openclaw.ai/blog ; https://www.linkedin.com/posts/chasedimond_here-are-5-high-revenue-one-person-companies-activity-7441945463362052096-gPSo |
| 20 | Aura | Meng To | 新加坡 | 2024 | aura.build | 开发者工具 | ai-native | AI 驱动的开发者建站/产品构建工具 | 收录 | — | 官网 sell-templates 页署名 | https://aura.build/sell-templates ; https://www.mrrstory.com/ ; https://indiemakerlist.com/categories/ai |
| 21 | CodeSpring | Sebastian Volkis | 乌克兰 | 2024 | codespring.app | 开发者工具 | ai-native | 面向非程序员的 vibe coding 教学与工具链 | 收录 | — | 官网 audit 页署名 | https://codespring.app/audit ; https://indiemakerlist.com/categories/ai ; https://www.starterstory.com/ |
| 22 | Algrow | Sam Adeniyi | 尼日利亚 | 2025 | algrow.online | 开发者工具 | ai-native | AI 驱动的病毒内容研究与创作平台 | 收录 | — | everydev + Starter Story 署名 | https://www.everydev.ai/ ; https://www.starterstory.com/ ; https://indiemakerlist.com/categories/ai |
| 23 | Postiz | Nevo David | 以色列 | 2024 | postiz.com | AI助手 | ai-native | Agentic 社媒排程：AI 生成内容 + 自动发布 + 效果分析 | 收录 | — | everydev 标注 Employees 1 + 官网 | https://postiz.com ; https://trustmrr.com/startup/postiz ; https://indiemakerlist.com/categories/ai |
| 24 | Polsia | Victor-Benjamin "Ben" Cera / Ben Broca | San Francisco, 美国 | 2025 | polsia.com | Agent | ai-native | Agentic 自动化平台，以 AI Agent 替代工程/营销/销售/客服职能 | 收录 | — | 官网 About 页 "My name is Victor-Benjamin" | https://polsia.com/about ; https://agent-wars.com/news/2026-03-14-polsia-ai-solo-founder-3-5m-arr ; https://www.solobusinesshub.com/success-stories/one-person-company-examples |
| 25 | Durable | James Clift | 加拿大, 温哥华 | 2022 | durable.co | 开发者工具 | ai-native | AI 业务构建器：一句话生成含 SEO/线索跟进/支付的完整小企业网站 | 收录 | — | 官网 About 页 + GlobeNewswire 新闻稿署名 | https://durable.com/about ; https://www.globenewswire.com/news-release/2026/03/17/3257754/0/en/Durable-Launches-End-to-End-AI-Business-Platform-for-Entrepreneurs.html ; https://solofounders.com/blog/owning-a-business-should-be-easier-than-having-a-job-james-clift-the-solo-founder-behind-3-5-million-business-on-durable/ |
| 26 | Chatbase | Yasser Elsaid | 多伦多, 加拿大 | 2023 | chatbase.co | 垂直应用 | ai-native | RAG 客服 Agent 平台，跨官网/WhatsApp/Slack/邮件/语音 | 收录 | — | 官网 + TrustMRR 创始人页 + Solo Founders 专访 | https://chatbase.co ; https://trustmrr.com/startup/chatbase ; https://solofounders.com/blog/9m-arr-zero-investors-yasser-elsaid-on-bootstrapping-chatbase-as-a-solo-founder |
| 27 | SiteGPT | Bhanu Teja Pachipulusu | 印度（远程） | 2023 | sitegpt.co | 垂直应用 | ai-native | 抓取企业网站训练"会回答问题的 AI 客服"，按消息量固定价 | 收录 | — | 官网 Blog 署名 "Bhanu Teja P, SiteGPT founder" | https://sitegpt.co ; https://sitegpt.ai/blog/agentic-customer-service ; https://www.thisiswhyibuilt.com/startups/sitegpt |
| 28 | Better Analyst（原 Formula Bot） | David Bressler | 美国（远程） | 2022 | betteranalyst.com | 垂直应用 | ai-native | 自然语言把 Excel/PDF/数据库变成公式、图表、报告与自动化分析 | 收录 | — | n8n 官方客户案例明示 "solo full time founder" | https://betteranalyst.com ; https://n8n.io/case-studies/formula-bot/ ; https://www.websiteplanet.com/blog/formula-bot-interview/ |
| 29 | Chatbox | Benn Huang（Bin-Huang） | 中国 | 2023 | chatboxai.app | AI助手 | ai-native | 开源多模型 AI 客户端（BYOK），桌面/移动/Web 全端 | 收录 | — | 官网多语言页 + GitHub 账号 Bin-Huang | https://chatboxai.app ; https://chatboxai.app/ar/ ; https://36kr.com/p/3975377407062537 |
| 30 | BoltAI | Daniel Nguyen | 越南（远程） | 2023 | boltai.app | AI助手 | ai-native | macOS 菜单栏多模型 AI 助手，买断制 + BYOK | 收录 | — | 官网 About 页 "built and run by Daniel Nguyen" | https://boltai.com/about ; https://boltai.app ; https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now |
| 31 | Inbox Zero | Elie Steinbock | 以色列（远程） | 2023 | getinboxzero.com | AI助手 | ai-native | 开源 AI 邮件助理：分诊、拟稿、批量退订、沉默线程追踪 | 收录 | — | 创始人个人站 elie.tech "2023 – now" | https://www.getinboxzero.com ; https://elie.tech/ ; https://www.starterstory.com/stories/inbox-zero |
| 32 | Post Bridge | Jack Friks | 加拿大（北美远程） | 2024 | post-bridge.com | AI助手 | ai-native | AI 社媒排程与跨平台发布，一个后台多渠道 | 收录 | — | TrustMRR 创始人页 + 创始人 Wiki | https://trustmrr.com/startup/post-bridge ; https://www.jackfriks.com/wiki ; https://startupfounderstories.com/stories/jack-friks-post-bridge-11k-mrr |
| 33 | Sussur | Mihai David Marin | 罗马尼亚 | 2026 | sussur.ai | AI助手 | ai-native | macOS AI 销售教练：备会、实时提示、通话复盘 | 收录 | — | 官网 Founder 页 + Pitch Deck "Founder & sole engineer" | https://sussur.ai/story ; https://sussur.ai/investors ; https://www.sussur.ai/pitch-deck/sussur-Pitch-Deck-100k.pdf |
| 34 | Wave AI | Josh Mohrer | New York, 美国 | 2023 | wave.co | AI助手 | ai-native | 全平台 AI 会议记录与摘要（手机/桌面/Web/手表） | 收录 | — | 官网 About 页 "Founded by Josh Mohrer" | https://wave.co/about ; https://wave.co ; https://www.agenticartists.com/business/josh-mohrer-wave-ai |
| 35 | SEObot | John Rush | 土耳其 | 2023 | seobot.ai | AI助手 | ai-native | SEO 全流程 AI Agent，接 Ahrefs 与 Search Console 实时数据 | 收录 | — | TrustMRR 创始人页 @johnrushx | https://trustmrr.com/startup/seobot ; https://seobot.ai ; https://indiemakerlist.com/categories/ai |
| 36 | Prosp | Yann Dine | 法国 | 2025 | prosp.ai | AI助手 | ai-native | AI LinkedIn 外呼：个性化私信 + 真人语音克隆语音条 | 收录 | — | TrustMRR 创始人页 yanndine | https://trustmrr.com/startup/prosp ; https://trustmrr.com/founder/yanndine ; https://prosp.ai |
| 37 | Lex | Nathan Baschez | 美国（远程） | 2022 | lex.page | 内容创作 | ai-native | 面向写作者的协同写作 + 实时 AI 改写编辑器 | 收录 | — | Anthropic 官方客户案例 "Nathan Baschez, Lex's founder" | https://lex.page ; https://claude.com/customers/lex ; https://www.nathanbaschez.com/work |
| 38 | Writesonic | Samanyou Garg | New Delhi, 印度 | 2020 | writesonic.com | 内容创作 | ai-native | AI 内容 + GEO 平台，追踪品牌在 10+ AI 搜索中的可见度 | 收录 | — | YC 官方公司页 Active Founders 仅其一人 | https://ycombinator.com/companies/writesonic ; https://writesonic.com ; https://topreviewed.ai/products/writesoniccom |
| 39 | ProWritingAid | Chris Banks | Oxford / London, 英国 | 2012 | prowritingaid.com | 内容创作 | ai-native | NLP 写作分析引擎（25+ 报告）+ AI 改写 + Zen 模式 | 收录 | — | 2026 官方白皮书以 "Founder and CEO, ProWritingAid" 署名 | https://prowritingaid.com ; https://prowritingaid.com/education ; https://a.storyblok.com/f/145420/x/9f967f96e4/the-state-of-the-writers-mind-2026.pdf |
| 40 | PDF.ai | Damon Chen | 美国（远程） | 2023 | pdf.ai | 内容创作 | ai-native | 与任意 PDF 对话：提问、抽取、摘要 + 解析 API | 收录 | — | Founded 公司/创始人页 | https://pdf.ai ; https://www.founded.org/companies/pdf-ai/ ; https://www.founded.org/founders/damon-chen/ |
| 41 | AudioPen | Louis Pereira | 印度, 果阿 | 2023 | audiopen.ai | 内容创作 | ai-native | 语音笔记转成指定风格的清晰成稿 | 收录 | — | 官网 "My name's Louis, and I'm a solo founder" | https://audiopen.ai ; https://www.audiopen.ai/?hl=en ; https://www.prepnew.com/post/chapter-21-the-200-vault-part-1-ai-native-vibe-coded-micro-apps |
| 42 | GenPPT | Ilias Ism | San Francisco, 美国 | 2024 | genppt.com | 内容创作 | ai-native | AI 演示文稿生成（先调研再排版），支持导出 PPT | 收录 | — | TrustMRR 创始人页 + 官方新闻稿 | https://trustmrr.com/startup/genppt ; https://genppt.com ; https://www.openpr.com/news/4609531/ilias-ism-named-the-true-new-king-of-seo |
| 43 | Creator Buddy | Alex Finn | Palo Alto, 美国 | 2025 | creatorbuddy.io | 内容创作 | ai-native | 面向 X 创作者的 AI 内容教练（分析推文并给改写建议） | 收录 | — | 创始人官网自述 + 访谈原话 "It's all one man show" | https://creatorbuddy.io ; https://selfgrowthvideos.com/alex-finn/ ; https://www.summary.audio/s/5 |
| 44 | Rezi | Jacob Jacquet | 美国 / 韩国 | 2015 | rezi.ai | 内容创作 | ai-native | AI 简历生成器，按 ATS 规则优化 + 求职信 + 企业白标 | 收录 | — | 官网简历页 "CEO & Founder, Aug 2015—Present" | https://www.rezi.ai ; https://www.rezi.ai/ai-resume-builder ; https://trustmrr.com/startup/rezi |
| 45 | Dalea AI | Bruno Kalil | 巴西 | 2026 | usedalea.ai | 内容创作 | ai-native | 社媒内容 Agent：拆解爆款风格生成 IG/TikTok 脚本 | 收录 | — | TrustMRR 创始人页 + 官网博客署名 | https://trustmrr.com/startup/dalea-ai ; https://usedalea.ai ; https://usedalea.ai/en/blog/category/scripts |
| 46 | Photopea | Ivan Kutskir | Prague, 捷克 | 2013 | photopea.com | 内容创作 | **ai-embedded** | 浏览器图像编辑器；AI 抠图/生成式填充/放大为差异化功能 | 收录（X38/D6 二选一，保留 D6） | — | 官网 Blog "I am the only developer of Photopea" | https://www.photopea.com ; https://blog.photopea.com/creating-photopea.html ; https://www.builtplain.com/photopea-free-app-ad-revenue/ |
| 47 | Julius AI | Rahul Sonwalkar | San Francisco, 美国 | 2022 | julius.ai | 垂直应用 | ai-native | 对话式数据科学助手：自然语言完成分析、建模与可视化 | 收录 | — | YC 官方公司页仅列其一人为 Founder | https://www.ycombinator.com/companies/julius ; https://landing.julius.ai/ ; https://solofounders.com/blog/author/ari |
| 48 | Feynman AI | Alex Nguyen | 越南（远程） | 2024 | feynman-ai.com | 教育 | ai-native | 费曼学习法 AI 学习 App：视频/讲义转摘要、测验、记忆卡 | 收录 | — | MRR Story 创始人访谈自述 | https://feynman-ai.com ; https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo ; https://arrfounder.com/@alexcooldev |
| 49 | MedDeep AI | Alex Nguyen | 越南（远程） | 2024 | meddeep.ai | 垂直应用 | ai-native | AI 医疗助理：症状分析、健康解读、加密 AI 对话 | 收录 | — | MRR Story 创始人访谈自述 | https://www.meddeep.ai ; https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo ; https://arrfounder.com/@alexcooldev |
| 50 | Kagi | Vladimir Prelovac | Palo Alto, 美国 | 2018 | kagi.com | AI助手 | **ai-embedded** | 用户付费搜索 + Orion 浏览器；AI 提供摘要/答案/翻译 | 收录 | — | 官网公司史页 "founded by Vladimir Prelovac in May 2018" | https://kagi.com ; https://help.kagi.com/orion/company/history.html ; https://blog.kagi.com/orion |

---

## 三、淘汰明细（74 条）

### 3.1 多人创立淘汰（22 条）

| 原编号 | 名称 | 创始人 | 多人证据 | 判定 | 淘汰原因 | 来源 URL |
|---|---|---|---|---|---|---|
| B6 | Replicate | Ben Firshman + Andreas Jansson | YC 官方页与 everydev 均列两位 Founder | 淘汰 | 多人创立 | https://ycombinator.com/companies/replicate ; https://www.everydev.ai/ |
| B7 | Deepgram | Scott Stephenson + Scott 的 co-founder | builtin.com 明确 "Stephenson and his co-founder" | 淘汰 | 多人创立 | https://builtin.com/ ; https://www.deepgram.com/ |
| B8 | Firecrawl | Caleb Peffer + Eric Ciarla + Nicolas Silberstein Camara | 官网 About 页 + YC 官方页列 3 位创始人 | 淘汰 | 多人创立 | https://www.firecrawl.dev/about ; https://ycombinator.com/companies/firecrawl |
| B10 | LlamaIndex | Jerry Liu + Simon Suo | 官网 About 与多篇访谈明确 co-founder | 淘汰 | 多人创立 | https://www.llamaindex.ai/about ; https://ai.engineer/speakers/jerry-liu |
| B11 | Baseten | Tuhin Srivastava + 共 4 人 | athletic.vc 与目录均列 4 位创始人 | 淘汰 | 多人创立 | https://www.athletic.vc/team/tuhin-srivastava |
| B12 | Modal | Erik Bernhardsson + Sam Lambert | 媒体报道明确共同创办 | 淘汰 | 多人创立 | https://modal.com/about ; https://finance.biggo.com/podcast/1157f4dd5b77b66a |
| B13 | Overlap | Jonathan Baer + Casey Traina | startupintros + 报道列双创始人 | 淘汰 | 多人创立 | https://startupintros.com/orgs/overlap |
| C1 | Manus | 萧宏（Xiao Hong）+ 纪耀超（Ji Yichao） | 官方与 Business Insider 报道均称联合创办 | 淘汰 | 多人创立 | https://africa.businessinsider.com/news/what-is-manus-the-chinese-founded-ai-startup-meta-is-buying-for-over-dollar2-billion/d0sqhf4 |
| C2 | Granola | Chris Pedregal + Sam Stephenson | 官方介绍与多方报道明确 co-founder | 淘汰 | 多人创立 | https://www.granola.ai/ ; https://www.youtube.com/watch?v=NzFixsJj7AY |
| C9 | FounderPal | Dan Kulkov + Sveta Bay | indielessons 产品页列双创始人 | 淘汰 | 多人创立 | https://indielessons.com/product/founderpal |
| A5 | Replika | Eugenia Kuyda + Phil Dudchuk（ Luka Inc） | AAU 学术论文与 Heriot-Watt 研究门户明确 co-founded | 淘汰 | 多人创立 | https://aau.dk/ ; https://researchportal.hw.ac.uk/ |
| A6 | Letterly | Anton Lebedev（Co-founder & Product Lead） | voiceaispace 明确标注 Co-founder | 淘汰 | 多人创立 | https://www.voiceaispace.com/ ; https://letterly.ai |
| A10 | Tolan | Quinten Farmer + Evan Goldschmidt + Ajay Mehta | tolans.com/team 列 3 人 | 淘汰 | 多人创立 | https://tolans.com/team |
| G10 | My AskAI | Mike Heap + Alex Rainey | myaskai.com/about-us 列双创始人 | 淘汰 | 多人创立 | https://myaskai.com/about-us |
| G15 | Supergrow | Utsav + Davin Bhooshan | supergrow.ai/blog + systemaic teardown 均列双创始人 | 淘汰 | 多人创立 | https://supergrow.ai/blog ; https://www.systemaic.com/teardowns/ |
| E2 | Framer | Koen Bok + Jorn van Dijk | 官方与多篇报道明确共同创办 | 淘汰 | 多人创立 | https://www.framer.com/about/ |
| F1 | Abridge | Shiv Rao + Adam Brodey | 官网与官方发布均称 co-founder | 淘汰 | 多人创立 | https://www.abridge.com/ ; https://www.aibridgehealth.com/ |
| F2 | Nabla | Alex LeBrun + 2 位共同创始人 | 官网 Team 页与报道列 3 人 | 淘汰 | 多人创立 | https://www.nabla.com/ ; https://techcrunch.com/ |
| F3 | Socratic | Chris Pedregal + Shreyans Bhansali | Wikipedia / nibble / originality.ai 均明确双创始人 | 淘汰 | 多人创立 | https://en.wikipedia.org/wiki/Socratic_(app) ; https://www.nibble.com/ |
| F4 | Cal AI | Zach Yadegari & Henry Langmack | 双方官方表述均为共同创办 | 淘汰 | 多人创立（且类别"健康"不在枚举内） | https://www.calaiapp.com/ ; https://www.whoop.com/ |
| D3 | Anyword | Yaniv Makover + Adam Habari | 官方 About 页列双创始人 | 淘汰 | 多人创立 | https://anyword.com/about |
| D5 | Gamma | Grant Lee + Bret Dye | 官方与 Forbes AI 50 均列双创始人 | 淘汰 | 多人创立 | https://gamma.app/about ; https://www.forbes.com/lists/ai50/ |
| — | Medvi | Matthew Gallagher + 其兄 Elliot | 36氪/FT/Bloomberg 报道明确两兄弟共同创办；另有财务造假质疑 | 淘汰 | 多人创立 | https://m.36kr.com/p/3751033979093760 ; https://www.rbc.ru/education/01/07/2026/6a3be1f29a7947be2d8b0978 |
| — | Vambe | 3 位创始人 | 智利团队官方与报道列 3 位 Founder | 淘汰 | 多人创立 | https://vambe.ai/ |
| — | Prometheo | 两位高中同学共同创立 | 创始人自述明确两人共同起步 | 淘汰 | 多人创立 | https://prometheo.ai/ |
| — | Vid.AI / Faceless.so / Gojiberry AI / Paperguide / Pep AI / Cometly / Laper / LocalRank.so | 多位创始人 | 各站 About 页或媒体均出现 co-founder / 团队 ≥2 人 | 淘汰 | 多人创立 | https://www.vid.ai/ ; https://faceless.so/ ; https://gojiberry.ai/ ; https://paperguide.ai/ ; https://pep.ai/ ; https://www.cometly.com/ ; https://laper.ai/ ; https://localrank.so/ |
| — | AEO Engine | 人类策略师 + Agent 混合形态 | 形态本身无法确认为"单一创始人 + AI 工具链" | 淘汰 | 多人创立 / 形态不可核实 | https://www.aeoengine.ai/ |
| — | RizzGPT | 争议产品 + 有合伙人 | 多方报道出现 co-founder 且产品有争议 | 淘汰 | 多人创立 + 争议（X53 明确不得入选） | https://rizzgpt.com/ |

### 3.2 非 AI 相关淘汰（7 条）

| 原编号 | 名称 | 创始人 | 判定 | 淘汰原因 | 来源 URL |
|---|---|---|---|---|---|
| E3 | Kagi（旧编号重复，已由 50 号正式收录） | Vladimir Prelovac | 收录（非淘汰，重复条目） | — | https://kagi.com |
| — | Gumroad / DesignJoy / Starter Story / Testimonial.to / ShipFast / Sidekiq / Livekiw / TLDR | 传统 OPC 对照组 | 淘汰 | 非 AI 相关：产品主体与 AI 无关 | https://gumroad.com/ ; https://testimonial.to/ ; https://shipfa.st/ |
| X25 | DesignJoy | 独立开发者 | 淘汰 | 非 AI 相关：设计素材库，AI 非核心 | https://designjoy.com/ |
| — | Descript / CapCut / Adobe 系剪辑工具 | 多人 + 大厂产品 | 淘汰 | 非 AI 相关且多人创立 | https://www.descript.com/ |
| — | 传统 SEO / 建站 / 客服 SaaS（无 AI 能力） | 多人创立 | 淘汰 | 非 AI 相关 + 多人创立 | — |
| X28 | 原始版 Photopea（X38 重复条目） | Ivan Kutskir | 淘汰 | 重复条目 + AI 契合度存疑（保留 D6 一条） | https://www.photopea.com |
| — | FeedHive | Simon Høiberg | 淘汰 | 非 AI 相关为主：主体为社媒排程，AI 为增强功能但产品价值来源仍是排程本身；且营收证据仅 2021 年 $8.5K MRR 单一自报口径 | https://www.feedhive.com/ ; https://simonhoiberg.com/ |
| — | radaar.io | Mustafa Ercan Zırh | 淘汰 | 非 AI 相关为主：主体为社媒排程与协作平台，AI Post Generator 为附加功能；营收仅 IndieHackers 汇编贴单一弱源 | https://www.radaar.io/ ; https://theorg.com/org/radaar/org-chart/mustafa-ercan-zirh |

### 3.3 证据不足淘汰（41 条）

| 原编号 | 名称 | 创始人 | 判定 | 淘汰原因 | 来源 URL |
|---|---|---|---|---|---|
| G3→（已收录为 41 AudioPen） | AudioPen | Louis Pereira | 收录 | 创始人已查明（Goa, 印度），保留 | https://audiopen.ai |
| G11 | dante-ai | James（名字不全） | 淘汰 | 证据不足：创始人姓名不完整，Trustpilot 评述仅见名 | https://trustpilot.com/ |
| G13 | Databerry.ai | Georges Petrov | 淘汰 | 证据不足：官网 503 已下线，无法访问验证 | https://github.com/gmpetrov/databerry |
| G12 | AgentRunner.ai | Nicolas Trésegnie | 淘汰 | 证据不足：301 跳转 capably.ai 后无独立营收数据 | https://agentrunner.ai/ |
| G17 | FeedHive/Aidbase | Simon Høiberg | 淘汰 | 证据不足：2021 年 $8.5K MRR 为孤证且已过时 4 年 | https://www.founded.org/founders/simon-hoiberg/ |
| — | Vercel | Guillermo Rauch + Tony Kovanen + Naoyuki Kanezawa | 淘汰 | 多人创立（三人于 2015-11 共同创办 ZEIT）+ 当前团队数百人，不符合"早期单人运营" | https://vercel.com/blog/series-f ; https://molodtsov.me/2026/09/how-vercel-turned-shipping-into-its-brand/ |
| — | ScreenshotOne | Dmytro Krasun | 淘汰 | 证据不足 + AI 契合度不足：产品为网页截图 API（非 AI 产品，AI 契合存疑）；营收 $32K MRR 仅第三方汇编，无 Stripe 验证 | https://superframeworks.com/case-study/screenshotone ; https://screenshotone.com/about/ |
| — | ClearSign | 未公开 | 淘汰 | 证据不足：营收完全未披露 | https://clearsign.io/ |
| — | Chatbase 竞品（TrustMRR 隐藏条目） | — | 淘汰 | 证据不足：产品主体不可查 | https://trustmrr.com/ |
| X27 | Typeform / Zapier / Socratic 混条 | — | 淘汰 | 无效条目：三个不相关产品混为一条，无单一官网/创始人/营收 | — |
| X38 | Photopea（重复） | Ivan Kutskir | 淘汰 | 重复条目（保留 D6），且 AI 契合度存疑需注明 | https://www.photopea.com |
| X53 | RizzGPT | — | 淘汰 | 争议案例 + 有合伙人，明确不得入选 | https://rizzgpt.com/ |
| — | MacWhisper | Jordi Bruin | 淘汰 | 证据不足：营收无任何公开第三方记录，官网仅工具页 | https://www.macwhisper.com |
| — | Poko | Maria Kolk | 淘汰 | 证据不足 + 事实错误：poko.app 实为 YC 投资的金融科技公司，非池中所述 WhatsApp 提醒机器人 | https://poko.app/ |
| — | Notewave AI（独立于 Feynman AI） | Alex Nguyen | 淘汰 | 证据不足：域名 notewave.app 404，产品已更名为 Feynman AI（已单独收录） | https://notewave.app/ |
| — | GenPPT 竞品 / AI PPT 同类 | 多位 | 淘汰 | 证据不足：多数为多人创立或无公开营收 | — |
| — | AI 律法律/合规类全部候选 | 多位 | 淘汰 | 证据不足：TrustMRR legal 类目最大仅 $12K MRR 隐藏业务；Setaicomply $192、Casewise AI $740、Pakistan Lawbot $182 均过小 | https://trustmrr.com/category/legal |
| — | Chinese OPC 浪潮缺数据类（Podcast Island / Momoyu / TideFlow / Honghub） | 未公开 | 淘汰 | 证据不足：创始人未公开且无营收数据 | — |
| — | ClearSign / Motionvid.ai / 用 AI 生成营销图（人类策略师 + Agent 混合形态） | — | 淘汰 | 证据不足 + 形态不可核实 | https://motionvid.ai/ |
| — | AEO Engine / Vibe Marketing 类 Agent 混合形态 | — | 淘汰 | 证据不足：无法确认为"单一创始人 + AI 工具链" | — |
| — | 各类"1 美元 AI 网站/AI 套壳" | — | 淘汰 | 证据不足：无独立营收、无一手信源 | — |
| — | 各类大厂内部 AI 产品线（阿里 Tongyi / 字节 Doubao / 腾讯 Yuanbao / 百度文心） | — | 淘汰 | 非一人公司（大厂内部产品） | — |
| — | 前沿模型实验室（OpenAI / Anthropic / DeepSeek / Mistral / xAI） | — | 淘汰 | 非一人公司（大型研究机构） | https://openai.com/ ; https://www.anthropic.com/ |
| — | AI 独角兽但多人创立（Cursor / Perplexity / Suno / Harvey / Synthesia / Typeface / Photoroom / Vapi / Resemble / Luma / Runway / Pika / Glean / Stability / Sakana / Sarvam / Upstage / Wrtn / Moonshot） | 多位 | 淘汰 | 多人创立 | — |
| — | Clearsign / Heal / Nutrition / AI 心理陪伴等 | — | 淘汰 | 证据不足：营收未披露 | — |
| — | 所有以"indiehackers.com/post/50-side-projects-making-1m"为唯一来源的条目 | 未公开 | 淘汰 | 证据不足：汇编贴数字为创始人自述、时点多为 2023–24、无法独立核实 | https://indiehackers.com/post/50-side-projects-making-1m-f51ce727df |
| — | 所有"trustmrr.com/startup/{slug}"返回 404 的条目 | — | 淘汰 | 证据不足：TrustMRR 无该产品记录，无法交叉验证 | https://trustmrr.com/ |
| — | 所有仅靠 "Similar indie makers" 栏引用的条目 | — | 淘汰 | 证据不足：引用为占位链接（如 `indiemakerlist.com/p/karwan-atta（Similar indie makers 栏）`），非可验证信源 | https://indiemakerlist.com/ |
| — | 所有官网无法访问验证（连接失败/503/404）且无其他一手信源的产品 | — | 淘汰 | 证据不足：官网不可访问，无法验证产品存在与定价 | — |
| — | 所有仅凭第三方目录（everydev / indiestore / superframeworks / aicitybuilders）收录而无一手信源的产品 | — | 淘汰 | 证据不足：≥5 条信源与 ≥1 一手标准不满足 | https://www.everydev.ai/ ; https://indiestore.co/ |

### 3.4 重复条目淘汰（3 条）

| 原编号 | 名称 | 判定 | 淘汰原因 |
|---|---|---|---|
| E3 | Kagi（旧编号，与新 50 号重复） | 去重后按新编号收录 | 重复条目 |
| D6 / X38 | Photopea | **二选一：保留 D6 编号（正式收录为 46 号）**，淘汰 X38 | 重复条目 + AI 契合度存疑已在正式条目"数据冲突"字段注明 |
| X27 | Typeform / Zapier / Socratic 混条 | 淘汰 | 无效条目：三公司混一条 |

### 3.5 URL 修正记录（原候选池中的错误官网，已全部核实更正）

| 原记录 | 实际官网 | 说明 |
|---|---|---|
| creatorbuddy.ai | **creatorbuddy.io** | .ai 域名 DNS NXDOMAIN |
| inboxzero.com | **getinboxzero.com** | 原域名指向他方产品 |
| genppt.io | **genppt.com** | .io 域名不存在 |
| transclipper.com | **transclipper.ai** | .com 不存在 |
| notewave.app | **feynman-ai.com** | .app 返回 404，产品已更名 |
| meddeep.ai | **www.meddeep.ai** | 301 跳转后正确域名 |
| codespring.io | **codespring.app** | .io 是罗马尼亚同名外包公司 |
| postbridge.app | **post-bridge.com** | .app 是同名 WordPress/Shopify 插件 |
| agentrunner.ai | **capably.ai** | 301，品牌升级 |
| agentnative.co | **agentnative.io** | .co 跳转 |
| insertchatgpt.com | **insertchat.com** | 301 |
| formulabot.com | **betteranalyst.com** | 301，产品更名（Formula Bot → Better Analyst） |
| aura.so | **aura.build** | .so 为域名停放出售页 |
| storyshort.io | **storyshort.ai** | .io 是另一产品 |
| databerry.ai | — | 503 已下线 |
| poko.app | — | 实为 YC 金融科技公司，非池中所述产品 |

---

## 四、本轮新增收录（相对原候选池）

| 新增 | 名称 | 创始人 | 加入原因 |
|---|---|---|---|
| N1 | Chatbox | Benn Huang | 中国开源 AI 客户端，$13M 半年收入，填补"开源多端"样本 |
| N2 | BoltAI | Daniel Nguyen | 越南，买断制 + BYOK 高毛利模型 |
| N3 | Inbox Zero | Elie Steinbock | 以色列，开源 + 隐私优先 |
| N4 | Post Bridge | Jack Friks | 加拿大，拒绝 $1M 报价，TrustMRR 验证 |
| N5 | Sussur | Mihai David Marin | 罗马尼亚，2026 最新 solo 案例，官方 Pitch Deck 一手 |
| N6 | Wave AI | Josh Mohrer | 美国，$7M ARR 非工程师创始人 |
| N7 | SEObot | John Rush | 土耳其，SEObot $34K MRR Stripe 验证 |
| N8 | Prosp | Yann Dine | 法国，$128K MRR Stripe 验证 |
| N9 | Better Analyst | David Bressler | 有 n8n 官方客户案例一手背书 |
| N10 | GenPPT | Ilias Ism | TrustMRR 验证 $8,164 MRR |
| N11 | Creator Buddy | Alex Finn | "Claude Code 当唯一员工"最极端样本 |
| N12 | Rezi | Jacob Jacquet | $247K MRR、4.5M 用户、Forbes 第一 |
| N13 | Dalea AI | Bruno Kalil | 巴西唯一 Stripe 验证，补齐拉美 |
| N14 | Julius AI | Rahul Sonwalkar | YC S22 官方页确认单一创始人 |
| N15 | Feynman AI | Alex Nguyen | 越南教育垂类 |
| N16 | MedDeep AI | Alex Nguyen | 越南医疗垂类 |
| N17 | Kagi | Vladimir Prelovac | 前四年单开发者、$1M 年收入、ai-embedded 代表 |
| N18 | Photo AI / Interior AI | Pieter Levels | 补全 Pieter Levels 双产品矩阵（原池仅有一个） |
| N19 | AudioPen | Louis Pereira | 原 G3 创始人已查明，转正式收录 |
| N20 | Formula Bot→Better Analyst | David Bressler | 原 G 批次缺口补齐 |
