# CSS 基础语法

## CSS 规则结构

### 基本规则结构

CSS（层叠样式表）由一系列规则组成，每个规则由选择器和声明块构成。

```css
/* 基本语法 */
选择器 {
  属性: 值;
  属性: 值;
  /* 更多声明 */
}
```

### 规则组成详解

#### 1. 选择器（Selector）

指定要应用样式的 HTML 元素。

```css
/* 选择所有<p>元素 */
p {
  color: blue;
}

/* 选择所有class为"content"的元素 */
.content {
  font-size: 16px;
}

/* 选择id为"header"的元素 */
#header {
  background-color: #f0f0f0;
}
```

#### 2. 声明块（Declaration Block）

包含在大括号 `{}` 内的一组声明。

```css
/* 声明块示例 */
h1 {
  /* 这是一个声明块 */
  color: #333; /* 声明1 */
  font-size: 24px; /* 声明2 */
  margin-bottom: 20px; /* 声明3 */
  /* 更多声明... */
}
```

#### 3. 声明（Declaration）

由属性和值组成，以分号结束。

```css
/* 单个声明 */
属性: 值;

/* 实际示例 */
color: red; /* 属性: color, 值: red */
font-size: 16px; /* 属性: font-size, 值: 16px */
margin: 10px 20px; /* 属性: margin, 值: 10px 20px */
```

### CSS 规则示例

#### 简单规则

```css
/* 段落样式 */
p {
  color: #333;
  line-height: 1.6;
  margin: 0 0 1em 0;
}

/* 链接样式 */
a {
  color: #0066cc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  color: #004499;
}
```

#### 复合规则

```css
/* 多个选择器共享相同样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-weight: bold;
  color: #222;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

/* 为不同元素设置不同样式 */
h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.75rem;
}
h4 {
  font-size: 1.5rem;
}
h5 {
  font-size: 1.25rem;
}
h6 {
  font-size: 1rem;
}
```

#### 嵌套规则（预处理器）

```scss
/* Sass/SCSS 语法（不是原生CSS） */
.navbar {
  background: #333;
  padding: 1rem;

  .nav-item {
    display: inline-block;
    margin-right: 1rem;

    &:hover {
      background: #555;
    }

    a {
      color: white;
      text-decoration: none;
    }
  }
}
```

## 选择器类型

### 元素选择器

根据 HTML 元素名称选择元素。

```css
/* 选择所有段落 */
p {
  color: #333;
}

/* 选择所有标题 */
h1,
h2,
h3 {
  font-weight: bold;
}

/* 选择所有列表项 */
li {
  list-style-type: disc;
  margin-left: 20px;
}

/* 选择所有链接 */
a {
  color: blue;
  text-decoration: underline;
}

/* 选择所有图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 选择特定元素组合 */
header,
footer {
  background-color: #f8f9fa;
  padding: 20px;
}

article p {
  line-height: 1.8;
}
```

### 类选择器

根据元素的 class 属性选择元素。

```css
/* 基本类选择器 */
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

/* 元素特定的类选择器 */
p.important {
  font-weight: bold;
  color: #d9534f;
  border-left: 4px solid #d9534f;
  padding-left: 10px;
}

/* 多个类选择器 */
.btn.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn.btn-large {
  padding: 15px 30px;
  font-size: 1.2rem;
}

/* 状态类 */
.is-active {
  background-color: #e8f4fd;
  border-color: #007bff;
}

.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* BEM 命名法示例 */
.button {
} /* 块 */
.button__icon {
} /* 元素 */
.button--large {
} /* 修饰符 */
.button--disabled {
} /* 修饰符 */

/* 实用类 */
.text-center {
  text-align: center;
}

.mt-20 {
  margin-top: 20px;
}

.d-none {
  display: none;
}

.d-flex {
  display: flex;
}
```

### ID 选择器

根据元素的 id 属性选择元素。

```css
/* 基本ID选择器 */
#header {
  background-color: #333;
  color: white;
  padding: 20px;
}

#main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

#footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  padding: 30px 0;
  text-align: center;
}

/* 配合其他选择器使用 */
div#sidebar {
  width: 300px;
  float: right;
  background-color: #f5f5f5;
}

#contact-form input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

/* 页面特定样式 */
#home-page .hero {
  height: 500px;
  background-image: url("hero-bg.jpg");
  background-size: cover;
}

#about-page .team-section {
  padding: 60px 0;
}
```

**重要注意事项：**

- ID 应该是唯一的（一个页面中只出现一次）
- ID 选择器的优先级比类选择器高
- 避免过度使用 ID 选择器，因为难以复用

### 属性选择器

根据元素的属性选择元素。

```css
/* 基本属性选择器 */
[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

[href] {
  color: #0066cc;
}

/* 属性值选择器 */
[type="text"] {
  border: 1px solid #ccc;
  padding: 8px;
}

[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
}

/* 属性包含选择器 */
[class*="btn-"] {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

[href*="example.com"] {
  color: green;
}

/* 属性开始选择器 */
[href^="https://"]
{
  color: green;
}

[class^="icon-"] {
  font-family: "Material Icons";
}

/* 属性结束选择器 */
[href$=".pdf"] {
  background-image: url("pdf-icon.png");
  padding-right: 20px;
  background-repeat: no-repeat;
  background-position: right center;
}

[src$=".jpg"],
[src$=".png"],
[src$=".gif"] {
  border: 1px solid #ddd;
  padding: 3px;
}

/* 属性空格分隔选择器 */
[class~="button"] {
  display: inline-block;
  padding: 10px 20px;
}

/* 属性连字符选择器 */
[lang|="zh"] {
  font-family: "Microsoft YaHei", sans-serif;
}
```

#### 属性选择器组合使用

```css
/* 多个属性组合 */
input[type="text"][required] {
  border-color: #ffcc00;
  background-color: #fffde7;
}

a[href][target="_blank"] {
  background-image: url("external-link.png");
  padding-right: 15px;
  background-repeat: no-repeat;
  background-position: right center;
}

/* 配合其他选择器使用 */
form[data-validate="true"] input.error {
  border-color: #dc3545;
  background-color: #f8d7da;
}

div[data-widget="slider"] .slide {
  width: 100%;
  height: 400px;
  position: relative;
}

/* 用于表单验证样式 */
input:invalid[required] {
  border-color: #dc3545;
}

input:valid[required] {
  border-color: #28a745;
}
```

### 其他选择器类型

#### 伪类选择器

```css
/* 链接状态 */
a:link {
  color: blue;
} /* 未访问的链接 */
a:visited {
  color: purple;
} /* 已访问的链接 */
a:hover {
  text-decoration: underline;
} /* 鼠标悬停 */
a:active {
  color: red;
} /* 激活状态 */

/* 表单状态 */
input:focus {
  outline: 2px solid #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

input:checked {
  accent-color: #007bff;
}

/* 结构伪类 */
li:first-child {
  margin-top: 0;
}
li:last-child {
  margin-bottom: 0;
}
li:nth-child(odd) {
  background-color: #f8f9fa;
}
li:nth-child(even) {
  background-color: #e9ecef;
}
li:nth-child(3n) {
  color: #007bff;
}

/* 其他伪类 */
p:empty {
  display: none;
}
div:not(.exclude) {
  border: 1px solid #ddd;
}
input:required {
  border-left: 3px solid #007bff;
}
```

#### 伪元素选择器

```css
/* 添加内容 */
p::before {
  content: "📌 ";
  color: #007bff;
}

blockquote::after {
  content: " — 引用";
  font-style: italic;
  color: #666;
}

/* 首字母/首行 */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  float: left;
  margin-right: 5px;
  line-height: 1;
}

p::first-line {
  font-weight: bold;
  color: #333;
}

/* 选择用户选中的文本 */
::selection {
  background-color: #007bff;
  color: white;
}

/* 占位符文本 */
input::placeholder {
  color: #999;
  font-style: italic;
}
```

#### 组合选择器

```css
/* 后代选择器 (空格) */
article p {
  line-height: 1.8;
  margin-bottom: 1em;
}

.container .item {
  padding: 10px;
}

/* 子选择器 (>) */
nav > ul {
  list-style: none;
  padding: 0;
}

.sidebar > .widget {
  margin-bottom: 20px;
}

/* 相邻兄弟选择器 (+) */
h1 + p {
  font-size: 1.2em;
  color: #666;
  margin-top: -10px;
}

li.active + li {
  border-top: 1px solid #ddd;
}

/* 通用兄弟选择器 (~) */
h2 ~ p {
  margin-left: 20px;
}

input:checked ~ .content {
  display: block;
}

/* 交集选择器 (无空格) */
h1.special {
  color: #ff6600;
  border-bottom: 2px solid #ff6600;
}

button.primary.large {
  padding: 15px 30px;
  font-size: 1.2em;
}

/* 并集选择器 (,) */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  color: #222;
}

.btn-primary,
.btn-secondary,
.btn-success {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
```

#### 选择器优先级（特殊性）

```css
/* 优先级从高到低： */

/* 1. !important（最高优先级） */
#header {
  color: red !important; /* 特殊情况下使用 */
}

/* 2. 行内样式（1000） */
/* <div style="color: blue;"> */

/* 3. ID选择器（100） */
#content {
  color: green;
}

/* 4. 类/属性/伪类选择器（10） */
.container {
  color: blue;
}
[type="text"] {
  color: blue;
}
:hover {
  color: blue;
}

/* 5. 元素/伪元素选择器（1） */
div {
  color: black;
}
::before {
  color: black;
}

/* 6. 通配符选择器（0） */
* {
  margin: 0;
  padding: 0;
}

/* 继承的样式（无特殊性） */
/* 子元素继承父元素的样式，如color、font-family等 */

/* 优先级计算示例 */
#nav .item a:hover {
  /* 100 + 10 + 1 + 10 = 121 */
  color: red;
}

div#header ul.nav li a {
  /* 1 + 100 + 1 + 10 + 1 + 1 = 114 */
  color: blue;
}
```

## 注释与书写规范

### CSS 注释

#### 单行注释

```css
/* 这是一个单行注释 */

/* 设置页面背景色 */
body {
  background-color: #f5f5f5; /* 浅灰色背景 */
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

#### 多行注释

```css
/*
 * 这是多行注释
 * 通常用于较长的描述
 * 可以跨越多行
 */

/*
 * 页面布局样式
 * 作者：张三
 * 日期：2024-01-20
 * 版本：1.0.0
 */

/*
 * 媒体查询
 * 响应式设计
 * 移动端优先
 */
```

#### 注释的最佳用途

```css
/* ============================================
   SECTION HEADER
   ============================================ */

/* 
 * 1.0 导航栏样式
 * ---------------------------
 * 包含主导航和移动端菜单
 */

.navbar {
  /* 背景和边框 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  /* 间距 */
  padding: 1rem 0; /* 垂直1rem，水平0 */

  /* 定位 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

/* TODO: 需要优化移动端样式 */
.mobile-menu {
  display: none; /* 暂时隐藏，稍后实现 */
}

/* FIXME: IE11兼容性问题 */
.grid {
  display: grid;
  display: -ms-grid; /* IE11兼容 */
}

/* NOTE: 重要提醒 */
/* 不要修改这个选择器，它在多个地方被引用 */
.important-class {
  color: red;
}

/* ============================================
   2.0 按钮样式
   ============================================ */

.btn {
  /* 基础样式 */
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  /* 文本样式 */
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  line-height: 1.5;

  /* 过渡效果 */
  transition: all 0.3s ease;
}

/* 禁用状态样式 */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### 代码书写规范

#### 缩进与空格

```css
/* 推荐：2个空格缩进 */
.selector {
  property: value;
}

/* 不推荐：制表符或不一致缩进 */
.selector {
  property: value;
}

/* 推荐：冒号后加空格 */
.selector {
  color: #333;
  margin: 0 auto;
  font-size: 16px;
}

/* 不推荐：冒号后无空格 */
.selector {
  color: #333;
  margin: 0 auto;
  font-size: 16px;
}

/* 推荐：选择器后加空格 */
.selector {
  /* ... */
}

/* 不推荐：选择器后无空格 */
.selector {
  /* ... */
}
```

#### 分号与大括号

```css
/* 推荐：每个声明以分号结束 */
.selector {
  color: red;
  font-size: 16px;
  margin: 10px;
}

/* 不推荐：缺少分号 */
.selector {
  color: red;
  font-size: 16px  /* 缺少分号 */
  margin: 10px;
}

/* 推荐：左大括号在选择器同一行 */
.selector {
  /* ... */
}

/* 不推荐：左大括号单独一行 */
.selector
{
  /* ... */
}

/* 推荐：右大括号单独一行 */
.selector {
  color: red;
}

/* 不推荐：右大括号不换行 */
.selector {
  color: red; }
```

#### 多声明格式

```css
/* 单行格式（适合简短的规则） */
.selector {
  color: red;
  margin: 0;
  padding: 0;
}

/* 多行格式（推荐） */
.selector {
  color: red;
  margin: 0;
  padding: 0;
  font-size: 16px;
  line-height: 1.5;
  background-color: #fff;
}

/* 按功能分组 */
.selector {
  /* 布局属性 */
  display: block;
  position: relative;
  float: left;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 20px;

  /* 盒子模型 */
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* 文本样式 */
  color: #333;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  text-align: center;

  /* 视觉效果 */
  background-color: #fff;
  opacity: 1;
  transition: all 0.3s ease;
}
```

#### 属性顺序

```css
/* 推荐的属性顺序 */
.selector {
  /* 1. 布局属性 */
  display: block;
  position: relative;
  top: 0;
  left: 0;
  float: left;
  clear: both;
  visibility: visible;
  overflow: hidden;
  z-index: 10;

  /* 2. 盒子模型 */
  width: 100%;
  height: auto;
  margin: 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  /* 3. 文本样式 */
  color: #333;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  line-height: 1.6;
  text-align: center;
  text-decoration: none;
  text-transform: none;
  letter-spacing: normal;
  white-space: normal;
  word-spacing: normal;

  /* 4. 视觉效果 */
  background-color: #fff;
  background-image: url("bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
  filter: blur(0);

  /* 5. 动画和过渡 */
  transition: all 0.3s ease;
  animation: slide 0.5s ease;

  /* 6. 其他 */
  cursor: pointer;
  user-select: none;
  pointer-events: auto;
}
```

### 命名规范

#### BEM 命名法

```css
/* Block（块） */
.button {
}
.menu {
}
.card {
}

/* Element（元素） */
.button__icon {
}
.menu__item {
}
.card__title {
}
.card__body {
}
.card__footer {
}

/* Modifier（修饰符） */
.button--large {
}
.button--primary {
}
.button--disabled {
}

.menu--vertical {
}
.menu__item--active {
}

.card--featured {
}
.card__title--centered {
}

/* 实际应用 */
.search-form {
} /* 块 */
.search-form__input {
} /* 元素 */
.search-form__button {
} /* 元素 */
.search-form--expanded {
} /* 修饰符 */
.search-form__button--disabled {
} /* 元素修饰符 */
```

#### 其他命名约定

```css
/* 实用类命名 */
.u-hidden {
  display: none;
}
.u-text-center {
  text-align: center;
}
.u-mt-20 {
  margin-top: 20px;
}
.u-mb-30 {
  margin-bottom: 30px;
}

/* 状态类命名 */
.is-active {
  background-color: #e8f4fd;
}
.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.is-hidden {
  display: none;
}
.is-visible {
  display: block;
}

/* JavaScript 钩子 */
.js-modal-trigger {
  cursor: pointer;
}
.js-accordion-toggle {
}
.js-tab-panel {
}

/* 组件状态 */
.component.is-loading {
  opacity: 0.5;
}
.component.has-error {
  border-color: #dc3545;
}

/* 主题类 */
.theme-dark {
  background-color: #333;
  color: #fff;
}
.theme-light {
  background-color: #fff;
  color: #333;
}

/* 响应式前缀 */
.sm-hidden {
  display: none;
}
.md-visible {
  display: block;
}
.lg-flex {
  display: flex;
}
```

### 组织与架构

#### CSS 文件结构

```css
/* ============================================
   reset.css - 重置浏览器默认样式
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ============================================
   base.css - 基础样式
   ============================================ */

/* 根元素和HTML5元素 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-family: "Segoe UI", system-ui, sans-serif;
}

html {
  font-size: 16px;
  line-height: 1.6;
}

body {
  font-family: var(--font-family);
  color: #333;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* 标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1rem;
}

/* 链接样式 */
a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

/* ============================================
   layout.css - 布局样式
   ============================================ */

/* 容器 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 网格系统 */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col {
  flex: 1 0 0%;
  padding: 0 15px;
}

/* 页面结构 */
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.main {
  min-height: calc(100vh - 140px);
  padding: 2rem 0;
}

.footer {
  background-color: #343a40;
  color: #fff;
  padding: 2rem 0;
  margin-top: auto;
}

/* ============================================
   components.css - 组件样式
   ============================================ */

/* 按钮组件 */
.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* 卡片组件 */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* ============================================
   utilities.css - 实用类
   ============================================ */

/* 文本工具类 */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-uppercase {
  text-transform: uppercase;
}

/* 间距工具类 */
.m-0 {
  margin: 0 !important;
}
.mt-1 {
  margin-top: 0.25rem !important;
}
.mb-2 {
  margin-bottom: 0.5rem !important;
}
.p-3 {
  padding: 0.75rem !important;
}
.pt-4 {
  padding-top: 1rem !important;
}

/* 显示工具类 */
.d-none {
  display: none !important;
}
.d-block {
  display: block !important;
}
.d-flex {
  display: flex !important;
}

/* ============================================
   themes.css - 主题样式
   ============================================ */

/* 深色主题 */
.theme-dark {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

.theme-dark .card {
  background-color: #2d2d2d;
  border-color: #404040;
}

/* 高对比度主题 */
.theme-high-contrast {
  background-color: #000;
  color: #fff;
}

.theme-high-contrast a {
  color: #ffff00;
}
```

#### 模块化组织

```css
/* button.css */
.button {
  /* 基础按钮样式 */
}

.button--primary {
  /* 主要按钮变体 */
}

.button--large {
  /* 大号按钮变体 */
}

/* form.css */
.form-group {
  /* 表单组样式 */
}

.form-control {
  /* 表单控件样式 */
}

.form-label {
  /* 表单标签样式 */
}

/* modal.css */
.modal {
  /* 模态框基础样式 */
}

.modal-header {
  /* 模态框头部 */
}

.modal-body {
  /* 模态框主体 */
}

.modal-footer {
  /* 模态框底部 */
}

/* grid.css */
.container {
  /* 容器 */
}

.row {
  /* 行 */
}

.col {
  /* 列 */
}
```

## CSS 单位与值

### 长度单位

#### 绝对单位

```css
/* 像素 (px) - 最常用 */
.element {
  width: 300px;
  height: 200px;
  font-size: 16px;
  padding: 10px;
}

/* 点 (pt) - 主要用于打印 */
@media print {
  .print-content {
    font-size: 12pt;
    margin: 1in;
  }
}

/* 英寸 (in)、厘米 (cm)、毫米 (mm) */
.ruler {
  width: 6in; /* 6英寸 */
  height: 15cm; /* 15厘米 */
  border: 1mm solid #000; /* 1毫米边框 */
}

/* 派卡 (pc) - 印刷单位 */
.typography {
  font-size: 10pc; /* 1pc = 12pt */
}
```

#### 相对单位

```css
/* 相对于根元素字体大小 (rem) */
:root {
  font-size: 16px; /* 1rem = 16px */
}

.element {
  font-size: 1rem; /* 16px */
  padding: 0.5rem; /* 8px */
  margin: 2rem; /* 32px */
  width: 20rem; /* 320px */
}

/* 相对于父元素字体大小 (em) */
.parent {
  font-size: 20px;
}

.child {
  font-size: 0.8em; /* 16px (20px × 0.8) */
  padding: 1em; /* 20px */
  margin: 0.5em; /* 10px */
  width: 10em; /* 200px */
}

/* 视口宽度单位 (vw) */
.full-width {
  width: 100vw; /* 整个视口宽度 */
}

.half-width {
  width: 50vw; /* 视口宽度的一半 */
}

/* 视口高度单位 (vh) */
.full-height {
  height: 100vh; /* 整个视口高度 */
}

.half-height {
  height: 50vh; /* 视口高度的一半 */
}

/* 视口最小值单位 (vmin) */
.square {
  width: 50vmin; /* 视口较小尺寸的50% */
  height: 50vmin;
}

/* 视口最大值单位 (vmax) */
.banner {
  width: 100vmax; /* 视口较大尺寸的100% */
}
```

#### 百分比单位

```css
/* 相对于父元素 */
.container {
  width: 800px;
}

.child {
  width: 50%; /* 400px */
  height: 25%; /* 如果父元素有明确高度 */
  margin: 10%; /* 80px */
  padding: 5%; /* 40px */
}

/* 相对于自身字体大小 */
.text-element {
  font-size: 20px;
  line-height: 150%; /* 30px */
  text-indent: 200%; /* 40px */
}

/* 相对于视口 */
.viewport-relative {
  width: 100%; /* 父元素宽度 */
  max-width: 100vw; /* 不超过视口宽度 */
}
```

### 颜色单位

#### 颜色关键字

```css
/* 基本颜色 */
.element {
  color: red;
  background-color: blue;
  border-color: green;
}

/* 系统颜色 */
.system {
  background-color: ButtonFace;
  color: ButtonText;
  border-color: ActiveBorder;
}

/* 透明 */
.transparent {
  background-color: transparent;
  color: inherit;
}
```

#### 十六进制颜色

```css
/* 6位十六进制 */
.element {
  color: #ff0000; /* 红色 */
  background: #00ff00; /* 绿色 */
  border: #0000ff; /* 蓝色 */
}

/* 3位十六进制（缩写） */
.short {
  color: #f00; /* 等同于 #ff0000 */
  background: #0f0; /* 等同于 #00ff00 */
  border: #00f; /* 等同于 #0000ff */
}

/* 8位十六进制（带透明度） */
.alpha {
  background-color: #ff000080; /* 红色，50%透明度 */
  color: #000000cc; /* 黑色，80%透明度 */
}
```

#### RGB/RGBA 颜色

```css
/* RGB */
.rgb {
  color: rgb(255, 0, 0); /* 红色 */
  background: rgb(0, 255, 0); /* 绿色 */
  border: rgb(0, 0, 255); /* 蓝色 */
}

/* 百分比RGB */
.percent {
  color: rgb(100%, 0%, 0%); /* 红色 */
  background: rgb(0%, 100%, 0%); /* 绿色 */
}

/* RGBA（带透明度） */
.rgba {
  background-color: rgba(255, 0, 0, 0.5); /* 红色，50%透明度 */
  color: rgba(0, 0, 0, 0.8); /* 黑色，80%透明度 */
  border: rgba(0, 0, 255, 0.3); /* 蓝色，30%透明度 */
}
```

#### HSL/HSLA 颜色

```css
/* HSL - 色相、饱和度、亮度 */
.hsl {
  color: hsl(0, 100%, 50%); /* 红色 */
  background: hsl(120, 100%, 50%); /* 绿色 */
  border: hsl(240, 100%, 50%); /* 蓝色 */
}

/* HSLA（带透明度） */
.hsla {
  background-color: hsla(0, 100%, 50%, 0.5); /* 红色，50%透明度 */
  color: hsla(0, 0%, 0%, 0.8); /* 黑色，80%透明度 */
}
```

### 其他值类型

#### 数字值

```css
/* 整数值 */
.z-index {
  z-index: 10;
  order: 2;
  flex-grow: 1;
}

/* 小数值 */
.opacity {
  opacity: 0.5;
  line-height: 1.6;
  font-weight: 400.5;
}

/* 无单位值（某些属性） */
.unitless {
  line-height: 1.5; /* 无单位，相对于字体大小 */
  z-index: 999; /* 无单位 */
  opacity: 0.75; /* 无单位，0到1之间 */
}
```

#### 字符串值

```css
/* 内容属性 */
.content::before {
  content: "📌 "; /* 字符串 */
  content: attr(data-tip); /* 属性值 */
  content: counter(item); /* 计数器 */
}

/* 字体名称 */
.font-family {
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

/* 网址 */
.background {
  background-image: url("image.jpg");
  list-style-image: url("bullet.png");
}
```

#### 函数值

```css
/* 计算函数 */
.calc {
  width: calc(100% - 40px);
  height: calc(50vh + 20px);
  font-size: calc(1rem + 0.5vw);
}

/* 颜色函数 */
.color-func {
  background: linear-gradient(to right, red, blue);
  color: rgb(calc(255 - 100), 100, 100);
  border-color: hsl(180, 100%, 50%);
}

/* 变换函数 */
.transform {
  transform: translate(10px, 20px) rotate(45deg) scale(1.2);
  filter: blur(5px) grayscale(50%);
}

/* 自定义属性 */
:root {
  --primary-color: #007bff;
  --spacing: 20px;
}

.custom-prop {
  color: var(--primary-color);
  margin: var(--spacing);
  padding: calc(var(--spacing) / 2);
}
```

## 综合示例

### 完整样式表示例

```css
/* ============================================
   style.css - 完整的CSS示例
   作者：前端开发者
   版本：1.0.0
   ============================================ */

/* --------------------------------------------------
   1.0 重置和基础样式
   -------------------------------------------------- */

/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 基础字体和颜色 */
:root {
  /* 颜色变量 */
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --danger-color: #e74c3c;
  --warning-color: #f39c12;
  --dark-color: #2c3e50;
  --light-color: #ecf0f1;
  --text-color: #333;
  --text-light: #7f8c8d;
  --border-color: #ddd;
  --shadow-color: rgba(0, 0, 0, 0.1);

  /* 字体变量 */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.6;

  /* 间距变量 */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem; /* 8px */
  --spacing-md: 1rem; /* 16px */
  --spacing-lg: 1.5rem; /* 24px */
  --spacing-xl: 2rem; /* 32px */
  --spacing-xxl: 3rem; /* 48px */
}

/* 基础HTML元素样式 */
html {
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: #fff;
  min-height: 100vh;
}

/* 标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
  color: var(--dark-color);
}

h1 {
  font-size: 2.5rem;
}
h2 {
  font-size: 2rem;
}
h3 {
  font-size: 1.75rem;
}
h4 {
  font-size: 1.5rem;
}
h5 {
  font-size: 1.25rem;
}
h6 {
  font-size: 1rem;
}

/* 段落和文本 */
p {
  margin-bottom: var(--spacing-md);
}

a {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 列表 */
ul,
ol {
  margin-bottom: var(--spacing-md);
  padding-left: var(--spacing-lg);
}

li {
  margin-bottom: var(--spacing-xs);
}

/* --------------------------------------------------
   2.0 布局样式
   -------------------------------------------------- */

/* 容器 */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

/* 栅格系统 */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(var(--spacing-md) * -1);
}

.col {
  flex: 1 0 0%;
  padding: 0 var(--spacing-md);
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}
.col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}
.col-4 {
  flex: 0 0 33.333%;
  max-width: 33.333%;
}
.col-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

/* 页面布局 */
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px var(--shadow-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: var(--spacing-md) 0;
}

.main {
  padding: var(--spacing-xl) 0;
  min-height: calc(100vh - 200px);
}

.footer {
  background-color: var(--dark-color);
  color: var(--light-color);
  padding: var(--spacing-xl) 0;
  text-align: center;
}

/* --------------------------------------------------
   3.0 组件样式
   -------------------------------------------------- */

/* 按钮组件 */
.btn {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px var(--shadow-color);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 按钮变体 */
.btn--primary {
  background-color: var(--primary-color);
  color: white;
}

.btn--primary:hover {
  background-color: #2980b9;
}

.btn--secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn--secondary:hover {
  background-color: #27ae60;
}

.btn--danger {
  background-color: var(--danger-color);
  color: white;
}

.btn--danger:hover {
  background-color: #c0392b;
}

.btn--outline {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn--outline:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 按钮尺寸 */
.btn--small {
  padding: var(--spacing-xs) var(--spacing-md);
  font-size: 0.875rem;
}

.btn--large {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: 1.125rem;
}

/* 卡片组件 */
.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow-color);
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  margin-bottom: var(--spacing-lg);
}

.card:hover {
  box-shadow: 0 4px 16px var(--shadow-color);
}

.card__header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  background-color: var(--light-color);
}

.card__body {
  padding: var(--spacing-lg);
}

.card__footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  background-color: var(--light-color);
}

/* 卡片变体 */
.card--bordered {
  border: 1px solid var(--border-color);
  box-shadow: none;
}

.card--shadowless {
  box-shadow: none;
}

.card--primary .card__header {
  background-color: var(--primary-color);
  color: white;
}

/* 表单组件 */
.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  color: var(--dark-color);
}

.form-label--required::after {
  content: " *";
  color: var(--danger-color);
}

.form-control {
  display: block;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 1rem;
  line-height: var(--line-height-base);
  color: var(--text-color);
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

.form-control--error {
  border-color: var(--danger-color);
}

.form-control--error:focus {
  border-color: var(--danger-color);
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.2);
}

.form-text {
  display: block;
  margin-top: var(--spacing-xs);
  font-size: 0.875rem;
  color: var(--text-light);
}

.form-text--error {
  color: var(--danger-color);
}

/* --------------------------------------------------
   4.0 工具类
   -------------------------------------------------- */

/* 文本工具类 */
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-justify {
  text-align: justify;
}

.text-uppercase {
  text-transform: uppercase;
}
.text-lowercase {
  text-transform: lowercase;
}
.text-capitalize {
  text-transform: capitalize;
}

.text-bold {
  font-weight: 700;
}
.text-normal {
  font-weight: 400;
}
.text-light {
  font-weight: 300;
}

.text-primary {
  color: var(--primary-color);
}
.text-success {
  color: var(--secondary-color);
}
.text-danger {
  color: var(--danger-color);
}
.text-warning {
  color: var(--warning-color);
}
.text-muted {
  color: var(--text-light);
}

/* 间距工具类 */
.m-0 {
  margin: 0 !important;
}
.mt-0 {
  margin-top: 0 !important;
}
.mr-0 {
  margin-right: 0 !important;
}
.mb-0 {
  margin-bottom: 0 !important;
}
.ml-0 {
  margin-left: 0 !important;
}

.m-1 {
  margin: var(--spacing-xs) !important;
}
.mt-1 {
  margin-top: var(--spacing-xs) !important;
}
.mr-1 {
  margin-right: var(--spacing-xs) !important;
}
.mb-1 {
  margin-bottom: var(--spacing-xs) !important;
}
.ml-1 {
  margin-left: var(--spacing-xs) !important;
}

.m-2 {
  margin: var(--spacing-sm) !important;
}
.mt-2 {
  margin-top: var(--spacing-sm) !important;
}
.mr-2 {
  margin-right: var(--spacing-sm) !important;
}
.mb-2 {
  margin-bottom: var(--spacing-sm) !important;
}
.ml-2 {
  margin-left: var(--spacing-sm) !important;
}

/* 显示工具类 */
.d-none {
  display: none !important;
}
.d-inline {
  display: inline !important;
}
.d-inline-block {
  display: inline-block !important;
}
.d-block {
  display: block !important;
}
.d-flex {
  display: flex !important;
}
.d-inline-flex {
  display: inline-flex !important;
}

/* 浮动工具类 */
.float-left {
  float: left !important;
}
.float-right {
  float: right !important;
}
.float-none {
  float: none !important;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* --------------------------------------------------
   5.0 响应式设计
   -------------------------------------------------- */

/* 小屏幕（手机，576px及以上） */
@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }

  .sm\:d-block {
    display: block !important;
  }
  .sm\:d-none {
    display: none !important;
  }
}

/* 中等屏幕（平板，768px及以上） */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }

  .md\:col-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .md\:d-block {
    display: block !important;
  }
  .md\:d-none {
    display: none !important;
  }
}

/* 大屏幕（桌面，992px及以上） */
@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }

  .lg\:col-4 {
    flex: 0 0 33.333%;
    max-width: 33.333%;
  }
  .lg\:d-block {
    display: block !important;
  }
  .lg\:d-none {
    display: none !important;
  }
}

/* 超大屏幕（大桌面，1200px及以上） */
@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }

  .xl\:col-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
}

/* 打印样式 */
@media print {
  .no-print {
    display: none !important;
  }

  body {
    font-size: 12pt;
    line-height: 1.4;
  }

  a {
    color: #000;
    text-decoration: underline;
  }

  .container {
    max-width: none;
    padding: 0;
  }
}
```

## 最佳实践

### 1. 可维护性原则

```css
/* 使用有意义的类名 */
/* 不推荐 */
.div1 {
}
.red-box {
}
.float-l {
}

/* 推荐 */
.article-card {
}
.alert-danger {
}
.sidebar-left {
}

/* 避免过深的选择器嵌套 */
/* 不推荐 */
.nav ul li a span.icon {
}

/* 推荐 */
.nav-link__icon {
}

/* 使用CSS变量维护主题 */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --font-size-base: 16px;
}

.theme-dark {
  --primary-color: #0d6efd;
  --background-color: #212529;
  --text-color: #f8f9fa;
}
```

### 2. 性能优化

```css
/* 避免使用通用选择器 */
/* 不推荐 */
* {
  margin: 0;
  padding: 0;
}

/* 推荐 */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol {
  margin: 0;
  padding: 0;
}

/* 使用简写属性 */
/* 不推荐 */
.element {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 10px;
  margin-left: 20px;
}

/* 推荐 */
.element {
  margin: 10px 20px;
}

/* 避免昂贵的CSS属性 */
/* 性能较差 */
.element {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  opacity: 0.9;
  transform: translateZ(0); /* 强制GPU加速 */
}

/* 使用will-change提示浏览器 */
.animated-element {
  will-change: transform, opacity;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
```

### 3. 浏览器兼容性

```css
/* 使用前缀确保兼容性 */
.flex-container {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android */
  display: -moz-box; /* 老版本语法: Firefox */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 标准语法: Opera 12.1, Firefox 22+ */
}

/* 渐进增强策略 */
.button {
  /* 基础样式，所有浏览器都支持 */
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: 1px solid #0056b3;

  /* 现代浏览器增强 */
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 功能检测替代方案 */
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
  }

  .container > * {
    flex: 0 0 calc(33.333% - 20px);
    margin: 10px;
  }
}
```

### 4. 代码组织

```css
/* 按功能模块组织 */
/* 
  1. 重置和基础样式
  2. 工具类和辅助类
  3. 布局样式
  4. 组件样式
  5. 页面特定样式
  6. 主题样式
  7. 响应式样式
*/

/* 使用注释标记模块 */
/* ============================================
   组件：按钮
   ============================================ */

/* ============================================
   组件：表单
   ============================================ */

/* ============================================
   响应式断点：平板
   ============================================ */

/* 版本控制注释 */
/* 
  版本：1.2.0
  更新日期：2024-01-20
  更新内容：
  - 添加深色主题支持
  - 优化响应式布局
  - 修复按钮点击状态
*/
```

### 总结要点

1. **保持一致性**：统一的命名规范、缩进风格和代码组织
2. **语义化命名**：使用有意义的类名，反映功能而非表现
3. **模块化设计**：将 CSS 分解为可重用的组件
4. **性能意识**：避免选择器嵌套过深，使用高效属性
5. **浏览器兼容**：考虑不同浏览器的支持和降级方案
6. **响应式优先**：移动端优先的设计方法
7. **可访问性**：确保所有用户都能访问内容
8. **代码注释**：为复杂逻辑和重要部分添加注释

通过遵循这些最佳实践，可以编写出可维护、高性能、兼容性好的 CSS 代码，为项目提供良好的样式基础。
