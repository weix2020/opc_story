# 定稿 50 个案例（最终写作输入）

> **用途**：本文档是后续并行撰写 agent 的**唯一输入**。每条含完整字段，可直接扩写为七维深度分析长文。
> **定稿日期**：2026-11-04
> **配额校验**：`ai-native` 48 个 ≥ 30 ✅｜`ai-embedded` 2 个（Photopea / Kagi，均为"AI 为差异化与价值来源但产品主体非 AI"的诚实标注）｜8 个枚举类别全部覆盖 ✅｜地域覆盖北美/欧洲/亚洲/拉美/大洋洲 ✅
> **类别分布**：AI生成 13｜AI助手 11｜内容创作 10｜开发者工具 6｜垂直应用 5｜基础设施 2｜Agent 2｜教育 1 = 50
> **撰写须知**：所有"营收起始数字"均标注信源与口径。"待核实"= 公开信息不足以支撑该字段，**不得编造数字**，写作时按"未公开披露"表述并说明数据缺口。

---

## 批次 1（AI 生成与创作工具，13 个）

### 1. Midjourney
- **slug**: midjourney
- **创始人**: David Holz（美国，前 Leap Motion 联合创始人兼 CTO）
- **官网**: https://www.midjourney.com
- **总部**: San Francisco, 美国
- **成立年份**: 2021
- **建议 launchDate**: 2021-07-16（精度：month，官方 Discord 机器人首次公开测试时间点）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 自研扩散模型（V3/V4/V5），用户以文本提示词生成图像，核心即图像生成模型本身。
- **类别归属批次理由**: 全球订阅制 AI 图像生成的事实标准，"一人公司"叙事中最具代表性的生成类案例。
- **营收起始数字**: 约 $200M ARR（2024 年口径，来源：Sacra，经 Forbes/PitchBook 引用 https://sacra.com/c/midjourney）；2025 年约 $300–500M、2026 年约 $500M 均为第三方估算，公司从未官方披露（https://valueaddvc.com/blog/how-does-midjourney-make-money-500m-arr-zero-funding-and-the-ai-image-business-model-explained）。
- **已核实的关键信源**: [1] 官网定价与产品页 https://www.midjourney.com（一手） [2] Sacra 营收分析 https://sacra.com/c/midjourney（媒体） [3] Value Add VC 商业模式拆解 https://valueaddvc.com/blog/how-does-midjourney-make-money-500m-arr-zero-funding-and-the-ai-image-business-model-explained（媒体） [4] Forbes/PitchBook 转述 https://axis-intelligence.com/midjourney-statistics/（媒体） [5] Startup Founder Stories 创始人访谈 https://startupfounderstories.com/stories/david-holz-midjourney-bootstrapped（媒体）
- **数据冲突**: ARR 数字三套口径并存（2024 $200M / 2025 $300M / 2026 $500M），公司零披露、零融资，全部为估算。写作时必须写"第三方估算"。
- **撰写提示**: 重点说明"零融资、零营销预算、Discord 先行"的产品分发路径，以及 Holz 前期做 PSPDFKit 等产品的工程背景；所有金额必须带"估算"字样。

### 2. Photo AI
- **slug**: photo-ai
- **创始人**: Pieter Levels（荷兰，@levelsio）
- **官网**: https://photoai.com
- **总部**: 巴黎, 法国（远程运营）
- **成立年份**: 2023
- **建议 launchDate**: 2023-11（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 以自研图像模型（FLUX.1 系列微调）批量生成职业写真、LinkedIn 头像与电商模特图。
- **类别归属批次理由**: 一人公司全球样本中最常被引用的 AI 图像产品，且营收数据公开度最高。
- **营收起始数字**: 约 $132K MRR / $1.58M ARR（创始人自报，来源 https://aiforautomation.io/cases/photoai-pieter-levels）；Levels 2026 年自报约 $105K/月营收、$80K/月利润（https://unnetworth.com/pieter-levels-net-worth/）。组合总月营收约 $250K（https://lobehub.com/skills/swaylq-master-skill-pieter-levels）。
- **已核实的关键信源**: [1] 官网 https://photoai.com（一手，HTTP 200 验证） [2] Levels 个人博客公开数据 https://levels.io（一手） [3] AI for Automation 案例拆解 https://aiforautomation.io/cases/photoai-pieter-levels（媒体） [4] andrew.ooo 增长曲线整理 https://andrew.ooo/posts/pieter-levels-photo-ai-solo-founder/（媒体） [5] Cipher Projects 一人公司盘点 https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship（媒体）
- **数据冲突**: 同一时点存在 $132K / $105K / $157K 三种"月营收"口径，且组合口径与单品口径混用；需写明"Levels 自报，未经第三方验证"。
- **撰写提示**: 重点交代"零员工 + 组合拳（Photo AI / Interior AI 等十余个产品）+ 复用 Replicate API"的分发与成本结构（据自报每月模型成本约 $13K）。

### 3. Interior AI
- **slug**: interior-ai
- **创始人**: Pieter Levels（荷兰，@levelsio）
- **官网**: https://interiorai.com
- **总部**: 巴黎, 法国（远程运营）
- **成立年份**: 2023
- **建议 launchDate**: 2023-10（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 上传房间照片即生成装修效果图与虚拟布景图，核心是图像生成模型 + 房间语义理解。
- **类别归属批次理由**: 与 Photo AI 同源的第二个超级单品，用于展示"一人公司如何把单一能力复制成多产品矩阵"。
- **营收起始数字**: 约 $45K MRR、毛利率接近 100%（创始人自报，来源 https://lobehub.com/skills/swaylq-master-skill-pieter-levels）。注：与 Photo AI 的营收不可简单相加后的重复计数，需按产品分别引用。
- **已核实的关键信源**: [1] 官网 https://interiorai.com（一手，HTTP 200 验证） [2] Levels 组合数据披露 https://levels.io（一手） [3] AI 1인 기업 해부 EP.01 https://www.aicitybuilders.com/review（媒体） [4] SigmaSchool 单人 AI SaaS 盘点 https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too（媒体）
- **数据冲突**: 无硬冲突，但需注明与 Photo AI 同属一位创始人，属"组合运营"而非两个独立 OPC。
- **撰写提示**: 必须显式说明 Photo AI 与 Interior AI 为同一创始人（Pieter Levels）旗下两个产品，避免读者误以为是两个独立 OPC 案例；重点讲垂直化改造（家装选品关键词 → 专门模型）。

### 4. HeadshotPro
- **slug**: headshotpro
- **创始人**: Danny Postma（荷兰，前 Remote OK 创始人）
- **官网**: https://headshotpro.com
- **总部**: 巴厘岛, 印度尼西亚（公司注册与官网主体在巴厘岛/新加坡）
- **成立年份**: 2022
- **建议 launchDate**: 2022-08（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 用户上传 10 张自拍，20 分钟内生成 40 张影棚级职业头像（基于 Stable Diffusion 微调 + 人脸替换管线）。
- **类别归属批次理由**: AI 肖像生成商业化最成功的单人产品之一，直接对标传统摄影棚服务。
- **营收起始数字**: 达到 $1M ARR（作为单人创始人，来源 https://www.onemandb.com/founder/danny-postma）；第三方估计约 $2M ARR / $350K+/月（约 $4M ARR，来源 https://www.prepnew.com/post/chapter-21-the-200-vault-part-1-ai-native-vibe-coded-micro-apps）。均为第三方或自报，无 Stripe 验证。
- **已核实的关键信源**: [1] 官网 About 页 https://www.headshotpro.com/about（一手，明确"HeadshotPro was founded by Danny Postma"） [2] supabird 创始人专访 https://supabird.io/articles/danny-postma-how-a-solo-hacker-built-an-ai-empire-from-bali（媒体） [3] OneManDB 创始人档案 https://www.onemandb.com/founder/danny-postma（媒体） [4] SigmaSchool 单人 AI SaaS 盘点 https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too（媒体）
- **数据冲突**: ARR 有 $1M / $2M / $4M 三档口径；且需交代 Postma 已从单一产品扩展为多产品矩阵（Headlime、Landingfolio 等），写作时不可把矩阵数字算作 HeadshotPro 单品。
- **撰写提示**: 重点说明 Postma 是"早期 OpenAI 客户、把 GPT-3 能力先落地生产"的背景，以及他明确反对"AI 生成真人肖像存在伦理争议"从而转向"本人自拍生成专业照"的合规化选择。

### 5. Revid
- **slug**: revid
- **创始人**: Thibault Louis-Lucas（法国，@thibaultlucas）
- **官网**: https://revid.ai
- **总部**: 法国
- **成立年份**: 2024
- **建议 launchDate**: 2024-06（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 视频生成与数字人脚本/配音工具，面向短视频与 UGC 广告投放。
- **类别归属批次理由**: AI 视频生成赛道里收入体量最大的单人产品之一。
- **营收起始数字**: 约 $1M/月（全产品组合口径，创始人/IndieMakerList 榜单自报，来源 https://tmaker.io 与 https://indiemakerlist.com）。Revid 单品与组合口径未拆分，写作时须写明"组合口径"。
- **已核实的关键信源**: [1] 官网 https://revid.ai（一手，HTTP 200 验证） [2] IndieMakerList 收入榜 https://indiemakerlist.com（媒体，榜单第 1 位） [3] Cipher Projects 单人创业盘点 https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship（媒体） [4] tmaker.io 收入榜 https://tmaker.io（媒体）
- **数据冲突**: "$1M/月"是全产品组合（含 SaaS + 服务）口径，单品口径未公开；IndieMakerList 自报数据未做独立核实。
- **撰写提示**: 重点说明"数字人 + 多语种配音"面向出海 UGC 投放的产品定位，以及从产品到代运营服务的商业化延伸。

### 6. StoryShort
- **slug**: storyshort
- **创始人**: Samuel Rondot（法国，@samuelrdt）
- **官网**: https://storyshort.ai
- **总部**: 法国
- **成立年份**: 2024（TrustMRR 记 2024-08）
- **建议 launchDate**: 2024-08（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 输入文本即自动生成"无露脸"短视频（脚本、配音、字幕、渲染全自动），面向 TikTok/YouTube Shorts。
- **类别归属批次理由**: AI 视频生成中少数拥有 Stripe 第三方验证营收的独立开发者产品。
- **营收起始数字**: $21,767 MRR / $601,186 累计营收 / 387 个活跃订阅（TrustMRR 基于 Stripe API 验证，数据更新至 2026-11-03，来源 https://trustmrr.com/startup/storyshort）；约 27,000 用户。
- **已核实的关键信源**: [1] 官网 https://storyshort.ai（一手，HTTP 200 验证） [2] TrustMRR Stripe 验证页 https://trustmrr.com/startup/storyshort（第三方验证） [3] TrustMRR 创始人页 https://trustmrr.com/founder/samuelrdt（第三方验证） [4] IndieMakerList 收入榜 https://indiemakerlist.com（媒体）
- **数据冲突**: 无重大冲突，Stripe 验证数字与 IndieMakerList 榜单（约 $22K MRR）一致。
- **撰写提示**: 重点说明"faceless video"这一品类的诞生与增长路径（Shorts 流量红利），以及定价分层（$39/$69/$129/$199）对创作者不同变现阶段的匹配。

### 7. Flibbo
- **slug**: flibbo
- **创始人**: Sina Sinry（土耳其，33 岁，Langroud 出身）
- **官网**: https://flibbo.com
- **总部**: 土耳其, 伊斯坦布尔
- **成立年份**: 2026
- **建议 launchDate**: 2026-01（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: iOS/Android 端 AI 内容超级 App，把多家顶级模型（Runway、Midjourney、ChatGPT 等）封装进一个移动端创作工作流。
- **类别归属批次理由**: "AI wrapper 聚合"模式的最强单人样本，同时是土耳其/中东地域代表。
- **营收起始数字**: $78,000 MRR（创始人 2026-06-13 披露，来源 https://neodrop.ai/zh-cn/post/X9A2qQcjXQX）；此前口径 $55K MRR / 27 天增长 42%（https://neodrop.ai/es/post/02LXj6Tne7L）；约 50 万用户、进入美区 App Store 前 100（https://radaronline.com/p/i-made-first-million-online-now-my-app-half-million-users-sina-sinry/）。
- **已核实的关键信源**: [1] 官网 https://flibbo.com（一手，HTTP 200 验证） [2] NeoDrop 拆解 https://neodrop.ai/zh-cn/post/X9A2qQcjXQX（媒体） [3] Startup Founder Stories 收入故事 https://startupfounderstories.com/es/data-insights/by-industry/content-creation（媒体） [4] RadarOnline 人物专访 https://radaronline.com/p/i-made-first-million-online-now-my-app-half-million-users-sina-sinry/（媒体）
- **数据冲突**: MRR 数字在 $55K / $78K 两个时点口径之间，撰写时必须标注披露日期；另有报道称其自述"从未写过程序代码"，与"AI 工具链交付"叙事需谨慎并置。
- **撰写提示**: 重点说明"从 Shopify 分销赚 $1M → 全职做 AI App"的关键转折，以及"不写代码、只做选品与聚合"如何成为新 OPC 范式。

### 8. AutoShorts.ai
- **slug**: autoshorts-ai
- **创始人**: Eric Smith（美国，前 Instagram 工程师）
- **官网**: https://autoshorts.ai
- **总部**: 美国
- **成立年份**: 2025（2024-01 正式上线，2025 期间增长）
- **建议 launchDate**: 2024-01（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 全自动生成"无露脸"短视频（选题、脚本、配音、字幕、渲染、上传一体化），面向 YouTube/TikTok 频道运营。
- **类别归属批次理由**: AI 视频生成中"全流程自动化"程度最高的单人产品之一。
- **营收起始数字**: $103K MRR（创始人自报，来源 https://startupfounderstories.com/es/stories/eric-smith-autoshorts-40k-mrr-faceless-video-automation）；早期口径 $83.3K MRR/6 个月（https://coda.io/@sebas/saas/autoshorts-ai-83-3k-mrr-in-6-months-with-paid-ads-22）、$93K/月/净利约 $68K（2024-09，https://m.toutiao.com/group/7509368903785611826/）。
- **已核实的关键信源**: [1] 官网 https://autoshorts.ai（一手，HTTP 200 验证） [2] Startup Founder Stories 创始人访谈 https://startupfounderstories.com/es/stories/eric-smith-autoshorts-40k-mrr-faceless-video-automation（媒体） [3] Coda 案例复盘 https://coda.io/@sebas/saas/autoshorts-ai-83-3k-mrr-in-6-months-with-paid-ads-22（媒体） [4] 官网博客 AI 视频生成器页 https://autoshorts.ai/blog/ai-video-generator（一手）
- **数据冲突**: MRR 有 $83.3K / $93K / $103K 三档口径，分别对应不同披露时点；须以最新披露为主并注明时点。
- **撰写提示**: 重点写清"Meta 广告投放驱动增长"的路径与"创始人曾用其他工具做到 $50K MRR"的复用能力；同时说明其作为前 Instagram 工程师的产品敏感度来源。

### 9. TransClipper
- **slug**: transclipper
- **创始人**: Sergiu Chiriac（葡萄牙）
- **官网**: https://transclipper.ai
- **总部**: 葡萄牙
- **成立年份**: 2026
- **建议 launchDate**: 2026-01（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 用 AI（ASR + LLM）把长视频/播客自动切成带字幕的竖版短视频，用于短视频分发与内容再利用。
- **类别归属批次理由**: 音频/长视频再利用方向的欧洲单人样本，补充"语音转写 + 视频"复合链路。
- **营收起始数字**: 约 $7.2K/30 天（TrustMRR Stripe 验证口径，来源 https://trustmrr.com/startup/transclipper-ai）。创始人自报"独立开发、无团队无投资人"。
- **已核实的关键信源**: [1] 官网 https://transclipper.ai（一手，HTTP 200 验证，官网自述 "I build TransClipper on my own — no team, no investors"） [2] TrustMRR Stripe 验证页 https://trustmrr.com/startup/transclipper-ai（第三方验证） [3] IndieMakerList AI 分类榜 https://indiemakerlist.com/categories/ai（媒体）
- **数据冲突**: 营收规模不大但口径为 Stripe 验证，无明显冲突；风险是体量偏小，撰写时应强调"单位经济与自动化程度"而非规模。
- **撰写提示**: 重点说明"内容再利用"这一被低估的需求（一个长视频 → 数十条短视频），以及完全单人交付下的自动化测试策略。

### 10. Visualizee.ai
- **slug**: visualizee-ai
- **创始人**: Piotr Obidowski（波兰，华沙）
- **官网**: https://visualizee.ai
- **总部**: 波兰, 华沙
- **成立年份**: 2023
- **建议 launchDate**: 2023-06（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向家居/商业空间的 AI 3D 可视化与效果渲染，把平面图变成可交互的虚拟空间效果图。
- **类别归属批次理由**: 垂直可视化方向的东欧单人样本，补充"AI + 专业设计软件"这一细分。
- **营收起始数字**: $8,648/30 天（TrustMRR Stripe 验证口径，来源 https://trustmrr.com/startup/visualizee-ai）。
- **已核实的关键信源**: [1] 官网 https://visualizee.ai（一手，HTTP 200 验证） [2] TrustMRR Stripe 验证页 https://trustmrr.com/startup/visualizee-ai（第三方验证） [3] Startup Founder Stories 创始人故事 https://startupfounderstories.com（媒体）
- **数据冲突**: 营收为 30 天窗口快照，非 MRR/年化口径，撰写时不要换算为 ARR 除非明确标注推算方式。
- **撰写提示**: 重点说明"专业设计软件 + 生成式 AI"的融合方式，以及为什么这条细分赛道未被大厂覆盖。

### 11. BoredHumans
- **slug**: boredhumans
- **创始人**: Nick Dobos（美国，@NickADobos）
- **官网**: https://boredhumans.com
- **总部**: 美国
- **成立年份**: 2023
- **建议 launchDate**: 2023-09（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 以 AI 工具聚合平台（100+ 免费在线 AI 工具）做 SEO 长尾流量，靠广告与增值工具变现。
- **类别归属批次理由**: "AI 工具聚合 + SEO 广告"变现模型中单人营收体量最大的样本之一。
- **营收起始数字**: 约 $733K/月（≈$8.8M ARR，来源 https://crazyburst.com/ai-saas-solo-founder-success-stories-2026/、https://www.flaex.ai/experts，均为创始人自报口径）。
- **已核实的关键信源**: [1] 官网 https://boredhumans.com（一手，HTTP 200 验证） [2] Flaex.ai AI 专家名录（明确标注 "Solo founder of BoredHumans — 100+ AI tools on one platform generating $733K/month"） https://www.flaex.ai/experts（媒体） [3] crazyburst 单人 AI SaaS 案例 https://crazyburst.com/ai-saas-solo-founder-success-stories-2026/（媒体） [4] YouMake "Solo-Corn" 时代盘点 https://blog.youmake.dev/articles/solo-corn-one-person-ai-startups-millions-revenue（媒体）
- **数据冲突**: $733K/月为创始人自报，无 Stripe 验证；多来源数字一致（属同一自报口径），不可当作独立交叉验证。
- **撰写提示**: 重点解释"每页一个工具 + SEO 流量套利"的商业结构与规模天花板；必须写明"收入结构以广告为主，非订阅"这一区别于其他 OPC 的关键点。

### 12. Musicfy
- **slug**: musicfy
- **创始人**: Arib Khan（美国，圣何塞，巴基斯坦裔，19 岁起创业；旗下 24 Labs 产品组合）
- **官网**: https://musicfy.lol
- **总部**: 美国, 加利福尼亚
- **成立年份**: 2025
- **建议 launchDate**: 2025-01（精度：quarter）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 声音克隆与 AI 演唱生成工具，把用户歌声转换成特定艺人音色并生成无版权歌曲。
- **类别归属批次理由**: AI 音乐/声音生成方向中增长最猛的单人产品，同时补齐"AI 音乐"品类。
- **营收起始数字**: 首年 $1.2M–$1.5M 营收（创始人访谈口径，来源 https://www.profitablefounder.xyz/blog/how-arib-khan-built-musicfy）；上线约 8 个月突破 $100K/月；约 100 万 MAU；官网宣称 500 万+用户（https://musicfy.lol）。
- **已核实的关键信源**: [1] 官网 https://musicfy.lol（一手，HTTP 200 验证） [2] Profitable Founder 深度访谈 https://www.profitablefounder.xyz/blog/how-arib-khan-built-musicfy（媒体） [3] Money Making Story 访谈 https://www.moneymakingstory.com/p/from-zero-to-1-5m-a-19-year-old-s-startup-story（媒体） [4] CrustData 团队画像（团队 4 人，Founder Arib Khan + CMO Chris Reid，33 万月访问） https://profiles.crustdata.com/company/musicfy（媒体） [5] 官网 DMCA 署名页 https://musicfy.lol/dmca（一手，指定代理 arib@musicfy.lol）
- **数据冲突**: 用户数有"100 万 MAU"（访谈）与"500 万+用户"（官网）两套口径；营收为创始人自报，无第三方验证。团队已扩至 4 人并设 CMO，须交代扩编时点。
- **撰写提示**: 必须同时讲清商业价值与版权灰区（AI 翻唱他人音色），这是本案例最具争议也最有传播价值的部分；不得把官网 500 万用户与访谈 100 万 MAU 混用。

### 13. aiCarousels
- **slug**: aicarousels
- **创始人**: Fernando Pessagno（阿根廷裔，旅居瑞典）
- **官网**: https://aicarousels.com
- **总部**: 瑞典（创始人阿根廷裔，站点称 "Swedish"）
- **成立年份**: 2024
- **建议 launchDate**: 2024-05（精度：month）
- **类别**: AI生成
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 社交媒体轮播图（Carousel）生成器，为 LinkedIn 从业者批量产出可发布的内容卡片。
- **类别归属批次理由**: 拉美裔创始人的代表案例，且是"10 天上线 → 8 个月 $5K MRR"的快速验证范式。
- **营收起始数字**: 近 $5,000 MRR（官方客户案例 Outseta 访谈口径，来源 https://www.outseta.com/customers/building-an-ai-product-in-10-days）；另有 6 个月 $1K MRR 的早期口径（https://startupfounderstories.com/ru/stories/fernando-pessagno-aicarousels-1k-mrr-180-days）。
- **已核实的关键信源**: [1] 官网 https://aicarousels.com（一手，HTTP 200 验证） [2] Outseta 官方案例文章 https://www.outseta.com/customers/building-an-ai-product-in-10-days（媒体，创始人具名访谈） [3] Startup Founder Stories 创始人档案 https://startupfounderstories.com/ru/stories/fernando-pessagno-aicarousels-1k-mrr-180-days（媒体） [4] AI Solopreneur 专题 https://www.solopreneur.global/posts/how-fernando-built-aicarousels-to-5k-mrr-in-10-days（媒体）
- **数据冲突**: 营收时点口径不同（$1K→$5K）；"阿根廷裔/旅居瑞典"的总部归属需写清，避免误标为拉美本地公司。
- **撰写提示**: 重点写"被裁员危机反向驱动 10 天 build-in-public"这一叙事，以及产品页 About 区明确写"owner is one person、邮件直接发给创始人"的反惯例做法。

---

## 批次 2（AI 编程 / Agent / 开发者基础设施，12 个）

### 14. Base44
- **slug**: base44
- **创始人**: Maor Shlomo（以色列）
- **官网**: https://base44.com
- **总部**: 以色列, 特拉维夫
- **成立年份**: 2025
- **建议 launchDate**: 2025-01（精度：quarter）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 自然语言生成完整可运行的 Web 应用（含数据库、认证、存储、分析），上线半年后自研 LLM 并被 Wix 以 $80M 收购。
- **类别归属批次理由**: AI 编程赛道唯一以"并购退出"收束的单人案例，是"一人公司 → 数亿美元退出"的标杆。
- **营收起始数字**: 收购初始对价约 $80M 现金 + 至 2029 年的 earn-out（Wix 官方新闻稿，来源 https://www.wix.com/press-room/home/post/wix-further-expands-into-vibe-coding-with-acquisition-of-base44-a-hyper-growth-startup-that-simplif）；另有报道称出售时约 9 名员工、单月净赚 $137 万、半年零融资（https://m.36kr.com/p/3343273859971585）；营收 run-rate 约 $3.5M（https://base44devs.com/blog/base44-after-wix-acquisition-what-changed）。
- **已核实的关键信源**: [1] Wix 官方新闻稿 https://www.wix.com/press-room/home/post/wix-further-expands-into-vibe-coding-with-acquisition-of-base44-a-hyper-growth-startup-that-simplif（一手） [2] Wix 官方博客 https://www.wix.com/blog/avishai-abrahami-we-built-our-own-ai-models（一手） [3] 官网 https://base44.com（一手，HTTP 200 验证） [4] 36Kr 报道 https://m.36kr.com/p/3343273859971585（媒体） [5] Sacra 公司档案 https://sacra.com/c/base44/（媒体）
- **数据冲突**: "$80M"为官方口径（含 earn-out 分期），媒体常简化表述为"卖了 6 亿人民币"；团队规模 8–9 人，创始人非唯一创始人的表述需谨慎——Shlomo 为唯一创始人（CEO），但团队已扩编至近 10 人，须明确写"单人创办 + 后期雇佣团队"。
- **撰写提示**: 重点写"Wix 主动收购而非 Shlomo 卖"的戏剧性，以及收购后自研 LLM 的技术自主化路径；同时交代他从 2025 年初到被收购只用了半年。

### 15. TypingMind
- **slug**: typingmind
- **创始人**: Tony Dinh（越南，@tdinh_me）
- **官网**: https://typingmind.com
- **总部**: 越南 / 远程
- **成立年份**: 2023
- **建议 launchDate**: 2023-04（精度：month）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 多模型聚合的 ChatGPT 增强前端，支持自建提示词库、插件、Agent 与多模型切换，可自部署。
- **类别归属批次理由**: "前端/聚合型 AI 工具"的经典样本，也是理解"AI 助手如何绕过 API 成本与模型依赖"的代表。
- **营收起始数字**: 约 $142K/月（TypingMind + DevUtils 组合口径，IndieMakerList/创始人自报，来源 https://indiemakerlist.com）。单品口径未公开拆分。
- **已核实的关键信源**: [1] 官网 https://typingmind.com（一手，HTTP 200 验证） [2] IndieMakerList 收入页 https://indiemakerlist.com/revenue/typingmind（媒体，创始人自报） [3] SigmaSchool 单人 AI SaaS 盘点 https://sigmaschool.co/blog/7-ai-saas-startups-built-by-solo-founders-and-how-you-can-do-it-too（媒体） [4] Cipher Projects 一人公司盘点 https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship（媒体）
- **数据冲突**: 数字为"TypingMind + DevUtils"组合，须避免直接写成 TypingMind 单品；自报数据无第三方验证。
- **撰写提示**: 重点写"不与模型厂商竞争、只做最好用的客户端"这一卡位，以及自部署/自带 API Key 带来的定价弹性（一次性付费而非订阅）。

### 16. n8n
- **slug**: n8n
- **创始人**: Jan Oberhauser（德国，柏林；B2B 工作流自动化）
- **官网**: https://n8n.io
- **总部**: 德国, 柏林
- **成立年份**: 2019
- **建议 launchDate**: 2019-06（精度：quarter）
- **类别**: 基础设施
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 开源可自托管的工作流引擎，2022 年后转型 AI 编排：多 Agent 协作、LLM 链式调用、MCP 节点。
- **类别归属批次理由**: "一人公司起步 → $5.2B 估值"的最完整样本，也是 AI Agent 编排层的基础设施代表。
- **营收起始数字**: 估值 $5.2B（2026-05 SAP 战略投资，n8n 官方新闻稿）；营收约 $169.6M、累计融资 $259M、员工 1,100+（第三方估算，来源 https://compworth.com/company/n8n）。
- **已核实的关键信源**: [1] n8n 官方 Press 页 https://n8n.io/press/（一手，"founded by Jan Oberhauser in 2019"、$5.2B 估值里程碑） [2] 官方博客 SAP 投资公告 https://blog.n8n.io/n8n-sap/（一手） [3] 官方博客英国扩张（2026-09） https://blog.n8n.io/n8n-uk-international-expansion/（一手） [4] Solo Founders 创始人访谈 https://solofounders.com/blog/how-a-solo-founder-turned-a-side-project-into-a-2-5b-workflow-automation-giant（媒体） [5] compworth 公司档案 https://compworth.com/company/n8n（媒体）
- **数据冲突**: 估值在 $2.5B（2025-01，Sequoia 轮）与 $5.2B（2026-05，SAP 轮）之间；营收为第三方估算，需标"估算"。
- **撰写提示**: 这是"OPC 神话"的边界案例——必须写清创始人早期确实是单人开发，但今天 1,100+ 员工；文章价值在于讲清"开源+自托管→企业销售"的转型路径，同时诚实标注规模变化。

### 17. AssemblyAI
- **slug**: assemblyai
- **创始人**: Dylan Fox（美国，纽约）
- **官网**: https://assemblyai.com
- **总部**: 美国, 纽约
- **成立年份**: 2017
- **建议 launchDate**: 2017-01（精度：year）
- **类别**: 基础设施
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 自研 Speech AI 模型（转写、语音理解、Voice Agent API），成为 Granola、HeyGen、ClickUp 等产品的底层语音层。
- **类别归属批次理由**: AI 语音基础设施的代表，且创始人早期确为单人起步，是"深度技术型 OPC"的样本。
- **营收起始数字**: 年营收约 $76M（2026 估算，来源 https://sacra.com/c/assemblyai/）；累计融资约 $130M（Series C，官网 Media Kit 一手口径）；20 万+开发者、每日处理 10TB+ 语音数据（来源 https://aiwiki.ai/wiki/assemblyai/edit）。
- **已核实的关键信源**: [1] 官网 Media Kit https://www.assemblyai.com/media（一手，Founded 2017 / CEO Dylan Fox / Series C $130M raised） [2] 官网 Newsroom https://www.assemblyai.com/newsroom（一手，Dylan Fox 署名公告） [3] Sacra 营收分析 https://sacra.com/c/assemblyai/（媒体） [4] AI Wiki 词条 https://aiwiki.ai/wiki/assemblyai/edit（媒体） [5] YesPress 创始人访谈 https://yespress.io/dylan-fox（媒体）
- **数据冲突**: 营收 $76M 为第三方估算，未审计；"日处理 10TB"口径来自 AI Wiki 转述公司材料，需注明出处层级。
- **撰写提示**: 重点讲"Fox 用十年把语音识别从学术论文变成 API 商品"的技术长跑路径，以及公司作为整个 AI 语音生态底座的角色——它本身不是消费产品，但支撑了整个 OPC 生态。

### 18. Hebbia
- **slug**: hebbia
- **创始人**: George Sivulka（美国，旧金山）
- **官网**: https://hebbia.com
- **总部**: 美国, 旧金山
- **成立年份**: 2020
- **建议 launchDate**: 2020-01（精度：year）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 多模态文档矩阵 Agent（Matrix），对投研/尽调的多份文档做交叉检索、推理与报告生成。
- **类别归属批次理由**: "AI + 金融专业工作流"深度垂直的标杆，也是少数从单人原型长成 $100M+ ARR 公司的样本。
- **营收起始数字**: ARR 约 $48M（2026-08 估算，来源 https://sacra.com/c/hebbia/）；2025 年底约 $30M、2024 年底约 $17M（同源）。2026 年完成 $130M B 轮（https://finance.yahoo.com/news/ai-startup-hebbia-raised-130m-230429049.html）。处理文档量已破 10 亿页（官网 Blog 一手）。
- **已核实的关键信源**: [1] 官网 https://hebbia.com（一手，HTTP 200 验证） [2] 官网 Blog 公司页 https://www.hebbia.com/blog/company/（一手，"Hebbia Crosses 1 Billion Pages Processed"） [3] 官网 CTO 加入说明 https://www.hebbia.com/blog/why-i-joined-hebbia-as-cto（一手，证明 CTO 2025-09 才加入 = 早期近似单人） [4] Sacra 营收分析 https://sacra.com/c/hebbia/（媒体） [5] Yahoo Finance 融资报道 https://finance.yahoo.com/news/ai-startup-hebbia-raised-130m-230429049.html（媒体）
- **数据冲突**: ARR 全部为估算（$17M→$30M→$48M），无 Stripe 验证；融资轮次与投资方报道口径不一。
- **撰写提示**: 必须引用官网 CTO 加入说明来界定"早期单人"的时点；重点讲"先用 Matrix 单一产品打透投研场景，再横向扩到尽调/合规"的产品纵深策略。

### 19. OpenClaw
- **slug**: openclaw
- **创始人**: Peter Steinberger（奥地利，前 PSPDFKit 创始人）
- **官网**: https://openclaw.ai
- **总部**: 奥地利 / 美国（2026-07 转为美国 501(c)(3) 非营利基金会）
- **成立年份**: 2025（2025-11 以 Clawdbot 上线）
- **建议 launchDate**: 2025-11（精度：month）
- **类别**: Agent
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 开源、可本地运行的个人 AI Agent 框架，通过 WhatsApp/Telegram 等聊天应用调度真实世界任务（收邮件、订机票、管日程）。
- **类别归属批次理由**: 全球影响力最大的单人开源 AI Agent 项目，也是"AI Agent 从工具变成平台"的分水岭。
- **营收起始数字**: 不适用商业订阅模式——OpenClaw 为 MIT 许可、明确"无订阅、无托管版"，现由非营利基金会（OpenClaw Foundation, 501(c)(3)）运营，捐赠方含 University of Michigan、OpenAI、Amazon、Red Hat（来源 https://openclaw.ai/#foundation 与 https://openclaw.ai/blog/introducing-openclaw-foundation/）。规模指标：GitHub 约 393K stars / 82K forks（2026-10，来源 https://openclawhq.io/blog/who-owns-openclaw）。
- **已核实的关键信源**: [1] 官网 https://openclaw.ai（一手，HTTP 200 验证，Foundation 章节明确治理结构与捐赠方） [2] 官网基金会公告 https://openclaw.ai/blog/introducing-openclaw-foundation/（一手） [3] 官网 Blog 更新 https://openclaw.ai/blog/introducing-openclaw-foundation/ 与 https://openclaw.ai/updates/wave-in-claude-and-chatgpt（一手） [4] OpenClawHQ 所有权考据 https://openclawhq.io/blog/who-owns-openclaw（媒体，含改名史 Clawdbot→Moltbot→OpenClaw 与 star 数） [5] AI Wiki 词条 https://aiwiki.ai/wiki/openclaw（媒体，含 2026-07-08 基金会成立与首支全职团队构成） [6] GitHub https://github.com/openclaw/openclaw（一手）
- **数据冲突**: 2026-07 转型为非营利基金会，与"商业公司"叙事冲突；创始人身份在"Peter Steinberger 个体项目"与"基金会托管"之间存在阶段差异，撰写时须按时间线分段处理。基金会首支全职团队为 6 名工程师 + 4 名运营，已非"当前一人公司"。
- **撰写提示**: 严格按"2025-11 个体项目 → 2026-07 基金会化"两段式写；这是全库中"OPC 身份发生变化"的最重要案例，必须诚实交代治理与团队结构变化，不可写成"至今仍是单人公司"。

### 20. Aura
- **slug**: aura
- **创始人**: Meng To（新加坡，前 Uizard 创始人）
- **官网**: https://aura.build
- **总部**: 新加坡
- **成立年份**: 2024
- **建议 launchDate**: 2024-01（精度：quarter）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向创作者的 AI 应用生成器，用自然语言/提示词直接生成可发布的 Web 应用并同步上架到应用市场。
- **类别归属批次理由**: "设计师背景创始人 + AI 创作工具"的代表，验证了非工程背景也能做 AI-native 产品。
- **营收起始数字**: 189,000 用户（创始人公开数字，来源 https://aura.build）；收入未公开披露——写作时须写"未公开披露"。
- **已核实的关键信源**: [1] 官网 https://aura.build（一手，HTTP 200 验证；注意 aura.so 为域名停放出售页，非官方站点） [2] 官网 sell-templates 页面署名 https://aura.build/sell-templates（一手，Meng To 署名） [3] IndieMakerList AI 分类榜 https://indiemakerlist.com/categories/ai（媒体）
- **数据冲突**: 无营收数字；另需注意 TrustMRR 上的 "Aura++"（创始人 Praneet Brar，AI 产品发布平台）与本案例的 Aura（aura.build）**并非同一家公司**，引用时不可混淆。
- **撰写提示**: 重点写 Meng To 从 Uizard 退出后二次创业的连续性，以及"把应用商店的入口也做进产品里"这一分发设计。

### 21. CodeSpring
- **slug**: codespring
- **创始人**: Sebastian Volkis（乌克兰）
- **官网**: https://codespring.app
- **总部**: 乌克兰
- **成立年份**: 2024
- **建议 launchDate**: 2024-06（精度：quarter）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向非程序员的 vibe coding 工具链——AI 做市场验证、竞品侦察、应用生成与上架指导。
- **类别归属批次理由**: "非技术创始人用 AI 做产品"的东欧样本，且 founder 产出多个 AI 产品矩阵。
- **营收起始数字**: CodeSpring 单品约 $15K MRR / $180K ARR（来源 https://arrfounder.com/product/codespring）；创始人三个产品组合累计约 $324K 营收（https://arrfounder.com/@sebastianvolkis）。注意官网首页实时 MRR 面板显示为 £0，属仪表盘未接入，非真实为零。
- **已核实的关键信源**: [1] 官网 https://codespring.app（一手，HTTP 200 验证；/audit 页有 Sebastian Volkis "Founder & CEO" 署名） [2] Arrfounder 产品页 https://arrfounder.com/product/codespring（媒体） [3] Arrfounder 创始人页 https://arrfounder.com/@sebastianvolkis（媒体） [4] Brandon McPeak Solo Founder Playbook https://research.brandonmcpeak.com/solo-founder-playbook（媒体，明确 CodeSpring/ChatIQ/TrendFeed 同属一位非技术创始人）
- **数据冲突**: 官网 MRR 面板显示 £0 与第三方 $15K MRR 直接矛盾——写作时须以第三方/创始人披露为准并说明官网仪表盘未接入；组合口径与单品口径需分开。
- **撰写提示**: 重点写"用 Claude + GPT-4 生成约 80% 代码的非技术创始人如何做出 3 个产品"，以及把"AI 市场研究 → AI 建 App"串成一条交付链的产品设计。

### 22. Algrow
- **slug**: algrow
- **创始人**: Sam Adeniyi（尼日利亚，21 岁在校大学生）
- **官网**: https://algrow.online
- **总部**: 尼日利亚
- **成立年份**: 2025
- **建议 launchDate**: 2025-01（精度：quarter）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向内容创作者的 AI 研究工具：抓取并拆解热门短视频格式，一键复刻成自己的选题脚本。
- **类别归属批次理由**: 非洲唯一的合格 OPC 候选，且是"用 Discord 社区做零广告分发"的独特增长样本。
- **营收起始数字**: 约 $14,000 MRR（创始人自报，来源 https://www.everydev.ai/developers/algrow 与 Starter Story 访谈）；6 个月内做到，用户超 10,000（https://www.stackstarts.com/student-saas-14k-month-discord-ai-creator-playbook/）。
- **已核实的关键信源**: [1] 官网 https://algrow.online（一手，HTTP 200 验证） [2] EveryDev 开发者档案 https://www.everydev.ai/developers/algrow（媒体，标注 Founder Sam Adeniyi、Headquarters Nigeria、$14,000 MRR） [3] Starter Story 原文（Rosetta 归档） https://rosetta.to/u/starterstory/i-built-a-14k-month-saas-using-discord（媒体） [4] Starter Story 播客 https://podcasts.apple.com/bg/podcast/i-built-a-$14k-month-saas-using-discord/id1856101070（媒体） [5] Money Making Story https://www.moneymakingstory.com/p/how-a-21-year-old-student-built-a-14k-month-saas-using-discord（媒体）
- **数据冲突**: 数字为创始人自报（无 Stripe 验证）；无重大冲突。
- **撰写提示**: 重点写"Discord 社区作为分发渠道"的完整打法（静音、屏幕共享、建立信任后再发 waitlist），以及无编码背景用 Cursor + ChatGPT 一周做出来的事实；这是"低龄创始人 + 非洲"双重稀缺性案例。

### 23. Postiz
- **slug**: postiz
- **创始人**: Nevo David（以色列，@wickedguro）
- **官网**: https://postiz.com
- **总部**: 以色列
- **成立年份**: 2024
- **建议 launchDate**: 2024-01（精度：quarter）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: Agentic 社交媒体排程平台——AI 生成/改写内容、自动排期多平台发布、并做效果分析。
- **类别归属批次理由**: 开源起家转向 AI Agent 定位后营收 7 倍增长的典型路径，兼具开源与商业化双线。
- **营收起始数字**: $251,282 MRR / 7,347 活跃订阅（TrustMRR Stripe 验证，数据更新至 2026-10-08，来源 https://trustmrr.com/startup/postiz）。创始人自报口径有 $113K MRR（2026-06 Indie Hackers 访谈）、$145K MRR、约 $150K、$180K 等多个时点值。
- **已核实的关键信源**: [1] 官网 https://postiz.com（一手，HTTP 200 验证） [2] TrustMRR Stripe 验证页 https://trustmrr.com/startup/postiz（第三方验证） [3] EveryDev 开发者档案（标注 "Employees 1"、Nevo David CEO & Founder） https://www.everydev.ai/developers/postiz（媒体） [4] Steal What Works 追踪（记录其在 $55K MRR 时自述"one-person company"、后发布高级岗招聘） https://stealwhatworks.com/blogs/news/postiz-making-180k-per-month（媒体） [5] Superframeworks 案例复盘 https://superframeworks.com/case-study/postiz（媒体）
- **数据冲突**: 数字横跨 $113K → $251K 多个时点，须标注数据快照日期；"是否仍是一人公司"存在明确分歧：创始人早期自述 1 人，LinkedIn 显示 2–10 人且已招资深前端——必须交代扩编时点。
- **撰写提示**: 重点写"用 Novu 开源项目的 3 万 star 学到的分发打法 → 反哺 Postiz"这条因果链，以及从 OSS 工具到 AI Agent 定位的产品重构。

### 24. Polsia
- **slug**: polsia
- **创始人**: Victor-Benjamin "Ben" Cera（又名 Ben Broca；法国籍，现居旧金山；前 CloudKitchens 国际运营负责人）
- **官网**: https://polsia.com
- **总部**: 美国, 旧金山
- **成立年份**: 2025
- **建议 launchDate**: 2025-01（精度：quarter）
- **类别**: Agent
- **AI 契合类型**: ai-native
- **AI 作用一句话**: "AI 公司构建器"——用一支自主 AI Agent 团队代替工程/营销/销售/客服职能，自称零全职员工、$49/月起。
- **类别归属批次理由**: 营收/估值体量最大的单人 AI Agent 公司，也是"创始人本人也被自己的产品替代"的极端叙事样本。
- **营收起始数字**: 约 $3.5M ARR（2026-03 口径，来源 https://agent-wars.com/news/2026-03-14-polsia-ai-solo-founder-3-5m-arr）；另有 $250M 融资、$72M 营收、$200M 融资等更大口径（来源 https://eu.36kr.com/en/p/3825813697565316 与 https://www.wtfagents.com/guides/polsia）。⚠️ **数字冲突严重，必须以官网 About + 官方文章为准并注明时点**。
- **已核实的关键信源**: [1] 官网 About 页 https://polsia.com/about（一手，"My name is Victor-Benjamin"、无联合创始人自述） [2] Agent Wars 报道 https://agent-wars.com/news/2026-03-14-polsia-ai-solo-founder-3-5m-arr（媒体） [3] 36Kr 英文版 https://eu.36kr.com/en/p/3825813697565316（媒体） [4] WTF Agents 指南 https://www.wtfagents.com/guides/polsia（媒体） [5] Sistava 评测 https://sistava.com/en/ai-agent-platform-reviews/ai-operating-systems/polsia（媒体）
- **数据冲突**: ① 创始人有两个公开姓名（Victor-Benjamin Cera / Ben Broca），须统一说明；② ARR 口径从 $3.5M 到 $72M 跨度 20 倍，且"是否真的零员工"存疑；③ 官网称"创始于 20 个月前"与"2025 年底创立"表述不一。写作时一律以 $3.5M（较早、较保守、媒体可查）为主口径并注明冲突。
- **撰写提示**: 必须先解决"Ben Cera = Ben Broca"的身份问题再讲商业故事；重点写"用 AI 团队替代人类团队、连创始人都由 Agent 管理"的自我实验逻辑，并诚实标注融资与营收口径的不一致。

### 25. Durable
- **slug**: durable
- **创始人**: James Clift（加拿大，温哥华；前 VisualCV 创始人，2020 年以 $100K 买入并卖出）
- **官网**: https://durable.co
- **总部**: 加拿大, 温哥华
- **成立年份**: 2022
- **建议 launchDate**: 2023-01（精度：year，2023 转型 AI 业务构建器）
- **类别**: 开发者工具
- **AI 契合类型**: ai-native
- **AI 作用一句话**: "AI 业务构建器"——从一句 prompt 生成带 SEO、ChatGPT 可发现性、线索跟进、支付与 AI Agent 的完整小企业网站。
- **类别归属批次理由**: 最典型的"用 AI 让普通人拥有生意"叙事，且团队扩张时点清晰可查（6 名工程师），是讲"一人 → 小团队"最干净的样本。
- **营收起始数字**: $14M A 轮（Spark Capital 领投，官网一手）；2026-03 累计 3.5M 注册用户、累计融资约 $20M、6 名工程师（来源 https://solofounders.com/blog/owning-a-business-should-be-easier-than-having-a-job-james-clift-the-solo-founder-behind-3-5-million-business-on-durable/ 与 https://podcasts.apple.com/pa/podcast/solo-founders/id1881721449）。营收未公开披露。
- **已核实的关键信源**: [1] 官网 About 页 https://durable.com/about（一手，"From James Clift, Founder of Durable"、团队基地温哥华、Spark Capital/South Park Commons/Soma Capital 投资方列名） [2] 官网 Blog 发布公告 https://durable.com/blog/launch（一手，2026-03-17 James Clift 署名） [3] GlobeNewswire 官方新闻稿 https://www.globenewswire.com/news-release/2026/03/17/3257754/0/en/Durable-Launches-End-to-End-AI-Business-Platform-for-Entrepreneurs.html（一手，PRNewswire 发布） [4] Solo Founders 专访 https://solofounders.com/blog/owning-a-business-should-be-easier-than-having-a-job-james-clift-the-solo-founder-behind-3-5-million-business-on-durable/（媒体） [5] Wellfound 团队页 https://wellfound.com/company/durableco/people（媒体，Founders 栏仅列 James Clift）
- **数据冲突**: ⚠️ **关于创始人数量存在明确冲突**：官网 About 页与 GlobeNewswire 新闻稿均以 James Clift 为唯一 "Founder"（一手，支持单人），但 Wellfound 团队页标注 Ross Howard-Jones 为 "Founding Designer"（自 2022-03 起），且第三方目录 uwarp.design 明确写 "founded by James Clift and Ross Howard-Jones"。本文按"官方一手自述 = 单一创始人"收录，但**撰写时必须客观说明 Ross Howard-Jones 作为 Founding Designer 的存在与"co-founder"说法**，不可回避。
- **撰写提示**: 严格区分"当前团队 6 名工程师"与"创始人单人"两个概念，并主动处理 Ross Howard-Jones 的角色争议（这是本案例最容易被读者质疑的点，写作时主动披露比被质疑更可信）。

---

## 批次 3（AI 助手与客服 Agent，11 个）

### 26. Chatbase
- **slug**: chatbase
- **创始人**: Yasser Elsaid（埃及裔，加拿大多伦多；前微软/Shopify 工程师）
- **官网**: https://www.chatbase.co
- **总部**: Toronto, 加拿大
- **成立年份**: 2023
- **建议 launchDate**: 2023-02（精度：month）
- **类别**: 垂直应用
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 通用 RAG 客服 Agent 平台——抓取网站或上传文档即训练出可嵌入官网、WhatsApp、Slack、邮件与语音的 AI 客服。
- **类别归属批次理由**: "垂直应用"里商业规模最大、Stripe 验证最硬的客服垂类样本（TrustMRR 全站排名第 8），可与 SiteGPT 做同类对照。
- **营收起始数字**: $863,632 MRR / $19,213,227 累计收入（TrustMRR，Stripe API 验证，数据更新 2026-10；来源 https://trustmrr.com/startup/chatbase）；更早口径 $9M ARR（创始人访谈，来源 https://solofounders.com/blog/9m-arr-zero-investors-yasser-elsaid-on-bootstrapping-chatbase-as-a-solo-founder）。
- **已核实的关键信源**: [1] 官网 https://www.chatbase.co（一手，HTTP 200 验证） [2] TrustMRR 产品页 https://trustmrr.com/startup/chatbase（一手 Stripe 验证：$863,632 MRR、12,424 活跃订阅、10,000+ 企业客户） [3] Solo Founders 专访 https://solofounders.com/blog/9m-arr-zero-investors-yasser-elsaid-on-bootstrapping-chatbase-as-a-solo-founder（媒体，$9M ARR 零融资自述） [4] 官网定价与套餐 https://chatbase.co/pricing（一手，Free / $40 / $150 / $500 每月） [5] Cipher Projects 一人公司盘点 https://www.cipherprojects.com/blog/posts/rise-one-person-business-solo-founders-reshaping-entrepreneurship（媒体） [6] IndieMakerList AI 榜 https://indiemakerlist.com/categories/ai（第三方，$864K MRR）
- **数据冲突**: ① 团队规模从 1 人扩至 30 人，"一人公司"仅指创始期——撰写时必须明确"创始期单人、当前 30 人团队"的时点；② 数字存在 $864K MRR 与 $9M ARR 两套口径（后者为创始人 2024 年自报），需注明时间差；③ 早期定位是"文档问答"、现已是"客服/销售 Agent"，产品叙事已迁移。
- **撰写提示**: 重点写"从个人开发者工具到企业 SaaS"的转型路径，以及 Stripe 实时验证数字对"AI 创业神话"的祛魅作用；必须主动交代团队扩张，不能让读者误以为今天仍是单人。

### 27. SiteGPT
- **slug**: sitegpt
- **创始人**: Bhanu Teja Pachipulusu（印度）
- **官网**: https://sitegpt.co
- **总部**: 印度（远程）
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year）
- **类别**: 垂直应用
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 把企业自己的网站变成"会回答问题的 AI 客服"——抓取站点内容训练机器人，按消息量固定价收费。
- **类别归属批次理由**: 与 Chatbase 同赛道但定价模型完全不同（消息量固定价而非 token 计费），是"AI 客服如何避开按次计费"的关键对照样本。
- **营收起始数字**: 约 $15K MRR（第三方收录，来源 https://www.thisiswhyibuilt.com/startups/sitegpt）；TrustMRR 无收录记录。**待核实**——缺乏 Stripe 级第三方验证，撰写时须写"第三方估算，未获独立验证"。
- **已核实的关键信源**: [1] 官网 https://sitegpt.co（一手，HTTP 200 验证） [2] 官网定价 https://sitegpt.ai/resources/how-to-create-an-ai-chatbot（一手：Starter $59/月、Growth $79/月等） [3] 官网对比页 https://sitegpt.ai/resources/sitegpt-vs-customgpt（一手定价） [4] 创始人署名博客 https://sitegpt.ai/blog/agentic-customer-service（一手，署名 "Bhanu Teja P, SiteGPT founder"） [5] 代理商伙伴计划 https://sitegpt.ai/blog/ai-chatbot-agency-partner（一手） [6] 第三方收录 https://www.thisiswhyibuilt.com/startups/sitegpt（第三方，$15k/mo）
- **数据冲突**: 创始人本人有另一身份——Squad 的联合创始人（https://squad.so/about 明确写 "Co-founder"），因此 SiteGPT 本身仍是单人产品但创始人并非首次创业，撰写时须交代其"连续创业者"身份，避免读者误判为首次创业。营收数字仅第三方一处，来源强度弱。
- **撰写提示**: 必须写清"创始人此前已做过 Feather（被 Tibo 收购）、现另创 Squad"这一背景，同时说明 SiteGPT 本身是单人主导；营收口径必须标注"第三方估算，待核实"。

### 28. Better Analyst（曾用名 Formula Bot）
- **slug**: betteranalyst
- **创始人**: David Bressler（美国）
- **官网**: https://betteranalyst.com
- **总部**: 美国（远程）
- **成立年份**: 2022
- **建议 launchDate**: 2022-08（精度：month，官网与访谈均指向 2022 年 8–9 月上线）
- **类别**: 垂直应用
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 用自然语言把"拖进来的一张 Excel/PDF"变成公式、图表、报告与可定时推送的自动化分析。
- **类别归属批次理由**: 池中唯一有 **n8n 官方客户案例**背书的案例，是"非程序员 + 低代码 + AI 编排"跑通 B2B 数据分析的完整样本，同时可作为 n8n 案例的交叉引用。
- **营收起始数字**: $500K ARR（创始人访谈自报，来源 https://startupfounderstories.com/es/stories/david-bressler-formulabot-20k）；$30K MRR（https://www.thesuccessfulprojects.com/page/2/，口径 $400K/年）；900K+ 注册用户（创始人访谈，https://www.websiteplanet.com/blog/formula-bot-interview/）。官网一手：1M+ 用户。
- **已核实的关键信源**: [1] 官网 https://betteranalyst.com（一手，HTTP 200 验证，域名 formulabot.com 已 301 至此） [2] n8n 官方客户案例 https://n8n.io/case-studies/formula-bot/（一手，n8n 官方发布，明确写 "David operates as a solo full time founder, supported by two developers"） [3] WebsitePlanet 访谈 https://www.websiteplanet.com/blog/formula-bot-interview/（媒体，900K 用户） [4] Startup Founder Stories https://startupfounderstories.com/es/stories/david-bressler-formulabot-20k（媒体，$500K ARR） [5] 官网改名 FAQ https://betteranalyst.com/（一手，"Formula Bot is now Better Analyst"）
- **数据冲突**: ① 营收三套口径：$500K ARR（2025 访谈）/ $400K 年收入 / 官网 1M+ 用户但注册≠付费；② 团队实为"1 名全职创始人 + 2 名开发者"，严格说是"创始人 + 2 人支持"，不是纯 0 员工；③ 产品已从 Excel 公式生成器转型为"连接 GA/BigQuery/Snowflake 的分析平台"，叙事重心需按当前版本写。
- **撰写提示**: 必须披露"两名开发者支持"这一事实，不能写成零员工；重点讲非技术创始人用 Bubble + n8n + AI Agent 组合替代工程团队的路径——这是本案例最独特、也最容易被误读为"纯一人公司"的点。

### 29. Chatbox
- **slug**: chatbox-ai
- **创始人**: Benn Huang（黄，本名 Bin-Huang；中国）
- **官网**: https://chatboxai.app
- **总部**: 中国
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year，App Store 上线约 2023 年底）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 开源的多模型 AI 客户端——用户自带 API Key，在桌面/移动/Web 上统一使用 GPT、Claude、Gemini、Grok、DeepSeek。
- **类别归属批次理由**: "AI 助手"里唯一的开源+多端+中国团队样本，可与 TypingMind（商业闭源、多模型聚合）做"开源 vs 闭源"对照。
- **营收起始数字**: $13,000,000（2026 上半年全球收入，Appfigures 口径经 36氪转述，来源 https://36kr.com/p/3975377407062537）；Appfigures 另有 App Store 单应用估算 123.5K 美元（口径为单应用商店流水，与"全平台收入"不可混用）。
- **已核实的关键信源**: [1] 官网 https://chatboxai.app（一手，HTTP 200 验证） [2] 官网多语言页 https://chatboxai.app/ar/（一手，明确写 "21,700★ on GitHub" 与 4.9/5.0 Product Hunt 评分） [3] 36氪 Appfigures 榜单 https://36kr.com/p/3975377407062537（媒体，$13M 上半年收入） [4] Appfigures 数据页 https://app.appfigures.com/reports/app-profile/337289255810（第三方） [5] GPT Newsroom 开发者访谈 https://gptnewsroom.wordpress.com/category/open-source-desktop-ai-app/（媒体，开发者自述 "Bin-Huang"）
- **数据冲突**: ① GitHub star 数三套：官网 21,700★ / awesome-repositories 40,509 / 官网首页 18.9K——撰写时只引官网口径并注明快照日期；② 收入口径 $13M 是"2026 上半年全球 Appfigures 估算"，与 App Store 单应用 123.5K 美元不可比；③ "创始人 Benn Huang" 与 GitHub 账号 "Bin-Huang" 的对应关系来自第三方媒体而非官网署名，撰写时应以"开发者 Ben/Bin-Huang（GitHub: Bin-Huang）"表述。
- **撰写提示**: 重点写"自建 API Key 模式如何同时获得隐私口碑与低边际成本"，以及开源→商业化的路径；star 数与收入必须分别标注快照日期与统计方。

### 30. BoltAI
- **slug**: boltai
- **创始人**: Daniel Nguyen（越南）
- **官网**: https://boltai.app
- **总部**: 越南（远程）
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: macOS 菜单栏里的多模型 AI 助手（GPT/Claude/Gemini 等），用户自带 API Key，按"一次性买断 + 订阅"两种方式收费。
- **类别归属批次理由**: "AI 效率工具"里最纯粹的桌面端单产品样本，买断制定价与高毛利是独立于订阅制 SaaS 的另一种经济模型。
- **营收起始数字**: 2025 年月销售额 $15,000–$30,000，均值约 $25,000，年化约 $30 万（创始人自报，来源 https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now）；毛利率接近 90%（同源，因主要成本是用户自带的 API Key）。
- **已核实的关键信源**: [1] 官网 About 页 https://boltai.com/about（一手，"built and run by Daniel Nguyen"、"Bootstrapped & Profitable"、"VC-Free"） [2] 官网文档联系页 https://boltai.com/docs/company/contact-us（一手，公司主体信息） [3] 官网 https://boltai.app（一手，HTTP 200 验证） [4] Steal What Works macOS 收入盘点 https://stealwhatworks.com/blogs/news/mac-apps-making-real-money-now（媒体，$15K–$30K/月、毛利率 ~90%） [5] Starter Story 播客 https://podsized.io/podcasts/starter-story/episodes/15kmonth-app-built-in-a-weekend-starter-story-36f5da38-c3f2-4cba-8222-f37d48ab4626（媒体，$15K MRR）
- **数据冲突**: ① 收入是"月销售额"而非严格 MRR——因主体为买断授权 + 订阅混合，撰写时必须用"月销售额"而非直接写 MRR；② 第三方复盘（Steal What Works）认为买断制下应称"月销售额"，与部分聚合站的 MRR 标签冲突；③ 成立年份在第三方目录中同时出现 2023 与 2024 两个版本，以官网 2023 年上线为准。
- **撰写提示**: 必须解释"买断制 + BYOK"为何带来约 90% 毛利却仍能规模化，以及这对"一人公司成本结构"这一主题的意义；金额口径统一写作"月销售额"。

### 31. Inbox Zero
- **slug**: inbox-zero
- **创始人**: Elie Steinbock（以色列）
- **官网**: https://www.getinboxzero.com
- **总部**: 以色列（远程）
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year，创始人个人作品页标注 "2023 – now"）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 开源 AI 邮件助理——自动分诊来信、用你的语气起草回复、批量退订、标记"你已读不回"的沉默线程。
- **类别归属批次理由**: 邮箱是最高频的通用效率场景，且本案例是"开源 AGPL + 商业化 + 隐私优先"三条路线并行的独特样本。
- **营收起始数字**: $10,000+/月 MRR（创始人自述，来源 https://www.starterstory.com/stories/inbox-zero，标题即 "How I Built a $10K/month AI App for Email"）；15,000+ 注册用户、曾登顶 GitHub Trending（创始人个人站一手 https://elie.tech/）。
- **已核实的关键信源**: [1] 官网 https://www.getinboxzero.com（一手，HTTP 200 验证） [2] 创始人个人站 https://elie.tech/（一手，"Things I've built / Inbox Zero 2023 – now / AI email assistance, open source"） [3] Starter Story 访谈 https://www.starterstory.com/stories/inbox-zero（一手访谈，$10K/month） [4] 官网 AI 助理页 https://www.getinboxzero.com/ai-email-assistant（一手功能与定价） [5] 官网开源说明 https://www.getinboxzero.com/email-client（一手，AGPL、web/desktop 端开源，iOS 端不开源）
- **数据冲突**: ① 营收 $10K/月来自较早（2023–24）的创始人自报，缺近期 Stripe 级验证；② iPhone 端不开源而 web/desktop 开源，撰写开源程度时不能笼统写"全平台开源"；③ 创始人个人站标注"15k+ sign ups"与"$10K/月"是同一时期的两个口径，需注明时间点。
- **撰写提示**: 重点讲开源如何同时充当获客渠道与信任凭证，以及"隐私优先 + 不训练用户数据"在企业采购中的作用；营收数字必须标注为创始人自报且时点较早。

### 32. Post Bridge
- **slug**: post-bridge
- **创始人**: Jack Friks（美国，21 岁时创办）
- **官网**: https://post-bridge.com
- **总部**: 加拿大（TrustMRR 记录为 Canada；创始人自述在北美远程运营）
- **成立年份**: 2024
- **建议 launchDate**: 2024-09（精度：month，TrustMRR 记录成立时间 2024 年 9 月）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向创作者的 AI 社媒排程与跨平台发布工具，一个后台同时管理 X/LinkedIn/TikTok/Instagram/Reddit 等渠道。
- **类别归属批次理由**: 池中唯一"因为拒绝了 100 万美元报价而知名"的年轻创始人案例，为"AI 小生意 + 拒绝收购"这条叙事提供样本。
- **营收起始数字**: $47,020 MRR / $509,933 累计收入 / 1,672 活跃订阅（TrustMRR，Stripe API 验证，数据更新 2026-09-28，来源 https://trustmrr.com/startup/post-bridge）；历史节点：$7,000 MRR（第 4.5 个月，https://www.jackfriks.com/wiki）、$41K MRR（2026-06，https://startupfounderstories.com/stories/jack-friks-post-bridge-11k-mrr）、$43,931 MRR（2026-08，https://streakr.co/playbook/jack-friks）。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/post-bridge（一手 Stripe 验证：$47,020 MRR、1,672 订阅、创始人 jack friks、成立于 2024-09） [2] 官网 https://post-bridge.com（一手，HTTP 403 但 Cloudflare 站点真实存在） [3] 创始人 Wiki https://www.jackfriks.com/wiki（一手：2024 年起做 Post Bridge、4.5 个月做到 $7,000 MRR、2025 年春收到 100 万美元报价并拒绝） [4] Startup Founder Stories https://startupfounderstories.com/stories/jack-friks-post-bridge-11k-mrr（媒体，$41K MRR / 约 1,600 订阅） [5] Neodrop teardown https://neodrop.ai/post/BS9LYgD6vIp（媒体，公开的独立创始人）
- **数据冲突**: MRR 在 2026 年半年内从 $35K → $41K → $43.9K → $47K 逐月变动，撰写时必须标注快照日期，不能只写一个数字；另有第三方 teardown 记录 $35K MRR（https://www.agenticartists.com/business/jack-friks-post-bridge）；总部国家在 TrustMRR 记为加拿大、创始人自述口径为北美，需说明。
- **撰写提示**: 这是"年轻创始人 + AI 工具 + 拒绝收购"的典型样本，重点写他如何公开全部营收数据并把透明度当作增长手段；所有 MRR 必须带月份；"拒绝 100 万美元报价"这一事件要写明年份（2025 年春）与其后挂牌 $4.2M 的关系。

### 33. Sussur
- **slug**: sussur
- **创始人**: Mihai David Marin（David Marin，罗马尼亚；Basetool Labs SRL）
- **官网**: https://sussur.ai
- **总部**: 罗马尼亚
- **成立年份**: 2026
- **建议 launchDate**: 2026-03-17（精度：day，官网 Founder 故事页写明 "Building Sussur full-time since 17 March 2026"）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: macOS 上的 AI 销售教练——备会、实时提示该怎么接话、通话后复盘打分。
- **类别归属批次理由**: "AI 助手"里最新的一个（2026 年成立、3 个月做出可用产品），可作为"AI 原生小工具在 2026 年的速度基准"。
- **营收起始数字**: €14,000 MRR / €169,000 ARR，300 个付费席位（官网投资者页自报，来源 https://sussur.ai/investors）；Pitch Deck 口径为 "First 5-10 business teams. €10-25K MRR"（一手 PDF）。
- **已核实的关键信源**: [1] 官网 https://sussur.ai（一手，HTTP 200 验证） [2] 官网 Founder 故事页 https://sussur.ai/story（一手："David Marin · Founder, CTO and owner of Basetool Labs SRL. Building Sussur full-time since 17 March 2026"） [3] 投资者页 https://sussur.ai/investors（一手：€14K MRR / €169K ARR / 300 付费席位） [4] 官方 Pitch Deck PDF https://sussur.ai/pitch-deck/sussur-Pitch-Deck-100k.pdf（一手，"Solo. On purpose."、"MIHAI DAVID MARIN Founder & sole engineer"） [5] 媒体资料包 https://sussur.ai/press（一手，两次 YC 经历：Avo S21、Basetool W22）
- **数据冲突**: ① 创始人有兄弟共同创业的历史（Basetool 与弟弟 Adrian Marin 一起做的）——但 Sussur 本身明确为 solo，撰写时须明确区分"Basetool 是多人、Sussur 是单人"；② MRR 数字来自公司自报，无第三方 Stripe 验证；③ 官网自称 "Founder & sole engineer" 但同时列出 CTO 头衔，需说明是同一人兼任。
- **撰写提示**: 这是"连续创业者第三次创业才真正 solo"的案例，重点写他如何用 AI 工具链在 3 个月内做出可用 macOS 产品并卖出 300 席；必须主动澄清 Basetool 的多人属性，避免读者质疑。

### 34. Wave AI
- **slug**: wave-ai
- **创始人**: Josh Mohrer（美国，前 Uber NYC 总经理）
- **官网**: https://wave.co
- **总部**: New York, 美国
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 跨 iPhone/Android/Mac/Windows/Web/Apple Watch/Wear OS 的 AI 会议记录与摘要应用，按设备订阅收费。
- **类别归属批次理由**: "AI 效率工具"里营收规模最大（~$7M ARR）且非技术出身创始人独立开发的样本，是"非工程师也能做出百万美元级 AI 产品"的核心论据。
- **营收起始数字**: 约 $7M ARR（2026 年 2 月 Mixergy 专访口径，来源 https://www.agenticartists.com/business/josh-mohrer-wave-ai）；同时称扣掉应用商店分成后约 $3M 利润、创始人仍是全部团队（同一 Mixergy 访谈经 https://concat.pro/page/en-US/blog/vibe-business-explained 转述）。更早口径 $2M ARR（App Masters 播客，https://podcasts.apple.com/ky/podcast/bootstrapping-an-ai-app-to-$2m-arr/id643216602）。
- **已核实的关键信源**: [1] 官网 About 页 https://wave.co/about（一手："Wave is the product of Mohrer Associates LLC, based in New York, NY. Founded by Josh Mohrer."、自述为纽约小团队） [2] 官网 https://wave.co（一手，HTTP 200 验证） [3] Mixergy 访谈数据页 https://www.agenticartists.com/business/josh-mohrer-wave-ai（媒体，标注 ~$7M ARR 2026-02） [4] Mixergy 访谈转述分析 https://concat.pro/page/en-US/blog/vibe-business-explained（媒体，$7M ARR / ~$3M 利润 / 仍是全部团队） [5] App Masters 播客 https://podcasts.apple.com/ky/podcast/bootstrapping-an-ai-app-to-$2m-arr/id643216602（媒体，早期 $2M ARR） [6] Starter Story 播客 https://podsized.io/podcasts/starter-story/episodes/i-quit-my-tech-job-learned-to-code-with-ai-built-a-6m-app-st-b5f49c36-bcd8-4c06-8862-e3f2e8862164（媒体，$400K–$500K/月）
- **数据冲突**: ① ARR 口径跨 3 年从 $2M → $6M → $7M，必须标注时点；② 官网 About 页自称"纽约小团队"，而 Mixergy 访谈称创始人"仍是全部团队"，两者对团队规模的表述不一致——撰写时须如实说明这一矛盾；③ 另有一个 2026 年的 podcast 摘要把创始人写作 "Josh Moore"，与官网 "Josh Mohrer" 不符，属第三方转写错误，不得采用。
- **撰写提示**: 核心叙事是"前 Uber NYC 总经理、不写代码、用 AI 学编程，3 年做到 ~$7M ARR"，非常适合写"AI 如何把非工程背景的人变成独立开发者"；必须同时写出官网"小团队"与访谈"一人团队"的表述冲突，并注明 ARR 为访谈自述、未经第三方验证。

### 35. SEObot
- **slug**: seobot
- **创始人**: John Rush（土耳其；X @johnrushx）
- **官网**: https://seobot.ai
- **总部**: 土耳其
- **成立年份**: 2023
- **建议 launchDate**: 2023-09（精度：month，TrustMRR 记录 "Founded September 2023"）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: SEO 全流程 AI Agent——关键词研究、内容生成、内链优化、外链建设，并直接连接 Ahrefs 与 Google Search Console。
- **类别归属批次理由**: "AI 搜索与研究"赛道里唯一有 Stripe 验证 + 20 万用户的独立产品，可与 Durable、Algrow 组成"研究/搜索/落地页"三件套。
- **营收起始数字**: $33,992 MRR / $1,915,890 累计收入 / 490 活跃订阅 / 约 200,000 用户（TrustMRR，Stripe API 验证，数据更新 2026-10-27，来源 https://trustmrr.com/startup/seobot）；定价 $49/月。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/seobot（一手 Stripe 验证：$33,992 MRR、$1,915,890 累计、490 订阅、成立于 2023-09、Türkiye、创始人 John Rush） [2] 官网 https://seobot.ai（一手，HTTP 200 验证） [3] 创始人 TrustMRR 页 https://trustmrr.com/founder/johnrushx（一手，116.6k X 粉丝） [4] 官网定价 https://seobot.ai/pricing（一手） [5] IndieMakerList 榜单 https://indiemakerlist.com/categories/ai（第三方，$3M/yr 组合口径）
- **数据冲突**: ① $33K MRR 是 SEObot 单产品口径，而榜单流传的 "$3M/yr" 是创始人旗下 Unicorn Platform 等组合产品的合计口径，撰写时绝不可混用；② TrustMRR 页面头部另显示近 30 天 $33,828（与 MRR 卡片 $33,992 存在取数窗口差），需说明是同一数据的两个口径。
- **撰写提示**: 重点写"接住 Ahrefs / Search Console 实时数据的 Agent"与纯模型生成的差别，以及 SEO 从"内容外包"变成"可订阅软件"的价值迁移；必须写清 $33K 是单品口径、$3M 是组合口径。

### 36. Prosp
- **slug**: prosp
- **创始人**: Yann Dine（法国）
- **官网**: https://prosp.ai
- **总部**: 法国
- **成立年份**: 2025
- **建议 launchDate**: 2025-08（精度：month，TrustMRR 记录 "Founded August 2025"）
- **类别**: AI助手
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 化的 LinkedIn 外呼——自动生成个性化私信、克隆真人语音做语音条，替代模板群发。
- **类别归属批次理由**: 2025 年新成立却已做到 8 位数 MRR 的最短路径样本，代表"AI 把旧红海渠道（LinkedIn 群发）重新产品化"的新打法。
- **营收起始数字**: $128,005 MRR / $507,250 累计收入 / 1,108 活跃订阅（TrustMRR，Stripe API 验证；**注意数据最后更新于 2026-02-05**，因创始人 Stripe API key 过期，来源 https://trustmrr.com/startup/prosp）；800+ 机构客户（官网一手 https://prosp.ai/for/appointment-setting-agencies）；更早口径 2025 年 4 月创始人自报 $36K MRR（https://www.systemaic.com/teardowns/prosp）。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/prosp（一手 Stripe 验证：$128,005 MRR、成立于 2025-08、France） [2] 官网 https://prosp.ai（一手，HTTP 200 验证） [3] 官网定价 https://prosp.ai/（一手，$79.99 / $59.99 / $39.99 每账号每月） [4] 创始人 TrustMRR 页 https://trustmrr.com/founder/yanndine（一手） [5] Systemaic teardown https://www.systemaic.com/teardowns/prosp（媒体，$36K MRR 的历史节点与口径缺失说明） [6] Neodrop teardown https://neodrop.ai/es/post/pQMeBrpctdx（媒体）
- **数据冲突**: ① TrustMRR 页面标题写 "$98,483 in the last 30 days" 而卡片 MRR 写 $128,005——两个取数窗口不同，撰写时必须标注"MRR $128,005（2026-02 快照）"；② 数据已 9 个月未更新（Stripe key 过期），当前真实营收待核实；③ 创始人另有同公司产品 Speel.co（组合口径 $66K MRR），不可与 Prosp 单品混算。
- **撰写提示**: 重点写"语音克隆 + 个性化文案"如何在已被封禁多年的 LinkedIn 群发渠道里重建需求，以及法语市场（欧洲）AI 销售工具的空白；所有金额必须带快照日期并说明数据陈旧问题。

---

## 批次 4（AI 文档写作、内容创作与教育医疗，14 个）

### 37. Lex
- **slug**: lex
- **创始人**: Nathan Baschez（美国，前 Every 联合创始人兼首任员工、Substack 首名员工）
- **官网**: https://lex.page
- **总部**: 美国（远程）
- **成立年份**: 2022
- **建议 launchDate**: 2022（精度：year，lex.page 上线时间）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向写作者的 AI 编辑器——协同写作、实时 AI 改写与批注，目标是成为"写作界的 Figma"。
- **类别归属批次理由**: "AI 文档写作"品类里唯一有 Anthropic 官方客户案例背书的独立产品，可与 Writesonic、ProWritingAid 做"专业写作 vs 营销写作 vs 语法工具"三方对照。
- **营收起始数字**: 营收未公开披露（官方口径只有 25,000+ 首日注册 / 350,000+ 用户，来源 https://www.nathanbaschez.com/work）；第三方 MRR 估算约 $80K/月（弱信源，**待核实**）。
- **已核实的关键信源**: [1] 官网 https://lex.page（一手，HTTP 200 验证，官网自述 "Loved by over 300,000 writers"） [2] 创始人个人站 About 页 https://www.nathanbaschez.com/about（一手："We launched it and got 25k+ signups in the first day"、$2.8M seed 轮 2023-08） [3] Anthropic 官方客户案例 https://claude.com/customers/lex（一手，Anthropic 官方发布，明确写 "Nathan Baschez, Lex's founder"） [4] 创始人作品页 https://www.nathanbaschez.com/work（一手，"Lex has served over 350K users"） [5] 官网定价 https://lex.page/pricing（一手）
- **数据冲突**: ① 用户数两个口径：官网 300,000+ / 创始人 350K；② 创始人本人是 Every（Dan Shipper 参与创办）的联合创始人，Lex 是从 Every 内部孵化后 spin out 的独立公司——撰写时须说明这一出身，否则会与"单一创始人创立"标准冲突；③ 营收完全未公开，任何 MRR 数字均为第三方估算，必须标注待核实。
- **撰写提示**: 重点写"连续创业者+前媒体人如何用 AI 把写作工具做成有观点的产品"，并主动说明 Every 背景与 spin-out 过程；严禁给出未经验证的营收数字，只能写"官方未披露"。

### 38. Writesonic
- **slug**: writesonic
- **创始人**: Samanyou Garg（印度裔，美国旧金山；Y Combinator S21；剑桥大学硕士，2019 Global Undergraduate Award 得主）
- **官网**: https://writesonic.com
- **总部**: New Delhi, 印度（YC 官方页登记地 https://ycombinator.com/companies/writesonic）
- **成立年份**: 2020
- **建议 launchDate**: 2020-10（精度：month，第三方资料称 2020 年 10 月上线；YC 登记 Founded 2021）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 内容与 GEO（生成式引擎优化）平台——追踪品牌在 ChatGPT/Gemini 等 10+ AI 搜索中的可见度，并用 AI Agent 产出内容、外联与修复建议。
- **类别归属批次理由**: "AI 内容创作"里唯一以 GEO 为核心叙事的独立产品，代表 2026 年 AI 搜索取代传统 SEO 的产业转折。
- **营收起始数字**: $2.6M 融资（2021 年 YC 种子轮，一致口径 https://topreviewed.ai/products/writesoniccom）；ARR 第三方估算 $40M–$60M（来源质量低，https://aitechmodel.com/writesonic-statistics-by-usage-demographics-and-info-2026/）——**必须标注为低可信估算，不得当作官方数字**。用户规模：13,000+ 团队（YC 官方页）、10M+ 用户（YC 发布文）。
- **已核实的关键信源**: [1] YC 官方公司页 https://ycombinator.com/companies/writesonic（一手：Active Founders 仅 Samanyou Garg 一人、Founded 2021、Batch S21、Team Size 35、Location New Delhi、13,000+ 团队） [2] YC 发布文 https://www.ycombinator.com/launches/Mnd-writesonic-the-ai-seo-agent-that-replaces-10k-month-agencies（一手，"Hey everyone! We're Sam and the Writesonic team"、"After helping 10M+ users create AI content"） [3] 官网 https://writesonic.com（一手，本次直连超时/被 WAF 拦截，但站点与产品经 YC 官方页与多家媒体确认真实存在） [4] YouRaI Soft 评测 https://youraisoft.com/writesonic-review/（媒体，$2.6M 融资与盈利自述） [5] TopReviewed https://topreviewed.ai/products/writesoniccom（媒体，2021 后未再融资）
- **数据冲突**: ① ARR 口径全网均为第三方估算（$40M–$60M），无任何官方或 Stripe 级验证，撰写时必须写明"未经证实"；② 成立年份 2020（第三方）vs 2021（YC 官方），以 YC 为准；③ **官网当前无法直接访问验证（curl 超时/连接失败）**，写作时不得引用官网具体页面内容，只能引用 YC 官方页与媒体；④ 团队已扩至 35 人（YC 官方页），已非"当前一人公司"，必须交代扩编时点。
- **撰写提示**: 这是本案例库中最容易被质疑的"一人公司"样本之一——团队 35 人、ARR 无验证，撰写时必须诚实处理：重点写创始人单人起家到产品化、后续靠融资扩张团队的过程，并明确标注营收数据不可信。绝不编造 ARR。

### 39. ProWritingAid
- **slug**: prowritingaid
- **创始人**: Chris Banks（英国；Orpheus Technology Ltd 注册于伦敦，运营基地牛津）
- **官网**: https://prowritingaid.com
- **总部**: Oxford / London, 英国
- **成立年份**: 2012
- **建议 launchDate**: 2012（精度：year）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 基于自然语言处理的写作分析引擎——25+ 报告覆盖语法、节奏、用词、对话标签、可读性，并提供 AI 改写与 Zen 阅读模式。
- **类别归属批次理由**: 池中"跨度最长的持续经营案例"（2012 至 2026 年 14 年），且是唯一由英国公司主体（Orpheus Technology Ltd）持有的案例，补齐英国与欧洲司法辖区。
- **营收起始数字**: 未公开披露（官网一手只给用户规模：400 万+ 写作者、500+ 学校与大学采用，来源 https://prowritingaid.com/education）。**营收待核实**——写作时必须表述为"公司未披露营收，公开可验证的规模化指标为 400 万+ 用户与 500+ 教育机构采用"。
- **已核实的关键信源**: [1] 官网 https://prowritingaid.com（一手，HTTP 200 验证，官网标注 4M+ 写作者） [2] Storyblok《The State of the Writer's Mind 2026》白皮书 https://a.storyblok.com/f/145420/x/9f967f96e4/the-state-of-the-writers-mind-2026.pdf（一手，Chris Banks 以 "Founder and CEO, ProWritingAid" 署名，2026 年官方发布，"Over the past 13 years"） [3] 官网教育版 https://prowritingaid.com/education（一手，500+ 学校与大学采用、Premium $79/年） [4] AI Pedia 公司档案 https://aipedia.wiki/tools/prowritingaid/（第三方，公司主体 Orpheus Technology Ltd、伦敦注册、创始人 Chris Banks、成立于 2012） [5] Bloggers Passion 盘点 https://bloggerspassion.com/best-writing-blogs/（第三方，创始人背景）
- **数据冲突**: ① 成立年份 2012（AI Pedia）vs 2013（Bloggers Passion 描述官网起步时间），以 AI Pedia 与官网自述的 2012 为准并注明差异；② 创始人自己在 2026 白皮书里说"过去 13 年"，反推起点约 2013，与 2012 口径略有出入——撰写时应如实说明；③ 营收完全无公开数字。
- **撰写提示**: 重点写"一个非 AI 时代的写作工具如何在 14 年里靠长期留存与口碑活下来，并在 LLM 时代靠 AI 改写重新获得增长"；严禁给出任何营收数字，只能引用 400 万用户与 500+ 院校采用这类可验证指标。

### 40. PDF.ai
- **slug**: pdf-ai
- **创始人**: Damon Chen（美国）
- **官网**: https://pdf.ai
- **总部**: 美国（远程）
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 与任意 PDF 对话——上传后用自然语言提问、抽取信息、摘要，并提供解析/切分/抽取 API。
- **类别归属批次理由**: "AI 文档工具"里唯一同时覆盖 C 端问答与开发者 API 的案例，且同一创始人还运营 Testimonial.to，可作为"单人产品组合"叙事的样本。
- **营收起始数字**: 约 $500K ARR（2023 年 11 月创始人自报，来源 https://www.founded.org/companies/pdf-ai/）；组合口径 2023 年 11 月约 $1.3M ARR（PDF.ai 约 $500K + Testimonial 约 $800K，来源 https://www.founded.org/founders/damon-chen/）；2026 年第三方估算约 $1.5M ARR / $80K–$125K MRR（https://www.ideaindex.so/case-studies/category/ai-machine-learning，**待核实**）。
- **已核实的关键信源**: [1] 官网 https://pdf.ai（一手，HTTP 200 验证） [2] Founded 公司页 https://www.founded.org/companies/pdf-ai/（第三方，$500K+ ARR、成立于 2023、1 人在册） [3] Founded 创始人页 https://www.founded.org/founders/damon-chen/（第三方，$1.3M 组合 ARR、多个产品、收购 Supportman） [4] IdeaIndex 案例 https://www.ideaindex.so/case-studies/category/ai-machine-learning（媒体，~$1.5M ARR 估算） [5] OnePC 微 SaaS 案例 https://onepc.org/en/track/micro-saas-ideas（媒体，SEO 与社区驱动的早期增长）
- **数据冲突**: ① 必须区分单品口径（PDF.ai ≈ $500K ARR）与组合口径（$1.3M 含 Testimonial.to）；② 2023 年自报数字与 2026 年第三方估算（$1.5M）之间存在近 3 年时点差；③ 创始人还做过 embed.so、channel.so、QuickyAI、Docsium 等多个产品，写"PDF.ai 营收"时不可混入其他产品收入。
- **撰写提示**: 重点写"用 $10K 买域名起步 + 连续 4 次失败项目复用的代码资产"这条路径（IdeaIndex 案例标题即"4 次失败后做出 $2.4M 产品"）；严格区分单品与组合营收口径。

### 41. AudioPen
- **slug**: audiopen
- **创始人**: Louis Pereira（印度，果阿邦）
- **官网**: https://audiopen.ai
- **总部**: 印度（果阿，远程）
- **成立年份**: 2023
- **建议 launchDate**: 2023（精度：year，官网一手："I built AudioPen in 2023"）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 语音笔记转成清晰成稿——按下录音，AI 按你指定的语气风格把絮乱的语音整理成可分享的书面文字。
- **类别归属批次理由**: "AI 写作"里唯一的语音入口案例（先转写再改写），且是印度小城创始人 + 全球订阅变现的样本。
- **营收起始数字**: 约 $28,000/月 MRR（第三方整理，来源 https://www.prepnew.com/post/chapter-21-the-200-vault-part-1-ai-native-vibe-coded-micro-apps，口径为创始人自报）；更早口径 2 个月做到 $73,000 累计（社区汇编贴，时效 2023–24，https://indiehackers.com/post/50-side-projects-making-1m-f51ce727df）。官网一手：20 万+ 用户、售价 £75/年。
- **已核实的关键信源**: [1] 官网 https://audiopen.ai（一手，HTTP 200 验证） [2] 官网 "Who built AudioPen?" 页 https://www.audiopen.ai/?hl=en（一手："My name's Louis, and I'm a solo founder. I built AudioPen in 2023"、200,000+ 用户） [3] 官网创始人自述长文 https://audiopen.ai/blog/how-i-built-audiopen（一手） [4] PrepNew 200+ Vault https://www.prepnew.com/post/chapter-21-the-200-vault-part-1-ai-native-vibe-coded-micro-apps（媒体，$28K/月 MRR） [5] App Store 用户证言 https://app.audiopen.ai/prime（一手用户评价，£75/年）
- **数据冲突**: ① MRR $28K 与早期"2 个月 $73K 累计"分属不同时点，不可相加；② $28K/月为创始人自报经第三方汇编，无 Stripe 验证；③ 官网称 200,000+ 用户，但真实活跃付费规模无公开数据。
- **撰写提示**: 重点写"在 X 上公开构建与营收里程碑"这条分发路径（PrepNew 与官网自述均强调 built in public）；营收数字必须标注为创始人自报，并说明其无独立验证。

### 42. GenPPT
- **slug**: genppt
- **创始人**: Ilias Ism（美国，San Francisco；多产品创业者，旗下还有 MagicSpace SEO、SEO Roast、LinkDR、AISEOTracker）
- **官网**: https://genppt.com
- **总部**: San Francisco, 美国
- **成立年份**: 2024
- **建议 launchDate**: 2024-06（精度：month，TrustMRR 记录 "Founded June 2024"）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 演示文稿生成器——输入笔记、链接或主题即产出带研究的成品 PPT，主打"会先做调研再排版"。
- **类别归属批次理由**: "AI 内容创作"里唯一有独立市场挂牌（TrustMRR 上架待售）的案例，可与 Gamma 类工具对照说明独立开发者版 AI PPT 的商业化路径。
- **营收起始数字**: $8,164 MRR / $157,651 累计收入 / 577 活跃订阅 / 约 50,000 用户（TrustMRR，Stripe API 验证，数据更新 2026-07-29，来源 https://trustmrr.com/startup/genppt）；产品在 TrustMRR 上以 $195,000–$295,000 挂牌出售（1.7x 收入倍数）。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/genppt（一手 Stripe 验证：$8,164 MRR、$157,651 累计、577 订阅、成立于 2024-06、United States、创始人 ILIAS ISM） [2] 官网 https://genppt.com（一手，HTTP 200 验证） [3] 创始人 TrustMRR 页 https://trustmrr.com/founder/illyism（一手） [4] 官方新闻稿 https://www.openpr.com/news/4609531/ilias-ism-named-the-true-new-king-of-seo（一手，介绍其全部产品矩阵） [5] ProvenExpert 商家页 https://www.provenexpert.com/en-us/genppt/（第三方，San Francisco 地址与联系人 Ilias Ism）
- **数据冲突**: ① 官网自称 "Trusted by 100,000+ professionals"，而 TrustMRR 记录为约 50,000 用户，两者不一致，需在文中并列说明；② 创始人是多产品创业者（同时做 SEO agency 与多个 SaaS），"一人公司"指 GenPPT 这一产品而非全部业务；③ 挂牌价格区间 $195K–$295K 为 TrustMRR 页面两个不同报价快照。
- **撰写提示**: 重点写"同一创始人多产品矩阵如何把 GenPPT 送上第三方收入榜"这一独特路径——这在池中独一无二；同时必须并列"官网 10 万用户 vs TrustMRR 5 万用户"的矛盾，不要单方面采信。

### 43. Creator Buddy
- **slug**: creator-buddy
- **创始人**: Alex Finn（美国，加州 Palo Alto；前 MongoDB 团队负责人；YouTube 21.4 万订阅）
- **官网**: https://creatorbuddy.io
- **总部**: Palo Alto, 美国
- **成立年份**: 2025
- **建议 launchDate**: 2025（精度：year，创始人自述两周内做到 $300K ARR）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向 X（Twitter）创作者的 AI 内容教练——分析你的推文数据与风格，给出提升互动率的改写建议。
- **类别归属批次理由**: "内容创作"里唯一一个"创始人本人不写一行代码、全靠 Cursor + Claude Code 构建"的案例，是"AI 工具链把一人公司推向产品化"最直白的证据。
- **营收起始数字**: $300K ARR（创始人自报，两周内从 0 到 $300K，约 500–600 付费订阅、80% 毛利率，来源 https://selfgrowthvideos.com/alex-finn/）；另一口径"约 $25,000/月营收、约 80% 毛利"（创始人访谈，https://www.betterlaunch.co/playbooks/episodes/alex-finn-creator-buddy）；访谈中本人确认 "$300,000 ARR"、"close to 600 paid subs"、"It's all one man show"（https://www.summary.audio/s/5）。
- **已核实的关键信源**: [1] 官网 https://creatorbuddy.io（一手，HTTP 200 验证） [2] 创始人官网自述 https://selfgrowthvideos.com/alex-finn/（一手，"$300K annual recurring revenue within two weeks"、214K YouTube 订阅） [3] Summary.Audio 访谈 https://www.summary.audio/s/5（媒体，创始人原话 "$300,000 ARR. It's all one man show."） [4] Better Launch 播客 https://www.betterlaunch.co/playbooks/episodes/alex-finn-creator-buddy（媒体，$5,000/月 X API 成本、约 80% 毛利） [5] Navid 创始人档案 https://navid.me/creators/alex-finn（第三方，前 MongoDB 团队负责人转单人创业） [6] Money Making Story https://www.moneymakingstory.com/p/alex-s-leap-from-content-creator-to-solo-saas-founder（媒体，三个月做到 $300K/年）
- **数据冲突**: ① 数字全部来自创始人自报，无 Stripe 级验证——必须反复标注"创始人自报"；② 付费订阅数 500 vs 接近 600 两说；③ "三周/两周/三个月达成 $300K ARR"三个时间口径并存，须择一并注明来源。
- **撰写提示**: 核心卖点是"用 Cursor + Claude Code 这一个 $200/月的'AI 员工'从零做出 $300K ARR 产品"——这是全站最能说明"AI 如何替代工程团队"的案例；但必须明确所有数字均为创始人自报、无第三方验证。写作重点放在成本结构（$5,000/月 X API 是其最大单项支出）与"不写代码的创始人如何做产品决策"。

### 44. Rezi
- **slug**: rezi
- **创始人**: Jacob Jacquet（美国，22 岁在韩国创办 Rezi；前 Kaplan 开发者）
- **官网**: https://www.rezi.ai
- **总部**: 美国（运营主体在韩国/美国，TrustMRR 登记 United States）
- **成立年份**: 2015
- **建议 launchDate**: 2015-08（精度：month，创始人简历写 "CEO & Founder Aug 2015—Present"）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: AI 简历生成器——按 ATS 规则优化结构与关键词，并生成求职信、求职管理看板与企业白标版。
- **类别归属批次理由**: "AI 求职"这一垂类是池中唯一，且是"一个人从 22 岁起步、做到 Forbs 榜单第一并扩到 13 人团队"的完整纵向样本。
- **营收起始数字**: $247,269 MRR / $10,358,835 累计收入 / 10,256 活跃订阅 / 约 4,510,834 用户（TrustMRR，Stripe API 验证，数据更新 2026-10-17，来源 https://trustmrr.com/startup/rezi）；创始人简历披露历史：融资 $650,000、估值 $40,000,000、13 名全职员工（https://www.rezi.ai/ai-resume-builder）。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/rezi（一手 Stripe 验证：$247,269 MRR、$10,358,835 累计、10,256 订阅、成立于 2015-05、VC-backed） [2] 官网 https://www.rezi.ai（一手，HTTP 200 验证，官网标注 Forbs 榜单第一） [3] 官网创始人简历页 https://www.rezi.ai/ai-resume-builder（一手："Initiated Rezi at the age of 22"、$650,000 融资、$40M 估值、13 名全职员工） [4] 官网作者页 https://www.rezi.ai/authors/jacob-jacquet（一手，"started Rezi in 2015"） [5] 官网官方信息页 https://www.rezi.ai/ai-llm-info（一手，创始人、成立年份、业务范围）
- **数据冲突**: ① 成立时间 2015-05（TrustMRR）vs 2015-08（创始人简历）；② 用户数 3M / 4.5M / 4,533,800 三个版本（不同页面快照），须注明来源与时点；③ 当前团队 13 人（创始人自述），创始人已非"单人运营"，但公司由他一人创立、且早期确为单人——撰写时须明确"创立期单人 + 现 13 人"的时点。
- **撰写提示**: 重点写"22 岁在韩国起步、靠韩国市场打开英语简历赛道、融资 $650K 后用 AI 把产品扩到 Forbs 榜单第一"的路径；必须交代团队扩张到 13 人以及年营收口径（TrustMRR 为 Stripe 验证的 MRR/年化，不要与"13 人团队人均产出"混算）。

### 45. Dalea AI
- **slug**: dalea-ai
- **创始人**: Bruno Kalil（巴西）
- **官网**: https://usedalea.ai
- **总部**: 巴西（TrustMRR 登记 Brazil）
- **成立年份**: 2026
- **建议 launchDate**: 2026-03（精度：month，TrustMRR 记录 "Founded March 2026"；原名 Saga AI）
- **类别**: 内容创作
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 社媒内容 Agent——拆解一万条爆款内容与创作者风格，为你生成两周的可直接发布的 Instagram/TikTok 脚本。
- **类别归属批次理由**: 拉美地区目前唯一通过 Stripe 验证的独立 AI 产品补位，补齐巴西/拉美地域覆盖。
- **营收起始数字**: $6,623 MRR / $36,823 累计收入 / 1,076 活跃订阅 / 约 1,500 用户（TrustMRR，Stripe API 验证，数据更新 2026-10-30，来源 https://trustmrr.com/startup/dalea-ai）；定价 $9.90/月或 $60/年（每品牌）。
- **已核实的关键信源**: [1] TrustMRR 产品页 https://trustmrr.com/startup/dalea-ai（一手 Stripe 验证：$6,623 MRR、$36,823 累计、1,076 订阅、成立于 2026-03、Brazil、创始人 Bruno Kalil） [2] 官网 https://usedalea.ai（一手，HTTP 200 验证） [3] 创始人 TrustMRR 页 https://trustmrr.com/founder/brunokalil_（一手） [4] 官网博客 https://usedalea.ai/en/blog/category/scripts（一手，Bruno Kalil 署名，2026-09 与 2026-03 的脚本方法论） [5] SaaSHub 产品史 https://www.saashub.com/use-dalea-ai（第三方，前作 Fokvs 学习 App 于 2025 年底关闭，2026 年 3 月以 Saga AI 名义上线） [6] 官网成长博客 https://usedalea.ai/en/blog/category/growth（一手，创始人亲述）
- **数据冲突**: ① TrustMRR 创始人页显示"1 startup with $2,814 total revenue / $1,000 MRR"，与产品页的 $36,823 / $6,623 差距明显——两者更新时点不同，须在文中说明以产品页（2026-10-30）为准并标注创始人页为较早快照；② 产品曾用名 Saga AI，撰写时须交代改名；③ 前一个产品 Fokvs 关闭属正常业务迭代，不是失败案例。
- **撰写提示**: 这是全站唯一有 Stripe 验证的巴西案例，重点写"前一个学习 App 失败后立刻转型做 AI 社媒脚本、7 个月做到 $6.6K MRR"的短周期路径；务必标注两个 TrustMRR 页面数据不一致，避免读者发现后质疑全站数据可信度。

### 46. Photopea
- **slug**: photopea
- **创始人**: Ivan Kutskir（乌克兰出生，捷克布拉格；Charles University 理论计算机科学硕士）
- **官网**: https://www.photopea.com
- **总部**: Prague, 捷克
- **成立年份**: 2013
- **建议 launchDate**: 2013-09-14（精度：day，官方首个公开版本上线日）
- **类别**: 内容创作
- **AI 契合类型**: ai-embedded
- **AI 作用一句话**: 浏览器里的免费 Photoshop——PSD/Sketch/AI 文件直接打开编辑，AI 能力集中在抠图、生成式填充与图像放大等环节。
- **类别归属批次理由**: **ai-embedded 组的三个代表之一**——产品主体是图像编辑器（"主体非 AI"），但 AI 抠图/生成式填充/放大已成为其关键差异化功能与价值来源；同时它是池中唯一"零融资、单人开发 13 年、日活百万级"的浏览器工具。
- **营收起始数字**: 约 $3,000,000（2024 年广告收入，其中约 90% 来自画布旁广告；运行成本自称约 $20/年，来源 https://www.builtplain.com/photopea-free-app-ad-revenue/）；月访问量各流量工具口径不一，约 17M–29M（来源 https://stealwhatworks.com/blogs/news/solo-projects-great-distribution）；峰值日活超 100 万（https://futurewarns.com/one-person-businesses-using-ai-2026/）。
- **已核实的关键信源**: [1] 官网开发自述 https://blog.photopea.com/creating-photopea.html（一手，"My name is Ivan Kutskir and I am the only developer of Photopea"） [2] 官网 https://www.photopea.com（一手，HTTP 200 验证） [3] 官网广告说明 https://www.photopea.com/tuts/how-photopea-displays-ads（一手，广告变现模式） [4] BuiltPlain 案例 https://www.builtplain.com/photopea-free-app-ad-revenue/（媒体，2024 年约 $3M 广告收入、约 90% 来自广告） [5] CheckThat 品牌档案 https://checkthat.ai/brands/photopea（第三方，2013-09-14 上线、零融资 11 年以上） [6] HandWiki 条目 https://handwiki.org/wiki/Software:Photopea（第三方，初版发布日 2013-09-14）
- **数据冲突**: ① 成立时间 2012（学生项目起步）vs 2013-09-14（首个公开版本），撰写时须写"2012 年作为学生项目起步、2013-09-14 首个公开版本"；② 月访问量 17M / 18M / 29M 三个口径，来源为不同流量工具，不可混用；③ **AI 契合度本身存疑**——产品主体是编辑器而非 AI 产品，本文按 `ai-embedded` 收录，撰写时必须明确说明 AI 只是其功能之一、并非产品本体，否则会与"AI 一人公司"主题产生张力。
- **撰写提示**: 这是本案例库中 AI 契合度最需要坦白说明的一条——写作时必须先讲清"这是一个 13 年单人、非 AI 本体的编辑器"，再讲 AI 功能如何成为其 2026 年的差异化与流量来源；绝不能包装成 AI 原生产品。

### 47. Julius AI
- **slug**: julius-ai
- **创始人**: Rahul Sonwalkar（美国，旧金山；前 Uber 定价团队、Facebook；2020 首届 YC 黑客奖得主）
- **官网**: https://julius.ai
- **总部**: San Francisco, 美国
- **成立年份**: 2022
- **建议 launchDate**: 2022（精度：year，YC 官方页 Founded 2022 / Batch S22）
- **类别**: 垂直应用
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 会写 Python/R 并出图的对话式数据科学助手——上传 Excel/CSV/数据库后用自然语言完成分析、建模与可视化。
- **类别归属批次理由**: "垂直应用"里商业化最扎实的数据分析样本（2M+ 用户 + $10M 种子轮），可与 Better Analyst 组成"对话式分析"对照组。
- **营收起始数字**: 融资 $10M 种子轮（2025 年 7 月，Bessemer Venture Partners 领投，YC/8VC/Horizon 跟投，来源 https://popularaitools.ai/blog/julius-ai）；用户 2,000,000+（官网一手 https://landing.julius.ai/）；10,000,000+ 可视化（企业自报，第三方指出无法独立审计）。**ARR 未公开披露**。
- **已核实的关键信源**: [1] YC 官方公司页 https://www.ycombinator.com/companies/julius（一手：Active Founders 仅 Rahul Sonwalkar、Founded 2022、Batch Summer 2022、Team Size 10、Location San Francisco） [2] 官网 https://landing.julius.ai/（一手，"Loved by 2,000,000+ users"） [3] 官网定价 https://dev.julius.ai/pricing（一手，模型与算力分层） [4] AI-Damn 报道 https://ai-damn.com/julius-ai-secures-10m-seed-funding-for-ai-data-analysis-1753830957222（媒体，$10M 种子轮） [5] Solo Founders 访谈 https://solofounders.com/blog/author/ari（媒体，哈佛商学院 935 名学生全部使用、基准测试胜过 ChatGPT） [6] Next AI Press https://nextaipress.com/julius-ai-hero-conversational-data-analysis/（媒体，明确指出 10M 可视化为自报且无法独立审计）
- **数据冲突**: ① "2M+ 用户"与"10M+ 可视化"均为企业自报，第三方明确标注不可审计；② 官网 HTTP 403（Cloudflare 拦截），站点真实存在，但不得引用未实际验证的官网子页面内容；③ 团队规模 10 人（YC 官方页）——已非单人运营，须交代扩编；④ "哈佛商学院 935 名学生全部使用并胜过 ChatGPT"来自媒体转述的内部基准，无第三方复现，须谨慎表述。
- **撰写提示**: 重点写"前 Uber/Facebook 工程师把 2M 用户的自然语言分析做成产品、并拿到 $10M 种子轮"的路径，同时诚实处理：团队已 10 人、用户与可视化数字为企业自报、HBS 基准无法独立复现。

### 48. Feynman AI
- **slug**: feynman-ai
- **创始人**: Alex Nguyen（越南，@alexcooldev）
- **官网**: https://feynman-ai.com
- **总部**: 越南（远程）
- **成立年份**: 2024
- **建议 launchDate**: 2024（精度：year）
- **类别**: 教育
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 费曼学习法 AI 学习 App——把视频/讲义/PDF/笔记转成摘要、测验与记忆卡，并生成五岁小孩能懂版（ELI5）讲解。
- **类别归属批次理由**: "AI 教育"目前唯一通过筛选的案例（唯一另一个教育候选 Feynman AI 因 TrustMRR 数据归零与创始人同名冲突被降级），且是池中唯一的越南 + App Store SEO 增长样本。
- **营收起始数字**: 约 $19,000/月（约 370,000 用户，创始人访谈自述，来源 https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo）。
- **已核实的关键信源**: [1] 官网 https://feynman-ai.com（一手，HTTP 200 验证） [2] MRR Story 创始人访谈 https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo（一手访谈，"Feynman AI has about 370,000 users and brings in around $19,000 a month"） [3] ArrFounder 创作者页 https://arrfounder.com/@alexcooldev（一手，$492K 累计、MedDeep MRR $9K） [4] 官网多语言产品页 https://feynman-ai.com/vi/blogs/feynman-ai-study-app.html（一手，功能与定价 $2.99/周、$19.99/年） [5] TrustMRR 同名页 https://trustmrr.com/startup/feynman-ai（第三方，**同名不同人**：创始人 Mehroz Sheikh、MRR $0、App Store id 6753717064）
- **数据冲突**: ⚠️ **同名不同人**：TrustMRR 上的 "Feynman AI" 属于另一位创始人 Mehroz Sheikh，MRR 为 $0、2026-07 起才被追踪；本案例是 Alex Nguyen 的越南产品，两者完全无关，撰写时必须明确区分以免误引；② $19K/月与 ArrFounder 的 $9K MRR 口径不同（组合 vs 单品），须说明；③ 官网文件名仍含 "meetingnote"（MeetingNote - AI Note Taker），说明产品线含第二款 App。
- **撰写提示**: 重点写"用 TikTok + App Store ASO 把一款学习 App 做到 37 万用户"这条低成本增长路径，以及创始人同时运营 MedDeep AI 的双产品结构；必须在文中显式处理 TrustMRR 同名混淆问题。

### 49. MedDeep AI
- **slug**: meddeep-ai
- **创始人**: Alex Nguyen（越南，@alexcooldev）
- **官网**: https://www.meddeep.ai
- **总部**: 越南（远程）
- **成立年份**: 2024
- **建议 launchDate**: 2024（精度：year）
- **类别**: 垂直应用
- **AI 契合类型**: ai-native
- **AI 作用一句话**: 面向医学生与医生的 AI 医疗助理——分析症状、给出健康解读，并提供安全的加密 AI 对话。
- **类别归属批次理由**: 池中唯一的医疗垂类，填补"AI 法律/医疗等垂直应用"的医疗侧空白，且与 Feynman AI 共用同一创始人，可作双产品策略的对照组。
- **营收起始数字**: 约 $6,000–$7,000/月、约 20,000 用户（创始人访谈自述，来源 https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo）；第三方目录口径 MRR $9,000（https://arrfounder.com/@alexcooldev）。
- **已核实的关键信源**: [1] 官网 https://www.meddeep.ai（一手，HTTP 200 验证） [2] MRR Story 创始人访谈 https://www.mrrstory.com/stories/from-0-to-370k-users-using-tiktok-app-store-seo（一手访谈，"MedDeep AI, which is a medical assistant for diagnostics and decision support... about 20,000 users and makes $6,000 to $7,000"） [3] ArrFounder 创作者页 https://arrfounder.com/@alexcooldev（一手，$492K 累计、MedDeep MRR $9K、70K+ 用户标注） [4] 官网产品页 https://www.meddeep.ai/（一手，功能与隐私承诺）
- **数据冲突**: ① 同一创始人两个产品的口径冲突：Feynman AI 37 万用户 / $19K 月收入 vs MedDeep AI 2 万用户 / $6–7K 月收入——ArrFounder 的 $492K 累计与 $9K MRR 是组合口径，撰写时必须拆开；② 医疗建议类产品的合规风险显著高于其他品类，官网以"教育与决策支持、非医疗建议"作免责表述，写作时必须如实呈现其合规边界；③ 用户量在 2 万与 7 万之间存在口径差（可能分别指活跃与累计）。
- **撰写提示**: 重点写"同一人如何用两款 App 覆盖'学习'与'医疗'两个相邻场景"以及医疗垂类的付费转化难题；必须写清合规免责声明与隐私承诺，不能把产品写成替代医生。

### 50. Kagi
- **slug**: kagi
- **创始人**: Vladimir Prelovac（塞尔维亚裔，美国 Palo Alto；TinEye 联合创始人）
- **官网**: https://kagi.com
- **总部**: Palo Alto, 美国
- **成立年份**: 2018
- **建议 launchDate**: 2018-05（精度：month，官网公司史页写明 "founded by Vladimir Prelovac in May 2018"）
- **类别**: AI助手
- **AI 契合类型**: ai-embedded
- **AI 作用一句话**: 用户付费的搜索与浏览器（Orion），AI 作为其上层能力提供摘要、答案与翻译，而商业模式建立在"用户付费、无广告"上。
- **类别归属批次理由**: **ai-embedded 组的三个代表之一**——产品主体是搜索/浏览器（"Search that respects your wallet"），AI 是差异化与价值来源之一；用于展示"非 AI 主体公司如何靠 AI 完成价值迁移"。
- **营收起始数字**: 2023 年突破 $1,000,000 年收入里程碑（官网公司史页一手 https://help.kagi.com/orion/company/history.html）；约 50,000 付费订阅用户（2026 年 9 月官方公告，Wikipedia 引述 https://en.wikipedia.org/wiki/Kagi 及官方 Reddit 庆祝帖）；2022 年 6 月 beta 期"Kagi + Orion 合计约 $26,500 MRR"（官网一手 https://blog.kagi.com/status-update-first-three-months）。当前总营收未公开披露。
- **已核实的关键信源**: [1] 官网公司史页 https://help.kagi.com/orion/company/history.html（一手：2018 年 5 月由 Vladimir Prelovac 创立、2023 年跨过 $1M 年收入、2026 年团队达 50 人、前四年完全自筹） [2] 官网 Orion 发布博客 https://blog.kagi.com/orion（一手：Orion 1.0、100 万+ 下载、2,480 名 Orion 付费用户、"For the first two years, development was carried out by a single developer"） [3] 创始人个人站 https://vladimir.prelovac.com/（一手，"I am the CEO of Kagi Inc."） [4] 官网 beta 期状态博客 https://blog.kagi.com/status-update-first-three-months（一手，$26,500 MRR） [5] 官网 https://kagi.com（一手，HTTP 200 验证） [6] Wikipedia https://en.wikipedia.org/wiki/Kagi（第三方，2026-09 约 5 万付费用户）
- **数据冲突**: ① 付费用户数在 2025-06 约 5 万、2026-09 约 5 万两次被引用，需注意区分时间点，且口径均为"订阅会员"；② 团队规模从"前四年单开发者"到 2026 年 50 人，跨度极大，"一人公司"属性只在前四年成立——撰写时必须明确交代；③ 收入只披露过 $1M（2023）与 $26.5K MRR（2022）两个历史节点，当前营收无公开数字。
- **撰写提示**: 重点写"前四年单开发者 + 完全自筹（$3M 个人资金 + 约 93 位天使共 $2.5M）→ 2022 年公开 beta → 2023 年破 $1M 年收入 → 2026 年扩到 50 人"这条完整曲线，并明确指出它已不是"当前的一人公司"；同时讲清 AI（Orion、摘要、翻译、Ask Kagi）在这条曲线中的位置——这正是 ai-embedded 的判定依据。

