HTML 属性是 HTML 元素中的额外信息，用于配置元素的行为或提供元数据。以下是主要分类和作用：

## 📌 **核心作用**

1. **配置元素行为** - 如链接的目标、表单的提交方式
2. **提供元素信息** - 如图片的描述、输入框的提示
3. **控制样式和交互** - 如类名、ID、事件处理

## 📋 **主要分类和常见属性**

### **1. 全局属性（适用于几乎所有元素）**

| 属性              | 作用           | 示例                      |
| ----------------- | -------------- | ------------------------- |
| `id`              | 唯一标识元素   | `<div id="header">`       |
| `class`           | 指定 CSS 类名  | `<p class="text red">`    |
| `style`           | 内联 CSS 样式  | `<div style="color:red">` |
| `title`           | 悬停提示文本   | `<a title="点击查看">`    |
| `data-*`          | 自定义数据属性 | `<div data-id="123">`     |
| `hidden`          | 隐藏元素       | `<p hidden>隐藏内容</p>`  |
| `lang`            | 语言设置       | `<html lang="zh-CN">`     |
| `contenteditable` | 使元素可编辑   | `<div contenteditable>`   |
| `tabindex`        | Tab 键导航顺序 | `<input tabindex="1">`    |

### **2. 链接和资源属性**

```html
<!-- 链接 -->
<a href="https://example.com" target="_blank" <!-- 在新窗口打开 -->
  rel="noopener noreferrer">链接</a
>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述" <!-- 替代文本（重要！） -- />
width="300" height="200" loading="lazy">
<!-- 延迟加载 -->

<!-- 脚本和样式 -->
<script src="app.js" defer></script>
<link rel="stylesheet" href="style.css" />
```

### **3. 表单相关属性**

```html
<input
  type="text"
  name="username"
  value="默认值"
  placeholder="请输入"
  required
  <!--
  必填项
  --
/>
disabled
<!-- 禁用 -->
readonly
<!-- 只读 -->
maxlength="20" minlength="3" pattern="[A-Za-z]+" autocomplete="on">

<!-- 其他表单元素 -->
<textarea rows="4" cols="50"></textarea>
<select multiple>
  <!-- 多选 -->
  <option selected>选项</option>
  <!-- 默认选中 -->
  <button type="submit">提交</button>
</select>
```

### **4. 多媒体属性**

```html
<video controls <!-- 显示控制条 -->
  autoplay
  <!-- 自动播放 -->
  loop
  <!-- 循环播放 -->
  muted
  <!-- 静音 -->
  poster="preview.jpg">
</video>

<audio preload="metadata"><!-- 预加载元数据 --></audio>
```

### **5. 表格属性**

```html
<table border="1">
  <colgroup>
    <col span="2" style="background-color:red" />
  </colgroup>
  <tr>
    <td colspan="2">跨两列</td>
    <!-- 合并列 -->
    <td rowspan="2">跨两行</td>
    <!-- 合并行 -->
  </tr>
</table>
```

### **6. 元信息属性**

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="页面描述" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

### **7. 事件处理属性（现在推荐用 JavaScript 添加）**

```html
<button onclick="alert('点击')">点击</button>
<input onchange="handleChange()" />
<form onsubmit="return validate()"></form>
```

## 💡 **重要注意事项**

### **布尔属性**

布尔属性不需要值，存在即表示真：

```html
<input checked />
<!-- 正确 -->
<input checked="" />
<!-- 正确 -->
<input checked="checked" />
<!-- 正确 -->
<input checked="true" />
<!-- 避免这样写 -->
```

### **最佳实践**

1. **始终添加`alt`属性** - 对于无障碍访问和 SEO
2. **合理使用`data-*`** - 存储自定义数据
3. **语义化属性** - 如`required`、`disabled`
4. **响应式属性** - 如`srcset`、`sizes`用于图片
5. **安全属性** - 如`rel="noopener"`防止安全漏洞

### **新增的现代属性**

```html
<!-- 图片响应式 -->
<img
  srcset="small.jpg 500w, large.jpg 1000w"
  sizes="(max-width: 600px) 500px, 1000px"
/>

<!-- 懒加载 -->
<img loading="lazy" src="image.jpg" />

<!-- 虚拟键盘类型 -->
<input type="text" inputmode="email" />
```

## 🎯 **总结**

HTML 属性是构建交互式、可访问、语义化网页的基础。正确使用属性可以：

- ✅ 增强用户体验
- ✅ 提升网站可访问性
- ✅ 优化 SEO 表现
- ✅ 改善性能
- ✅ 增强安全性

记住：属性值应始终用引号包裹（单引号或双引号），保持代码一致性和可读性。
