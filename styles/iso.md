# 等距积木（iso）

数据堆成一座等距视角的积木城市：封面铺成地面，每条数据一座楼，积木一块块掉下来堆高。

出处：lemo-opuscar 风格库 iso-infographic 和 brick-toy（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/iso-infographic/STYLE.md）；Vib3Coded 的 Three.js 史前岛屿提示词（微缩世界的写法）。

## 直接抄

```css
:root { --bg:#eef2f6; --ink:#1d2433; --mute:#6b7487; --line:#dbe2ea; }
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
```
```js
// 方块三个面（顶 / 左 / 右）
coral ["#ff9a80","#f06a49","#d9563a"]  blue ["#7aa0ff","#4c7dff","#3a63d6"]  yellow ["#ffd76a","#ffc93c","#e0a91f"]
mint  ["#6fe0b8","#3ccb9a","#2aa77e"]  lilac ["#c4b2ff","#9d84f5","#7d64d6"]  gray ["#ffffff","#dde5ee","#c3cfdc"]
// 投影：x 往右下、y 往左下、z 往上
P(x,y,z) = [ox + (x-y)*cos30*s, oy + (x+y)*0.5*s - z*s]
BOUNCE = "cubic-bezier(.3,1.6,.5,1)"
```

## 一眼认出（不能改）

- 30° 等距投影，三个面三种明度
- 数据变成楼的高度
- 真图铺在等距地面或方块顶面上
- 积木掉落、弹一下、堆起来
- 背景是淡淡的等距网格

## 颜色

- 浅蓝灰底；方块最多 4 种强调色 + 灰白；第一名用珊瑚色

## 字体

- Space Grotesk 500～700 + Noto Sans SC 500～900

## 真图怎么处理

- 地面：SVG `<image>` 加 `transform="matrix(cos30*s, .5*s, -cos30*s, .5*s, ox, oy)"`，再用菱形 clipPath 裁
- 小图：方块顶面贴图，同一个矩阵
- 没图的：顶面画一个线条图标

## 动效

- 地面先淡入上移；每块积木从 −160px 掉下来，0.52s，BOUNCE；同一座楼每块间隔 70ms，楼与楼间隔 90ms
- 楼顶号码牌弹出后一直轻轻浮
- 点列表里一条：城市里对应那座楼跳一下
- 按钮：往下按 3px，硬投影变短

## 组件

- 主按钮：白底圆角 + 4px 硬投影 + 一个小方块图标
- 主卡：等距城市 + 标题 + 三格数据（白卡、底部 3px 硬投影）
- 列表：白卡，左边一个贴图方块；选中时投影换成该条的颜色
- 底栏：白底线条图标，当前项珊瑚色

## 换到别的东西上

- 网页：首屏一座可以拖动旋转的城市（换 Three.js 或 CSS 3D）
- 视频：镜头绕城市转、楼一座座长高；声音用木块碰撞、马林巴
- 适合：数据看板、游戏化、教育、地产

## 容易做坏

- 楼太高超出画面：按最高楼算原点
- 绘制顺序错了会穿模：按 x + y 从小到大画
- 颜色超过 4 种像儿童玩具

## 参考实现

引擎：`Engines.isoP()`、`isoCube()`、`ISO_COS` / `ISO_SIN`
页面（`gallery/s-iso.html`）：`citySVG()`（城市 + 地面贴图）、`tile()`（顶面贴图方块）
