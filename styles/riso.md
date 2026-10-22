# 孔版印刷（riso）

只有蓝和荧光粉两种油墨，叠在一起变紫；粉版总是没完全对准，纸上有颗粒和漏墨白点。

出处：YIAN6557/eian-riso-broll（324★，Risograph 风信息动画 skill）；lemo-opuscar 风格库 risograph（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/risograph/STYLE.md）。

## 直接抄

```css
:root { --paper:#f5f0e4; --blue:#0078bf; --pink:#ff48b0; --mx:0px; --my:0px; }
@import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=ZCOOL+QingKe+HuangYou&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.B { mix-blend-mode: multiply; }                                              /* 蓝版 */
.P { mix-blend-mode: multiply; translate: var(--mx) var(--my); }              /* 粉版，整体错位 */
.dbl::after { content: attr(data-t); color: var(--pink); mix-blend-mode: multiply; translate: calc(var(--mx) + 2px) calc(var(--my) + 1px); }
```
```js
BLUE = (r,g,b) => 1 - r/255    // 网角 15°
PINK = (r,g,b) => (1 - g/255) * .9  // 网角 75°；网点 4.4px（头图）/ 3.2px（小图）
// 套准：从 (10,-6) 按 e^(-3.2t)·cos 晃 2.2s 到 (1.6,1)，之后 ±0.7px 浮动
```

## 一眼认出（不能改）

- 只有两种墨：蓝 + 荧光粉，重叠处是紫（multiply 叠出来，不是单独的紫色）
- 粉版整体错位 1～3px（套印不准）
- 照片是两版网点叠出来的
- 粗大的海报字，标题字带粉色错位重影
- 纸颗粒 + 白色漏墨点，墨块边缘不齐

## 颜色

- 纸 `#F5F0E4`，蓝墨 `#0078BF`，粉墨 `#FF48B0`
- 所有蓝色元素 `mix-blend-mode: multiply`，所有粉色元素 multiply + `translate: var(--mx) var(--my)`
- 放心改：两种墨换成另外两种 riso 标准色（如 黄 `#FFE800`、绿 `#00A95C`、橙 `#FF6C2F`）；不能改：只能两种（最多三种）

## 字体

- 海报字：站酷庆科黄油体 ZCOOL QingKe HuangYou
- 编号、大数字：Archivo Black
- 正文：Noto Sans SC 500 / 700 / 900

## 底和纹理

- 噪点 0.16 multiply（每 125ms 换个位置）+ 白色小点 screen（漏墨）
- 大面积墨块（照片、底栏、小图）用随手画的不齐边遮罩

## 真图怎么处理

- 分两版：蓝版密度 = 1 − R/255，网角 15°；粉版密度 = (1 − G/255) × 0.9，网角 75°；算网点半径前密度再取 1.1 次方（`riso()` 里的 gamma）；头图网点 4.4px、小图 3.2px
- 图里有必须看清的小字或小图标（比如 App 截图）：网点大小不变，把那一块单独裁出来放大再分版，作为第二张图摆在旁边
- 两张 canvas 叠放，粉版那张也跟着错位

## 线和形

- 重点词下面垫一块粉色（单独元素，放在文字后面；文字本身 multiply，叠出紫色）
- 热度条：粉色圆点阵（radial-gradient 平铺），往右渐淡
- 分隔线：蓝色点线

## 动效

- 进场像印两遍：先过蓝版，一条蓝色滚筒从上往下走，走过的地方出现蓝色元素；0.83s 后再过粉版
- 粉版落下时错位 (10px, −6px)，按衰减余弦晃 2.2s 才套到 (1.6, 1)
- 之后版子轻轻浮动 ±0.7px；颗粒 8 帧/秒换
- 点击：蓝章 `steps(3)` 盖下去；按钮压一下

## 组件

- 主按钮：粉墨胶囊 + 蓝字；播放时粉色点阵圈往外扩
- 主卡：双色网点头图 + 粉色大编号压在图上 + 蓝色标题 + 粉色重点块 + 大数字和点阵条
- 列表：粉色编号 + 蓝色标题 + 粉点阵热度 + 双色网点小图（没图就用纯色墨块 + 大字）
- 底栏：蓝墨带，当前项垫一块粉（叠成紫）

## 换到别的东西上

- 网页：海报式首屏；鼠标移动时粉版跟着偏一点
- 视频：两版各自运动、偶尔对不准；声音用孔版机的咚咚声、走纸声、lo-fi 鼓机
- 海报：最合适，直接按两版出图

## 容易做坏

- z-index、clip-path、mask 都会建新的混合组，里面的 multiply 只和组内叠——重点色块要做成文字的兄弟元素放后面，不要用文字自己的 ::before
- 想加颜色渐变：不行，一种墨的深浅只能靠网点疏密。透明度往一边淡出（比如点阵条、滚筒尾巴）可以
- 第三种墨一加就俗

## 参考实现

引擎：`Engines.risoPlate()`（分版网点）、`riso()`（叠两版）
页面（`gallery/s-riso.html`）：`pass()`（印两遍）、`setReg()` 错位、重点粉块的计算
