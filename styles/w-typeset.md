# 排版后台（w-typeset）
资源申请的列表加详情，整页只靠字号、字重、对齐和细线分层：没有卡片、没有阴影、没有圆角，大标题和巨大数字占一半视觉重量，列表和详情落在同一张 12 栏网格里。给想让后台更像一份印刷品的人用。
出处：瑞士国际主义排版（网格、无衬线、非对称）；Are.na（https://www.are.na）的克制列表。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;800&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap");
:root{--ink:#000;--g1:#555;--g2:#8c8c8c;--g3:#d9d9d9;--red:#e4002b;--m:40px;--gut:20px}
*{border-radius:0;box-shadow:none}
.g{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:var(--gut);padding:0 var(--m)}
.hero h1{grid-column:1/8;font-size:122px;line-height:1;letter-spacing:-.05em;font-weight:900}
.hero .nu b{font-size:160px;line-height:.86;letter-spacing:-.06em;font-weight:800;font-variant-numeric:tabular-nums}
.flt a.on{font-weight:700;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:8px}   /* 当前筛选：粗下划线 */
.th button.on{color:#000;font-weight:700}                                                                     /* 当前排序列：标题变粗 */
.tr{height:38px;border-bottom:1px solid var(--g3)}
.tr.sel{font-weight:700}.tr.sel::before{content:"";position:absolute;left:-12px;width:7px;height:7px;background:var(--red)}
.det{grid-column:8/13;border-left:1px solid #000}                                                              /* 详情落在同一网格的右 5 栏 */
```
```js
// 数字滚动：420ms 缓出，筛选和切换申请时都用
const roll = (el, to) => { const from = +el.dataset.v || 0; el.dataset.v = to; const t0 = performance.now();
  (function f(t) { const k = Math.min(1, (t - t0) / 420), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e); if (k < 1) requestAnimationFrame(f) })(t0) };
```
## 一眼认出（不能改）
- 纯白底、纯黑字，只有一个信号红 `#E4002B`（待审状态、选中小方块、悬停的操作）
- 标题「资源申请」120px 以上，旁边一个 160px 的数字随筛选变化
- 筛选是一行文字，当前项粗体加 3px 下划线，没有按钮、没有胶囊
- 列表和详情左右并排在同一网格里，中间一条黑细线，不弹窗不抽屉
- 零圆角、零阴影、零卡片，分隔只用 1px 灰线和 1px 黑线
## 颜色
- 底 `#FFFFFF`，字 `#000`，次级 `#555` / `#8C8C8C`，细线 `#D9D9D9`，粗线 `#000`
- 红 `#E4002B` 只给：待审、选中行小方块、悬停的同意/驳回
## 字体
- Inter Tight（数字和西文）+ Noto Sans SC（中文，标题用 900）
- 标题和大数字字距收紧到 -.05em；正文 14px，列标题 12px
## 真图怎么处理
- 不用图。要放也只放黑白、满栏宽、无边框
## 动效
- 切换申请时详情上浮淡入 220ms，大数字 420ms 滚到新值
- 筛选时顶部大数字滚动
- 其他不做动效，悬停只变粗或变色
## 组件
- 顶栏：左标识、中导航文字、右日期
- 页头：标题 + 大数字 + 当前范围说明
- 筛选行：文字链接，右侧显示当前排序
- 表头：点击排序，当前列粗体并带 ↑ ↓
- 列表行：编号、申请人、资源、数量（单位小一号）、状态、日期
- 详情：编号和状态、巨大数量、标题、2 列字段表、说明、时间线、同意/驳回文字操作
## 学什么交互
- 筛选写成一行文字，带角标计数 → 比一排按钮轻，也不抢列表 → 申请列表、工单列表的状态切换
- 列表和详情放在同一张网格里并排 → 看详情不遮列表，上下键就能逐条看 → 资源申请、审批、报修的主从布局
- 当前排序列只靠标题变粗标出 → 不加图标也清楚 → 台账和明细表的排序提示
- 大数字做页面锚点，随筛选滚动 → 第一眼知道"现在看的是多少条" → 费用明细、资源台账顶部的结果数
- 操作用带粗下划线的文字，不用按钮 → 操作一多也不显得吵 → 审批页同意/驳回
## 换到别的东西上
- 申请单、审批单、工单、合同台账、变更记录
- 不适合：需要大量内联编辑或图表的页面
## 容易做坏
- 偷偷加灰底卡片或阴影，层级就回到普通后台
- 红色用多了，待审就不突出
- 列没有对齐到网格线，数字栏左右乱跳
- 标题和大数字字号不够大，看起来只是留白多的普通页
## 参考实现
页面 `gallery/w-typeset.html`：`list()` 筛选排序、`head()` 表头、`flt()` 筛选行、`rows()` 列表、`detail()` 详情、`roll()` 数字滚动
