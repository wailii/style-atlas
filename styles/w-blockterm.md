# 块终端（w-blockterm）
把终端的每条命令连同输出收成一个块：块可以单独选中、复制、折叠、分享，出错的块能当场让 AI 解释。底部是带补全的输入框，左侧是常用工作流。给天天敲命令、看日志、查 GPU 的运维和研发用。
出处：Warp（https://www.warp.dev）。

## 直接抄
```css
:root { --bg:#0d0e11; --bg2:#121317; --sel:#16171d; --line:#22242b; --line2:#2d3039; --tx:#d4d7de; --tx2:#8d929e; --tx3:#575c68; --acc:#a98bff; --ok:#59d19a; --er:#ff6b6b; --warn:#f0c15a; --cy:#6fd3e8; }
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.blk { position:relative; padding:14px 32px 14px 36px; border-bottom:1px solid var(--line); }
.blk::before { content:""; position:absolute; left:0; top:0; bottom:0; width:3px; }   /* 成功暗绿、失败暗红、选中紫 */
.blk.sel { background:var(--sel); } .blk.sel::before { background:var(--acc); }
.tools { position:absolute; right:24px; top:8px; display:none; } .blk.sel .tools { display:flex; }   /* 只有选中块才出现工具条 */
.editor { margin:0 24px 18px; border:1px solid var(--line2); border-radius:10px; background:var(--bg2); position:relative; }
.comp { position:absolute; left:0; right:0; bottom:calc(100% + 6px); }   /* 补全面板向上展开 */
```
```js
// 一条命令 = 一个块对象 {id, cmd, out, code, time, dur, fold, ai}
async function run(cmd){ const b={...}; blocks.push(b); render(); for(const [html,delay] of res.lines){ await sleep(delay); b.out += html; render(true); } b.running=false; }
// render(keepScroll)：只有滚动条贴底时才跟随新输出
```

## 一眼认出（不能改）
- 没有连续的字符流：每条命令是一块，块之间只有 1px 细线，没有卡片和圆角
- 块头一行小字：用户@主机、目录、分支、时间和耗时，命令本身 14px 白色加粗
- 块左边 3px 竖条：成功暗绿、失败暗红、选中紫色
- 选中的块右上角浮出「复制输出 / 折叠 / 分享」
- 报错块底部有「解释这个错误」按钮，点开出现紫色左线的 AI 解释和可点击的后续命令
- 底部输入框像编辑器：带上下文小字，补全面板向上展开并高亮命中的字

## 颜色
- 底 `#0D0E11`，选中块 `#16171D`，输入框 `#121317`，线 `#22242B`
- 字 `#D4D7DE` / `#8D929E` / `#575C68`
- 强调紫 `#A98BFF`（提示符、选中、补全）；成功 `#59D19A`；错误 `#FF6B6B`；警告 `#F0C15A`；用户名 `#6FD3E8`

## 字体
- IBM Plex Mono 命令和输出；IBM Plex Sans + Noto Sans SC 界面文字

## 真图怎么处理
- 不用照片

## 动效
- 命令运行时块里转一个小圆环，输出按行追加
- AI 解释逐字流出，结尾光标闪烁
- 复制 / 分享按钮原地变绿并改字 1.4 秒
- 块的出现、折叠都不做动画，保持终端的即时感

## 组件
- 顶部会话标签、左侧工作流列表（名称 + 命令）与当前环境
- 命令块：头部元信息、命令、输出（可着色）、折叠提示、工具条、解释按钮、AI 解释卡
- 输入编辑器：上下文条、提示符、补全面板（命令 + 说明 + 键位提示）
- 预置命令：nvidia-smi、kubectl get pods / logs / describe / rollout restart、df -h、git status、ls、clear；未知命令出错块

## 学什么交互
- 做法：一次操作加它的结果合成一个可单独操作的块 → 长输出里能定位、复制、折叠某一次操作，不会和别的混在一起 → 资源台账或工单的「一次变更」做成一块：谁、何时、改了什么、结果，可复制、可分享链接
- 做法：失败的块自带「解释这个错误」，点开后给原因和下一步命令，命令可点击填入输入框 → 报错处直接给出路，不必复制到别处问 → 作业失败、交付失败的行内放「分析原因」，给出可点的处理动作
- 做法：选中才出工具条，平时界面干净 → 工具多也不显乱，选中时位置固定在块右上 → 费用明细每行的复制、导出、分享只在选中行出现
- 做法：补全面板每条带一句说明，命中字高亮，Tab 接受、Enter 执行分开 → 输入时不会误执行，新手靠说明学命令 → 筛选框里的字段名补全，附上字段含义
- 做法：常用操作放在左侧「工作流」，点一下填进输入框而不是直接执行 → 先看一眼再回车，减少误操作 → 运营的常用查询模板

## 换到别的东西上
- 运维控制台、数据库 / SQL 查询台、部署流水线日志、AI 对话记录（每轮一块）
- 不适合需要整屏表格对比的页面

## 容易做坏
- 块之间用卡片、阴影、大圆角，终端味就没了
- 状态色铺满整块，只应是左边竖条和少量文字
- 输入框离开底部，或补全面板遮住输出里正在看的内容
- 输出换成比例字体，表格列对不齐

## 参考实现
`gallery/w-blockterm.html`：`run()` 执行并逐行追加输出、`explain()` AI 解释、`updateComp()` 补全、`blockHTML()` 单块渲染；地址加 `?demo` 会自动展开一次 AI 解释和补全
