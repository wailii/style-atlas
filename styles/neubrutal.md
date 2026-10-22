# 新粗野主义（neubrutal）

奶油底、3px 黑粗边、实心黑投影、高饱和平涂色、歪着的贴纸、跑马灯；按下去像掉进自己的影子里。

出处：nextlevelbuilder/ui-ux-pro-max-skill（13.8 万★ 的 UI 设计 skill，风格表里的 Neubrutalism / Neo Brutalism (Mobile)）；2026 网页设计趋势（新粗野主义从整页风格转为强调用法，见 https://www.netguru.com/blog/modern-web-design-trends）。

## 直接抄

```css
:root { --bg:#fff4e0; --ink:#111; --yel:#ffd23f; --pink:#ff7ab6; --blue:#6c8cff; --green:#4ade80; --orange:#ff8a3d; --purple:#b497ff; --b:3px solid var(--ink); --sh:5px 5px 0 var(--ink); }
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Archivo+Black&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.box { border: var(--b); box-shadow: var(--sh); transition: transform .08s, box-shadow .08s; }
.press:active { transform: translate(5px,5px); box-shadow: 0 0 0 var(--ink); }
```
```js
POP = "cubic-bezier(.34,1.8,.5,1)"   // 弹出：scale(.6) rotate(±6deg) 无影子 → 正、有影子，0.45s
```

## 一眼认出（不能改）

- 每个块都有 3px 黑边 + 不模糊的黑色硬投影
- 平涂高饱和色，没有渐变
- 东西有点歪：贴纸、标签、标题字块转 ±2～6°
- 跑马灯滚动条
- 按下去 = 往右下挪 5px、影子消失

## 颜色

- 奶油底 `#FFF4E0` + 点阵；黑 `#111`
- 6 种色块：黄、粉、蓝、绿、橙、紫；每张卡一种
- 放心改：色块换品牌色（保持高饱和）；不能改：黑边黑影

## 字体

- Archivo Black（数字、跑马灯）+ Space Grotesk + Noto Sans SC 900

## 真图怎么处理

- 原图，不处理，套 3px 黑边

## 动效

- 快、硬：没有缓出拖尾，弹出带过冲
- 入场：每块从歪着、缩小、没有影子「啪」地弹到位
- 常驻：跑马灯 22s 一圈；星形贴纸慢转
- 点卡片：左右晃一下

## 组件

- 主按钮：粉色胶囊 + 黑边硬影
- 头部：「AI」在歪着的黄色块里
- 主卡：白卡 + 黑边图 + 橙色星形「HOT #1」贴纸 + 标题重点词黄底下划线 + 两个色块数字卡
- 列表：每条一种底色的卡，黑色圆编号，白色小标签
- 底栏：图标 + 字，当前项黄底黑边硬影

## 换到别的东西上

- 网页：最常见的用法——落地页的按钮、价格卡、标签；整页铺满会累，可以只用在行动按钮上
- 视频：硬切 + 弹出，配鼓点；声音用短促的 UI 音、军鼓
- 适合年轻、创作者、工具类；不适合金融、医疗、偏保守的受众

## 容易做坏

- 投影加了模糊（就成普通卡片了）
- 颜色降饱和
- 太多倾斜，读起来累

## 参考实现

页面（`gallery/s-neubrutal.html`）：`.box` / `.press`、`burst()`（星形贴纸）、`pop()` 入场、跑马灯
