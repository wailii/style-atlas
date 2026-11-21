# 命令启动器（w-launcher）
屏幕中央一个大命令框，直接盖在真照片壁纸上：输入即过滤，结果分组，右边是当前项的预览，底部是操作提示，⌘K 打开当前项的动作菜单，输入算式直接出结果。给想用键盘一步到达应用、文档和动作的人用。
出处：Raycast（https://www.raycast.com）；Alfred（https://www.alfredapp.com）。

## 直接抄
```css
:root { --w1:rgba(255,255,255,.94); --w2:rgba(255,255,255,.62); --w3:rgba(255,255,255,.38); --ln:rgba(255,255,255,.12); --hi:rgba(255,255,255,.13); --glass:rgba(22,24,32,.58); }
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&display=swap");
.bg { position:fixed; inset:0; background:url("img/real/flatlay-clouds.jpg") center/cover; }
.dim { position:fixed; inset:0; background:rgba(6,8,16,.38); }
.panel { width:840px; height:580px; display:grid; grid-template-columns:1fr 330px; grid-template-rows:62px minmax(0,1fr) 42px;
  border-radius:18px; background:var(--glass); backdrop-filter:blur(44px) saturate(150%); border:1px solid rgba(255,255,255,.16); }
.row.on { background:var(--hi); border-radius:10px; }
.row .nm b { background:rgba(255,255,255,.2); border-radius:3px; }   /* 命中字加底 */
```
```js
// 匹配：名称子序列 > 拼音首字母 > 关键词；命中名称的字符下标用来高亮
function score(it,q){ const idx=fuzzy(q,it.n); if(idx) return {s:100-span-idx[0]*2, idx}; if(fuzzy(q,it.py)) return {s:60}; if(it.kw.includes(q)) return {s:40}; }
// 计算器：只放行 0-9+-*/().% 的算式，% 换成 /100 后求值，结果千分位
```

## 一眼认出（不能改）
- 背景是一张真照片，上面盖一层暗色，面板是磨砂玻璃（高斯模糊加半透明深色），能隐约透出照片
- 面板顶部一个 20px 的大输入框，下面左列结果右列预览
- 结果按「建议 / 应用 / 文档 / 动作」分组，每行：彩色方块图标 + 名称 + 类型，选中行浅白底
- 输入的字在结果里加底色高亮；也能用拼音首字母（zytz）命中
- 底部操作条：↵ 主操作随选中项变化、↑↓ 选择、Esc 清空、右侧「动作 ⌘K」
- 输入算式时第一项是「计算器」，右侧预览用大号等宽数字显示结果

## 颜色
- 玻璃 `rgba(22,24,32,.58)`，选中 `rgba(255,255,255,.13)`，线 `rgba(255,255,255,.12)`
- 字：白 94% / 62% / 38% 三档透明度
- 图标方块：应用 `#4D6BD6`、文档 `#8A63C8`、动作 `#2F9A7A`、计算 `#D9822B`

## 字体
- Inter + Noto Sans SC；数字、算式、快捷键用 JetBrains Mono

## 真图怎么处理
- 壁纸用 `img/real/flatlay-clouds.jpg`，铺满，加 38% 的暗色，缓慢放大平移（Ken Burns）；页面左下角标「示意图 · 摄影师」，名字从同名 json 读

## 动效
- 面板入场：上移 14px、从 97% 放大、淡入，550ms
- 切换选中项，右侧预览从右侧 8px 滑入 250ms
- 动作菜单 180ms 弹出；提示条淡入 220ms，1.9 秒后消失
- 壁纸 30 秒来回缓慢移动

## 组件
- 搜索栏：放大镜、输入、快捷键提示
- 结果行：图标方块、名称（命中字高亮）、副信息（命中拼音时显示拼音）、类型
- 预览：大图标、标题、说明、迷你指标（数字 + 折线）、元信息
- 动作菜单：当前项标题 + 动作列表 + 键位，↑↓ 选择、↵ 执行
- 计算器项：算式、结果、复制

## 学什么交互
- 做法：一个输入框同时搜应用、文档、动作，还能直接算数 → 用户不用先想「该去哪个菜单」 → 后台的全局搜索框同时搜资源编号、部门、工单，也能执行「新建申请」这种动作
- 做法：右侧预览跟着选中项变，不用点进去 → 上下移动就能扫一遍，确定了再回车 → 资源台账或模型列表的列表页，选中一行右侧显示详情摘要和迷你趋势
- 做法：底部提示条的主操作文字随选中项改变（打开 / 打开文档 / 执行 / 复制结果） → 回车会发生什么一目了然，减少误操作 → 费用明细里选中行时，主操作显示「查看明细」，选中汇总行显示「展开」
- 做法：⌘K 展开当前项的二级动作，主操作仍是回车 → 常用路径一步到位，次要动作收起来不占位置 → 工单行的「转派、催办、关闭」收进二级菜单
- 做法：拼音首字母也能命中，命中的字加底色 → 中文环境下键盘搜索更快 → 部门、项目名搜索支持拼音首字母

## 换到别的东西上
- 后台的全局搜索与跳转、运维动作面板、AI 产品的快速入口
- 不适合需要大量浏览和对比的页面

## 容易做坏
- 面板不透明，真照片的意义就没了；也不能透明到字看不清（暗色罩加深）
- 结果不分组，所有东西混成一长串
- 预览区放太多内容，选中项变化时跳动
- 把快捷键画成立体键帽

## 参考实现
`gallery/w-launcher.html`：`search()` / `score()` / `fuzzy()` 匹配排序、`calc()` 计算器、`preview()` 右侧预览、`openAm()` 动作菜单；地址加 `?demo` 会预填「资源」
