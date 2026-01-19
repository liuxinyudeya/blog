# 文本与字体

## 字体属性

### font-family 字体族

定义元素的字体族（字体家族）。

#### 基本语法

```css
selector {
  font-family: [字体1], [字体2], [通用字体族];
}
```

#### 字体堆栈（Font Stack）

```css
/* 基本字体堆栈 */
body {
  font-family: Arial, Helvetica, sans-serif;
}

/* 多单词字体名需要用引号包裹 */
h1 {
  font-family: "Times New Roman", Times, serif;
}

/* 中文字体堆栈 */
.chinese-text {
  font-family: "Microsoft YaHei", "微软雅黑", "PingFang SC", "Hiragino Sans GB",
    sans-serif;
}

/* 现代字体堆栈 */
.modern-font {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

/* 代码字体 */
code {
  font-family: "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace;
}
```

#### 通用字体族

```css
/* 衬线字体 (serif) - 有装饰笔画 */
.serif {
  font-family: Georgia, "Times New Roman", Times, serif;
}

/* 无衬线字体 (sans-serif) - 简洁现代 */
.sans-serif {
  font-family: Arial, Helvetica, sans-serif;
}

/* 等宽字体 (monospace) - 每个字符宽度相同 */
.monospace {
  font-family: "Courier New", Courier, monospace;
}

/* 草书字体 (cursive) - 手写风格 */
.cursive {
  font-family: "Brush Script MT", cursive;
}

/* 幻想字体 (fantasy) - 装饰性字体 */
.fantasy {
  font-family: "Papyrus", fantasy;
}
```

#### CSS3 新增字体特性

```css
/* 字体特性设置 */
.advanced-font {
  font-family: "My Custom Font", sans-serif;

  /* 字体变体 */
  font-variant-caps: small-caps; /* 小型大写字母 */
  font-variant-numeric: oldstyle-nums; /* 旧式数字 */
  font-variant-east-asian: ruby; /* 东亚文字变体 */

  /* 字体拉伸 */
  font-stretch: condensed; /* 压缩字体 */
  font-stretch: expanded; /* 扩展字体 */
}
```

### font-size 字体大小

控制文本的大小。

#### 绝对单位

```css
/* 像素 (px) - 最常用 */
.pixel-size {
  font-size: 16px;
}

/* 点 (pt) - 印刷单位 */
.print-size {
  font-size: 12pt; /* 用于打印样式 */
}

/* 其他绝对单位 */
.absolute-units {
  font-size: 1in; /* 英寸 */
  font-size: 2.54cm; /* 厘米 */
  font-size: 25.4mm; /* 毫米 */
  font-size: 6pc; /* 派卡，1pc = 12pt */
}
```

#### 相对单位

```css
/* 相对于根元素 (rem) */
:root {
  font-size: 16px; /* 1rem = 16px */
}

.rem-size {
  font-size: 1rem; /* 16px */
  font-size: 1.5rem; /* 24px */
  font-size: 0.875rem; /* 14px */
}

/* 相对于父元素 (em) */
.parent {
  font-size: 20px;
}

.em-size {
  font-size: 1em; /* 20px */
  font-size: 1.2em; /* 24px */
  font-size: 0.8em; /* 16px */
}

/* 相对于视口 (vw, vh) */
.viewport-size {
  font-size: 5vw; /* 视口宽度的5% */
  font-size: 3vh; /* 视口高度的3% */
  font-size: 2vmin; /* 视口较小尺寸的2% */
}

/* 字符宽度单位 (ch) */
.ch-size {
  font-size: 20ch; /* 20个"0"字符的宽度 */
  width: 50ch; /* 理想行宽：50-75字符 */
}

/* 根元素字符宽度单位 (rem + ch) */
.rem-ch-size {
  font-size: calc(1rem + 0.5vw); /* 响应式字体大小 */
}
```

#### 关键字值

```css
/* 绝对关键字 */
.keyword-absolute {
  font-size: xx-small; /* 最小 */
  font-size: x-small;
  font-size: small;
  font-size: medium; /* 默认值 */
  font-size: large;
  font-size: x-large;
  font-size: xx-large; /* 最大 */
}

/* 相对关键字 */
.parent {
  font-size: 20px;
}

.keyword-relative {
  font-size: larger; /* 比父元素大一级 */
  font-size: smaller; /* 比父元素小一级 */
}

/* 百分比 */
.percentage-size {
  font-size: 100%; /* 等于父元素字体大小 */
  font-size: 150%; /* 父元素的1.5倍 */
  font-size: 80%; /* 父元素的0.8倍 */
}
```

#### CSS3 新增特性

```css
/* 响应式字体大小 */
.responsive-font {
  /* 使用clamp()函数限制范围 */
  font-size: clamp(1rem, 2.5vw, 2rem);

  /* 或使用媒体查询 */
  font-size: 1rem;
}

@media (min-width: 768px) {
  .responsive-font {
    font-size: 1.2rem;
  }
}

@media (min-width: 1200px) {
  .responsive-font {
    font-size: 1.5rem;
  }
}

/* 数学计算 */
.calculated-font {
  font-size: calc(1rem + 0.5vw);
  font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
```

### font-weight 字体粗细

控制字体的粗细程度。

#### 数值值

```css
/* 100-900，100为最细，900为最粗 */
.numeric-weight {
  font-weight: 100; /* Thin */
  font-weight: 200; /* Extra Light */
  font-weight: 300; /* Light */
  font-weight: 400; /* Normal (默认) */
  font-weight: 500; /* Medium */
  font-weight: 600; /* Semi Bold */
  font-weight: 700; /* Bold */
  font-weight: 800; /* Extra Bold */
  font-weight: 900; /* Black */
}
```

#### 关键字值

```css
/* 基本关键字 */
.keyword-weight {
  font-weight: normal; /* 等同于 400 */
  font-weight: bold; /* 等同于 700 */
}

/* 相对关键字 */
.relative-weight {
  font-weight: lighter; /* 比父元素细一级 */
  font-weight: bolder; /* 比父元素粗一级 */
}

/* 示例 */
.parent {
  font-weight: 400;
}

.child-lighter {
  font-weight: lighter; /* 如果父元素是400，这里可能是300 */
}

.child-bolder {
  font-weight: bolder; /* 如果父元素是400，这里可能是700 */
}
```

#### 字体粗细的实践应用

```css
/* 网页排版层次 */
:root {
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;
}

/* 应用示例 */
body {
  font-weight: var(--font-weight-regular);
}

h1,
h2,
h3 {
  font-weight: var(--font-weight-bold);
}

.subtitle {
  font-weight: var(--font-weight-medium);
}

.light-text {
  font-weight: var(--font-weight-light);
}

.extra-bold {
  font-weight: var(--font-weight-black);
}

/* 按钮不同状态 */
.btn {
  font-weight: var(--font-weight-medium);
}

.btn-primary {
  font-weight: var(--font-weight-bold);
}
```

### 其他字体属性

#### font-style 字体样式

```css
/* 基本样式 */
.font-styles {
  font-style: normal; /* 正常 */
  font-style: italic; /* 斜体 */
  font-style: oblique; /* 倾斜（模拟斜体） */
}

/* 倾斜角度（CSS3） */
.oblique-angle {
  font-style: oblique 10deg; /* 倾斜10度 */
  font-style: oblique 20deg; /* 倾斜20度 */
}

/* 实际应用 */
.quote {
  font-style: italic;
  color: #666;
}

.emphasis {
  font-style: oblique;
}
```

#### font-variant 字体变体

```css
/* 小型大写字母 */
.small-caps {
  font-variant: small-caps;
}

/* CSS3 分解属性 */
.advanced-variant {
  font-variant-caps: small-caps; /* 小型大写 */
  font-variant-caps: all-small-caps; /* 全部小型大写 */
  font-variant-caps: petite-caps; /* 特小型大写 */
  font-variant-caps: all-petite-caps; /* 全部特小型大写 */
  font-variant-caps: unicase; /* 混合大小写 */
  font-variant-caps: titling-caps; /* 标题大写 */
}

/* 数字变体 */
.numeric-variant {
  font-variant-numeric: lining-nums; /* 等高数字 */
  font-variant-numeric: oldstyle-nums; /* 旧式数字 */
  font-variant-numeric: proportional-nums; /* 比例数字 */
  font-variant-numeric: tabular-nums; /* 等宽数字 */
  font-variant-numeric: diagonal-fractions; /* 对角线分数 */
  font-variant-numeric: stacked-fractions; /* 堆叠分数 */
  font-variant-numeric: ordinal; /* 序数标记 */
  font-variant-numeric: slashed-zero; /* 带斜线的零 */
}
```

#### font 简写属性

```css
/* 完整语法 */
font: [font-style] [font-variant] [font-weight] [font-size]/[line-height]
  [font-family];

/* 示例 */
.simple-shorthand {
  font: 16px/1.5 Arial, sans-serif;
}

.complex-shorthand {
  font: italic small-caps bold 1.2rem/1.8 "Helvetica Neue", sans-serif;
}

/* 系统字体关键字 */
.system-fonts {
  font: caption; /* 控件标题字体 */
  font: icon; /* 图标标签字体 */
  font: menu; /* 菜单字体 */
  font: message-box; /* 对话框字体 */
  font: small-caption; /* 小控件标题字体 */
  font: status-bar; /* 状态栏字体 */
}

/* 注意事项 */
.correct-order {
  /* 顺序必须正确 */
  font: italic 700 18px/1.6 "Segoe UI", sans-serif;
}

.missing-required {
  /* font-size 和 font-family 是必需的 */
  font: bold; /* 错误：缺少必需值 */
}
```

## 文本属性

### color 文本颜色

#### 颜色表示方法

```css
/* 颜色关键字 */
.color-keywords {
  color: red;
  color: blue;
  color: green;
  color: black;
  color: white;
  color: transparent; /* 透明 */
}

/* 十六进制颜色 */
.hex-colors {
  color: #ff0000; /* 红色 */
  color: #00ff00; /* 绿色 */
  color: #0000ff; /* 蓝色 */
  color: #333; /* 缩写：#333333 */
  color: #f0f; /* 缩写：#ff00ff */
  color: #ff000080; /* 带透明度：红色，50%透明 */
}

/* RGB/RGBA颜色 */
.rgb-colors {
  color: rgb(255, 0, 0); /* 红色 */
  color: rgb(0, 255, 0); /* 绿色 */
  color: rgb(0, 0, 255); /* 蓝色 */
  color: rgba(255, 0, 0, 0.5); /* 红色，50%透明度 */
  color: rgba(0, 0, 0, 0.75); /* 黑色，75%透明度 */
}

/* HSL/HSLA颜色 */
.hsl-colors {
  color: hsl(0, 100%, 50%); /* 红色 */
  color: hsl(120, 100%, 50%); /* 绿色 */
  color: hsl(240, 100%, 50%); /* 蓝色 */
  color: hsla(0, 100%, 50%, 0.5); /* 红色，50%透明度 */
}

/* currentColor关键字 */
.current-color-example {
  color: #333;
  border: 2px solid currentColor; /* 边框颜色与文字颜色相同 */
  box-shadow: 0 2px 4px currentColor;
}
```

#### CSS3 新增颜色特性

```css
/* 透明颜色 */
.transparent-colors {
  color: transparent;
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色 */
  border-color: hsla(0, 0%, 0%, 0.3); /* 30%黑色 */
}

/* 系统颜色 */
.system-colors {
  color: ButtonText; /* 按钮文字颜色 */
  color: Highlight; /* 选中项背景色 */
  color: HighlightText; /* 选中项文字颜色 */
  color: LinkText; /* 链接颜色 */
  color: VisitedText; /* 已访问链接颜色 */
}

/* 颜色函数 */
.color-functions {
  color: oklch(70% 0.1 30); /* OKLCH颜色空间 */
  color: color(display-p3 1 0 0); /* P3广色域 */
  color: lab(50% 40 30); /* Lab颜色空间 */
}

/* 颜色混合 */
.color-mixing {
  color: color-mix(in srgb, #ff0000 50%, #0000ff); /* 红色和蓝色混合 */
  background: color-mix(in lch, white 20%, #007bff); /* 白色和蓝色混合 */
}
```

### text-align 文本对齐

#### 水平对齐

```css
/* 基本对齐方式 */
.text-alignment {
  text-align: left; /* 左对齐（默认） */
  text-align: right; /* 右对齐 */
  text-align: center; /* 居中对齐 */
  text-align: justify; /* 两端对齐 */
}

/* 两端对齐示例 */
.justified-text {
  text-align: justify;
  text-align-last: left; /* 最后一行左对齐 */
}

/* 开始/结束对齐（考虑书写方向） */
.directional-alignment {
  text-align: start; /* 根据书写方向对齐 */
  text-align: end; /* 根据书写方向对齐 */

  /* 结合书写方向 */
  direction: rtl; /* 从右到左 */
  text-align: start; /* 在RTL中为右对齐 */
}
```

#### CSS3 新增对齐特性

```css
/* 文本对齐最后一个 */
.text-align-last {
  text-align-last: auto; /* 默认 */
  text-align-last: start; /* 最后一行起始对齐 */
  text-align-last: end; /* 最后一行结束对齐 */
  text-align-last: left; /* 最后一行左对齐 */
  text-align-last: right; /* 最后一行右对齐 */
  text-align-last: center; /* 最后一行居中对齐 */
  text-align-last: justify; /* 最后一行两端对齐 */
}

/* 文本对齐全部 */
.text-align-all {
  text-align-all: center; /* 所有行都居中对齐 */
}

/* 多列文本对齐 */
.multi-column-align {
  column-count: 3;
  text-align: justify;
}

/* 文本对齐与Flexbox/Grid结合 */
.flex-alignment {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.grid-alignment {
  display: grid;
  place-items: center; /* 水平和垂直居中 */
}
```

### line-height 行高

#### 基本用法

```css
/* 无单位值（推荐） */
.unitless-line-height {
  line-height: 1.5; /* 字体大小的1.5倍 */
  line-height: 1.8; /* 字体大小的1.8倍 */
  line-height: 1.2; /* 字体大小的1.2倍 */
}

/* 长度单位 */
.length-line-height {
  line-height: 24px; /* 固定24像素 */
  line-height: 1.5em; /* 父元素字体大小的1.5倍 */
  line-height: 150%; /* 父元素字体大小的150% */
}

/* 百分比 */
.percentage-line-height {
  line-height: 100%; /* 等于字体大小 */
  line-height: 120%; /* 字体大小的120% */
  line-height: 200%; /* 字体大小的200% */
}

/* 关键字 */
.keyword-line-height {
  line-height: normal; /* 默认值，通常为1.2 */
}
```

#### CSS3 高级特性

```css
/* 最小和最大行高 */
.min-max-line-height {
  line-height: 1.5;
  min-height: calc(1.5 * 1em); /* 最小行高 */
}

/* 响应式行高 */
.responsive-line-height {
  line-height: 1.5;
}

@media (min-width: 768px) {
  .responsive-line-height {
    line-height: 1.6;
  }
}

@media (min-width: 1200px) {
  .responsive-line-height {
    line-height: 1.8;
  }
}

/* 与视口单位结合 */
.viewport-line-height {
  line-height: calc(1.5em + 0.5vw);
}

/* 不同元素的行高优化 */
body {
  line-height: 1.6; /* 正文适合1.5-1.8 */
}

h1,
h2,
h3 {
  line-height: 1.2; /* 标题行高较小 */
}

code,
pre {
  line-height: 1.4; /* 代码行高适中 */
}

blockquote {
  line-height: 1.8; /* 引用块行高较大 */
}
```

#### 行高的实际应用

```css
/* 垂直居中单行文本 */
.vertical-center {
  height: 100px;
  line-height: 100px; /* 等于容器高度 */
  text-align: center;
}

/* 多行文本垂直居中 */
.multi-line-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  text-align: center;
}

/* 段落间距控制 */
.paragraph-spacing {
  line-height: 1.6;
  margin-bottom: 1.5em; /* 通常等于行高 */
}

/* 可读性优化 */
.readability {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 70ch; /* 理想行宽 */
}
```

### 其他文本属性

#### text-decoration 文本装饰

```css
/* 基本装饰 */
.text-decoration-basic {
  text-decoration: none; /* 无装饰 */
  text-decoration: underline; /* 下划线 */
  text-decoration: overline; /* 上划线 */
  text-decoration: line-through; /* 删除线 */
  text-decoration: blink; /* 闪烁（已废弃） */
}

/* CSS3 扩展属性 */
.text-decoration-advanced {
  /* 分解属性 */
  text-decoration-line: underline; /* 装饰线 */
  text-decoration-color: #ff0000; /* 装饰线颜色 */
  text-decoration-style: solid; /* 装饰线样式 */
  text-decoration-thickness: 2px; /* 装饰线粗细 */

  /* 简写 */
  text-decoration: underline red 2px;
}

/* 装饰线样式 */
.decoration-styles {
  text-decoration-style: solid; /* 实线 */
  text-decoration-style: double; /* 双线 */
  text-decoration-style: dotted; /* 点线 */
  text-decoration-style: dashed; /* 虚线 */
  text-decoration-style: wavy; /* 波浪线 */
}

/* 下划线偏移 */
.underline-offset {
  text-decoration: underline;
  text-underline-offset: 4px; /* 下划线偏移 */
  text-underline-position: under; /* 下划线位置 */
}
```

#### text-transform 文本转换

```css
/* 大小写转换 */
.text-transform-examples {
  text-transform: none; /* 默认，不转换 */
  text-transform: capitalize; /* 首字母大写 */
  text-transform: uppercase; /* 全部大写 */
  text-transform: lowercase; /* 全部小写 */
}

/* CSS3 新增 */
.text-transform-full {
  text-transform: full-width; /* 全角字符 */
  text-transform: full-size-kana; /* 全尺寸假名 */
}

/* 实际应用 */
.title-case {
  text-transform: capitalize;
}

.uppercase-heading {
  text-transform: uppercase;
  letter-spacing: 2px; /* 添加字母间距 */
}

.lowercase-label {
  text-transform: lowercase;
}
```

#### letter-spacing 和 word-spacing

```css
/* 字母间距 */
.letter-spacing-examples {
  letter-spacing: normal; /* 默认 */
  letter-spacing: 0.1em; /* 相对单位 */
  letter-spacing: 2px; /* 绝对单位 */
  letter-spacing: -0.05em; /* 负值，字母更紧凑 */
}

/* 单词间距 */
.word-spacing-examples {
  word-spacing: normal; /* 默认 */
  word-spacing: 0.5em; /* 相对单位 */
  word-spacing: 10px; /* 绝对单位 */
  word-spacing: -2px; /* 负值，单词更紧凑 */
}

/* 文本排版优化 */
.typography-optimization {
  font-size: 1.2rem;
  line-height: 1.6;
  letter-spacing: 0.01em; /* 轻微字母间距 */
  word-spacing: 0.05em; /* 轻微单词间距 */
}

/* 标题字母间距 */
.heading-spacing {
  text-transform: uppercase;
  letter-spacing: 0.15em; /* 标题常用较大间距 */
  font-weight: 700;
}
```

#### text-overflow 文本溢出

```css
/* 单行文本溢出 */
.single-line-overflow {
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 隐藏溢出 */
  text-overflow: ellipsis; /* 显示省略号 */
  width: 200px;
}

/* 多行文本溢出（CSS3） */
.multi-line-overflow {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 限制行数 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5;
  max-height: calc(1.5em * 3); /* 行高 × 行数 */
}

/* 不同的溢出效果 */
.text-overflow-variants {
  text-overflow: clip; /* 直接裁剪 */
  text-overflow: ellipsis; /* 显示省略号 */
  text-overflow: " [更多]"; /* 自定义字符串 */

  /* 双向文本 */
  text-overflow: ellipsis ellipsis; /* 开始和结束都显示省略号 */
}
```

## 自定义字体

### @font-face 规则

#### 基本用法

```css
/* 定义自定义字体 */
@font-face {
  font-family: "MyCustomFont";
  src: url("fonts/myfont.woff2") format("woff2"), url("fonts/myfont.woff")
      format("woff"), url("fonts/myfont.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* 字体显示策略 */
}

/* 使用自定义字体 */
body {
  font-family: "MyCustomFont", Arial, sans-serif;
}
```

#### 完整字体族定义

```css
/* 定义不同字重的字体变体 */
@font-face {
  font-family: "Roboto";
  src: url("fonts/Roboto-Light.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("fonts/Roboto-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("fonts/Roboto-Italic.woff2") format("woff2");
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("fonts/Roboto-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("fonts/Roboto-BoldItalic.woff2") format("woff2");
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

/* 使用字体变体 */
.light-text {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

.regular-text {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

.bold-text {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
}

.italic-text {
  font-family: "Roboto", sans-serif;
  font-style: italic;
}
```

#### @font-face 描述符

```css
@font-face {
  /* 必需描述符 */
  font-family: "CustomFont"; /* 字体名称 */
  src: url("font.woff2") format("woff2"); /* 字体源 */

  /* 可选描述符 */
  font-weight: 400; /* 字重：100-900，normal, bold */
  font-style: normal; /* 样式：normal, italic, oblique */
  font-stretch: normal; /* 拉伸：normal, condensed, expanded等 */
  font-display: swap; /* 显示策略：auto, block, swap, fallback, optional */

  /* Unicode范围 */
  unicode-range: U+0000-00FF, U+0100-017F; /* 支持的字符范围 */

  /* 字体特性设置 */
  font-feature-settings: "kern" 1, "liga" 1; /* 字距调整和连字 */

  /* 字体变体 */
  font-variation-settings: "wght" 400, "wdth" 100; /* 可变字体设置 */

  /* 降级处理 */
  size-adjust: 100%; /* 字体大小调整 */
  ascent-override: 100%; /* 上升线覆盖 */
  descent-override: 100%; /* 下降线覆盖 */
  line-gap-override: 100%; /* 行间距覆盖 */
}
```

### 字体格式与兼容性

#### 现代字体格式

```css
/* WOFF2 (Web Open Font Format 2.0) - 最佳选择 */
@font-face {
  font-family: "ModernFont";
  src: url("fonts/modern.woff2") format("woff2");
}

/* WOFF (Web Open Font Format 1.0) - 广泛支持 */
@font-face {
  font-family: "CompatFont";
  src: url("fonts/compat.woff") format("woff");
}

/* TTF/OTF (TrueType/OpenType) - 后备选择 */
@font-face {
  font-family: "FallbackFont";
  src: url("fonts/fallback.ttf") format("truetype");
}

/* EOT (Embedded OpenType) - 仅IE支持 */
@font-face {
  font-family: "IEFont";
  src: url("fonts/ie.eot");
  src: url("fonts/ie.eot?#iefix") format("embedded-opentype");
}

/* 完整兼容性方案 */
@font-face {
  font-family: "UniversalFont";
  src: url("fonts/universal.woff2") format("woff2"), /* 现代浏览器 */
      url("fonts/universal.woff") format("woff"),
    /* 大多数浏览器 */ url("fonts/universal.ttf") format("truetype"); /* 旧浏览器 */
  font-display: swap;
}
```

#### 字体格式选择策略

```css
/* 策略1：WOFF2 + WOFF 组合 */
@font-face {
  font-family: "StrategyOne";
  src: url("fonts/font.woff2") format("woff2"), url("fonts/font.woff") format("woff");
}

/* 策略2：完整兼容性 */
@font-face {
  font-family: "StrategyTwo";
  src: url("fonts/font.eot"); /* IE9兼容模式 */
  src: url("fonts/font.eot?#iefix") format("embedded-opentype"), /* IE6-IE8 */
      url("fonts/font.woff2") format("woff2"),
    url("fonts/font.woff") format("woff"), url("fonts/font.ttf") format("truetype"),
    url("fonts/font.svg#fontname") format("svg"); /* 旧iOS */
  font-weight: normal;
  font-style: normal;
}

/* 策略3：系统字体优先 */
:root {
  --font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
  font-family: var(--font-stack);
}

/* 仅当需要时加载自定义字体 */
@supports (font-variation-settings: normal) {
  @font-face {
    font-family: "VariableFont";
    src: url("fonts/variable.woff2") format("woff2-variations");
    font-weight: 100 900;
    font-stretch: 75% 125%;
  }
}
```

### 字体加载优化

#### font-display 策略

```css
/* auto - 浏览器默认行为 */
@font-face {
  font-family: "FontAuto";
  src: url("fonts/font.woff2") format("woff2");
  font-display: auto;
}

/* block - 短暂阻塞期，然后交换 */
@font-face {
  font-family: "FontBlock";
  src: url("fonts/font.woff2") format("woff2");
  font-display: block; /* 阻塞文本渲染最多3秒 */
}

/* swap - 立即使用后备字体，然后交换 */
@font-face {
  font-family: "FontSwap";
  src: url("fonts/font.woff2") format("woff2");
  font-display: swap; /* 推荐用于正文 */
}

/* fallback - 短暂阻塞，短暂交换期 */
@font-face {
  font-family: "FontFallback";
  src: url("fonts/font.woff2") format("woff2");
  font-display: fallback; /* 阻塞100ms，交换3秒 */
}

/* optional - 仅当可用时使用 */
@font-face {
  font-family: "FontOptional";
  src: url("fonts/font.woff2") format("woff2");
  font-display: optional; /* 推荐用于次要字体 */
}
```

#### 字体预加载

```html
<!-- 在HTML中预加载关键字体 -->
<head>
  <!-- 预加载WOFF2字体 -->
  <link
    rel="preload"
    href="fonts/critical.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <!-- 预加载CSS中的字体 -->
  <link rel="preload" href="styles.css" as="style" />
</head>
```

```css
/* 在CSS中使用字体加载API */
/* 定义字体 */
@font-face {
  font-family: 'OptimizedFont';
  src: url('fonts/optimized.woff2') format('woff2');
  font-display: swap;
}

/* 使用Font Loading API优化 */
if ('fonts' in document) {
  document.fonts.load('1rem "OptimizedFont"').then(() => {
    document.body.classList.add('fonts-loaded');
  });
}

/* CSS中的字体加载状态 */
body {
  font-family: fallback-font, sans-serif;
}

body.fonts-loaded {
  font-family: OptimizedFont, fallback-font, sans-serif;
}
```

#### 字体子集化

```css
/* 使用unicode-range加载特定字符 */
@font-face {
  font-family: "SubsetFont";
  src: url("fonts/latin.woff2") format("woff2");
  unicode-range: U+0000-00FF, U+0100-017F; /* 拉丁字符 */
}

@font-face {
  font-family: "SubsetFont";
  src: url("fonts/cyrillic.woff2") format("woff2");
  unicode-range: U+0400-04FF; /* 西里尔字符 */
}

@font-face {
  font-family: "SubsetFont";
  src: url("fonts/greek.woff2") format("woff2");
  unicode-range: U+0370-03FF; /* 希腊字符 */
}

/* 中文子集化示例 */
@font-face {
  font-family: "ChineseSubset";
  src: url("fonts/chinese-basic.woff2") format("woff2");
  unicode-range: U+4E00-9FFF; /* 常用汉字 */
}

@font-face {
  font-family: "ChineseSubset";
  src: url("fonts/chinese-ext-a.woff2") format("woff2");
  unicode-range: U+3400-4DBF; /* 扩展A区汉字 */
}
```

### 字体图标系统

#### Font Awesome 样式

```css
/* 定义图标字体 */
@font-face {
  font-family: "FontAwesome";
  src: url("fonts/fontawesome-webfont.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

/* 基础图标类 */
.fa {
  font-family: "FontAwesome";
  font-weight: normal;
  font-style: normal;
  display: inline-block;
  line-height: 1;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 具体图标 */
.fa-home:before {
  content: "\f015";
}
.fa-user:before {
  content: "\f007";
}
.fa-cog:before {
  content: "\f013";
}
.fa-search:before {
  content: "\f002";
}

/* 图标大小 */
.fa-lg {
  font-size: 1.33333em;
  line-height: 0.75em;
  vertical-align: -15%;
}
.fa-2x {
  font-size: 2em;
}
.fa-3x {
  font-size: 3em;
}

/* 图标旋转 */
.fa-rotate-90 {
  transform: rotate(90deg);
}
.fa-rotate-180 {
  transform: rotate(180deg);
}
.fa-rotate-270 {
  transform: rotate(270deg);
}

/* 图标动画 */
.fa-spin {
  animation: fa-spin 2s infinite linear;
}

@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

#### 自定义图标字体

```css
/* 创建自定义图标字体 */
@font-face {
  font-family: "MyIcons";
  src: url("fonts/myicons.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

/* 图标基础类 */
.icon {
  font-family: "MyIcons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* 更好的字体渲染 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 定义图标 */
.icon-menu:before {
  content: "\e900";
}
.icon-close:before {
  content: "\e901";
}
.icon-arrow-right:before {
  content: "\e902";
}
.icon-check:before {
  content: "\e903";
}
.icon-warning:before {
  content: "\e904";
}

/* 图标颜色 */
.icon-primary {
  color: #007bff;
}

.icon-success {
  color: #28a745;
}

.icon-danger {
  color: #dc3545;
}

/* 图标按钮 */
.icon-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
}

.icon-button .icon {
  font-size: 1.2em;
}
```

## CSS3 新增文本特性

### 文本阴影

#### 基本文本阴影

```css
/* 基本语法：text-shadow: h-shadow v-shadow blur-radius color; */
.text-shadow-basic {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  /* 分解 */
  /* 水平阴影：2px (向右) */
  /* 垂直阴影：2px (向下) */
  /* 模糊半径：4px */
  /* 颜色：黑色，50%透明度 */
}

/* 多个阴影 */
.text-shadow-multiple {
  text-shadow: 1px 1px 0 #fff, /* 白色描边效果 */ 2px 2px 4px rgba(0, 0, 0, 0.3); /* 主阴影 */
}

/* 发光效果 */
.text-glow {
  text-shadow: 0 0 10px #ff0080, 0 0 20px #ff0080, 0 0 30px #ff0080;
}

/* 浮雕效果 */
.text-emboss {
  color: #666;
  text-shadow: 1px 1px 1px #fff, /* 高光 */ -1px -1px 1px #000; /* 阴影 */
}

/* 凸起效果 */
.text-raised {
  color: #fff;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0
      1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
}
```

#### 创意文本阴影效果

```css
/* 霓虹灯效果 */
.neon-text {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
}

/* 火焰效果 */
.fire-text {
  color: #ff5722;
  text-shadow: 0 0 4px #ff5722, 0 0 10px #ff9800, 0 0 18px #ff9800, 0 0 25px
      #ff9800;
}

/* 金属效果 */
.metal-text {
  color: #333;
  text-shadow: 0 1px 0 #fff, 0 -1px 0 #000;
  background: linear-gradient(to bottom, #999, #333);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 3D文字效果 */
.text-3d {
  color: #fff;
  text-shadow: 1px 1px 0 #ccc, 2px 2px 0 #c9c9c9, 3px 3px 0 #bbb, 4px 4px 0
      #b9b9b9, 5px 5px 0 #aaa, 6px 6px 1px rgba(0, 0, 0, 0.1),
    6px 6px 3px rgba(0, 0, 0, 0.3), 6px 6px 6px rgba(0, 0, 0, 0.2);
}
```

### 文字描边

#### text-stroke 属性

```css
/* 基本文字描边 */
.text-stroke-basic {
  color: white;
  -webkit-text-stroke: 2px black; /* WebKit前缀 */
  text-stroke: 2px black; /* 标准属性 */
}

/* 描边和填充颜色 */
.text-stroke-color {
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: #ff0000;
  -webkit-text-fill-color: #ffff00;

  /* 标准写法 */
  text-stroke-width: 2px;
  text-stroke-color: #ff0000;
  text-fill-color: #ffff00;
}

/* 多重描边效果（使用多个text-shadow） */
.multi-stroke {
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0
      #000, 2px 2px 0 #000;
}

/* 渐变描边 */
.gradient-stroke {
  background: linear-gradient(45deg, #ff0000, #00ff00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px #000;
}
```

### 文字渐变

#### 线性渐变文字

```css
/* 基本文字渐变 */
.text-gradient-linear {
  background: linear-gradient(45deg, #ff0000, #00ff00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* 后备颜色 */
}

/* 多色渐变 */
.text-gradient-multi {
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    #ff9900 25%,
    #00ff00 50%,
    #0099ff 75%,
    #6600ff 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 径向渐变文字 */
.text-gradient-radial {
  background: radial-gradient(circle, #ff0000, #0000ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 锥形渐变文字 */
.text-gradient-conic {
  background: conic-gradient(
    #ff0000,
    #ff9900,
    #00ff00,
    #0099ff,
    #6600ff,
    #ff0000
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

#### 动画渐变文字

```css
/* 动画渐变 */
.animated-gradient {
  background: linear-gradient(
    90deg,
    #ff0000,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
  );
  background-size: 400% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 8s linear infinite;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}

/* 闪烁渐变 */
.pulse-gradient {
  background: linear-gradient(90deg, #ff0000, #00ff00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
```

### 多列文本

#### 基本多列布局

```css
/* 创建多列 */
.multi-column {
  column-count: 3; /* 列数 */
  column-gap: 2em; /* 列间距 */
  column-rule: 1px solid #ddd; /* 列间分隔线 */
}

/* 固定列宽 */
.fixed-column-width {
  column-width: 200px; /* 每列最小宽度 */
  column-gap: 1.5em;
  column-rule: 2px dotted #999;
}

/* 简写属性 */
.columns-shorthand {
  columns: 3 200px; /* column-count column-width */
}
```

#### 高级多列属性

```css
/* 列高度平衡 */
.balanced-columns {
  column-count: 3;
  column-fill: balance; /* 平衡各列高度（默认） */
  /* column-fill: auto; */ /* 按顺序填充 */
}

/* 跨列元素 */
.span-columns h2 {
  column-span: all; /* 横跨所有列 */
  text-align: center;
  margin: 2em 0;
}

/* 列中断控制 */
.break-control {
  break-inside: avoid; /* 避免在元素内部断列 */
  /* break-inside: auto; */ /* 允许断列 */
}

/* 多列中的图片 */
.multi-column img {
  max-width: 100%;
  height: auto;
  break-inside: avoid;
}

/* 响应式多列 */
.responsive-columns {
  columns: 1; /* 移动端单列 */
}

@media (min-width: 768px) {
  .responsive-columns {
    columns: 2; /* 平板端两列 */
  }
}

@media (min-width: 1200px) {
  .responsive-columns {
    columns: 3; /* 桌面端三列 */
  }
}
```

### 其他新特性

#### text-orientation 文字方向

```css
/* 文字方向控制 */
.text-orientation-mixed {
  text-orientation: mixed; /* 默认，水平与垂直混合 */
}

.text-orientation-upright {
  text-orientation: upright; /* 全部直立 */
}

.text-orientation-sideways {
  text-orientation: sideways; /* 全部侧卧 */
}

.text-orientation-sideways-right {
  text-orientation: sideways-right; /* 侧卧向右（仅Firefox） */
}

/* 竖排文字应用 */
.vertical-text {
  writing-mode: vertical-rl; /* 从右到左竖排 */
  text-orientation: upright;
  height: 300px;
}
```

#### writing-mode 书写模式

```css
/* 水平书写模式 */
.horizontal-tb {
  writing-mode: horizontal-tb; /* 默认：水平，从上到下 */
}

/* 垂直书写模式 */
.vertical-rl {
  writing-mode: vertical-rl; /* 垂直，从右到左 */
}

.vertical-lr {
  writing-mode: vertical-lr; /* 垂直，从左到右 */
}

/* 侧向书写模式 */
.sideways-rl {
  writing-mode: sideways-rl; /* 侧向，从右到左 */
}

.sideways-lr {
  writing-mode: sideways-lr; /* 侧向，从左到右 */
}

/* 实际应用：竖排标题 */
.vertical-title {
  writing-mode: vertical-rl;
  text-orientation: upright;
  font-size: 2em;
  margin-right: 1em;
}
```

#### text-combine-upright 文字组合

```css
/* 文字组合（主要用于东亚文字） */
.combine-upright {
  text-combine-upright: none; /* 不组合 */
  text-combine-upright: all; /* 组合所有字符 */
  text-combine-upright: digits 2; /* 组合2位数字 */
  text-combine-upright: digits 3; /* 组合3位数字 */
  text-combine-upright: digits 4; /* 组合4位数字 */
}

/* 实际应用：年份在竖排文本中 */
.vertical-date {
  writing-mode: vertical-rl;
}

.vertical-date .year {
  text-combine-upright: all; /* 将年份组合成一个字符宽度 */
}
```

## 字体排印最佳实践

### Web 字体选择原则

#### 字体性能考虑

```css
/* 1. 优先使用系统字体 */
.system-font-first {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* 2. 限制自定义字体数量 */
:root {
  /* 最多使用2-3种字体 */
  --font-primary: "Roboto", sans-serif;
  --font-secondary: "Playfair Display", serif;
  --font-mono: "SF Mono", monospace;
}

/* 3. 选择字形较少的字体 */
.efficient-font {
  font-family: "Inter", sans-serif; /* 现代、高效 */
}

/* 4. 考虑可变字体 */
.variable-font {
  font-family: "Roboto Flex", sans-serif;
  font-variation-settings: "wght" 400, "wdth" 100;
}
```

#### 字体格式策略

```css
/* 现代字体栈 */
@font-face {
  font-family: "OptimizedFont";
  /* WOFF2 - 现代浏览器 */
  src: url("fonts/font.woff2") format("woff2");
  /* WOFF - 广泛支持 */
  src: url("fonts/font.woff") format("woff");
  font-display: swap;
}

/* 字体子集化策略 */
@font-face {
  font-family: "SubsetFont";
  src: url("fonts/latin-subset.woff2") format("woff2");
  unicode-range: U+0000-00FF; /* 仅拉丁字符 */
  font-display: swap;
}
```

### 字体配对指南

#### 字体配对原则

```css
/* 1. 衬线 + 无衬线 */
.serif-sans-pair {
  /* 标题：衬线字体 */
  font-family: "Merriweather", serif;

  /* 正文：无衬线字体 */
  --body-font: "Open Sans", sans-serif;
}

/* 2. 相似字体族 */
.similar-font-pair {
  /* 都来自同一字体族 */
  font-family: "Roboto", sans-serif;
  --accent-font: "Roboto Condensed", sans-serif;
}

/* 3. 对比度原则 */
.contrast-font-pair {
  /* 厚重标题 + 轻盈正文 */
  --heading-font: "Montserrat", sans-serif; /* 厚重 */
  --body-font: "Lato", sans-serif; /* 轻盈 */
}

/* 4. 单字体变体 */
.single-font-variations {
  font-family: "Inter", sans-serif;
  --regular: 400;
  --medium: 500;
  --bold: 700;
}
```

#### 实际配对示例

```css
/* 经典配对：Georgia + Arial */
.classic-pair {
  --heading-font: Georgia, serif;
  --body-font: Arial, sans-serif;
}

/* 现代配对：Roboto + Roboto Slab */
.modern-pair {
  --heading-font: "Roboto Slab", serif;
  --body-font: "Roboto", sans-serif;
}

/* 优雅配对：Playfair Display + Source Sans Pro */
.elegant-pair {
  --heading-font: "Playfair Display", serif;
  --body-font: "Source Sans Pro", sans-serif;
}

/* 技术配对：Montserrat + Open Sans */
.technical-pair {
  --heading-font: "Montserrat", sans-serif;
  --body-font: "Open Sans", sans-serif;
}
```

### 响应式排版

#### 基础响应式排版

```css
/* 根元素字体大小 */
html {
  font-size: 16px; /* 基准大小 */
}

/* 移动端优先 */
body {
  font-size: 1rem; /* 16px */
  line-height: 1.6;
}

/* 平板设备 */
@media (min-width: 768px) {
  body {
    font-size: 1.125rem; /* 18px */
    line-height: 1.7;
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

/* 桌面设备 */
@media (min-width: 1200px) {
  body {
    font-size: 1.25rem; /* 20px */
    line-height: 1.8;
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
}
```

#### 流体排版（Fluid Typography）

```css
/* 使用clamp()函数 */
.fluid-heading {
  font-size: clamp(1.5rem, 5vw, 3rem);
}

.fluid-body {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: clamp(1.5, 5vw, 1.8);
}

/* 使用calc()和vw单位 */
.responsive-calc {
  font-size: calc(1rem + 0.5vw);
  line-height: calc(1.5em + 0.5vw);
}

/* 复杂的流体计算 */
.advanced-fluid {
  font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
  line-height: calc(1.3em + (1.8 - 1.3) * ((100vw - 300px) / (1600 - 300)));
}

/* 容器查询中的排版 */
@container (min-width: 400px) {
  .container-responsive {
    font-size: 1.2rem;
  }
}
```

### 性能优化

#### 字体加载优化

```css
/* 1. 使用font-display */
@font-face {
  font-family: "OptimizedFont";
  src: url("font.woff2") format("woff2");
  font-display: swap; /* 正文字体 */
}

@font-face {
  font-family: "OptionalFont";
  src: url("font2.woff2") format("woff2");
  font-display: optional; /* 次要字体 */
}

/* 2. 字体预加载 */
/* 在HTML中：<link rel="preload" href="font.woff2" as="font" crossorigin> */

/* 3. 字体子集化 */
@font-face {
  font-family: "Subset";
  src: url("latin.woff2") format("woff2");
  unicode-range: U+0000-00FF;
}

/* 4. 使用可变字体 */
@font-face {
  font-family: "VariableFont";
  src: url("variable.woff2") format("woff2-variations");
  font-weight: 100 900;
  font-stretch: 75% 125%;
}
```

#### 字体渲染优化

```css
/* 字体平滑设置 */
.font-smoothing {
  -webkit-font-smoothing: antialiased; /* macOS Chrome/Safari */
  -moz-osx-font-smoothing: grayscale; /* Firefox macOS */

  /* Windows ClearType */
  text-rendering: optimizeLegibility;
}

/* 字体特征设置 */
.font-features {
  font-feature-settings: "kern" 1, /* 字距调整 */ "liga" 1,
    /* 标准连字 */ "clig" 1, /* 上下文连字 */ "calt" 1; /* 上下文替代 */
}

/* 针对高分屏优化 */
.high-dpi-optimization {
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    -webkit-font-smoothing: subpixel-antialiased;
  }
}
```

## 综合示例

### 完整网页排版系统

```css
/* ============================================
   网页排版系统
   版本：1.0.0
   作者：前端开发者
   ============================================ */

/* --------------------------------------------------
   1.0 字体定义
   -------------------------------------------------- */

/* 系统字体回退栈 */
:root {
  --system-fonts: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  /* 自定义字体 */
  --font-primary: "Inter", var(--system-fonts);
  --font-secondary: "Merriweather", Georgia, serif;
  --font-mono: "SF Mono", Monaco, "Cascadia Code", monospace;
}

/* 自定义字体加载 */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Merriweather";
  src: url("/fonts/Merriweather-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* --------------------------------------------------
   2.0 基础排版设置
   -------------------------------------------------- */

/* 根元素设置 */
html {
  font-size: 16px; /* 基准大小 */
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* 基础文本样式 */
body {
  font-family: var(--font-primary);
  font-size: 1rem; /* 16px */
  line-height: 1.7;
  color: #333;
  font-weight: 400;
  font-feature-settings: "kern" 1, "liga" 1, "calt" 1;
}

/* --------------------------------------------------
   3.0 标题系统
   -------------------------------------------------- */

/* 标题基础样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-secondary);
  font-weight: 700;
  line-height: 1.2;
  margin-top: 2em;
  margin-bottom: 0.5em;
  color: #222;
}

/* 流体标题大小 */
h1 {
  font-size: clamp(2rem, 8vw, 3.5rem);
  margin-top: 0;
  letter-spacing: -0.02em;
}

h2 {
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  letter-spacing: -0.01em;
}

h3 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

h4 {
  font-size: clamp(1.25rem, 3vw, 1.5rem);
}

h5 {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
}

h6 {
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* 标题装饰效果 */
h1::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #007bff, #00bfff);
  margin-top: 0.5em;
  border-radius: 2px;
}

/* --------------------------------------------------
   4.0 正文内容
   -------------------------------------------------- */

/* 段落样式 */
p {
  margin-bottom: 1.5em;
  max-width: 70ch; /* 理想行宽 */
}

/* 链接样式 */
a {
  color: #007bff;
  text-decoration: none;
  background-image: linear-gradient(#007bff, #007bff);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s, color 0.3s;
  padding-bottom: 2px;
}

a:hover {
  color: #0056b3;
  background-size: 100% 2px;
}

/* 列表样式 */
ul,
ol {
  margin-bottom: 1.5em;
  padding-left: 1.5em;
}

li {
  margin-bottom: 0.5em;
  line-height: 1.6;
}

/* 引用样式 */
blockquote {
  font-family: var(--font-secondary);
  font-size: 1.25em;
  font-style: italic;
  line-height: 1.6;
  margin: 2em 0;
  padding: 1em 2em;
  background: linear-gradient(
    90deg,
    rgba(0, 123, 255, 0.1) 0%,
    transparent 100%
  );
  border-left: 4px solid #007bff;
  border-radius: 0 8px 8px 0;
}

blockquote::before {
  content: "“";
  font-size: 3em;
  color: #007bff;
  line-height: 0.1em;
  vertical-align: -0.4em;
  margin-right: 0.1em;
}

/* 代码样式 */
code,
kbd,
pre,
samp {
  font-family: var(--font-mono);
  font-size: 0.9em;
}

code {
  background: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  color: #e83e8c;
}

pre {
  background: #1a1a1a;
  color: #f8f9fa;
  padding: 1.5em;
  border-radius: 8px;
  overflow-x: auto;
  line-height: 1.5;
  font-size: 0.9em;
  margin: 1.5em 0;
}

/* --------------------------------------------------
   5.0 特殊文本效果
   -------------------------------------------------- */

/* 强调文本 */
.emphasis {
  font-weight: 600;
  color: #222;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  background-repeat: no-repeat;
  background-size: 100% 0.4em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
}

.emphasis:hover {
  background-size: 100% 88%;
}

/* 高亮文本 */
.highlight {
  position: relative;
  z-index: 1;
}

.highlight::before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: -0.25em;
  right: -0.25em;
  background: linear-gradient(90deg, #ffd54f, #ffecb3);
  transform: skewX(-15deg);
  border-radius: 2px;
}

/* 渐变文字 */
.gradient-text {
  background: linear-gradient(90deg, #007bff, #00bfff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

/* 文字阴影效果 */
.text-shadow-effect {
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1), 0
      1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2);
}

/* --------------------------------------------------
   6.0 响应式调整
   -------------------------------------------------- */

/* 移动设备 */
@media (max-width: 767px) {
  html {
    font-size: 14px;
  }

  body {
    line-height: 1.6;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
    padding: 1em;
  }
}

/* 平板设备 */
@media (min-width: 768px) and (max-width: 1199px) {
  html {
    font-size: 15px;
  }

  body {
    line-height: 1.65;
  }
}

/* 桌面设备 */
@media (min-width: 1200px) {
  html {
    font-size: 17px;
  }

  body {
    line-height: 1.75;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content {
    column-count: 2;
    column-gap: 3em;
  }

  .content p {
    max-width: none;
  }
}

/* 打印样式 */
@media print {
  body {
    font-size: 12pt;
    line-height: 1.4;
    color: #000;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: #000;
    page-break-after: avoid;
  }

  a {
    color: #000;
    text-decoration: underline;
  }

  .no-print {
    display: none;
  }
}
```

## 浏览器兼容性

### 字体属性兼容性表

| 特性                | Chrome | Firefox | Safari | Edge  | iOS Safari | Android |
| ------------------- | ------ | ------- | ------ | ----- | ---------- | ------- |
| @font-face          | 4.0+   | 3.5+    | 3.1+   | 12.0+ | 4.2+       | 2.2+    |
| WOFF2               | 36+    | 39+     | 10+    | 14+   | 10+        | 37+     |
| font-display        | 60+    | 58+     | 10.1+  | 79+   | 10.3+      | 60+     |
| variable fonts      | 66+    | 62+     | 11+    | 79+   | 11+        | 66+     |
| font-optical-sizing | 62+    | 62+     | 11+    | 79+   | 11+        | 62+     |

### 文本属性兼容性表

| 特性                  | Chrome | Firefox | Safari | Edge  | iOS Safari | Android |
| --------------------- | ------ | ------- | ------ | ----- | ---------- | ------- |
| text-shadow           | 4.0+   | 3.5+    | 4.0+   | 12.0+ | 4.0+       | 2.3+    |
| text-overflow         | 4.0+   | 7.0+    | 3.1+   | 12.0+ | 4.0+       | 2.3+    |
| word-wrap             | 4.0+   | 3.5+    | 3.1+   | 12.0+ | 4.0+       | 2.3+    |
| text-align-last       | 47+    | 49+     | 不支持 | 79+   | 不支持     | 47+     |
| text-underline-offset | 70+    | 70+     | 12.1+  | 79+   | 12.2+      | 70+     |

### 兼容性前缀指南

```css
/* 字体平滑前缀 */
.font-smoothing {
  -webkit-font-smoothing: antialiased; /* Chrome, Safari */
  -moz-osx-font-smoothing: grayscale; /* Firefox */
}

/* 文字描边前缀 */
.text-stroke {
  -webkit-text-stroke: 1px #000; /* WebKit浏览器 */
  text-stroke: 1px #000; /* 标准属性 */
}

/* 背景剪裁前缀 */
.text-clip {
  -webkit-background-clip: text; /* WebKit浏览器 */
  background-clip: text; /* 标准属性 */
}

/* 字体特性设置 */
.font-features {
  -webkit-font-feature-settings: "kern" 1;
  font-feature-settings: "kern" 1;
}

/* 多列文本前缀 */
.multi-column {
  -webkit-column-count: 3; /* WebKit浏览器 */
  -moz-column-count: 3; /* Firefox */
  column-count: 3; /* 标准属性 */
}
```

### 渐进增强策略

```css
/* 基础样式（所有浏览器） */
.text-effect {
  color: #000;
  font-weight: bold;
}

/* 增强样式（现代浏览器） */
@supports (text-shadow: 0 0 10px #000) {
  .text-effect {
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    color: transparent;
    background: linear-gradient(90deg, #ff0000, #0000ff);
    -webkit-background-clip: text;
    background-clip: text;
  }
}

/* 可变字体支持检测 */
@supports (font-variation-settings: "wght" 400) {
  .variable-font-support {
    font-family: "Roboto Flex", sans-serif;
    font-variation-settings: "wght" 400, "wdth" 100;
  }
}

/* 不支持时的降级方案 */
@supports not (font-variation-settings: "wght" 400) {
  .variable-font-support {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }
}
```

### 总结

CSS3 的文本与字体功能极大地增强了网页排版的灵活性和表现力。通过合理使用自定义字体、响应式排版、文本效果和性能优化技术，可以创建出既美观又高效的网页文本内容。关键是要在视觉效果、性能和兼容性之间找到平衡，为用户提供最佳的阅读体验。
