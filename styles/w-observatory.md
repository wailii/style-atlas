# 观测墙（w-observatory）
深灰底的监控大盘：面板直角细边、面板满铺、等宽数字，绿/黄/红只在超阈值时出现。顶部一个时间范围和两个变量控制全部面板，折线图共享十字线。给值班和容量规划的人长时间盯着看。
出处：Grafana（https://grafana.com）的面板网格、阈值着色、共享十字线和变量下拉；Datadog Dashboards（https://www.datadoghq.com）。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --bg:#111214; --panel:#17191c; --head:#1b1d21; --line:#2b2e33; --ink:#d9dce1; --ink2:#a0a6ae; --mute:#6f757e;
  --s1:#4db6ac; --s2:#a99bf0; --s3:#82a6e8; --ok:#4fb26b; --warn:#e3b341; --crit:#ea5a51; }
.pn { position:absolute; background:var(--panel); border:1px solid var(--line); border-radius:2px; transition:left .18s, top .18s, width .18s, height .18s; }
.ph { height:26px; padding:0 10px; font-size:11.5px; color:var(--ink2); border-bottom:1px solid #222529; cursor:grab; }
.mono { font-family:"JetBrains Mono",monospace; font-variant-numeric:tabular-nums; }
```
```js
// 12 列网格，行高 28、间距 8；拖动后按重力上浮压实
function compact(fixed){ const placed = fixed ? [fixed] : [];
  [...items].filter(i => i !== fixed).sort((a,b) => a.y-b.y || a.x-b.x).forEach(it => { let y = 0; while (placed.some(p => hit(p, {...it, y}))) y++; it.y = y; placed.push(it); }); }
// 共享十字线：任一图 mousemove → 按下标 cursor(i)，所有图同时画竖线、圆点、读数
// 阈值着色：同一条 path 画两遍，第二遍红色，用 clipPath 只露出阈值线以上的部分
```
## 一眼认出（不能改）
- 近黑深灰底 `#111214`，面板直角（2px）、1px 细边，面板标题 11.5px 小字
- 折线图有虚线阈值线，超阈值那一段变红，阈值线以上有极淡红底
- 顶部「集群」「机房」变量（标签 + 值的小方框）和 15m/1h/6h/24h/7d 时间范围
- 数字全部等宽；统计面板左大数右小曲线
- 鼠标在一个图上移动，所有折线图同一时刻出竖线、圆点和读数
## 颜色
- 底 `#111214`，面板 `#17191c`，边 `#2b2e33`，字 `#d9dce1 / #a0a6ae / #6f757e`
- 序列色只用三个：青 `#4db6ac`、紫 `#a99bf0`、蓝 `#82a6e8`
- 状态色：警告 `#e3b341`、严重 `#ea5a51`、正常 `#4fb26b`，只给超阈值的数字、线段、条
## 字体
- Inter + Noto Sans SC 做界面，JetBrains Mono 做数字、时间、编号
## 真图怎么处理
- 不用照片。图只有折线、迷你曲线、横条
## 动效
- 面板入场错开 45ms 上浮淡入；折线从左到右 0.9s 画出
- 拖动时其余面板 180ms 滑到新位置，目标位置用虚线框占位
- 切时间范围或变量，所有图重新画一遍；告警点「确认」后行变淡，顶部计数同步减少
## 组件
- 顶栏：Logo、标题、变量框、时间窗口文字、时间范围分段按钮、重置布局
- 统计面板、折线面板（图例带当前值）、横条面板（带 85% 阈值刻度）、作业表、告警表
- 面板右下角缩放柄，悬停才出现；点面板标题全屏，Esc 退出
## 学什么交互
- 全局时间范围 + 变量 → 一处改动，所有面板跟着变 → 排查时不用逐个面板改条件 → 资源台账或费用页顶部放「时间范围 + 部门」，下面所有统计和图表联动。
- 共享十字线 → 同一时刻的几项指标在同一位置对齐读数，容易看出因果 → 模型服务页把 QPS、延迟、错误率、显存放在一起，鼠标一扫就能看到同一秒的情况。
- 阈值只在超限时着色 → 平时整屏近乎单色，红黄一出现就是事 → 利用率、配额使用率列表，只有超 85% 的数字变色，别给每个数字配色。
- 面板可拖、可缩、可全屏 → 每个人把自己关心的放大 → 运营看板允许保存个人布局，需要细看的图点标题全屏。
## 换到别的东西上
- 适合：集群、网关、计费实时看板、值班大屏
- 不适合：表单为主的页面、面向普通用户的展示页
## 容易做坏
- 给每条序列都配红黄绿，阈值就没有意义
- 面板加圆角、阴影、大留白，就变成普通卡片
- 数字用比例字体，读数列对不齐
- 十字线只在当前图出现，丢掉「共享」的价值
## 参考实现
`gallery/w-observatory.html`：`compute()` 生成数据，`renderTS()` 画折线，`cursor()` 共享十字线，`compact()`/`bindDrag()` 拖动缩放，`fullscreen()` 全屏。
