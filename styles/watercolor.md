# 水彩（watercolor）

暖白水彩纸上，透明颜色一层层刷出来，边缘积色；配手写注释和钢笔引线，像一页自然笔记。

出处：JohnHeibel/PDoomVideo（2.4k★，Opus 5.5 用 p5.js + 笔刷库逐帧画的 MV《I'm Upping My P(doom)》）；lintsinghua/paint-mv-skills（水彩音乐视频 skill）；lemo-opuscar 风格库 watercolor（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/watercolor/STYLE.md）。

## 直接抄

```css
:root { --paper:#fbf8f1; --ink:#2e2a26; --ink2:#6b5e52; --ultra:#3b5ba9; --rose:#d4627a; --sap:#7fa25b; --ochre:#d9a441; --verm:#c8442a; }
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,500;1,600&family=Caveat:wght@500;600&family=Noto+Serif+SC:wght@500;700;900&display=swap");
canvas.wash { mix-blend-mode: multiply; }
```
```js
wcWash(ctx, cx, cy, r, color, { layers:26, alpha:.045, seed, upto })   // 晕染块；upto 从 0 涨到 26 就是「一层层刷上去」
wcStroke(ctx, pts, { width, color, alpha:.5, bristles:5, upto })       // 一笔，带飞白笔毛
watercolorCanvas(img, W, H, { k:7, passes:3, blur:2.4 })               // 真图 → 水彩
```

## 一眼认出（不能改）

- 纸是白色本身：最亮的地方不上色，留纸
- 颜色是透明的，叠得越多越深，边缘颜色积起来更深
- 没有矢量描边；唯一的「线」是钢笔注释和引线
- 东西是一笔笔、一层层刷出来的，先大形后细节
- 旁边有手写注释，带一根钢笔引线指向画面

## 颜色

- 纸 `#FBF8F1`；墨 `#2E2A26`（字、引线）、`#6B5E52`（次要）
- 3～5 种颜料：群青、玫瑰、树绿、赭黄、淡紫；一种强调色朱红 `#C8442A` 只给编号
- 放心改：颜料换成主题色（比如海港：`#9FB4C4` / `#5F7486`）；不能改：纸留白、透明叠色

## 字体

- 标题衬线 Cormorant Garamond（拉丁、数字用斜体）+ Noto Serif SC 900
- 注释手写 Caveat（中文落到 Noto Serif SC）

## 底和纹理

- 纸：`fiberURL(420, 300, "150,130,100")` 纤维 + 细噪点 multiply

## 真图怎么处理

- `watercolorCanvas(img, W*2, H*2, { k: 7 })`：取 7 种主色、按色分区、每区模糊后 multiply 叠 3 遍（每遍轻微错位），最亮的一区留纸
- 外轮廓用 `wcDeform` 抖过的四边形裁切，边缘不齐，像纸上一块颜料
- 出场用波浪边从左往右刷开（1.8s）

## 线和形

- 晕染块：`wcWash`（同一形状叠 26 层、每层再抖一次、每层很淡）
- 分隔线、重点：`wcStroke`（宽度两头细、几条断续的笔毛）
- 编号后面一团颜色；标题重点词下面刷一笔赭黄

## 动效

- 平滑缓动；没有抖动
- 刷上去：晕染块的层数随时间涨（1.2s 左右）；笔触按长度一点点画出（`upto`）
- 注释像写字一样从左往右露出；引线从注释长向画面
- 播放：一圈圈更大更淡的晕染往外扩

## 组件

- 主按钮：一团群青 + 白色「听」
- 主卡：水彩头图 + 朱红编号团 + 手写注释（来源数、热度）+ 引线 + 标题（重点词下刷一笔）
- 列表：编号后一点颜色 + 标题 + 手写热度 + 水彩小图；行间一笔淡墨线
- 底栏：上沿一笔；当前项后面一团颜色

## 换到别的东西上

- 网页：长卷横向平移的一张画；滚动时一处处刷出来
- 视频：照 lemo 规格——画面一笔笔画出来、慢推、雾气擦掉换场；声音用木吉他、钢琴、翻页、鸟鸣
- 海报：大留白 + 一团晕染 + 手写字

## 容易做坏

- 用纯白颜料画亮部（应该留纸）
- 颜色太多太艳像儿童画
- 用 CSS 渐变冒充晕染——一定用叠层算法画

## 参考实现

引擎：`Engines.wcWash()`、`wcStroke()`、`watercolorCanvas()`、`wcDeform()`、`mulberry()`
页面（`gallery/s-watercolor.html`）：`paintIn()`（一层层刷上去）、头图波浪边刷开、重点词下的笔触
