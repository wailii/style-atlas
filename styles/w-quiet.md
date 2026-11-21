# 专注单色（w-quiet）
白纸、黑字、一种强调色，加上很大的留白。界面元素平时隐身，鼠标不动两秒，工具栏淡掉，只剩正文。适合需要集中精力读和写的场景：审阅需求文档、写周报、校对。
出处：iA Writer（https://ia.net/writer）；Things 3（https://culturedcode.com/things/）；Bear（https://bear.app/）。
## 直接抄
```css
:root { --paper: #fdfdfc; --ink: #1a1a1a; --ink2: #6b6b68; --faint: #b9b9b5; --acc: #0f766e; --acc-bg: rgba(15,118,110,.14); }
body { background: var(--paper); font-family: "Source Serif 4", "Noto Serif SC", serif; }
.sheet { display: grid; grid-template-columns: minmax(40px,1fr) 680px minmax(260px,1fr); padding: 120px 0 180px; }  /* 正文居中，右侧是页边 */
article p { font-size: 18px; line-height: 2.05; margin-bottom: 22px; }
.blk { transition: opacity .5s ease; }
body.focus .blk:not(.cur) { opacity: .2; }               /* 焦点模式：只有当前段落是实色 */
.top, .bot { transition: opacity .7s ease; } body.idle .top, body.idle .bot { opacity: 0; } body.idle, body.idle * { cursor: none; }
mark { background: var(--acc-bg); border-bottom: 1.5px solid var(--acc); }
.note { position: absolute; border-left: 2px solid var(--acc); padding-left: 14px; font: 13px/1.65 Inter, "Noto Sans SC"; }
```
```js
// 空闲：只在鼠标移动或滚动时唤醒，2 秒后淡出；批注框正在输入时不淡出
const wake = () => { body.classList.remove('idle'); clearTimeout(t); t = setTimeout(() => body.classList.add('idle'), 2000); };
// 批注：选中 → 浮出「批注」→ mark 包住选区 → 右侧页边按 mark 的 top 摆卡片，重叠时往下顺延
y = Math.max(mark.getBoundingClientRect().top + scrollY - base, last + 8);
// 字数：汉字逐字数，英文数字按词数；有选区时显示「已选 N 字 / 共 M 字」
```
## 一眼认出（不能改）
- 只有黑、白、灰和一种青绿强调色，且强调色只用在批注和选中态
- 正文 18px 衬线、行高 2 左右、行宽约 680px，两侧大面积留白
- 焦点模式：当前段落实色，其他段落淡到 20%
- 顶栏和底栏平时看得见但很轻，鼠标不动 2 秒整体淡出，光标一并消失
- 批注出现在右侧页边，与被标注的文字同一高度，用一条细竖线连接，不用气泡
## 颜色
- 纸 `#FDFDFC`；正文 `#1A1A1A`；次级 `#6B6B68`；极淡 `#B9B9B5`
- 强调青绿 `#0F766E`，底 `rgba(15,118,110,.14)`
- 没有第二个彩色，错误和警告也不另配红黄
## 字体
- 正文 Source Serif 4 + Noto Serif SC，18px
- 标题 Noto Serif SC 700 40px；小标题 Noto Sans SC 600 19px
- 界面（顶栏、批注、字数）Inter + Noto Sans SC，12 到 13px
- 正文里的数字用 Inter，保证等宽
## 真图怎么处理
- 不用图。需要插图时单色线稿，宽度等于正文栏，上下各留一行空白
## 动效
- 焦点切换：段落透明度 500ms 渐变
- 工具栏淡出 700ms，唤醒时淡入；批注卡片位置变化 350ms 缓动
- 批注与被标注文字互相悬停联动，加深底色
- 没有入场动画，页面打开就是静止的
## 组件
- 顶栏：文档名加状态，右侧「焦点模式」开关和「批注 N」
- 正文：标题、小标题、段落、短横列表
- 选中浮条：深色小条，只放「批注」一个动作
- 页边批注：作者、内容、悬停显示「删除」；新建时是输入框，回车保存，Esc 取消
- 底栏：字数、阅读时间（选中文字时显示已选字数）
## 学什么交互
- 焦点模式 → 把注意力锁在一段，其他内容退后但仍可见 → 放到后台：审批详情页只让当前审批项实色，其余审批项淡化，评论时不会看串行。
- 空闲时界面隐身 → 阅读和输入时没有视觉噪音 → 放到后台：长表单、方案评审页在编辑状态下自动收起顶栏和侧栏，鼠标一动再出现。
- 页边批注与原文同高 → 评论和被评内容不用来回对照 → 放到后台：费用明细、变更单的审批意见贴在对应行的右侧，而不是集中在页底的评论区。
- 字数和阅读时间实时变 → 写作者随时知道篇幅 → 放到后台：公告、通知类编辑框右下角显示字数上限和剩余数。
## 换到别的东西上
- 适合：文档阅读与审阅、写作工具、待办清单
- 不适合：需要同时看很多数据的大屏
## 容易做坏
- 出现第二种强调色，专注感立刻消失
- 工具栏常驻，或者淡出太突兀、没有过渡
- 批注卡片放在页底或弹窗里，离原文太远
- 焦点模式只淡化、没有悬停恢复，读起来费劲
- 正文栏过宽，一行超过 40 个汉字
## 参考实现
页面（`gallery/w-quiet.html`）：`setCur()` 焦点段落、`wake()` 空闲淡出、`stats()` 字数、`layout()` 页边批注排位、`addNote()` / `markText()` 批注、`showPop()` 选中浮条
