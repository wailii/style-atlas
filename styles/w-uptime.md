# 状态条列表（w-uptime）
GPU 服务器健康列表。每台机器一行，右侧一排细竖条，每条一天，绿/黄/红/灰四色；顶部有一条全公司汇总条。一眼看出哪台最近不稳，可用率用等宽数字。给运维和资源管理员每天巡一遍机器用。
出处：Atlassian Statuspage（https://www.atlassian.com/software/statuspage）；Better Stack（https://betterstack.com）的状态页与监控列表。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap");
:root{--bg:#f7f9f7;--ink:#17231d;--ink2:#58675f;--mute:#98a59e;--line:#e4eae6;--ok:#2cb67d;--warn:#f0b429;--bad:#e5484d;--mt:#9db4d1;--nd:#e6ebe8}
.row{display:grid;grid-template-columns:230px 78px minmax(220px,1fr) 78px 88px;gap:22px;align-items:center;height:62px;border-bottom:1px solid var(--line)}
.strip{display:flex;gap:2px;height:30px}                       /* 竖条自适应宽度：7 天时变粗，90 天时变细 */
.strip i{flex:1;border-radius:2px;background:var(--ok);transform-origin:bottom;animation:bar .5s both}
@keyframes bar{from{transform:scaleY(.2);opacity:0}}
.s1{background:var(--warn)!important}.s2{background:var(--bad)!important}.s3{background:var(--mt)!important}.s-1{background:var(--nd)!important}
```
```js
// 每个竖条带 data-m / data-d，悬停时用一个 position:fixed 的浮层读当天事件，不给每条加 title
$("#list").addEventListener("mousemove",e=>{const b=e.target.closest(".strip i");/* 取机器、第几天，渲染当天事件，跟随鼠标，靠边翻转 */});
// 排序重排：FLIP。记下旧位置 → 重排 DOM → 给每行 translateY(旧-新) → 下一帧过渡到 0
r.style.transform=`translateY(${old-now}px)`;requestAnimationFrame(()=>requestAnimationFrame(()=>{r.style.transition="transform .55s cubic-bezier(.2,.8,.2,1)";r.style.transform=""}));
```
## 一眼认出（不能改）
- 每行右侧一排等宽细竖条，一条一天，圆角 2px，间距 2px
- 四种颜色：绿=正常、黄=降级、红=故障、蓝灰=计划维护；还没上线的天用极浅灰
- 顶部有一条更高的全公司汇总条，同样是一天一条
- 数字一律等宽：可用率、故障次数、主机名
- 表格没有卡片、没有斑马纹，只有发丝线；选中行淡绿底，点机器名右侧滑出事件时间线
- 页头一句话结论（「44 台中 3 台需要关注」）加右侧大号平均可用率
## 颜色
- 底 `#F7F9F7`；墨 `#17231D`；次要 `#58675F`、`#98A59E`；线 `#E4EAE6`
- 状态：绿 `#2CB67D`、黄 `#F0B429`、红 `#E5484D`、计划维护 `#9DB4D1`、未上线 `#E6EBE8`
- 可用率低于 97% 红字，低于 99.5% 琥珀字
## 字体
- Manrope + Noto Sans SC 做正文；主机名、可用率、次数、日期用 JetBrains Mono
## 真图怎么处理
- 不用图。左上角圆点带呼吸环表示「整体在线」
## 动效
- 竖条入场 500ms，自下向上生长，逐条错开 5ms（7 天时 14ms）
- 切时间范围后竖条重新生长；切排序用 FLIP，行 550ms 滑到新位置
- 面板 300ms 从右展开；点竖条打开面板并把对应事件高亮 1.8 秒
## 组件
- 页头结论、全公司汇总条、时间范围分段、图例、搜索、排序表头、状态条行、悬停浮层、事件时间线面板、KPI 小格
## 学什么交互
- 一天一个竖条，颜色就是状态 → 不读数字也能看到「最近不稳」的模式，连续红条和零星黄条一眼分得开 → 放到物理机列表、GPU 卡健康、服务可用性：每台机器近 90 天的健康，不需要再点进去看曲线。
- 悬停竖条弹出当天事件，点竖条直达面板里那一条 → 从「哪天出了问题」到「出了什么问题」两步 → 放到故障台账：点红条直接定位到那次故障的工单。
- 时间范围切换时竖条重排，可用率同步重算 → 同一份数据在周报（7 天）和季报（90 天）视角之间无缝切 → 放到资源利用率、SLA 报表。
- 按「近 7 天故障次数」排序并用动画重排 → 有问题的行浮到顶，用户看得见谁上来了 → 放到巡检列表：每天早上先看顶部几行。
- 全公司一条汇总条放在列表之上 → 先看整体，再看个体 → 放到资源池、机房、供应商维度的健康总览。
## 换到别的东西上
- 服务监控、定时任务、流水线、网络链路、供应商 SLA
- 数据不是「每天一个状态」的，比如连续数值，不适合
## 容易做坏
- 竖条用固定像素宽，窗口一变就溢出或留白
- 颜色超过五种，或把「计划维护」画成红色，误报故障
- 每条竖条一个原生 title，延迟高、内容少
- 排序后行直接跳位，用户找不到刚才看的那台
## 参考实现
`gallery/w-uptime.html`：`strip()`、`layout()`（含 FLIP）、`refresh()`、`openPn()`、`fleetDay()`、悬停浮层 `showTip()`
