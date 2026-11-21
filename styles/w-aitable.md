# AI 表格（w-aitable）
资源台账表，顶部一个对话式输入框：用一句话描述要筛的机器，回车后变成一排可编辑的筛选条件块，让人看懂 AI 理解成了什么；表格里有逐格流式生成的 AI 列。暖白底、墨黑粗边、酸橙黄只给 AI 相关的东西。给不想写筛选条件、想让表格自己「读」数据的人用。
出处：Clay（https://www.clay.com）、Airtable AI 字段（https://airtable.com）、Notion AI（https://www.notion.com）。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#faf9f4;--ink:#151512;--line:#e6e3d8;--line2:#efede4;--lime:#d8f34e;--lime2:#eef9b8;--warn:#e08a1e;--red:#d4402b}
/* 输入框：粗墨边 + 硬阴影，聚焦时往阴影里按下去 */
.ask{background:#fff;border:1.5px solid var(--ink);border-radius:14px;height:56px;box-shadow:4px 4px 0 var(--ink);transition:.15s}
.ask:focus-within{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--ink)}
/* 解析结果块：字段 | 运算 | 值 ▾ | ×，每一段都能点 */
.chip{display:flex;height:30px;border-radius:8px;background:var(--lime);border:1px solid #b9d533}
.h.ai{background:var(--lime)}   /* AI 列表头 */
```
```js
// 自然语言 → 结构化条件：用规则识别型号、部门、状态、闲置天数、费用、利用率、周期
parse("上个月闲置超过 7 天的 H100") // → [{f:"型号",op:"=",v:"H100"},{f:"周期",op:"=",v:"10 月"},{f:"闲置天数",op:">",v:7}]
// 预置句子才算「有把握」；其余句子给最接近的解析并标「请确认」
run(text, PRESETS.some(p=>norm(p)===norm(text)))
// AI 列逐格流式：每个 tick 同时推进前 8 个未完成的行，每行每次 +3 字
setInterval(tick,30)
// 采纳建议：记下原状态，批量改，toast 里「撤销」恢复
last=rs.map(r=>({r,st:r.st})); rs.forEach(r=>r.st="回收中")
```
## 一眼认出（不能改）
- 页面顶部是一个大的对话式输入框，粗墨边、硬阴影，下面一排预置示例句
- 回车后下面出现一排酸橙黄的条件块（字段 | 为/大于 | 值 ▾ | ×），前面写「AI 理解为」
- AI 列的表头整格酸橙黄带星标，单元格底色略暖，逐格流式出字带光标
- 表格像电子表格：行号列、每列表头带类型小图标、细格线
- 非预置句子的解析旁边有橙色虚线提示「这是最接近的解析，请确认」
## 颜色
- 底 `#FAF9F4`，墨 `#151512`，线 `#E6E3D8`
- 酸橙黄 `#D8F34E` 只给 AI 相关（条件块、AI 列、采纳按钮、可回收标记）
- 提示橙 `#E08A1E`，错误红 `#D4402B`
## 字体
- Instrument Sans + Noto Sans SC；编号和数字：Geist Mono
## 真图怎么处理
- 不用图
## 动效
- 条件块入场 350ms 弹性上浮，逐个错开 70ms
- AI 单元格逐字流式，光标闪烁；等待中显示三点呼吸
- 状态变为「回收中」时酸橙黄闪一下
## 组件
- 对话输入框、示例句、条件块（可改值/运算/删除）、值选择菜单、AI 列菜单、流式单元格、依据气泡、采纳建议按钮、撤销提示
## 学什么交互
- 自然语言输入变成可编辑的条件块 → 用户能核对 AI 理解得对不对，错了改一个块就行，不用重说 → 放到资源台账：输入「上个月闲置超过 7 天的 H100」，下面出现「型号为 H100 / 闲置天数大于 7」两块，点值直接换。
- 低把握的解析明确标「请确认」 → 避免 AI 悄悄筛错 → 放到任何带 AI 筛选的列表：只对预置或高把握句子不提示，其余带提示。
- AI 列逐行流式填充，悬停看依据 → 结论和证据挨着放，用户敢信 → 放到台账的「是否可回收」列：悬停显示闲置天数、利用率、排队单数。
- 「采纳建议」批量改状态并可撤销 → AI 给出的结论能一步落地又不怕错 → 放到回收巡检：把「可回收」的机器一键标为回收中，7 秒内可撤销。
- 条件块的值点开是菜单，数字块可换大于/小于 → 比重新输入一句话更快 → 放到所有筛选条：块就是筛选项本身。
## 换到别的东西上
- 工单、告警、账单明细等任何需要「先筛再判断」的表格
- 数据量大时 AI 列要分批生成并显示进度，不要一次性全跑
## 容易做坏
- AI 解析结果只显示一句话，用户看不到它到底筛了什么
- AI 列一次性整列出现，没有逐格出现的过程，像是预先写好的
- 酸橙黄铺到整页，AI 和非 AI 的东西分不出来
- 采纳后没有撤销
## 参考实现
`gallery/w-aitable.html`：`parse()`、`run()`、`renderChips()`、`ai()`（三种 AI 列的生成和依据）、`tick()` 流式、`adopt` 与 `#undo`
