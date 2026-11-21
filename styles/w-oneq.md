# 一问一答表单（w-oneq）
Typeform、Tally 一路的表单：一屏只问一题，字号大到像海报，整屏是一块纯色，每题换一种颜色。选项前面是字母键，按 A/B/C 就选完并自动翻到下一题；最后一页把所有答案列出来，点哪条改哪条。给要让很多人填、又怕填错的申请表用。
出处：Typeform https://www.typeform.com ；Tally https://tally.so
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&family=Noto+Sans+SC:wght@400;500;700;900&family=IBM+Plex+Mono:wght@500&display=swap");
:root { --ink:#15120e; --bg:#f7e08a; }
body { background:var(--bg); color:var(--ink); transition: background-color .55s ease; }
.qt { font-weight:900; font-size:58px; line-height:1.18; letter-spacing:-.02em; }
.op { height:56px; border-radius:12px; font-size:21px; font-weight:700; background:rgba(255,255,255,.34); box-shadow: inset 0 0 0 2px rgba(21,18,14,.55); }
.op .k { width:30px; height:30px; border-radius:8px; background:rgba(255,255,255,.7); box-shadow: inset 0 0 0 2px rgba(21,18,14,.55); }
.op.on { background:var(--ink); color:var(--bg); box-shadow:none; } .op.on .k { background:var(--bg); color:var(--ink); }
.bignum { font:800 min(36vw,520px)/1 "Inter"; color:transparent; -webkit-text-stroke:2px rgba(21,18,14,.14); }
@keyframes inUp { from { opacity:0; transform:translateY(70px); } } @keyframes outUp { to { opacity:0; transform:translateY(-70px); } }
```
```js
const COLORS = ["#f7e08a","#b9e3cc","#ffb59a","#d5c5f6","#ffd8a6","#cfe5a0","#f5c2d3"];
const vis = () => Q.filter(q => !q.when || q.when(A));                 // 条件题：when(答案) 为假就整题跳过
document.body.style.setProperty("--bg", COLORS[idxVis(cur) % COLORS.length]);
// 字母键：/^[a-z]$/i → choose(code - 65)；选中后 380ms 自动 next()
// 修改：从汇总页点「修改」→ editing=true；答完回到汇总，若新出现未答的条件题则先去答
```
## 一眼认出（不能改）
- 整屏一块纯色底（每题不同），没有卡片、没有导航栏
- 题目 58px 特粗黑体，左上有「序号 →」
- 选项是带字母方块 A/B/C 的圆角框，选中反成黑底
- 顶部一条细进度条，右上角「3 / 7」
- 背后一个描边的巨大题号，只有轮廓
- 切换题目时，旧题向上滑出、新题从下方滑入，底色同时过渡
## 颜色
- 墨色 `#15120E`；底色循环：奶油黄 `#F7E08A`、薄荷 `#B9E3CC`、珊瑚 `#FFB59A`、淡紫 `#D5C5F6`、杏 `#FFD8A6`、青柠 `#CFE5A0`、粉 `#F5C2D3`
- 汇总页纸色 `#F3EFE6`；错误提示深红 `#A01616`
## 字体
- Inter 800 / Noto Sans SC 900 做标题；选项 700；工单号用 IBM Plex Mono
## 真图怎么处理
- 不用图。装饰只有描边大号数字和完成页画出来的对勾
## 动效
- 题目切换 280ms 退出 + 500ms 进入；背景色 550ms 过渡
- 进度条 500ms 缓动；选中后停 380ms 再翻题
- 未答就按确定，提示条抖动一下
- 完成页的圆和对勾逐笔画出
## 组件
- 顶部进度条与计数；单选题（字母键）；单行 / 多行文字题；右下上一题 / 下一题
- 汇总页：左边逐条答案 + 修改，右边黑色费用卡 + 提交
- 完成页：对勾、申请编号、再申请一次
## 学什么交互
- 一屏一题，字母键选完自动下一题 → 每题注意力只放在一件事上，键盘就能填完 → 资源申请、续期、报修入口的第一步用它，普通用户 1 分钟填完。
- 条件跳题：选「训练」才问「训练天数」→ 不相关的题不出现，进度分母同步变化 → 申请表里「选 GPU 才问卡型号，选存储才问容量」，字段不堆在一页。
- 汇总页逐条列答案，点「修改」只改那一题 → 提交前能完整复核，改完直接回到汇总 → 审批单提交前的确认页同款，右边直接显示预估费用。
- 预估费用跟着答案算 → 用户在提交前就知道花多少钱 → 资源申请的费用预估、额度占用提示放在汇总页。
- 未答不能前进，提示条抖一下 → 不用弹窗也能拦住漏填 → 必填项校验。
## 换到别的东西上
- 入驻申请、问卷、报名、满意度调查、客户信息收集
## 容易做坏
- 一题里塞多个输入，失去「一屏一题」
- 背景色用渐变或太深的颜色，黑字读不清
- 选完不自动翻页，字母键失去意义
- 汇总页只能整表重填，不能单题修改
## 参考实现
`gallery/w-oneq.html`：`renderQ()` 单题，`choose()` 字母键选择，`next()` / `prev()` 跳题与条件题，`renderSum()` 汇总与费用，`show()` 切换动画与底色
