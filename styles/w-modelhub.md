# 模型市场（w-modelhub）
大模型目录页：左边一列筛选，右边一屏卡片，每张卡片把价格、上下文、速度、能力排成固定的几层，翻几十个模型也能一眼比出来。顶部一条深色计算器，输入每天调用量，所有卡片的月费跟着变。给要在一堆同类对象里挑一个的人用。
出处：OpenRouter（https://openrouter.ai）；Hugging Face（https://huggingface.co）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#faf9f5;--panel:#fff;--ink:#16181a;--ink2:#555b60;--mute:#989da1;--line:#e6e4dc;--line2:#efede6;--acc:#0b6b4f;--acc-bg:#e4f3ec}
.mono{font-family:"JetBrains Mono",monospace;font-variant-numeric:tabular-nums}
.card{background:#fff;border:1px solid var(--line);border-radius:10px;transition:border-color .15s,transform .15s}
.card:hover{border-color:#bdb9aa;transform:translateY(-2px)}
.card.sel{border-color:var(--acc);box-shadow:0 0 0 1px var(--acc)}           /* 勾了对比：描边加一圈 */
.price{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--line2);border-radius:8px;background:var(--bg)}
.price b{font:600 19px "JetBrains Mono";letter-spacing:-.03em}                 /* 价格是卡片上最大的字 */
.meter{display:grid;grid-template-columns:44px 1fr 62px;gap:8px;align-items:center}
.dual input{position:absolute;pointer-events:none;-webkit-appearance:none;background:none}
.dual input::-webkit-slider-thumb{pointer-events:auto}                          /* 双滑杆：轨道不接事件，只有圆头接 */
```
```js
// 月费 = 每天次数 × 30 × (输入 tokens × 输入单价 + 输出 tokens × 输出单价) / 1e6
const calcCost = m => c * 30 * (i * m.pin + o * m.pout) / 1e6;
// 分面计数：每个筛选项的数字，是"除了自己这一组，其他条件都生效"时的结果数
const n = M.filter(m => m.v === v && pass(m, "v")).length;
// 上下文长度用对数刻度画条，16K 和 2M 都看得见
const lg = x => Math.max(4, Math.log(x / 8) / Math.log(2000 / 8) * 100);
```
## 一眼认出（不能改）
- 左 268px 筛选栏 + 右侧三列卡片，没有深色侧边菜单、没有面包屑
- 卡片里价格是最大的字，输入价和输出价并排在一个浅底小格里，等宽数字
- 上下文、速度各一条细横条，条右边是数值
- 顶部一条深色价格计算器，三个数字框，右边列出最省的两个
- 勾「对比」后底部弹出深色对比条，点开是带星标的对比表
## 颜色
- 暖白底 `#FAF9F5`，卡片白，线 `#E6E4DC`；字 `#16181A / #555B60 / #989DA1`
- 强调墨绿 `#0B6B4F`（选中、最优、速度条），深色计算器上用薄荷 `#7EE0B8`
- 厂商标识用 6 种压低饱和度的色块，只出现在小方块里
## 字体
- Inter + Noto Sans SC；价格、数量、上下文用 JetBrains Mono
## 真图怎么处理
- 不用照片。厂商标识用单字方块代替 logo
## 动效
- 卡片按顺序 35ms 间隔上浮淡入，条形图从左长出来，一次性，1.5 秒后关掉
- 对比条从底部弹出（带轻微回弹），对比表淡入
- 悬停卡片上抬 2px、边框变深
## 组件
- 筛选栏：厂商复选（带色块和计数）、上下文单选、价格双滑杆、能力标签
- 工具条：排序下拉、卡片/列表切换
- 计算器条、最省 Top2、「按月费排序」
- 卡片：厂商标识、名称、描述、价格格、两条细条、能力标签、底部月费
- 对比条、对比表（每行最优值标绿加星）
## 学什么交互
- 筛选项带分面计数 → 选之前就知道选了还剩几个，零结果的项变淡 → 资源台账左侧的机房、GPU 型号、部门，每项后面带当前条件下的台数
- 价格双滑杆 + 结果数实时变 → 拖动时不用点「查询」 → 费用明细的金额区间、模型列表的单价区间
- 计算器放在列表上方、改动全表联动 → 把「假设」放进浏览页，不用另开估算页 → 模型平台里输入预计调用量，每个模型直接显示月费，可按月费排序
- 勾选 → 底部对比条 → 对比表，最优值标星 → 选 2~4 个再看差异，不用开多个标签 → 比较几台候选机型、几个套餐
- 卡片/列表一键切换，列表里字段同一顺序 → 浏览用卡片，对比扫读用列表 → 同一份模型清单两种看法
## 换到别的东西上
- 机型目录、云产品选购、套餐选择、供应商库、数据集目录
- 不适合：只有几项可选的场景（直接用表格）
## 容易做坏
- 卡片字段太多又不分层，价格淹在里面
- 价格用比例字体，输入价和输出价对不齐
- 筛选项不带计数，选完才发现没结果
- 对比条遮住内容却不给关闭
## 参考实现
页面 `gallery/w-modelhub.html`：`pass()` 分面过滤、`side()` 筛选栏、`card()` 卡片、`calcCost()` 月费、`compare()` 对比表
