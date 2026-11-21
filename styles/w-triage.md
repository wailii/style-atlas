# 分拣收件（w-triage）
Superhuman、HEY 一路的三栏收件箱：左边分类，中间极简列表，右边预览带处理按钮；全程键盘，处理一封就滑走一封，清空了出一张安静的空状态。给每天要过几十条审批、告警、交付通知的人用。
出处：Superhuman https://superhuman.com ；HEY https://www.hey.com ；Linear Inbox https://linear.app
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif+SC:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap");
:root { --paper:#fff; --wash:#f4f5f2; --line:#e7e8e3; --line2:#f0f1ed; --ink:#17181a; --ink2:#5c5f5a; --mute:#9a9d96; --ok:#2f7d62; --bad:#c4452f; --warn:#a96a0c; }
.app { display:grid; grid-template-columns: 218px 408px 1fr; }
.row { height:82px; padding:12px 20px 12px 24px; border-bottom:1px solid var(--line2); transition: height .26s, opacity .22s, transform .26s; }
.row.sel { background:#f1f4ef; } .row.sel::before { content:""; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--ink); }
.row.unread::after { content:""; position:absolute; left:10px; top:20px; width:6px; height:6px; border-radius:50%; background:var(--ok); }
.row.out { opacity:0; transform:translateX(-46px); height:0; padding-block:0; }      /* E：滑走并收起 */
.sp.on::after { transform: scaleX(1); }                                              /* 分栏下划线 */
```
```js
// 键盘：J/K 移动，E 归档，H 稍后（弹出 1–4 选时间），Z 撤销
// 处理时先改数据、选中下一封、预览立刻换；列表行滑走 270ms 后再重排
function leave(item, patch, msg){ /* 记 lastUndo → 行加 .out → 改状态 → 选下一封 → toast 带「撤销」 */ }
```
## 一眼认出（不能改）
- 三栏：灰绿底分类栏、白底列表、白底预览；没有顶栏、没有面包屑
- 列表行极简：发件人、时间、一行标题、一行摘要，只有一个小标签；未读是一个绿点
- 选中行浅底 + 左边 3px 黑线
- 列表顶部是「重要 / 其他 / 稍后」分栏，每栏带计数
- 预览标题用衬线大字，底部浮着黑色主按钮「同意」和红框「驳回」
- 清空后出现一张线条画的空收件盒，线条会自己画出来
## 颜色
- 白 `#FFFFFF`，分类栏 `#F4F5F2`，线 `#E7E8E3`，字 `#17181A` / `#5C5F5A` / `#9A9D96`
- 绿 `#2F7D62` 只给未读点和已完成；红 `#C4452F` 只给告警和驳回；琥珀 `#A96A0C` 给稍后
## 字体
- 列表和界面 Inter + Noto Sans SC；预览标题和空状态标题 Noto Serif SC；快捷键提示 JetBrains Mono
## 真图怎么处理
- 不用照片。头像是单字圆圈，空状态是 SVG 线条画
## 动效
- 归档：行向左滑出并收起，预览同时换成下一封
- 分栏下划线 200ms 展开；预览内容 300ms 上浮淡入
- 空状态线条逐笔画出
- 稍后菜单和撤销提示各 180ms / 300ms 淡入
## 组件
- 分类栏：账号、收件箱 / 稍后 / 已处理、类型过滤、快捷键提示（纯文字）
- 分栏列表：重要 / 其他 / 稍后，带计数
- 预览：标题、发件人、正文、键值表、迷你折线、节点清单
- 处理条：同意 / 驳回（点驳回出现理由输入框）、告警的「已知悉并归档」
- 稍后菜单：四个时间，数字键直接选
- 撤销提示：左下角，3 秒
## 学什么交互
- 处理动作和移动同时发生 → 处理完不用再点下一封，手不离键盘 → 审批列表同意后自动跳到下一条待审，批量清单很快过完。
- 分栏带计数（重要 / 其他 / 稍后）→ 先看重要，不用被通知淹没 → 工单、告警按「要我处理 / 知会 / 稍后」分栏，计数即工作量。
- 稍后弹出少量固定时间（今晚、明早、下周一）→ 不用开日期选择器，数字键一步完成 → 工单、续期提醒的「推迟处理」只给四个选项，回到收件箱时自带时间标签。
- 预览里直接放决定按钮和关键字段表 → 看完就能批，不用打开详情页 → 资源申请审批把「资源、时长、费用、池内余量」放预览，同意 / 驳回固定在底部。
- 每次处理都有「撤销」 → 快速操作不怕手滑 → 批量审批、删除资源前不再弹确认框，改为处理后可撤销。
## 换到别的东西上
- 工单队列、代码评审队列、财务报销、客服待回复
## 容易做坏
- 行里塞太多标签和图标，失去「极简」
- 处理后列表跳动、选中丢失，键盘流程断掉
- 没有撤销就把归档做成立即生效
- 空状态做成大插画加激励文案
## 参考实现
`gallery/w-triage.html`：`renderList()` 列表与空状态，`renderPreview()` 预览与处理条，`leave()` 统一处理（归档 / 稍后 / 同意 / 驳回），`openSnz()` 稍后菜单，`undo()` 撤销
