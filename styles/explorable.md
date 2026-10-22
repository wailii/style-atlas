# 可探索解释（explorable）

一篇能动手的讲解：正文里的数字可以左右拖，图上的点可以拖，拖了以后句子和图一起变。每个量一个颜色，正文和图里同一个量永远同一个颜色。像 Bret Victor 说的「会回应的文档」。

出处：Bret Victor《Explorable Explanations》（https://worrydream.com/ExplorableExplanations/）；Nicky Case 整理的可探索解释合集（https://explorabl.es/）；Simon Willison 收集的近年交互讲解文章（https://simonwillison.net/tags/explorables）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=Noto+Serif+SC:wght@400;600;900&family=Inter:wght@500;600&family=JetBrains+Mono:wght@500;700&display=swap");
:root { --ink:#1b1b1f; --mute:#868e96; --line:#e9ecef; --fig:#f8f9fa; --heat:#e8590c; --src:#1c7ed6; --rank:#7048e8; }   /* 一个量一个颜色 */
p { font-size: 16px; line-height: 1.85; }
.drag { font-family: "JetBrains Mono"; font-weight: 700; padding: 0 3px; border-bottom: 2px dotted currentColor; cursor: ew-resize; touch-action: none; user-select: none; }   /* 能拖的数字 */
.drag::before { content: "◂"; } .drag::after { content: "▸"; }      /* 悬停 / 拖动时出现 */
.fig { padding: 12px; background: var(--fig); border-radius: 12px; }
.bar.off { opacity: .22; transition: opacity .35s; }                  /* 被筛掉的变淡，不消失 */
```

```js
// 能拖的数字：横向每 14px 变 1；键盘左右也行
el.addEventListener("pointermove", (e) => { if (e.buttons) set(v0 + Math.round((e.clientX - x0) / 14)); });
// 数字变化补间 300ms；图里两条线逐点插值 450ms（同一套点）
cur2 = to.map((x, i) => from[i] + (x - from[i]) * e);
// 开场示范：圆点自己从左走到右一遍；能拖的数字左右晃两下
```

## 一眼认出（不能改）

- 正文是主角，图穿插在段落之间
- 句子里有能拖的数字（虚线下划线、左右箭头），拖了句子里的结果跟着变
- 图能直接按住拖，读数一行字跟着变
- 每个量固定一个颜色：热度橙、来源蓝、名次紫——正文和图一致
- 变化都是平滑过渡，不跳

## 颜色

- 白底；正文 `#1B1B1F`；图底 `#F8F9FA`；次要 `#868E96`
- 变量色：橙 `#E8590C`、蓝 `#1C7ED6`、紫 `#7048E8`

## 字体

- 正文：Source Serif 4 + Noto Serif SC
- 图注、读数：Inter；数字：JetBrains Mono

## 真图怎么处理

- 这种风格以图表为主；有图时放在段落里当插图，原样

## 动效

- 曲线 1.2s 画出来；圆点示范走一遍（2.6s）
- 能拖的数字晃两下提示
- 拖动时：数字补间、线条插值、被筛掉的条目变淡
- 段落 600ms 依次浮上来

## 组件

- 标题区：小标签「可以拖的讲解」+ 大标题 + 数据来源行
- 图 1：可拖的折线图（吸附到整点），下面一行读数
- 由数据算出来的句子（第几小时上榜、多久涨过 300）
- 可拖的筛选句 + 条形列表（热度条 + 来源数）
- 可拖的对比句 + 两条线叠在一起的图
- 页尾一句数据说明

## 换到别的东西上

- 网页：科普长文、产品原理（「这个参数调大会怎样」）、定价计算器
- 课程、教程里的小练习
- 视频：录一段有人拖动的过程

## 容易做坏

- 拖动的东西和要讲的道理没关系（每个交互都要回答一个问题）
- 颜色和量对不上
- 句子里的数字写死，不跟着数据算
- 能拖的东西没有提示，用户不知道能拖

## 参考实现

页面（`gallery/s-explorable.html`）：`draggable()`、`setJ()` 图上拖动、`tween()`、`pathOf()` 和线条插值
