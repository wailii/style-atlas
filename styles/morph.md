# 极简变形（morph）

大字、留白、黑白加一种强调色；只有一个黑色元素，它在按钮、播放条之间来回变形。

出处：zero（@twoclipping）「UI 形态变换循环」（https://x.com/twoclipping/status/2103273003555402193）和「高端极简产品片」（YouMind 1.4K 收藏）；Danny Stuart 的 Remotion App 宣传片（dramatic cuts + kinetic typography）。

## 直接抄

```css
:root { --bg:#fff; --ink:#0b0b0c; --mute:#8a8a8e; --line:#ececec; --soft:#f4f4f5; --acc:#2f4bff; }
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@500&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
```
```js
// 弹簧 → CSS linear()；SOFT 给文字和大块，SNAP 给小东西
springCurve(180, 24) // SOFT
springCurve(320, 26) // SNAP
```

## 一眼认出（不能改）

- 一个元素从不切镜：按钮变成播放条、播放条变回按钮，位置宽高圆角连续变化
- 大字从遮罩里升起（每行一个遮罩）
- 只有一种强调色
- 弹簧只有一点点过冲
- 禁止：光晕、粒子、界面上的渐变、弹跳缓动、模板感

## 颜色

- 白底黑字；强调色 `#2F4BFF` 只给热度数字和实时点
- 放心改：强调色换成品牌色；不能改：一种

## 字体

- Geist 400～800（拉丁、数字）、Geist Mono（小标签）、Noto Sans SC 900（中文大字）
- 大标题 56px，字距 −0.045em；编号 92px，−0.06em

## 真图怎么处理

- 原图，不加滤镜；出场用 clip-path 从中间一个圆点弹开到圆角 28px 的矩形，同时图从 1.18 缩到 1

## 动效

- 弹簧都写成闭式解，转成 CSS `linear()`（`springCurve()`）
- 文字遮罩上升：每行间隔 70～90ms
- 变形元素：rAF 里对 x、y、w、h、r 各跑一个弹簧（k 200～260，c 22～26）；内容切换时旧内容 0.22s 模糊淡出，新内容晚 0.12s 进
- 播放 / 暂停：两个伪元素各自 clip-path 变形
- 底栏指示块：左右两条边各一个弹簧，前沿硬（340）、后沿软（120），移动时被拉长
- 数字 1.4s 从 0 数上去

## 组件

- 主按钮：黑色胶囊「听热点」，点了变成底部播放条（封面圆片在转 + 标题 + 进度 + 播放键 + ×）
- 主卡：圆角大图 + 巨大编号 + 强调色热度 + 遮罩标题
- 列表：浅灰大编号 + 标题 + 细热度条（弹簧长出来）；点开编号变黑
- 底栏：黑色指示块会拉伸

## 换到别的东西上

- 网页：首屏一个会变形的元素贯穿滚动（按钮 → 卡片 → 图表）
- 视频：照 zero 的提示词——一个形状不切镜，每帧是 t 的纯函数，子帧混合做运动模糊，120 BPM 每拍一件事；声音用干净的 UI 音效踩拍
- 适合：工具、播放器、SaaS 发布

## 容易做坏

- 会被缩放的文字不要加 will-change，会糊
- 变形容器里换的文字要单独做进出时间，不然会叠在一起
- 做循环时最后一帧要和第一帧完全一样

## 参考实现

引擎：`Engines.springCurve()`
页面（`gallery/s-morph.html`）：`setTarget()` / `tickM()`（变形）、`placeInd()` / `tickI()`（两边弹簧）
