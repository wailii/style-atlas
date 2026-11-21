# 分析笔记本（w-notebook）
一份像文档一样从上往下读的月度资源分析：标题、段落、查询、图表、表格交替排列。句子里的参数（月份、部门、阈值）可以直接点开修改，下面所有数字、图表和结论一起重算。每个单元格左边有一条细的运行状态线。给要边看边改口径的运营分析师和负责人。
出处：Hex（https://hex.tech）；Observable（https://observablehq.com）；Mode（https://mode.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --ink:#1d2320; --g:#1f7a4d; --g-bg:#e6f2ea; --amber:#d9961b; --rose:#c8452c; --rail:#d5d9d2; }
body { font-family:"Noto Serif SC",serif; }                              /* 正文用衬线，像文档 */
.rail { position:absolute; left:-26px; top:2px; bottom:2px; width:3px; background:var(--rail); }
.cell.done .rail { background:var(--g); } .cell.stale .rail { background:var(--amber); }
.cell.running .rail::after { content:""; position:absolute; left:0; right:0; height:40%; background:var(--g); animation:slide .9s linear infinite; }
.param { color:var(--g); background:var(--g-bg); border-bottom:2px dotted var(--g); padding:1px 6px 0; }
```
```js
// 每个单元格声明依赖哪些参数；改参数只重跑依赖它的单元格
const aff = CELLS.filter(c => c.deps.includes(k)); aff.forEach(c => state[c.id].s = "stale"); runMany(aff);
// 句子是模板：数字用 <span class="n"> 包住，重算后闪一下黄底，读者能看到哪些数变了
nn(u.toFixed(1)+"%")  →  <span class="n">64.2%</span>
// 同一个参数可以在多个句子里出现，按钮文字同步更新
document.querySelectorAll(`.param[data-p="${k}"]`).forEach(b => b.firstChild.textContent = pLab(k));
```
## 一眼认出（不能改）
- 白底，正文是衬线字，读起来像一篇文章，不像后台
- 句子里嵌绿色虚线下划线的参数按钮，点开是小菜单
- 每个单元格左边一条 3px 的状态线：灰（未运行）、绿（已运行）、琥珀（已过期）、绿色滑块在流动（运行中）
- 查询单元格默认折叠成一行，展开才看到只读 SQL，参数值高亮
- 图表单元格头部有「柱 / 线 / 表」切换和「运行」按钮
- 左侧大纲，滚动到哪一节，哪一项高亮
## 颜色
- 白底，墨 `#1d2320`，森林绿 `#1f7a4d`（已运行、参数、主图色），浅绿 `#e6f2ea`（参数底）
- 琥珀 `#d9961b`（已过期），玫红 `#c8452c`（低于阈值、不利数字）
- 周末柱用浅绿 `#a9cdb8`
## 字体
- 正文和标题 Noto Serif SC，界面（单元格头、大纲、表格）Inter + Noto Sans SC，代码和数字 JetBrains Mono
- 正文 16px / 行高 2，阅读宽度 760px
## 真图怎么处理
- 不用照片；图表全部用 SVG 画
## 动效
- 启动：各单元格依次从「运行中」变「已运行」，运行时间各不相同
- 改参数：依赖的单元格先变琥珀，再依次运行；文字里的数字重算后闪黄底
- 图表重画：柱子从底部长出，折线描出，表格行依次淡入
- 展开代码：代码块向下展开 0.25s
## 组件
- 顶栏：文档名、保存状态、全部运行
- 左侧大纲 + 当前参数摘要
- 单元格：文本、查询（可折叠）、图表（柱/线/表）、表格
- 参数菜单：月份、部门、闲置阈值
- 悬停提示、返回行数与耗时
## 学什么交互
- 参数嵌在句子里，点一下就改 → 口径变化和结论在同一个地方，读者不用跳到筛选区 → 放到「月度分析报告」：把「2026 年 11 月、全部门、低于 40%」做成可点的参数。
- 只重跑依赖该参数的单元格，其余保持不动 → 用户能看到一个参数影响了哪些结果，也更快 → 放到「费用分析」：改部门只重算部门相关的图。
- 数字重算后闪一下 → 一页里很多数，读者要知道哪些变了 → 放到任何带联动筛选的报表。
- 查询折叠但随时可展开，参数值高亮 → 分析师能核对口径，普通读者不被代码打扰 → 放到「自助分析」：每张图附一段只读 SQL，方便复制和审核。
- 左侧大纲随滚动高亮 → 长报告不会迷路，一键跳到「建议」 → 放到「巡检报告」「月度运营报告」。
## 换到别的东西上
- 适合：月度/季度分析报告、巡检结论、容量评审材料、数据说明文档
- 不适合：需要大量并排对比的看板
## 容易做坏
- 参数放在页面顶部筛选栏，句子和数字被割裂
- 改参数后所有单元格都重跑，看不出谁受影响
- 数字变了没有任何提示，读者以为没生效
- 代码默认展开，把第一屏占满
## 参考实现
`gallery/w-notebook.html`：`CELLS` 单元格与依赖，`paint()` 渲染单元格，`run()` / `runMany()` 运行动画，`setParam()` 参数联动，`openPop()` 参数菜单，`chartDaily()`、`chartDept()`、`chartLow()` 图表，`spy()` 大纲高亮。
