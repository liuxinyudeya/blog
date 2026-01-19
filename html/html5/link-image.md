# HTML 链接与图像技术文档

## 超链接

### 基本语法

超链接是 HTML 的核心功能之一，使用`<a>`标签创建。

```html
<a href="https://www.example.com">访问示例网站</a>
```

### target 属性

控制链接打开方式：

| 值        | 描述                          | 示例                                    |
| --------- | ----------------------------- | --------------------------------------- |
| `_self`   | 在当前窗口/标签页打开（默认） | `<a href="page.html" target="_self">`   |
| `_blank`  | 在新窗口/标签页打开           | `<a href="page.html" target="_blank">`  |
| `_parent` | 在父框架中打开                | `<a href="page.html" target="_parent">` |
| `_top`    | 在整个窗口打开，退出所有框架  | `<a href="page.html" target="_top">`    |
| 框架名    | 在指定的框架中打开            | `<a href="page.html" target="myFrame">` |

**安全建议**：当使用`target="_blank"`时，建议添加`rel="noopener noreferrer"`防止标签页钓鱼攻击：

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  安全的外部链接
</a>
```

### 相对与绝对路径

```html
<!-- 绝对路径 -->
<a href="https://www.example.com/products/item.html">绝对路径</a>

<!-- 相对路径 -->
<a href="products/item.html">相对路径（当前目录子文件夹）</a>
<a href="../about.html">相对路径（上级目录）</a>
<a href="/images/photo.jpg">根相对路径</a>
```

### 锚点链接

在同一页面内跳转到指定位置：

```html
<!-- 定义锚点 -->
<h2 id="section1">第一部分</h2>
<p>这里是第一部分的内容...</p>

<h2 id="section2">第二部分</h2>
<p>这里是第二部分的内容...</p>

<!-- 创建到锚点的链接 -->
<nav>
  <a href="#section1">跳转到第一部分</a>
  <a href="#section2">跳转到第二部分</a>
  <a href="#">返回顶部</a>
</nav>

<!-- 跨页面锚点链接 -->
<a href="page.html#section3">跳转到另一页面的第三部分</a>
```

### 其他链接类型

```html
<!-- 邮件链接 -->
<a href="mailto:contact@example.com?subject=咨询&body=您好，我想咨询...">
  发送邮件
</a>

<!-- 电话链接（移动设备） -->
<a href="tel:+8613800138000">拨打客服电话</a>

<!-- 下载链接 -->
<a href="/files/document.pdf" download="文档.pdf">下载PDF文档</a>

<!-- JavaScript链接 -->
<a href="javascript:void(0)" onclick="showAlert()">执行JavaScript</a>

<!-- 片段标识符 -->
<a href="#:~:text=重要内容">跳转到页面中的特定文本</a>
```

## 图像

### 基本语法

```html
<img src="images/photo.jpg" alt="图片描述" />
```

### alt 属性

`alt`属性是强制性的，对无障碍访问和 SEO 至关重要：

```html
<!-- 描述性alt文本 -->
<img src="tiger.jpg" alt="一只孟加拉虎在丛林中行走" />

<!-- 装饰性图片应使用空alt -->
<img src="divider.png" alt="" />

<!-- 包含文字的图片 -->
<img src="logo.png" alt="公司名称：ABC科技有限公司" />

<!-- 复杂图像的详细描述 -->
<img src="chart.png" alt="2023年销售趋势图，第一季度20万，第二季度25万..." />
```

### 响应式图片

HTML5 提供了多种响应式图片解决方案：

#### 1. `srcset` 和 `sizes` 属性

```html
<img
  src="image-small.jpg"
  srcset="image-small.jpg 400w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(max-width: 600px) 400px,
            (max-width: 1200px) 800px,
            1200px"
  alt="响应式图片示例"
/>
```

#### 2. `picture` 元素（艺术指导）

```html
<picture>
  <!-- 小屏幕：方形裁剪 -->
  <source
    media="(max-width: 768px)"
    srcset="image-square-small.jpg 1x, image-square-large.jpg 2x"
  />

  <!-- 中屏幕：宽屏裁剪 -->
  <source
    media="(max-width: 1200px)"
    srcset="image-wide-small.jpg 1x, image-wide-large.jpg 2x"
  />

  <!-- 大屏幕及默认：原始图片 -->
  <source media="(min-width: 1201px)" srcset="image-original.jpg" />

  <!-- 备用img（必需） -->
  <img src="image-default.jpg" alt="响应式图片艺术指导示例" />
</picture>
```

#### 3. 不同格式支持

```html
<picture>
  <source type="image/webp" srcset="image.webp" />
  <source type="image/jpeg" srcset="image.jpg" />
  <img src="image.jpg" alt="现代图片格式支持" />
</picture>
```

### 图片格式选择

| 格式     | 特点                 | 适用场景                       |
| -------- | -------------------- | ------------------------------ |
| JPEG/JPG | 有损压缩，文件小     | 照片、复杂图像                 |
| PNG      | 无损压缩，支持透明度 | 图标、logo、需要透明背景的图像 |
| GIF      | 支持动画，颜色有限   | 简单动画、低颜色需求图像       |
| WebP     | 现代格式，压缩率高   | 所有场景（需考虑浏览器兼容性） |
| SVG      | 矢量格式，无限缩放   | 图标、logo、简单图形           |
| AVIF     | 最新格式，优秀压缩   | 高质量图像（需考虑兼容性）     |

## 图片映射

### 基本语法

图片映射允许在单个图片上定义多个可点击区域：

```html
<img src="planets.jpg" alt="太阳系行星图" usemap="#planetmap" />

<map name="planetmap">
  <area shape="rect" coords="0,0,82,126" href="sun.html" alt="太阳" />
  <area shape="circle" coords="90,58,3" href="mercury.html" alt="水星" />
  <area shape="circle" coords="124,58,8" href="venus.html" alt="金星" />
  <area shape="circle" coords="162,58,10" href="earth.html" alt="地球" />
</map>
```

### area 形状类型

#### 1. 矩形（rect）

```html
<area shape="rect" coords="x1,y1,x2,y2" href="url" alt="描述" />
<!-- x1,y1: 左上角坐标 -->
<!-- x2,y2: 右下角坐标 -->
```

#### 2. 圆形（circle）

```html
<area shape="circle" coords="x,y,radius" href="url" alt="描述" />
<!-- x,y: 圆心坐标 -->
<!-- radius: 半径 -->
```

#### 3. 多边形（poly）

```html
<area shape="poly" coords="x1,y1,x2,y2,x3,y3,..." href="url" alt="描述" />
<!-- 每个x,y对代表多边形的一个顶点 -->
```

#### 4. 默认（default）

```html
<area shape="default" href="url" alt="描述" />
<!-- 定义图片上未被其他区域覆盖的部分 -->
```

### 复杂示例

```html
<!-- 世界地图可点击区域 -->
<img
  src="world-map.png"
  alt="世界地图"
  usemap="#worldmap"
  width="800"
  height="400"
/>

<map name="worldmap">
  <!-- 北美洲（多边形） -->
  <area
    shape="poly"
    coords="100,50, 150,60, 180,80, 160,100, 120,90, 100,70"
    href="north-america.html"
    alt="北美洲"
    title="点击了解北美洲"
  />

  <!-- 欧洲（矩形） -->
  <area
    shape="rect"
    coords="300,80, 400,150"
    href="europe.html"
    alt="欧洲"
    target="_blank"
  />

  <!-- 亚洲（多个区域组合） -->
  <area
    shape="poly"
    coords="450,60, 500,70, 550,90, 600,120, 580,150, 520,130, 470,100"
    href="asia.html"
    alt="亚洲"
  />

  <!-- 默认区域（海洋部分） -->
  <area shape="default" href="oceans.html" alt="世界海洋" />
</map>

<!-- 添加交互效果 -->
<style>
  img[usemap] {
    border: none;
  }
  area {
    cursor: pointer;
    outline: none;
  }
</style>

<script>
  // 为图片映射区域添加鼠标悬停效果
  document.addEventListener("DOMContentLoaded", function () {
    const areas = document.querySelectorAll("area");
    const img = document.querySelector("img[usemap]");

    areas.forEach((area) => {
      area.addEventListener("mouseenter", function () {
        // 可以在这里添加视觉反馈
        console.log("悬停在：" + this.alt);
      });

      area.addEventListener("focus", function () {
        // 键盘导航时的反馈
        this.style.outline = "2px solid blue";
      });
    });
  });
</script>
```

## 最佳实践

### 链接最佳实践

1. **描述性链接文本**：避免使用"点击这里"等模糊文本

   ```html
   <!-- 差 -->
   <p>要了解更多信息，<a href="info.html">点击这里</a>。</p>

   <!-- 好 -->
   <p><a href="info.html">了解更多关于HTML的信息</a>。</p>
   ```

2. **外部链接标识**：明确指示外部链接

   ```html
   <a href="https://external.com" class="external-link">
     外部资源 <span class="external-icon" aria-hidden="true">↗</span>
   </a>
   ```

3. **链接状态样式**：提供视觉反馈

   ```css
   a:link {
     color: blue;
   }
   a:visited {
     color: purple;
   }
   a:hover {
     text-decoration: underline;
   }
   a:active {
     color: red;
   }
   a:focus {
     outline: 2px solid orange;
   }
   ```

### 图片最佳实践

1. **懒加载**：提高页面加载性能

   ```html
   <img src="image.jpg" loading="lazy" alt="..." />
   ```

2. **解码异步**：避免阻塞渲染

   ```html
   <img src="large-image.jpg" decoding="async" alt="..." />
   ```

3. **适当尺寸**：指定宽度和高度防止布局偏移

   ```html
   <img
     src="image.jpg"
     width="800"
     height="600"
     alt="..."
     style="max-width: 100%; height: auto;"
   />
   ```

## 无障碍访问

### 链接无障碍

1. **键盘导航**：确保所有链接可通过键盘访问
2. **焦点指示**：提供清晰的焦点样式
3. **ARIA 属性**：复杂情况使用 ARIA 标签

   ```html
   <a href="#" aria-label="关闭菜单" role="button">×</a>
   ```

### 图片无障碍

1. **替代文本**：根据上下文提供有意义的 alt 文本
2. **复杂图像描述**：使用`longdesc`或关联的详细描述

   ```html
   <img
     src="complex-chart.png"
     alt="2023年销售图表"
     longdesc="chart-description.html"
   />

   <!-- 或使用关联的详细描述 -->
   <img src="chart.png" alt="销售图表" />
   <a href="#chart-desc" class="visually-hidden">跳转到图表详细描述</a>
   <div id="chart-desc" class="visually-hidden">
     详细描述：2023年第一季度销售额为...
   </div>
   ```

3. **装饰性图片处理**：使用空的 alt 属性或 CSS 背景

   ```html
   <img src="decorative-line.png" alt="" role="presentation" />
   ```

### 图片映射无障碍

```html
<img src="organizational-chart.png" alt="公司组织结构图" usemap="#orgchart" />

<map name="orgchart">
  <area
    shape="rect"
    coords="0,0,100,50"
    href="ceo.html"
    alt="CEO：张三"
    aria-label="首席执行官张三"
  />

  <!-- 为复杂区域提供详细描述 -->
  <area
    shape="poly"
    coords="50,100,150,100,150,200,50,200"
    href="it-dept.html"
    alt="IT部门"
    aria-describedby="it-dept-desc"
  />
</map>

<div id="it-dept-desc" class="visually-hidden">
  IT部门负责公司所有技术基础设施，包括网络、服务器和软件开发。
</div>
```

**相关技术**：CSS 背景图片、SVG 图像、Canvas 绘图、WebP/AVIF 格式转换、图片懒加载库（如 lozad.js）

**工具推荐**：

- 图片优化：TinyPNG、Squoosh、ImageOptim
- 响应式图片生成：Sharp、ImageMagick
- 图片映射创建工具：GIMP、在线图片映射生成器
- 无障碍测试：axe、WAVE、Lighthouse

**注意**：始终在实际设备上测试响应式图片和图片映射功能，确保在所有目标设备上正常工作。
