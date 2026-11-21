# 工单会话（w-helpdesk）
Intercom、Front 一路的客服 / 报修工作台：左边队列按 SLA 剩余时间排，中间是对话，右边是这台设备的上下文。回复和内部备注在同一个输入框里切换，备注是黄底。给要在限定时间内响应故障的运维、客服用。
出处：Intercom https://www.intercom.com ；Front https://front.com
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root { --bg:#f2f4f7; --line:#e3e7ee; --ink:#1a2030; --ink2:#566074; --mute:#959eb0; --acc:#e8710a;
  --warn:#b87500; --warn-bg:#fdf0d6; --bad:#d03b3b; --bad-bg:#fce8e8; --note:#fff4c2; --note-line:#ecd57a; }
.cols { display:grid; grid-template-columns: 352px 1fr 316px; }
.sla { font:500 11.5px "IBM Plex Mono", monospace; font-variant-numeric:tabular-nums; padding:2px 7px; border-radius:5px; background:#eef1f5; color:var(--ink2); }
.sla.w { background:var(--warn-bg); color:var(--warn); } .sla.d { background:var(--bad-bg); color:var(--bad); }
.sla.d.pulse { animation: pl 1.2s ease-in-out infinite; } @keyframes pl { 50% { background:#f8cfcf; } }
.mi.a .bb { background:var(--ink); color:#fff; border-top-right-radius:4px; }         /* 我方：深色气泡 */
.mi.n .bb { background:var(--note); box-shadow: inset 0 0 0 1px var(--note-line); }   /* 内部备注：黄底 */
.comp.note { background:var(--note); }
```
```js
const rem = (t) => t.rem - Math.floor((Date.now() - T0) / 1000);        // 剩余秒数，可为负
const sorted = () => list.sort((a,b) => (a.wait?1:0)-(b.wait?1:0) || rem(a)-rem(b));  // 等待用户的沉底，其余按剩余时间升序
// 每秒 tick：原地改倒计时文字；只有顺序变了才重画队列
// 回复框：光标前匹配 /#([^\s#]*)$/ → 弹出快捷回复，↑↓ 选，Enter/Tab 插入
```
## 一眼认出（不能改）
- 深色顶栏 + 三栏：白色队列、白色对话、灰底上下文卡片
- 队列每行右侧是等宽倒计时胶囊：平时灰，30 分钟内琥珀，10 分钟内和超时变红，超时那条还在呼吸
- 我方消息是深色气泡靠右，用户是浅灰气泡靠左，系统事件是一行居中小字夹两条细线
- 内部备注是黄底居中块，标明「内部备注」；回复框切到备注后整个框也变黄
- 右侧第一张卡画出这台设备的 8 张 GPU 小格，故障那张红色
- 输入 # 弹出快捷回复面板，选中项橙色
## 颜色
- 顶栏和我方气泡 `#1A2030`；底 `#F2F4F7`；线 `#E3E7EE`
- 主操作橙 `#E8710A`（发送）；绿 `#1F8A5D` 只给「已解决」和正常 GPU
- SLA：琥珀 `#B87500`，红 `#D03B3B`；备注黄 `#FFF4C2` / 边 `#ECD57A`
## 字体
- Inter + Noto Sans SC；倒计时、工单号、IP 用 IBM Plex Mono
## 真图怎么处理
- 不用图。头像是按人着色的单字圆
## 动效
- 倒计时每秒走一格；超时胶囊 1.2s 呼吸
- 新消息 300ms 上浮；快捷回复面板 150ms 淡入
- 回复 / 备注切换时输入框底色 200ms 过渡
- 回复后该工单立即变「等待用户」并沉到队列底部
## 组件
- 顶栏：产品名、搜索、待处理 / 已超时 / 今日已解决
- 队列：全部 / 我的 / 未分配 页签带计数，行 = 头像 + 优先级点 + 标题 + 倒计时
- 对话头：标题、工单号、大倒计时、「标为已解决」
- 回复框：回复 / 内部备注页签、快捷回复、发送
- 上下文：设备卡（含 GPU 格）、负责人与合同、历史报修、标签
## 学什么交互
- 队列按 SLA 剩余时间排，倒计时实时走 → 先做最急的，不用自己判断 → 报修、审批、续期队列默认按「距超时」排，超时的置顶变红。
- 回复后 SLA 暂停并沉底 → 球在对方手里的单不占前排 → 工单、审批里「等待申请人补充」的状态自动下沉并显示「等待用户」。
- 回复和内部备注共用一个输入框，切换后整框变黄 → 防止把内部判断发给用户 → 工单处理里的「对外回复 / 内部备注」都做成同款切换。
- 输入 # 调出快捷回复 → 常见回复一键插入，不用复制粘贴 → 报修、审批驳回理由用宏：「缺少部门负责人确认」「额度不足」。
- 右侧放对象的上下文（设备、合同、历史报修）→ 回答问题所需信息不用切页面 → 工单页右栏放资源详情、所属合同、过往工单。
## 换到别的东西上
- 客服工单、IT 服务台、故障值班台、审批工作台
## 容易做坏
- 倒计时用比例字体，每秒抖动
- 所有工单都标红，红色失去含义
- 内部备注和用户回复长得差不多，容易发错
- 上下文栏塞满字段，找不到关键的一两项
## 参考实现
`gallery/w-helpdesk.html`：`sorted()` 与 `renderQ()` 队列排序，`tick()` 倒计时，`renderCv()` 对话与回复框，`bindComp()` 快捷回复，`send()` / `resolve()`，`renderCx()` 上下文
