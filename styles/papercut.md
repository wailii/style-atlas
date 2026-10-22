# 窗花剪纸（papercut）

一张红纸对折几次剪出来的窗花，打开时一折一折展开；镂空里透出后面的画面。

出处：lemo-opuscar 风格库 papercut-red（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/papercut-red/STYLE.md）；crawfordxx/paper-cut-video-skill（中文剪纸风讲解视频）；AllenAI2014/remotion-guofeng-starter（国风纸片动画）。

## 直接抄

```css
:root { --paper:#fbf6ec; --red:#d2231e; --red2:#9e1611; --gold:#d9a441; --ink:#3a2a1e; }
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&display=swap");
@property --p { syntax:"<percentage>"; inherits:false; initial-value:12.5%; }
canvas.open { --p:100%; transition: --p 1.6s steps(8, end); mask-image: conic-gradient(from -90deg, #000 var(--p), transparent 0); }
```
```js
papercut(536, 3)                       // 主窗花 8 折 16 瓣
papercut(124, 11, { folds:6, rim:false })  // 小窗花
```

## 一眼认出（不能改）

- 主视觉是对称的红色窗花（8 折 16 瓣）
- 镂空里透出真图
- 回纹边、菱形斗方编号、角花
- 白底红纸，金色只用在「选中」
- 别和「纸拼贴」混：这里只有一种红纸，而且是对称镂空

## 颜色

- 底 `#FBF6EC`，红 `#D2231E`，深红 `#9E1611`，字 `#3A2A1E`，次要 `#8A6F58`
- 金 `#D9A441`：只用于选中项
- 放心改：红的深浅；不能改：主色只能是红

## 字体

- Noto Serif SC 700 / 900；标题字间距加大（letter-spacing 4px）

## 底和纹理

- 细噪点 multiply；页面左上右上各一片四分之一角花

## 真图怎么处理

- 主图：真图放在窗花后面（sepia .35），窗花镂空透出它
- 小图：`thresholdCanvas(img, 140, 140, { cut: .55, ink: 红, paper: 底 })` 剪成红色剪影，外框用扇贝边遮罩

## 线和形

- 窗花生成器 `papercut(size, seed, { folds: 8 })`：只在一个扇区（π/8）里剪——月牙、小圆、水滴、锯齿、放射细缝——再旋转 8 次、每次镜像，得到 16 瓣对称
- 回纹：28×14 的 SVG 平铺带
- 斗方：旋转 45° 的红方块，里面的字转回来
- 扇贝边：canvas 画遮罩

## 动效

- 打开：conic 遮罩按 `steps(8)` 一扇一扇展开，1.6s（像一折一折打开）
- 挂着摆：±2.2°，5.2s 一个来回，绕顶上的红线转
- 文字：像剪刀剪出来，clip-path `steps(10)` 从左往右
- 斗方：转一圈弹进来
- 播放时小窗花慢慢转

## 组件

- 主按钮：小窗花 + 中间白字「听」
- 主卡：挂在红线上的大窗花 + 左侧斗方编号 + 居中标题
- 列表：斗方编号 + 标题（重点字红色） + 扇贝边剪影小图；行间红色虚线
- 底栏：上沿一条回纹，当前项下面一个小菱形

## 换到别的东西上

- 网页：首屏一个大窗花，滚动时旋转、再打开下一个
- 视频：窗花展开当转场；声音用剪刀声、轻快的唢呐或二胡、远处的鞭炮
- 海报 / 红包封面：窗花 + 一句话，最直接

## 容易做坏

- `<em>` 默认斜体，要改成正体红字
- 角花压住状态栏文字——角花控制在 90px 以内
- 红色铺太多会压抑：红只给窗花、编号、重点

## 参考实现

引擎：`Engines.papercut()`（程序剪窗花）、`cornerCut()`（角花）
页面（`gallery/s-papercut.html`）：`scallop()`（扇贝边遮罩）、回纹 SVG、打开 / 摆动动画
