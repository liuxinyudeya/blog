# SVG 全面详解

## 一、SVG 是什么？

### 1.1 基本定义

**SVG（Scalable Vector Graphics，可缩放矢量图形）** 是一种基于 XML 的矢量图像格式，用于描述二维图形。与基于像素的位图（如 PNG、JPEG）不同，SVG 使用数学公式描述图形，因此可以无限缩放而不失真。

### 1.2 关键特性

| 特性         | 描述                 | 优势                   |
| ------------ | -------------------- | ---------------------- |
| **矢量图形** | 基于数学公式描述     | 无限缩放，不失真       |
| **XML 格式** | 文本格式，可读性强   | 可压缩、可编辑、可搜索 |
| **DOM 集成** | 可被浏览器解析为 DOM | 可用 CSS/JS 操作       |
| **交互性**   | 支持事件和动画       | 创建交互式图形         |
| **体积小**   | 简单的图形文件很小   | 加载快，适合网页       |

### 1.3 与位图的对比

```javascript
// 位图 vs SVG
const imageComparison = {
  bitmap: {
    type: "PNG, JPEG, GIF, WebP",
    format: "像素网格",
    zoom: "放大后模糊（像素化）",
    fileSize: "取决于分辨率和质量",
    编辑: "需要图像编辑器",
    适用场景: "照片、复杂渐变",
  },
  svg: {
    type: "SVG",
    format: "数学公式（矢量）",
    zoom: "无限放大，保持清晰",
    fileSize: "取决于复杂度和路径",
    编辑: "文本编辑器、代码",
    适用场景: "图标、图表、UI元素",
  },
};

// 实际例子
// ❌ 位图：放大200% → 模糊
// ✅ SVG：放大200% → 依然清晰
```

## 二、SVG 有什么用？

### 2.1 主要应用场景

#### 2.1.1 图标和 UI 元素

```xml
<!-- 响应式图标系统 -->
<svg class="icon" viewBox="0 0 24 24" width="24" height="24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
</svg>
```

#### 2.1.2 数据可视化

```xml
<!-- 动态图表 -->
<svg width="400" height="300" class="chart">
    <!-- X轴 -->
    <line x1="50" y1="250" x2="350" y2="250" stroke="#333" stroke-width="2"/>

    <!-- Y轴 -->
    <line x1="50" y1="50" x2="50" y2="250" stroke="#333" stroke-width="2"/>

    <!-- 柱状图 -->
    <rect x="70" y="150" width="40" height="100" fill="#4CAF50" data-value="100"/>
    <rect x="130" y="100" width="40" height="150" fill="#2196F3" data-value="150"/>
    <rect x="190" y="50" width="40" height="200" fill="#FF9800" data-value="200"/>
    <rect x="250" y="180" width="40" height="70" fill="#F44336" data-value="70"/>

    <!-- 标签 -->
    <text x="90" y="270" text-anchor="middle" font-size="12">Q1</text>
    <text x="150" y="270" text-anchor="middle" font-size="12">Q2</text>
    <text x="210" y="270" text-anchor="middle" font-size="12">Q3</text>
    <text x="270" y="270" text-anchor="middle" font-size="12">Q4</text>
</svg>
```

#### 2.1.3 地图和示意图

```xml
<!-- 简单地图 -->
<svg width="600" height="400" class="map">
    <!-- 背景 -->
    <rect x="0" y="0" width="600" height="400" fill="#E3F2FD"/>

    <!-- 陆地 -->
    <path d="M100,100 C150,80 200,90 250,100 L300,150 L280,200 L200,180 L150,150 Z"
          fill="#81C784" stroke="#388E3C" stroke-width="2"/>

    <!-- 河流 -->
    <path d="M350,50 Q400,100 350,150 T350,250"
          fill="none" stroke="#64B5F6" stroke-width="4"/>

    <!-- 城市标记 -->
    <g class="city" data-city="北京">
        <circle cx="200" cy="120" r="8" fill="#D32F2F"/>
        <text x="210" y="125" font-size="12" fill="#333">北京</text>
    </g>

    <g class="city" data-city="上海">
        <circle cx="380" cy="180" r="8" fill="#1976D2"/>
        <text x="390" y="185" font-size="12" fill="#333">上海</text>
    </g>
</svg>
```

#### 2.1.4 Logo 和品牌元素

```xml
<!-- 公司Logo -->
<svg width="200" height="80" viewBox="0 0 200 80">
    <!-- 图形部分 -->
    <g transform="translate(20, 20)">
        <path d="M0,0 L40,0 L40,40 L0,40 Z" fill="#2196F3"/>
        <path d="M50,0 L90,0 L90,40 L50,40 Z" fill="#4CAF50" opacity="0.8"/>
        <path d="M25,45 L65,45 L65,85 L25,85 Z" fill="#FF9800" opacity="0.8"/>
    </g>

    <!-- 文字部分 -->
    <text x="110" y="45" font-family="Arial, sans-serif"
          font-size="24" font-weight="bold" fill="#333">
        TechCorp
    </text>

    <text x="110" y="70" font-family="Arial, sans-serif"
          font-size="14" fill="#666">
        Innovation & Excellence
    </text>
</svg>
```

### 2.2 技术优势

#### 2.2.1 响应式设计

```css
/* SVG 响应式样式 */
.responsive-svg {
  /* 保持宽高比 */
  max-width: 100%;
  height: auto;

  /* 在不同设备上保持清晰 */
  -webkit-tap-highlight-color: transparent;
}

/* 媒体查询调整SVG样式 */
@media (max-width: 768px) {
  .chart text {
    font-size: 10px;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
}
```

#### 2.2.2 动画和交互

```html
<!-- 交互式SVG示例 -->
<svg width="300" height="200" id="interactive-svg">
  <!-- 可点击的按钮 -->
  <rect
    id="button"
    x="50"
    y="50"
    width="200"
    height="60"
    rx="10"
    fill="#2196F3"
    cursor="pointer"
  >
    <animate
      attributeName="fill"
      values="#2196F3;#1976D2;#2196F3"
      dur="0.5s"
      begin="click"
      fill="freeze"
    />
  </rect>

  <text
    x="150"
    y="90"
    text-anchor="middle"
    fill="white"
    font-size="20"
    font-weight="bold"
    pointer-events="none"
  >
    点击我
  </text>

  <!-- 鼠标悬停效果 -->
  <circle id="hover-circle" cx="150" cy="150" r="30" fill="#4CAF50">
    <animate
      attributeName="r"
      values="30;35;30"
      dur="1s"
      begin="mouseover"
      repeatCount="1"
    />
    <animate
      attributeName="fill"
      values="#4CAF50;#81C784;#4CAF50"
      dur="1s"
      begin="mouseover"
      repeatCount="1"
    />
  </circle>
</svg>

<script>
  // JavaScript 交互
  document.getElementById("button").addEventListener("click", function () {
    alert("按钮被点击了！");
  });

  document
    .getElementById("hover-circle")
    .addEventListener("mouseenter", function () {
      this.style.filter = "drop-shadow(0 0 8px rgba(76, 175, 80, 0.6))";
    });
</script>
```

## 三、SVG 怎么用？

### 3.1 嵌入方式

#### 3.1.1 直接内嵌

```html
<!-- 直接写在HTML中 -->
<div class="container">
  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="blue" />
  </svg>
</div>
```

#### 3.1.2 作为图像引用

```html
<!-- 使用img标签 -->
<img src="icon.svg" alt="图标" width="100" height="100" />

<!-- 使用CSS背景 -->
<div class="icon-background"></div>

<style>
  .icon-background {
    width: 100px;
    height: 100px;
    background-image: url("icon.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>
```

#### 3.1.3 使用 object 或 iframe

```html
<!-- 使用object标签 -->
<object type="image/svg+xml" data="graphic.svg" width="400" height="300">
  您的浏览器不支持SVG
</object>

<!-- 使用iframe -->
<iframe
  src="graphic.svg"
  width="400"
  height="300"
  frameborder="0"
  scrolling="no"
></iframe>
```

### 3.2 创建和编辑工具

#### 3.2.1 代码编辑器

```javascript
// 手动编写SVG代码
const svgCode = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <!-- 简单的笑脸 -->
    <circle cx="100" cy="100" r="80" fill="yellow" stroke="black" stroke-width="3"/>
    
    <!-- 眼睛 -->
    <circle cx="70" cy="70" r="10" fill="black"/>
    <circle cx="130" cy="70" r="10" fill="black"/>
    
    <!-- 嘴巴 -->
    <path d="M 70 130 Q 100 160 130 130" 
          fill="none" stroke="black" stroke-width="3"/>
</svg>
`;
```

#### 3.2.2 可视化工具

```javascript
// 常用SVG编辑工具
const svgTools = {
  // 桌面软件
  desktop: [
    { name: "Adobe Illustrator", purpose: "专业矢量图形设计" },
    { name: "Inkscape", purpose: "开源矢量图形编辑器" },
    { name: "Sketch", purpose: "UI/UX设计" },
    { name: "Figma", purpose: "协作式设计工具" },
  ],

  // 在线工具
  online: [
    {
      name: "SVG-Edit",
      url: "https://svgedit.netlify.app/",
      purpose: "在线SVG编辑器",
    },
    {
      name: "Boxy SVG",
      url: "https://boxy-svg.com/",
      purpose: "网页版SVG编辑器",
    },
    { name: "Vectr", url: "https://vectr.com/", purpose: "免费矢量图形软件" },
  ],

  // 代码库和工具
  libraries: [
    { name: "SVG.js", purpose: "操作SVG的JavaScript库" },
    { name: "Snap.svg", purpose: "SVG动画和交互库" },
    { name: "D3.js", purpose: "数据驱动的文档操作" },
    { name: "Two.js", purpose: "二维绘图API" },
  ],
};
```

## 四、SVG 语法详解

### 4.1 基本结构和属性

#### 4.1.1 SVG 根元素

```xml
<!-- 基本SVG结构 -->
<svg
    xmlns="http://www.w3.org/2000/svg"     <!-- 命名空间 -->
    version="1.1"                         <!-- SVG版本 -->

    <!-- 尺寸和视图框 -->
    width="200"                           <!-- 宽度 -->
    height="150"                          <!-- 高度 -->
    viewBox="0 0 200 150"                 <!-- 视图框：min-x min-y width height -->

    <!-- 其他属性 -->
    preserveAspectRatio="xMidYMid meet"   <!-- 保持宽高比 -->
    style="border: 1px solid #ccc"        <!-- CSS样式 -->
    class="my-svg"                        <!-- CSS类 -->
    id="unique-id"                        <!-- 唯一标识 -->
>
    <!-- SVG内容 -->
</svg>
```

#### 4.1.2 viewBox 详解

```xml
<!-- viewBox 的工作原理 -->
<svg width="400" height="300" viewBox="0 0 200 150">
    <!-- 这里坐标系统是200x150，但显示在400x300的画布上 -->
    <rect x="0" y="0" width="200" height="150" fill="#f0f0f0"/>
    <circle cx="100" cy="75" r="50" fill="blue"/>
    <!-- 图形会被放大2倍显示 -->
</svg>

<!-- 不同 viewBox 设置的效果 -->
<div style="display: flex; gap: 20px;">
    <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="red"/>
    </svg>

    <svg width="100" height="100" viewBox="0 0 200 200">
        <!-- 相同的圆，但坐标系扩大 -->
        <circle cx="50" cy="50" r="40" fill="blue"/>
    </svg>

    <svg width="100" height="100" viewBox="-50 -50 200 200">
        <!-- 坐标原点偏移 -->
        <circle cx="50" cy="50" r="40" fill="green"/>
    </svg>
</div>
```

### 4.2 基本图形元素

#### 4.2.1 矩形（rect）

```xml
<svg width="300" height="200">
    <!-- 基本矩形 -->
    <rect x="20" y="20" width="100" height="80"
          fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>

    <!-- 圆角矩形 -->
    <rect x="150" y="20" width="100" height="80" rx="10" ry="10"
          fill="#2196F3" stroke="#1976D2" stroke-width="2"/>

    <!-- 半透明矩形 -->
    <rect x="80" y="110" width="140" height="60"
          fill="rgba(255, 152, 0, 0.7)" stroke="#F57C00" stroke-width="3"/>
</svg>
```

#### 4.2.2 圆形（circle）和椭圆（ellipse）

```xml
<svg width="300" height="200">
    <!-- 圆形 -->
    <circle cx="80" cy="80" r="50"
            fill="#E91E63" stroke="#C2185B" stroke-width="3"/>

    <!-- 椭圆 -->
    <ellipse cx="200" cy="80" rx="70" ry="40"
             fill="#9C27B0" stroke="#7B1FA2" stroke-width="2"/>

    <!-- 多个同心圆 -->
    <circle cx="140" cy="140" r="40" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="140" cy="140" r="30" fill="none" stroke="#666" stroke-width="2"/>
    <circle cx="140" cy="140" r="20" fill="none" stroke="#999" stroke-width="2"/>
    <circle cx="140" cy="140" r="10" fill="#333"/>
</svg>
```

#### 4.2.3 直线（line）和多段线（polyline）

```xml
<svg width="300" height="200">
    <!-- 直线 -->
    <line x1="20" y1="20" x2="280" y2="180"
          stroke="#FF5722" stroke-width="3"/>

    <!-- 多段线（不闭合） -->
    <polyline points="30,50 80,30 130,70 180,40 230,90"
              fill="none" stroke="#2196F3" stroke-width="2"/>

    <!-- 虚线 -->
    <line x1="20" y1="120" x2="280" y2="120"
          stroke="#4CAF50" stroke-width="2" stroke-dasharray="5,5"/>
</svg>
```

#### 4.2.4 多边形（polygon）

```xml
<svg width="300" height="200">
    <!-- 三角形 -->
    <polygon points="150,20 220,150 80,150"
             fill="#FF9800" stroke="#F57C00" stroke-width="2"/>

    <!-- 五边形 -->
    <polygon points="100,50 120,30 140,35 135,55 105,60"
             fill="#2196F3" stroke="#1976D2" stroke-width="2"/>

    <!-- 六边形 -->
    <polygon points="200,50 220,60 220,80 200,90 180,80 180,60"
             fill="#4CAF50" stroke="#388E3C" stroke-width="2"/>
</svg>
```

#### 4.2.5 路径（path） - 最强大的元素

```xml
<svg width="400" height="300">
    <!-- 路径命令说明 -->
    <text x="10" y="20" font-size="12">路径命令：</text>
    <text x="10" y="40" font-size="10">M = 移动到</text>
    <text x="10" y="55" font-size="10">L = 画线到</text>
    <text x="10" y="70" font-size="10">H = 水平线到</text>
    <text x="10" y="85" font-size="10">V = 垂直线到</text>
    <text x="10" y="100" font-size="10">C = 三次贝塞尔曲线</text>
    <text x="10" y="115" font-size="10">S = 平滑三次贝塞尔曲线</text>
    <text x="10" y="130" font-size="10">Q = 二次贝塞尔曲线</text>
    <text x="10" y="145" font-size="10">T = 平滑二次贝塞尔曲线</text>
    <text x="10" y="160" font-size="10">A = 椭圆弧</text>
    <text x="10" y="175" font-size="10">Z = 闭合路径</text>

    <!-- 示例路径 -->
    <path d="M 200 50
             L 250 100
             Q 300 50 350 100
             C 380 120 420 80 450 100
             A 20 30 0 0 1 480 150
             Z"
          fill="rgba(76, 175, 80, 0.3)"
          stroke="#4CAF50"
          stroke-width="2"/>
</svg>
```

### 4.3 文本和样式

#### 4.3.1 文本（text）

```xml
<svg width="400" height="300">
    <!-- 基本文本 -->
    <text x="50" y="50" font-family="Arial" font-size="20" fill="#333">
        SVG 文本示例
    </text>

    <!-- 多行文本 -->
    <text x="50" y="100" font-family="Arial" font-size="16" fill="#666">
        <tspan x="50" dy="0">这是第一行文本</tspan>
        <tspan x="50" dy="25">这是第二行文本</tspan>
        <tspan x="50" dy="25">这是第三行文本</tspan>
    </text>

    <!-- 文本路径 -->
    <path id="textPath" d="M 50 200 Q 200 150 350 200" fill="none" stroke="#ddd"/>
    <text font-family="Arial" font-size="16" fill="#2196F3">
        <textPath href="#textPath" startOffset="0%">
            沿着路径排列的文本
        </textPath>
    </text>

    <!-- 文本装饰 -->
    <text x="50" y="250" font-family="Arial" font-size="24"
          fill="none" stroke="#FF5722" stroke-width="1">
        描边文本
    </text>
</svg>
```

#### 4.3.2 样式属性详解

```xml
<svg width="500" height="400">
    <!-- 填充和描边 -->
    <rect x="20" y="20" width="100" height="80"
          fill="url(#gradient1)"
          stroke="#333"
          stroke-width="3"
          stroke-dasharray="5,3"
          stroke-linecap="round"
          stroke-linejoin="round"/>

    <!-- 线性渐变 -->
    <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF5722"/>
            <stop offset="50%" stop-color="#FF9800"/>
            <stop offset="100%" stop-color="#FFC107"/>
        </linearGradient>

        <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stop-color="#2196F3"/>
            <stop offset="100%" stop-color="#0D47A1"/>
        </radialGradient>
    </defs>

    <!-- 使用渐变 -->
    <circle cx="200" cy="60" r="40" fill="url(#gradient2)"/>

    <!-- 透明度 -->
    <g opacity="0.7">
        <rect x="150" y="120" width="80" height="80" fill="#4CAF50"/>
        <rect x="200" y="150" width="80" height="80" fill="#9C27B0" fill-opacity="0.5"/>
    </g>

    <!-- 变换 -->
    <rect x="300" y="120" width="80" height="80" fill="#FF5722"
          transform="rotate(45 340 160)"/>

    <!-- 滤镜效果 -->
    <defs>
        <filter id="blurFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
        </filter>

        <filter id="shadowFilter">
            <feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/>
        </filter>
    </defs>

    <circle cx="400" cy="250" r="40" fill="#E91E63" filter="url(#shadowFilter)"/>
    <circle cx="400" cy="250" r="30" fill="#9C27B0" filter="url(#blurFilter)"/>
</svg>
```

### 4.4 高级功能

#### 4.4.1 符号（symbol）和引用（use）

```xml
<svg width="400" height="300" style="border: 1px solid #ddd;">
    <!-- 定义符号（不直接显示） -->
    <defs>
        <symbol id="star" viewBox="0 0 100 100">
            <polygon points="50,10 61,35 88,35 66,54 72,80 50,65 28,80 34,54 12,35 39,35"
                     fill="#FFD700" stroke="#FF9800" stroke-width="2"/>
        </symbol>

        <symbol id="arrow" viewBox="0 0 100 100">
            <path d="M20,50 L80,50 M80,50 L60,30 M80,50 L60,70"
                  stroke="#2196F3" stroke-width="5" stroke-linecap="round"/>
        </symbol>
    </defs>

    <!-- 使用符号 -->
    <use href="#star" x="50" y="50" width="50" height="50"/>
    <use href="#star" x="120" y="50" width="50" height="50" fill="#4CAF50"/>
    <use href="#star" x="190" y="50" width="50" height="50" opacity="0.7"/>

    <!-- 箭头 -->
    <use href="#arrow" x="50" y="150" width="100" height="50"/>
    <use href="#arrow" x="200" y="150" width="100" height="50"
         transform="rotate(90 250 175)"/>
</svg>
```

#### 4.4.2 组（g）和蒙版（mask）

```xml
<svg width="400" height="300">
    <!-- 定义蒙版 -->
    <defs>
        <mask id="circleMask">
            <circle cx="200" cy="150" r="80" fill="white"/>
            <circle cx="200" cy="150" r="40" fill="black"/>
        </mask>

        <mask id="gradientMask">
            <linearGradient id="maskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="white" stop-opacity="0"/>
                <stop offset="50%" stop-color="white"/>
                <stop offset="100%" stop-color="white" stop-opacity="0"/>
            </linearGradient>
            <rect x="0" y="0" width="400" height="300" fill="url(#maskGradient)"/>
        </mask>
    </defs>

    <!-- 使用蒙版 -->
    <rect x="0" y="0" width="400" height="300" fill="#E3F2FD"/>

    <!-- 图案背景 -->
    <defs>
        <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="5" fill="#64B5F6" opacity="0.3"/>
        </pattern>
    </defs>

    <!-- 组元素 -->
    <g mask="url(#circleMask)">
        <rect x="100" y="50" width="200" height="200" fill="url(#pattern)"/>
        <rect x="100" y="50" width="200" height="200" fill="#2196F3" opacity="0.5"/>
    </g>

    <!-- 另一个蒙版示例 -->
    <g mask="url(#gradientMask)">
        <text x="200" y="250" text-anchor="middle" font-size="40"
              font-family="Arial" font-weight="bold" fill="#FF5722">
            渐隐文字
        </text>
    </g>
</svg>
```

## 五、SVG 常用场景示例

### 5.1 图标系统

```xml
<!-- 完整图标系统示例 -->
<svg width="0" height="0" style="position: absolute;">
    <defs>
        <!-- 主页图标 -->
        <symbol id="icon-home" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </symbol>

        <!-- 搜索图标 -->
        <symbol id="icon-search" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </symbol>

        <!-- 用户图标 -->
        <symbol id="icon-user" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </symbol>

        <!-- 设置图标 -->
        <symbol id="icon-settings" viewBox="0 0 24 24">
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
        </symbol>
    </defs>
</svg>

<!-- 使用图标 -->
<div class="icon-container">
    <svg class="icon" width="24" height="24">
        <use href="#icon-home"/>
    </svg>

    <svg class="icon" width="24" height="24">
        <use href="#icon-search"/>
    </svg>

    <svg class="icon" width="24" height="24">
        <use href="#icon-user"/>
    </svg>

    <svg class="icon" width="24" height="24">
        <use href="#icon-settings"/>
    </svg>
</div>

<style>
.icon-container {
    display: flex;
    gap: 20px;
    padding: 20px;
    background: #f5f5f5;
}

.icon {
    fill: #666;
    transition: fill 0.3s;
    cursor: pointer;
}

.icon:hover {
    fill: #2196F3;
}

.icon.active {
    fill: #FF5722;
}
</style>

<script>
// 图标交互
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', function() {
        // 移除所有图标的active类
        document.querySelectorAll('.icon').forEach(i => i.classList.remove('active'));

        // 为当前图标添加active类
        this.classList.add('active');

        console.log('图标被点击:', this.querySelector('use').getAttribute('href'));
    });
});
</script>
```

### 5.2 数据可视化图表

```xml
<!-- 交互式柱状图 -->
<svg width="600" height="400" id="bar-chart" class="chart">
    <!-- 定义渐变 -->
    <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#2196F3"/>
            <stop offset="100%" stop-color="#1976D2"/>
        </linearGradient>

        <linearGradient id="barGradientHover" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#64B5F6"/>
            <stop offset="100%" stop-color="#2196F3"/>
        </linearGradient>
    </defs>

    <!-- 标题 -->
    <text x="300" y="30" text-anchor="middle" font-size="20" font-weight="bold">
        2023年销售额（万元）
    </text>

    <!-- X轴 -->
    <line x1="50" y1="350" x2="550" y2="350" stroke="#333" stroke-width="2"/>

    <!-- Y轴 -->
    <line x1="50" y1="50" x2="50" y2="350" stroke="#333" stroke-width="2"/>

    <!-- Y轴刻度 -->
    <g id="y-axis">
        <!-- 刻度线和标签 -->
        <line x1="45" y1="350" x2="50" y2="350" stroke="#666"/>
        <text x="40" y="355" text-anchor="end" font-size="12">0</text>

        <line x1="45" y1="275" x2="50" y2="275" stroke="#666"/>
        <text x="40" y="280" text-anchor="end" font-size="12">50</text>

        <line x1="45" y1="200" x2="50" y2="200" stroke="#666"/>
        <text x="40" y="205" text-anchor="end" font-size="12">100</text>

        <line x1="45" y1="125" x2="50" y2="125" stroke="#666"/>
        <text x="40" y="130" text-anchor="end" font-size="12">150</text>

        <line x1="45" y1="50" x2="50" y2="50" stroke="#666"/>
        <text x="40" y="55" text-anchor="end" font-size="12">200</text>
    </g>

    <!-- 数据 -->
    <g id="bars">
        <!-- 数据会在JavaScript中动态生成 -->
    </g>

    <!-- X轴标签 -->
    <g id="x-labels">
        <!-- 标签会在JavaScript中动态生成 -->
    </g>

    <!-- 提示框 -->
    <rect id="tooltip-bg" x="0" y="0" width="120" height="60"
          fill="rgba(0, 0, 0, 0.8)" rx="5" ry="5" visibility="hidden"/>

    <text id="tooltip-title" x="10" y="25" fill="white" font-size="14" visibility="hidden">
        月份:
    </text>

    <text id="tooltip-value" x="10" y="45" fill="white" font-size="14" visibility="hidden">
        销售额:
    </text>
</svg>

<script>
// 数据
const salesData = [
    { month: '1月', value: 85 },
    { month: '2月', value: 120 },
    { month: '3月', value: 95 },
    { month: '4月', value: 150 },
    { month: '5月', value: 180 },
    { month: '6月', value: 140 },
    { month: '7月', value: 160 },
    { month: '8月', value: 190 },
    { month: '9月', value: 175 },
    { month: '10月', value: 210 },
    { month: '11月', value: 195 },
    { month: '12月', value: 230 }
];

// 图表配置
const config = {
    width: 600,
    height: 400,
    margin: { top: 60, right: 20, bottom: 50, left: 50 },
    barWidth: 30,
    barSpacing: 20
};

// 计算实际绘图区域
const plotWidth = config.width - config.margin.left - config.margin.right;
const plotHeight = config.height - config.margin.top - config.margin.bottom;

// 比例尺函数
const xScale = (index) => config.margin.left + index * (config.barWidth + config.barSpacing);
const yScale = (value) => config.margin.top + plotHeight - (value / 250) * plotHeight;

// 创建柱状图
const barsContainer = document.getElementById('bars');
const xLabelsContainer = document.getElementById('x-labels');

salesData.forEach((data, index) => {
    // 计算位置
    const x = xScale(index);
    const y = yScale(data.value);
    const height = (data.value / 250) * plotHeight;

    // 创建柱状
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', x);
    bar.setAttribute('y', y);
    bar.setAttribute('width', config.barWidth);
    bar.setAttribute('height', height);
    bar.setAttribute('fill', 'url(#barGradient)');
    bar.setAttribute('data-month', data.month);
    bar.setAttribute('data-value', data.value);
    bar.setAttribute('class', 'bar');

    // 添加交互效果
    bar.addEventListener('mouseenter', function() {
        this.setAttribute('fill', 'url(#barGradientHover)');
        this.style.filter = 'drop-shadow(0 0 8px rgba(33, 150, 243, 0.6))';
        showTooltip(this);
    });

    bar.addEventListener('mouseleave', function() {
        this.setAttribute('fill', 'url(#barGradient)');
        this.style.filter = '';
        hideTooltip();
    });

    barsContainer.appendChild(bar);

    // 创建X轴标签
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + config.barWidth / 2);
    label.setAttribute('y', config.height - 10);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('font-size', '12');
    label.textContent = data.month;

    xLabelsContainer.appendChild(label);
});

// 工具提示函数
const tooltipBg = document.getElementById('tooltip-bg');
const tooltipTitle = document.getElementById('tooltip-title');
const tooltipValue = document.getElementById('tooltip-value');

function showTooltip(bar) {
    const month = bar.getAttribute('data-month');
    const value = bar.getAttribute('data-value');

    // 更新提示内容
    tooltipTitle.textContent = `月份: ${month}`;
    tooltipValue.textContent = `销售额: ${value}万元`;

    // 计算位置
    const rect = bar.getBoundingClientRect();
    const svgRect = document.getElementById('bar-chart').getBoundingClientRect();

    const x = rect.left - svgRect.left + rect.width / 2 - 60;
    const y = rect.top - svgRect.top - 70;

    // 设置位置
    tooltipBg.setAttribute('x', x);
    tooltipBg.setAttribute('y', y);
    tooltipTitle.setAttribute('x', x + 10);
    tooltipTitle.setAttribute('y', y + 25);
    tooltipValue.setAttribute('x', x + 10);
    tooltipValue.setAttribute('y', y + 45);

    // 显示
    tooltipBg.setAttribute('visibility', 'visible');
    tooltipTitle.setAttribute('visibility', 'visible');
    tooltipValue.setAttribute('visibility', 'visible');
}

function hideTooltip() {
    tooltipBg.setAttribute('visibility', 'hidden');
    tooltipTitle.setAttribute('visibility', 'hidden');
    tooltipValue.setAttribute('visibility', 'hidden');
}
</script>

<style>
.chart {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
}

.bar {
    transition: all 0.3s;
    cursor: pointer;
}

.bar:hover {
    transform: translateY(-5px);
}
</style>
```

### 5.3 SVG 动画

```xml
<!-- 复杂SVG动画示例 -->
<svg width="600" height="400" id="animated-svg">
    <!-- 定义动画元素 -->
    <defs>
        <!-- 渐变背景 -->
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E3F2FD">
                <animate attributeName="stop-color"
                         values="#E3F2FD;#F3E5F5;#E8F5E8"
                         dur="10s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stop-color="#BBDEFB">
                <animate attributeName="stop-color"
                         values="#BBDEFB;#CE93D8;#C8E6C9"
                         dur="10s" repeatCount="indefinite"/>
            </stop>
        </linearGradient>

        <!-- 旋转的太阳 -->
        <g id="sun">
            <circle cx="0" cy="0" r="30" fill="#FFC107">
                <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite"/>
            </circle>

            <!-- 光芒 -->
            <g id="sun-rays">
                <!-- 12条光芒 -->
                <rect x="-2.5" y="-40" width="5" height="20" fill="#FF9800">
                    <animateTransform attributeName="transform" type="rotate"
                                      from="0" to="360" dur="20s" repeatCount="indefinite"/>
                </rect>
                <rect x="-2.5" y="-40" width="5" height="20" fill="#FF9800"
                      transform="rotate(30)">
                    <animateTransform attributeName="transform" type="rotate"
                                      from="30" to="390" dur="20s" repeatCount="indefinite"/>
                </rect>
                <rect x="-2.5" y="-40" width="5" height="20" fill="#FF9800"
                      transform="rotate(60)">
                    <animateTransform attributeName="transform" type="rotate"
                                      from="60" to="420" dur="20s" repeatCount="indefinite"/>
                </rect>
                <!-- 其他光芒... -->
            </g>
        </g>

        <!-- 云朵 -->
        <g id="cloud">
            <ellipse cx="0" cy="0" rx="30" ry="20" fill="white"/>
            <ellipse cx="20" cy="-10" rx="25" ry="18" fill="white"/>
            <ellipse cx="-20" cy="-10" rx="25" ry="18" fill="white"/>
            <ellipse cx="35" cy="5" rx="20" ry="15" fill="white"/>
            <ellipse cx="-35" cy="5" rx="20" ry="15" fill="white"/>
        </g>

        <!-- 小鸟 -->
        <g id="bird">
            <path d="M-20,0 Q0,-20 20,0 Q0,20 -20,0 Z" fill="#795548">
                <animate attributeName="d"
                         values="M-20,0 Q0,-20 20,0 Q0,20 -20,0 Z;
                                 M-20,5 Q0,-15 20,5 Q0,25 -20,5 Z"
                         dur="0.5s" repeatCount="indefinite"/>
            </path>
        </g>
    </defs>

    <!-- 背景 -->
    <rect x="0" y="0" width="600" height="400" fill="url(#bgGradient)"/>

    <!-- 山脉 -->
    <path d="M0,300 L100,200 L200,250 L300,180 L400,220 L500,190 L600,300 L600,400 L0,400 Z"
          fill="#78909C" opacity="0.8"/>

    <!-- 草地 -->
    <rect x="0" y="300" width="600" height="100" fill="#388E3C"/>

    <!-- 树木 -->
    <g class="tree" transform="translate(100, 280)">
        <rect x="-5" y="0" width="10" height="40" fill="#5D4037"/>
        <circle cx="0" cy="-10" r="30" fill="#4CAF50"/>
    </g>

    <g class="tree" transform="translate(400, 270)">
        <rect x="-7" y="0" width="14" height="50" fill="#5D4037"/>
        <ellipse cx="0" cy="-20" rx="35" ry="40" fill="#81C784"/>
    </g>

    <!-- 移动的云朵 -->
    <use href="#cloud" x="50" y="100" opacity="0.8">
        <animate attributeName="x" from="600" to="-100" dur="40s" repeatCount="indefinite"/>
    </use>

    <use href="#cloud" x="300" y="80" opacity="0.6">
        <animate attributeName="x" from="600" to="-100" dur="60s" repeatCount="indefinite"/>
    </use>

    <use href="#cloud" x="200" y="120" opacity="0.7">
        <animate attributeName="x" from="600" to="-100" dur="50s" repeatCount="indefinite"/>
    </use>

    <!-- 太阳 -->
    <g transform="translate(500, 100)">
        <use href="#sun">
            <animateTransform attributeName="transform" type="rotate"
                              from="0 500 100" to="360 500 100"
                              dur="40s" repeatCount="indefinite"/>
        </use>
    </g>

    <!-- 飞翔的小鸟 -->
    <use href="#bird" x="100" y="150">
        <animate attributeName="x" from="600" to="-100" dur="15s" repeatCount="indefinite"/>
        <animate attributeName="y" values="150;140;150" dur="2s" repeatCount="indefinite"/>
    </use>

    <use href="#bird" x="300" y="120">
        <animate attributeName="x" from="600" to="-100" dur="12s" repeatCount="indefinite"/>
        <animate attributeName="y" values="120;110;120" dur="1.8s" repeatCount="indefinite"/>
    </use>

    <!-- 房屋 -->
    <g class="house" transform="translate(200, 250)">
        <!-- 房子主体 -->
        <rect x="-40" y="-60" width="80" height="60" fill="#FF8A65"/>

        <!-- 屋顶 -->
        <polygon points="-50,-60 0,-100 50,-60" fill="#D84315"/>

        <!-- 门 -->
        <rect x="-10" y="-20" width="20" height="30" fill="#5D4037"/>

        <!-- 窗户 -->
        <rect x="20" y="-40" width="15" height="20" fill="#64B5F6"/>
        <rect x="22" y="-40" width="1" height="20" fill="#1976D2"/>
        <rect x="20" y="-30" width="15" height="1" fill="#1976D2"/>
    </g>

    <!-- 交互式按钮 -->
    <g id="control-button" transform="translate(300, 350)" cursor="pointer">
        <rect x="-50" y="-20" width="100" height="40" rx="10" fill="#2196F3"/>
        <text x="0" y="5" text-anchor="middle" fill="white" font-size="14">
            暂停动画
        </text>
    </g>

    <!-- 说明文字 -->
    <text x="300" y="380" text-anchor="middle" font-size="12" fill="#666">
        点击按钮控制动画
    </text>
</svg>

<script>
// 动画控制
const svg = document.getElementById('animated-svg');
const controlButton = document.getElementById('control-button');
let isAnimating = true;

// 获取所有动画元素
const animations = svg.querySelectorAll('animate, animateTransform, animateMotion');

controlButton.addEventListener('click', function() {
    if (isAnimating) {
        // 暂停所有动画
        animations.forEach(anim => {
            anim.beginElementAt(0); // 重置到开始
            try {
                anim.pauseAnimations && anim.pauseAnimations();
            } catch (e) {
                // 备用方法：移除动画，添加静态值
                const parent = anim.parentElement;
                const attributeName = anim.getAttribute('attributeName');
                const fromValue = anim.getAttribute('from') ||
                                 anim.getAttribute('values')?.split(';')[0];

                if (attributeName && fromValue) {
                    parent.setAttribute(attributeName, fromValue);
                }
            }
        });

        // 更新按钮文本
        this.querySelector('text').textContent = '播放动画';
        isAnimating = false;
    } else {
        // 播放所有动画
        animations.forEach(anim => {
            try {
                anim.unpauseAnimations && anim.unpauseAnimations();
            } catch (e) {
                // 备用方法：重新开始动画
                anim.beginElement();
            }
        });

        // 更新按钮文本
        this.querySelector('text').textContent = '暂停动画';
        isAnimating = true;
    }
});
</script>

<style>
#animated-svg {
    background: linear-gradient(to bottom, #87CEEB, #E0F7FA);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.tree {
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
}

.house {
    filter: drop-shadow(2px 2px 8px rgba(0,0,0,0.3));
}

#control-button:hover rect {
    fill: #1976D2;
    transform: scale(1.05);
    transition: all 0.3s;
}

#control-button:hover {
    filter: drop-shadow(0 2px 4px rgba(33, 150, 243, 0.4));
}
</style>
```

## 六、SVG 优化和最佳实践

### 6.1 性能优化

```javascript
// SVG优化工具和技术
const SVGOptimization = {
  // 1. 代码优化
  codeOptimization: {
    // 移除不必要的属性
    removeUnusedAttributes: true,

    // 合并路径
    mergePaths: true,

    // 移除注释
    removeComments: true,

    // 移除空白
    removeWhitespace: true,

    // 简化变换
    simplifyTransforms: true,

    // 移除隐藏元素
    removeHiddenElements: true,
  },

  // 2. 压缩工具
  compressionTools: [
    {
      name: "SVGO",
      description: "Node.js工具，可命令行或构建工具集成",
      usage: "svgo input.svg -o output.svg",
    },
    {
      name: "SVGOMG",
      description: "在线GUI工具",
      url: "https://jakearchibald.github.io/svgomg/",
    },
    {
      name: "ImageOptim",
      description: "桌面应用，支持多种格式",
      platform: "macOS",
    },
  ],

  // 3. 加载优化
  loadingOptimization: {
    // 懒加载
    lazyLoad: `
            <img src="placeholder.svg" data-src="actual.svg" class="lazy-svg">
            
            <script>
            // 懒加载实现
            const lazyImages = document.querySelectorAll('.lazy-svg');
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
            </script>
        `,

    // 内联关键SVG
    inlineCriticalSVG: `
            <!-- 关键SVG内联，非关键的异步加载 -->
            <style>
            .critical-icon {
                background-image: url('data:image/svg+xml;utf8,<svg>...</svg>');
            }
            </style>
        `,

    // SVG雪碧图
    spriteSheet: `
            <!-- 单个SVG文件包含所有图标 -->
            <svg style="display: none;">
                <defs>
                    <symbol id="icon-1">...</symbol>
                    <symbol id="icon-2">...</symbol>
                </defs>
            </svg>
            
            <!-- 使用时 -->
            <svg><use href="#icon-1"></use></svg>
        `,
  },

  // 4. 动画性能优化
  animationPerformance: {
    // 使用CSS动画替代SMIL
    cssVsSmil: `
            <!-- SMIL动画（较慢） -->
            <circle cx="50" cy="50" r="20">
                <animate attributeName="cx" from="50" to="200" dur="2s"/>
            </circle>
            
            <!-- CSS动画（性能更好） -->
            <circle class="animated-circle" cx="50" cy="50" r="20"/>
            
            <style>
            .animated-circle {
                animation: move 2s forwards;
            }
            @keyframes move {
                from { cx: 50; }
                to { cx: 200; }
            }
            </style>
        `,

    // 使用transform替代属性动画
    useTransforms: `
            <!-- 使用transform进行移动（GPU加速） -->
            <g class="move-group">
                <rect width="50" height="50"/>
            </g>
            
            <style>
            .move-group {
                transition: transform 0.3s;
            }
            .move-group:hover {
                transform: translateX(100px);
            }
            </style>
        `,

    // 减少重绘
    reduceRepaint: `
            <!-- 将多个动画元素放在一个组中 -->
            <g class="animated-group">
                <rect/><circle/><path/>
            </g>
            
            <!-- 对整个组应用动画 -->
            <style>
            .animated-group {
                animation: group-animation 2s infinite;
            }
            </style>
        `,
  },
};
```

### 6.2 可访问性

```xml
<!-- 可访问的SVG示例 -->
<svg role="img" aria-labelledby="chart-title chart-desc" width="400" height="300">
    <!-- 标题和描述（屏幕阅读器可读） -->
    <title id="chart-title">2023年季度销售数据</title>
    <desc id="chart-desc">
        本图表展示2023年四个季度的销售数据。
        第一季度：85万元，第二季度：120万元，
        第三季度：150万元，第四季度：180万元。
    </desc>

    <!-- 使用语义化标签 -->
    <g role="list" aria-label="季度数据">
        <!-- 第一季度 -->
        <g role="listitem" aria-label="第一季度，销售额85万元">
            <rect x="50" y="215" width="60" height="85" fill="#4CAF50"/>
            <text x="80" y="315" text-anchor="middle" font-size="12">Q1</text>
            <text x="80" y="200" text-anchor="middle" font-size="12">85</text>
        </g>

        <!-- 第二季度 -->
        <g role="listitem" aria-label="第二季度，销售额120万元">
            <rect x="130" y="180" width="60" height="120" fill="#2196F3"/>
            <text x="160" y="315" text-anchor="middle" font-size="12">Q2</text>
            <text x="160" y="165" text-anchor="middle" font-size="12">120</text>
        </g>

        <!-- 第三季度 -->
        <g role="listitem" aria-label="第三季度，销售额150万元">
            <rect x="210" y="150" width="60" height="150" fill="#FF9800"/>
            <text x="240" y="315" text-anchor="middle" font-size="12">Q3</text>
            <text x="240" y="135" text-anchor="middle" font-size="12">150</text>
        </g>

        <!-- 第四季度 -->
        <g role="listitem" aria-label="第四季度，销售额180万元">
            <rect x="290" y="120" width="60" height="180" fill="#F44336"/>
            <text x="320" y="315" text-anchor="middle" font-size="12">Q4</text>
            <text x="320" y="105" text-anchor="middle" font-size="12">180</text>
        </g>
    </g>

    <!-- 坐标轴标签 -->
    <text x="200" y="340" text-anchor="middle" font-size="14" font-weight="bold">
        季度
    </text>

    <text x="20" y="150" text-anchor="middle" font-size="14" font-weight="bold"
          transform="rotate(-90 20 150)">
        销售额（万元）
    </text>

    <!-- 为交互元素添加键盘支持 -->
    <g class="interactive-element" tabindex="0"
       role="button" aria-label="查看更多数据"
       style="cursor: pointer;">
        <rect x="150" y="250" width="100" height="40" rx="5"
              fill="#9C27B0" opacity="0"/>
        <text x="200" y="275" text-anchor="middle" fill="#9C27B0"
              font-size="14" font-weight="bold">
            查看详情
        </text>
    </g>
</svg>

<style>
/* 焦点样式 */
.interactive-element:focus {
    outline: 2px solid #2196F3;
    outline-offset: 2px;
}

.interactive-element:focus rect {
    opacity: 0.1;
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
    rect, circle, path {
        stroke-width: 2px;
        stroke: #000;
    }
}

/* 减少动画偏好 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>

<script>
// 键盘交互支持
document.querySelector('.interactive-element').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showDetails();
    }
});

function showDetails() {
    alert('显示详细数据...');
}
</script>
```

## 七、SVG 与其他技术的结合

### 7.1 与 CSS 结合

```html
<!-- SVG与CSS深度结合 -->
<style>
  /* CSS变量控制SVG */
  :root {
    --primary-color: #2196f3;
    --secondary-color: #4caf50;
    --accent-color: #ff9800;
    --size: 200px;
  }

  .svg-container {
    width: var(--size);
    height: var(--size);
    margin: 20px;
  }

  /* 使用CSS样式SVG元素 */
  .svg-icon {
    fill: var(--primary-color);
    stroke: var(--secondary-color);
    stroke-width: 2;
    transition: all 0.3s ease;
  }

  .svg-icon:hover {
    fill: var(--accent-color);
    transform: scale(1.1);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  /* 使用CSS动画 */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .rotating {
    animation: rotate 4s linear infinite;
    transform-origin: center center;
  }

  /* 使用CSS滤镜 */
  .filtered {
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3)) brightness(1.1) saturate(1.2);
  }

  /* 响应式SVG */
  @media (max-width: 768px) {
    .svg-container {
      --size: 150px;
    }

    .svg-icon {
      stroke-width: 1.5;
    }
  }

  /* 暗黑模式 */
  @media (prefers-color-scheme: dark) {
    .svg-icon {
      fill: #64b5f6;
      stroke: #81c784;
    }
  }

  /* 使用CSS自定义属性控制SVG */
  .customizable-svg {
    --circle-color: #ff5722;
    --square-color: #9c27b0;
    --triangle-color: #4caf50;
  }
</style>

<div class="svg-container">
  <svg viewBox="0 0 100 100" class="svg-icon rotating">
    <circle cx="50" cy="50" r="40" style="fill: var(--circle-color, #FF5722)" />
    <rect
      x="30"
      y="30"
      width="40"
      height="40"
      style="fill: var(--square-color, #9C27B0)"
    />
    <polygon
      points="50,20 70,60 30,60"
      style="fill: var(--triangle-color, #4CAF50)"
    />
  </svg>
</div>

<div class="svg-container">
  <svg viewBox="0 0 100 100" class="svg-icon filtered">
    <path d="M50,10 L90,90 L10,90 Z" style="fill: url(#gradient)" />
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color: var(--primary-color)" />
        <stop offset="100%" style="stop-color: var(--secondary-color)" />
      </linearGradient>
    </defs>
  </svg>
</div>

<!-- 动态修改CSS变量 -->
<script>
  const svg = document.querySelector(".svg-icon");
  const root = document.documentElement;

  // 动态改变颜色
  function changeColors() {
    const colors = ["#2196F3", "#4CAF50", "#FF9800", "#9C27B0", "#FF5722"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    root.style.setProperty("--primary-color", randomColor);
  }

  // 动态改变大小
  function changeSize(newSize) {
    root.style.setProperty("--size", `${newSize}px`);
  }

  // 示例：每3秒改变一次颜色
  setInterval(changeColors, 3000);

  // 响应鼠标滚轮改变大小
  document.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const currentSize = parseInt(
        getComputedStyle(root).getPropertyValue("--size")
      );
      const newSize = e.deltaY > 0 ? currentSize - 10 : currentSize + 10;
      changeSize(Math.max(100, Math.min(300, newSize)));
    },
    { passive: false }
  );
</script>
```

### 7.2 与 JavaScript 结合

```html
<!-- 动态生成和操作SVG -->
<div id="svg-controls">
  <button onclick="addShape()">添加形状</button>
  <button onclick="changeColors()">随机颜色</button>
  <button onclick="animateShapes()">动画</button>
  <button onclick="clearShapes()">清空</button>

  <label>
    形状类型:
    <select id="shape-type">
      <option value="circle">圆形</option>
      <option value="rect">矩形</option>
      <option value="triangle">三角形</option>
      <option value="star">星星</option>
    </select>
  </label>

  <label>
    数量:
    <input type="range" id="shape-count" min="1" max="50" value="10" />
    <span id="count-display">10</span>
  </label>
</div>

<svg
  id="dynamic-svg"
  width="800"
  height="400"
  style="border: 1px solid #ddd; background: #f9f9f9;"
></svg>

<script>
  class DynamicSVG {
    constructor(containerId) {
      this.svg = document.getElementById(containerId);
      this.shapes = [];
      this.nextId = 0;

      // 初始化SVG命名空间
      this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      this.svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

      this.setupEventListeners();
    }

    setupEventListeners() {
      // 点击画布添加形状
      this.svg.addEventListener("click", (e) => {
        const rect = this.svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.addShapeAt(x, y);
      });

      // 滑块事件
      const shapeCount = document.getElementById("shape-count");
      const countDisplay = document.getElementById("count-display");

      shapeCount.addEventListener("input", (e) => {
        countDisplay.textContent = e.target.value;
      });

      shapeCount.addEventListener("change", (e) => {
        this.generateShapes(parseInt(e.target.value));
      });
    }

    // 创建各种形状的方法
    createCircle(x, y) {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", this.random(15, 40));
      circle.setAttribute("fill", this.randomColor());
      circle.setAttribute("class", "shape");
      circle.setAttribute("data-id", this.nextId++);

      // 交互效果
      circle.addEventListener("mouseenter", this.handleMouseEnter);
      circle.addEventListener("mouseleave", this.handleMouseLeave);
      circle.addEventListener("click", this.handleShapeClick);

      return circle;
    }

    createRect(x, y) {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      const size = this.random(20, 60);

      rect.setAttribute("x", x - size / 2);
      rect.setAttribute("y", y - size / 2);
      rect.setAttribute("width", size);
      rect.setAttribute("height", size);
      rect.setAttribute("rx", this.random(0, 10));
      rect.setAttribute("fill", this.randomColor());
      rect.setAttribute("class", "shape");
      rect.setAttribute("data-id", this.nextId++);

      rect.addEventListener("mouseenter", this.handleMouseEnter);
      rect.addEventListener("mouseleave", this.handleMouseLeave);
      rect.addEventListener("click", this.handleShapeClick);

      return rect;
    }

    createTriangle(x, y) {
      const size = this.random(20, 50);
      const points = [
        `${x},${y - size / 2}`,
        `${x + size / 2},${y + size / 2}`,
        `${x - size / 2},${y + size / 2}`,
      ].join(" ");

      const polygon = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );
      polygon.setAttribute("points", points);
      polygon.setAttribute("fill", this.randomColor());
      polygon.setAttribute("class", "shape");
      polygon.setAttribute("data-id", this.nextId++);

      polygon.addEventListener("mouseenter", this.handleMouseEnter);
      polygon.addEventListener("mouseleave", this.handleMouseLeave);
      polygon.addEventListener("click", this.handleShapeClick);

      return polygon;
    }

    createStar(x, y) {
      const star = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const size = this.random(15, 35);

      // 生成五角星路径
      let points = "";
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? size : size / 2;
        const angle = (Math.PI * i) / 5;

        const px = x + radius * Math.sin(angle);
        const py = y - radius * Math.cos(angle);

        points += (i === 0 ? "M" : "L") + px + "," + py;
      }
      points += "Z";

      star.setAttribute("d", points);
      star.setAttribute("fill", this.randomColor());
      star.setAttribute("class", "shape");
      star.setAttribute("data-id", this.nextId++);

      star.addEventListener("mouseenter", this.handleMouseEnter);
      star.addEventListener("mouseleave", this.handleMouseLeave);
      star.addEventListener("click", this.handleShapeClick);

      return star;
    }

    // 事件处理器
    handleMouseEnter = (e) => {
      const shape = e.target;
      shape.style.filter = "drop-shadow(0 0 8px rgba(0,0,0,0.3))";
      shape.style.transform = "scale(1.1)";
      shape.style.transition = "all 0.3s";

      // 显示形状信息
      this.showTooltip(shape);
    };

    handleMouseLeave = (e) => {
      const shape = e.target;
      shape.style.filter = "";
      shape.style.transform = "";

      this.hideTooltip();
    };

    handleShapeClick = (e) => {
      e.stopPropagation(); // 阻止冒泡到SVG画布

      const shape = e.target;
      const id = shape.getAttribute("data-id");

      // 移除形状
      shape.remove();

      // 从数组中删除
      this.shapes = this.shapes.filter((s) => s.getAttribute("data-id") !== id);

      console.log(`移除了形状 ${id}, 剩余 ${this.shapes.length} 个`);
    };

    // 工具方法
    addShapeAt(x, y) {
      const type = document.getElementById("shape-type").value;
      let shape;

      switch (type) {
        case "circle":
          shape = this.createCircle(x, y);
          break;
        case "rect":
          shape = this.createRect(x, y);
          break;
        case "triangle":
          shape = this.createTriangle(x, y);
          break;
        case "star":
          shape = this.createStar(x, y);
          break;
      }

      this.svg.appendChild(shape);
      this.shapes.push(shape);
    }

    generateShapes(count) {
      // 清除现有形状
      this.clearShapes();

      // 生成新形状
      for (let i = 0; i < count; i++) {
        const x = this.random(50, 750);
        const y = this.random(50, 350);
        this.addShapeAt(x, y);
      }
    }

    changeColors() {
      this.shapes.forEach((shape) => {
        shape.setAttribute("fill", this.randomColor());
      });
    }

    animateShapes() {
      this.shapes.forEach((shape) => {
        const x = parseFloat(
          shape.getAttribute("cx") ||
            shape.getAttribute("x") ||
            this.extractCenterX(shape)
        );
        const y = parseFloat(
          shape.getAttribute("cy") ||
            shape.getAttribute("y") ||
            this.extractCenterY(shape)
        );

        // 创建动画
        const animateX = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "animateTransform"
        );
        animateX.setAttribute("attributeName", "transform");
        animateX.setAttribute("type", "translate");
        animateX.setAttribute("from", `0 0`);
        animateX.setAttribute(
          "to",
          `${this.random(-50, 50)} ${this.random(-50, 50)}`
        );
        animateX.setAttribute("dur", `${this.random(1, 3)}s`);
        animateX.setAttribute("repeatCount", "indefinite");
        animateX.setAttribute("calcMode", "spline");
        animateX.setAttribute("keySplines", "0.42 0 0.58 1");

        shape.appendChild(animateX);
        animateX.beginElement();
      });
    }

    clearShapes() {
      this.shapes.forEach((shape) => shape.remove());
      this.shapes = [];
      this.nextId = 0;
    }

    // 辅助方法
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomColor() {
      const colors = [
        "#FF5252",
        "#FF4081",
        "#E040FB",
        "#7C4DFF",
        "#536DFE",
        "#448AFF",
        "#40C4FF",
        "#18FFFF",
        "#64FFDA",
        "#69F0AE",
        "#B2FF59",
        "#EEFF41",
        "#FFFF00",
        "#FFD740",
        "#FFAB40",
        "#FF6E40",
      ];
      return colors[this.random(0, colors.length - 1)];
    }

    extractCenterX(shape) {
      // 从不同形状中提取中心X坐标
      if (shape.tagName === "polygon") {
        const points = shape.getAttribute("points").split(" ");
        const xValues = points.map((p) => parseFloat(p.split(",")[0]));
        return xValues.reduce((a, b) => a + b) / xValues.length;
      }
      if (shape.tagName === "path") {
        // 简化处理：返回SVG中心
        return 400;
      }
      return 0;
    }

    extractCenterY(shape) {
      // 从不同形状中提取中心Y坐标
      if (shape.tagName === "polygon") {
        const points = shape.getAttribute("points").split(" ");
        const yValues = points.map((p) => parseFloat(p.split(",")[1]));
        return yValues.reduce((a, b) => a + b) / yValues.length;
      }
      if (shape.tagName === "path") {
        // 简化处理：返回SVG中心
        return 200;
      }
      return 0;
    }

    showTooltip(shape) {
      // 实现工具提示显示
      console.log("显示形状信息:", shape.getAttribute("data-id"));
    }

    hideTooltip() {
      // 隐藏工具提示
      console.log("隐藏工具提示");
    }
  }

  // 初始化
  const svgManager = new DynamicSVG("dynamic-svg");
  svgManager.generateShapes(10);

  // 导出全局函数供按钮使用
  window.addShape = () => {
    const x = svgManager.random(100, 700);
    const y = svgManager.random(100, 300);
    svgManager.addShapeAt(x, y);
  };

  window.changeColors = () => svgManager.changeColors();
  window.animateShapes = () => svgManager.animateShapes();
  window.clearShapes = () => svgManager.clearShapes();
</script>

<style>
  #svg-controls {
    margin: 20px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    align-items: center;
  }

  #svg-controls button {
    padding: 8px 16px;
    background: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
  }

  #svg-controls button:hover {
    background: #1976d2;
  }

  #svg-controls label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  #svg-controls select,
  #svg-controls input[type="range"] {
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .shape {
    cursor: pointer;
    transition: transform 0.3s;
  }

  #dynamic-svg {
    margin: 20px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
</style>
```

## 八、相关内容

### 8.1 SVG 格式的变体和扩展

```javascript
// SVG相关技术和格式
const SVGExtensions = {
  // 1. SVGZ - 压缩的SVG
  svgz: {
    description: "Gzip压缩的SVG文件",
    extension: ".svgz",
    compression: "通常能减少50-80%的文件大小",
    usage: "用于需要减小文件大小的场景",
    limitation: "某些服务器需要正确配置MIME类型",
  },

  // 2. SVG 2.0 新特性
  svg2: {
    features: {
      geometryProperties: "可以直接使用CSS设置cx, cy, r等属性",
      textPath: "增强的文本路径功能",
      blending: "更好的混合模式支持",
      filters: "新增滤镜效果",
      conicGradient: "锥形渐变支持",
    },
    status: "仍在发展中，部分特性已实现",
  },

  // 3. 矢量图标的替代格式
  alternatives: {
    iconFont: {
      description: "字体图标（如Font Awesome）",
      pros: "易用，颜色可CSS控制，良好的浏览器支持",
      cons: "单色限制，图标集固定，可能有渲染问题",
    },

    webP: {
      description: "谷歌开发的现代图像格式",
      pros: "优秀的压缩率，支持透明度和动画",
      cons: "仍然是位图，放大失真",
    },

    canvas: {
      description: "HTML5 Canvas元素",
      pros: "高性能，适合复杂动画和游戏",
      cons: "非矢量，基于像素，缩放失真",
    },

    webGL: {
      description: "基于OpenGL的3D图形API",
      pros: "强大的3D渲染能力",
      cons: "学习曲线陡峭，移动端性能问题",
    },
  },

  // 4. SVG编辑器输出优化
  editorOptimization: {
    illustrator: {
      issue: "输出冗余代码",
      solution: '导出时选择"精简SVG"选项，使用SVGO后处理',
    },

    inkscape: {
      issue: "默认包含大量元数据",
      solution: "另存为优化SVG，清理元数据",
    },

    sketch: {
      issue: "图层命名转为ID",
      solution: "导出前简化图层名，或使用插件优化",
    },
  },

  // 5. 浏览器支持和兼容性
  browserSupport: {
    basicSVG: {
      support: "所有现代浏览器都支持基本SVG",
      issues: "IE9+支持，但某些高级特性可能有问题",
    },

    svgFilters: {
      support: "大部分现代浏览器支持",
      issues: "IE不支持，移动端可能性能较差",
    },

    svgAnimation: {
      smil: "逐步被废弃，建议使用CSS/JS动画",
      cssAnimations: "广泛支持，性能更好",
      webAnimationsAPI: "现代标准，但支持度在增长中",
    },
  },
};
```

### 8.2 实际应用中的注意事项

```javascript
// SVG实际应用注意事项
const SVGBestPractices = {
  // 1. 文件大小优化
  fileSizeOptimization: {
    techniques: [
      "使用SVGO等工具压缩",
      "移除元数据、注释、空组",
      "合并相同样式的元素",
      "简化路径（减少节点）",
      "使用base64编码内联小图标",
      "对于复杂图形，考虑使用位图",
    ],

    sizeGuidelines: {
      图标: "< 2KB",
      简单插图: "< 10KB",
      中等复杂图形: "< 50KB",
      复杂图表: "< 200KB",
      地图: "可能更大，考虑分块加载",
    },
  },

  // 2. 性能考虑
  performance: {
    rendering: {
      issue: "复杂SVG可能渲染缓慢",
      solution: "减少路径复杂度，使用CSS变换替代属性动画",
    },

    memory: {
      issue: "大量SVG元素可能占用大量内存",
      solution: "使用<use>元素复用图形，虚拟滚动长列表",
    },

    animation: {
      issue: "过多动画可能导致卡顿",
      solution: "使用requestAnimationFrame，避免同时动画太多元素",
    },
  },

  // 3. 安全考虑
  security: {
    xss: {
      risk: "SVG可以包含JavaScript",
      prevention: "清理用户上传的SVG，使用Content Security Policy",
    },

    externalResources: {
      risk: "SVG可以引用外部资源",
      prevention: "内联必要资源，或使用同源策略",
    },
  },

  // 4. 可维护性
  maintainability: {
    organization: {
      tip: "使用有意义的ID和类名",
      example: "给重要元素添加data-*属性",
    },

    modularity: {
      tip: "将复杂SVG拆分为多个文件",
      example: "使用<use>引用外部符号",
    },

    documentation: {
      tip: "为复杂路径添加注释",
      example: "<!-- 这条路径绘制公司Logo的核心部分 -->",
    },
  },

  // 5. 跨浏览器测试
  crossBrowserTesting: {
    commonIssues: {
      ie: "不支持某些现代特性，需要降级",
      safari: "某些滤镜效果可能表现不同",
      mobile: "触摸事件处理可能需要特殊处理",
      highDpi: "确保在高分辨率设备上清晰",
    },

    testingTools: ["BrowserStack", "Sauce Labs", "本地虚拟机", "真实设备测试"],
  },

  // 6. 打印考虑
  printOptimization: {
    issues: {
      color: "打印时颜色可能变化",
      size: "打印尺寸可能与屏幕不同",
      resolution: "矢量图打印质量通常很好",
    },

    solutions: [
      "使用print CSS媒体查询",
      "提供高对比度的打印版本",
      "测试实际打印输出",
    ],
  },
};
```

### 8.3 学习资源和工具

```javascript
// SVG学习资源和工具
const SVGResources = {
  // 1. 学习网站和文档
  learning: {
    mdn: {
      name: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/SVG",
      description: "最权威的SVG文档",
    },

    w3c: {
      name: "W3C SVG Specification",
      url: "https://www.w3.org/TR/SVG2/",
      description: "SVG 2.0官方规范",
    },

    cssTricks: {
      name: "CSS-Tricks SVG Guide",
      url: "https://css-tricks.com/mega-list-svg-information/",
      description: "SVG实用指南和技巧",
    },

    svgTutorials: {
      name: "SVG Tutorials",
      url: "https://www.sarasoueidan.com/blog/tags/svg/",
      description: "高质量SVG教程",
    },
  },

  // 2. 在线工具
  onlineTools: {
    editors: [
      {
        name: "SVG-Edit",
        url: "https://svgedit.netlify.app/",
        features: "在线SVG编辑器",
      },
      {
        name: "Boxy SVG",
        url: "https://boxy-svg.com/",
        features: "功能丰富的网页版编辑器",
      },
    ],

    optimizers: [
      {
        name: "SVGOMG",
        url: "https://jakearchibald.github.io/svgomg/",
        features: "在线SVG优化器",
      },
      {
        name: "SVG Optimizer",
        url: "https://www.svgoptimizer.com/",
        features: "批量优化",
      },
    ],

    generators: [
      {
        name: "Get Waves",
        url: "https://getwaves.io/",
        features: "波形SVG生成器",
      },
      {
        name: "Blobmaker",
        url: "https://www.blobmaker.app/",
        features: "有机形状生成器",
      },
      {
        name: "Hero Patterns",
        url: "https://heropatterns.com/",
        features: "SVG背景图案",
      },
    ],
  },

  // 3. 库和框架
  libraries: {
    animation: [
      {
        name: "GSAP",
        url: "https://greensock.com/gsap/",
        description: "专业的JavaScript动画库，优秀的SVG支持",
      },
      {
        name: "anime.js",
        url: "https://animejs.com/",
        description: "轻量级动画库",
      },
      {
        name: "vivus",
        url: "https://maxwellito.github.io/vivus/",
        description: "SVG路径动画库",
      },
    ],

    manipulation: [
      {
        name: "SVG.js",
        url: "https://svgjs.com/",
        description: "轻量级SVG操作库",
      },
      {
        name: "Snap.svg",
        url: "http://snapsvg.io/",
        description: "Adobe开发的SVG库",
      },
    ],

    dataVisualization: [
      {
        name: "D3.js",
        url: "https://d3js.org/",
        description: "数据驱动的文档操作，强大的可视化库",
      },
      {
        name: "Chart.js",
        url: "https://www.chartjs.org/",
        description: "简单的图表库，支持SVG导出",
      },
      {
        name: "Apache ECharts",
        url: "https://echarts.apache.org/",
        description: "企业级图表库",
      },
    ],
  },

  // 4. 浏览器开发者工具
  devTools: {
    chrome: {
      features: ["SVG DOM检查", "SVG属性编辑", "路径编辑器", "动画调试"],
      shortcut: "F12 → Elements面板",
    },

    firefox: {
      features: ["SVG查看器", "动画检查器", "响应式设计模式"],
      shortcut: "F12 → Inspector",
    },
  },

  // 5. 书籍和课程
  education: {
    books: [
      "《SVG精髓》- J. David Eisenberg, Amelia Bellamy-Royds",
      "《SVG动画》- Sarah Drasner",
      "《使用SVG实现Web动画》- Val Head",
    ],

    courses: [
      "Udemy: SVG动画与交互",
      "Frontend Masters: SVG Essentials",
      "Pluralsight: 使用SVG创建图形",
    ],
  },
};
```

## 九、总结

### 9.1 核心要点回顾

1. **SVG 是什么**：基于 XML 的矢量图形格式，可无限缩放不失真
2. **核心优势**：体积小、可编辑、支持交互和动画、SEO 友好
3. **基本语法**：使用 XML 标签描述图形，核心元素包括路径、形状、文本等
4. **应用场景**：图标、图表、地图、Logo、UI 元素、数据可视化
5. **现代使用**：与 CSS 和 JavaScript 深度集成，支持响应式和交互式设计

### 9.2 何时使用 SVG

| 场景            | 推荐使用    | 理由                   |
| --------------- | ----------- | ---------------------- |
| **图标和 Logo** | ✅ 强烈推荐 | 缩放不失真，文件小     |
| **简单插图**    | ✅ 推荐     | 易编辑，样式可控制     |
| **数据图表**    | ✅ 推荐     | 交互性强，动态更新     |
| **UI 元素**     | ✅ 推荐     | 支持状态变化和动画     |
| **复杂照片**    | ❌ 不推荐   | 位图更合适             |
| **大型地图**    | ⚠️ 谨慎     | 可能性能问题，考虑分块 |

### 9.3 最佳实践总结

1. **优化性能**：压缩 SVG 文件，减少 DOM 节点数
2. **保持可访问**：添加 title、desc，支持键盘导航
3. **响应式设计**：使用 viewBox 和 CSS 媒体查询
4. **渐进增强**：为不支持 SVG 的浏览器提供备选方案
5. **安全第一**：清理用户提供的 SVG 内容
6. **持续学习**：SVG 技术不断发展，关注新特性

### 9.4 未来趋势

1. **SVG 2.0**：带来更多现代特性
2. **Houdini**：CSS Houdini 将增强 SVG 样式能力
3. **Web 组件**：SVG 作为 Web 组件的一部分
4. **AR/VR**：SVG 在增强现实中的应用探索

**记住**：SVG 不仅仅是一种图像格式，它是一个强大的 Web 开发工具。掌握 SVG 能让你创建更灵活、更高效、更交互的 Web 体验。
