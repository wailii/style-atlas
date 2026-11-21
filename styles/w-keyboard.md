# 键盘优先（w-keyboard）
研发需求池的列表页：极细的灰阶层级、13px 小字、自绘状态图标（虚线圈、半圆、四分之三圆、打勾圆）、几乎没有边框。所有操作都能不碰鼠标完成：J/K 移动、X 多选、S/A/P 弹小菜单、⌘K 搜一切。给每天要过几十条任务的研发和产品用。
出处：Linear（https://linear.app）的列表与命令面板交互。只学原则，不复刻外观和品牌色。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;600&display=swap");
:root{--bg:#fcfcfd;--side:#f6f6f8;--hover:#f1f1f4;--focus:#ecebf8;--line:#ececf0;--line2:#f3f3f6;--ink:#1d1d22;--ink2:#5d5e68;--mute:#9a9ba6;--acc:#5b54d6;--acc2:#e9e8fa}
body{font:13px Inter,"Noto Sans SC",sans-serif}
.row{height:36px;border-bottom:1px solid var(--line2);display:flex;align-items:center;gap:10px;padding:0 16px;position:relative}
.row.focus{background:var(--focus)} .row.focus::before{content:"";position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--acc)}
.gh{position:sticky;top:0;height:34px;background:var(--side)}   /* 组头吸顶 */
```
```js
// 状态图标：外圈 + 内圈按进度画扇形（stroke-dasharray）
const r=2.8,C=2*Math.PI*r; `<circle r="${r}" stroke-width="${r*2}" stroke-dasharray="${C*f} ${C}" transform="rotate(-90 8 8)"/>`
// 一个通用小菜单：输入过滤、↑↓、回车、数字键直选；状态/指派/优先级/⌘K 共用
openMenu({title, items, pos, onPick})
```
## 一眼认出（不能改）
- 行高 36px 以内，字 13px，几乎无边框，只有 1px 淡线
- 状态是自绘图标：虚线圈=规划中、空圈=待办、半圆=进行中、四分之三圆=评审、实心打勾=完成
- 按状态分组，组头吸顶、带数量、可折叠
- 焦点行浅紫底 + 左侧 2px 竖线
- 选中多行后底部浮出操作条；底部常驻一行快捷键文字提示（不画键帽）
- ⌘K 面板：命令和需求同一个输入框
## 颜色
- 浅色：底 `#FCFCFD`，侧栏 `#F6F6F8`，焦点 `#ECEBF8`，强调靛紫 `#5B54D6`
- 状态色只给图标：进行中琥珀、评审绿、完成靛紫；紧急优先级红
- 深色可切换（按 D）：底 `#17171A`，强调 `#8B85F0`
## 字体
- Inter + Noto Sans SC；编号和日期用 JetBrains Mono
## 真图怎么处理
- 不用图。头像只用单字圆点，未分配用虚线圈
## 动效
- 行入场 300ms 淡入上移，逐行错开 18ms
- 菜单 120ms 缩放弹出；操作条 200ms 上浮；撤销提示 3.5 秒后收起
## 组件
- 侧栏、页签、分组列表、优先级图标、状态图标、标签点、头像字母、浮动操作条、小菜单、命令面板、提示条
## 学什么交互
- 一个菜单组件管所有选择 → 输入过滤、↑↓、回车、数字键都能用，学一次通用 → 放到后台：资源台账里改「状态/负责人/用途」都用这一个弹层，不再每个字段一个弹窗。
- 单键动作作用于「焦点行，有多选则全部」→ 单条和批量用同一套按键，不用先找批量入口 → 放到工单审批：J/K 走一遍，X 勾几条，S 一次改完。
- ⌘K 把「命令」和「对象」放进同一个框 → 知道名字不用找菜单 → 放到费用明细：输入部门名直接定位，输入「导出」直接执行。
- 改完出一条可撤销提示（Z）→ 敢快速操作 → 放到模型列表：批量下架后给 3 秒撤销。
- 组头显示数量并可折叠 → 一屏看清各状态体量 → 放到作业队列：运行中、排队中、失败各一组。
## 换到别的东西上
- 任何以列表为主的后台：工单、资源申请、告警、模型版本
- 不适合需要大量横向字段对比的表格
## 容易做坏
- 焦点行不明显，按 J/K 看不出走到哪
- 快捷键不提示，用户不知道有
- 图标用 Emoji 或通用字体图标，丢了状态的细腻感
- 行高放大到 48px 以上，就不再是这个风格
## 参考实现
`gallery/w-keyboard.html`：`render()`、`openMenu()`、`stMenu()/whoMenu()/priMenu()`、`palette()`、`apply()`/`undo()`、图标对象 `I`
