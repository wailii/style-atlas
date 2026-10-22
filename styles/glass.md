# 液态玻璃（glass）

一层真的会折射的玻璃浮在真图上：边缘把背后的画面弯过去，透镜经过的地方被放大，按下去像果冻。

出处：lemo-opuscar 风格库 glass-product（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/glass-product/STYLE.md）。

## 直接抄

```css
:root { --ink:#0f1626; --mute:rgba(15,22,38,.58); --bg:#eef1f5; }
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
.glass { background: rgba(255,255,255,.16); backdrop-filter: url(#折射滤镜) blur(6px) saturate(1.7);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.75), inset 0 -1px 0 rgba(255,255,255,.25), inset 1.5px 0 0 rgba(255,255,255,.35), 0 10px 30px -12px rgba(15,22,38,.28); }
.jelly { transition: transform .5s cubic-bezier(.3,1.8,.4,1); } .jelly:active { transform: scale(1.08,.92); transition-duration: .12s; }
```

## 一眼认出（不能改）

- 玻璃后面一定是真图（整屏头图，或模糊的真封面做环境色）
- 玻璃边缘有折射：背后的画面在边上被弯过去（不只是毛玻璃）
- 透镜：一块圆玻璃在图上漂，经过处放大
- 高光：上沿 1px 白线 + 每 6 秒一道斜扫的光
- 按下压扁回弹；底栏一滴玻璃在选项之间流动

## 颜色

- 字是深墨蓝 `#0F1626`，次要文字同色 58% 透明
- 玻璃白 16%；颜色全部来自背后的真图

## 字体

- Inter 500～800 + Noto Sans SC

## 真图怎么处理

- 头图原图铺满上半屏；下面列表区放 2～3 张真封面，blur 46px、saturate 1.5、透明度 .55 当环境色
- 列表小图原图，放在玻璃里的「井」中

## 折射怎么做

- `glassFilter(w, h, { r, bezel, scale })`：canvas 生成位移贴图——圆角矩形边缘 `bezel` 像素内沿法线往里推（R/G 两个通道存横竖位移），中间不动；写成 SVG `<filter>`（feImage + feDisplacementMap，filterUnits 用 userSpaceOnUse，大小等于元素）
- 透镜：`{ lens: true }`，位移从中心往外越来越大，`scale` 70
- 用法：`backdrop-filter: url(#id) blur(5~10px) saturate(1.7)`

## 动效

- 出现：从模糊 10px、缩小 0.94 凝出来，带一点过冲
- 透镜：按两个不同频率的正弦慢慢漂
- 底栏玻璃滴：两条边各一个弹簧，移动时竖向压扁一点
- 头图出场：从 1.12 + 模糊 16px 变清楚

## 组件

- 主按钮：圆形玻璃播放键
- 头部：玻璃胶囊（标题 + 日期）
- 主卡：底部一大块玻璃（标签 + 标题 + 摘要）
- 列表：每行一块玻璃，左编号、右小图
- 底栏：浮起来的玻璃胶囊，里面一滴更亮的玻璃

## 换到别的东西上

- 网页：玻璃导航条、玻璃卡片浮在大图上；透镜跟着鼠标走
- 视频：微距、慢慢扫过的光；声音用柔和的玻璃感合成器、水滴、空气感铺底
- 适合：系统工具、音乐、相机、手机组件

## 容易做坏

- `backdrop-filter: url()` 只有 Chromium 支持，Safari / Firefox 只剩模糊——交付前说清楚，或给 Safari 加个更强的模糊兜底
- 滤镜大小必须等于元素大小，元素尺寸变了要重新生成
- 背后是纯色时玻璃什么都看不出来——一定要有真图
- 无头 Chrome 截图偶尔会把折射层画花（画面像被平铺了几遍），重截一次就好；真浏览器里没有这个问题

## 参考实现

引擎：`Engines.glassFilter()`、`makeGlass()`
页面（`gallery/s-glass.html`）：透镜漂移、底栏玻璃滴（两边弹簧）
