# 视觉调查（investigation）

调查报道的工作台：灰度证据图、红框和放大局部、几个独立来源连线汇到同一个点、原文关键句划红、带播放头的数据图。唯一的红色只用来「指」。

出处：lemo-opuscar 风格库 visual-investigation（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/visual-investigation/STYLE.md，原版是深底，这里做成亮色调查桌）。

## 直接抄

```css
:root { --ground:#f4f3ef; --panel:#ffffff; --line:#d6d4ce; --ink:#17181a; --mute:#7b7f86; --tick:#aeb2b8; --red:#ff4a2e; }
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+SC:wght@400;500;700&family=Source+Serif+4:ital,wght@1,500&display=swap");
.chip::before { content:""; width:6px; height:12px; background: var(--ink); }   /* 来源标签：6×12 小块 + 「类型 · 来源」 */
```
```js
// 证据一律：ctx.filter = "grayscale(1) contrast(1.22) brightness(.96)"
```

## 一眼认出（不能改）

- 证据（图、文字、数据）都是灰度，放在带细框的白板上，上面一个「类型 · 来源」小标签
- 红色只做指向：红框、连线、红点、播放头、勾、划线
- 至少两个独立来源连线汇到同一个点 → 一个结论（✓ + 数字）
- 有一个「钟」：数据图上的播放头和读数
- 不确定的东西画出来：虚线框、「≈ 单一来源，待核实」

## 颜色

- 底 `#F4F3EF`，白板 `#FFF`，细线 `#D6D4CE`，字 `#17181A`，次要 `#7B7F86`
- 唯一强调色红 `#FF4A2E`

## 字体

- 标题、结论：Noto Sans SC 700；标签、读数：IBM Plex Mono；原文引用：Source Serif 4 斜体

## 真图怎么处理

- 统一灰度调色；红框圈一块，连线到旁边的 ×3 放大图（同一张图裁出来）

## 动效

- 平滑缓动 `cubic-bezier(.6,0,.2,1)`
- 红框和连线一笔画出；放大图从中间展开；来源卡依次出现，连线汇到红点，红点一弹，结论擦出
- 原文关键句后面一道红色从左往右划过（multiply，α .55）
- 数据图：曲线画出后，播放头扫过去，钟上的数跟着读；点「回放」循环播放

## 组件

- 主按钮：黑框「▶ 回放」
- 主卡：证据图 + 放大图 + 来源卡 + 汇聚点 + 结论 + 标题 + 原文引用 + 带播放头的数据图
- 列表：灰度小图（没图是虚线框「无图」）+ 标题 + 编号 / 热度 + ✓ 来源数 或「≈ 单一来源，待核实」
- 底栏：白底，当前项上方一道红线

## 换到别的东西上

- 网页：长篇调查报道、事实核查、复盘
- 视频：照 lemo 规格——所有素材挂在同一条时间轴上，切点就是同步点，克制、不煽情；声音只用原始素材的声音
- 产品复盘、事故复盘、竞品分析的可视化

## 容易做坏

- 红色拿来做装饰
- 编造时间、地点、结论——只画数据里有的
- 用「暂无素材」空框；没有的来源就不出现

## 参考实现

页面（`gallery/s-investigation.html`）：`grade()`（证据调色）、来源卡汇聚连线、关键句红划（`@property --k`）、播放头 `scrub()`
