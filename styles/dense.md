# 数据密集（dense）

给天天盯数据的人用的工具页：小字号、等宽数字、细分隔线、一屏塞满；表格里每行带一条迷你曲线，24 小时矩阵一眼看出谁什么时候热；⌘K 一搜就到。动效很少，只为了让数字变化看得见。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 28 行 Data-Dense Dashboard）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#f6f7f9; --panel:#fff; --line:#e4e7ec; --line2:#f0f2f5; --ink:#101828; --ink2:#475467; --mute:#98a2b3; --acc:#2563eb; --acc-bg:#eef4ff; --up:#079455; --down:#d92d20; }
body { font-size: 12.5px; }
.mono { font-family: "IBM Plex Mono", monospace; font-variant-numeric: tabular-nums; }   /* 数字一律等宽，列才对得齐 */
.panel { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; }    /* 小圆角 */
td { height: 34px; padding: 0 4px; border-bottom: 1px solid var(--line2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
tr.sel td { background: var(--acc-bg); } tr.sel td:first-child { box-shadow: inset 2px 0 0 var(--acc); }   /* 选中：浅蓝底 + 左边 2px 蓝线 */
.hm .g { display: grid; grid-template-columns: 22px repeat(25, 1fr); gap: 2px; }
.hm .g i { aspect-ratio: 1; border-radius: 2px; background: var(--c); }
.hm .g i.na { background: repeating-linear-gradient(45deg, #eef1f5 0 2px, #fff 2px 4px); }      /* 没数据用斜纹，不用 0 */
```

```js
// 单色顺序色阶：浅灰 → 浅蓝 → 深蓝，按全局最大值、0.8 次方拉开低值
const blue = (v) => { const t = Math.pow(v / gmax, 0.8), a = [238,241,245], m = [147,180,245], b = [29,78,216], [p, q, k] = t < .5 ? [a, m, t * 2] : [m, b, (t - .5) * 2]; return `rgb(${p.map((x, i) => Math.round(x + (q[i] - x) * k))})`; };
// 键盘：J/K 上下、↵ 展开、⌘K 搜索、1–4 筛选；搜索命中的字标黄
```

## 一眼认出（不能改）

- 小字（12~12.5px）、等宽数字、右对齐
- 表格每行一条迷你曲线（涨绿、跌红、平灰）
- 24 小时矩阵：每格一小时，单色深浅，没数据用斜纹
- 顶上一排 KPI 小格，每格一个数 + 一条小曲线
- ⌘K 命令面板；快捷键用纯文字提示，不画键帽

## 颜色

- 底 `#F6F7F9`；面板白 + `#E4E7EC` 边；字 `#101828` / `#475467` / `#98A2B3`
- 选中蓝 `#2563EB`（底 `#EEF4FF`）；涨 `#079455`；跌 `#D92D20`
- 矩阵色阶 `#EEF1F5 → #93B4F5 → #1D4ED8`

## 字体

- IBM Plex Sans + IBM Plex Mono（数字）+ Noto Sans SC

## 真图怎么处理

- 这种风格基本不用大图；有图时只在详情里放小缩略图

## 动效

- 只有三种：数字 700ms 跳到位、曲线 700ms 画出来、矩阵按时间从左往右扫满
- 行逐条 25ms 淡入；选中行和详情 150ms 切换
- 实时点 2 秒呼吸一次

## 组件

- 顶栏：方形 logo + 面包屑 + 搜索框（带 ⌘K 文字）
- 筛选：全部 / 上升 / 下降 / 持平，带计数
- KPI 条：条目、来源合计、参与合计、最高热度
- 热点榜表格：编号、标题、24h 曲线、热度、变化、来源；点行展开摘要和来源名
- 24 小时矩阵 + 图例；悬停显示「#01 · 3h 前 · 383」
- 命令面板：输入即筛，回车跳到那一行

## 换到别的东西上

- 网页：后台、监控、交易、运营看板；桌面端可以把矩阵和表格并排
- 不适合给普通用户看的展示页
- 视频里基本不用

## 容易做坏

- 字号大、留白多，就不「密」了
- 数字用比例字体，列对不齐
- 加大面积渐变、阴影、插画
- 空数据画成 0

## 参考实现

页面（`gallery/s-dense.html`）：`line()` 迷你曲线、`blue()` 色阶、`select()` / `filter()` / `render()` 命令面板
