# 暖纸衬线（w-warmpaper）
米色纸底、衬线大标题、一种克制的橙褐色，配手绘感线条插画和大段留白。读起来像研究机构的年报，不像产品官网。适合需要让人慢下来读、需要信任感的首页：研究、白皮书、公开报告、年度总结。
出处：Anthropic 官网（https://www.anthropic.com）的整体气质；手绘线稿插画的做法参考同类研究机构站点。

## 直接抄

```css
@import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500&display=swap");
:root{--paper:#f2ede2;--paper2:#ebe5d6;--ink:#1f1a14;--ink2:#5b5246;--mute:#8c8272;--line:#d9d1bd;--acc:#a8502d;--acc2:#7a3a20;
  --serif:"Newsreader","Noto Serif SC",serif;--sans:"Noto Sans SC",system-ui,sans-serif}
body{background:var(--paper);color:var(--ink);font-family:var(--serif);font-size:17px;line-height:1.75}
h1{font-size:68px;line-height:1.2;font-weight:500} h1 em{font-style:normal;color:var(--acc)}   /* 标题里只给关键词上橙褐色 */
svg.draw path{fill:none;stroke:var(--ink);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
svg.draw .a{stroke:var(--acc)} svg.draw .fillacc{fill:var(--acc)}
.papers .more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .4s}      /* 悬停展开摘要：0fr → 1fr */
.papers li:hover .more{grid-template-rows:1fr}
```

```js
// 手绘感：点列抖动后用 Catmull-Rom 转贝塞尔，直线也有一点歪
function wob(pts,j=2.2){const p=pts.map(([x,y])=>[x+(Math.random()-.5)*j,y+(Math.random()-.5)*j]);let d=`M${p[0]}`;
  for(let i=0;i<p.length-1;i++){const a=p[i-1]||p[i],b=p[i],c=p[i+1],e=p[i+2]||c;
    d+=`C${b[0]+(c[0]-a[0])/6} ${b[1]+(c[1]-a[1])/6} ${c[0]-(e[0]-b[0])/6} ${c[1]-(e[1]-b[1])/6} ${c}`}return d}
// 随滚动描线：每条 path 设 pathLength=1，dasharray=1，offset 从 1 到 0，按序号错开
paths.forEach((el,i)=>{const a=i/n*.7,k=Math.min(1,Math.max(0,(p-a)/.3));el.style.strokeDashoffset=1-k});
// 顶部进度线：scaleX(scrollY/(scrollHeight-innerHeight))
```

## 一眼认出（不能改）

- 米色纸底，没有纯白、没有灰
- 衬线大标题，字重 500 以内，标题里个别词用橙褐色
- 全页只有一种强调色（橙褐），其余是墨色和暖灰
- 手绘感线条插画，线粗 1.6px 左右，局部填橙褐色圆点
- 大量留白，正文行高 1.8 以上，一行不超过 30 个汉字
- 顶部 2px 橙褐色阅读进度线

## 颜色

- 纸 `#F2EDE2`，深一档 `#EBE5D6`，分隔线 `#D9D1BD`
- 墨 `#1F1A14`，次级字 `#5B5246`，弱字 `#8C8272`
- 强调 `#A8502D`，按下或悬停 `#7A3A20`
- 反白大块（招聘条）用墨色底、纸色字

## 字体

- 中文标题和正文：Noto Serif SC；西文数字：Newsreader
- 导航、标签、日期、说明小字：Noto Sans SC，13~14.5px
- 日期和数字用 tabular-nums

## 真图怎么处理

- 默认不用照片，用线条插画。要用照片时放进 `--paper2` 底的圆角框，去饱和后叠一层纸色 multiply，不加阴影
- 插画全部代码生成，种子固定，刷新不变

## 动效

- 首屏插画 2.8 秒内按笔画顺序描完（ease-out）
- 之后的插画按滚动位置描线，向上滚会倒退
- 文章行悬停：标题右移 6px 变深褐，摘要 400ms 展开，左侧出一条 3px 竖线
- 下拉菜单 200ms 淡入并下移 6px，离开后延迟 180ms 才收

## 组件

- 导航：左 logo，中间四个带下拉的菜单，右侧文字链接加黑色胶囊按钮
- 下拉面板：两列，每项一个衬线标题加一行无衬线说明
- 研究列表：日期、分类、标题、箭头四列，一行一篇，行间 1px 线
- 左文右图的原则段，图放在 `--paper2` 圆角框里
- 大引言：40px 居中，关键短语橙褐色
- 黑色反白招聘条

## 学什么交互

- 悬停展开摘要 → 列表保持一行一条，想多看才展开，标题不用截断 → 放到工单审批列表，悬停或点击展开申请理由和关联资源，不必每行都进详情页
- 随滚动描线 → 图形进度与阅读进度同步，读者知道自己读到哪 → 放到资源申请的多步说明页或新手引导，图示随步骤逐笔出现
- 下拉面板里每项配一句说明 → 菜单项不用猜 → 放到后台顶部「产品/模型」切换菜单，每个模型旁写一句适用场景
- 顶部细进度线 → 不占空间的位置感 → 放到长账单、长报告详情页
- 全页只用一种强调色 → 强调有重量 → 放到费用页，只给超预算项上色

## 换到别的东西上

- 报告、白皮书、年度总结、教育机构、非营利组织主页
- 后台里的「月度运营报告」页可借用排版：衬线大标题加手绘示意图
- 不适合信息密度高的页面和多层表格

## 容易做坏

- 加第二种强调色或渐变，纸感就没了
- 纯白卡片加阴影
- 插画线条太整齐，像图标
- 用黑体做大标题
- 正文行宽过长，留白太小

## 参考实现

`gallery/w-warmpaper.html`：`wob()` 抖动路径、`art0()`~`art3()` 四幅插画、`setup()` / `paint()` / `update()` 描线与进度、`#plist` 研究列表、`#menu` 下拉。
