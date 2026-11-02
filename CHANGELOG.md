# 更新记录

## 1.6.0 · 2026-11-02

新增 10 种「写实 · 影像」风格（共 70 种）：产品棚拍、写实材质、设备实拍、电影剧照、纪实摄影、原相机、时尚大片、生活方式、俯拍平铺、卫星实景。前 60 种都是风格化的画法，这一组补真照片、真材质、真镜头。

- 素材：40 张 Unsplash 照片（经 Hugging Face 镜像 `wtcherr/unsplash_5k`，Unsplash License），每张旁边一个 `.json` 记摄影师、原图页面和真实 EXIF，`gallery/img/real/CREDITS.md` 汇总
- 3D：`gallery/models/` 6 个 Khronos glTF 示例模型（CC0 / CC-BY 4.0，贴图压到 1024px，59MB → 9MB），`gallery/hdr/` 2 张 Poly Haven HDRI（CC0），`gallery/vendor/` 加 three.js r128 的 GLTFLoader / RGBELoader / RoomEnvironment
- 新增 `realistic.md` 写实精选：按网页 / 设计 / Dashboard / 视频 / App 怎么用、素材来源、怎么不造假
- 诚实规则写进 SKILL.md：图库照片标「示意图 · 摄影师」，EXIF 只读真实数据，卫星图没有定位就只用图像坐标
- 深底风格加上电影剧照、写实材质；WebGL 页面一次只截一个 id

## 1.5.0 · 2026-11-02

新增 10 种「电影 · 漫画叙事」风格（共 60 种），全部从同一条视频里来：抖音 @Motdes AI阿峰《fable 5.5 网页设计的未来？》录屏的 The Notturno Experience（意大利开胃酒品牌的 3D 滚动叙事网页）。

- 朱墨剧场（crimson）：视频本身的设计语言。除了参考页，还有完整桌面体验 `gallery/x-crimson.html`（虚构品牌 MEZZANOTTE，8 幕、真 3D + 竖排墨线后期着色器、竖条滴落转场、按住推进、自动播放，`seek(t)` 出 46 秒 1920×1080 视频）和 Dashboard `gallery/d-crimson.html`
- 从视频里拆出来的 9 种：漫画分镜、黑色漫画、美漫宇宙、红幕剧场、意式招贴、新艺术、三渲二、线网幻视、黑白木刻
- 引擎：`inkHatch`（竖排墨线）、`dripDraw`（竖条滴落）
- `gallery/vendor/three.min.js`（three.js r128，MIT）：三渲二和朱墨剧场的 3D 用本地文件
- 新增 `cinematic.md` 炫酷精选：22 种冲击力最强的风格，按网页 / 设计 / Dashboard / 视频 / App 分好
- 图鉴首页：风格可以挂「别的媒介」链接；出处没有网址时显示成纯文字
- 「按气质找」加「电影感、滚动叙事、品牌发布」；默认口味里的深底风格加上黑色漫画、红幕剧场
- 截图注意：三渲二（WebGL）要单独截 `node tools/snap.mjs celshade`，和别的页面同一批截在无显卡的 SwiftShader 下会卡住

## 1.4.2 · 2026-10-23

- 新增 `README.md`（配图在 `.github/readme/`）和 `LICENSE`（MIT）
- 文档里遗留的「20 种 / 20 张」改成 50
- `gallery/vendor/rough.js` 加上 Rough.js 的许可声明

## 1.4.1 · 2026-10-23

- 图鉴首页标题的风格数改成从 `styles.js` 读，不再写死

## 1.4.0 · 2026-10-23

新增 10 种工具类和科普类风格（共 50 种）。工具：便当格、数据密集、AI 原生界面、墨水屏、终端界面；科普：白板讲解、可探索解释、象形统计、显微镜、博物版画。来源：UI/UX Pro Max 风格表、lemo-opuscar 风格库（whiteboard、pictogram-motion、microscope、engraving）、Bret Victor 和 Nicky Case 的可探索解释、Neurath 的 Isotype。

- 图鉴分组新增「工具界面」「科普讲解」
- 「按气质找」加「做工具」「做科普」两条

## 1.3.0 · 2026-10-23

新增 10 种风格（共 40 种）：Y2K 铬金属、孟菲斯、编辑杂志、拟物、Material 3 Expressive、产品拆解、装饰艺术、HD-2D、活体录屏、学院风。来源：UI/UX Pro Max 风格表、lemo-opuscar 风格库（teardown、art-deco、hd-2d、living-screencast）、Material Design 3。

- 「按气质找」加「有故事、像游戏」「跟着内容换颜色」两类

## 1.2.0 · 2026-10-23

新增 10 种风格（共 30 种）：水彩、默片、皮影戏、蓝图、彩色玻璃、橡皮管卡通、视觉调查、新粗野主义、黏土风、Frutiger Aero。来源：lemo-opuscar 风格库、UI/UX Pro Max 风格表、2026 网页设计趋势。

- 引擎：`mulberry` / `wcDeform` / `wcWash` / `wcStroke` / `watercolorCanvas`（水彩）、`stainedGlass`（彩色玻璃）
- 图鉴分组：「手作 · 纸与墨」改名「手作 · 手工艺」，新增「界面潮流」

## 1.1.1 · 2026-10-23

- `tools/snap.mjs` 加 `--video out.mp4 [--fps 24] [--dur 秒]`：视频页逐帧 seek 截图，ffmpeg 合成 MP4

## 1.1.0 · 2026-10-23

两个冷启动测试（Codex 用孔版印刷做网页首屏、Claude 用纸拼贴做竖屏视频）之后的改进。

- 新增视频参考 `gallery/v-collage.html` 和标准帧 `shots/v-collage-*.png`
- `media.md` 视频一节重写：`seek(t)` / `window.ready` / `window.VIDEO` 约定、确定性规则、390 设计空间到 1080×1920 的换算、字体、最小骨架、抽帧命令；网页一节加桌面首屏尺寸
- 引擎：`frameAt` / `dropAt` / `jitterAt`（视频用）；`halftoneCutout` 开放 `scale` / `gamma` / `from` / `to`；`tear` 可传步长；需要尺寸的引擎改读布局尺寸，旋转缩放不影响
- `common.js`：`seeded()`、`fiberURL()`、`clip()` 不切英文词；不引 data.js 也不报错
- 孔版印刷：套准起点和规格一致；写明网点前的 gamma、小字区域怎么处理、渐变能用到哪
- 纸拼贴：写明 steps(6) 的帧、抖动单位、Special Elite 没有中文、截断和孤字
- `tools/snap.mjs`：`--frames` 一次抽多帧、`--eval` 出错退出码 1、请求超时、出错也关掉 Chrome
- `tools/check.mjs` 也检查视频页
- SKILL.md：不编数据和链接；截图时依赖文件要和页面同目录
- 目录改用 git 管理，每次迭代提交一次，版本打标签

## 1.0.0 · 2026-10-22

- 20 种风格：线稿、水墨、纸拼贴、窗花剪纸、立体书、孔版印刷、浮世绘、打印纸、瑞士排版、构成主义、新闻包装、后室录像、间谍片头、City Pop、极简变形、液态玻璃、等距积木、点云测绘、数学讲解、像素
- 每种一份规格（`styles/`）、一个参考页（`gallery/s-<id>.html`）、一张标准截图（`gallery/shots/`）
- 共用：`common.js`（真图处理）、`engines.js`（风格引擎）、`vendor/rough.js`
- 跨媒介说明 `media.md`、混搭 `mixing.md`、函数手册 `ENGINES.md`、数据格式 `DATA.md`
- 截图工具 `tools/snap.mjs`、完整性检查 `tools/check.mjs`
