# 设计规范站（w-brandbook）
暖白底配琥珀黄，黑色 1.5px 描边加硬阴影的组件，标题是描边大数字加粗体。左侧导航、右侧内容；色板、字阶、间距都是真实可点的样本，组件可以切状态和尺寸并实时给出代码，每条规则有「做 / 不要做」对照，一个开关切换整站深浅主题。给设计系统文档、品牌规范、前端组件库说明用。
出处：Shopify Polaris（https://polaris.shopify.com/）；IBM Carbon Design System（https://carbondesignsystem.com/）；GitHub Primer（https://primer.style/）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700;900&display=swap");
:root,[data-theme=light]{--bg:#fffef9;--surface:#fff;--sunk:#f6f3e8;--ink:#16150f;--ink2:#55524a;--mute:#8f8b80;--line:#e7e3d6;--brand:#ffb800;--brand-h:#ffc933;--brand-a:#e09a00;--on-brand:#16150f;--ok:#1f9d55;--bad:#e5484d;--shadow:#16150f}
[data-theme=dark]{--bg:#14130f;--surface:#1d1c17;--sunk:#0f0e0b;--ink:#f5f1e4;--ink2:#b5b0a0;--mute:#7f7b6f;--line:#32302a;--brand:#ffc933;--brand-h:#ffd762;--brand-a:#e0a800;--shadow:#f5f1e4}
body{transition:background .35s,color .35s}
.lt-btn{height:36px;padding:0 16px;font-weight:600;border:1.5px solid var(--ink);border-radius:6px;background:var(--brand);color:var(--on-brand);box-shadow:3px 3px 0 var(--shadow);transition:transform .12s,box-shadow .12s}
.lt-btn:hover{transform:translate(-1px,-1px);box-shadow:4px 4px 0 var(--shadow);background:var(--brand-h)}
.lt-btn:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--shadow)}   /* 按下：阴影被「压平」 */
.crop{position:relative;border:1px solid var(--line)}                          /* 套准角标 */
.crop:before,.crop:after{content:"";position:absolute;width:14px;height:14px;border:2px solid var(--ink)}
.crop:before{left:-5px;top:-5px;border-right:0;border-bottom:0}.crop:after{right:-5px;bottom:-5px;border-left:0;border-top:0}
.sh .n{font-family:"Bricolage Grotesque";font-weight:800;font-size:56px;color:transparent;-webkit-text-stroke:1.5px var(--ink)}
.ramp button{flex:1;transition:flex .35s cubic-bezier(.3,.9,.3,1)}.ramp button:hover{flex:2.2}
```
```js
// 主题：document.documentElement.dataset.theme="dark"；token 表读 getComputedStyle 的当前值，切换后 60ms 重读
// 组件演示：状态 S.state、尺寸 S.size、变体 S.variant 三个变量，render() 同时重画样例、代码和规格
// 代码高亮：手写 <span class="t|a|v|c"> 四种颜色（标签、属性、值、注释）
// 复制色值：navigator.clipboard.writeText 失败时仍弹出「已复制 #FFB800」，色块作为图标
```
## 一眼认出（不能改）
- 页面主标题里「设计」两字压一块琥珀黄底，其余为粗黑字
- 每个章节标题前有描边的大序号（01、02…），不填充
- 组件有 1.5px 黑描边和硬阴影，悬停上抬、按下压平，不用柔和投影
- 色板是一排无间隙的长条，悬停的那一条变宽并露出色值，整条外有黑色 1px 外框
- 「做 / 不要做」成对出现：做的卡片顶部绿底绿线，不要做的红底红线
- 展示区四角有套准角标
## 颜色
- 浅色：底 `#FFFEF9`、卡 `#FFFFFF`、凹槽 `#F6F3E8`、字 `#16150F`、线 `#E7E3D6`
- 深色：底 `#14130F`、卡 `#1D1C17`、凹槽 `#0F0E0B`、字 `#F5F1E4`、线 `#32302A`
- 主色琥珀 `#FFB800`（悬停 `#FFC933`，按下 `#E09A00`），琥珀十档从 `#FFF8E1` 到 `#5C3C00`
- 状态色：成功 `#1F9D55`、警告 `#D9480F`、危险 `#E5484D`、信息 `#3478F6`，只用于语义，不当装饰
- 暖灰十一档从 `#FFFEF9` 到 `#16150F`
## 字体
- 标题 Bricolage Grotesque 800、字距 -0.03 到 -0.045em；正文 IBM Plex Sans 14.5px；代码与数值 IBM Plex Mono 11–13px
- 中文回落到 Noto Sans SC；等宽小标签全部大写加字距
- 字阶行：左 token 名、中样本、右「字号 / 行高 · 字重」
## 真图怎么处理
- 不用照片。样本即内容：色块、字阶行、间距方块、真正可交互的按钮和输入框
- 演示区背景是 16px 的细点阵，表示「这里是画布」
## 动效
- 主题切换：背景和文字 .35s 过渡
- 按钮悬停 `translate(-1px,-1px)` 加深阴影，按下 `translate(3px,3px)` 去掉阴影，.12s
- 色板悬停长条在 .35s 内展宽到 2.2 倍
- 复制后底部弹出黑色小条，1.7s 后收起
- 侧栏当前项左侧出现 4px 琥珀竖条
## 组件
- 侧栏：品牌标、分组小标题、导航项（右侧序号）
- 顶栏：站点域名、版本胶囊、日夜分段开关
- 色板长条、语义色卡、token 表（带当前值色点）
- 字阶表、间距柱
- 演示台：左上样例、左下分段控件（状态 / 尺寸 / 变体）、右侧代码块与规格三栏
- 做 / 不要做卡：状态头、演示区、一句说明
## 学什么交互
- 点色块复制色值 → 设计和开发都不需要再手抄 → 放到后台：模型列表里点「模型 ID」、资源台账里点「实例 ID」直接复制并弹出小条。
- 状态、尺寸一键切换并同步代码 → 说明书变成可试的东西，规格不会和展示脱节 → 放到后台：配置页的「预览」区，改一个选项右侧立刻显示结果和生成的配置片段。
- 做与不做对照 → 规则配一个反例，比文字更容易记住 → 放到后台：填报说明、命名规范、审批意见写法，用成对的示例展示。
- 主题 token 表读当前计算值 → 换主题后表里的值同步变，证明是同一套变量在驱动 → 放到后台：品牌换肤或深色模式的验收页，直接列出变量当前值。
## 换到别的东西上
- 适合：设计系统文档、组件库站点、品牌手册、API 设计规范
- 不适合：营销首页；内容以长文为主、没有可展示样本的规范
## 容易做坏
- 硬阴影用了柔和模糊，粗野的清晰感消失
- 琥珀黄大面积铺底，应该只用在主按钮和强调点
- 色块不标色值或点击无反馈，就失去了「样本」的意义
- 深色主题只反转背景，描边、阴影、代码块没跟着换
- 做 / 不要做只写文字，没有放真实组件
## 参考实现
页面（`gallery/w-brandbook.html`）：`ramp()` 色板、`tok()` token 表、`render()` 组件演示台（按钮 / 输入框）、`copy()` 复制与提示、主题开关 `#theme`、`spy()` 侧栏高亮
