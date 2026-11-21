# 层级表格（w-treegrid）
部门 → 资源组 → 机器三层资源台账，做成一本账簿：米色纸底、衬线字标层级、双线分栏、细导线连接父子行。父行是汇总（机器数、卡数、加权利用率、状态分布、月成本），层级越深字越轻。给要在一张表里同时看「总量」和「明细」的资源管理员和财务用。
出处：Jira 的层级视图（https://www.atlassian.com/software/jira）；Airtable 的分组视图（https://airtable.com）；会计软件的科目表（层级缩进加汇总）的通行做法。只学原则。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root{--paper:#f6f1e5;--paper2:#efe7d4;--ink:#2a2118;--ink2:#6a5c48;--ink3:#9d8f77;--rule:#d8ccb4;--rule2:#e6dcc7;--red:#8c2f2b;--green:#3c6e52;--amber:#b4842a}
.hd,.rw{display:grid;grid-template-columns:minmax(360px,1fr) 78px 78px 200px 250px 126px;align-items:center}
.hd{border-bottom:3px double var(--rule)}
.rw{height:40px;border-bottom:1px solid var(--rule2);position:relative}
.rw.d0{height:46px;background:var(--paper2)} .rw.d0 .nm{font:700 16px "Noto Serif SC"}
.rw.d1 .nm{font:600 14px "Noto Serif SC"} .rw.d2 .nm{font:400 13px "Noto Sans SC";color:var(--ink2)}
.guide{position:absolute;top:0;bottom:0;width:1px;background:var(--rule)}
.elb{position:absolute;top:0;height:50%;width:13px;border-left:1px solid var(--rule);border-bottom:1px solid var(--rule)}   /* └ 形折线 */
.ft{border-top:3px double var(--ink)}                                                                                  /* 合计行 */
```
```js
// 汇总：父行永远从「当前可见的子机器」算，筛选和移动后自动变
const sum=ms=>{const c=ms.reduce((s,m)=>s+m.cnt,0);return{n:ms.length,cards:c,util:Math.round(ms.reduce((s,m)=>s+m.util*m.cnt,0)/c),cost:ms.reduce((s,m)=>s+m.cnt*m.price,0)}};
// 展开到第 N 层：把深度 >= N 的节点 id 全放进 collapsed
const expandTo=n=>{collapsed=new Set();if(n<3)GROUPS.forEach(g=>collapsed.add("g"+g.id));if(n<2)DEPTS.forEach((_,i)=>collapsed.add("d"+i));render()};
// 重算后和上一次比，变了的格子加 .flash（1.4 秒淡出的黄底）
```
## 一眼认出（不能改）
- 米色纸底，表头和合计行用双线；没有斑马纹，没有竖分隔线
- 三层字体递减：部门 16px 粗衬线并带浅底，资源组 14px 半粗衬线，机器 13px 灰色无衬线、编号用等宽
- 父子之间是细导线和 └ 折线，不靠缩进单独表达
- 父行带「状态分布」：一条三色小堆叠条加文字，叶子行是圆点加状态
- 顶部「展开到第 1/2/3 层」分段控件，旁边是状态筛选，每项带条数
- 点机器行从右侧滑出抽屉，表格行高不变
## 颜色
- 纸 `#F6F1E5`，深纸 `#EFE7D4`，墨 `#2A2118`，次要 `#6A5C48`、`#9D8F77`，线 `#D8CCB4`
- 酒红 `#8C2F2B`（选中、低利用率、维修）；墨绿 `#3C6E52`（在用）；琥珀 `#B4842A`（空闲）；变化闪烁底 `#F3D9A0`
## 字体
- 标题和上两层用 Noto Serif SC；正文 Noto Sans SC；数字和编号 IBM Plex Mono（`tabular-nums`，右对齐）
## 真图怎么处理
- 不用图。抽屉里的 24 小时曲线是一条 1.6px 酒红 SVG 线，没有填充
## 动效
- 首屏行入场 500ms 上移淡入，逐行错开 22ms
- 筛选、移动后，数值变化的格子黄底闪 1.4 秒；被移动的机器行闪 1.6 秒
- 抽屉 280ms 从右滑入，遮罩 200ms；箭头旋转 150ms
## 组件
- 报头统计、分段控件、搜索线框、树形行（箭头、导线、折线）、汇总行、合计行、右侧抽屉、带撤销的 toast
## 学什么交互
- 父行就是汇总行，不另起「小计」行 → 每一层都能直接比较，省掉一整类行 → 放到资源台账、费用明细：部门行直接显示卡数、加权利用率、月成本，展开才看到明细。
- 筛选时保留祖先路径，汇总只统计命中的机器 → 看到的数字永远和看到的行对得上，不会出现「部门 100 台、展开只有 3 台」→ 放到资源台账筛「利用率 < 20%」时，各部门汇总就是各部门的浪费量。
- 「展开到第 N 层」一键切换 → 领导看一级，运营看三级，不用逐行点 → 放到任何有部门/项目/资源三层的页面。
- 拖动明细到别的父级，两边汇总闪一下并给撤销 → 调整归属是直接动作，数字变化被看见，错了能退 → 放到资源归属调整、机器划拨。
- 详情走侧边抽屉，不在行内展开 → 行高固定，列表不被撑乱，还能一边看抽屉一边点下一行 → 放到物理机详情、申请单详情。
## 换到别的东西上
- 部门/项目/任务、成本中心/账户/账单、集群/节点池/节点
- 层级超过四层，或每层字段完全不同的数据，不适合同列对齐
## 容易做坏
- 导线颜色太深，抢过数字
- 父行汇总用「简单平均」，和明细加权对不上
- 筛选时只隐藏子行、不重算父行
- 把详情展开塞在行内，导线和行高全乱
## 参考实现
`gallery/w-treegrid.html`：`render()`、`row()`、`sum()`、`expandTo()`、`doMove()`（拖动与撤销）、`openDr()`/`drDraw()`、`visibleM()`
