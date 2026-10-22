# Y2K 铬金属（y2k）

千禧年的数码幻想：液态铬、镭射彩虹、果冻胶囊按钮、到处闪的星光。底色是浅浅的粉、青、紫，东西都亮晶晶、圆鼓鼓。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 40 行 Y2K Aesthetic：chrome、holographic、bubble、iridescent）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Michroma&family=Noto+Sans+SC:wght@500;700;900&display=swap");
@property --a { syntax: "<angle>"; inherits: true; initial-value: 0deg; }
:root { --ink:#2a2140; --mute:#6c6488; --pink:#ff69b4; --cyan:#29e0ff; --purple:#9b5cff;
  --chrome: linear-gradient(180deg,#fff 0%,#c9cbd6 22%,#6f7182 42%,#f4f5fa 52%,#a3a6b8 64%,#e9eaf2 82%,#8b8ea1 100%);
  --holo: conic-gradient(from var(--a),#ff9ad5,#a3f7ff,#c8a8ff,#fff3a8,#ff9ad5); }
.app { background: radial-gradient(120% 70% at 20% 0%,#ffe3f4 0%,transparent 55%), radial-gradient(120% 70% at 100% 30%,#dcfbff 0%,transparent 55%), radial-gradient(120% 80% at 50% 100%,#ece3ff 0%,transparent 60%), #f6f2ff; animation: spin 14s linear infinite; }
@keyframes spin { to { --a: 360deg; } }          /* 所有 --holo 一起慢慢转色 */
.chrometext { background: var(--chrome); -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 1px rgba(60,55,90,.55); filter: drop-shadow(0 2px 0 #fff) drop-shadow(0 4px 6px rgba(80,60,140,.35)); }
.frame { border-radius: 34px; padding: 5px; background: var(--chrome); }              /* 铬框包图 */
.frame .ir { position:absolute; inset:0; background: var(--holo); mix-blend-mode: soft-light; opacity:.75; }  /* 图上的镭射膜 */
.pill { border-radius: 999px; background: linear-gradient(180deg,#ff9fd2,#ff4fae 55%,#d2308e); box-shadow: 0 6px 14px rgba(255,79,174,.45), inset 0 -3px 6px rgba(120,0,70,.3), inset 0 0 0 2px rgba(255,255,255,.55); }
.pill::before { content:""; position:absolute; left:10%; right:10%; top:3px; height:45%; border-radius:999px; background: linear-gradient(rgba(255,255,255,.95),rgba(255,255,255,.1)); }  /* 果冻高光 */
.holo-border::before { content:""; position:absolute; inset:0; border-radius:inherit; padding:1.5px; background: var(--holo); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; }
```

```js
// 液态铬滴：半径随角度起伏，t 每帧加一点就会流动；填充用多段灰白渐变当反光
const blobPath = (t, R = 40, c = 46) => { let d = ""; for (let i = 0; i <= 48; i++) { const a = i / 48 * Math.PI * 2, r = R * (1 + 0.1 * Math.sin(a * 3 + t) + 0.06 * Math.sin(a * 5 - t * 1.3)); d += `${i ? "L" : "M"}${(c + Math.cos(a) * r).toFixed(1)} ${(c + Math.sin(a) * r).toFixed(1)} `; } return d + "Z"; };
```

## 一眼认出（不能改）

- 铬：标题字、图框、底栏都是多段灰白渐变的镜面金属
- 镭射：彩虹色（conic）当描边和图上的一层膜，一直慢慢转色
- 果冻胶囊按钮：饱和粉或青 + 上半截白色高光
- 十字星光到处一闪一闪
- 一团会流动的液态铬滴，上面压着编号

## 颜色

- 底：粉 `#FFE3F4`、青 `#DCFBFF`、紫 `#ECE3FF` 三团径向渐变叠在 `#F6F2FF` 上
- 字 `#2A2140`；强调粉 `#FF69B4`、青 `#29E0FF`、紫 `#9B5CFF`
- 铬：白—浅灰—深灰—白—灰 来回跳，跳得越多越像镜面

## 字体

- Michroma（宽体科技感，标题、数字、英文小标签）+ Noto Sans SC 700 / 900

## 真图怎么处理

- 原图不改色，外面包一圈 5px 铬框（圆角 34px），上面盖一层 `--holo` 的 soft-light 膜，再定时扫过一道斜白光

## 动效

- 入场：铬字从上方放大、带模糊落下，回弹；图框绕 Y 轴转进来；铬滴旋转着放大
- 常驻：镭射色一直转（`@property --a`，14s 一圈）；铬滴流动；图上斜光每 3.6s 扫一次；随机位置冒十字星
- 列表从右侧飞入，带模糊和色相偏移，落定变清楚
- 按胶囊：缩一下回弹，粉色变青色

## 组件

- 顶栏：铬字大标题 + 果冻胶囊按钮
- 主卡：铬框图 + 右下角液态铬滴编号 + 三个半透明小胶囊（热度、来源、NEW）
- 列表：半透明白卡 + 镭射描边 + 铬字编号 + 带镭射膜的小图
- 底栏：铬质胶囊条，选中项变成粉色果冻

## 换到别的东西上

- 网页：潮牌、音乐、美妆、年轻人活动页；首屏放一个大铬滴或铬字 logo
- 视频：铬字转出来、镭射光扫过、星光一闪；配 2000 年代电子音
- 不适合严肃信息、长文阅读

## 容易做坏

- 铬渐变段数太少，像灰色塑料
- 底色太艳，盖过了铬和镭射
- 星光太多变成噪点
- 深色底（这里默认浅色，浅底上的铬更干净）

## 参考实现

页面（`gallery/s-y2k.html`）：`--chrome` / `--holo` / `.chrometext` / `.pill`、`blobPath()`、`twinkle()`
