# 时尚大片（campaign）

奢侈品牌的广告大片：一张满幅人像压住整屏，光是硬的（闪光灯直打、正午太阳），黑压得死、高光亮得刺眼；上面只有一个很宽的粗体字标，其余文字都是 9px 的极小大写。页面只有白、黑和照片，下面是严格的 6 栏网格，图与图之间留大片白。东西不是淡入的，是「闪」出来的：白场一闪，画面过曝，再落回正常。

出处：图鉴原有 60 种全是插画、版画、复古界面这类风格化画法，缺一组看起来像真照片、真光线、真镜头的风格，于是加了「写实 · 影像」组（61–70），这是其中一种。画面语法来自真实的时装广告：Juergen Teller 给 Céline 拍的机顶闪光大片（2010 年代 Phoebe Philo 时期）、Helmut Newton 的硬光黑白人像、Hedi Slimane 给 Saint Laurent / Celine 拍的黑白广告，以及这些品牌官网的排法（https://www.ysl.com 、https://www.celine.com ：满幅图 + 居中字标 + 极小说明字）。参考页里的照片全部来自 Unsplash（Unsplash License），经 Hugging Face 上的镜像数据集 `wtcherr/unsplash_5k`（https://huggingface.co/datasets/wtcherr/unsplash_5k ）取用，EXIF 来自每张图旁边的 `.json`：Cole Keister（https://unsplash.com/photos/D6zQt8NfIq4 ）、todd kent（https://unsplash.com/photos/qWdIX3I5_BY ）、Nathan Dumlao（https://unsplash.com/photos/ygk6IFQIHkk ）、Redd F（https://unsplash.com/photos/y692nLSXiaU ）、Amy Humphries（https://unsplash.com/photos/fr1RS1sUPe4 ）、Baylee Gramling（https://unsplash.com/photos/ht1JkZ7tYmY ）。这些图在页面上都标「示意图」，与新闻事件无关。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
:root { --paper: #ffffff; --ink: #000000; --mute: #8c8c8c; --m: 16px; --g: 8px; }   /* 只有这三个颜色，其余全是照片 */
/* 字标：超宽粗体 + 大字距，白字压在照片上 */
.mark { font-family: Archivo, "Noto Sans SC", sans-serif; font-weight: 800; font-stretch: 125%; font-size: 40px; letter-spacing: .2em; color: #fff; }
.mark i { font-family: "Noto Sans SC"; font-weight: 900; letter-spacing: .32em; font-style: normal; }
/* 所有说明文字只有这一种：9px、500、全大写、字距 .16em */
.t { font: 500 9px/1.45 Inter, "Noto Sans SC", sans-serif; letter-spacing: .16em; text-transform: uppercase; }
/* 标题也不大：15px（头条）/ 11.5px（列表），Noto Sans SC 500 */
.lede h1 { font: 500 15px/1.5 "Noto Sans SC", sans-serif; letter-spacing: .02em; }
/* 6 栏网格，16px 边距，8px 栏距；两张一排之后留 44px 白 */
.lede { display: grid; grid-template-columns: repeat(6, 1fr); column-gap: var(--g); padding: 16px var(--m) 30px; }
.pair { display: grid; grid-template-columns: 1fr 1fr; column-gap: var(--g); padding: 0 var(--m); margin-bottom: 44px; }
.pair .ph { aspect-ratio: 3 / 4; } .full .ph { aspect-ratio: 4 / 3; }   /* 满幅那张不留边 */
.tab.on { text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 6px; }   /* 选中只是一根下划线 */
```

```js
// 硬闪光调色（canvas 逐像素，在 gallery/s-campaign.html 的 strobeGrade）
// 1) 按焦点裁切 2) 降一点饱和（.9）或直接转黑白 3) 闪光衰减：k = 1.14 / (1 + 1.25 × r²)，r 是到主体中心的距离 / 半对角线
// 4) S 曲线：t = (v - .5) × 1.2 + .5，out = smoothstep(t) × .45 + t × .55（黑压死、白冲亮） 5) 颗粒 ±.045
strobeGrade(img, w, h, { fx, fy, cx, cy, fall: 1.25, contrast: 1.2, sat: .9, bw: false });
// 闪：白场 300ms（前 14% 全白）+ 画面 brightness(2.4) contrast(.62) → 1 用 760ms cubic-bezier(.05,.7,.2,1)；之前画面是黑的
fl.animate([{ opacity: 1 }, { opacity: 1, offset: .14 }, { opacity: 0 }], { duration: 300 });
cv.animate([{ filter: "brightness(2.4) contrast(.62)" }, { filter: "none" }], { duration: 760, easing: "cubic-bezier(.05,.7,.2,1)" });
// 字：硬切出现（visibility），每行间隔 80～90ms；不淡入、不位移
```

## 一眼认出（不能改）

- 首屏是一张**满幅真人像**，顶到状态栏，字标白字直接压在照片上
- 光是硬的：主体最亮、四周按平方反比沉下去，黑位压死，高光有一点刺眼；有细颗粒
- 只有白、黑、照片三样；没有品牌色、没有圆角、没有阴影、没有图标
- 字极小：说明字一律 9px 全大写宽字距；标题也只有 15px；唯一的大字是字标
- 严格的 6 栏网格：编号占第 1 栏、正文占 2～6 栏；图两张一排或一张满幅，交替出现，中间大片留白
- 每张图左下角写 `LOOK 02 / 08` 和「示意图 · 摄影师 / UNSPLASH」，右下角是真实 EXIF（机身 · 焦距 · 光圈 · 快门 · ISO）
- 出现方式是**闪光**：黑 → 白场一闪 → 过曝 → 落回；字是硬切出来的

## 颜色

- 纸白 `#FFFFFF`、墨黑 `#000000`、灰 `#8C8C8C`（次要说明、未选中的底栏）
- 照片之外不允许出现任何颜色；照片上的字只用纯白
- 细线只用纯黑 1px（文字索引的上下线）；不要灰线、不要卡片底色
- 一组图里可以混用彩色和黑白，但同一张图只走一种：黑白就是彻底去色

## 字体

- 字标：Archivo 800，`font-stretch: 125%`（最宽），字距 .2em；中文字标 Noto Sans SC 900，字距 .32em
- 说明：Inter 500 9px 全大写，字距 .16em；中文跟随 Noto Sans SC
- 标题：Noto Sans SC 500，头条 15px、列表 11.5px，行高 1.5
- 不用衬线、不用斜体、不加粗到 700 以上（字标除外）；数字和英文一律大写

## 真图怎么处理

- 选图：真人、硬光、姿态明确（正对镜头、侧脸、只拍腿和影子、背影），背景干净或很暗；风景、静物、笑脸自拍都不对
- 全部过 `strobeGrade`：主体中心 `cx, cy` 放在脸或身体上，闪光衰减让背景自然变暗；已经很亮的图把 `contrast` 降到 1.05～1.1、`fall` 提到 1.6，不然会白成一片
- 只拍局部的图（腿 + 影子、牵手的背影）转黑白，像 Hedi Slimane；脸部特写保留颜色
- 按 3:4（两张一排）、4:3（满幅）、整屏竖幅（首屏）裁；用 `fx, fy` 焦点裁切，别把脸切掉
- 每张都标「示意图」和摄影师，EXIF 从照片旁边的 `.json` 读，不编
- 有真的新闻封面（产品图、发布会照片）时同样过 `strobeGrade`；logo 墙这种平面图不放进大片位，改进文字索引

## 动效

- 开场：整屏黑 380ms → 首屏一闪（白场 300ms + 过曝 760ms 落回）→ 字标和角上的说明字每 90ms 硬切出一行 → 头条文字每 80ms 一行 → 下面的图每隔 360ms 补闪一张，像摄影师在连拍
- 轮播：每 2.6 秒换下一张，换的方式还是闪；没有交叉淡化、没有滑动
- 点开一张：黑底满屏，再闪一次；文字在底部硬切出现
- 不用弹簧、不用位移、不用模糊；节奏是「啪、啪、啪」的闪光灯回电间隔（0.3～0.4 秒一下）

## 组件

- 首屏大片：状态栏白字 + 居中字标 + 日期 / 「轮播」两个小字 + 左下 LOOK 编号与署名 + 右下 EXIF 两行
- 头条块：6 栏网格，第 1 栏编号、2～6 栏标题 + 一行灰色读数 + 下划线链接「查看全文」
- 两张一排：3:4 照片 + 下面一行 `LOOK 02 … 447`（编号左、热度右）+ 两行标题
- 满幅一张：4:3 出血，说明字回到 16px 边距
- 文字索引：没有图的条目用 1px 黑线隔开的行（编号 / 标题 / 热度）
- 灯箱：黑底满屏照片 + 底部说明；没有图的条目是白底纯字
- 页脚：灰色极小字写清「图片均为示意图」和全部摄影师
- 底栏：白底、灰字、选中项黑字 + 1px 下划线

## 换到别的东西上

- **网页 / 落地页**
  - 首屏 100vh 满幅大片，字标在上三分之一居中，左下 LOOK、右下 EXIF；往下是 12 栏网格（桌面 24px 边距、12px 栏距）
  - 图片节奏：满幅 → 两张一排 → 一张靠右占 7 栏、左边 5 栏只放一行小字 → 满幅；每段之间至少 120px 白
  - 滚动到哪张图，哪张图闪一下出现；导航是一行极小大写字，不要按钮
- **App**
  - 参考 `gallery/s-campaign.html`：满幅首屏 + 6 栏网格 + 文字索引 + 黑底灯箱
  - 按钮都是带下划线的小字；确认类动作也只是一行字「确认」，不做实心按钮
  - 切换页面用硬切 + 一次闪光，不用推入动画
- **Dashboard**
  - 页面白底，6 / 12 栏网格；每个模块顶上一行 9px 大写标签 + 1px 黑线
  - 大数字：Archivo 800 宽体、64～96px、纯黑，单位和对比值用 9px 大写写在右上角
  - 图表：只用黑线 1px，不填色；柱状图是细黑条（宽 2～4px），折线不画点、不画网格，只在最高点和最新点标数字；第二系列用 `#8C8C8C`
  - 表格：没有底色和竖线，行之间 1px 黑线，编号 / 名字 / 数值三栏，数值右对齐
  - 关键指标旁边可以放一张硬光人像或产品大片当「封面」，标「示意图」
- **视频**
  - 镜头：定格大片为主，每 0.4～0.8 秒换一张（跟着闪光灯回电节奏），中间穿插 2～3 秒的慢推特写（眼睛、手、影子）；最后落在字标
  - 转场：白场一帧（或两帧）+ 过曝回落；也可以直接硬切，绝不淡化
  - 声音：快门声和闪光灯回电的高频「嘀——」、低沉的合成器 bass、一段很干的电子鼓；字标出现时全部静音一拍
- **海报设计**
  - 整张满幅人像，硬光；字标横跨上方或正中，宽度占画面 70%～90%
  - 其余文字放在四个角，9～12pt 大写；不要标语、不要第二种字体
  - 系列海报：同一个光、同一个字标位置，只换人和姿势

## 容易做坏

- 拿 CSS 渐变、色块或插画代替照片——这个风格离开真人照片就不成立
- 光太软、太平（阴天、柔光箱、美颜），看着像生活照；要硬光、要有黑
- 说明字做大（12px 以上）或加粗，马上变成普通新闻 App
- 加了品牌色、圆角卡片、阴影、图标——奢侈品页面里这些全都没有
- 网格松了：编号和标题不对齐、两张图高度不一样、边距忽大忽小
- 出现方式用淡入或滑入；这里只有闪和硬切
- 把示意图当新闻现场照片用、不写摄影师、编造 EXIF

## 参考实现

- App：`gallery/s-campaign.html`——`strobeGrade()` 硬闪光调色（焦点裁切 + 闪光衰减 + S 曲线 + 颗粒）、`strobe()` 白场 + 过曝回落、`cutIn()` 硬切出字、「轮播」每 2.6 秒闪到下一张、灯箱 `open()`
- 照片：`gallery/img/real/campaign-*.jpg`，署名和 EXIF 在同名 `.json`
