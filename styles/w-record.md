# 关系记录（w-record）
Attio、Folk 一路的记录页：左边是一列紧凑可编辑的属性，右边是按时间排的活动，相关的合同、工单、账单是带边框的小卡，点开从右侧滑出预览。给要长期维护「一个对象的全部往来」的人用，比如一家供应商。
出处：Attio https://attio.com ；Folk https://www.folk.app
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#fbfbfc; --line:#e8e9ed; --line2:#f1f2f5; --ink:#1b1c20; --ink2:#5d6068; --mute:#9b9ea8; --acc:#e0502a; --acc-bg:#fdf0eb; --gray-bg:#f1f2f5; }
body { font-size: 13px; }
.body { display:grid; grid-template-columns: 340px 1fr; }
.pr { display:grid; grid-template-columns: 92px 1fr; min-height:34px; align-items:center; }
.pr .v { padding:0 8px; margin-left:-8px; border-radius:6px; cursor:text; } .pr .v:hover { background: var(--gray-bg); }
.pr input { box-shadow: 0 0 0 1.5px var(--acc); border-radius:6px; height:28px; padding:0 8px; }
.pill { height:20px; padding:0 8px; border-radius:10px; font-size:11.5px; background:var(--b); color:var(--c); }
.sl { position:absolute; top:0; right:0; bottom:0; width:440px; transform:translateX(104%); transition: transform .3s cubic-bezier(.2,.9,.3,1); }
.sl.on { transform:none; }
.tl::before { content:""; position:absolute; left:13px; top:4px; bottom:4px; width:1px; background:var(--line); }
```
```js
// 属性：点值 → 文本换成 input，选择类弹出小菜单；保存时闪一下，并在活动里写一条「修改了 X：旧值 → 新值」
// 关联：任何 data-o="类型:id" 的元素点击都调用 openSl()，右侧滑出对应预览，Esc 或点空白关闭
```
## 一眼认出（不能改）
- 窄图标栏 + 白色记录头：方形 logo、名称、状态胶囊、页签（概览 / 账单 / 联系人）
- 左侧属性栏：灰色小字属性名 + 右侧值，悬停才出现底色和笔图标，点即改
- 属性下方是「关联记录」：带 1px 边框的小卡，右端状态胶囊
- 右侧活动时间线：竖线串圆形图标，日期是小号灰字，邮件摘要放在浅灰圆角框里
- 时间线里的记录名是带边框的小标签，悬停变橙色
- 点任何关联记录，从右侧滑出 440px 预览，不跳页
## 颜色
- 底 `#FBFBFC`，白，线 `#E8E9ED` / `#F1F2F5`，字 `#1B1C20` / `#5D6068` / `#9B9EA8`
- 强调橙红 `#E0502A` 只给当前页签线、编辑框和悬停链接
- 状态：绿 `#1D8A5B`、琥珀 `#B4730A`、红 `#C93B3B`，全用「浅底 + 同色字」的胶囊
## 字体
- Inter + Noto Sans SC，13px 正文；金额、日期 `tabular-nums`
## 真图怎么处理
- 不用图。logo 是单色线条图标，头像是单字圆
## 动效
- 页签下划线 200ms 展开；时间线条目 300ms 上浮，间隔 30ms
- 滑出预览 300ms；保存的属性底色闪一下（1.2s 淡出）
- 悬停属性、卡片、链接标签只变底色或边框，120ms
## 组件
- 记录头、页签、属性组（基本信息 / 商务）、关联记录卡、活动筛选 chips（带计数）、时间线、右侧滑出预览（合同 / 工单 / 账单 / 联系人四种）
- 账单页：三个统计格 + 带迷你条的表；联系人页：表
## 学什么交互
- 属性悬停才显示可编辑，点一下就地改，回车保存 → 看起来是一份文档，用起来是一张表单 → 资源台账的详情页、供应商档案不需要「编辑」按钮和弹窗，字段点哪改哪。
- 每次改属性自动写一条活动「某人把 A 改成 B」→ 不用另建操作日志页，改动和沟通在同一条线上 → 资源的归属人、状态、到期日修改直接进它自己的时间线，可追溯。
- 活动按类型筛并带计数 → 一个对象下邮件、会议、账单、工单混在一起，筛一下就能只看工单 → 供应商和资源详情的「往来」区。
- 关联记录点开从右侧滑出，不离开当前页 → 看完合同条款、工单进度，回来还在原处 → 费用明细里点资源 / 合同 / 工单，右侧滑出摘要而不是新开标签。
- 状态胶囊 = 浅底 + 同色字，统一尺寸 → 一眼扫出「谁快到期、谁在处理」→ 合同到期、工单状态、账单核对状态都用它。
## 换到别的东西上
- 客户 / 线索记录、项目档案、设备档案、人员档案
## 容易做坏
- 属性行加输入框边框，变成表单，失去「文档感」
- 每种关联记录用不同卡片样式，列表参差
- 状态用实心色块，页面一下变花
- 滑出预览加遮罩变暗，打断浏览
## 参考实现
`gallery/w-record.html`：`renderProps()` 属性栏，`editText()` / `openMenu()` / `setProp()` 内联编辑，`renderAct()` 活动与筛选，`openSl()` 滑出预览
