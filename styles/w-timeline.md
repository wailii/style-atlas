# 时间轴列表（w-timeline）
GPU 机器占用排期：左边是机器列表（编号、规格、当前占用），右边是横向时间轴，每个占用段是一根带名字的条。深海军蓝的时间标尺、白色网格、按部门着色的条，今日红线贯穿全表。给要排机器、看空档、改预约的资源管理员用。
出处：Airtable Timeline 视图（https://airtable.com）、Monday.com 时间线（https://monday.com）、Linear Roadmap（https://linear.app）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#e9edf3;--navy:#0f1b33;--ink:#17202f;--line:#d9dfe9;--line2:#eaeef4;--wk:#f4f6fa;--today:#ff5a3c}
/* 占用条：部门色淡底 + 左侧 3px 实色边，文字用深色 */
.occ{position:absolute;height:32px;border-radius:5px;background:color-mix(in srgb,var(--c) 17%,#fff);
  box-shadow:inset 3px 0 0 var(--c),inset 0 0 0 1px color-mix(in srgb,var(--c) 38%,transparent)}
.occ .tail{position:absolute;right:0;top:0;bottom:0;background:#ffb020}   /* 条尾 5 天变橙 = 7 天内到期 */
.tline{position:absolute;top:0;bottom:0;width:2px;background:var(--today)}
```
```js
// 一天 = dw 像素；三档缩放只换 dw：周 36、月 10、季度 5
const DW={week:36,month:10,quarter:5};
// 拖动：像素差 → 天数，吸附到整天；跨行用鼠标 y / 行高
drag.ns=drag.s+Math.round(dx/dw()); drag.nm=Math.floor(y/RH);
// 冲突检测：同机器上区间相交就标红、松手还原
const clash=(b,s,e,m)=>bars.find(x=>x!==b&&x.m===m&&x.s<=e&&x.e>=s);
// 滚轮纵向转横向平移
tl.addEventListener("wheel",e=>{e.preventDefault();tl.scrollLeft+=e.deltaY},{passive:false});
```
## 一眼认出（不能改）
- 深海军蓝时间标尺（上层月份、下层刻度），其余是白底网格，周末浅灰
- 一条红色竖线贯穿「今天」，标尺上挂红色小旗写日期
- 占用条是部门色淡底 + 左侧实色边，名字和起止日期写在条里
- 快到期的条，尾部 5 天换成橙色
- 左侧固定三列：机器编号（等宽）、规格、当前占用（带部门色点），空闲写「空闲」
## 颜色
- 标尺 `#0F1B33`，页底 `#E9EDF3`，网格线 `#D9DFE9`
- 部门色：青绿 `#0F9D8A`、琥珀 `#D9831F`、紫 `#7A5AF8`、玫红 `#D6336C`、橄榄 `#5A8F1D`
- 今天 `#FF5A3C`，到期尾 `#FFB020`，冲突 `#D92D20`
## 字体
- 标题：Space Grotesk + Noto Sans SC；机器编号和日期：IBM Plex Mono
## 真图怎么处理
- 不用图
## 动效
- 缩放档位切换时画布 250ms 淡入；拖动中的条抬起并带阴影
- 卡片 140ms 淡入上移；提示条 200ms 落下
## 组件
- 缩放分段控件、部门图例筛选、占用条、条尾预警、今日线与旗、申请单卡片、新建预约卡片、冲突提示
## 学什么交互
- 周/月/季度三档缩放，只改「一天占多少像素」 → 看短期排期和长期容量用同一张图 → 放到机器占用排期：周档排到天，季度档看全局空档。
- 拖整条改起止、拖右端改时长、都吸附到整天 → 比弹窗填日期快得多，且不会出现半天 → 放到预约改期：拖动时同机器重叠立刻标红，松手还原并说明冲突对象。
- 在空白处拖出一段就新建 → 想占哪段拖哪段 → 放到预约创建：拖完弹出一张小卡填名称和部门，不跳页。
- 条尾变色提示即将到期 → 不必另做到期列表 → 放到资源台账的占用视图：到期前 7 天尾部变橙，点条可「续期 7 天」。
- 滚轮横向平移 + 标尺里的月份文字随滚动吸附在左边 → 不管滚到哪都知道现在是几月 → 放到所有长时间轴。
## 换到别的东西上
- 会议室排期、设备借用、发布日历、项目甘特图
- 行数超过 50 时需要给左侧列表加纵向虚拟滚动
## 容易做坏
- 一天的宽度固定，季度档看不全、周档又太宽
- 拖动后不检查冲突，同一台机器出现两个重叠的占用
- 部门色用高饱和实色填满整条，名字看不清
- 左侧列表和时间轴行高不一致，错行
## 参考实现
`gallery/w-timeline.html`：`build()` 生成标尺和网格、`drawBar()`、`stick()`（条内文字和月份随滚动吸附）、`pointerdown/move/up` 里的移动/调整/新建三种拖动、`showCard()`、`openCreate()`、`clash()`
