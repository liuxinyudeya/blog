# 背景与颜色

## 背景属性

### background-color

#### 基本用法

```css
/* 设置纯色背景 */
.element {
  background-color: #3498db; /* 十六进制 */
  background-color: rgb(52, 152, 219); /* RGB */
  background-color: rgba(52, 152, 219, 0.8); /* RGBA 带透明度 */
  background-color: hsl(204, 70%, 53%); /* HSL */
  background-color: hsla(204, 70%, 53%, 0.8); /* HSLA */
  background-color: transparent; /* 透明 */
  background-color: currentColor; /* 使用当前文本颜色 */
}
```

#### 继承与层叠

```css
/* 继承示例 */
.parent {
  background-color: #f0f0f0;
}

.child {
  /* 默认不继承background-color，需要显式设置 */
  background-color: inherit; /* 继承父元素的背景色 */
}

/* 层叠顺序 */
.layered-background {
  background-color: #3498db; /* 基础背景色 */
  background-image: url("pattern.png"); /* 背景图片在颜色之上 */
  background-blend-mode: multiply; /* 混合模式 */
}
```

### background-image

#### 基本用法

```css
/* 单个背景图像 */
.element {
  background-image: url("images/background.jpg");
}

/* 使用base64编码的图片 */
.inline-image {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PC9zdmc+");
}

/* 渐变作为背景图像 */
.gradient-background {
  background-image: linear-gradient(45deg, #3498db, #2ecc71);
}

/* 多个背景图像 */
.multiple-backgrounds {
  background-image: url("stars.png"), /* 最上层 */ url("moon.png"), /* 中间层 */
      linear-gradient(to bottom, #1a2980, #26d0ce); /* 最底层 */
}
```

#### 图片路径与格式

```css
/* 相对路径 */
.relative-path {
  background-image: url("../images/bg.jpg");
}

/* 绝对路径 */
.absolute-path {
  background-image: url("/static/images/bg.jpg");
}

/* 外部URL */
.external-url {
  background-image: url("https://example.com/image.jpg");
}

/* 支持多种格式 */
.responsive-format {
  background-image: url("image.avif"), /* AVIF格式（现代） */ url("image.webp"),
    /* WebP格式 */ url("image.jpg"); /* JPEG格式（回退） */
}

/* 使用image-set响应式图片 */
.image-set-background {
  background-image: image-set(
    "image-1x.jpg" 1x,
    "image-2x.jpg" 2x,
    "image-3x.jpg" 3x
  );
}
```

### background-repeat

#### 重复方式

```css
/* 默认值 - 水平和垂直都重复 */
.default-repeat {
  background-repeat: repeat;
}

/* 水平重复 */
.horizontal-repeat {
  background-repeat: repeat-x;
}

/* 垂直重复 */
.vertical-repeat {
  background-repeat: repeat-y;
}

/* 不重复 */
.no-repeat {
  background-repeat: no-repeat;
}

/* 空间重复 - 均匀分布不裁剪 */
.space-repeat {
  background-repeat: space;
}

/* 四舍五入重复 - 均匀分布可能裁剪 */
.round-repeat {
  background-repeat: round;
}

/* 多个背景的不同重复方式 */
.multiple-repeat {
  background-image: url("pattern1.png"), url("pattern2.png");
  background-repeat: repeat-x, /* 第一个背景 */ repeat-y; /* 第二个背景 */
}
```

#### 重复控制

```css
/* 双值语法：控制水平和垂直 */
.double-value {
  background-repeat: repeat space; /* 水平重复，垂直空间分布 */
  background-repeat: no-repeat round; /* 水平不重复，垂直round分布 */
}

/* 创建无缝平铺图案 */
.seamless-pattern {
  background-image: url("seamless-tile.png");
  background-repeat: repeat;
  background-size: 100px 100px;
}

/* 条纹背景 */
.striped-background {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #3498db 10px,
    #3498db 20px
  );
  background-repeat: no-repeat;
}
```

### background-position

#### 基本定位

```css
/* 关键字定位 */
.keyword-position {
  background-position: top left; /* 左上角 */
  background-position: top center; /* 上中 */
  background-position: top right; /* 右上角 */
  background-position: center left; /* 中左 */
  background-position: center center; /* 中心（默认） */
  background-position: center right; /* 中右 */
  background-position: bottom left; /* 左下角 */
  background-position: bottom center; /* 下中 */
  background-position: bottom right; /* 右下角 */
}

/* 长度值定位 */
.length-position {
  background-position: 20px 30px; /* 左20px 上30px */
  background-position: 50% 50%; /* 中心（百分比） */
  background-position: 2em 3rem; /* 使用em/rem单位 */
  background-position: 0 100%; /* 左下角 */
  background-position: 100% 0; /* 右上角 */
}

/* 混合值定位 */
.mixed-position {
  background-position: right 20px bottom 30px; /* 距右20px 距下30px */
  background-position: left 10% top 20px;
}

/* 多个背景的不同定位 */
.multiple-positions {
  background-image: url("icon1.png"), url("icon2.png"), url("pattern.png");
  background-position: top left, /* 第一个背景 */ bottom right,
    /* 第二个背景 */ center center; /* 第三个背景 */
}
```

#### 高级定位技巧

```css
/* 响应式定位 */
.responsive-position {
  background-position: calc(100% - 20px) calc(100% - 30px); /* 使用calc动态计算 */
}

/* 视口单位定位 */
.viewport-position {
  background-position: 50vw 50vh; /* 相对于视口 */
}

/* 定位偏移 */
.offset-position {
  background-position: 50% 50%; /* 中心 */
  background-position-x: 50%; /* 水平中心 */
  background-position-y: 50%; /* 垂直中心 */
}

/* 创建视差效果 */
.parallax-background {
  background-position: 50% 0;
  background-attachment: fixed; /* 关键：背景固定 */
}

/* 雪碧图定位 */
.sprite-sheet {
  background-image: url("sprites.png");
  background-position: -100px -200px; /* 显示特定部分 */
  background-repeat: no-repeat;
}
```

### background-size

#### 尺寸设置

```css
/* 关键字尺寸 */
.keyword-size {
  background-size: auto; /* 原始尺寸（默认） */
  background-size: cover; /* 覆盖整个容器，可能裁剪 */
  background-size: contain; /* 完整显示，可能留空 */
}

/* 具体尺寸 */
.specific-size {
  background-size: 200px 150px; /* 宽200px 高150px */
  background-size: 50% auto; /* 宽50%，高度自适应 */
  background-size: auto 100px; /* 高度100px，宽度自适应 */
  background-size: 100% 100%; /* 拉伸填满（可能变形） */
}

/* 多个背景的不同尺寸 */
.multiple-sizes {
  background-image: url("large.jpg"), url("small.png"), linear-gradient(to right, red, blue);
  background-size: cover, /* 第一个：覆盖 */ 50px 50px, /* 第二个：固定尺寸 */
      auto; /* 第三个：默认尺寸 */
}
```

#### 响应式尺寸

```css
/* 使用clamp动态尺寸 */
.responsive-clamp {
  background-size: clamp(300px, 50vw, 800px) auto;
}

/* 基于容器查询 */
.container-responsive {
  background-size: 100% auto; /* 默认 */
}

@container (min-width: 768px) {
  .container-responsive {
    background-size: 50% auto;
  }
}

/* 保持宽高比 */
.aspect-ratio-background {
  background-size: cover;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 宽高比 */
}

/* 像素比适配 */
.pixel-ratio-adaptation {
  background-image: url("image.jpg");
  background-size: 100px 100px;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .pixel-ratio-adaptation {
    background-image: url("image@2x.jpg");
    background-size: 100px 100px; /* 保持相同逻辑尺寸 */
  }
}
```

### background-attachment

#### 附着方式

```css
/* 默认 - 随内容滚动 */
.default-attachment {
  background-attachment: scroll;
}

/* 固定 - 相对于视口固定 */
.fixed-attachment {
  background-attachment: fixed;
}

/* 本地 - 随元素内容滚动 */
.local-attachment {
  background-attachment: local;
}

/* 多个背景的不同附着方式 */
.multiple-attachments {
  background-image: url("fixed-bg.jpg"), url("scroll-bg.png");
  background-attachment: fixed, /* 第一个背景固定 */ scroll; /* 第二个背景滚动 */
}
```

#### 视差滚动效果

```css
/* 基本视差效果 */
.parallax-section {
  background-image: url("background.jpg");
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  height: 500px;
}

/* 多层视差 */
.multi-layer-parallax {
  position: relative;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
}

.parallax-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background-size: cover;
  background-position: center;
}

.layer-1 {
  background-image: url("layer1.jpg");
  background-attachment: scroll;
  transform: translateZ(-2px) scale(3);
}

.layer-2 {
  background-image: url("layer2.png");
  background-attachment: fixed;
  transform: translateZ(-1px) scale(2);
}

.layer-3 {
  background-image: url("layer3.png");
  background-attachment: scroll;
}
```

### background-origin

#### 定位区域

```css
/* 从边框内边缘开始 */
.border-box-origin {
  background-origin: border-box;
}

/* 从内边距内边缘开始（默认） */
.padding-box-origin {
  background-origin: padding-box;
}

/* 从内容边缘开始 */
.content-box-origin {
  background-origin: content-box;
}

/* 多个背景的不同定位区域 */
.multiple-origins {
  background-image: url("border-bg.png"), url("content-bg.jpg");
  background-origin: border-box, /* 第一个从边框开始 */ content-box; /* 第二个从内容开始 */
}

/* 与background-clip配合使用 */
.origin-clip-demo {
  border: 20px solid rgba(52, 152, 219, 0.3);
  padding: 40px;
  background-image: url("pattern.png");
  background-origin: content-box; /* 从内容区域开始 */
  background-clip: padding-box; /* 裁剪到内边距区域 */
  background-repeat: no-repeat;
}
```

### background-clip

#### 裁剪区域

```css
/* 裁剪到边框外边缘（默认） */
.border-box-clip {
  background-clip: border-box;
}

/* 裁剪到内边距外边缘 */
.padding-box-clip {
  background-clip: padding-box;
}

/* 裁剪到内容外边缘 */
.content-box-clip {
  background-clip: content-box;
}

/* 裁剪到文本（背景只显示在文字上） */
.text-clip {
  background-clip: text;
  -webkit-background-clip: text; /* Safari支持 */
  color: transparent; /* 文本透明显示背景 */
  background-image: linear-gradient(45deg, #3498db, #2ecc71);
}

/* 多个背景的不同裁剪 */
.multiple-clips {
  background-image: linear-gradient(45deg, red, blue), url("pattern.png");
  background-clip: text, /* 第一个背景只显示在文字 */ padding-box; /* 第二个显示在内边距区域 */
}
```

#### 创意效果

```css
/* 渐变边框效果 */
.gradient-border {
  border: 10px solid transparent;
  background: linear-gradient(white, white) padding-box, linear-gradient(
        45deg,
        #3498db,
        #2ecc71
      ) border-box;
  background-clip: padding-box, border-box;
}

/* 多重背景裁剪 */
.multi-clip-effect {
  padding: 40px;
  border: 20px dashed #3498db;
  background-image: linear-gradient(
      45deg,
      rgba(52, 152, 219, 0.2),
      transparent
    ), url("texture.jpg");
  background-clip: content-box, padding-box;
  background-origin: content-box, padding-box;
}

/* 文字背景动画 */
.animated-text-bg {
  background: linear-gradient(
    90deg,
    #3498db,
    #2ecc71,
    #e74c3c,
    #f39c12,
    #3498db
  );
  background-size: 400% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradient-text 3s linear infinite;
}

@keyframes gradient-text {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 400% 50%;
  }
}
```

### background-blend-mode

#### 混合模式

```css
/* 正常混合（默认） */
.normal-blend {
  background-blend-mode: normal;
}

/* 变暗混合 */
.darken-blend {
  background-blend-mode: darken;
}

/* 变亮混合 */
.lighten-blend {
  background-blend-mode: lighten;
}

/* 正片叠底 */
.multiply-blend {
  background-blend-mode: multiply;
}

/* 滤色 */
.screen-blend {
  background-blend-mode: screen;
}

/* 叠加 */
.overlay-blend {
  background-blend-mode: overlay;
}

/* 色相 */
.hue-blend {
  background-blend-mode: hue;
}

/* 饱和度 */
.saturation-blend {
  background-blend-mode: saturation;
}

/* 颜色 */
.color-blend {
  background-blend-mode: color;
}

/* 明度 */
.luminosity-blend {
  background-blend-mode: luminosity;
}

/* 多个混合模式 */
.multiple-blends {
  background-image: url("image1.jpg"), url("image2.png"), linear-gradient(45deg, red, blue);
  background-blend-mode: multiply, /* 第一层与第二层混合 */ screen; /* 混合结果与第三层混合 */
}
```

#### 实用效果

```css
/* 双色调效果 */
.duotone-effect {
  background-image: url("photo.jpg"), linear-gradient(45deg, #3498db, #2ecc71);
  background-blend-mode: luminosity;
  background-size: cover;
}

/* 纹理叠加 */
.texture-overlay {
  background-image: url("photo.jpg"), url("noise.png");
  background-blend-mode: overlay;
  background-size: cover;
}

/* 颜色滤镜 */
.color-filter {
  background-image: url("photo.jpg"), linear-gradient(rgba(231, 76, 60, 0.3), rgba(231, 76, 60, 0.3));
  background-blend-mode: multiply;
}

/* 渐变映射 */
.gradient-map {
  background-image: url("photo.jpg"), linear-gradient(45deg, #1a237e, #e91e63, #ff9800);
  background-blend-mode: color;
}
```

### background 简写属性

#### 完整语法

```css
/* background 简写语法 */
.element {
  background: [background-color] [background-image] [background-repeat]
    [background-attachment] [background-position] / [background-size]
    /* 注意：position和size之间用/分隔 */ [background-origin] [background-clip]
    [background-blend-mode];
}

/* 部分简写示例 */
.full-background {
  background: #3498db /* 背景色 */ url("pattern.png") /* 背景图 */ no-repeat
    /* 不重复 */ fixed /* 固定 */ center center /* 位置 */ / cover /* 尺寸 */
    padding-box /* 定位区域 */ content-box /* 裁剪区域 */ multiply; /* 混合模式 */
}

/* 简化版本 */
.simple-background {
  background: #3498db url("bg.jpg") no-repeat center/cover;
}

/* 多背景简写 */
.multiple-bg-shorthand {
  background: url("stars.png") top left no-repeat, url("moon.png") center center
      no-repeat, linear-gradient(to bottom, #1a2980, #26d0ce);
}
```

#### 使用技巧

```css
/* 重置背景 */
.reset-background {
  background: initial; /* 重置为默认值 */
  background: unset; /* 取消设置 */
  background: revert; /* 回滚到浏览器默认 */
  background: none; /* 无背景 */
}

/* 条件背景 */
.conditional-background {
  /* 现代浏览器：使用渐变 */
  background: linear-gradient(45deg, #3498db, #2ecc71);

  /* 旧浏览器回退 */
  @supports not (background: linear-gradient(red, blue)) {
    background: #3498db url("fallback.jpg");
  }
}

/* 响应式背景简写 */
.responsive-bg-shorthand {
  background: #3498db url("bg-small.jpg") no-repeat center/cover;
}

@media (min-width: 768px) {
  .responsive-bg-shorthand {
    background: #2ecc71 url("bg-medium.jpg") no-repeat center/contain;
  }
}

@media (min-width: 1024px) {
  .responsive-bg-shorthand {
    background: #e74c3c url("bg-large.jpg") repeat center/auto;
  }
}
```

## 颜色表示法

### 颜色关键词

#### 基本颜色关键词

```css
/* 16个基本颜色（CSS1） */
.basic-colors {
  color: black;
  color: white;
  color: red;
  color: green;
  color: blue;
  color: yellow;
  color: cyan;
  color: magenta;
  color: gray;
  color: maroon;
  color: olive;
  color: purple;
  color: teal;
  color: navy;
  color: silver;
  color: aqua;
}

/* 扩展颜色关键词（CSS2/3） */
.extended-colors {
  color: aliceblue;
  color: antiquewhite;
  color: aquamarine;
  color: azure;
  color: beige;
  color: bisque;
  color: blanchedalmond;
  color: burlywood;
  /* ... 总共140多个颜色关键词 */
}

/* 系统颜色 */
.system-colors {
  color: ButtonText; /* 按钮文字颜色 */
  color: Highlight; /* 选中背景色 */
  color: HighlightText; /* 选中文字颜色 */
  color: GrayText; /* 禁用文字颜色 */
  background-color: Window; /* 窗口背景色 */
  border-color: WindowFrame; /* 窗口边框色 */
}
```

#### 透明关键词

```css
/* transparent - 完全透明 */
.transparent-color {
  background-color: transparent;
  border-color: transparent;
  color: transparent;
}

/* currentColor - 当前文字颜色 */
.current-color {
  color: #3498db;
  border: 2px solid currentColor; /* 边框使用文字颜色 */
  box-shadow: 0 0 10px currentColor; /* 阴影使用文字颜色 */
}

/* 继承父元素颜色 */
.inherit-color {
  color: inherit; /* 继承父元素文字颜色 */
  background-color: inherit; /* 继承父元素背景色 */
}
```

### 十六进制颜色

#### 基本格式

```css
/* 6位十六进制 */
.full-hex {
  color: #ff0000; /* 红色 */
  color: #00ff00; /* 绿色 */
  color: #0000ff; /* 蓝色 */
  color: #000000; /* 黑色 */
  color: #ffffff; /* 白色 */
  color: #808080; /* 灰色 */
}

/* 3位简写（浏览器自动扩展） */
.short-hex {
  color: #f00; /* 扩展为 #ff0000 */
  color: #0f0; /* 扩展为 #00ff00 */
  color: #00f; /* 扩展为 #0000ff */
  color: #000; /* 扩展为 #000000 */
  color: #fff; /* 扩展为 #ffffff */
  color: #888; /* 扩展为 #888888 */
}

/* 大小写不敏感 */
.case-insensitive {
  color: #ff0000; /* 大写 */
  color: #ff0000; /* 小写 */
  color: #ff0000; /* 混合大小写 */
}
```

#### 8 位十六进制（带透明度）

```css
/* 8位十六进制（RRGGBBAA） */
.hex-with-alpha {
  color: #ff000080; /* 50%不透明红色 */
  color: #00ff00cc; /* 80%不透明绿色 */
  color: #0000ff66; /* 40%不透明蓝色 */
  color: #00000000; /* 完全透明 */
  color: #ffffffff; /* 完全不透明白色 */
}

/* 4位简写带透明度 */
.short-hex-alpha {
  color: #f008; /* 扩展为 #ff000080 */
  color: #0f0c; /* 扩展为 #00ff00cc */
  color: #00f6; /* 扩展为 #0000ff66 */
  color: #0000; /* 扩展为 #00000000 */
  color: #fffc; /* 扩展为 #ffffffcc */
}
```

### RGB 颜色

#### rgb() 函数

```css
/* 整数格式（0-255） */
.rgb-integer {
  color: rgb(255, 0, 0); /* 红色 */
  color: rgb(0, 255, 0); /* 绿色 */
  color: rgb(0, 0, 255); /* 蓝色 */
  color: rgb(0, 0, 0); /* 黑色 */
  color: rgb(255, 255, 255); /* 白色 */
  color: rgb(128, 128, 128); /* 灰色 */
}

/* 百分比格式（0%-100%） */
.rgb-percent {
  color: rgb(100%, 0%, 0%); /* 红色 */
  color: rgb(0%, 100%, 0%); /* 绿色 */
  color: rgb(0%, 0%, 100%); /* 蓝色 */
  color: rgb(0%, 0%, 0%); /* 黑色 */
  color: rgb(100%, 100%, 100%); /* 白色 */
  color: rgb(50%, 50%, 50%); /* 灰色 */
}

/* 混合格式 */
.rgb-mixed {
  color: rgb(255, 50%, 0); /* 允许混合单位 */
  color: rgb(100%, 128, 0%); /* 但一般不推荐 */
}
```

#### 空格分隔语法（现代）

```css
/* 现代空格分隔语法 */
.rgb-modern {
  color: rgb(255 0 0); /* 红色 */
  color: rgb(0 255 0 / 0.5); /* 50%透明绿色 */
  color: rgb(0 0 255 / 50%); /* 50%透明蓝色 */

  /* 支持calc计算 */
  color: rgb(calc(255 - 100) 0 0);

  /* 支持变量 */
  color: rgb(var(--red) var(--green) var(--blue));
}
```

### RGBA 颜色

#### rgba() 函数

```css
/* 传统rgba语法 */
.rgba-traditional {
  color: rgba(255, 0, 0, 1); /* 完全不透明红色 */
  color: rgba(255, 0, 0, 0.5); /* 50%透明红色 */
  color: rgba(255, 0, 0, 0); /* 完全透明红色 */
  color: rgba(0, 255, 0, 0.8); /* 80%透明绿色 */
  color: rgba(0, 0, 255, 0.3); /* 30%透明蓝色 */

  /* 百分比透明度 */
  color: rgba(255, 0, 0, 50%); /* 50%透明红色 */
}

/* 现代空格分隔语法 */
.rgba-modern {
  color: rgb(255 0 0 / 1); /* 等价于 rgba(255, 0, 0, 1) */
  color: rgb(255 0 0 / 0.5); /* 等价于 rgba(255, 0, 0, 0.5) */
  color: rgb(255 0 0 / 50%); /* 等价于 rgba(255, 0, 0, 0.5) */
}
```

#### 透明度计算

```css
/* 透明度叠加计算 */
.transparency-overlay {
  background-color: rgba(255, 0, 0, 0.5); /* 红色50%透明 */
}

.transparency-overlay:hover {
  background-color: rgba(255, 0, 0, 0.8); /* 悬停时80%透明 */
}

/* 多层透明效果 */
.multi-layer-transparency {
  position: relative;
}

.multi-layer-transparency::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(52, 152, 219, 0.3); /* 蓝色遮罩层 */
  z-index: 1;
}

.multi-layer-transparency::after {
  content: "";
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  background: rgba(231, 76, 60, 0.5); /* 红色遮罩层 */
  z-index: 2;
}
```

### HSL 颜色

#### hsl() 函数

```css
/* HSL基本语法 */
.hsl-basic {
  color: hsl(0, 100%, 50%); /* 红色：色相0°，100%饱和度，50%亮度 */
  color: hsl(120, 100%, 50%); /* 绿色：色相120° */
  color: hsl(240, 100%, 50%); /* 蓝色：色相240° */
  color: hsl(0, 0%, 0%); /* 黑色：0%亮度 */
  color: hsl(0, 0%, 100%); /* 白色：100%亮度 */
  color: hsl(0, 0%, 50%); /* 灰色：50%亮度，0%饱和度 */

  /* 其他颜色 */
  color: hsl(39, 100%, 50%); /* 橙色 */
  color: hsl(60, 100%, 50%); /* 黄色 */
  color: hsl(300, 100%, 50%); /* 品红色 */
}

/* 现代空格分隔语法 */
.hsl-modern {
  color: hsl(0 100% 50%); /* 红色 */
  color: hsl(120 100% 50% / 0.5); /* 50%透明绿色 */
}

/* 使用变量和计算 */
.hsl-calculated {
  --hue: 210;
  --saturation: 70%;
  --lightness: 53%;

  color: hsl(var(--hue) var(--saturation) var(--lightness));

  /* 动态调整 */
  color: hsl(calc(var(--hue) + 30) var(--saturation) var(--lightness));
}
```

#### HSL 颜色调整

```css
/* 创建色调变化 */
.hue-variations {
  --base-hue: 200;

  .color-1 {
    color: hsl(calc(var(--base-hue) - 30), 100%, 50%);
  }
  .color-2 {
    color: hsl(var(--base-hue), 100%, 50%);
  }
  .color-3 {
    color: hsl(calc(var(--base-hue) + 30), 100%, 50%);
  }
}

/* 饱和度变化 */
.saturation-variations {
  --base-color: 200, 100%;

  .muted {
    color: hsl(var(--base-color), 30%);
  } /* 低饱和度 */
  .normal {
    color: hsl(var(--base-color), 60%);
  } /* 中等饱和度 */
  .vibrant {
    color: hsl(var(--base-color), 100%);
  } /* 高饱和度 */
}

/* 亮度变化 */
.lightness-variations {
  --base-color: 200, 100%;

  .dark {
    color: hsl(var(--base-color), 30%);
  } /* 暗色 */
  .normal {
    color: hsl(var(--base-color), 50%);
  } /* 正常 */
  .light {
    color: hsl(var(--base-color), 70%);
  } /* 亮色 */
  .pale {
    color: hsl(var(--base-color), 90%);
  } /* 浅色 */
}
```

### HSLA 颜色

#### hsla() 函数

```css
/* 传统HSLA语法 */
.hsla-traditional {
  color: hsla(0, 100%, 50%, 1); /* 完全不透明红色 */
  color: hsla(0, 100%, 50%, 0.5); /* 50%透明红色 */
  color: hsla(120, 100%, 50%, 0.8); /* 80%透明绿色 */
  color: hsla(240, 100%, 50%, 0.3); /* 30%透明蓝色 */

  /* 百分比透明度 */
  color: hsla(0, 100%, 50%, 50%); /* 50%透明红色 */
}

/* 现代空格分隔语法 */
.hsla-modern {
  color: hsl(0 100% 50% / 1); /* 等价于 hsla(0, 100%, 50%, 1) */
  color: hsl(0 100% 50% / 0.5); /* 等价于 hsla(0, 100%, 50%, 0.5) */
  color: hsl(0 100% 50% / 50%); /* 等价于 hsla(0, 100%, 50%, 0.5) */
}
```

#### HSLA 实用技巧

```css
/* 创建半透明主题 */
.theme-colors {
  --primary-hue: 210;

  .primary-solid {
    color: hsl(var(--primary-hue), 70%, 53%);
  }

  .primary-light {
    color: hsla(var(--primary-hue), 70%, 53%, 0.1);
  }

  .primary-medium {
    color: hsla(var(--primary-hue), 70%, 53%, 0.3);
  }

  .primary-heavy {
    color: hsla(var(--primary-hue), 70%, 53%, 0.7);
  }
}

/* 渐变透明度 */
.gradient-transparency {
  background: linear-gradient(
    to right,
    hsla(0, 100%, 50%, 0),
    /* 完全透明红色 */ hsla(0, 100%, 50%, 0.3),
    /* 30%透明红色 */ hsla(0, 100%, 50%, 0.7),
    /* 70%透明红色 */ hsla(0, 100%, 50%, 1) /* 完全不透明红色 */
  );
}

/* 叠加透明层 */
.overlay-with-hsla {
  position: relative;
  background-image: url("photo.jpg");
}

.overlay-with-hsla::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(210, 70%, 53%, 0.5); /* 蓝色叠加层 */
}
```

### 其他颜色表示法

#### 设备相关颜色

```css
/* CMYK颜色（主要用于打印） */
.cmyk-color {
  /* 注意：CSS不支持原生的CMYK，但可以通过颜色配置实现 */
  color: device-cmyk(0%, 100%, 100%, 0%); /* 红色 */
}

/* 显示P3广色域 */
.display-p3 {
  color: color(display-p3 1 0 0); /* sRGB红色 */
  color: color(display-p3 0.8 0.2 0.2); /* 自定义颜色 */
}

/* Lab颜色空间 */
.lab-color {
  color: lab(53% 80 67); /* 红色 */
  color: lab(88% -86 83); /* 绿色 */
}

/* LCH颜色空间 */
.lch-color {
  color: lch(53% 104 40); /* 红色 */
  color: lch(88% 119 136); /* 绿色 */
}
```

#### 函数式表示法

```css
/* color()函数 */
.color-function {
  /* 使用不同的颜色空间 */
  color: color(srgb 1 0 0); /* sRGB红色 */
  color: color(srgb-linear 1 0 0); /* 线性sRGB红色 */
  color: color(display-p3 1 0 0); /* Display P3红色 */
  color: color(a98-rgb 1 0 0); /* Adobe RGB红色 */
  color: color(prophoto-rgb 1 0 0); /* ProPhoto RGB红色 */
  color: color(rec2020 1 0 0); /* Rec.2020红色 */
  color: color(xyz 0.412 0.213 0.019); /* CIE XYZ红色 */
}

/* color-mix()函数 */
.color-mix {
  /* 混合颜色 */
  color: color-mix(in srgb, red 30%, blue 70%);
  color: color-mix(in hsl, #3498db 40%, #2ecc71 60%);
  color: color-mix(in lch, purple 50%, transparent 50%);
}

/* color-contrast()函数 */
.color-contrast {
  /* 选择对比度足够的颜色 */
  color: color-contrast(#3498db vs #fff, #000, #333);
  /* 从候选颜色中选择与背景对比度最高的 */
}
```

#### 相对颜色语法

```css
/* 基于现有颜色的调整 */
.relative-colors {
  --primary-color: #3498db;

  /* 调整亮度 */
  .darker {
    color: rgb(from var(--primary-color) r g calc(b * 0.8));
  }

  /* 调整饱和度 */
  .desaturated {
    color: hsl(from var(--primary-color) h calc(s * 0.5) l);
  }

  /* 创建互补色 */
  .complementary {
    color: hsl(from var(--primary-color) calc(h + 180) s l);
  }
}

/* 动态主题切换 */
.theme-relative {
  --base-color: hsl(210 70% 53%);

  .background {
    background: var(--base-color);
  }

  .text {
    color: hsl(from var(--base-color) h s calc(l * 0.2));
  }

  .border {
    border-color: hsl(from var(--base-color) calc(h + 180) s l);
  }
}
```

## 渐变背景基础

### 线性渐变

#### 基础语法

```css
/* 最简单的线性渐变 */
.basic-linear {
  background: linear-gradient(#3498db, #2ecc71);
}

/* 指定方向 */
.directional-linear {
  background: linear-gradient(to right, #3498db, #2ecc71); /* 从左到右 */
  background: linear-gradient(to bottom, #3498db, #2ecc71); /* 从上到下 */
  background: linear-gradient(to bottom right, #3498db, #2ecc71); /* 对角线 */
  background: linear-gradient(45deg, #3498db, #2ecc71); /* 45度角 */
  background: linear-gradient(0.25turn, #3498db, #2ecc71); /* 使用turn单位 */
}

/* 多个颜色点 */
.multi-color-linear {
  background: linear-gradient(
    to right,
    red,
    orange,
    yellow,
    green,
    blue,
    indigo,
    violet
  );
  background: linear-gradient(
    45deg,
    #3498db,
    #9b59b6,
    #2ecc71,
    #e74c3c,
    #f39c12
  );
}

/* 指定颜色位置 */
.positioned-linear {
  background: linear-gradient(to right, #3498db 0%, #2ecc71 50%, #e74c3c 100%);
  background: linear-gradient(
    to bottom,
    #3498db 20%,
    #2ecc71 20%,
    #2ecc71 80%,
    #e74c3c 80%
  );
  background: linear-gradient(
    45deg,
    #3498db 0%,
    #3498db 30%,
    transparent 30%,
    transparent 70%,
    #2ecc71 70%,
    #2ecc71 100%
  );
}
```

#### 实用渐变模式

```css
/* 条纹渐变 */
.striped-gradient {
  background: linear-gradient(
    90deg,
    #3498db 0%,
    #3498db 25%,
    #2ecc71 25%,
    #2ecc71 50%,
    #e74c3c 50%,
    #e74c3c 75%,
    #f39c12 75%,
    #f39c12 100%
  );
}

/* 彩虹渐变 */
.rainbow-gradient {
  background: linear-gradient(
    90deg,
    #ff0000 0%,
    /* 红色 */ #ff9900 17%,
    /* 橙色 */ #ffff00 33%,
    /* 黄色 */ #00ff00 50%,
    /* 绿色 */ #0099ff 67%,
    /* 蓝色 */ #6633ff 83%,
    /* 靛蓝色 */ #cc00ff 100% /* 紫色 */
  );
}

/* 金属渐变 */
.metallic-gradient {
  background: linear-gradient(
    145deg,
    #b8b8b8 0%,
    #ffffff 25%,
    #b8b8b8 50%,
    #ffffff 75%,
    #b8b8b8 100%
  );
}

/* 玻璃效果渐变 */
.glass-gradient {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 25%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 75%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(10px);
}
```

### 径向渐变

#### 基础语法

```css
/* 最简单的径向渐变 */
.basic-radial {
  background: radial-gradient(#3498db, #2ecc71);
}

/* 指定形状 */
.shape-radial {
  background: radial-gradient(circle, #3498db, #2ecc71); /* 圆形 */
  background: radial-gradient(ellipse, #3498db, #2ecc71); /* 椭圆形（默认） */
}

/* 指定大小 */
.size-radial {
  background: radial-gradient(100px 100px, #3498db, #2ecc71); /* 固定大小 */
  background: radial-gradient(50% 50%, #3498db, #2ecc71); /* 百分比大小 */

  /* 关键字大小 */
  background: radial-gradient(closest-side, #3498db, #2ecc71); /* 最近边 */
  background: radial-gradient(farthest-side, #3498db, #2ecc71); /* 最近边 */
  background: radial-gradient(closest-corner, #3498db, #2ecc71); /* 最近角 */
  background: radial-gradient(farthest-corner, #3498db, #2ecc71); /* 最近角 */
}

/* 指定位置 */
.position-radial {
  background: radial-gradient(circle at top left, #3498db, #2ecc71);
  background: radial-gradient(circle at 20% 80%, #3498db, #2ecc71);
  background: radial-gradient(ellipse at center, #3498db, #2ecc71);
}

/* 多个颜色点 */
.multi-color-radial {
  background: radial-gradient(
    circle at center,
    #3498db 0%,
    #2ecc71 25%,
    #e74c3c 50%,
    #f39c12 75%,
    #9b59b6 100%
  );
}
```

#### 创意径向渐变

```css
/* 太阳光效果 */
.sun-rays {
  background: radial-gradient(
    circle at center,
    #ffdd00 0%,
    #ff9900 20%,
    #ff6600 40%,
    transparent 70%
  );
}

/* 聚光灯效果 */
.spotlight {
  background: radial-gradient(
    circle at 20% 20%,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.5) 20%,
    rgba(255, 255, 255, 0.2) 40%,
    transparent 70%
  );
}

/* 气泡效果 */
.bubble {
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.9) 0%,
    rgba(255, 255, 255, 0.3) 15%,
    rgba(255, 255, 255, 0.1) 30%,
    transparent 60%
  );
}

/* 眼球效果 */
.eye {
  background: radial-gradient(
    circle at 35% 35%,
    #ffffff 0%,
    #e0e0e0 20%,
    #3498db 50%,
    #000000 80%
  );
  border-radius: 50%;
}
```

### 锥形渐变

#### 基础语法

```css
/* 最简单的锥形渐变 */
.basic-conic {
  background: conic-gradient(#3498db, #2ecc71);
}

/* 指定起始角度 */
.angled-conic {
  background: conic-gradient(from 45deg, #3498db, #2ecc71);
  background: conic-gradient(from 0.25turn, #3498db, #2ecc71);
}

/* 指定中心位置 */
.positioned-conic {
  background: conic-gradient(at 25% 25%, #3498db, #2ecc71);
  background: conic-gradient(from 45deg at 0% 0%, #3498db, #2ecc71);
}

/* 多个颜色点 */
.multi-color-conic {
  background: conic-gradient(
    #3498db 0deg,
    #2ecc71 90deg,
    #e74c3c 180deg,
    #f39c12 270deg,
    #3498db 360deg
  );

  /* 简写形式 */
  background: conic-gradient(#3498db, #2ecc71, #e74c3c, #f39c12);
}

/* 指定颜色位置 */
.positioned-color-conic {
  background: conic-gradient(
    #3498db 0% 25%,
    #2ecc71 25% 50%,
    #e74c3c 50% 75%,
    #f39c12 75% 100%
  );
}
```

#### 锥形渐变应用

```css
/* 饼图 */
.pie-chart {
  background: conic-gradient(
    #3498db 0% 30%,
    #2ecc71 30% 60%,
    #e74c3c 60% 90%,
    #f39c12 90% 100%
  );
  border-radius: 50%;
  width: 200px;
  height: 200px;
}

/* 颜色选择器 */
.color-wheel {
  background: conic-gradient(
    #ff0000 0deg,
    #ffff00 60deg,
    #00ff00 120deg,
    #00ffff 180deg,
    #0000ff 240deg,
    #ff00ff 300deg,
    #ff0000 360deg
  );
  border-radius: 50%;
}

/* 加载指示器 */
.spinner {
  background: conic-gradient(transparent 0deg 270deg, #3498db 270deg 360deg);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 时钟表盘 */
.clock-face {
  background: conic-gradient(
    transparent 0deg 30deg,
    #333 30deg 60deg,
    transparent 60deg 90deg,
    #333 90deg 120deg,
    transparent 120deg 150deg,
    #333 150deg 180deg,
    transparent 180deg 210deg,
    #333 210deg 240deg,
    transparent 240deg 270deg,
    #333 270deg 300deg,
    transparent 300deg 330deg,
    #333 330deg 360deg
  );
  border-radius: 50%;
}
```

### 重复渐变

#### 重复线性渐变

```css
/* 基本重复线性渐变 */
.repeating-linear {
  background: repeating-linear-gradient(
    45deg,
    #3498db,
    #3498db 10px,
    #2ecc71 10px,
    #2ecc71 20px
  );
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 10px,
    rgba(52, 152, 219, 0.3) 10px,
    rgba(52, 152, 219, 0.3) 20px
  );
}

/* 对角线条纹 */
.diagonal-stripes {
  background: repeating-linear-gradient(
    45deg,
    #3498db,
    #3498db 10px,
    #2ecc71 10px,
    #2ecc71 20px
  );
}

/* 斑马条纹 */
.zebra-stripes {
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 20px,
    rgba(0, 0, 0, 0.05) 20px,
    rgba(0, 0, 0, 0.05) 40px
  );
}

/* 进度条背景 */
.progress-stripes {
  background: repeating-linear-gradient(
    -45deg,
    transparent 0px,
    transparent 10px,
    rgba(255, 255, 255, 0.2) 10px,
    rgba(255, 255, 255, 0.2) 20px
  );
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 40px 0;
  }
}
```

#### 重复径向渐变

```css
/* 基本重复径向渐变 */
.repeating-radial {
  background: repeating-radial-gradient(
    circle,
    #3498db,
    #3498db 10px,
    #2ecc71 10px,
    #2ecc71 20px
  );
}

/* 同心圆 */
.concentric-circles {
  background: repeating-radial-gradient(
    circle,
    transparent,
    transparent 10px,
    rgba(52, 152, 219, 0.3) 10px,
    rgba(52, 152, 219, 0.3) 20px
  );
}

/* 波点图案 */
.polka-dots {
  background: repeating-radial-gradient(
    circle at 0 0,
    transparent 0,
    transparent 10px,
    #3498db 10px,
    #3498db 20px
  );
  background-size: 40px 40px;
}

/* 靶心图案 */
.bullseye {
  background: repeating-radial-gradient(
    circle,
    #3498db,
    #2ecc71 20px,
    #e74c3c 40px,
    #f39c12 60px
  );
}
```

#### 重复锥形渐变

```css
/* 基本重复锥形渐变 */
.repeating-conic {
  background: repeating-conic-gradient(
    #3498db 0deg 30deg,
    #2ecc71 30deg 60deg,
    #e74c3c 60deg 90deg,
    #f39c12 90deg 120deg,
    #9b59b6 120deg 150deg,
    #3498db 150deg 180deg
  );
}

/* 放射状条纹 */
.radial-stripes {
  background: repeating-conic-gradient(
    transparent 0deg 15deg,
    rgba(52, 152, 219, 0.3) 15deg 30deg
  );
}

/* 风扇叶片 */
.fan-blades {
  background: repeating-conic-gradient(
    transparent 0deg 20deg,
    #3498db 20deg 40deg,
    transparent 40deg 60deg,
    #2ecc71 60deg 80deg,
    transparent 80deg 100deg,
    #e74c3c 100deg 120deg
  );
  animation: spin 10s linear infinite;
}

/* 螺旋图案 */
.spiral {
  background: repeating-conic-gradient(
    from 0deg at 50% 50%,
    #3498db 0% 5%,
    transparent 5% 100%
  );
}
```

### 渐变实用技巧

#### 混合渐变

```css
/* 多个渐变叠加 */
.mixed-gradients {
  background: linear-gradient(45deg, rgba(52, 152, 219, 0.5), transparent),
    radial-gradient(circle at 20% 20%, rgba(46, 204, 113, 0.5), transparent),
    conic-gradient(from 90deg, rgba(231, 76, 60, 0.3), transparent);
}

/* 渐变作为遮罩 */
.gradient-mask {
  background: url("photo.jpg");
  mask-image: linear-gradient(to bottom, black, transparent);
  -webkit-mask-image: linear-gradient(to bottom, black, transparent);
}

/* 渐变边框 */
.gradient-border {
  border: 5px solid transparent;
  background: linear-gradient(white, white) padding-box, linear-gradient(
        45deg,
        #3498db,
        #2ecc71
      ) border-box;
}

/* 渐变阴影 */
.gradient-shadow {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3), 0 6px 6px rgba(46, 204, 113, 0.2);
}
```

#### 动画渐变

```css
/* 动态渐变背景 */
.animated-gradient {
  background: linear-gradient(-45deg, #3498db, #2ecc71, #e74c3c, #f39c12);
  background-size: 400% 400%;
  animation: gradient-shift 15s ease infinite;
}

@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 脉动渐变 */
.pulsing-gradient {
  background: radial-gradient(
    circle at center,
    #3498db 0%,
    #2ecc71 50%,
    transparent 70%
  );
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.1);
  }
}

/* 旋转渐变 */
.rotating-gradient {
  background: conic-gradient(#3498db, #2ecc71, #e74c3c, #f39c12, #3498db);
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

#### 响应式渐变

```css
/* 根据屏幕尺寸调整渐变 */
.responsive-gradient {
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

@media (max-width: 768px) {
  .responsive-gradient {
    background: linear-gradient(to bottom, #3498db, #2ecc71);
  }
}

/* 根据宽高比调整 */
.aspect-ratio-gradient {
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

@media (aspect-ratio: 1/1) {
  .aspect-ratio-gradient {
    background: radial-gradient(circle, #3498db, #2ecc71);
  }
}

/* 使用CSS变量控制渐变 */
.dynamic-gradient {
  --gradient-angle: 45deg;
  --color-1: #3498db;
  --color-2: #2ecc71;

  background: linear-gradient(
    var(--gradient-angle),
    var(--color-1),
    var(--color-2)
  );
}

/* 通过JavaScript动态修改 */
.dynamic-gradient.dark-mode {
  --gradient-angle: 135deg;
  --color-1: #2c3e50;
  --color-2: #34495e;
}
```

#### 性能优化渐变

```css
/* 使用硬件加速 */
.hardware-accelerated {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* 避免过度绘制 */
.optimized-gradient {
  /* 使用简单的线性渐变代替复杂的径向渐变 */
  background: linear-gradient(to bottom, #3498db, #2ecc71);

  /* 限制渐变范围 */
  background-size: 100% 200px;
  background-repeat: no-repeat;
}

/* 预加载渐变 */
.preload-gradient {
  background: linear-gradient(45deg, #3498db, #2ecc71), linear-gradient(135deg, #e74c3c, #f39c12);
  background-size: 0 0, /* 隐藏第二个渐变 */ 100% 100%;
}

.preload-gradient:hover {
  background-size: 100% 100%, /* 显示第一个渐变 */ 100% 100%; /* 显示第二个渐变 */
}
```

## 高级背景技术

### 多背景图像

#### 层叠顺序

```css
/* 多个背景图像的层叠顺序 */
.multiple-backgrounds {
  background: 
    /* 最上层 */ url("foreground.png") center center / 100px 100px no-repeat, /* 中间层 */
      url("pattern.png") 0 0 / 50px 50px repeat,
    /* 最底层 */ linear-gradient(45deg, #3498db, #2ecc71);
}

/* 使用background简写指定多层 */
.layered-backgrounds {
  background-image: url("layer1.png"), url("layer2.png"), url("layer3.png");
  background-repeat: no-repeat, repeat-x, repeat-y;
  background-position: top left, center, bottom right;
  background-size: 200px 100px, auto, cover;
}
```

#### 复杂组合

```css
/* 创建伪3D效果 */
.pseudo-3d-background {
  background: 
    /* 阴影层 */ radial-gradient(
      circle at 20% 20%,
      rgba(0, 0, 0, 0.3),
      transparent 50%
    ),
    /* 高光层 */ radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4), transparent
          30%), /* 纹理层 */ url("noise.png"),
    /* 基础渐变层 */ linear-gradient(135deg, #3498db, #2ecc71);
}

/* 创建景深效果 */
.depth-background {
  background: 
    /* 前景元素 */ url("foreground.png") center 80% / 30% auto no-repeat, /* 中景元素 */
      url("midground.png") center 50% / 60% auto no-repeat,
    /* 背景元素 */ url("background.png") center 30% / 100% auto no-repeat, /* 天空渐变 */
      linear-gradient(to bottom, #87ceeb, #e0f7ff);
  background-attachment: fixed, fixed, fixed, fixed;
}
```

### 背景滤镜

#### backdrop-filter

```css
/* 基础毛玻璃效果 */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari支持 */
}

/* 多种滤镜组合 */
.complex-backdrop {
  backdrop-filter: blur(5px) brightness(0.8) contrast(1.2) grayscale(0.2)
    hue-rotate(90deg) invert(0.1) opacity(0.9) saturate(1.5) sepia(0.3);
}

/* 毛玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

#### 性能优化

```css
/* 优化backdrop-filter性能 */
.optimized-backdrop {
  /* 隔离渲染层 */
  isolation: isolate;

  /* 创建新的层叠上下文 */
  transform: translateZ(0);

  /* 启用硬件加速 */
  will-change: backdrop-filter;

  /* 应用滤镜 */
  backdrop-filter: blur(10px);

  /* 限制影响范围 */
  background: rgba(255, 255, 255, 0.1);
}

/* 条件应用 */
.conditional-backdrop {
  background: rgba(255, 255, 255, 0.1);
}

@supports (backdrop-filter: blur(10px)) {
  .conditional-backdrop {
    backdrop-filter: blur(10px);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .conditional-backdrop {
    background: rgba(255, 255, 255, 0.9); /* 降级方案 */
  }
}
```

### 混合背景模式

#### 混合模式组合

```css
/* 背景混合模式 */
.background-blending {
  background-image: url("texture.jpg"), linear-gradient(45deg, #3498db, #2ecc71);
  background-blend-mode: multiply;
}

/* 多个混合模式 */
.multi-blend-modes {
  background-image: url("image1.jpg"), url("image2.png"), linear-gradient(45deg, red, blue);
  background-blend-mode: screen, /* 第一层和第二层混合 */ overlay; /* 结果和第三层混合 */
}

/* 隔离混合 */
.isolated-blend {
  background-image: url("pattern.png"), linear-gradient(45deg, #3498db, #2ecc71);
  background-blend-mode: overlay;
  isolation: isolate; /* 隔离混合效果 */
}
```

#### 创意混合效果

```css
/* 双重曝光效果 */
.double-exposure {
  background-image: url("portrait.jpg"), url("landscape.jpg");
  background-blend-mode: screen;
  background-size: cover;
  background-position: center;
}

/* 故障艺术效果 */
.glitch-effect {
  background: linear-gradient(90deg, #3498db, #2ecc71), linear-gradient(90deg, #e74c3c, #f39c12);
  background-blend-mode: difference;
  background-size: 200% 100%;
  animation: glitch 0.5s infinite;
}

@keyframes glitch {
  0% {
    background-position: 0 0, 100% 0;
  }
  100% {
    background-position: 100% 0, 0 0;
  }
}

/* 霓虹灯效果 */
.neon-effect {
  background: radial-gradient(
      circle at center,
      rgba(52, 152, 219, 0.8) 0%,
      transparent 70%
    ), linear-gradient(45deg, rgba(52, 152, 219, 0.3) 0%, rgba(
          46,
          204,
          113,
          0.3
        ) 50%, rgba(231, 76, 60, 0.3) 100%);
  background-blend-mode: screen;
  filter: brightness(1.2) contrast(1.5);
}
```

### 背景性能优化

#### 优化技巧

```css
/* 使用CSS渐变代替图片 */
.optimized-bg {
  /* 差：使用大尺寸背景图 */
  /* background: url('large-bg.jpg'); */

  /* 好：使用CSS渐变 */
  background: linear-gradient(45deg, #3498db, #2ecc71);
}

/* 使用适当尺寸的图片 */
.responsive-bg-images {
  /* 根据设备像素比提供不同图片 */
  background-image: url("image.jpg");
  background-size: cover;
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .responsive-bg-images {
    background-image: url("image@2x.jpg");
  }
}

/* 延迟加载背景 */
.lazy-bg {
  background: #f0f0f0; /* 占位背景色 */
}

.lazy-bg.loaded {
  background-image: url("background.jpg");
  background-size: cover;
}

/* 使用will-change优化 */
.will-change-bg {
  background: linear-gradient(45deg, #3498db, #2ecc71);
  will-change: background;
}
```

#### 浏览器兼容性处理

```css
/* 渐进增强策略 */
.progressive-bg {
  /* 基础背景色 */
  background-color: #3498db;

  /* 现代浏览器：使用渐变 */
  background-image: linear-gradient(45deg, #3498db, #2ecc71);

  /* 旧IE回退 */
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    background: #3498db url("fallback.jpg");
  }
}

/* 特性检测 */
.feature-detect-bg {
  background-color: #3498db;
}

@supports (background: linear-gradient(red, blue)) {
  .feature-detect-bg {
    background: linear-gradient(45deg, #3498db, #2ecc71);
  }
}

/* 浏览器前缀处理 */
.prefixed-bg {
  background: #3498db; /* 回退 */
  background: -webkit-linear-gradient(
    45deg,
    #3498db,
    #2ecc71
  ); /* Chrome, Safari */
  background: -moz-linear-gradient(45deg, #3498db, #2ecc71); /* Firefox */
  background: -o-linear-gradient(45deg, #3498db, #2ecc71); /* Opera */
  background: linear-gradient(45deg, #3498db, #2ecc71); /* 标准 */
}
```

## 颜色系统与理论

### 色轮与色彩关系

#### 色轮基础

```css
/* 基于HSL的色轮实现 */
.color-wheel {
  width: 300px;
  height: 300px;
  background: conic-gradient(
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(360, 100%, 50%)
  );
  border-radius: 50%;
}
```

#### 色彩关系

```css
/* 互补色 */
.complementary-colors {
  --base-hue: 210;

  .color-1 {
    background: hsl(var(--base-hue), 70%, 53%);
  }
  .color-2 {
    background: hsl(calc(var(--base-hue) + 180), 70%, 53%);
  }
}

/* 类似色 */
.analogous-colors {
  --base-hue: 210;

  .color-1 {
    background: hsl(calc(var(--base-hue) - 30), 70%, 53%);
  }
  .color-2 {
    background: hsl(var(--base-hue), 70%, 53%);
  }
  .color-3 {
    background: hsl(calc(var(--base-hue) + 30), 70%, 53%);
  }
}

/* 三元色 */
.triadic-colors {
  --base-hue: 210;

  .color-1 {
    background: hsl(var(--base-hue), 70%, 53%);
  }
  .color-2 {
    background: hsl(calc(var(--base-hue) + 120), 70%, 53%);
  }
  .color-3 {
    background: hsl(calc(var(--base-hue) + 240), 70%, 53%);
  }
}

/* 分裂互补色 */
.split-complementary {
  --base-hue: 210;

  .color-1 {
    background: hsl(var(--base-hue), 70%, 53%);
  }
  .color-2 {
    background: hsl(calc(var(--base-hue) + 150), 70%, 53%);
  }
  .color-3 {
    background: hsl(calc(var(--base-hue) + 210), 70%, 53%);
  }
}
```

### 色彩心理学

#### 色彩情感

```css
/* 暖色系 - 活力、热情 */
.warm-colors {
  --red: hsl(0, 70%, 50%); /* 激情、危险 */
  --orange: hsl(30, 70%, 50%); /* 活力、温暖 */
  --yellow: hsl(60, 70%, 50%); /* 快乐、乐观 */
}

/* 冷色系 - 冷静、专业 */
.cool-colors {
  --green: hsl(120, 70%, 50%); /* 自然、生长 */
  --blue: hsl(210, 70%, 50%); /* 信任、专业 */
  --purple: hsl(270, 70%, 50%); /* 创意、奢华 */
}

/* 中性色 - 平衡、基础 */
.neutral-colors {
  --black: hsl(0, 0%, 0%); /* 力量、精致 */
  --white: hsl(0, 0%, 100%); /* 纯洁、简洁 */
  --gray: hsl(0, 0%, 50%); /* 平衡、中立 */
}
```

#### 应用场景

```css
/* 企业品牌色 */
.corporate-colors {
  --primary: hsl(210, 70%, 53%); /* 蓝色 - 信任、专业 */
  --secondary: hsl(120, 70%, 40%); /* 绿色 - 成长、环保 */
  --accent: hsl(30, 70%, 50%); /* 橙色 - 活力、创新 */
}

/* 电子商务 */
.ecommerce-colors {
  --cta: hsl(0, 70%, 50%); /* 红色 - 紧迫感、购买 */
  --trust: hsl(210, 70%, 53%); /* 蓝色 - 信任、安全 */
  --sale: hsl(30, 70%, 50%); /* 橙色 - 促销、吸引力 */
}

/* 健康与保健 */
.health-colors {
  --natural: hsl(120, 70%, 40%); /* 绿色 - 自然、健康 */
  --clean: hsl(180, 70%, 50%); /* 青色 - 清新、洁净 */
  --calm: hsl(210, 70%, 53%); /* 蓝色 - 平静、信任 */
}
```

### 无障碍颜色对比

#### WCAG 标准

```css
/* 确保足够的对比度 */
.accessibility-colors {
  /* 正常文本（AA级） - 对比度至少4.5:1 */
  .normal-text {
    color: hsl(0, 0%, 20%); /* 深灰色 */
    background: hsl(0, 0%, 100%); /* 白色 */
    /* 对比度: 10.9:1 */
  }

  /* 大文本（AA级） - 对比度至少3:1 */
  .large-text {
    font-size: 18px;
    color: hsl(0, 0%, 40%); /* 中灰色 */
    background: hsl(0, 0%, 100%); /* 白色 */
    /* 对比度: 7.1:1 */
  }

  /* 增强对比（AAA级） - 对比度至少7:1 */
  .enhanced-text {
    color: hsl(0, 0%, 0%); /* 黑色 */
    background: hsl(0, 0%, 100%); /* 白色 */
    /* 对比度: 21:1 */
  }

  /* 用户界面组件 */
  .ui-component {
    color: hsl(0, 0%, 100%); /* 白色 */
    background: hsl(210, 70%, 53%); /* 蓝色 */
    border: 2px solid hsl(210, 70%, 30%);
    /* 对比度: 5.3:1 */
  }
}
```

#### 工具和检查

```css
/* 使用CSS自定义属性管理可访问颜色 */
:root {
  /* 基础颜色 */
  --color-primary: hsl(210, 70%, 53%);
  --color-text: hsl(0, 0%, 20%);
  --color-bg: hsl(0, 0%, 100%);

  /* 计算对比度 */
  --contrast-ratio: calc(
    (var(--luminance-text) + 0.05) / (var(--luminance-bg) + 0.05)
  );
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text: hsl(0, 0%, 90%);
    --color-bg: hsl(0, 0%, 20%);
  }
}

/* 高对比度模式支持 */
@media (prefers-contrast: high) {
  :root {
    --color-text: hsl(0, 0%, 0%);
    --color-bg: hsl(0, 0%, 100%);
  }
}

@media (prefers-contrast: low) {
  :root {
    --color-text: hsl(0, 0%, 40%);
    --color-bg: hsl(0, 0%, 95%);
  }
}
```

### 现代色彩空间

#### 广色域支持

```css
/* P3广色域颜色 */
.p3-colors {
  /* 比sRGB更鲜艳的颜色 */
  color: color(display-p3 1 0 0); /* 更鲜艳的红色 */
  color: color(display-p3 0 1 0); /* 更鲜艳的绿色 */
  color: color(display-p3 0 0 1); /* 更鲜艳的蓝色 */

  /* 回退方案 */
  color: #ff0000;
  color: color(display-p3 1 0 0);
}

/* Rec.2020超广色域 */
.rec2020-colors {
  color: color(rec2020 1 0 0);

  /* 渐进增强 */
  @supports (color: color(rec2020 1 0 0)) {
    color: color(rec2020 1 0 0);
  }

  @supports (color: color(display-p3 1 0 0)) {
    color: color(display-p3 1 0 0);
  }

  color: #ff0000;
}
```

#### 感知均匀的色彩空间

```css
/* Lab颜色空间 - 感知均匀 */
.lab-colors {
  color: lab(53% 80 67); /* 红色 */
  color: lab(88% -86 83); /* 绿色 */
  color: lab(32% 79 -108); /* 蓝色 */

  /* 在Lab空间中进行插值更自然 */
  background: linear-gradient(to right, lab(53% 80 67), lab(88% -86 83));
}

/* LCH颜色空间 - 更直观 */
.lch-colors {
  color: lch(53% 104 40); /* 亮度 53%，色度 104，色相 40° (红色) */
  color: lch(88% 119 136); /* 亮度 88%，色度 119，色相 136° (绿色) */

  /* 保持色调一致，调整亮度和饱和度 */
  .variations {
    --base-hue: 210;

    .light {
      color: lch(90% 50 var(--base-hue));
    }
    .normal {
      color: lch(60% 70 var(--base-hue));
    }
    .dark {
      color: lch(30% 50 var(--base-hue));
    }
  }
}
```

#### 混合与操作

```css
/* 颜色混合 */
.color-mixing {
  /* 在特定颜色空间中混合 */
  color: color-mix(in srgb, red 30%, blue 70%);
  color: color-mix(in hsl, #3498db 40%, #2ecc71 60%);
  color: color-mix(in lch, purple 50%, transparent 50%);

  /* 多个颜色混合 */
  color: color-mix(in lch, color-mix(in lch, red 50%, blue 50%) 50%, green 50%);
}

/* 颜色调整 */
.color-adjustment {
  --base-color: lch(60% 70 210);

  /* 调整亮度 */
  .brighter {
    color: lch(from var(--base-color) calc(l * 1.2) c h);
  }

  /* 调整饱和度 */
  .more-saturated {
    color: lch(from var(--base-color) l calc(c * 1.5) h);
  }

  /* 调整色相 */
  .shifted-hue {
    color: lch(from var(--base-color) l c calc(h + 30));
  }

  /* 创建互补色 */
  .complementary {
    color: lch(from var(--base-color) l c calc(h + 180));
  }
}
```

---

**总结与最佳实践**：

1. **背景属性使用**：

   - 使用`background`简写属性提高代码可读性
   - 为多背景图像指定正确的层叠顺序
   - 使用`background-size: cover/contain`实现响应式背景

2. **颜色选择**：

   - 优先使用 HSL/HSLA，便于颜色调整
   - 使用 CSS 自定义变量管理颜色主题
   - 考虑无障碍颜色对比度

3. **渐变应用**：

   - 线性渐变适合平滑过渡
   - 径向渐变创建焦点效果
   - 锥形渐变用于环形和角度效果
   - 重复渐变创建图案背景

4. **性能优化**：

   - CSS 渐变代替小背景图
   - 适当压缩背景图片
   - 使用硬件加速优化复杂效果
   - 提供适当的回退方案

5. **现代特性**：
   - 使用广色域（P3）提升视觉体验
   - 利用 LCH/Lab 颜色空间实现自然过渡
   - 使用`color-mix()`和相对颜色语法

**工具推荐**：

- 颜色工具：Coolors、Adobe Color、Color Hunt
- 渐变生成：CSS Gradient、Gradient Magic
- 对比度检查：WebAIM Contrast Checker
- 性能分析：Chrome DevTools Performance Panel

**进一步学习**：

- CSS Backgrounds and Borders Module Level 3
- CSS Color Module Level 4/5
- WCAG 2.1 颜色对比指南
- 现代色彩科学和色彩管理
