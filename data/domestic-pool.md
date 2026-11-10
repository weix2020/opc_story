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
