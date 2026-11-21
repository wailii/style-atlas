# 容量规划（w-capacity）
一张大面积图占住版面：实线是历史需求，虚线是预测，淡紫色置信带，绿色阶梯线是可用供给，需求高于供给的地方用斜线填成缺口。右侧是假设面板，拖动滑杆，图和数字实时重算。给要决定「买多少卡、什么时候到」的容量规划和采购负责人。
出处：AWS Compute Optimizer（https://aws.amazon.com/compute-optimizer/）；Cast AI（https://cast.ai）；Kubecost（https://www.kubecost.com）的预测与容量视图。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --ink:#1a1633; --ink2:#554f73; --mute:#8d88a8; --line:#e4e0f1; --violet:#5b3fd6; --teal:#0a8f78; --coral:#ef4f34; --tint:#f1eefc; }
aside { width:344px; background:var(--tint); border-left:1px solid #d9d2f2; position:sticky; top:0; height:100vh; }  /* 假设面板贴边整高，没有白卡 */
input[type=range]::-webkit-slider-runnable-track { height:3px; background:#c9c0ec; }
input[type=range]::-webkit-slider-thumb { width:18px; height:18px; border-radius:50%; background:#fff; border:2px solid var(--violet); }
```
```js
// 模型：需求按复利增长，置信带随月份变宽；供给 = 现有 + 已确认到货 + 新采购（到货月之后生效）
D[i] = D0 * Math.pow(1 + g/100, k);   S[i] = S0 + (k>=2?128:0) + (k>=arr ? buy : 0);
// 阶梯线：值在月份点上跳变，月与月之间保持上一个月的值
const stepPath = (S,from,to) => { let d=`M${X(from)} ${Y(S[from])}`; for(let i=from+1;i<=to;i++) d+=`L${X(i)} ${Y(S[i-1])}L${X(i)} ${Y(S[i])}`; return d; };
// 缺口区域：每月切 40 份采样，需求 > 供给的连续区间画成一个多边形，填 <pattern> 斜线
// 情景切换：补间 A.g / A.buy / A.arr，每帧 draw()，所以曲线是滑过去的
```
## 一眼认出（不能改）
- 一张横贯版面的大图：历史淡灰底，今天竖虚线，右侧是预测区
- 供给是绿色阶梯线，需求预测是紫色虚线，外面有淡紫置信带
- 需求高于供给的区域是珊瑚红斜线填充，峰值处有双箭头和「缺口 xxx 卡」标签
- 图上方一排 4 个大数字：首次缺口月、峰值缺口、持续月数、需追加采购
- 右侧淡紫色整高面板，三个滑杆各带大号读数
- 三选一的情景切换，黑色滑块在按钮下面滑动
## 颜色
- 白底，墨 `#1a1633`，紫 `#5b3fd6`（需求预测、可操作的数值）、绿 `#0a8f78`（供给）、珊瑚 `#ef4f34`（缺口）
- 方案叠加色：琥珀 `#d99100`、品红 `#c2338f`，只给「已保存方案」用
- 面板底 `#f1eefc`
## 字体
- IBM Plex Sans + Noto Sans SC，数字用 IBM Plex Mono，`tabular-nums`
- 图内文字 11~12px，KPI 数字 26px
## 真图怎么处理
- 不用照片；斜线填充用 SVG `<pattern>` 画，不用 CSS 渐变
## 动效
- 拖滑杆：曲线、阶梯线、缺口区域每帧重算，没有延迟
- 切情景：滑杆数值和曲线用 0.55s 缓出补间滑过去
- 保存方案：右栏方案行从上方落入，图上叠加该方案的虚线和阶梯线
- 悬停：竖线 + 两个圆点 + 提示卡
## 组件
- KPI 条、主图（历史/预测/置信带/供给/缺口/今天线）、悬停提示、框选区间
- 假设面板：情景切换、三个滑杆、保存方案按钮、方案列表（显隐、载入、删除）、方案对比小表
- 逐月表：月份、需求、供给、缺口、P10–P90 区间、建议（带状态标签）
## 学什么交互
- 假设放在图旁边，拖一下就看到图变 → 规划的问题永远是「如果…会怎样」，滑杆比表单快一个量级 → 放到「采购计划」页：拖新采购卡数和到货月份，直接看哪个月会出现缺口。
- 一键切保守/基准/激进，数值滑过去，不直接跳变 → 用户能看到每个假设怎么推动曲线，也能顺手微调 → 放到「需求预测」：三个预设情景作为起点，调完变成「自定义」。
- 在图上拖选一段时间，表格只留这一段 → 图和表联动，不用在筛选框里选日期 → 放到「费用明细」「容量」：在趋势图上框出 2–4 月，下面列这三个月的明细和建议。
- 保存方案叠加对比，最多 2 个 → 决策靠比较，叠在同一张图上比两张图并排准确 → 放到「采购评审」：方案 A（256 卡 3 月到）与方案 B（512 卡 4 月到）一眼看出缺口月数和金额差。
- 每月的缺口配一句建议，建议跟缺口大小分档 → 数字之后马上给动作，领导不用问「那怎么办」 → 放到「容量预警」：缺口 < 150 卡建议错峰，> 400 卡建议加采购。
## 换到别的东西上
- 适合：GPU/CPU 容量、存储增长、预算消耗预测、Token 用量与额度
- 不适合：没有可调假设的纯展示趋势
## 容易做坏
- 预测线画成实线，用户分不清哪段是实际
- 置信带不随时间变宽，预测显得过于笃定
- 缺口区域用红色实心填充，盖住下面的线
- 滑杆改了数，KPI 条没跟着变
## 参考实现
`gallery/w-capacity.html`：`calc()` 预测模型，`draw()` 画图，`gapPolys()` 缺口多边形，`tween()` 情景补间，`renderTable()` 逐月建议，刷选逻辑在 `svg` 的 `mousedown/mousemove` 里，`renderPlans()` 方案叠加与对比。
