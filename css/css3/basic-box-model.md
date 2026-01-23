# CSS 盒模型

## 盒模型基础

### 标准盒模型

CSS 盒模型描述了文档树中的元素如何生成矩形盒子，并根据视觉格式化模型进行布局。

```css
/* 标准盒模型（content-box） */
.box {
  width: 200px; /* 内容宽度 */
  height: 100px; /* 内容高度 */
  padding: 20px; /* 内边距 */
  border: 5px solid #333; /* 边框 */
  margin: 10px; /* 外边距 */
  background-color: #f0f0f0;
}
```

**标准盒模型计算公式**：

```
总宽度 = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right
总高度 = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

### 替代（IE）盒模型

```css
/* 替代盒模型（border-box） */
.box-alternative {
  box-sizing: border-box; /* 切换为border-box模型 */
  width: 200px; /* 总宽度（包含内边距和边框） */
  height: 100px; /* 总高度（包含内边距和边框） */
  padding: 20px;
  border: 5px solid #333;
  margin: 10px;
}
```

**替代盒模型计算公式**：

```
总宽度 = width + margin-left + margin-right
总高度 = height + margin-top + margin-bottom

其中 width 已经包含 padding 和 border
```

### 盒模型属性详解

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 可视化盒模型示例 */
      .box-model-demo {
        width: 300px;
        height: 200px;
        padding: 30px;
        border: 10px solid #3498db;
        margin: 20px;
        background-color: #ecf0f1;
        position: relative;
      }

      .box-model-demo::before {
        content: "margin";
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        border: 2px dashed #e74c3c;
        height: 40px;
        text-align: center;
        color: #e74c3c;
      }

      .box-model-demo::after {
        content: "border";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border: 2px dashed #2ecc71;
        pointer-events: none;
      }

      .content {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border: 2px solid #f39c12;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }

      .content::before {
        content: "padding";
        position: absolute;
        top: -30px;
        left: -30px;
        right: -30px;
        bottom: -30px;
        border: 2px dashed #9b59b6;
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <div class="box-model-demo">
      <div class="content">内容区域</div>
    </div>
  </body>
</html>
```

## width 和 height

### 宽度属性

#### 固定宽度

```css
/* 像素单位 - 绝对单位 */
.element {
  width: 300px; /* 固定300像素 */
  min-width: 200px; /* 最小宽度 */
  max-width: 500px; /* 最大宽度 */
}

/* 视口单位 - 相对单位 */
.responsive-element {
  width: 50vw; /* 视口宽度的50% */
  min-width: 300px;
  max-width: 1000px;
}
```

#### 相对宽度

```css
.container {
  width: 80%; /* 父元素宽度的80% */
}

/* 使用计算值 */
.calculated-width {
  width: calc(100% - 40px); /* 100%宽度减去40像素 */
  width: calc(50vw + 200px); /* 视口宽度的一半加200像素 */
}

/* 基于内容自适应 */
.auto-width {
  width: auto; /* 默认值，基于内容自动计算 */
  width: fit-content; /* 宽度匹配内容 */
  width: max-content; /* 最大内容宽度 */
  width: min-content; /* 最小内容宽度 */
}
```

#### 特殊宽度值

```css
.element {
  width: inherit; /* 继承父元素的宽度 */
  width: initial; /* 重置为初始值（auto） */
  width: unset; /* 根据上下文决定继承或初始 */
  width: revert; /* 回滚到浏览器默认或继承值 */
  width: revert-layer; /* 回滚到CSS层中的前一个值 */
}
```

### 高度属性

#### 基本高度设置

```css
/* 固定高度 */
.fixed-height {
  height: 150px; /* 固定高度 */
  min-height: 100px; /* 最小高度 */
  max-height: 200px; /* 最大高度 */
}

/* 相对高度 */
.relative-height {
  height: 50vh; /* 视口高度的50% */
  height: 80%; /* 父元素高度的80% */
}

/* 内容自适应 */
.auto-height {
  height: auto; /* 基于内容自动调整 */
  height: fit-content; /* 高度匹配内容 */
}
```

#### 高度使用注意事项

```css
/* 百分比高度问题 */
.parent {
  height: 400px; /* 父元素必须有明确高度 */
}

.child {
  height: 50%; /* 这将是200px，因为父元素高400px */
}

/* 视口高度单位 */
.full-viewport {
  height: 100vh; /* 整个视口高度 */
}

/* 最小高度确保内容显示 */
.content-container {
  min-height: 100vh; /* 至少占满整个视口 */
}

/* 基于内容滚动 */
.scrollable-content {
  height: 300px;
  overflow-y: auto; /* 内容超过高度时显示滚动条 */
}
```

### 最小和最大尺寸

#### 宽度限制

```css
.responsive-container {
  /* 响应式宽度控制 */
  width: 90%;
  min-width: 320px; /* 移动设备最小宽度 */
  max-width: 1200px; /* 最大桌面宽度 */
  margin: 0 auto; /* 居中 */
}

/* 图片响应式处理 */
.responsive-img {
  max-width: 100%; /* 不超过容器宽度 */
  height: auto; /* 保持宽高比 */
}

/* 表格单元格限制 */
.table-cell {
  min-width: 100px; /* 确保内容可读 */
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

#### 高度限制

```css
.modal {
  /* 弹窗高度控制 */
  height: 80vh;
  min-height: 300px;
  max-height: 600px;
}

/* 可折叠内容区域 */
.collapsible {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.collapsible.open {
  max-height: 500px; /* 足够容纳内容 */
}

/* 文本区域自适应 */
.text-container {
  max-height: 200px;
  overflow-y: auto;
  line-height: 1.5;
}
```

#### 使用 clamp() 函数

```css
.fluid-typography {
  /* 在最小值和最大值之间动态变化 */
  font-size: clamp(16px, 2vw, 24px);
}

.fluid-width {
  /* 响应式宽度控制 */
  width: clamp(300px, 50%, 800px);
}

.fluid-spacing {
  /* 动态间距 */
  padding: clamp(10px, 5%, 40px);
}
```

## margin 外边距

### 基本用法

#### 简写语法

```css
/* 单个值 - 所有方向相同 */
.element {
  margin: 20px; /* 上右下左都是20px */
}

/* 两个值 - 上下 / 左右 */
.element {
  margin: 10px 20px; /* 上下10px，左右20px */
}

/* 三个值 - 上 / 左右 / 下 */
.element {
  margin: 10px 20px 30px; /* 上10px，左右20px，下30px */
}

/* 四个值 - 上 / 右 / 下 / 左（顺时针） */
.element {
  margin: 10px 20px 30px 40px; /* 上10px，右20px，下30px，左40px */
}
```

#### 方向具体设置

```css
.element {
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 30px;
  margin-left: 40px;
}

/* 使用逻辑属性（支持RTL和垂直书写模式） */
.element-rtl {
  margin-block-start: 10px; /* 相当于margin-top */
  margin-block-end: 20px; /* 相当于margin-bottom */
  margin-inline-start: 30px; /* 相当于margin-left（LTR）或margin-right（RTL） */
  margin-inline-end: 40px; /* 相当于margin-right（LTR）或margin-left（RTL） */
}
```

### 外边距折叠

#### 垂直折叠

```css
/* 相邻兄弟元素的外边距会折叠 */
.sibling-a {
  margin-bottom: 30px;
  background: #3498db;
}

.sibling-b {
  margin-top: 20px; /* 实际间距是30px（取较大值），不是50px */
  background: #2ecc71;
}

/* 阻止折叠的方法 */
.no-collapse {
  margin-bottom: 30px;
  padding: 1px 0; /* 添加padding阻止折叠 */
  /* 或者使用border: 1px solid transparent; */
}

.no-collapse + .no-collapse {
  margin-top: 20px; /* 现在不会折叠 */
}
```

#### 父子折叠

```css
.parent {
  margin-top: 20px;
  background: #f1c40f;
}

.child {
  margin-top: 30px; /* 会与父元素的margin-top折叠 */
  background: #e74c3c;
}

/* 阻止父子折叠 */
.parent-no-collapse {
  margin-top: 20px;
  padding-top: 1px; /* 添加padding */
  /* 或者使用overflow: auto/hidden; */
  /* 或者使用border-top: 1px solid transparent; */
}
```

#### 空元素折叠

```css
.empty-element {
  margin-top: 20px;
  margin-bottom: 30px;
  /* 如果没有内容、padding、border，上下外边距会折叠 */
  height: 0;
}

/* 空块级元素的外边距会完全折叠 */
```

### 负外边距

#### 基本使用

```css
/* 负外边距可以元素重叠或超出容器 */
.overlap-example {
  width: 200px;
  height: 100px;
  background: #3498db;
}

.overlap-example + .overlap-example {
  margin-top: -50px; /* 与上一个元素重叠50px */
  background: #e74c3c;
  opacity: 0.7;
}
```

#### 布局技巧

```css
/* 居中技巧 */
.centered {
  width: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px; /* 宽度的一半 */
}

/* 现代替代方案 */
.modern-centered {
  width: 400px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 使用transform */
}

/* 多列布局 */
.column-layout {
  width: 25%;
  float: left;
  margin-right: -1px; /* 消除边框重叠 */
  border: 1px solid #ccc;
  box-sizing: border-box;
}
```

#### 响应式负外边距

```css
.container {
  width: 100%;
  padding: 0 15px;
}

.row {
  margin-left: -15px; /* 抵消容器padding */
  margin-right: -15px;
}

.col {
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  width: 33.333%;
}
```

### auto 值

#### 水平居中

```css
/* 块级元素水平居中 */
.center-block {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

/* 多个块级元素居中 */
.multiple-blocks {
  display: flex;
  justify-content: center; /* Flexbox方式 */
}

.multiple-blocks-alt {
  text-align: center; /* 内联/内联块元素 */
}

.multiple-blocks-alt > * {
  display: inline-block;
  text-align: left; /* 重置内部文本对齐 */
}
```

#### 剩余空间分配

```css
.flex-container {
  display: flex;
}

.flex-item {
  margin-right: auto; /* 将所有剩余空间放在右侧 */
}

/* 左右分开 */
.split-space {
  margin-left: auto; /* 左边自动 */
  margin-right: 20px; /* 右边固定 */
}
```

#### 垂直方向 auto

```css
/* 注意：margin-top: auto 和 margin-bottom: auto 在普通流中无效 */
/* 但在Flexbox和Grid中有效 */

.flex-vertical {
  display: flex;
  flex-direction: column;
  height: 300px;
}

.flex-vertical .spacer {
  margin-top: auto; /* 将元素推到容器底部 */
}

.grid-vertical {
  display: grid;
  height: 300px;
  align-items: start;
}

.grid-vertical .spacer {
  margin-top: auto; /* 在Grid中也可用 */
}
```

## padding 内边距

### 基本用法

#### 简写语法

```css
/* 单个值 - 所有方向相同 */
.element {
  padding: 20px; /* 上右下左都是20px */
}

/* 两个值 - 上下 / 左右 */
.element {
  padding: 10px 20px; /* 上下10px，左右20px */
}

/* 三个值 - 上 / 左右 / 下 */
.element {
  padding: 10px 20px 30px; /* 上10px，左右20px，下30px */
}

/* 四个值 - 上 / 右 / 下 / 左（顺时针） */
.element {
  padding: 10px 20px 30px 40px; /* 上10px，右20px，下30px，左40px */
}
```

#### 方向具体设置

```css
.element {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
}

/* 使用逻辑属性 */
.element-rtl {
  padding-block-start: 10px;
  padding-block-end: 20px;
  padding-inline-start: 30px;
  padding-inline-end: 40px;
}
```

#### 百分比 padding

```css
/* 百分比基于父元素的宽度（包括高度方向也是如此） */
.percentage-padding {
  padding: 5%; /* 父元素宽度的5% */
  width: 50%; /* 父元素宽度的50% */
}

/* 用于保持宽高比 */
.aspect-ratio-box {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 宽高比 (9/16 = 0.5625) */
  position: relative;
  background: #3498db;
}

.aspect-ratio-box .content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### 内边距 vs 外边距

#### 使用场景对比

```css
/* 使用内边距的场景 */
.button {
  padding: 12px 24px; /* 增加点击区域，保持背景色 */
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

/* 使用外边距的场景 */
.card + .card {
  margin-top: 20px; /* 卡片之间的间距 */
}

/* 混合使用 */
.component {
  padding: 20px; /* 内部内容与边框的距离 */
  margin-bottom: 30px; /* 与下一个组件的距离 */
  border: 1px solid #ddd;
  background: white;
}
```

#### 交互效果

```css
/* hover效果使用内边距 */
.interactive-element {
  padding: 10px 20px;
  transition: padding 0.3s ease;
  background: #f0f0f0;
}

.interactive-element:hover {
  padding: 15px 30px; /* 增加内边距产生放大效果 */
}

/* 点击效果使用内边距 */
.button:active {
  padding-top: 13px; /* 模拟按下效果 */
  padding-bottom: 11px;
}
```

### 特殊注意事项

#### 内边距与宽度计算

```css
/* 标准盒模型的问题 */
.problematic-box {
  width: 300px;
  padding: 20px;
  border: 5px solid #333;
  /* 实际宽度：300 + 20*2 + 5*2 = 350px */
}

/* 解决方案1：使用border-box */
.solution-box {
  box-sizing: border-box;
  width: 300px; /* 总宽度300px */
  padding: 20px; /* 包含在300px内 */
  border: 5px solid #333;
}

/* 解决方案2：使用calc() */
.calc-box {
  width: calc(300px - 40px - 10px); /* 减去padding和border */
  padding: 20px;
  border: 5px solid #333;
}
```

#### 内边距与滚动条

```css
/* 滚动容器内边距 */
.scroll-container {
  height: 300px;
  overflow-y: auto;
  padding: 20px; /* 内容有内边距，滚动条在外 */
}

/* 替代方案：内部元素添加内边距 */
.scroll-container-alt {
  height: 300px;
  overflow-y: auto;
}

.scroll-container-alt .content {
  padding: 20px; /* 滚动条更靠近边缘 */
}

/* 自定义滚动条位置 */
.custom-scroll {
  height: 300px;
  overflow-y: auto;
  padding-right: 20px; /* 为滚动条留出空间 */
}
```

#### 内边距与背景

```css
/* 内边距区域有背景色 */
.padded-bg {
  padding: 30px;
  background-color: #3498db;
  color: white;
}

/* 多重背景与内边距 */
.multiple-bg {
  padding: 40px;
  background:
    linear-gradient(45deg, #3498db 30%, transparent 30%) 0 0,
    linear-gradient(-45deg, #2ecc71 30%, transparent 30%) 0 0;
  background-size: 20px 20px;
  background-color: #ecf0f1;
}
```

## border 边框

### 边框样式

#### 基本边框属性

```css
/* 完整边框设置 */
.element {
  border-width: 2px; /* 边框宽度 */
  border-style: solid; /* 边框样式 */
  border-color: #3498db; /* 边框颜色 */
}

/* 简写形式 */
.element-shorthand {
  border: 2px solid #3498db; /* width style color */
}

/* 单独设置每条边 */
.element-individual {
  border-top: 3px dashed #e74c3c;
  border-right: 2px dotted #2ecc71;
  border-bottom: 1px solid #f39c12;
  border-left: 4px double #9b59b6;
}
```

#### 边框样式类型

```css
/* 各种边框样式 */
.border-styles {
  border: 3px #333;
}

.solid {
  border-style: solid;
} /* 实线 */
.dashed {
  border-style: dashed;
} /* 虚线 */
.dotted {
  border-style: dotted;
} /* 点线 */
.double {
  border-style: double;
} /* 双线 */
.groove {
  border-style: groove;
} /* 3D凹槽 */
.ridge {
  border-style: ridge;
} /* 3D凸起 */
.inset {
  border-style: inset;
} /* 3D内嵌 */
.outset {
  border-style: outset;
} /* 3D外凸 */
.none {
  border-style: none;
} /* 无边框 */
.hidden {
  border-style: hidden;
} /* 隐藏（但占用空间） */
```

### 边框方向

#### 各方向独立控制

```css
/* 分别控制四个方向的宽度 */
.border-widths {
  border-top-width: 1px;
  border-right-width: 2px;
  border-bottom-width: 3px;
  border-left-width: 4px;
}

/* 分别控制四个方向的样式 */
.border-styles {
  border-top-style: solid;
  border-right-style: dashed;
  border-bottom-style: dotted;
  border-left-style: double;
}

/* 分别控制四个方向的颜色 */
.border-colors {
  border-top-color: red;
  border-right-color: blue;
  border-bottom-color: green;
  border-left-color: yellow;
}

/* 使用逻辑属性 */
.border-logical {
  border-block-start: 2px solid #3498db; /* 顶部（水平书写模式） */
  border-block-end: 2px solid #2ecc71; /* 底部 */
  border-inline-start: 2px solid #e74c3c; /* 左侧（LTR） */
  border-inline-end: 2px solid #f39c12; /* 右侧（LTR） */
}
```

#### 特殊边框效果

```css
/* 三角形制作 */
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid #3498db;
}

/* 对话气泡 */
.tooltip {
  position: relative;
  padding: 10px;
  background: #333;
  color: white;
  border-radius: 5px;
}

.tooltip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20px;
  border: 10px solid transparent;
  border-top-color: #333;
}
```

### 边框半径

#### 基本圆角

```css
/* 统一圆角 */
.rounded {
  border-radius: 10px; /* 所有角都是10px圆角 */
}

/* 椭圆圆角 */
.elliptical {
  border-radius: 50px / 25px; /* 水平半径 / 垂直半径 */
}

/* 完全圆形 */
.circle {
  border-radius: 50%; /* 创建圆形 */
  width: 100px;
  height: 100px;
}
```

#### 各角独立控制

```css
/* 单个值控制所有角 */
.all-corners {
  border-radius: 20px;
}

/* 两个值：左上-右下 / 右上-左下 */
.two-values {
  border-radius: 20px 40px;
}

/* 三个值：左上 / 右上-左下 / 右下 */
.three-values {
  border-radius: 10px 20px 30px;
}

/* 四个值：左上 / 右上 / 右下 / 左下（顺时针） */
.four-values {
  border-radius: 10px 20px 30px 40px;
}

/* 分别控制每个角 */
.individual-corners {
  border-top-left-radius: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 40px;
}

/* 分别控制每个角的水平和垂直半径 */
.complex-corners {
  border-radius: 10px 20px 30px 40px / 5px 10px 15px 20px;
}
```

#### 高级圆角效果

```css
/* 半圆形 */
.semi-circle {
  width: 100px;
  height: 50px;
  border-radius: 50px 50px 0 0; /* 上半圆 */
  background: #3498db;
}

/* 胶囊形状 */
.pill-shape {
  border-radius: 9999px; /* 非常大的值 */
  padding: 10px 30px;
  background: #2ecc71;
  color: white;
}

/* 标签形状 */
.tag-shape {
  border-radius: 4px 12px 12px 4px;
  padding: 5px 15px 5px 10px;
  background: #e74c3c;
  color: white;
}
```

### 边框图像

#### border-image 属性

```css
/* 使用图片作为边框 */
.image-border {
  border: 30px solid transparent;
  border-image: url("border-image.png") 30 stretch;
  width: 200px;
  height: 150px;
}

/* 详细设置 */
.detailed-image-border {
  border: 30px solid transparent;
  border-image-source: url("border-image.png");
  border-image-slice: 30; /* 图片切片大小 */
  border-image-width: 30px; /* 边框宽度 */
  border-image-outset: 0; /* 边框向外扩展 */
  border-image-repeat: stretch; /* 重复方式：stretch/repeat/round/space */
}
```

#### 渐变边框

```css
/* 使用渐变作为边框 */
.gradient-border {
  border: 5px solid transparent;
  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #3498db, #2ecc71) border-box;
  border-radius: 10px;
  padding: 20px;
}

/* 多重渐变边框 */
.multi-gradient-border {
  border: double 5px transparent;
  border-radius: 10px;
  background-image:
    linear-gradient(white, white),
    linear-gradient(45deg, #3498db, #e74c3c, #f39c12);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
```

#### 边框阴影

```css
/* box-shadow 作为边框替代 */
.shadow-border {
  box-shadow: 0 0 0 3px #3498db; /* x偏移 y偏移 模糊 扩展 颜色 */
  padding: 20px;
}

/* 多重阴影边框 */
.multiple-shadow-border {
  box-shadow:
    0 0 0 1px #3498db,
    0 0 0 3px #2ecc71,
    0 0 0 5px #e74c3c;
  padding: 20px;
}

/* 内阴影作为内边框 */
.inset-border {
  box-shadow: inset 0 0 0 2px #3498db;
  padding: 20px;
}
```

## 块级元素 vs 行内元素

### 块级元素

#### 特点

```css
/* 块级元素默认样式 */
.block-element {
  display: block; /* 默认值 */

  /* 特征 */
  width: 100%; /* 默认宽度占满父容器 */
  height: auto; /* 高度由内容决定 */
  margin: 0; /* 默认外边距 */
  padding: 0; /* 默认内边距 */

  /* 布局行为 */
  box-sizing: content-box; /* 标准盒模型 */
  position: static; /* 默认定位 */
  float: none; /* 默认不浮动 */
  clear: none; /* 默认不清除浮动 */
}
```

#### 常见块级元素

```html
<!-- 结构性块级元素 -->
<div>通用块级容器</div>
<header>页眉</header>
<footer>页脚</footer>
<main>主要内容</main>
<nav>导航</nav>
<section>章节</section>
<article>文章</article>
<aside>侧边栏</aside>

<!-- 文本块级元素 -->
<h1>标题1</h1> 到 <h6>标题6</h6>
<p>段落</p>
<blockquote>块引用</blockquote>
<pre>预格式化文本</pre>

<!-- 列表元素 -->
<ul><li>无序列表项</li></ul>
<ol><li>有序列表项</li></ol>
<li>列表项（在ul/ol内）</li>
<dl><dt>定义列表</dt><dd>定义描述</dd></dl>

<!-- 表单元素 -->
<form>表单</form>
<fieldset>字段集</fieldset>

<!-- 其他 -->
<hr>水平线</hr>
<address>地址</address>
<table>表格</table>
```

#### 块级元素行为

```css
/* 块级元素布局特性 */
.block-demo {
  background-color: #3498db;
  color: white;
  margin-bottom: 10px; /* 垂直外边距不会合并 */
  padding: 10px;

  /* 可以设置所有盒模型属性 */
  width: 300px; /* 可以设置固定宽度 */
  height: 200px; /* 可以设置固定高度 */
  border: 2px solid #2980b9;
}

/* 块级元素会强制换行 */
.block-demo + .block-demo {
  background-color: #2ecc71; /* 这个元素会在下一行显示 */
}
```

### 行内元素

#### 特点

```css
/* 行内元素默认样式 */
.inline-element {
  display: inline; /* 默认值 */

  /* 特征 */
  width: auto; /* 宽度由内容决定 */
  height: auto; /* 高度由内容决定 */

  /* 限制 */
  /* 不能设置宽度和高度 */
  /* 垂直方向的内边距、外边距、边框不会影响行高 */
  /* 水平方向的内边距、外边距、边框会生效 */

  /* 布局行为 */
  line-height: inherit; /* 继承行高 */
  vertical-align: baseline; /* 基线对齐 */
}
```

#### 常见行内元素

```html
<!-- 文本级语义元素 -->
<span>通用行内容器</span>
<em>强调文本</em>
<strong>重要文本</strong>
<code>代码</code>
<abbr>缩写</abbr>
<cite>引用</cite>
<dfn>定义术语</dfn>
<mark>高亮文本</mark>

<!-- 链接和按钮 -->
<a href="#">链接</a>
<button>按钮</button>

<!-- 图像和媒体 -->
<img src="image.jpg" alt="图片">
<svg>矢量图形</svg>
<canvas>画布</canvas>

<!-- 表单元素 -->
<input type="text">
<textarea>多行文本</textarea>
<select><option>选项</option></select>
<label>标签</label>

<!-- 其他 -->
<br>换行</br>
<sub>下标</sub>
<sup>上标</sup>
<small>小号文本</small>
<time>时间</time>
```

#### 行内元素行为

```css
/* 行内元素布局特性 */
.inline-demo {
  background-color: #e74c3c;
  color: white;
  padding: 2px 5px; /* 水平内边距生效 */
  margin: 0 5px; /* 水平外边距生效 */
  border: 1px solid #c0392b;

  /* 这些属性不会生效或表现不同 */
  width: 100px; /* 无效 */
  height: 50px; /* 无效 */
  margin-top: 20px; /* 不会影响垂直布局 */
  padding-top: 10px; /* 会影响背景但不会影响行高 */
}

/* 行内元素不会强制换行 */
.inline-demo + .inline-demo {
  background-color: #f39c12; /* 这个元素会紧挨着显示 */
}
```

### 行内块元素

#### 特点

```css
/* 行内块元素特点 */
.inline-block-element {
  display: inline-block; /* 结合行内和块级特点 */

  /* 继承行内元素特点 */
  /* 不会强制换行 */
  /* 与其他行内元素在同一行显示 */

  /* 继承块级元素特点 */
  width: 100px; /* 可以设置宽度 */
  height: 50px; /* 可以设置高度 */
  margin: 10px; /* 所有方向外边距生效 */
  padding: 10px; /* 所有方向内边距生效 */
  vertical-align: middle; /* 垂直对齐方式很重要 */
}
```

#### 使用场景

```css
/* 导航菜单项 */
.nav-item {
  display: inline-block;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  vertical-align: middle;
}

/* 图标按钮 */
.icon-button {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #2ecc71;
  color: white;
  border-radius: 50%;
  vertical-align: middle;
}

/* 表单元素组 */
.form-group {
  display: inline-block;
  margin-right: 20px;
  vertical-align: top; /* 顶部对齐 */
}
```

### 元素类型对比

#### 特性对比表

```css
/* 创建对比示例 */
.comparison-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

.comparison-table .row {
  display: table-row;
}

.comparison-table .cell {
  display: table-cell;
  padding: 10px;
  border: 1px solid #ddd;
  vertical-align: top;
}
```

| 特性          | 块级元素 (block)       | 行内元素 (inline)            | 行内块元素 (inline-block)     |
| ------------- | ---------------------- | ---------------------------- | ----------------------------- |
| **宽度/高度** | 可以设置               | 不可以设置                   | 可以设置                      |
| **内外边距**  | 所有方向都生效         | 只有水平方向生效             | 所有方向都生效                |
| **换行行为**  | 独占一行，强制换行     | 不换行，与其他行内元素同行   | 不换行，与其他行内/行内块同行 |
| **默认宽度**  | 父容器的 100%          | 内容的宽度                   | 内容的宽度（可设置）          |
| **包含关系**  | 可以包含块级和行内元素 | 通常只包含文本和其他行内元素 | 可以包含块级和行内元素        |
| **垂直对齐**  | 不适用                 | baseline 对齐                | 可设置 vertical-align         |
| **常见元素**  | div, p, h1-h6, ul, li  | span, a, strong, em          | img, button, input            |

#### 转换示例

```css
/* 将行内元素转换为块级 */
.inline-to-block {
  display: block; /* 现在可以设置宽高 */
  width: 200px;
  height: 100px;
  margin: 10px 0; /* 垂直外边距现在生效 */
}

/* 将块级元素转换为行内 */
.block-to-inline {
  display: inline; /* 现在不能设置宽高 */
  /* width: 200px;      无效 */
  /* height: 100px;     无效 */
  margin: 0 10px; /* 只有水平外边距生效 */
}

/* 转换为行内块 */
.any-to-inline-block {
  display: inline-block; /* 最佳折中方案 */
  width: 150px; /* 可以设置宽高 */
  height: 50px; /* 可以设置宽高 */
  margin: 10px; /* 所有方向外边距生效 */
  vertical-align: middle; /* 控制垂直对齐 */
}
```

## display 属性

### 基础显示类型

#### 外部显示类型

```css
/* 块级容器 */
.block-container {
  display: block; /* 生成块级元素框 */
}

/* 行内容器 */
.inline-container {
  display: inline; /* 生成行内元素框 */
}

/* 行内块容器 */
.inline-block-container {
  display: inline-block; /* 生成行内级块容器 */
}

/* 列表项 */
.list-item {
  display: list-item; /* 生成块框和列表项内联框 */
  list-style-position: inside;
}
```

#### 内部显示类型

```css
/* 流式布局 */
.flow-container {
  display: flow; /* 默认布局 */
}

/* 流式根 */
.flow-root-container {
  display: flow-root; /* 创建新的块级格式上下文 */
  /* 解决浮动导致的父元素高度塌陷 */
}

/* Flex容器 */
.flex-container {
  display: flex; /* 弹性盒布局 */
}

/* Grid容器 */
.grid-container {
  display: grid; /* 网格布局 */
}

/* 表格相关 */
.table-container {
  display: table; /* 表现为表格 */
}

.table-row {
  display: table-row; /* 表现为表格行 */
}

.table-cell {
  display: table-cell; /* 表现为表格单元格 */
}
```

#### 多值语法（Level 3）

```css
/* 外部显示类型 + 内部显示类型 */
.multi-value {
  display: block flow; /* 外部块级，内部流式 */
  display: inline flow; /* 外部行内，内部流式 */
  display: inline flow-root; /* 外部行内，内部流式根 */
  display: block flex; /* 外部块级，内部Flex */
  display: inline flex; /* 外部行内，内部Flex */
  display: block grid; /* 外部块级，内部Grid */
  display: inline grid; /* 外部行内，内部Grid */
  display: block flow-root list-item; /* 列表项 */
}
```

### Flexbox 布局

#### Flex 容器

```css
/* 基本Flex容器 */
.flex-basic {
  display: flex; /* 或 inline-flex */

  /* 主轴方向 */
  flex-direction: row; /* 默认：水平从左到右 */
  /* flex-direction: row-reverse;  水平从右到左 */
  /* flex-direction: column;       垂直从上到下 */
  /* flex-direction: column-reverse; 垂直从下到上 */

  /* 换行 */
  flex-wrap: nowrap; /* 默认：不换行 */
  /* flex-wrap: wrap;              换行 */
  /* flex-wrap: wrap-reverse;      反向换行 */

  /* 简写 */
  flex-flow: row wrap; /* direction 和 wrap 的简写 */

  /* 主轴对齐 */
  justify-content: flex-start; /* 默认：从主轴起点开始 */
  /* justify-content: flex-end;     从主轴终点开始 */
  /* justify-content: center;       居中对齐 */
  /* justify-content: space-between; 两端对齐，项目间间隔相等 */
  /* justify-content: space-around; 每个项目两侧间隔相等 */
  /* justify-content: space-evenly; 项目间和两端间隔都相等 */

  /* 交叉轴对齐 */
  align-items: stretch; /* 默认：拉伸填满容器高度 */
  /* align-items: flex-start;       交叉轴起点对齐 */
  /* align-items: flex-end;         交叉轴终点对齐 */
  /* align-items: center;           交叉轴居中对齐 */
  /* align-items: baseline;         基线对齐 */

  /* 多行对齐 */
  align-content: stretch; /* 多行时的交叉轴对齐 */
  /* align-content: flex-start; */
  /* align-content: flex-end; */
  /* align-content: center; */
  /* align-content: space-between; */
  /* align-content: space-around; */
}
```

#### Flex 项目

```css
/* Flex项目属性 */
.flex-item {
  /* 顺序 */
  order: 0; /* 默认值，数值越小排列越靠前 */

  /* 放大比例 */
  flex-grow: 0; /* 默认不放大 */
  /* flex-grow: 1;              等分剩余空间 */

  /* 缩小比例 */
  flex-shrink: 1; /* 默认缩小 */
  /* flex-shrink: 0;            不缩小 */

  /* 基础尺寸 */
  flex-basis: auto; /* 默认基于内容 */
  /* flex-basis: 100px;         固定基础尺寸 */
  /* flex-basis: 20%;           百分比基础尺寸 */

  /* 简写 */
  flex: 0 1 auto; /* grow shrink basis */
  /* flex: 1;                   flex: 1 1 0% */
  /* flex: auto;                flex: 1 1 auto */
  /* flex: none;                flex: 0 0 auto */

  /* 单独对齐 */
  align-self: auto; /* 继承容器的align-items */
  /* align-self: flex-start; */
  /* align-self: flex-end; */
  /* align-self: center; */
  /* align-self: baseline; */
  /* align-self: stretch; */
}
```

### Grid 布局

#### Grid 容器

```css
/* 基本Grid容器 */
.grid-basic {
  display: grid; /* 或 inline-grid */

  /* 定义列 */
  grid-template-columns: 100px 200px 100px; /* 三列固定宽度 */
  grid-template-columns: 1fr 2fr 1fr; /* 分数单位 */
  grid-template-columns: repeat(3, 1fr); /* 重复模式 */
  grid-template-columns: minmax(100px, 1fr) 2fr; /* 最小最大值 */
  grid-template-columns: [col1-start] 1fr [col1-end col2-start] 2fr [col2-end]; /* 命名网格线 */

  /* 定义行 */
  grid-template-rows: 100px auto 200px;
  grid-template-rows: repeat(3, minmax(100px, auto));

  /* 简写 */
  grid-template:
    "header header header" 80px
    "sidebar content aside" auto
    "footer footer footer" 100px
    / 200px 1fr 200px; /* 行高 / 列宽 */

  /* 自动行列 */
  grid-auto-columns: 100px; /* 隐式列的尺寸 */
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: row; /* 自动放置方向：row/column/dense */

  /* 间距 */
  gap: 20px; /* 行间距和列间距 */
  /* row-gap: 10px;            行间距 */
  /* column-gap: 20px;         列间距 */

  /* 对齐 */
  justify-items: stretch; /* 单元格内容水平对齐 */
  align-items: stretch; /* 单元格内容垂直对齐 */
  justify-content: start; /* 整个网格水平对齐 */
  align-content: start; /* 整个网格垂直对齐 */
}
```

#### Grid 项目

```css
/* Grid项目属性 */
.grid-item {
  /* 位置 */
  grid-column-start: 1; /* 起始列线 */
  grid-column-end: 3; /* 结束列线 */
  grid-row-start: 1; /* 起始行线 */
  grid-row-end: 2; /* 结束行线 */

  /* 简写 */
  grid-column: 1 / 3; /* start / end */
  grid-column: 1 / span 2; /* start / span count */
  grid-row: 1 / 2;

  /* 使用命名区域 */
  grid-area: header; /* 使用grid-template中定义的区域 */
  /* 或作为简写：grid-area: row-start / column-start / row-end / column-end; */

  /* 单独对齐 */
  justify-self: stretch; /* 单元格内水平对齐 */
  align-self: stretch; /* 单元格内垂直对齐 */
  place-self: center center; /* align-self justify-self 简写 */
}
```

### 其他显示类型

#### 表格显示

```css
/* 创建表格布局 */
.table-layout {
  display: table; /* 表现为表格 */
  width: 100%;
  border-collapse: collapse;
}

.table-row {
  display: table-row; /* 表现为表格行 */
}

.table-cell {
  display: table-cell; /* 表现为表格单元格 */
  padding: 10px;
  border: 1px solid #ddd;
  vertical-align: middle;
}

/* 表格标题 */
.table-caption {
  display: table-caption;
  caption-side: top;
}

/* 表格列 */
.table-column {
  display: table-column;
}

.table-column-group {
  display: table-column-group;
}

/* 表格头部/脚部 */
.table-header-group {
  display: table-header-group;
  font-weight: bold;
}

.table-footer-group {
  display: table-footer-group;
}
```

#### 内容显示

```css
/* 内容显示类型 */
.content-display {
  display: contents; /* 元素本身不生成框，子元素正常显示 */
  /* 用于跳过不必要的包装元素 */
}

/* 示例：跳过包装div */
.wrapper {
  display: contents; /* 这个div在布局中不可见 */
}

.wrapper > .child {
  /* 这些子元素会直接参与祖父元素的布局 */
}
```

#### 隐藏元素

```css
/* 完全隐藏 */
.completely-hidden {
  display: none; /* 元素不显示，不占空间 */

  /* 与 visibility: hidden 的区别 */
  /* visibility: hidden 隐藏但保留空间 */
}

/* 保持空间隐藏 */
.space-preserved-hidden {
  visibility: hidden;
  opacity: 0; /* 透明度为0，完全透明 */

  /* 仍然可以交互（如果设置了pointer-events） */
  pointer-events: none; /* 禁用交互 */
}

/* 可访问性隐藏 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  /* 屏幕阅读器可以读取，但对视觉用户隐藏 */
}
```

### 显示类型转换

#### 常见转换场景

```css
/* 1. 创建水平导航 */
.nav-menu {
  /* 默认ul是block，li是list-item */
}

.nav-menu li {
  display: inline-block; /* 水平排列 */
  margin: 0 10px;
}

/* 2. 按钮组 */
.button-group {
  font-size: 0; /* 消除inline-block间隙 */
}

.button-group .btn {
  display: inline-block;
  font-size: 16px; /* 恢复字体大小 */
  vertical-align: top;
}

/* 3. 垂直居中 */
.vertical-center-container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 300px;
}

/* 4. 等高列 */
.equal-height-columns {
  display: table;
  width: 100%;
}

.equal-height-columns .column {
  display: table-cell;
  width: 33.33%;
  vertical-align: top;
}

/* 5. 现代替代：Flexbox */
.modern-equal-height {
  display: flex;
}

.modern-equal-height .column {
  flex: 1; /* 等宽列 */
}
```

#### 响应式显示类型

```css
/* 根据屏幕大小改变显示类型 */
.responsive-element {
  display: block; /* 默认移动端：块级显示 */
}

@media (min-width: 768px) {
  .responsive-element {
    display: inline-block; /* 平板：行内块显示 */
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .responsive-element {
    display: flex; /* 桌面：Flex布局 */
    width: 33.33%;
  }
}

/* 条件显示/隐藏 */
.mobile-only {
  display: block;
}

.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }

  .desktop-only {
    display: block;
  }
}
```

## 盒模型计算

### 总尺寸计算

#### 标准盒模型计算

```css
/* 标准盒模型尺寸计算示例 */
.standard-box {
  /* 设置的值 */
  width: 200px;
  height: 150px;
  padding: 20px;
  border: 5px solid #333;
  margin: 10px;

  /* 计算总尺寸 */
  /* 总宽度 = 200 + 20*2 + 5*2 + 10*2 = 270px */
  /* 总高度 = 150 + 20*2 + 5*2 + 10*2 = 220px */

  /* 内容区域尺寸 */
  /* 内容宽度 = 200px */
  /* 内容高度 = 150px */

  /* 可视尺寸（包含边框） */
  /* 可视宽度 = 200 + 20*2 + 5*2 = 250px */
  /* 可视高度 = 150 + 20*2 + 5*2 = 200px */
}

/* 计算函数验证 */
.standard-box::after {
  content: "宽度: " attr(data-width) " | 总宽度: "
    calc(200px + 40px + 10px + 20px);
}
```

#### 替代盒模型计算

```css
/* border-box盒模型尺寸计算 */
.border-box {
  box-sizing: border-box;

  /* 设置的值 */
  width: 200px; /* 这是总宽度（包含padding和border） */
  height: 150px; /* 这是总高度（包含padding和border） */
  padding: 20px;
  border: 5px solid #333;
  margin: 10px;

  /* 计算总尺寸 */
  /* 总宽度 = 200 + 10*2 = 220px */
  /* 总高度 = 150 + 10*2 = 170px */

  /* 内容区域尺寸 */
  /* 内容宽度 = 200 - 20*2 - 5*2 = 150px */
  /* 内容高度 = 150 - 20*2 - 5*2 = 100px */

  /* 可视尺寸（包含边框） */
  /* 可视宽度 = 200px */
  /* 可视高度 = 150px */
}
```

#### 百分比计算

```css
/* 百分比尺寸计算 */
.percentage-box {
  width: 50%; /* 父元素宽度的50% */
  padding: 5%; /* 父元素宽度的5% */
  border: 2px solid #333;
  margin: 10px;

  /* 注意：padding百分比也是基于父元素宽度 */

  /* 如果父元素宽度为400px */
  /* 内容宽度 = 400px * 50% = 200px */
  /* padding = 400px * 5% = 20px */
  /* 总宽度 = 200 + 20*2 + 2*2 + 10*2 = 264px */
}

/* 使用box-sizing简化 */
.percentage-box-simple {
  box-sizing: border-box;
  width: 50%; /* 总宽度为父元素的50% */
  padding: 5%; /* padding包含在50%内 */
  border: 2px solid #333;
  margin: 10px;
}
```

### box-sizing 实践

#### 全局设置

```css
/* 最佳实践：全局使用border-box */
*,
*::before,
*::after {
  box-sizing: border-box; /* 让所有元素使用border-box */
}

/* 保留特定元素使用content-box */
input[type="checkbox"],
input[type="radio"] {
  box-sizing: content-box; /* 表单元素可能需要content-box */
}

/* 重置默认样式后设置 */
.reset-box-sizing {
  box-sizing: content-box; /* 某些CSS重置框架的默认值 */
}

.custom-box-sizing {
  box-sizing: border-box; /* 显式设置为border-box */
}
```

#### 混合使用

```css
/* 混合盒模型使用场景 */
.mixed-box-sizing {
  /* 外部容器使用border-box */
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid #333;

  /* 内部元素使用content-box */
  .inner-content {
    box-sizing: content-box;
    width: 100%; /* 父元素内容宽度的100% */
    padding: 10px;
    border: 1px solid #666;

    /* 计算：父元素内容宽度 = 300 - 20*2 - 2*2 = 256px */
    /* 子元素宽度 = 256px */
    /* 子元素总宽度 = 256 + 10*2 + 1*2 = 278px */
  }
}
```

#### 盒模型转换

```css
/* 动态切换盒模型 */
.dynamic-box {
  /* 默认使用content-box */
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid #333;

  /* 切换为border-box */
  &.border-box-mode {
    box-sizing: border-box;
    width: 250px; /* 新的总宽度 */
  }
}

/* 响应式盒模型 */
.responsive-box {
  box-sizing: content-box;

  @media (min-width: 768px) {
    box-sizing: border-box;
    width: 50%;
    padding: 20px;
  }
}
```

### 盒模型调试

#### 开发者工具使用

```css
/* Chrome DevTools 盒模型可视化 */
.debug-box {
  width: 200px;
  height: 150px;
  padding: 20px;
  border: 5px solid #3498db;
  margin: 10px;
  background-color: #ecf0f1;

  /* 添加调试边框 */
  outline: 1px dashed #e74c3c; /* 不占空间的边框，用于调试 */

  /* 使用CSS自定义属性记录尺寸 */
  --content-width: 200px;
  --content-height: 150px;
  --total-width: calc(var(--content-width) + 40px + 10px + 20px);
}

/* 尺寸标注 */
.debug-box::before {
  content: attr(data-size);
  position: absolute;
  top: -25px;
  left: 0;
  font-size: 12px;
  color: #e74c3c;
}
```

#### 调试技巧

```css
/* 1. 高亮所有元素 */
.debug-all * {
  outline: 1px solid rgba(255, 0, 0, 0.1);
}

/* 2. 显示盒模型尺寸 */
.show-dimensions::before {
  content: "W: " attr(data-width) " H: " attr(data-height);
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2px 5px;
  font-size: 10px;
  z-index: 1000;
}

/* 3. 可视化margin和padding */
.visualize-spacing {
  position: relative;
  background-color: #3498db !important;
}

.visualize-spacing::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 2px dashed #e74c3c; /* 表示border */
  pointer-events: none;
}

.visualize-spacing::after {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  border: 2px dashed #2ecc71; /* 表示margin */
  pointer-events: none;
}
```

#### 常见问题调试

```css
/* 问题1：元素超出容器 */
.overflow-issue {
  box-sizing: content-box;
  width: 100%;
  padding: 20px;
  border: 2px solid #333;
  /* 实际宽度: 100% + 40px + 4px */
}

/* 解决方案 */
.overflow-fixed {
  box-sizing: border-box; /* 方案1：使用border-box */
  width: 100%;
  padding: 20px;
  border: 2px solid #333;
}

.overflow-fixed-alt {
  width: calc(100% - 40px - 4px); /* 方案2：使用calc */
  padding: 20px;
  border: 2px solid #333;
}

/* 问题2：垂直margin折叠 */
.collapse-issue .child {
  margin-top: 20px;
  margin-bottom: 20px;
}

/* 解决方案 */
.collapse-fixed .parent {
  padding-top: 1px; /* 添加padding阻止折叠 */
}

.collapse-fixed-alt .child {
  display: inline-block; /* 改变display类型 */
  width: 100%;
}
```

## 布局应用

### 常见布局模式

#### 传统居中布局

```css
/* 1. 水平居中（固定宽度） */
.center-fixed {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}

/* 2. 水平居中（未知宽度） */
.center-unknown {
  display: table;
  margin: 0 auto;
}

/* 3. 垂直居中（单行文本） */
.vertical-center-text {
  height: 100px;
  line-height: 100px; /* 与height相同 */
}

/* 4. 垂直居中（多行文本/元素） */
.vertical-center-multiple {
  display: table-cell;
  vertical-align: middle;
  height: 200px;
}
```

#### 现代居中布局

```css
/* 1. Flexbox居中 */
.flex-center {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 300px;
}

/* 2. Grid居中 */
.grid-center {
  display: grid;
  place-items: center; /* 水平和垂直居中 */
  height: 300px;
}

/* 3. 绝对定位居中 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. 视口居中 */
.viewport-center {
  position: fixed;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
}
```

#### 圣杯布局/Holy Grail

```css
/* 圣杯布局 - 传统方法 */
.holy-grail {
  min-height: 100vh;
  padding: 0 200px; /* 为左右边栏留出空间 */
}

.holy-grail header,
.holy-grail footer {
  height: 80px;
  background: #3498db;
}

.holy-grail .main {
  float: left;
  width: 100%;
  background: #ecf0f1;
}

.holy-grail .left-sidebar {
  float: left;
  width: 200px;
  margin-left: -100%; /* 移动到主内容左侧 */
  position: relative;
  left: -200px; /* 精确对齐 */
  background: #2ecc71;
}

.holy-grail .right-sidebar {
  float: left;
  width: 200px;
  margin-left: -200px; /* 移动到右侧 */
  position: relative;
  right: -200px; /* 精确对齐 */
  background: #e74c3c;
}

.holy-grail .content {
  padding: 20px;
}
```

#### 现代布局方案

```css
/* 圣杯布局 - Flexbox版本 */
.holy-grail-flex {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.holy-grail-flex .body {
  display: flex;
  flex: 1;
}

.holy-grail-flex .main {
  flex: 1;
  order: 2;
  background: #ecf0f1;
}

.holy-grail-flex .left-sidebar {
  width: 200px;
  order: 1;
  background: #2ecc71;
}

.holy-grail-flex .right-sidebar {
  width: 200px;
  order: 3;
  background: #e74c3c;
}

/* 圣杯布局 - Grid版本 */
.holy-grail-grid {
  display: grid;
  grid-template:
    "header header header" 80px
    "left main right" 1fr
    "footer footer footer" 80px
    / 200px 1fr 200px;
  min-height: 100vh;
}

.holy-grail-grid header {
  grid-area: header;
  background: #3498db;
}
.holy-grail-grid .left-sidebar {
  grid-area: left;
  background: #2ecc71;
}
.holy-grail-grid .main {
  grid-area: main;
  background: #ecf0f1;
}
.holy-grail-grid .right-sidebar {
  grid-area: right;
  background: #e74c3c;
}
.holy-grail-grid footer {
  grid-area: footer;
  background: #3498db;
}
```

### 居中技巧

#### 文本居中

```css
/* 水平文本居中 */
.text-center {
  text-align: center;
}

/* 多行文本垂直居中 */
.multiline-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
}

/* 行内元素垂直对齐 */
.inline-vertical {
  vertical-align: middle;
  display: inline-block;
}
```

#### 块级元素居中

```css
/* 1. 已知尺寸的水平垂直居中 */
.known-size-center {
  width: 300px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px; /* 高度的一半 */
  margin-left: -150px; /* 宽度的一半 */
}

/* 2. 未知尺寸的水平垂直居中 */
.unknown-size-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 3. Flexbox多元素居中 */
.flex-multiple-center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 300px;
}
```

#### 响应式居中

```css
/* 响应式居中容器 */
.responsive-center-container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 卡片网格居中 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center; /* 每个网格项水平居中 */
}

/* 流式居中 */
.flow-center {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.flow-center > * {
  flex: 0 1 auto;
  min-width: 250px;
  max-width: 400px;
}
```

### 间距管理

#### 间距系统

```css
/* 定义间距比例系统 */
:root {
  --spacing-unit: 8px;
  --spacing-xxs: calc(var(--spacing-unit) * 0.5); /* 4px */
  --spacing-xs: var(--spacing-unit); /* 8px */
  --spacing-sm: calc(var(--spacing-unit) * 2); /* 16px */
  --spacing-md: calc(var(--spacing-unit) * 3); /* 24px */
  --spacing-lg: calc(var(--spacing-unit) * 4); /* 32px */
  --spacing-xl: calc(var(--spacing-unit) * 6); /* 48px */
  --spacing-xxl: calc(var(--spacing-unit) * 8); /* 64px */
}

/* 应用间距系统 */
.component {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.button {
  padding: var(--spacing-sm) var(--spacing-md);
}

.card {
  margin: var(--spacing-sm);
  padding: var(--spacing-md);
}
```

#### 间距工具类

```css
/* margin工具类 */
.m-0 {
  margin: 0;
}
.m-1 {
  margin: 0.25rem;
}
.m-2 {
  margin: 0.5rem;
}
.m-3 {
  margin: 1rem;
}
.m-4 {
  margin: 1.5rem;
}
.m-5 {
  margin: 3rem;
}

.mt-1 {
  margin-top: 0.25rem;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.ml-1 {
  margin-left: 0.25rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

/* padding工具类 */
.p-0 {
  padding: 0;
}
.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 1rem;
}
.p-4 {
  padding: 1.5rem;
}
.p-5 {
  padding: 3rem;
}

.pt-1 {
  padding-top: 0.25rem;
}
.pr-1 {
  padding-right: 0.25rem;
}
.pb-1 {
  padding-bottom: 0.25rem;
}
.pl-1 {
  padding-left: 0.25rem;
}

/* 响应式间距 */
@media (min-width: 768px) {
  .md\:m-3 {
    margin: 1rem;
  }
  .md\:p-3 {
    padding: 1rem;
  }
}
```

#### 间距最佳实践

```css
/* 1. 使用一致的间距比例 */
.component {
  /* 使用倍数关系，如 4px, 8px, 16px, 24px, 32px */
  margin-bottom: 24px;
  padding: 16px;
}

/* 2. 避免混合使用不同单位的间距 */
.good-spacing {
  margin: 16px; /* 全部使用px或全部使用rem */
  padding: 24px;
}

.bad-spacing {
  margin: 1rem; /* 避免混合单位 */
  padding: 20px;
}

/* 3. 使用逻辑属性支持RTL */
.rtl-safe {
  margin-inline-start: 16px; /* 代替 margin-left */
  padding-inline-end: 24px; /* 代替 padding-right */
}

/* 4. 容器间距 vs 组件间距 */
.container {
  padding: 24px; /* 容器内边距 */
}

.container > * + * {
  margin-top: 16px; /* 组件之间的间距 */
}

/* 5. 使用gap属性替代margin */
.grid-container {
  display: grid;
  gap: 20px; /* 替代行列margin */
}

.flex-container {
  display: flex;
  gap: 20px; /* 替代项目间的margin */
}
```

## 性能与最佳实践

### 性能优化

#### 盒模型性能考虑

```css
/* 1. 避免频繁改变盒模型属性 */
.performance-issue {
  /* 这些属性会触发重排 */
  width: 100px;
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;

  /* 优化：使用transform进行动画 */
  transition: transform 0.3s ease;
}

.performance-issue:hover {
  /* 差：改变盒模型属性触发重排 */
  /* width: 200px; */
  /* padding: 20px; */

  /* 好：使用transform只触发重绘 */
  transform: scale(1.1);
}

/* 2. 减少重排触发 */
.reflow-trigger {
  /* 这些属性会触发重排 */
  /* width, height, margin, padding, border */
  /* display, position, float, font-size */
  /* text-align, overflow, white-space */

  /* 批量修改 */
  .batch-update {
    /* 使用requestAnimationFrame批量更新 */
  }
}

/* 3. 使用containment优化 */
.containment {
  contain: layout style paint; /* 隔离渲染 */
  /* 减少重新计算的范围 */
}
```

#### 渲染优化

```css
/* 1. 使用will-change提示浏览器 */
.will-change {
  will-change: transform, opacity;
  /* 提前告诉浏览器可能会改变这些属性 */
}

/* 2. 避免复杂的盒阴影 */
.complex-shadow {
  /* 避免复杂的多重阴影 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 简单阴影 */
}

.simple-shadow {
  /* 简单的单层阴影性能更好 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

/* 3. 合理使用border-radius */
.rounded-performance {
  /* 大半径会影响性能 */
  border-radius: 9999px; /* 性能较差 */

  /* 使用固定值更好 */
  border-radius: 50%; /* 对于圆形更好 */
}

/* 4. 避免过多嵌套 */
.deep-nesting {
  /* 每个嵌套层级都会增加计算成本 */
}

.deep-nesting .level1 .level2 .level3 .level4 {
  /* 选择器越深，性能越差 */
}
```

### 最佳实践

#### 代码组织

```css
/* 1. 使用一致的命名约定 */
/* BEM 方法论 */
.block {
}
.block__element {
}
.block--modifier {
}

/* 2. 注释和文档 */
/**
 * 卡片组件
 * 用于展示内容块，包含标题、内容和操作
 * 
 * @component card
 * @variants default, highlighted, compact
 */
.card {
  /* 盒模型属性 */
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 24px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
}

/* 3. 响应式断点 */
:root {
  /* 移动优先断点 */
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
}

.responsive-component {
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }

  @media (min-width: 992px) {
    padding: 32px;
  }
}
```

#### 可维护性

```css
/* 1. 使用CSS自定义属性 */
:root {
  --spacing-unit: 8px;
  --border-radius: 4px;
  --border-width: 1px;
  --shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component {
  padding: calc(var(--spacing-unit) * 3);
  border-radius: var(--border-radius);
  border: var(--border-width) solid #ddd;
  box-shadow: var(--shadow);
}

/* 2. 分离关注点 */
/* layout.css - 布局相关 */
.layout-container {
  display: grid;
  gap: 20px;
}

/* component.css - 组件样式 */
.button {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
}

/* utility.css - 工具类 */
.mt-2 {
  margin-top: 16px;
}
.text-center {
  text-align: center;
}

/* 3. 使用现代布局技术 */
.modern-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.legacy-layout {
  /* 避免使用float布局 */
  float: left;
  width: 33.33%;
  margin-right: -1px;
}
```

#### 浏览器兼容性

```css
/* 1. 渐进增强 */
.feature {
  /* 基础样式 */
  display: block;
  width: 100%;

  /* 增强样式 */
  @supports (display: grid) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* 2. 厂商前缀 */
.vendor-prefix {
  display: -webkit-box; /* 老版本WebKit */
  display: -ms-flexbox; /* IE10 */
  display: -webkit-flex; /* Safari */
  display: flex; /* 标准 */

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

/* 3. 回退方案 */
.fallback {
  /* 现代属性 */
  gap: 20px;

  /* 回退方案 */
  margin: -10px;
}

.fallback > * {
  margin: 10px;
}
```

#### 测试和验证

```css
/* 1. 添加测试类 */
.test-border {
  border: 1px solid red !important;
}

.test-margin {
  background-color: rgba(255, 0, 0, 0.1) !important;
}

.test-padding {
  background-color: rgba(0, 255, 0, 0.1) !important;
}

/* 2. 尺寸验证 */
.validate-size::after {
  content: attr(data-size);
  position: absolute;
  background: black;
  color: white;
  padding: 2px 4px;
  font-size: 10px;
  opacity: 0.8;
}

/* 3. 断点测试 */
.breakpoint-test::before {
  content: "当前宽度: " attr(data-width);
  position: fixed;
  top: 0;
  right: 0;
  background: #333;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  z-index: 9999;
}
```

---

**关键要点总结**：

1. **盒模型是 CSS 布局的基础**：理解 content-box 和 border-box 的区别至关重要
2. **合理使用 display 属性**：根据需求选择合适的显示类型（block、inline、inline-block、flex、grid 等）
3. **间距管理要系统化**：建立一致的间距比例系统，使用 gap 属性替代 margin
4. **性能优化**：避免频繁触发重排，使用 transform 进行动画
5. **渐进增强**：为现代浏览器提供增强体验，为旧浏览器提供基本功能
6. **响应式设计**：使用现代布局技术（Flexbox、Grid）创建自适应布局
7. **可维护性**：使用 CSS 自定义属性、一致的命名约定和模块化组织

**工具推荐**：

- 盒模型可视化：Chrome DevTools、Firefox Developer Tools
- CSS 验证：W3C CSS Validator、Stylelint
- 布局生成：CSS Grid Generator、Flexbox Generator
- 性能分析：Lighthouse、WebPageTest

**进一步学习**：

- CSS 盒模型规范：W3C Box Model Module
- 现代布局：CSS Grid Layout、Flexbox
- 性能优化：渲染性能指南
- 无障碍：WCAG 2.1、ARIA 规范
