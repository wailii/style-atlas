# 账本（w-ledger）
把部门月度账单做成纸质账簿：左页是本月结余和科目汇总，右页是横线账页，借贷分栏、合计双下划线，改错用红笔划掉重写而不是覆盖。给要对账、要留痕的人用。
出处：传统会计账簿（借贷记账、红字订正、双线结计）；Beancount（https://beancount.github.io）；Mercury（https://mercury.com）的银行对账页排版。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&family=Noto+Serif+SC:wght@400;500;600;700&family=Ma+Shan+Zheng&display=swap");
:root{--desk:#e4dac0;--paper:#f8f2e0;--paper2:#f3ecd7;--ink:#1f2a44;--ink2:#4d5670;--mute:#8d8a7c;--rule:rgba(46,66,104,.2);--rule2:rgba(46,66,104,.1);--red:#b3261e}
.n{font-variant-numeric:tabular-nums lining-nums}
.row{display:grid;grid-template-columns:50px 1fr 76px 118px 118px 128px;height:36px;border-bottom:1px solid var(--rule2)}
.body::before{content:"";position:absolute;left:49px;top:0;bottom:0;width:4px;border-left:1px solid rgba(179,38,30,.55);border-right:1px solid rgba(179,38,30,.55)}   /* 账页左边的红双线 */
.tot .num span{position:relative;padding-bottom:3px}
.tot .num span::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:4px;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink)}  /* 合计双下划线 */
del{color:var(--red);text-decoration-thickness:1.5px}.new{color:var(--red);font-weight:600}
.r.out{animation:turn .26s forwards}.r{transform-origin:left center;backface-visibility:hidden}
@keyframes turn{to{transform:rotateY(-86deg)}}                       /* 翻页：绕左边转，.book 上加 perspective:2400px */
```
```js
// 订正：原值保留，新值另记，签名带日期；合计从有效值重算
CORR[month][id] = { old, nw, side: "debit", by: "林素", date: "11-20" };
const eff = (m, e) => { const c = (CORR[m] || {})[e.id]; return c ? { ...e, [c.side]: c.nw } : e };
// 翻页：先让右页转出 250ms，换内容，再转回
r.classList.add("out"); setTimeout(() => { render(); r.classList.replace("out", "in") }, 250);
```
## 一眼认出（不能改）
- 米色纸面、左右两页，书脊一条细线，右侧有月份标签
- 右页横线账页：日期 / 摘要 / 凭证 / 借方 / 贷方 / 余额，左边一道红双线
- 数字用衬线体、等宽对齐，合计行下面是双下划线
- 订正的金额是红色删除线加红字新值，旁边一行手写体「订正 姓名 日期」
- 点开一行，下面展开一张代码画的票据（带红色「已核」章）和用量小图
## 颜色
- 桌面 `#E4DAC0`，纸 `#F8F2E0`，页缘 `#F3ECD7`
- 墨蓝 `#1F2A44`（字和线），横线 `rgba(46,66,104,.2)`
- 红笔 `#B3261E`，只用于订正、红双线、印章
## 字体
- Source Serif 4 + Noto Serif SC；订正签名用 Ma Shan Zheng 手写体
- 数字 `tabular-nums lining-nums`
## 真图怎么处理
- 不用照片。票据、印章、条码、用量图全部用内联 SVG 画
## 动效
- 翻月：右页绕左边转出 260ms，换内容后转回 300ms
- 展开凭证：下滑淡入 220ms
- 合计数字 450ms 滚到新值
- 月份标签悬停时探出 4px
## 组件
- 左页：编号条、大标题、应付余额大数字（双下划线）、科目汇总、环比、订正记录、制表签名和结账章
- 右页：双层表头（发生额下分借贷）、账页行、可展开凭证、合计行
- 右边缘月份标签，当月带红点
- 订正输入：红色下划线输入框 + 签署 / 取消
## 学什么交互
- 改数不覆盖，旧值划线、新值红字、旁边留签名和日期 → 对账的人一眼看到谁改了什么 → 费用明细里改分摊金额、调账，原值保留，列表里直接能看出已订正
- 合计和汇总随订正实时重算，数字滚动 → 改一个数，影响到哪里看得见 → 部门月账单改一笔，顶部应付总额、科目汇总同时变
- 点行在原位下方展开凭证，不开新页 → 看票据不丢当前位置 → 资源台账、费用明细点行直接露出发票、合同、用量图
- 翻页代替分页器和月份下拉 → 月度数据天然是一页一页的，← → 键也能翻 → 月度账单、月度对账按月翻
- 借贷分栏、余额逐行累加 → 每笔之后余额是多少一目了然 → 预算消耗、额度扣减类列表
## 换到别的东西上
- 预算台账、对账单、报销单、库存流水
- 不适合：需要大量筛选和多列排序的明细表
## 容易做坏
- 纸色太黄或加纹理，数字变得难读
- 订正直接覆盖原值，留痕就没了
- 红色用到别处，订正就不显眼
- 展开区太高，把后面几行挤出屏幕
## 参考实现
页面 `gallery/w-ledger.html`：`build()` 生成月数据、`eff()` 取有效值、`renderRight()` 账页、`voucher()` 票据 SVG、`goto()` 翻页、`roll()` 数字滚动
