# 风格图鉴 · 145 种视觉风格

**145 种风格：70 种手机 + 75 种桌面 Web · 145 份规格 · 145 个能点的参考页 · 145 张标准截图**

给 AI agent 用的视觉风格库（style-atlas），一共 145 种风格：70 种手机页面，75 种桌面 Web。做 App、网页、视频、海报、PPT 时，跟 Claude Code 或 Codex 说一句「用浮世绘风格」，它会读这种风格的规格，原样抄色值和字体，用现成的代码处理图片，做完截图和标准图对一遍。

让 AI 自己做界面，做出来常常是同一个样子：米白底、白卡片、圆角、一个强调色。这套库把每种风格写成能照着做的规则和代码，换风格时不用靠形容词碰运气。

[在线看 145 种（右上角切手机 / 桌面 Web）](https://wailii.github.io/style-atlas/gallery/) · [安装](#安装) · [风格清单](#风格清单)

**最近更新**

- **1.8.0 · 桌面 Web 再加 25 种（121–145 号，目录里按组排）**：看板与大盘 5 种（晨报看板、容量规划、占用方块图、目标记分卡、分析笔记本）、列表与表格 10 种（查询栏、层级表格、状态条、万行速查、对比列表、流程进度、时间轴、AI 表格、批量操作、列画像），开发者与 AI、发布与品牌各 5 种。看板和列表的参考页用同一个虚构的 GPU 集群后台做场景，规格写了每条做法放到资产列表、审批单、费用明细这类后台页面上怎么用
- **1.7.0 · 桌面 Web（71–120）**：50 种 1440×900 的桌面风格，每种一个不同的产品场景，33 种偏工具和后台（观测墙、日志探针、成本透镜、机房立面、键盘优先、块文档、字段表格、泳道看板、Agent 运行台、模型市场、账本、排版后台…），17 种偏发布和品牌（发布会、暗场极光、暖纸衬线、滚动叙事、3D 英雄、工业面板…）。规格多一节「学什么交互」，写了每条做法放到后台产品上怎么用。按要做的页面挑见 [web.md](web.md)
- **1.6.0 · 写实 · 影像（61–70）**：产品棚拍、写实材质、设备实拍、电影剧照、纪实摄影、原相机、时尚大片、生活方式、俯拍平铺、卫星实景。真照片（带真实 EXIF）、实时 PBR 3D、真镜头效果。用法和素材规则见 [realistic.md](realistic.md)
- **1.5.0 · 电影 · 漫画叙事（51–60）**：朱墨剧场、漫画分镜、黑色漫画、美漫宇宙、红幕剧场、意式招贴、新艺术、三渲二、线网幻视、黑白木刻。朱墨剧场附一个可滚动、按住推进的 3D 体验页 [`gallery/x-crimson.html`](gallery/x-crimson.html)（能直接出 1080p 视频）和一个 Dashboard [`gallery/d-crimson.html`](gallery/d-crimson.html)。要「炫」时先看 [cinematic.md](cinematic.md)
- 完整记录见 [CHANGELOG.md](CHANGELOG.md)

<img src=".github/readme/all-70.jpg" alt="70 种手机风格的参考页截图">

手机版：同一份数据（2026 年 10 月 22 日晚的 AI 热点热榜，8 条新闻和 4 张封面）按 70 种风格各做了一遍。每个参考页都是 390×844 的手机页面，按钮和列表都能点，在线版能看到动效。桌面 Web 版见[桌面 Web 风格清单](#桌面-web-风格清单)。

## 安装

用 [skills](https://github.com/vercel-labs/skills) 命令安装，它会列出本机装了的 agent（Claude Code、Codex、Cursor 等），选要装到哪几个：

```bash
npx skills add wailii/style-atlas -g
```

也可以直接克隆到 agent 读 skill 的目录：

```bash
# Claude Code
git clone https://github.com/wailii/style-atlas.git ~/.claude/skills/style-atlas

# Codex，以及其他读 ~/.agents/skills 的 agent
git clone https://github.com/wailii/style-atlas.git ~/.agents/skills/style-atlas
```

更新时在目录里 `git pull`。截图验收要用本机的 Chrome 和 Node.js 22 以上；把视频页渲染成 MP4 还要 ffmpeg。

## 用法

装好以后直接跟 agent 说要做什么、用什么风格，比如：

- 用浮世绘风格做一个天气 App 的首页
- 做一条讲 Transformer 原理的竖屏短视频，先给我三四个风格挑
- 这个落地页太普通了，换成瑞士排版，头图借孔版印刷的处理
- 把产品发布会的 PPT 做成装饰艺术风格
- 做一个像那条 3D 滚动叙事视频一样炫的品牌落地页，再出一版 Dashboard
- 新品发布页要写实一点，像苹果官网那样的产品棚拍

agent 会按 [SKILL.md](SKILL.md) 里的步骤做：

1. 问清楚做的是什么、有没有真数据和真图
2. 用户点名了风格就用；没点名就按内容挑 3～4 个差别大的，做一个对比页让用户选
3. 读这种风格的规格 `styles/<id>.md`，再读 [media.md](media.md) 里对应媒介的一节
4. 色值、字体、参数从规格里原样复制；图片处理和招牌动效调用 `gallery/` 里现成的函数
5. 截图，和 `gallery/shots/<id>.png` 放在一起对：规格「一眼认出」里的每一条都要能在画面里找到

## 风格清单

70 种分 9 组。点风格名字可以在线打开它的参考页。要「炫」「电影感」时先看 [cinematic.md](cinematic.md)：从 70 种里挑出的 22 种，按网页、设计、Dashboard、视频、App 分好。要真实感时先看 [realistic.md](realistic.md)。

### 手作 · 手工艺

<img src=".github/readme/group-1.jpg" alt="手作 · 手工艺">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 1 | [线稿](https://wailii.github.io/style-atlas/gallery/#lineart) | 白纸黑线，像一页随手画的笔记 | 读东西、学东西：知识卡片、日报、笔记、讲解视频 |
| 2 | [水墨](https://wailii.github.io/style-atlas/gallery/#ink) | 宣纸、墨色分层、一方红印 | 文化、阅读、节气、茶和书法类；纪录片片头 |
| 3 | [纸拼贴](https://wailii.github.io/style-atlas/gallery/#collage) | 剪报 + 网点照片 + 胶带，Vox 讲解片的样子 | 资讯、观点、杂志感强的内容；讲解视频 |
| 4 | [窗花剪纸](https://wailii.github.io/style-atlas/gallery/#papercut) | 一张红纸对折几次剪出来的窗花 | 节日、年货、红包活动、国风品牌 |
| 5 | [立体书](https://wailii.github.io/style-atlas/gallery/#popup) | 翻开这一页，纸片一层层立起来 | 儿童、绘本、旅行、礼物和贺卡 |
| 21 | [水彩](https://wailii.github.io/style-atlas/gallery/#watercolor) | 透明颜色一层层刷出来，旁边是手写注释 | 生活方式、旅行、植物、手账、温柔的品牌 |
| 23 | [皮影戏](https://wailii.github.io/style-atlas/gallery/#shadow) | 油灯照着的幕布，染色兽皮透出光 | 春节、非遗、戏曲、民俗、儿童故事 |
| 25 | [彩色玻璃](https://wailii.github.io/style-atlas/gallery/#stainedglass) | 真图切成彩色玻璃，铅条隔开，阳光扫过 | 节日、文化、高端品牌、仪式感的页面 |

### 印刷 · 版画

<img src=".github/readme/group-2.jpg" alt="印刷 · 版画">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 6 | [孔版印刷](https://wailii.github.io/style-atlas/gallery/#riso) | 只有蓝和荧光粉两种油墨，叠出来是紫的 | 年轻、潮、活动和社区类 |
| 7 | [浮世绘](https://wailii.github.io/style-atlas/gallery/#ukiyo) | 普鲁士蓝的浪、木版平涂、竖排题签 | 日式、旅行、餐饮、文化品牌 |
| 8 | [打印纸](https://wailii.github.io/style-atlas/gallery/#print) | 针式打印机的绿杠连续纸，封面打成字符画 | 开发者工具、日志、账单、复古小票 |
| 9 | [瑞士排版](https://wailii.github.io/style-atlas/gallery/#swiss) | 六栏网格、巨大编号、黑白加一点红 | 数据、金融、设计工作室、官网 |
| 10 | [构成主义](https://wailii.github.io/style-atlas/gallery/#constructivist) | 红黑斜线、大箭头、圆形照片蒙太奇 | 号召、活动、观点和宣言类内容 |
| 24 | [蓝图](https://wailii.github.io/style-atlas/gallery/#blueprint) | 晒图纸：蓝底白线、尺寸线、标题栏 | 硬件、工程、架构说明、产品原理页 |
| 33 | [编辑杂志](https://wailii.github.io/style-atlas/gallery/#editorial) | 报头大字、红色栏目名、首字下沉、居中引语、满幅大图 | 长文、专题、品牌故事、年报 |
| 37 | [装饰艺术](https://wailii.github.io/style-atlas/gallery/#deco) | 黑、金、象牙；光芒、阶梯拱门、灯泡跑马灯，一切从中轴展开 | 酒店、珠宝、颁奖、周年庆、高端邀请 |
| 40 | [学院风](https://wailii.github.io/style-atlas/gallery/#academia) | 羊皮纸、拱顶老照片、红色首字、目录卡抽屉、火漆按钮 | 读书、课程、研究机构、博物馆、出版社 |

### 影像 · 屏幕

<img src=".github/readme/group-3.jpg" alt="影像 · 屏幕">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 11 | [新闻包装](https://wailii.github.io/style-atlas/gallery/#news) | 台标、LIVE、下三分之一字幕、滚动条 | 资讯、赛事、直播、发布会 |
| 12 | [后室录像](https://wailii.github.io/style-atlas/gallery/#liminal) | 发黄的日光灯房间，透过一台老摄像机看 | 悬疑、游戏、恐怖、怪谈内容；万圣节活动 |
| 13 | [间谍片头](https://wailii.github.io/style-atlas/gallery/#spy) | 60 年代片头：橙色色块、黑条、爵士鼓点 | 影视、音乐、活动海报、品牌片头 |
| 14 | [City Pop](https://wailii.github.io/style-atlas/gallery/#citypop) | 80 年代动画：蓝天、椰子树、泳池、平涂描线 | 音乐、度假、潮牌、夏日活动 |
| 22 | [默片](https://wailii.github.io/style-atlas/gallery/#silent) | 1920 年代默片拷贝：闪、晃、划痕、字幕卡 | 历史、复古、品牌故事、文化活动 |
| 26 | [橡皮管卡通](https://wailii.github.io/style-atlas/gallery/#rubberhose) | 1930 年代黑白卡通：水管胳膊、白手套、跟着音乐跳 | 儿童、游戏、复古活动、吉祥物导览 |
| 27 | [视觉调查](https://wailii.github.io/style-atlas/gallery/#investigation) | 调查报道工作台：证据、来源连线、红色只用来指 | 事实核查、复盘、调查报道、竞品分析 |
| 39 | [活体录屏](https://wailii.github.io/style-atlas/gallery/#screencast) | 像一段产品录屏：光标是用户，像素小家伙替软件干活 | 产品演示、功能介绍、更新日志、引导页 |

### 数字 · 三维

<img src=".github/readme/group-4.jpg" alt="数字 · 三维">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 15 | [极简变形](https://wailii.github.io/style-atlas/gallery/#morph) | 大字、留白、一个会变形的黑色元素 | 工具、播放器、要显得专业的产品 |
| 16 | [液态玻璃](https://wailii.github.io/style-atlas/gallery/#glass) | 一层会折射的玻璃浮在真图上面 | 系统级工具、音乐、相机、手机桌面组件 |
| 17 | [等距积木](https://wailii.github.io/style-atlas/gallery/#iso) | 8 条热点堆成一座热度城市 | 数据看板、游戏化、教育、城市和地产 |
| 18 | [点云测绘](https://wailii.github.io/style-atlas/gallery/#lidar) | 封面变成一团会转的 3D 点云 | 科研、地图、汽车、硬件、工程类 |
| 19 | [数学讲解](https://wailii.github.io/style-atlas/gallery/#manim) | 3Blue1Brown 的样子：深底、坐标轴、会变形的曲线 | 教育、数据讲解、研究报告 |
| 20 | [像素](https://wailii.github.io/style-atlas/gallery/#pixel) | 16-bit 游戏的白天关卡，热点是任务 | 打卡、习惯、游戏化 |
| 36 | [产品拆解](https://wailii.github.io/style-atlas/gallery/#teardown) | 把卡片拆成五层浮起来，引线标着真实数字，镜头一直绕 | 硬件、SaaS 架构、产品功能讲解 |
| 38 | [HD-2D](https://wailii.github.io/style-atlas/gallery/#hd2d) | 像素小人站在有光有雾的立体小镇里，对话框逐字打出头条 | 游戏、文旅、城市导览、故事型落地页 |

### 界面潮流

<img src=".github/readme/group-5.jpg" alt="界面潮流">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 28 | [新粗野主义](https://wailii.github.io/style-atlas/gallery/#neubrutal) | 黑粗边、实心黑影、高饱和色块、歪着的贴纸 | 年轻、创作者、工具、活动页 |
| 29 | [黏土风](https://wailii.github.io/style-atlas/gallery/#clay) | 软黏土捏出来的界面：鼓、圆、糖果色 | 儿童教育、健康、轻松的消费产品 |
| 30 | [Frutiger Aero](https://wailii.github.io/style-atlas/gallery/#aero) | 蓝天草地、水晶气泡、Aqua 按钮、带倒影的图 | 饮料、户外、怀旧活动、年轻消费品牌 |
| 31 | [Y2K 铬金属](https://wailii.github.io/style-atlas/gallery/#y2k) | 液态铬、镭射彩虹、果冻胶囊按钮、到处闪的星光 | 潮牌、音乐、美妆、年轻人活动页 |
| 32 | [孟菲斯](https://wailii.github.io/style-atlas/gallery/#memphis) | 粗黑描边、糖果色几何碎片满屏飘、色块错位叠在后面 | 活动页、潮流品牌、设计周、儿童产品 |
| 34 | [拟物](https://wailii.github.io/style-atlas/gallery/#skeuo) | iOS 6 的真实材质：亚麻、缝线皮革、金属旋钮、拍立得、便签 | 复古工具、音频软件、怀旧专题、手账 |
| 35 | [Material 3 Expressive](https://wailii.github.io/style-atlas/gallery/#m3) | 配色从封面取、曲奇花朵形状、按下的按钮变宽、全是弹簧 | 安卓产品、工具、内容平台、多主题内容 |

### 工具界面

<img src=".github/readme/group-6.jpg" alt="工具界面">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 41 | [便当格](https://wailii.github.io/style-atlas/gallery/#bento) | 4 列小方格，每格一个能独立看懂的小部件 | SaaS / 工具首页、仪表盘首页、年度总结 |
| 42 | [数据密集](https://wailii.github.io/style-atlas/gallery/#dense) | 小字、等宽数字、行内曲线、24 小时矩阵、⌘K 搜索 | 后台、监控、交易、运营看板 |
| 43 | [AI 原生界面](https://wailii.github.io/style-atlas/gallery/#agent) | 智能体干活的过程：步骤打勾、来源冒出来、回答逐字流、动手前先问 | 任何「让 AI 帮你做事」的产品 |
| 44 | [墨水屏](https://wailii.github.io/style-atlas/gallery/#eink) | 纸灰底、16 级灰抖动图、翻页黑白闪一下、留一点残影 | 长文阅读、文档、专注模式、桌面小摆件 |
| 45 | [终端界面](https://wailii.github.io/style-atlas/gallery/#tui) | 浅色终端里的文字程序：框线、字符曲线、半格字符画的封面 | 开发者工具、CLI 产品、极客个人站 |

### 科普讲解

<img src=".github/readme/group-7.jpg" alt="科普讲解">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 46 | [白板讲解](https://wailii.github.io/style-atlas/gallery/#whiteboard) | 马克笔当面一笔笔写、一笔笔画，照片用磁铁吸在板上 | 产品原理、课程、新手引导、科普视频 |
| 47 | [可探索解释](https://wailii.github.io/style-atlas/gallery/#explorable) | 正文里的数字能拖，图能拖，拖了句子和图一起变 | 科普长文、产品原理、计算器、教程 |
| 48 | [象形统计](https://wailii.github.io/style-atlas/gallery/#isotype) | 一个符号代表固定数量，数符号就懂，不满一个就切掉一截 | 科普数据、年报、公益、人口资源话题 |
| 49 | [显微镜](https://wailii.github.io/style-atlas/gallery/#microscope) | 圆形视野、染色标本、换物镜失焦再对焦，读数都是算出来的 | 科学、医疗、材料、芯片科普；放大看细节 |
| 50 | [博物版画](https://wailii.github.io/style-atlas/gallery/#engraving) | 铜版画：色调全靠线，刻完再上一层淡水彩，带编号和局部放大 | 博物馆、自然科普、百科、出版 |

### 电影 · 漫画叙事

<img src=".github/readme/group-8.jpg" alt="电影 · 漫画叙事（一）">
<img src=".github/readme/group-9.jpg" alt="电影 · 漫画叙事（二）">

这 10 种都来自同一条视频：抖音 @Motdes AI阿峰《fable 5.5 网页设计的未来？》录屏的 *The Notturno Experience*，一个意大利开胃酒品牌的 3D 滚动叙事网页。朱墨剧场是视频本身的设计语言，另外 9 种是从里面拆出来、各自往一个方向走到头的风格。

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 51 | [朱墨剧场](https://wailii.github.io/style-atlas/gallery/#crimson) | 朱红、纸白、墨黑，明暗全是竖排墨线；一幕幕滴落转场，关键动作要按住 | 品牌发布、酒饮美妆、滚动叙事落地页、夜场感数据大屏 |
| 52 | [漫画分镜](https://wailii.github.io/style-atlas/gallery/#manga) | 斜切分格、网点纸、集中线、瞪大的眼睛、压过格线的拟声字 | 剧情感强的发布、榜单、番剧和游戏活动 |
| 53 | [黑色漫画](https://wailii.github.io/style-atlas/gallery/#noir) | 雨夜、百叶窗影子、纯黑白，只有一种红 | 悬疑、调查、安全事件、深夜栏目 |
| 54 | [美漫宇宙](https://wailii.github.io/style-atlas/gallery/#comicverse) | 四色网点套不准、粗墨线、一拍二地跳、故障帧 | 游戏、潮牌、音乐体育活动、短视频片头 |
| 55 | [红幕剧场](https://wailii.github.io/style-atlas/gallery/#stage) | 镀金台口、丝绒大幕拉开、追光落在主角上、戏票撕票根 | 发布会、首映、演出票务、颁奖揭晓 |
| 56 | [意式招贴](https://wailii.github.io/style-atlas/gallery/#affiche) | 一块平色底，酒瓶从黑里跳出来开瓶，手绘大字带投影 | 酒饮、餐饮、快消新品、复古品牌海报 |
| 57 | [新艺术](https://wailii.github.io/style-atlas/gallery/#nouveau) | 慕夏：大圆光环、鞭线藤蔓长出来、花边拱框 | 美妆、香水、花艺、茶饮、书封 |
| 58 | [三渲二](https://wailii.github.io/style-atlas/gallery/#celshade) | 真 3D 渲染成动画：三段硬光、黑墨描边、暗部排线 | 游戏、动画、潮牌、新品主视觉 |
| 59 | [线网幻视](https://wailii.github.io/style-atlas/gallery/#opart) | 图只用平行线画，两层线叠出摩尔纹，画面碎成竖条往下滴 | 音乐、艺术展、时装、发布会 |
| 60 | [黑白木刻](https://wailii.github.io/style-atlas/gallery/#linocut) | 白是刀挖出来的，墨有白点，套一块错位的朱红版 | 人文、历史、纪录片、出版、节日海报 |

朱墨剧场除了手机参考页，还有两种媒介的完整参考：

- `gallery/x-crimson.html`：桌面滚动叙事体验（虚构品牌 MEZZANOTTE），8 幕，真 3D 场景经过墨线后期着色器变成竖排线；滚轮、按住、方向键都能推进，也会自动播放。带 `seek(t)`，能直接渲染成 46 秒 1920×1080 视频
- `gallery/d-crimson.html`：Dashboard。面积图用竖排线填，柱子是红色多立克柱，环形图是圆窗，数字全部来自 `data.js`

```bash
node tools/snap.mjs --file gallery/x-crimson.html --video mezzanotte.mp4 --w 1920 --h 1080 --scale 1 --fps 30
```

### 写实 · 影像

<img src=".github/readme/group-10.jpg" alt="写实 · 影像（一）">
<img src=".github/readme/group-11.jpg" alt="写实 · 影像（二）">

前 60 种都是画出来的风格，这一组补的是写实：真照片、真实材质的 3D、真镜头。照片来自 Unsplash（经 Hugging Face 镜像），带真实 EXIF；3D 是 Khronos 的 PBR 示例模型配 Poly Haven HDRI，在浏览器里实时渲染。页面上的图库照片都标「示意图 · 摄影师」，和新闻内容无关。

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 61 | [产品棚拍](https://wailii.github.io/style-atlas/gallery/#studio) | 浅灰背景纸、柔光箱、真 3D 产品带贴地阴影、大标题和规格大数字 | 硬件发布、电商详情、品牌官网首屏 |
| 62 | [写实材质](https://wailii.github.io/style-atlas/gallery/#render) | 拉丝铝铭牌刻字、玻璃透镜折射、HDRI 反射、浅景深 | 高端品牌、腕表珠宝、工业设计 |
| 63 | [设备实拍](https://wailii.github.io/style-atlas/gallery/#device) | 真照片里的屏幕透视贴上你的界面，带反光和遮挡 | App 宣传、App Store 截图、落地页 |
| 64 | [电影剧照](https://wailii.github.io/style-atlas/gallery/#filmstill) | 2.39:1、橙青调色、颗粒光晕、烧录字幕 | 品牌短片、影评、播客、长读 |
| 65 | [纪实摄影](https://wailii.github.io/style-atlas/gallery/#documentary) | 大幅黑白照片、长图说带 EXIF、红笔圈过的底片小样 | 深度报道、年报、公益记录 |
| 66 | [原相机](https://wailii.github.io/style-atlas/gallery/#rawcam) | 闪光灯直打、前摄小窗、橙色 LED 日期、备忘录配文 | 社媒、日记、活动回顾 |
| 67 | [时尚大片](https://wailii.github.io/style-atlas/gallery/#campaign) | 满幅硬光人像、超宽字标、9px 小字 | 时尚、美妆、奢侈品 |
| 68 | [生活方式](https://wailii.github.io/style-atlas/gallery/#lifestyle) | 窗光真照片、胶片暖调、细衬线、宽边距 | 家居、咖啡、订阅、品牌故事 |
| 69 | [俯拍平铺](https://wailii.github.io/style-atlas/gallery/#flatlay) | 正上方拍桌面，物件按网格摆，真影子 | 电商、开箱、文具数码 |
| 70 | [卫星实景](https://wailii.github.io/style-atlas/gallery/#satellite) | 真航拍地图，黄框关注区、尺寸线、剖面、网格坐标 | 地理、物流、城市、调查报道 |


## 桌面 Web 风格清单

75 种分 7 组，编号接着手机版往下排。每种一个不同的产品场景，参考页 1440×900、都能点。按要做的页面挑（概览、台账、账单、审批、申请表单、模型平台）见 [web.md](web.md)。

<img src=".github/readme/all-web.jpg" alt="75 种桌面 Web 风格的参考页截图">

### 监控与数据

<img src=".github/readme/web-g1.jpg" alt="Web · 监控与数据">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 71 | [观测墙](https://wailii.github.io/style-atlas/gallery/#w-observatory) | 深灰底监控大盘：全局时间范围联动、共享十字线、阈值着色、面板可拖可缩可全屏 | GPU 集群、网关、计费实时大盘，值班大屏。 |
| 72 | [日志探针](https://wailii.github.io/style-atlas/gallery/#w-telemetry) | 白底单紫色日志检索：facet 条数联动、直方图拖选、点行出 trace 瀑布抽屉 | 日志、审计记录、调用明细、工单流水的检索页。 |
| 73 | [成本透镜](https://wailii.github.io/style-atlas/gallery/#w-costlens) | 米色纸面费用分析：大金额排版、按天堆叠大图、分组依据切换、环比瀑布、异常点说明 | 云账单、算力成本、预算对账的分析页。 |
| 74 | [产品洞察](https://wailii.github.io/style-atlas/gallery/#w-funnel) | 灰米底黑粗边的产品分析：一句话配置、漏斗点开看流失用户、留存三角热力表 | 用户行为分析、审批流转化、续用率等分析页。 |
| 75 | [交易终端](https://wailii.github.io/style-atlas/gallery/#w-ticker) | 黑底琥珀字多窗格行情终端：命令行功能码、数字跳动闪色、F 键切窗格、点行换分时图 | 实时行情、成交流水、值班大屏等键盘优先的页面。 |
| 76 | [拓扑图](https://wailii.github.io/style-atlas/gallery/#w-topology) | 服务依赖拓扑：带健康环的圆、线宽是流量、只有出错才有颜色，面板浮在图上 | 服务依赖、数据血缘、链路排障、影响面分析 |
| 77 | [机房立面](https://wailii.github.io/style-atlas/gallery/#w-rack) | 机柜 U 位立面图：细线工程图风格，一键换着色依据，点服务器看 8 张卡 | 机房、仓库货架、座位与车位、资产台账的位置视图 |
| 78 | [地图调度](https://wailii.github.io/style-atlas/gallery/#w-mapops) | 全屏地图加六边形热力：面板浮在图上，底部时间轴一拖，全国算力负载跟着变 | 机房分布、网点和门店、运力调度、基站覆盖 |

### 看板与大盘

<img src=".github/readme/web-g2.jpg" alt="Web · 看板与大盘">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 79 | [晨报看板](https://wailii.github.io/style-atlas/gallery/#w-briefing) | 排好版的每日简报：一句生成的结论、4 个大数字、每个数一句「为什么变了」，点开看是谁拉动的 | 资源日报、预算简报、Token 用量简报的首页。 |
| 80 | [容量规划](https://wailii.github.io/style-atlas/gallery/#w-capacity) | 未来 6 个月 GPU 供需缺口：历史实线、预测虚线、置信带、阶梯供给、缺口斜线，右侧假设滑杆实时重算 | 采购计划、容量预警、需求预测评审。 |
| 81 | [占用方块图](https://wailii.github.io/style-atlas/gallery/#w-heatmap) | 深灰底满屏嵌套方块：部门→项目→作业，面积是卡数或费用，颜色是利用率，点方块放大下钻 | 全公司占用概览、闲置排查、费用构成。 |
| 82 | [目标记分卡](https://wailii.github.io/style-atlas/gallery/#w-scorecard) | 部门 × 指标矩阵，每格一条子弹图；达标保持黑白，只有没达标的才上红或橙 | 部门资源考核、SLA 达成、预算执行对照。 |
| 83 | [分析笔记本](https://wailii.github.io/style-atlas/gallery/#w-notebook) | 像文档一样读的月度分析：句子里嵌可点的参数，查询、图表、结论一起重算，单元格左侧有运行状态线 | 月度运营报告、巡检结论、容量评审材料。 |

### 列表与表格

<img src=".github/readme/web-g3.jpg" alt="Web · 列表与表格">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 84 | [查询栏列表](https://wailii.github.io/style-atlas/gallery/#w-querybar) | 物理机列表只有一行查询语句，条件变成可点可改的 token，补全带条数，点表格值即加条件 | 物理机与资源台账、费用明细、工单、告警等字段多、条件会组合的列表 |
| 85 | [层级表格](https://wailii.github.io/style-atlas/gallery/#w-treegrid) | 部门、资源组、机器三层台账，父行即汇总，细导线连接，筛选和移动后汇总实时重算 | 资源台账、成本中心与账单、集群与节点、任何三层以内带汇总的数据 |
| 86 | [状态条列表](https://wailii.github.io/style-atlas/gallery/#w-uptime) | GPU 服务器健康列表，每行一条 90 天状态条，一天一竖，悬停看当天故障，点机器名展开事件时间线 | 服务器与 GPU 卡健康、服务可用性、定时任务、供应商 SLA 等按天的状态列表 |
| 87 | [万行速查](https://wailii.github.io/style-atlas/gallery/#w-instant) | 10 万条云账单明细的即时搜索：输入即筛、虚拟滚动、命中高亮、键盘为主，拖滚动条冒位置气泡 | 费用明细、操作日志、审计记录、流水等十万级只读明细的检索 |
| 88 | [对比列表](https://wailii.github.io/style-atlas/gallery/#w-diffrows) | 各部门和厂商本月对上月、去年同月、预算的费用变化，一行一个哑铃，连线颜色即涨跌 | 费用与用量的期间对比、预算执行、各部门或厂商的变化排名 |
| 89 | [流程进度列表](https://wailii.github.io/style-atlas/gallery/#w-pipeline) | 资源申请单列表：每行一条五段箭头进度，当前步骤高亮并写「卡在谁 · 几天」，超时变橙 | 申请单、审批流、采购单、工单等有固定步骤的列表 |
| 90 | [时间轴列表](https://wailii.github.io/style-atlas/gallery/#w-timeline) | GPU 机器占用排期：左侧机器列表，右侧横向时间轴，占用条可拖可缩，快到期的条尾变橙 | 机器排期、会议室预约、设备借用、项目甘特图 |
| 91 | [AI 表格](https://wailii.github.io/style-atlas/gallery/#w-aitable) | 资源台账：一句话筛选变成可编辑的条件块，AI 列逐格流式生成，悬停看依据，可一键采纳 | 台账、工单、告警等需要先筛选再判断的表格 |
| 92 | [批量操作列表](https://wailii.github.io/style-atlas/gallery/#w-bulkops) | 物理机台账：勾选后表头变操作条，Shift 连选、跨页全选，执行前看影响预览，执行后 10 秒内可撤销 | 资源台账、模型列表、账号管理等需要成批修改的列表 |
| 93 | [列画像表格](https://wailii.github.io/style-atlas/gallery/#w-profiler) | 云账单明细：每个列头带分布小图，在图上拖选或点条就能筛选整张表，所有列联动 | 账单明细、调用日志、作业流水等字段多的明细表 |

### 效率与协作

<img src=".github/readme/web-g4.jpg" alt="Web · 效率与协作">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 94 | [键盘优先](https://wailii.github.io/style-atlas/gallery/#w-keyboard) | 极细灰阶的需求列表：自绘状态图标、焦点行、J/K 走、X 多选、S 改状态、⌘K 搜一切 | 需求池、工单、审批、告警、任何以列表为主的后台 |
| 95 | [块文档](https://wailii.github.io/style-atlas/gallery/#w-blocks) | 大留白的需求文档：封面和图标、衬线标题、悬停才出现的块手柄、/ 唤出块菜单、内嵌数据库三种视图 | 需求文档、会议纪要、知识库、运维手册、详情页的区块化 |
| 96 | [字段表格](https://wailii.github.io/style-atlas/gallery/#w-fieldgrid) | 像电子表格的资源台账：字段类型图标、彩色单选标签、左侧视图列表、分组小计、记录卡 | 资产台账、供应商清单、采购记录、巡检记录、配额维护 |
| 97 | [无限画布](https://wailii.github.io/style-atlas/gallery/#w-canvas) | 点阵底的流程白板：浮动工具条、8 点选中框、会走动的协作者光标、小地图和缩放 | 流程设计器、架构图、评审白板、机房平面图、审批流编辑 |
| 98 | [泳道看板](https://wailii.github.io/style-atlas/gallery/#w-swimlane) | 资源交付看板：阶段为列、负责人为泳道，列头带 WIP 上限，停滞卡片变淡标天数 | 交付流程、工单与审批、采购跟进、招聘进度 |
| 99 | [日程网格](https://wailii.github.io/style-atlas/gallery/#w-timegrid) | 周视图：半透明色块、当前时间红线、一句话新建日程，用来排 GPU 预约和评审 | 资源预约、会议室、值班排班、发布窗口 |
| 100 | [分拣收件](https://wailii.github.io/style-atlas/gallery/#w-triage) | 三栏收件箱：J/K 移动、E 归档滑走、H 稍后，预览里直接同意 / 驳回，清空有线条空状态 | 审批、告警、交付通知、工单待办 |
| 101 | [关系记录](https://wailii.github.io/style-atlas/gallery/#w-record) | 供应商记录页：左边属性点哪改哪，右边活动时间线，合同和工单点开从右侧滑出 | 供应商档案、客户档案、设备和合同详情 |
| 102 | [工单会话](https://wailii.github.io/style-atlas/gallery/#w-helpdesk) | 报修工作台：队列按 SLA 倒计时排序，回复框切内部备注变黄，输入 # 插快捷回复 | 故障报修、IT 服务台、客服工单、审批待办 |

### 开发者与 AI

<img src=".github/readme/web-g5.jpg" alt="Web · 开发者与 AI">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 103 | [黑白控制台](https://wailii.github.io/style-atlas/gallery/#w-mono) | 纯黑白灰加 1px 线，只有状态点有颜色：推理服务卡片、部署列表和实时构建日志 | 部署和 CI/CD、任务队列、开发者控制台、模型服务管理 |
| 104 | [开发者文档](https://wailii.github.io/style-atlas/gallery/#w-devdocs) | 三栏文档：右侧深色代码栏随正文滚动换示例，参数可展开，语言全页同切 | 接口文档、SDK 手册、配置项手册 |
| 105 | [编辑器](https://wailii.github.io/style-atlas/gallery/#w-ide) | 深色编辑器加 AI 助手：改动以内联红绿 diff 落地，逐块接受或拒绝 | 配置与规则编辑、批量改动预览、带 AI 的工具 |
| 106 | [块终端](https://wailii.github.io/style-atlas/gallery/#w-blockterm) | 每条命令连输出是一个块：可选中、复制、折叠，报错块能让 AI 解释 | 运维控制台、查询台、部署日志 |
| 107 | [对话与产物](https://wailii.github.io/style-atlas/gallery/#w-artifact) | 左窄对话右宽产物：文档逐块写出，有版本和对比，选中文字就地改写 | AI 写报告、方案、申请单，需要反复修改的交付物 |
| 108 | [Agent 运行台](https://wailii.github.io/style-atlas/gallery/#w-agentrun) | 一次 Agent 执行的轨迹：步骤树、甘特耗时条、输入输出 JSON，Token 和成本随步骤累计 | Agent 与工作流调试、链路追踪、流水线耗时、审批时效分析 |
| 109 | [模型市场](https://wailii.github.io/style-atlas/gallery/#w-modelhub) | 左筛选右卡片，价格用等宽大字，顶部计算器让月费随调用量变 | 机型目录、云产品选购、套餐对比、模型列表 |
| 110 | [命令启动器](https://wailii.github.io/style-atlas/gallery/#w-launcher) | 真照片上的磨砂玻璃命令面板：模糊匹配、右侧预览、⌘K 动作菜单、内置计算器 | 后台全局搜索、运维动作面板、AI 产品入口 |
| 111 | [模型调试台](https://wailii.github.io/style-atlas/gallery/#w-playground) | 同一条提示词发给多个模型，输出并排流式出现，底部实时累计 Token、耗时、费用 | 提示词调试、模型选型、A/B 方案对比、多版本结果并排 |
| 112 | [密钥与用量](https://wailii.github.io/style-atlas/gallery/#w-apikeys) | 黑色指标面板加按模型分色的每日堆叠柱，下面是带限额进度和迷你柱的密钥列表 | API 密钥、访问令牌、部门配额、预算与用量页 |
| 113 | [评测矩阵](https://wailii.github.io/style-atlas/gallery/#w-evals) | 用例乘模型的实心色块矩阵，列头给通过率和成本，点格子在右侧抽屉看输入、期望、实际输出和评分理由 | 评测集、验收清单、多版本多环境测试结果、供应商打分 |
| 114 | [代码评审](https://wailii.github.io/style-atlas/gallery/#w-review) | 合并请求评审页：检查条、带增删行数的文件树、统一或并排 diff、行内评论线程 | 代码与配置评审、文档修订、变更单审批、逐条核对 |
| 115 | [页内助手](https://wailii.github.io/style-atlas/gallery/#w-copilot) | 左边是物理机台账，右边的助手能读页面并真的改筛选、标行、转部门；每一步都落在页面上，可撤销 | 已有后台页面外挂对话助手、数据表的自然语言操作、批量处理的预览与撤销 |

### 后台换个活法

<img src=".github/readme/web-g6.jpg" alt="Web · 后台换个活法">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 116 | [账本](https://wailii.github.io/style-atlas/gallery/#w-ledger) | 纸质账簿：横线账页、借贷两栏、双下划线合计，订正用红笔划掉重写 | 部门账单、对账单、预算台账、库存流水 |
| 117 | [排版后台](https://wailii.github.io/style-atlas/gallery/#w-typeset) | 零卡片零阴影零圆角，靠字号和网格分层，巨大数字和 12 栏对齐 | 申请单、审批单、工单、台账的列表加详情 |
| 118 | [原生网页](https://wailii.github.io/style-atlas/gallery/#w-rawhtml) | 系统字体、原生控件、蓝链接紫已访问，几乎没有 CSS | 运维小工具、内部表单、数据查询页 |
| 119 | [网页桌面](https://wailii.github.io/style-atlas/gallery/#w-webos) | 真照片壁纸上浮着可拖可叠的窗口，底部是会放大的 Dock | 要同时盯几份数据的值班台、分析工作台 |
| 120 | [空间玻璃](https://wailii.github.io/style-atlas/gallery/#w-spatial) | 真照片上悬浮着磨砂玻璃窗，近大远小，鼠标一动带视差 | 个人工作区、大屏或头显上的轻量信息面板 |
| 121 | [支付后台](https://wailii.github.io/style-atlas/gallery/#w-payments) | 金额币种小、整数大、小数灰；主图悬停并排读本期和上期；点交易行滑出事件时间线 | 收款首页、费用概览、对账页、订单与结算 |
| 122 | [专注单色](https://wailii.github.io/style-atlas/gallery/#w-quiet) | 白纸黑字一种强调色，界面平时隐身，只留下正文和页边批注 | 需要集中精力的阅读、写作、文档审阅 |
| 123 | [一问一答表单](https://wailii.github.io/style-atlas/gallery/#w-oneq) | GPU 资源申请：一屏一题、超大字、A/B/C 字母键选项、按答案条件跳题，最后汇总可点回某题修改 | 资源申请、入驻、问卷、报修入口 |

### 发布与品牌

<img src=".github/readme/web-g7.jpg" alt="Web · 发布与品牌">

| # | 风格 | 样子 | 适合做 |
|---|---|---|---|
| 124 | [发布会](https://wailii.github.io/style-atlas/gallery/#w-keynote) | 黑白交替的长页，一张 3D 推理卡随滚动放大、旋转，规格用超大数字 | 产品或版本发布页、年度报告、重要功能介绍 |
| 125 | [暗场极光](https://wailii.github.io/style-atlas/gallery/#w-aurora) | 近黑底上流动的冷色光场和细网格，截图透视入场，卡片边框被指针点亮 | 开发者工具、AI 产品、命令行工具的落地页 |
| 126 | [暖纸衬线](https://wailii.github.io/style-atlas/gallery/#w-warmpaper) | 米色纸、衬线大标题、橙褐色一种强调、手绘线稿随滚动描出来 | 研究机构首页、白皮书、年度报告、需要信任感的品牌页 |
| 127 | [功能格](https://wailii.github.io/style-atlas/gallery/#w-featuregrid) | 大小不一的白格子，每格里一段会动的小演示，点开展成全宽详情 | SaaS 功能介绍页、更新发布页、后台能力总览 |
| 128 | [滚动叙事](https://wailii.github.io/style-atlas/gallery/#w-scrolly) | 左文右图，图贴住屏幕，滚到哪一段，同一批数据点就飞成哪种图 | 数据新闻、运营月报、年度复盘、方案说明 |
| 129 | [动态字排](https://wailii.github.io/style-atlas/gallery/#w-kinetic) | 整屏一个巨型单词，字母随鼠标变粗变宽，黑白加荧光黄绿 | 活动站、展览、发布会、作品集首页 |
| 130 | [3D 英雄](https://wailii.github.io/style-atlas/gallery/#w-hero3d) | 浅灰底、居中的真 3D 产品、柔和影子，拖动能转，滚动自动换角度并标注 | 消费电子、硬件产品首页，设备详情的 3D 视图 |
| 131 | [工业面板](https://wailii.github.io/style-atlas/gallery/#w-hardware) | 浅灰底、橙色圆点，一台能玩的合成器产品页 | 产品官网、设备控制台、参数调试页 |
| 132 | [复古系统](https://wailii.github.io/style-atlas/gallery/#w-retroos) | 灰色立体窗口和像素图标，一台能玩的虚拟电脑 | 个人主页、作品集、怀旧小游戏、演示页 |
| 133 | [科幻 HUD](https://wailii.github.io/style-atlas/gallery/#w-hud) | 深底青色单色线，数据中心指挥大屏 | 数据中心、调度、监控大屏、发布会开场 |
| 134 | [极繁贴纸](https://wailii.github.io/style-atlas/gallery/#w-maximal) | 撞色、粗黑边、满屏贴纸，一场市集的活动页 | 活动页、市集、潮流发布、校园和儿童产品 |
| 135 | [游戏启动器](https://wailii.github.io/style-atlas/gallery/#w-gamehub) | 深底大图轮播，悬停放大并换整页背景的游戏库 | 游戏库、影音库、课程库、模型库的首页 |
| 136 | [音乐播放器](https://wailii.github.io/style-atlas/gallery/#w-player) | 封面取色铺满整页，歌词逐行高亮滚动，波形进度条可拖，队列可排序 | 音乐、播客、课程回放、会议录音回放；后台里适合做带逐字稿的回放页 |
| 137 | [商品页](https://wailii.github.io/style-atlas/gallery/#w-store) | 左边可转可放大的三维产品，右边描边卡片选配置，价格实时滚动，滚过后底部升起购买栏 | 硬件、家电、服装、订阅套餐、云主机规格选择；后台里适合做资源申请、套餐选择 |
| 138 | [作品集](https://wailii.github.io/style-atlas/gallery/#w-folio) | 整行大字的项目列表，悬停时预览图带延迟跟着光标，点进去用整屏色块转场 | 个人作品集、工作室站、摄影集、发布会页；后台里借悬停预览和同页转场 |
| 139 | [一位抖动](https://wailii.github.io/style-atlas/gallery/#w-dither) | 黑、白加一种黄，照片实时抖成 1-bit 点阵，页面上有一个能转的曲柄 | 独立游戏、小硬件、开源工具、技术大会页；后台里借滑杆实时和悬停预览 |
| 140 | [新闻门户](https://wailii.github.io/style-atlas/gallery/#w-newsfront) | 报纸头版：衬线大报头、细线分栏、实时更新条、吸顶栏目导航、纸色白色切换 | 资讯门户、公告栏、知识库首页、发布说明；后台里借吸顶导航和同页详情 |
| 141 | [定价页](https://wailii.github.io/style-atlas/gallery/#w-pricing) | 四档套餐 + 月年切换滚动数字 + 会算钱的用量计算器，表头吸顶的对比表 | 按量计费产品的价格页、资源申请的费用预估页、套餐对比页 |
| 142 | [更新日志](https://wailii.github.io/style-atlas/gallery/#w-changelog) | 左侧吸顶日期时间轴，右侧每次更新一张大图加三色标签清单 | 产品更新日志、API 变更公告、版本发布记录 |
| 143 | [年度报告](https://wailii.github.io/style-atlas/gallery/#w-wrapped) | 一屏一章的撞色全屏故事，顶部分段进度条，章间竖条扫屏转场，末章生成分享卡 | 年度或季度回顾、使用量总结、团队复盘 |
| 144 | [设计规范站](https://wailii.github.io/style-atlas/gallery/#w-brandbook) | 琥珀黄加黑描边硬阴影的设计系统文档站：色板、字阶、组件演示台、做与不做对照，一键换深浅主题 | 设计系统文档、组件库说明、品牌规范、前端规范站 |
| 145 | [横向展厅](https://wailii.github.io/style-atlas/gallery/#w-exhibit) | 纵向滚轮驱动横向移动的线上展览，展品是线稿插画加博物馆展签，底部年代刻度尺可点 | 线上展览、品牌或产品历史、时间线叙事 |

## 规格结构

每种风格一份规格 `styles/<id>.md`，小节是固定的：

| 小节 | 写什么 |
|---|---|
| 直接抄 | CSS 变量、字体链接、调色板、关键参数，复制过去就能用 |
| 一眼认出（不能改） | 3～5 条特征，验收时逐条在画面里找 |
| 颜色、字体 | 每个色值和字重，哪些可以改、哪些一改就不像了 |
| 真图怎么处理 | 照片进来变成什么样，调哪个函数、传什么参数 |
| 动效 | 进场动画、常驻动画、点击反馈的时长和写法 |
| 组件 | 主按钮、主卡、列表、底栏怎么做 |
| 换到别的东西上 | 落到网页、视频、海报上时改哪些 |
| 容易做坏 | 常见的走样和对应的改法 |
| 参考实现 | 参考页里对应的函数名 |
| 学什么交互（桌面 Web 才有） | 3～5 条能搬到别的产品上的做法：做法、为什么好用、放到后台产品上怎么用 |

部分风格还有「底和纹理」「线和形」两节。下面是浮世绘「直接抄」一节的原文：

```css
:root { --paper:#f1e6cd; --blue:#22406b; --blue2:#6c8db3; --pale:#c9d8df; --red:#cc4a2c; --ochre:#d8a443; --ink:#1d1b19; }
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&display=swap");
.cart { writing-mode: vertical-rl; background: var(--ochre); border: 2px solid var(--ink); box-shadow: inset 0 0 0 3px var(--ochre), inset 0 0 0 4px var(--ink); }
```

```js
UKIYO = ["#1d1b19","#22406b","#6c8db3","#c9d8df","#f1e6cd","#f6eedb","#cc4a2c","#d8a443","#8a6d48"]
posterCanvas(img, W, H, UKIYO, { edge:.22, soft:4 })
crest(x,t) = 62 + 16·sin(x/46 + t) + 7·sin(x/19 − 1.4t) + 4·sin(x/9 + 2.1t)   // 浪
```

## 真图处理

<img src=".github/readme/image-processing.jpg" alt="同一张封面经过 14 种风格处理">

同一张新闻封面，经过 14 种风格的处理函数。这些函数都是浏览器里的 canvas 代码，放在 `gallery/common.js` 和 `gallery/engines.js`，不调用生图模型，也不需要后端。每个函数的参数见 [ENGINES.md](ENGINES.md)。

## 动效

<img src=".github/readme/motion.gif" alt="五种风格参考页的开场动画">

参考页打开后前 5 秒的录屏：窗花一折折展开，墨从一点晕开，彩色玻璃一块块亮起来，点云被激光扫出来，水彩一层层刷上去。每份规格的「动效」一节写了时长、缓动和帧率，定格类风格按 8～12 帧/秒走，顺滑类用弹簧或 smooth 曲线。

## 视频

<img src=".github/readme/video-frames.jpg" alt="纸拼贴视频参考的四帧">

`gallery/v-collage.html` 是一条 12 秒、1080×1920 的纸拼贴竖屏视频。页面提供 `seek(t)`，每一帧只由时间 t 决定，所以能逐帧截图、直接渲染成 MP4：

```bash
node tools/snap.mjs --file gallery/v-collage.html --video out.mp4 --w 1080 --h 1920 --scale 1 --fps 24
```

用别的风格做视频，照 [media.md](media.md) 视频一节的骨架改。

## 混搭

两种风格可以拼着用：一种定底、颜色和字体，另一种只借一到两层（真图处理、线和形、节奏、反馈）。[mixing.md](mixing.md) 里有规则和试过的组合，例如：

| 底 | 借 | 效果 |
|---|---|---|
| 瑞士排版 | 孔版印刷的蓝粉双色网点图 | 网格海报，图有印刷感 |
| 极简变形 | 点云测绘的头图 | 产品发布感，头图会转 |
| 水墨 | 窗花剪纸的红色小图标 | 节日版的国风 |

## 验收工具

```bash
# 截图：自动起本地服务，等动画跑完再截
node tools/snap.mjs --file 你的页面.html out.png --wait 7000

# 检查每种风格的规格、参考页、标准截图、目录项是否齐全
node tools/check.mjs
```

`snap.mjs` 还能 `--click` 截点击后的样子、`--frames` 给视频页抽帧。本地看全部参考页：`python3 -m http.server 8960 -d gallery`，浏览器打开 `http://localhost:8960`。

## 目录结构

```
SKILL.md          agent 读的入口：风格目录、选风格的办法、工作步骤
styles/<id>.md    70 份手机风格规格；styles/w-<id>.md 75 份桌面 Web 规格
web.md            桌面 Web 75 种：七组、按要做的页面挑、外观被设计系统定死时只搬交互
realistic.md      写实精选：10 种写实风格怎么用、素材从哪来、怎么不造假
cinematic.md      炫酷精选：22 种冲击力最强的风格，按网页 / 设计 / Dashboard / 视频 / App 分好
media.md          落到 App、网页、视频、动画、海报时怎么改
mixing.md         混搭规则
ENGINES.md        图片处理和动效函数的用法
DATA.md           参考页的数据格式，怎么换成自己的内容
gallery/          手机参考页 s-<id>.html、桌面参考页 w-<id>.html、视频参考 v-collage.html、朱墨剧场体验页 x-crimson.html 和 Dashboard d-crimson.html、共用代码、标准截图 shots/
tools/            截图工具 snap.mjs、完整性检查 check.mjs
```

## 出处

每种风格的来源写在规格开头和 `gallery/styles.js` 里，主要有：

- [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar)（MIT）：31 种风格参考了它的风格库
- [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)（MIT）：14 种风格参考了它的风格表
- WY（[@akokoi1](https://x.com/akokoi1)）用 Opus 5.5 做的线稿、水墨等代码动画
- 各风格规格里列出的视频提示词、skill 仓库和设计文章
- 桌面 Web 75 种：每份规格开头的「出处」列了参考的公开产品和网站，只学布局和交互做法，不复刻外观；参考页里的公司、人名、机器和金额都是编的

`gallery/vendor/rough.js` 是 [Rough.js](https://github.com/rough-stuff/rough)（MIT）。示例数据取自 2026 年 10 月 22 日晚的 AI 热点热榜，`gallery/img/` 里的封面图版权归原发布方。

## 许可

[MIT](LICENSE)。`gallery/img/` 里的示例封面图不在许可范围内。
