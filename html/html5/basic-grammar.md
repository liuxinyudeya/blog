# HTML 基础语法

## HTML 文档结构

### DOCTYPE 声明

DOCTYPE（文档类型）声明是 HTML 文档的第一行，用于告诉浏览器使用哪个 HTML 版本解析文档。

```html
<!DOCTYPE html>
```

HTML5 的 DOCTYPE 声明非常简单，确保浏览器以标准模式渲染页面。

### HTML 文档基本结构

一个完整的 HTML 文档包含以下基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>页面标题</title>
    <!-- 其他元信息和链接 -->
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

### 各个部分详解

#### 1. `<html>` 元素

- 整个 HTML 文档的根元素
- `lang` 属性指定文档的语言，有助于屏幕阅读器和搜索引擎
- 示例：`<html lang="zh-CN">` 表示中文简体

#### 2. `<head>` 元素

包含文档的元数据（metadata），不会直接显示在页面中，但包含重要信息：

```html
<head>
  <!-- 字符编码声明 -->
  <meta charset="UTF-8" />

  <!-- 视口设置，用于响应式设计 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- 页面标题（显示在浏览器标签页） -->
  <title>我的网页</title>

  <!-- 页面描述，影响SEO -->
  <meta name="description" content="页面描述内容" />

  <!-- 引入CSS文件 -->
  <link rel="stylesheet" href="styles.css" />

  <!-- 引入图标 -->
  <link rel="icon" href="favicon.ico" type="image/x-icon" />

  <!-- 其他元信息 -->
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="作者名" />
</head>
```

#### 3. `<body>` 元素

包含所有显示在浏览器中的内容：

```html
<body>
  <!-- 页眉 -->
  <header>
    <h1>网站标题</h1>
    <nav>
      <ul>
        <li><a href="#home">首页</a></li>
        <li><a href="#about">关于</a></li>
      </ul>
    </nav>
  </header>

  <!-- 主要内容 -->
  <main>
    <article>
      <h2>文章标题</h2>
      <p>文章内容...</p>
    </article>
  </main>

  <!-- 页脚 -->
  <footer>
    <p>&copy; 2023 我的网站</p>
  </footer>
</body>
```

## 标签、元素、属性概念

### 1. 标签（Tags）

HTML 标签是尖括号包围的关键词，通常成对出现：

```html
<!-- 开始标签 -->
<p>
  <!-- 结束标签 -->
</p>

<!-- 自闭合标签（单标签） -->
<img src="image.jpg" alt="描述" />
<br />
<hr />
<input type="text" />
```

#### 常见标签分类

| 标签类型   | 示例                                         | 说明                       |
| ---------- | -------------------------------------------- | -------------------------- |
| 块级元素   | `<div>`, `<p>`, `<h1>-<h6>`, `<ul>`, `<li>`  | 独占一行，可设置宽高       |
| 行内元素   | `<span>`, `<a>`, `<strong>`, `<em>`          | 不独占一行，宽高由内容决定 |
| 行内块元素 | `<img>`, `<input>`, `<button>`               | 行内显示但可设置宽高       |
| 语义化标签 | `<header>`, `<nav>`, `<article>`, `<footer>` | HTML5 新增，描述内容意义   |

### 2. 元素（Elements）

元素 = 开始标签 + 内容 + 结束标签

```html
<!-- 一个完整的段落元素 -->
<p>这是一个段落。</p>

<!-- 嵌套元素 -->
<div>
  <h1>标题</h1>
  <p>段落文本，包含<strong>强调</strong>内容。</p>
</div>
```

### 3. 属性（Attributes）

属性提供元素的附加信息，总是出现在开始标签中：

```html
<!-- 基本属性语法：属性名="属性值" -->
<a href="https://example.com" title="示例网站" target="_blank">访问网站</a>

<!-- 多个属性用空格分隔 -->
<img src="photo.jpg" alt="照片描述" width="300" height="200" />

<!-- 布尔属性（只有属性名） -->
<input type="checkbox" checked />
<button disabled>不可点击</button>
```

#### 常见 HTML 属性

| 属性     | 适用元素                        | 说明                           |
| -------- | ------------------------------- | ------------------------------ |
| `id`     | 所有元素                        | 唯一标识符，一个页面中应唯一   |
| `class`  | 所有元素                        | 类名，可重复用于样式和 JS 操作 |
| `style`  | 所有元素                        | 内联 CSS 样式                  |
| `src`    | `<img>`, `<script>`, `<iframe>` | 资源路径                       |
| `href`   | `<a>`, `<link>`                 | 链接地址                       |
| `alt`    | `<img>`                         | 图片替代文本（无障碍访问必需） |
| `title`  | 大多数元素                      | 提示文本（鼠标悬停时显示）     |
| `data-*` | 所有元素                        | 自定义数据属性                 |

## 注释与编码声明

### 1. HTML 注释

注释不会在浏览器中显示，用于代码说明和调试：

```html
<!-- 这是单行注释 -->

<!-- 
    这是
    多行
    注释
-->

<!-- 注释掉一段代码 -->
<!--
<div class="old-version">
    <p>这段内容暂时不显示</p>
</div>
-->

<!-- TODO: 待完成的功能 -->
<!-- FIXME: 需要修复的问题 -->
```

### 2. 字符编码声明

#### 为什么需要编码声明？

确保浏览器正确显示特殊字符和多种语言：

```html
<!-- 正确设置前：乱码 -->
æ–‡å­—ä¹±ç 

<!-- 正确设置后：正常显示 -->
文字正常显示
```

#### 设置字符编码

在 `<head>` 的最开始位置声明：

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <!-- 必须放在head的最前面 -->
    <meta charset="UTF-8" />
    <!-- 其他meta标签 -->
    <title>页面标题</title>
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

#### 常用字符编码

| 编码       | 说明                        | 推荐用途               |
| ---------- | --------------------------- | ---------------------- |
| UTF-8      | 通用字符集，支持所有语言    | **推荐**，现代网页标准 |
| GB2312     | 简体中文编码                | 旧版中文网站           |
| GBK        | 扩展的 GB2312，支持更多汉字 | 中文环境               |
| ISO-8859-1 | 拉丁字母编码                | 西欧语言               |

#### 编码声明的重要性

1. **防止乱码**：确保中文、特殊符号正确显示
2. **SEO 优化**：帮助搜索引擎正确解析页面内容
3. **国际化**：支持多语言网站
4. **安全**：防止某些编码相关的安全漏洞

### 3. 完整的 HTML5 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <!-- 字符编码（必须放在第一行） -->
    <meta charset="UTF-8" />

    <!-- 视口设置，响应式必备 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 浏览器兼容性设置 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <!-- 页面标题 -->
    <title>HTML基础教程</title>

    <!-- 页面描述，SEO重要 -->
    <meta
      name="description"
      content="学习HTML基础语法，包括文档结构、标签元素属性和编码声明"
    />

    <!-- 关键词（现代SEO权重降低，但仍有用） -->
    <meta name="keywords" content="HTML, 基础语法, 网页开发" />

    <!-- 作者信息 -->
    <meta name="author" content="你的名字" />

    <!-- 引入CSS -->
    <link rel="stylesheet" href="styles.css" />

    <!-- 网站图标 -->
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />

    <!-- 主题颜色（某些浏览器支持） -->
    <meta name="theme-color" content="#3a7bd5" />
  </head>
  <body>
    <!-- 页面内容开始 -->
    <header>
      <h1>HTML基础语法</h1>
      <nav>
        <ul>
          <li><a href="#structure">文档结构</a></li>
          <li><a href="#elements">元素属性</a></li>
          <li><a href="#encoding">编码声明</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <article id="structure">
        <h2>HTML文档结构</h2>
        <p>一个标准的HTML文档包含DOCTYPE声明、html、head和body等部分。</p>
        <!-- 更多内容 -->
      </article>
    </main>

    <footer>
      <p>&copy; 2023 HTML教程. 保留所有权利。</p>
    </footer>

    <!-- 引入JavaScript -->
    <script src="script.js"></script>
  </body>
</html>
```

### 4. 最佳实践建议

1. **始终使用 `<!DOCTYPE html>`** 声明 HTML5 文档类型
2. **指定文档语言**：`<html lang="zh-CN">` 有助于辅助技术和 SEO
3. **字符编码优先**：将 `<meta charset="UTF-8">` 放在 `<head>` 的最前面
4. **使用语义化标签**：如 `<header>`, `<nav>`, `<main>`, `<footer>` 等
5. **为图片添加 alt 属性**：提高无障碍访问性和 SEO
6. **注释要适度**：良好的代码结构和命名可以减少不必要的注释
7. **保持代码整洁**：正确缩进，合理使用空行分隔代码块

## 总结

HTML 是网页开发的基础，理解文档结构、标签元素属性和编码声明是创建标准网页的第一步。

通过合理使用语义化标签、正确设置编码和遵循最佳实践，可以创建出结构清晰、兼容性好且易于维护的网页。

**关键要点：**

- DOCTYPE 声明确保浏览器正确解析
- 使用完整的 HTML 文档结构
- 理解标签、元素和属性的区别与用法
- 始终使用 UTF-8 编码并正确声明
- 合理使用注释提高代码可读性
