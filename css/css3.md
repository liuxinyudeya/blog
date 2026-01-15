# CSS3

CSS3 是 **Cascading Style Sheets Level 3**（层叠样式表第三级）的简称，是 CSS 技术的升级版本。它不是单一的规范，而是由一系列独立的**模块**组成，每个模块在 CSS2 1 的基础上新增、增强或扩展了功能。

简单说，**CSS3 = CSS2.1 + 众多革命性新模块**。

## 一、CSS3 有什么用？（核心价值）

CSS3 的主要目标是让 Web 开发人员能够更轻松地创建出功能丰富、视觉效果惊艳、性能优异且适配多种设备的网站和应用，同时减少对图片和 JavaScript 的依赖。具体作用包括：

1. **美化与特效**：轻松实现圆角、阴影、渐变、透明、多背景等视觉效果，以前需要切图才能完成。
2. **布局革命**：提供了强大的布局工具（FlexBox, Grid），让复杂布局变得简单、灵活且易维护。
3. **增强动画与交互**：通过 `transition` 和 `animation` 实现平滑的动画，提升用户体验，减少对 JavaScript 动画库的依赖。
4. **响应式设计**：`media queries`（媒体查询）是实现响应式网页设计的核心技术，让网站能自动适配不同尺寸的设备（手机、平板、桌面电脑）。
5. **丰富内容呈现**：支持自定义字体（`@font-face`）、多列文本布局、文本阴影和溢出处理等。
6. **性能优化**：硬件加速的动画和变形可以提高渲染性能；用 CSS 替代图片减少了 HTTP 请求。

## 二、怎么用？（基本用法）

CSS3 的使用方式和 CSS 一样，主要有三种：

1. **内联样式**：在 HTML 标签的 `style` 属性中直接写入（不推荐，难以维护）。

   ```html
   <div style="border-radius: 10px; box-shadow: 2px 2px 5px #ccc;">内容</div>
   ```

2. **内部样式表**：在 HTML 文档的 `<head>` 部分的 `<style>` 标签中编写。

   ```html
   <head>
     <style>
       .box {
         border-radius: 10px;
       }
     </style>
   </head>
   ```

3. **外部样式表（最常用）**：在单独的 `.css` 文件中编写，然后在 HTML 中通过 `<link>` 标签引入。

   ```html
   <head>
     <link rel="stylesheet" href="styles.css" />
   </head>
   ```

   在 `styles.css` 文件中：

   ```css
   /* 这里是所有的CSS3代码 */
   .button {
     background: linear-gradient(to bottom, #3498db, #2980b9);
     border-radius: 5px;
     transition: all 0.3s ease;
   }
   ```

## 三、核心特性与常用 API（模块与属性）

CSS3 包含众多模块，以下是其最核心、最常用的部分：

### 1. 选择器

增强了选择元素的能力。

- **属性选择器**：`[attr^=val]`（开头）, `[attr$=val]`（结尾）, `[attr*=val]`（包含）
- **结构性伪类**：`:nth-child(n)`, `:nth-of-type(n)`, `:last-child`, `:not(selector)`
- **UI 元素状态伪类**：`:checked`, `:disabled`, `:focus`

#### 2. 边框与背景

- **圆角**：`border-radius: 10px;`（可分别设置四个角）
- **盒阴影**：`box-shadow: h-shadow v-shadow blur spread color inset;`

  ```css
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  ```

- **文本阴影**：`text-shadow: h-shadow v-shadow blur color;`
- **渐变背景**：`background: linear-gradient(direction, color-stop1, color-stop2, ...);`

  ```css
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  ```

- **多背景**：`background: url(bg1.png) top left, url(bg2.png) bottom right;`

#### 3. 变形

- **2D 变形**：`transform: translate(50px, 100px) | rotate(30deg) | scale(1.5) | skew(20deg);`
- **3D 变形**：`transform: rotateX(45deg) | translate3d(x, y, z);`

#### 4. 过渡

实现属性变化的平滑动画效果。

- **`transition`**：`transition: property duration timing-function delay;`

  ```css
  .btn {
    transition: background-color 0.5s ease, transform 0.2s;
  }
  .btn:hover {
    background-color: blue;
    transform: scale(1.1);
  }
  ```

#### 5. 动画

定义关键帧动画，实现更复杂的动态效果。

- **`@keyframes`**：定义动画序列。
- **`animation`**：应用动画。

  ```css
  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  .ball {
    animation: bounce 1s infinite;
  }
  ```

#### 6. 弹性盒子布局

**一维布局模型**，用于在容器内对其子元素进行排列、对齐和分配空间，尤其适用于组件和小规模布局。

- **容器属性**：`display: flex;`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`
- **项目属性**：`flex-grow`, `flex-shrink`, `flex-basis`, `align-self`

#### 7. 网格布局

**二维布局系统**，将页面划分为行和列，可以精确控制项目的位置和大小，适用于整体页面布局。

- **容器属性**：`display: grid;`, `grid-template-columns`, `grid-template-rows`, `gap`
- **项目属性**：`grid-column`, `grid-row`

#### 8. 媒体查询

响应式设计的基石，根据设备特性（如屏幕宽度、分辨率）应用不同的样式。

```css
/* 当屏幕宽度小于等于 768px 时 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
  .sidebar {
    display: none;
  }
}
```

---

## 四、常见应用场景与案例

1. **响应式导航栏**

   - **场景**：在桌面端水平排列，在移动端变为汉堡菜单。
   - **技术**：Flexbox 布局 + 媒体查询。

2. **卡片式设计**

   - **场景**：电商产品列表、博客文章预览。
   - **技术**：`border-radius`, `box-shadow`, `transition`（悬停放大效果）。

3. **加载动画**

   - **场景**：页面或组件加载时提示用户等待。
   - **技术**：`@keyframes` 和 `animation` 制作旋转、脉冲等动画。

4. **渐变按钮**

   - **场景**：吸引用户点击的 CTA 按钮。
   - **技术**：`linear-gradient` 背景 + `transition` 悬停变色。

5. **复杂页面布局**

   - **场景**：仪表盘、后台管理系统。
   - **技术**：CSS Grid 创建复杂的行列布局，Flexbox 对网格内组件进行微调。

6. **视差滚动效果**
   - **场景**：单页营销网站，增强视觉吸引力。
   - **技术**：`background-attachment: fixed;`（经典视差），或结合 `transform: translateZ` 实现更佳性能的视差。

---

## 五、扩展相关内容

1. **CSS3 的现状与 CSS4**

   - CSS3 之后，W3C 不再以“版本”方式发布，而是各个模块独立升级。我们常说的“CSS4”其实是部分模块（如选择器 Level 4）的版本号。现在统称为 **“现代 CSS”**。

2. **CSS 预处理器与后处理器**

   - **预处理器**：如 **Sass/Less**，提供了变量、嵌套、混入等功能，让 CSS 编写更高效，最终编译成原生 CSS。
   - **后处理器**：如 **PostCSS**，常与 **Autoprefixer** 插件配合，能自动为 CSS 属性添加浏览器厂商前缀（`-webkit-`, `-moz-`），解决兼容性问题。

3. **CSS 框架**

   - **Bootstrap, Tailwind CSS, Bulma** 等框架内置了大量基于 CSS3 的实用样式和组件，能极大提高开发效率。Tailwind 尤其代表了“实用类优先”的现代 CSS 方法论。

4. **兼容性考虑**

   - 使用 **Can I use** 网站查询属性兼容性。
   - 对于关键功能，使用 **特性查询** `@supports` 进行渐进增强。

     ```css
     @supports (display: grid) {
       .container {
         display: grid;
       }
     }
     ```

## 总结

**CSS3 是现代 Web 前端开发的基石**。

它将 CSS 从一个简单的样式描述语言，升级为一个强大的**界面描述与交互工具**。

从精美的视觉效果到复杂的响应式布局，再到流畅的动画，CSS3 无处不在。掌握其核心模块（选择器、盒模型增强、Flexbox、Grid、过渡动画、媒体查询）是成为一名合格前端开发者的必备条件。
