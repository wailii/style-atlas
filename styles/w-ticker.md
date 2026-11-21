# 交易终端（w-ticker）
纯黑底、琥珀色字的多窗格行情终端：窗格平铺无间距、等宽小字，顶部一条命令行输入功能码切换内容，数字实时跳动，涨闪绿、跌闪红只闪一下。给盯着价格和流水看的人，键盘优先。
出处：Bloomberg Terminal（https://www.bloomberg.com/professional/products/bloomberg-terminal/）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#000; --am:#ffb000; --am2:#b07a00; --am3:#3a2a00; --tx:#f1e9d2; --up:#3ddc6a; --dn:#ff4d4d; --ln:#3a2c00; }
body { background:#000; color:var(--am); font:12px/18px "IBM Plex Mono","Noto Sans SC",monospace; }
.pane { border-bottom:1px solid var(--ln); }                 /* 窗格之间只有 1px 线，没有间距 */
.pane.f { box-shadow:inset 0 0 0 1px var(--am); }            /* 焦点窗格：琥珀细边 */
.pane.f .ph { background:var(--am); color:#000; }            /* 焦点窗格标题条反白 */
tr.q.sel td { background:var(--am); color:#000; }            /* 选中行反白 */
.fu { animation:fu .75s ease-out; } @keyframes fu { 0% { background:#3ddc6acc; } 100% { background:transparent; } }
```
```js
// 跳动：只改变化的那个格子，移除再加 class 重启动画
px.classList.remove("fu","fd"); void px.offsetWidth; px.classList.add(dir > 0 ? "fu" : "fd");
// 命令行：功能码 + 代码，补全列表 ↑↓ 选择，Enter = GO
const CMDS = [["PX <代码>", "查看该标的报价与分时"], ["TOP", "按涨跌幅排序"], ["NEWS <代码>", "..."], ["TRD <代码>", "..."], ["HELP", "..."]];
```
## 一眼认出（不能改）
- 纯黑底 + 琥珀字，数字用近白色，涨绿跌红
- 顶部一条命令行（提示符、输入框、GO），下面一行 F1–F4 功能键提示
- 窗格平铺无间距，每个窗格顶部一条标题条，焦点窗格标题条整条变琥珀色
- 等宽小字（12px），数字右对齐
- 价格变动时单元格闪一下绿或红，然后恢复
## 颜色
- 底 `#000`，琥珀 `#ffb000`，暗琥珀 `#b07a00`，窗格标题底 `#3a2a00`
- 数字 `#f1e9d2`，涨 `#3ddc6a`，跌 `#ff4d4d`
- 绿红只用于涨跌数字、闪烁、买卖方向
## 字体
- IBM Plex Mono 做全部数字和代码，中文用 Noto Sans SC，字号 11–12px，命令行 14px
## 真图怎么处理
- 不用照片，只有折线、量柱、迷你走势线
## 动效
- 每 700ms 随机 1–3 个标的跳动，变动格 750ms 淡出闪色
- 成交流水新行 1s 琥珀淡出
- 分时图最后一个点随价格实时更新
## 组件
- 命令行 + 补全列表 + 状态行（显示上一条命令的结果）
- 报价板（代码、现价、涨跌、涨跌幅、买一、卖一、成交量）+ 指数小表带迷你走势
- 分时窗格：摘要条、折线 + 量柱、光标读数、供给方买卖价表（最优价反白）
- 成交流水、新闻（可按代码过滤）、HELP 浮层
## 学什么交互
- 命令行输入功能码，带补全 → 熟手不用找菜单，几个字母直达 → 资源台账、工单系统加一个全局输入框：「PX H100」换成「订单 12345」「机房 A1」，直接跳转并过滤。
- F1–F4 和 Tab 切窗格，焦点窗格整条标题变色 → 手不离键盘，知道当前在哪 → 大屏值班页用快捷键切到「告警」「作业」窗格，再用 ↑↓ 选行。
- 点列表一行，右侧窗格立刻换成该对象的详情图 → 主从联动，不弹窗不跳页 → 模型列表点一行，右边直接出该模型的调用曲线和各机房报价。
- 变化只闪一下就恢复 → 一眼看到哪里在动，又不会满屏闪烁 → 实时用量、排队数这类数字，变化时单元格闪一下。
## 换到别的东西上
- 适合：行情、成交流水、实时队列、机房告警值班
- 不适合：需要引导的新手页面、移动端
## 容易做坏
- 窗格之间留间距和圆角，就不像终端了
- 数字不用等宽，闪烁时列会抖
- 绿红铺大面积底色，只该闪一下的变成常亮
- 命令行没有补全，输错没提示
## 参考实现
`gallery/w-ticker.html`：`run()` 执行功能码，`sugs()` 补全，`tick()` 实时跳动，`fillRow()` 闪色，`drawChart()` 分时图，`setFocus()` 与 keydown 处理窗格切换。
