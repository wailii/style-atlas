# 晨报看板（w-briefing）
排好版的GPU 集群每日简报：首页第一眼是一句由数据生成的结论，下面 4 个关键数，每个数后面跟一句「为什么变了」。图很少，靠字号、字重和细线分区。给每天早上花两分钟看全局的管理层和部门负责人。
出处：Tableau Pulse（https://www.tableau.com）；Mixpanel 的指标订阅与洞察摘要（https://mixpanel.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@600;700;900&display=swap");
:root { --paper:#fffefb; --ink:#14171a; --ink2:#4a4f55; --mute:#8b9097; --line:#dedbd3;
  --red:#d9381e; --red-bg:#fbe9e4; --green:#17734a; --mark:#fff0b8; }
#headline { font:700 31px/1.5 "Noto Serif SC",serif; }                       /* 结论句 */
#headline em { font-style:normal; box-shadow:inset 0 -.36em 0 var(--mark); }  /* 荧光笔下划线，不用渐变 */
.big .n { font:400 70px/.95 "Newsreader",serif; font-variant-numeric:lining-nums tabular-nums; letter-spacing:-.035em; }
.card { border-right:1px solid var(--line); }                                 /* 四张卡之间只有细线，没有白卡和阴影 */
.alert { position:absolute; left:0; top:20px; bottom:20px; width:4px; background:var(--red); }
```
```js
// 结论句和每张卡的「为什么」都由模板 + 数据拼出来，切时间范围时一起重算
const reason = m => `较${basis}${verb} <b>${abs} ${unit}</b>。${c[0].n}（${c[0].v}）和${c[1].n}（${c[1].v}）是主要原因。`;
function headline(){ /* 利用率一句 + 「n 项指标触发关注：…」+ 最大来源部门 */ }
const isAlert = m => m.ruleF(cur.v, cur.p);   // 规则写在数据里，悬停时原样显示给人看
```
## 一眼认出（不能改）
- 页面最上是黑色报头，下面是双线和期号日期，像报纸
- 一整句衬线大字的结论，关键短语有荧光笔下划线
- 4 个指标并排，数字是 70px 左右的衬线数字，卡之间只有竖细线
- 每个数下面一句自然语言的「为什么变了」
- 触发规则的指标，卡片左边一条红竖线，旁边有「需关注」小标签
- 关注栏在结论上方，已关注的指标收成一排描边胶囊
## 颜色
- 纸白 `#fffefb`，字 `#14171a / #4a4f55 / #8b9097`，线 `#dedbd3`
- 红 `#d9381e` 只给「需关注」和不利变化，绿 `#17734a` 给有利变化，荧光黄 `#fff0b8` 只用来标结论里的关键短语
## 字体
- 结论与小标题用 Noto Serif SC 粗体，指标数字用 Newsreader，正文 Noto Sans SC
- 数字 `lining-nums tabular-nums`，切换时间范围数字不抖
## 真图怎么处理
- 不用照片；每张卡只放一条 76px 宽的迷你折线，不放大图
## 动效
- 4 张卡依次上浮，数字 0.8s 计数上升
- 切今天/本周/本月：结论句淡出换句再淡入，数字重新计数，来源条形图 0.7s 生长
- 展开「是谁拉动的」：抽屉高度 0.38s 展开，三根条形依次长出
## 组件
- 报头 + 周期切换、期号行、关注栏、结论句、指标卡、来源抽屉、待办列表、近 7 日表
- 指标卡：名称 + 关注按钮、大数字 + 迷你线、变化行、原因句、展开入口
- 来源抽屉：按部门/按型号切换，前 3 名条形 + 「其余合计」一行，保证加总等于变化量
## 学什么交互
- 结论句 + 指标卡的原因句由模板和数据生成 → 领导只读一句话就能知道今天有没有事，不用自己看图推断 → 放到「资源概览」首页：顶部一句「本周利用率 71.4%，2 项指标触发关注」，每个指标下面一句来源。
- 点开指标卡展开贡献前 3 名，并给出「其余合计」 → 用小条形直接回答「是谁」，并且账能对平 → 放到「费用明细」：点「本月费用 +18.1 万」展开多模态组 +9.8、推荐平台部 +5.2、算法中心 +2.4，其余 +0.7。
- 异常的判定规则悬停可见，写成人话 → 红线不再是黑箱，用户知道阈值是多少，也能去改 → 放到「资源台账」「排队」类预警：悬停红线显示「排队申请单 > 30 张，或较上周增加 20% 以上」。
- 「关注」把指标钉到顶部栏，跟随周期一起变 → 每个人的关键数不一样，钉一次，换页面也能看到 → 放到每个角色的首页：部门负责人关注自己部门的利用率和预算占用。
## 换到别的东西上
- 适合：资源日报/周报、预算执行简报、Token 用量简报、值班交接摘要
- 不适合：需要自由探索明细的分析页
## 容易做坏
- 结论句写成固定文案，数据变了句子没变
- 每张卡加图表，页面就回到普通大盘
- 红色用得太多，真正的异常就看不出来
- 来源条形的合计对不上总变化，读者会失去信任
## 参考实现
`gallery/w-briefing.html`：`M` 指标定义（含 `rule`、`ruleF`），`headline()` 结论句生成，`reason()` 原因句，`renderCards()`、`renderDrill()` 来源抽屉，`setPeriod()` 周期切换，`renderChips()` 关注栏。
