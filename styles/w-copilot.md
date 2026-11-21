# 页内助手（w-copilot）
左边是一个普通的资源台账页，右边是助手侧栏。助手读得到页面，说一句话它就在左边真的改筛选、标记行、转移部门；它改过的地方用荧光笔黄标出来，每一步都在侧栏里留一张卡，能撤销。给想把对话式助手放进已有后台页面的人看。白底、墨色，只有「助手动过」的地方是黄色。
出处：Microsoft Copilot（https://copilot.microsoft.com）；Notion AI（https://www.notion.com/product/ai）；Intercom Fin（https://www.intercom.com/fin）。

## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Red+Hat+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#f6f7f9;--ink:#14171f;--line:#e3e6ec;--mk:#ffe14d;--mkbg:#fff7c9;--ok:#16915a}
.app{display:grid;grid-template-columns:1fr 392px}                            /* 页面在左，助手固定 392 */
.chip.by:before{content:"助手";background:var(--ink);color:var(--mk);font-size:10px;padding:0 5px;border-radius:3px}
tr.hl td{background:var(--mkbg)} tr.hl td:first-child{box-shadow:inset 4px 0 0 var(--ink)}
td.chg{animation:chg 1.8s} @keyframes chg{0%,30%{background:var(--mk);font-weight:700}}   /* 被助手改过的单元格 */
.mc{font:500 11.5px "Red Hat Mono";background:var(--mkbg);border:1px solid #ecd24a;cursor:pointer}   /* 回复里可点的机器名 */
table{table-layout:fixed}                                                      /* 重绘不抖 */
```
```js
// 每个操作是一条记录：{ id, title, lines:[改了什么], undo() }，卡片上的「撤销这一步」调用 undo()
// 会改数据的操作先出 preview 卡，点「确认执行」才改；筛选类操作直接执行，同样可撤销
const a = { id: ++aid, title: "转移所属部门", preview: true, lines: [...], ids, to };
// 回复里的机器名是 <span class="mc" data-m="id">，点击：不在当前筛选里就先清筛选，再滚到该行并闪一下
```

## 一眼认出（不能改）
- 右侧固定宽度的助手侧栏，顶部一条虚线框「已读取：物理机台账 · 显示 14/34 台」，随页面状态变
- 助手设置的筛选 chip 前面有一个黑底黄字的「助手」小标
- 被助手命中的行整行淡黄底，左边 4px 黑线；被改过的单元格亮黄闪动
- 每个操作是一张卡：标题、已执行 / 待确认 / 已撤销状态、改了什么的清单、撤销按钮
- 回复里的机器名是黄色小块，可点击定位

## 颜色
- 底 `#F6F7F9`，面板白，线 `#E3E6EC`，墨 `#14171F`
- 荧光笔黄 `#FFE14D`、浅黄 `#FFF7C9`、黄描边 `#ECD24A`
- 状态点：在用 `#16915A`、空闲 `#E59A0A`、维修 `#D4382D`

## 字体
- Figtree + Noto Sans SC（界面）；Red Hat Mono（机器编号、数字）

## 真图怎么处理
- 不用图片

## 动效
- 助手回复逐字出现，末尾有黄色光标
- 新增的筛选 chip 弹出一下
- 点机器名：左侧平滑滚到那一行并整行闪黄
- 确认转移后，被改的部门单元格先亮黄再退回

## 组件
- 页面：导航、标题与统计、筛选 chip、固定表头表格、底部计数
- 助手：页面上下文条、消息流、操作卡（预览 / 已执行 / 已撤销）、建议按钮、输入框

## 学什么交互
1. 助手的每个动作都落在页面上：筛选 chip 带「助手」标，命中行标黄 → 用户随时能看懂它做了什么，也敢放手让它做 → 资源台账里让助手「找闲置超过 7 天的机器」，直接落成列表上的筛选条件。
2. 会改数据的操作先出预览卡，写清影响了几台、几位负责人、几张卡，确认后才执行 → 批量改动的风险先摆出来 → 批量转移、回收前的影响预览。
3. 回复里的编号可点，点了列表滚到那一行并闪一下 → 文字结论能马上对上数据 → 助手给出的任何机器、订单、部门名都做成可点定位。
4. 每一步操作一张卡，各自有撤销 → 比「全部重来」更细，用户不怕试 → 筛选、排序、批量修改都放进同一条可撤销记录。

## 换到别的东西上
- 适合：已有后台页面外挂对话助手、数据表的自然语言操作、批量处理的二次确认
- 页面复杂（多个表、多个弹层）时，需要在上下文条里写清助手读到的是哪一块

## 容易做坏
- 助手只在侧栏里回答，页面上看不出它改了什么
- 会改数据的操作直接执行，没有预览和确认
- 撤销只能撤最后一步，或者没有撤销
- 重绘时表格列宽抖动，高亮和闪动被冲掉

## 参考实现
页面 `gallery/w-copilot.html`：`ROWS` 机器数据、`F` 筛选状态、`ask()` 理解指令并执行、`setFilter()` 与 `undoFilter()`、`actCard()` 与 `renderCard()` 操作卡、`say()` 逐字回复、`scrollTo()` 定位并闪动
