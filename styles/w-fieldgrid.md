# 字段表格（w-fieldgrid）
像电子表格一样的数据表：表头带字段类型图标，单选字段是彩色小标签，左侧是同一张表的多个「视图」（全部、分组、即将到期、看板）。每一格都能直接改，每一行都能展开成记录卡。给要管一批同类资产的人用。
出处：Airtable（https://airtable.com）、飞书多维表格（https://www.feishu.cn/product/base）的网格视图与记录展开。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap");
:root{--navy:#1c2540;--amb:#f2a516;--bg:#f5f3ee;--line:#dedad0;--line2:#ebe8df;--sel:#2c5be0;--selbg:#e8eefc}
.g{border-collapse:separate;border-spacing:0}
.g th{position:sticky;top:0;height:34px;background:#faf9f5;border-right:1px solid var(--line2);border-bottom:1px solid var(--line)}
.g td{height:33px;border-right:1px solid var(--line2);border-bottom:1px solid var(--line2)}
.g td.pk,.g th.pk{position:sticky;left:78px}          /* 主字段冻结 */
.g td.sel{outline:2px solid var(--sel);outline-offset:-2px;background:var(--selbg)}
.tag{height:20px;padding:0 8px;border-radius:10px;font-size:12px}
.tg-0{background:#d6e4ff;color:#1b3f94}.tg-1{background:#cdeedd;color:#14573a}.tg-2{background:#ffe3b3;color:#7a4700}.tg-3{background:#ffd4d6;color:#8a1c25}
```
```js
// 字段定义驱动一切：COLS=[{k,n,t:"text|num|sel|date",o:选项表,pk}]；cellHTML(c,r) 按类型出内容
// 双击/回车 startEdit：sel 弹下拉，其余在格内放 input，回车保存、Esc 取消；记录卡 openRec 用同一份 COLS
```
## 一眼认出（不能改）
- 表头每列带类型小图标（Aa 文本、# 数字、圆圈箭头单选、日历日期）
- 单选字段是彩色圆角小标签，同一列相同值同色
- 网格线完整，像电子表格；行号列 + 主字段列冻结；悬停行号出现展开图标
- 选中单元格蓝框 + 浅蓝底，表头同列高亮
- 左侧是「视图」列表，每个视图带记录数；底部汇总条
- 分组视图：组头带标签和计数，组底有小计行
## 颜色
- 顶栏深海军蓝 `#1C2540`，琥珀 `#F2A516` 只给 logo 和当前页签下划线
- 页底 `#F5F3EE`，表格白，网格线 `#EBE8DF`
- 选中蓝 `#2C5BE0`（底 `#E8EEFC`）
- 标签 7 色低饱和：蓝、绿、橙、红、紫、青、灰；到期红字 `#C0252D`
## 字体
- DM Sans + Noto Sans SC；数字、编号用 DM Mono
## 真图怎么处理
- 不用照片。头像用单字圆点
## 动效
- 下拉和弹窗 120ms 淡入；记录卡 180ms 上浮；改完底部出 1.8 秒的提示
- 看板卡片悬停加阴影，拖到别的列时目标列虚线框
## 组件
- 顶栏页签、视图列表、工具条（筛选、分组、排序、查找）、网格、单选下拉、组头与小计、汇总条、记录卡、看板
## 学什么交互
- 一张表多个视图，只换看法不换数据 → 同一批资产，财务看分组、运维看即将到期、管理看看板 → 放到资源台账：「全部 / 按部门 / 30 天内到期 / 按状态看板」四个视图直接做成左栏。
- 字段类型决定怎么显示和怎么改 → 单选是标签 + 下拉，日期是日期选择，数字右对齐 → 放到费用明细或模型列表：配置一次字段类型，所有页面自动统一。
- 单元格可选中、方向键移动、回车编辑 → 批量改数据不用开弹窗 → 放到配额调整、价格维护这类要改很多格的页面。
- 行号旁的展开图标打开记录卡，卡里每个字段也能内联改 → 宽表字段太多时，不用横向拖着看 → 放到资源详情：台账几十列，详情卡一屏看完。
- 分组带小计，折叠后仍显示组内合计 → 看总量不用打开明细 → 放到按部门、按厂商的费用汇总。
## 换到别的东西上
- 资产台账、供应商清单、采购记录、人员排班、巡检记录
- 不适合只读的大屏展示
## 容易做坏
- 单选标签颜色乱：同值不同色，或每列都用全部 7 色
- 没有冻结主字段，横向滚动后不知道看的是哪一行
- 把所有字段都做成输入框，丢了类型感
- 汇总条缺失，看不到总数
## 参考实现
`gallery/w-fieldgrid.html`：`COLS` 字段定义、`renderGrid()`、`renderBoard()`、`startEdit()`、`openSelect()`、`openRec()/drawRec()`、方向键的 `keydown` 监听
