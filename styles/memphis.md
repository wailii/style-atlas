# 孟菲斯（memphis）

80 年代孟菲斯小组的玩具感：粗黑描边、糖果色几何碎片（波浪线、三角、圆点、锯齿）满屏乱飘，色块错位叠在图后面，黑白条纹和网格做点缀。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 44 行 Memphis Design：geometric shapes、squiggles、bold colors、playful）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@600;800;900&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --bg:#fffdf6; --ink:#1a1a1a; --pink:#ff71ce; --yel:#ffce5c; --teal:#86ccca; --blue:#6a7bb4; --red:#ff5a4e;
  --bw: repeating-linear-gradient(45deg,#1a1a1a 0 3px,transparent 3px 8px); }
.box { border: 3px solid var(--ink); }                                     /* 一切都是 3px 黑边 */
.it::after { content:""; position:absolute; inset:8px -8px -8px 8px; z-index:-1; background: var(--c); border: 3px solid var(--ink); }  /* 错位色块 */
.grid { background-image: linear-gradient(var(--ink) 2px,transparent 2px), linear-gradient(90deg,var(--ink) 2px,transparent 2px); background-size: 12px 12px; }
.stripe { background: var(--bw), #fff; border: 3px solid var(--ink); }
mark { background: linear-gradient(transparent 55%, var(--pink) 55%); color: inherit; }
```

```js
// 碎片形状（viewBox 52×34），颜色轮着用
const SHAPES = [
  (c) => `<path d="M2 12 Q8 2 14 12 T26 12 T38 12 T50 12" fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`,
  (c) => `<polygon points="4,30 18,4 32,30" fill="${c}" stroke="#1a1a1a" stroke-width="2.5"/>`,
  (c) => `<circle cx="14" cy="14" r="10" fill="${c}" stroke="#1a1a1a" stroke-width="2.5"/>`,
  (c) => `<path d="M2 20 L10 6 L18 20 L26 6 L34 20" fill="none" stroke="${c}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`,
  (c) => `<path d="M4 22 A12 12 0 0 1 28 22 Z" fill="${c}" stroke="#1a1a1a" stroke-width="2.5"/>`,
  (c) => `<path d="M14 2 V26 M2 14 H26" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`,
];
// 每块：位置 + 自转速度 + 小幅漂移；分隔线用正弦波每帧重画
b.s.style.transform = `translate(${b.x + Math.sin(t * .4 + b.ph) * 6}px,${b.y + Math.cos(t * .5 + b.ph) * 6}px) rotate(${b.r + t * b.vr}deg)`;
```

## 一眼认出（不能改）

- 3px 纯黑描边，所有块、图、按钮都有
- 糖果色几何碎片满屏，慢慢自转漂移
- 色块错位叠在内容后面（往右下偏 8~14px）
- 黑白斜条纹、黑网格、黑点阵当装饰
- 东西都有点歪（标题字块转 -4°）

## 颜色

- 底：奶白 `#FFFDF6`；黑 `#1A1A1A`
- 粉 `#FF71CE`、黄 `#FFCE5C`、青绿 `#86CCCA`、蓝紫 `#6A7BB4`、红 `#FF5A4E`，轮着用

## 字体

- Rubik 800 / 900（圆头几何无衬线）+ Noto Sans SC 900

## 真图怎么处理

- 原图不改色，3px 黑框，后面错位叠一块纯色和一角黑网格，前面压一个黄圆编号和一条黑白条纹

## 动效

- 入场：碎片从屏幕中间炸开、弹到各自位置；标题每个字块转着掉下来；主图的几层（色块、网格、图、圆、条纹）从不同方向飞进来
- 常驻：碎片自转漂移；分隔波浪线一直在游
- 列表左右交替转着落位
- 按钮：按下时三角转一下

## 组件

- 顶栏：标题「AI」放进歪着的黄色块
- 播放按钮：粉圆 + 青三角叠在一起
- 主卡：错位叠层图 + 黄圆编号 + 条纹
- 列表：白卡黑边 + 错位色块 + 几何形编号（圆、方、三角轮换）
- 底栏：选中项图标放进彩色圆

## 换到别的东西上

- 网页：活动页、潮流品牌、设计周、儿童产品；首屏满屏碎片
- 视频：碎片蹦出来、色块翻页；配合 80 年代合成器音乐
- 不适合安静阅读

## 容易做坏

- 描边细了就软，像普通插画
- 碎片太多盖住字
- 颜色发灰（要纯、要亮）
- 所有东西都对齐摆正，就没了玩具感

## 参考实现

页面（`gallery/s-memphis.html`）：`SHAPES` / `NUMSH`、`.stack` 叠层、`drift()` 循环
