# AI 原生界面（agent）

智能体干活的样子：用户一句话，下面是它的计划步骤（转圈 → 打勾）、调了什么工具、读了哪些来源，然后回答逐字流出来，带引用编号；要替你做事之前停下来问。界面是浅色的对话流，没有气泡包住回答。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 43 行 AI-Native UI）；2026 年智能体界面模式（可见的检查点、动手前确认，https://dev.to/zdeb_fouc_f95089367652fc5/from-agent-checkpoints-to-spatial-widgets-five-uiux-patterns-that-look-poised-to-define-2026-m3i）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#fafaf9; --panel:#fff; --line:#ebeae6; --ink:#1c1b19; --ink2:#57534e; --mute:#a29e97; --acc:#6d4aff; --acc2:#ff7a59; --ok:#15a36b; }
.think { background: linear-gradient(90deg, var(--mute) 35%, var(--ink) 50%, var(--mute) 65%); background-size: 300% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shim 1.6s linear infinite; }   /* 「正在看…」的流光字 */
@keyframes shim { from { background-position: 100% 0; } to { background-position: -100% 0; } }
.st.run .ic { border: 1.5px solid var(--acc); border-right-color: transparent; border-radius: 50%; animation: rot .7s linear infinite; }
.st.ok .ic { background: var(--ok); }                                                         /* 步骤：转圈 → 绿勾 */
.cite { display: inline-grid; place-items: center; min-width: 17px; height: 17px; border-radius: 5px; background: #efeaff; color: var(--acc); font: 500 10.5px "JetBrains Mono"; vertical-align: 2px; }
.num { font-family: "JetBrains Mono"; padding: 0 4px; border-radius: 4px; background: #f4f3f0; }   /* 回答里的数字单独标出来 */
.caret { width: 9px; height: 9px; border-radius: 50%; background: var(--ink); animation: blink 1s steps(1) infinite; }
.ask { border: 1px solid var(--line); border-radius: 14px; box-shadow: 0 0 0 3px #f1edff; }   /* 检查点：要用户点头 */
.orb { background: conic-gradient(from var(--r), var(--acc), var(--acc2), #ffd25a, var(--acc)); }   /* 忙的时候转 */
```

```js
// 回答拆成小块：文字 / 加粗 / 数字 / 引用，逐字流出时各进各的元素，光标永远跟在最后
const ANSWER = [[{ t: "今天最热的是 " }, { b: title }, { t: "，热度 " }, { n: heat }, { c: 1 }, { c: 2 }, { t: "。" }], "CARD", …];
for (let i = 0; i < text.length; ) { const k = 1 + (Math.random() < .5); el.textContent += text.slice(i, i + k).join(""); i += k; await sleep(16); }
```

## 一眼认出（不能改）

- 用户一句话在右边灰气泡；回答不包气泡，整宽排
- 计划步骤卡：转圈 → 绿勾，每步右边一个结果（「8 条 ›」「12/12」），能点开看工具返回了什么
- 来源一个个冒出来（首字母小圆 + 名字）
- 回答逐字流出，光标是一个闪的圆点；数字和引用编号单独标
- 要替用户动手前出一张检查点卡：「要我…吗？」+ 两个按钮

## 颜色

- 底 `#FAFAF9`；卡白 + `#EBEAE6` 边；字 `#1C1B19`
- 智能体色：紫 `#6D4AFF`（引用、检查点光圈）+ 珊瑚 `#FF7A59`（只在会转的标志里）
- 完成绿 `#15A36B`

## 字体

- Inter + Noto Sans SC；工具返回、引用编号、数字用 JetBrains Mono

## 真图怎么处理

- 回答中间插一张来源卡：小图 + 标题 + 一行说明；图不改

## 动效

- 一遍流程约 5 秒：问题出现 → 「正在看…」流光字 → 步骤逐个转圈打勾 → 来源一个个弹出来 → 回答逐字流 → 检查点卡和追问建议浮上来
- 顶上标志忙的时候一直转，闲下来停
- 发送键忙时变成停止方块
- 只用真实数据拼回答；没有的事不说

## 组件

- 顶栏：会转的圆环标志 + 标题 + 一句说明 + 重新生成
- 步骤卡：拉取榜单 / 读来源 / 写简报
- 回答：段落 + 来源卡 + 引用编号
- 检查点卡：读给我听 / 先不用（点了变「正在朗读」+ 音波）
- 追问建议、复制 / 重新生成 / 引用数
- 输入框：圆角大条 + 黑色圆按钮

## 换到别的东西上

- 网页：任何「让 AI 帮你做事」的产品；桌面端左边对话、右边产物
- 视频：产品演示里的智能体工作过程，步骤打勾的节奏就是剪辑节奏
- 和活体录屏（screencast）混搭：小家伙当智能体

## 容易做坏

- 回答也包在气泡里，看着像聊天软件
- 编造步骤和来源（步骤、来源、数字都要是真的）
- 流字太慢，用户等得烦（每字 16~30ms）
- 没有检查点就替用户做事

## 参考实现

页面（`gallery/s-agent.html`）：`ANSWER` 分块、`play()` 流程、`.steps` / `.cite` / `.ask`
