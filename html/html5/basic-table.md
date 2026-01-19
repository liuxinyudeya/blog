# HTML 表格技术文档

## 概述

HTML 表格用于在网页上展示行列结构的表格化数据。表格由单元格（`<td>`）组成，这些单元格按行（`<tr>`）和列排列。

## 表格基础

### 基本语法

```html
<table>
  <tr>
    <td>单元格1</td>
    <td>单元格2</td>
  </tr>
  <tr>
    <td>单元格3</td>
    <td>单元格4</td>
  </tr>
</table>
```

### 表格基本属性

- `border`：定义表格边框宽度（已弃用，建议使用 CSS）
- `cellpadding`：单元格内边距（已弃用）
- `cellspacing`：单元格间距（已弃用）
- `width`：表格宽度（已弃用）

## 表格结构

### `<table>` 元素

定义整个表格容器。

### `<tr>` 元素

表格行（Table Row），包含一组单元格。

- 每个`<tr>`代表表格中的一行
- 可以包含`<td>`或`<th>`元素

### `<td>` 元素

表格数据单元格（Table Data Cell）。

- 包含表格的实际数据
- 默认显示为普通文本，左对齐

```html
<table>
  <tr>
    <td>姓名</td>
    <td>年龄</td>
    <td>职业</td>
  </tr>
  <tr>
    <td>张三</td>
    <td>28</td>
    <td>工程师</td>
  </tr>
</table>
```

### `<th>` 元素

表格标题单元格（Table Header Cell）。

- 用于定义列或行的标题
- 默认加粗并居中显示
- 添加`scope`属性可提升可访问性
  - `scope="col"`：列标题
  - `scope="row"`：行标题

```html
<table>
  <tr>
    <th scope="col">产品</th>
    <th scope="col">价格</th>
    <th scope="col">库存</th>
  </tr>
  <tr>
    <th scope="row">苹果</th>
    <td>¥5.00</td>
    <td>120</td>
  </tr>
  <tr>
    <th scope="row">香蕉</th>
    <td>¥3.50</td>
    <td>85</td>
  </tr>
</table>
```

## 表格合并

### `colspan` 属性

水平合并单元格（跨列合并）。

```html
<table border="1">
  <tr>
    <th colspan="2">个人信息</th>
    <th colspan="2">联系信息</th>
  </tr>
  <tr>
    <td>姓名</td>
    <td>张三</td>
    <td>电话</td>
    <td>13800138000</td>
  </tr>
</table>
```

### `rowspan` 属性

垂直合并单元格（跨行合并）。

```html
<table border="1">
  <tr>
    <th rowspan="2">月份</th>
    <th colspan="2">销售额</th>
  </tr>
  <tr>
    <th>线上</th>
    <th>线下</th>
  </tr>
  <tr>
    <td>一月</td>
    <td>¥50,000</td>
    <td>¥30,000</td>
  </tr>
</table>
```

### 合并单元格组合使用

```html
<table border="1">
  <tr>
    <th rowspan="2">部门</th>
    <th colspan="3">2023年季度业绩</th>
  </tr>
  <tr>
    <th>Q1</th>
    <th>Q2</th>
    <th>Q3</th>
  </tr>
  <tr>
    <td rowspan="2">技术部</td>
    <td>¥120,000</td>
    <td>¥150,000</td>
    <td>¥180,000</td>
  </tr>
  <tr>
    <td>¥130,000</td>
    <td>¥160,000</td>
    <td>¥190,000</td>
  </tr>
</table>
```

**注意**：合并单元格时需注意表格结构的完整性，确保每行的单元格总数一致。

## 表格标题和分组

### `<caption>` 元素

为表格添加标题，显示在表格上方。

- 必须是`<table>`的第一个子元素
- 一个表格只能有一个`<caption>`

```html
<table border="1">
  <caption>
    2023年公司销售数据
  </caption>
  <tr>
    <th>季度</th>
    <th>销售额</th>
    <th>增长率</th>
  </tr>
  <tr>
    <td>Q1</td>
    <td>¥500,000</td>
    <td>+10%</td>
  </tr>
</table>
```

### 表格分组元素

#### `<thead>` 元素

定义表格的页眉部分。

- 包含表格的标题行（`<th>`）
- 通常与`<tbody>`和`<tfoot>`一起使用

#### `<tbody>` 元素

定义表格的主体部分。

- 包含表格的主要数据行
- 一个表格可以有多个`<tbody>`用于分组数据

#### `<tfoot>` 元素

定义表格的页脚部分。

- 通常包含汇总行
- 可以出现在`<tbody>`之前，浏览器仍会将其渲染在底部

```html
<table border="1">
  <caption>
    员工工资表
  </caption>
  <thead>
    <tr>
      <th>员工ID</th>
      <th>姓名</th>
      <th>基本工资</th>
      <th>奖金</th>
      <th>总额</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>001</td>
      <td>张三</td>
      <td>¥8,000</td>
      <td>¥2,000</td>
      <td>¥10,000</td>
    </tr>
    <tr>
      <td>002</td>
      <td>李四</td>
      <td>¥9,000</td>
      <td>¥1,500</td>
      <td>¥10,500</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4">总计</td>
      <td>¥20,500</td>
    </tr>
  </tfoot>
</table>
```

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>HTML表格示例</title>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
        margin: 20px 0;
      }
      th,
      td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      caption {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 10px;
        text-align: left;
      }
      tfoot {
        background-color: #f9f9f9;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <table>
      <caption>
        项目进度表
      </caption>
      <thead>
        <tr>
          <th rowspan="2">项目阶段</th>
          <th colspan="3">时间安排</th>
          <th rowspan="2">负责人</th>
        </tr>
        <tr>
          <th>开始日期</th>
          <th>结束日期</th>
          <th>工期(天)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>需求分析</td>
          <td>2023-01-01</td>
          <td>2023-01-10</td>
          <td>10</td>
          <td>张三</td>
        </tr>
        <tr>
          <td>设计阶段</td>
          <td>2023-01-11</td>
          <td>2023-01-25</td>
          <td>15</td>
          <td>李四</td>
        </tr>
        <tr>
          <td>开发实现</td>
          <td>2023-01-26</td>
          <td>2023-02-28</td>
          <td>34</td>
          <td>王五</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4">总工期</td>
          <td>59天</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
```

## 最佳实践和注意事项

1. **语义化使用**：正确使用`<th>`表示标题，`<td>`表示数据
2. **可访问性**：
   - 为`<th>`元素添加`scope`属性
   - 使用`<caption>`提供表格描述
   - 复杂表格考虑使用`headers`和`id`属性关联单元格
3. **样式控制**：避免使用 HTML 属性设置样式，使用 CSS 控制外观
4. **响应式设计**：对于复杂表格，在小屏幕设备上可能需要特殊处理
5. **避免嵌套过深**：避免表格嵌套表格，这会增加复杂性和降低性能

## 浏览器兼容性

所有现代浏览器都完全支持 HTML 表格元素和属性。表格是 HTML 最早的功能之一，具有极佳的浏览器兼容性。

## 相关 CSS 属性

- `border-collapse`：控制边框合并方式
- `border-spacing`：设置单元格间距
- `empty-cells`：控制空单元格显示
- `table-layout`：设置表格布局算法（auto/fixed）
