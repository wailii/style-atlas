# 科幻 HUD（w-hud）
深底、青色单色线、刻度环、目标锁定框、扫描线和逐字打印的数据流，像电影里的指挥屏。整页只有一个色相，靠亮度、线型和形状区分信息层级。适合数据中心、调度、安防类大屏和监控总览。
出处：Territory Studio（https://territorystudio.com）、Perception（https://www.experienceperception.com）的电影界面设计；只学语言，不复刻具体画面。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Share+Tech+Mono&family=Noto+Sans+SC:wght@300;400;500&display=swap");
:root{--c:#3fe9ff;--c2:#1b8fa0;--c3:#0e4955;--c4:#08262d;--bg:#030709;--tx:#b8f6ff;--mono:"Share Tech Mono","Noto Sans SC",monospace;--ori:"Orbitron","Noto Sans SC",sans-serif}
.cb{--l:var(--c2);background:                                                    /* 四角括号：8 条 1px 线，不用圆角边框 */
 linear-gradient(var(--l),var(--l)) top left/14px 1px no-repeat,linear-gradient(var(--l),var(--l)) top left/1px 14px no-repeat,
 linear-gradient(var(--l),var(--l)) top right/14px 1px no-repeat,linear-gradient(var(--l),var(--l)) top right/1px 14px no-repeat,
 linear-gradient(var(--l),var(--l)) bottom left/14px 1px no-repeat,linear-gradient(var(--l),var(--l)) bottom left/1px 14px no-repeat,
 linear-gradient(var(--l),var(--l)) bottom right/14px 1px no-repeat,linear-gradient(var(--l),var(--l)) bottom right/1px 14px no-repeat,rgba(6,28,34,.35);
 border:1px solid var(--c4)}
.scan{position:fixed;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(0,0,0,.28) 0 1px,transparent 1px 3px)}   /* 扫描线 */
/* 线框展开：先一条线从中心铺开，再上下撑开，最后内容淡入 */
@keyframes dpo{0%{clip-path:inset(49.6% 0 49.6% 0)}35%{clip-path:inset(49.6% 0 49.6% 0)}100%{clip-path:inset(0)}}
.dp{animation:dpo .7s cubic-bezier(.2,.7,.2,1) both}.dp>*{animation:dpc .5s .55s both}
```
```js
// 雷达：扫过的目标亮度 = 0.22 + 0.78·exp(−距上次扫过的弧度)；扫描尾迹是 70 片逐渐变淡的扇形
let d=(sweep-n.a)%(2*Math.PI); if(d<0)d+=2*Math.PI; const b=.22+.78*Math.exp(-d);
// 锁定框：四个角括号从 74px、旋转 90° 收缩到 14px、0°，缓出
const e=1-Math.pow(1-lockT,3), s=14+60*(1-e), rot=(1-e)*Math.PI/2;
```
## 一眼认出（不能改）
- 只用一个青色相，层级靠亮度和线型（实线、虚线、点线）区分；告警用三角形加闪烁，不换颜色
- 面板没有填充色块，只有四角括号和 1px 细线
- 中央一个带刻度环和度数的雷达，扫描线持续转动，扫过的目标亮起后慢慢变暗
- 悬停目标出现收缩的锁定框，并弹出信息卡
- 数据流逐字打印，行尾有闪烁光标；全屏有细扫描线
## 颜色
- 底 `#030709`；主青 `#3FE9FF`；次青 `#1B8FA0`；暗青 `#0E4955`；面板线 `#08262D`；正文 `#B8F6FF`
- 发光只用在最亮的元素上：`text-shadow / shadowBlur` 8~14px
## 字体
- Orbitron（标题、大数字）+ Share Tech Mono（正文、标签）+ Noto Sans SC（中文）
- 标签小号大写加宽字距（0.2em 以上）
## 真图怎么处理
- 不用照片；背景是 canvas 画的点阵和细网格
## 动效
- 雷达 9 秒一圈；锁定框 300ms 缓出收缩；信息卡从左往右揭开 350ms
- 详情面板：线 350ms → 框撑开 700ms → 内容 500ms 淡入 → 条形图 900ms 长出 → 说明文字逐字打印
- 无人操作时锁定框每 3.5 秒自动换一个目标
## 组件
- 顶栏：品牌 + 状态小标签 + 时钟
- 指标卡：环形刻度仪表、折线（带发光）、告警列表、键值行
- 雷达：同心环、度数刻度、目标（方块 / 告警三角）、锁定框
- 数据流终端；详情面板（条形列表 + 曲线 + 说明）
## 学什么交互
- 悬停即锁定 + 信息卡 → 不用点击就能看细节，点击再进详情 → 资源台账或拓扑图里悬停节点出现摘要，点击再展开
- 扫过的点亮起再慢慢变暗 → 用亮度表达「多久没更新」 → 巡检页里最近一次心跳越新越亮
- 告警用形状和闪烁而不是另一种颜色 → 单色下也不会误读，色盲友好 → 告警状态在表格里用图标加文字，不靠红绿
- 详情面板分阶段展开 → 让人看清「这块是从哪里展开的」 → 抽屉或弹窗从触发的卡片位置展开
- 空闲时自动轮播目标 → 大屏无人操作也有信息在动 → 值班大屏轮流高亮各集群
## 换到别的东西上
- 数据中心、物流调度、安防、游戏内界面、发布会开场
- 需要密集填表的页面不适合
## 容易做坏
- 加第二种颜色（红、黄告警），就破了单色
- 发光过多，所有文字都糊；只有关键数字才发光
- 扫描线太粗，盖住文字
- 动效全部循环，没有「悬停才出现」的东西，就只是屏保
## 参考实现
页面（`gallery/w-hud.html`）：`radar()` 雷达与目标、`drawLock()` 锁定框、`showTip()` 信息卡、`ring()` 环形仪表、`pushLog()` 逐字日志、`openPanel()` 线框展开详情
