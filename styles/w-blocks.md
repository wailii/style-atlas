# 块文档（w-blocks）
一篇文档由一个个「块」组成：标题、段落、待办、引用、提示框、内嵌数据库，每个块都能单独换类型、拖动换位。大留白、16px 正文、衬线标题，块悬停时左侧才露出手柄。给写需求、写方案、写周报的人用。
出处：Notion（https://www.notion.so）的块编辑与内嵌数据库。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700&display=swap");
:root{--ink:#2f2d2a;--ink2:#6f6b64;--mute:#a8a49c;--line:#e9e6e0;--hover:#f4f2ee;--side:#f8f7f4;--acc:#0f7f82}
.doc{width:740px;margin:0 auto}
.blk{position:relative;padding:3px 2px;line-height:1.7}
.hd{position:absolute;left:-52px;opacity:0;transition:opacity .12s} .blk:hover>.hd,.blk:focus-within>.hd{opacity:1}
.blk.dragover-t::before{content:"";position:absolute;left:0;right:0;top:-2px;height:3px;background:var(--acc)}
.h1 .tx{font:700 28px/1.4 "Noto Serif SC",serif}
```
```js
// 块 = {id,t,x}；渲染 = B.map(blockHTML)；输入以 "/" 开头的空段落 -> openSlash 过滤 -> pickSlash 把当前块改类型
// 拖拽：mousedown 手柄时才把 .blk 设成 draggable；dragover 按鼠标在块上半/下半画蓝线；drop 时 splice 换位
```
## 一眼认出（不能改）
- 页面封面图 + 大图标压在封面下沿，标题 40px 衬线
- 正文居中 740px，16px，行高 1.7，大量留白
- 块左侧的 ＋ 和 ⋮⋮ 手柄只在悬停时出现
- 空行输入 `/` 弹出分组的块菜单（带小图标和说明）
- 内嵌数据库，标题行下有 表格 / 看板 / 列表 视图切换，当前视图下有滑动下划线
- 右侧浮动目录，当前章节左线高亮
## 颜色
- 白底，字 `#2F2D2A`；侧栏 `#F8F7F4`；分隔线 `#E9E6E0`
- 强调青绿 `#0F7F82`（勾选框、目录当前项、拖拽落点线）
- 标签用低饱和底色：绿 `#E3EFE9`、黄 `#F6ECD3`、蓝 `#DFEAF5`、红 `#F6E1DF`、灰 `#ECE9E3`
## 字体
- 标题 Noto Serif SC 700；正文 Inter + Noto Sans SC；行内代码 JetBrains Mono
## 真图怎么处理
- 只在封面用一张横幅照片，裁切成 150px 高的窄条，略降饱和；角落小字署名「示意图 · 摄影师」
## 动效
- 手柄 120ms 淡入；斜杠菜单 120ms 下落淡入；勾选框 150ms 变色
- 视图切换时下划线 250ms 滑到新位置；目录高亮随滚动实时切换
## 组件
- 页面树侧栏、封面、图标、属性行、标题/段落/待办/列表/引用/提示框/分隔线块、斜杠菜单、块手柄、内嵌数据库（表格/看板/列表）、浮动目录
## 学什么交互
- 「/」唤出块菜单 → 不离开键盘、不用找工具栏，新手也知道能插什么 → 放到后台：需求或工单的描述框里输入 / 插入「关联资源」「审批链」「费用估算」这些业务块。
- 手柄只悬停才出现，拖动时画一条落点线 → 页面保持干净，又能整块重排 → 放到资源台账详情页：把「基本信息 / 费用 / 变更记录」做成可拖动换顺序的区块，各人按习惯排。
- 同一份数据切多种视图，视图名下一条滑动线 → 不用跳页就能换看法 → 放到费用明细或工单列表：表格看明细，看板看状态，列表看手机。
- 右侧目录随滚动高亮，点击平滑跳转 → 长文档里始终知道在哪 → 放到资源申请单、PRD 类长详情页。
- 文档顶部的属性行（负责人、状态、迭代）和正文分开 → 元信息一眼读完，也能做成数据库列 → 放到任何详情页的头部。
## 换到别的东西上
- 需求文档、会议纪要、知识库、周报、运维手册
- 不适合需要大量表格对比、批量操作的页面
## 容易做坏
- 手柄一直显示，页面变得杂乱
- 正文字号压到 14px、宽度铺满，留白消失就不像文档了
- 斜杠菜单不能键盘选择、没有分组
- 数据库做成带边框的大网格，抢掉正文
## 参考实现
`gallery/w-blocks.html`：`render()`、`blockHTML()`、`dbHTML()`、`openSlash()/pickSlash()`、拖拽的 `dragstart/dragover/drop` 监听、`buildTOC()/handleScroll()`
