# 年度报告（w-wrapped）
一屏一章的全屏故事：每章一块高饱和纯色底，一个超大的数字或一句话；顶部是分段进度条，章与章之间用一排竖条整屏扫过。最后一章用 canvas 生成可下载的分享卡。给年度回顾、用量总结、团队复盘用。
出处：Spotify Wrapped（https://www.spotify.com/wrapped/）；GitHub Skyline / 年度回顾（https://github.com/）；Stripe 年度信（https://stripe.com/）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Archivo+Black&family=DM+Mono:wght@400;500&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root{--blue:#2b1dff;--lime:#d6ff3a;--pink:#ff4fa3;--plum:#1a0b3b;--orange:#ff6a13;--mint:#00d1b2;--disp:"Archivo Black","Noto Sans SC",sans-serif}
.disp{font-family:var(--disp);font-weight:900;letter-spacing:-.04em;line-height:.9}   /* 大数字用 Archivo Black，再给 900 让浏览器补粗 */
.ln{display:block;overflow:hidden;padding:.06em 0 .16em;margin-bottom:-.1em}       /* 遮罩行：文字从下面升起 */
.ln i{display:block;font-style:normal;transform:translateY(110%)}
.ch.in .ln i{animation:up .9s cubic-bezier(.2,.9,.15,1) both;animation-delay:var(--d,0s)}
@keyframes up{from{transform:translateY(110%)}to{transform:none}}
#wipe{position:absolute;inset:0;z-index:50;display:flex;pointer-events:none}
#wipe i{flex:1;transform:scaleY(0);margin-right:-1px}
#prog button i{position:absolute;left:0;height:4px;background:var(--fg);width:0}   /* 进度条宽度由 JS 每帧写入 */
```
```js
// 转场：9 根竖条按下一章底色，依次升起盖满 → 换章 → 依次落下
bars.forEach((b,k)=>b.animate([{transform:"scaleY(0)"},{transform:"scaleY(1)"}],{duration:420,delay:k*34,easing:"cubic-bezier(.7,0,.3,1)",fill:"forwards"}));
// 数字从 0 数上来：easeOutExpo，延迟 700ms 等入场动画走完
const e=p===1?1:1-Math.pow(2,-10*p);node.innerHTML=fmt(to*e);
// 计时：只在 playing && !hold && !busy 时累加 el；到 6500ms 自动下一章；封面不自动播放，等用户点「开始回顾」
// 分享卡：1080×1440 canvas 逐项 fillText，toBlob 后用 <a download> 保存
```
## 一眼认出（不能改）
- 每章整屏一块纯色底（蓝、柠檬黄、粉、深紫、橙、薄荷），颜色互相撞，不做渐变
- 每章只有一个 200px 以上的巨型数字或标题，Archivo Black 配 Noto Sans SC 900
- 顶部一排 7 段细进度条，当前段随时间填满，已看过的段全满
- 章间转场是竖条整屏扫过，不是淡入淡出
- 封面有描边年份、旋转的星形贴纸和横向滚动的跑马灯
## 颜色
- 蓝 `#2B1DFF`、柠檬黄 `#D6FF3A`、粉 `#FF4FA3`、深紫 `#1A0B3B`、橙 `#FF6A13`、薄荷 `#00D1B2`
- 每章只用「底色 + 一个前景色 + 白或深紫」：蓝底配黄，黄底配深紫，粉底配深紫，深紫底配橙，橙底配白与深紫，薄荷底配深紫
- 不用灰，不用半透明叠层；进度条未播放部分是前景色 28% 不透明
## 字体
- Archivo Black（数字、英文）+ Noto Sans SC 700 / 900（中文大字）；说明小字用 DM Mono 大写加字距
- 巨型数字 206–340px，字距 -0.04 到 -0.07em，行高 0.9
- 正文说明 28–34px、字重 700，一句话，不超过两行
## 真图怎么处理
- 不用照片；视觉是色块、描边数字、星形贴纸、圆章、柱状条
- 星形用 SVG 路径生成（交替两个半径），中间挖一个圆，用粉色和章底色对撞
## 动效
- 文字用遮罩行从下升起，每行延迟 .15s
- 排名行从左滑入，条形 1.4s 伸到各自长度，行间延迟 .22s
- 24 小时柱状从底部长出，每根延迟 40ms
- 数字 2 秒数上来，缓出到尾部几乎停住
- 圆章和星形缓慢自转；跑马灯 26s 一圈
- 点击按住画面暂停，松开继续
## 组件
- 进度条：N 段，可点击跳章
- 顶栏：品牌与章名、播放 / 暂停胶囊
- 封面：描边年份、两行大标题、开始按钮、跑马灯
- 数字章：提问句 + 巨型数字 + 单位 + 一句解释 + 圆形贴纸
- 排名章：名次、名称、条形、数值，第一名放大反白
- 分享章：左侧 3:4 的 canvas 卡片，右侧昵称输入与下载按钮
## 学什么交互
- 分章 + 进度条 + 自动播放 → 把一堆数字变成有节奏的叙述，用户不用自己找重点 → 放到后台：月度 / 季度经营汇报、资源使用总结，一章一个结论，自动播放可暂停。
- 数字数上来 + 排名滑入 → 数字的大小和先后被「演」出来，不是静态展示 → 放到后台：部门费用排名、模型调用排名，进入视口时从 0 数起、名次依次出现。
- 点击左 30% 回退、右侧前进、按住暂停 → 不需要找按钮，手和键盘都能操作 → 放到后台：评审会上的大屏汇报页，翻页用点击和方向键，不用鼠标瞄小按钮。
- 画布实时生成分享图，昵称改动即时重绘 → 导出所见即所得 → 放到后台：把本月用量、费用概要导出成一张图发群里，名称可改。
## 换到别的东西上
- 适合：年度 / 季度回顾、使用量总结、团队复盘、活动战报
- 不适合：需要对比和查细节的数据页；用户要自己控制节奏的长文档
## 容易做坏
- 一章放多个数字，巨型数字就不巨型了
- 用渐变或浅色，撞色的冲击感消失
- 转场用淡入淡出，没有「翻页」的感觉
- 自动播放不能暂停，用户读不完就被翻走
- 分享卡里的字用系统字体，和页面不一致
## 参考实现
页面（`gallery/w-wrapped.html`）：`C` 数组各章 HTML、`go()` 竖条转场、`enter()` 入场和 `count()` 数字、`tick()` 进度与自动播放、`draw()` 分享卡 canvas、`#dl` 下载
