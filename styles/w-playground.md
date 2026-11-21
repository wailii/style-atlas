# 模型调试台（w-playground）
同一条提示词发给 2~3 个模型，输出并排流式出现，每列底部实时累计 Token、耗时、费用。左边是系统提示和参数，右边是输出列。给要在多个模型之间挑一个、调参数、看差异的人用。纸白底配信号橙，输出用衬线字，像在实验台上读结果。
出处：OpenAI Playground（https://platform.openai.com）；Anthropic Console 的 Workbench（https://console.anthropic.com）。

## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&family=Noto+Serif+SC:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#eceae4;--panel:#f8f7f3;--card:#fffefb;--ink:#1d1c1a;--ink2:#58554e;--mute:#9a968c;--line:#d9d6cc;--sig:#ff5a1f;--sig-bg:#ffe9df;--part:#ffd9a8}
.cols{display:grid;grid-template-columns:repeat(var(--n),1fr)}           /* 列数跟着模型数走 */
.col{display:grid;grid-template-rows:46px 1fr auto;border-right:1px solid var(--line)}
.out{font-family:"Noto Serif SC",serif;font-size:15px;line-height:1.95}  /* 输出用衬线，和界面无衬线区分开 */
.cur-blink{display:inline-block;width:8px;height:1.05em;background:var(--sig);animation:bl 1s steps(2) infinite}
.cmp .s.u{background:var(--sig-bg);box-shadow:inset 0 -2px 0 var(--sig)}   /* 仅此列有的句子 */
.cmp .s.p{background:#fff1d6;box-shadow:inset 0 -2px 0 var(--part)}        /* 部分列有 */
input[type=range]::-webkit-slider-runnable-track{background:linear-gradient(to right,var(--ink) var(--p),var(--line) var(--p))}
```
```js
// 每个模型自带首字延迟和吐字速度，用 requestAnimationFrame 按真实时间推进，各列互不等待
const n = Math.floor((t - ttft) / 1000 * cps);            // 已吐出的字数
cost = (inTok * m.inP + outTok * m.outP) / 1e6;           // 费用随输出 Token 累加
// 对比：输出按句切开，每句看是否出现在别的列里：0 列=独有，部分列=部分，全部列=相同
const has = others.filter(set => set.has(sentence)).length;
```

## 一眼认出（不能改）
- 左窄右宽：左侧系统提示、用户消息、参数滑杆；右侧 2~3 列输出并排
- 输出是衬线字，末尾有橙色闪烁光标
- 每列底部一条细进度线加四个等宽数字：输入 Token、输出 Token、耗时、费用
- 顶部一个黑色「并排 / 对比差异」分段控件和一个橙色「运行」按钮
- 对比模式下，独有的句子橙底加下划线，部分相同的浅琥珀，相同的不上色

## 颜色
- 底 `#ECEAE4`，左栏 `#F8F7F3`，输出列 `#FFFEFB`；墨 `#1D1C1A`
- 信号橙 `#FF5A1F` 只用于运行按钮、光标、进度线、差异高亮
- 模型点：墨、橙、青绿 `#2F7D6D`、紫 `#7A6BD8`

## 字体
- DM Sans + Noto Sans SC（界面）；Noto Serif SC（输出）；DM Mono（数字、参数值）

## 真图怎么处理
- 不用图片。图标全部是 16 格线条 SVG

## 动效
- 点运行后各列同时开始，按各自模型的首字延迟和速度吐字；进度线、耗时、费用每帧更新
- 增删列时新列从右侧滑入；换模型的下拉菜单有硬阴影
- 悬停参数名出现深色说明条

## 组件
- 顶栏：产品名、面包屑、对比开关、增加对比列、运行
- 参数滑杆：名称带「?」说明、右侧等宽数值框、轨道左半段填墨色
- 输出列：头部（模型点、名称下拉、移除）、正文、底部统计
- 模型下拉菜单：每项带副标题和输出单价

## 学什么交互
1. 多列并排各自流式输出、各自计时 → 速度和长度差异当场可见，比读一张对比表直观 → 模型列表页选中 2~3 个模型后，在侧窗里并排跑同一句话，看延迟和成本。
2. 底部固定四个数（输入、输出、耗时、费用）并随输出累加 → 效果和代价放在同一视线里 → 费用明细、模型调用日志的详情页底部也放同样的累计条。
3. 对比模式按句子标「独有 / 部分相同」→ 不用逐字比，直接看到哪句话是某个模型自己加的 → 审批单修订对比、配置变更前后对比，按条目标出差异。
4. 参数名悬停出一句白话解释，数值框和滑杆联动 → 新人不用查文档 → 资源申请表里的专业参数（卡型、并行度）也这样给解释。

## 换到别的东西上
- 适合：提示词调试、模型选型、A/B 方案对比、同一份输入跑多个版本的任何场景
- 超过 3 列时每列太窄，需要改成横向滚动或切成标签

## 容易做坏
- 三列同时到达终点，没有速度差，对比失去意义
- 费用只显示总价，不显示输入输出各自的 Token
- 对比高亮用红绿，被误读为对错；这里只表示「是否相同」
- 输出也用无衬线小字，和界面混在一起

## 参考实现
页面 `gallery/w-playground.html`：`MODELS` 模型与单价、`OUT` 各模型输出句、`plan()` 按温度和长度生成输出、`run()` 与 `tick()` 流式推进、`applyCompare()` 差异高亮
