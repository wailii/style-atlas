# 打印纸（print）

针式打印机的绿杠连续纸：两边有走纸孔，内容一行一行打出来，封面打成字符画。

出处：lemo-opuscar 风格库 ascii-crt（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/ascii-crt/STYLE.md，这里把深色屏幕换成了亮色打印纸）；ythx-101/live-panel-skill（789★，终端风格循环图）。

## 直接抄

```css
:root { --paper:#fbfaf5; --bar:#e3f0de; --ink:#25253a; --ink2:#5b5b72; --red:#c8382e; }
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
.sheet { background: repeating-linear-gradient(var(--paper) 0 72px, var(--bar) 72px 144px); }
.big { font-weight:900; mask: radial-gradient(circle, #000 .85px, transparent 1.15px) 0 0 / 2.2px 2.2px; } /* 点阵大字 */
```
```js
asciiRows(img, 74, 24, " .,:;-=+*#%@")   // 7.2px 字号 / 行高
// 每行 clip-path steps(字数)，每字 16ms；打印头跟着走
```

## 一眼认出（不能改）

- 白绿相间的横杠纸，两侧走纸孔 + 撕线
- 等宽字体，内容逐行打印，有个打印头跟着走
- 图片是 ASCII 字符画
- 进度条是 `[#####-----]`，按钮是 `[▶ 听热点]`
- 大字是点阵

## 颜色

- 纸 `#FBFAF5`，绿杠 `#E3F0DE`（每 72px 换一次），外面的桌面 `#E9E6DC`
- 色带墨 `#25253A`，淡墨 `#5B5B72`
- 红 `#C8382E`：只给头条那一行
- 放心改：绿杠换成蓝杠；不能改：只有一种墨

## 字体

- IBM Plex Mono 400 / 600 / 700 + Noto Sans SC
- 点阵大字：粗体（900）≥ 20px，加 `mask: radial-gradient(circle, #000 .85px, transparent 1.15px) / 2.2px 2.2px`
- 正文加 0.6px 的模糊阴影，像色带墨洇

## 底和纹理

- 走纸孔：两侧 24px 条，radial-gradient 每 24px 一个 5.5px 的孔，内侧一道虚线
- 色带磨损：白色噪点 screen 叠在上面

## 真图怎么处理

- `asciiRows(img, 74, 24, " .,:;-=+*#%@")`，字号 7.2px、行高 7.2px；函数里已经做了亮度拉伸
- 字符画只用拉丁字符（中文等宽对不齐）

## 线和形

- 分隔线：`====` 和 `----`
- 按钮、底栏：方括号包住；选中时反白

## 动效

- 逐行打印：每行 clip-path 按字数 `steps()` 揭开，每字 16ms，最长 0.52s；字符画每行 70ms
- 打印头（9×18 的深色小块）跟着当前行从左走到右
- 结尾一个闪烁的方块光标
- 点开一条：摘要接着打在下面

## 组件

- 主按钮：`[▶ 听热点]`，播放时 `[■ 在听 01]` 反白
- 主卡：`> #01 ★★★★★ 热度 455` + 字符画 + 点阵标题 + 摘要 + 进度条
- 列表：两行一条（编号 + 标题；缩进的进度条 + 数字）
- 底栏：`[精选]` 热点 日报……

## 换到别的东西上

- 网页：长页面就是一卷纸，滚动 = 走纸；底部撕线
- 视频：纸往上走、打印头来回；声音用针式打印机的吱吱声、回车声、撕纸声
- 小票、账单、日志、开发者工具都合适

## 容易做坏

- 字符画里混中文会对不齐
- 点阵遮罩用在细字、小字上会看不见
- 打印太慢：整页打完控制在 4 秒内，字符画按行而不是按字打

## 参考实现

`gallery/s-print.html`：逐行打印 + 打印头那段循环；`asciiRows()` 在 `gallery/common.js`
