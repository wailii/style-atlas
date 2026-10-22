# 更新记录

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
