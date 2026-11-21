# 目标记分卡（w-scorecard）
一行一个部门，一列一项指标，每格是一条子弹图：灰色分段表示差/中/好，深色横条是实际值，黑色竖线是目标。达标的格子保持黑白，只有没达标的才上红或橙。给要在一屏里看完 8 个部门 5 项指标、并马上知道「谁在哪项没达标」的负责人。
出处：Geckoboard（https://www.geckoboard.com）；Stephen Few 的子弹图（Perceptual Edge，https://www.perceptualedge.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --ink:#141414; --b1:#ececE7; --b2:#d8d8d2; --b3:#bfbfb8; --bar:#2b2b2a; --red:#e03b2e; --amber:#f0a300; }
.bul { position:relative; height:26px; }
.bul .band { position:absolute; top:0; bottom:0; }                       /* 三段灰：差 / 中 / 好 */
.bul .act  { position:absolute; left:0; top:8px; bottom:8px; background:var(--bar); transition:width .8s cubic-bezier(.2,.8,.2,1); }
.bul .act.miss { background:var(--red); } .bul .act.near { background:var(--amber); }
.bul .tgt  { position:absolute; top:2px; bottom:2px; width:3px; background:#000; }
.tr { position:absolute; height:66px; transition:transform .6s cubic-bezier(.3,.8,.2,1); }   /* 行用 translateY 定位，排序时会滑动 */
```
```js
// 判定：先按显示精度取整，再比目标；差距不到目标的 10% 记为橙，其余为红
const status = (m,v) => { v = +(+v).toFixed(m.dec); const miss = m.hi ? m.t - v : v - m.t; return miss<=0 ? "ok" : (miss/m.t<=.1 ? "near" : "miss"); };
// 越低越好的指标，三段灰倒过来（最深的灰放右边），子弹图的读法才一致
const bands = m.hi ? [[0,c0,"b3"],[c0,c1,"b2"],[c1,100,"b1"]] : [[0,c0,"b1"],[c0,c1,"b2"],[c1,100,"b3"]];
// 排序键 = 离目标的差距 / 刻度范围，不同单位的指标才能比较
```
## 一眼认出（不能改）
- 纯白底，黑字，没有卡片、没有阴影，只有横向细线
- 每格一条子弹图：三段灰底、深色实际条、黑色目标竖线
- 达标的格子全是黑白灰，只有没达标的格子有红或橙的条和数字
- 表头每列写指标名和「目标 ≥ 70%」，可点击排序
- 顶部有一行加粗的「全公司」加权汇总行，下面才是各部门
- 右上角一个黑框的「本月 / 本季度」切换，实心黑色表示当前
## 颜色
- 白 `#fff`，墨 `#141414`，灰段 `#ececE7 / #d8d8d2 / #bfbfb8`，实际条 `#2b2b2a`
- 红 `#e03b2e`（差距超过 10%），橙 `#f0a300`（差距在 10% 以内）
## 字体
- Hanken Grotesk + Noto Sans SC；数字用 DM Mono，`tabular-nums`
- 标题 34px 粗体，部门名 15px 粗体，指标值 15px 等宽
## 真图怎么处理
- 不用照片
## 动效
- 进入：每格的实际条从 0 长到位，按列和行错开约 40–60ms
- 切本月/本季度：条的长度、数字、颜色一起过渡
- 点列头排序：整行用 0.6s 滑到新位置
- 点部门：右侧抽屉滑入，白色遮罩淡入
## 组件
- 页头：标题、读图说明、周期切换
- 表头：指标名 + 目标 + 排序箭头；汇总行；部门行（名称、卡数、负责人）
- 子弹图格：数值 + 子弹图 + 悬停提示（实际/目标/差距）
- 抽屉：部门名、未达标摘要、5 张 12 个月小图（目标虚线、按状态上色的点）
## 学什么交互
- 用子弹图代替数字和饼图 → 一格里同时看到实际、目标、差距，不用心算 → 放到「部门资源考核」：利用率、预算占用、排队时长一张表看完。
- 只有没达标的格子上色 → 一屏 40 格，红橙格子自己跳出来，不用扫数字 → 放到「审批超时」「SLA 达成」类表格。
- 点列头按「离目标差距」排序，不按绝对值 → 不同单位的指标也能排序，最差的永远在最上面 → 放到「部门对比」：点「平均排队」，排队最久的部门浮到顶。
- 点部门名滑出 12 个月小图组，每张目标线和纵轴独立 → 在不离开表格的情况下看趋势和是否长期未达标 → 放到「部门详情」抽屉：看某部门利用率是偶发下滑还是连续 5 个月不达标。
- 越低越好的指标把灰段倒过来 → 所有格子「右边越深越差」或「左边越深越差」一致，不会读反 → 放到费用、排队、闲置率这类反向指标。
## 换到别的东西上
- 适合：SLA/KPI 达成、预算执行、质量指标、服务水位
- 不适合：只有一项指标的页面（直接用大数字更好）
## 容易做坏
- 每格都上色，红橙失去提示作用
- 低好指标不倒转灰段，读者把长条当成好事
- 排序用绝对值，不同单位的列没法比
- 抽屉里的小图共用纵轴，波动小的指标被压成直线
## 参考实现
`gallery/w-scorecard.html`：`MET` 指标与目标，`status()` 判定，`bullet()` 子弹图，`order()` 与 `resort()` 排序滑动，`update()` 周期切换，`drawer()` 与 `spark()` 小图组。
