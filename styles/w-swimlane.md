# 泳道看板（w-swimlane）
横向是流程阶段，纵向是负责人泳道，卡片在格子之间拖动。列头显示数量和 WIP 上限，超限整列头变橙红；停留太久的卡片变淡并标出天数。给要盯交付节奏和人员负载的人用。
出处：Jira 看板泳道（https://www.atlassian.com/software/jira）、Trello（https://trello.com）、Height（https://height.app）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root{--bg:#e9edf2;--lane:#f6f8fa;--ink:#15202e;--line:#d5dbe4;--acc:#e8542e;--accbg:#fde8e1}
.board{display:grid;grid-template-columns:168px repeat(5,minmax(236px,1fr))}
.hcell{position:sticky;top:0;border-bottom:2px solid var(--ink)} .hcell.over{background:var(--accbg);border-bottom-color:var(--acc)}
.lh{position:sticky;left:0}                                    /* 泳道头冻结 */
.cell{border-right:1px dashed #d9dee6;background:var(--lane)} .cell.dragover{outline:2px solid #3d6fd9}
.cell.dragover.willover{outline:2px dashed var(--acc);background:var(--accbg)}   /* 放下去会超限 */
.card{border-radius:9px;box-shadow:0 1px 0 rgba(20,30,50,.12),0 0 0 1px rgba(20,30,50,.05)} .card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--p)}
.card.stale{opacity:.55}
```
```js
// 渲染：头行 + 每个负责人一行（泳道）× 每个阶段一格；卡片 = {id,t,o(负责人),s(阶段),age(停留天)}
// 拖放：dragover 时算「放下后本列数量 > 上限」决定 willover；drop 时改 s 和 o、age 清零，按鼠标 y 插到卡片之间
```
## 一眼认出（不能改）
- 列头粗下划线，显示阶段名、数量胶囊、「上限 N」和进度条
- 超 WIP 的列头整块变橙红，并出现「超出上限 N 项」
- 左侧泳道头冻结：负责人头像、姓名、项数和卡数，可点击折叠
- 卡片左侧 3px 色条表示优先级，卡内三级信息：编号 → 标题 → 标签/天数/头像
- 停留 5 天以上的卡片变淡，天数用橙红字「停留 N 天」
- 顶部汇总：进行中交付、超上限的列、停滞数
## 颜色
- 板底 `#E9EDF2`，泳道格 `#F6F8FA`，卡片白，墨 `#15202E`
- 警示橙红 `#E8542E`（底 `#FDE8E1`），只给超限和停滞
- 优先级条：紧急 `#E8542E`、高 `#E0A21A`、普通 `#C6CDD8`
- 人员色：蓝 `#2F6FDB`、绿 `#1F8A5B`、紫 `#8A5BD6`、橙 `#D9822B`
## 字体
- Manrope + Noto Sans SC；编号、天数、数量用 IBM Plex Mono
## 真图怎么处理
- 不用照片。头像是单字色块
## 动效
- 卡片悬停上浮 1px 加阴影；变淡 250ms；进度条宽度 300ms
- 拖动时源卡片 35% 透明，目标格蓝色描边；将超限时改橙红虚线
- 提示条 200ms 浮出，超限时为橙红
## 组件
- 顶栏（标题、视图切换、汇总数字）、负责人筛选 chip、列头、泳道头、格子、卡片、提示条
## 学什么交互
- 列头同时放数量、上限、进度条，超限整块变色 → 瓶颈一眼可见，不用数 → 放到工单审批、交付排期：「审批中」堆了 7 张，列头直接变红。
- 拖到会超限的格子时，目标格先变警示虚线 → 事前提醒而不是事后报错，仍允许放下 → 放到资源调度：把作业拖进已满的队列时先提示。
- 久未动的卡片变淡 + 橙红天数 → 用淡化降低干扰，同时把停滞的找出来 → 放到工单、报修、采购跟进：停留超过 SLA 的行自动弱化并标天数。
- 泳道按人，拖到另一条泳道即改负责人 → 一次拖动同时改状态和归属 → 放到资源申请交付：运维之间转单直接拖。
- 泳道可折叠，折叠后每列只留一个数字 → 人多时先看总量再展开细节 → 放到按部门、按机房分组的看板。
## 换到别的东西上
- 交付流程、审批流、工单处理、招聘进度、采购跟进
- 不适合没有明确阶段的清单
## 容易做坏
- 卡片字段塞满，层级消失
- 超限只在角落加红点，列头没有变化
- 停滞卡片加红框而不是变淡，满屏红色，反而找不到重点
- 泳道头不冻结，横向滚动后不知道行属于谁
## 参考实现
`gallery/w-swimlane.html`：`render()`、`cardHTML()`、拖放监听 `dragstart/dragover/drop`、`stats()`、列头上限编辑（`editLim`）
