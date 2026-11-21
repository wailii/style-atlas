# 批量操作列表（w-bulkops）
物理机台账，1,284 台分页：勾选后表头整行变成黑色操作条，底部浮出「转移、改负责人、回收、导出」，执行前弹出影响预览，执行后顶部出现 10 秒倒计时的撤销条。浅纸色底、纯黑粗线、荧光黄只给选中。给要成批回收、转移机器的资源管理员用。
出处：Shopify Polaris 的 IndexTable（https://polaris.shopify.com）、Gmail 批量操作（https://mail.google.com）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Red+Hat+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
:root{--bg:#f4f3ee;--ink:#141414;--line2:#e9e7dd;--y:#ffd60a;--ysel:#fff4b8;--red:#e5391f;--ok:#2e7d4f}
.tbl{border-top:3px solid var(--ink)}
.row.sel{background:var(--ysel)} .row.sel::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--ink)}
.ck{width:17px;height:17px;border:2px solid var(--ink)}  .sel .ck{background:var(--ink)}   /* 方形复选框，选中黑底黄勾 */
/* 表头变操作条：覆盖在表头上，不新增一行 */
.cols{position:relative} .selbar{position:absolute;inset:0;background:var(--ink);color:#fff;display:none}
.cols.has .selbar{display:flex}
.fab{position:fixed;left:50%;bottom:26px;background:var(--ink);border-top:3px solid var(--y);transform:translate(-50%,100px);transition:transform .26s cubic-bezier(.3,1.25,.5,1)}
.fab.on{transform:translate(-50%,0)}
```
```js
// 选择模型：普通模式存 id 集合；跨页全选存「全选标记 + 排除集合」，不用真的存 1,284 个 id
let sel=new Set(), allMode=false, excl=new Set();
const isSel=id=>allMode?!excl.has(id):sel.has(id);
// Shift 连选：以锚点行当前状态为准，批量设置区间
for(let k=a;k<=b;k++) setOne(F[k].id, isSel(F[anchor].id));
// 执行：先记原值再改，返回撤销函数；10 秒倒计时
const prev=ts.map(x=>({x,st:x.st,dept:x.dept,owner:x.owner}));  showUndo(msg, ()=>prev.forEach(restore));
```
## 一眼认出（不能改）
- 页面顶部一条纯黑横条，标题「物理机」是 40px 粗黑体，页签带数量
- 勾选后表头整行变黑，白字写「已选 N 台」，黄色下划线链接「选中全部 1,284 条」
- 选中行淡黄底 + 左侧 4px 黑竖线，复选框是方形粗边
- 底部浮出黑色操作条，顶边 3px 黄线，红色只给「回收」
- 影响预览弹窗：三个大数字（台数、部门数、下月费用变化）+ 按部门分组的明细
## 颜色
- 底 `#F4F3EE`，墨 `#141414`，选中黄底 `#FFF4B8`，强调黄 `#FFD60A`
- 危险红 `#E5391F` 只给回收；费用减少用绿 `#2E7D4F`
## 字体
- Archivo + Noto Sans SC；编号和数字：Red Hat Mono
## 真图怎么处理
- 不用图
## 动效
- 表头操作条 180ms 下落；底部操作条 260ms 弹性上浮
- 弹窗 200ms 上浮；撤销条 280ms 落下，底部黄色进度线 10 秒走完
- 转移后被改动的行黄色闪一下
## 组件
- 状态页签、方形复选框行、表头操作条、底部操作条、影响预览弹窗（含部门/负责人选择）、撤销倒计时条、分页器、利用率小条
## 学什么交互
- 勾选后表头变成操作条而不是另起一行 → 列表不跳动，用户注意力留在表头 → 放到物理机列表：勾选瞬间显示「已选 N 台」和取消选择，原列名被盖住。
- 跨页全选用「全选标记 + 排除集合」，选满一页时才提示「选中全部 1,284 条」 → 避免用户以为只选了当前页 → 放到资源台账、费用明细等任何分页大表。
- Shift 连选 → 勾 30 台只需点两下 → 放到物理机列表：点首行勾选，Shift 点末行，区间全选。
- 执行前的影响预览：台数、部门数、下月费用变化 + 明细 → 批量回收是高风险动作，先看后果再确认 → 放到回收、转移：预览里按部门分组，回收显示「下月 −¥xx」。
- 执行后 10 秒撤销条，倒计时可见 → 敢点确认，也不用事先弹两层确认 → 放到所有批量改动：撤销后行恢复原状。
## 换到别的东西上
- 工单批量关闭、模型批量下架、账号批量禁用、告警批量静音
- 选择量上限很大时要在预览里提示分批执行
## 容易做坏
- 勾选后在表格上方另起一条操作栏，列表被顶下去
- 跨页全选默认选中，用户不知道选了多少
- 影响预览只写「确认执行吗」，没有数字
- 撤销条没有倒计时，不知道什么时候消失
## 参考实现
`gallery/w-bulkops.html`：`isSel()/selList()/setOne()`、`renderCols()`（表头操作条）、`openOp()`（预览弹窗）、`exec()`、`showUndo()`
