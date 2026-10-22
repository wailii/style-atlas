# 后室录像（liminal）

发黄的日光灯房间，透过一台老摄像机看：扫描线、雪花、时间码、红蓝错位，偶尔跟踪不稳。

出处：lemo-opuscar 风格库 backrooms（Liminal Found Footage，https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/backrooms/STYLE.md）。

## 直接抄

```css
:root { --wall:#d8c78a; --wall2:#c9b674; --ink:#2b2416; --osd:#f5f5ef; --vcr:#1b2ec4; --rec:#ff3b30; }
@import url("https://fonts.googleapis.com/css2?family=VT323&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.ab { text-shadow: -1.2px 0 rgba(255,0,60,.55), 1.2px 0 rgba(0,90,255,.5); }      /* 标题红蓝错位 */
.scan { background: repeating-linear-gradient(rgba(0,0,0,.09) 0 1px, transparent 1px 3px); }
```

## 一眼认出（不能改）

- 整体是发黄的墙纸色（亮，不是黑）
- 屏幕字：左上 ▶ PLAY / ● REC，左下日期，右下按 30 帧走的时间码（VT323）
- 扫描线 + 每秒换 12 次的雪花 + 四角暗
- 每隔几秒一条亮带从上滚到下，画面跟着横向抖
- 图是录像带画质

## 颜色

- 墙 `#D8C78A`，字 `#2B2416`，屏幕字近白 `#F5F5EF`，录像机菜单蓝 `#1B2EC4`，REC 红 `#FF3B30`

## 字体

- 屏幕字和拉丁：VT323；中文：Noto Sans SC 500 / 700 / 900；标题加红蓝错位阴影

## 底和纹理

- 墙纸：竖条 + 细波浪线平铺；雪花：4 张噪点图轮换（overlay，0.22）；扫描线；暗角

## 真图怎么处理

- `vhs()`：先 blur 1.2 + saturate .75 + 提亮，再把红、蓝通道左右各错开 w/140 像素，随机几行整行错位，每三行压暗一点

## 动效

- 开机：画面从一条线（scaleY .02）+ 过曝，按 `steps(7)` 在 0.7s 里弹开
- 跟踪不稳：每 4.5～8.5 秒一次，亮带 1.4s 滚过，画面在 30% 处横向抖、斜切一下
- 日光灯闪：随机 3～9 秒一次，0.26s 里亮度跳几下
- 时间码 30 帧走；点一条时画面一跳一糊

## 组件

- 主按钮：方框「▶ PLAY」，播放中变「■ STOP」，屏幕角出现闪烁的 ● REC
- 主卡：圆角像老电视的录像画面 + 屏幕字（TAPE 01 / SP / 热度）
- 列表：「TAPE 02 · 23:26:00」+ 标题 + 录像小图（没图写 NO SIGNAL）
- 底栏：录像机菜单那种纯蓝底白字，当前项反白，前面 ▶

## 换到别的东西上

- 网页：整站套一层录像机屏幕字；滚动时偶尔跟踪不稳
- 视频：手持感、慢漂移、突然断帧；声音用日光灯的嗡嗡声、磁带底噪、闷闷的回声
- 适合：悬疑、游戏、怪谈、万圣节

## 容易做坏

- 开机动画在做 transform 时量尺寸，量到的是被压扁的——用 offsetWidth / offsetHeight
- 红蓝错位加在正文上会看不清：只加标题
- 做成全黑就成了普通恐怖风，失去「发黄的空房间」

## 参考实现

引擎：`Engines.vhs()`
页面（`gallery/s-liminal.html`）：`tracking()`、开机动画、时间码、屏幕字叠层
