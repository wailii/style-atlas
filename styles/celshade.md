# 三渲二（celshade）

真的 3D 场景，渲染成 2D 动画的样子：光只分两三段、硬切；物体外面一圈等宽黑墨线；最暗那段用屏幕空间的斜排线填，线越暗越粗；颜色是平涂的高饱和色，暗面换色相、不是加黑。物体一拍两帧（12 帧/秒）地动，镜头却是顺滑推进的——这个「手绘的身体、摄影机的镜头」就是三渲二的味道。

出处：灵感来自抖音 @Motdes AI阿峰《fable 5.5 网页设计的未来？》里录屏的「The Notturno Experience」（意大利开胃酒品牌的滚动驱动 3D 网页：真 3D 模型用卡通/墨线着色器渲染成漫画插图）；语法学自 Cel shading（https://en.wikipedia.org/wiki/Cel_shading）——《蜘蛛侠：平行宇宙》的一拍两帧和排线阴影、《原神》《罪恶装备》的三渲二角色。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,600;0,700;1,700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --paper:#f6f1e7; --ink:#111; --blue:#2a45ff; --blue2:#1a2a9c; --yel:#ffcf1f; --yel2:#f08a00; --cor:#ff5536; --cor2:#b8233a; --mint:#1fcfa4; --mint2:#0d7f86;
        --hatch: repeating-linear-gradient(-45deg, var(--ink) 0 1.2px, transparent 1.2px 5px); }
/* 界面也是两段光：亮面 / 暗面硬切，暗面压排线 */
.chip { background: linear-gradient(160deg, var(--yel) 0 68%, var(--yel2) 68%); border: 2.5px solid var(--ink); box-shadow: 3px 3px 0 var(--ink); }
.chip::after { background: var(--hatch); mask: linear-gradient(160deg, transparent 0 68%, #000 68%); }
h1 { background: linear-gradient(172deg, var(--yel) 0 58%, var(--yel2) 58%); -webkit-background-clip: text; color: transparent; -webkit-text-stroke: 2.6px var(--ink); paint-order: stroke fill; filter: drop-shadow(3px 3px 0 var(--ink)); }
```

```glsl
// 片元：d = dot(N, L)
col = d > 0.28 ? base : shade;                       // 两段：亮 / 暗（shade 是换了色相的暗色）
if (d < -0.12) { float s = 5.0 * dpr, k = mod(gl_FragCoord.x + gl_FragCoord.y, s);
  if (k < mix(0.16, 0.55, clamp((-d - 0.12) / 0.6, 0., 1.)) * s) col = ink; }   // 第三段：屏幕空间 45° 排线，越暗越粗
if (pow(max(dot(N, H), 0.), 70.) > 0.55) col = mix(col, vec3(1), .9);           // 硬高光点
if (1. - dot(N, V) > 0.66 && d > 0.) col = mix(col, vec3(1), .4);              // 硬边缘光
// 描边：同一个几何体再画一遍，只画反面，顶点沿「平滑后的法线」在屏幕空间外推 3px
clip.xy += normalize((normalMatrix * snormal).xy) * 3.0 * dpr * clip.w * 2.0 / resolution;
```

```js
// 节奏：物体、灯光按 12 帧/秒取样；镜头每帧更新
const tick = Math.floor(t * 12);  // 只在 tick 变了的时候改 rotation
// 进场：0.45s 剪影 → 0.85s 亮/黑 → 1.25s 两段 → 三段 + 排线 + 高光；镜头 2.4s 推近（fov 34→26，ease-out cubic）
```

## 一眼认出（不能改）

- 真的 3D（会转、有透视），但看起来是画出来的：光两三段硬切，没有任何渐变
- 每个物体一圈等宽黑墨线（反面外扩法），屏幕上粗细一致
- 最暗的那段是斜排线，线宽跟着暗度变
- 物体一拍两帧地动（12 帧/秒，一顿一顿），镜头顺滑
- 平涂的高饱和色；暗面换色相（黄→橙、蓝→深蓝紫、白→灰紫），不是加黑
- 漫画分镜框 + 集中线背景 + 旁白框标题

## 颜色

- 纸 `#F6F1E7`，墨 `#111111`
- 每个颜色成对给：钴蓝 `#2A45FF`/`#1A2A9C`，柠黄 `#FFCF1F`/`#F08A00`，珊瑚 `#FF5536`/`#B8233A`，薄荷 `#1FCFA4`/`#0D7F86`，粉 `#FF8FB8`/`#C0407A`，白物体的暗面 `#8F98D6`
- 镜头底：钴蓝平涂 + 120 条集中线（2/3 纸色 22%、1/3 墨色 50%）+ 一个两段光的黄太阳
- 界面里色块和 3D 物体用同一套颜色对

## 字体

- Noto Sans SC 900（标题、标题框）/ 500～700（正文）
- Chakra Petch 700 斜体（编号、数字、HUD：EP.01、CAM 85mm、12fps）
- 大标题：两段光填色 + 2.6px 黑描边 + 3px 实心黑影

## 真图怎么处理

- 封面先压成平涂：`posterCanvas(img, 640, 360, 八色调色板, { edge: 0.1, soft: 2 })`——只剩风格色板里的颜色，色块交界描黑线
- 再当贴图贴到 3D 石碑的正面（`CanvasTexture`），走同一个三渲二着色器：贴图颜色当亮面，`贴图 × #5A64C8` 当暗面，所以封面也会被光切成两段、暗处也有排线
- 列表：有封面的做成一块小石板（同样贴图）；没封面的把 `DOODLE` 线条路径解析成 3D 曲线，用 `TubeGeometry` 做成立体管子

## 动效

- 灯分步亮起：剪影（全黑）→ 亮/黑 → 两段 → 三段 + 排线 + 高光，每步 0.4s，右上角 LIGHT 三格跟着点亮
- 镜头 2.4s 推近（同时 fov 变窄、略微抬低机位），镜头是顺滑的
- 物体（转台、圆环、碎块、小图）一律 12 帧/秒取样，一顿一顿地转
- 打光：主光换方向时直接跳过去，不过渡
- 冲击帧：点「听」时镜头反色两帧（`invert(1) contrast(3) grayscale(1)`，84ms）+ 镜头震一下
- 版面元素用 `steps(6)` 弹出（先过冲一点再落定），同样是一拍两帧的手感

## 组件

- 主镜头：漫画分镜框（3px 黑框、右下切角）+ WebGL 场景（领奖台、贴着头条封面的石碑、三只车床瓶子、圆环、漂浮碎块、硬边投影）+ 左上大编号「01」（纸色填充黑描边）+ 右上 HUD（CAM 焦段、12fps、LIGHT 三格）+ 左下「打光 1/4」按钮
- 标题框：旁白框，压在镜头下沿、歪 1.2°、5px 实心黑影，关键词底下一道黄色荧光笔
- 数据块：三块两段光色块（黄、薄荷、珊瑚），暗面压排线
- 主按钮：圆形，两段光 + 一个硬高光点 + 暗面排线；播放时变成一拍两帧跳的声波条
- 列表：白卡 + 黑边 + 4px 实心影，左边 70px 小 3D 场景（各自平涂底色，一顿一顿地摆），点开时小物体转一整圈
- 底栏：选中项是一块两段光的薄荷色块

## 换到别的东西上

- 网页
  - 首屏就是一个可拖动转台：鼠标横移 = 转台转（仍按 12 帧/秒取样），滚动 = 镜头推近 / 换机位
  - 悬停：卡片的光换方向（亮面暗面互换），按钮出现硬高光点
  - 滚动驱动：每一节一个新机位，切镜用冲击帧（反色两帧）或集中线一闪
- App
  - 3D 只放一个（主卡），其余用 CSS 两段光假装；进场 ≤ 2.5s
  - 点击反馈：被点的东西 12 帧/秒转一圈或弹一下；切 tab 打一次冲击帧
- Dashboard（图表、大数字、表格）
  - 柱状图做成 3D 柱子（BoxGeometry），同一盏主光：顶面亮、侧面换色相暗、背光面排线；柱子长出来按 12 帧/秒一格一格长
  - 大数字：两段光填色 + 黑描边 + 实心影，像游戏结算画面；数字滚动也一拍两帧
  - 折线：粗黑线 + 节点是三渲二小球；表格行是两段光色块，表头黑底黄字
- 视频（镜头、转场、声音）
  - 镜头：慢推 / 环绕（顺滑），角色和物体一拍两帧；关键时刻定格 + 集中线
  - 转场：冲击帧（反色 2～3 帧）、灯光分步切换（亮 → 剪影 → 亮）、从剪影里分步打光出画面
  - 声音：打击乐硬切、「唰」的速度线音效、落定时一个短促的鼓点；灯光每跳一步配一声「咔」
- 海报设计
  - 一个 3D 主体占画面 60%，低机位仰拍；背景平涂 + 集中线；大标题两段光 + 黑描边
  - 渲染一帧大图（`renderer.setPixelRatio(4)`），排线间距按印刷尺寸放大，不要糊成灰
- 适合：游戏、动画、潮牌、新品发布、年轻向产品、活动主视觉

## 容易做坏

- 用 MeshToonMaterial 直接出图：有渐变、没排线、没描边，就是普通低多边形
- 描边用原始法线外扩：方块的角会裂开——要先把同一位置的法线平均（`smoothNormals`）
- 暗面直接乘黑：脏。每个颜色手挑一个换色相的暗色
- 物体也按 60 帧顺滑转：立刻变成普通 3D 产品展示，三渲二的味道全没了
- 排线跟着物体 UV 走：会被透视拉歪。排线必须在屏幕空间（`gl_FragCoord`）
- 场景放太多东西：画面糊成一片色块。5～8 个物体、3～4 种颜色

## 参考实现

页面（`gallery/s-celshade.html`，three.js r128，`vendor/three.min.js`）：`TOON_V` / `TOON_F`（三段光 + 屏幕排线 + 硬高光 + 硬边缘光）、`LINE_V`（反面外扩描边）、`smoothNormals()`、`inked()`、`lathe()` / `hard()`（车床轮廓点重复一次 = 硬转折）、`coverTex()`（封面平涂成贴图）、`doodleGroup()`（线条图标 → 立体管子）、`nextFrame()`（rAF 停了退回 setTimeout）。截图：WebGL 在无头 Chrome 里走 SwiftShader；和别的页同一个 Chrome 并发截时 GPU 合成偶尔会卡住，单独截 `node tools/snap.mjs celshade` 最稳
