# 查询栏列表（w-querybar）
物理机列表只有一个筛选入口：顶部一行查询语句。每个条件变成一个可点、可改、可删的 token，下面是极简表格，没有筛选下拉、没有「高级筛选」折叠面板。左侧是保存过的视图，地址栏同步查询串。给每天要从几百上千台机器里找「那几台」的运维和资源管理员用。
出处：GitHub Issues 搜索语法（https://github.com）；Linear（https://linear.app）的筛选；Datadog（https://www.datadoghq.com）的日志查询栏。只学交互原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#fbfbf8;--ink:#14201e;--ink2:#52605d;--mute:#8d9a96;--line:#dfe5e1;--line2:#eef1ee;--acc:#0a7c6e;--acc2:#e1f2ee;--bad:#c4390f}
.qb{display:flex;flex-wrap:wrap;gap:6px;min-height:56px;padding:9px 12px 9px 44px;border:1.5px solid var(--ink);border-radius:12px;font:14px "IBM Plex Mono","Noto Sans SC"}
.qb.focus{border-color:var(--acc);box-shadow:0 0 0 4px var(--acc2)}
.tk{display:inline-flex;height:32px;border:1px solid var(--line);border-radius:7px;overflow:hidden}
.tk .f{padding:0 8px;background:var(--line2);color:var(--ink2);display:grid;place-items:center}   /* 字段名：灰底 */
.tk .v{padding:0 9px;font-weight:600;color:var(--acc);display:grid;place-items:center}            /* 取值：强调色加粗 */
th{position:sticky;top:0;font-size:12px;font-weight:500;color:var(--mute);border-bottom:1.5px solid var(--ink)}
td{height:41px;border-bottom:1px solid var(--line2)}
td.hit{background:#f1f9f6}                                                                      /* 被查询用到的列，整列淡底 */
```
```js
// 查询串 <-> token：字段:值，多值逗号，前缀 - 为排除，数值带比较符
const parse=s=>{const m=s.match(/^([^:\s]+):(.+)$/);return m&&FIELD[m[1]]?{f:m[1],v:m[2]}:{f:"",v:s}};
const hit=(r,t)=>FIELD[t.f].n?numT(t.v,r[FIELD[t.f].k]):t.v.split(",").some(x=>String(r[FIELD[t.f].k]).includes(x));
// 补全里每个取值的条数 = 在当前条件上再加这个值后的结果数
const cntOf=(f,v)=>filt(Q.concat({f,v})).length;
// 编辑某个 token：把它从数组取出、文字放回输入框、记住位置，提交时插回原处
history.replaceState(null,"","#q="+encodeURIComponent(qstr()));
```
## 一眼认出（不能改）
- 页面最大的元素是一条 56px 高、1.5px 黑边的查询栏，里面是 token，不是一排下拉框
- token 左半是灰底字段名、右半是强调色加粗取值，右侧带 ×
- 补全浮层每个取值右边有条数，0 条标红
- 表头无底色，只有一条 1.5px 黑线；行只有发丝线，没有斑马纹、没有竖线
- 左侧是视图列表，每项带条数；地址栏条显示 `?q=` 查询串
- 被查询用到的列整列淡绿底，点单元格值就是往查询栏加 token
## 颜色
- 底 `#FBFBF8`；墨 `#14201E`；次要字 `#52605D`、`#8D9A96`；线 `#DFE5E1`
- 强调深青 `#0A7C6E`（底 `#E1F2EE`）；排除与低利用率用红 `#C4390F`；维修中琥珀 `#B96A00`
## 字体
- IBM Plex Sans + Noto Sans SC 做正文；查询栏、主机名、数字用 IBM Plex Mono（`tabular-nums`）
## 真图怎么处理
- 不用图。状态是 8px 圆点：实心青=在用，空心灰=空闲，琥珀=维修，红=待回收
## 动效
- token 加入时 280ms 弹出（scale .8 → 1）；表格行入场 400ms 上移淡入，前 14 行错开 14ms
- 查询栏聚焦 4px 青色外圈；toast 200ms 上浮
## 组件
- 查询栏、token、补全浮层、语法提示条、视图列表（含内联重命名）、结果摘要行、表格、空状态、toast
## 学什么交互
- 一行查询栏代替所有筛选控件 → 条件再多也只占一行，看一眼就知道当前看的是什么，复制地址栏就能把「这批机器」发给别人 → 放到物理机列表、资源台账：把部门、机房、型号、状态、利用率阈值都收进这一行，不再做 6 个下拉框。
- 输入时补全字段，再补全取值，取值后带条数 → 用户不用记字段名，还没点确认就知道这个条件会筛出多少条，0 条标红免得白点 → 放到费用明细：输入「部门:」直接看到各部门有多少条账单。
- 点表格里的值就加成 token（再点一次去掉）→ 从「看到」到「筛选」零距离，不用回头找筛选框 → 放到申请单、物理机：看到某个负责人想看他名下全部，点名字即可。
- token 可点开改值、退格回到文字编辑 → 筛选条件和文字是同一个东西，高手能打字，新手能点 → 放到审批列表：把「状态:待审批」改成「状态:已驳回」只需点一下改一个词。
- 无结果时告诉用户去掉哪个条件会得到多少条 → 空状态不再是死胡同 → 放到所有叠了 3 个以上条件的列表页。
- 保存为视图，视图带实时条数，地址栏同步 → 常用查询一键回来，也是团队共享口径的入口 → 放到资源台账左侧：「低利用率告警」「空闲可调配」。
## 换到别的东西上
- 工单、告警、日志、模型列表、账单明细，凡是字段多、条件会组合的列表
- 字段只有两三个、没有组合需求的列表不必做
## 容易做坏
- 补全不给条数，用户还是靠试
- token 只能删不能改，改一个值要删了重建
- 查询栏外又放一排下拉筛选，两套入口互相打架
- 表格行高放到 48px 以上，或加斑马纹，就回到默认表格
## 参考实现
`gallery/w-querybar.html`：`parse()`、`hit()`、`suggest()`/`pick()`、`commit()`/`editTok()`/`toggleCell()`、`drawBar()`、`drawTable()`、`drawViews()`、`apply()`（写地址栏）
