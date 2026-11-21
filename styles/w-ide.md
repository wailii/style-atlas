# 编辑器（w-ide）
深色代码编辑器加右侧 AI 助手：活动栏、文件树、标签页、语法高亮、底部终端、状态栏。助手给出的改动直接以内联 diff 落在编辑器里，逐块接受或拒绝。给每天在工具里改东西、审改动的人用。
出处：Visual Studio Code（https://code.visualstudio.com）；Cursor（https://cursor.com）；Zed（https://zed.dev）。

## 直接抄
```css
:root { --act:#121316; --side:#1a1b1f; --ed:#16171a; --panel:#131417; --line:#26282e; --tx:#c8cbd2; --tx2:#8a8f9a; --tx3:#585d69; --acc:#f0a93b; --del:rgba(232,90,80,.15); --add:rgba(70,185,115,.16); }
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.app { display:grid; grid-template-rows:38px minmax(0,1fr) 24px; height:100vh; }
.main { display:grid; grid-template-rows:minmax(0,1fr); grid-template-columns:46px 244px minmax(0,1fr) 388px; }
.edcol { display:grid; grid-template-rows:36px 26px minmax(0,1fr) 224px; height:100%; overflow:hidden; }
.ln.del { background:var(--del); } .ln.del .t { text-decoration:line-through; opacity:.75; }
.ln.add { background:var(--add); }
.tab.on::after { content:""; position:absolute; left:0; right:0; top:0; height:2px; background:var(--acc); }  /* 选中标签顶上一条线 */
```
```js
// 改动块：{del:[原行], add:[新行], state:'off'|'idle'|'ok'|'no'}；文件是「字符串或 {h:块id}」的数组
// idle 时同时画 del 和 add；ok 只留 add；no/off 只留 del；行号只给保留下来的行
function resolved(file){ /* 把 lines 展开成 [{t,n,kind,h,first}] */ }
// ⌘P：fuzzy(q, path) 子序列匹配，返回命中下标，用来给文件名里的命中字加色
```

## 一眼认出（不能改）
- 最左 46px 活动栏、左侧文件树、顶部标签页、底部终端、最右 AI 面板、最下状态栏
- 代码区行号列 + 等宽字体 + 语法高亮；当前行淡底
- 助手的改动在编辑器里是红绿内联 diff：删除行带删除线，每个改动块右侧有「拒绝 / 接受」小按钮
- 助手消息里有一张「文件名 +5 −2」的改动卡，带「应用修改」主按钮（琥珀色）
- 标签和文件树上，有待确认改动的文件出现琥珀色小圆点

## 颜色
- 底：`#121316` 活动栏/标题栏、`#1A1B1F` 侧栏、`#16171A` 编辑区、`#131417` 终端
- 字：`#C8CBD2` / `#8A8F9A` / `#585D69`
- 唯一强调色琥珀 `#F0A93B`（选中线、主按钮、圆点、光标）
- 语法：关键字 `#E58F65`、字符串 `#9CCB8C`、数字 `#E6C36A`、函数 `#7CB7FF`、类型 `#D79FE0`、注释 `#5D6370`
- diff：删 `rgba(232,90,80,.15)`、增 `rgba(70,185,115,.16)`

## 字体
- Fira Code（代码、终端、路径），Inter + Noto Sans SC（界面），代码 13px / 20px 行高

## 真图怎么处理
- 不用照片。文件类型用两三个字母的等宽小标（py、yml、md）着色代替图标

## 动效
- 助手回复逐字流出，末尾光标闪烁
- 标签、文件树选中无动画，状态即时切换
- ⌘P 面板出现无过渡，选中项左侧琥珀线
- 终端命令回车后立即追加输出块

## 组件
- 标题栏中央命令条（点击或 ⌘P 打开）
- 文件树：文件夹折叠、文件类型小标、待确认圆点
- 标签页：关闭按钮、待确认圆点
- 改动块控件：拒绝 / 接受，助手卡里的「应用修改」变「全部接受」并显示「还有 N 处待确认」
- 终端：预置 help、ls、cat、nvidia-smi、pytest、git status、clear，↑↓ 翻历史
- ⌘P 快速打开：子序列模糊匹配，命中字高亮

## 学什么交互
- 做法：AI 或批量操作的结果不直接生效，而是以红绿 diff 摆在原位置，每块单独接受或拒绝 → 人能看清到底改了什么，不满意的块可以单独退回 → 资源配额批量调整、规则批量改价时，先在列表里用「原值划线 + 新值高亮」预览，逐行或整批确认
- 做法：改动卡先在对话里给出摘要（文件、+行数 −行数、几处改动），点「应用」再进入编辑器 → 先概览后落地，不用跳转就能判断值不值得应用 → 审批单里先给「影响 3 个部门、涨 12 万」的摘要，再点进明细
- 做法：有未确认内容的对象，在标签和树上都打小圆点 → 离开当前视图也不会漏 → 工单、配置草稿的列表上标「有待确认修改」
- 做法：⌘P 用模糊匹配，命中的字加色 → 敲几个字母就到目标，不用点开层层目录 → 台账里按资产编号、机器名快速跳转
- 做法：终端放在编辑区正下方，输入一行就地出结果 → 查数据和改东西不用换窗口 → 费用明细页底部放一个「查询」抽屉，输入条件直接出结果

## 换到别的东西上
- 配置管理后台、规则引擎、SQL 控制台、低代码搭建器、带 AI 的任何编辑场景
- 不适合只读展示的页面和面向普通用户的页面

## 容易做坏
- 红绿底色太饱和，代码读不清
- 终端、标签、侧栏同时都亮，没有主次；强调色只给选中和主按钮
- diff 块没有单独的接受 / 拒绝，只能全收或全退
- 拿 VS Code 的蓝当强调色，成了换壳

## 参考实现
`gallery/w-ide.html`：`resolved()` 展开改动块、`resolveHunk()` 接受/拒绝、`tok()` 语法高亮、`runCmd()` 终端、`qopen()/fuzzy()` 的 ⌘P；地址加 `?demo` 会自动点一次「应用修改」
