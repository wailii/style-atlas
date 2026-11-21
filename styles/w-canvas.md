# 无限画布（w-canvas）
点阵底的无限白板：流程框、判断、便签、文字都是可拖可缩放的对象，选中有 8 个控制点和尺寸标签，别人的光标带名字在画布上走。工具条浮在底部，缩放和小地图在右下。给画流程、做评审讨论的人用。
出处：Figma / FigJam（https://www.figma.com）、tldraw（https://tldraw.dev）、Miro（https://miro.com）的画布交互。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&family=Ma+Shan+Zheng&display=swap");
:root{--bg:#f8f7f4;--ink:#22201c;--sel:#ec3b82}
#world{position:absolute;transform-origin:0 0}            /* 所有对象放这里，只改这一个 transform */
.o.node{border:2.5px solid var(--ink);border-radius:14px;box-shadow:3px 4px 0 var(--ink);background:#fff}
#selbox{position:absolute;border:1.5px solid var(--sel)}   /* 线宽、控制点按 1/缩放 反算，保持屏幕上恒定 */
#selbox i{width:var(--hs);height:var(--hs);background:#fff;border:1.5px solid var(--sel);transform:translate(-50%,-50%)}
```
```js
// 视图 {x,y,s}：屏幕→世界 = ((px-x)/s,(py-y)/s)
function zoomAt(px,py,f){const ns=clamp(view.s*f);const [wx,wy]=toWorld(px,py);view.s=ns;view.x=px-wx*ns;view.y=py-wy*ns;}  // 以指针为中心缩放
// 滚轮：ctrl/meta 缩放，否则平移；空格或抓手拖动平移；连线端点 = 两图形中心连线与各自边界的交点
```
## 一眼认出（不能改）
- 点阵底，点距随缩放变化，缩小到点太密时自动加倍
- 底部居中浮动工具条，当前工具黑底白图标，右下角带单字母快捷键
- 选中框：1.5px 彩线 + 8 个白色方形控制点 + 下方尺寸标签
- 另外两位协作者的光标带名字小标签，在画布上自行移动，并给某个图形加彩色描边
- 右下角小地图（带视口框）和缩放比例条
- 图形粗黑边加偏移硬阴影，便签用手写字体
## 颜色
- 底 `#F8F7F4`，点 `#CFCCC4`，墨 `#22201C`
- 选中玫红 `#EC3B82`；协作者绿 `#2FA36B`、蓝 `#3B6FE0`
- 图形填色低饱和：蓝 `#D6E6FF`、绿 `#CFEEDD`、黄 `#FFF1B8`、橙 `#FFD9C7`；便签黄/粉/绿/蓝
## 字体
- Inter + Noto Sans SC；便签用 Ma Shan Zheng；数字用 tabular-nums
## 真图怎么处理
- 不用照片。画布内容全部是代码画的图形
## 动效
- 协作者光标以 90ms 线性插值走向随机途经点，到点停留再走
- 工具条、提示条 200ms 过渡；缩放和平移无过渡，直接跟手
## 组件
- 左上文件名牌、右上协作者头像与分享、底部工具条、右下小地图与缩放条、选中框、流程框、判断框、便签、文字、连线（带标签）、协作者光标
## 学什么交互
- 世界坐标 + 一个整体变换，缩放以指针为中心 → 放大后手感不漂 → 放到资源拓扑、机房布局、审批流程编辑器：节点多了不用分页，直接缩放。
- 选中框的线宽和控制点按缩放反算 → 放大缩小都一样好点 → 放到审批流设计器：节点选中后在任何缩放下都能拖角缩放。
- 连线端点自动算边界交点，节点移动时线跟着重画 → 用户只管摆节点 → 放到审批流、依赖关系图。
- 小地图点一下跳转 → 大图里不迷路 → 放到大型流程图、机柜平面图。
- 其他人的光标和选中描边 → 知道谁在改哪里，避免冲突 → 放到多人配置、评审会上同时编辑方案。
## 换到别的东西上
- 流程设计、架构图、评审白板、机房平面、看板头脑风暴
- 不适合以表格和表单为主的后台页面
## 容易做坏
- 选中框线宽随缩放变粗，放大后遮住图形
- 缩放不以指针为中心，画面乱飘
- 点阵不随缩放变化，缩小后糊成灰块
- 工具条做成顶部通栏，失去浮动感
## 参考实现
`gallery/w-canvas.html`：`applyView()`、`zoomAt()`、`fit()`、`drawDots()`、`renderObjs()`、`renderCn()`、`drawSel()`、指针 `pointerdown/move/up`、`drawMM()`、`stepCur()`
