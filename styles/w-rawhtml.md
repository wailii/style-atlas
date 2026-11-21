# 原生网页（w-rawhtml）
内部小工具的原始长相：系统字体，浏览器自带的表单控件、表格、详情折叠，蓝色下划线链接，访问过变紫。几乎没有 CSS，打开就快，点哪都有反应。给只需要把事办完的内部系统用。
出处：Hacker News（https://news.ycombinator.com）；Craigslist（https://www.craigslist.org）；早期 Google 首页。
## 直接抄
```html
<style>
body{font-family:Verdana,Geneva,"PingFang SC","Microsoft YaHei",sans-serif;font-size:10pt;margin:8px 12px}
table{border-collapse:collapse}
.grid td,.grid th{border:1px solid #999}
a.v{color:#551a8b}          /* 访问过的链接：浏览器默认就会变紫，这里补一个 JS 记录的版本，file:// 下也生效 */
</style>
<h1>机器申请与查询</h1><hr>
[<a href="#query">查询机器</a>] [<a href="#apply">申请机器</a>]
<form method="get"><fieldset><legend>填写申请单</legend>
  <label>数量：<input type="number" name="n" min="1" max="32" required></label>
  <label><input type="radio" name="type" value="H800" checked> H800</label>
  <input type="submit" value="提交申请"> <input type="reset" value="重填">
</fieldset></form>
<details><summary>H800 80G：8 卡整机</summary><p>规格说明……</p></details>
```
```js
// 表单用 GET 提交，页面带着参数重新打开，顶部显示一行结果
if (qs.get("act") === "apply") document.getElementById("result").innerHTML = '<table bgcolor="#ddffdd" border="1">…申请已提交…</table>';
// 点表头排序：同一列再点反向，表头后面加 ↑ ↓
th.onclick = () => { key === n ? dir = -dir : (key = n, dir = 1); body(); };
```
## 一眼认出（不能改）
- 白底、系统字体 10pt，没有品牌色，没有圆角和阴影
- 链接就是蓝色下划线，访问过的是紫色
- 表格是带 1px 灰框的原始表格，表头灰底，表头文字本身是链接
- 表单控件全是浏览器默认的：单选、下拉、数字框、提交按钮
- 方括号导航 `[查询] [申请]`，页面底部有访问计数和「最后更新」
## 颜色
- 链接 `#0000EE`，已访问 `#551A8B`
- 提示条：成功 `#DDFFDD` + 绿框，公告 `#FFFFCC` + 黄框，故障红字 `#CC0000`
- 其余黑白
## 字体
- Verdana / 系统无衬线，10pt，说明小字 8pt
## 真图怎么处理
- 不放图
## 动效
- 没有。展开用原生 `<details>`，提交就是整页刷新
## 组件
- 页头：标题、小字说明、当前用户、`<hr>`
- 结果行：提交后出现在页面最上面
- 方括号导航
- 申请单：`<fieldset>`、单选、下拉、数字框、文本域、复选、提交 / 重填
- 查询：关键字、状态下拉、可排序表格，点主机名在表上方显示一行详情
- 我的申请表、`<details>` 折叠的机型说明与常见问题
- 右栏公告（黄底）、最近申请、链接
- 页脚：访问计数、更新日期
## 学什么交互
- 提交后页面顶部一行结果，不跳转不弹窗 → 用户立刻知道成没成，也不丢当前页 → 资源申请、导入、批量操作后的反馈
- 表头本身就是链接，当前排序列带 ↑ ↓ → 不需要排序图标和菜单 → 资源台账、费用明细的列排序
- 链接访问过变色 → 用户知道哪些单据已经看过 → 工单列表、审批列表
- 用原生 `<details>` 放说明 → 不写一行脚本，键盘和读屏都能用 → 规则说明、常见问题、机型规格
- 一个页面从上到下排完所有功能，用页内锚点跳转 → 少切页，浏览器搜索直接可用 → 内部小工具、运维表单
## 换到别的东西上
- 运维小工具、一次性的内部表单、数据查询页、故障应急页
- 不适合：面向外部客户，或需要品牌感的页面
## 容易做坏
- 偷偷加圆角、阴影、渐变，就变成「假装复古」的普通页
- 自定义下拉和按钮，丢掉原生控件的键盘行为
- 链接去掉下划线、取消已访问色
- 提交结果放到页面底部，用户看不到
## 参考实现
页面 `gallery/w-rawhtml.html`：`head()` / `body()` 表头与表体、`mark()` 已访问标记、顶部结果行（读 `URLSearchParams`）、`mine()` 我的申请
