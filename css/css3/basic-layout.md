# 基础布局

## 文档流（正常流）

### 正常流基础

#### 什么是文档流

文档流（Normal Flow）是 HTML 元素默认的布局方式，元素按照它们在 HTML 中出现的顺序，从上到下、从左到右进行排列。

```css
/* 文档流中的元素默认行为 */
.normal-flow-element {
  /* 块级元素：独占一行，垂直排列 */
  display: block;
  width: auto; /* 默认宽度为父元素的100% */
  height: auto; /* 高度由内容决定 */
  margin: 0; /* 默认外边距 */

  /* 行内元素：水平排列，不会换行 */
  display: inline;
  width: auto; /* 宽度由内容决定 */
  height: auto; /* 高度由内容决定 */
  margin: 0; /* 只有水平外边距有效 */

  /* 行内块元素：水平排列，可设置宽高 */
  display: inline-block;
  width: auto; /* 可设置固定宽度 */
  height: auto; /* 可设置固定高度 */
  margin: 0; /* 所有方向外边距有效 */
}
```

#### 文档流特性

```css
/* 1. 元素顺序性 */
.flow-order {
  /* 元素按照HTML中的顺序依次排列 */
  /* 无法通过CSS改变元素在文档流中的顺序 */
}

/* 2. 空间占用性 */
.flow-space {
  /* 每个元素都会占据一定的空间 */
  /* 后续元素不能占据已被占用的空间 */
}

/* 3. 盒模型影响 */
.flow-box-model {
  margin: 20px; /* 外边距会影响元素间距 */
  padding: 10px; /* 内边距会影响内容区域 */
  border: 2px solid #333; /* 边框会影响元素尺寸 */
}

/* 4. 垂直外边距折叠 */
.flow-margin-collapse {
  margin-top: 20px;
  margin-bottom: 20px;
  /* 相邻垂直外边距会合并（取较大值） */
}

/* 5. 自动换行 */
.flow-wrapping {
  /* 块级元素自动换行 */
  /* 行内元素达到容器边界时自动换行 */
}
```

### 块级格式化上下文

#### BFC 创建条件

块级格式化上下文（Block Formatting Context）是一个独立的渲染区域，内部的元素布局不会影响外部元素。

```css
/* 创建BFC的方法 */
.bfc-creator {
  /* 1. 根元素（html） */
  html {
    /* 自动创建BFC */
  }

  /* 2. 浮动元素 */
  float: left; /* 或right，但不能为none */
  float: right;

  /* 3. 绝对定位元素 */
  position: absolute;
  position: fixed;

  /* 4. display为特定值 */
  display: inline-block;
  display: table-cell;
  display: table-caption;
  display: flex;
  display: inline-flex;
  display: grid;
  display: inline-grid;
  display: flow-root; /* 专门用于创建BFC */

  /* 5. overflow不为visible */
  overflow: hidden;
  overflow: auto;
  overflow: scroll;

  /* 6. 弹性项目（Flex items）和网格项目（Grid items） */
  /* 自动为其内容创建新的BFC */
}
```

#### BFC 特性与应用

```css
/* BFC特性示例 */
.bfc-properties {
  /* 1. 阻止外边距折叠 */
  .parent {
    overflow: hidden; /* 创建BFC阻止父子外边距折叠 */
  }

  .child {
    margin-top: 20px; /* 在BFC中不会与父元素外边距折叠 */
  }

  /* 2. 包含浮动元素 */
  .float-container {
    overflow: hidden; /* 创建BFC包含浮动子元素 */
  }

  .float-container::after {
    content: "";
    display: table;
    clear: both;
  }

  /* 3. 阻止元素被浮动覆盖 */
  .no-wrap-around-float {
    overflow: hidden; /* 创建BFC，不会环绕浮动元素 */
  }

  /* 4. 创建独立布局环境 */
  .isolated-layout {
    display: flow-root; /* 创建独立BFC */
  }
}
```

#### BFC 实战应用

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 1. 解决外边距折叠问题 */
      .margin-collapse-demo {
        background: #f0f0f0;
        margin: 20px 0;
      }

      .margin-collapse-demo .parent {
        background: #3498db;
        /* 不创建BFC时，子元素的margin-top会与父元素折叠 */
        /* border-top: 1px solid transparent; 方法1：添加边框 */
        /* padding-top: 1px; 方法2：添加内边距 */
        overflow: hidden; /* 方法3：创建BFC（推荐） */
      }

      .margin-collapse-demo .child {
        background: #2ecc71;
        margin-top: 30px; /* 在BFC中不会折叠 */
        height: 50px;
      }

      /* 2. 清除浮动影响 */
      .clear-float-demo {
        background: #f0f0f0;
        margin: 20px 0;
      }

      .clear-float-demo .container {
        border: 2px solid #e74c3c;
        /* 不创建BFC时，容器高度塌陷 */
        overflow: hidden; /* 创建BFC，包含浮动元素 */
      }

      .clear-float-demo .float-box {
        float: left;
        width: 100px;
        height: 100px;
        background: #3498db;
        margin: 10px;
      }

      /* 3. 防止文字环绕 */
      .text-wrap-demo {
        background: #f0f0f0;
        margin: 20px 0;
      }

      .text-wrap-demo .float-left {
        float: left;
        width: 150px;
        height: 100px;
        background: #3498db;
        margin-right: 20px;
      }

      .text-wrap-demo .content {
        background: #2ecc71;
        /* 默认会环绕浮动元素 */
        overflow: hidden; /* 创建BFC，不环绕 */
      }
    </style>
  </head>
  <body>
    <div class="margin-collapse-demo">
      <div class="parent">
        <div class="child"></div>
      </div>
    </div>

    <div class="clear-float-demo">
      <div class="container">
        <div class="float-box"></div>
        <div class="float-box"></div>
      </div>
    </div>

    <div class="text-wrap-demo">
      <div class="float-left"></div>
      <div class="content">
        这是一段很长的文本内容，默认情况下会环绕在浮动元素的周围。
        但是当容器创建了BFC后，文本将不会环绕浮动元素。
      </div>
    </div>
  </body>
</html>
```

### 内联格式化上下文

#### IFC 基础特性

内联格式化上下文（Inline Formatting Context）处理行内级元素的布局。

```css
/* IFC中的元素行为 */
.inline-context {
  /* 1. 水平排列 */
  .inline-element {
    display: inline; /* 水平排列，不换行 */
    vertical-align: baseline; /* 基线对齐 */
  }

  /* 2. 行盒（line box）概念 */
  .line-box {
    /* 每行文本形成一个行盒 */
    /* 行盒的高度由行内最高元素决定 */
  }

  /* 3. 对齐方式 */
  .alignment {
    text-align: left; /* 水平对齐 */
    vertical-align: top; /* 垂直对齐：top/middle/bottom/baseline */
    line-height: 1.5; /* 行高影响垂直居中 */
  }

  /* 4. 空白处理 */
  .whitespace {
    white-space: normal; /* 默认：合并空白，自动换行 */
    white-space: nowrap; /* 不换行 */
    white-space: pre; /* 保留空白，不自动换行 */
    white-space: pre-wrap; /* 保留空白，自动换行 */
    white-space: pre-line; /* 合并空白，保留换行 */
  }
}
```

#### IFC 中的垂直对齐

```css
/* vertical-align 属性详解 */
.vertical-alignment {
  /* 相对于父元素行盒 */

  /* 关键字值 */
  vertical-align: baseline; /* 默认：与父元素基线对齐 */
  vertical-align: top; /* 与行盒顶部对齐 */
  vertical-align: middle; /* 与行盒中部对齐 */
  vertical-align: bottom; /* 与行盒底部对齐 */
  vertical-align: text-top; /* 与父元素文本顶部对齐 */
  vertical-align: text-bottom; /* 与父元素文本底部对齐 */

  /* 长度值 */
  vertical-align: 10px; /* 上移10像素 */
  vertical-align: -10px; /* 下移10像素 */
  vertical-align: 10%; /* 相对于行高的10% */

  /* 特殊值 */
  vertical-align: sub; /* 下标对齐 */
  vertical-align: super; /* 上标对齐 */
}

/* 行内块元素对齐 */
.inline-block-alignment {
  display: inline-block;
  width: 100px;
  height: 100px;

  /* 不同vertical-align值的效果 */
  .top {
    vertical-align: top;
  }
  .middle {
    vertical-align: middle;
  }
  .bottom {
    vertical-align: bottom;
  }
  .baseline {
    vertical-align: baseline;
  }
}
```

#### IFC 实战应用

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 1. 垂直居中文本 */
      .vertical-center-text {
        height: 100px;
        line-height: 100px; /* 关键：行高等于容器高度 */
        background: #3498db;
        color: white;
        text-align: center;
      }

      /* 2. 图标与文本对齐 */
      .icon-text-alignment {
        font-size: 16px;
        line-height: 1.5;
      }

      .icon-text-alignment .icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: #2ecc71;
        vertical-align: middle; /* 与文本中间对齐 */
        margin-right: 10px;
      }

      /* 3. 多行文本对齐 */
      .multi-line-alignment {
        width: 300px;
        border: 1px solid #ddd;
      }

      .multi-line-alignment .label {
        display: inline-block;
        width: 80px;
        vertical-align: top; /* 顶部对齐，用于多行情况 */
        margin-top: 5px;
      }

      .multi-line-alignment .content {
        display: inline-block;
        width: 200px;
      }

      /* 4. 基线网格系统 */
      .baseline-grid {
        line-height: 24px; /* 基线网格单位 */
      }

      .baseline-grid p {
        margin: 0 0 24px 0; /* 使用行高的倍数作为外边距 */
      }

      .baseline-grid h2 {
        line-height: 48px; /* 2倍行高 */
        margin: 24px 0; /* 保持基线对齐 */
      }
    </style>
  </head>
  <body>
    <div class="vertical-center-text">单行文本垂直居中</div>

    <div class="icon-text-alignment">
      <span class="icon"></span>
      <span>图标与文本对齐示例</span>
    </div>

    <div class="multi-line-alignment">
      <div>
        <span class="label">标签：</span>
        <span class="content"
          >这是一段比较长的内容，可能会换行，需要与标签顶部对齐。</span
        >
      </div>
    </div>

    <div class="baseline-grid">
      <h2>标题</h2>
      <p>第一段文本，使用基线网格确保垂直节奏。</p>
      <p>第二段文本，保持相同的行高和间距。</p>
    </div>
  </body>
</html>
```

### 流式布局模型

#### 流动布局基础

```css
/* 流动布局（Liquid Layout） */
.liquid-layout {
  /* 1. 百分比宽度 */
  width: 80%; /* 相对于父元素宽度 */
  max-width: 1200px; /* 最大宽度限制 */
  min-width: 320px; /* 最小宽度限制 */

  /* 2. 响应式内边距 */
  padding: 2%; /* 相对于父元素宽度 */
  padding: 20px 5%; /* 混合单位 */

  /* 3. 流动图片 */
  img {
    max-width: 100%; /* 不超过容器宽度 */
    height: auto; /* 保持宽高比 */
  }

  /* 4. 流动网格 */
  .fluid-grid {
    width: 23%; /* 4列布局，考虑margin */
    margin: 1%;
    float: left;
  }
}

/* 流动布局容器 */
.fluid-container {
  width: 90%; /* 相对宽度 */
  margin: 0 auto; /* 水平居中 */

  /* 响应式断点 */
  @media (min-width: 768px) {
    width: 750px;
  }

  @media (min-width: 992px) {
    width: 970px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
}
```

#### 弹性流动布局

```css
/* 弹性流动布局（Flexible Fluid Layout） */
.flexible-fluid {
  /* 使用calc()进行灵活计算 */
  width: calc(100% - 40px); /* 100%宽度减去固定边距 */
  width: calc(50% - 20px); /* 两列布局，考虑间距 */

  /* 使用min()和max()函数 */
  width: min(800px, 90%); /* 不超过800px，但最大为90% */
  width: max(300px, 50%); /* 至少300px，或50% */

  /* 使用clamp()函数 */
  width: clamp(300px, 50%, 800px); /* 最小值300px，首选50%，最大值800px */

  /* 流体字体大小 */
  font-size: calc(16px + 0.5vw); /* 基础16px，加上视口宽度的0.5% */
  font-size: clamp(16px, 2vw, 24px); /* 响应式字体大小 */
}

/* 流动间距系统 */
.fluid-spacing {
  /* 使用rem作为基础单位 */
  --spacing-unit: 0.5rem; /* 8px（假设根字体大小为16px） */

  .small {
    margin: var(--spacing-unit);
  }
  .medium {
    margin: calc(var(--spacing-unit) * 2);
  }
  .large {
    margin: calc(var(--spacing-unit) * 4);
  }

  /* 响应式间距 */
  @media (min-width: 768px) {
    --spacing-unit: 0.75rem; /* 12px */
  }
}
```

### 流式布局控制

#### 溢出控制

```css
/* overflow 属性详解 */
.overflow-control {
  /* 1. 可见（默认） */
  overflow: visible; /* 内容可以溢出容器 */

  /* 2. 隐藏 */
  overflow: hidden; /* 裁剪溢出内容 */

  /* 3. 滚动 */
  overflow: scroll; /* 总是显示滚动条 */
  overflow: auto; /* 需要时显示滚动条 */

  /* 4. 分别控制水平和垂直 */
  overflow-x: hidden; /* 水平方向隐藏 */
  overflow-y: auto; /* 垂直方向自动滚动 */

  /* 5. 溢出内容处理 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
  white-space: nowrap; /* 配合使用，不换行 */
}
```

#### 可见性控制

```css
/* visibility 属性 */
.visibility-control {
  /* 1. 可见 */
  visibility: visible; /* 默认值，元素可见 */

  /* 2. 隐藏但保留空间 */
  visibility: hidden; /* 元素不可见，但仍占据空间 */

  /* 3. 折叠（仅表格元素） */
  visibility: collapse; /* 隐藏表格行/列，不占空间 */

  /* 与display: none的区别 */
  .hidden-space {
    visibility: hidden; /* 保留空间，可影响布局 */
  }

  .hidden-no-space {
    display: none; /* 不保留空间，不影响布局 */
  }
}

/* opacity 属性 */
.opacity-control {
  opacity: 1; /* 完全不透明 */
  opacity: 0.5; /* 50%透明 */
  opacity: 0; /* 完全透明 */

  /* 与visibility的区别 */
  .transparent {
    opacity: 0; /* 透明但可交互 */
    pointer-events: all; /* 允许交互 */
  }

  .invisible {
    visibility: hidden; /* 不可见也不可交互 */
    pointer-events: none; /* 禁止交互 */
  }
}
```

#### 显示控制

```css
/* display 属性在文档流中的影响 */
.display-in-flow {
  /* 1. 块级元素 */
  display: block; /* 创建块级框，换行显示 */
  display: flow-root; /* 创建BFC的块级框 */

  /* 2. 行内元素 */
  display: inline; /* 创建行内框，不换行 */

  /* 3. 行内块元素 */
  display: inline-block; /* 创建行内级块容器 */

  /* 4. 列表项 */
  display: list-item; /* 表现为列表项 */

  /* 5. 表格相关 */
  display: table; /* 表现为表格 */
  display: table-row; /* 表现为表格行 */
  display: table-cell; /* 表现为表格单元格 */

  /* 6. 内容显示 */
  display: contents; /* 元素本身不生成框，子元素正常显示 */
}
```

## 浮动布局

### float 属性

#### 基本浮动

```css
/* float 属性基础 */
.float-basic {
  /* 1. 无浮动（默认） */
  float: none;

  /* 2. 左浮动 */
  float: left; /* 元素向左浮动 */

  /* 3. 右浮动 */
  float: right; /* 元素向右浮动 */

  /* 4. 内联起始/结束（逻辑属性） */
  float: inline-start; /* 根据书写方向浮动 */
  float: inline-end;
}

/* 浮动元素特性 */
.float-characteristics {
  /* 1. 脱离文档流 */
  /* 浮动元素会脱离正常文档流，但不完全脱离（仍会影响文本） */

  /* 2. 块级框 */
  /* 浮动元素会自动变为块级框（类似display: block） */

  /* 3. 位置特性 */
  /* 向左/右移动直到碰到包含框或另一个浮动元素 */

  /* 4. 环绕效果 */
  /* 后续内联内容会环绕浮动元素 */

  /* 5. 高度塌陷 */
  /* 父元素如果不包含浮动，高度会塌陷为0 */
}
```

#### 浮动示例

```css
/* 基础浮动布局 */
.basic-float-layout {
  /* 两列浮动布局 */
  .left-column {
    float: left;
    width: 70%;
    background: #3498db;
  }

  .right-column {
    float: right;
    width: 30%;
    background: #2ecc71;
  }

  /* 清除浮动 */
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
}

/* 多列浮动网格 */
.float-grid-system {
  /* 3列网格 */
  .grid-item {
    float: left;
    width: 31.333%; /* (100% - 2*2%) / 3 */
    margin: 1%;
    box-sizing: border-box; /* 包括内边距和边框 */
  }

  /* 4列网格 */
  .four-columns .grid-item {
    width: 23%; /* (100% - 3*2%) / 4 */
    margin: 1%;
  }

  /* 响应式浮动网格 */
  @media (max-width: 768px) {
    .grid-item {
      width: 48%; /* 2列布局 */
      margin: 1%;
    }
  }

  @media (max-width: 480px) {
    .grid-item {
      width: 98%; /* 1列布局 */
      margin: 1%;
    }
  }
}
```

### clear 属性

#### 清除浮动

```css
/* clear 属性详解 */
.clear-property {
  /* 1. 不清除（默认） */
  clear: none;

  /* 2. 清除左浮动 */
  clear: left; /* 元素必须出现在左浮动元素下方 */

  /* 3. 清除右浮动 */
  clear: right; /* 元素必须出现在右浮动元素下方 */

  /* 4. 清除两侧浮动 */
  clear: both; /* 元素必须出现在所有浮动元素下方 */

  /* 5. 逻辑值 */
  clear: inline-start;
  clear: inline-end;
}

/* clear 使用场景 */
.clear-usage {
  /* 1. 阻止元素环绕浮动 */
  .no-wrap {
    clear: both; /* 清除两侧浮动，不环绕 */
  }

  /* 2. 创建新行 */
  .new-row {
    clear: left; /* 左浮动元素下方开始新行 */
  }

  /* 3. 响应式清除 */
  @media (max-width: 768px) {
    .responsive-clear {
      clear: both; /* 小屏幕下清除浮动 */
    }
  }
}
```

#### clear 实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* clear 基础示例 */
      .clear-demo {
        margin: 20px 0;
      }

      .clear-demo .float-box {
        float: left;
        width: 100px;
        height: 100px;
        background: #3498db;
        margin: 10px;
      }

      .clear-demo .text-box {
        background: #2ecc71;
        padding: 10px;

        /* 不设置clear：文本会环绕浮动元素 */
        /* clear: left;  清除左浮动，文本在下方显示 */
        /* clear: right; 清除右浮动（如果右浮动元素存在） */
        /* clear: both;  清除两侧浮动 */
      }

      /* clear 创建网格行 */
      .clear-grid {
        width: 300px;
      }

      .clear-grid .item {
        float: left;
        width: 90px;
        height: 90px;
        background: #e74c3c;
        margin: 5px;
      }

      .clear-grid .new-row {
        clear: left; /* 创建新行 */
      }

      /* 复杂clear使用 */
      .complex-clear {
        width: 400px;
      }

      .complex-clear .left {
        float: left;
        width: 150px;
        height: 150px;
        background: #3498db;
      }

      .complex-clear .right {
        float: right;
        width: 150px;
        height: 100px;
        background: #2ecc71;
      }

      .complex-clear .middle {
        /* 需要清除两侧浮动才能正确显示在中间 */
        clear: both;
        background: #f39c12;
        height: 50px;
        margin-top: 10px;
      }
    </style>
  </head>
  <body>
    <div class="clear-demo">
      <div class="float-box"></div>
      <div class="text-box">
        这段文本默认会环绕在浮动元素的周围。
        使用clear属性可以控制文本的显示位置。
      </div>
    </div>

    <div class="clear-grid">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item new-row">4（新行）</div>
      <div class="item">5</div>
    </div>

    <div class="complex-clear">
      <div class="left">左浮动</div>
      <div class="right">右浮动</div>
      <div class="middle">清除两侧浮动的中间内容</div>
    </div>
  </body>
</html>
```

### 浮动清除技术

#### 传统清除方法

```css
/* 1. 空元素清除法 */
.empty-clear {
  /* 在浮动元素后添加空元素 */
  .clear {
    clear: both;
    height: 0;
    font-size: 0;
    line-height: 0;
  }
}

/* 2. 父元素overflow法 */
.overflow-clear {
  overflow: hidden; /* 或auto/scroll */
  /* 创建BFC包含浮动元素 */

  /* 缺点：可能裁剪内容或显示滚动条 */
}

/* 3. 浮动父元素法 */
.float-parent-clear {
  float: left; /* 或right */
  width: 100%;
  /* 父元素浮动也能包含子浮动元素 */

  /* 缺点：影响父元素本身的布局 */
}
```

#### 现代清除方法

```css
/* 4. 伪元素清除法（推荐） */
.clearfix::after {
  content: "";
  display: table; /* 或block */
  clear: both;
}

/* 5. 双伪元素清除法（支持旧版IE） */
.clearfix::before,
.clearfix::after {
  content: "";
  display: table;
}

.clearfix::after {
  clear: both;
}

.clearfix {
  *zoom: 1; /* IE6/7触发hasLayout */
}

/* 6. 微清除法 */
.micro-clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* 7. 使用flow-root（现代方法） */
.flow-root-clear {
  display: flow-root; /* 专门用于创建BFC清除浮动 */
}
```

#### 清除浮动最佳实践

```css
/* 可复用的清除浮动类 */
.clearfix {
  /* 现代浏览器 */
  &::after {
    content: "";
    display: table;
    clear: both;
  }

  /* 旧版IE支持 */
  *zoom: 1;
}

/* 响应式清除 */
.responsive-clear {
  .float-item {
    float: left;
    width: 50%;

    @media (max-width: 768px) {
      float: none;
      width: 100%;
    }
  }
}

/* 清除浮动工具类 */
.u-clearfix {
  @extend .clearfix;
}
.u-clear-left {
  clear: left;
}
.u-clear-right {
  clear: right;
}
.u-clear-both {
  clear: both;
}
```

### 浮动布局模式

#### 多列布局

```css
/* 经典两栏布局 */
.two-column-layout {
  .sidebar {
    float: left;
    width: 200px;
    background: #3498db;
  }

  .main-content {
    margin-left: 220px; /* 侧边栏宽度 + 间距 */
    background: #2ecc71;
  }

  /* 清除浮动 */
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

/* 经典三栏布局 */
.three-column-layout {
  .left-sidebar {
    float: left;
    width: 200px;
    background: #3498db;
  }

  .right-sidebar {
    float: right;
    width: 200px;
    background: #e74c3c;
  }

  .main-content {
    margin: 0 220px; /* 两侧边栏宽度 + 间距 */
    background: #2ecc71;
  }

  /* 清除浮动 */
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}
```

#### 网格系统

```css
/* 12列浮动网格系统 */
.float-grid-12 {
  /* 行容器 */
  .row {
    margin-left: -15px;
    margin-right: -15px;

    &::after {
      content: "";
      display: table;
      clear: both;
    }
  }

  /* 列基础样式 */
  .col {
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
  }

  /* 列宽定义 */
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

  /* 响应式调整 */
  @media (max-width: 768px) {
    .col {
      width: 100%;
      float: none;
    }
  }
}
```

#### 图文混排

```css
/* 图文环绕布局 */
.image-text-wrap {
  .article-image {
    float: left;
    width: 300px;
    margin: 0 20px 20px 0;

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .article-content {
    /* 自动环绕图片 */

    /* 如果需要取消环绕 */
    &.no-wrap {
      overflow: hidden; /* 创建BFC取消环绕 */
    }
  }

  /* 多图环绕 */
  .multiple-images {
    .image-left {
      float: left;
      margin: 0 20px 20px 0;
    }

    .image-right {
      float: right;
      margin: 0 0 20px 20px;
    }

    .clear-text {
      clear: both; /* 清除两侧浮动 */
    }
  }
}
```

### 浮动布局局限

#### 常见问题与解决

```css
/* 1. 高度塌陷问题 */
.height-collapse {
  .parent {
    border: 2px solid #e74c3c;
    /* 不包含浮动子元素，高度为0 */

    /* 解决方案 */
    overflow: hidden; /* 方法1：创建BFC */

    &::after {
      /* 方法2：清除浮动 */
      content: "";
      display: table;
      clear: both;
    }

    float: left; /* 方法3：父元素浮动 */
    width: 100%;
  }

  .child {
    float: left;
    width: 100px;
    height: 100px;
    background: #3498db;
  }
}

/* 2. 浮动元素超出容器 */
.float-overflow {
  .container {
    width: 300px;
    border: 2px solid #e74c3c;

    /* 浮动元素可能超出容器 */
    overflow: hidden; /* 解决方案：裁剪溢出 */
  }

  .float-item {
    float: left;
    width: 150px;
    height: 100px;
    background: #3498db;
    margin: 10px;
  }
}

/* 3. 浮动元素不对齐 */
.float-alignment-issue {
  .float-items {
    /* 浮动元素高度不同会导致不对齐 */
  }

  /* 解决方案1：固定高度 */
  .fixed-height {
    height: 200px;
  }

  /* 解决方案2：使用inline-block */
  .inline-block-item {
    display: inline-block;
    vertical-align: top;
  }

  /* 解决方案3：使用flexbox */
  .flex-container {
    display: flex;
    flex-wrap: wrap;
  }
}
```

#### 浮动与 Flexbox/Grid 对比

```css
/* 浮动布局的局限性 */
.float-limitations {
  /* 1. 垂直居中困难 */
  .vertical-center {
    /* 浮动元素难以实现垂直居中 */
  }

  /* 2. 等高列实现复杂 */
  .equal-height {
    /* 需要额外技巧实现等高列 */
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }

  /* 3. 顺序控制有限 */
  .order-control {
    /* 无法改变视觉顺序 */
  }

  /* 4. 现代替代方案 */
  .modern-alternatives {
    /* Flexbox解决方案 */
    .flex-solution {
      display: flex;
      align-items: center; /* 垂直居中 */
      justify-content: center; /* 水平居中 */
    }

    /* Grid解决方案 */
    .grid-solution {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }
  }
}
```

## 定位布局

### position 属性概述

#### 定位基础

```css
/* position 属性值 */
.position-types {
  /* 1. 静态定位（默认） */
  position: static; /* 元素在正常文档流中 */

  /* 2. 相对定位 */
  position: relative; /* 相对于自身位置偏移 */

  /* 3. 绝对定位 */
  position: absolute; /* 相对于最近定位祖先 */

  /* 4. 固定定位 */
  position: fixed; /* 相对于视口定位 */

  /* 5. 粘性定位 */
  position: sticky; /* 相对与固定混合定位 */
}

/* 偏移属性 */
.offset-properties {
  /* 用于relative/absolute/fixed/sticky定位的元素 */

  /* 1. 顶部偏移 */
  top: 0; /* 距离参考顶部的距离 */
  top: 10px;
  top: 10%;
  top: auto; /* 默认值 */

  /* 2. 右侧偏移 */
  right: 0;

  /* 3. 底部偏移 */
  bottom: 0;

  /* 4. 左侧偏移 */
  left: 0;

  /* 5. 使用规则 */
  /* 通常只设置两个相对的偏移属性 */
  /* 例如：top和left，或bottom和right */
}
```

#### 定位上下文

```css
/* 包含块（Containing Block）概念 */
.containing-block {
  /* 1. 静态/相对定位元素 */
  /* 包含块是最近的块级祖先元素的内容区 */

  /* 2. 绝对定位元素 */
  /* 包含块是最近的非static定位祖先 */
  /* 如果没有，则是初始包含块（视口） */

  /* 3. 固定定位元素 */
  /* 包含块是视口（viewport） */

  /* 4. 粘性定位元素 */
  /* 包含块是最近的滚动祖先 */

  /* 确定包含块的方法 */
  .find-containing-block {
    position: absolute;
    /* 包含块 = 最近position不为static的祖先 */

    /* 百分比值基于包含块计算 */
    width: 50%; /* 包含块宽度的50% */
    height: 50%; /* 包含块高度的50% */
    top: 10%; /* 包含块高度的10% */
    left: 10%; /* 包含块宽度的10% */
  }
}
```

### relative 相对定位

#### 基本特性

```css
/* relative 定位详解 */
.relative-positioning {
  /* 1. 基本用法 */
  position: relative;

  /* 2. 偏移特性 */
  top: 10px; /* 向下偏移10px */
  left: 20px; /* 向右偏移20px */
  right: -30px; /* 向左偏移30px */
  bottom: -40px; /* 向上偏移40px */

  /* 3. 保留原空间 */
  /* 元素偏移后，原位置空间保留 */

  /* 4. 创建定位上下文 */
  /* 为绝对定位子元素提供包含块 */

  /* 5. 不影响其他元素 */
  /* 不会脱离文档流，其他元素布局不受影响 */
}
```

#### 相对定位应用

```css
/* 1. 微调元素位置 */
.position-tweaking {
  /* 稍微调整元素位置 */
  position: relative;
  top: -2px; /* 上移2像素 */
  left: 3px; /* 右移3像素 */

  /* 创建重叠效果 */
  .overlap {
    position: relative;
    z-index: 1; /* 控制堆叠顺序 */
  }
}

/* 2. 创建定位上下文 */
.positioning-context {
  position: relative; /* 创建定位上下文 */

  .absolute-child {
    position: absolute;
    top: 0;
    left: 0;
    /* 相对于父元素定位 */
  }
}

/* 3. 视觉层次调整 */
.visual-hierarchy {
  /* 创建阴影效果 */
  .shadow-effect {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 5px;
      left: 5px;
      right: -5px;
      bottom: -5px;
      background: rgba(0, 0, 0, 0.1);
      z-index: -1;
    }
  }

  /* 创建徽章效果 */
  .badge {
    position: relative;

    &::before {
      content: "New";
      position: absolute;
      top: -10px;
      right: -10px;
      background: #e74c3c;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 12px;
    }
  }
}
```

#### 相对定位实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 基本相对定位 */
      .relative-demo {
        margin: 20px 0;
      }

      .relative-demo .box {
        width: 100px;
        height: 100px;
        background: #3498db;
        color: white;
        text-align: center;
        line-height: 100px;
        margin: 10px;
      }

      .relative-demo .moved {
        position: relative;
        top: 20px;
        left: 30px;
        background: #2ecc71;
      }

      /* 创建定位上下文 */
      .context-demo {
        position: relative;
        width: 300px;
        height: 200px;
        border: 2px solid #e74c3c;
        margin: 20px 0;
      }

      .context-demo .absolute-box {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 100px;
        height: 50px;
        background: #3498db;
        color: white;
        text-align: center;
        line-height: 50px;
      }

      /* 微调布局 */
      .tweaking-demo {
        margin: 20px 0;
      }

      .tweaking-demo input {
        padding: 8px;
        border: 1px solid #ddd;
      }

      .tweaking-demo .icon {
        position: relative;
        top: 2px;
        margin-left: 5px;
        color: #3498db;
      }

      /* 重叠效果 */
      .overlap-demo {
        position: relative;
        width: 200px;
        height: 200px;
        margin: 20px 0;
      }

      .overlap-demo .layer1 {
        position: relative;
        width: 150px;
        height: 150px;
        background: #3498db;
        z-index: 1;
      }

      .overlap-demo .layer2 {
        position: relative;
        width: 150px;
        height: 150px;
        background: #2ecc71;
        top: -100px;
        left: 50px;
        z-index: 2;
      }
    </style>
  </head>
  <body>
    <div class="relative-demo">
      <div class="box">正常位置</div>
      <div class="box moved">相对定位移动</div>
      <div class="box">后面元素不受影响</div>
    </div>

    <div class="context-demo">
      相对定位容器
      <div class="absolute-box">绝对定位子元素</div>
    </div>

    <div class="tweaking-demo">
      <input type="text" placeholder="输入文本" />
      <span class="icon">ℹ️</span>
    </div>

    <div class="overlap-demo">
      <div class="layer1">层1</div>
      <div class="layer2">层2</div>
    </div>
  </body>
</html>
```

### absolute 绝对定位

#### 基本特性

```css
/* absolute 定位详解 */
.absolute-positioning {
  /* 1. 基本用法 */
  position: absolute;

  /* 2. 脱离文档流 */
  /* 元素从文档流中完全移除 */
  /* 不占据空间，不影响其他元素布局 */

  /* 3. 定位基准 */
  /* 相对于最近的非static定位祖先 */
  /* 如果没有，则相对于初始包含块（视口） */

  /* 4. 偏移属性 */
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* 5. 创建层叠上下文 */
  /* 绝对定位元素会创建新的层叠上下文 */
}
```

#### 绝对定位应用

```css
/* 1. 覆盖层/遮罩 */
.overlay-mask {
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
  }
}

/* 2. 图标/角标定位 */
.icon-badge-positioning {
  .container {
    position: relative;
    display: inline-block;
  }

  .badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }

  .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #3498db;
  }
}

/* 3. 复杂布局定位 */
.complex-layout {
  .parent {
    position: relative;
    height: 400px;
  }

  .corner-top-left {
    position: absolute;
    top: 0;
    left: 0;
  }

  .corner-top-right {
    position: absolute;
    top: 0;
    right: 0;
  }

  .corner-bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .corner-bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
```

#### 绝对定位技巧

```css
/* 1. 全屏覆盖 */
.full-screen-cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* 或者使用简写 */
  position: absolute;
  inset: 0; /* top:0; right:0; bottom:0; left:0; 的简写 */
}

/* 2. 居中定位 */
.center-positioning {
  /* 方法1：传统方法（需知宽高） */
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px; /* 高度的一半 */
  margin-left: -100px; /* 宽度的一半 */
  width: 200px;
  height: 100px;

  /* 方法2：transform方法（无需知宽高） */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 方法3：flexbox方法（在flex容器中） */
  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* 方法4：grid方法（在grid容器中） */
  .grid-container {
    display: grid;
    place-items: center;
  }
}

/* 3. 拉伸填充 */
.stretch-fill {
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  /* 在指定边界内拉伸填充 */
}

/* 4. 层叠顺序控制 */
.z-index-control {
  position: absolute;
  z-index: 1; /* 控制堆叠顺序 */

  .higher {
    z-index: 2;
  }

  .lower {
    z-index: 0;
  }
}
```

#### 绝对定位实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 基本绝对定位 */
      .absolute-demo {
        position: relative;
        width: 300px;
        height: 200px;
        border: 2px solid #e74c3c;
        margin: 20px 0;
      }

      .absolute-demo .box {
        position: absolute;
        width: 80px;
        height: 80px;
        background: #3498db;
        color: white;
        text-align: center;
        line-height: 80px;
      }

      .top-left {
        top: 10px;
        left: 10px;
      }

      .top-right {
        top: 10px;
        right: 10px;
      }

      .bottom-left {
        bottom: 10px;
        left: 10px;
      }

      .bottom-right {
        bottom: 10px;
        right: 10px;
      }

      /* 居中定位 */
      .center-demo {
        position: relative;
        width: 300px;
        height: 200px;
        border: 2px solid #2ecc71;
        margin: 20px 0;
      }

      .center-demo .center-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 60px;
        background: #e74c3c;
        color: white;
        text-align: center;
        line-height: 60px;
      }

      /* 下拉菜单 */
      .dropdown-demo {
        position: relative;
        display: inline-block;
        margin: 20px 0;
      }

      .dropdown-demo .trigger {
        padding: 10px 20px;
        background: #3498db;
        color: white;
        cursor: pointer;
      }

      .dropdown-demo .menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 200px;
        background: white;
        border: 1px solid #ddd;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        display: none;
      }

      .dropdown-demo:hover .menu {
        display: block;
      }

      .dropdown-demo .menu a {
        display: block;
        padding: 10px;
        color: #333;
        text-decoration: none;
      }

      .dropdown-demo .menu a:hover {
        background: #f0f0f0;
      }

      /* 工具提示 */
      .tooltip-demo {
        position: relative;
        display: inline-block;
        margin: 20px 0;
        padding: 10px;
        background: #f0f0f0;
      }

      .tooltip-demo .tooltip {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .tooltip-demo .tooltip::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 5px solid transparent;
        border-top-color: #333;
      }

      .tooltip-demo:hover .tooltip {
        opacity: 1;
      }
    </style>
  </head>
  <body>
    <div class="absolute-demo">
      <div class="box top-left">左上</div>
      <div class="box top-right">右上</div>
      <div class="box bottom-left">左下</div>
      <div class="box bottom-right">右下</div>
    </div>

    <div class="center-demo">
      <div class="center-box">居中</div>
    </div>

    <div class="dropdown-demo">
      <div class="trigger">下拉菜单</div>
      <div class="menu">
        <a href="#">菜单项1</a>
        <a href="#">菜单项2</a>
        <a href="#">菜单项3</a>
      </div>
    </div>

    <div class="tooltip-demo">
      悬停查看工具提示
      <div class="tooltip">这是一个工具提示</div>
    </div>
  </body>
</html>
```

### fixed 固定定位

#### 基本特性

```css
/* fixed 定位详解 */
.fixed-positioning {
  /* 1. 基本用法 */
  position: fixed;

  /* 2. 脱离文档流 */
  /* 完全脱离文档流 */
  /* 不占据空间，不影响其他元素 */

  /* 3. 定位基准 */
  /* 相对于浏览器视口（viewport） */
  /* 不随页面滚动而移动 */

  /* 4. 创建层叠上下文 */
  /* 固定定位元素会创建新的层叠上下文 */

  /* 5. 性能考虑 */
  /* 大量fixed元素可能影响滚动性能 */
}
```

#### 固定定位应用

```css
/* 1. 固定导航栏 */
.fixed-navigation {
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  /* 为固定导航栏留出空间 */
  body {
    padding-top: 60px;
  }
}

/* 2. 侧边栏/面板 */
.fixed-sidebar {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 250px;
    background: #2c3e50;
    color: white;
    z-index: 900;
  }

  /* 主内容避开侧边栏 */
  .main-content {
    margin-left: 250px;
  }
}

/* 3. 模态框/弹窗 */
.fixed-modal {
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
  }

  .modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 30px;
    border-radius: 8px;
    z-index: 2001;
  }
}

/* 4. 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 800;

  &.visible {
    opacity: 1;
  }
}
```

#### 固定定位技巧

```css
/* 1. 视口单位结合 */
.viewport-units {
  /* 使用vh/vw单位 */
  .full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }

  /* 百分比视口定位 */
  .viewport-position {
    position: fixed;
    top: 10vh;
    left: 10vw;
    right: 10vw;
    bottom: 10vh;
  }
}

/* 2. 响应式固定定位 */
.responsive-fixed {
  .fixed-element {
    position: fixed;
    bottom: 20px;
    right: 20px;

    /* 移动端调整位置 */
    @media (max-width: 768px) {
      bottom: 10px;
      right: 10px;
    }

    /* 小屏幕隐藏 */
    @media (max-width: 480px) {
      position: static;
      margin-top: 20px;
    }
  }
}

/* 3. 固定定位与transform */
.fixed-transform {
  /* 注意：transform会创建新的包含块 */
  .parent {
    transform: translateX(0); /* 创建包含块 */
  }

  .fixed-child {
    position: fixed;
    /* 如果父元素有transform，fixed将相对于该父元素 */
  }
}

/* 4. 层叠顺序管理 */
.fixed-z-index {
  /* 定义z-index层级系统 */
  :root {
    --z-index-backdrop: 1000;
    --z-index-modal: 1100;
    --z-index-dropdown: 1200;
    --z-index-tooltip: 1300;
    --z-index-toast: 1400;
  }

  .modal {
    position: fixed;
    z-index: var(--z-index-modal);
  }
}
```

#### 固定定位实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 基本固定定位 */
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }

      /* 固定导航栏 */
      .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: #2c3e50;
        color: white;
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 1000;
      }

      /* 主内容避开导航栏 */
      .main-content {
        padding-top: 80px;
        padding-left: 20px;
        padding-right: 20px;
        height: 2000px; /* 模拟长内容 */
      }

      /* 固定侧边栏 */
      .fixed-sidebar {
        position: fixed;
        top: 60px; /* 在导航栏下方 */
        left: 0;
        bottom: 0;
        width: 200px;
        background: #34495e;
        color: white;
        padding: 20px;
        z-index: 900;
      }

      /* 主内容避开侧边栏 */
      .main-content {
        margin-left: 220px;
      }

      /* 模态框 */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 2000;
      }

      .modal-content {
        background: white;
        padding: 30px;
        border-radius: 8px;
        width: 400px;
        max-width: 90%;
      }

      .show-modal {
        padding: 10px 20px;
        background: #3498db;
        color: white;
        border: none;
        cursor: pointer;
      }

      /* 返回顶部按钮 */
      .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #e74c3c;
        color: white;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 800;
      }

      .back-to-top.visible {
        opacity: 1;
      }
    </style>
  </head>
  <body>
    <header class="fixed-header">
      <div class="logo">网站Logo</div>
      <nav>
        <a href="#" style="color: white; margin: 0 10px;">首页</a>
        <a href="#" style="color: white; margin: 0 10px;">关于</a>
        <a href="#" style="color: white; margin: 0 10px;">联系</a>
      </nav>
    </header>

    <aside class="fixed-sidebar">
      <h3>侧边栏</h3>
      <ul>
        <li>菜单项1</li>
        <li>菜单项2</li>
        <li>菜单项3</li>
      </ul>
    </aside>

    <main class="main-content">
      <h1>主内容区</h1>
      <p>这是一个很长的页面，用于演示固定定位元素。</p>
      <button class="show-modal">打开模态框</button>
      <p>继续向下滚动...</p>
      <div style="height: 1000px;"></div>
      <p>页面底部</p>
    </main>

    <div class="modal-overlay" id="modal">
      <div class="modal-content">
        <h2>模态框标题</h2>
        <p>这是一个模态框内容。</p>
        <button onclick="document.getElementById('modal').style.display='none'">
          关闭
        </button>
      </div>
    </div>

    <button class="back-to-top" id="backToTop">↑</button>

    <script>
      // 显示模态框
      document
        .querySelector(".show-modal")
        .addEventListener("click", function () {
          document.getElementById("modal").style.display = "flex";
        });

      // 返回顶部按钮
      const backToTop = document.getElementById("backToTop");

      window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
          backToTop.classList.add("visible");
        } else {
          backToTop.classList.remove("visible");
        }
      });

      backToTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    </script>
  </body>
</html>
```

### sticky 粘性定位

#### 基本特性

```css
/* sticky 定位详解 */
.sticky-positioning {
  /* 1. 基本用法 */
  position: sticky;

  /* 2. 混合定位 */
  /* 相对定位和固定定位的混合 */
  /* 在阈值范围内表现如relative */
  /* 超出阈值表现如fixed */

  /* 3. 阈值设置 */
  top: 0; /* 当元素距离视口顶部>=0px时变为固定 */
  bottom: 0; /* 当元素距离视口底部>=0px时变为固定 */

  /* 4. 包含块 */
  /* 相对于最近的滚动祖先 */
  /* 滚动祖先：overflow不是visible的元素 */

  /* 5. 浏览器支持 */
  /* 现代浏览器支持良好，IE不支持 */

  /* 6. 使用条件 */
  /* 必须指定至少一个阈值（top/right/bottom/left） */
}
```

#### 粘性定位应用

```css
/* 1. 粘性导航栏 */
.sticky-navigation {
  .sticky-nav {
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  /* 无需为body添加padding-top */
  /* 当导航栏变为fixed时自动脱离文档流 */
}

/* 2. 粘性表头 */
.sticky-table {
  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }

  .sticky-header {
    position: sticky;
    top: 0;
    background: #f8f9fa;
    z-index: 10;
  }

  .sticky-column {
    position: sticky;
    left: 0;
    background: white;
    z-index: 5;
  }
}

/* 3. 粘性侧边栏 */
.sticky-sidebar {
  .sidebar {
    position: sticky;
    top: 20px; /* 距离顶部20px时固定 */
    align-self: flex-start; /* 在flex容器中需要 */
  }

  /* 在滚动容器内 */
  .scroll-container {
    height: 500px;
    overflow-y: auto;
  }
}

/* 4. 进度指示器 */
.sticky-progress {
  .progress-bar {
    position: sticky;
    top: 0;
    height: 5px;
    background: #3498db;
    z-index: 50;
  }

  .progress-indicator {
    width: 0%;
    height: 100%;
    background: #2ecc71;
    transition: width 0.3s;
  }
}
```

#### 粘性定位技巧

```css
/* 1. 多级粘性 */
.multi-level-sticky {
  .level-1 {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .level-2 {
    position: sticky;
    top: 60px; /* 在level-1下方 */
    z-index: 9;
  }
}

/* 2. 底部粘性 */
.bottom-sticky {
  .sticky-footer {
    position: sticky;
    bottom: 0;
    background: white;
    border-top: 1px solid #ddd;
  }

  /* 在表格中 */
  .table-footer {
    position: sticky;
    bottom: 0;
    background: #f8f9fa;
  }
}

/* 3. 响应式粘性 */
.responsive-sticky {
  .sticky-element {
    position: sticky;
    top: 0;

    /* 移动端调整 */
    @media (max-width: 768px) {
      position: static; /* 小屏幕取消粘性 */
    }
  }
}

/* 4. 粘性定位与transform */
.sticky-transform {
  /* 注意：transform会破坏粘性定位 */
  .parent {
    transform: translateX(0); /* 子元素粘性定位可能失效 */
  }

  /* 解决方案：避免在粘性元素的祖先上使用transform */
}

/* 5. 粘性定位回退方案 */
.sticky-fallback {
  .sticky-header {
    position: sticky;
    top: 0;
  }

  @supports not (position: sticky) {
    /* 不支持sticky的浏览器回退 */
    .sticky-header {
      position: relative;
    }

    /* 使用JavaScript实现类似效果 */
  }
}
```

#### 粘性定位实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 基本粘性定位 */
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }

      /* 粘性导航栏 */
      .sticky-header {
        position: sticky;
        top: 0;
        background: #2c3e50;
        color: white;
        padding: 15px 20px;
        z-index: 100;
      }

      /* 粘性子导航 */
      .sticky-subnav {
        position: sticky;
        top: 50px; /* 在主导航下方 */
        background: #3498db;
        color: white;
        padding: 10px 20px;
        z-index: 90;
      }

      /* 主内容 */
      .main-content {
        padding: 20px;
      }

      .section {
        height: 800px;
        padding: 20px;
        margin: 20px 0;
        background: #f0f0f0;
        border: 1px solid #ddd;
      }

      /* 粘性侧边栏 */
      .sticky-sidebar-container {
        display: flex;
        gap: 20px;
        margin: 20px 0;
      }

      .content {
        flex: 1;
        height: 1200px;
        background: #ecf0f1;
        padding: 20px;
      }

      .sidebar {
        width: 250px;
        position: sticky;
        top: 20px;
        align-self: flex-start;
        background: #34495e;
        color: white;
        padding: 20px;
        height: 300px;
      }

      /* 粘性表格 */
      .sticky-table-container {
        height: 400px;
        overflow-y: auto;
        margin: 20px 0;
        border: 1px solid #ddd;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
      }

      .sticky-thead th {
        position: sticky;
        top: 0;
        background: #2c3e50;
        color: white;
        z-index: 10;
      }

      .sticky-first-col td:first-child {
        position: sticky;
        left: 0;
        background: white;
        z-index: 5;
      }

      /* 底部粘性元素 */
      .sticky-footer {
        position: sticky;
        bottom: 0;
        background: white;
        padding: 15px 20px;
        border-top: 2px solid #3498db;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <header class="sticky-header">
      <h1>主导航栏（粘性）</h1>
    </header>

    <nav class="sticky-subnav">
      <span>子导航1</span> | <span>子导航2</span> |
      <span>子导航3</span>
    </nav>

    <main class="main-content">
      <div class="section">
        <h2>第一部分</h2>
        <p>向下滚动查看粘性效果...</p>
      </div>

      <div class="sticky-sidebar-container">
        <div class="content">
          <h2>主要内容区</h2>
          <p>这是一个很长的内容区域...</p>
          <div style="height: 1000px;"></div>
        </div>
        <aside class="sidebar">
          <h3>侧边栏（粘性）</h3>
          <p>侧边栏内容会保持粘性定位。</p>
        </aside>
      </div>

      <div class="sticky-table-container">
        <table>
          <thead class="sticky-thead">
            <tr>
              <th>固定表头</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>城市</th>
              <th>职业</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>张三</td>
              <td>25</td>
              <td>北京</td>
              <td>工程师</td>
            </tr>
            <tr>
              <td>2</td>
              <td>李四</td>
              <td>30</td>
              <td>上海</td>
              <td>设计师</td>
            </tr>
            <!-- 更多行... -->
            <tr>
              <td>20</td>
              <td>王五</td>
              <td>28</td>
              <td>广州</td>
              <td>产品经理</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <h2>最后部分</h2>
        <p>页面末尾...</p>
      </div>
    </main>

    <footer class="sticky-footer">
      <p>底部粘性元素 - 滚动到页面底部时可见</p>
    </footer>
  </body>
</html>
```

### 定位上下文与堆叠

#### 层叠上下文

```css
/* z-index 与层叠上下文 */
.z-index-stacking {
  /* 1. z-index 属性 */
  z-index: auto; /* 默认值，不创建层叠上下文 */
  z-index: 0; /* 创建层叠上下文 */
  z-index: 1; /* 正数，值越大越靠前 */
  z-index: -1; /* 负数，值越小越靠后 */

  /* 2. 创建层叠上下文的条件 */
  /* - 根元素（html） */
  /* - position不为static且z-index不为auto */
  /* - flex/grid容器的子元素且z-index不为auto */
  /* - opacity小于1 */
  /* - transform不为none */
  /* - filter不为none */
  /* - isolation: isolate */
  /* - will-change指定的属性 */
  /* - -webkit-overflow-scrolling: touch */

  /* 3. 层叠顺序规则（从后到前） */
  /* 1) 形成层叠上下文的元素的背景和边框 */
  /* 2) z-index为负的子堆叠上下文 */
  /* 3) 文档流中的非定位块级元素 */
  /* 4) 非定位浮动元素 */
  /* 5) 文档流中的非定位行内元素 */
  /* 6) z-index为auto的定位元素 */
  /* 7) z-index为正的子堆叠上下文 */
}
```

#### 堆叠顺序管理

```css
/* 堆叠顺序最佳实践 */
.stacking-order-management {
  /* 1. 定义z-index系统 */
  :root {
    --z-index-dropdown: 1000;
    --z-index-sticky: 1020;
    --z-index-fixed: 1030;
    --z-index-modal-backdrop: 1040;
    --z-index-modal: 1050;
    --z-index-popover: 1060;
    --z-index-tooltip: 1070;
    --z-index-toast: 1080;
  }

  /* 2. 使用定位元素 */
  .dropdown {
    position: absolute;
    z-index: var(--z-index-dropdown);
  }

  .modal {
    position: fixed;
    z-index: var(--z-index-modal);
  }

  .tooltip {
    position: absolute;
    z-index: var(--z-index-tooltip);
  }

  /* 3. 避免z-index战争 */
  .avoid-z-index-war {
    /* 问题：不断递增z-index */
    /* 解决方案：使用层级系统 */
  }

  /* 4. 隔离堆叠上下文 */
  .isolate-stacking-context {
    isolation: isolate; /* 创建独立的堆叠上下文 */

    /* 子元素的z-index只在该上下文内有效 */
    .child {
      z-index: 1; /* 只相对于父上下文 */
    }
  }
}
```

#### 定位上下文实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 层叠上下文演示 */
      body {
        margin: 0;
        padding: 20px;
        font-family: Arial, sans-serif;
      }

      .stacking-demo {
        position: relative;
        height: 300px;
        background: #f0f0f0;
        margin: 20px 0;
      }

      /* 不同z-index的元素 */
      .box {
        position: absolute;
        width: 200px;
        height: 150px;
        padding: 20px;
        color: white;
        font-weight: bold;
      }

      .box-1 {
        top: 20px;
        left: 20px;
        background: #e74c3c;
        z-index: 1;
      }

      .box-2 {
        top: 40px;
        left: 40px;
        background: #3498db;
        z-index: 2;
      }

      .box-3 {
        top: 60px;
        left: 60px;
        background: #2ecc71;
        z-index: 3;
      }

      /* 负z-index */
      .negative-zindex {
        position: relative;
        height: 200px;
        background: #34495e;
        margin: 20px 0;
      }

      .negative-zindex .background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(231, 76, 60, 0.8);
        z-index: -1; /* 在父元素背景下方 */
      }

      /* 层叠上下文隔离 */
      .isolation-demo {
        position: relative;
        height: 200px;
        margin: 20px 0;
      }

      .parent-context {
        position: relative;
        z-index: 1;
        padding: 20px;
        background: #3498db;
        isolation: isolate; /* 创建独立堆叠上下文 */
      }

      .child {
        position: absolute;
        top: 50px;
        left: 50px;
        width: 150px;
        height: 100px;
        background: #2ecc71;
        z-index: 999; /* 只在父上下文内有效 */
      }

      .outside-element {
        position: absolute;
        top: 80px;
        left: 100px;
        width: 150px;
        height: 100px;
        background: #e74c3c;
        z-index: 2; /* 在父上下文上方 */
      }

      /* transform创建层叠上下文 */
      .transform-context {
        transform: translateX(0); /* 创建层叠上下文 */
        position: relative;
        padding: 20px;
        background: #f39c12;
      }

      .transform-context .child {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 100px;
        height: 50px;
        background: #8e44ad;
        z-index: -1; /* 在transform元素背景下方 */
      }
    </style>
  </head>
  <body>
    <div class="stacking-demo">
      <div class="box box-1">z-index: 1</div>
      <div class="box box-2">z-index: 2</div>
      <div class="box box-3">z-index: 3</div>
    </div>

    <div class="negative-zindex">
      <div class="background"></div>
      <div style="position: relative; z-index: 0; color: white; padding: 20px;">
        内容区域，负z-index元素在背景下方
      </div>
    </div>

    <div class="isolation-demo">
      <div class="parent-context">
        父元素 (isolation: isolate)
        <div class="child">子元素 (z-index: 999)</div>
      </div>
      <div class="outside-element">外部元素 (z-index: 2)</div>
    </div>

    <div class="transform-context">
      有transform的元素创建层叠上下文
      <div class="child">z-index: -1的子元素</div>
    </div>
  </body>
</html>
```

## 混合布局技术

### 传统布局模式

#### 圣杯布局 (Holy Grail)

```css
/* 圣杯布局 - 传统实现 */
.holy-grail-layout {
  /* 容器设置负边距 */
  .container {
    padding-left: 200px; /* 左栏宽度 */
    padding-right: 150px; /* 右栏宽度 */
  }

  /* 所有列浮动 */
  .column {
    float: left;
    position: relative;
  }

  /* 中间内容区 */
  .center {
    width: 100%;
    background: #fff;
  }

  /* 左侧边栏 */
  .left {
    width: 200px;
    margin-left: -100%; /* 移动到最左边 */
    right: 200px; /* 再向右移动自身宽度 */
    background: #3498db;
  }

  /* 右侧边栏 */
  .right {
    width: 150px;
    margin-right: -150px; /* 移动到最右边 */
    background: #2ecc71;
  }

  /* 清除浮动 */
  .footer {
    clear: both;
  }
}
```

#### 双飞翼布局

```css
/* 双飞翼布局 - 改进版圣杯布局 */
.flying-wing-layout {
  /* 主容器 */
  .container {
    float: left;
    width: 100%;
  }

  /* 中间内容 */
  .main {
    margin-left: 200px; /* 左栏宽度 */
    margin-right: 150px; /* 右栏宽度 */
    background: #fff;
  }

  /* 左侧边栏 */
  .left {
    float: left;
    width: 200px;
    margin-left: -100%; /* 移动到容器最左边 */
    background: #3498db;
  }

  /* 右侧边栏 */
  .right {
    float: left;
    width: 150px;
    margin-left: -150px; /* 移动到容器最右边 */
    background: #2ecc71;
  }

  /* 清除浮动 */
  .clearfix::after {
    content: "";
    display: table;
    clear: both;
  }
}
```

#### 传统布局实例

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      /* 圣杯布局实例 */
      .holy-grail {
        min-width: 600px;
        margin: 20px 0;
      }

      .holy-grail header,
      .holy-grail footer {
        background: #34495e;
        color: white;
        padding: 20px;
        text-align: center;
      }

      .holy-grail .container {
        padding-left: 200px;
        padding-right: 150px;
        overflow: hidden;
      }

      .holy-grail .column {
        float: left;
        position: relative;
        padding: 20px;
        box-sizing: border-box;
        min-height: 300px;
      }

      .holy-grail .center {
        width: 100%;
        background: #ecf0f1;
      }

      .holy-grail .left {
        width: 200px;
        margin-left: -100%;
        right: 200px;
        background: #3498db;
        color: white;
      }

      .holy-grail .right {
        width: 150px;
        margin-right: -150px;
        background: #2ecc71;
        color: white;
      }

      .holy-grail footer {
        clear: both;
      }

      /* 双飞翼布局实例 */
      .flying-wing {
        margin: 20px 0;
      }

      .flying-wing header,
      .flying-wing footer {
        background: #2c3e50;
        color: white;
        padding: 20px;
        text-align: center;
      }

      .flying-wing .container {
        float: left;
        width: 100%;
      }

      .flying-wing .main {
        margin-left: 200px;
        margin-right: 150px;
        background: #ecf0f1;
        padding: 20px;
        min-height: 300px;
      }

      .flying-wing .left {
        float: left;
        width: 200px;
        margin-left: -100%;
        background: #3498db;
        color: white;
        padding: 20px;
        min-height: 300px;
      }

      .flying-wing .right {
        float: left;
        width: 150px;
        margin-left: -150px;
        background: #2ecc71;
        color: white;
        padding: 20px;
        min-height: 300px;
      }

      .flying-wing .clearfix::after {
        content: "";
        display: table;
        clear: both;
      }
    </style>
  </head>
  <body>
    <div class="holy-grail">
      <header>圣杯布局 - Header</header>
      <div class="container">
        <div class="column center">主要内容区</div>
        <div class="column left">左侧边栏</div>
        <div class="column right">右侧边栏</div>
      </div>
      <footer>Footer</footer>
    </div>

    <div class="flying-wing">
      <header>双飞翼布局 - Header</header>
      <div class="container">
        <div class="main">主要内容区</div>
      </div>
      <div class="left">左侧边栏</div>
      <div class="right">右侧边栏</div>
      <div class="clearfix"></div>
      <footer>Footer</footer>
    </div>
  </body>
</html>
```

### 现代布局演进

#### Flexbox 替代方案

```css
/* 使用Flexbox实现传统布局 */
.flexbox-layout {
  /* 圣杯布局的Flexbox实现 */
  .holy-grail-flex {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .holy-grail-flex .main-content {
    display: flex;
    flex: 1;
  }

  .holy-grail-flex .center {
    flex: 1;
    order: 2;
    background: #ecf0f1;
  }

  .holy-grail-flex .left {
    width: 200px;
    order: 1;
    background: #3498db;
  }

  .holy-grail-flex .right {
    width: 150px;
    order: 3;
    background: #2ecc71;
  }

  /* 双飞翼布局的Flexbox实现 */
  .flying-wing-flex {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .flying-wing-flex .content-wrapper {
    display: flex;
    flex: 1;
  }

  .flying-wing-flex .main {
    flex: 1;
    background: #ecf0f1;
  }

  .flying-wing-flex .left {
    width: 200px;
    background: #3498db;
  }

  .flying-wing-flex .right {
    width: 150px;
    background: #2ecc71;
  }
}
```

#### Grid 替代方案

```css
/* 使用Grid实现传统布局 */
.grid-layout {
  /* 圣杯布局的Grid实现 */
  .holy-grail-grid {
    display: grid;
    grid-template:
      "header header header" 80px
      "left main right" 1fr
      "footer footer footer" 80px
      / 200px 1fr 150px;
    min-height: 100vh;
  }

  .holy-grail-grid header {
    grid-area: header;
  }
  .holy-grail-grid .left {
    grid-area: left;
  }
  .holy-grail-grid .main {
    grid-area: main;
  }
  .holy-grail-grid .right {
    grid-area: right;
  }
  .holy-grail-grid footer {
    grid-area: footer;
  }

  /* 双飞翼布局的Grid实现 */
  .flying-wing-grid {
    display: grid;
    grid-template-columns: 200px 1fr 150px;
    grid-template-rows: 80px 1fr 80px;
    min-height: 100vh;
  }

  .flying-wing-grid header {
    grid-column: 1 / -1;
  }

  .flying-wing-grid .left {
    grid-column: 1;
  }

  .flying-wing-grid .main {
    grid-column: 2;
  }

  .flying-wing-grid .right {
    grid-column: 3;
  }

  .flying-wing-grid footer {
    grid-column: 1 / -1;
  }
}
```

#### 混合布局模式

```css
/* 浮动 + 定位混合布局 */
.mixed-layout {
  /* 固定头部 + 浮动内容 */
  .fixed-header-float-content {
    padding-top: 60px; /* 头部高度 */

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      z-index: 1000;
    }

    .content {
      .sidebar {
        float: left;
        width: 250px;
      }

      .main {
        margin-left: 270px; /* 边栏宽度 + 间距 */
      }
    }
  }

  /* 绝对定位 + 相对定位 */
  .absolute-relative-mix {
    position: relative;
    height: 400px;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    .content {
      position: relative;
      z-index: 1;
    }
  }

  /* 粘性 + 浮动 */
  .sticky-float-mix {
    .sticky-header {
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .float-container {
      .float-left {
        float: left;
        width: 30%;
      }

      .float-right {
        float: right;
        width: 65%;
      }
    }
  }
}
```

### 布局调试技巧

#### 视觉调试工具

```css
/* 布局调试辅助类 */
.layout-debug {
  /* 1. 显示盒模型 */
  .debug-border * {
    outline: 1px solid rgba(255, 0, 0, 0.1);
  }

  /* 2. 显示尺寸 */
  .debug-size::before {
    content: attr(data-size);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 4px;
    font-size: 10px;
    z-index: 9999;
  }

  /* 3. 显示浮动元素 */
  .debug-float *[style*="float"] {
    outline: 2px dashed #3498db;
  }

  /* 4. 显示定位元素 */
  .debug-position *[style*="position"] {
    outline: 2px dashed #e74c3c;

    &[style*="absolute"] {
      outline-color: #e74c3c;
    }
    &[style*="fixed"] {
      outline-color: #9b59b6;
    }
    &[style*="relative"] {
      outline-color: #2ecc71;
    }
    &[style*="sticky"] {
      outline-color: #f39c12;
    }
  }

  /* 5. 显示z-index */
  .debug-zindex *[style*="z-index"] {
    &::after {
      content: "z-index: " attr(style);
      position: absolute;
      top: -20px;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 2px 4px;
      font-size: 10px;
      z-index: 10000;
    }
  }
}
```

#### 布局问题诊断

```css
/* 常见布局问题诊断 */
.layout-issues {
  /* 1. 浮动导致的高度塌陷 */
  .float-collapse {
    border: 2px solid red;

    &::after {
      content: "高度塌陷！";
      color: red;
      font-weight: bold;
    }
  }

  /* 2. 定位元素超出容器 */
  .position-overflow {
    overflow: hidden;

    &::after {
      content: "定位元素被裁剪";
      color: orange;
    }
  }

  /* 3. z-index无效 */
  .z-index-issue {
    transform: translateX(0); /* 可能创建了新的层叠上下文 */

    &::after {
      content: "检查层叠上下文";
      color: purple;
    }
  }

  /* 4. 粘性定位失效 */
  .sticky-not-working {
    &::after {
      content: "检查：1.阈值 2.滚动容器 3.transform";
      color: #f39c12;
    }
  }

  /* 5. 清除浮动问题 */
  .clearfix-issue {
    &::after {
      content: "检查clearfix是否正确应用";
      color: #3498db;
    }
  }
}
```

#### 响应式调试

```css
/* 响应式布局调试 */
.responsive-debug {
  /* 1. 显示当前断点 */
  body::before {
    content: "xs";
    position: fixed;
    top: 0;
    right: 0;
    background: #333;
    color: white;
    padding: 5px 10px;
    font-size: 12px;
    z-index: 9999;

    @media (min-width: 576px) {
      content: "sm";
    }
    @media (min-width: 768px) {
      content: "md";
    }
    @media (min-width: 992px) {
      content: "lg";
    }
    @media (min-width: 1200px) {
      content: "xl";
    }
  }

  /* 2. 网格辅助线 */
  .grid-guide {
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px
      ), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* 3. 容器边界显示 */
  .container-boundary {
    border-left: 2px dashed rgba(52, 152, 219, 0.5);
    border-right: 2px dashed rgba(52, 152, 219, 0.5);
  }
}
```

## 布局性能优化

### 重排与重绘优化

#### 布局性能基础

```css
/* 触发重排（回流）的属性 */
.reflow-triggers {
  /* 1. 几何属性 */
  width, height, padding, margin, border-width
  top, right, bottom, left
  font-size, line-height, text-align

  /* 2. 布局属性 */
  display, position, float, clear
  flex-direction, justify-content, align-items
  grid-template-columns, grid-template-rows

  /* 3. 内容变化 */
  文本内容改变
  图片尺寸改变

  /* 触发重绘的属性 */
  .repaint-triggers {
    color, background-color, border-color
    outline-color, box-shadow, opacity
    visibility, text-decoration
  }
}

/* 性能优化策略 */
.performance-strategies {
  /* 1. 避免频繁操作样式 */
  .batch-updates {
    /* 使用class批量修改，而不是单个样式 */
    transform: translateX(0);

    &.active {
      transform: translateX(100px);
    }
  }

  /* 2. 使用transform和opacity */
  .gpu-accelerated {
    /* 这些属性使用GPU加速 */
    transform: translate3d(0, 0, 0);
    opacity: 0.5;

    /* 启用硬件加速 */
    will-change: transform, opacity;
  }

  /* 3. 减少布局抖动 */
  .layout-thrashing {
    /* 避免在循环中读取布局属性 */
    /* 批量读取，批量写入 */
  }
}
```

#### 定位布局性能

```css
/* 定位布局性能优化 */
.positioning-performance {
  /* 1. fixed定位性能 */
  .fixed-performance {
    position: fixed;

    /* 优化技巧 */
    backface-visibility: hidden; /* 启用GPU加速 */
    will-change: transform; /* 提示浏览器优化 */

    /* 避免过多fixed元素 */
    /* 每个fixed元素都会创建新的层叠上下文 */
  }

  /* 2. absolute定位性能 */
  .absolute-performance {
    position: absolute;

    /* 优化技巧 */
    /* 限制定位元素的数量 */
    /* 使用contain: layout 或 content-visibility */

    .optimized {
      contain: layout; /* 隔离布局 */
      content-visibility: auto; /* 延迟渲染 */
    }
  }

  /* 3. 粘性定位性能 */
  .sticky-performance {
    position: sticky;

    /* 优化技巧 */
    /* 避免在大量元素上使用 */
    /* 确保阈值设置合理 */

    .optimized {
      top: 0;
      /* 避免复杂计算 */
      /* 避免嵌套粘性元素 */
    }
  }
}
```

### 布局性能最佳实践

#### 现代布局实践

```css
/* 现代布局性能最佳实践 */
.modern-layout-best-practices {
  /* 1. 使用现代布局技术 */
  .use-modern-layout {
    /* Flexbox替代浮动布局 */
    .flex-alternative {
      display: flex;
      /* 更好的性能，更简单的代码 */
    }

    /* Grid替代复杂定位 */
    .grid-alternative {
      display: grid;
      /* 单次布局计算，更好性能 */
    }
  }

  /* 2. 减少布局层级 */
  .reduce-nesting {
    /* 避免过度嵌套 */
    /* 扁平化DOM结构 */

    .deep-nesting {
      /* 每个层级都会增加布局计算成本 */
    }

    .flat-structure {
      /* 更少的嵌套，更好的性能 */
    }
  }

  /* 3. 使用CSS Containment */
  .css-containment {
    /* 隔离布局，减少计算范围 */
    .isolated {
      contain: layout style paint;
      /* 浏览器可以独立优化 */
    }

    /* 内容可见性优化 */
    .content-visibility {
      content-visibility: auto;
      contain-intrinsic-size: 0 500px;
      /* 延迟非可见区域渲染 */
    }
  }
}
```

#### 响应式性能

```css
/* 响应式布局性能 */
.responsive-performance {
  /* 1. 媒体查询优化 */
  .media-query-optimization {
    /* 按需加载样式 */
    @media (min-width: 768px) {
      /* 只在大屏幕应用 */
      .desktop-only {
        display: block;
      }
    }
  }

  /* 2. 图片和资源优化 */
  .resource-optimization {
    /* 响应式图片 */
    img {
      max-width: 100%;
      height: auto;

      /* 延迟加载 */
      loading: lazy;
    }

    /* 响应式背景 */
    .responsive-bg {
      background-image: url("small.jpg");

      @media (min-resolution: 2dppx) {
        background-image: url("large.jpg");
      }
    }
  }

  /* 3. 移动端优化 */
  .mobile-optimization {
    /* 减少移动端重绘 */
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
    }

    /* 优化滚动性能 */
    .smooth-scroll {
      -webkit-overflow-scrolling: touch;
    }
  }
}
```

### 未来布局趋势

#### 容器查询

```css
/* 容器查询布局 */
.container-queries {
  /* 元素根据容器尺寸响应 */
  .card {
    container-type: inline-size;
  }

  @container (min-width: 400px) {
    .card {
      display: flex;
      gap: 20px;
    }
  }

  @container (min-width: 600px) {
    .card {
      flex-direction: column;
    }
  }
}
```

#### 子网格

```css
/* 子网格布局 */
.subgrid-layout {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
  }

  .grid-item {
    display: grid;
    grid-column: span 6;

    /* 继承父网格 */
    grid-template-columns: subgrid;

    @media (min-width: 768px) {
      grid-column: span 4;
    }
  }
}
```

#### 层叠上下文优化

```css
/* 现代层叠上下文管理 */
.modern-stacking {
  /* 使用layer管理样式层级 */
  @layer base, components, utilities;

  @layer base {
    /* 基础样式 */
  }

  @layer components {
    /* 组件样式 */
    .modal {
      position: fixed;
      z-index: 1; /* 只在components层内比较 */
    }
  }

  @layer utilities {
    /* 工具样式 */
  }
}
```

---

**关键要点总结**：

1. **文档流是基础**：理解正常流、BFC、IFC 是掌握 CSS 布局的前提
2. **浮动布局已过时**：了解其原理，但在新项目中优先使用 Flexbox/Grid
3. **定位布局要谨慎**：合理使用 relative、absolute、fixed、sticky，注意层叠上下文
4. **性能至关重要**：减少重排重绘，使用硬件加速，优化移动端体验
5. **拥抱现代布局**：Flexbox 和 Grid 提供了更强大、更简单的布局方案

**布局选择指南**：

| 需求       | 推荐方案         | 替代方案             |
| ---------- | ---------------- | -------------------- |
| 一维布局   | Flexbox          | 浮动                 |
| 二维布局   | Grid             | 浮动 + 定位          |
| 元素对齐   | Flexbox/Grid     | 定位 + transform     |
| 响应式布局 | Grid + 媒体查询  | 浮动 + 媒体查询      |
| 粘性元素   | position: sticky | JS + position: fixed |

**工具推荐**：

- 布局调试：Chrome DevTools Layout 面板
- 性能分析：Chrome DevTools Performance 面板
- 布局生成：Flexbox Generator、CSS Grid Generator
- 代码质量：Stylelint、CSS Stats

**进一步学习**：

- CSS 盒模型：CSS Box Model Module
- 定位布局：CSS Positioned Layout Module
- 层叠上下文：CSS Cascading and Inheritance Level 4
- 现代布局：CSS Flexible Box Layout、CSS Grid Layout
