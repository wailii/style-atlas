# 蓝图（blueprint）

晒图纸：普鲁士蓝底、白色细线、网格、尺寸线和引线编号，角上一个标题栏，零件明细表。

出处：lemo-opuscar 风格库 blueprint（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/blueprint/STYLE.md）。

## 直接抄

```css
:root { --blue:#1d4f91; --line:#e8f1ff; --dim:rgba(232,241,255,.55); --faint:rgba(232,241,255,.14); --hi:#ffd166; }
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.app { background-color: var(--blue); background-image: linear-gradient(var(--faint) 1px, transparent 1px), linear-gradient(90deg, var(--faint) 1px, transparent 1px), linear-gradient(rgba(232,241,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,241,255,.06) 1px, transparent 1px); background-size: 60px 60px, 60px 60px, 12px 12px, 12px 12px; }
```

## 一眼认出（不能改）

- 蓝底白线，大小两级网格；外圈一道图框
- 尺寸线（两头箭头 + 界线 + 数字）和圆圈编号引线
- 图纸角上的标题栏（项目名称 / 图号 / 比例 / 日期）
- 列表是零件明细表（序号 / 名称 / 数量 / 图样）
- 一道纸的折痕

## 颜色

- 蓝 `#1D4F91`，线和字 `#E8F1FF`（三档：实、55%、14%）
- 唯一的另一色：黄 `#FFD166` 给十字准星和选中项（像红铅笔批注）

## 字体

- IBM Plex Mono（数字、标签）+ Noto Sans SC 400～700

## 真图怎么处理

- `sketchCanvas(img, w, h, { ink: "#e8f1ff", gain: 3 })` 白线描图 + 一圈细框
- 出场用从左往右的线性擦开（像描图）

## 线和形

- `dimLine()`：尺寸线、界线、箭头、数字（竖向时数字转 90°）
- `leader()`：圆点 → 斜线 → 圆圈编号
- 剖切符号 A—A
- 热度画成一条尺寸线，长度按热度

## 动效

- 线一笔笔画出来（stroke-dashoffset，每条间隔 40ms）
- 文字随后淡入
- 一个黄色十字准星在图上几个点之间移动，像在一处处量
- 明细表一行行从左往右擦出

## 组件

- 头部：标题栏表格（播放键放在一格里）
- 主卡：描线图 + 尺寸线 + 引线编号 + 剖切符号 + 标注 + 标题 + 热度尺寸线
- 列表：明细表；点开一行打斜线剖面线，序号变黄
- 底栏：表格格子，当前项反白

## 换到别的东西上

- 网页：产品、硬件、工程类官网的「结构图」首屏
- 视频：线一条条画出来、镜头在图上平移、局部放大；声音用铅笔划纸、尺子、安静的电子音
- 海报 / PPT：讲原理、讲结构的页

## 容易做坏

- SVG 文字默认黑色，在蓝底上看不见——每个 svg 的 text 都要设 fill
- 线太多、太粗就成了网格背景
- 用真的照片不描线

## 参考实现

页面（`gallery/s-blueprint.html`）：`dimLine()`、`leader()`、`trace()`、十字准星循环
