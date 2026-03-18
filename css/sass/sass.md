# [Sass](https://www.sass.hk/)

> Sass (Syntactically Awesome StyleSheets)是一款强化 CSS 的辅助工具。
>
> 它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅。
>
> 使用 Sass 以及 Sass 的样式库（如 Compass）有助于更好地组织管理样式文件，以及更高效地开发项目。

## 1. CSS 的不足与挑战

CSS（层叠样式表）作为 Web 样式设计的标准语言，虽然简单易用，但随着项目规模不断扩大，其原生缺陷逐渐暴露：

- **缺乏变量机制**：相同的颜色、尺寸值需要反复书写，修改一处需全局替换，极易出错。
- **缺少嵌套结构**：无法按照 HTML 层级书写样式，导致选择器冗长且难以维护。
- **复用困难**：没有类似函数或混合的功能，相似的样式块只能复制粘贴，代码臃肿。
- **无法进行逻辑运算**：不支持颜色计算、数学运算等动态样式生成。
- **模块化管理缺失**：所有样式全局生效，容易产生命名冲突，且难以分文件组织。

这些问题严重影响了大型项目的开发效率和可维护性。

## 2. Sass 是什么？

**Sass**（Syntactically Awesome Style Sheets）是一种 CSS 预处理器，它在 CSS 基础上增加了**变量、嵌套、混合、继承、函数、模块化**等编程特性，然后编译为标准 CSS。Sass 诞生于 2006 年，是目前最成熟、生态最丰富的预处理器之一。

Sass 提供两种语法：

- **SCSS**（.scss）：完全兼容 CSS，使用花括号和分号，是主流选择。
- **缩进语法**（.sass）：省略花括号和分号，依靠缩进表示嵌套，更简洁但需适应。

## 3. Sass 的核心特性与解决问题

### 3.1 变量 | 告别魔法数字

**特性**：使用 `$` 定义变量，存储颜色、字体、尺寸等重复值。
**解决的问题**：一处修改，全局生效，避免手动查找替换。

```scss
$primary-color: #3498db;
$base-padding: 16px;

.button {
  background-color: $primary-color;
  padding: $base-padding;
}
```

### 3.2 嵌套 | 结构清晰的层级关系

**特性**：按照 HTML 结构书写样式，使用 `&` 引用父选择器。
**解决的问题**：消除重复书写父选择器，减少代码量，更直观。

```scss
.navbar {
  background: #333;
  ul {
    list-style: none;
  }
  li {
    display: inline-block;
    a {
      color: white;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
```

### 3.3 混合 | 样式复用单元

**特性**：`@mixin` 定义可复用样式块，`@include` 引入，可传参。
**解决的问题**：避免重复代码块，支持参数化定制。

```scss
@mixin border-radius($radius) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
}

.card {
  @include border-radius(8px);
}
```

### 3.4 继承 | 减少重复规则

**特性**：`@extend` 让一个选择器继承另一组样式，编译后合并选择器。
**解决的问题**：优化生成的 CSS，避免类爆炸。

```scss
%message {
  padding: 10px;
  border: 1px solid #ccc;
}
.error {
  @extend %message;
  border-color: red;
}
```

### 3.5 函数与运算 | 动态计算

**特性**：支持数值运算、颜色函数（`lighten`、`darken`）、字符串函数等。
**解决的问题**：实现基于设计稿的动态尺寸、主题色衍生等。

```scss
.container {
  width: 100% / 3; // 33.33333%
  background: lighten(#3498db, 20%);
}
```

### 3.6 控制指令 | 逻辑编程

**特性**：`@if`、`@for`、`@each`、`@while` 实现条件判断和循环。
**解决的问题**：生成大量有规律但难以手写的样式，如栅格系统。

```scss
@for $i from 1 through 12 {
  .col-#{$i} {
    width: 100% / 12 * $i;
  }
}
```

### 3.7 模块化 | 文件拆分与命名空间

**特性**：`@use` 和 `@forward` 替代旧版 `@import`，实现真正的模块隔离。
**解决的问题**：避免全局命名冲突，明确依赖关系，按需加载。

```scss
// _variables.scss
$primary: #333;

// style.scss
@use "variables";
body {
  color: variables.$primary;
}
```

## 4. Sass 核心模块

Sass 从 Dart Sass 1.23.0 开始引入内置模块系统，通过 `@use` 加载模块，提供丰富的函数和混入。主要模块如下：

### 4.1 `sass:color` | 颜色处理

提供颜色创建、调整、混合等函数。

- `color.adjust($color, $red, $green, $blue)`：调整颜色分量。
- `color.scale($color, $lightness, $saturation)`：按比例调整。
- `color.mix($color1, $color2, $weight)`：混合两种颜色。
- `color.complement($color)`：获取互补色。

### 4.2 `sass:math` | 数学运算

提供安全的数学函数，避免 CSS 计算歧义。

- `math.ceil($number)`、`math.floor()`、`math.round()`
- `math.max($numbers...)`、`math.min()`
- `math.random($limit)`：随机数。
- `math.div($number1, $number2)`：除法（代替 `/` 符号）。

### 4.3 `sass:string` | 字符串操作

- `string.index($string, $substring)`：查找子串位置。
- `string.insert($string, $insert, $index)`：插入字符串。
- `string.length($string)`：长度。
- `string.slice($string, $start-at, $end-at)`：截取子串。
- `string.to-upper-case()`、`string.to-lower-case()`

### 4.4 `sass:list` | 列表操作

Sass 列表用空格或逗号分隔。

- `list.append($list, $value)`：追加元素。
- `list.index($list, $value)`：查找索引。
- `list.length($list)`、`list.nth($list, $n)`：获取长度与第 n 项。
- `list.join($list1, $list2)`：合并列表。

### 4.5 `sass:map` | 映射（字典）操作

处理键值对数据，常用于配置主题。

- `map.get($map, $key)`：获取值。
- `map.set($map, $key, $value)`：设置键值。
- `map.keys($map)`、`map.values($map)`：获取所有键/值。
- `map.has-key($map, $key)`：检查是否存在。
- `map.merge($map1, $map2)`：合并两个 map。

### 4.6 `sass:selector` | 选择器操作

用于动态生成或操作选择器。

- `selector.nest($selectors...)`：嵌套选择器。
- `selector.append($selectors...)`：追加选择器。
- `selector.replace($selector, $original, $replacement)`：替换选择器部分。

### 4.7 `sass:meta` | 元编程

提供类型检查、函数调用等高级功能。

- `meta.type-of($value)`：返回值的类型（如 number、string、color）。
- `meta.global-variable-exists($name)`：检查全局变量是否存在。
- `meta.call($function, $args...)`：动态调用函数。
- `meta.inspect($value)`：返回值的字符串表示，常用于调试。

## 5. 总结

Sass 通过引入编程特性，完美弥补了 CSS 的先天不足：

- **变量** → 消除魔法数字
- **嵌套** → 结构清晰，减少重复
- **混合/继承** → 代码复用
- **函数/运算** → 动态样式生成
- **控制指令** → 批量生成规律样式
- **模块系统** → 组织大型项目，避免冲突

借助内置模块，Sass 进一步提供了专业化的工具函数，使样式开发更加高效、健壮。无论是个人项目还是团队协作，Sass 都是提升 CSS 生产力的首选工具。
