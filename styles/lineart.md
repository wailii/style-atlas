# 线稿（lineart）

白纸黑线，像一页随手画的笔记；线画完以后还在轻轻抖，像逐帧手绘的动画。

出处：WY（@akokoi1）「中华五千年」一句话线稿动画提示词（https://x.com/akokoi1/status/2102584165220962502）；JohnHeibel/ClaudeAnimationBase（p5.js + 笔刷库的手绘动画套件）。

## 直接抄

```css
:root { --paper:#faf8f2; --ink:#1e1d1a; --pencil:#7b776d; --hl:#ffe04a; }
@import url("https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/lxgwwenkaigbscreen.css"); /* LXGW WenKai Screen */
@import url("https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap");
```
```js
// rough.js：gallery/vendor/rough.js；每个形状三版，140ms 轮换
opt = { stroke:"#1e1d1a", strokeWidth:1.5, roughness:1.1, bowing:1.2 }
sketchCanvas(img, w*2, h*2, { gain:3.4 })            // 头图
sketchCanvas(img, 152, 128, { gain:2.2, hatch:false, soft:2.5 })  // 小图
```

## 一眼认出（不能改）

- 所有边框、分隔、图标都是手画的线，不是直线和圆角矩形
- 线会「抖」：每 0.14 秒换一版手画线（三版轮换）
- 照片也变成钢笔线稿
- 重点用黄色荧光笔划，当前项用手画圈圈出来
- 别和「白板讲解」混：白板是马克笔粗线 + 讲解者的手；这里是细钢笔线 + 纸张

## 颜色

- 纸 `#FAF8F2`，墨 `#1E1D1A`，铅笔灰 `#7B776D`（次要文字、分隔线）
- 唯一的颜色是荧光黄 `#FFE04A`，只用在「划重点」，用斜排线填，不要实心块
- 放心改：纸的暖冷、荧光笔换成粉或绿；不能改：只有一种彩色

## 字体

- 中文全部用霞鹜文楷屏幕版：`https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/lxgwwenkaigbscreen.css`，family `LXGW WenKai Screen`
- 编号、时间、拉丁数字：Caveat 600/700（Google Fonts）
- 标题 23～34px，正文 13～15px，不加粗（文楷只有常规体）

## 底和纹理

- 纸面叠一层细噪点（`grainURL(180, 0.07, 60)`，multiply）

## 真图怎么处理

- `sketchCanvas(img, w*2, h*2, { gain: 3.4 })`：Sobel 描边 + 暗部排线，透明底黑墨
- 小图：`{ gain: 2.2, hatch: false, soft: 2.5 }`，先缩小去噪再描
- 出场用遮罩从左往右擦出来（mask-position 1.6s），像笔在纸上走

## 线和形

- 用 rough.js（`gallery/vendor/rough.js`）画：rectangle / ellipse / line / path，roughness 1.1～1.8，bowing 1.2～3
- 每个形状画三版（不同 seed），叠在一个 `<g>` 里，按 `body[data-f]` 轮流显示
- 画布上的图（线稿照片）用三个 feTurbulence + feDisplacementMap（scale 2.2）滤镜轮换，一起抖

## 动效

- 节奏：8 帧/秒左右的抖线（140ms 换版），其余入场用顺滑缓动
- 线：stroke-dashoffset 一笔笔画出来，画完再开始抖
- 字：淡入 + 上移 6px，0.7s
- 荧光笔：斜排线从左往右刷上去，0.6s
- 不动的：正文文字不抖（抖文字读不了）

## 组件

- 按钮：手画胶囊 + 手画小图标；按下后旁边长出一段手画声波
- 主卡：手画方框，左下角压一个手画圈的大号编号
- 列表：每行下面一条手画波浪线（铅笔灰）；点开时编号被圈起来，标题重点被荧光笔刷
- 底栏：手画图标；当前项外面画一个圈，切换时圈重新画
- 数据小图：手画折线（rough linearPath）

## 换到别的东西上

- App：参考页就是
- 网页：首屏放一张大线稿图，滚动时一段段画出来；鼠标悬停的卡片边框重画一次
- 视频：讲解片最合适；画面按 8～12 帧/秒「两拍一画」；声音用铅笔沙沙声、翻纸声、轻松的尤克里里或口哨
- 海报：保留抖动的手画线、荧光笔划痕

## 容易做坏

- 字体没加载完就量尺寸，荧光笔会对不上字——等 `document.fonts.ready` 再画
- 小图直接描会满屏噪点——先缩小再描（soft）
- rough.js 的实心填充没法「一笔笔画出来」，填色用 hachure / zigzag
- 抖动加在大段文字上会看不清

## 参考实现

引擎：`Engines.sketchy()`（三版手画线 + 画出来，需要 `gallery/vendor/rough.js`）
页面（`gallery/s-lineart.html`）：`highlight()`（荧光笔）、`ring()`（底栏画圈）、三个抖动滤镜 `#b0/#b1/#b2`、140ms 的 data-f 计时器
