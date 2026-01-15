---
aside: false
---

# HTML 标签参考表

|      标签名      |      用处（语义/功能）       | 是否单标签 | 默认显示类型 | HTML5 新增 |                      常用属性                      |                 示例/备注                  |
| :--------------: | :--------------------------: | :--------: | :----------: | :--------: | :------------------------------------------------: | :----------------------------------------: |
|  **文档根元素**  |
|     `<html>`     |    整个 HTML 文档的根元素    |   双标签   |     块级     |     否     |                   `lang`, `dir`                    |           `<html lang="zh-CN">`            |
|  **文档元数据**  |
|     `<head>`     |        包含文档元数据        |   双标签   |    无显示    |     否     |                         -                          |         包含 title、meta、link 等          |
|    `<title>`     | 文档标题（浏览器标签页显示） |   双标签   |    无显示    |     否     |                         -                          |         `<title>我的网页</title>`          |
|     `<meta>`     |        提供文档元数据        |   单标签   |    无显示    |     否     |            `charset`, `name`, `content`            |          `<meta charset="UTF-8">`          |
|     `<link>`     | 链接外部资源（CSS、图标等）  |   单标签   |    无显示    |     否     |               `rel`, `href`, `type`                | `<link rel="stylesheet" href="style.css">` |
|    `<style>`     |        内嵌 CSS 样式         |   双标签   |    无显示    |     否     |                  `type`, `media`                   |    `<style>body { margin: 0; }</style>`    |
|    `<script>`    |  嵌入或引用 JavaScript 代码  |   双标签   |    无显示    |     否     |          `src`, `type`, `async`, `defer`           |      `<script src="app.js"></script>`      |
|     `<base>`     |   指定相对 URL 的基础 URL    |   单标签   |    无显示    |     否     |                  `href`, `target`                  |    `<base href="https://example.com/">`    |
|   **内容分区**   |
|     `<body>`     |         文档内容主体         |   双标签   |     块级     |     否     |                         -                          |           所有可见内容都放在这里           |
|    `<header>`    |       页面或章节的页眉       |   双标签   |     块级     |     是     |                         -                          |         通常包含 logo、导航、标题          |
|     `<nav>`      |         导航链接区域         |   双标签   |     块级     |     是     |                    `aria-label`                    |          主要导航菜单，非所有链接          |
|     `<main>`     |         文档主要内容         |   双标签   |     块级     |     是     |                         -                          |             每个页面只能有一个             |
|   `<article>`    |      独立可分发的内容块      |   双标签   |     块级     |     是     |                         -                          |           博客文章、新闻、评论等           |
|   `<section>`    |        文档的独立章节        |   双标签   |     块级     |     是     |                         -                          |          应有标题，否则考虑用 div          |
|    `<aside>`     |    与主内容相关的侧边内容    |   双标签   |     块级     |     是     |                         -                          |            侧边栏、广告、引用等            |
|    `<footer>`    |       页面或章节的页脚       |   双标签   |     块级     |     是     |                         -                          |            版权信息、相关链接等            |
|     `<div>`      |         通用内容容器         |   双标签   |     块级     |     否     |               `class`, `id`, `style`               |         无语义，用于样式或脚本钩子         |
|     `<span>`     |         通用行内容器         |   双标签   |     行内     |     否     |               `class`, `id`, `style`               |         无语义，行内样式或脚本钩子         |
|   **文本内容**   |
|  `<h1>`~`<h6>`   |      标题元素（1-6 级）      |   双标签   |     块级     |     否     |                         -                          |            h1 最高级，h6 最低级            |
|      `<p>`       |             段落             |   双标签   |     块级     |     否     |                         -                          |                表示文本段落                |
|      `<br>`      |             换行             |   单标签   |     行内     |     否     |                         -                          |              在文本中强制换行              |
|      `<hr>`      |          主题分隔线          |   单标签   |     块级     |     否     |                         -                          |             视觉和语义上的分隔             |
|     `<pre>`      |         预格式化文本         |   双标签   |     块级     |     否     |                         -                          |          保留空格和换行，用于代码          |
|  `<blockquote>`  |            长引用            |   双标签   |     块级     |     否     |                       `cite`                       |      块级引用，cite 属性指定来源 URL       |
|      `<q>`       |          短行内引用          |   双标签   |     行内     |     否     |                       `cite`                       |           浏览器通常自动添加引号           |
|     `<cite>`     |           引用来源           |   双标签   |     行内     |     否     |                         -                          |                引用作品标题                |
|     `<code>`     |           内联代码           |   双标签   |     行内     |     否     |                         -                          |                显示代码片段                |
|     `<var>`      |             变量             |   双标签   |     行内     |     否     |                         -                          |               数学或编程变量               |
|     `<samp>`     |         程序输出示例         |   双标签   |     行内     |     否     |                         -                          |                程序输出结果                |
|     `<kbd>`      |           键盘输入           |   双标签   |     行内     |     否     |                         -                          |               用户应输入的键               |
|     `<abbr>`     |             缩写             |   双标签   |     行内     |     否     |                      `title`                       |           title 属性提供完整形式           |
|     `<dfn>`      |           术语定义           |   双标签   |     行内     |     否     |                         -                          |               包含术语的定义               |
|   `<address>`    |           联系信息           |   双标签   |     块级     |     否     |                         -                          |           作者/所有者的联系信息            |
|     `<time>`     |          日期/时间           |   双标签   |     行内     |     是     |                     `datetime`                     |       datetime 属性提供机器可读格式        |
|     `<mark>`     |         高亮标记文本         |   双标签   |     行内     |     是     |                         -                          |              突出显示相关内容              |
|     `<ruby>`     |           注音符号           |   双标签   |     行内     |     是     |                         -                          |              配合 rt、rp 使用              |
|      `<rt>`      |       ruby 文本的注解        |   双标签   |     行内     |     是     |                         -                          |                 注音或解释                 |
|      `<rp>`      |       ruby 注解的括号        |   双标签   |     行内     |     是     |                         -                          |          不支持 ruby 时的后备括号          |
|     `<bdi>`      |         隔离文本方向         |   双标签   |     行内     |     是     |                       `dir`                        |                双向文本隔离                |
|     `<bdo>`      |         覆盖文本方向         |   双标签   |     行内     |     否     |                       `dir`                        |          强制文本方向（ltr/rtl）           |
|     **列表**     |
|      `<ul>`      |           无序列表           |   双标签   |     块级     |     否     |                         -                          |               项目顺序不重要               |
|      `<ol>`      |           有序列表           |   双标签   |     块级     |     否     |            `type`, `start`, `reversed`             |                 项目有顺序                 |
|      `<li>`      |            列表项            |   双标签   |     块级     |     否     |                      `value`                       |           ul 或 ol 的直接子元素            |
|      `<dl>`      |           描述列表           |   双标签   |     块级     |     否     |                         -                          |               包含 dt 和 dd                |
|      `<dt>`      |        描述列表的术语        |   双标签   |     块级     |     否     |                         -                          |              描述列表中的术语              |
|      `<dd>`      |        描述列表的描述        |   双标签   |     块级     |     否     |                         -                          |               对应 dt 的描述               |
|   **文本语义**   |
|    `<strong>`    |           重要文本           |   双标签   |     行内     |     否     |                         -                          |            语义重要性，默认粗体            |
|      `<em>`      |           强调文本           |   双标签   |     行内     |     否     |                         -                          |             语义强调，默认斜体             |
|    `<small>`     |           附属细则           |   双标签   |     行内     |     否     |                         -                          |            小号文本，如版权声明            |
|      `<s>`       |     不再准确/相关的内容      |   双标签   |     行内     |     否     |                         -                          |                 删除线显示                 |
|     `<del>`      |         已删除的文本         |   双标签   |     行内     |     否     |                 `cite`, `datetime`                 |              表示已删除的内容              |
|     `<ins>`      |          插入的文本          |   双标签   |     行内     |     否     |                 `cite`, `datetime`                 |               表示新增的内容               |
|     `<sub>`      |           下标文本           |   双标签   |     行内     |     否     |                         -                          |               如 H₂O 中的 2                |
|     `<sup>`      |           上标文本           |   双标签   |     行内     |     否     |                         -                          |                如 x² 中的 2                |
|      `<i>`       |      技术术语/其他语言       |   双标签   |     行内     |     否     |                         -                          |             斜体，但无强调语义             |
|      `<b>`       |      引起注意但无重要性      |   双标签   |     行内     |     否     |                         -                          |            粗体，但无重要性语义            |
|      `<u>`       |     下划线文本（非链接）     |   双标签   |     行内     |     否     |                         -                          |            拼写错误、中文专名等            |
|  **链接和导航**  |
|      `<a>`       |            超链接            |   双标签   |     行内     |     否     |        `href`, `target`, `rel`, `download`         |                 创建超链接                 |
|     `<area>`     |         图像映射区域         |   单标签   |    无显示    |     否     |          `shape`, `coords`, `href`, `alt`          |               配合 map 使用                |
|     `<map>`      |           图像映射           |   双标签   |     块级     |     否     |                       `name`                       |             定义图像可点击区域             |
|     `<link>`     |     资源链接（见元数据）     |   单标签   |    无显示    |     否     |                         -                          |                     -                      |
| **多媒体和嵌入** |
|     `<img>`      |           嵌入图像           |   单标签   |    行内块    |     否     | `src`, `alt`, `width`, `height`, `srcset`, `sizes` |             必须提供 alt 属性              |
|    `<audio>`     |           嵌入音频           |   双标签   |    行内块    |     是     |   `src`, `controls`, `autoplay`, `loop`, `muted`   |              包含 source 元素              |
|    `<video>`     |           嵌入视频           |   双标签   |    行内块    |     是     |   `src`, `controls`, `width`, `height`, `poster`   |              包含 source 元素              |
|    `<source>`    |          媒体资源源          |   单标签   |    无显示    |     是     |     `src`, `type`, `media`, `srcset`, `sizes`      |         配合 picture、audio、video         |
|    `<track>`     |      媒体轨道（字幕等）      |   单标签   |    无显示    |     是     |         `src`, `kind`, `srclang`, `label`          |             配合 audio、video              |
|   `<picture>`    |        响应式图片容器        |   双标签   |     块级     |     是     |                         -                          |             包含 source 和 img             |
|    `<figure>`    |   独立内容单元（图、表等）   |   双标签   |     块级     |     是     |                         -                          |           包含内容及 figcaption            |
|  `<figcaption>`  |        figure 的标题         |   双标签   |     块级     |     是     |                         -                          |      figure 的第一个或最后一个子元素       |
|    `<embed>`     |         嵌入外部内容         |   单标签   |    行内块    |     否     |          `src`, `type`, `width`, `height`          |                  插件内容                  |
|    `<object>`    |         嵌入外部资源         |   双标签   |    行内块    |     否     |         `data`, `type`, `width`, `height`          |             图像、嵌套浏览器等             |
|    `<param>`     |         object 参数          |   单标签   |    无显示    |     否     |                  `name`, `value`                   |              配合 object 使用              |
|    `<iframe>`    |        嵌套浏览上下文        |   双标签   |    行内块    |     否     |    `src`, `width`, `height`, `title`, `sandbox`    |                嵌入其他网页                |
|    `<canvas>`    |         图形绘制画布         |   双标签   |    行内块    |     是     |                 `width`, `height`                  |          通过 JavaScript 绘制图形          |
|     `<svg>`      |        可缩放矢量图形        |   双标签   |    行内块    |     是     |            `width`, `height`, `viewBox`            |               内联 SVG 图形                |
|     **表格**     |
|    `<table>`     |             表格             |   双标签   |     块级     |     否     |       `border`, `cellpadding`, `cellspacing`       |                包含表格内容                |
|   `<caption>`    |           表格标题           |   双标签   |     块级     |     否     |                         -                          |            table 的第一个子元素            |
|    `<thead>`     |             表头             |   双标签   |     块级     |     否     |                         -                          |             包含一个或多个 tr              |
|    `<tbody>`     |             表体             |   双标签   |     块级     |     否     |                         -                          |                表格主要内容                |
|    `<tfoot>`     |             表脚             |   双标签   |     块级     |     否     |                         -                          |                  汇总行等                  |
|      `<tr>`      |            表格行            |   双标签   |     块级     |     否     |                         -                          |               包含 th 或 td                |
|      `<th>`      |          表头单元格          |   双标签   |     块级     |     否     |           `scope`, `colspan`, `rowspan`            |               表格标题单元格               |
|      `<td>`      |        表格数据单元格        |   双标签   |     块级     |     否     |                `colspan`, `rowspan`                |               表格数据单元格               |
|   `<colgroup>`   |             列组             |   双标签   |    无显示    |     否     |                       `span`                       |               包含 col 元素                |
|     `<col>`      |              列              |   单标签   |    无显示    |     否     |                       `span`                       |                 定义列属性                 |
|     **表单**     |
|     `<form>`     |         用户输入表单         |   双标签   |     块级     |     否     |   `action`, `method`, `enctype`, `autocomplete`    |                包含表单控件                |
|    `<input>`     |           输入控件           |   单标签   |    行内块    |     否     | `type`, `name`, `value`, `placeholder`, `required` |                多种输入类型                |
|   `<textarea>`   |         多行文本输入         |   双标签   |    行内块    |     否     |       `name`, `rows`, `cols`, `placeholder`        |                 多行文本域                 |
|    `<button>`    |             按钮             |   双标签   |    行内块    |     否     |        `type`, `name`, `value`, `disabled`         |            可提交表单或触发脚本            |
|    `<select>`    |           下拉选择           |   双标签   |    行内块    |     否     |             `name`, `multiple`, `size`             |              包含 option 元素              |
|    `<option>`    |            选择项            |   双标签   |    无显示    |     否     |          `value`, `selected`, `disabled`           |        select 或 datalist 的子元素         |
|   `<optgroup>`   |           选项分组           |   双标签   |    无显示    |     否     |                `label`, `disabled`                 |                包含 option                 |
|   `<datalist>`   |         输入选项列表         |   双标签   |    无显示    |     是     |                        `id`                        |         为 input 提供自动完成选项          |
|   `<fieldset>`   |         表单控件分组         |   双标签   |     块级     |     否     |                     `disabled`                     |           包含 legend 和表单控件           |
|    `<legend>`    |       fieldset 的标题        |   双标签   |     块级     |     否     |                         -                          |          fieldset 的第一个子元素           |
|    `<label>`     |         表单控件标签         |   双标签   |     行内     |     否     |                       `for`                        |               与表单控件关联               |
|    `<output>`    |         计算结果输出         |   双标签   |     行内     |     是     |                   `for`, `name`                    |             显示计算或脚本结果             |
|   `<progress>`   |            进度条            |   双标签   |    行内块    |     是     |                   `value`, `max`                   |                任务进度指示                |
|    `<meter>`     |          标量测量值          |   双标签   |    行内块    |     是     |  `value`, `min`, `max`, `low`, `high`, `optimum`   |               已知范围内的值               |
|   **交互元素**   |
|   `<details>`    |       折叠/展开小部件        |   双标签   |     块级     |     是     |                       `open`                       |            包含 summary 和内容             |
|   `<summary>`    |     details 的摘要/标题      |   双标签   |     块级     |     是     |                         -                          |           details 的第一个子元素           |
|    `<dialog>`    |        对话框/模态框         |   双标签   |     块级     |     是     |                       `open`                       |                 对话框窗口                 |
|     `<menu>`     |         菜单命令列表         |   双标签   |     块级     |     是     |                       `type`                       |             工具条或上下文菜单             |
|   `<menuitem>`   |       菜单项（已废弃）       |   双标签   |    无显示    |     是     |                         -                          |                 不建议使用                 |
|     **其他**     |
|     `<wbr>`      |         可选换行机会         |   单标签   |     行内     |     是     |                         -                          |           建议浏览器可在此处换行           |
|   `<template>`   |     可重复使用的内容模板     |   双标签   |    无显示    |     是     |                         -                          |              页面加载时不渲染              |
|     `<slot>`     |         Web 组件插槽         |   双标签   |    无显示    |     是     |                       `name`                       |            自定义元素的内容分发            |
|   `<noscript>`   |       脚本未启用时显示       |   双标签   |     块级     |     否     |                         -                          |           浏览器不支持脚本时显示           |
|     `<data>`     |          机器可读值          |   双标签   |     行内     |     是     |                      `value`                       |            提供内容的机器可读值            |

## 补充说明

### 显示类型说明

- **块级**：独占一行，可设置宽高，默认宽度 100%
- **行内**：不独占一行，宽高由内容决定，不能设置宽高
- **行内块**：不独占一行，但可设置宽高
- **无显示**：不参与文档流布局，仅提供元数据或功能

### HTML5 新增标签

- `<article>`, `<aside>`, `<audio>`, `<bdi>`, `<canvas>`, `<data>`, `<datalist>`
- `<details>`, `<dialog>`, `<embed>`, `<figcaption>`, `<figure>`, `<footer>`, `<header>`
- `<main>`, `<mark>`, `<menuitem>`, `<meter>`, `<nav>`, `<output>`, `<picture>`
- `<progress>`, `<rp>`, `<rt>`, `<ruby>`, `<section>`, `<source>`, `<summary>`
- `<template>`, `<time>`, `<track>`, `<video>`, `<wbr>`

### 已废弃标签（不应使用）

- `<acronym>`, `<applet>`, `<basefont>`, `<big>`, `<blink>`, `<center>`
- `<dir>`, `<font>`, `<frame>`, `<frameset>`, `<isindex>`, `<keygen>`
- `<marquee>`, `<menuitem>`, `<nobr>`, `<noembed>`, `<plaintext>`
- `<rb>`, `<rtc>`, `<shadow>`, `<spacer>`, `<strike>`, `<tt>`, `<xmp>`

### 全局属性（几乎所有标签都可用）

- `accesskey`, `class`, `contenteditable`, `data-*`, `dir`, `draggable`
- `hidden`, `id`, `lang`, `spellcheck`, `style`, `tabindex`, `title`
- `translate`, `role`, `aria-*`（可访问性属性）

<style lang=scss scop>
tr > td:nth-child(3), tr > td:nth-child(4) {
  white-space: nowrap;
}
</style>
