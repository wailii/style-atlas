# 极繁贴纸（w-maximal）
撞色、粗黑边、硬阴影、手写字、满屏贴纸，像一面贴满了东西的墙。标题每个字一块色牌，贴纸能拖、能回弹，点空白还会长出新的。适合年轻品牌的活动页、市集、潮流发布、校园活动。
出处：Gumroad（https://gumroad.com）、Figma Config（https://config.figma.com）的活动页气质；只学做法，不复刻图形与商标。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&family=Ma+Shan+Zheng&family=Rubik+Mono+One&family=Noto+Sans+SC:wght@500;900&display=swap");
:root{--cream:#fff1d6;--k:#111;--red:#ff4a2b;--blue:#2d4bff;--yel:#ffd21a;--pink:#ff90cf;--grn:#17c964;--vio:#8b5cff}
.ch{border:5px solid var(--k);box-shadow:10px 10px 0 var(--k);border-radius:30px;font:400 236px/.95 "ZCOOL KuaiLe";transform:rotate(var(--r))}   /* 每个字一块色牌，各自微倾 */
.pill{border:3px solid var(--k);border-radius:99px;box-shadow:4px 4px 0 var(--k)}
.pill:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--k)}                                                          /* 按下去：阴影被吃掉 */
.st{position:absolute;filter:drop-shadow(5px 5px 0 #111)}                                                                          /* 贴纸硬投影 */
.st.back{transition:transform .7s cubic-bezier(.3,2.1,.5,1)}                                                                        /* 过冲曲线 = 回弹 */
@keyframes jmp{35%{transform:translateY(-46px) rotate(calc(var(--r)*-1.5)) scale(1.04)}70%{transform:translateY(6px) rotate(var(--r))}}
```
```js
// 拖动：跟手；松手加上 .back，把偏移归零，过冲曲线自己弹回
up=()=>{el.classList.add("back");el._dx=0;el._dy=0;apply(el,1)}
// 点空白撒贴纸：随机款式 + 随机色 + 随机倾角，弹出动画
document.addEventListener("pointerdown",e=>{ if(e.target.closest(".st,.pill,.cta")) return; addSticker(document.body,F[pick(KEYS)](pick(COLORS)),e.pageX-55,e.pageY-55,rand(-20,20),"pop") });
// 标题逐字跳：每隔 160ms 依次触发一个字的 .j
chs.forEach((c,i)=>setTimeout(()=>c.classList.add("j"),i*160));
```
## 一眼认出（不能改）
- 所有块都有 3~5px 纯黑描边和不模糊的偏移硬阴影
- 至少四种高饱和色撞在一起：红、蓝、黄、粉、绿，配奶油底
- 标题是圆角色牌，一字一块，各自倾斜几度
- 满屏贴纸（星爆、笑脸、花、闪电、对话框、云朵），都带黑边，能拖
- 有手写体小批注和胶带贴着的照片卡片
## 颜色
- 底 `#FFF1D6`；黑 `#111`；红 `#FF4A2B`；蓝 `#2D4BFF`；黄 `#FFD21A`；粉 `#FF90CF`；绿 `#17C964`；紫 `#8B5CFF`
- 黑色只做描边、阴影和文字，不做大面积底色（跑马灯条和页脚除外）
## 字体
- ZCOOL KuaiLe（中文标题）+ Ma Shan Zheng（手写批注）+ Rubik Mono One（英文数字）+ Noto Sans SC 900（正文）
## 真图怎么处理
- 照片放进白边宝丽来卡片，粗黑边加硬阴影，顶部贴一条半透明胶带，倾斜 2~5 度；卡片也能拖
- 照片下面写「示意图 · 摄影师名」
## 动效
- 贴纸入场按 70ms 间隔依次弹出（过冲缓动）
- 标题每 3.2 秒逐字跳一轮，悬停某个字单独跳
- 按钮悬停抖动 450ms，按下去偏移 3px 吃掉阴影
- 跑马灯 22 秒一圈
## 组件
- 跑马灯条、胶囊导航、色牌标题、票券（虚线撕口 + 竖排 ADMIT ONE）、宝丽来卡片、贴纸、日程卡片（悬停上移加深阴影）
- 页脚：黑底大字
## 学什么交互
- 松手回弹 → 拖动没有后果，敢随便玩 → 筛选面板里的条件标签、看板的卡片拖起来看一下再放回，不改变数据
- 点空白长出东西 → 给「没事做」的空白一个回应 → 空状态页（没有工单、没有资源）点一下出现提示或示例
- 按下吃掉阴影 → 按钮有物理反馈 → 后台里「申请资源」这类主按钮用硬阴影加按下位移，比渐变高亮更清楚
- 领票计数加一并撒出贴纸 → 动作的结果有庆祝 → 审批通过、申请提交成功后的提示
## 换到别的东西上
- 市集、校园活动、潮牌发布、儿童产品、创作者社区
- 金融、医疗、正式的企业后台不适合
## 容易做坏
- 色数太少或饱和度低，就只是「卡通风」，不够繁
- 没有黑边和硬阴影，贴纸会飘；加了模糊阴影就变成普通卡片
- 贴纸遮住关键信息（时间、地点、按钮）；要把贴纸压在内容的角上而不是中间
- 贴纸多到卡顿：同时在屏的不要超过 40 个
## 参考实现
页面（`gallery/w-maximal.html`）：`F.*` 贴纸工厂、`addSticker()` / `bindDrag()` 拖动回弹、点击空白撒贴纸的 pointerdown 监听、`wave()` 标题逐字跳
