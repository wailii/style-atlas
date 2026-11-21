# 拓扑图（w-topology）
服务依赖图：节点是带健康环的圆，连线粗细表示流量，颜色只在出错时出现。大片留白，操作面板和详情面板浮在图上。给值班、排障、看链路的人用，一眼看出「谁在调谁、哪里在红」。

出处：Datadog Service Map（https://www.datadoghq.com）；Kiali（https://kiali.io）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#f3f1ec; --paper:#fffefb; --line:#e0dcd1; --ink:#1c2127; --ink2:#5b6268; --mute:#9a9a92; --ring:#2a3a40; --track:#e4e0d5; --warn:#d9951a; --bad:#d4402c; }
.float { position: fixed; background: var(--paper); border: 1px solid var(--line); border-radius: 12px; box-shadow: 0 1px 0 rgba(28,33,39,.04), 0 8px 28px -12px rgba(28,33,39,.18); }
.lbl { font-size: 11.5px; font-weight: 600; paint-order: stroke; stroke: var(--bg); stroke-width: 4px; }   /* 标签描一圈底色，压在线上也能读 */
.flow { stroke-dasharray: 3 9; animation: flow 1.1s linear infinite; } @keyframes flow { to { stroke-dashoffset: -12; } }
.dim { opacity: .13; }
```

```js
// 健康环：底环 + 深色弧 + 红色弧（红弧长 = 出错率 x12，低于 0.5% 不画）
const c = 2*Math.PI*(r+6), arc = err >= .005 ? Math.min(1, err*12) : 0;
ok.setAttribute("stroke-dasharray", `${c*(1-arc)} ${c}`);
bad.setAttribute("stroke-dasharray", `${c*arc} ${c}`); bad.setAttribute("stroke-dashoffset", -c*(1-arc));
// 力导向：节点互斥 12000/d²、连线弹簧、按层级给 x 方向的目标位置（上游在左）
n.vx += (X0 + n.col/5*(X1-X0) - n.x) * .05 * alpha;
// 悬停：沿边向上、向下各走一遍，得到相关节点集，其余 .dim
function related(n){ /* 递归 inn[] 与 out[] */ }
// 边：二次贝塞尔，端点退到圆环外；线宽 = 1 + sqrt(rps)*.085；线色按被调用方出错率：灰 / >1% 琥珀 / >3% 红
```

## 一眼认出（不能改）
- 米白底加极淡点阵，没有表格、没有侧边菜单
- 节点是白色圆盘，外圈健康环：深色为正常，红弧为出错率
- 连线有方向（箭头 + 流动虚线），粗细随请求量，平时全是灰褐色
- 工具条、摘要、图例、回放按钮都是浮在图上的小面板
- 点节点从右侧滑出详情面板，里面是 RED 三条小图

## 颜色
- 底 `#F3F1EC`；面板 `#FFFEFB`；线 `#E0DCD1`
- 字 `#1C2127` / `#5B6268` / `#9A9A92`；环和选中填充 `#2A3A40` / `#1C2127`
- 颜色只给出错：琥珀 `#D9951A`（>1%）、红 `#D4402C`（>3%）

## 字体
- Manrope + Noto Sans SC（界面）；JetBrains Mono（数字、日志时间）

## 真图怎么处理
- 不用照片。节点图标是自绘 24 格线条图标（网关、服务、推理、存储、缓存、队列各一）

## 动效
- 力导向布局先算 400 步再显示，拖动时重新加热，松手后慢慢停
- 边上的虚线一直流向被调用方
- 悬停：非相关节点和边降到 13% 透明度，250ms
- 面板右侧滑入 350ms；故障回放：红点沿连线从被调用方飞向调用方（900ms 一跳），到达后节点红弧长出来，日志逐行出现

## 组件
- 左上工具条：环境、时间窗、搜索（`/` 聚焦，输入后不匹配的节点变淡）
- 摘要条：服务数、总请求、平均错误率、异常服务数（有异常整格变红）
- 右侧详情：状态、请求数/错误率/P95 三条小图（悬停共用十字线读数）、上游和下游列表（点击跳到那个服务）
- 底部：故障回放按钮 + 传播日志

## 学什么交互
1. 悬停只留上下游，其余淡到 13% → 拓扑里一眼看出影响范围，不用点开 → 放到资源台账的「依赖关系」页：悬停一台机器，只亮它挂的作业、用的存储、归属部门。
2. 环表示健康、线表示流量、颜色只给异常 → 画面平时是安静的灰，红一出现就是事 → 费用明细里用同样规则：金额条平时灰，只有超预算的部门变红。
3. 故障回放把错误传播过程按时间演一遍 → 复盘时讲得清「谁先坏、谁被拖垮」 → 工单审批或变更单上做「影响面回放」，先看会波及哪些业务再批。
4. 详情面板里的上下游列表可点，点了面板和图一起跳 → 沿依赖链排查不用回到图上找 → 模型列表详情里，点「依赖的底座」直接跳到那个资源。
5. 图上标签描底色边 → 标签压在线上依然清楚，不需要给标签加白底块。

## 换到别的东西上
- 适合：服务依赖、数据血缘、网络链路、审批流转、资源与部门的归属关系
- 节点超过 60 个要先聚合成组，点开再展开

## 容易做坏
- 给每个节点上不同颜色，红色就失去意义
- 线不分粗细，看不出流量
- 节点太多不聚合，退化成一团毛线
- 面板做成铺满的侧栏，图被挤成一小块

## 参考实现
页面 `gallery/w-topology.html`：`step()` 力导向、`draw()` 画边和节点、`paintStyle()` 健康环与线色、`related()` 上下游、`select()` 详情面板、`replay()` 故障回放
