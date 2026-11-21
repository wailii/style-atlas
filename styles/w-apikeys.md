# 密钥与用量（w-apikeys）
上面一块黑色指标面板加一张按模型分色的每日堆叠柱，下面是密钥列表：每行有限额进度、近 7 天迷你柱、最后使用时间。点一行，上面的图和数字只看这把密钥。给管 API 密钥、盯团队用量和预算的人用。暖灰底，黑色面板配荧光黄绿。
出处：OpenAI 用量与密钥页（https://platform.openai.com）；Anthropic Console（https://console.anthropic.com）；OpenRouter 的 Keys 页（https://openrouter.ai）。

## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#f4f4ee;--card:#fcfcf8;--ink:#13151a;--line:#deded4;--lime:#c8f542;--lime2:#9fcc16;--warn:#ec7a12;--bad:#d9342b;
--m1:#13151a;--m2:#b9e92c;--m3:#4157d8;--m4:#d4cfbd}                      /* 四个模型四种色，只用到这四个 */
.board{display:grid;grid-template-columns:268px 1fr;border:1px solid var(--line);border-radius:12px}
.kpi{background:var(--ink);color:#f2f2ea}.kpi .big{font:600 44px/1.05 "Space Grotesk";color:var(--lime)}
.tr{display:grid;grid-template-columns:minmax(0,2.1fr) 1.45fr 1.6fr 130px 118px 70px;gap:18px;height:64px}
.pg i{display:block;height:100%;background:var(--ink)} .pg.warn i{background:var(--warn)} .pg.bad i{background:var(--bad)}
.spark i:last-child{background:var(--lime2)}                              /* 迷你柱最后一根（今天）高亮 */
#chart,#chart *{stroke:none}                                              /* 全站 svg 默认描边，图表里要关掉 */
```
```js
// 堆叠柱：每天按模型累加高度，SVG 动态生成，viewBox 取容器实际宽度避免文字被拉伸
// 密钥只显示一次：创建后弹层展示完整值，关闭后列表只存前缀
pre: full.slice(0,7)+"…"+full.slice(-4)
// 限额进度：>=80% 变橙，>=100% 变红；点「限额 ¥360」原地变成输入框，回车保存
```

## 一眼认出（不能改）
- 左侧一块纯黑指标面板，荧光黄绿的大字 Token 总量，下面是费用、请求数、日均、峰值日
- 右侧每日堆叠柱，四个模型四种色，图例可点击开关
- 密钥列表每行：名称加掩码前缀、模型小标签、限额进度条、近 7 天迷你柱、最后使用时间
- 限额进度到 80% 以上整条变橙
- 选中某一行后，黑色面板底部出现「仅：密钥名 · 清除」，其余行变淡

## 颜色
- 底 `#F4F4EE` 暖灰，面板 `#FCFCF8`，黑 `#13151A`
- 荧光黄绿 `#C8F542`（深色面板上的数字、按钮图标）、`#9FCC16`（浅底上的「今天」和在线点）
- 模型：墨 `#13151A`、黄绿 `#B9E92C`、钴蓝 `#4157D8`、沙 `#D4CFBD`
- 警示：橙 `#EC7A12`、红 `#D9342B`，只用在限额进度

## 字体
- Space Grotesk + Noto Sans SC（界面和大数字）；Geist Mono（密钥、金额、百分比）

## 真图怎么处理
- 不用图片

## 动效
- 柱子从底部长出（SVG 动画）
- 悬停某一天出现深色浮窗，列出当天各模型 Token 和费用
- 新建的密钥行入列时黄绿色闪一下
- 进度条宽度变化有 0.5 秒过渡

## 组件
- 指标面板、堆叠柱加图例、天数分段控件（7/14/30）
- 密钥行、限额内联编辑、迷你柱
- 创建弹层：名称、月限额、可用模型勾选；生成后换成「只显示一次」的密钥框，带复制按钮和提示条

## 学什么交互
1. 点列表行，上方的图和数字只看这一行 → 不用跳页，总览和个体用同一张图 → 资源台账里点一个部门，上方的卡时曲线和费用只看该部门。
2. 密钥生成后只显示一次，关闭即变掩码 → 强制用户在当下保存，也防止泄露 → 创建访问凭证、接入令牌这类一次性机密时照做。
3. 限额进度条分三档颜色，限额数字点一下就地改 → 超额风险一眼可见，调整不用进编辑页 → 部门配额、预算管理页的额度列。
4. 悬停柱子浮窗列出当天各模型明细和合计 → 堆叠图只看颜色分不清数，悬停补上具体数 → 费用明细的按日图，悬停给出各产品线金额。

## 换到别的东西上
- 适合：API 密钥、访问令牌、预算配额、按项目拆分的用量
- 密钥很多（几十把）时，需要加搜索和按成员筛选

## 容易做坏
- 完整密钥一直留在列表里，失去「只显示一次」的意义
- 图表里的 svg 继承了全局描边，柱子出现黑边
- 限额进度全用同一种颜色，到 90% 也看不出来
- 点行筛选后没有明显的清除入口

## 参考实现
页面 `gallery/w-apikeys.html`：`KEYS` 密钥与按日按模型数据、`drawChart()` 堆叠柱与指标、`drawRows()` 列表、`openCreate()` 与创建流程、`niceStep()` 坐标轴刻度
