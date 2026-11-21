# 支付后台（w-payments）
收款与对账首页：一张大金额加折线图，悬停时本期和上期同一天并排读数；下面一排小指标，再下面是交易表，点一行右侧滑出事件时间线。金额排版精致，状态用柔和胶囊，细节密但不挤。给每天看钱的人用。
出处：Stripe Dashboard（https://stripe.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--acc:#5f3dc4;--accbg:#f0ecfc;--ink:#1a1730;--ink2:#4a4766;--mute:#8b88a0;--line:#e7e5ef;--line2:#f1f0f6;--side:#f8f7fb;
 --ok:#0d7a46;--okbg:#e3f6ec;--wait:#8a5a00;--waitbg:#fdf1d6;--bad:#b42318;--badbg:#fde8e6;--ref:#4a4766;--refbg:#ecebf3}
body{font-variant-numeric:tabular-nums}
.mny{display:inline-flex;align-items:baseline;letter-spacing:-.02em}
.mny .cur{font-size:.78em;color:var(--mute);margin-right:3px}      /* 币种小 */
.mny .dc{color:var(--mute);font-weight:500}                       /* 小数灰 */
.pill{display:inline-flex;align-items:center;gap:4px;height:22px;padding:0 8px 0 6px;border-radius:999px;font-size:12px;font-weight:600}
.pill.ok{background:var(--okbg);color:var(--ok)}
.drw{position:absolute;top:0;right:0;bottom:0;width:430px;transform:translateX(105%);transition:transform .28s cubic-bezier(.2,.8,.2,1)}
.drw.show{transform:none}
.chip{height:28px;padding:0 4px 0 11px;border-radius:999px;background:var(--accbg);color:var(--acc)}
.add{height:28px;border:1px dashed #c6c1d8;border-radius:999px}      /* 「添加筛选」是虚线胶囊 */
```
```js
// 金额：整数大、小数灰、币种小
const setM = (el, n) => { const [i, d] = n.toLocaleString("zh-CN", { minimumFractionDigits: 2 }).split("."); el.innerHTML = `<span class="cur">¥</span>${i}<span class="dc">.${d}</span>` };
// 切范围：所有数字从旧值滚到新值 650ms
const roll = (key, to, apply) => { const from = cur[key] || 0; cur[key] = to; const t0 = performance.now(); (function f(t) { const k = Math.min(1, (t - t0) / 650); apply(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f) })(t0) };
// 图上悬停：同一下标取本期和上期，算差值
const c = S.cur[i], p = S.prev[i], df = (c.val - p.val) / p.val * 100;
```
## 一眼认出（不能改）
- 总收款是页面最大的字：币种符号小、整数大、小数灰，旁边一个涨跌小胶囊
- 主图有实线（本期）和虚线（上期），悬停时竖线加一个同时列出两期读数和差值的小浮层
- 状态是柔和胶囊：绿（成功）、琥珀（处理中）、红（失败）、灰（已退款），带小图标
- 筛选条件是紫色胶囊，右上带 ×，末尾是虚线的「添加筛选」
- 点交易行，右边滑出详情，里面是带竖线的事件时间线
## 颜色
- 白底，侧栏 `#F8F7FB`，线 `#E7E5EF`，字 `#1A1730 / #4A4766 / #8B88A0`
- 强调紫 `#5F3DC4`（浅底 `#F0ECFC`）
- 状态色只用在胶囊和涨跌：成功 `#0D7A46`、处理中 `#8A5A00`、失败 `#B42318`
## 字体
- Inter + Noto Sans SC，全局 `tabular-nums`
- 总额 38px / 600；表格金额 14.5px / 600；说明 12–13px
## 真图怎么处理
- 不用照片。图表和图标全部是内联 SVG
## 动效
- 折线 800ms 描出来
- 切范围时所有数字 650ms 滚到新值，折线重画
- 详情抽屉 280ms 滑入；筛选胶囊 180ms 弹出
- 悬停竖线与读数跟手，无延迟
## 组件
- 浅色侧栏：账户切换、分组导航、环境标识
- 顶栏：搜索、导出、主按钮
- 范围分段（7 天 / 30 天 / 90 天 / 12 个月）和「对比上一周期」开关
- 总收款 + 主图；右侧待结算金额与昨日对账进度
- 一排四个小指标（笔数、成功率、退款额、争议），各带涨跌和小曲线
- 交易表 + 筛选胶囊 + 筛选菜单；详情抽屉 + 事件时间线
## 学什么交互
- 悬停读数同时给本期、上期同一天和差值 → 不用来回找数就能比较 → 费用明细的日趋势图，悬停对比上月同一天
- 范围一变，所有数字一起滚到新值 → 用户看得见"哪些数变了" → 资源利用率、月度费用概览
- 「添加筛选」弹出菜单，已选条件变成可删胶囊 → 条件可见、可单个撤销 → 资源台账、工单、模型列表的多条件筛选
- 点行滑出详情，里面是事件时间线 → 看一笔的完整经过，不离开列表 → 费用明细、订单、审批的单据详情
- 金额排版统一：币种小、整数大、小数灰 → 一眼读出量级 → 所有费用和余额的显示
## 换到别的东西上
- 财务概览、费用分析、订单管理、对账页、结算页
- 不适合：没有金额和时间维度的配置类页面
## 容易做坏
- 小数和整数同样大，金额读起来费劲
- 状态胶囊颜色太饱和，整页像红绿灯
- 悬停浮层只给本期，上期看不到
- 抽屉遮住整张表，来回切换时看不到选中的行
## 参考实现
页面 `gallery/w-payments.html`：`ranged()` 切范围、`draw()` 主图与悬停、`roll()` 数字滚动、`renderT()` 交易表与筛选、`openD()` 详情与时间线
