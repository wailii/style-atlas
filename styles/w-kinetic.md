# 动态字排（w-kinetic）
整屏就是一个巨大的单词，字母会随鼠标靠近变粗变宽，整行始终撑满屏幕宽度；下面是荧光色跑马灯、随滚动横向滑动的巨型文字、一行一行的议程列表。黑白加一个荧光黄绿，没有图片，全靠字体本身撑场面。适合活动站、展览、品牌发布、设计机构首页。
出处：Pentagram（https://www.pentagram.com）；Awwwards 获奖站点的动态字排做法（https://www.awwwards.com）；可变字体 Anybody（https://fonts.google.com/specimen/Anybody）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Anybody:wdth,wght@50..150,100..900&family=Noto+Sans+SC:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap");
:root{--bg:#f4f4f0;--ink:#0a0a0a;--lime:#d6ff1f;--mute:#8a8a84;--any:Anybody,"Noto Sans SC",sans-serif}
.giant .row{display:flex;justify-content:center;font-family:var(--any);line-height:.78;white-space:nowrap;text-transform:uppercase}
.giant .row span{display:inline-block}
.band{background:var(--lime);border-block:1.5px solid var(--ink);overflow:hidden;height:74px}
.line.o{color:transparent;-webkit-text-stroke:2px var(--ink)} .line.o:hover{color:var(--lime)}
.list li{position:relative;overflow:hidden;border-bottom:1.5px solid var(--ink);transition:color .25s}
.list li:before{content:"";position:absolute;inset:0;background:var(--ink);transform:translateY(101%);transition:transform .35s cubic-bezier(.3,.8,.2,1)}
.list li:hover:before{transform:none} .list li:hover{color:var(--lime)} .list li>*{position:relative}
```

```js
// ① 距离鼠标越近越粗越宽：高斯衰减，再按每帧 12% 缓动
const k = Math.exp(-Math.pow(dist / (innerWidth * .2), 2));
tw = 350 + 550 * k; td = 70 + 80 * k;                    // wght 350→900, wdth 70→150
s.w += (tw - s.w) * .12; el.style.fontVariationSettings = `'wght' ${s.w},'wdth' ${s.d}`;
// 整行撑满：量出当前总宽，按比例调字号（缓动 25%）
fs += (clamp(fs * innerWidth * .94 / curWidth, 160, maxFs) - fs) * .25;
// ③ 跑马灯：悬停时目标速度降到 12%，速度平滑过渡
bs += (bt - bs) * .08; bx -= dt * .12 * bs;
// ② 滚动：大字 translateX 和字宽字重都由滚动进度 p 推出
l1.style.transform = `translateX(${-p*55+10}vw)`; l1.style.fontVariationSettings = `'wdth' ${60+p*90},'wght' ${300+p*600}`;
```

## 一眼认出（不能改）

- 首屏一个占满宽度的巨型单词，拉丁字母，可变字体
- 字母随鼠标靠近变粗变宽，其余字母变窄，整行宽度不变
- 黑、白（微暖）加一个荧光黄绿，没有第二种颜色
- 荧光黄绿跑马灯，大写粗宽字，菱形分隔
- 描边空心巨字和实心巨字随滚动反向横移
- 议程是整行大字列表，悬停整行反色（黑底荧光字）
- 1.5px 黑线分割，直角，无圆角无阴影

## 颜色

- 底 `#F4F4F0`，字 `#0A0A0A`，弱字 `#8A8A84`
- 荧光 `#D6FF1F`：只用在跑马灯底、导航角标、反色行的字、按钮文字
- 线 1.5px `#0A0A0A`

## 字体

- 巨字与标题：Anybody（可变，wdth 50~150、wght 100~900）
- 中文：Noto Sans SC 900（大标题）/ 500（正文）
- 时间、标签、导航：JetBrains Mono，11~13px，大写，字距 .04em
- 中文不参与字宽变化，字宽动效只给拉丁字母

## 真图怎么处理

- 不用图片。需要图时用单色高对比的黑白照片，直角裁切，放在两段大字之间，整宽

## 动效

- 首屏无鼠标时，一个看不见的指针沿曲线游走，字母像在呼吸；有鼠标后改跟鼠标
- 跑马灯 0.12px/ms 匀速，悬停降到 12%，松开回弹
- 滚动：两行大字反向横移约 55vw，同时字宽字重渐变
- 议程行悬停：黑底从下往上 350ms 推满；切日期时行逐条上浮淡入

## 组件

- 固定导航：粗宽 logo、四个文字链接（悬停下划线展开）、黑底荧光字按钮；滚动后加底色和黑线
- 首屏信息栏：活动名、日期地点、规模，三列
- 跑马灯
- 议程：日期切换（边框按钮组）+ 时间 / 标题 / 讲者 / 场地标签 / 箭头
- 页脚：荧光色超大 Register，悬停字距展开

## 学什么交互

- 字随鼠标变粗变宽，整行始终撑满 → 光标位置直接反馈在内容形态上，不需要额外高亮 → 放到资源台账的分组汇总行：悬停某个机房，该机房的数字变粗变大，其他机房收窄
- 整行反色 → 点击目标是整行，不是某个小链接，命中率高 → 放到模型列表、工单列表，悬停整行反色并出现「查看」箭头
- 跑马灯悬停减速而不是暂停 → 可读，又不突兀 → 放到后台顶部的公告滚动条，悬停降速，点击固定
- 滚动驱动的字体变化 → 滚动进度可见，读者知道读到哪 → 放到长页面的章节标题，随滚动从窄变宽，作为进度提示
- 日期切换后行逐条上浮 → 内容更换时视线有落点 → 放到审批列表切换「待办 / 已办」页签时的行入场

## 换到别的东西上

- 活动站、展览、发布会、作品集首页
- 后台里只适合做欢迎页、年度报告页、空状态大字
- 不适合信息密度高、需要小字的界面

## 容易做坏

- 用不支持变宽的字体（只有 wght 没有 wdth），变化看上去就小气
- 整行不撑满，字变宽时跳版
- 加图片和多种颜色，冲淡字的力量
- 跑马灯悬停直接停住，像卡死
- 中文参与字宽变化，字形变形难看

## 参考实现

`gallery/w-kinetic.html`：`giantFrame()` 字母变形与撑满、`track` 跑马灯、`scrollFx()` 滚动字排、`DAYS` / `renderList()` 议程。页面内嵌了 Anybody 的拉丁子集，离线也能看到效果。
