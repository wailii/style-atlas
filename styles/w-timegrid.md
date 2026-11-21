# 日程网格（w-timegrid）
Notion Calendar 一路的周视图：暖白底、极细网格线、半透明色块、一根贴着当前时间的红线。顶上一行自然语言输入框直接生成日程。给要排 GPU 预约、评审、维保窗口的人用：看一周占用，拖一下就改，写一句话就建。
出处：Notion Calendar（Cron）https://www.notion.so/product/calendar ；Fantastical https://flexibits.com/fantastical
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#fcfcfb; --side:#f7f6f3; --line:#ebe9e4; --line2:#f3f2ee; --ink:#1d1c1a; --ink2:#5f5c56; --mute:#a29f97; --now:#ef4a3c; --hh:52px;
  --c-train:#6a5ae0; --c-meet:#0e9a86; --c-review:#d98a07; --c-ops:#d5436b; }
.col { background-image: linear-gradient(to bottom, var(--line) 0 1px, transparent 1px); background-size: 100% var(--hh); border-left: 1px solid var(--line2); }
.ev { position:absolute; border-radius:7px; padding:4px 8px 4px 11px; overflow:hidden;
  background: color-mix(in srgb, var(--c) 13%, #fff); color: color-mix(in srgb, var(--c) 72%, #000);
  border: 1px solid color-mix(in srgb, var(--c) 22%, #fff); }
.ev::before { content:""; position:absolute; left:0; top:0; bottom:0; width:3.5px; background:var(--c); }
.now { position:absolute; left:0; right:0; border-top:1.5px solid var(--now); }
.now::before { content:""; position:absolute; left:-5px; top:-5.5px; width:9px; height:9px; border-radius:50%; background:var(--now); }
```
```js
const snap = (m) => Math.round(m / 15) * 15;                 // 15 分钟吸附
const top = (min) => min / 60 * HH;                           // 分钟 → 像素
// 重叠布局：按开始时间排序，同簇内分列，宽度 = 1/列数
function layout(list){ /* 见 w-timegrid.html 的 layout() */ }
// 拖拽：pointerdown 记录模式（create / move / resize），pointermove 改数据后整体 render()，pointerup 收尾
// 自然语言：先抠日期词（周X/明天/11月25日），再抠上下午，再抠「3 点」「半」，再抠「4 小时/30 分钟」，剩下的是标题
```
## 一眼认出（不能改）
- 暖白底 + 1px 极浅横线，半点线更浅，几乎没有框
- 日程块是 13% 着色底 + 左侧 3.5px 实色条 + 同色相深字，不用实心色块
- 当前时间一根红线，左端红点，左侧时间轴上红色小标签写具体时间
- 今天的日期是红色实心圆，其余日期纯数字
- 左侧小月历，本周一行用浅灰底带圆角圈出；下面是带复选框的日历列表
- 顶部居中偏右一个「一句话新建」输入框，聚焦时下方浮出解析预览
## 颜色
- 底 `#FCFCFB`，侧栏 `#F7F6F3`，线 `#EBE9E4` / `#F3F2EE`，字 `#1D1C1A` / `#5F5C56` / `#A29F97`
- 日历色：训练紫 `#6A5AE0`，会议青 `#0E9A86`，评审琥珀 `#D98A07`，维保玫红 `#D5436B`
- 现在红 `#EF4A3C`，只给今天和红线
## 字体
- Inter + Noto Sans SC；时间、日期、条数一律 `tabular-nums`
- 日期数字 20px，日程标题 12px/600，时间 11px
## 真图怎么处理
- 不用图。要有视觉重量靠色块本身
## 动效
- 日程块入场 450ms 上浮淡入，按列错开 40ms
- 新建的块 1.2s 放大 + 外圈光环后落定
- 红线随时间走，30 秒刷新
- 拖动时块抬起加阴影，吸附 15 分钟
## 组件
- 侧栏：品牌、小月历、日历列表（复选框 + 条数）、本周 GPU 预约小卡
- 顶栏：翻周按钮、今天、标题 + 周数、一句话输入框
- 周网格：日期头、全天行、24 小时网格（默认滚到 8 点）
- 日程浮层：标题内联编辑、时间、四个日历色切换、删除
## 学什么交互
- 空白处拖出时段 → 一个动作同时完成选时间和选时长 → 资源预约页不用先开表单：在机器行或时段上直接拖一段，浮层里再补用途和负责人。
- 一句话输入带实时解析预览 → 输入的人在回车前就看到系统理解成了什么 → 费用告警、审批催办、续期提醒可以「下周五前续期 H100-B」直接生成待办，预览里显示日期和归属。
- 日历复选框 + 条数 → 一次点击切换整类内容显隐，数字告诉你关掉了多少 → 台账页的「厂商 / 部门 / 状态」图层可以用同样的左侧复选列表。
- 时间块的 15 分钟吸附 + 重叠自动并排 → 冲突不遮挡，一眼看出哪里撞了 → 机器占用甘特或维保窗口排期，撞车直接并排显示。
- 当前时间线 → 过去的块自动变淡，不用解释「现在在哪」 → 交付流程、SLA 时间线上放同样的「现在」线。
## 换到别的东西上
- 会议室预约、值班排班、发布窗口、直播排期、课程表
- 月视图可以用同一套色块，只缩成单行条
## 容易做坏
- 色块用实心饱和色，白字压上去，周视图立刻变得杂乱
- 网格线加深，抢过日程块
- 忘了处理重叠，两个块叠在一起互相盖住
- 红线颜色拿去做别的用途，失去「现在」的含义
## 参考实现
`gallery/w-timegrid.html`：`render()` 画整周，`layout()` 重叠分列，`parseNL()` 自然语言解析，`openPop()` 日程浮层，`pointerdown/move/up` 处理新建、移动、改时长
