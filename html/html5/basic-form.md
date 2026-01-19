# HTML 表单基础

## 表单概述

### 什么是 HTML 表单？

HTML 表单是用户与网站进行交互的主要方式，用于收集、提交用户输入的数据。

### 表单基本结构

```html
<form action="/submit" method="POST">
  <!-- 表单控件放在这里 -->
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" />

  <button type="submit">提交</button>
</form>
```

### 表单数据流向

:::tip 表单数据流向
`用户输入 → 浏览器收集 → HTTP请求 → 服务器处理 → 数据库存储`;
:::

## 表单元素详解

### form 元素

表单的容器，定义了数据提交的目标和处理方式。

```html
<!-- 基本form元素 -->
<form id="user-form" class="registration-form" novalidate>
  <!-- 表单内容 -->
</form>

<!-- 带有属性的form元素 -->
<form
  action="/api/submit"
  method="POST"
  enctype="application/x-www-form-urlencoded"
  target="_blank"
  autocomplete="on"
  novalidate
>
  <!-- 表单字段 -->
</form>
```

#### form 元素属性表

| 属性           | 值                  | 说明                 |
| -------------- | ------------------- | -------------------- |
| `action`       | URL                 | 数据提交的服务器地址 |
| `method`       | GET/POST            | 数据提交方式         |
| `enctype`      | 见下文              | 数据编码类型         |
| `target`       | `_self`, `_blank`等 | 响应打开的位置       |
| `autocomplete` | `on`, `off`         | 自动完成功能         |
| `novalidate`   | (布尔属性)          | 是否禁用浏览器验证   |
| `name`         | 字符串              | 表单名称             |
| `id`           | 字符串              | 表单唯一标识         |

### input 元素

最常用的表单控件，通过`type`属性定义不同类型。

```html
<!-- 通用input结构 -->
<input
  type="text"
  id="field-id"
  name="field-name"
  value="默认值"
  placeholder="提示文本"
  required
  disabled
/>
```

### textarea 元素

多行文本输入框，适合长篇文本输入。

```html
<!-- 基本textarea -->
<textarea
  id="message"
  name="message"
  rows="4"
  cols="50"
  placeholder="请输入您的留言..."
  maxlength="500"
>
默认文本内容
</textarea>

<!-- 禁用自动调整大小 -->
<textarea style="resize: none;"></textarea>

<!-- 允许垂直调整大小 -->
<textarea style="resize: vertical;"></textarea>

<!-- 允许水平调整大小 -->
<textarea style="resize: horizontal;"></textarea>
```

#### textarea 属性表

| 属性          | 说明               | 示例                         |
| ------------- | ------------------ | ---------------------------- |
| `rows`        | 可见行数           | `rows="5"`                   |
| `cols`        | 可见列数（字符数） | `cols="40"`                  |
| `maxlength`   | 最大字符数         | `maxlength="1000"`           |
| `minlength`   | 最小字符数         | `minlength="10"`             |
| `wrap`        | 文本换行方式       | `wrap="hard"`, `wrap="soft"` |
| `placeholder` | 提示文本           | `placeholder="请输入..."`    |
| `readonly`    | 只读               | `readonly`                   |
| `disabled`    | 禁用               | `disabled`                   |

### select 和 option 元素

下拉选择框，提供选项列表。

```html
<!-- 基本下拉框 -->
<label for="country">选择国家：</label>
<select id="country" name="country">
  <option value="">请选择...</option>
  <option value="CN">中国</option>
  <option value="US">美国</option>
  <option value="JP">日本</option>
  <option value="UK">英国</option>
</select>

<!-- 多选下拉框 -->
<label for="skills">选择技能：</label>
<select id="skills" name="skills" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
</select>

<!-- 分组选项 -->
<label for="car">选择汽车品牌：</label>
<select id="car" name="car">
  <optgroup label="德国品牌">
    <option value="bmw">宝马</option>
    <option value="benz">奔驰</option>
    <option value="audi">奥迪</option>
  </optgroup>
  <optgroup label="日本品牌">
    <option value="toyota">丰田</option>
    <option value="honda">本田</option>
    <option value="nissan">日产</option>
  </optgroup>
</select>
```

#### option 属性

```html
<select name="color">
  <!-- value: 提交的值 -->
  <option value="red">红色</option>

  <!-- selected: 默认选中 -->
  <option value="blue" selected>蓝色</option>

  <!-- disabled: 禁用选项 -->
  <option value="green" disabled>绿色</option>

  <!-- label: 替代显示文本 -->
  <option value="yellow" label="黄色选项">
    这是内部的文本，但显示时用label
  </option>
</select>
```

### button 元素

表单按钮，用于提交、重置或自定义操作。

```html
<!-- 提交按钮 -->
<button type="submit">提交表单</button>

<!-- 重置按钮 -->
<button type="reset">重置表单</button>

<!-- 普通按钮 -->
<button type="button" onclick="alert('点击了按钮')">点击我</button>

<!-- 禁用按钮 -->
<button type="submit" disabled>不可点击</button>

<!-- 带图标的按钮 -->
<button type="submit">
  <img src="icon.png" alt="图标" />
  提交
</button>

<!-- 按钮与input对比 -->
<input type="submit" value="提交" />
<input type="reset" value="重置" />
<input type="button" value="普通按钮" />
```

### 其他表单元素

#### label 元素

关联表单控件的标签，提高可访问性。

```html
<!-- 方式1：使用for属性 -->
<label for="username">用户名：</label>
<input type="text" id="username" name="username" />

<!-- 方式2：包裹表单控件 -->
<label>
  密码：
  <input type="password" name="password" />
</label>

<!-- 多个label关联同一个控件 -->
<label for="age1">年龄：</label>
<input type="number" id="age1" name="age" />
<label for="age1">（岁）</label>
```

#### fieldset 和 legend 元素

分组相关表单控件。

```html
<fieldset>
  <legend>个人信息</legend>

  <label for="name">姓名：</label>
  <input type="text" id="name" name="name" />

  <label for="email">邮箱：</label>
  <input type="email" id="email" name="email" />
</fieldset>

<fieldset disabled>
  <legend>已禁用的部分</legend>
  <!-- 这里的所有控件都会被禁用 -->
  <input type="text" name="disabled-field" />
</fieldset>
```

#### datalist 元素

为输入框提供建议选项。

```html
<label for="browser">选择浏览器：</label>
<input list="browsers" id="browser" name="browser" />

<datalist id="browsers">
  <option value="Chrome">Google Chrome</option>
  <option value="Firefox">Mozilla Firefox</option>
  <option value="Safari">Apple Safari</option>
  <option value="Edge">Microsoft Edge</option>
  <option value="Opera">Opera Browser</option>
</datalist>
```

#### output 元素

显示计算结果或脚本输出。

```html
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" name="a" value="10" />
  +
  <input type="number" id="b" name="b" value="20" />
  =
  <output name="result" for="a b">30</output>
</form>
```

## 表单属性详解

### action 属性

指定表单数据提交到的服务器地址。

```html
<!-- 提交到当前站点的相对路径 -->
<form action="/submit-data">
  <!-- 表单内容 -->
</form>

<!-- 提交到绝对URL -->
<form action="https://api.example.com/submit">
  <!-- 表单内容 -->
</form>

<!-- 提交到当前页面（无刷新提交） -->
<form action="#">
  <!-- 通常配合JavaScript处理 -->
</form>

<!-- 提交到邮箱（依赖浏览器和用户配置） -->
<form action="mailto:admin@example.com">
  <!-- 注意：这种方式用户体验差，不推荐生产环境使用 -->
</form>
```

#### action 属性值类型

| 值类型   | 示例                      | 说明             |
| -------- | ------------------------- | ---------------- |
| 相对路径 | `action="/api/submit"`    | 相对于网站根目录 |
| 当前路径 | `action="submit.php"`     | 相对于当前页面   |
| 上级路径 | `action="../process.php"` | 上级目录         |
| 绝对 URL | `action="https://..."`    | 完整 URL 地址    |
| 锚点     | `action="#"`              | 当前页面         |
| 空值     | `action=""`               | 提交到当前页面   |

### method 属性

定义数据提交的 HTTP 方法。

#### GET 方法

```html
<form action="/search" method="GET">
  <label for="keyword">搜索：</label>
  <input type="text" id="keyword" name="q" />
  <button type="submit">搜索</button>
</form>

<!-- 提交后URL示例：/search?q=HTML教程 -->
```

**GET 方法特点：**

- 数据附加在 URL 中（查询字符串）
- 有长度限制（约 2048 字符）
- 可收藏为书签
- 数据在地址栏可见
- 适合搜索、分页等操作

#### POST 方法

```html
<form action="/register" method="POST">
  <!-- 敏感数据使用POST -->
  <input type="password" name="password" />
  <button type="submit">注册</button>
</form>
```

**POST 方法特点：**

- 数据在 HTTP 请求体中传输
- 无长度限制（实际受服务器限制）
- 不可收藏为书签
- 数据不可见
- 适合提交敏感或大量数据

#### method 对比表

| 特性      | GET              | POST           |
| --------- | ---------------- | -------------- |
| 数据位置  | URL 查询字符串   | 请求体         |
| 数据大小  | 有限制           | 无限制         |
| 安全性    | 较低（URL 可见） | 较高           |
| 缓存      | 可缓存           | 不可缓存       |
| 后退/刷新 | 无害             | 数据会重新提交 |
| 书签      | 可收藏           | 不可收藏       |
| 使用场景  | 获取数据         | 创建/更新数据  |

### enctype 属性

指定表单数据的编码方式。

#### 1. application/x-www-form-urlencoded

**默认编码方式**，将数据编码为键值对。

```html
<form
  action="/submit"
  method="POST"
  enctype="application/x-www-form-urlencoded"
>
  <input type="text" name="username" value="张三" />
  <input type="text" name="age" value="25" />
</form>

<!-- 编码后的数据：username=%E5%BC%A0%E4%B8%89&age=25 -->
```

#### 2. multipart/form-data

用于文件上传，将数据分成多个部分。

```html
<form action="/upload" method="POST" enctype="multipart/form-data">
  <label for="avatar">头像：</label>
  <input type="file" id="avatar" name="avatar" />

  <label for="description">描述：</label>
  <input type="text" id="description" name="description" />

  <button type="submit">上传</button>
</form>
```

**multipart/form-data 特点：**

- 适合文件上传
- 每个字段都是独立的部分
- 包含边界分隔符
- 可以传输二进制数据

#### 3. text/plain

纯文本编码，很少使用。

```html
<form action="/submit" method="POST" enctype="text/plain">
  <input type="text" name="name" value="李四" />
  <input type="text" name="city" value="北京" />
</form>

<!-- 编码后的数据：
name=李四
city=北京
-->
```

#### enctype 属性总结

| 值                                  | 适用场景     | 特点               |
| ----------------------------------- | ------------ | ------------------ |
| `application/x-www-form-urlencoded` | 普通表单提交 | 默认值，键值对编码 |
| `multipart/form-data`               | 文件上传     | 支持二进制数据     |
| `text/plain`                        | 纯文本提交   | 少用，仅调试       |

### 其他重要属性

#### name 属性

标识表单控件，提交数据时的键名。

```html
<form action="/submit" method="POST">
  <!-- 提交的数据：username=value -->
  <input type="text" name="username" />

  <!-- 相同name的radio，只能选一个 -->
  <input type="radio" name="gender" value="male" />男
  <input type="radio" name="gender" value="female" />女

  <!-- 相同name的checkbox，可以选多个 -->
  <input type="checkbox" name="hobby" value="reading" />阅读
  <input type="checkbox" name="hobby" value="sports" />运动

  <!-- 提交的数据：hobby=reading&hobby=sports -->
</form>
```

#### value 属性

表单控件的值，提交时发送到服务器。

```html
<input type="text" name="color" value="蓝色" />
<input type="hidden" name="token" value="abc123" />
<input type="submit" value="提交按钮" />
<button type="submit" value="custom-value">提交</button>
```

#### required 属性

必填字段验证。

```html
<input type="text" name="username" required />
<input type="email" name="email" required />
<textarea name="message" required></textarea>
<select name="country" required>
  <option value="">请选择</option>
  <option value="CN">中国</option>
</select>
```

#### placeholder 属性

输入提示文本。

```html
<input type="text" placeholder="请输入用户名" name="username" />

<textarea placeholder="请输入您的留言..." rows="4"></textarea>

<!-- 多语言placeholder -->
<input type="text" placeholder="Search..." lang="en" />
```

#### disabled 和 readonly 属性

```html
<!-- disabled: 完全禁用 -->
<input type="text" name="disabled-field" disabled value="不可编辑" />

<!-- readonly: 只读，但可以聚焦 -->
<input type="text" name="readonly-field" readonly value="只读内容" />

<!-- 区别总结 -->
<!-- disabled: 值不会提交，无法聚焦，灰色显示 -->
<!-- readonly: 值会提交，可以聚焦，正常显示 -->
```

#### pattern 属性

正则表达式验证。

```html
<!-- 手机号验证（中国大陆） -->
<input
  type="tel"
  name="phone"
  pattern="1[3-9]\d{9}"
  placeholder="11位手机号"
  title="请输入正确的手机号码"
/>

<!-- 邮政编码 -->
<input type="text" name="zipcode" pattern="\d{6}" title="6位邮政编码" />

<!-- 自定义验证提示 -->
<input
  type="text"
  name="custom"
  pattern="[A-Za-z]{3,10}"
  title="请输入3-10位英文字母"
/>
```

#### autocomplete 属性

自动填充控制。

```html
<!-- 开启自动填充（默认） -->
<input type="text" name="username" autocomplete="on" />

<!-- 关闭自动填充 -->
<input type="text" name="password" autocomplete="off" />

<!-- 特定类型自动填充 -->
<input type="email" name="email" autocomplete="email" />
<input type="tel" name="phone" autocomplete="tel" />
<input type="text" name="address" autocomplete="street-address" />

<!-- 新密码字段 -->
<input type="password" name="new-password" autocomplete="new-password" />
```

## 基本输入类型

### text 文本输入

单行文本输入框。

```html
<!-- 基本文本输入 -->
<label for="name">姓名：</label>
<input
  type="text"
  id="name"
  name="name"
  placeholder="请输入您的姓名"
  maxlength="20"
  minlength="2"
  size="30"
  value="默认值"
/>

<!-- 搜索框 -->
<input
  type="search"
  name="q"
  placeholder="搜索..."
  results="5"
  autosave="search-history"
/>

<!-- 电话号码 -->
<input
  type="tel"
  name="phone"
  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
  placeholder="格式：123-4567-8901"
/>

<!-- URL输入 -->
<input type="url" name="website" placeholder="https://example.com" />

<!-- 邮箱输入 -->
<input type="email" name="email" placeholder="user@example.com" multiple />
<!-- 多个邮箱，用逗号分隔 -->

<!-- 数字输入 -->
<input type="number" name="age" min="0" max="120" step="1" value="18" />

<!-- 范围滑块 -->
<input type="range" name="volume" min="0" max="100" step="5" value="50" />
<output id="volume-output">50</output>

<script>
  document
    .querySelector('input[type="range"]')
    .addEventListener("input", function (e) {
      document.getElementById("volume-output").value = e.target.value;
    });
</script>
```

### password 密码输入

密码输入框，字符会被遮挡。

```html
<!-- 基本密码输入 -->
<label for="password">密码：</label>
<input
  type="password"
  id="password"
  name="password"
  placeholder="6-20位字符"
  minlength="6"
  maxlength="20"
  required
/>

<!-- 显示/隐藏密码功能 -->
<label for="password-toggle">密码：</label>
<div class="password-wrapper">
  <input type="password" id="password-toggle" name="password2" />
  <button type="button" class="toggle-password" aria-label="显示密码">👁</button>
</div>

<!-- 新密码字段 -->
<input
  type="password"
  name="new-password"
  autocomplete="new-password"
  placeholder="新密码"
/>

<!-- 当前密码字段 -->
<input
  type="password"
  name="current-password"
  autocomplete="current-password"
  placeholder="当前密码"
/>
```

#### 密码输入安全性建议

```html
<!-- 1. 添加确认密码 -->
<label for="password">密码：</label>
<input type="password" id="password" name="password" />

<label for="confirm-password">确认密码：</label>
<input type="password" id="confirm-password" name="confirm-password" />

<!-- 2. 密码强度提示 -->
<label for="strong-password">密码：</label>
<input
  type="password"
  id="strong-password"
  name="strong-password"
  pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
  title="至少8位，包含字母和数字"
/>

<!-- 3. 使用password manager友好属性 -->
<input
  type="password"
  name="login-password"
  autocomplete="current-password"
  data-lpignore="true"
/>
<!-- LastPass忽略 -->
```

### radio 单选按钮

单选按钮，同一组中只能选择一个。

```html
<!-- 基本单选按钮 -->
<fieldset>
  <legend>性别</legend>

  <input type="radio" id="male" name="gender" value="male" checked />
  <label for="male">男</label>

  <input type="radio" id="female" name="gender" value="female" />
  <label for="female">女</label>

  <input type="radio" id="other" name="gender" value="other" />
  <label for="other">其他</label>
</fieldset>

<!-- 水平排列 -->
<div class="radio-group">
  <label>
    <input type="radio" name="payment" value="alipay" checked />
    <span>支付宝</span>
  </label>
  <label>
    <input type="radio" name="payment" value="wechat" />
    <span>微信支付</span>
  </label>
  <label>
    <input type="radio" name="payment" value="bank" />
    <span>银行卡</span>
  </label>
</div>

<!-- 带图标的单选按钮 -->
<label class="icon-radio">
  <input type="radio" name="theme" value="light" checked />
  <span class="icon">☀️</span>
  <span>浅色主题</span>
</label>

<label class="icon-radio">
  <input type="radio" name="theme" value="dark" />
  <span class="icon">🌙</span>
  <span>深色主题</span>
</label>

<!-- 使用CSS美化单选按钮 -->
<style>
  .custom-radio {
    display: none;
  }

  .custom-radio + label:before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
  }

  .custom-radio:checked + label:before {
    background-color: #4caf50;
    border-color: #4caf50;
  }
</style>

<input type="radio" id="custom1" name="custom" class="custom-radio" />
<label for="custom1">选项一</label>
```

#### radio 重要特性

1. **同一组 name**：相同 name 的 radio 互斥
2. **必须设置 value**：提交时发送的值
3. **checked 属性**：默认选中
4. **无法取消选中**：除非重置表单或选择其他

### checkbox 复选框

复选框，可以多选。

```html
<!-- 基本复选框 -->
<fieldset>
  <legend>兴趣爱好</legend>

  <input type="checkbox" id="reading" name="hobby" value="reading" />
  <label for="reading">阅读</label>

  <input type="checkbox" id="sports" name="hobby" value="sports" checked />
  <label for="sports">运动</label>

  <input type="checkbox" id="music" name="hobby" value="music" />
  <label for="music">音乐</label>

  <input type="checkbox" id="travel" name="hobby" value="travel" />
  <label for="travel">旅行</label>
</fieldset>

<!-- 全选/全不选功能 -->
<input type="checkbox" id="select-all" />
<label for="select-all">全选</label>

<div class="checkbox-group">
  <input type="checkbox" id="item1" name="items" value="1" />
  <label for="item1">项目一</label>

  <input type="checkbox" id="item2" name="items" value="2" />
  <label for="item2">项目二</label>

  <input type="checkbox" id="item3" name="items" value="3" />
  <label for="item3">项目三</label>
</div>

<script>
  document
    .getElementById("select-all")
    .addEventListener("change", function (e) {
      const checkboxes = document.querySelectorAll(
        '.checkbox-group input[type="checkbox"]'
      );
      checkboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
      });
    });
</script>

<!-- 单个开关/同意条款 -->
<label>
  <input type="checkbox" name="agree" value="yes" required />
  我已阅读并同意<a href="/terms">服务条款</a>
</label>

<!-- 带中间状态（indeterminate） -->
<input type="checkbox" id="indeterminate-checkbox" />
<label for="indeterminate-checkbox">部分选中</label>

<script>
  document.getElementById("indeterminate-checkbox").indeterminate = true;
</script>

<!-- 使用CSS美化复选框 -->
<style>
  .custom-checkbox {
    display: none;
  }

  .custom-checkbox + label:before {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-radius: 3px;
    margin-right: 8px;
    vertical-align: middle;
    transition: all 0.3s;
  }

  .custom-checkbox:checked + label:before {
    background-color: #4caf50;
    border-color: #4caf50;
    content: "✓";
    color: white;
    text-align: center;
    line-height: 18px;
  }
</style>

<input type="checkbox" id="custom-check1" class="custom-checkbox" />
<label for="custom-check1">自定义复选框</label>
```

#### checkbox 数据提交

```html
<form action="/submit" method="POST">
  <!-- 未选中时，不会提交数据 -->
  <input type="checkbox" name="newsletter" value="subscribe" />

  <!-- 选中时，提交：newsletter=subscribe -->

  <!-- 多个同name的checkbox -->
  <input type="checkbox" name="colors" value="red" />红色
  <input type="checkbox" name="colors" value="green" />绿色
  <input type="checkbox" name="colors" value="blue" />蓝色

  <!-- 选中红色和蓝色时，提交：colors=red&colors=blue -->
</form>
```

## 表单验证与交互

### HTML5 内置验证

```html
<!-- 必填验证 -->
<input type="text" name="username" required />

<!-- 长度验证 -->
<input type="text" name="title" minlength="5" maxlength="100" />

<!-- 数值范围验证 -->
<input type="number" name="age" min="18" max="99" />

<!-- 正则表达式验证 -->
<input type="text" name="zipcode" pattern="\d{6}" />

<!-- 邮箱格式验证 -->
<input type="email" name="email" />

<!-- URL格式验证 -->
<input type="url" name="website" />

<!-- 自定义错误消息 -->
<input
  type="text"
  name="custom-field"
  pattern="[A-Z][a-z]+"
  title="首字母大写，后面小写"
  oninvalid="this.setCustomValidity('请按照格式输入：首字母大写，后面小写')"
  oninput="this.setCustomValidity('')"
/>
```

### JavaScript 表单交互

```html
<form id="myForm">
  <input type="text" name="username" id="username" />
  <span id="username-error" class="error"></span>

  <button type="submit">提交</button>
</form>

<script>
  const form = document.getElementById("myForm");
  const usernameInput = document.getElementById("username");
  const errorElement = document.getElementById("username-error");

  // 实时验证
  usernameInput.addEventListener("input", function () {
    if (this.value.length < 3) {
      errorElement.textContent = "用户名至少3个字符";
      this.setCustomValidity("用户名太短");
    } else {
      errorElement.textContent = "";
      this.setCustomValidity("");
    }
  });

  // 表单提交处理
  form.addEventListener("submit", function (event) {
    // 阻止默认提交
    event.preventDefault();

    // 收集表单数据
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 验证
    if (!validateForm(data)) {
      return;
    }

    // 提交到服务器
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("提交成功！");
        form.reset();
      })
      .catch((error) => {
        console.error("提交失败：", error);
      });
  });

  function validateForm(data) {
    // 自定义验证逻辑
    if (!data.username || data.username.trim() === "") {
      alert("请输入用户名");
      return false;
    }
    return true;
  }
</script>
```

### 表单状态反馈

```html
<!-- 验证状态样式 -->
<style>
  input:valid {
    border-color: #4caf50;
  }

  input:invalid {
    border-color: #f44336;
  }

  input:focus:invalid {
    box-shadow: 0 0 5px #f44336;
  }

  .error {
    color: #f44336;
    font-size: 0.9em;
    display: none;
  }

  input:invalid + .error {
    display: block;
  }

  /* 禁用状态 */
  input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  /* 只读状态 */
  input:read-only {
    background-color: #f9f9f9;
    border-color: #ddd;
  }
</style>

<!-- 加载状态 -->
<button type="submit" id="submit-btn">
  <span class="btn-text">提交</span>
  <span class="spinner" style="display: none;">加载中...</span>
</button>

<script>
  document.getElementById("submit-btn").addEventListener("click", function () {
    this.disabled = true;
    this.querySelector(".btn-text").style.display = "none";
    this.querySelector(".spinner").style.display = "inline-block";
  });
</script>
```

## 综合示例

### 用户注册表单

:::code-group

```html [index.html]
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>用户注册</title>
    <!-- <link rel="stylesheet" href="main.css" /> -->
  </head>
  <body>
    <div class="container">
      <div class="form-card">
        <div class="form-header">
          <h1>用户注册</h1>
          <p>请填写以下信息完成注册</p>
        </div>

        <form id="registerForm" action="/api/register" method="POST">
          <!-- 用户名 -->
          <div class="form-group">
            <label for="username" class="required">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="3-20位字母、数字或下划线"
              pattern="^[a-zA-Z0-9_]{3,20}$"
              required
            />
            <div class="error-message">请输入3-20位的字母、数字或下划线</div>
          </div>

          <!-- 邮箱 -->
          <div class="form-group">
            <label for="email" class="required">电子邮箱</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@domain.com"
              required
            />
            <div class="error-message">请输入有效的邮箱地址</div>
          </div>

          <!-- 密码 -->
          <div class="form-group">
            <label for="password" class="required">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="至少8位，包含字母和数字"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              required
              oninput="checkPasswordStrength(this.value)"
            />
            <div class="password-strength">
              <div class="strength-bar" id="strengthBar"></div>
            </div>
            <div class="error-message">密码至少8位，需包含字母和数字</div>
          </div>

          <!-- 确认密码 -->
          <div class="form-group">
            <label for="confirmPassword" class="required">确认密码</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="再次输入密码"
              required
              oninput="checkPasswordMatch()"
            />
            <div class="error-message" id="passwordMatchError">
              两次输入的密码不一致
            </div>
          </div>

          <!-- 性别 -->
          <div class="form-group">
            <label>性别</label>
            <div class="radio-group">
              <label class="radio-item">
                <input type="radio" name="gender" value="male" checked />
                男
              </label>
              <label class="radio-item">
                <input type="radio" name="gender" value="female" />
                女
              </label>
              <label class="radio-item">
                <input type="radio" name="gender" value="other" />
                其他
              </label>
            </div>
          </div>

          <!-- 兴趣爱好 -->
          <div class="form-group">
            <label>兴趣爱好</label>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" name="hobbies" value="reading" />
                阅读
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="hobbies" value="sports" />
                运动
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="hobbies" value="music" />
                音乐
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="hobbies" value="travel" />
                旅行
              </label>
            </div>
          </div>

          <!-- 城市 -->
          <div class="form-group">
            <label for="city">所在城市</label>
            <select id="city" name="city">
              <option value="">请选择城市</option>
              <option value="beijing">北京</option>
              <option value="shanghai">上海</option>
              <option value="guangzhou">广州</option>
              <option value="shenzhen">深圳</option>
              <option value="hangzhou">杭州</option>
              <option value="chengdu">成都</option>
            </select>
          </div>

          <!-- 个人简介 -->
          <div class="form-group">
            <label for="bio">个人简介</label>
            <textarea
              id="bio"
              name="bio"
              rows="4"
              placeholder="简单介绍一下自己..."
              maxlength="200"
            ></textarea>
            <div style="text-align: right; font-size: 14px; color: #666;">
              <span id="charCount">0</span>/200
            </div>
          </div>

          <!-- 条款同意 -->
          <div class="form-group">
            <label class="checkbox-item">
              <input type="checkbox" name="agree" value="yes" required />
              我已阅读并同意
              <a href="/terms" target="_blank">《服务条款》</a>
              和
              <a href="/privacy" target="_blank">《隐私政策》</a>
            </label>
          </div>

          <!-- 按钮组 -->
          <div class="button-group">
            <button type="submit">立即注册</button>
            <button type="reset">重置表单</button>
          </div>
        </form>

        <div class="form-footer">
          <p>已有账号？<a href="/login">立即登录</a></p>
        </div>
      </div>
    </div>

    <script src="./main.js"></script>
  </body>
</html>
```

```css [main.css]
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 500px;
}

.form-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 40px;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.form-header p {
  color: #666;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

.required::after {
  content: " *";
  color: #f44336;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input:invalid:not(:focus):not(:placeholder-shown) {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 14px;
  margin-top: 5px;
  display: none;
}

input:invalid:not(:focus):not(:placeholder-shown) + .error-message {
  display: block;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 8px;
}

.radio-item,
.checkbox-item {
  display: flex;
  align-items: center;
}

.radio-item input[type="radio"],
.checkbox-item input[type="checkbox"] {
  width: auto;
  margin-right: 8px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

button[type="submit"] {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

button[type="submit"]:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

button[type="reset"] {
  background: #f5f5f5;
  color: #666;
}

button[type="reset"]:hover {
  background: #e0e0e0;
}

.form-footer {
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  color: #666;
}

.password-strength {
  height: 4px;
  background: #e0e0e0;
  margin-top: 5px;
  border-radius: 2px;
  overflow: hidden;
}

.strength-bar {
  height: 100%;
  width: 0%;
  transition: width 0.3s, background 0.3s;
}

@media (max-width: 480px) {
  .form-card {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }
}
```

```js [main.js]
// 密码强度检测
function checkPasswordStrength(password) {
  const strengthBar = document.getElementById("strengthBar");
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  // 设置强度条样式
  let width = (strength / 5) * 100;
  let color = "#f44336"; // 红色

  if (strength >= 2 && strength <= 3) {
    color = "#ff9800"; // 橙色
  } else if (strength >= 4) {
    color = "#4CAF50"; // 绿色
  }

  strengthBar.style.width = width + "%";
  strengthBar.style.background = color;
}

// 密码匹配检查
function checkPasswordMatch() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById("passwordMatchError");

  if (confirmPassword && password !== confirmPassword) {
    errorElement.style.display = "block";
    document.getElementById("confirmPassword").setCustomValidity("密码不匹配");
  } else {
    errorElement.style.display = "none";
    document.getElementById("confirmPassword").setCustomValidity("");
  }
}

// 字符计数器
document.getElementById("bio").addEventListener("input", function () {
  const charCount = document.getElementById("charCount");
  charCount.textContent = this.value.length;
});

// 表单提交处理
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // 验证表单
    if (!this.checkValidity()) {
      // 显示所有错误
      const invalidElements = this.querySelectorAll(":invalid");
      invalidElements.forEach((element) => {
        element.reportValidity();
      });
      return;
    }

    // 收集表单数据
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    // 显示加载状态
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "注册中...";
    submitBtn.disabled = true;

    // 模拟API请求
    setTimeout(() => {
      console.log("提交的数据：", data);
      alert("注册成功！（演示）");

      // 恢复按钮状态
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      // 重置表单
      this.reset();
      document.getElementById("strengthBar").style.width = "0%";
      document.getElementById("charCount").textContent = "0";
    }, 1500);
  });
```

:::

### 联系表单示例

:::code-group

```html [index.html]
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>联系我们</title>
    <link rel="stylesheet" href="./main.css" />
  </head>
  <body>
    <div class="contact-form">
      <h2>联系我们</h2>

      <form id="contactForm" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName" class="required">名字</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="请输入名字"
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName" class="required">姓氏</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="请输入姓氏"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label for="email" class="required">邮箱地址</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@domain.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="phone">电话号码</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="格式：123-4567-8901"
            pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
          />
        </div>

        <div class="form-group">
          <label for="subject" class="required">主题</label>
          <select id="subject" name="subject" required>
            <option value="">请选择主题</option>
            <option value="general">一般咨询</option>
            <option value="support">技术支持</option>
            <option value="feedback">产品反馈</option>
            <option value="business">商务合作</option>
            <option value="other">其他</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message" class="required">留言内容</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="请详细描述您的问题或需求..."
            minlength="20"
            maxlength="1000"
            required
          ></textarea>
          <div style="text-align: right; font-size: 12px; color: #666;">
            <span id="messageCount">0</span>/1000
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" name="copy" value="yes" />
            发送副本到我的邮箱
          </label>
        </div>

        <button type="submit" class="submit-btn">发送消息</button>

        <div id="successMessage" class="success-message">
          消息发送成功！我们会尽快回复您。
        </div>
      </form>
    </div>

    <script src="./main.js"></script>
  </body>
</html>
```

```css [main.css]
/* 简洁的联系表单样式 */
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

input,
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.required::after {
  content: " *";
  color: #f44336;
}

.submit-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 14px 30px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #45a049;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.success-message {
  display: none;
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
  text-align: center;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
}
```

```js [main.js]
// 字符计数器
const messageTextarea = document.getElementById("message");
const messageCount = document.getElementById("messageCount");

messageTextarea.addEventListener("input", function () {
  messageCount.textContent = this.value.length;
});

// 表单提交处理
const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector(".submit-btn");
const successMessage = document.getElementById("successMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // 禁用按钮，显示加载状态
  submitBtn.disabled = true;
  submitBtn.textContent = "发送中...";

  // 模拟API请求延迟
  setTimeout(() => {
    // 显示成功消息
    successMessage.style.display = "block";

    // 重置表单
    contactForm.reset();
    messageCount.textContent = "0";

    // 恢复按钮状态
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "发送消息";
      successMessage.style.display = "none";
    }, 3000);
  }, 2000);
});

// 实时验证反馈
const inputs = contactForm.querySelectorAll("input, select, textarea");
inputs.forEach((input) => {
  input.addEventListener("blur", function () {
    this.reportValidity();
  });
});
```

:::

## 最佳实践

### 1. 可访问性指南

```html
<!-- 正确的label关联 -->
<label for="username">用户名</label>
<input type="text" id="username" name="username" />

<!-- 错误消息关联 -->
<input type="email" id="email" name="email" aria-describedby="email-error" />
<span id="email-error" class="error" role="alert"></span>

<!-- 分组描述 -->
<fieldset aria-describedby="fieldset-desc">
  <legend>个人信息</legend>
  <p id="fieldset-desc" class="sr-only">
    请填写您的个人信息，包括姓名、邮箱和电话
  </p>
  <!-- 表单字段 -->
</fieldset>

<!-- 焦点管理 -->
<button type="submit" aria-label="提交表单">提交</button>
```

### 2. 安全性建议

```html
<!-- CSRF防护 -->
<input type="hidden" name="_csrf" value="{{csrfToken}}" />

<!-- 密码安全 -->
<input
  type="password"
  name="password"
  autocomplete="new-password"
  minlength="8"
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
/>

<!-- 文件上传限制 -->
<input
  type="file"
  name="avatar"
  accept="image/jpeg,image/png"
  max-size="5242880"
/>

<!-- 防止表单重复提交 -->
<button type="submit" onclick="this.disabled=true;">提交</button>
```

### 3. 性能优化

```html
<!-- 懒加载验证 -->
<form id="myForm" novalidate>
  <!-- 初始禁用浏览器验证 -->
</form>

<script>
  document.getElementById("myForm").addEventListener("submit", function (e) {
    if (!this.checkValidity()) {
      e.preventDefault();
      // 显示自定义错误
    }
  });
</script>

<!-- 按需加载表单 -->
<button onclick="loadForm()">显示表单</button>
<div id="form-container"></div>

<script>
  async function loadForm() {
    const response = await fetch("/form-template.html");
    const html = await response.text();
    document.getElementById("form-container").innerHTML = html;
  }
</script>
```

### 4. 移动端优化

```html
<!-- 触摸友好的表单 -->
<input type="text" name="search" style="font-size: 16px;" />
<!-- 防止iOS缩放 -->

<!-- 合适的键盘类型 -->
<input type="tel" name="phone" inputmode="tel" />
<input type="email" name="email" inputmode="email" />
<input type="number" name="age" inputmode="numeric" />

<!-- 移动端优化布局 -->
<style>
  @media (max-width: 768px) {
    input,
    select,
    textarea,
    button {
      min-height: 44px; /* 最小触摸目标 */
    }

    .form-row {
      flex-direction: column;
    }
  }
</style>
```

### 5. 表单验证策略

```html
<!-- 分层验证策略 -->
<form id="validatedForm">
  <!-- 1. HTML5基础验证 -->
  <input type="email" name="email" required />

  <!-- 2. 实时JavaScript验证 -->
  <input type="password" name="password" oninput="validatePassword(this)" />

  <!-- 3. 提交时自定义验证 -->
  <script>
    document
      .getElementById("validatedForm")
      .addEventListener("submit", function (e) {
        if (!customValidation()) {
          e.preventDefault();
          showCustomErrors();
        }
      });
  </script>

  <!-- 4. 服务器端验证（必需） -->
</form>
```

### 总结要点

1. **语义化结构**：使用正确的 HTML 元素和属性
2. **可访问性**：确保所有用户都能使用表单
3. **安全性**：防止常见的安全漏洞
4. **用户体验**：提供清晰的反馈和指导
5. **响应式设计**：适应不同设备
6. **性能优化**：减少不必要的验证和请求
7. **渐进增强**：确保基础功能在无 JavaScript 时可用

通过遵循这些最佳实践，可以创建出既美观又实用的 HTML 表单，为用户提供良好的交互体验。
