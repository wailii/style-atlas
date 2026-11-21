# 开发者文档（w-devdocs）
三栏的 API 文档：左边导航，中间讲解和参数表，右边一整条深色代码栏，随正文滚动换示例。给要读文档、抄代码、马上调通接口的开发者用。
出处：Stripe Docs（https://docs.stripe.com）；Mintlify（https://mintlify.com）。

## 直接抄
```css
:root { --paper:#fcfbf8; --line:#e6e2d8; --ink:#17181c; --ink2:#51545e; --acc:#0b7a5f; --acc-bg:#e3f2ec; --code:#12151c; --code2:#1b1f29; --nav:236px; --rail:540px; }
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.layout { display:grid; grid-template-columns: var(--nav) minmax(0,1fr) var(--rail); padding-top:56px; }
aside.rail { background: var(--code); }
.rail .stick { position: sticky; top: 56px; height: calc(100vh - 56px); display:flex; flex-direction:column; }
.kids { display:grid; grid-template-rows:0fr; transition:grid-template-rows .26s; }  .kids > div { overflow:hidden; min-height:0; }
.pm.open > .kids { grid-template-rows:1fr; }          /* 子字段展开不用算高度 */
```
```js
// 滚动联动：取标题越过视口 32% 的最后一节
function spy(){ const y=innerHeight*.32; let id=secs[0].id; for(const s of secs) if(s.getBoundingClientRect().top<=y) id=s.id; if(id!==cur){cur=id; render(true);} }
// 一份数据生成三种语言：gen(example, 'curl'|'py'|'js')，语言存 localStorage，全页同切
```

## 一眼认出（不能改）
- 三栏：左导航、中正文、右侧通高深色代码栏
- 右栏上半是请求、下半是响应，随滚动整块淡入换成当前章节的示例
- 当前章节在左导航里高亮，对应的代码行在右栏有淡绿底加左线
- 参数表一行一参数：等宽参数名、灰色类型、橙褐色「必填」，嵌套的有「子字段 · N」按钮
- 语言页签 cURL / Python / Node.js 切换后全页代码一起变

## 颜色
- 纸色 `#FCFBF8`、边 `#E6E2D8`、字 `#17181C` / `#51545E`
- 强调深绿 `#0B7A5F`（底 `#E3F2EC`），必填和警告用 `#B4491F`
- 代码栏 `#12151C`；字符串 `#9FDCAA`、键 `#92B9FF`、数字 `#F5B97C`、关键字 `#D9A3FF`、注释 `#667087`

## 字体
- DM Sans + Noto Sans SC 正文；JetBrains Mono 代码、参数名、类型

## 真图怎么处理
- 不用照片。图只用于示意流程时画成线稿

## 动效
- 右栏换示例：整块淡出 170ms 再淡入
- 子字段展开 260ms 高度过渡，箭头转 90 度
- 复制按钮变成「已复制」，1.5 秒后恢复
- 标题悬停出现 # 锚点

## 组件
- 顶栏：logo、文档分区页签、搜索（/ 聚焦）、版本、获取密钥
- 左导航：分组小标题 + 方法徽标（POST/GET/DEL）+ 当前篇的章节子列表
- 端点条：方法徽标 + URL + 复制
- 提示块：绿色（说明）、橙褐（警告），左边 3px 线
- 参数行：名、类型、必填、默认值、说明、枚举小药丸、子字段按钮
- 代码栏：语言页签、复制、请求块、响应块（带状态码）

## 学什么交互
- 做法：代码栏跟着正文章节换示例，并高亮和这一节有关的那几行 → 读的人不用在文字和代码之间来回找，看哪行亮就知道这一节在讲哪个字段 → 费用明细或资源台账的操作说明页，右侧固定放当前步骤对应的接口请求或截图
- 做法：嵌套参数默认折叠，按钮写明子字段个数，展开后缩进加竖线 → 第一眼只看顶层，需要时再下钻 → 模型配置、计费规则里的多级字段用同样的折叠
- 做法：一份数据生成多种语言，选择记住并全页同步 → 选一次不用每个代码块都再选 → 审批流、告警规则的「导出为 JSON / YAML / Terraform」切换
- 做法：复制按钮原地变成「已复制」而不是弹提示 → 反馈在手指所在处，不打断阅读 → 任何台账里的复制 IP、复制工单号
- 做法：错误码表放在最后，状态码、code、说明三列 → 排障时能整表扫 → 资源申请失败原因表

## 换到别的东西上
- 内部平台的接口说明、SDK 手册、配置项手册、运维 Runbook
- 不适合营销页和需要大量图片的教程

## 容易做坏
- 右栏不通高，下面露出白底，深色栏就成了一块卡片
- 代码是图片或每种语言手写一遍，改一处漏一处
- 参数全部展开，页面变成一堵墙
- 切换语言时右栏高度跳动

## 参考实现
`gallery/w-devdocs.html`：`gen()` 生成三语言示例、`hl()`/`lines()` 高亮并标记行、`spy()` 滚动联动、`renderParams()` 参数表
