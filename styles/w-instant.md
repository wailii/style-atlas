# 万行速查（w-instant）
10 万条云账单明细的瞬时搜索页。一个超大的搜索框，输入即筛，右上角实时显示「100,000 条中 N 条 · 毫秒数」；表格是真虚拟滚动，只渲染可见的 40 行；命中词用荧光笔标出；选中行整行反黑；全程键盘可用。给要在海量明细里「找几条」的财务和运维用。
出处：Algolia InstantSearch（https://www.algolia.com）的即时搜索；Raycast（https://www.raycast.com）的列表与键盘；Superhuman（https://superhuman.com）的速度感。只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&family=Noto+Sans+SC:wght@400;500;700&family=JetBrains+Mono:wght@400;500;700&display=swap");
:root{--ink:#0c0c0c;--ink2:#555;--mute:#9a9a9a;--line:#ececec;--hov:#f5f5f3;--acc:#ff5a1f;--mark:#ffe14d}
.sbar{display:flex;align-items:center;gap:16px;border-bottom:3px solid var(--ink)}
.sbar input{flex:1;font:500 30px/1.2 Inter,"Noto Sans SC";caret-color:var(--acc)}
.r{height:30px;display:grid;border-bottom:1px solid var(--line)}
.r.act{background:var(--ink);color:#fff}.r.act::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--acc)}
mark{background:var(--mark);color:var(--ink);border-radius:2px}
.sc{overflow-y:scroll;scrollbar-width:none}                 /* 隐藏原生滚动条，自绘 */
```
```js
// 虚拟滚动：spacer 撑出总高度，只渲染 [start-8, end+8]，层用 translateY 对齐
const a=Math.max(0,Math.floor(st/RH)-8),b=Math.min(n,Math.ceil((st+vh)/RH)+8);
lay.style.transform=`translateY(${a*RH}px)`;lay.innerHTML=rows(a,b);
// 过滤：每行预先拼好小写字符串 S[i]；多个词 AND；只用 indexOf；计时显示在右上角
const t0=performance.now();for(const i of order){const s=S[i];if(T.every(t=>s.indexOf(t)>=0))out[c++]=i}
// 拖滚动条的气泡：按当前排序列取值（日期显示整日期，文本取首字，金额取整）
bubble(y)  // 位置跟着滑块中心走
// 列宽拖拽用 pointer capture 改 grid-template-columns；列换序用 pointer 事件 + 落点竖线
```
## 一眼认出（不能改）
- 页面第一屏是一个 30px 大字的搜索框，下沿 3px 黑线；右侧是「100,000 条中 N 条 · Xms」，毫秒数用橙色
- 命中词整页高亮成荧光黄，在每一列里都标
- 选中行整行反黑（黑底白字）加 4px 橙色左边条
- 每行最左有行号；行高 30px，等宽字体；金额右对齐
- 右侧是自绘的细滚动条，拖动时旁边冒出一个黑色气泡，写着当前位置的日期和第几行
- 底部一行纯文字快捷键提示，不画键帽
## 颜色
- 白底，墨 `#0C0C0C`，次要 `#555`、`#9A9A9A`，线 `#ECECEC`，悬停 `#F5F5F3`
- 信号橙 `#FF5A1F`（光标、选中条、毫秒数、排序箭头）；荧光黄 `#FFE14D`（命中词）
## 字体
- Inter + Noto Sans SC 做界面；账单号、资源 ID、金额、行号用 JetBrains Mono（`tabular-nums`）
## 真图怎么处理
- 不用图。10 万行数据在页面里随机生成，日期随行号单调增加，金额按产品类型取不同量级
## 动效
- 几乎没有动画：搜索、滚动、选中都即时；滚动条气泡 150ms 淡入，停止滚动后 900ms 淡出
- 详情抽屉 220ms 滑入
## 组件
- 搜索栏、统计、示例词条、表头（排序箭头、拖动手柄、换序落点线）、虚拟滚动表体、自绘滚动条与气泡、详情抽屉、空状态
## 学什么交互
- 输入即筛并显示「总数中命中数 · 耗时」→ 用户知道没卡、也知道缩小了多少，不用点「查询」→ 放到费用明细、资源台账：一个搜索框同时匹配所有列，再配多词 AND。
- 虚拟滚动 + 自绘滚动条，拖动时给位置气泡 → 十万行里能「按日期跳」，不用翻页 → 放到费用明细、操作日志：拖到「2026-06-22」附近再往下看。
- 命中词在所有列高亮 → 一眼知道这一行为什么命中 → 放到资源台账搜「i-9f」时，资源 ID、备注里的命中都标出来。
- ↑↓ 移动、Enter 开详情、/ 搜索、Esc 清空，详情打开时 ↑↓ 继续切换 → 手不离键盘就能连续核对几十条 → 放到审批、对账：逐条核对，不用回鼠标。
- 列宽可拖、列可换序、点列头排序 → 同一张表适应不同人的看法，不用开「列设置」弹窗 → 放到物理机列表、模型列表。
## 换到别的东西上
- 账单、日志、审计记录、流水、告警历史：量大、只读为主、靠搜索定位
- 需要行内编辑、合并单元格的表，不适合虚拟滚动
## 容易做坏
- 每次输入都重渲染全部行，十万行直接卡死
- 虚拟滚动不留上下缓冲，快滚时出现白屏
- 命中高亮只在一列，其余列看不出为什么命中
- 自绘滚动条不跟随键盘选中，选中行跑出视口
- 为了「好看」加入行进场动画，反而拖慢速度感
## 参考实现
`gallery/w-instant.html`：数据生成段、`refilter()`、`resort()`、`render()`（虚拟滚动）、`thumb()`/`bubble()`、`setAct()`、`openDr()`、表头 pointer 事件（调宽与换序）
