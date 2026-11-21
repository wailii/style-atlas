# 网页桌面（w-webos）
把浏览器当成一张桌面：真照片壁纸、半透明菜单栏、带三色按钮的窗口、底部 Dock。多个小应用同时摆在屏幕上，能拖、能叠、能收进 Dock，适合要同时盯台账、账单、监控的人，一屏之内不用来回切页面。
出处：macOS（https://www.apple.com/macos/）；daedalOS 网页桌面项目（https://github.com/DustinBrett/daedalOS）。
## 直接抄
```css
:root { --glass: rgba(250,250,252,.88); --line: rgba(0,0,0,.09); --acc: #e2582a; --acc-soft: rgba(226,88,42,.14); }
#wall { position: fixed; inset: 0; background: url(img/real/flatlay-clouds.jpg) center/cover; }
.win { position: fixed; display: flex; flex-direction: column; border-radius: 12px; background: var(--glass);
  -webkit-backdrop-filter: blur(24px) saturate(160%); backdrop-filter: blur(24px) saturate(160%);
  box-shadow: 0 0 0 .5px rgba(0,0,0,.28), 0 8px 22px rgba(0,0,0,.18); overflow: hidden;
  transition: transform .52s cubic-bezier(.5,0,.2,1), opacity .4s, box-shadow .2s; }
.win.focus { box-shadow: 0 0 0 .5px rgba(0,0,0,.34), 0 26px 64px rgba(0,0,0,.36); }   /* 前台窗口阴影更深 */
.win.min { transform: translate(var(--dx), var(--dy)) scale(.06); opacity: 0; pointer-events: none; }
.tl button { width: 12px; height: 12px; border-radius: 50%; background: #c9c9ce; }       /* 失焦时三色按钮变灰 */
.win.focus .x { background: #ff5f57; } .win.focus .m { background: #febc2e; } .win.focus .z { background: #28c840; }
#dock { position: fixed; left: 50%; bottom: 10px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 8px;
  padding: 7px 10px; border-radius: 22px; background: rgba(255,255,255,.26); backdrop-filter: blur(28px) saturate(170%); }
```
```js
// 最小化：算出窗口中心到 Dock 图标中心的位移，写进 CSS 变量，再加 .min
const r = el.getBoundingClientRect(), d = dockIcon.getBoundingClientRect();
el.style.setProperty('--dx', (d.left + d.width/2 - (r.left + r.width/2)) + 'px');
el.style.setProperty('--dy', (d.top + d.height/2 - (r.top + r.height/2)) + 'px');
el.classList.add('min');
// Dock 放大：按鼠标到每个图标中心的距离取高斯值，直接改宽高，邻居被挤开
const s = BASE + (MAX - BASE) * Math.exp(-(d*d) / (2*62*62));
// 前台窗口：点击时 el.style.zIndex = ++zTop，其余去掉 .focus
```
## 一眼认出（不能改）
- 整页是一张真照片壁纸，上面浮着窗口，没有页面底色
- 顶部 28px 半透明菜单栏：左边当前应用名加「窗口」菜单，右边时钟
- 每个窗口顶部 40px 标题栏，左上红黄绿三个圆钮，标题居中；失焦的窗口圆钮变灰、阴影变浅
- 底部居中一条玻璃 Dock，图标带运行小点，鼠标掠过时放大
- 桌面右侧一列应用图标，双击才打开
## 颜色
- 壁纸取天空云层照片，不叠色，只压一层 12% 的深蓝
- 窗口玻璃 `rgba(250,250,252,.88)` 加 24px 背景模糊；内容区用白和浅灰
- 强调色橙红 `#E2582A`（选中行、当前柱子），应用图标各一个纯色：绿 `#2F8F6C`、橙 `#E0803A`、靛 `#4F58D6`
- 状态点：运行中 `#2F9E6B`、空闲 `#9AA0AE`、维保 `#D9962B`、待回收 `#D64545`
- 监控窗口内部用深色 `#12161F`，与浅色窗口形成对比
## 字体
- Inter + Noto Sans SC，正文 13px
- 编号、金额、时间用 JetBrains Mono，数字等宽对齐
## 真图怎么处理
- 壁纸 `img/real/flatlay-clouds.jpg`，铺满、居中裁切，放大 4% 避开边缘
- 页面左下角小字标「示意图 · 摄影师名」，名字取自同名 .json
- 窗口压在照片上时必须有 22 到 34px 的背景模糊和 .88 以上的不透明度，否则表格字读不清
## 动效
- 打开：缩放 .92 到 1 加淡入，380ms；Dock 图标同时弹跳一次
- 最小化与恢复：同一条 520ms 位移加缩放曲线，窗口朝 Dock 图标收进去，再从那里长出来
- Dock 放大：高斯衰减，宽度跟随鼠标，离开后 140ms 回落
- 拖动和缩放时关闭 transform 过渡，避免窗口拖影
## 组件
- 菜单栏：应用名、窗口菜单（列出各窗口状态、全部最小化、全部恢复）、时钟
- 窗口：标题栏、三色钮、右下角缩放手柄；双击标题栏等于最大化
- 应用一「资源台账」：左侧部门列表、状态分段控件、搜索框、可点表头排序的表格、底部合计
- 应用二「月度账单」：大号金额加环比胶囊、六个月柱状图（点柱切月份）、部门占比条
- 应用三「集群监控」：四格指标加三条每秒推进的利用率折线
- Dock：三个应用加「显示桌面」
## 学什么交互
- 多窗口并排 → 同时看几份数据，不跳页 → 放到后台：资源台账放左、费用明细放右、告警监控放下，值班时不用在三个菜单之间来回点。
- 点击置顶、失焦变灰 → 一眼知道键盘现在对着哪个窗口 → 放到后台：审批详情开在台账旁边，操作时只有当前窗口有深阴影和彩色按钮。
- 最小化飞向 Dock 并从原位置恢复 → 用动画交代「它去哪了」 → 放到后台：把暂时不用的监控面板收进底部托盘，托盘上的运行点提示它还在后台刷新。
- 窗口可拖、可缩 → 版面由使用者定 → 放到后台：值班大屏让使用者自己决定图表占多大，不必由产品预设固定网格。
## 换到别的东西上
- 适合：运维值班台、数据分析工作台、多系统汇总的内部门户
- 手机上改成全屏单窗口加底部切换栏，不要硬塞拖拽窗口
## 容易做坏
- 窗口玻璃太透，表格文字压在照片上读不清
- 三色钮不随焦点变灰，看不出谁在前台
- 最小化只做淡出，没有朝图标收拢的位移
- Dock 放大只缩放图标不改布局，邻居图标会被盖住
- 每个窗口内容各自长一套样式，桌面就散了
## 参考实现
页面（`gallery/w-webos.html`）：`mkWin()` 建窗口与拖动缩放、`focus()` 置顶、`minimize()` / `restore()` 飞向 Dock、`toggleMax()`、Dock 放大监听、`buildLedger()` / `buildBill()` / `buildMon()` 三个应用
