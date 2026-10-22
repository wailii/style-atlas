# 黏土风（clay）

所有东西像捏出来的软黏土：大圆角、鼓起来、左上亮右下暗、软软的投影；粉彩糖果色；按下去会被捏扁再弹回来。

出处：nextlevelbuilder/ui-ux-pro-max-skill（风格表里的 Claymorphism / Claymorphism (Mobile)：soft 3D、chunky、playful、toy-like）。

## 直接抄

```css
:root { --bg:#efeafd; --ink:#3b3355; --mute:#7d7499; --pink:#ffd3df; --blue:#cfe7ff; --mint:#d3f5e2; --butter:#fff0c2; --lilac:#e3d9ff; --peach:#ffe0cc; }
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.clay { background: var(--c); border-radius: var(--r, 28px); box-shadow: 0 16px 28px -14px rgba(70,50,130,.45), inset -7px -9px 14px rgba(60,40,110,.12), inset 7px 9px 14px rgba(255,255,255,.8); transition: transform .45s cubic-bezier(.34,1.8,.5,1); }
.well { box-shadow: inset 5px 7px 12px rgba(60,40,110,.22), inset -5px -6px 10px rgba(255,255,255,.7); }   /* 凹下去的槽，放图 */
.squish:active { transform: scale(.94,.9); transition-duration: .1s; }
```

## 一眼认出（不能改）

- 鼓：外软投影 + 内左上白高光 + 内右下暗
- 大圆角（≥ 22px，按钮全圆）
- 粉彩糖果色，一块一个颜色
- 图片放在「凹槽」里
- 动作软、有弹性：鼓起来、捏扁、回弹

## 颜色

- 淡紫底 `#EFEAFD`；字 `#3B3355`
- 粉、蓝、薄荷、奶黄、淡紫、蜜桃；每张卡一种

## 字体

- Baloo 2（圆润，数字、英文）+ Noto Sans SC 700 / 900

## 真图怎么处理

- 原图稍微提饱和（1.15），放进凹槽（圆角 22px + 内阴影）

## 动效

- 入场「鼓起来」：scale .3 → (1.12, .88) → (.95, 1.06) → 1，0.7s
- 按下「捏扁」：scale(.94, .9)，松手弹回
- 常驻：编号硬币上下浮、播放球左右摇
- 底栏选中项鼓起来、上浮 3px

## 组件

- 主按钮：淡紫胶囊 + 一颗鼓起来的播放球（径向渐变 + 白色高光）
- 主卡：白色黏土卡 + 凹槽图 + 奶黄编号硬币 + 两个糖果色小药丸
- 列表：每条一张彩色黏土卡，白色圆编号，凹槽小图
- 底栏：浮在底部的白色黏土条，选中项鼓起来

## 换到别的东西上

- 网页：儿童教育、健康、轻松的消费产品；首屏放几个 3D 黏土图标
- 视频：图标弹跳、捏扁的转场；声音用软软的「啵」、木琴
- 不适合要显得专业严肃的场合

## 容易做坏

- 阴影太重像脏
- 颜色太艳就不软了
- 动作用直线缓动

## 参考实现

页面（`gallery/s-clay.html`）：`.clay` / `.well` / `.squish`、`inflate()`、播放球 SVG
