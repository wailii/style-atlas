# 3D 英雄（w-hero3d）
浅灰底，正中一个可以拖动旋转的真 3D 产品，脚下一圈柔和的影子，文字只有一行标题和几句短话。往下滚，模型自己转到不同角度，并伸出引线标注细节；底部可以换配色和质感。适合消费电子、硬件、设备类产品的首页和详情页。
出处：Apple AirPods 产品页（https://www.apple.com/airpods/）；Spline 社区的 3D 网页作品（https://spline.design）。

## 直接抄

```html
<script src="vendor/three.min.js"></script><script src="vendor/three-GLTFLoader.js"></script><script src="vendor/three-RoomEnvironment.js"></script>
```

```css
:root{--bg:#e8eaee;--ink:#0f1115;--ink2:#5a5f6b;--mute:#9298a5;--line:rgba(15,17,21,.14)}
#gl{position:fixed;inset:0;width:100vw;height:100vh;cursor:grab} #gl.drag{cursor:grabbing}
.title h1{font-size:60px;font-weight:300;letter-spacing:-.03em} .title h1 b{font-weight:600}
.sw button{width:28px;height:28px;border-radius:50%;background:var(--c)} .sw button.on:after{content:"";position:absolute;inset:-6px;border-radius:50%;border:1.5px solid var(--ink)}
.cl,.cl2{paint-order:stroke;stroke:#e8eaee;stroke-width:5px}                     /* 引线文字加底色描边，压在模型上也能读 */
```

```js
// 环境光 + 渲染设置
R.outputEncoding = THREE.sRGBEncoding; R.toneMapping = THREE.ACESFilmicToneMapping;
scene.environment = new THREE.PMREMGenerator(R).fromScene(new THREE.RoomEnvironment(), .04).texture;
// 拖动惯性：松手后速度每帧乘 0.94；闲置 2.2 秒后偏移每帧乘 0.965 回到滚动指定的角度
if (!dragging) { offY += vx; vx *= .94; if (now - lastDrag > 2200) offY *= .965; }
pivot.rotation.set(cur.pitch + offX, cur.yaw + offY, 0, 'YXZ');
// 滚动关键帧：sp = scrollY / 可滚高度 * (段数-1)，相邻两帧之间 smoothstep 插值，实际角度再缓动 9%
const o = keyframe(sp);  cur.yaw += (o.yaw - cur.yaw) * .09;
// 引线锚点由网格几何算出（不手填坐标），每帧用 localToWorld + project 投到屏幕
v3.set(a.p[0], a.p[1], a.p[2]); pivot.localToWorld(v3); v3.project(cam);
// 配色：把网格材质按名字换成带后缀的变体
o.material = mats[base + suffix] || mats[base];
```

## 一眼认出（不能改）

- 浅色底，一个居中的真 3D 模型占画面一半以上高度
- 模型脚下一圈柔边影子，转动时影子形状跟着变
- 极少文字：一行大标题（细体加粗体）、一行副标题
- 拖动旋转，松手有惯性，闲置后回到当前段落的角度
- 滚动时模型转到不同角度，同时出现带圆点的细引线标注
- 底部圆形色块切换配色，旁边「亮面 / 哑光」分段切换

## 颜色

- 底 `#E8EAEE`，字 `#0F1115`，次级 `#5A5F6B`，弱字 `#9298A5`
- 界面只有黑白灰；颜色全部来自产品本身（色块直接取产品的色）
- 引线 `#0F1115` 1px，端点空心圆加实心点

## 字体

- Inter（西文与数字）+ Noto Sans SC，字重 300 / 400 / 500 / 600
- 标题 60px，300 与 600 混排；说明 14px，字重 300，行高 1.8
- 导航、标签、提示用 12~13px，字距 .08~.16em

## 真图怎么处理

- 不用照片，主角是 glb 模型。模型来自 `gallery/models/`，页脚小字写作者与许可
- 模型归一化：量包围盒，缩放到高度 1，居中；相机距离按「模型占屏幕高度 54%」反推
- 玻璃材质：关掉 transmission，改半透明（opacity .16），否则会渲染成不透明白块

## 动效

- 载入：中间一个百分比数字加 2px 进度条，完成后整层淡出；模型从 86% 放大加旋转入场 1.6 秒
- 拖动：速度惯性衰减；段落切换：角度、缩放、位置一起缓动
- 引线：模型转到位（角度差小于 3°，没有在拖动）后才淡入，转走时先淡出
- 说明文字每段 500ms 淡入，左右位置随引线方向换边

## 组件

- 顶栏：品牌字标、四个链接、描边胶囊购买按钮
- 标题块（只在首屏）、段落说明块（左或右，视引线方向）
- 右侧段落圆点，可点击跳转
- 底部：圆形色块 + 色名 + 分段切换 + 提示
- 载入层、SVG 引线层、阴影面片

## 学什么交互

- 滚动驱动模型换角度 → 一个对象讲清多个卖点，用户不用点开多个详情 → 放到资源详情页：滚动时一台服务器的 3D 或示意图依次转到前面板、后面板、散热，标出接口与指示灯
- 引线锚点由几何算出，转到位才出现 → 标注永远贴在对的位置，不闪不漂 → 放到机房机架视图：标注某一台设备的位置，随视角切换
- 拖动有惯性，闲置后回到原位 → 手感自然，又不会留在奇怪的角度 → 放到拓扑图 / 机房图：拖动后自动复位到默认视角
- 配色和质感就地切换，对象立即变化 → 选配不必跳页 → 放到套餐配置：选卡型号 / 数量，右侧示意图立即更新
- 载入进度做成页面本身的一部分 → 大模型也不显得卡 → 放到大屏或 3D 视图加载

## 换到别的东西上

- 消费电子、家居、汽车配件的产品页
- 后台里只适合做门户首页、设备详情的 3D 视图
- 不适合表格、表单为主的页面

## 容易做坏

- 模型太小，像贴了张图
- 没有影子，模型悬空发飘
- 引线在模型还在转的时候就出现，位置飘
- 文字太多，抢了模型
- 玻璃、透明材质当不透明渲染，出现大白块
- 色块用渐变或高光，和真实产品色对不上

## 参考实现

`gallery/w-hero3d.html`：`computeAnchors()` 锚点、`apply()` 配色与质感、`keyframe()` 滚动关键帧、`frame()` 渲染与惯性、`setStage()` 段落切换与引线。
