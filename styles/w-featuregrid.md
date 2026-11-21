# 功能格（w-featuregrid）
大小不一的白色格子拼成一屏，每个格子里是一段会动的小演示：图表在长、开关在切、光标在点、终端在打字。读者不用读说明，看几秒就知道产品能干什么。适合 SaaS 产品介绍页，也适合后台的「能力总览」页。
出处：Apple 产品页的 bento 功能区（https://www.apple.com）；Vercel（https://vercel.com）；Framer（https://www.framer.com）。

## 直接抄

```css
:root{--bg:#f4f5f8;--card:#fff;--ink:#0e0f13;--ink2:#555a68;--mute:#9399a8;--line:#e4e6ee;--acc:#5b3df5;--acc2:#ebe7ff}
.grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:176px;gap:14px}
.cell{background:#fff;border:1px solid var(--line);border-radius:22px;padding:18px 20px;overflow:hidden;cursor:pointer}
.cell .demo{flex:1;transition:transform .5s cubic-bezier(.2,.8,.2,1)} .cell:hover .demo{transform:scale(1.035)}
.sA{grid-column:1/3;grid-row:1/3} .sC{grid-column:4;grid-row:1/3} .sD{grid-column:1/3;grid-row:3}   /* 大小不一 */
.grid.has-open .cell{grid-column:auto;grid-row:auto}                                          /* 展开时其余格回到 1×1 */
.cell.open{grid-column:1/-1!important;grid-row:span 2!important;order:-1;display:grid;grid-template-columns:1.25fr 1fr}
.seg{display:inline-flex;background:#e9eaf0;border-radius:11px;padding:3px;position:relative}
.seg .th{position:absolute;top:3px;bottom:3px;border-radius:9px;background:#fff;transition:transform .35s,width .35s}
```

```js
// 每格一个 {t, speed}，统一 rAF：悬停时 speed 平滑到 2.6，演示变快
S.speed += (S.target - S.speed) * Math.min(1, dt * 6); S.t += dt * S.speed; S.demo.tick(S.box, S.s, S.t, S.d, dt * S.speed);
// 展开：用 View Transitions 让格子从原位置长成全宽
const go = () => { cell.classList.toggle('open'); grid.classList.toggle('has-open'); };
document.startViewTransition ? document.startViewTransition(go) : go();
// 切人群：同一组格子，换 MODES[mode] 里的标题、说明、演示参数，再 build() 一遍
```

## 一眼认出（不能改）

- 一屏拼贴：格子大小不一（2×2、1×2、2×1、1×1），圆角 22px，格间距 14px
- 每个格子里是自己会动的演示，不是静态图标
- 白格子 1px 浅边框，灰底，没有阴影
- 只有一个强调色（紫），其余黑白灰；状态色只在演示里局部出现
- 顶部一个分段切换，滑块是白色，切换后整组格子内容跟着换
- 格子标题 15px 加一行灰色说明，演示占剩余空间

## 颜色

- 底 `#F4F5F8`，格 `#FFFFFF`，线 `#E4E6EE`
- 字 `#0E0F13` / `#555A68` / `#9399A8`
- 强调紫 `#5B3DF5`，浅紫 `#EBE7FF`；成功 `#12A150`，警告 `#E8890C`，失败 `#E5484D`

## 字体

- Inter + Noto Sans SC；终端和代码 JetBrains Mono
- 大数字 34px、字距 -0.03em、tabular-nums
- 页面大标题 54px，700，字距 -0.03em

## 真图怎么处理

- 不用照片。演示全部用 DOM、SVG、canvas 现画
- 需要放真实截图时，放进格子里圆角 12px、1px 边框的容器

## 动效

- 每格自带循环：柱子 0.45 秒推进一根；开关依次切；光标 6 秒一轮点部署；终端逐字敲；环形图 1.4 秒画满；节点上数据包来回
- 悬停：演示放大 3.5%，循环加速到 2.6 倍
- 点击：格子用 View Transitions 展开成全宽，其余格重排；Esc 或右上角 × 收回
- 切人群：整组格子重建，滑块 350ms 滑过去

## 组件

- 顶部：logo、五个链接、登录和试用按钮
- 新版本胶囊：紫色小标 + 一句话
- 分段切换（开发者 / 团队 / 企业）
- 7 种演示格：实时图表、开关组、光标点击部署、终端、环形图、节点网络、审批步骤
- 展开详情：左边放大后的演示，右边三个数字、一段说明、三条要点、按钮

## 学什么交互

- 格子里放活的演示 → 读者不读字也知道能干什么，几秒就能判断 → 放到后台「功能总览」或新手引导，每个模块一格，里面循环演示「提交申请、审批、出账」
- 悬停加速和放大 → 给读者一个「我可以操作」的信号，不用额外按钮 → 放到资源概览，悬停一格就让该格的曲线加速回放近 24 小时
- 点格子展开成全宽 → 不跳页就看到详情，Esc 回来，位置感不丢 → 放到费用看板：点一个部门格，展开成该部门的明细，其余格缩回原位
- 顶部切人群，格子整体换内容 → 同一页面服务不同角色，不用做三套页面 → 放到概览页顶部切「个人 / 部门 / 全局」，格子换成对应的指标和演示
- 格子大小表示重要程度 → 最重要的指标占 2×2 → 放到运营看板，把当月最该盯的指标放最大

## 换到别的东西上

- 产品功能页、更新发布页、后台概览、能力清单
- 一屏最多 7 到 8 格，再多就失去重点
- 不适合需要精确对比的表格数据

## 容易做坏

- 演示只是静态图标，等于普通卡片墙
- 所有格子一样大
- 每格一个颜色
- 动画同时全部很快，眼睛没有落点；循环节奏应错开
- 展开时其余格不重排，留下空洞

## 参考实现

`gallery/w-featuregrid.html`：`MODES` 三种人群的内容、`demos`（chart / toggle / deploy / term / donut / net / flow）、`build()`、`toggleOpen()`、`loop()`。
