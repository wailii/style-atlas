# 橡皮管卡通（rubberhose）

1930 年代黑白有声动画：水管一样没有关节的胳膊腿、白手套、切了一角的饼形眼睛；所有东西跟着音乐一伸一缩；老胶片的颗粒和划痕。

出处：lemo-opuscar 风格库 rubber-hose（https://github.com/lemomo-ai/lemo-opuscar/blob/main/styles/rubber-hose/STYLE.md）。

## 直接抄

```css
:root { --paper:#e6e0d3; --g1:#cfc8b9; --g2:#a9a294; --g3:#77716a; --ink:#141210; --white:#fbf9f3; }
@import url("https://fonts.googleapis.com/css2?family=Rye&family=Noto+Sans+SC:wght@500;700;900&family=Noto+Serif+SC:wght@700;900&display=swap");
.outline { -webkit-text-stroke: 5px var(--ink); paint-order: stroke fill; color: var(--white); }   /* 白字黑描边 */
.ui { filter: brightness(var(--fl)) contrast(1.1) grayscale(1); }
```
```js
// 12 帧/秒总时钟；一拍 = 6 帧（120 拍/分）；压扁量 sq：拍子前半 1 - .07·sin，后半 1 + .05·sin
```

## 一眼认出（不能改）

- 严格黑白灰，没有任何色相
- 角色：水管胳膊腿（粗细一致、圆头）、四指白手套、饼形眼、咧嘴笑、大黑鞋
- 所有东西踩着拍子压扁、弹起（squash & stretch）
- 线条轻微抖（三版轮换，12 帧/秒）
- 胶片：颗粒、闪、晃、竖划痕、灰尘、圆角画框和暗角

## 颜色

- 6 级暖灰 + 角色专用的白和黑；背景只用中间灰，最亮最暗留给角色

## 字体

- 数字、英文：Rye（老式木刻字）
- 标题：Noto Sans SC 900 白字 + 5px 黑描边；说明 Noto Serif SC

## 真图怎么处理

- 灰度 + 对比 1.35 + 提亮，放进椭圆画框（几圈黑白相间的环，像片尾那个圈）

## 动效

- 12 帧/秒：线条换版、卡片压扁弹起、横幅上下颠、标签缩放
- 吉祥物：身子颠、腿交替踢、一只手指着头条、一只手举牌子；播放时摇牌子；每 3 秒眨一次眼
- 开场：画面从一个圆打开（`steps(11)`）；卡片一张张蹦进来

## 组件

- 头部：灰色飘带横幅 + 白字黑边标题；右边吉祥物（小电视）举「听」牌
- 主卡：椭圆画框（黑白圈）+ 白底黑边的热度标签 + 标题
- 列表：白底黑粗边圆角卡、右下一道灰色形影、白字黑边的大号数字、椭圆小图
- 底栏：灰底，当前项黑底白字

## 换到别的东西上

- 网页：吉祥物当导航员，站在页面角落指来指去
- 视频：照 lemo 规格——4:3 画框、12 帧/秒、所有东西跟音乐跳；声音用爵士大乐队、木琴、滑哨、口哨
- 儿童、游戏、复古品牌活动

## 容易做坏

- 加了颜色（哪怕一点）
- 胳膊画出肘关节
- 背景比角色还白或还黑，角色就不跳出来
- `const` 声明和 common.js 里的函数同名会直接报错（这个页面踩过）

## 参考实现

页面（`gallery/s-rubberhose.html`）：`MASCOT`（小电视角色 SVG）、`glove()`（手套）、12 帧总时钟 `frame()`（拍子、角色、胶片）、三个抖线滤镜 `#bo0/1/2`
