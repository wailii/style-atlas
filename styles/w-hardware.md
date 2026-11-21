# 工业面板（w-hardware）
浅灰底、橙色圆点、等宽小字，像一台真实硬件产品的官网：丝印标签、点阵屏、旋钮、会下陷的按键。产品页自带一台能玩的设备，参数摆在旁边就能调，所见即所得。适合把「调参数」做成有手感的界面。
出处：Teenage Engineering（https://teenage.engineering）的产品页与硬件面板语言；只学原则，不复刻外观。
## 直接抄
```css
@import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo:wght@500;800;900&family=Noto+Sans+SC:wght@400;500;700&display=swap");
:root{--bg:#e4e4df;--body:#f1f1ed;--ink:#17171a;--mute:#7b7b75;--line:#c4c4bd;--org:#ff5a14;--lcd:#161614;
  --mono:"Space Mono","Noto Sans SC",monospace;--sans:"Archivo","Noto Sans SC",sans-serif}
.tag{font:10px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--mute)}          /* 丝印标签 */
.pad{border-radius:10px;background:#e8e8e3;border:1px solid #a9a9a1;box-shadow:0 6px 0 #a6a69e;transition:transform .06s,box-shadow .06s}
.pad.on{transform:translateY(5px);box-shadow:0 1px 0 #a6a69e}                                         /* 按下去 5px，厚度被吃掉 */
.pad.o{background:var(--org);box-shadow:0 6px 0 #b83a06}                                              /* 每 5 个一个橙色强调键 */
.row{display:flex;align-items:baseline;gap:10px;padding:13px 0;border-top:1px solid var(--ink)}
.row .d{flex:1;border-bottom:2px dotted #a9a9a1}                                                      /* 规格表的点线引导 */
```
```js
// 旋钮：垂直拖动 160px = 全程；滚轮、方向键也能调
kb.addEventListener("pointermove",e=>{ if(kb.hasPointerCapture(e.pointerId)) set(sv+(sy-e.clientY)/160) });
cap.style.transform=`rotate(${-135+v*270}deg)`;                       // 值 0..1 → -135°..135°
// 点阵屏：画布上按 10px 间距画圆点；文字先画到离屏画布，再按透明度阈值转成点
on = bm.a[(y*bm.w+x)*4+3] > 100;
// 声音：振荡器 → 低通 → 增益包络
o.type=WT[wave]; fl.frequency.value=200*Math.pow(40,S.filt); g.gain.exponentialRampToValueAtTime(.001,t+.7);
```
## 一眼认出（不能改）
- 浅灰暖底，只有一个强调色：橙色，用在圆点、强调键、旋钮指针
- 全站等宽小字大写加宽字距，像丝印；大标题用超粗无衬线、字距收紧
- 一块黑底点阵屏，亮点是橙色，文字也用点阵显示
- 旋钮带一圈刻度点，按键有厚度，按下会下陷
- 规格表：上黑线、点线引导、左边小橙点，数值等宽加粗
## 颜色
- 底 `#E4E4DF`；机身 `#F1F1ED`；屏幕 `#161614`；字 `#17171A`；次要 `#7B7B75`
- 强调橙 `#FF5A14`，橙键底边 `#B83A06`
## 字体
- Space Mono（标签、数值）+ Archivo 800/900（大标题）+ Noto Sans SC（中文正文）
## 真图怎么处理
- 不用照片。产品本体用 HTML/Canvas 画出来；要放实拍图时只做灰度、方形裁切，放在规格表旁
## 动效
- 按键 60ms 下陷；旋钮跟手转，无缓动
- 点阵屏波形随旋钮实时重算，按键触发振幅抖动后 450ms 衰减
- 滚动文字每 70ms 前进一列；购物车数字弹一下
## 组件
- 顶栏：小橙点 logo + 大写导航 + 购物车计数
- 设备：点阵屏、参数读数行、4 个旋钮、4×4 按键、扬声格点
- 购买区：橙色圆形主按钮（有底边厚度）+ 大号价格
- 规格表：两列，点线引导
- 底部提示条：黑底白字，1.6 秒消失
## 学什么交互
- 旋钮拖动调参 → 手感连续，改一个值立刻看到结果 → 费用预估页的折扣率、额度、并发上限用旋钮或滑杆，旁边实时重算金额
- 参数读数行紧挨控件 → 不用移开视线对照 → 模型调用页的 temperature、max_tokens 放在预览窗口正下方，数值等宽实时更新
- 按键有厚度、按下下陷 → 一眼知道点中了 → 资源台账里「申请」「释放」这类有后果的按钮用实体感，普通文字链接保持扁平
- 点阵屏当状态屏 → 把一串状态压成一块固定区域 → 集群总览用点阵表示每台机器的在线、空闲、故障
- 规格表点线引导 → 左名右值扫读快 → 资源详情页的配置清单（CPU、显存、网络、挂载）
## 换到别的东西上
- 产品官网、设备控制台、音频或相机类工具、参数调试页
- 不适合信息量大的多列表格页
## 容易做坏
- 强调色超过一个，就不像硬件了
- 阴影糊成一团；这里只有硬边的底边厚度
- 点阵屏用 CSS 渐变假装，要用画布画点
- 旋钮只能点不能拖
## 参考实现
页面（`gallery/w-hardware.html`）：`set()` 旋钮取值、`play()` 发声、`waveAt()` 波形、`drawWave()` / `drawTxt()` 点阵屏、`makeBm()` 文字转点阵、`demo()` 示范曲
