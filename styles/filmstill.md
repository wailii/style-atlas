# 电影剧照（filmstill）

每张图都像从一部电影里截下来的一格：2.39:1 宽银幕，上下是真黑边；画面走橙青调色（暗部偏青、肤色和灯偏橙、其它颜色被压掉），有胶片颗粒和高光边上一圈橙红的光晕（halation），字幕烧在画面里，旁边是时码和镜头参数。页面本身就是放映厅：近黑的底，只有画面在亮。

出处：图鉴原有 60 种全是插画、版画、复古界面这类风格化画法，缺一组看起来像真照片、真光线、真镜头的风格，于是加了「写实 · 影像」组（61–70），这是其中一种。画面语法来自真实的剧照库和调色习惯：剧照检索网站 ShotDeck（https://shotdeck.com ）和 FILMGRAB（https://film-grab.com ）——画面下方一行镜头 / 画幅 / 光线元数据；好莱坞大片常见的橙青（teal & orange）调色；CineStill 800T（https://cinestillfilm.com ）这类去掉防光晕层的电影卷在灯和高光边上出的红橙光晕；烧录字幕的白字黑描边。参考页的照片全部来自 Unsplash（Unsplash License），经 Hugging Face 上的镜像数据集 `wtcherr/unsplash_5k`（https://huggingface.co/datasets/wtcherr/unsplash_5k ）取用，EXIF 来自每张图旁边的 `.json`：Suhyeon Choi（https://unsplash.com/photos/cBUt6EeWf3I ）、LOGAN WEAVER（https://unsplash.com/photos/RiD-wabAD3E ）、Christian Allard（https://unsplash.com/photos/0gmYLADpIzA ）、felipepelaquim（https://unsplash.com/photos/RFkdK8pFsKE ）、Cole Keister（https://unsplash.com/photos/VNVYpIZn9xQ ）、MontyLov（https://unsplash.com/photos/PoamIEgMV74 ）。这些图在页面上都标「示意图」，与新闻事件无关。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@500;700&display=swap");
:root { --black: #050505; --paper: #e9e4da; --dim: #8d877d; --rule: #26231f; --amber: #e2a052; --sub: #f3efe4; }
/* 画面：只有 2.39:1，黑边就是页面底色 */
.frame { position: relative; width: 100%; aspect-ratio: 2.39 / 1; overflow: hidden; background: #000; }
/* 烧录字幕：白字、黑细描边 + 软投影，最多两行，均衡断行 */
.sub { position: absolute; left: 4%; right: 4%; bottom: 7.5%; text-align: center; font: 500 13px/1.42 "Noto Sans SC"; color: #f3efe4;
  text-shadow: 0 0 1px #000, 0 0 2px #000, 0 1px 2px rgba(0,0,0,.9), 0 0 8px rgba(0,0,0,.55); }
.sub span { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; text-wrap: balance; }
/* 会动的颗粒：一张 256px 灰底噪点，overlay 叠在画面上，每 1/24 秒换位置 */
.grain { position: absolute; inset: 0; mix-blend-mode: overlay; opacity: .22; background-size: 256px 256px; }
/* 场记读数：等宽小字、宽字距、大写 */
.slate { font: 400 9.5px/1 "IBM Plex Mono"; letter-spacing: .14em; text-transform: uppercase; color: #8d877d; }
```

```js
// 调色（canvas 逐像素，gallery/s-filmstill.html 的 grade）
// 1) 亮度 S 曲线并稍压暗：Lc = (L + (smoothstep(L) - L) × .8) ^ 1.12
// 2) 橙青挤压：色度 c = rgb - L 投影到橙轴 a（(1,.56,.26) 去亮度后归一），c' = a·proj × 1.32 + (c - a·proj) × .3
// 3) 分离色调：t = smoothstep(.04,.7,Lc)，tone = (t - .42) × .36，亮部那一半再 × .5；rgb = Lc + c' + a × tone
// 4) 胶片黑：r,g,b 分别 + .012 / .03 / .036（黑里带青），高光 > .8 柔肩
// 5) 光晕：亮度 > .74 的部分染成 (1, .36, .16)，blur 4 / 10 / 22px 三层 screen 叠回
// 6) 暗角 multiply；7) 烘一层团状颗粒（1/1.5 分辨率高斯噪点 overlay，.4）
grade(img, w * 2, h * 2, [焦点x, 焦点y], 曝光 = 1);
// 时码：从打开页面起按 24 格/秒走 HH:MM:SS:FF，暂停就停
```

## 一眼认出（不能改）

- 画面一律 2.39:1，上下是真黑边；页面是近黑 `#050505`，没有卡片、没有圆角
- 橙青：暗部偏青、灯和皮肤偏橙，其它颜色被压掉；黑不是死黑，带一点青
- 高光边上一圈橙红光晕（灯、火、亮窗）；画面上有会动的颗粒和暗角
- 字幕烧在画面里：白字黑边、居中、最多两行；没有图的条目是一张「黑场字幕卡」
- 画面上方一行场记：`01 / 08 · 2.39 : 1` + 跳动的时码 `TC 00:00:05:19`；下方一行 `示意图 · 摄影 X / Unsplash` + 真实 EXIF
- 文字是放映厅里的字：衬线标题、等宽读数，只有琥珀色一个强调

## 颜色

- 底 `#050505`，分隔线 `#26231F`，正文 `#E9E4DA`，次要 `#8D877D`，摘要 `#A8A296`
- 字幕 `#F3EFE4`；强调只有琥珀 `#E2A052`（列表编号、底栏选中下划线）；录制点 `#C8321F`
- 颜色都在照片里，照片走橙青；界面上不再加别的颜色

## 字体

- 标题：Noto Serif SC 700（头条 21px、列表 15.5px），像片名
- 字幕：Noto Sans SC 500，13～14px，白字黑描边
- 读数（场记、时码、EXIF、热度）：IBM Plex Mono 400/500，9.5～12px，大写，字距 .04～.22em
- 刊头「AI 热点」Noto Serif SC 700 字距 .22em，下面一行等宽小字 `STILLS · 10.22 · REEL 1`

## 真图怎么处理

- 选图：夜景、雨、窗、车里、火光、剪影、荒漠远景——有明确光源和大块暗部的；白底、平光、产品图不对
- 一律过 `grade()`：按焦点裁成 2.39:1（`[x, y]` 指向人脸或光源），偏亮的图把曝光降到 .8～.88，不然高光会发奶油色
- 光晕只在真正的高光上出（阈值 .74），大面积亮窗会整片发红——阈值别往下调
- 颗粒两层：一层烘进图里（静止），一层 overlay 每格换位置（动）；颗粒要细，看得见但不能像沙子
- 每张图标「示意图 · 摄影 X / Unsplash」+ 原图 EXIF（没有就写「EXIF 未记录」），不编镜头参数
- 新闻没有合适的图时不硬配：做成黑场字幕卡（黑画面 + 居中字幕）

## 动效

- 开场：先全黑，头图从黑里淡出（1.6s），遮幅从 16:9 收成 2.39:1（1.1s），再**硬切**出字幕（字幕从不淡入）
- 头图一直慢推：24 秒推 8%、往左移 1.5%，来回
- 颗粒每 1/24 秒换位置；时码按 24 格/秒走；场记的红点每秒闪一次
- 列表剧照依次从黑里淡出（间隔 160ms），字幕晚 400ms 硬切出现
- 点一条：字幕硬切成下一句（摘要第一句），下面展开摘要；暂停时颗粒、时码、推镜一起停

## 组件

- 刊头：衬线「AI 热点」+ 等宽场记小字；右边两个细框按钮：`CC`（字幕开关，关掉加删除线）和「放映中 / 已暂停」
- 场记条：左 `● 01 / 08 · 2.39 : 1`，右 `TC 时码`
- 头图：满宽 2.39:1 + 烧录字幕；下面两行等宽小字（署名、EXIF）；再下面衬线标题、两行摘要、三个读数（热度 / 来源 / 参与）
- 列表剧照：2.39:1 画面 + 字幕 → 署名 / EXIF → 琥珀编号 + 衬线标题 + 等宽读数
- 黑场字幕卡：黑画面 + 1px 暗边 + 居中字幕，读数里写「黑场字幕卡 · 无配图」
- 底栏：黑底、灰图标 + 字，选中项亮起并加一根琥珀下划线
- 片尾：`— END OF REEL 1 —`

## 换到别的东西上

- **网页 / 落地页**
  - 首屏 100vw 宽的 2.39:1 画面（桌面上下自然出黑边），烧录字幕就是标语；滚动一屏换一个「镜头」，镜头之间硬切或黑场
  - 左上片名、右上时码和 `REEL` 号；底部一行等宽镜头参数
  - 导航用等宽小字；按钮是细框，不填色
- **App**
  - 参考 `gallery/s-filmstill.html`：黑底剧照流、CC / 放映按钮、点一条字幕换下一句
  - 播放器、播客、影评、长读文章最合适；确认类动作用「放映 / 暂停」这种细框按钮
- **Dashboard**
  - 黑底，每个模块像一格剧照：2.39:1 的框，左上等宽标签，右上时码式更新时间
  - 大数字：Noto Serif SC 700 的白字，单位和环比写成等宽小字；变化用琥珀色，不用红绿
  - 图表：折线是 1.5px 的暖白线，下面填一层青到黑的渐隐；柱状图是暖白细柱，最新一根琥珀色；网格线 `#26231F`
  - 表格：没有底色，行间 `#26231F` 细线，数值等宽右对齐；可以给每行一个缩略剧照
  - 关键告警做成字幕条：画面底部白字黑边，一句话
- **视频**
  - 镜头：全片 2.39:1；慢推、慢摇为主，一个镜头 3～6 秒；插几个特写（手、火、窗外的灯）
  - 转场：硬切和黑场（6～12 帧黑）；片名用衬线白字，在黑场上淡入淡出
  - 字幕烧在画面里；底层颗粒每帧变化；声音：低频铺底（雨、城市、空调声）+ 远处的人声，转场时一声低沉的鼓或弦
- **海报设计**
  - 一格 2.39:1 剧照放在画面中间偏上，上下大片黑；剧照底部一行字幕当标语
  - 片名衬线白字，下面一行等宽小字写演职员式的信息（这里写来源、日期）；不加别的颜色

## 容易做坏

- 用 CSS 渐变假装橙青、用滤镜 `sepia` 一类整体染色——要逐像素按亮度和色度调
- 橙青调过头：皮肤变荧光橙、天空变青绿色；高光整片发奶油色（光晕阈值调低了）
- 颗粒太粗太亮像沙子，或者完全静止
- 字幕淡入、加底色条、用花哨字体；或者三行以上
- 画面不是 2.39:1（16:9、圆角卡片），黑边用灰色
- 编时码和镜头参数：时码只走真实播放时间，EXIF 只用原图里的
- 把示意图当新闻现场，或不写摄影师

## 参考实现

- App：`gallery/s-filmstill.html`——`grade()` 橙青调色 + 光晕 + 暗角 + 颗粒、`grainTile()` 灰底噪点、`tc()` 24 格时码、遮幅收拢入场、字幕硬切、CC / 放映控制
- 照片：`gallery/img/real/filmstill-*.jpg`，署名和 EXIF 在同名 `.json`
