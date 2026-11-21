# 游戏启动器（w-gamehub）
深色底的游戏库首页：大图轮播主视觉、右侧缩略图列表带倒计时进度、库里一排排卡片，悬停放大并让整页背景换成这张图，成就用进度环表示。图是主角，界面退到暗处。适合游戏库、影音库、课程库、模型库这类「看封面选东西」的页面。
出处：Steam（https://store.steampowered.com）、Epic Games Store（https://store.epicgames.com）、PlayStation（https://www.playstation.com）的主界面；只学结构与交互。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
:root{--bg:#090b10;--p:#141822;--ln:rgba(255,255,255,.09);--tx:#eef2fa;--mu:#8d97ab;--ac:#c6ff4a}
#bk div{position:absolute;inset:0;background-size:cover;filter:blur(38px) saturate(1.25);opacity:0;transition:opacity .7s}   /* 整页背景：每张图一层，切换只改 opacity */
#bk div.on{opacity:.7}  #bk::after{content:"";position:absolute;inset:0;background:rgba(5,7,11,.8)}                            /* 压暗，保证文字可读 */
.sl.on .im{animation:kb 9s ease-out forwards}  @keyframes kb{to{transform:scale(1.14) translate(-1.2%,-.8%)}}              /* 用照片的 Ken Burns 代替视频 */
.cd{transition:transform .28s cubic-bezier(.2,.8,.2,1)} .cd:hover{transform:scale(1.13);z-index:20}
.cd:hover .ph img{animation:kb2 6s ease-out forwards}                                                                       /* 悬停时图开始缓慢推移，像在预览 */
.th.on i{animation:fill 7s linear forwards}  .hero.pa .th.on i{animation-play-state:paused}                                  /* 轮播进度条，悬停暂停 */
```
```js
// 悬停卡片 → 背景换图；离开 → 回到主视觉当前那张
c.addEventListener("mouseenter",()=>{hoverId=g.id;setBk()}); c.addEventListener("mouseleave",()=>{hoverId=null;setBk()});
function setBk(){const id=hoverId||heroId; $$("#bk div").forEach(d=>d.classList.toggle("on",d.id=="bk_"+id))}
// 成就环：stroke-dasharray = 周长，stroke-dashoffset = 周长 × (1 − 完成比例)
// 轮播：自动 7 秒 + 左右方向键 + 点缩略图；每次切换重启缩略图进度条
```
## 一眼认出（不能改）
- 近黑深底，只有一个亮色（酸性绿）用于主按钮、进度和选中态
- 主视觉是整幅大图，左侧压暗放标题和按钮，右侧是带进度条的缩略图列表
- 图在缓慢推移（Ken Burns），切换时淡入淡出
- 库卡片悬停放大，同时整页背景换成这张图的模糊版
- 每张卡片都有成就进度环；未安装的游戏图片是灰的
## 颜色
- 底 `#090B10`；面板 `#141822`；分隔线白 9%；正文 `#EEF2FA`；次要 `#8D97AB`
- 强调 `#C6FF4A`，只配黑字
## 字体
- Noto Sans SC 900（游戏名）+ Barlow Condensed（英文名、数字，加宽字距）
## 真图怎么处理
- 照片做主视觉时左侧加一层渐变压暗（遮罩，保证文字可读），底部再压一层
- 卡片用 3:2 裁切，未安装的灰度加压暗；照片下写「示意图 · 摄影师名」
- 背景用同一张图做 38px 模糊再压暗 80%
## 动效
- 主视觉切换 800ms 淡入；文字逐行上浮，间隔 80ms；图推移 9 秒
- 悬停卡片 280ms 放大到 1.13，图开始推移，信息层淡入
- 筛选切换时出现的卡片 400ms 缩放淡入
- 背景换图 700ms 交叉淡入
## 组件
- 顶栏：logo、胶囊页签、搜索框、头像
- 主视觉：标签、标题、简介、主 / 次按钮、价格；右侧缩略图列表；左右箭头
- 库：筛选（带计数）、总成就环、卡片网格（6 列）
- 底部浮动下载条
## 学什么交互
- 悬停换整页背景 → 不点击也能预览这个东西的气质 → 模型广场、镜像库、数据集列表悬停某行时右侧或背景换成它的封面与摘要
- 轮播带进度条且悬停暂停 → 用户知道还有几秒，不会被抢走注意力 → 公告、推荐位轮播
- 筛选带计数、切换有进入动画 → 一眼知道每个条件下有多少 → 资源台账的「全部 / 已分配 / 闲置」计数标签
- 进度环替代百分比文字 → 同一行里多个项目的完成度一眼对比 → 配额使用率、审批进度、训练任务进度
- 未安装灰显 → 状态直接画在图上 → 未纳管、已停用的资源用灰度显示
## 换到别的东西上
- 游戏、影视、音乐、课程、模型库的首页和库页
- 文字为主、没有好封面的内容不适合
## 容易做坏
- 图片分辨率低还放大推移，会发糊；封面要用原图尺寸的 1.5 倍以上
- 压暗不够，白字落在亮图上看不清
- 悬停放大后被相邻元素裁掉；放大的卡片要提到最上层
- 强调色用多种，就成了普通门户站
## 参考实现
页面（`gallery/w-gamehub.html`）：`go()` 轮播、`setBk()` 背景换图、`ring()` 成就环、`applyF()` 筛选、`toast()` 反馈
