# 机房立面（w-rack）
把机柜按 U 位原样画出来：细线、编号小字、克制的状态色块，像一张工程图。点一台服务器看它的 8 张卡。给机房运维、资产管理员用，回答「这台机器在哪个柜子第几 U、现在热不热」。

出处：NetBox 机柜立面（https://netboxlabs.com）；Device42（https://www.device42.com）。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Chivo:wght@400;500;600;700&family=Chivo+Mono:wght@400;500;600&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root { --paper:#f7f6f1; --card:#fdfcf9; --ink:#14171a; --ink2:#50565c; --mute:#8d9296; --rule:#d5d3ca; }
.seg { display: flex; border: 1px solid var(--ink); }                         /* 直角、1px 黑线的分段控件 */
.seg button.on { background: var(--ink); color: var(--paper); }
.tabs button.on::after { content: ""; position: absolute; left: 0; right: 0; bottom: -1px; height: 3px; background: var(--ink); }
.cell.off { background: repeating-linear-gradient(135deg, #e9e7df 0 3px, #f5f4ee 3px 6px); }   /* 离线/没数据用斜纹，不用 0 */
```

```js
// 机柜：42U，每 U 14px；U1 在最底。服务器 y = TOP + (42 - (u + size - 1)) * UH
const y = TOP + (42 - (s.u + s.size - 1)) * UH, h = s.size * UH;
// 着色依据：同一个 fillOf(s) 按 mode 返回颜色，切换时只改 fill（CSS transition 350ms），图例同步换
const fillOf = (s) => mode === "status" ? STATUS_FILL[s.st] : mode === "util" ? ramp(UTIL, s.util/100) : mode === "temp" ? ramp(TEMP, (s.temp-30)/62) : DEPT_COLOR[s.dept];
// 单色顺序色阶：数组里放 3~4 个 rgb 停靠点，线性插值
const ramp = (stops, t) => { /* 见页面 */ };
```

## 一眼认出（不能改）
- 米白纸底，黑色 1px 线框，直角，没有圆角和阴影
- 每个机柜是 42U 的竖框，左边有 U 编号标尺，框边有每 U 的刻度孔
- 机柜上方有柜号、已用 U 数的细进度条、功率
- 服务器按真实 U 高画成矩形，GPU 机右下角有 8 个小方格代表 8 张卡
- 顶栏是黑线分段控件「着色依据」，换一下整排机柜重新着色

## 颜色
- 纸 `#F7F6F1`；卡片 `#FDFCF9`；墨 `#14171A`；线 `#D5D3CA`
- 状态：运行 `#BFDCCB`、空闲 `#E6EAEC`、告警 `#EE9A92`、维护 `#F1D58A`、离线斜纹
- 利用率色阶：`#E8EEEE → #96C4C4 → #26808A → #0A485A`
- 温度色阶：`#E2ECE8 → #ECDE96 → #E89654 → #BC2A28`
- 部门：五种压低饱和度的色相，各加 80% 透明度

## 字体
- Chivo + Noto Sans SC（界面）；Chivo Mono（编号、IP、数字）

## 真图怎么处理
- 不用照片，全部是 SVG 画出的立面

## 动效
- 切换着色依据：色块 350ms 渐变，图例即时换
- 悬停服务器：描边加深，黑底小提示框跟着鼠标
- 选中：2.4px 黑框，右侧面板内容重绘

## 组件
- 顶栏：标题、机房页签（黑线下划线）、着色依据分段控件
- 次栏：排选择、统计（服务器、GPU 卡、平均利用率、告警、功率）、图例
- 机柜立面：6 个柜一排，含交换机、服务器、空 U
- 右侧详情：型号/IP/序列号/负责人/部门/功率、8 卡格子（利用率和温度）、24 小时曲线

## 学什么交互
1. 同一份图，用「着色依据」切四种视角 → 不用为状态、利用率、温度、部门各做一页 → 资源台账里一张机柜/卡位图，切换按部门看归属、按利用率找闲置、按到期日看谁快过保。
2. 图例随着色依据换，而且是紧贴筛选栏的一行 → 读图时不用找图例 → 费用页里「按部门/按厂商/按项目」切换时同步换图例。
3. 空位本身是信息：空 U 保留成白底，不压缩 → 一眼看出柜子还能放几台 → 资源申请时直接给出「可用 U 位」。
4. 离线和无数据用斜纹，不画成 0 → 不会把「没采到」当成「利用率为零」 → 监控表里缺数据的单元格同样用斜纹。
5. 详情里把 8 张卡摊成格子，每格两个数 → 一台机器里哪张卡拖了后腿一眼可见 → 模型部署详情里把每个实例排成格子。

## 换到别的东西上
- 适合：机房、仓库货架、座位图、车位、床位、书架
- 一屏放不下的排数用页签分开，不要缩小

## 容易做坏
- 给服务器加阴影、圆角，工程图感就没了
- 状态色用高饱和纯红纯绿，整排柜子变成红绿灯
- 离线画成 0，把没数据和低利用混在一起
- U 位高度不按真实比例，4U 和 2U 看不出区别

## 参考实现
页面 `gallery/w-rack.html`：`build()` 生成机柜数据、`draw()` 画立面、`fillOf()` / `recolor()` 着色、`legend()` 图例、`panel()` 右侧详情
