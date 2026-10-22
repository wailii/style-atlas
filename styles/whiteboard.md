# 白板讲解（whiteboard）

一整块白板，马克笔当着你的面一笔一笔写、一笔一笔画：标题、小人、方框、箭头、红框重点、圈出来的数字；照片用磁铁吸在板上；镜头跟着笔走。没有手，笔自己飘，抬笔时影子变大。

出处：lemo-opuscar 风格库 whiteboard（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/whiteboard/STYLE.md），语法学自 RSA Animate 和 minutephysics。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Gochi+Hand&family=ZCOOL+KuaiLe&family=Noto+Sans+SC:wght@500;700&display=swap");
:root { --board:#fcfcfa; --k:#1d1d1f; --b:#1f5fbf; --r:#d23a2a; }
body { font-family: "Gochi Hand", "ZCOOL KuaiLe", sans-serif; }                 /* 英文数字 Gochi Hand，中文落到站酷快乐体 */
.board::after { background: linear-gradient(112deg, transparent 30%, rgba(255,255,255,.75) 44%, rgba(235,240,245,.4) 50%, transparent 62%); background-size: 260% 100%; animation: sheen 14s linear infinite; mix-blend-mode: soft-light; }   /* 板面反光慢慢移 */
.ghost { color: rgba(29,29,31,.045); }                                           /* 旧课没擦干净的残影 */
.tx i { display: inline-block; clip-path: inset(0 100% 0 0); }                    /* 每个字从左擦出来 */
.tx { text-shadow: 0 0 .4px currentColor; }                                       /* 马克笔墨水的毛边 */
.magnet { border-radius: 50%; background: radial-gradient(circle at 35% 30%, #ff8a7a, #d23a2a 55%, #8f1f15); }
```

```js
// 图形：rough.js 画，每条 path 按长度匀速画出来，笔尖跟着 getPointAtLength 走
const g = rough.svg(svg).rectangle(132, 148, 226, 150, { stroke: "#1d1d1f", strokeWidth: 3, roughness: 1.3, seed: 7 });
p.style.strokeDashoffset = L * (1 - k); placePen(q.x, q.y);           // 速度：dur = max(80, L / 2.4) ms
// 抬笔移动：时间跟距离走（50~200ms），走一条小弧线，影子变大变远
// 写字：每个字 26ms（大标题 44ms），从左到右擦出，笔尖停在这个字右下角
```

## 一眼认出（不能改）

- 一整块白板，内容都是当场写出来、画出来的
- 三色马克笔，意思固定：黑写字和结构、蓝画箭头和数字、红只给最重要的那一句
- 没有手：笔自己飘，有投影，抬笔影子变大
- 板面有反光、有旧课残影
- 镜头跟着笔往下走，不翻页

## 颜色

- 板 `#FCFCFA`；黑 `#1D1D1F`；蓝 `#1F5FBF`；红 `#D23A2A`
- 磁铁红；板擦蓝 + 深灰毡面；底部铝槽 `#EEF0F2 → #C3C8CE`

## 字体

- Gochi Hand（英文、数字）+ 站酷快乐体 ZCOOL KuaiLe（中文，像马克笔）

## 真图怎么处理

- 原图打印成照片（白边、微微歪），用红磁铁吸在板上，「啪」地贴上去
- 图不改色：白板上的照片就是彩色的

## 动效

- 写字：一个字一个字从左擦出，笔跟着
- 画图：rough.js 线条按长度匀速画出
- 抬笔飞到下一处：按距离 50~200ms，带弧线
- 停顿：讲完一段，笔飞到旁边停 0.7 秒，再开始下一段
- 板擦：点「擦掉重画」，板擦来回扫四行，内容淡成残影，然后重画
- 点清单：方框里画一个红勾

## 组件

- 标题 + 蓝色波浪下划线
- 示意图：小人「你」→ 方框（里面吸着头条照片）+ 蓝色说明
- 要点：蓝箭头 + 三句话（都来自摘要原文）
- 红框重点：一句大字 + 一句小字
- 数字：三个大蓝数字 + 小字说明，最重要的那个用蓝圈圈起来
- 清单：方框 + 标题 + 热度，可以打勾
- 底部铝槽当 Tab，选中项上方一个红磁铁

## 换到别的东西上

- 视频：原版语法——一块板、镜头在板上移动、每一笔都有声音
- 网页：产品原理说明、课程、新手引导；滚动驱动书写进度
- 和数学讲解（manim）不同：这里是手写的、可以擦的

## 容易做坏

- 字整块淡入，而不是一个个写出来
- 画了手或光标
- 颜色乱用（红到处都是）
- 内容编造：示意图里每句话都要能在原文里找到

## 参考实现

页面（`gallery/s-whiteboard.html`）：`PLAN` 队列、`write()` / `drawShape()` / `travel()` / `photo()`、板擦和打勾
