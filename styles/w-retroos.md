# 复古系统（w-retroos）
1999 年前后桌面系统的样子：灰色立体按钮、带横纹的窗口标题条、点阵字体、像素图标、点阵壁纸。整个页面是一台能玩的虚拟电脑，窗口能拖、图标能双击、菜单能展开、能关机。适合个人主页、怀旧向小游戏、需要「像在操作一台机器」的演示页。
出处：Mac OS 9（Platinum）与 Windows 98 的界面；Apple 官网 https://www.apple.com ，微软官网 https://www.microsoft.com 。只学窗口与控件的结构，不复刻任何系统图标或商标。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=DotGothic16&family=Pixelify+Sans:wght@400;600&family=Noto+Sans+SC:wght@400;700&display=swap");
:root{--g:#dcdcdc;--g2:#bdbdbd;--dk:#7a7a7a;--k:#000;--w:#fff;--sel:#2c3e8f;--f:"DotGothic16","Pixelify Sans","Noto Sans SC",sans-serif}
.bev{background:var(--g);border:2px solid;border-color:var(--w) var(--k) var(--k) var(--w);box-shadow:inset -1px -1px 0 var(--dk),inset 1px 1px 0 var(--g2)}   /* 凸起 */
.ins{background:var(--w);border:2px solid;border-color:var(--dk) var(--w) var(--w) var(--dk);box-shadow:inset 1px 1px 0 var(--k)}                       /* 凹陷 */
.win{border:2px solid #000;box-shadow:3px 3px 0 rgba(0,0,0,.4),inset 1px 1px 0 #fff,inset -1px -1px 0 var(--dk);padding:2px}                           /* 硬投影，不模糊 */
.tb{height:22px;background:repeating-linear-gradient(0deg,#fff 0 1px,var(--g) 1px 3px);border:1px solid #000}                                          /* 标题条横纹 */
.win:not(.act) .tb{background:var(--g)}                                                                                                                  /* 非活动窗口没有横纹 */
canvas{image-rendering:pixelated}
```
```js
// 像素图标：16×16 字符画，每个字母对应一个颜色，渲染成 SVG 方块
function icon(n){const m=ICONS[n];let r="";m.forEach((row,y)=>[...row].forEach((c,x)=>{if(c!=".")r+=`<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`}));return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges">${r}</svg>`}
// 窗口：标题条按下拖动，点击窗口任何位置置顶并变成活动窗口
tb.addEventListener("pointermove",e=>{if(drag){w.style.left=e.clientX-dx+"px";w.style.top=e.clientY-dy+"px"}});
w.addEventListener("pointerdown",()=>focus(w),true);
// 图片抖动成 4 色：4×4 有序抖动矩阵
v=Math.floor((l+((M[(j&3)*4+(i&3)]+.5)/16-.5)/3)*3.999);
```
## 一眼认出（不能改）
- 窗口标题条有横纹，左上关闭方块、右上缩放方块；非活动窗口的横纹和方块消失
- 所有控件都是立体斜面：凸起的按钮、凹陷的输入区，边线 2px 黑白灰
- 投影是硬边偏移，没有模糊
- 顶部通栏菜单条，最左是系统菜单；桌面图标在右侧，选中时名字反白成蓝底
- 点阵字体，图标是 16×16 像素图放大，不做抗锯齿
## 颜色
- 系统灰 `#DCDCDC`、暗灰 `#7A7A7A`、纯黑白做边；选中蓝 `#2C3E8F`
- 桌面 `#5A84A0` / `#6C97B3` 两色棋盘点阵
- 图标色：黄 `#F2C744`、蓝 `#3B66B0`、红 `#C8382D`、绿 `#2F9E44`
## 字体
- DotGothic16（中文点阵感）+ Pixelify Sans（数字、英文）+ Noto Sans SC 兜底
## 真图怎么处理
- 照片一律转成 4 色有序抖动再放大，不显示原图；窗口里写「示意图 · 摄影师名」
## 动效
- 几乎没有：窗口直接出现、直接消失，菜单直接展开
- 内存条每 0.9 秒按格跳动；开机进度条按格推进
- 按钮按下时斜面反转
## 组件
- 菜单条、桌面图标、文件夹窗口（图标视图 + 状态栏）、文本窗口、画板窗口、关于窗口（分格进度条）
- 模态对话框：警告图标 + 文案 + 取消 / 默认按钮（外加黑色描边）
- 关机黑屏与开机进度
## 学什么交互
- 窗口可拖可叠、点击置顶 → 同时看几份内容不用来回切页 → 工单审批时把申请单、资源详情、历史记录开成并排窗口
- 双击打开、单击选中 → 选中和打开分开，不会误触 → 资源台账里单击只选中并在侧栏预览，双击才进详情
- 分格进度条 → 用格数代替百分比，一眼看出还剩多少 → 配额、显存占用用 10~24 格的条
- 模态确认框写清后果（「尚未保存的内容将会丢失」）→ 关键操作前让人知道代价 → 释放资源、删除模型前的确认
- 非活动窗口淡化 → 只有一个焦点 → 多窗口后台里只让当前窗口的操作按钮可见
## 换到别的东西上
- 个人主页、作品集、复古小游戏、纪念专题页
- 需要正经效率的后台不要整页套用
## 容易做坏
- 圆角、柔和阴影、渐变，一加就变成现代拟物
- 图标用 emoji 或高清矢量，和点阵字体打架
- 窗口不能叠放或不能置顶，就只是一张静态图
- 立体斜面的亮边和暗边方向写反，按钮看起来是凹的
## 参考实现
页面（`gallery/w-retroos.html`）：`win()` 建窗口与拖动、`focus()` 置顶、`icon()` 像素图标、`openK()` 双击分发、`paintWin()` 画板、`imgWin()` 抖动图、`shutdown()` / `boot()` 关机开机
