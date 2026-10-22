# 彩色玻璃（stainedglass）

教堂的彩色玻璃窗：真图被切成一块块彩色玻璃，铅条隔开；尖拱窗框、玫瑰窗；一道阳光扫过，彩光落在地上。

出处：lemo-opuscar 风格库 stained-glass（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/stained-glass/STYLE.md）。

## 直接抄

```css
:root { --stone:#ece6da; --stone2:#ddd5c6; --lead:#22201e; --ink:#2a2622; --ruby:#b3122e; --cobalt:#1f4fa8; --emerald:#13824f; --amber:#e59a1c; --violet:#6b3fa0; --gold:#c9a14a; }
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;900&family=Noto+Serif+SC:wght@500;700;900&display=swap");
```
```js
const G = stainedGlass(img, W*2, H*2, { cell:30, lead:3.4, seed:7 });   // 头图；小图 cell 16 lead 2.2
G.reveal(-1)  // 只有铅条和暗玻璃；G.reveal(k) k 从 0 到 1 按随机顺序点亮
```

## 一眼认出（不能改）

- 玻璃块是不规则多边形（泰森多边形），之间是深色铅条
- 颜色是宝石色、发亮；太白的块换成淡色教堂玻璃
- 尖拱窗形、玫瑰窗、竖棂和横档
- 光：阳光斜扫过、地上有模糊的彩色光斑
- 石墙底

## 颜色

- 石 `#ECE6DA`，铅 `#22201E`，金 `#C9A14A`（窗框、边线）
- 宝石色：红 `#B3122E`、钴蓝 `#1F4FA8`、翠绿 `#13824F`、琥珀 `#E59A1C`、紫 `#6B3FA0`
- 文字重点用钴蓝

## 字体

- Cinzel（罗马大写、罗马数字编号）+ Noto Serif SC

## 真图怎么处理

- `Engines.stainedGlass()`：抖动网格撒种子 → 每像素归最近种子 → 每块填平均色（饱和 ×1.45、亮度 ×1.12）→ 最近与次近距离差小于 `lead` 的地方画铅条 → 块内离边越近越暗一点
- 接近白的块换成 5 种淡色教堂玻璃之一（`pale`）

## 动效

- 入场：先只有铅条和暗玻璃，2.2s 里玻璃按随机顺序一块块亮起来
- 常驻：一道柔光 9 秒扫一次；地上的彩光（玻璃画布模糊 + 透视压扁 + multiply）缓慢呼吸
- 玫瑰窗播放时慢转

## 组件

- 主按钮：小玫瑰窗（三圈扇形玻璃）+ 白字「听」
- 主卡：尖拱窗（clip-path 按尺寸生成）+ 石框 + 竖棂横档 + 地上彩光 + 罗马数字圆章 + 居中标题
- 分隔：一排小半圆 + 金线（檐口）
- 列表：罗马数字 + 标题 + 小尖窗（真图玻璃化）；点开小窗发光
- 底栏：每项一个小尖窗图标，当前项填宝石色

## 换到别的东西上

- 网页：首屏一扇大窗，滚动时光线移动
- 视频：光随时间变化、镜头沿窗缓慢上摇；声音用管风琴、合唱、回声
- 节日、文化、高端品牌页

## 容易做坏

- 浅色图直接切会整窗发白——用 `pale` 淡色玻璃
- 铅条太细像马赛克，太粗像漫画格
- 逐像素点亮动画很耗：图大时降分辨率或减时长

## 参考实现

引擎：`Engines.stainedGlass()`
页面（`gallery/s-stainedglass.html`）：尖拱 clip-path、`rose()`（玫瑰窗）、彩光地面、光束
