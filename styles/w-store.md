# 商品页（w-store）

电商商品详情页：左边是能转、能放大的三维产品图，右边是配置选项，选项一改，价格、产品图、背景色同时变，滚过购买按钮后底部升起一条购买栏。给要在「选配置、看价格、下单」这条线上让人放心点下去的页面用。

出处：Apple Store 购买页（https://www.apple.com.cn/shop）；Aesop（https://www.aesop.com）。

## 直接抄

```css
:root{--stage:#e3edf4;--ink:#1d1d1f;--ink2:#6e6e73;--line:#d2d2d7;--soft:#f5f5f7;--sel:#1d1d1f}
.wrap{display:grid;grid-template-columns:minmax(0,1.38fr) minmax(420px,.9fr)}
.gal{position:sticky;top:64px;height:calc(100vh - 118px)}           /* 左图吸顶，右侧慢慢滚 */
.stage{border-radius:22px;background:var(--stage);transition:background .6s}
.opt{border:1px solid var(--line);border-radius:14px;padding:14px 16px;transition:border-color .18s,box-shadow .18s}
.opt:hover{border-color:#86868b}
.opt.on{border-color:var(--sel);box-shadow:0 0 0 1px var(--sel)}      /* 选中 = 描边加一圈，不换底色 */
.sz.no{color:#b5b5ba;background:var(--soft);text-decoration:line-through;cursor:not-allowed}
.sbar{position:fixed;left:0;right:0;bottom:0;transform:translateY(110%);transition:transform .45s cubic-bezier(.2,.8,.2,1)}
.sbar.on{transform:none}
```

```js
// 价格滚动：380ms 缓出，从旧价滚到新价
const e=1-Math.pow(1-p,3); shown=from+(to-from)*e; el.textContent="¥"+Math.round(shown).toLocaleString("en-US");
// 购买栏：主按钮离开视口上沿就出现
new IntersectionObserver(([e])=>bar.classList.toggle("on",!e.isIntersecting&&e.boundingClientRect.top<0)).observe(addBtn);
// 三维：glb 自带 KHR_materials_variants，按配色下标换 mesh.material；缩略图用同一个 renderer 按固定角度截图
```

## 一眼认出（不能改）

- 左大图右配置，左图吸顶，右边内容往下滚
- 选项是带描边的卡片，选中时描边变黑加粗，不换底色
- 价格大号，选项一变价格滚动变化，缺货尺码划线置灰
- 主按钮黑色大圆角；滚过之后底部升起一条带缩略图和价格的购买栏
- 白底、大留白、衬线标题；背景舞台色随配色换

## 颜色

- 页面白 `#FFF`，分组底 `#F5F5F7`，字 `#1D1D1F` / `#6E6E73`，线 `#D2D2D7`
- 舞台色随配色：海湾蓝 `#E3EDF4`、玫瑰粉 `#F4EAEC`、炭黑 `#ECECEE`
- 加价标签底 `#FFF1E8`、字 `#B3450F`；无蓝色链接以外的强调色

## 字体

- Inter + Noto Sans SC 正文；标题 Noto Serif SC 700（36px）
- 价格 34px，`tabular-nums`

## 真图怎么处理

- 产品图是 `models/MaterialsVariantsShoe.glb`，three.js 本地加载；页脚小字标模型作者和许可
- 环境光用 RoomEnvironment；地面软阴影用 canvas 画径向衰减贴图
- 打开方式：需要本地服务（直接双击时浏览器不让读 glb，页面会给出提示）

## 动效

- 入场：鞋转到侧面停住；换配色：转一整圈，背景色 0.6s 过渡
- 价格 380ms 滚动；购买栏 0.45s 升起；弹层 0.35s 缩放淡入
- 放大：相机 dolly 到 2.2 倍，放大后拖动是平移，未放大时拖动是旋转

## 组件

- 顶栏：品牌、分类、搜索、登录、购物袋计数
- 图库：舞台 + 四张视角缩略图（侧面、斜前方、后跟、俯视），缩略图由模型实时截出
- 选项组：配色（3 张卡）、尺码（宫格，缺货划线）、鞋垫（三选一带加价）
- 主按钮：加入购物袋（点击变绿 1.5 秒，购物袋数 +1）；次按钮：门店库存
- 对比弹层：与上一代逐项对比，差异项旁标绿色变化量
- 购买栏：缩略图、已选配置摘要、实时价格、加入购物袋

## 学什么交互

- 选项一改，价格、图、背景同时变 → 每个选择立刻有看得见的后果，不用点「计算」→ 放到资源申请单：选卡型、数量、时长，右侧的月费用和可用余额同时滚动更新。
- 选中用描边而非换底 → 一组卡片里，选中项一眼可见，且不会和悬停态混 → 放到模型列表的套餐选择、规格选择。
- 缺货项划线置灰但保留位置 → 用户知道有这个规格，只是现在不可选，不会以为页面坏了 → 放到资源申请：已售罄的机型保留在列表里并注明原因，而不是直接隐藏。
- 主按钮离开视口后底部出现购买栏，带着当前配置摘要和价格 → 长页面里随时能下单且能核对选了什么 → 放到长表单（资源申请、模型接入）：底部固定一条汇总栏，显示已选项和合计，提交按钮常驻。
- 对比用弹层，只列有差异的维度，差异旁标变化量 → 决策时只看变化 → 放到规格升级、套餐对比、版本对比。

## 换到别的东西上

- 硬件、家电、服装、订阅套餐、云主机规格选择
- 配置多于五组时，把次要选项收进折叠，别全部平铺

## 容易做坏

- 选中态只换底色，和悬停分不清
- 价格变化没有动画，用户看不出是哪个选项引起的
- 购买栏一直显示，首屏有两个主按钮
- 缺货尺码直接隐藏，用户怀疑少了选项

## 参考实现

页面 `gallery/w-store.html`：`syncOpts()` 同步选项与价格、`rollPrice()` 价格滚动、`setVariant()` 换配色、`snapThumbs()` 缩略图截取、`toggleZoom()` / `setView()` 相机、`drawCmp()` 对比弹层，购买栏由 IntersectionObserver 控制。
