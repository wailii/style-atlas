# 生活方式（lifestyle）

一本慢生活杂志：暖白纸底，窗边自然光照进来的真照片——冒热气的杯子、阳光落在木桌上、窗台的植物、傍晚的窗帘。照片过一遍胶片暖调：饱和度低一点、黑位抬起来像哑光、高光偏暖、有细细的颗粒。字是细衬线，居中，四周留很宽的边。所有东西都慢：照片像显影一样从发白里浮出来，字一行行慢慢升起。

出处：图鉴原有 60 种全是插画、版画、复古界面这类风格化画法，缺一组看起来像真照片、真光线、真镜头的风格，于是加了「写实 · 影像」组（61–70），这是其中一种。画面语法来自 Kinfolk（https://www.kinfolk.com ）为代表的「慢生活」杂志和品牌：窗光、自然材质、宽边距、细衬线、居中排版、照片说明用小号斜体；调色参照 Kodak Portra 一类人像负片扫描后的暖调和哑光黑位（参考页里有一张图本身就是 Noritsu 扫描仪扫的胶片）。参考页里的照片全部来自 Unsplash（Unsplash License），经 Hugging Face 上的镜像数据集 `wtcherr/unsplash_5k`（https://huggingface.co/datasets/wtcherr/unsplash_5k ）取用，署名和 EXIF 来自每张图旁边的 `.json`：Mink Mingle（https://unsplash.com/photos/AbcqHhW5hpk ）、Harry Tang（https://unsplash.com/photos/G1ebTFoqLlM ）、Patrick Langwallner（https://unsplash.com/photos/6aqMVsVjbGk ）、Chris Liverani（https://unsplash.com/photos/icuCJlKLOng ）、Logan Adermatt（https://unsplash.com/photos/VkF8pVVoFg0 ）、Olesia Buyar（https://unsplash.com/photos/g1jeM28bCWs ）。这些图在页面上都标「示意图」，与新闻事件无关。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Noto+Serif+SC:wght@300;400;500&display=swap");
:root { --paper: #f4f0e8; --ink: #2b2621; --mute: #8b8275; --hair: #d9d1c4; --m: 28px; }   /* 暖白纸、暖黑字、灰褐说明、浅褐细线 */
body { background: var(--paper); color: var(--ink); font-family: "Cormorant Garamond", "Noto Serif SC", serif; }
/* 刊名：细衬线、字距很大 */
.mast h1 { font-family: "Noto Serif SC", serif; font-weight: 300; font-size: 19px; letter-spacing: .5em; }
/* 说明、读数、日期：Cormorant 斜体；中文不做假斜体 */
.it { font-style: italic; font-weight: 400; font-synthesis: none; }
/* 小标签：Cormorant 500 大写、字距 .26em */
.sc { font-weight: 500; font-size: 11.5px; letter-spacing: .26em; text-transform: uppercase; }
/* 头条：居中、Noto Serif SC 400、21px、行高 1.6、断行平衡 */
.hero h2 { text-align: center; font: 400 21px/1.6 "Noto Serif SC", serif; letter-spacing: .04em; text-wrap: balance; }
/* 列表：104×128 竖图 + 20px 间距 + 浅褐 1px 分隔线，每行上下 22px */
.item { display: grid; grid-template-columns: 104px 1fr; gap: 20px; padding: 22px 0; border-top: 1px solid var(--hair); }
/* 慢：浮现 1.4s、位移只有 10px */
.rv { opacity: 0; transform: translateY(10px); transition: opacity 1.4s cubic-bezier(.25,.1,.25,1), transform 1.6s cubic-bezier(.25,.1,.25,1); }
```

```js
// 胶片暖调（canvas 逐像素，在 gallery/s-lifestyle.html 的 filmTone）
// 饱和 × .78 → 反差 × .9 → 黑位抬到 .075（哑光）、白位压 .025～.05 → 高光加暖（R +.035·L，B −.03·L）、暗部微绿（G +.01·(1−L)）
// → 颗粒 ±.05（暗部多、亮部少）→ 自身模糊 w/40 用 screen 叠 10%（窗光柔光晕）
filmTone(img, w, h, { fx, fy, sat: .78, fade: .075, warm: 1, grain: .05, bloom: .1 });
// 显影：opacity 0 + brightness(1.22) saturate(.35) blur(5px) → 正常，2.6s；首图再从 1.06 慢慢缩到 1（9s）
canvas.animate([{ opacity: 0, filter: "brightness(1.22) saturate(.35) blur(5px)" }, { opacity: 1, offset: .35 }, { opacity: 1, filter: "none" }], { duration: 2600, easing: "cubic-bezier(.25,.1,.25,1)", fill: "both" });
```

## 一眼认出（不能改）

- 暖白纸底 `#F4F0E8`，不是纯白；字是暖黑，不是纯黑
- 照片是**自然光**：窗光、侧光、逆光里的热气和灰尘；室内、植物、杯子、桌面、窗帘、安静的风景；没有人看镜头
- 胶片暖调：颜色淡一点、黑位发灰（哑光）、高光偏暖、有颗粒；不是高饱和、不是 HDR
- 细衬线：刊名字距很大，标题居中，说明和读数是小号斜体（英文、数字斜，中文正）
- 留白很宽：左右 28px 边距，头条图四周空着，段与段之间一根 36px 短线
- 照片下面有一行斜体「示意图 · 摄影 某某 / Unsplash」
- 一切都慢：照片显影 2.6 秒，字浮现 1.4 秒，位移只有 10px

## 颜色

- 纸 `#F4F0E8`、墨 `#2B2621`、灰褐 `#8B8275`（说明、日期、未选中）、细线 `#D9D1C4`、正文次要 `#5E564C`
- 照片未加载时的底 `#E7E1D6`
- 不用任何高饱和颜色；需要强调时只用墨色加粗一档（300 → 400），或者加一根短线

## 字体

- 中文：Noto Serif SC 300（刊名、摘要）/ 400（标题、正文）/ 500（很少用）
- 英文和数字：Cormorant Garamond；斜体用于说明、日期、读数、编号 `N° 02`；它自带旧式数字（高低错落），保留
- 小标签：Cormorant Garamond 500 大写，字距 .26em（`JOURNAL`、`N° 01 · 今日头条`）
- 状态栏这种需要对齐的数字用 `font-variant-numeric: lining-nums`
- 不用无衬线、不用粗体；中文绝不用假斜体（`font-synthesis: none`）

## 真图怎么处理

- 选图：有明确光源方向（窗、门、低角度太阳），画面里有一个安静的主体，背景虚；看见人也只看见手、背影或剪影
- 全部过 `filmTone`；本身已经很朦胧的图（逆光、浅景深）把 `bloom` 降到 .04，不然发虚
- 头条图横幅（约 5:4），列表图竖幅 104×128，插页图满幅出血；用 `fx, fy` 焦点裁切，把光照到的地方留在画面里
- 照片四周不加边框、不加圆角、不加阴影——纸上直接印着
- 每张都写摄影师；照片和新闻无关，标「示意图」
- 有真的新闻封面时：截图、logo 类的平面图不放大，缩成列表小图并同样过 `filmTone`；放大位只给有光的照片

## 动效

- 开场：刊名字距从 .9em 慢慢收到 .5em（2.4s），细线从中间画开（2s），首图显影（2.6s）并慢慢缩回 1（9s），文字每 170ms 一行浮上来
- 滚动：滚到哪儿，哪儿浮现，照片在这时才显影
- 点开：摘要用 `max-height` 慢慢拉开（1.2s），不弹、不闪
- 朗读：刊名下的细线从左往右走，走一分钟
- 所有缓动都是 `cubic-bezier(.25,.1,.25,1)`；没有弹簧、没有过冲、没有硬切

## 组件

- 报头：左 `JOURNAL` 小标签 / 中刊名 / 右「朗读」斜体字；下面一行斜体日期，一根浅褐细线
- 头条：横幅照片 → 斜体署名（右边可放机身和焦距）→ 居中小标签 `N° 01 · 今日头条` → 居中标题 → 一行近况 → 斜体读数
- 分隔：36px 宽、1px、半透明墨色的短线
- 列表行：竖图 + 斜体 `N° 02` + 标题 + 斜体读数；没有图的条目用大号斜体编号代替图
- 插页：满幅出血的一张窗景，下面居中的编号、标题、读数——打断列表的节奏
- 页脚：居中斜体，写清示意图和全部摄影师
- 底栏：纸底、细线、灰褐字；选中项变墨色，下面一个 3px 小圆点

## 换到别的东西上

- **网页 / 落地页**
  - 桌面版是杂志版式：最大内容宽 1080px，两边各留 12% 以上；正文栏 560px 居中
  - 节奏：满幅窗光大图 → 居中标题和引言 → 两张不等大的照片错开排 → 一段长文 → 再一张满幅；段间 160px
  - 滚动浮现 + 照片显影；导航只有一行细衬线字
- **App**
  - 参考 `gallery/s-lifestyle.html`：报头、横幅头条、竖图列表、满幅插页、细线底栏
  - 按钮是带细下划线的斜体字或 1px 细框的小方块，没有实心色块
  - 适合阅读、订阅、家居、咖啡、旅宿、书店、冥想类产品
- **Dashboard**
  - 纸底，模块之间用浅褐细线分开，不用卡片底色和阴影
  - 大数字：Cormorant Garamond 300、56～72px、旧式数字，单位和说明用小号斜体放在下面一行
  - 图表：折线用 1.25px 墨色线，面积用 8% 墨色填，网格只留底线；对比系列用 `#8B8275` 虚线；柱子是细的墨色柱，没有圆角
  - 表格：没有竖线，行高 44px 以上，数字用斜体右对齐，表头是小号大写字
  - 页面顶上可以放一张窗光照片当「当期封面」，标「示意图」
- **视频**
  - 镜头：固定机位或极慢的推轨，每个镜头 4～6 秒：窗帘被风吹动、杯子冒热气、光斑在桌面上移动、手翻一页书；全部自然光
  - 转场：慢的交叉淡化（1～1.5 秒）或者闪白一点点的曝光过渡；字幕是居中细衬线，慢慢浮现
  - 声音：环境声为主（窗外鸟叫、杯子碰桌子、翻书、远处的风），配一把木吉他或钢琴，音量很低
- **海报设计**
  - 上 2/3 一张窗光照片，下 1/3 纸底，居中细衬线标题 + 一行斜体副标题
  - 四周留白至少占画面宽的 8%；照片不出血也可以，像印在纸上的一张
  - 系列海报：同一种光、同一个时间段（清晨或傍晚），换不同的物件

## 容易做坏

- 拿 CSS 渐变、色块、插画当照片；或者照片是棚拍硬光、高饱和——那是另一个风格
- 调色过头：颗粒太粗、褪色太狠，变成廉价的「复古滤镜」；黑位抬到 .075 就够
- 纸底用纯白、字用纯黑，暖意没了；或者整页加了米黄纹理，变成仿古
- 用无衬线、用粗体、标题左对齐还很大——就成了普通资讯 App
- 动得快、动得多：弹簧、闪光、硬切都不属于这里
- 中文被浏览器做成假斜体，歪着很难看
- 把示意图当新闻照片用、不写摄影师

## 参考实现

- App：`gallery/s-lifestyle.html`——`filmTone()` 胶片暖调（降饱和 + 哑光黑位 + 暖高光 + 颗粒 + 柔光晕）、`develop()` 显影、IntersectionObserver 慢浮现、「朗读」细线进度、插页节奏
- 照片：`gallery/img/real/lifestyle-*.jpg`，署名和 EXIF 在同名 `.json`
