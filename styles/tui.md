# 终端界面（tui）

整个界面是一个浅色终端里的文字程序：等宽字、制表符画的框、反色选中行、▁▂▃ 字符曲线、█░ 字符进度条，封面用「半格字符」画成彩色像素图；底下一行快捷键，再下面一行像 tmux 的窗口栏。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 73 行 Terminal CLI (Mobile)）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap");
:root { --bg:#fbfbf8; --fg:#24292f; --dim:#8c959f; --blue:#0550ae; --green:#116329; --red:#cf222e; --mag:#8250df; --yel:#9a6700; --cyan:#1b7c83; --sel:#ddf4ff; }
body { font-family: "JetBrains Mono", monospace; font-size: 12px; line-height: 18px; }
.term { white-space: pre; }
.w { display: inline-block; width: calc(var(--cw) * 2); text-align: center; font-family: "Noto Sans SC"; }   /* 中文占两格；--cw 用 JS 量出来，别用 2ch */
.px { display: inline-block; width: var(--cw); height: 18px; vertical-align: top; }                      /* 图片的一格 = 上下两个像素 */
.inv { background: var(--fg); color: var(--bg); }                                                          /* 反色：标题栏、快捷键 */
.row.sel { background: var(--sel); }
.blk { display: inline-block; width: 1ch; height: 15px; background: var(--fg); animation: bl 1s steps(1) infinite; }   /* 方块光标 */
```

```js
// 显示宽度：中文、全角算 2，其余算 1；框线、截断、补空格都按这个算
const wide = (ch) => /[ᄀ-ᅟ⺀-꓏가-힣豈-﫿︰-﹏＀-｠￠-￦　-〿]/.test(ch);
// 字符曲线
const SPARK = "▁▂▃▄▅▆▇█";
// 半格图：每格背景上下两种颜色 = 两个像素
`<span class="px" style="background:linear-gradient(${top} 50%,${bottom} 50%)"></span>`
// 框：┌─ 标题 ───┐ │…│ └───┘ ；转圈：⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏ 每 80ms 一帧
```

## 一眼认出（不能改）

- 全屏等宽，按字符格子排，中文严格占两格
- 制表符画框（┌─┐│└┘），框上嵌标题
- 选中行浅蓝底 + ▶；快捷键是反色小块（不是圆角键帽）
- 数据用字符画：▁▂▃▄▅▆▇█ 曲线、█░ 进度条
- 封面是半格字符像素图；最下面一行 tmux 窗口栏当 Tab

## 颜色

- 浅色终端：底 `#FBFBF8`，字 `#24292F`，暗字 `#8C959F`
- ANSI 色：蓝 `#0550AE`、绿 `#116329`、红 `#CF222E`、紫 `#8250DF`、黄 `#9A6700`、青 `#1B7C83`
- 选中 `#DDF4FF`

## 字体

- JetBrains Mono 12px / 行高 18px；中文 Noto Sans SC，包成两格宽

## 真图怎么处理

- 半格像素图：封面缩到 (列数) × (行数 × 2) 像素，每个字符格上下各一个像素
- 没封面就在框里写「（这条没有封面图）」

## 动效

- 开机：命令一个字一个字敲出来（45ms/字），回车后整屏按行刷出（每行 28ms）
- 光标方块 1 秒闪一次
- 选中、翻页都是瞬间重画，没有缓动
- 朗读时盲文点阵转圈

## 组件

- 标题栏（反色）：程序名 ─ 条数 ─ 更新时间
- 命令行 + 结果一行（✓ 拉取完成）
- 「热点榜」框：▶ 编号 标题 热度 曲线
- 「预览」框：半格图、标题、来源/参与/趋势、24h 曲线、摘要、热度条
- 「来源」框：来源名用 · 隔开
- 快捷键行：j/k 移动 · ⏎ 展开 · p 朗读 · q 退出；最底 tmux 窗口栏

## 换到别的东西上

- 网页：开发者工具官网、CLI 产品文档、极客向个人站
- 视频：终端录屏风格的产品介绍（打字 + 刷屏）
- 深色版就换成深底 ANSI 配色，规则不变

## 容易做坏

- 中文宽度没处理，框线全歪
- 用 2ch 给中文定宽（ch 跟着中文字体走，宽度不对）
- 加圆角、阴影、渐变
- 用图片图标代替字符

## 参考实现

页面（`gallery/s-tui.html`）：`wide()` / `W()` / `fit()` / `cell()` 宽度处理、`box()` 画框、`art()` 半格图、`render()`
