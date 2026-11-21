# 评测矩阵（w-evals）
行是测试用例，列是模型或提示词版本，每个格子是一块实心色块，写着得分。表头直接给每列的通过率、分布条、延迟和单条成本。点格子，右侧抽屉显示输入、期望、实际输出和评分理由。给要从一堆版本里挑出更好的那个、并找出哪些用例在拖后腿的人用。白底加粗黑线，色块饱和。
出处：Braintrust（https://www.braintrust.dev）；promptfoo（https://www.promptfoo.dev）。

## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
:root{--ink:#0c0c0c;--grid:#d9d8d0;--ok:#46d37c;--part:#ffc83d;--bad:#ff5a4d;--sel:#2a2de8}
.grid{display:grid;grid-template-columns:370px repeat(5,minmax(112px,1fr));border:2px solid var(--ink)}
.hd{position:sticky;top:0;min-height:132px;border-bottom:2px solid var(--ink)}       /* 列头吸顶，里面是通过率 */
.hd .rate{font:800 34px/1 Archivo;letter-spacing:-.04em}
.cell b{width:calc(100% - 12px);height:30px;border-radius:5px;font:700 12.5px "JetBrains Mono"}
.cell b.ok{background:var(--ok);color:#052e16} .cell b.pt{background:var(--part);color:#4a3200} .cell b.bd{background:var(--bad);color:#4a0a05}
.cell b:hover{transform:scale(1.07);box-shadow:0 0 0 2px var(--ink)}
.hd.sel{background:#eeeeff;box-shadow:inset 0 4px 0 var(--sel)}                    /* 被选来对比的列 */
.body{display:grid;grid-template-columns:1fr 0;transition:grid-template-columns .28s}
.body.open{grid-template-columns:1fr 440px}                                           /* 抽屉推开矩阵，不遮挡 */
```
```js
// 三档：>=0.8 通过，0.4~0.8 部分得分，<0.4 失败
// 对比：选两列后，filter 掉两列「是否通过」相同的行；被选列的格子角上标 ↑ ↓ 表示谁得分高
rows = rows.filter(r => r.res[a].st !== r.res[b].st);
// 失败最多优先：按每行非通过的格数倒序
rows.sort((x, y) => fails(y) - fails(x) || x.id - y.id);
```

## 一眼认出（不能改）
- 矩阵里全是实心色块，绿、琥珀、红三档，每块里是两位小数的分数
- 列头吸顶，每列一个大号通过率数字，下面一条绿黄红分布条，再下面是延迟和单条成本
- 行首有序号、用例名、黑框标签，行尾显示「N 败」，4 败以上变红
- 外框和表头下沿是 2px 黑线，格内分隔是浅灰细线
- 点格子后右侧抽屉从右边推开，被点的格子有黑色描边并略放大

## 颜色
- 底 `#F2F1EC`，面板白，线与墨 `#0C0C0C`，浅格线 `#D9D8D0`
- 通过 `#46D37C`、部分 `#FFC83D`、失败 `#FF5A4D`（字用对应的深色 `#052E16` `#4A3200` `#4A0A05`）
- 对比选中 `#2A2DE8`（只用于选中列的顶边、开关、对比说明条）

## 字体
- Archivo + Noto Sans SC（界面、大号通过率）；JetBrains Mono（分数、序号、延迟）

## 真图怎么处理
- 不用图片

## 动效
- 切换标签或排序时，行依次上浮入场
- 悬停格子放大并描黑边
- 抽屉打开时矩阵区宽度过渡收窄

## 组件
- 顶栏：评测集信息、图例
- 标签筛选（带条数）、「失败最多优先」和「只看两列有差异的行」两个开关
- 对比说明条：A 独有通过几条、B 独有通过几条、相同几条
- 详情抽屉：分数与结论、输入、期望、实际输出、评分理由、同一用例其他列的小色条

## 学什么交互
1. 列头直接放通过率、分布条、延迟和单条成本 → 选版本需要的几个指标不用往下找 → 模型列表、机型选型页的列头放价格、可用卡数、平均排队时间。
2. 选两列只看「结果不同」的行 → 评测集有几百行时，真正要看的往往只有十几行 → 两个月份、两个报价方案对比时，只展示差异项。
3. 格子点开用抽屉，矩阵不被遮挡，抽屉底部有「同一用例其他列」的小色条可直接跳 → 看细节不丢上下文，横向比较一步到位 → 资源台账点一台机器，抽屉里同时显示它在其他周期的状态。
4. 按「失败最多」排序，且行尾写明败几次 → 找出所有版本都过不了的用例，往往是用例本身的问题 → 巡检表、验收清单里按不合格项数排序。

## 换到别的东西上
- 适合：评测集、检查清单、多版本多环境测试结果、供应商打分
- 列数超过 8 时需要横向滚动并固定第一列

## 容易做坏
- 用渐变色表示分数，三档的边界看不清
- 通过率只写在页脚，列头没有
- 抽屉用弹窗盖住矩阵，无法边看边点下一个格子
- 差异对比没有说明条，用户不知道过滤掉了什么

## 参考实现
页面 `gallery/w-evals.html`：`CASES` 用例与期望、`R` 生成各列结果、`draw()` 矩阵、`showDetail()` 抽屉、`visibleRows()` 标签/排序/差异过滤
