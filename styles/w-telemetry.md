# 日志探针（w-telemetry）
白底、只用一种紫色强调的日志与链路检索台：左边按字段分面带条数，上面是可拖选的时间直方图，中间是等宽日志行，点一行从右侧滑出 trace 瀑布和字段。给排查线上问题的研发和值班人员。
出处：Datadog Log Explorer / APM（https://www.datadoghq.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --ink:#1d1a2f; --ink2:#575470; --mute:#8b88a0; --line:#e9e7f1; --line2:#f3f2f8; --acc:#5b35d5; --tint:#f2eefd;
  --info:#c9bdf1; --warn:#e8a317; --err:#d9304a; }
.row { display:grid; grid-template-columns:104px 64px 120px 96px 1fr 76px; height:26px; font:11.5px "JetBrains Mono"; border-bottom:1px solid var(--line2); }
.row.sel { background:var(--tint); box-shadow:inset 2px 0 0 var(--acc); }
.fv .bar { position:absolute; right:16px; top:4px; bottom:4px; background:var(--tint); }   /* 条数背后的占比底条 */
```
```js
// facet 条数：对每个字段，统计「除了它自己以外的所有条件」都满足的记录
function pass(l, except) { if (!inWin(l) || !qmatch(l)) return false; for (const k in F) if (k !== except && F[k].size && !F[k].has(val(l,k))) return false; return true; }
// 直方图拖选：mousedown 记起点，mouseup 把时间窗口换成选区，所有数据重算
```
## 一眼认出（不能改）
- 白底，只有一种紫色 `#5b35d5` 作强调（选中行、勾选、链接、瀑布条）
- 左侧 facet 栏：每个值前有勾选框、后有等宽条数和浅紫占比底条
- 顶部按级别堆叠的时间直方图，可鼠标拖选缩小时间
- 日志行等宽小字，状态色只出现在级别（INFO 灰紫、WARN 琥珀、ERROR 红）
- 右侧抽屉：trace 瀑布 + 字段表，悬停字段出「加入筛选 / 排除」
## 颜色
- 白底，字 `#1d1a2f / #575470 / #8b88a0`，线 `#e9e7f1`
- 强调紫 `#5b35d5`，浅紫底 `#f2eefd`，直方图 INFO 柱 `#c9bdf1`
- 状态：WARN `#e8a317`，ERROR `#d9304a`，只给级别、直方图、出错 span
## 字体
- Inter + Noto Sans SC 做界面，JetBrains Mono 做日志、时间、条数、字段值
## 真图怎么处理
- 不用照片
## 动效
- 抽屉 250ms 从右滑入；facet 条数变化时占比底条 250ms 过渡
- 搜索框聚焦时出 3px 浅紫外圈
- 拖选时选区半透明紫框跟手
## 组件
- 顶栏：Logo、页签（日志 / 链路 / 指标 / 告警规则）
- 查询栏：搜索框（支持 字段:值）、时间窗口、还原时间按钮
- facet 组：服务、状态、模型、地域、耗时区间，组头可折叠，显示已选数量
- 直方图 + 日志表 + 抽屉；操作后底部小提示条说明加了什么筛选
## 学什么交互
- facet 条数随其他条件联动 → 勾选前就知道勾了会剩多少，不会点出空结果 → 资源台账左侧按「部门、机房、状态」分面，每项带数量，勾选后其余数量跟着变。
- 在直方图上拖选缩小时间 → 比逐个填起止时间快，且能看到异常的形状 → 费用明细、调用记录顶部放按天的柱状图，拖选即筛时间。
- 点一行侧边抽屉看详情，列表不跳走 → 能连续对比多条 → 工单审批、模型列表点行从右侧展开，Esc 关闭，左边仍可继续点。
- 抽屉里的字段值一键「加入筛选 / 排除」 → 从一条记录出发缩小范围，不用回头去找筛选框 → 订单详情里点某个部门、某个供应商，直接回到列表并带上这个条件。
## 换到别的东西上
- 适合：日志、审计记录、调用明细、工单流水
- 不适合：需要大量编辑的表单页
## 容易做坏
- 给每个字段值配颜色，紫色强调就失效
- facet 条数不联动，只显示总数
- 抽屉做成居中弹窗，遮住列表
- 日志用比例字体，时间和耗时列对不齐
## 参考实现
`gallery/w-telemetry.html`：`pass()` 过滤与 facet 计数，`renderFacets()`，`renderHist()` + `bindHist()` 拖选，`openDrawer()` / `spansOf()` 瀑布，`addFilter()`。
