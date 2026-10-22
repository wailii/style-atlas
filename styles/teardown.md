# 产品拆解（teardown）

把界面当成一件产品拆开：卡片的每一层（底板、图片、标题、编号、玻璃罩）沿一根轴浮起来，层间距均匀；细引线从层上的点拉到旁边，标着真实数字；镜头一直绕着慢慢转。像硬件发布会的爆炸图。

出处：lemo-opuscar 风格库 teardown（Exploded Teardown，https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/teardown/STYLE.md）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --bg1:#f1f2f4; --bg2:#d9dce1; --ink:#15171b; --mute:#6a707a; --acc:#ff5b1f; }
.app { background: linear-gradient(var(--bg1) 0%, #e8eaed 46%, var(--bg2) 100%); }       /* 浅色无缝影棚 */
.stage { perspective: 1100px; perspective-origin: 40% 30%; }
.rig { transform-style: preserve-3d; transform: rotateX(var(--rx,56deg)) rotateZ(var(--rz,-32deg)); }
.L { position:absolute; inset:0; transform-style: preserve-3d; transform: translateZ(var(--z,0px)); border-radius: 14px; }
.L.mid { outline: 1px dashed rgba(21,23,27,.3); outline-offset:-1px; background: rgba(250,251,252,.5); }  /* 中间层是半透明整板 */
.L .dot { position:absolute; width:6px; height:6px; margin:-3px; border-radius:50%; background: var(--acc); box-shadow: 0 0 0 3px rgba(255,91,31,.22); }
.lab { border-left: 2px solid var(--ink); padding-left: 8px; font-size: 11px; }
.lab b { display:block; font-family: "JetBrains Mono"; font-size: 13px; }               /* 数字永远等宽 */
.shadow { border-radius:50%; background: radial-gradient(rgba(20,25,35,.35), transparent 70%); filter: blur(4px); }
```

```js
// 每层一根弹簧追目标高度（拆开 = 各自 z，合上 = i*2），层与层错开 120ms 出发
for (let s = 0; s < 4; s++) { const a = -170 * (l.cur - l.target) - 18 * l.v; l.v += a / 240; l.cur += l.v / 240; }
layer.style.setProperty("--z", l.cur.toFixed(2) + "px");
// 镜头慢转
rig.style.setProperty("--rz", (-32 + Math.sin(t * .35) * 8) + "deg"); rig.style.setProperty("--rx", (56 + Math.sin(t * .27) * 4) + "deg");
// 引线：每帧读层上锚点的屏幕坐标 → 折线连到右侧标签（锚点会跟着 3D 走）
const r = dot.getBoundingClientRect(); d += `M${x} ${y} L${lx - 18} ${ly} L${lx} ${ly} `;
```

## 一眼认出（不能改）

- 一根轴上的爆炸图：层与层平行、间距均匀、保持原来的朝向
- 数字长在物体上：橙点 + 细黑引线 + 右侧标签（数字等宽、名字、一行规格）
- 中间层是半透明整板 + 虚线轮廓，看得出叠在哪
- 镜头一直在动（慢慢绕），不停住
- 底下一团软接触阴影，物体是全场最亮的

## 颜色

- 影棚渐变 `#F1F2F4 → #D9DCE1`；墨 `#15171B`；规格灰 `#6A707A`
- 唯一强调色：测量橙 `#FF5B1F`（锚点、编号块）
- 出处原版是深石墨影棚 `#34363A → #0D0E10` + 暖白字；这里默认浅色，深色版照原版

## 字体

- 名字：Inter / Noto Sans SC 500~800
- 数字、规格、P/N：JetBrains Mono

## 真图怎么处理

- 原图不改，作为「封面层」浮在中间；数字写它的真实尺寸（960 × 540 · jpg）
- 标签只写真东西：标题字数、摘要字数、来源数、热度；不编参数

## 动效

- 入场：先合着，0.8s 后一层层弹开（错开 120ms），标签从右滑进来
- 常驻：镜头 rotateZ ±8°、rotateX ±4° 慢绕；引线每帧重算
- 点「合上 / 拆开」：弹簧收回或再拆
- 列表小图标是小号的层叠图，点开时各层上浮

## 组件

- 顶栏：标题 + 「TEARDOWN · 日期 · 头条卡片 5 层」等宽小字 + 黑色「合上 / 拆开」按钮
- 舞台：3D 爆炸图 + 引线 + 标签
- 规格条：三格白卡（热度 / 来源 / 参与），等宽大数字
- 物料清单（BOM）：其余条目，P/N 编号 + 层叠小图标 + 热度
- 底栏：白色半透明，选中图标变橙

## 换到别的东西上

- 网页：硬件、SaaS 架构、产品功能讲解（「这个卡片由什么组成」）
- 视频：原版就是视频语法——镜头一路穿过各层，宏观到微观
- PPT：一页一个爆炸图

## 容易做坏

- 层的内容只占板子一角，透视下和别的层撞在一起（每层要画成整板）
- 间距不均、朝向乱
- 标签编数字
- 镜头停住，变成静态插图

## 参考实现

页面（`gallery/s-teardown.html`）：`LAYERS` 表（名字、数字、高度、锚点）、`frame()` 弹簧 + 引线循环、`isoIcon()` 层叠小图标
