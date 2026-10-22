# 编辑杂志（editorial）

纸质杂志的版式：报头大字、细粗双线、红色小栏目名、大号衬线标题、斜体导语、首字下沉、居中引语；大量留白，图片满幅。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 66 行 Editorial Grid / Magazine：serif headlines、grid、pull quotes、drop caps）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Noto+Serif+SC:wght@500;700;900&family=Inter:wght@600;700&display=swap");
:root { --paper:#fbfaf7; --ink:#111; --ink2:#555; --hair:#d9d6cf; --red:#d93a26; }
.kick { font-family: Inter, "Noto Sans SC", sans-serif; font-weight: 700; font-size: 10.5px; letter-spacing: .18em; color: var(--red); text-transform: uppercase; }
.mast h1 { font-family: "Playfair Display","Noto Serif SC",serif; font-weight: 900; font-size: 46px; }
.rule { height: 1px; background: var(--ink); } .rule.t { height: 3px; }   /* 报头上粗下细 */
.dek { font-family: "Source Serif 4",serif; font-style: italic; font-size: 16px; color: var(--ink2); }
.body::first-letter { float: left; font-family: "Playfair Display","Noto Serif SC",serif; font-weight: 900; font-size: 58px; line-height: .86; padding: 4px 8px 0 0; color: var(--red); }
.pull { border-top: 3px solid var(--ink); border-bottom: 1px solid var(--ink); font-family: "Playfair Display","Noto Serif SC",serif; font-style: italic; font-size: 21px; text-align: center; }
.pull::before { content: "“"; display: block; font-size: 46px; line-height: .6; color: var(--red); }
.rv { opacity: 0; transform: translateY(18px); transition: opacity .9s ease, transform .9s cubic-bezier(.2,.7,.2,1); } .rv.in { opacity: 1; transform: none; }
```

```js
// 报头三道线从中间往两边画开；刊名字距从 .4em 收到 0
rules.forEach((r, i) => r.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 900, delay: 100 + i * 120, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" }));
mast.animate([{ letterSpacing: ".4em", opacity: 0 }, { letterSpacing: "0em", opacity: 1 }], { duration: 1400, delay: 150, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
// 大图跟着滚动从 1.08 缩到 1
const k = Math.min(1, Math.max(0, 1 - fig.parentElement.getBoundingClientRect().top / innerHeight)); fig.style.setProperty("--sc", (1.08 - 0.08 * k).toFixed(3));
```

## 一眼认出（不能改）

- 报头：大衬线刊名 + 上 3px 下 1px 双线 + 日期行
- 红色全大写小栏目名（kicker）在标题上方
- 斜体导语、红色首字下沉、居中引语（上粗下细两道线）
- 图片满幅出血，下面一行小字图注
- 细灰分隔线，留白多，不用卡片和圆角

## 颜色

- 纸白 `#FBFAF7`；黑 `#111`；正文灰 `#555`；分隔线 `#D9D6CF`
- 唯一强调色：编辑红 `#D93A26`（栏目名、首字、编号、引号）

## 字体

- 标题：Playfair Display 900 + Noto Serif SC 900
- 正文：Source Serif 4 + Noto Serif SC 500
- 小标签：Inter 700 字距拉开

## 真图怎么处理

- 原图不改，满幅出血；小图轻微去饱和（grayscale .2）；没图的条目用线稿小图标放在灰底方块里

## 动效

- 入场：报头线从中间画开，刊名字距收紧，标题字距从松到紧
- 滚动：每块滚进视口才浮上来（IntersectionObserver）；大图跟滚动慢慢缩小
- 一切慢、稳，0.9~1.6s，不弹

## 组件

- 报头：刊名 + 双线 + 日期 + 「朗读本期」下划线文字按钮
- 头条：kicker + 大标题 + 斜体导语 + 来源行 + 满幅图 + 首字下沉正文 + 引语
- 次条：大图 + 红编号 + 标题 + 摘要
- 列表：红编号 + 标题 + 小字 + 右侧小图，细线分隔
- 底栏：纯文字，选中项下面一道红线

## 换到别的东西上

- 网页：长文、专题、品牌故事、年报；网页上可以开两栏
- 视频：大字慢慢推近、线条画开、引语逐行出现；像纪录片片头
- 海报、PPT：天然合适

## 容易做坏

- 加卡片阴影和圆角就成了普通 App
- 强调色超过一种
- 动作弹跳
- 中文只用黑体，没了杂志味

## 参考实现

页面（`gallery/s-editorial.html`）：`.mast` / `.kick` / `.pull` / `.body::first-letter` / `.rv`、`IntersectionObserver` 浮现、`onScroll` 缩图
