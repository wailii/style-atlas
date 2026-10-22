# 博物版画（engraving）

19 世纪博物图谱的铜版画：色调全靠线——一组斜线铺半调，交叉一组压阴影，再一组短点压最暗；线随暗度变粗变细，两头收尖。刻完再手工上一层淡水彩，颜色会溢出线外。编号圆圈、局部放大圆图、「Plate I.」和 del. / sculp. 落款。

出处：lemo-opuscar 风格库 engraving（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/engraving/STYLE.md），语法学自 Haeckel、Audubon 和大英百科的铜版插图。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&family=Noto+Serif+SC:wght@500;700;900&display=swap");
:root { --paper:#f3ecdc; --ink:#1d1a16; --ink2:#5a5246; --rule:#3a342c; }
.plate { box-shadow: inset 1px 1px 0 rgba(255,255,255,.7), inset -1px -1px 0 rgba(90,70,40,.25), 0 0 0 1px rgba(90,70,40,.18), 2px 2px 0 rgba(255,255,255,.6); }   /* 版痕 */
.fig { border: 1px solid var(--rule); outline: 1px solid var(--rule); outline-offset: 3px; }   /* 双线框 */
.wash { mix-blend-mode: multiply; opacity: .55; }  .ink { /* 线永远在颜色上面 */ }
@property --wr { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
.wash { mask: radial-gradient(circle at 30% 40%, #000 var(--wr), transparent calc(var(--wr) + 18%)); }   /* 上色从一处晕开 */
.tab.on::before { content: "☞ "; }   /* 指示手 */
```

```js
// 三组线：角度、间距、起刻暗度、粗细系数、最粗
const FAMS = [{ a: -35, sp: 5, t: .14, k: 4.4, max: 3 }, { a: 28, sp: 5.5, t: .4, k: 3.8, max: 2.6 }, { a: 82, sp: 4.2, t: .68, k: 4.8, max: 2.4, dash: true }];
// 沿每条线每 1.5px 采一次暗度 D = (1-亮度)^0.9，线宽 = (D - t) × k；按线宽分桶进 Path2D，一桶 stroke 一次
// 轮廓：亮度梯度 > .32 的地方隔点打一个 1px 点
// 上色：原图缩到 26×15，blur 10px、降饱和、偏暖，正片叠底铺在线下面
```

## 一眼认出（不能改）

- 没有灰色填充，深浅全是线的疏密和粗细
- 线两头收尖、中间鼓；三组方向
- 颜色是刻完才上的淡水彩，溢出线外，线在颜色上面
- 版式：「Plate I.」、编号圆圈、局部放大圆图、罗马字标题 + 斜体说明、del. / sculp. 落款
- 版痕（纸上凹下去的一圈）+ 双线框

## 颜色

- 纸 `#F3ECDC`；墨 `#1D1A16`；说明 `#5A5246`
- 水彩来自原图本身，降饱和、偏暖、半透明

## 字体

- IM Fell English（老式罗马体，斜体做说明）+ IM Fell English SC（小型大写做 Plate、目录）
- 中文 Noto Serif SC

## 真图怎么处理

- 只刻原图中间 60%，形体够大，线才刻得出形状（小图标、小字刻出来是糊的）
- 局部放大：在主图里找细节最多的两块，裁出来单独刻，标「局部 ×N」（N 是算出来的真实放大倍数）

## 动效

- 刻版：三组线依次刻上去（每帧 5 条），然后刻轮廓点；再刻两个局部
- 上色：从左上晕开 1.6s
- 编号圆圈最后弹出来
- 动作慢、安静

## 组件

- 图版：小标题 / Plate I. / Fig. 1 + 主图（双线框、编号圈）+ 两个圆形局部 + 标题 + 斜体说明 + 落款 + 「朗读此页」双线按钮
- 图版目录：Pl. II 小型大写 + 标题 + 热度，点开看摘要
- 底栏：衬线字，选中项前面一个指示手 ☞

## 换到别的东西上

- 网页：博物馆、自然科普、百科、出版、老品牌
- 视频：原版语法——刻刀一刀刀刻、印一张样、局部放大、颜色最后到
- 海报、书封

## 容易做坏

- 用灰色填充或棕褐滤镜冒充版画
- 线宽一样，像矢量图
- 刻太小的东西，一片糊
- 颜色盖住了线

## 参考实现

页面（`gallery/s-engraving.html`）：`FAMS` / `engraveJobs()`、`washCanvas()`、`busiestTwo()`、`runJobs()` 分帧刻
