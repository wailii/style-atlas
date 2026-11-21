# 横向展厅（w-exhibit）
线上展览：纵向滚轮驱动画面横向移动，像在美术馆里往前走。展品是暖色墙板前的线稿插画，旁边有一张博物馆式展签，背后是巨大的描边年份；底部是一把可点的年代刻度尺。给线上展览、品牌历史、产品演进、年度叙事页用。
出处：Awwwards 横向滚动站点合集（https://www.awwwards.com/websites/horizontal-scroll/）；Google Arts & Culture 线上展（https://artsandculture.google.com/）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Noto+Serif+SC:wght@400;600;900&family=Noto+Sans+SC:wght@400;500&family=IBM+Plex+Mono:wght@400;500&display=swap");
:root{--wall:#f2efe7;--ink:#1b1a17;--ink2:#5d5a50;--mute:#948f80;--line:#d8d3c4;--red:#e4452a;--paper:#fbf9f3}
#scroller{position:relative}                        /* 高度 = 轨道宽 − 视口宽 + 视口高，竖向滚多少，横向走多少 */
#stage{position:sticky;top:0;height:100vh;overflow:hidden}
#track{position:absolute;left:0;top:0;height:100%;display:flex;align-items:center;will-change:transform}
.ex .yr{font-family:"Cormorant Garamond";font-size:300px;line-height:1;color:transparent;-webkit-text-stroke:1.2px #bdb7a6}
.ex .frame{width:560px;height:520px;background:var(--c)}   /* 每件展品一块平涂墙板 */
.label{position:absolute;width:264px;background:var(--paper);border:1px solid var(--ink);padding:16px 18px;box-shadow:0 14px 30px -18px rgba(40,30,10,.5)}
.ex .frame:hover~.label{transform:translate(8px,-8px)}
```
```js
// 竖向滚动 → 横向位移，带阻尼
cur += (scrollY - cur) * .12;  track.style.transform = `translate3d(${-cur}px,0,0)`;
// 视差：年份水印与展品相对视口中心反向偏移不同量；悬停时展品再随鼠标位置偏移
yr.style.transform = `translateX(${-(item.cx-center)/vw*140}px)`;
// 年代尺：把「展品中心 x」与年份做分段线性映射，指针位置 = 当前视口中心对应的年份
// 点刻度：scrollTo({top: item.cx - vw/2, behavior:"smooth"})，轨道随阻尼自然跟过去
```
## 一眼认出（不能改）
- 米白墙面色，超大衬线标题「算力的六十年」，只有「年」字是朱红
- 展品放在一块平涂的浅色墙板上（每件一种石色），线稿插画黑线加朱红点缀
- 每件展品旁有一张白色展签：编号、名称、年代、一句说明，带黑细边和浮起阴影
- 墙板后面是描边不填充的巨型年份数字，滚动时比展品慢半拍
- 底部是 84px 高的年代尺：每年一根刻度、每十年一个标注，展品位置有空心圆点，朱红指针指向当前年份
## 颜色
- 墙 `#F2EFE7`；字 `#1B1A17`；次级 `#5D5A50`；极淡 `#948F80`；线 `#D8D3C4`；纸 `#FBF9F3`
- 朱红 `#E4452A` 只用于：标题里的一个字、插画中的指示灯、年代尺指针与当前点、展签的「查看详情」
- 墙板石色八种：`#E7E2D4` `#DDE4DC` `#ECDFD3` `#DFE3E9` `#EADFDF` `#E3E0EC` `#E7E9D4` `#D9E4E3`，全部低饱和平涂
- 插画里的金色 `#D6B24A`、深色 `#2A2823` 只作小面积
## 字体
- 标题与展名：Noto Serif SC 900；正文说明 Noto Serif SC 400；数字与年份 Cormorant Garamond
- 编号、刻度、参数用 IBM Plex Mono 10–12px 加字距
- 标题 172px、字距 -0.04em；展名 21px；年份水印 300px
## 真图怎么处理
- 不用照片：展品用 SVG 线稿画，2px 黑线、圆角连接，浅色填充，一两处朱红指示灯
- 每件展品下方画一个半透明椭圆当落地影子，让它「站」在地上
- 线稿里允许放一行斜体衬线小字说明，配一条带端点的尺寸线
## 动效
- 竖向滚动换成横向移动，带 12% 的阻尼；年份水印反向多走一点，形成层次
- 悬停展品：展品随鼠标反向偏移最多 11px，墙板上抬 6px，展签斜向浮起 8px
- 点开展品：详情层从上往下展开（clip-path .56s），展品放大淡入，文字逐行上浮
- 指示灯 2.4s 闪烁；张量芯片里的方块沿对角线脉冲
- 底部指针平滑移动，当前展品的圆点放大并显示名称
## 组件
- 顶栏：展名、「向下滚动」提示（箭头缓动）、年份范围
- 开场页：大标题、三格数字
- 展品：年份水印、墙板、插画、编号、展签
- 过场大字：一句话，一个词朱红
- 年代尺：刻度、圆点（悬停显示名称）、指针、当前年份大数
- 详情层：左侧大图加年份，右侧英文名、故事、参数表、上一件 / 下一件
## 学什么交互
- 竖向滚轮驱动横向移动 → 不需要学新手势，滚到哪走到哪 → 放到后台：时间线类页面（资源生命周期、变更历史）用横向轴，滚轮即可前进。
- 底部可点的年代尺 + 指针 → 全局位置和随机跳转同时解决 → 放到后台：长列表和长页面底部放一把迷你索引尺，标出各部门或各月份的位置，点击跳转。
- 悬停视差与浮起展签 → 不加按钮也告诉用户「这是可以点的」 → 放到后台：模型市场、资源卡片悬停时轻微偏移加信息标签浮起，替代常规的阴影加深。
- 详情层内上一件 / 下一件 → 连续浏览不用回到列表 → 放到后台：审批单、资源详情抽屉里支持方向键切换上一条下一条。
## 换到别的东西上
- 适合：线上展览、品牌或产品历史、时间线叙事、作品集
- 不适合：需要对比和筛选的数据页；用户需要快速查某一项的工具页
## 容易做坏
- 滚动到头没有收尾，最后一屏变成无意义的空白
- 年份水印填实色，抢过展品
- 展品用渐变或拟物阴影，和平涂墙板冲突
- 指针和展品位置不对应，点刻度跳到别处
- 详情层打开后背景还能滚，用户回来位置变了
## 参考实现
页面（`gallery/w-exhibit.html`）：`ART` 数组八个展品 SVG、`EX` 展品数据、`measure()` 计算尺寸与轨道、`frame()` 阻尼与视差循环、`yearAt()` 位置到年份、`jump()` 跳转、`openD()` / `closeD()` 详情层
