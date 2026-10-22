# 装饰艺术（deco）

1930 年代 Art Deco：黑漆、金线、象牙白；光芒放射、阶梯拱门、八角形徽章、灯泡跑马灯；一切围绕中轴对称，从中间向两边展开。

出处：lemo-opuscar 风格库 art-deco（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/art-deco/STYLE.md）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Limelight&family=Poiret+One&family=ZCOOL+QingKe+HuangYou&family=Noto+Serif+SC:wght@500;700;900&display=swap");
@property --fan { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
:root { --ivory:#f5eedc; --ivory2:#ece2c8; --ink:#15120d; --gold:#b38a35; --gold-hi:#ecd08a; --gold-lo:#8a6421; --mute:#6b604c; }
.gold { background: linear-gradient(100deg,var(--gold-lo) 0%,var(--gold) 22%,var(--gold-hi) 42%,#fff6d8 50%,var(--gold-hi) 58%,var(--gold) 78%,var(--gold-lo) 100%); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: sheen 5s linear infinite; }
@keyframes sheen { from { background-position: 120% 0; } to { background-position: -130% 0; } }   /* 金字扫光 */
.burst { border-radius: 240px 240px 0 0; background: repeating-conic-gradient(from -90deg at 50% 100%, rgba(179,138,53,.55) 0 2.2deg, transparent 2.2deg 7.5deg);
  mask: conic-gradient(from calc(-1 * var(--fan) / 2) at 50% 100%, #000 var(--fan), transparent 0); --fan: 180deg; }   /* 光芒，--fan 从 0 开到 180° */
.arch { --steps: polygon(0% 100%,0% 24%,9% 24%,9% 14%,21% 14%,21% 6%,35% 6%,35% 0%,65% 0%,65% 6%,79% 6%,79% 14%,91% 14%,91% 24%,100% 24%,100% 100%); clip-path: var(--steps); background: linear-gradient(160deg,var(--gold-hi),var(--gold) 40%,var(--gold-lo)); padding: 3px; }  /* 阶梯拱门：金边→黑边→图，三层同一个形 */
.oct { clip-path: polygon(30% 0,70% 0,100% 30%,100% 70%,70% 100%,30% 100%,0 70%,0 30%); background: var(--ink); color: var(--gold-hi); font-family: Limelight; }
.bulbs i { width:5px; height:5px; border-radius:50%; background:#ffe7a6; animation: chase .9s steps(1) infinite; animation-delay: calc(var(--k) * -.3s); }   /* --k = i % 3 */
@keyframes chase { 0% { opacity:1; box-shadow: 0 0 6px 2px rgba(255,214,120,.8); } 33% { opacity:.22; box-shadow:none; } }
.rule b { border-top: 3px double var(--gold); }
```

```js
// 金色双色调：亮度 → 黑 / 暗金 / 亮金 / 象牙 四段插值
const stops = [[0, [21, 18, 13]], [.42, [110, 80, 30]], [.72, [210, 172, 92]], [1, [250, 240, 214]]];
// 一切从中轴展开：clip-path inset(0 50% 0 50%) → inset(0 0 0 0)
el.animate([{ clipPath: "inset(0 50% 0 50%)" }, { clipPath: "inset(0 0% 0 0%)" }], { duration: 1100, easing: "cubic-bezier(.22,.8,.2,1)", fill: "backwards" });
```

## 一眼认出（不能改）

- 黑 + 金 + 象牙三色，金是带高光的金属渐变，会扫光
- 母题当结构用：光芒做背景、阶梯拱门做图框、八角形做编号、双线做分隔
- 中轴对称；所有出场从中间向两边展开
- 灯泡跑马灯（三相追逐）
- 罗马数字编号（No. I、II…VIII）

## 颜色

- 浅色版（默认）：象牙 `#F5EEDC` 底，黑 `#15120D` 块，金 `#B38A35`（高光 `#ECD08A`、暗 `#8A6421`）
- 深色版照出处原版：暖黑漆底 + 金线 + 象牙字；可加一个宝石色（祖母绿、酒红）给主角

## 字体

- 拉丁标题：Limelight；数字、小字：Poiret One（字距拉开）
- 中文标题：站酷庆科黄油体（ZCOOL QingKe HuangYou，几何感）；正文 Noto Serif SC

## 真图怎么处理

- 金色双色调：按亮度映射到 黑 → 暗金 → 亮金 → 象牙（对比度拉高 1.25）
- 放进阶梯拱门（金边 3px + 黑边 3px），定时扫过一道斜光（screen 混合）

## 动效

- 入场：报头金字从中间拉开；光芒扇面从 0° 开到 180°；拱门从底边升起；金色双线从菱形往两边画；列表每条从中轴展开
- 常驻：灯泡三相追逐；金字扫光；图上斜光
- 点「收听」：扇形图标摆动，灯泡追逐加速
- 动作机械、稳：缓入缓出，不弹

## 组件

- 报头：黑底 + 内金框 + 上下两排灯泡 + 金字刊名 + 罗马日期
- 头条：No. I + 光芒 + 阶梯拱门图 + 居中标题 + 双线菱形 + 三栏数字（金竖线分隔）+ 黑色尖头按钮（带金扇）
- 列表：八角形罗马编号 + 标题 + 阶梯形热度条（窄上宽下）
- 底栏：黑底金字，选中项上方一个金色小三角

## 换到别的东西上

- 网页：酒店、珠宝、颁奖、周年庆、高端活动邀请
- 视频：灯泡一盏盏亮、金线跟着音乐画出来、对称开门转场；人物 12fps 逐格
- 海报：天然合适

## 容易做坏

- 金是平的单色，像土黄
- 东西偏离中轴
- 加了花和曲线（那是新艺术，不是装饰艺术）
- 动作弹跳、飘

## 参考实现

页面（`gallery/s-deco.html`）：`.gold` / `.burst` / `.arch` / `.oct` / `.bulbs`、`goldTone()`、`zig()` 阶梯热度条
