# 落到不同媒介

每份风格规格分成两层：和媒介无关的（底、颜色、字体、真图处理、线和形、动效节奏），和媒介有关的（版式、交互、时长、声音）。换媒介时前一层原样搬，后一层按下面改。

## App（手机）

- 尺寸按 390×844 设计，状态栏 40px、底栏留 22～24px 安全区。参考页就是这个尺寸。
- 结构：头部（标题 + 一个主按钮）→ 主卡 → 列表 → 底栏。风格的「招牌动作」放在主卡和主按钮上，列表用这个风格最省力的写法，别每行都炫。
- 进场动画总时长控制在 2.5 秒内，之后只留一两个常驻小动作（抖线、浮动、颗粒、浪）。
- 每个能点的地方都要有这个风格自己的反馈（盖章、压扁回弹、一顿、反白），不要统一用变灰。
- 打包成安卓 App 时：参考页是纯 HTML/JS，可以直接装进 WebView（AIHOT、爸妈健康都是这么做的）；Google Fonts 要换成本地字体文件。

## 网页

- 同一套颜色和字体，字号整体放大 1.2～1.5 倍；主卡变成整屏首屏。
- 版式加宽：手机的「主卡 + 列表」在桌面上变成「首屏 + 2～3 栏网格」；瑞士排版、构成主义这类本来就靠网格和斜线的，宽屏更好看。
- 鼠标悬停是新增的反馈位：用风格自己的动作（抖线圈一下、网点加深、玻璃折射跟着鼠标走）。
- 滚动驱动：进场动画改成「滚到哪、哪块进场」（IntersectionObserver 或 CSS scroll-timeline），参考页的列表已经这么写了。
- 一屏里最多一个持续动的大东西（浪、点云、透镜），别处安静。
- 桌面首屏起步尺寸（1440×900）：左右边距 64～80px；左文右图约 5:7；主标题 96～140px（风格的大字体），副标题 20～24px，正文 16～18px；主视觉高度占屏幕 70%～85%；底部一排 3 个要点。宽屏（1920）等比放大，不改比例。

## 视频（宣传片、讲解片、短视频）

参考实现：`gallery/v-collage.html`（纸拼贴，12 秒 1080×1920，标准帧在 `gallery/shots/v-collage-*.png`）。别的风格做视频照它的骨架改。

### 页面约定

- 页面暴露三样东西：
  - `window.VIDEO = { width, height, duration, fps }`
  - `window.ready`：一个 Promise，字体、图片、贴图都准备好后 resolve
  - `window.seek(t)`：t 是秒；准备好之前调用会返回 `window.ready`，之后同步画好这一帧
- 每一帧只由 t 决定：不用 CSS transition / animation、WAAPI、setTimeout、setInterval，也不靠上一帧留下的状态。动画全写成「帧号 → 样式」的函数。
- 随机：贴图（噪点、纤维）用 `seeded(种子, () => grainURL(...))` 生成；位置抖动用 `rnd()` 或 `Engines.jitterAt()`。不要在 seek 里调 `Math.random`。
- 定格类风格（线稿、纸拼贴、窗花、像素、City Pop、间谍片头）：`f = Engines.frameAt(t, 12)`，画面每 1/12 秒变一次；按 24 或 30 帧取样渲染即可。顺滑类（极简变形、液态玻璃、数学讲解、立体书、等距积木）：直接用 t 算，渲染 30 或 60 帧。
- 自检：同一个 t 截两次必须一模一样（先 seek 别的 t 再回来也一样）。

### 尺寸

- 规格里的像素值（字号、网点大小、撕边幅度、抖动幅度）都是 390 宽手机设计空间的值。
- 竖屏 1080×1920：在 432×768 的舞台上按规格原样排版，整体 `transform: scale(2.5)`；横屏 1920×1080：768×432 舞台 × 2.5。
- 需要读元素尺寸的引擎（`halftoneCutout`、`riso`、`makeGlass`、`inkBloom`）读的是布局尺寸，放大前后都对；嫌放大后网点发软，给 `halftoneCutout` 传 `scale: 5`。
- 竖屏底部留 12% 给平台按钮和字幕，主要内容别放进去。

### 字体和素材

- 视频渲染时字体最好放本地（`@font-face` 指向本地 woff2）；用 Google Fonts 就用 `document.fonts.load()` 按实际要用的字预加载，失败重试几次。
- 图片和页面同源（截图工具会自动起本地服务）。

### 最小骨架

```html
<div id="stage" style="width:432px;height:768px;transform-origin:0 0"></div>
<script src="data.js"></script><script src="common.js"></script><script src="engines.js"></script>
<script>
const { frameAt, dropAt, jitterAt } = Engines;
const FPS = 12, DUR = 12;
window.VIDEO = { width: 1080, height: 1920, duration: DUR, fps: FPS };
let READY = false, apply = null;
window.seek = (t) => (READY ? apply(t) : window.ready.then(() => apply(t)));
window.ready = (async () => {
  await fontsReady();
  const stage = document.getElementById("stage");
  stage.innerHTML = `<div class="card">…</div>`;          // 先把所有元素一次建好
  const card = stage.querySelector(".card");
  apply = (t) => {
    const f = frameAt(t, FPS);
    const d = dropAt(f, 6, { dur: 6, y: -40, r: -6 });       // 第 6 帧开始落下，6 帧到位
    const j = d.done ? jitterAt(f, 0) : { tx: 0, ty: 0, rot: 0 };
    card.style.visibility = d.visible ? "" : "hidden";
    card.style.translate = `${d.tx + j.tx}px ${d.ty + j.ty}px`;
    card.style.rotate = `${d.rot + j.rot}deg`;
    card.style.scale = d.scale; card.style.opacity = d.opacity;
  };
  stage.style.transform = "scale(2.5)";
  READY = true; apply(0);
})();
</script>
```

### 抽帧和出片

- 抽帧检查：`node tools/snap.mjs --file video.html f.png --w 1080 --h 1920 --scale 1 --wait 3000 --frames "1,4,7,10.5"`
- 出 MP4：`node tools/snap.mjs --file video.html --video out.mp4 --w 1080 --h 1920 --scale 1 --fps 24`（逐帧 seek 截图再用 ffmpeg 合成，需要本机有 ffmpeg；12 秒约半分钟）。要配音、配乐、字幕，再用 HyperFrames（先读 `hyperframes` skill）或 ffmpeg 混音。
- 声音：规格里「换到别的东西上 · 视频」写了这个风格的声音——配乐和音效要跟画面同一个时代、同一种材质（纸拼贴配纸张摩擦和咔嗒声，间谍片头配爵士鼓刷，后室配日光灯嗡嗡声）。响度 −14 LUFS。
- 先出分镜再写代码；正式渲染前抽帧检查拥挤、重叠、看不清的地方。想要更细的镜头和声音说明，看规格里链接的 lemo-opuscar 原文。

## 动画 / 动效 / 动态海报 / 表情

- 循环：最后一帧等于第一帧；定格类风格的循环长度取 12 的倍数帧。
- 导出 GIF / Lottie / MP4 循环都行；颗粒、抖线这类每帧都变的效果在 GIF 里会很大，降到 8 帧/秒。
- 只选这个风格 1～2 个招牌动作，别全上。

## 海报 / 封面 / PPT / 静态图

- 选这个风格「最像它的一帧」：规格里「一眼认出」那几条全部出现在同一画面里。
- 动效相关的东西改成静态痕迹：抖线就保留手绘线、套印不准就保留错位、扫描就保留扫描线。
- PPT 每页一个主视觉 + 一行字；字体和颜色照搬规格。

## 桌面组件 / 手表 / 小尺寸

- 尺寸太小时，只保留底色、一种字体和图片处理；纹理减半，动效只留一个。
- 系统组件放在用户真实桌面上看，规格里的颜色要和壁纸一起检查。

## 任何别的东西

拆成这七层，一层一层对过去：

1. 底（纸、屏幕、玻璃、空间）
2. 颜色（几种色、谁是强调色、哪里不许上色）
3. 字体（标题、正文、数字各用什么）
4. 真图处理（照片进来变成什么样）
5. 线和形（边框、分隔、图标是什么画法）
6. 节奏（几帧一画、什么缓动、什么东西一直在动）
7. 反馈（被点、被选中、在加载时是什么样）
