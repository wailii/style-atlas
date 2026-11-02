# 产品棚拍（studio）

像苹果产品页那样拍一件东西：浅灰无缝背景纸从地面弯上去变成墙，一盏大柔光从右上打下来，地上一圈软软的贴地阴影；产品是真的 PBR 3D 模型实时渲染，金属上的高光就是柔光箱的形状。上面压一行又大又紧的标题，下面是配色圆点、一个蓝色胶囊按钮和一排规格大数字。东西能拖着转，页面往下滚它也跟着转。

出处：图鉴原来 60 种全是「画出来」的风格（插画、印刷、漫画、复古界面），缺真光、真材质、真镜头的写实风格，于是加了「写实 · 影像」一组，这是第一种。语法来自苹果官网产品页（https://www.apple.com）的大标题 + 棚拍产品图 + 规格行，和商业静物摄影里的无缝背景纸、柔光箱（https://en.wikipedia.org/wiki/Softbox）布光。3D 模型 Chronograph Watch 来自 Khronos glTF Sample Assets（https://github.com/KhronosGroup/glTF-Sample-Assets，Eric Chadwick，CC-BY 4.0），用 three.js（https://threejs.org）r128 渲染。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap");
:root { --ink:#1d1d1f; --mute:#6e6e73; --faint:#86868b; --line:#d2d2d7; --bg:#f5f5f7; --card:#fff; --link:#0066cc; --blue:#0071e3; --new:#b64400; }
body { font-family: Inter, "Noto Sans SC", sans-serif; letter-spacing: -.01em; }   /* 拉丁字一定先走 Inter，不然会掉到衬线 */
h1 { font: 700 52px/1.02 Inter; letter-spacing: -.035em; }                      /* 产品名：大、紧 */
.eyebrow { font: 600 15px Inter, "Noto Sans SC"; color: var(--new); }             /* 「新」「热度第 1」那行小橙字 */
.nav { background: rgba(245,245,247,.72); backdrop-filter: saturate(180%) blur(20px); border-bottom: .5px solid rgba(0,0,0,.12); }
.btn { background: var(--blue); color: #fff; border-radius: 980px; padding: 10px 20px; }
.more::after { content: " ›"; }  /* 蓝色文字链 */
```

```js
// three.js r128：色调映射 + 物理灯光 + 只在转动时更新阴影
r.outputEncoding = THREE.sRGBEncoding; r.toneMapping = THREE.ACESFilmicToneMapping; r.physicallyCorrectLights = true;
r.shadowMap.enabled = true; r.shadowMap.type = THREE.PCFSoftShadowMap; r.shadowMap.autoUpdate = false;
// 反射环境：深灰房间 + 四块发光板（顶 7、左前长条 12、右后轮廓 7、正面反光板 1.4，数值是亮度倍数）→ PMREM
// 背景纸：剖面 = 地面（z 9 → -1.4）+ 半径 2.4 的四分之一圆 + 竖墙到 y 14；颜色 #e4e4e8、粗糙度 .95、envMapIntensity .32
// 主光：SpotLight(白, 300, 0, .62, penumbra 1) 在 (1.5, 7.8, 5.2) 指向产品；补光 DirectionalLight .5 + HemisphereLight(白, #d8d8dc, 1.1)
// 贴地阴影：正交相机从地面往上拍深度（alpha = (1-z)^1.6 × 1.25）→ 256² 两遍高斯模糊 → 贴在地面，不透明度 .9
// 产品按高度 1 归一；镜头 fov 24、从 (0, 1.3, 7.4) 看 (0, .7, 0)；入场曝光 .06 → 1、镜头往前推 1.6
```

## 一眼认出（不能改）

- 背景是一整张浅灰背景纸：地面弯上去变成墙，没有地平线，中间亮、四角暗下去
- 产品是真 3D、真材质：金属里能看见柔光箱的长条高光，玻璃表盘透出下面的刻度
- 产品下面两层影子：贴地一圈软黑（接触阴影）+ 主光投出的一道斜影
- 产品名大、粗、字距收紧，上面一行小橙字，下面一句灰黑副标题；居中
- 蓝色胶囊按钮 + 蓝色「了解更多 ›」文字链；配色小圆点，选中的外面一圈黑环
- 一排规格大数字，发丝线隔开，数字下面小灰字
- 磨砂浅灰导航条，右边一个蓝色小胶囊

## 颜色

- 页面底 `#F5F5F7`，卡片白 `#FFFFFF`；字 `#1D1D1F`，次要 `#6E6E73`，更淡 `#86868B`，发丝线 `#D2D2D7`
- 只有两种「颜色」：蓝 `#0071E3`（按钮）/ `#0066CC`（文字链），橙 `#B64400`（眉题那一行）
- 产品自己的颜色来自模型材质；配色圆点取材质的平均色（白 `#E9E7E2`、金 `#C9A46A`、绿 `#45644C`、红 `#B8262A`）
- 背景纸的灰是灯光算出来的，不手调成渐变

## 字体

- Inter 600/700（苹果 SF Pro 的替身）+ Noto Sans SC 500/600/700
- 产品名 52px、字距 -0.035em、行高 1.02；副标题 19px 600；规格数字 28px 600 等宽数字
- 正文 15px，次要说明 11–12px；不用衬线、不用斜体、不用全大写

## 真图怎么处理

- 主角不用照片，用真 3D 模型：glTF 自带的 PBR 贴图原样用，只把玻璃改成低不透明度 + 强反射（r128 的 transmission 会把表盘糊成白色）
- 模型自带 `KHR_materials_variants` 时，按 `parser.json` 里每个零件的映射换材质，做成配色圆点
- 列表里的新闻封面原图放进 52px 圆角 10px 的白卡小图，不加滤镜
- 页面上写明「示意产品，非新闻实物」和模型署名

## 动效

- 入场：字先上（透明度 + 上移 16px，0.9s，依次差 90ms），棚里从暗到亮（曝光 .06 → 1，1.5s）同时镜头往前推
- 规格数字从 0 数上去（0.9s，ease-out）
- 拖动横向转产品；页面往下滚，产品按滚动量慢慢转（`scrollTop × .004` 弧度）
- 「360°」按钮：转台慢转（每毫秒 .0009 弧度），再点停
- 只在转动时重算阴影；不转时一帧都不多画

## 组件

- 状态栏 + 产品导航：磨砂浅灰，左产品名，右几个小链接 + 蓝色「订阅」小胶囊
- 首屏：眉题 / 产品名 / 副标题 → 3D 产品 → 配色名 + 圆点 → 蓝胶囊 + 文字链 → 一行灰色小注（示意 + 署名）
- 规格行：四格，大数字 + 小灰字
- 「了解更多」展开一段摘要（grid-template-rows 0fr → 1fr）
- 列表：白色大圆角卡里一行一条，左编号、中标题和数据、右小图或 ›
- 底栏：iOS 磨砂底栏，选中项蓝色

## 换到别的东西上

- **网页 / 落地页**：每屏一个产品角度，滚动驱动转台和镜头推近；标题在产品上方，规格屏用超大数字；背景纸贯穿全页，段落之间只换背景纸亮度（`#F5F5F7` ↔ `#FFFFFF` ↔ 黑色反转屏）
- **App**：首屏照参考页；商品详情页把配色圆点做成真换材质；购物车里的小图也用同一个影棚实时渲染的缩略图
- **Dashboard**：KPI 是「规格行」：大数字 + 小灰字，发丝线分隔，不加卡片阴影；图表只用一种蓝色线条或柱子，背景白卡；表格做成苹果「比较机型」那种逐行对比，勾和横线代替颜色；顶部放一个 3D 主体（产品、设备、地球）占首屏一半
- **视频**：黑场 → 柔光箱一盏盏亮起 → 产品在背景纸上慢转半圈 → 镜头推近到材质细节（拉丝、表盘）→ 大标题落字；镜头只用慢推、慢摇、转台，不用快切；声音是低频轰鸣 + 一两声干净的合成器音符，落字时一声轻「叮」
- **海报设计**：上方 1/4 放产品名大字，中间产品棚拍，下方一行规格小字和价格；背景纸的灰从中间亮到四角，留白至少 40%

## 容易做坏

- 用 CSS 渐变假装背景纸：要真 3D 的弯面被灯照出来，才有地面和墙的过渡
- 背景纸亮度全打满变成纯白一片：主光强度和背景纸颜色要压到中间亮 `#F2F2F4`、四角 `#D6D6DA` 左右
- 环境太亮：金属会变成奶油色塑料；反射环境要大面积深灰 + 几块亮板
- 背景纸三角面朝下（法线反了）就整片看不见，只剩清屏颜色
- 拉丁字落到衬线体：`font-family` 先写 Inter 再写 Noto Sans SC
- 无头 Chrome（SwiftShader）第一帧要编译着色器 3–4 秒：入场动画从第一帧画完再开始计时，字和数字不要等 3D

## 参考实现

页面（`gallery/s-studio.html`）：`studioEnv()` 柔光箱环境、`sweep()` 无缝背景纸、`contact()` 贴地阴影（深度 → 两遍模糊）、`variant()` 读 `KHR_materials_variants` 换配色、`draw()` 按需渲染、滚动转台
模型：`gallery/models/ChronographWatch.glb`（来源和许可见 `gallery/models/CREDITS.md`）
