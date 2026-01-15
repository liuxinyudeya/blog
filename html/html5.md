# HTML

**HTML** 超文本标记语言（`HyperText` `Markup` `Language`）它构成 Web 世界的一砖一瓦。

它定义了网页内容的含义和结构，除 HTML 以外的其他技术则通常用来描述一个网页的表现与展示效果（如 [CSS](/css/css3.md)），或功能与行为（如 [JavaScript](/js/javascript.md)）。

1. 超文本（Hypertext）指 超越传统线性文本的能力

   - 传统文本：按顺序阅读（线性），而超文本：通过超链接任意跳转。如:从本文章点击链接到达[MDN](https://developer.mozilla.org/zh-CN/docs/)
   - 不仅是纯文本，还能嵌入图片、视频等多媒体内容，将不同类型的媒体"链接"在一起。

2. 标记（Markup）

   - "标记" 指用标签描述内容结构和语义：如段落、标题、列表等。
   - 描述性而非过程性：描述"这是什么"，而不是"做什么"，如：`<p>content</p>`

3. 语言（Language）
   - 遵循一套规则和语法，如标签语法：`<h1>标题</h1>`。
   - 与浏览器"对话"：开发者用 HTML"告诉"浏览器如何显示内容。浏览器解析 HTML 并展示。

## html 基本结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文档标题</title>
    <!-- 其他元数据、样式表、脚本链接等 -->
  </head>
  <body>
    <!-- 页面可见内容 -->
  </body>
</html>
```

### DOCTYPE 声明

`<!DOCTYPE html>` 告诉浏览器使用哪个 HTML 版本解析文档。

html5 的文档类型声明更简洁，不再引用具体的 DTD 文件。

```html
<!-- HTML 5 -->
<!DOCTYPE html>

<!--  HTML 4.01 严格模式 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 严格模式 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

### HEAD 文档头部

`HEAD`包含元数据（metadata）——关于文档的信息，不直接显示在页面上

```html
<head>
  <!-- 字符编码（必须在最前面） -->
  <meta charset="UTF-8" />

  <!-- 视口设置（响应式设计必需） -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- 文档标题 -->
  <title>我的网页 - 网站名称</title>
</head>
```

常用元数据元素：

|                                                      元素                                                      |             用途             |
| :------------------------------------------------------------------------------------------------------------: | :--------------------------: |
|                                            `<meta charset="UTF-8">`                                            |           字符编码           |
|                                       `<title>产品页面 - 公司名</title>`                                       | 页面标题（浏览器标签页显示） |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">` |         移动设备适配         |
|                               `<meta name="description" content="页面简短描述">`                               |     页面描述（SEO 重要）     |
|                           `<link rel="icon" href="favicon.ico" type="image/x-icon">`                           |           网站图标           |

### BODY 文档主体

`body`中包含所有页面可见内容:

```html
<body>
  <!-- 1. 页眉 -->
  <header>
    <nav>
      <!-- 导航 -->
    </nav>
  </header>

  <!-- 2. 主内容区 -->
  <main>
    <article>
      <!-- 主要内容 -->
    </article>

    <aside>
      <!-- 侧边栏 -->
    </aside>
  </main>

  <!-- 3. 页脚 -->
  <footer>
    <!-- 版权信息、链接等 -->
  </footer>
</body>
```

## 语义化结构

语义化 HTML 意味着使用恰当的标签来表达内容的含义，而不仅仅是样式。

### 示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>技术博客 - HTML5 结构详解</title>
    <meta name="description" content="深入解析HTML5语义化标签的使用方法" />
    <link rel="stylesheet" href="styles.css" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <!-- 预加载关键资源 -->
    <link rel="preload" href="critical.css" as="style" />
  </head>
  <body>
    <!-- 跳过导航链接（可访问性功能） -->
    <a href="#main-content" class="skip-link">跳转到主内容</a>

    <!-- 网站页眉 -->
    <header class="site-header">
      <div class="logo">
        <h1><a href="/">技术博客</a></h1>
      </div>
      <nav aria-label="主导航">
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="/tutorials">教程</a></li>
          <li><a href="/examples">示例</a></li>
          <li><a href="/contact">联系</a></li>
        </ul>
      </nav>
      <div class="search" role="search">
        <input type="search" placeholder="搜索..." />
      </div>
    </header>

    <!-- 主内容区 -->
    <main id="main-content">
      <!-- 文章区 -->
      <article class="blog-post">
        <header class="post-header">
          <h1>HTML5 语义化标签详解</h1>
          <div class="post-meta">
            <time datetime="2024-01-15">2024年1月15日</time>
            <span class="author">作者：李技术</span>
          </div>
        </header>

        <section class="post-content">
          <h2>什么是语义化标签</h2>
          <p>HTML5引入了新的语义化标签...</p>

          <h3>主要优点</h3>
          <ul>
            <li>更好的可访问性</li>
            <li>更清晰的代码结构</li>
            <li>SEO优化</li>
          </ul>

          <figure>
            <img src="html5-structure.png" alt="HTML5文档结构图示" />
            <figcaption>HTML5文档结构示意图</figcaption>
          </figure>
        </section>

        <footer class="post-footer">
          <div class="tags">
            <span>标签：</span>
            <a href="/tag/html">HTML</a>
            <a href="/tag/semantic">语义化</a>
          </div>
        </footer>
      </article>

      <!-- 侧边栏 -->
      <aside class="sidebar">
        <section class="related-articles">
          <h2>相关文章</h2>
          <ul>
            <li><a href="/css-grid">CSS Grid布局教程</a></li>
            <li><a href="/responsive-design">响应式设计指南</a></li>
          </ul>
        </section>
      </aside>
    </main>

    <!-- 网站页脚 -->
    <footer class="site-footer">
      <div class="footer-content">
        <p>&copy; 2025 技术博客. 保留所有权利.</p>
        <nav aria-label="页脚导航">
          <ul>
            <li><a href="/privacy">隐私政策</a></li>
            <li><a href="/terms">使用条款</a></li>
            <li><a href="/sitemap">网站地图</a></li>
          </ul>
        </nav>
      </div>
    </footer>

    <!-- 脚本 -->
    <script src="main.js" defer></script>
  </body>
</html>
```

### 核心原则

语义优先于样式：

```html
<!-- 不推荐：使用CSS类表达语义 -->
<div class="header">...</div>
<div class="nav">...</div>

<!-- 推荐：使用语义化标签 -->
<header>...</header>
<nav>...</nav>
```

内容决定标签选择：

```html
<!-- 不推荐：滥用div -->
<div class="article">...</div>

<!-- 推荐：根据内容本质选择 -->
<article>博客文章</article>
<section>章节内容</section>
<aside>相关内容</aside>
```

### 具体标签使用

页面结构标签：

:::code-group

```html [页眉/标题区]
<!-- 正确用法 -->
<header>
  <h1>网站主标题</h1>
  <p>网站口号或描述</p>
  <nav>主要导航</nav>
</header>

<!-- 也可用于文章内部 -->
<article>
  <header>
    <h2>文章标题</h2>
    <p class="byline">作者：张三</p>
  </header>
</article>

<!-- 注意事项 -->
<!-- - 一个页面可以有多个<header> -->
<!-- - 通常包含h1-h6、logo、导航等 -->
<!-- - 不是分节元素，不会影响文档大纲 -->
```

```html [导航区域]
<!-- 主要网站导航 -->
<nav aria-label="主要导航">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>

<!-- 文章内部导航 -->
<article>
  <nav aria-label="文章目录">
    <h2>目录</h2>
    <ol>
      <li><a href="#intro">介绍</a></li>
      <li><a href="#methods">方法</a></li>
    </ol>
  </nav>
</article>

<!-- 最佳实践 -->
<!-- 1. 通常用<ul>或<ol>包裹链接 -->
<!-- 2. 使用aria-label描述导航目的 -->
<!-- 3. 非所有链接组都需要<nav>，只有主要导航才需要 -->
```

```html [主内容区]
<body>
  <header>...</header>

  <main id="main-content">
    <!-- 页面的主要、唯一内容 -->
    <article>...</article>
    <section>...</section>
  </main>

  <aside>...</aside>
  <footer>...</footer>
</body>

<!-- 重要规则 -->
<!-- - 每个页面只能有一个<main> -->
<!-- - 不能是<article>、<aside>、<footer>、<header>或<nav>的后代 -->
<!-- - 应该包含skip link的跳转目标 -->
```

```html [独立内容块]
<!-- 独立可分发的内容 -->
<article>
  <header>
    <h2>如何学习HTML语义化</h2>
    <time datetime="2024-01-15">2024年1月15日</time>
  </header>

  <p>文章内容...</p>

  <footer>
    <p>标签：HTML, 语义化</p>
  </footer>
</article>

<!-- 适用场景 -->
<!-- - 博客文章 - 新闻文章 - 论坛帖子 - 用户评论（嵌套在父文章中） -->
<!-- - 独立的小部件（在RSS中可单独分发） -->

<!-- 可以嵌套 -->
<article class="blog-post">
  <h2>主文章标题</h2>

  <!-- 嵌套文章（如评论区每条评论） -->
  <section class="comments">
    <article class="comment">
      <p>用户评论内容...</p>
    </article>
  </section>
</article>
```

```html [文档章节]
<article>
  <h1>JavaScript教程</h1>

  <section id="intro">
    <h2>介绍</h2>
    <p>JavaScript是什么...</p>
  </section>

  <section id="basics">
    <h2>基础语法</h2>
    <p>变量、函数等...</p>
  </section>
</section>

<!-- 与<div>的区别 -->
<section>有语义意义，应包含标题
<div>无语义，纯样式或脚本钩子

<!-- 常见错误 -->
<!-- 错误：没有标题的section -->
<section>
  <p>一些内容...</p> <!-- 缺少h1-h6 -->
</section>

<!-- 正确：要么加标题，要么用div -->
<section>
  <h2>章节标题</h2>
  <p>一些内容...</p>
</section>
<!-- 或 -->
<div class="content-block">
  <p>一些内容...</p>
</div>
```

```html [相关内容]
<!-- 在主内容旁的相关内容 -->
<main>
  <article>
    <h1>主要文章</h1>
    <p>文章内容...</p>
  </article>

  <aside>
    <h2>相关阅读</h2>
    <ul>
      <li><a href="#">相关文章1</a></li>
    </ul>
  </aside>
</main>

<!-- 也可用于文章内部 -->
<article>
  <h1>科学发现</h1>
  <p>主要内容...</p>

  <aside>
    <p><strong>注：</strong>这个发现于2023年公布。</p>
  </aside>
</article>

<!-- 不能独立存在 -->
<!-- 错误 -->
<body>
  <aside>...</aside>
  <!-- 缺少主内容 -->
</body>
```

```html [页脚]
<!-- 页面页脚 -->
<footer>
  <p>&copy; 2024 公司名</p>
  <nav>
    <ul>
      <li><a href="/privacy">隐私政策</a></li>
    </ul>
  </nav>
</footer>

<!-- 文章页脚 -->
<article>
  <h1>文章标题</h1>
  <p>内容...</p>

  <footer>
    <p>作者：张三</p>
    <p>发布于：<time datetime="2024-01-15">2024年1月15日</time></p>
  </footer>
</article>
```

:::

文本内容标签:
:::code-group

```html [标题层级]
<!-- 正确：逻辑层级 -->
<h1>页面主标题（通常一个）</h1>
<h2>第一部分</h2>
<h3>1.1 子章节</h3>
<h3>1.2 子章节</h3>
<h2>第二部分</h2>

<!-- 错误：跳过层级 -->
<h1>主标题</h1>
<h3>直接跳到h3</h3>
<!-- 错误！缺少h2 -->

<!-- 在section/article中重新开始 -->
<article>
  <h1>文章标题</h1>
  <!-- 这里的h1只在文章内有效 -->
  <section>
    <h2>文章内章节</h2>
  </section>
</article>
```

```html [段落和分组]
<!-- <p> 用于段落 -->
<p>这是一个完整的段落，表达一个完整的思想。</p>
<p>这是另一个段落。</p>

<!-- <hr> 用于主题分隔 -->
<section>
  <h2>第一部分</h2>
  <p>内容...</p>
</section>

<hr />
<!-- 视觉和语义上的分隔 -->

<section>
  <h2>第二部分</h2>
  <p>内容...</p>
</section>

<!-- <pre> 保留格式 -->
<pre>
function hello() {
  console.log("Hello World");
}
</pre>

<!-- <blockquote> 长引用 -->
<blockquote cite="https://example.com">
  <p>这是一个长引用，可能跨越多行...</p>
  <footer>— 作者, <cite>作品名</cite></footer>
</blockquote>

<!-- <q> 短行内引用 -->
<p>正如<q>知识就是力量</q>所说，学习很重要。</p>
```

```html [文本强调]
<!-- <strong> 重要性 -->
<p><strong>警告：</strong>此操作不可逆。</p>

<!-- <em> 强调 -->
<p>你真的<em>必须</em>完成这个任务。</p>

<!-- <mark> 高亮/突出 -->
<p>搜索关键词：<mark>语义化HTML</mark></p>

<!-- <small> 附属细则 -->
<p>价格：$100 <small>不含税</small></p>

<!-- <cite> 引用来源 -->
<p>来自<cite>《Web开发指南》</cite>一书</p>

<!-- <dfn> 术语定义 -->
<p><dfn>HTML</dfn>是超文本标记语言。</p>

<!-- <abbr> 缩写 -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- <time> 时间 -->
<time datetime="2024-01-15T09:00">2024年1月15日 上午9:00</time>
```

```html [列表使用]
<!-- <ul> 无序列表（项目间无顺序） -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<!-- <ol> 有序列表（项目有顺序） -->
<ol>
  <li>第一步：准备材料</li>
  <li>第二步：混合材料</li>
  <li>第三步：烘烤</li>
</ol>

<!-- <dl> 描述列表（名称-值对） -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言</dd>

  <dt>CSS</dt>
  <dd>层叠样式表</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
  <li>
    水果
    <ul>
      <li>苹果</li>
      <li>香蕉</li>
    </ul>
  </li>
  <li>蔬菜</li>
</ul>
```

:::

多媒体和嵌入内容:

:::code-group

```html [figure | figcaption]
<figure>
  <img src="chart.png" alt="2024年销售趋势图" />
  <figcaption>图1：2024年各季度销售数据对比</figcaption>
</figure>

<!-- 多个内容 -->
<figure>
  <pre><code>const x = 10;</code></pre>
  <figcaption>代码示例1：变量声明</figcaption>
</figure>

<!-- 可包含多个媒体 -->
<figure>
  <img src="location.png" alt="位置地图" />
  <audio controls>
    <source src="location-audio.mp3" type="audio/mpeg" />
  </audio>
  <figcaption>图2：位置地图及相关说明音频</figcaption>
</figure>
```

```html [响应式图片]
<picture>
  <!-- 视口较宽时用横版图 -->
  <source media="(min-width: 1200px)" srcset="image-wide.jpg" />

  <!-- 中等屏幕用方图 -->
  <source media="(min-width: 768px)" srcset="image-square.jpg" />

  <!-- 备用：img必须有 -->
  <img src="image-default.jpg" alt="描述文字" />
</picture>
```

:::
