# 拟物（skeuo）

iOS 6 年代的真实材质：亚麻布底、缝线皮革顶栏、金属旋钮带指示灯、拍立得照片、黄色便签纸、指针表盘、分组白色列表。每样东西都有高光、阴影和压纹字。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 13 行 Skeuomorphism：realistic textures、3D、tactile）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --linen:#dfe2e6; --ink:#2b2f36; --mute:#6d7480; --leather:#6b4a2e; --blue:#2f7fe0; }
body { font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Noto Sans SC", sans-serif; }
.emboss { text-shadow: 0 1px 0 rgba(255,255,255,.85); }                                     /* 浅底压纹 */
.bar { background: linear-gradient(#8a6440,#6b4a2e 60%,#5a3d25); box-shadow: 0 3px 8px rgba(0,0,0,.4); }
.bar::after { content:""; position:absolute; left:6px; right:6px; bottom:5px; border-bottom: 2px dashed rgba(240,215,170,.75); }  /* 缝线 */
.knob { border-radius: 50%; background: radial-gradient(circle at 50% 30%,#fdfdfd,#b9bec7 45%,#7e848f 70%,#c9cdd4); box-shadow: 0 3px 6px rgba(0,0,0,.5), inset 0 1px 1px #fff, inset 0 -2px 3px rgba(0,0,0,.35); }
.knob::before { content:""; position:absolute; inset:6px; border-radius:50%; background: repeating-conic-gradient(rgba(255,255,255,.15) 0 4deg, rgba(0,0,0,.05) 4deg 8deg); }  /* 拉丝 */
.led.on { background: radial-gradient(circle at 40% 35%,#e6ffd6,#3bd14a 60%,#1c8a28); box-shadow: 0 0 8px 2px rgba(59,209,74,.7); }
.notepad { background: #fff7b8 repeating-linear-gradient(transparent 0 25px,#a9c4e8 25px 26px); }
.notepad::before { content:""; position:absolute; left:32px; top:0; bottom:0; width:1.5px; background:#e8807b; }  /* 红竖线 */
.row.open { background: linear-gradient(#5ea7ff,#2f7fe0); color:#fff; }                     /* iOS 6 选中蓝 */
```

```js
// 指针：有质量的弹簧，甩过头再晃回来（每帧 4 小步）
for (let i = 0; i < 4; i++) { const acc = -60 * (nv - target) - 7 * nvv; nvv += acc / 240; nv += nvv / 240; }
// 拍立得显影：从一片灰白慢慢出颜色
img.animate([{ filter: "brightness(2.2) contrast(.3) saturate(0) sepia(.4)" }, { filter: "brightness(1.4) contrast(.6) saturate(.4) sepia(.3)", offset: .4 }, { filter: "none" }], { duration: 3200, delay: 400, easing: "ease-out", fill: "backwards" });
```

## 一眼认出（不能改）

- 材质是真的：亚麻、皮革、拉丝金属、纸、胶带
- 每个凸起都有上白下黑的高光阴影，字有 1px 压纹
- 物件感：拍立得、便签本、表盘、旋钮，像放在桌上
- 顶栏缝线；列表是 iOS 6 的分组白卡，选中变蓝渐变

## 颜色

- 亚麻灰 `#DFE2E6`；皮革棕 `#6B4A2E`；字 `#2B2F36`
- 便签黄 `#FFF7B8` + 蓝横线 `#A9C4E8` + 红竖线 `#E8807B`
- 选中蓝 `#5EA7FF → #2F7FE0`；指示灯绿 `#3BD14A`；表盘红区 `#C4302B`

## 字体

- Helvetica Neue / 苹方 / Noto Sans SC（系统字，iOS 6 的样子）
- 手写：Kalam（拍立得、便签上的字）

## 真图怎么处理

- 原图放进拍立得（白边、下边宽），整张歪 3°，上角贴半透明胶带；入场时做「显影」：从发白到正常

## 动效

- 入场：拍立得甩着落到桌上；表盘从右边滑进；便签从下面推上来；列表逐行淡入
- 表盘指针用弹簧甩到热度值，甩过头再回来
- 按旋钮：凹下去、指示灯亮绿、指针跟着「音量」小幅抖
- 点列表行：变蓝渐变、展开

## 组件

- 顶栏：皮革 + 缝线 + 压纹标题 + 金属旋钮（带指示灯）
- 桌面区：拍立得头图 + 热度表盘（带刻度、红区、铭牌）
- 便签：头条标题 + 手写摘要
- 列表：分组白卡，左边彩色渐变小图标（或小图），右边箭头
- 底栏：iOS 6 光面黑色标签栏

## 换到别的东西上

- 网页：复古工具、音频软件、怀旧专题、手账类产品
- 视频：物件特写、指针摆动、纸张翻动；声音用机械咔嗒
- 不适合要显得现代极简的品牌

## 容易做坏

- 材质只有渐变没有纹理，像塑料
- 阴影方向不一致（统一光从上方来）
- 什么都拟物，信息找不到；数字、标题保持清楚

## 参考实现

页面（`gallery/s-skeuo.html`）：`linen()` / `leather()` 纹理、`.knob` / `.gauge` / `.notepad` / `.polaroid`、指针弹簧 `swing()`
