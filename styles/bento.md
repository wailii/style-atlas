# 便当格（bento）

像便当盒一样的格子：4 列小方格，大格放头图、中格放大数字、小格放一个动作；每格是一个能独立看懂的小部件，圆角大、间距小、底色浅灰。工具和 SaaS 首页最常见的排法。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 39 行 Bento Box Grid）；2026 年 B2B SaaS 首页趋势（https://www.pravinkumar.co/blog/bento-grids-b2b-saas-homepage-design-trend-2026）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@500;600&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --bg:#f2f2f4; --cell:#fff; --line:#e6e6ea; --ink:#111113; --mute:#7b7b85; --acc:#d4ff3a; --dark:#111113; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 83px; gap: 10px; perspective: 900px; }   /* 390 宽手机：每格 83px 见方 */
.w1{grid-column:span 1}.w2{grid-column:span 2}.w4{grid-column:span 4} .h1{grid-row:span 1}.h2{grid-row:span 2}.h3{grid-row:span 3}
.c { position: relative; border-radius: 22px; transform-style: preserve-3d; transition: transform .5s cubic-bezier(.3,1.4,.5,1); }
.c .f, .c .b { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; backface-visibility: hidden; background: var(--cell); border: 1px solid var(--line); padding: 14px; }
.c .b { transform: rotateY(180deg); }  .c.flip { transform: rotateY(180deg); }      /* 点一下翻到背面看摘要 */
.heat .f { background: var(--acc); border-color: transparent; }                       /* 全页只有一格用强调色 */
.play .f { background: var(--dark); }                                                 /* 一格反色 */
.big { font-weight: 800; font-size: 56px; letter-spacing: -3px; font-family: "Geist Mono"; }
```

```js
// 入场：按格子在网格里的位置（先行后列）依次浮上来
c.animate([{ transform: "translateY(18px) scale(.92)", opacity: 0, filter: "blur(6px)" }, { transform: "none", opacity: 1, filter: "blur(0)" }], { duration: 700, delay: 120 + r.top / 6 + r.left / 4, easing: "cubic-bezier(.3,1.35,.5,1)", fill: "backwards" });
// 跟手倾斜：±8°
c.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
```

## 一眼认出（不能改）

- 4 列网格，格子尺寸只有 1×1、2×1、2×2、4×1、4×3 几种，严格对齐
- 每格一件事：一张图、一个大数字、一条曲线、一个按钮
- 大圆角（22px）+ 小间距（10px）+ 浅灰底白格
- 一格强调色（荧光黄绿）、一格反色（黑），其余白
- 手指放上去格子会朝那边歪；点一下翻面

## 颜色

- 底 `#F2F2F4`；格 `#FFFFFF` + 1px `#E6E6EA` 边；字 `#111113`；次要 `#7B7B85`
- 强调：荧光黄绿 `#D4FF3A`（只给一格）；反色格 `#111113`

## 字体

- Geist 600~800 + Noto Sans SC；数字用 Geist Mono

## 真图怎么处理

- 原图不改，满格铺；文字压在图上时加一层从透明到 88% 黑的渐变遮罩
- 小格里的图占上面 62%，下面放编号和标题

## 动效

- 入场：每格从下面浮上来、带模糊，按网格位置错开（左上先、右下后）
- 数字从 0 数上去；曲线一笔画出来；头像一个个弹出来
- 跟手倾斜 ±8°；点格子翻到背面（rotateY 180°）
- 滚动时头图慢慢放大一点

## 组件

- 头图格（4×3）：图 + 「#01 头条」标签 + 底部遮罩上的来源数和标题
- 热度格（2×2，强调色）：大数字 + 趋势
- 来源格（2×1）：首字母头像叠在一起 + 数字
- 参与格、播放格（1×1）；24 小时曲线格（4×1）
- 其余条目：有图的 2×2，没图的 2×1 带一条细进度条
- 底栏：白色圆角条，选中项黑底白字

## 换到别的东西上

- 网页：SaaS / 工具首页的功能区（一屏 6~9 格）；桌面端 6 列或 8 列
- 仪表盘首页、个人主页、年度总结
- 视频：格子一个个点亮，每格里的小动画依次播

## 容易做坏

- 格子尺寸太多种，就乱了（只用固定几种跨度）
- 每格都塞好几件事
- 强调色用了好几格
- 格子里放长段文字

## 参考实现

页面（`gallery/s-bento.html`）：`.grid` / `.c` 正反面、`cell()`、跟手倾斜和翻面
