# 浮世绘（ukiyo）

普鲁士蓝的浪在顶上起伏，木版平涂的色块，竖排题签和红色圆印。

出处：lemo-opuscar 风格库 ukiyoe（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/ukiyoe/STYLE.md）。

## 直接抄

```css
:root { --paper:#f1e6cd; --blue:#22406b; --blue2:#6c8db3; --pale:#c9d8df; --red:#cc4a2c; --ochre:#d8a443; --ink:#1d1b19; }
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700;900&display=swap");
.cart { writing-mode: vertical-rl; background: var(--ochre); border: 2px solid var(--ink); box-shadow: inset 0 0 0 3px var(--ochre), inset 0 0 0 4px var(--ink); }
```
```js
UKIYO = ["#1d1b19","#22406b","#6c8db3","#c9d8df","#f1e6cd","#f6eedb","#cc4a2c","#d8a443","#8a6d48"]
posterCanvas(img, W, H, UKIYO, { edge:.22, soft:4 })
crest(x,t) = 62 + 16·sin(x/46 + t) + 7·sin(x/19 − 1.4t) + 4·sin(x/9 + 2.1t)   // 浪
```

## 一眼认出（不能改）

- 普鲁士蓝的浪，浪尖白沫，浪身有青海波纹
- 图像是几块平色 + 黑线（木版套色）
- 黄底黑框的竖排题签
- 天空有一条从蓝到透明的晕染（ぼかし）
- 纸有木纹

## 颜色

- 纸 `#F1E6CD`，蓝 `#22406B`，浅蓝 `#6C8DB3`，灰蓝 `#C9D8DF`，朱 `#CC4A2C`，赭黄 `#D8A443`，墨 `#1D1B19`
- 唯一允许的渐变：顶部天空、图片上沿的蓝色晕染
- 放心改：朱和赭的深浅；不能改：主色是普鲁士蓝

## 字体

- Noto Serif SC 500 / 700 / 900
- 题签竖排，题签里的拉丁字母用 `text-combine-upright: all` 横放

## 底和纹理

- 木纹：canvas 画横向淡色长条；噪点 multiply

## 真图怎么处理

- `posterCanvas(img, w, h, UKIYO, { edge: .22, soft: 4 })`：按 9 色调色板取最近色、不抖动，亮度变化大的地方描黑线
- 图片外面一圈 2px 黑框 + 6px 米色边；上沿叠蓝色晕染

## 线和形

- 浪：两层路径，每帧按几个正弦叠加算形状；前层用青海波图案（SVG pattern 同心圆弧）填充
- 白沫：在浪尖位置画一串递减的小圆
- 分隔：青海波一排（两层 radial-gradient）
- 底栏上沿：一排小半圆，像浪

## 动效

- 常驻：浪一直起伏（几个正弦相加，前后两层速度不同）
- 进场：每块像一版一版压上去——clip-path 从上往下 + 下移 4px，0.7s
- 印章、题签：放大斜着「盖」下来，0.36s
- 播放时红印上下浮

## 组件

- 主按钮：红色圆印「听」，内圈一道白线
- 主卡：木版图 + 红色圆印编号「一」+ 标题（重点字朱色）
- 列表：竖排编号框（赭黄底，选中变朱）+ 标题 + 木版小图（没图就蓝底白字一个汉字）
- 底栏：蓝底，当前项右上一个红点

## 换到别的东西上

- 网页：首屏大浪横跨整屏；滚动时浪往后退
- 视频：长卷横摇、浪当转场；声音用三味线、太鼓、浪声
- 海报：浪 + 题签 + 一方印

## 容易做坏

- 竖排里拉丁字母会横躺——用 text-combine-upright
- 渐变用在天空以外的地方会像手机壁纸
- 朱红用多了像中国风

## 参考实现

`gallery/s-ukiyo.html`：`waveD()` / `drawWave()`（浪）、`SEIGAIHA` 图案、`press()` / `stamp()`
