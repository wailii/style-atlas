# 流程进度列表（w-pipeline）
资源申请单列表：每一行中间是一条五段箭头进度（提交、部门审批、资源审批、交付、验收），当前步骤实心高亮，下面一行写「卡在谁 · 几天」，超时的步骤整段变橙。米色纸张底、衬线大数字、深绿墨色，像物流追踪单。给要一眼看出「这张单卡在哪、卡了多久、该催谁」的申请人和管理员用。
出处：Greenhouse 招聘管道（https://www.greenhouse.com）、GitHub Pull Request 检查状态列表（https://github.com）、物流单号追踪页的分段进度。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700&display=swap");
:root{--bg:#f5f0e4;--paper:#fbf8f1;--ink:#1d2b27;--ink2:#56625d;--mute:#8d958f;--line:#e2dac8;--line2:#ece5d5;
  --done:#d3e2d6;--doneink:#2c5a43;--cur:#2f6b4f;--future:#ebe4d3;--futureink:#a39c88;--warn:#e8731a;--sel:#f0e8d0}
/* 五段箭头：每段 clip-path 切成箭头，段与段负外边距咬合 */
.bar{display:flex;height:28px}
.seg{flex:1;margin-right:-6px;clip-path:polygon(0 0,calc(100% - 9px) 0,100% 50%,calc(100% - 9px) 100%,0 100%,9px 50%)}
.seg:first-child{clip-path:polygon(0 0,calc(100% - 9px) 0,100% 50%,calc(100% - 9px) 100%,0 100%)}
.seg:last-child{clip-path:polygon(0 0,100% 0,100% 100%,0 100%,9px 50%);margin-right:0}
.seg.done{background:var(--done);color:var(--doneink)} .seg.cur{background:var(--cur);color:#fff} .seg.cur.late{background:var(--warn)} .seg.fut{background:var(--future);color:var(--futureink)}
/* 说明行跟着当前步骤走：靠左的步骤缩进，靠右的步骤右对齐，避免溢出 */
.note{margin-left:calc(var(--cur)*20%)}
.row{display:grid;grid-template-columns:34px 290px 140px minmax(470px,1fr) 118px 96px;min-height:66px;border-bottom:1px solid var(--line2)}
```
```js
// 超时判定：每步有自己的时限（天）
const SLA=[1,2,3,5,3];  r.late = r.wait > SLA[r.cur];
// 漏斗筛选：点哪一步就只看卡在那一步的单，每格带「超时 n」
visible = reqs.filter(r=>step==="all"||r.cur===+step)
// 点步骤段弹出详情气泡：已完成看处理人和用时，进行中看已等待，未开始看预计
showPop(req, stepIndex, anchorEl)
```
## 一眼认出（不能改）
- 每行中间是五段箭头进度条，已完成浅绿带勾、当前步骤深绿实心、未开始米灰
- 进度条正下方一行「卡在 张三 · 3 天」，位置跟着当前步骤走
- 超时的当前步骤整段变橙，右侧等待天数也变橙并写「超时 n 天」
- 顶部是 6 格漏斗：全部 + 五个步骤，每格一个衬线大数字，超时数用橙点单独标
- 米色纸张底，标题和数字用衬线体，其余用无衬线
## 颜色
- 底 `#F5F0E4`，纸 `#FBF8F1`，墨 `#1D2B27`，线 `#E2DAC8`
- 完成 `#D3E2D6`，进行中 `#2F6B4F`，超时 `#E8731A`，未开始 `#EBE4D3`
- 橙色只用于超时，全页其他地方不用橙
## 字体
- 标题和大数字：Noto Serif SC 700
- 正文：DM Sans + Noto Sans SC；单号和规格：DM Mono
## 真图怎么处理
- 不用图。头像只出现在右上角的单字圆点
## 动效
- 行入场 400ms 淡入上移，逐行错开 28ms
- 漏斗选中格顶部 3px 绿线 250ms 从左展开
- 批量操作条 280ms 弹性上浮；气泡 150ms 淡入
## 组件
- 漏斗筛选格、箭头进度条、步骤气泡、复选框行、排序胶囊、批量催办条、已催办标记、提示条
## 学什么交互
- 把审批流画在列表行里 → 不用点进详情就知道每张单的位置 → 放到资源申请单列表：每行一条「提交→部门审批→资源审批→交付→验收」，当前段高亮。
- 当前步骤下直接写「卡在谁 · 几天」 → 要催的人和时长一眼可见 → 放到审批列表：把「处理人 + 已等待」写在进度条下面，不另开一列。
- 漏斗式筛选，每格带数量和超时数 → 管理员先看哪一步积压 → 放到申请单：顶部六格点哪格就只看卡在哪一步的单，替代下拉筛选。
- 超时按「步骤各自的时限」判定，不用统一阈值 → 部门审批 2 天算超时，交付 5 天才算 → 放到交付和验收：每步 SLA 不同，超时的段变橙。
- 批量催办后行上留痕 → 避免重复催 → 放到申请单：勾选多单点「批量催办」，已催办的行显示时间，再次勾选时提示已跳过。
## 换到别的东西上
- 任何有固定步骤的流转：采购单、工单、入职办理、发布流水线
- 步骤超过 7 段时每段放不下文字，要改成只显示图标
## 容易做坏
- 进度条用一整条平滑填充，丢了「第几步」的信息
- 超时色用红色，和错误态混在一起；这里只用橙
- 说明行不跟随当前步骤，靠右的步骤文字撞到右侧列
- 每步时限统一，超时判定失去意义
## 参考实现
`gallery/w-pipeline.html`：`rowHTML()` 生成进度条和说明行、`renderFunnel()`、`showPop()`、`#urgeAll` 批量催办、`visible()` 筛选与排序
