# 国内 AI 一人公司（OPC）候选池（50 个）

> 检索截止：2026-11-09。原全球 50 案例清单（data/final-50.md）保留不动，本清单为国内新一批候选。
> 收录口径：① 一人主导（公开信源可证个人独立开发/运营）；② AI 为产品核心能力或核心生产力（含 ai-enabled-ops：AI 承担交付/运营主体工作）；③ 有成功迹象（营收/用户量/关注度，任一可查）。
> 置信度：高 = 多个独立信源交叉确认；中 = 创始人自述或单一信源；低 = 信源薄弱（只进观察名单）。
> 注意：GitHub 星标等数据为 2026-10/11 时点值，会随时间变动；标注"自述"的营收数据未经第三方审计。

## 一、AI 开发者工具 / 效率工具 / 客户端（13 个）

| # | 项目 | 创业者 | 产品功能简介 | AI 契合 | 成功迹象（时点值） | 置信度 | 关键信源 |
|---|---|---|---|---|---|---|---|
| 1 | 沉浸式翻译 Immersive Translate | Owen Young（前腾讯前端工程师） | AI 双语对照网页翻译插件，支持 PDF/视频字幕/漫画翻译，聚合 10+ 翻译引擎 | ai-embedded | 全球激活用户破 3000 万（2026-09 官方博客）；Chrome 2024 年度精选；起步期一人开发，后被收购 | 高 | immersivetranslate.com/blog/30-million-users；播客「硬地骇客」EP56 |
| 2 | NextChat（ChatGPT-Next-Web） | Yidadaa（Yifei Zhang） | 一键免费部署的私人 ChatGPT 跨平台客户端，支持 OpenAI/Claude/Gemini 多模型 | ai-native | GitHub 约 88.8k stars；2023 年最早爆火的开源 ChatGPT 前端之一 | 中 | github.com/Yidadaa；hellogithub.com |
| 3 | ChatNio | zmh（zmh-program/Kairo，创办时 15 岁） | 多模型对话 + API 中转/计费管理一站式开源平台 | ai-native | 2024 年被七位数收购；月活近 10 万、月净利约 5 万元（腾讯新闻） | 高 | zmh-program.github.io；view.inews.qq.com/a/20250207A06N1M00 |
| 4 | ChatWise | egoist（知名华人开源开发者） | macOS/Windows 桌面 AI 聊天客户端，多模型多模态 + MCP，BYOK 买断制 | ai-embedded | Pro $29 买断持续销售；第三方评测明确"made by one developer" | 中 | chatwise.app/pricing；github.com/egoist |
| 5 | GPT 学术优化（gpt_academic） | binary-husky（中科院博士） | 面向学术场景的 LLM 工具：论文润色/翻译/代码解析，插件化扩展 | ai-embedded | GitHub 71.6k stars（2026-11）；个人账号主导 1333+ commits | 高 | github.com/binary-husky/gpt_academic |
| 6 | openai-translator + avante.nvim | yetone | 划词翻译插件/桌面应用；Neovim 里的 Cursor 式 AI 编程插件 | ai-embedded | avante.nvim 约 17.8k stars；openai-translator 数万 stars | 中 | github.com/yetone |
| 7 | Umi-OCR | hiroi-sora（网名） | 开源离线 OCR 软件：截图/批量图片/PDF 识别，解压即用 | ai-embedded | GitHub 48.4k stars；中文社区免费 OCR 标杆 | 中 | github.com/hiroi-sora/Umi-OCR |
| 8 | Bob | ripperhe（北京独立开发者） | macOS 划词翻译/截图 OCR，接入 OpenAI/DeepSeek/豆包等 AI 服务 | ai-embedded | Bob Pro ¥58 买断持续销售；GitHub 9.7k stars | 中 | bobtranslate.com；github.com/ripperhe/Bob |
| 9 | Easydict | tisfeng | macOS 词典翻译应用，开箱即用，支持 OpenAI/Gemini/DeepL 与离线 OCR | ai-embedded | GitHub 15.2k stars（2026-11） | 中 | github.com/tisfeng/Easydict |
| 10 | one-api | songquanpeng（justsong） | LLM API 网关：统一适配 OpenAI/Claude/Gemini/国产模型，密钥管理与二次分发 | 基础设施 | GitHub 37.3k stars；国内 AI 中转站生态事实标准 | 中 | github.com/songquanpeng/one-api |
| 11 | PDFMathTranslate（pdf2zh） | Byaidu | 保留排版的 PDF 学术文档 AI 全文双语翻译，CLI/GUI/Zotero 插件 | ai-native | GitHub 38.3k stars；入选 EMNLP 2025 Demo；在线服务 pdf2zh.com | 中 | github.com/PDFMathTranslate/PDFMathTranslate |
| 12 | chatGPTBox | josStorer（josc146） | 把 ChatGPT 深度集成进浏览器的插件：划词翻译/网页总结/视频对话 | ai-embedded | GitHub 约 10.7k stars；Chrome 商店个人发布者 | 中 | github.com/josStorer/chatGPTBox |
| 13 | AIClient-2-API | justlovemaki | 把 Gemini CLI/Codex/Grok 等 AI 客户端协议反代为本地 OpenAI 兼容 API | 基础设施 | GitHub 约 8.9k stars；Docker 下载 10 万+ | 中 | github.com/justlovemaki（原仓库） |

## 二、AI 内容创作 / 作品型（14 个）

| # | 项目 | 创业者 | 产品功能简介 | AI 契合 | 成功迹象（时点值） | 置信度 | 关键信源 |
|---|---|---|---|---|---|---|---|
| 14 | BibiGPT（AI 课代表） | 吕立青（JimmyLv，前 ThoughtWorks/阿里） | 粘贴 B站/YouTube/播客链接一键生成结构化摘要、逐字稿、脑图并可追问 | ai-native | 官网自述累计 100 万+ 用户；腾讯研究院"一人公司"共创营嘉宾 | 高 | bibigpt.co/about |
| 15 | MoneyPrinterTurbo | harry0703 | 输入主题自动完成文案/素材/字幕/配音/合成的高清短视频生成器 | ai-native | GitHub 133k+ stars，AI 视频类最高星项目之一 | 高 | harry0703.com；github.com/harry0703 |
| 16 | GPT-SoVITS | 花儿不哭（RVC-Boss，B站 UP 主） | 5 秒音频克隆音色的少样本 TTS/语音转换工具，中英日韩多语言 | ai-native | GitHub 64k+ stars；中文语音克隆事实标准 | 高 | github.com/RVC-Boss/GPT-SoVITS |
| 17 | VideoLingo | Huanshere | 一键 Netflix 级视频本地化：字幕切割/上下文翻译/克隆配音 | ai-native | GitHub 19k stars | 中 | docs.videolingo.io |
| 18 | HivisionIDPhotos | 林泽毅（Zeyi-Lin，西电学生开发者） | 轻量 AI 证件照工具：人像抠图/多规格生成/排版，可离线自部署 | ai-native | GitHub 21.6k stars；曾登 GitHub 热榜第一，机器之心/量子位报道 | 高 | github.com/Zeyi-Lin/HivisionIDPhotos |
| 19 | 红墨 RedInk | 默子（HisMax，00 后杭州开发者） | 一句话生成整套小红书图文：爆款标题/正文/3:4 封面配图，可直接发布 | ai-native | GitHub 5.7k stars；在线版会员 68 元/月起收费 | 高 | hellogithub.com/repository/HisMax/RedInk；redink.top |
| 20 | MuMuAINovel | xiamuceer-j | 可自部署 AI 长篇小说工作台：角色卡/伏笔追踪/批量挂机写章节/拆书 | ai-native | GitHub 3.3k stars；网文作者圈活跃自部署社区 | 中 | github.com/xiamuceer-j/MuMuAINovel |
| 21 | AI 短剧《归墟》 | 泫九（江澜，90 后奶爸） | 12 集末世科幻 AI 短剧：剧本/生成/剪辑/配乐全流程 AI 辅助一人完成 | 作品型 | 全网播放量破 2 亿；红果热度 4365 万；微博热搜 | 高 | m.gmw.cn/2026-08/29/content_1304555996.htm |
| 22 | AI 漫剧《咱家剑宗团宠小师妹》 | 六爻（"六爻说漫"，延边） | 修仙题材 AI 漫剧：剧本/分镜/生成/剪辑全由一人独立制作，周更百集 | 作品型 | 红果漫剧热播榜第三；第五季规划超 1000 集 | 高 | view.inews.qq.com/a/20260804A04GIX00 |
| 23 | AI 漫剧《我和我的 AI 男友：樱时叙归途》 | 李四姑娘（42 岁金融转行者） | 60 集 AI 漫剧：一台电脑一个半月独立完成并多平台发行 | 作品型 | 上线 5 天红果热度 1200 万；重庆日报直接定义为"一人公司"典型 | 高 | cqrb.cn/caijingzonghe/2026-08-20/2755863_pc.html |
| 24 | AI 短片《丧尸清道夫》 | 刘梓瑜（Mx-Shell，云南玉溪） | 3 分 34 秒原子朋克 AI 科幻短片：全流程一人、10 天、成本 3000 元 | 作品型 | 全网播放 6000 万至破亿；好莱坞 AI 电影制作人公开盛赞 | 高 | yuxi.gov.cn（市政府官网）；chinanews.com.cn |
| 25 | 国风卡牌"易经图卦"系列 | 刘健（1998 年生，杭州） | AI 转译易经/民俗的情绪卡牌 + AI 生成小程序，一人包揽全流程 | ai-enabled-ops | 年销售额破百万、单平台月营收 6 万+、累计售出 1 万+ 套 | 高 | hzxcw.gov.cn/content_48362.html |
| 26 | 作文说 | 李雲帆（1998 年生，前 4 人团队创始人） | AI 作文批改：拍照上传即生成可打印批改报告，支持班级批量精批 | ai-native | 上线 4 个月用户破 1.5 万（人民日报海外版/新华网）；付费率 13-14%、月入近 5 万（自述口径） | 中高 | paper.people.com.cn/rmrbhwb/pc/content/202608/10/content_30173858.html |
| 27 | PodLM 等 AI 产品组合 | 艾逗笔（idoubi，前腾讯微信后台工程师） | AI 播客生成器 PodLM（URL/文本转双人播客）；另有 ThinkAny AI 搜索、MCP.so、ShipAny 框架等 11+ 产品 | ai-native | ThinkAny 峰值月访问 60 万；MCP.so 月访问 270 万（a16z 报告引用）；ShipAny 预售 4 小时破 1 万美元 | 高 | finance.sina.com.cn（新浪财经专访）；idoubi.ai/about |

## 三、AI 垂直行业应用（11 个）

| # | 项目 | 创业者 | 产品功能简介 | AI 契合 | 成功迹象（时点值） | 置信度 | 关键信源 |
|---|---|---|---|---|---|---|---|
| 28 | 天之灵AI | 张翼（37 岁失业送外卖期间起步） | AI 哀伤陪伴小程序：上传亲人照片生成数字形象陪对话，定位哀伤疗愈 | ai-native | 注册用户 11.1 万、付费会员 2000-3000 人（年费 99 元起）、已盈利（36氪） | 高 | 36kr.com/p/4052600729294468 |
| 29 | 互动内容/情感陪伴产品（名称未公开） | 叶纯俊（上海深知有谱智能，自然人独资） | AI 驱动的互动内容与情感陪伴产品，90% 代码由 AI Agent 编写 | ai-native | 全球百万用户、月收入 2-3 万美元（甲子光年实地探访） | 高 | 36kr.com/p/3561148530113667 |
| 30 | 猜盐 / 猜病 | 张月（前阿里工程师） | 大模型信息游戏化矩阵：AI 模拟病人供问诊推理、街景定位等几十种玩法 | ai-native | 累计用户 160 万、最高日活 20 万；2025 年营收同比增 3 倍、2026 目标 300 万（中国经营报） | 高 | finance.sina.com.cn/jjxw/2026-04-05/doc-inhtmhff7209077.shtml |
| 31 | hupoCADNet | 何思康（15 年室内设计经验） | AI 彩平图生成引擎：CAD 平面图 + 风格参考图 3 分钟生成可商用彩色平面图 | ai-native | 上线半年 1740 位付费设计师、营收 5.1 万元、毛利率超 80%（36氪，自述口径） | 中 | 36kr.com/p/3933122513337733 |
| 32 | 求职精灵 | 奕甫 | Agent 化 AI 求职全链路：职业规划/简历逐字修改/全真语音模拟面试 | ai-native | 注册用户将破 100 万、200 万+ 次简历优化、年化收益千万级（中国经营报采访口径，自述） | 中 | cb.com.cn/index/show/special/cv/cv13474599519 |
| 33 | 无事AI | 佟晨（法律博主） | AI 小额纠纷解决：免费诊断案情/测算赔偿区间，按结果收费，从交通事故切入 | ai-native | 上线两月 40 余单付费、营收约 6 万、毛利率约 65%（36氪） | 中 | 36kr.com/p/3947471637216387 |
| 34 | AI选校鸟 | 李涛（经济学博士在读） | AI 留学选校：99 元/次输出保底/匹配/冲刺三梯度 5 所院校推荐 | ai-native | 上线以来 3000+ 用户（北京日报/人民日报海外版报道） | 中 | news.bjd.com.cn/2026/01/20/11534991.shtml |
| 35 | 聪明钱监控 | 许洋（北京程序员） | 用开源智能体手搓的 AI 股市投研系统：资金流向/主力动向日报，200 元/年 | ai-native | 上线半月 90 个付费用户、收入超 1 万元（经济观察报） | 中 | eeo.com.cn/2026/0316/811691.shtml |
| 36 | 星织科技 | Kevin Li | AI 原生跨境电商：自研智能体做"数字员工"，一人同时运营 8 个亚马逊品牌 | ai-enabled-ops | 亚马逊全球开店官方白皮书收录的"一人公司"典型（GMV 未披露） | 中 | gs.amazon.cn/news-center/news-center-260611 |
| 37 | 张sir 弹幕游戏矩阵 | 张sir（化名） | 抖音弹幕互动游戏：AI 工具链承担约 70% 美术与代码，15 天/款 | ai-enabled-ops | 总流水近 2000 万、个人到手约 80-100 万（Tech星球采访，化名自述） | 低中 | 36kr.com/p/3833862243788422 |
| 38 | 胃之书 | 赵纯想（文科生前大厂产品经理） | 拍照记录饮食的 AI App：大模型生成热量与代谢分析，辅助健康管理 | ai-native | 约 9 万用户、5 个月收入 1.2 万美元、App Store 美食分类第三；小红书独立开发大赛最佳 AI 项目 | 高 | woshipm.com/it/6151771.html；huacheng.gz-cmc.com |

## 四、AI 营销获客 / 数字人 / 微信生态（5 个）

| # | 项目 | 创业者 | 产品功能简介 | AI 契合 | 成功迹象（时点值） | 置信度 | 关键信源 |
|---|---|---|---|---|---|---|---|
| 39 | Kre.ai | 武培文 | AI 智能体流水线为跨境电商优化广告投放：素材/投放/复盘全自动 | ai-native | 拿下 200 万元大单、年营收超百万（南方都市报实名报道） | 高 | epaper.oeeee.com（2026-05/06 版） |
| 40 | 戴森云 | 田志雄（武汉） | 大模型驱动直播电商：自动话术/产品生命周期预测/智能运营，兼 AI 定制开发 | ai-enabled-ops | 直播年流水数千万、技术服务营收超千万（极目新闻实地探访，无正式雇员） | 中高 | ctdsbepaper.hubeidaily.net（2026-06-05） |
| 41 | chatgpt-on-wechat + LinkAI | 查雨捷（zhayujie） | 微信生态大模型机器人开源项目：公众号/企微/飞书接入 + 知识库客服；LinkAI 零代码 Agent 平台 | ai-native | GitHub 47.7k stars，微信 AI 机器人事实标准；LinkAI 有订阅计费体系 | 中 | github.com/zhayujie/chatgpt-on-wechat；docs.link-ai.tech |
| 42 | AI 效率小程序矩阵 | 陈宇明（码个蛋） | 面向短视频创作者的 AI 配音/写作微信小程序矩阵，会员订阅 + 按量付费 | ai-embedded | AI 矩阵累计 200 万+ 用户、连续 12 个月盈利（微信公开课讲师自述；现约 3 人小团队） | 中 | developers.weixin.qq.com/community（本人长文） |
| 43 | Sitesfy AI | 王喆（Steve Wang，前特赞联创） | AI 获客系统：自动生成面向搜索引擎的多语言获客网站与营销内容 | ai-enabled-ops | 自述月收入接近 100 万元、客户分布 10+ 国家（仅自述，用于招生场景，谨慎引用） | 中 | noa.stevewang.ai/steve-intro |

## 五、社区高热度案例（7 个）

| # | 项目 | 创业者 | 产品功能简介 | AI 契合 | 成功迹象（时点值） | 置信度 | 关键信源 |
|---|---|---|---|---|---|---|---|
| 44 | 小猫补光灯（Pro） | 陈云飞（2023 年裸辞数字游民） | 拍照补光 App：可调色温纯色背光板，主打女性自拍场景；用 Cursor 约 1 小时完成 MVP | ai-enabled-ops | 下载量各 30-50 万、Pro 收入约 30-40 万元（中新经纬）；上架 4 小时登顶 App Store 付费榜 | 高 | 中新经纬采访；woshipm.com/it/6151771.html |
| 45 | 哄哄模拟器 / 6pen | 王登科（DK） | 哄女友情景对话 AI 游戏（24 小时 60 万用户）；开源模型 AI 绘画平台 | ai-native | 哄哄模拟器 24 小时 60 万用户/2000 万次对话；6pen 一个月 10 万注册（品玩） | 高 | pingwest.com/a/297389（注意：后续产品"独响"已融资团队化，以个人项目时期为准） |
| 46 | Raphael AI | 刘小排 | 基于 Flux.1 的免费无限制 AI 文生图网站，"免费无注册"出海打法 | ai-native | 上线一个月月活破 100 万、全球 AIGC 增长榜第 15 名 | 高 | i5z.net/detail/64；v2ex.com/t/1219654 |
| 47 | Cherry Studio | 亢奋猫（kangfenmao） | 开源跨平台多模型 AI 桌面客户端：300+ 模型/知识库/智能体/MCP | ai-embedded | GitHub 32k+ stars、下载超 1000 万次；自述长期"两人兼职团队"（一人属性打折） | 中 | github.com/CherryHQ/cherry-studio |
| 48 | NuxtPro 等 AI 工具矩阵 | IndieMakerKevin（PennyJoly） | 一人多产品：SaaS 模板 NuxtPro（$158 买断）/API 中转 CheapGpt/视频去水印等 | ai-enabled-ops | 即刻公开记录自述每月至少 1 万美元额外收入（自述口径） | 中 | m.okjike.com（即刻长帖） |
| 49 | AI 音乐生成出海站（名称未公开） | lsaiah（V2EX 用户） | AI 音乐生成 API 包装的出海订阅站，SEO 获取自然流量，Stripe 收款 | ai-native | 自述月新增注册 12 万、单产品月收入不少于 1.2 万美元；获个人投资 10 万+70 万（自述，回帖有质疑） | 中低 | v2ex.com/t/1204936 |
| 50 | PaywallPro | 鱼总聊AI（AI_Jasonyu） | 出海开发者"付费墙 Agent"：收录分析 iOS 订阅付费墙与 Onboarding 数据 | ai-native | 自述单款产品营收 $200k+（全自然流量）；GitHub 开放 Top 500 付费墙画廊 | 中 | x.com/AI_Jasonyu（长文与简介） |

---

## 观察名单（一人属性或成功迹象存疑，暂不入主线）

| 项目 | 创业者 | 简介 | 未入主线原因 |
|---|---|---|---|
| LobeChat / LobeHub | arvinxx（前蚂蚁 Ant Design 核心成员） | 开源 AI 聊天/Agent 平台，8.4 万 stars | 双人起步、已公司化融资 |
| 在场 | 朱书浛（13 岁初二学生） | AI 虚拟家长陪写作业应用 | 成功迹象仅黑客松三天 1.8 万元 |
| Mirrorfy | 陈郅悦（中传毕业生） | AI 虚拟观众的单人直播软件 | 无公开营收/用户数据 |
| AI吟美 | Winlone | 开源 AI 虚拟主播平台（36+ 模型） | 无公开营收数据 |
| AI 视频生成网站 | 王益庆（浙工大大二） | 输入需求生成视频，2 万用户、营收 60 万+ | 信源为微博转述，需核实原始报道 |
| Textideo | Ethan Tian | 聚合 Veo/Sora 的 AI 视频生成平台，自述 $18k MRR | 营收自述无第三方验证 |
| ContractRev | Hason（重庆） | AI 合同审查 | 无可查营收/用户数据 |
| 微信 AI 机器人（雨田） | 匿名（南宁） | 知识库客服机器人，单笔年单最高 8 万元 | 2024 年因微信封号潮关停——"平台依赖风险"典型案例，可作补充阅读 |

## 检索说明（汇总）

- 5 路并行检索共 100+ 轮 WebSearch/网页核读，回收 63 个候选，去重合并后主线 51 个，剔除"在场"（成功迹象不足）后定稿 50 个。
- 主动排除的公司化案例：蛙蛙写作（波形智能，已并入 OPPO）、Podwise（三联创）、MindShow、NoteGPT（双联创）、TTSMaker（公司运营）、Cherry Studio 按公司化口径曾排除、LobeChat、Funloom（20 人团队）、LOOK AI、Pingo AI（双人）、TOPVIEW、JoggAI、句子互动、FoloToy 等。
- 主动排除的不可核实案例：API2D、OhMyGPT（创始人身份无法核实）、腾讯云 OPC 案例 045（匿名月入 11 万）、哥飞/小杨哥/赫兹（产品名不可考）。
- 赛道缺口：医疗赛道未找到同时满足三条标准的个人开发者案例，宁缺毋滥未收录。
- 口径提醒：35/32/43/48/49/50 等条目的营收为创始人自述；开源项目成功迹象以 GitHub 星标关注度为主；21-24 为作品型 OPC（AI 全流程制作的内容作品），与传统软件产品型 OPC 并列呈现。

---

## 增补批次（2026-11-10 · 第 11–60 号中新增 10 例）

> 经两路检索回收 17 个候选，去重后（胃之书、小猫补光灯、CowAgent/chatgpt-on-wechat 与已有案例重复；QRBTF 一人属性存疑剔除）入选 10 个。信源底稿如下（详见案例墙 domestic-opc-50.html 对应卡片）：

1. **音行三界**｜陶雯煜｜AI 音乐公司（生成+数据标注+虚拟偶像 IP，两人运营）｜虚拟偶像粉丝 20 万+、播放 3000 万+｜锚点 2026-04-29（界面新闻 OPC 报道）｜信源：jiemian.com/article/14358087.html｜置信度：中
2. **碳基圈**｜杨平（Yapie程序员哥）｜AI 社交平台+AI 歌曲生成，Claude Code 独立开发｜用户 4 万+、日访问 100 万+、AI 音乐 2 天产生收入；拟获 3000 万投前估值投资意向｜锚点 2026-04-16（中国经营报"探路一人公司"）｜信源：finance.sina.com.cn/jjxw/2026-04-16/doc-inhuskuk4050239.shtml｜置信度：高
3. **BettaFish（微舆）**｜郭航江（BaiFu，北邮大四）｜多智能体舆情分析系统，10 天 Vibe Coding｜GitHub 37.7k★、两度登顶趋势榜第一、获 3000 万元注资｜锚点 2025-12（发布）｜信源：36kr.com/p/3720728841763465｜置信度：高
4. **Chat Memo**｜一泽 Eze｜跨 AI 平台对话存档"记忆中枢"插件｜20000+ 用户、Chrome 4.9 分 Google 精选｜锚点 2025-06-30（即刻发布）｜信源：chatmemo.ai、m.okjike.com/originalPosts/6861e8137669c1bbaf51a98d｜置信度：中高
5. **claude-code-router**｜musistudio｜Claude Code 多模型路由网关｜GitHub 38k★、Kimi 内置赞助｜锚点 2025-02（首提交）｜信源：github.com/musistudio/claude-code-router｜置信度：高
6. **Leadmore AI**｜Richard Wang｜AI Reddit 营销自动化 SaaS，80-90% 代码 AI 完成｜上线 4 个月 $30K MRR → $1M ARR（自述）｜锚点 2025 年初上线｜信源：aiforautomation.io/cases/leadmore-ai-richard-wang、startupfounderstories.com｜置信度：高（营收自述）
7. **供春AI**｜张雨航｜国内首款陶瓷 AIGC 辅助设计软件（宜兴 OPC）｜用户 3 万+、近 30 所高校、天猫校园 OPC 基地｜锚点 2024-11-29（宜兴市政府网）｜信源：xinhuanet.com/globe/20260831/89d03f0573a148f79943fc444cdaad2f/c.html、yixing.gov.cn｜置信度：高
8. **敲敲门童话（Knock AI）**｜Chris & Tony Lai（05 后兄弟两人）｜AI 原生儿童互动童话平台，三端上线｜读者 10 万+ 人次、获 300 万元融资（含 Google Cloud 25 万美元）｜锚点 2024-09-26（上线）｜信源：m.36kr.com/p/2963790071566595、m.hexun.com/stock/2024-09-26/214722025.html｜置信度：高
9. **new-api**｜Calcium-Ion（个人发起，后转 QuantumNous 组织）｜LLM 网关与 AI 资产管理｜GitHub 51.3k★、大量商用中转站底座｜锚点 2024-07-24｜信源：github.com/Calcium-Ion/new-api｜置信度：高（数据）/一人属性：中（已组织化）
10. **Copilot for Obsidian**｜Logan Yang（Brevilabs）｜Obsidian AI 副驾插件，solo developer 起步｜下载破 100 万（2026-02）、GitHub 7.8k★、付费订阅｜锚点 2023（首发）｜信源：obsidiancopilot.com/en/newsletter/2026-02-launching-self-host-mode-retiring-believer-plan、mother-of-success.com｜置信度：高

**本轮落选（证据不足或重复）**：CowAgent（=已收录 chatgpt-on-wechat 同一开发者）、胃之书/小猫补光灯（重复）、QRBTF/倪豪（Latent Cat 公司归属与个人项目说法冲突）、Seeu.food/阴明（单一播客转述链）、观察者悖论/柔树（成功迹象仅"覆盖生活支出"）、Textideo/Ethan Tian（自报营收、华人身份待证，维持观察名单）。

---

## 增补批次 2（2026-11-11 · 第 4、17、19、20、23、26、33、36、38、41 号新增 10 例）

> 经 6 轮并行检索回收 20+ 候选，逐例核验（≥5 信源、≥1 一手、≥2 独立发布方、关键数字交叉验证、冲突双口径并列）。信源底稿如下（详见案例墙 index.html 对应卡片）：

1. **《发配边关，罪妻开荒养出战神》**｜何杰/张芬（夫妻二人，四川巴中）｜534 集 AI 漫剧｜抖音播放破 41 亿（封面新闻/海报新闻/北青报/钛媒体·锌刻度/DataEye ≥5 发布方交叉）、系列 6 部进红果百强榜 TOP15（第六季热度 8251 万·榜内第二）｜热度值勘误（深度报告核验阶段）：封面新闻/DataEye 稿所写"热度峰值 9442 万"经 DataEye 百强榜原始榜单回溯，系榜首《万妖图录传第七季》数值，本案榜单口径为第六季 8251 万，双口径存档｜锚点 2026-07-17（封面新闻）｜置信度：高（二人合伙，按"两人及以下"口径收录）
2. **《一掌熊猫》AI 动画长片**｜秦文山（苏州画宗智能，持股 95%）｜42 分钟 AI 动画长片，28 天/约 3 万元成本｜播放破百万（新华网 2026-07-03 + 澎湃交叉）、入围北京国际电影节（搜狐探访文，单源）、推进《字圣仓颉》｜信源：天眼查（一手）、新华网×2、光明网 2026-03-24、澎湃、新华日报、扬子晚报等 9 条/6 独立发布方｜锚点 2026-03-24｜置信度：高（注明非 100% 独资）
3. **声序智能（AI 曲谱智能体）**｜王钰博（前字节风控算法工程师，北京海淀）｜五线谱↔简谱 1 分钟互转（OMR）订阅制｜上线半年多用户超 6000（新华每日电讯原文口径；初稿误作"4 个月"，深度报告核验阶段勘误）与"大几千用户"（新京报贝壳财经实探）交叉、成立约 3 个月现金流回正进入盈利（行业研报 vs 新浪交叉）｜锚点 2026-03 成立｜信源：新华每日电讯、新华网、新京报贝壳财经、中国经营报、北京日报、中国青年报、首都之窗/北京市科委官网等 12 条｜置信度：高
4. **炘扬贸易（AI 棒球帽出海）**｜张乾超（95 后，丽水云和/杭州）｜个人 + AI 智能体（阿里国际 Accio）跑通选品/设计/交付全链｜开业当月回本、首单 3600 美元；智能体数冲突并列：8 个（潮新闻/中国网）vs 80 个（新华每日电讯 2026-11-09）；月产 1800 款（潮新闻）vs 2000 款（新华）｜锚点 2026-03 开业｜信源：新华每日电讯、潮新闻×2、中国网、雨果跨境、凤凰转中国新闻周刊 6 条/4 独立｜置信度：高（记者实地探访唯一工位）
5. **AI 短剧《安徽小木匠》**｜小果哥哥（前婚庆摄像，初中没毕业）｜豆包改编 IP 剧本 + Seedance 生成的 AI 仿真人短剧，约 2900 元成本 7 天制作｜全网播放 3.5 亿、分账 50 万+（≥4 信源交叉）；成本 2900/3000 元两口径并列；后续三部未过审（同信源注明）｜锚点 2026-01 上线｜信源：乱翻书播客 266 期（一手受访）、流媒体网/短剧自习室、东方财富财富号、marsbit 等｜置信度：高
6. **《明末：欲火重生》**｜阿拉丁巴图（43 岁前上海美术设计师）｜8 个月 AI 辅助独立开发的 2D 开放世界视觉小说，Steam EA（单人署名开发+发行）｜首月收入约 6 万元（GameLook 2026-01-13 报道口径，**营收单源**）；Steam 550+ 评价（Steambase）佐证商业落地｜锚点 2025-11-14 上线｜信源：Steam 商店页（一手）、B站开发日志（一手）、GameLook、腾讯新闻、中华网、游民星空｜置信度：高（营收单源已标注）
7. **星境引擎（AI 短剧承制）**｜彭青云（前品牌设计师，两人团队，杭州上城）｜全球首部神话题材 AI 短剧《众神之战》主创｜热度近 2000 万（天下网商+杭州日报交叉）、海外上亿流量（杭州宣传网+杭州日报交叉）、总成本约 10 万（两源交叉）；两人月均收入数万元（多口径并列）；出海短剧 7.3 亿播放仅腾讯 OPC 社区自述页单源｜锚点 2025（年）上线｜信源：天下网商（界面转载）、杭州宣传网×2（政府一手）、杭州日报×2、京报网、华声在线、腾讯云 OPC 社区｜置信度：高（两人团队按口径收录）
8. **江苏梧桐 AI（大学生就业平台）**｜何汕杉（苏州工业园区，唯一全职员工）｜AI 大学生就业服务平台 + OPC×AI 供需对接平台｜月活近 60 万人次（新华网 2026-04-23）与 48 万份简历/13 万家企业（园区管委会官网 2026-03）交叉｜锚点 2025-05 上线推算｜信源：新华网、苏州工业园区管委会×2（政府一手）、中国经营报、凤凰转中国新闻周刊 5 条/3 独立｜置信度：高
9. **EmoEase（AI 情绪疗愈 App）**｜冼星朗（05 后佛山顺德人，香港读高中）｜Cursor/Trae 零基础 20 天开发的 AI 情绪记录疗愈 App｜上线即冲 App Store 付费工具榜第 5（南方都市报/腾讯新闻/钛媒体/网易 4 发布方交叉）；苹果 SSC 全球杰出获奖者（南都+腾讯双源 + Apple 官网一手）；月入过万为南都系单一发布方自述口径｜锚点 2025-04-17 首发报道｜信源：南都专访（一手）、腾讯新闻、钛媒体、网易、南方新闻网、Apple SSC 页面（官方一手）｜置信度：高
10. **Simen AI（猴子说话）**｜雷圳鹏（27 岁，武汉光谷）｜本地办公智能体「师门」+ OpenClaw AI 数字员工工具｜产品未正式发布即获字节跳动近 4000 万元投资（长江日报 vs 央视网 2026-03-18 双独立源交叉）+ 奇绩创坛 200 余万元天使轮（长报+海南日报双源）；"养龙虾"一周赚 10 万为新海南客户端单一转述口径｜锚点 2025-03-14 公司成立｜信源：长江日报专访（一手）、央视网地方频道、新浪财经、新海南客户端、天眼查（一手）、simen.ai 官网（一手）｜置信度：高（起步单枪匹马，现约 10 人团队）

**本轮落选（逐例原因）**：
- 《七天爱人》杨平 = 已收录碳基圈创始人（Yapie程序员哥）同一人（新京报/中国经营报/中安在线三源确认身份重合），不重复收录
- 张金慧（杭州宙恩智能）：新华每日电讯 2026-05 报道"团队扩大到 30 人"与 2026-11"一人公司"叙事冲突无法调和，关键数字（200 部/近亿播放/营收超千万）亦仅新华深读单源
- 张正谦（武汉 AI 末世短剧）：全部报道溯源自九派新闻单链，无一手信源
- 许展玮（深圳手亿科技，具身智能数据腕带）：定焦 One 2026-08 访谈证实已有联创 CTO 与雇员，已团队化（三轮数千万元融资）
- 张汉生《持械入宋》：主创团队 6-10 人，超"一人/两人"口径
- 李川鸣（上海嘉定机器人商演）：AI 非当前业务核心（系统集成+租赁），营收仅嘉定政府网单一稿件链
- 季煜橙/周建斌（经济参考报）：AI 仅为开发手段而非产品核心能力；周已非一人状态
- 武培文（AI 跨境营销）= 已收录 Kre.ai 同一人；Fast3D（刘小排）= 已收录 Raphael AI 同一人，均按"一人一案例"惯例不单列
- 许飞（AI 漫剧单部 80 万分红）：仅投资界原发+转载链，无一手信源
- 王益庆（奔猪）：杭州网原始报道已找到，但独立发布方不足 5 个且存在代码相似性质疑，维持观察名单
- 嗷嗷剧场《山海藏墟》：热度 6975 万仅 DataEye 单源，关键数字未交叉
