# 作品集（w-folio）

产品设计师的个人作品集：超大字标题、整行大字的项目列表，鼠标移到项目名上，预览图带着延迟跟着光标走，点进去用整屏色块转场切到详情。给想让人记住「这个人有品味」的个人站、工作室站、发布会页用。

出处：Awwwards 上的作品集类网站（https://www.awwwards.com）。

## 直接抄

```css
:root{--bg:#f1efea;--ink:#121212;--mute:#8a877f;--line:rgba(18,18,18,.16);--acc:#ff4a1c}
body{cursor:none;font:15px/1.6 "Bricolage Grotesque","Noto Sans SC",sans-serif}
.big{font-weight:800;font-size:112px;line-height:.98;letter-spacing:-.035em}
.ln{display:block;overflow:hidden}                                   /* 按行显现：外层遮罩，内层上移 */
.ln>span{display:block;transform:translateY(112%);transition:transform 1s cubic-bezier(.16,.9,.2,1)}
.in .ln>span,.ln.in>span{transform:none}
.row{display:grid;grid-template-columns:70px 1fr 250px 80px;border-top:1px solid var(--line)}
.row h3{font-weight:800;font-size:68px;letter-spacing:-.03em}
.list.h .row{opacity:.28} .list.h .row.act{opacity:1} .row.act h3{transform:translateX(18px)}
.cur{position:fixed;width:14px;height:14px;border-radius:50%;background:#fff;mix-blend-mode:difference;transition:width .35s,height .35s}
.cur.big{width:96px;height:96px;background:var(--acc);mix-blend-mode:normal}   /* 悬停可点处变大并显示文字 */
```

```js
// 光标快跟，预览慢跟，并按水平落差轻微倾斜
cx+=(mx-cx)*.35; cy+=(my-cy)*.35;
px+=(mx+34-px)*.1; py+=(my-190-py)*.1;
preview.style.transform=`translate(${px}px,${py}px) rotate(${clamp((mx+34-px)*.12,-12,12)}deg)`;
// 转场：色块 clip-path 从下往上盖住 → 换内容 → 从上往下离开
w.animate([{clipPath:"inset(100% 0 0 0)"},{clipPath:"inset(0 0 0 0)"}],{duration:650,easing:"cubic-bezier(.76,0,.24,1)"});
```

## 一眼认出（不能改）

- 自定义圆形光标，平时是小白点（差值混合），悬停项目时变大成色块并写「查看」
- 项目列表是整行大字（60px 以上），一行一个，细线分隔
- 悬停一行：其余行变淡，预览图跟着光标、有延迟、略带倾斜
- 点项目：整屏色块盖上、换内容、再离开，不跳页面
- 文字按行从遮罩下方升起，滚动到时才显现

## 颜色

- 纸色 `#F1EFEA`、墨 `#121212`、灰 `#8A877F`、线 `rgba(18,18,18,.16)`
- 强调只有一个朱红 `#FF4A1C`，用在光标色块、转场、标题里一个词、悬停变色
- 页眉用差值混合，滚到任何底色上都读得清

## 字体

- Bricolage Grotesque 800 + Noto Sans SC 900/700
- 标题 112–150px，列表 68px，正文 15px；字距收紧到 -0.035em

## 真图怎么处理

- 预览图是 300×380 的竖图，用 `gallery/img/real/` 的照片裁切；图上小字标「示意图 · 摄影师」
- 详情页大图 640px 高，随滚动做 12% 的视差
- 项目都是虚构的，照片只作示意

## 动效

- 入场：大标题三行依次从遮罩下升起（1 秒），列表行错开 110ms 上浮
- 预览：进入时从 1.18 倍缩回 1 倍（0.8 秒），跟随用 0.1 的缓动
- 转场：色块 0.65 秒盖住、停 0.3 秒显示项目名、0.65 秒离开
- 无鼠标时（如截图）光标自动移到第二行演示一次，用户一动鼠标就停

## 组件

- 页眉：姓名、三个锚点、「可接项目」状态点、实时本地时间
- 大标题 + 右侧一小段自我介绍
- 项目列表：序号、项目名 + 英文名、类型、年份
- 预览浮层：跟随光标
- 关于：整句大字、三列事实
- 联系：超大邮箱链接，悬停变朱红，点击提示已复制
- 详情：返回、大标题、四列元信息、大图、分段叙述、三项成果数字、下一个项目

## 学什么交互

- 悬停一行，其余行变淡，旁边出现该行的预览 → 看清「我指的是哪一个」，且不用点开 → 放到资源台账或模型列表：悬停一行时，其他行淡下去，鼠标旁浮出这台机器的负载小图或模型的一句话简介。
- 光标本身随上下文变化（变大、写字） → 提示「这里能点、点了会怎样」→ 放到费用明细：悬停金额变成「看构成」，悬停单号变成「复制」。
- 同页转场代替跳转 → 保住上下文，不闪白 → 放到工单审批：点工单，用一个 0.4 秒的滑入面板进入详情，返回时滑出，列表筛选状态不丢。
- 文字按行显现 → 阅读节奏被控制，长页面有「一段一段展开」的感觉 → 放到版本说明、新手引导页，不要放进操作表单。
- 列表即导航：每行有序号、名称、类型、年份四列，一眼扫完 → 放到后台的项目列表，把字号收到 16–20px。

## 换到别的东西上

- 工作室站、摄影集、个人博客、会议嘉宾页、产品发布页的「功能列表」
- 后台只借「悬停预览」「同页转场」「行内状态」；大字和自定义光标不要带进去

## 容易做坏

- 预览图和光标同速，没有延迟，就没有「跟随」的质感
- 自定义光标在可输入区域没有恢复，用户找不到光标
- 列表字号太小，大字的冲击力没了
- 转场太慢（超过 1.5 秒）让人想关页面
- 强调色出现在三处以上

## 参考实现

页面 `gallery/w-folio.html`：`setHover()` 悬停状态、`frame()` 光标与预览跟随、`wipe()` 转场、`openP()` 详情页、`io` 滚动显现、`demo` 无鼠标时的自动演示。
