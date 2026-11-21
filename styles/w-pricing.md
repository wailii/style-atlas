# 定价页（w-pricing）
暖白底、黑字、一个朱红强调色。四张套餐并排在同一个圆角框里，价格用大号细体数字，月付年付切换时数字像里程表一样滚动；下面是会算钱的用量计算器和一张表头吸顶的完整对比表。给按量计费的 API 平台、云产品、SaaS 用。
出处：Linear 定价页（https://linear.app/pricing）；Vercel 定价页（https://vercel.com/pricing）；Stripe 定价页（https://stripe.com/pricing）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500&family=Noto+Sans+SC:wght@300;400;500;700&display=swap");
:root{--bg:#fbfbf9;--ink:#0c0e13;--ink2:#4a4f5c;--mute:#868b98;--line:#e4e4de;--acc:#ff4d17;--accbg:#fff0ea}
body{font-variant-numeric:tabular-nums}
.plans{display:grid;grid-template-columns:repeat(4,1fr);border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden}
.plan{padding:26px;border-right:1px solid var(--line);position:relative}
.plan.feat{background:var(--ink);color:#fff}                 /* 主推款整块反色 */
.plan:after{content:"";position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 0 2px var(--acc);opacity:0;transition:opacity .35s}
.plan.rec:after{opacity:1}                                   /* 计算器推荐的那一档亮出朱红框 */
.price{font-size:56px;font-weight:300;letter-spacing:-.045em;line-height:1;height:64px}
.price sup{font-size:22px;letter-spacing:0;vertical-align:top;margin-top:9px}
.cmp thead th{position:sticky;top:60px;background:rgba(251,251,249,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--ink)}
tbody.shut tr.r{display:none}                                /* 分组折叠 */
.q .a{display:grid;grid-template-rows:0fr;transition:grid-template-rows .35s}.q.open .a{grid-template-rows:1fr}.q .a>div{overflow:hidden}
```
```js
// 滚动数字：每一位是 10 行高的竖条，按数字平移；长度变化时重建并从 0 滚起
// 每个数字：<span class=d><i><b>0</b>…<b>9</b></i></span>，i 的 transform 设为 translateY(-n*10%)，transition .8s
// 计算：基础费 + max(0, 用量 − 含量) × 超出单价；取最小者为推荐
const cost=(T,p)=>p.base+Math.max(0,T-p.inc)*p.over;
// 滑杆左段着色靠 --p 变量；调用次数用对数刻度：calls=10^(3+p/100*5.3)
```
## 一眼认出（不能改）
- 四张套餐在同一个 1px 细边圆角框内，只用竖线分隔，不做四张独立阴影卡
- 价格是 56px 的 300 字重数字，¥ 和「/ 月」缩小并上下对位
- 主推套餐整块反色成黑底，按钮用朱红
- 用量计算器右侧是一块浅暖灰面板，下面四条横向价格条，最省的一条是朱红
- 对比表表头吸顶，分组名可点击折叠，当前主推列有极淡的朱红底
## 颜色
- 底 `#FBFBF9`；字 `#0C0E13`；次级 `#4A4F5C`；极淡 `#868B98`；线 `#E4E4DE`
- 强调朱红 `#FF4D17`，只用于：推荐框、主推按钮、年付提示、手风琴展开态、「最省」标
- 面板浅暖灰 `#F6F6F1`；强调淡底 `#FFF0EA`
- 没有第二个彩色
## 字体
- Geist 300 / 400 / 500 / 600 + Noto Sans SC；数字与参数用 Geist Mono 12.5px
- 标题 56px、字距 -0.035em；价格 56px、字距 -0.045em
- 全站开 `tabular-nums`，滑杆旁的大数也一样，滚动时不抖
## 真图怎么处理
- 不用照片，也不放截图；全页只有文字、数字、线条和一个对勾图标
- 套餐卡里的勾用内联 SVG，2px 线宽、朱红色
## 动效
- 切换月付 / 年付：滑块用 .35s 弹性位移；价格每一位竖向滚动 .8s，缓出
- 拖滑杆：推荐框在四张卡之间切换（边框 .35s 淡入），右侧月费滚动，四条价格条 .6s 伸缩
- 手风琴用 grid-template-rows 0fr 到 1fr，不测高度
- 首屏入场：价格从 0 滚到目标值
## 组件
- 导航：品牌、四个链接、登录、黑色按钮
- 分段开关：灰底槽 + 白色滑块，旁边挂「年付约 8 折」虚线小标
- 套餐卡：名称、一句话、价格、对照价、按钮、四条权益（带朱红勾）
- 计算器：两个滑杆（大数读数 + 刻度字）、合计行、四个场景预设
- 推荐面板：推荐名 + 最省标、月费大数、计费拆解一行、四条价格条
- 对比表：分组头（可折叠）、行（主名 + 小字说明）、勾 / 横线 / 文字三种单元格
- 常见问题：左侧标题和联系方式，右侧手风琴
## 学什么交互
- 价格数字滚动 → 数字变化被看见，用户知道这是切换后的新价格而不是页面刷新 → 放到后台：费用概览切换「本月 / 上月」时，合计金额用滚动数字，不要直接替换文字。
- 计算器反向点亮套餐 → 把「我该选哪档」的判断交给页面，而不是让用户自己对表 → 放到后台：资源申请页拖动卡数和时长，右侧实时给出按量、包月、预留三种方案的费用条，最省的高亮。
- 价格条同尺度并排 → 四个数放在同一把尺上，差距一眼可见 → 放到后台：费用明细里「按部门」的对比，用同一把刻度的横条代替纯数字列。
- 表头吸顶 + 分组折叠 → 长对比表不丢列名，也可以只看关心的组 → 放到后台：模型列表或规格对比页，参数很多时分组折叠，表头固定。
- 预设场景按钮 → 滑杆没有参照时没人知道该拉到哪 → 放到后台：配额申请页提供「训练 / 推理 / 评测」预设，一键填好典型卡数。
## 换到别的东西上
- 适合：API / 云产品 / SaaS 的价格页、资源申请的费用预估页、会员方案页
- 不适合：套餐超过六档、价格靠询价的产品；需要大量图片说明的消费品
## 容易做坏
- 四张套餐各自带阴影和圆角，页面变成一排卡片
- 价格数字用粗体，细体带来的克制感就没了
- 数字不等宽，滚动和切换时左右抖动
- 推荐高亮只改一个角标，没有整块框，用户注意不到
- 吸顶表头不加底色，滚动内容透出来
## 参考实现
页面（`gallery/w-pricing.html`）：`odo()` 滚动数字、`calc()` 计算与推荐、`costs()` 价格模型、`setPrices()` 月年切换、对比表由 `G` 数组生成、手风琴 `F` 数组
