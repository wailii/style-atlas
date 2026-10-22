# 显微镜（microscope）

明场显微镜下看东西：圆形视野、白光底、标本染成伊红粉和苏木精紫；换物镜时先失焦再对焦，一条清楚的焦平面带从左扫到右；比例尺、视野宽度、中心坐标都是算出来的真数字，只用一种颜色。

出处：lemo-opuscar 风格库 microscope（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/microscope/STYLE.md），语法学自 Eames《十的次方》和数字病理阅片器。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Caveat:wght@600&display=swap");
:root { --bench:#eef1f3; --ink:#1d2a33; --mute:#74828c; --line:#d7dde1; --acc:#0b8f8c; }   /* --acc 只给读数 */
.eye { border-radius: 50%; padding: 12px; background: radial-gradient(circle, #2a3036 60%, #0f1214 72%); }   /* 目镜筒 */
.field { border-radius: 50%; overflow: hidden; background: #fbf7fb; }
.field::after { border-radius: 50%; box-shadow: inset 0 0 26px 6px rgba(60,40,70,.35), inset 0 0 2px 3px rgba(120,160,220,.25); }   /* 边缘暗角 + 一圈色差 */
@property --fp { syntax: "<percentage>"; inherits: false; initial-value: 200%; }
#blur { filter: blur(3px); mask: linear-gradient(105deg, transparent calc(var(--fp) - 12%), #000 calc(var(--fp) + 12%)); }   /* 焦平面带：左边已清楚，右边还虚 */
.obj button i { background: var(--ring); }   /* 物镜色环惯例：4× 红 #d9443a、10× 黄 #e8c52e、40× 浅蓝 #7cc4e8 */
```

```js
// 染色：亮度（加一点饱和度）映射到 白 → 伊红粉 → 苏木精紫
const A = [251,247,251], B = [233,150,196], C = [86,38,128], t = Math.min(1, (1 - L) * 1.25 + sat * .35);
// 换物镜：视野宽度按对数插值 650ms；同时失焦 760ms；然后焦平面带扫过 1100ms
zoomFov = Math.exp(Math.log(from) + (Math.log(to) - Math.log(from)) * e);
$("blur").animate([{ "--fp": "-30%" }, { "--fp": "130%" }], { duration: 1100, delay: 650, fill: "both" });
// 比例尺：挑一个整数像素长度，让它在屏上 30~70px；单位就是图片像素
```

## 一眼认出（不能改）

- 圆形视野 + 黑色目镜筒 + 边缘暗角
- 标本是染色的：白底、粉、紫
- 换倍数的「呼吸」：模糊 → 清楚，然后焦平面带扫过
- 读数都是真的、都是算出来的：比例尺、视野宽度、中心坐标、标本尺寸
- 物镜按钮带行业色环

## 颜色

- 实验台 `#EEF1F3`；字 `#1D2A33`；次要 `#74828C`
- 染色：白 `#FBF7FB`、伊红粉 `#E996C4`、苏木精紫 `#562680`
- 读数唯一色：青 `#0B8F8C`
- 物镜色环：红 / 黄 / 浅蓝

## 字体

- IBM Plex Sans + IBM Plex Mono（读数）+ Noto Sans SC
- 载玻片标签：Caveat 手写

## 真图怎么处理

- 整张染色（`stain()`），放进圆形视野；40× 默认对准画面里细节最多的一块（梯度和最大的 40px 方块，`busiest()`）
- 列表里的载玻片缩略图也取那一块

## 动效

- 开场：从很模糊对上焦，然后一镜到底 4× → 10× → 40×
- 换物镜：对数缩放 + 失焦呼吸 + 焦平面带扫过
- 拖动视野平移，读数实时更新
- 换载玻片：新片从下面推上来，回到 4×

## 组件

- 顶栏：标题 + 「载玻片 01 · 物镜 40×」
- 视野：圆形 + 顶部倍数 + 右下比例尺
- 物镜转盘：4× / 10× / 40× 三个按钮
- 读数卡：标题 + 标本尺寸、视野宽度、中心坐标
- 载玻片列表：磨砂标签区手写编号 + 标题 + 小圆标本；没图的写「无标本」

## 换到别的东西上

- 网页：科学、医疗、材料、芯片类科普；「放大看细节」的产品页
- 视频：一镜到底放大，倍数读数跟着走
- 读数不能编：没有真实尺寸就用图片像素当单位，并写明

## 容易做坏

- 读数写死或编造（尤其是「微米」）
- 视野是方的
- 标本保持原色（不像在镜下）
- 只有放大没有失焦，看起来像普通缩放

## 参考实现

页面（`gallery/s-microscope.html`）：`stain()`、`busiest()`、`paint()` / `setObj()` / `load()`、焦平面带 `#blur`
