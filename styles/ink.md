# 水墨（ink）

宣纸、墨分几色、墨滴落下慢慢晕开，一方红印压住画面。

出处：WY（@akokoi1）用代码做的水墨动画《小蝌蚪找妈妈》（https://x.com/akokoi1/status/2102699703309898026）；lemo-opuscar 风格库 ink-wash（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/ink-wash/STYLE.md）。

## 直接抄

```css
:root { --paper:#f3eee2; --ink:#161514; --ink2:#5d5a54; --ink3:#9a958b; --seal:#c3322b; }
@import url("https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@500;600;900&display=swap");
em { font-style:normal; text-emphasis: filled dot var(--seal); text-emphasis-position: under right; }
```
```js
inkCanvas(img, W, H, { levels:5, blur:3, soft:3 })   // 墨色分层
// 晕开 2.2~2.6s；字洇出 opacity + blur(7px→0) 1.4~1.6s；印章 scale 2.2→1 0.38s
```

## 一眼认出（不能改）

- 宣纸底，有纤维
- 图是墨色分层的，边缘晕开、没有硬边
- 红色只出现在印章、着重号、当前项的小圆点
- 书法字做大标题，编号用汉字大写（壹贰叁）
- 别和「线稿」混：线稿是线，水墨是面和晕

## 颜色

- 纸 `#F3EEE2`，浓墨 `#161514`，淡墨 `#5D5A54`，更淡 `#9A958B`
- 朱砂 `#C3322B`：印章、着重号、圆点，别的地方不许用
- 放心改：纸色冷暖；不能改：除朱砂外没有彩色

## 字体

- 大标题、编号：马善政 Ma Shan Zheng（Google Fonts）
- 正文、小标题：Noto Serif SC 500 / 600 / 900
- 日期可以竖排（writing-mode: vertical-rl）

## 底和纹理

- 纸纤维：canvas 画几百条淡色短弧线当背景图；再叠一层细噪点 multiply

## 真图怎么处理

- `inkCanvas(img, w, h, { levels: 5, blur: 3, soft: 3 })`：灰度分 5 层墨色，模糊一次再叠一层原图，边缘自然晕
- 出场用「墨滴晕开」：每帧画一个带噪声边界的放射渐变当遮罩，半径从 0 长到全图，2.2～2.6s，缓出
- 头图上下边缘渐隐、出血到屏幕边；小图四周椭圆渐隐（round）

## 线和形

- 笔触：两头细中间粗的多边形（`Engines.brushPath()`）+ 飞白滤镜（feTurbulence `0.012 0.55` 拉成横向条纹，再当 alpha 遮罩）
- 圆相：一笔画的圆，起笔重收笔轻（`Engines.ensoPath()`），当播放按钮
- 印章：红底白字方块，内圈一道白线 + 一道红线，加轻微毛边滤镜
- 着重号：`text-emphasis: filled dot #C3322B; text-emphasis-position: under`

## 动效

- 节奏慢：所有东西 1～2.6 秒
- 字：从 7px 模糊洇出来（opacity + blur，1.4～1.6s）
- 印章：先放大 2.2 倍斜着，再「盖」下去，0.38s，带一点回弹
- 笔触分隔线：遮罩从左往右扫，1.1s
- 圆相：conic 遮罩一圈画出，1.6s；播放时慢慢转
- 不用弹簧、不用快速闪动

## 组件

- 主按钮：圆相 + 中间一个书法字「听 / 停」
- 主卡：无框，水墨图出血；右侧竖排「第壹」红框章
- 列表：汉字大写编号 + 标题 + 一行淡墨摘要 + 晕开的小图；行间用细飞白
- 底栏：只有字，当前项下面一个朱砂圆点

## 换到别的东西上

- 网页：首屏一张大幅水墨，滚动时一处处晕开；竖排标题放在右侧
- 视频：慢推、慢摇，墨滴晕开当转场；声音用古琴或箫、水滴、毛笔划纸声
- 海报：大留白 + 一处晕染 + 一方印

## 容易做坏

- 亮色封面转墨太淡——gamma 调到 1.2～1.4
- 用灰色按钮、灰色卡片会变成「灰色界面」，不是水墨
- 朱砂用多了像节日风

## 参考实现

引擎：`Engines.inkBloom()`（墨滴晕开）、`brushPath()`（笔触）、`ensoPath()`（圆相）
页面（`gallery/s-ink.html`）：`#dry` 飞白滤镜和 `#rough` 毛边滤镜（SVG，直接抄）、盖章动画
