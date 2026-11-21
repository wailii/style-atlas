# 代码评审（w-review）
一次合并请求的评审页：顶部是标题、分支和批准按钮，下面一条检查状态，左边改动文件树带增删行数，右边是 diff。diff 可在统一和并排之间切换，点行号写行内评论，线程能回复、能标已解决。给做代码或配置评审、需要逐处留意见的人用。白底、墨色，只有评论是琥珀色。
出处：GitHub Pull Request（https://github.com）；Graphite（https://graphite.dev）；Linear（https://linear.app）。

## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Fira+Code:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--ink:#1c1b1a;--line:#e8e6e0;--soft:#faf9f6;--add:#eaf7ee;--del:#fdecec;--amber:#f0a30a;--amberbg:#fff6df;--ok:#1f8f4e;--res:#7b5bd6}
.ln{display:grid;grid-template-columns:50px 50px 1fr}                 /* 统一：旧行号 新行号 内容 */
.sp2 .ln{grid-template-columns:50px 1fr 50px 1fr}                     /* 并排：旧 | 新 */
.ln.add{background:var(--add)} .ln.del{background:var(--del)}
.ln .n:hover:after{content:"+";position:absolute;left:3px;width:17px;height:17px;border-radius:4px;background:var(--amber);color:#fff}
.ln.has .n{box-shadow:inset 3px 0 0 var(--amber)}                     /* 有评论的行，行号左边一条琥珀线 */
.file{overflow:clip}                                                  /* 不能用 hidden，否则文件头吸顶失效 */
.fh{position:sticky;top:48px}
```
```js
// 解析 diff：@@ -旧起,n +新起,m @@ 之后逐行 + - 空格，累计新旧行号
// 评论线程以 "文件序号:新行号" 为键，T[key] = { c: [评论], res: 是否已解决, open: 已解决后是否展开 }
// 并排视图：连续的删除行和新增行按顺序配对，一多一少时另一侧留空格
```

## 一眼认出（不能改）
- 顶部检查条：构建、单元测试、代码扫描三个带状态点的页签，点开出现黑色日志浮层
- 左侧文件树按目录分组，每个文件有增删行数、未解决评论数徽标和「已查看」方框
- diff 淡绿淡红整行着色，两列行号，悬停行号出现琥珀色「+」
- 评论线程是琥珀描边的卡片，嵌在代码行之间；已解决的折成一行紫色对勾摘要
- 右上「统一 / 并排」分段控件；文件头吸顶，勾「已查看」后该文件折叠

## 颜色
- 底白，浅底 `#FAF9F6`，线 `#E8E6E0`，墨 `#1C1B1A`
- 新增 `#EAF7EE`，删除 `#FDECEC`；评论琥珀 `#F0A30A`、底 `#FFF6DF`；已解决紫 `#7B5BD6`
- 状态：成功 `#1F8F4E`，警告 `#F0A30A`

## 字体
- Hanken Grotesk + Noto Sans SC（界面、评论）；Fira Code（代码、行号、分支名）

## 真图怎么处理
- 不用图片。头像是单字圆点

## 动效
- 检查日志浮层从顶部下落
- 已查看进度条宽度过渡；点文件树时右侧平滑滚动
- 操作后底部出现黑色提示条

## 组件
- 头部：标题、状态胶囊、分支、批准与合并按钮（合并在批准前不可点）
- 检查条、文件树、diff 文件块、行内评论输入框、评论线程（回复、标已解决）
- 底部进度：已查看 N / 总数

## 学什么交互
1. 检查结果放在页头，点开看日志摘要，不跳页 → 评审的人先看到能不能合，再决定看多细 → 申请单审批页顶部放「预检结果」：配额是否充足、库存是否够、预算是否超，点开看原因。
2. 文件树带增删行数和未解决评论数，已查看打勾并折叠 → 大改动能分批看完，知道还剩什么 → 批量导入核对、台账变更审核，逐条打勾确认。
3. 评论线程嵌在被评论的那一行下面，已解决折成一行 → 上下文不丢，处理完的信息不占地方 → 工单、审批流里的追问和回复，按字段挂在对应那一栏下面。
4. 合并按钮在没批准前是灰的，点了会提示还有几条未解决评论 → 把规则放在按钮上，不靠弹窗说教 → 审批通过按钮：有未处理的退回意见时灰掉并说明原因。

## 换到别的东西上
- 适合：代码和配置评审、文档修订、合同条款审阅、变更单审批
- 文件很多时需要加文件搜索和只看未查看的过滤

## 容易做坏
- 评论放在单独的侧栏，和代码行脱节
- 并排视图删除和新增不配对，两侧行数对不上
- 文件块用 `overflow:hidden` 导致文件头无法吸顶
- 已解决的线程完全消失，没有找回入口

## 参考实现
页面 `gallery/w-review.html`：`FILES` 内置 diff 文本、`parse()` 解析、`drawFile()` 统一与并排、`row()` 并排配对、`T` 评论线程、`submit()` 添加评论、`showLog()` 检查日志
