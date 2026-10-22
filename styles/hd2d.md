# HD-2D（hd2d）

像素小人站在有光有雾的立体小镇里：远处房子虚、近处地砖实、告示牌和小人清楚；灯笼发光、光柱斜照、光点飘；底下一个 JRPG 对话框逐字打出今天的头条。

出处：lemo-opuscar 风格库 hd-2d（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/hd-2d/STYLE.md），语法学自《八方旅人》。「HD-2D」是 Square Enix 的用语和商标，只拿来描述风格，成片里不要用作标题或品牌。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Noto+Serif+SC:wght@500;700;900&display=swap");
:root { --cream:#fbf4e4; --navy:#23305c; --navy2:#121a36; --gold:#c9a24a; --gold-hi:#f3d98e; }
canvas, .px { image-rendering: pixelated; }
.scene { position: relative; overflow: hidden; perspective: 380px; perspective-origin: 50% 36%; background: linear-gradient(#f8d9a6 0%,#fbe8c4 34%,#f4dcb0 52%); }
.far { filter: blur(2px); }                                                         /* 远景虚 */
.ground, .ground2 { position:absolute; left:-420px; right:-420px; bottom:-40px; height:760px; transform-origin: 50% 100%; transform: rotateX(76deg); background-size: 54px 54px; }
.ground2 { filter: blur(3px); mask: linear-gradient(#000 0%,#000 30%,transparent 62%); }  /* 同一块地叠一份虚的，只留远处 = 移轴 */
.spr { position:absolute; transform: translate(-50%,-100%); }                      /* 精灵按脚底定位 */
.spr::after { content:""; position:absolute; left:50%; bottom:-5px; width:120%; height:10px; margin-left:-60%; border-radius:50%; background: rgba(60,35,10,.38); filter: blur(2px); z-index:-1; }
.hero { animation: bob .9s steps(1) infinite; } @keyframes bob { 50% { transform: translate(-50%, calc(-100% - 3px)); } }  /* 精灵逐格 */
.glow { border-radius:50%; background: radial-gradient(rgba(255,214,120,.95), rgba(255,170,60,.35) 30%, transparent 66%); mix-blend-mode: screen; animation: flick 2.6s infinite; }
.ray { background: linear-gradient(rgba(255,244,214,0), rgba(255,244,214,.55) 30%, rgba(255,244,214,0) 85%); mix-blend-mode: screen; filter: blur(6px); }
.dlg { background: linear-gradient(rgba(28,38,78,.92), rgba(14,20,46,.94)); border-radius: 6px; box-shadow: 0 0 0 1px var(--gold), 0 0 0 3px rgba(14,20,46,.9), 0 0 0 4px rgba(201,162,74,.6); color: #f6efdc; }
```

```js
const { pxText, sprite } = Engines;
// 精灵：字符画 + 调色板；告示牌：pixelCanvas(封面, 78, 44, WARM, .12)；牌匾：pxText("号外 · 今日头条")
const hero = sprite(HERO, { k: "#2a2238", h: "#8a4f2a", s: "#f2c9a0", e: "#2a2238", c: "#3b5ba8", b: "#e0a63a", p: "#4a3a5a", o: "#3a2a20" }, 4);
// 对焦：一开始近处虚、远处清，1.4s 内焦点拉到告示牌
focus.animate([{ filter: "blur(6px)" }, { filter: "blur(0px)" }], { duration: 1400, delay: 300, fill: "backwards" });
far.animate([{ filter: "blur(0px)" }, { filter: "blur(2px)" }], { duration: 1400, delay: 300, fill: "backwards" });
// 对话框 steps(4) 弹开，然后 38ms 一个字打出来
```

## 一眼认出（不能改）

- 精灵是平的、低分辨率、逐格动（2 帧呼吸）；镜头、光、光点、对焦是平滑的
- 立体小镇：远景房子虚、地砖透视、近处清楚——移轴模型感
- 实际光源：灯笼发光闪烁、光柱斜照、暖色光池
- 前景（顶上枝叶）也虚，框住画面
- JRPG 对话框：深色半透明板 + 金细边 + 名牌 + 逐字打出 + 闪烁的 ▼

## 颜色

- 两种温度：大面积暖奶油的日光 + 小块更暖的灯光（`#FFD678`）
- 场景暗处用暖墨 `#2A2238`，不用纯黑
- 小人穿全场唯一的饱和蓝 `#3B5BA8`，远景里也能一眼找到
- UI：一种金属（金 `#C9A24A`）+ 一种纸白；页面其余部分奶油底 `#FBF4E4` + 藏青 `#23305C`

## 字体

- Cinzel（铭文大写衬线，英文标签）+ Noto Serif SC 700 / 900
- 场景里的字（牌匾）用 `pxText` 点阵字

## 真图怎么处理

- 封面做成告示牌上的像素海报：`pixelCanvas(img, 78, 44, WARM, .12)`，16 色暖调板 + 抖动
- 列表小图同样像素化（22×22）；没图的用 `pxIcon` 点阵线稿

## 动效

- 入场：镜头从 1.12 倍推回 1；对焦从远处拉到近处；对话框 steps(4) 弹开，标题逐字打出
- 常驻：小人 2 帧呼吸；灯笼闪；光柱明暗呼吸；22 个光点往上飘
- 点列表任一条：像素箭头逐格跳过去，告示牌换成那一条的像素图，对话框重新打字
- 点告示牌：换下一条

## 组件

- 场景：远景小镇（随机像素房子 + 亮窗）、透视地砖、告示牌（牌匾 + 像素海报 + 两根柱子）、小人、路灯
- 对话框：名牌「号外 · 01」+ 标题 + 来源热度一行 + ▼
- 列表「今日热点 · QUEST LOG」：奶油底藏青双框，像素小图 + 标题 + HP 条一样的热度条，左边像素箭头指着当前项
- 底栏：奶油底，选中图标发金光

## 换到别的东西上

- 网页：游戏、城市导览、文旅、故事型落地页；首屏是一块小镇场景
- 视频：原版语法——高机位慢推、移轴、灯光闪烁、对话框配音逐字出
- 不适合信息密集的工具页

## 容易做坏

- 精灵也平滑插值移动（必须逐格）
- 全部清楚，没有景深，就成了普通像素游戏
- 灯光不闪、没有光点，场景是死的
- 用纯黑做暗部

## 参考实现

页面（`gallery/s-hd2d.html`）：`townCanvas()` / `cobbleURL()` / `LEAF()`、`HERO` / `LAMP` / `CUR` 精灵、`say()` 逐字、`posterOf()` 像素海报
