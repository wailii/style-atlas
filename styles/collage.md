# 纸拼贴（collage）

剪报、黑白网点照片、胶带、红色马克笔，一块块纸按定格动画的节奏落到桌上。Vox 讲解片的样子。

出处：Alisa0808/vox-director（2.4k★，Vox 风纸拼贴讲解片 skill）；pyang5166/gbro-collage-broll（1.5k★，半调纸拼贴 B-roll）。

## 直接抄

```css
:root { --bg:#ebe3d0; --paper:#fbf8f0; --ink:#141210; --red:#e2402b; --mustard:#f1b73a; --gray:#6e675b; }
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Special+Elite&family=Noto+Sans+SC:wght@500;700;900&family=Noto+Serif+SC:wght@600;900&display=swap");
.scrap { filter: drop-shadow(0 1px 0 rgba(40,30,10,.10)) drop-shadow(1.5px 3px 2.5px rgba(40,30,10,.22)); } /* 外层：阴影 */
.scrap > .pp { clip-path: polygon(...撕边...); }                                                            /* 内层：撕边 */
```
```js
halftoneCutout(canvas, img, { cell:5, rim:8 })   // 头图；小图 cell 3.4 rim 4
// 落下：0.5s steps(6)；常驻抖动每 167ms ±0.45px ±0.25°
```

## 一眼认出（不能改）

- 所有东西都是撕边的纸片，带投影
- 照片是黑白网点，带白色纸边，用胶带贴住
- 动作是一顿一顿的（12 帧/秒），落定后还在微微抖
- 标题拆成一条条剪下来的纸条，像勒索信
- 别和「孔版印刷」混：孔版是两色套印，这里是剪贴实物

## 颜色

- 桌面 `#EBE3D0`，纸 `#FBF8F0`，墨 `#141210`，灰 `#6E675B`
- 红 `#E2402B`（马克笔、贴纸）、芥末黄 `#F1B73A`（便签、按钮）
- 胶带 `rgba(236,222,180,.78)` multiply
- 放心改：红和黄换成品牌色；不能改：照片必须黑白网点

## 字体

- 纸条标题：Noto Sans SC 900
- 摘要（打字纸）：Noto Serif SC 600，带横格线
- 编号、拉丁字：Anton；标签：Special Elite（打字机）——它没有中文，中文会落到后面的 Noto Serif SC，写 font-family 时两个都要写
- 大标题做勒索信：每个字一块纸，字体、底色、角度都不同

## 底和纹理

- 桌面：纸纤维短线 + 噪点 multiply

## 真图怎么处理

- `halftoneCutout()`：先画一圈撕边白纸（3px 抖动），再在里面印网点；头图网点 5px、小图 3.4px，45°，黑点印在 `#EFE8D8` 上
- 小图斜放 ±3°，上面贴一条胶带

## 线和形

- 撕边：`tornPoly()` 沿四边每 5px 往里随机缩 0～2.6px，做成 clip-path
- 投影：clip-path 会把 drop-shadow 一起裁掉，所以外层包一层负责阴影和角度，内层负责撕边
- 胶带：两头锯齿的 clip-path 长条
- 马克笔圈：rough.js ellipse，红色 3.2px，roughness 2.2

## 动效

- 落下：从偏移 + 放大 1.14 + 斜着的位置，用 `steps(6)` 在 0.5s 里落到位——12 帧/秒下就是 6 帧，进度依次 0、1/6…5/6，第 7 帧到位；不透明度在前 20% 里从 0 到 1（视频里用 `Engines.dropAt`）
- 常驻：每 167ms（12 帧/秒下每 2 帧）给每块纸重摆一次 ±0.45px、±0.25°（390 宽设计空间里的像素；视频里用 `Engines.jitterAt`）
- 马克笔：`steps(8)` 画出来
- 点击：卡片 `steps(3)` 一顿 + 放大 1.03
- 不用顺滑缓动

## 组件

- 主按钮：芥末黄纸片 + ▶ + 打字机字；播放时红色音量条按 8 帧/秒跳
- 主卡：大网点照片 + 两条胶带 + 红色圆贴纸编号 + 纸条标题 + 横格纸摘要 + 黄色便签数据
- 列表：每条一张撕边白纸，角度交替 ±0.4～0.8°；左上黑纸条「Nº 02」；右边网点小图；没图就用大字纸片（品牌色底 + Anton 字）
- 底栏：上沿撕开的黑纸条，当前项后面垫一块红纸

## 换到别的东西上

- 网页：首屏是一张拼贴海报，滚动时纸片一块块落下
- 视频：Vox 讲解片节奏；镜头在桌面上平移；声音用纸张摩擦、啪的落纸声、撕胶带声、木琴或低音提琴
- 海报：纸条标题 + 网点照片 + 一个红圈

## 容易做坏

- 纸条标题要在字体加载后再按宽度断行；最后一行只剩一两个字时收窄行宽重排
- 截摘要别把英文词切成半截（用 `clip()`，或停在逗号）
- 网点对亮底 logo 墙、几乎全黑的图效果差：调 `halftoneCutout` 的 `gamma` / `from` / `to`，或者换一张有明暗层次、有主体的图
- 文字纸条角度超过 1.5° 就难读
- 照片保留彩色就变成普通相册

## 参考实现

引擎（`gallery/engines.js`）：`Engines.tornPoly()` / `tear()`（撕边）、`halftoneCutout()`（网点照片）
页面（`gallery/s-collage.html`）：`drop()`（定格落下）、抖动计时器、勒索信标题
