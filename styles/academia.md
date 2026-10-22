# 学院风（academia）

浅色的老图书馆：羊皮纸底、窗边斜进来的暖光、拱顶棕褐老照片、红色首字下沉、罗马数字卷号、抽屉里的图书目录卡、火漆封印做播放按钮。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 79 行 Academia (Scholarly Mobile)：serif、parchment、crimson、brass、classical）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Noto+Serif+SC:wght@500;700;900&family=Courier+Prime:wght@400;700&display=swap");
:root { --paper:#f4ecdb; --paper2:#ebe0c8; --ink:#2b2118; --ink2:#5e5040; --crim:#8c1d2c; --brass:#a8843a; --card:#fbf7ec; --rule-b:#9fb6cf; }
.app::before { background-image: var(--fiber); background-size: 420px; opacity: .7; }      /* fiberURL(420, 220, "120,90,50", "255,250,235") */
.app::after { background: linear-gradient(115deg, rgba(255,236,190,.55) 0%, rgba(255,236,190,0) 38%), radial-gradient(ellipse at 50% 40%, transparent 60%, rgba(90,60,30,.14)); }  /* 窗光 + 暗角 */
.arch canvas { border-radius: 150px 150px 3px 3px; }  .arch .fr { inset:-7px; border: 1px solid var(--brass); border-radius: 157px 157px 4px 4px; }  /* 拱顶 + 黄铜细框 */
.body::first-letter { float:left; font-family: "Cormorant Garamond","Noto Serif SC"; font-weight:700; font-size:60px; line-height:.82; padding:6px 8px 0 0; color: var(--crim); }
.card { background: var(--card); background-image: linear-gradient(transparent 31px,#c9504f 31px,#c9504f 32px,transparent 32px), repeating-linear-gradient(transparent 0 23px,var(--rule-b) 23px 24px); background-position: 0 0, 0 32px; font-family: "Courier Prime","Noto Serif SC"; }  /* 目录卡：一道红线 + 蓝横线 */
.drawer { background: linear-gradient(#7a4f2c,#63401f); border-radius: 6px; box-shadow: inset 0 -10px 18px rgba(0,0,0,.25); }
.tab.on::before { background: var(--crim); clip-path: polygon(0 0,100% 0,100% 100%,50% 74%,0 100%); }   /* 书签丝带 */
```

```js
// 棕褐老照片：亮度 → 棕褐三通道 + 暗角 + 颗粒 + 几处霉点
d[i] = 40 + L * 222; d[i + 1] = 26 + L * 196; d[i + 2] = 14 + L * 150;
// 火漆：64 点的圆，半径带一点抖动，再加 4 处高斯形「溢出」
r += R * k * Math.exp(-da * da * 40);
// 照片显影：每帧把棕褐图以 blur 10→0、透明度 0→1 画上去，2.2s
```

## 一眼认出（不能改）

- 羊皮纸底 + 纤维纹 + 左上斜进来的暖光 + 四周暗角
- 拱顶老照片（棕褐、暗角、霉点）+ 黄铜细框 + 斜体图注「Fig. I —」
- 红色大首字下沉；❦ 花饰分隔
- 罗马数字卷号（VOL. X · XXII、卷 II…VIII）
- 图书目录卡（打字机字、红线蓝横线）放在木抽屉里；火漆封印当按钮

## 颜色

- 羊皮纸 `#F4ECDB`；墨 `#2B2118`；正文棕 `#5E5040`
- 深红 `#8C1D2C`（首字、火漆、选中丝带）；黄铜 `#A8843A`（细线、花饰）
- 目录卡米白 `#FBF7EC`，红线 `#C9504F`，蓝横线 `#9FB6CF`；抽屉胡桃木 `#7A4F2C`

## 字体

- 拉丁：Cormorant Garamond（斜体做小标签、图注、拉丁短语）
- 中文：Noto Serif SC 700 / 900
- 目录卡：Courier Prime（打字机）

## 真图怎么处理

- 棕褐色调（`sepia()`）：亮度做 1.15 次方压暗部，乘暗角，加 ±2.5% 颗粒，撒 14 个淡棕霉点
- 放进拱顶框；入场像显影：从模糊的浅褐慢慢沉下来

## 动效

- 入场：刊名像墨水一样从左写到右（clip-path + 去模糊）；黄铜线从中间画开；照片显影 2.2s
- 火漆从大到小、转着盖下来，落定时压一下
- 目录卡从抽屉里一张张立起来（rotateX -50° → 0）
- 点目录卡：抽出来一点、歪一点、展开摘要；点火漆：压一下，文字变「Legimus… 朗读中 · 第 I 卷」
- 一切慢、安静

## 组件

- 刊头：Ex Libris · 外力的书房 + 大标题 + 黄铜线、校徽、卷号
- 头条：拱顶照片 + 图注 + 居中标题 + 花饰 + 首字下沉正文 + 火漆按钮（「Lege mihi · 启封朗读」）
- 目录：「藏书目录 · Catalogus」+ 木抽屉 + 黄铜拉手（AI 000–999）+ 目录卡（索书号、卷号、热度、打字标题）
- 底栏：纸色，选中项上方挂一条深红书签丝带

## 换到别的东西上

- 网页：读书、课程、研究机构、博物馆、出版社
- 视频：纸张、烛光、慢推特写、羽毛笔写字；配大提琴、翻书声
- 这里是浅色的 light academia；深色的 dark academia 换成深木色底、烛光、墨绿

## 容易做坏

- 纸色太黄像脏
- 字体全换成衬线却没有层次（标题、斜体标签、打字机要分开）
- 装饰太多，像古风网游
- 火漆画成正圆，没有溢出边

## 参考实现

页面（`gallery/s-academia.html`）：`sepia()`、`sealPath()`、`.arch` / `.card` / `.drawer`、`dev()` 显影循环
