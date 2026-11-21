# 更新日志（w-changelog）
纯白底、近黑字、一个群青蓝。左边是吸顶的日期时间轴，随滚动点亮当前这一条；右边每次更新是「版本号 + 标签 + 标题 + 一张大图 + 条目清单」。标签分新功能、改进、修复三色，可以筛选。给产品发布记录、开放平台变更公告用。
出处：Linear Changelog（https://linear.app/changelog）；Raycast Changelog（https://www.raycast.com/changelog）。
## 直接抄
```css
:root{--ink:#0f1115;--ink2:#4b505c;--mute:#8d919d;--line:#e9eaee;--acc:#3326ff;--accbg:#eceaff;
--new:#3326ff;--newbg:#eceaff;--imp:#b25a00;--impbg:#fff1d9;--fix:#c4264d;--fixbg:#ffe6ec}
.cols{display:grid;grid-template-columns:240px 1fr;gap:56px;align-items:start}
.tl{position:sticky;top:20px}
.tl ol:before{content:"";position:absolute;left:4px;top:8px;bottom:8px;width:1px;background:var(--line)}
.tl a:before{content:"";position:absolute;left:0;top:13px;width:9px;height:9px;border-radius:50%;background:#fff;border:1.5px solid #c9cbd3;transition:.25s}
.tl a.on{color:var(--ink)}.tl a.on b{font-weight:800;font-size:16px}
.tl a.on:before{background:var(--acc);border-color:var(--acc);box-shadow:0 0 0 4px var(--accbg)}
.shot{aspect-ratio:760/400;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px rgba(0,0,0,.06);cursor:zoom-in}
.shot svg{width:100%;height:100%;transition:transform .8s cubic-bezier(.2,.8,.2,1)}.shot:hover svg{transform:scale(1.025)}
.tag{font-size:12px;font-weight:600;padding:1px 8px;border-radius:5px}.tag.new{background:var(--newbg);color:var(--new)}
```
```js
// 滚动高亮：取视口 38% 位置以上、最后一个越过的条目
function spy(){let cur=null;$$("article:not(.hide)").forEach(a=>{if(a.getBoundingClientRect().top<innerHeight*.38)cur=a.id});
  $$(".tl a").forEach(a=>a.classList.toggle("on",a.dataset.id===cur))}
// 筛选：条目级（article.hide）和条目内清单级（li.hide）同时过滤，时间轴同步隐藏，空月份标题一起收起
// 放大浏览：只在「当前筛选后可见」的图里循环，← → 切换，Esc 关闭
```
## 一眼认出（不能改）
- 页面大标题「更新日志」是 66px、800 字重的超大黑字，旁边挂一行等宽小字写最近更新日期
- 左侧是带竖线的日期时间轴，当前日期是实心群青圆点加粗体，按年月分组
- 每条更新是 760×400 的平涂色底大图（浅紫、浅绿、浅橙、浅蓝），图里是 SVG 画的假界面
- 三色标签（新功能蓝、改进琥珀、修复玫红）同时出现在条目头部和清单每一行
- 点图全屏放大，白色磨砂背景，圆形左右箭头
## 颜色
- 底 `#FFFFFF`；字 `#0F1115`；次级 `#4B505C`；极淡 `#8D919D`；线 `#E9EAEE`
- 强调群青 `#3326FF`（高亮、订阅按钮、链接）
- 标签：新 `#3326FF` / `#ECEAFF`；改进 `#B25A00` / `#FFF1D9`；修复 `#C4264D` / `#FFE6EC`
- 配图底色：`#E9E7FF` `#DCF3E8` `#FFE9DC` `#E1EEFE` `#F4ECDC` `#DFE0F5`，每条一个，浅而平
## 字体
- Hanken Grotesk 400–800 + Noto Sans SC 400–900；版本号、日期、RSS 用 JetBrains Mono 11–13px
- 大标题 66px、字距 -0.05em；条目标题 34px 字重 800、字距 -0.035em
## 真图怎么处理
- 不用照片。每条用 SVG 画一张产品界面示意：平涂底色 + 白卡 + 少量强调色，保证放大后依然清晰
- 示意图左下或右下可以放一行等宽小字写图名
## 动效
- 时间轴圆点 .25s 变实心并扩出 4px 外环
- 筛选切换：保留的条目依次上浮淡入（每条延迟 50ms）
- 悬停配图：内部缓慢放大 2.5%，右下出现放大图标
- 放大浏览：遮罩淡入，画面从 .94 缩放到 1
- 订阅：按钮出现转圈，800ms 后输入框与按钮换成绿色「已订阅」，带弹入
## 组件
- 筛选 chip：标签色小圆点 + 名称 + 等宽数量，选中变黑底
- 订阅表单：邮箱输入（校验失败左右抖动并变红边）+ 群青按钮 + 成功条
- 时间轴：年月小标题、日期 + 版本号一行
- 条目：版本胶囊、标签、日期、标题、导语、大图、清单（标签列 + 说明）、「查看完整说明」
- 放大层：大图、版本与标题、「2 / 6」计数、关闭按钮
## 学什么交互
- 时间轴随滚动高亮 → 长页里随时知道自己读到哪次更新 → 放到后台：变更记录、审批流水页左侧放日期轴，滚到哪条亮哪条，点击跳转。
- 标签筛选同时收窄清单行 → 选「修复」只看修复，而不是整条更新都留着 → 放到后台：工单、操作日志按「类型」筛选时，行内的非匹配项也折叠，计数同步变。
- 图片点开在筛选范围内循环 → 浏览不会跳到被过滤掉的内容 → 放到后台：附件、截图预览在当前筛选的工单里翻页。
- 订阅表单的行内成功反馈 → 不弹窗、不跳页，在原位置给结果 → 放到后台：保存、提交类操作用就地状态替换按钮，而不是全局 Toast。
## 换到别的东西上
- 适合：产品更新日志、API 变更公告、版本发布记录、周报归档
- 不适合：每天几十条的日志流（时间轴会挤）；没有配图可画的纯文字变更
## 容易做坏
- 配图用渐变或阴影堆叠，失去平涂的干净感
- 三种标签配色过多、过艳，抢过标题
- 时间轴不吸顶，长页里读到哪都不知道
- 筛选后只隐藏条目、不同步隐藏时间轴，左右对不上
- 放大层不跟随筛选，会翻到看不见的条目
## 参考实现
页面（`gallery/w-changelog.html`）：`S` 对象里是六个 SVG 示意图函数、`E` 数组是条目数据、`filter()` 筛选、`spy()` 滚动高亮、`show()`/`step()` 放大浏览、订阅表单 `#sub.onsubmit`
