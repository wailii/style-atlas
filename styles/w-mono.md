# 黑白控制台（w-mono）
纯黑、纯白、浅灰，1px 细线，几乎没有颜色；只有状态点有颜色。按钮是黑底白字，卡片是白底细边。给开发者和运维用的部署控制台：项目一目了然，点一次部署就看到它的构建日志。

出处：Vercel Geist 设计系统（https://vercel.com/geist）；shadcn/ui（https://ui.shadcn.com）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#fff; --alt:#fafafa; --ink:#000; --ink2:#666; --mute:#8f8f8f; --line:#eaeaea; --line2:#d4d4d4; --ok:#18a058; --warn:#f5a623; --bad:#e5484d; }
.btn.k { background: var(--ink); color: #fff; height: 32px; border-radius: 6px; }
.btn.o { border: 1px solid var(--line2); background: var(--bg); } .btn.o:hover { border-color: var(--ink); }
.card { background: var(--bg); border: 1px solid var(--line); border-radius: 8px; } .card:hover, .card.on { border-color: var(--ink); }
.tabs button.on::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: var(--ink); }
.dot.ready { background: var(--ok); } .dot.error { background: var(--bad); } .dot.queued { background: none; border: 1.5px solid var(--line2); }
.dot.building { background: var(--warn); animation: breathe 1.4s ease-in-out infinite; }
@keyframes breathe { 0%,100% { opacity: 1; box-shadow: 0 0 0 0 rgba(245,166,35,.5); } 50% { opacity: .55; box-shadow: 0 0 0 4px rgba(245,166,35,0); } }
.log { font-family: "Geist Mono"; font-size: 12px; line-height: 1.75; background: var(--alt); border: 1px solid var(--line); border-radius: 6px; }
.log time { color: var(--mute); width: 52px; text-align: right; }
```

```js
// 日志逐行输出：每行带延迟和类型（普通 / 灰 / 警告 / 错误 / Ready），写完自动滚到底，最后一行带闪烁光标
setTimeout(() => { lines.push({ t, cl, tx }); paintLog(d); next(); }, delay);
// 进度行原地更新：同一行的文字每 90ms 重写一次  [████░░░░] 62%  23.7/38.2 GB
// 命令面板：模糊匹配（按字符顺序），命中的字加粗加下划线；分组：动作 / 项目 / 部署；↑↓ 切换、↵ 执行
```

## 一眼认出（不能改）
- 纯白页面，浅灰 `#FAFAFA` 底，除状态点外没有任何颜色
- 主按钮黑底白字；次按钮白底细边，悬停边框变黑
- 顶部：黑色小方块 logo、斜线分隔的面包屑、右侧带 ⌘K 的搜索框、黑色圆形头像
- 项目是白底细边卡片的网格，选中时边框变黑
- 点部署行，在行下展开等宽字体日志，逐行输出，最后一行绿色 Ready

## 颜色
- 黑 `#000`；灰阶 `#666` `#8F8F8F` `#D4D4D4` `#EAEAEA` `#FAFAFA`；白 `#FFF`
- 只有状态点有色：就绪 `#18A058`、构建中 `#F5A623`（呼吸）、失败 `#E5484D`、排队为空心灰圈
- 日志里警告用 `#A16207` 文字，Ready 用绿色

## 字体
- Geist + Noto Sans SC；日志、域名、编号用 Geist Mono

## 真图怎么处理
- 不用图片。项目头像是圆形细边里放两位等宽字母

## 动效
- 构建中状态点 1.4 秒呼吸；日志逐行出现并自动滚动，进度条原地更新
- 构建结束：状态点变绿、耗时写入、活动流里的点同步变色、底部提示一下
- ⌘K 面板 140ms 轻微放大淡入

## 组件
- 顶栏 + 页签（概览/部署/用量）
- 项目卡片：头像、名称、域名、状态点、最近提交、分支和时间、调用量
- 部署列表：状态点、项目、环境标签（生产为黑底）、提交说明、耗时、时间和人
- 展开日志：标题条（复制、重新部署）+ 等宽日志区
- 右侧活动流：圆形字母头像加细竖线
- 命令面板（⌘K）

## 学什么交互
1. 列表行点开就地展开详情，不跳页 → 看日志不用丢掉列表上下文 → 资源台账里点一行就地展开该资源的变更记录。
2. 状态只用一个小点表达，并且「构建中」会呼吸 → 满屏状态一眼扫完，不用读文字 → 工单审批列表用点表示待办、进行中、已完成。
3. 卡片点一下就筛选下方列表，再点取消，筛选以黑边小标签显示 → 概览和明细合在一页，不用来回切 → 费用页点某个部门卡片，下面的明细只剩这个部门。
4. ⌘K 同时搜项目、部署和动作，回车直接执行 → 老用户不用找菜单 → 后台里搜到一台机器，直接回车「申请扩容」。
5. 黑白界面里颜色稀缺，所以出错的红点特别扎眼 → 异常不需要弹窗，也能被注意到 → 模型列表里平时全是灰，只有失败的服务有红点。

## 换到别的东西上
- 适合：部署、CI/CD、任务队列、日志类产品、开发者控制台
- 需要强调品牌色的消费类页面不适合

## 容易做坏
- 加彩色标签、彩色图标，黑白感就散了
- 阴影和圆角过大，变成普通卡片后台
- 日志用比例字体，时间戳对不齐
- 状态既用点又用彩色徽标，重复表达

## 参考实现
页面 `gallery/w-mono.html`：`renderAll()` 画卡片和部署列表，`startBuild()` 逐行日志，`paintLog()`，`newDeploy()`，`renderPal()` / `fz()` 命令面板
