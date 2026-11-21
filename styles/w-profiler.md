# 列画像表格（w-profiler）
云账单明细表，每个列头下面都有该列的分布小图：日期列是按周的时间分布，数值列是直方图，分类列是占比横条。全部用等宽字，白底细线，极简。在小图上拖选一段或点一行就筛选整张表，所有列头的小图一起刷新。给要边看数据分布边筛选的账单、台账分析者用。
出处：Observable 数据表（https://observablehq.com）、Hex 表格（https://hex.tech）、Rill（https://www.rilldata.com）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Spline+Sans+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--ink:#17181c;--ink2:#5f636d;--mute:#9a9ea8;--line:#e6e8ec;--head:#fafafb;--base:#e4e6ea;--bar:#4a4e58;--dim:#b4b8c0;--hot:#ff5a36;--hotbg:#fff0ec}
body{font:12px/1.4 "Spline Sans Mono","Noto Sans SC",monospace;font-variant-numeric:tabular-nums}
.gr{display:grid;grid-template-columns:46px minmax(0,1.05fr) minmax(0,.95fr) minmax(0,1.05fr) minmax(0,.95fr) minmax(0,1fr) minmax(0,.95fr) minmax(0,1.6fr)}
.head{background:var(--head);border-bottom:1px solid var(--ink)}
.sg i{position:absolute;left:0;top:1px;bottom:1px;background:var(--base)}  .sg.on i{background:var(--hot)}  /* 分类横条 */
```
```js
// 联动：每列的图用「除自己以外所有筛选」后的数据画，这样自己这列还能继续改选区
const rowsExcept=k=>DATA.filter(r=>pass(r,k));
// 直方图三层：全量底色 + 当前数据深灰 + 选区内高亮
bars: base[i] 浅灰，cur[i] = (inRange? "--hot" : filterActive? "--dim" : "--bar")
// 拖选：pointerdown 记起点箱号，pointermove 在 window 上更新，整头重绘
F[col]={t:"rng",a:Math.min(a,b),b:Math.max(a,b)}
// 底部汇总行每格可点切换聚合方式
AGM={amt:["求和","平均","最大","计数"], disc:["平均","最小","最大"]}
```
## 一眼认出（不能改）
- 每个列头分三层：列名（带类型小标签「日期/类别/数值」）、分布小图、「空值 x% · n 个不同值」
- 数值列和日期列是直方图，底层浅灰是全量、上层深灰是当前筛选后的量
- 分类列是几行水平占比条，每行写名称和百分比，选中的变朱红
- 选区在直方图上是朱红描边框，轴标签变成选区范围
- 底部汇总行每格左边是可点的聚合方式（求和/平均/计数），全页等宽字、只有细线
## 颜色
- 白底，墨 `#17181C`，线 `#E6E8EC`，列头底 `#FAFAFB`
- 分布深灰 `#4A4E58`，全量浅灰 `#E4E6EA`，选区朱红 `#FF5A36`
## 字体
- Spline Sans Mono + Noto Sans SC，全页等宽，数字用 tabular-nums
## 真图怎么处理
- 不用图
## 动效
- 分类条宽度 250ms 过渡；筛选胶囊 200ms 弹入
- 拖选时所有列头实时重绘，不做额外动画
## 组件
- 列头画像（直方图、占比条）、拖选框、筛选胶囊、行数计数、固定行号、汇总行、「另 n 类，展开」
## 学什么交互
- 列头直接画分布 → 筛选前就知道数据长什么样，不用先导出看 → 放到费用明细：金额列头的直方图一眼看到长尾，拖选一段就是「只看 1,200 到 8,000 元的」。
- 在图上拖选/点条就是筛选，并且所有列联动 → 不用打开筛选面板 → 放到资源台账：点「GPU 云服务器」，部门、厂商、日期的分布都跟着变。
- 每列显示空值比例和不同值个数 → 数据质量问题露在表头 → 放到账单导入核对：「项目」列空值 11% 一眼就看到。
- 汇总行的聚合方式可点切换 → 筛完马上看合计和平均 → 放到费用明细：金额列求和、折扣列平均，不用导出算。
- 当前筛选写成胶囊并可单独清除 → 随时知道表在显示什么 → 放到所有分析表：顶部「金额：¥1,287–¥12,871 ×」。
## 换到别的东西上
- 账单明细、模型调用日志、作业流水等字段多、数据量大的明细表
- 列超过 10 个时要把画像做成可折叠，只留列名
## 容易做坏
- 小图只画全量，不随筛选联动，选了之后图不变
- 自己这列的图也被自己的筛选压缩，选区之外的柱子消失，没法再改
- 分类列把所有取值挤成一条细线，名字全被截断
- 列头太高，表体只剩几行
## 参考实现
`gallery/w-profiler.html`：`renderHead()`、`histSVG()`、`rowsExcept()`、`pass()`、`renderBody()`、`renderSum()`、拖选的 `pointerdown/move/up`
