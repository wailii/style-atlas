# 新闻门户（w-newsfront）

报纸头版式的科技新闻站：居中的大报头、细线分栏、衬线标题分出层级，报头下一条实时滚动的更新条，栏目导航吸顶，纸色和白色可切换。给内容多、要让读者先扫一遍再挑着读的资讯、公告、知识库首页用。

出处：纽约时报（https://www.nytimes.com）；金融时报（https://www.ft.com）。

## 直接抄

```css
:root{--bg:#fff1e5;--ink:#33302e;--head:#1a1817;--mute:#807973;--rule:#cdbfb3;--rule2:#e0d3c7;--acc:#990f3d}
body.white{--bg:#fff;--ink:#333;--head:#111;--mute:#767676;--rule:#cfcfcf;--rule2:#e6e6e6}
body{background:var(--bg);transition:background .4s,color .4s}                 /* 纸色/白色：只换变量 */
.mast{border-bottom:3px double var(--head)}                                    /* 报头下的双线 */
.mast h1{font:900 74px "Noto Serif SC";letter-spacing:.14em}
.front{display:grid;grid-template-columns:300px 1fr 300px}
.front>div:first-child{border-right:1px solid var(--rule)} .front>div:last-child{border-left:1px solid var(--rule)}
.hl{background:linear-gradient(currentColor,currentColor) 0 100%/0 1.5px no-repeat;transition:background-size .3s}
.hl:hover{background-size:100% 1.5px}                                          /* 标题悬停：下划线从左画到右 */
nav.sec{position:sticky;top:0} nav.sec .mini{width:0;opacity:0;transition:.35s} nav.sec.stuck .mini{width:96px;opacity:1}
.live .tr{display:inline-block;animation:mq 90s linear infinite} .live:hover .tr{animation-play-state:paused}
```

```js
// 吸顶：报头滚出视口时给导航加 stuck，露出小报头
new IntersectionObserver(([e])=>nav.classList.toggle("stuck",!e.isIntersecting)).observe(liveBar);
// 同页读文：pushState + popstate，返回键回头版并恢复滚动位置
history.pushState({a:id},"","#a"+id); addEventListener("popstate",()=>{...});
```

## 一眼认出（不能改）

- 居中衬线大报头，下面一条双线；日期、版次、天气放在报头两侧
- 三栏头版，栏与栏之间只有 1px 竖线，没有卡片、没有阴影
- 头条标题 44px 衬线粗体，其余标题 19–20px，层级只靠字号和位置
- 报头下一条「实时」更新条：红点、时间戳、横向滚动，悬停暂停
- 栏目导航吸顶，滚动后左侧出现小报头，当前栏目有红色下划线
- 纸色（FT 式淡粉）与白色一键切换

## 颜色

- 纸色 `#FFF1E5`，白色 `#FFFFFF`；标题 `#1A1817`，正文 `#33302E`，次要 `#807973`
- 线 `#CDBFB3`（栏线）、`#E0D3C7`（行线）
- 强调只有深酒红 `#990F3D`：栏目标签、实时点、当前导航、序号
- 涨跌：绿 `#0F7A4B`、红 `#B4231A`，只用在数字上

## 字体

- 标题、摘要、正文：Noto Serif SC（900 / 700 / 400）
- 标签、署名、导航：Noto Sans SC；报头英文 Playfair Display 斜体；时间和数字 IBM Plex Mono
- 文章页正文 18.5px / 行高 1.95，首段首字下沉

## 真图怎么处理

- 头条配 16:8.4 的横图，图下一行小字：说明在左，「示意图 · 摄影师」在右
- 其他条目多数不配图，层级靠标题；每个栏目第一条才带 3:2 小图
- 悬停时图片放大 2.5%（0.8 秒）；文章页图 16:9

## 动效

- 实时条匀速滚动，悬停暂停；红点 1.4 秒呼吸
- 标题悬停下划线 0.3 秒画出；导航下划线 0.25 秒展开
- 文章切入 0.5 秒上浮淡入；栏目滚动到时上浮显现
- 纸色/白色切换 0.4 秒

## 组件

- 工具条：日期、版次、纸色/白色切换、搜索、登录、订阅
- 报头：中文报名、英文副题、左右两侧小字
- 实时更新条：时间戳 + 标题，点击进文章
- 吸顶栏目导航：头版、各栏目，滚动同步高亮，右端显示北京时间
- 头版三栏：左栏要闻列表、中栏头条加两条次头条、右栏最多阅读和数据小表
- 栏目带：四栏，首栏带图
- 观点带：三条引语式标题
- 文章页：返回头版、栏目、标题、摘要、署名行、大图、首字下沉、引语、相关报道

## 学什么交互

- 导航吸顶并缩出小报头 → 长页面里永远知道自己在哪、能一步跳走 → 放到费用明细或资源台账：滚过筛选区后，表头和筛选摘要吸顶，页签保持可点。
- 实时更新条滚动、悬停暂停、点击进详情 → 动态信息不占主版面，但随时能看到 → 放到资源或告警总览：顶部一条告警滚动条，悬停暂停，点击进该告警的处理页。
- 同页读文，返回键回到原来的滚动位置 → 读完不丢上下文 → 放到工单、审批、知识库：点开详情后返回，列表的筛选、页码、滚动位置都保留。
- 层级只靠字号、位置和细线 → 页面信息很多也不乱，没有卡片堆叠 → 放到后台首页：公告、待办、动态用线分栏、用字号分主次，而不是每块一个白卡片。
- 纸色/白色切换只换变量 → 同一套内容两种阅读环境，切换无闪烁 → 放到后台：浅色/护眼两档，只改变量即可。

## 换到别的东西上

- 资讯门户、公司公告栏、知识库首页、发布说明、行业周报
- 后台只借「吸顶导航」「线分栏」「实时条」「同页详情」；报头和衬线不要带进去

## 容易做坏

- 每条新闻都加卡片、阴影，报纸感就没了
- 全部标题一样大，没有头条
- 实时条不暂停，读不完一条就滚走
- 文章页正文宽度超过 760px，行太长
- 用多种强调色，一版里同时有红、蓝、橙

## 参考实现

页面 `gallery/w-newsfront.html`：`#tr` 实时条、`nav.sec` 吸顶与 `spy()` 栏目高亮、`openA()` / `show()` / `showHome()` 同页读文、`#tog` 纸色白色切换、`sec()` 栏目带。
