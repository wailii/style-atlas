# Frutiger Aero（aero）

2000 年代中后期的科技感：蓝天白云、绿色草坡、水晶气泡、亮晶晶的 Aqua 胶囊按钮、带反光的玻璃面板、图片下面有倒影。

出处：2026 网页设计趋势里的 Frutiger Aero 怀旧回潮（https://www.gleamstudio.design/blog-post/design-trends-2026、https://theplusaddons.com/blog/web-design-trends-2026/）；nextlevelbuilder/ui-ux-pro-max-skill 风格表里的 Skeuomorphism / Y2K 系。

## 直接抄

```css
:root { --sky1:#39aef0; --sky2:#bfe9ff; --ink:#0d3a5c; --mute:#3f6f8f; --aqua1:#6fd0ff; --aqua2:#1679d6; }
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:opsz,wght@6..12,600;6..12,700;6..12,800&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.glass { background: linear-gradient(rgba(255,255,255,.72), rgba(255,255,255,.42) 50%, rgba(255,255,255,.32) 51%, rgba(255,255,255,.5)); border: 1px solid rgba(255,255,255,.9); backdrop-filter: blur(10px) saturate(1.3); border-radius: 18px; }
.aqua { border-radius: 999px; background: linear-gradient(var(--aqua1), var(--aqua2)); color:#fff; box-shadow: 0 4px 10px rgba(22,121,214,.45), inset 0 -3px 6px rgba(0,60,140,.35); }
.aqua::before { /* 上半一道白色高光 */ content:""; position:absolute; left:8%; right:8%; top:2px; height:48%; border-radius:999px; background: linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.15)); }
img { -webkit-box-reflect: below 4px linear-gradient(transparent 80%, rgba(255,255,255,.4)); }
```

## 一眼认出（不能改）

- 蓝天渐变 + 白云 + 太阳光晕 + 绿色草坡
- Aqua 胶囊按钮：蓝色、上半一道高光、一道反光扫过
- 玻璃面板：上半更亮（像反光）、细白边
- 水晶气泡、发光的圆球编号
- 图片下面有倒影

## 颜色

- 天蓝 `#39AEF0` → `#BFE9FF`，草绿 `#9DF06E` → `#2F9E3F`，字深蓝 `#0D3A5C`
- 圆球编号：蓝、绿、橙、粉、紫，都是「上半高光 + 下面发光」

## 字体

- Nunito Sans（接近 Frutiger 的人文无衬线）+ Noto Sans SC

## 真图怎么处理

- 原图，白色 2px 边 + 投影 + 下方倒影；最好配自然照片（水、草、天空）

## 动效

- 气泡从草地里冒上来、左右轻漂；云慢慢飘
- Aqua 按钮上每 4 秒扫过一道光
- 入场：玻璃块从下面浮上来、带一点弹
- 点一下：水波纹从手指处散开

## 组件

- 主按钮：Aqua 胶囊「▶ 听热点」
- 主卡：玻璃面板 + 带倒影的图 + 橙色发光圆球编号 + 两个胶囊徽章（蓝 / 绿）
- 列表：玻璃条 + 彩色圆球编号 + 白边小图
- 底栏：玻璃条，当前项变成 Aqua 胶囊

## 换到别的东西上

- 网页：饮料、户外、年轻消费品牌的怀旧活动页
- 视频：水滴、气泡、镜头光晕、清新的电子乐（Windows 开机那种）
- 不适合 B 端

## 容易做坏

- 天空和草地画得太粗糙会显廉价——要有高光、渐变层次
- 高光太多满屏发亮
- `-webkit-box-reflect` 的倒影会压到下面的字，要留足间距

## 参考实现

页面（`gallery/s-aero.html`）：`.glass` / `.aqua` / `.orb`、气泡和云的循环、`ripple()`
