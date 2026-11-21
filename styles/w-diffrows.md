# 对比列表（w-diffrows）
各部门、各厂商本月和对比期的费用变化，每行一个「对比期点 → 本月点」的哑铃，连线颜色表示涨跌，右边列出差额和百分比。页头是一句随条件变化的结论。社论式排版：衬线大标题、白底、两色（涨橙红、降青绿）。给要向领导解释「钱多花在哪」的财务和资源管理员用。
出处：Datawrapper 的哑铃图（https://www.datawrapper.de）；Vercel 的用量对比（https://vercel.com）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700;900&display=swap");
:root{--ink:#14213d;--ink2:#566074;--mute:#99a1b0;--line:#e7eaf0;--band:#f3f5f9;--up:#e8590c;--dn:#0f8b8d;--ring:#8b94a6}
.row{position:absolute;left:0;right:0;height:66px;display:grid;grid-template-columns:176px 1fr 124px 86px 122px;
     transition:transform .7s cubic-bezier(.3,.8,.25,1),opacity .35s}          /* 行用 translateY 定位，排序就是改 translateY */
.row.fade{opacity:.2}                                                         /* 不满足条件的行淡出，不删除，位置不动 */
.ln{position:absolute;top:50%;height:4px;margin-top:-2px;border-radius:2px;transition:left .7s,width .7s,background .3s}
.d0{width:12px;height:12px;border:2px solid var(--ring);background:#fff}      /* 对比期：空心圈 */
.d1{width:16px;height:16px;border:2px solid #fff}                             /* 本月：实心点，颜色随涨跌 */
```
```js
// 固定坐标域：取所有口径（本月/上月/去年/预算）的最大值，切换对比基准时坐标轴不动，只有点在动
const domain=a=>{const m=Math.max(...a.flatMap(o=>[o.cur,o.prev,o.yoy,o.bud]))*1.06,step=m>420?100:m>200?50:25;return{max:Math.ceil(m/step)*step,step}};
// 点位置用百分比 left，换基准或排序后只改 left / translateY，交给 CSS 过渡
d1.style.left=o.cur/dm.max*100+"%"; ln.style.left=Math.min(x0,x1)+"%"; ln.style.width=Math.abs(x1-x0)+"%";
// 页头结论句：模板 + 数据，随维度、基准变
`11 月算力费用 ${f1(tot)} 万，比${bf}多 ${f1(dd)} 万；涨得最多的是${top.name}（${sp(top.pct)}）`
```
## 一眼认出（不能改）
- 页头是 34px 粗衬线的一句话结论，关键数字带下划线，颜色与涨跌一致
- 每行一个哑铃：空心圈=对比期，实心点=本月，两点连一条 4px 圆角线，涨橙红、降青绿
- 所有行共用一根横轴，细竖线作刻度，不画外框
- 右侧三列等宽数字：变化额、变化率、本月金额，涨降同色
- 顶部一条浅灰圆角控制带：维度、对比、排序三组胶囊分段，右端是「只看变化超过 10%」开关
- 没有行线以外的任何装饰，不用卡片，不用阴影
## 颜色
- 白底；墨 `#14213D`；次要 `#566074`、`#99A1B0`；线 `#E7EAF0`；控制带 `#F3F5F9`
- 涨 `#E8590C`；降 `#0F8B8D`；对比期圈 `#8B94A6`
- 涨用橙红、降用青绿，是因为这里讲「费用」，涨是坏消息；讲收入时要对调
## 字体
- 标题 Noto Serif SC 900；正文 DM Sans + Noto Sans SC；所有数字 DM Mono（`tabular-nums`）
## 真图怎么处理
- 不用图。图形只有圆点、线和细竖线
## 动效
- 首次载入：本月点从对比点位置滑到本月位置，逐行错开 50ms
- 切对比基准：点和线 700ms 滑到新位置；切排序：行 700ms 滑到新行位；切「只看变化超过 10%」：其余行 350ms 淡到 20%
- 悬停：两端出现读数，并跟随鼠标弹出详情卡
## 组件
- 结论标题、KPI 三个数、控制带（分段胶囊、开关）、哑铃行、共用坐标轴、右侧数字列、悬停详情卡、图例
## 学什么交互
- 一个点对比两个数，连线颜色就是结论 → 不用心算「差多少」，一眼看出谁涨谁降、涨多少 → 放到费用明细的部门/厂商对账：本月对上月、对预算。
- 对比基准可切（上月/去年同月/预算），坐标轴不动 → 同一批行在不同口径之间移动，用户看得见变化 → 放到成本分析、预算执行：预算口径下「超出预算」列取代「变化额」。
- 排序重排用位移动画，而不是整表重绘 → 用户能跟住某一行从哪到哪 → 放到任何可切排序的列表：资源台账按利用率、费用按金额。
- 「只看变化超过 10%」让其余行淡出而不是消失 → 保留上下文，行位置不乱，同时聚焦 → 放到异常筛查：把正常项淡掉，异常项留在原位。
- 标题是随条件变化的一句话 → 截图发给领导不需要再配文字 → 放到月度费用报告页顶部。
## 换到别的东西上
- 各部门/项目/厂商的 本期 vs 对比期：费用、用量、利用率、工单数
- 时间点超过两个（要看趋势）的数据，用折线或迷你图，不用哑铃
## 容易做坏
- 切对比基准时坐标域跟着变，所有点同时乱跳
- 涨降颜色用红绿，色盲看不出，且「红=涨」在费用语境里要想清楚
- 筛选直接删行，剩下的行位置全变
- 差额只写数字不带正负号，或正负号用不同宽度的字符导致列不对齐
## 参考实现
`gallery/w-diffrows.html`：`items()`、`domain()`、`build()`、`update()`（排序、基准、过滤、标题句）、悬停卡 `mousemove`
