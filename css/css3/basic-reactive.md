# CSS3 响应式设计

## 6.1 响应式设计概述

### 6.1.1 什么是响应式设计

响应式网页设计（Responsive Web Design，RWD）是一种网页设计方法，使网站能够在不同尺寸的设备上（从桌面电脑到移动设备）提供最佳的浏览体验。

### 6.1.2 响应式设计的核心原则

1. **流式网格布局**：使用相对单位（如百分比）而非固定单位（如像素）
2. **弹性媒体**：图片、视频等媒体元素能够自适应容器
3. **媒体查询**：根据设备特性应用不同的 CSS 规则

## 6.2 视口设置（viewport meta）

### 6.2.1 视口概念

**视口**（Viewport）是指用户浏览器中用于显示网页的区域。在移动设备上，存在两个视口：

- **布局视口**：网页实际渲染的尺寸
- **视觉视口**：用户在屏幕上实际看到的区域

### 6.2.2 标准视口设置

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 最基本的视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- 完整视口设置 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover"
    />
  </head>
  <body>
    <!-- 页面内容 -->
  </body>
</html>
```

### 6.2.3 视口属性详解

#### width 属性

```html
<!-- 设置视口宽度为设备宽度（推荐） -->
<meta name="viewport" content="width=device-width" />

<!-- 设置固定宽度（不推荐） -->
<meta name="viewport" content="width=768" />

<!-- 使用设备建议宽度 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### initial-scale 属性

```html
<!-- 初始缩放比例 -->
<meta name="viewport" content="initial-scale=1.0" />
<!-- 100%缩放 -->
<meta name="viewport" content="initial-scale=0.5" />
<!-- 50%缩放 -->
<meta name="viewport" content="initial-scale=2.0" />
<!-- 200%缩放 -->
```

#### minimum-scale 和 maximum-scale 属性

```html
<!-- 限制缩放范围 -->
<meta name="viewport" content="minimum-scale=0.5, maximum-scale=3.0" />

<!-- 禁止缩放 -->
<meta name="viewport" content="user-scalable=no" />
<!-- 注意：禁止缩放可能影响可访问性 -->
```

#### user-scalable 属性

```html
<!-- 允许用户缩放（默认） -->
<meta name="viewport" content="user-scalable=yes" />

<!-- 禁止用户缩放 -->
<meta name="viewport" content="user-scalable=no" />
```

### 6.2.4 特殊场景视口设置

#### 全屏显示（避免黑边）

```html
<!-- 适用于移动端全屏应用 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, viewport-fit=cover"
/>

<style>
  /* 确保内容延伸到安全区域外 */
  body {
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
  }
</style>
```

#### 防止页面缩放（特定场景）

```html
<!-- 防止双击缩放（移动端） -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
/>

<style>
  /* 防止双击缩放 */
  html {
    touch-action: manipulation;
  }
</style>
```

### 6.2.5 CSS 中的视口相关单位

#### vw 和 vh 单位

```css
/* 视口宽度百分比 */
.element {
  width: 50vw; /* 视口宽度的50% */
  height: 100vh; /* 视口高度的100% */
}

/* 组合使用 */
.full-screen {
  width: 100vw;
  height: 100vh;
}

/* 响应式字体大小 */
.responsive-text {
  font-size: calc(16px + 1vw); /* 基础16px + 视口宽度的1% */
}
```

#### vmin 和 vmax 单位

```css
/* 取视口宽度和高度中的较小值 */
.box {
  width: 50vmin; /* 视口较小尺寸的50% */
  height: 50vmin;
}

/* 取视口宽度和高度中的较大值 */
.large-box {
  width: 80vmax; /* 视口较大尺寸的80% */
  height: 80vmax;
}

/* 创建正方形元素，始终适配屏幕 */
.square {
  width: 90vmin;
  height: 90vmin;
  background: #f0f0f0;
}
```

## 6.3 百分比布局

### 6.3.1 百分比布局基础

#### 宽度百分比

```html
<div class="container">
  <div class="half-width">50% 宽度</div>
  <div class="quarter-width">25% 宽度</div>
  <div class="three-quarters">75% 宽度</div>
</div>
```

```css
.container {
  width: 100%; /* 占父元素100%宽度 */
  max-width: 1200px; /* 最大宽度限制 */
  margin: 0 auto; /* 居中 */
}

.half-width {
  width: 50%; /* 父元素宽度的50% */
}

.quarter-width {
  width: 25%; /* 父元素宽度的25% */
}

.three-quarters {
  width: 75%; /* 父元素宽度的75% */
}
```

#### 高度百分比

```css
/* 注意：百分比高度需要父元素有明确的高度 */
.full-height-container {
  height: 100vh; /* 视口高度 */
}

.child-element {
  height: 50%; /* 父元素高度的50% */
}

/* 嵌套百分比计算示例 */
.outer {
  width: 800px;
  height: 600px;
}

.inner {
  width: 50%; /* 400px (800px的50%) */
  height: 50%; /* 300px (600px的50%) */
}
```

### 6.3.2 流式网格系统

#### 传统百分比网格

```css
/* 12列网格系统 */
.container {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-1 {
  width: 8.333333%;
}
.col-2 {
  width: 16.666667%;
}
.col-3 {
  width: 25%;
}
.col-4 {
  width: 33.333333%;
}
.col-5 {
  width: 41.666667%;
}
.col-6 {
  width: 50%;
}
.col-7 {
  width: 58.333333%;
}
.col-8 {
  width: 66.666667%;
}
.col-9 {
  width: 75%;
}
.col-10 {
  width: 83.333333%;
}
.col-11 {
  width: 91.666667%;
}
.col-12 {
  width: 100%;
}

[class*="col-"] {
  padding: 0 15px;
  box-sizing: border-box;
}
```

#### 响应式百分比网格

```css
/* 响应式列 */
.responsive-col {
  width: 100%; /* 移动端：100%宽度 */
  padding: 15px;
  box-sizing: border-box;
}

/* 平板及以上 */
@media (min-width: 768px) {
  .responsive-col {
    width: 50%; /* 平板：50%宽度（2列） */
  }
}

/* 桌面及以上 */
@media (min-width: 1024px) {
  .responsive-col {
    width: 25%; /* 桌面：25%宽度（4列） */
  }
}
```

### 6.3.3 百分比布局的注意事项

#### 盒模型与百分比

```css
/* 问题：padding和border会增加元素总宽度 */
.problem-box {
  width: 50%;
  padding: 20px;
  border: 5px solid #333;
  /* 实际宽度 = 50% + 40px + 10px */
}

/* 解决方案1：使用box-sizing */
.fixed-box {
  width: 50%;
  padding: 20px;
  border: 5px solid #333;
  box-sizing: border-box; /* 宽度包含padding和border */
}

/* 解决方案2：使用calc()计算 */
.calc-box {
  width: calc(50% - 40px - 10px); /* 减去padding和border */
  padding: 20px;
  border: 5px solid #333;
}
```

#### 最大宽度与最小宽度

```css
/* 响应式容器 */
.responsive-container {
  width: 90%; /* 相对宽度 */
  max-width: 1200px; /* 最大宽度限制 */
  min-width: 320px; /* 最小宽度保护 */
  margin: 0 auto; /* 居中 */
}

/* 图片响应式 */
.responsive-img {
  max-width: 100%; /* 不超过容器宽度 */
  height: auto; /* 保持宽高比 */
}

/* 文本容器 */
.text-container {
  width: 80%;
  max-width: 800px; /* 最佳阅读宽度 */
  min-width: 280px; /* 移动端最小宽度 */
  line-height: 1.6;
}
```

## 6.4 基础媒体查询

### 6.4.1 媒体查询语法

#### 基本语法结构

```css
/* 标准媒体查询 */
@media media-type and (media-feature) {
  /* CSS规则 */
}

/* 多个条件 */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  /* CSS规则 */
}

/* 多个查询条件（或关系） */
@media (min-width: 768px), (orientation: landscape) {
  /* CSS规则 */
}
```

#### 媒体类型（Media Types）

```css
/* 屏幕设备（默认） */
@media screen {
  body {
    background: white;
  }
}

/* 打印样式 */
@media print {
  body {
    background: none;
  }
  .no-print {
    display: none;
  }
}

/* 所有设备 */
@media all {
  /* 通用样式 */
}

/* 语音设备 */
@media speech {
  /* 语音合成相关样式 */
}
```

### 6.4.2 常用媒体特性

#### 宽度和高度

```css
/* 最小宽度（移动优先） */
@media (min-width: 576px) {
  /* 小屏幕 */
}
@media (min-width: 768px) {
  /* 平板 */
}
@media (min-width: 992px) {
  /* 桌面 */
}
@media (min-width: 1200px) {
  /* 大桌面 */
}

/* 最大宽度（桌面优先） */
@media (max-width: 1199px) {
  /* 小于大桌面 */
}
@media (max-width: 991px) {
  /* 小于桌面 */
}
@media (max-width: 767px) {
  /* 小于平板 */
}
@media (max-width: 575px) {
  /* 小于小屏幕 */
}

/* 宽度范围 */
@media (min-width: 768px) and (max-width: 1024px) {
  /* 平板设备 */
}

/* 高度相关 */
@media (min-height: 600px) {
  /* 高度至少600px */
}

@media (max-height: 400px) {
  /* 高度最大400px */
}
```

#### 方向（Orientation）

```css
/* 横屏模式 */
@media (orientation: landscape) {
  .container {
    flex-direction: row;
  }
  .sidebar {
    width: 30%;
  }
}

/* 竖屏模式 */
@media (orientation: portrait) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
  }
}
```

#### 分辨率相关

```css
/* 高DPI屏幕（Retina） */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url("logo@2x.png");
    background-size: contain;
  }
}

/* 4K及以上屏幕 */
@media (min-resolution: 300dpi) {
  .high-res-image {
    background-image: url("image@4x.png");
  }
}
```

#### 其他重要特性

```css
/* 悬停支持 */
@media (hover: hover) {
  .button:hover {
    background: #007bff;
  }
}

/* 指针设备精度 */
@media (pointer: fine) {
  /* 鼠标等精确指针设备 */
  .small-button {
    display: block;
  }
}

@media (pointer: coarse) {
  /* 触摸屏等不精确指针设备 */
  .small-button {
    display: none;
  }
}

/* 明暗模式 */
@media (prefers-color-scheme: dark) {
  body {
    background: #121212;
    color: #ffffff;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background: #ffffff;
    color: #121212;
  }
}

/* 减少动画（辅助功能） */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6.4.3 常用断点系统

#### Bootstrap 5 断点系统

```css
/* 超小屏幕（手机） */
@media (max-width: 575.98px) {
  /* X-Small */
}

/* 小屏幕（手机横屏） */
@media (min-width: 576px) and (max-width: 767.98px) {
  /* Small */
}

/* 中等屏幕（平板） */
@media (min-width: 768px) and (max-width: 991.98px) {
  /* Medium */
}

/* 大屏幕（桌面） */
@media (min-width: 992px) and (max-width: 1199.98px) {
  /* Large */
}

/* 超大屏幕（大桌面） */
@media (min-width: 1200px) {
  /* X-Large */
}

/* 超超大屏幕 */
@media (min-width: 1400px) {
  /* XX-Large */
}
```

#### Tailwind CSS 断点系统

```css
/* 移动优先断点 */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
@media (min-width: 1536px) {
  /* 2xl */
}
```

#### 自定义断点策略

```css
/* 基于内容断点（推荐） */
@media (min-width: 600px) {
  /* 当容器宽度至少600px时的样式 */
}

@media (min-width: 900px) {
  /* 当容器宽度至少900px时的样式 */
}

@media (min-width: 1200px) {
  /* 当容器宽度至少1200px时的样式 */
}

/* 根据布局需要自定义 */
.break-when-crowded {
  display: block;
}

@media (min-width: 400px) {
  .break-when-crowded {
    display: flex;
  }
}
```

### 6.4.4 移动优先 vs 桌面优先

#### 移动优先（Mobile First）

```css
/* 基础样式：针对移动设备 */
.container {
  width: 100%;
  padding: 10px;
}

/* 逐渐增强：针对更大屏幕 */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

@media (min-width: 1024px) {
  .container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

#### 桌面优先（Desktop First）

```css
/* 基础样式：针对桌面设备 */
.container {
  width: 1170px;
  padding: 30px;
  margin: 0 auto;
}

/* 逐渐降级：针对更小屏幕 */
@media (max-width: 1199px) {
  .container {
    width: 970px;
  }
}

@media (max-width: 991px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 10px;
  }
}
```

### 6.4.5 实际应用示例

#### 响应式导航菜单

```html
<nav class="navbar">
  <div class="logo">网站Logo</div>
  <button class="menu-toggle">☰</button>
  <ul class="nav-menu">
    <li><a href="#">首页</a></li>
    <li><a href="#">关于</a></li>
    <li><a href="#">服务</a></li>
    <li><a href="#">联系</a></li>
  </ul>
</nav>
```

```css
/* 移动端样式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
  color: white;
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-menu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #333;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu.active {
  display: block;
}

/* 平板及以上 */
@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
    position: static;
    width: auto;
    background: transparent;
  }

  .nav-menu li {
    margin-left: 1rem;
  }
}
```

#### 响应式图片网格

```css
.image-grid {
  display: grid;
  gap: 10px;
  padding: 10px;
}

/* 移动端：1列 */
@media (max-width: 599px) {
  .image-grid {
    grid-template-columns: 1fr;
  }
}

/* 平板：2列 */
@media (min-width: 600px) and (max-width: 1023px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面：3列 */
@media (min-width: 1024px) {
  .image-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

#### 响应式排版

```css
/* 基础字体大小（移动端） */
html {
  font-size: 14px;
}

body {
  line-height: 1.5;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

h1 {
  font-size: 2rem;
}
h2 {
  font-size: 1.75rem;
}
h3 {
  font-size: 1.5rem;
}
p {
  font-size: 1rem;
}

/* 平板 */
@media (min-width: 768px) {
  html {
    font-size: 16px;
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
}

/* 桌面 */
@media (min-width: 1024px) {
  html {
    font-size: 18px;
  }

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 2rem;
  }

  .content {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
  }
}
```

### 6.4.6 CSS 变量与媒体查询结合

```css
/* 定义响应式CSS变量 */
:root {
  /* 移动端变量 */
  --spacing: 1rem;
  --font-size: 14px;
  --container-width: 100%;
}

/* 平板 */
@media (min-width: 768px) {
  :root {
    --spacing: 1.5rem;
    --font-size: 16px;
    --container-width: 750px;
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  :root {
    --spacing: 2rem;
    --font-size: 18px;
    --container-width: 970px;
  }
}

/* 大桌面 */
@media (min-width: 1200px) {
  :root {
    --spacing: 2.5rem;
    --container-width: 1170px;
  }
}

/* 使用变量 */
.container {
  width: var(--container-width);
  padding: var(--spacing);
  font-size: var(--font-size);
  margin: 0 auto;
}

.card {
  margin-bottom: var(--spacing);
  padding: calc(var(--spacing) * 0.5);
}
```

## 6.5 综合示例：完整响应式页面

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>响应式示例</title>
    <style>
      /* 基础样式 */
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          system-ui,
          -apple-system,
          sans-serif;
        line-height: 1.6;
        color: #333;
      }

      /* 响应式容器 */
      .container {
        width: 100%;
        padding: 1rem;
        margin: 0 auto;
      }

      /* 响应式导航 */
      .navbar {
        background: #2c3e50;
        color: white;
      }

      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .nav-links {
        display: none;
        list-style: none;
      }

      .nav-links a {
        color: white;
        text-decoration: none;
        padding: 0.5rem 1rem;
      }

      .menu-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
      }

      /* 响应式英雄区域 */
      .hero {
        background: linear-gradient(135deg, #3498db, #8e44ad);
        color: white;
        padding: 3rem 1rem;
        text-align: center;
      }

      .hero h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      /* 响应式卡片网格 */
      .cards-grid {
        display: grid;
        gap: 1rem;
        margin: 2rem 0;
      }

      .card {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      /* 响应式页脚 */
      .footer {
        background: #34495e;
        color: white;
        padding: 2rem 1rem;
        text-align: center;
      }

      /* 平板样式 */
      @media (min-width: 768px) {
        .container {
          width: 750px;
          padding: 1.5rem;
        }

        .hero h1 {
          font-size: 2.5rem;
        }

        .cards-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .menu-toggle {
          display: none;
        }

        .nav-links {
          display: flex;
        }
      }

      /* 桌面样式 */
      @media (min-width: 1024px) {
        .container {
          width: 970px;
        }

        .hero {
          padding: 5rem 1rem;
        }

        .hero h1 {
          font-size: 3rem;
        }

        .cards-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .card {
          padding: 2rem;
        }
      }

      /* 大桌面样式 */
      @media (min-width: 1200px) {
        .container {
          width: 1170px;
        }
      }
    </style>
  </head>
  <body>
    <nav class="navbar">
      <div class="container nav-content">
        <div class="logo">LOGO</div>
        <button class="menu-toggle">☰</button>
        <ul class="nav-links">
          <li><a href="#">首页</a></li>
          <li><a href="#">产品</a></li>
          <li><a href="#">服务</a></li>
          <li><a href="#">关于</a></li>
          <li><a href="#">联系</a></li>
        </ul>
      </div>
    </nav>

    <section class="hero">
      <div class="container">
        <h1>响应式设计示例</h1>
        <p>在不同设备上提供最佳浏览体验</p>
      </div>
    </section>

    <main class="container">
      <div class="cards-grid">
        <div class="card">
          <h2>灵活布局</h2>
          <p>使用百分比和弹性布局技术</p>
        </div>
        <div class="card">
          <h2>媒体查询</h2>
          <p>根据不同设备特性应用样式</p>
        </div>
        <div class="card">
          <h2>移动优先</h2>
          <p>从小屏幕开始逐渐增强体验</p>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; 2023 响应式设计示例. 保留所有权利.</p>
      </div>
    </footer>

    <script>
      document
        .querySelector(".menu-toggle")
        .addEventListener("click", function () {
          document.querySelector(".nav-links").classList.toggle("active");
        });
    </script>
  </body>
</html>
```

## 6.6 响应式设计最佳实践

### 1. 移动优先设计

```css
/* 始终从移动端开始设计 */
/* 1. 先写移动端样式 */
.element {
  width: 100%;
}

/* 2. 逐渐增强 */
@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}
@media (min-width: 1024px) {
  .element {
    width: 33.33%;
  }
}
```

### 2. 使用相对单位

```css
/* 推荐使用相对单位 */
.container {
  width: 90%; /* 百分比 */
  max-width: 1200px; /* 固定最大宽度 */
  padding: 1em; /* em相对单位 */
  font-size: 1rem; /* rem根相对单位 */
  margin: 2vh auto; /* 视口单位 */
}
```

### 3. 图片响应式处理

```css
/* 基础响应式图片 */
img {
  max-width: 100%;
  height: auto;
}

/* 响应式背景图片 */
.hero-bg {
  background-image: url("image-small.jpg");
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero-bg {
    background-image: url("image-medium.jpg");
  }
}

@media (min-width: 1024px) {
  .hero-bg {
    background-image: url("image-large.jpg");
  }
}
```

### 4. 测试策略

```markdown
测试设备建议：

- 手机：320px, 375px, 414px
- 平板：768px, 1024px
- 桌面：1280px, 1440px, 1920px

测试工具：

- Chrome DevTools 设备模拟
- BrowserStack 多设备测试
- Responsinator 在线测试
- 真实设备测试（最重要）
```

### 5. 性能优化

```css
/* 按需加载CSS */
<link rel="stylesheet" media="(max-width: 767px)" href="mobile.css">
<link rel="stylesheet" media="(min-width: 768px)" href="desktop.css">

/* 避免不必要的媒体查询 */
/* 使用min-width而不是max-width */
/* 使用百分比而不是固定像素 */
```

通过合理运用视口设置、百分比布局和媒体查询，可以创建出适应各种设备的响应式网站。记住，响应式设计不仅仅是技术实现，更是一种设计思维，需要从内容出发，为用户提供最佳的浏览体验。
