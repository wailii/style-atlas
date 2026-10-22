# 立体书（popup）

翻开这一页，纸片一层层从折缝里立起来，影子跟着变深；立好后整页轻轻转。

出处：lemo-opuscar 风格库 paper-popup（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/paper-popup/STYLE.md）。

## 直接抄

```css
:root { --page:#fbf5e9; --page2:#f4ead6; --ink:#2f2a26; --coral:#f28b6e; --mint:#8fd1b8; --sky:#8ec3f0; --butter:#f7d774; --lilac:#b9a6e8; }
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.card { background:#fffaf0; border-radius:10px; box-shadow: 0 2px 0 #e3d6bd, 0 8px 16px -8px rgba(80,60,30,.35); }
.stage { perspective:820px; perspective-origin:50% 0; } .base { transform: rotateX(58deg); transform-style: preserve-3d; }
.lay { transform-origin:50% 100%; } /* 0deg 躺着 → -62deg 站起 */
```
```js
SPRING = "cubic-bezier(.3,1.55,.45,1)"  // 0.9s，层间隔 160ms
```

## 一眼认出（不能改）

- 主视觉是一个斜放的书页，上面站着 3～5 层纸片
- 纸片从平躺翻到站立，带弹簧过冲
- 纸有厚度：底边一道深色硬边 + 柔和投影
- 粉彩纸色；拉签、书签式底栏
- 别和「等距积木」混：积木是方块堆叠，这里是薄纸片站起来

## 颜色

- 页 `#FBF5E9` / `#F4EAD6`，字 `#2F2A26`
- 纸片五色：珊瑚 `#F28B6E`、薄荷 `#8FD1B8`、天蓝 `#8EC3F0`、奶黄 `#F7D774`、淡紫 `#B9A6E8`
- 卡片 `#FFFAF0`，厚度 `box-shadow: 0 2px 0 #E3D6BD, 0 8px 16px -8px rgba(80,60,30,.35)`

## 字体

- Noto Sans SC 700 / 900；数字 Fredoka 600 / 700
- 标题每个字一块彩纸

## 真图怎么处理

- 真图印在一张卡上，四周 8px 白边、圆角 6px；小图同理
- 不做风格化处理，纸感来自卡片和投影

## 线和形

- 3D：舞台 `perspective: 820px`，书页 `rotateX(58deg)` + `transform-style: preserve-3d`
- 纸片 `transform-origin: 50% 100%`，从 `rotateX(0)`（躺着）到 `rotateX(-62deg)`（站起）
- 地上的影子是压扁的放射渐变，跟着纸片一起出现
- 装饰：纸做的树、丝带（两头燕尾的 clip-path）

## 动效

- 弹簧 `cubic-bezier(.3,1.55,.45,1)`，0.7～0.9s
- 书页先从 84° 放倒到 58°，纸片按层次每隔 160ms 立起
- 常驻：整页绕法线 ±3° 慢转 + 手指拖动视差
- 列表卡滚进来时从桌面翻起（rotateX 80→0），小图再单独立起来
- 按钮：拉签往外拉

## 组件

- 主按钮：插在槽里的拉签，点了往外拉
- 主卡：立体场景（封面卡 + 「今日头条」丝带 + 树 + 编号圆牌）
- 列表：白卡 + 彩色小圆角编号 + 右侧伸出的拉签
- 底栏：五色书签，当前那张往上冒

## 换到别的东西上

- 网页：首屏一个大场景，滚动时翻到下一页、新的一组纸片立起
- 视频：镜头在场景里推拉、绕；声音用翻页声、纸折声、八音盒或钢片琴
- 贺卡 / 礼物页：最合适

## 容易做坏

- preserve-3d 元素上不能设 opacity 和 filter，会被拍平——淡入淡出加在外层
- 站着的纸片上别放长字
- 层数超过 5 层会乱

## 参考实现

`gallery/s-popup.html`：`.stage / .base / .lay / .sh` 的 3D 结构、`sway()` 视差
