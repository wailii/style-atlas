# 数学讲解（manim）

3Blue1Brown 的样子：深底、坐标轴一笔画出、曲线沿着画、字先描边再填色、一条曲线平滑地变成另一条。50 种里唯一的深底。

出处：adithya-s-k/manim_skill（1.2k★，用 Manim 做 3Blue1Brown 风格动画的 skill）；Deedy 用 Manim + Kokoro 做的论文讲解（https://x.com/deedydas/status/2103141339651350646）。

## 直接抄

```css
:root { --bg:#121315; --fg:#ececec; --mute:#8a8d93; --blue:#58c4dd; --teal:#5cd0b3; --green:#83c167; --yel:#f4d345; --gold:#f0ac5f; --red:#fc6255; --purple:#9a72ac; }
@import url("https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,500;0,600;1,500;1,600&family=Noto+Serif+SC:wght@500;700;900&display=swap");
```
```js
// Manim 的 smooth
const smooth = t => { const s = 1 - t; return t*t*t*(10*s*s + 5*s*t + t*t); };
```

## 一眼认出（不能改）

- 近黑底，Manim 那套颜色（蓝、青、绿、黄、金、红、紫）
- 坐标轴、曲线都是「画出来」的（Create）
- 字先描边再填色（Write）
- 一条曲线连续变形成另一条（Transform），颜色和数字一起过渡
- 变量用数学斜体：*n* = 3，*H* = 169

## 颜色

- 一个画面里主曲线一种颜色；追踪点和读数用黄
- 列表每行一种 Manim 色

## 字体

- 数学和数字：STIX Two Text（变量用斜体）；中文：Noto Serif SC 500 / 700 / 900

## 真图怎么处理

- 这个风格不用照片——把真数据画成函数图像；图片只在必要时以小框出现
- 我们用的是每条热点的真实热度曲线（`spark`）

## 动效

- 缓动全部用 `smooth`（写成 CSS `linear()`）
- Create：坐标轴 0.9s 画出；刻度、标签淡入
- 曲线：1.6s 沿路径画出；面积 0.8s 淡入（不透明度 .22）
- 追踪点：沿曲线来回走，旁边数值实时变化，虚线落到横轴
- Write：SVG 文字 stroke-dash 从 1600 到 0（占 65%），再填色（35%）
- Transform：两条曲线都重采样成 60 个点，1.1s 逐点插值；颜色、数字同时插值；标题重新 Write

## 组件

- 主按钮：白色圆圈 + 黄色线条三角，播放时变两竖
- 主卡：坐标轴 + 曲线 + 面积 + 追踪点 + 一行变量（*n* = 1 *H* = 455 *S* = 12）+ Write 出来的标题
- 列表：「*n* = 2」+ 标题 + 一条彩色小曲线；点一条，主图 Transform 成它
- 底栏：只有字，蓝色下划线 smooth 滑过去

## 换到别的东西上

- 网页：讲解长文，每节一个可交互的图；滚动驱动 Transform
- 视频：一次一个概念，留停顿，有旁白；声音用安静的钢琴或环境音，不用音效
- 适合：教育、数据讲解、研究报告
- 需要亮底时：底换 `#FAFAF7`、字换 `#222`，颜色饱和度降一点，其余规则不变

## 容易做坏

- 编造公式——只显示真实的变量和数值
- SVG 文字算不出描边长度，用一个足够大的 dasharray（1600）
- 加阴影、发光就不像了

## 参考实现

引擎：`Engines.smooth()`、`smoothLinear()`
页面（`gallery/s-manim.html`）：`write()`（Write）、`resample()` + 点击里的 `morph`（Transform）、追踪点循环
