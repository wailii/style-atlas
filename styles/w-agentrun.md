# Agent 运行台（w-agentrun）
一次 Agent 执行的轨迹：左边是步骤树，中间是按时间排开的耗时条，右边是选中步骤的输入输出 JSON，顶部是 Token、成本、耗时汇总。给调试 Agent、核对每一步花了多少时间和钱的人用。

出处：LangSmith（https://www.langchain.com/langsmith）；Langfuse（https://langfuse.com）；Braintrust（https://www.braintrust.dev）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#f5f5f9; --panel:#fff; --ink:#17172b; --ink2:#5a5a72; --mute:#9696aa; --line:#e5e5ee; --agent:#17172b; --llm:#6d4aff; --tool:#0f9d8a; --ret:#e08a1a; }
.rowL, .rowR { height: 38px; border-bottom: 1px solid #efeff5; }       /* 左树和右甘特同高，同一个滚动容器，行天然对齐 */
.rowL.sel, .rowR.sel { background: #f1eeff; } .rowL.sel::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--llm); }
.bar { position: absolute; top: 9px; height: 20px; border-radius: 5px; }  /* left / width 用占总时长的百分比 */
.pend { opacity: .28; }                                                   /* 回放时还没开始的步骤 */
.json { font-family: "IBM Plex Mono"; font-size: 11.8px; line-height: 1.7; background: #fafafd; border: 1px solid #efeff5; border-radius: 8px; }
```

```js
// 步骤：{ id, p(父级), ty(agent|llm|tool|retriever), s(开始秒), e(结束秒), tk:[入,出], in, out }
bar.style.left = s / TOTAL * 100 + "%"; bar.style.width = (e - s) / TOTAL * 100 + "%";
// 累计：llm 步骤的输入 Token 在开始时计入，输出 Token 随步骤进度线性计入；成本 = 入×单价 + 出×单价
function cum(t) { /* 返回 [输入, 输出, 成本] */ }
// 回放：requestAnimationFrame 按真实耗时推进 T，T 之前的步骤点亮、正在跑的步骤按进度填色，自动选中正在跑的步骤
// JSON 查看器：递归生成 DOM，对象和数组带 ▾ 折叠，折叠后显示「N 个字段」摘要
```

## 一眼认出（不能改）
- 顶部一整条汇总：总耗时、Token（拆输入输出）、成本、步骤数，右侧黑色「回放」按钮
- 步骤树和耗时条同行对齐，耗时条按开始时间错开，并行的步骤在时间上重叠
- 类型靠颜色区分：Agent 墨色、模型紫、工具青、检索琥珀，每行有同色小图标
- 选中行整行淡紫底，左边 3px 紫线
- 右侧 JSON 带语法高亮和折叠，上面有「累计至此步骤结束」的 Token 与成本

## 颜色
- 底 `#F5F5F9`；面板白；线 `#E5E5EE`；墨 `#17172B`
- 类型：Agent `#17172B`、模型 `#6D4AFF`、工具 `#0F9D8A`、检索 `#E08A1A`
- 成功 `#1F9D63`（只在状态标签上）；游标红 `#E5484D`
- JSON：键紫、字符串青、数字褐、布尔玫红

## 字体
- Onest + Noto Sans SC（界面）；IBM Plex Mono（数字、耗时、JSON）

## 真图怎么处理
- 不用图片。类型图标是 12 格线条小图标（六边形、星、扳手、放大镜）

## 动效
- 回放：时间游标红线从左推到右，已开始的步骤点亮，正在跑的步骤按进度填色并带斜纹，汇总数字随之累加
- 悬停某行：左右两行同时高亮，甘特上出现虚线游标和提示框
- 折叠子步骤：行消失，甘特同步收起

## 组件
- 汇总条：运行信息 + 四个指标 + 回放与倍速
- 步骤树：展开箭头、类型图标、名称、Token 或耗时
- 甘特：顶部时间标尺 + 累计 Token 曲线；竖向网格线
- 详情：头部（类型、开始、耗时、输入输出 Token、成本）、累计条、输入和输出两块 JSON

## 学什么交互
1. 左边树和右边耗时条放在同一个滚动容器里逐行对齐 → 看名字的同时看到时间位置，不用来回对照 → 资源申请的审批流程页，左边列环节，右边按时间画每个环节停留了多久。
2. 汇总条里把总数拆开（Token 拆输入输出），并附单价 → 数字能自己对出来，信得过 → 费用明细顶部「总费用」下面注明单价和用量。
3. 回放按真实耗时推进，并自动选中正在跑的步骤 → 复盘时像看录像，卡在哪一步一眼可见 → 工单处理时间线、变更发布过程都能回放。
4. 并行的步骤在时间上重叠 → 串行还是并行直接可见，优化方向清楚 → 作业调度页里同时运行的任务也这样排开。
5. JSON 带折叠和摘要，且一键全部折叠 → 很长的入参出参能先看结构再看细节 → 模型调用日志详情、接口审计记录。

## 换到别的东西上
- 适合：Agent 和工作流调试、链路追踪、流水线耗时分析、审批时效分析
- 步骤超过几十条时，需要加按类型筛选和搜索

## 容易做坏
- 类型颜色超过四五种，条形图变成彩虹
- 左树和右甘特分成两个滚动区，行对不齐
- 汇总只给一个总 Token，不拆输入输出，成本对不上
- 回放时一次点亮所有步骤，失去顺序感

## 参考实现
页面 `gallery/w-agentrun.html`：`S` 步骤数据、`render()` 树和甘特、`cum()` 累计、`ruler()` 标尺与累计曲线、`jnode()` JSON 查看器、`panel()` 右侧、`play()` 回放
