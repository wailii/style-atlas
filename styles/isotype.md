# 象形统计（isotype）

1920 年代维也纳的图示统计法：一个实心小符号代表固定数量，数量多就多排几个，不满一个就切掉一截；不放大缩小符号，只数个数。配色少而平，像老海报。顶上加一条现代的几何图案带。

出处：Otto Neurath 与 Gerd Arntz 的 Isotype（https://en.wikipedia.org/wiki/Otto_Neurath）；lemo-opuscar 风格库 pictogram-motion（几何图形带、整行错开，https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/pictogram-motion/STYLE.md）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
:root { --paper:#f1ede2; --ink:#1e1e1e; --red:#cf3a2b; --blue:#2b5c9e; --ochre:#e0a12a; --grey:#8d877a; }
.r { display: grid; grid-template-columns: 76px 1fr 30px; gap: 8px; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(30,30,30,.15); }
.r .icons { display: flex; flex-wrap: wrap; gap: 2px; }  .r .icons svg { width: 19px; height: 19px; }
.ch h2 { border-bottom: 2px solid var(--ink); font-weight: 900; }   /* 图名 + 右边「符号 = 数量」图例 */
.band { border-top: 2px solid var(--ink); border-bottom: 2px solid var(--ink); }   /* 顶部图案带：圆、半圆、方格，同一色相五个深浅 */
```

```js
// 符号：实心剪影，没有描边和渐变
const ICON = {
  paper: (c) => `<path d="M3 3 H17 V21 H5 A2 2 0 0 1 3 19 Z M17 8 H21 V19 A2 2 0 0 1 17 21 Z" fill="${c}"/><path d="M6 7 H14 M6 11 H14 M6 15 H11" stroke="#f1ede2" stroke-width="1.8"/>`,
  man: (c) => `<circle cx="12" cy="4.4" r="3.4" fill="${c}"/><path d="M6.5 9 H17.5 L16.2 16 H14.6 V23 H12.6 V16.5 H11.4 V23 H9.4 V16 H7.8 Z" fill="${c}"/>`,
  fire: (c) => `<path d="M12 2 C14 7 19 9 19 15 A7 7 0 0 1 5 15 C5 11 8 10 8 6 C10 8 10 10 11 11 C12 8 11 5 12 2 Z" fill="${c}"/>`,
};
// 一行 = 整数个完整符号 + 最后一个按比例切掉（四分之一取整）
const row = (k, c, v, unit) => { const n = v / unit, full = Math.floor(n), f = Math.round((n - full) * 4) / 4; return sym(k, c).repeat(full) + (f > 0 ? sym(k, c, f) : ""); };
// 盖章：一行一行、从左到右，每个 steps(2) 弹一下
s.animate([{ transform: "scale(0)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], { duration: 160, delay: 300 + si * 500 + ri * 70 + i * 32, easing: "steps(2, end)", fill: "backwards" });
```

## 一眼认出（不能改）

- 一个符号 = 固定数量，图例写在图名右边（「■ = 1 家来源」）
- 数量用符号个数表示，不用条形长短、不缩放符号
- 不满一个单位的部分把符号切掉一截
- 实心剪影符号、平涂、四五种颜色
- 每张图一种颜色；同一种符号永远同一种意思

## 颜色

- 纸 `#F1EDE2`；墨 `#1E1E1E`
- 红 `#CF3A2B`（人）、蓝 `#2B5C9E`（来源）、赭黄 `#E0A12A`（热度）；灰 `#8D877A` 注释
- 图案带：蓝的五个深浅 `#1E3F6E` `#2B5C9E` `#4F7CBA` `#86A6D3` `#C1D0E6`

## 字体

- Jost（几何无衬线，像 Futura）+ Noto Sans SC 900

## 真图怎么处理

- 封面压成四五种平涂色（`posterCanvas`，和符号同一套颜色），2px 黑框

## 动效

- 符号一个个「盖章」出来：每个 160ms、steps(2) 弹一下，按行、按图依次
- 顶部图案带两行反方向左右错开（2.6s 往复）
- 封面 steps(6) 从左擦出
- 点一行：浅灰底 + 展开全标题

## 组件

- 图案带 + 小标签「ISOTYPE · 图示统计」+ 两行大标题 + 一句说明
- 头图：平涂封面 + 一个大红数字和一句话
- 三张图：谁在报道（报纸）/ 多少人在聊（小人，1 = 10 人）/ 有多热（火，1 = 50）
- 每行：短名 + 符号 + 数字；底部一句「切掉的部分是什么意思」

## 换到别的东西上

- 网页：科普数据、年报、公益、人口和资源类话题
- 视频：符号一个个蹦出来，跟着鼓点；整行错开当转场
- 海报、PPT：天然合适

## 容易做坏

- 用放大缩小符号来表示数量
- 符号有描边、渐变、立体感
- 一张图里好几种颜色
- 单位选得不好：一行几十个符号，或者全都不满一个

## 参考实现

页面（`gallery/s-isotype.html`）：`ICON` / `sym()` / `row()`、`bandRow()`、盖章动画
