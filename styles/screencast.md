# 活体录屏（screencast）

看起来像一段产品录屏：App 窗口浮在柔和的桌布上，光标是用户，镜头跟着点击推近；一只大方块像素的小家伙住在高清界面里，替软件干活——沿着标题跑一遍是在「读」，踩在按钮上是在「播」。

出处：lemo-opuscar 风格库 living-screencast（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/living-screencast/STYLE.md）；语法学自 Screen Studio 式录屏（自动推近、光标平滑、窗口浮在桌布上）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Noto+Sans+SC:wght@500;700;900&family=JetBrains+Mono:wght@600&display=swap");
:root { --ink:#15171c; --mute:#7a808c; --line:#eef0f3; --acc:#3d6bff; --mark:#ffe36b; }
.stage { background: linear-gradient(140deg,#e6ecff 0%,#f6eefc 50%,#fff3e2 100%); }      /* 桌布 + 三团 blur(40px) 的色团 */
.win { position:absolute; left:16px; top:54px; width:358px; height:716px; transform-origin: 0 0; border-radius: 28px; background:#fff; overflow:hidden;
  box-shadow: 0 0 0 1px rgba(20,25,40,.06), 0 30px 60px -20px rgba(40,50,90,.35), 0 12px 24px -12px rgba(40,50,90,.2); }
canvas { image-rendering: pixelated; }                                                 /* 小家伙必须是硬边大方块 */
h2 { background: linear-gradient(var(--mark),var(--mark)) 0 88% / 0% 40% no-repeat; transition: background-size 1.8s linear; } h2.mark { background-size: 100% 40%; }  /* 小家伙读到哪，荧光笔划到哪 */
.rip { width:40px; height:40px; margin:-20px; border-radius:50%; border: 2px solid var(--acc); background: rgba(61,107,255,.12); }   /* 点击圈 */
.cap { border-radius: 999px; background: rgba(255,255,255,.88); }                     /* 底部说明胶囊：● 00:06 ③ 踩一下就开听 */
```

```js
// 窗口内坐标：量 DOM，除以当前镜头缩放 → 小家伙、光标、镜头都用这个坐标，内容变了位置自动对
const rel = (el) => { const W = win.getBoundingClientRect(), s = W.width / win.offsetWidth, r = el.getBoundingClientRect(); return { x: (r.left - W.left) / s, y: (r.top - W.top) / s, w: r.width / s, h: r.height / s }; };
// 镜头：把窗口里 (px, py) 推到屏幕中间；s=1 回到全景
const tx = 195 - 16 - px * s, ty = 410 - 54 - py * s;
win.animate([{ transform: `translate(${cx}px,${cy}px) scale(${cs})` }, { transform: `translate(${tx}px,${ty}px) scale(${s})` }], { duration: 900, easing: "cubic-bezier(.65,0,.25,1)", fill: "forwards" });
// 小家伙只站在元素的上沿：落点 = rel(el).y；跳 = 二次贝塞尔 13 个关键帧 + 起跳落地各一帧压扁
```

## 一眼认出（不能改）

- 两种分辨率打架：高清抗锯齿的界面 + 硬边大像素的小家伙
- 两个演员，没有手：光标是用户，小家伙是软件
- 小家伙只站在真实元素的上沿（标题字、按钮、列表行），位置每次量 DOM
- 窗口浮在桌布上，圆角 + 大软阴影；点击时镜头推近，看完拉回全景
- 底部一颗说明胶囊：录制红点 + 时间码 + 当前步骤

## 颜色

- 界面用产品自己的颜色（这里白底黑字 + 蓝 `#3D6BFF`）
- 小家伙用界面里没有的饱和色：橙 `#FF8A3D` + 黄天线 + 粉脸蛋
- 桌布：浅蓝 → 浅紫 → 浅杏；叠加层（胶囊、气泡）是白色毛玻璃

## 字体

- 界面：Inter + Noto Sans SC；时间码、编号：JetBrains Mono
- 小家伙的气泡：Noto Sans SC 900，白底 2px 黑边

## 真图怎么处理

- 原图照常放在界面里（就是产品本身的样子），不做风格化；风格全在镜头、光标和小家伙上

## 动效

- 一遍脚本约 12s，循环：① 光标去点头条（镜头推近 1.25 倍）→ ② 小家伙跳上标题、走一遍，荧光笔跟着划 → ③ 镜头拉回，小家伙跳到按钮上踩下去，按钮变「播放中」→ ④ 列表往下滚，小家伙跳到第一行指着热度 → 回到顶栏坐好
- 小家伙：走路 2 帧 130ms 一换；起跳和落地各压扁一帧；指东西换「伸手」帧
- 光标：缓入缓出移动，点击缩到 .8 并放一个蓝圈
- 镜头推近别超过 1.3（手机竖屏会裁掉字）；看完就拉回

## 组件

- 桌布 + 浮窗 App（顶栏、头条卡、播放按钮、列表、底栏，都是真界面）
- 小家伙：12×11 像素精灵，五帧（站、走、跳、压扁、伸手）+ 气泡
- 光标：macOS 箭头 SVG + 投影
- 说明胶囊：● 时间码 + ①~④ 步骤
- 点桌布空白处重放

## 换到别的东西上

- 视频：原版就是这个——产品演示、功能介绍、更新日志，45~75s
- 网页：落地页首屏放一段循环录屏；引导页、空状态里放小家伙
- App：新手引导时让小家伙带一遍，之后待在顶栏

## 容易做坏

- 小家伙的位置手写死，界面一变就飘在空中
- 小家伙画得太细（要大方块，至少 4px 一格）
- 镜头推太近，标题被裁
- 用截图当界面（必须是能动、能变的真界面）

## 参考实现

页面（`gallery/s-screencast.html`）：`rel()` / `cam()` / `moveCur()` / `click()` / `walkTo()` / `hopTo()` / `say()`、`tour()` 脚本、`FR` 五帧精灵
