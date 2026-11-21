# 对话与产物（w-artifact）
左边窄的对话栏，右边宽的产物栏：AI 把一份文档写在右边，对话里只留一张「打开产物」卡片。产物有版本、能对比、能选中文字就地改写。给要和 AI 反复改一份交付物（报告、方案、申请单）的人用。
出处：Claude Artifacts（https://claude.ai）；ChatGPT Canvas（https://chatgpt.com）。

## 直接抄
```css
:root { --bg:#fbfbf9; --paper:#fff; --line:#e8e8e4; --line2:#d9d9d3; --ink:#1b1d24; --tx:#3a3e49; --mute:#868b97; --acc:#2b3a8f; --add:#e5f4ea; --addc:#2a7a4c; --del:#fdecec; --delc:#b23b3b; }
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&family=Noto+Serif+SC:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.app { display:grid; grid-template-columns:404px minmax(0,1fr); height:100vh; }
.u { margin:20px 0 0 auto; width:fit-content; max-width:88%; background:#efefea; padding:8px 13px; border-radius:12px; }   /* 只有用户话有气泡 */
.a { margin-top:14px; }                                                                                              /* AI 话无气泡无头像 */
.card.on { border-color:var(--acc); box-shadow:0 0 0 1px var(--acc); }                                               /* 当前打开的产物卡 */
.blkx.add { background:var(--add); border-left:3px solid var(--addc); } .blkx.del { background:var(--del); border-left:3px solid var(--delc); } .blkx.del * { text-decoration:line-through; }
```
```js
// 产物 = 块数组 [{id,k,t}]；版本 = 块数组的数组；对比只按 id 比：新增、删除、内容变了（先删旧再加新）
function merged(a,v){ /* 返回 [{b, st:''|'add'|'del'}] */ }
// 流式写出按时间推进，不按计时器次数：timed(ms, p => ...) 里用 performance.now()，卡顿时也能到终点
// 选中文字：mouseup 后读 getSelection()，落在 .blkx[data-id] 内才弹工具条；改写直接改数据再重绘
```

## 一眼认出（不能改）
- 左窄右宽两栏，左 404px 对话，右边整块是产物，白底，没有灰底卡片
- 对话气泡极简：用户一句灰色圆角块，AI 的话直接是正文，没有头像框
- 对话里的「打开产物」卡片：小文档缩略图 + 标题 + 版本，当前打开的那张有靛蓝描边
- 产物顶栏：标题、v1 v2 v3 分段切换、「对比上一版」开关、重新写出、复制
- 产物是排版好的文档：衬线大标题、关键指标带、柱状图、表格、建议清单
- 选中文字出现深色小工具条「改写 / 缩短 / 问 AI」

## 颜色
- 对话栏 `#FBFBF9`，产物 `#FFFFFF`，线 `#E8E8E4`
- 字 `#1B1D24` / `#3A3E49` / `#868B97`
- 强调靛蓝 `#2B3A8F`（描边、图表、列表点）
- 对比：新增 `#E5F4EA` + `#2A7A4C`，删除 `#FDECEC` + `#B23B3B`

## 字体
- 正文 Inter + Noto Sans SC；产物标题 Noto Serif SC；指标大数字 Source Serif 4

## 真图怎么处理
- 不用照片。图表用 SVG 现画

## 动效
- 产物逐块逐字写出，非文字块（指标、图、表）整块淡入；约 2.6 秒写完
- 柱子从底部长出，逐根错开 70ms
- 对话栏 AI 回复逐字出现，末尾有靛蓝光标
- 就地改写后，新文字黄底闪一下 1.4 秒再退掉

## 组件
- 对话：用户气泡、AI 正文、产物卡片、底部输入框
- 产物顶栏：版本分段控件、对比开关、重新写出、复制
- 文档块：标题、副标题、段落、列表、指标带、柱状图、表格
- 选中工具条：改写、缩短、问 AI（后者在对话栏追加一问一答）

## 学什么交互
- 做法：长内容放右边的独立区域，对话里只放一张卡片指向它 → 对话保持短，产物可以反复打开、对比 → 资源申请、评估报告用「对话 + 申请单」两栏，聊的同时右边的单子在变
- 做法：版本用 v1 v2 v3 分段切换，加一个「对比上一版」开关，新增绿、删除红、改动先划掉旧的再写新的 → 不用肉眼找差异，也敢放心让 AI 改 → 审批单、定价规则、配额方案的修订记录
- 做法：选中文字才出小工具条，动作只有三个，结果原地替换并闪一下 → 局部修改不用重新描述整篇 → 表格里选中一个说明字段，直接「缩短」「改写」
- 做法：流式写出按块进行，图和表整块出现 → 读者在写的过程中就能看到结构 → 生成分析报告时，先出标题和指标，再出明细
- 做法：多份产物各有卡片，点哪张右边就换成哪份 → 一次会话可以产出多份交付物 → 一次对话同时产出「月报」和「扩容申请」

## 换到别的东西上
- AI 写报告、方案、代码文件、表格、申请单的对话产品；审批单的在线修订
- 不适合没有 AI 参与、只是读文档的页面

## 容易做坏
- 对话气泡太花，抢走产物的注意力
- 版本对比只给两份并排的整篇，看不出改了哪里
- 产物栏窄于 760px，表格和图都挤变形
- 流式写出时整页反复重排，读者跟不上

## 参考实现
`gallery/w-artifact.html`：`merged()` 版本对比、`streamDoc()` 按时间流式写出、`blockEl()` 各类文档块、`openArt()` 切换产物、选中工具条的 `rewrite()` / `shorten()`
