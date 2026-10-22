# 墨水屏（eink）

像在电子书阅读器上看：纸灰底、16 级灰、图片抖动成颗粒；没有渐变、没有阴影、没有过渡动画；翻页时屏幕黑一下白一下再出内容，偶尔留一点上一页的残影。安静、专注。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表第 56 行 E-Ink / Paper）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,600;7..72,700&family=Noto+Serif+SC:wght@400;600;900&display=swap");
:root { --paper:#e9e8e2; --ink:#1b1b1b; --g1:#3a3a3a; --g2:#6b6b6b; --g3:#a3a3a0; --g4:#cfcec8; }
canvas { image-rendering: pixelated; }
.txt { font-size: 15.5px; line-height: 1.85; text-align: justify; text-indent: 2em; }
.ghost { opacity: .07; }                                     /* 上一页的残影 */
.tools { border: 1.5px solid var(--ink); }  .tools button + button { border-left: 1.5px solid var(--ink); }
.tools button.on { background: var(--ink); color: var(--paper); }   /* 状态变化：直接反色，没有过渡 */
/* 不要：transition、box-shadow、渐变、圆角大于 2px */
```

```js
// 16 级灰 + Floyd–Steinberg 误差扩散；bits=1 是刷新第一拍的黑白版
const q = Math.round(o / 255 * n) * (255 / n), e = o - q;  L[i+1] += e*7/16; L[i+w-1] += e*3/16; L[i+w] += e*5/16; L[i+w+1] += e/16;
// 全刷：黑 → 白 → 内容（380ms，全是硬切）；局部刷：内容反色 70ms 再正过来
f.animate([{ opacity: 1, background: "#1b1b1b" }, { background: "#1b1b1b", offset: .35 }, { background: "#e9e8e2", offset: .36 }, { opacity: 1, offset: .7 }, { opacity: 0, offset: .71 }, { opacity: 0 }], { duration: 380, easing: "linear" });
```

## 一眼认出（不能改）

- 纸灰底 + 纯黑字，只有灰阶
- 图片是 16 级灰的抖动颗粒
- 分页，不滚动；底部页码 + 细进度条 + 「约 N 分钟读完」
- 翻页闪一下（黑 → 白 → 内容）；局部刷新留淡淡残影，每 4 次全刷一次清掉
- 所有状态变化都是硬切，没有缓动

## 颜色

- 纸 `#E9E8E2`；墨 `#1B1B1B`；灰 `#3A3A3A` `#6B6B6B` `#A3A3A0` `#CFCEC8`
- 不用任何彩色

## 字体

- Literata（专为长时间阅读做的衬线）+ Noto Serif SC

## 真图怎么处理

- 16 级灰 Floyd–Steinberg 抖动（`eink(img, w, h, 4)`）；白映射到纸色、黑映射到墨色
- 刷新时先画 1 位黑白版，160ms（全刷 420ms）后换成 16 级

## 动效

- 只有刷新：全刷 380ms 黑白闪；局部刷 140ms 反色一下
- 翻页：点屏幕右 2/3 下一页、左 1/3 上一页，或底部按钮
- 按钮：直接反色

## 组件

- 顶栏：时间 + 电量（线框电池）
- 刊头：标题 + 日期 + 1.5px 黑线
- 文章页：第几条 / 标题 / 抖动图 + 图注 / 首行缩进正文
- 目录页：编号 + 标题 + 热度，选中行反色
- 底栏：页码 + 进度条 + 阅读时间；四格按钮（上一页 / 朗读 / 目录 / 下一页）

## 换到别的东西上

- 网页：长文阅读、文档、笔记、「专注模式」
- 桌面组件：天气、日程、待办（墨水屏小摆件的样子）
- 视频：几乎不动，适合字幕型解说

## 容易做坏

- 加了过渡动画，就不像墨水屏了
- 图片用平滑灰度而不是抖动
- 用了彩色强调
- 做成可以滚动的长页

## 参考实现

页面（`gallery/s-eink.html`）：`eink()` 抖动、`show()` 全刷 / 局部刷 / 残影、`PAGES` 分页
