# 音乐播放器（w-player）

深色桌面音乐播放器：整页背景跟着当前封面取色，歌词逐行高亮并居中滚动，右侧是可拖动排序的播放队列，底部是可拖动的波形进度条。给每天开着听、需要一眼看清「现在在播什么、接下来是什么」的桌面应用用。

出处：Spotify（https://www.spotify.com）；Apple Music（https://music.apple.com）。

## 直接抄

```css
:root{--c:73,91,76; --ink:#fff; --ink2:rgba(255,255,255,.62); --ink3:rgba(255,255,255,.36); --line:rgba(255,255,255,.09); --panel:rgba(0,0,0,.26)}
body{font:14px/1.5 Inter,"Noto Sans SC",sans-serif;background:rgb(var(--c))}
#bg img{filter:blur(90px) saturate(1.2);opacity:.4}          /* 封面照片放大虚化，不用渐变 */
#bg .tint{background:rgb(var(--c));opacity:.82}              /* 取色铺底 */
#bg .shade{background:rgba(8,8,10,.3)}
.app{display:grid;grid-template-columns:208px 1fr 336px;grid-template-rows:1fr 104px}
.lyr li{font-size:31px;font-weight:700;opacity:.28;filter:blur(1.4px);transform:scale(.92);transform-origin:left center;transition:.5s}
.lyr li.near{opacity:.42;filter:blur(.6px)} .lyr li.act{opacity:1;filter:none;transform:none}
.lyr{mask-image:linear-gradient(transparent,#000 16%,#000 78%,transparent)}
.qi{position:absolute;height:60px;transition:transform .25s cubic-bezier(.2,.8,.2,1)}   /* 队列行绝对定位，靠 transform 让位 */
```

```js
// 取色：缩到 32×32，按「饱和度² × 中等亮度」加权平均，再压暗；颜色每帧向目标插值
const w=(sat*sat+.02)*(v>.15?Math.max(.05,1-Math.abs(v-.55)*1.2):.1);
const darken=c=>{const m=Math.max(...c),k=m>150?150/m:1;return c.map(v=>Math.round(v*k*.78))};
cur[i]+=(tgt[i]-cur[i])*.06;  // requestAnimationFrame 里
// 歌词：算出当前行 el，translateY(容器高*.36 - (el.offsetTop+el.offsetHeight/2))
// 队列拖动：行高固定 64，pointermove 里 to=round(top/64)，区间内的行 translateY(±64)
```

## 一眼认出（不能改）

- 整页底色取自当前封面，换歌时 1 秒多慢慢过渡
- 歌词一行一行放大高亮，其余行虚化变淡，整块随播放居中滚动
- 右侧队列，当前行带跳动的均衡器小条，行尾手柄可拖
- 底部通栏：波形进度条（已播白、未播半透明），两侧是时间
- 左侧是细窄导航加歌单；封面带大阴影、圆角小

## 颜色

- 底色由封面算出，压到最亮分量 ≤ 150 再乘 0.78；面板 `rgba(0,0,0,.26)`，分隔线 `rgba(255,255,255,.09)`
- 文字三档：`#fff`、白 62%、白 36%
- 不加品牌色；强调就是白

## 字体

- Inter + Noto Sans SC；时间和计数用 `tabular-nums`
- 歌词 31px / 700，标题 26px / 700，其余 12~14px

## 真图怎么处理

- 封面用 `gallery/img/real/` 里的照片正方裁切；页面小字标「封面：示意图 · 摄影师」
- 同一张图放大到 120%、模糊 90px 当背景层，换歌时两层交叉淡入
- 取色用 canvas；双击打开（file://）时 canvas 取不到像素，代码里有预置色兜底

## 动效

- 换歌：封面 0.6s 淡换，背景图 1.4s 交叉淡入，底色向新颜色逐帧靠近
- 歌词：行切换 0.5s（透明度、模糊、缩放），整块滚动 0.7s
- 队列：被拖行跟手，其他行 0.25s 让位；均衡器三根条错相跳动
- 红心点击弹一下

## 组件

- 左导航：全部歌曲 / 我喜欢的 / 歌单，数字是数量，点歌单会换队列
- 封面区：封面、标题、歌手、专辑、红心、图片署名
- 歌词区：可点任意一行跳到该句
- 队列：封面缩略图、歌名歌手、时长、拖动手柄
- 底栏：迷你封面、随机/上一首/播放/下一首/单曲循环、波形、音量
- 键盘：空格、←→（5 秒）、N / P

## 学什么交互

- 整页取色 → 换内容时整个界面颜色跟着走，用户不用看标签就知道「切过去了」→ 放到资源台账：按资源池/机房给整页换一个主色，切换池子时底色渐变，查看时不会误以为还在上一个池里。
- 波形进度条 → 进度条本身带信息（哪里响、哪里静），拖动时直接落在想要的位置 → 放到费用明细：把按天的费用画成条形，当进度条用，拖一下就把明细定位到那一天。
- 当前行放大、其余虚化并自动居中 → 长列表里始终知道「我在哪」→ 放到工单审批流水或日志：当前处理节点放大，前后节点变淡，点任一行跳到该节点。
- 队列行手柄拖动，其余行让位 → 排序是直接操作，看得见结果 → 放到模型列表或优先级队列：拖动调整调度优先级，松手后给出一句「已移到第 N 位」。
- 歌单即队列 → 点一下左侧分组，右侧整个列表换掉，不跳页面 → 放到模型列表：按厂商分组，点分组直接换右侧列表。

## 换到别的东西上

- 播客、视频课程、电台、会议录音回放（歌词换成逐字稿）
- 白底后台不要照搬满屏取色；取色只做顶部一条或头部背景

## 容易做坏

- 取色不压暗，文字读不清；颜色直接跳变而非插值
- 歌词所有行同亮度，看不出当前行
- 队列用原生拖拽，其他行不让位，看不出落点
- 用 CSS 渐变光球装饰背景

## 参考实现

页面 `gallery/w-player.html`：`extract()` 取色、`colorLoop()` 颜色插值、`wave()` / `drawWave()` 波形、`buildLyr()` / `updLyr()` 歌词、`renderQ()` / `startDrag()` 队列拖动、`go()` / `next()` 切歌。
