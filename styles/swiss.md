# 瑞士排版（swiss）

六栏网格、巨大的红色编号、黑白照片、左对齐，所有东西沿着网格快速滑进来。

出处：lemo-opuscar 风格库 swiss-motion（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/swiss-motion/STYLE.md）；bangtutorial/bang-motion（674★，动态排版 skill）。

## 直接抄

```css
:root { --bg:#f3f3ef; --ink:#111; --red:#e3241b; --g:#dcdcd5; --mute:#77776f; }
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800;900&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
.big { font-weight:900; font-size:148px; letter-spacing:-.08em; color: var(--red); }
.shot img { filter: grayscale(1) contrast(1.35) brightness(1.05); }
```
```js
EASE = "cubic-bezier(.7,0,.2,1)"   // 0.52s；文字从 translateX(-102%) 滑入，行间隔 60~90ms
```

## 一眼认出（不能改）

- 看得见的网格（6 栏细线），一切对齐网格
- 巨大的数字，紧字距
- 黑白高对比照片
- 一种红，左对齐、不居中，没有圆角
- 动作只走水平或竖直，快、利落

## 颜色

- 底 `#F3F3EF`，黑 `#111`，红 `#E3241B`，网格线 `#DCDCD5`，次要 `#77776F`
- 放心改：红换成品牌色；不能改：只有一个彩色

## 字体

- 拉丁和数字：Inter Tight 800 / 900；中文：Noto Sans SC 500 / 700 / 900
- 大编号 148px，字距 −0.08em；标题 27px 900，字距 −0.02em
- 小标签 11px 800，字距 0.1em
- 摘要用两栏（`columns: 2`）

## 真图怎么处理

- `filter: grayscale(1) contrast(1.35) brightness(1.05)`，裁进网格的一个模块
- 出场用百叶窗：7 条横条依次收起

## 线和形

- 横线：粗 2px 分区、细 1px 分行
- 红色热度条 3px，宽度按热度
- 选中：整行反白（黑底）
- 按钮：红色正圆；播放时外圈一圈沿路径排的字在转

## 动效

- 缓动 `cubic-bezier(.7,0,.2,1)`，0.52s
- 字在溢出隐藏的框里从 translateX(−102%) 滑进来，按行错开 60～90ms
- 网格线先从上往下画出来
- 编号像计数器一样滚到位；数字从 0 数上去（0.7s）
- 列表行 clip-path 从左往右擦出，红条再长出来

## 组件

- 主按钮：红色圆 + 白色「听」
- 主卡：左三栏大编号、右三栏黑白图、下面两栏摘要、三格数据（热度红色）
- 列表：表格行（编号 | 标题 | 热度右对齐），每行下面红色热度条
- 底栏：只有字，当前项前面一个红色小方块

## 换到别的东西上

- 网页：宽屏用 12 栏；首屏是一张网格海报；滚动时数字计数
- 视频：只做水平 / 竖直运动和硬切；声音用干净的打击乐、咔嗒声
- PPT：每页一个巨大数字 + 一句话

## 容易做坏

- 网格线压在正文上——网格线保持很淡，或进场后淡到 0.5
- 居中对齐、圆角卡片、阴影都会让它不像瑞士
- 第二种彩色

## 参考实现

`gallery/s-swiss.html`：`slide()`（沿栏滑入）、编号滚动、百叶窗
