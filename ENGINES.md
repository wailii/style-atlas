# 函数手册

两个文件，都在 `gallery/`，都是普通 `<script>`（不是模块），按顺序引入：

```html
<script src="data.js"></script>      <!-- 可选：示例数据 window.HOT；不引也行（HOT 会是空数组） -->
<script src="common.js"></script>    <!-- 图片处理和小工具，全局函数 -->
<script src="engines.js"></script>   <!-- 风格引擎，挂在全局 Engines 上 -->
<script>
  const { papercut, inkBloom } = Engines;
</script>
```

线稿和纸拼贴还要先引入 `vendor/rough.js`（全局 `rough`）。

图片必须同源（本地服务或同域名），否则 canvas 读不了像素。所有处理都在浏览器里做，不需要后端。

需要元素尺寸的函数（`halftoneCutout`、`riso`、`makeGlass`、`inkBloom`）读的是布局尺寸（CSS 像素，不受旋转、缩放影响）；元素必须已经在页面上、有宽高再调用。

## common.js：真图 → 风格化画布

| 函数 | 做什么 | 用在 |
|---|---|---|
| `loadImage(src)` | Promise\<Image\> | 全部 |
| `coverCanvas(img, w, h)` | 按 cover 裁到 w×h 的画布 | 全部 |
| `lumaOf(canvas)` | 亮度数组 0～1 | 自己写处理时 |
| `sketchCanvas(img, w, h, { ink, gain, hatch, soft })` | 钢笔线稿（描边 + 暗部排线），透明底 | 线稿 |
| `halftoneCanvas(img, w, h, { cell, angle, ink, paper, scale, gamma, from, to })` | 单色网点 | 纸拼贴 |
| `pixelCanvas(img, cols, rows, palette, dither)` | 缩到 cols×rows，按调色板 + Bayer 抖动 | 像素 |
| `posterCanvas(img, w, h, palette, { edge, edgeInk, soft })` | 平涂色块（不抖动），可描黑线 | 浮世绘、City Pop |
| `thresholdCanvas(img, w, h, { cut, ink, paper, soft })` | 两色剪影 | 构成主义、间谍片头、窗花小图 |
| `inkCanvas(img, w, h, { levels, blur, ink, soft })` | 墨色分层 + 晕边，透明底 | 水墨 |
| `asciiRows(img, cols, rows, ramp)` | 字符画（字符串数组，已拉伸亮度） | 打印纸 |
| `grainURL(size, alpha, tone)` | 噪点平铺图（dataURL） | 几乎全部 |
| `fiberURL(size, n)` | 纸纤维平铺图 | 纸拼贴 |
| `seeded(seed, fn)` | fn 运行期间 Math.random 用固定种子；做视频时包住 `grainURL` / `fiberURL` | 视频 |
| `clip(s, n)` | 截断加省略号，不切开英文词和数字 | 全部 |
| `sparkPts(h, w, hgt)` | 把一条数据的热度曲线换成坐标 | 线稿 |
| `splitLines(text, font, maxW)` | 按宽度断行（英文词不拆） | 遮罩出字、纸条标题 |
| `rnd(seed)` | 可重复的伪随机 | 全部 |
| `fontsReady()` | 等字体（最多 1.5 秒），是 `const` 箭头函数 | 量文字尺寸之前 |

## engines.js：`Engines.*`

| 函数 | 做什么 |
|---|---|
| `springCurve(stiffness, damping)` → `{ easing, ms }` | 弹簧闭式解转成 CSS `linear()`；极简变形用 (180,24) 和 (320,26) |
| `smooth(t)` / `smoothLinear(n)` | Manim 的 smooth 缓动 / 它的 CSS `linear()` |
| `sketchy(svg, make, { delay, dur, boil })` | 在 svg 里用 `make(rc, seed)` 画三版手画形状，先一笔笔画出，之后按 `body[data-f]` 轮换（页面里每 140ms 改一次 data-f） |
| `tornPoly(w, h, amp, step, seed, edges)` / `tear(el, amp, seed, edges, step)` | 撕边多边形 / 直接给元素设撕边 clip-path（step 默认 5px，按 390 宽设计空间） |
| `halftoneCutout(canvas, img, { cell, rim, seed, scale, gamma, from, to, rimAmp, innerAmp })` | 撕边白纸边 + 网点照片，画进 canvas；`scale` 是内部分辨率倍数（默认 2，视频放大 2.5 倍时给 5）；封面太亮太暗时调 `gamma` / `from` / `to` |
| `risoPlate(img, w, h, chan, { cell, angle, ink })` | 一版孔版网点；`chan(r,g,b)` 返回密度 |
| `riso(box, src, cell)` | 往 box 里放蓝、粉两版 canvas（class `B` / `P`） |
| `papercut(size, seed, { folds, rim, color })` | 程序剪窗花（folds 折 × 2 瓣对称） |
| `cornerCut(size)` | 四分之一角花 |
| `glassFilter(w, h, { r, bezel, lens, scale })` → id | 生成折射 SVG 滤镜 |
| `makeGlass(el, { r, bezel, lens, scale, blur })` | 给元素加折射玻璃（设 `--bf`，CSS 里 `backdrop-filter: var(--bf)`） |
| `cloudFrom(img, cols, rows)` / `cloudFromPath(d, n)` | 图片 / 矢量路径 → 点云 |
| `renderCloud(ctx, W, H, pts, { yaw, pitch, scale, zs, reveal, size })` | 画点云（reveal 0～1 是扫描进度） |
| `elevationColor(t)` | 高程色带 |
| `inkBloom(canvas, img, { cx, cy, dur, delay, feather, round })` | 水墨从一点晕开 |
| `brushPath(w, h, { seed, thick, tilt })` / `ensoPath(seed)` | 毛笔笔触 / 圆相的路径 d（配 `#dry` 飞白滤镜，见 s-ink.html） |
| `pxText(text, { size, color, scale, maxW, lineH, weight })` | 点阵字画布（任何中文） |
| `pxIcon(d, { n, color, scale, lw, vb })` | 点阵图标 |
| `sprite(rows, colors, scale)` | 字符画数组 → 精灵画布 |
| `vhs(img, w, h)` | 录像带画质画布 |
| `isoP(x, y, z, s, ox, oy)` / `isoCube(...)` | 等距投影 / 一个三面方块的 SVG 字符串 |
| `mulberry(seed)` | 可重复的随机数发生器（返回函数） |
| `wcWash(ctx, cx, cy, r, color, { layers, alpha, seed, sides, spread, upto, squash })` | 水彩晕染块：同一形状叠 layers 层，每层再抖；upto 控制画到第几层（做「刷上去」动画） |
| `wcStroke(ctx, pts, { width, color, alpha, seed, bristles, upto })` | 水彩一笔：变宽色带 + 断续笔毛；upto 0～1 是画到多长 |
| `wcDeform(poly, depth, spread, rand)` | 多边形递归中点位移（顶点第三个值是该点的乱度） |
| `watercolorCanvas(img, w, h, { k, passes, blur, paper, seed })` | 真图 → 水彩（k 种主色分区，多遍 multiply，最亮一区留纸） |
| `stainedGlass(img, w, h, { cell, lead, sat, bright, seed, pale })` → `{ canvas, reveal(k) }` | 真图 → 彩色玻璃（泰森多边形 + 铅条）；`reveal(k)` 按随机顺序点亮到 k（0～1），-1 全暗 |

## 视频用（seek）

| 函数 | 做什么 |
|---|---|
| `frameAt(t, fps)` | t 秒是第几帧 |
| `dropAt(f, f0, { dur, x, y, r, s, fadeTo })` | 定格落下：从第 f0 帧起 dur 帧一格格落到位，返回 `{ visible, tx, ty, rot, scale, opacity, done }` |
| `jitterAt(f, i, { every, amp, rot })` | 落定后的微抖：每 every 帧重摆一次，返回 `{ tx, ty, rot }` |

能在 `seek(t)` 里用的：所有「生成一次就不变」的函数——`common.js` 全部图片处理、`tornPoly` / `tear` / `halftoneCutout` / `risoPlate` / `papercut` / `cornerCut` / `cloudFrom` / `renderCloud`（传 yaw 和 reveal）/ `brushPath` / `ensoPath` / `pxText` / `pxIcon` / `sprite` / `vhs` / `isoP` / `isoCube` / `glassFilter`，以及上表三个。

不能直接用的（内部有计时器或 performance.now）：`sketchy`（改成按帧号选三版里的哪一版）、`inkBloom`（把它里面的进度 k 换成按 t 算）、`riso`（异步加载，在 ready 里调）、`makeGlass`（在 ready 里调一次）。

参考：`gallery/v-collage.html`。

## 改引擎

- 改 `engines.js` 会同时影响所有用到它的参考页。改完跑 `node tools/snap.mjs` 重截全部参考页，对比 `gallery/shots/` 里的旧图。
- 新引擎：先在某个参考页里写好、调好，再搬进 `engines.js` 的对应小节，参考页改成 `const { 新函数 } = Engines;`。
