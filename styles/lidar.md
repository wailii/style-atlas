# 点云测绘（lidar）

图片变成一团会转的 3D 点云，激光扫过的地方才出现；周围是测绘框、角标和不停跳的读数。

出处：lemo-opuscar 风格库 lidar-survey（「实证影像」分类，https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/lidar-survey/STYLE.md）。

## 直接抄

```css
:root { --bg:#f3f5f7; --ink:#1f2a37; --mute:#6b7685; --grid:#e2e7ec; --acc:#0ea5e9; }
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.app { background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px); background-size: 24px 24px; }
```
```js
// 高程色带
RAMP = [[48,63,160],[24,160,220],[40,190,140],[240,200,40],[230,70,50]]
```

## 一眼认出（不能改）

- 主视觉是点云（几千个小点），按高度从蓝到红上色
- 激光扫描线揭开点云
- 取景框四角的角标 + 读数（SCAN、PTS、YAW）
- 等宽字体、细线框、方格纸底
- 我们用亮底（原版多是黑底）

## 颜色

- 浅灰底 + 24px 方格；字深灰蓝；强调青 `#0EA5E9`
- 点的颜色只来自高程色带

## 字体

- JetBrains Mono 500 / 700（所有数据和标签）+ Noto Sans SC

## 真图怎么处理

- `cloudFrom(img, 120, 68)`：图片横竖坐标当 x、y，暗度当高度 z（做过亮度拉伸），按 z 取色
- `renderCloud(ctx, W, H, pts, { yaw, pitch, scale, zs, reveal, size })`：绕竖轴转 yaw，按深度排序后画 1.25px 小方点
- 没图的：把线条图标画到 64×64、模糊一下当高度图

## 动效

- 激光：1.8s 从左扫到右，扫过的点出现，扫描线是青色细线 + 一条淡青光带
- 之后整团 yaw = sin(t × 0.35) × 0.62 来回转
- 读数（YAW）每帧更新
- 文字：clip-path `steps(12)` 从左往右揭开
- 列表小图：错开启动，各自来回转

## 组件

- 主按钮：雷达图标 + 字，播放时扫描针转
- 主卡：带角标的取景框 + 点云 + 读数，下面标题、摘要、三格表格
- 列表：每行一个小取景框（转动的点云）+ 「SCAN #02」+ 标题 + 「Z=447 · SRC 9」；选中描青边
- 底栏：细线图标，当前项青色

## 换到别的东西上

- 网页：首屏一个可拖动的点云；滚动时切片平面扫过
- 视频：无人机式环绕、切片、测量标注；声音用扫描仪的哔哔声、伺服电机、低频铺底
- 适合：科研、地图、汽车、硬件、工程

## 容易做坏

- 点太多会卡：主图 ≤ 1 万点，小图 ≤ 1500 点
- 不排序深度，前后点会乱
- 读数写成编造的经纬度——只显示真实数据换算出来的数

## 参考实现

引擎：`Engines.cloudFrom()`、`cloudFromPath()`、`renderCloud()`、`elevationColor()`
页面（`gallery/s-lidar.html`）：扫描循环、读数
