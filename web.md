# 桌面 Web 50 种：怎么挑、怎么学

手机那 70 种是同一个「AI 热点」页换皮。桌面这 50 种每种是一个不同的产品场景，1440×900，参考页都能点。33 种偏工具和后台，17 种偏发布和品牌。

每份规格（`styles/w-<id>.md`）比手机版多一节「学什么交互」：3～5 条能搬到别的产品上的做法，写了放到后台产品上怎么用。

## 五组

| 组 | 风格 |
|---|---|
| 监控与数据 | 观测墙 observatory、日志探针 telemetry、成本透镜 costlens、产品洞察 funnel、交易终端 ticker、拓扑图 topology、机房立面 rack、地图调度 mapops |
| 效率与协作 | 键盘优先 keyboard、块文档 blocks、字段表格 fieldgrid、无限画布 canvas、泳道看板 swimlane、日程网格 timegrid、分拣收件 triage、关系记录 record、工单会话 helpdesk |
| 开发者与 AI | 黑白控制台 mono、开发者文档 devdocs、编辑器 ide、块终端 blockterm、对话与产物 artifact、Agent 运行台 agentrun、模型市场 modelhub、命令启动器 launcher |
| 后台换个活法 | 账本 ledger、排版后台 typeset、原生网页 rawhtml、网页桌面 webos、空间玻璃 spatial、支付后台 payments、专注单色 quiet、一问一答表单 oneq |
| 发布与品牌 | 发布会 keynote、暗场极光 aurora、暖纸衬线 warmpaper、功能格 featuregrid、滚动叙事 scrolly、动态字排 kinetic、3D 英雄 hero3d、工业面板 hardware、复古系统 retroos、科幻 HUD hud、极繁贴纸 maximal、游戏启动器 gamehub、音乐播放器 player、商品页 store、作品集 folio、一位抖动 dither、新闻门户 newsfront |

id 在文件里都带 `w-` 前缀：`gallery/w-ledger.html`、`styles/w-ledger.md`、`gallery/shots/w-ledger.png`。

## 按要做的页面挑

| 要做的页面 | 先看 | 主要学什么 |
|---|---|---|
| 概览、大盘 | observatory、costlens、rack、mapops | 全局时间和变量一处改全页变；颜色只给超阈值；按维度切换着色 |
| 指挥大屏、展厅屏 | hud、observatory | 单色线框、刻度、扫描；大屏和办公页分开做 |
| 列表、台账 | keyboard、fieldgrid、typeset、telemetry、mono | 键盘移动和批量；字段类型一眼可辨；只靠字号和细线分层级；筛选值带条数 |
| 详情 | record、payments、agentrun | 属性栏 + 时间线；事件按时间排开；入参出参并排 |
| 审批、工单、通知 | triage、helpdesk、swimlane | 一键处理并移走；SLA 倒计时排序；卡片停留天数 |
| 申请表单 | oneq、store | 一次一问、条件跳题；配置选择器价格实时变 |
| 账单、费用 | costlens、ledger、payments | 环比瀑布；订正留痕；本期和上期同一天并排读数 |
| 模型、Token、API 平台 | modelhub、devdocs、agentrun、artifact | 筛选 + 对比条 + 用量算费；代码随正文切换；Token 和成本随步骤累计 |
| 文档、需求说明 | blocks、quiet | `/` 插块、块拖拽；焦点模式、页边批注 |
| 全局搜索、快捷入口 | launcher、keyboard | 一个框搜一切、动作二级菜单 |
| 产品发布页、宣传页 | keynote、aurora、warmpaper、featuregrid、hero3d | 滚动驱动镜头；功能格里放会动的小演示 |
| 讲数据的长文 | scrolly、newsfront | 图跟着段落变；多栏网格和标题层级 |

## 外观被设计系统定死时怎么用

改已上线的产品时，颜色、字号、组件写法都按项目自己的设计系统来，外观不能换。这时只搬「学什么交互」里的做法：筛选带条数、链接带筛选、键盘移动、详情侧栏、时间线、对比条。外观可以自己定的新项目，再整套用某一种风格。

## 用法

1. 打开总览：`python3 -m http.server 8960 -d gallery`，浏览器开 `http://localhost:8960`，右上角切「桌面 Web」。
2. 选中一种，点进参考页亲手点一遍，再读规格的「学什么交互」。
3. 做页面时按 `SKILL.md`「怎么用」的步骤走；截图用 `node tools/snap.mjs w-<id>`（默认 1440×900）。
