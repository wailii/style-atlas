# City Pop（citypop）

80 年代日本动画和唱片封面：晴天、条纹太阳、椰子树、泳池，平涂描线的画面，按 12 帧/秒一下一下地动。

出处：lemo-opuscar 风格库 cel-anime-80s（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/cel-anime-80s/STYLE.md）。

## 直接抄

```css
:root { --sky:#3cb4e6; --sky2:#9ee0f7; --pool:#4fd2cf; --pink:#ff6fa3; --sun:#ffd23f; --palm:#10614f; --ink:#17324d; --white:#fffdf7; --orange:#ff8a3d; }
@import url("https://fonts.googleapis.com/css2?family=Righteous&family=Noto+Sans+SC:wght@500;700;900&display=swap");
.logo { font-weight:900; font-style:italic; transform:skewX(-8deg); color:#fff; -webkit-text-stroke:2px var(--pink); paint-order:stroke fill; text-shadow:4px 4px 0 var(--pink), 8px 8px 0 rgba(23,50,77,.25); }
/* 节奏 */ 83ms 一帧；弹出用 steps(4~6)
```

## 一眼认出（不能改）

- 顶上一片晴天场景：条纹太阳、白云、椰子树剪影、泳池高光
- 图是平涂色块 + 深色描线（赛璐璐）
- 所有卡片：深色描边 + 彩色硬投影（不模糊）
- 斜体描边的大标题，带两层错位阴影
- 星光 ✦ 一闪一闪

## 颜色

- 天蓝渐变只用在天空；其余全是平涂
- 每行一个颜色（粉、泳池绿、太阳黄、天蓝、橙）当硬投影色

## 字体

- 数字和英文：Righteous；中文：Noto Sans SC 700 / 900；标题斜体加描边

## 真图怎么处理

- `posterCanvas(img, w, h, CEL, { edge: .18, edgeInk: "#17324d", soft: 3 })`，调色板见 `s-citypop.html` 的 `CEL`

## 线和形

- 描边统一 2～3px 深蓝 `#17324D`
- 太阳：圆 + 横向条纹遮罩
- 云：胶囊 + 两个圆
- 椰子树：一组叶片路径

## 动效

- 12 帧/秒的手感：标题先压扁再弹开（`steps(4)`，0.42s）；卡片 `steps(5~6)` 一顿一顿落位
- 常驻：云按格平移、椰子树 ±1.7° 摆、水面高光两档闪
- 星光：`steps(4)` 放大、转、缩没，间隔 0.6～1.4s
- 按下：卡片往硬投影方向挪 3px，投影变短

## 组件

- 主按钮：白色胶囊粉字 + 深色硬投影；播放中变粉底白字
- 主卡：「眼招」卡（3px 描边、6px 粉色硬投影）+ 歪着贴的黄色编号贴纸
- 列表：每行一张描边卡，编号用该行颜色 + 描边
- 底栏：黄色药丸弹到当前项

## 换到别的东西上

- 网页：首屏一整幅晴天场景；滚动时视差
- 视频：80 年代动画片头的感觉；声音用 City Pop（slap bass、电钢琴、铜管）、闪光音
- 适合：音乐、度假、潮牌、夏日活动

## 容易做坏

- 渐变用到天空以外
- 描边粗细不一
- 动作做得太顺滑反而不像手绘动画

## 参考实现

`gallery/s-citypop.html`：场景（太阳、云、椰子树、泳池）、`twinkle()`
