# 朱墨剧场（crimson）

一出夜里的舞台剧：整个世界只有朱红、纸白、墨黑三种颜色，所有明暗都用**竖着排的墨线**画出来，像漫画分镜和铜版画混在一起；真 3D 的柱子、瓶子、人物也走同一套墨线。只有「主角」（产品、被选中的那一项、关键数据）能用青、绿、黄三种风味色。画面按幕推进，幕和幕之间整张画面碎成竖条往下滴走；关键动作要用户「按住」才继续。

出处：抖音 @Motdes AI阿峰《fable 5.5 网页设计的未来？》录屏里的 *The Notturno Experience*（意大利开胃酒品牌的滚动叙事 3D 网页：红色木纹桌上伸过来的手、圆窗里的剪影、红柱大厅、三色酒瓶、倒一杯青色马天尼、漫画飞溅、柱子崩塌后出片名）。本库的完整还原是 `gallery/x-crimson.html`（虚构品牌 MEZZANOTTE，不用原品牌名和素材）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IBM+Plex+Mono:wght@500;700&family=Noto+Serif+SC:wght@600;900&display=swap");
:root {
  --crimson: #d50a0f; --wine: #7c0619; --paper: #f2eee8; --ink: #0d0a0a;   /* 世界只有这四个 */
  --cyan: #33b6ea; --lime: #5cd64a; --citron: #f2df1f;                      /* 风味色：只给主角 */
}
/* 片名、大数字：窄高反差衬线 + 墨色描边 + 实心墨影 */
.out { font-family: "Playfair Display"; font-weight: 900; color: var(--paper); -webkit-text-stroke: 3px var(--ink); paint-order: stroke fill; text-shadow: 4px 5px 0 var(--ink); transform: scaleX(.7); }
/* 纸签：白色小矩形、极小等宽大写、一点投影；说明文字只放在纸签里 */
.lab { background: var(--paper); font: 700 9.5px "IBM Plex Mono"; letter-spacing: .12em; text-transform: uppercase; padding: 7px 10px 6px; box-shadow: 0 1px 0 rgba(0,0,0,.45), 0 6px 14px rgba(0,0,0,.2); }
/* HOLD 光标：66px 白圆 + 两行 8px 黑字，按住时外圈画进度 */
.hold { width: 66px; height: 66px; border-radius: 50%; background: var(--paper); font: 700 8px/1.2 "IBM Plex Mono"; }
/* 漫画格：纸面板 + 3px 墨框 + 斜下实心墨影；格与格之间是 6px 黑缝 */
.panel { background: var(--paper); box-shadow: 0 0 0 3px var(--ink), 7px 8px 0 rgba(13,10,10,.55); }
```

```js
// 竖排线（2D）：engines.js
const { inkHatch, dripDraw } = Engines;
inkHatch(imgOrToneCanvas, w, h, { base: "#f2eee8", ink: "#0d0a0a", sp: 3.6, gain: 1.15 });   // 纸底黑线
inkHatch(img, w, h, { base: "#d50a0f", ink: "#1a0204", gain: 1.55, gamma: .8 });            // 红底暗线（圆窗里那种）
// 线宽 = smoothstep(.06, .92, 暗度) × 线距；暗度 < .4 时按 5～21px 一段随机断开成短划；暗度 > .9 直接涂满
// 每列抖动：x += (sin(y*.052 + 列*2.1)*.55 + sin(y*.011 + 列*.63)*.9) * .6
// 竖条滴落：列宽 = 线距；第 i 列位移 = p^(.55 + r_i*2.6) × 1.06 × 画面高（r_i 是每列固定随机数）
dripDraw(ctx, src, 1 - eased, { dir: -1, fill: "#0d0a0a" });   // 进场：从上面落回原位
dripDraw(ctx, src, eased, { dir: 1, fill: "#f2eee8" });         // 退场：往下滴走，露出下一幕的底色
```

```glsl
// 3D：材质只输出「底色 rgb + 明度 a」（灯光固定在相机左上方），后期着色器统一把明度换成竖排线
gl_FragColor = vec4(base, clamp(lambert * tone * (1. - fog), 0., 1.));
// 后期：ink = 1 - smoothstep(w - aa, w + aa, 到线中心的距离)，w 同上；墨色 = 底色亮就用 --ink，否则用 底色 × .13
// 描边：线性深度的二阶差分 / 深度 > .035～.09 → 墨线；底色突变 > .22～.5 → 墨线
// 完整代码：gallery/x-crimson.html 里的 FS 和 post
```

## 一眼认出（不能改）

- 只有朱红、纸白、墨黑；暗的地方不是变灰，是竖线变粗、变密，最暗处涂满
- 线是**竖的**、有手抖、亮处断成短划——整张画面统一方向，3D 物体、照片、背景都一样
- 风味色（青 / 绿 / 黄）只出现在主角身上：酒瓶、被选中的一项、三类数据；绝不当装饰色
- 漫画式特写：瞪大的眼睛、伸过来的手、窗里的剪影；描边是墨线
- 幕间转场：整张画面碎成竖条往下滴走，下一幕从上面落回来
- 说明文字只在白色纸签里（极小等宽大写 + 一行中文）；右上角固定一个 `EXPERIENCE 01 / 08` 章节签
- 关键动作是「按住」：白色圆形光标写着 HOLD / CHOOSE FLAVOR / HOLD A POUR，按住时外圈走进度
- 片名、大数字是窄高反差衬线，纸白字 + 墨描边 + 实心墨影

## 颜色

- 朱红 `#D50A0F`（舞台、大面积底）；酒红 `#7C0619`（木纹、暗部底色、纸签里的中文）
- 纸白 `#F2EEE8`；墨黑 `#0D0A0A`
- 红底上的线用 `#1A0204`～`#240205`（底色 × .13），纸底上的线用墨黑
- 风味色：青 `#33B6EA`、绿 `#5CD64A`、黄 `#F2DF1F`。一个画面最多三种，各管一类东西（比如上升 = 绿、持平 = 黄、回落 = 青）
- 金色 `#C9A04E` 只给人物衣服、手镯这种小件

## 字体

- 展示：Playfair Display 900，`scaleX(.64～.75)` 压窄；描边 3px + 墨影 4–5px
- 说明：IBM Plex Mono 500/700，9～10px、全大写、字距 .12em
- 中文：Noto Serif SC 900（标题，也可以描边）/ 600（正文、纸签里的中文）
- 不要用无衬线做标题；等宽只做纸签、刻度和读数

## 真图怎么处理

- 照片、封面一律过 `inkHatch`：亮底的图（logo 墙、截图）用红底暗线并把 `gain` 提到 1.4～1.6，否则线太少；暗图用纸底黑线、`gamma: 1.3`、`lift: .05`，否则糊成一块黑
- 没有图时，把「光」画成明度画布（渐变、圆柱左右明暗、线稿图标），再排线——背景、柱子、KPI 卡片都这么来
- 3D 物体只给底色，不给贴图；明暗由灯 + 后期排线决定。要 2D 插画（眼睛、手、剪影）就画成两张画布：颜色层（平涂 + 墨线）和明度层（阴影），贴到平面上一起排线
- 圆窗：真图放进圆形里，外面一圈纸白粗环 + 内细环，像透过窗户看

## 动效

- 幕间：竖条滴落，0.75s，进场 ease-out、退场 ease-in；填空颜色按幕交替（墨 → 纸 → 墨 → 纸 → 红）
- 镜头：每幕一个慢推或慢移（5～6s 推 10%～20%），不转来转去；最后一幕可以冲进圆窗
- 纸签：从左往右擦出（clip-path inset，0.35s），离开时从左往右擦掉
- HOLD：按住 1.2～2.4s 画满外圈；松手外圈退回；完成后才往下走
- 片名：从 1.7 倍砸到 1 倍（0.45s），碎块往镜头飞（每块初速度 + 重力，确定性）
- 小东西：瞳孔随时间收缩、眨一次眼；头发、液体按 12～24 帧/秒更新（像逐帧动画），镜头和光是连续的

## 组件

- 章节签 `EXPERIENCE | 01 / 08`（右上角，第二格反色）
- 纸签说明（英文大写一行 + 中文一行酒红）
- HOLD 圆形光标 + 两颗小白点（一大一小）跟随
- 圆窗（纸白粗环 + 内环 + 3px 墨边 + 斜下墨影）
- 描边大编号 `01`；排名竖条：红底格子里描边数字
- 漫画格列表：纸面板、3px 黑缝、右侧缩略图排线；点开后缩略图重新滴落一次
- 风味色小方块 chip（1.5px 墨框 + 7px 色块 + 等宽读数）
- 底栏：墨黑底，选中项是纸签 + 红色序号

## 换到别的东西上

- **网页 / 落地页**：做成一幕一幕的滚动叙事（滚轮和按住都能推进，也有自动播放），每幕一个 3D 场景或一张大排线插画、一张纸签、最多一个 HOLD；参考 `gallery/x-crimson.html`（三维 + 墨线后期 + `seek(t)`）。没有 3D 时用 `inkHatch` 处理大图，幕间用 `dripDraw`
- **App**：红色舞台 + 圆窗主图 + 描边大编号做首屏，下面是漫画格列表；HOLD 按钮做「按住收听 / 按住确认」这类需要仪式感的动作；参考 `gallery/s-crimson.html`
- **Dashboard**：红底页面上放纸面板；面积图的面积用竖排线填，柱状图画成红色多立克柱（柱身左右明暗排线、上下有柱头柱础），环形图做成圆窗（外环风味色、中间纸白圆）；KPI 是描边大数字 + 纸签单位；表格每行一条纸条，排名在红格子里；参考 `gallery/d-crimson.html`
- **视频**：`x-crimson.html` 自带 `window.VIDEO / ready / seek(t)`，`node tools/snap.mjs --file gallery/x-crimson.html --video out.mp4 --w 1920 --h 1080 --scale 1 --fps 30` 直接出 46 秒成片。镜头语法：特写（眼睛）→ 动作（手、按住）→ 远景推进（圆窗、大厅）→ 选择 → 倒 → 漫画飞溅 → 崩塌出片名。声音：低音提琴拨弦 + 钟表滴答，按住时一声长长的弦乐渐强，滴落转场配一下黑胶划过，片名落地是石头碎裂
- **海报 / 主视觉**：整张朱红，一个排线主体（瓶、人、柱），一个圆窗，描边窄衬线大标题压在下三分之一，角落两张纸签；印刷时排线不要低于 0.25mm
- **PPT**：每页一幕；封面圆窗 + 片名，内容页是纸面板 + 纸签，数据页照 Dashboard

## 容易做坏

- 用灰色、渐变、模糊阴影表现明暗——必须是线
- 线的方向乱（斜线、交叉线）或线粗一样——像条纹壁纸，不像墨线
- 风味色当装饰撒得到处都是；或者再加一个紫、橙
- 纸签做成圆角卡片、字号变大——它是一张小纸条
- 排线太密太细，缩小后变成一片暗红：线距保持在设计稿 3.2～3.8px
- 3D 用默认 PBR 材质 + 环境光，出来是塑料感；只要「底色 + 明度」，其余交给后期
- 转场用淡入淡出——这个风格的转场只有竖条滴落和硬切
- 抄原视频的品牌名、人物、瓶子造型

## 参考实现

- 完整体验（网页 + 视频）：`gallery/x-crimson.html`——`M()` 材质、`post` 墨线后期（排线 + 描边 + 滴落 + 纸噪）、`drawEyes / drawHand / drawWood / drawOculus / drawSplash / drawTitle` 两层画布插画、`column / bottle / glass / figure` 几何、`SEGS` 分镜表、`frame(t)`
- App：`gallery/s-crimson.html`——`inkHatch` 处理封面和明度画布、`dripIn()` 滴落进场、HOLD 按住进度
- Dashboard：`gallery/d-crimson.html`——排线面积图、多立克柱柱状图、圆窗环形图、纸条表格
- 引擎：`Engines.inkHatch`、`Engines.dripDraw`（`gallery/engines.js`）
