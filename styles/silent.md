# 默片（silent）

1920 年代默片放映出来的样子：泛黄的银盐拷贝在闪、在晃、有划痕和灰尘；画面是雕版线描；字都写在黑底装饰边框的字幕卡上；伴奏是一台钢琴。

出处：lemo-opuscar 风格库 silent-film（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/silent-film/STYLE.md）。

## 直接抄

```css
:root { --silver:#d8cfbe; --ink:#1e1a15; --ink2:#5a5046; --card:#14110d; --cream:#efe6d2; --velvet:#7a1e22; }
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@700;900&family=Old+Standard+TT:ital,wght@0,400;1,400&family=Noto+Serif+SC:wght@500;700;900&display=swap");
.ui { translate: var(--wx) var(--wy); filter: brightness(var(--fl)) sepia(.28) contrast(1.04); }  /* 每 1/24 秒随机 --fl 0.95~1.03、--wx/--wy ±0.6px */
.iris { width:0; height:0; border-radius:50%; box-shadow: 0 0 0 200vmax #0d0b09; }               /* 光圈：宽高从 0 涨到 220vmax，steps(16) */
```

## 一眼认出（不能改）

- 整屏是一张放映出来的拷贝：亮度闪、画面晃、竖划痕、灰尘点、四角暗
- 图是雕版线描（灰度分几层 + 墨线 + 排线），只有灰和一点棕
- 标题在黑底字幕卡上，边框是装饰艺术的双线、阶梯角、小扇子
- 开场和换页用光圈（中间一个圆洞变大 / 变小）
- 顶上一道红丝绒幕帘

## 颜色

- 银灰底 `#D8CFBE`，墨 `#1E1A15`；字幕卡黑 `#14110D` + 奶白字 `#EFE6D2`
- 整体 sepia 0.2～0.35；唯一的彩色是幕帘的红丝绒

## 字体

- 标题：Playfair Display SC（小型大写）+ Noto Serif SC 900
- 旁白、说明：Old Standard TT 斜体
- 编号用罗马数字 I、II、III

## 真图怎么处理

- `posterCanvas` 用 5 级灰调色板分层 + `sketchCanvas` 描墨线叠上去（页面里的 `engraved()`）
- 放进圆角取景框（内阴影 + 边缘烧焦的棕色）

## 动效

- 两种速度：人物和镜头按 16 帧/秒（`steps`）；颗粒、闪烁、晃动、划痕每 1/24 秒变
- 光圈开场 1.1s，`steps(16)`
- 字幕卡用光圈开出来
- 钢琴伴奏：琴键按 8 帧/秒随机按下

## 组件

- 主按钮：一排小琴键 +「钢琴伴奏」
- 主卡：取景框里的雕版图 + 字幕卡（「第 一 幕」+ 标题 + 斜体说明）+ 首行缩进的摘要
- 列表：双线框条目，罗马数字编号，雕版小图（没图写「无 影 像」）
- 底栏：上面一道双线；当前项黑底奶白字；切换时光圈合上再打开

## 换到别的东西上

- 网页：整页一张拷贝；章节标题都是字幕卡
- 视频：照 lemo 规格——4:3 画框在幕布中间、人物 16 帧、字幕卡代替对白、钢琴伴奏 + 放映机声
- 海报：字幕卡本身就是一张海报

## 容易做坏

- 光圈用 clip-path 圆形缩放方向会反——用「圆洞 + 巨大投影」
- 只加 sepia 滤镜不做线描，会像普通复古滤镜
- 字幕卡每张字太多

## 参考实现

页面（`gallery/s-silent.html`）：`engraved()`（雕版线描）、`deco()`（装饰边框 SVG）、24 帧放映循环（颗粒 / 闪 / 晃 / 划痕 / 灰尘）、光圈、钢琴键
