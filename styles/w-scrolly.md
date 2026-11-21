# 滚动叙事（w-scrolly）
左边是一段一段的文字，右边是一张贴住屏幕不动的图；文字滚到哪一段，图就变成哪一种形态，同一批数据点平滑地飞到新位置。用来把一件事按顺序讲清楚：先看全貌，再分类，再按月，再看趋势，最后算账。适合数据报道、运营月报、复盘页。
出处：The Pudding（https://pudding.cool）；纽约时报 The Upshot（https://www.nytimes.com/section/upshot）。

## 直接抄

```css
.wrap{display:grid;grid-template-columns:minmax(440px,540px) 1fr;gap:20px;max-width:1440px;padding:0 40px 0 72px}
.step{min-height:100vh;display:flex;flex-direction:column;justify-content:center;max-width:500px}
.chart{position:sticky;top:64px;height:calc(100vh - 80px);align-self:start}            /* 图贴住屏幕 */
.dot{transition:fill .6s,opacity .3s} .dim .dot{opacity:.09} .dim.d-train .s-train{opacity:1}   /* 悬停数字时其余点淡出 */
.note path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .8s .6s} .note.on path{stroke-dashoffset:0}
.note text{font:400 25px "Ma Shan Zheng",cursive;fill:#c4310f}                          /* 手写批注 */
#prog{position:fixed;top:0;height:4px;width:100%;background:#14151a;transform-origin:0 0}
```

```js
// 每个视图给每个点一份目标位置 P[view][i] = {x,y,r}；切视图时逐点补间，按 x 错开 0~350ms
anim = days.map((d,i)=>({from:{...cur[i]}, to:P[v][i], delay:P[v][i].x/W*350, i}));
// 当前段落 = 中心离视口中线最近的 .step
steps.forEach((s,i)=>{const r=s.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-innerHeight*.5); if(d<bd){bd=d;best=i}});
// 文中数字取自数据：<span class="v" data-k="idle"> 由 V.idle = cnt('idle') 填入，图和文永远一致
// 悬停数字：svg 加 dim + d-<状态> 类，其余点透明度 .09
```

## 一眼认出（不能改）

- 左文右图，图 sticky，文字每段至少一屏高
- 同一批点在不同形态间飞：散点、归类、按月堆叠、折线、华夫格
- 手绘箭头加手写字批注，随段落出现，线条自己画出来
- 顶部 4px 进度条，右上角段落序号可点
- 正文里带下划线的数字，悬停时图上对应的点亮起来、其余淡出
- 用大字号衬线正文，一段不超过三行半

## 颜色

- 底白 `#FFFFFF`，字 `#14151A`，次级 `#4B4F5C`，弱字 `#8D92A0`，线 `#E6E7EC`
- 状态四色：训练橙红 `#FF4D2E`，推理青绿 `#0E8F86`，空闲灰 `#C3C6D0`，故障黑 `#15151A`
- 批注墨红 `#C4310F`，标题高亮黄 `#FFF0A8`

## 字体

- 标题与正文：Noto Serif SC（标题 900，正文 400）
- 图上标签、图例、导航：Noto Sans SC + Inter，11~13px
- 批注：Ma Shan Zheng（手写）
- 大数字用 Inter 800，字距 -0.04em

## 真图怎么处理

- 不用照片，全部是数据图形。点由 SVG circle 生成，种子固定
- 如要放现场照片，放在两个段落之间，整宽、不 sticky

## 动效

- 视图切换 850ms，每个点按 x 位置错开最多 350ms，ease-in-out cubic
- 颜色 600ms 渐变；轴和图例 500ms 淡入淡出
- 批注：文字淡入，箭头 800ms 描线
- 顶部进度条随滚动；右上序号点亮当前段

## 组件

- 顶栏：栏目名 + 段落序号
- 首屏：红色小标、超大标题、导语、署名、向下滚动提示
- 步骤段：二级标题 + 两三段正文 + 可悬停数字
- 图表区：标题、图例、SVG 画布、手写批注
- 末尾：来源与数据说明

## 学什么交互

- 同一批点在不同图形间飞 → 读者能看到「这些点就是那些点」，不会在两张图之间丢失对应 → 放到资源台账：滚动时同一批机器从「按机房分布」变成「按利用率分档」再变成「按部门归属」
- 正文数字悬停高亮图上对应的点 → 文和图互相指，不用来回找 → 放到月度费用复盘：悬停「华东 8.2 万」，图上只亮该区域的账单
- 手写批注指向异常 → 一眼知道看哪里，比图例更快 → 放到监控复盘页，在故障时段旁标「8 月 12 日到 20 日整卡故障」
- 一屏一个结论，结论里的数字从数据里取 → 文图不会对不上 → 放到周报 / 季报生成页，数字全部由接口填
- 顶部进度条和序号 → 长页面知道读到哪 → 放到长的评估报告页

## 换到别的东西上

- 数据新闻、年度总结、运营复盘、方案说明、产品发布故事
- 步骤控制在 5 到 7 段，图形态不超过 6 种
- 不适合要反复对照多块内容的工作台页面

## 容易做坏

- 图不 sticky，滚两下图就没了
- 每段只换一点点，读者感觉不到变化
- 点飞行时间太长（超过 1.2 秒）会让人等
- 文中数字手写，改数据后对不上
- 批注压住数据点

## 参考实现

`gallery/w-scrolly.html`：`days` 数据生成、`P[0..5]` 各视图点位、`setView()` / `frame()` 补间、`note()` 手绘批注、`onScroll()`、悬停 `.num` 高亮。
