# HTML 文本与内容标签

## 标题标签（h1-h6）

标题标签用于定义文档的标题层次，从最重要的 `<h1>` 到最不重要的 `<h6>`。

### 基本语法

```html
<h1>主标题 - 通常用于页面主要标题</h1>
<h2>二级标题 - 章节标题</h2>
<h3>三级标题 - 子章节标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题 - 最低级别标题</h6>
```

### 使用规则与最佳实践

#### 1. 标题层次结构

```html
<!-- 正确的层次结构 -->
<h1>博客标题</h1>
<h2>第一章：HTML基础</h2>
<h3>1.1 HTML简介</h3>
<h4>1.1.1 历史发展</h4>
<h3>1.2 基本语法</h3>
<h2>第二章：CSS样式</h2>
<h3>2.1 选择器</h3>
```

#### 2. SEO 优化建议

```html
<!-- 每个页面只使用一个h1 -->
<h1>产品名称 - 最佳使用指南</h1>

<!-- 使用语义化的标题 -->
<h2>产品特性</h2>
<h2>安装步骤</h2>
<h2>常见问题</h2>

<!-- 避免跳级使用 -->
<!-- 错误示例 -->
<h1>标题</h1>
<h3>子标题</h3>
<!-- 跳过了h2 -->

<!-- 正确示例 -->
<h1>标题</h1>
<h2>子标题</h2>
```

#### 3. 标题属性

```html
<h1 id="main-title" class="page-title" title="页面主标题">HTML学习指南</h1>
<h2 data-chapter="1" align="center">第一章：基础语法</h2>
```

### 样式与 CSS 配合

```html
<style>
  /* 重置默认样式 */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0;
    font-weight: bold;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    color: #333;
    border-bottom: 2px solid #4caf50;
    padding-bottom: 10px;
  }

  h2 {
    font-size: 2rem;
    color: #444;
    margin-top: 1.5em;
  }

  h3 {
    font-size: 1.5rem;
    color: #555;
  }

  /* 打印样式 */
  @media print {
    h1 {
      page-break-after: avoid;
    }
  }
</style>
```

## 段落与文本格式化

### 段落标签（p）

用于定义文本段落。

```html
<!-- 基本用法 -->
<p>这是一个段落文本。</p>

<!-- 多个段落 -->
<p>第一段文本内容。可以包含多个句子，浏览器会自动换行显示。</p>
<p>第二段文本内容。每个p标签都会在新行开始。</p>

<!-- 包含内联元素 -->
<p>
  这是一个包含<strong>强调文本</strong>和
  <a href="#">链接</a>的段落。
</p>
```

### 换行标签（br）

强制文本换行，是空元素（自闭合标签）。

```html
<p>
  第一行文本<br />
  第二行文本<br /><br />
  <!-- 两个br实现空行 -->
  第三行文本
</p>

<!-- 地址显示 -->
<address>
  公司名称<br />
  街道地址<br />
  城市，邮编<br />
  联系电话
</address>

<!-- 诗歌或歌词 -->
<pre>
  春眠不觉晓，<br>
  处处闻啼鸟。<br>
  夜来风雨声，<br>
  花落知多少。
</pre>
```

### 水平线标签（hr）

创建主题分隔的水平线。

```html
<section>
  <h2>第一部分</h2>
  <p>第一部分的内容...</p>
</section>

<hr />
<!-- 主题分隔 -->

<section>
  <h2>第二部分</h2>
  <p>第二部分的内容...</p>
</section>

<hr size="3" width="80%" color="#4CAF50" noshade />
```

### 文本格式化标签

#### 语义化强调标签

```html
<p>
  <!-- strong: 表示内容重要性 -->
  <strong>警告：</strong>此操作不可逆转！

  <!-- em: 表示强调（通常斜体） -->
  这是一段<em>非常重要</em>的说明。

  <!-- mark: 高亮标记 -->
  请特别注意<mark>截止日期</mark>。
</p>
```

#### 文本样式标签

```html
<p>
  <!-- b: 粗体（无语义） -->
  这是<b>粗体</b>文本

  <!-- i: 斜体（技术术语、外文等） -->
  <i>Homo sapiens</i>是智人的学名

  <!-- u: 下划线 -->
  这是<u>下划线</u>文本

  <!-- s: 删除线（已不再正确） -->
  原价：<s>¥100</s> 现价：¥80

  <!-- ins: 插入内容 -->
  最新<ins>新增</ins>的功能

  <!-- del: 删除内容 -->
  已<del>移除</del>的旧功能
</p>
```

#### 上下标标签

```html
<p>
  <!-- sub: 下标 -->
  水的化学式：H<sub>2</sub>O

  <!-- sup: 上标 -->
  数学公式：x<sup>2</sup> + y<sup>2</sup> = r<sup>2</sup>

  <!-- 脚注 -->
  这是一个研究结果<sup>[1]</sup>
</p>
```

#### 其他文本标签

```html
<p>
  <!-- small: 小号文本（免责声明等） -->
  <small>*条款和条件适用</small>

  <!-- abbr: 缩写 -->
  <abbr title="HyperText Markup Language">HTML</abbr>

  <!-- code: 代码片段 -->
  使用<code>console.log()</code>调试

  <!-- kbd: 键盘输入 -->
  按<kbd>Ctrl</kbd> + <kbd>C</kbd>复制

  <!-- var: 变量 -->
  设变量<var>x</var> = 10

  <!-- samp: 程序输出 -->
  程序输出：<samp>Hello, World!</samp>
</p>
```

## 列表标签

### 无序列表（ul, li）

用于创建没有特定顺序的项目列表。

```html
<!-- 基本无序列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>

<!-- 带CSS样式的列表 -->
<ul class="custom-list">
  <li class="item active">首页</li>
  <li class="item">产品</li>
  <li class="item">服务</li>
  <li class="item">关于我们</li>
  <li class="item">联系我们</li>
</ul>

<!-- 列表项包含复杂内容 -->
<ul>
  <li>
    <h3>前端技术</h3>
    <p>HTML、CSS、JavaScript</p>
  </li>
  <li>
    <h3>后端技术</h3>
    <p>Node.js、Python、Java</p>
  </li>
</ul>
```

### 有序列表（ol, li）

用于创建有顺序的编号列表。

```html
<!-- 基本有序列表 -->
<ol>
  <li>准备材料</li>
  <li>混合搅拌</li>
  <li>烘烤30分钟</li>
  <li>冷却后装饰</li>
</ol>

<!-- 自定义起始编号 -->
<ol start="10">
  <li>第十个项目</li>
  <li>第十一个项目</li>
</ol>

<!-- 倒序列表 -->
<ol reversed>
  <li>第三步</li>
  <li>第二步</li>
  <li>第一步</li>
</ol>

<!-- 指定编号类型 -->
<ol type="A">
  <li>项目A</li>
  <li>项目B</li>
</ol>

<ol type="I">
  <li>第一章</li>
  <li>第二章</li>
</ol>

<!-- type取值 -->
<!-- 1: 数字 (默认) -->
<!-- A: 大写字母 -->
<!-- a: 小写字母 -->
<!-- I: 大写罗马数字 -->
<!-- i: 小写罗马数字 -->
```

### 定义列表（dl, dt, dd）

用于创建术语及其定义的列表。

```html
<!-- 基本定义列表 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于创建网页结构</dd>

  <dt>CSS</dt>
  <dd>层叠样式表，用于描述网页表现</dd>

  <dt>JavaScript</dt>
  <dd>脚本语言，用于实现网页交互</dd>
</dl>

<!-- 多个dd对应一个dt -->
<dl>
  <dt>咖啡</dt>
  <dd>黑色的热饮</dd>
  <dd>含咖啡因的提神饮料</dd>

  <dt>牛奶</dt>
  <dd>白色的冷饮</dd>
</dl>

<!-- 复杂内容定义列表 -->
<dl class="glossary">
  <dt>
    <strong>API</strong>
    <span class="pronunciation">/ˌeɪpiːˈaɪ/</span>
  </dt>
  <dd>
    <p>应用程序编程接口（Application Programming Interface）</p>
    <p>是一组定义、协议和工具的集合，用于构建软件应用。</p>
    <ul>
      <li>Web API</li>
      <li>系统 API</li>
      <li>库 API</li>
    </ul>
  </dd>
</dl>
```

### 列表嵌套与属性

```html
<!-- 列表嵌套 -->
<ul>
  <li>
    前端开发
    <ul>
      <li>
        HTML
        <ol>
          <li>HTML5</li>
          <li>语义化标签</li>
        </ol>
      </li>
      <li>
        CSS
        <ul>
          <li>CSS3</li>
          <li>Flexbox</li>
          <li>Grid</li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    后端开发
    <ol>
      <li>Node.js</li>
      <li>Python</li>
      <li>Java</li>
    </ol>
  </li>
</ul>

<!-- 列表属性（已弃用，建议使用CSS） -->
<ul type="square">
  <!-- disc|circle|square -->
  <li>项目一</li>
  <li>项目二</li>
</ul>

<ol type="I" start="5">
  <li>罗马数字5</li>
  <li>罗马数字6</li>
</ol>

<!-- 使用CSS替代 -->
<style>
  .custom-ul {
    list-style-type: square; /* 实心方块 */
    list-style-position: inside; /* 标记在内部 */
    padding-left: 20px;
  }

  .custom-ol {
    list-style-type: upper-roman; /* 大写罗马数字 */
    counter-reset: section;
  }

  .no-bullets {
    list-style-type: none;
    padding-left: 0;
  }
</style>
```

## 引用标签

### 块引用（blockquote）

用于引用大段内容，通常单独显示。

```html
<!-- 基本块引用 -->
<blockquote>
  <p>Stay hungry, stay foolish.</p>
</blockquote>

<!-- 带出处的引用 -->
<blockquote cite="https://www.example.com/source">
  <p>设计不仅仅是外观和感觉。设计是它如何工作。</p>
  <footer>
    — 史蒂夫·乔布斯,
    <cite>《乔布斯传》</cite>
  </footer>
</blockquote>

<!-- 嵌套引用 -->
<blockquote>
  <p>第一层引用内容</p>
  <blockquote>
    <p>第二层引用内容</p>
  </blockquote>
</blockquote>

<!-- 样式示例 -->
<blockquote class="quote-box">
  <div class="quote-icon">"</div>
  <p class="quote-text">成功的秘诀在于对目标的坚定不移。</p>
  <div class="quote-author">— 本杰明·迪斯雷利</div>
</blockquote>

<style>
  .quote-box {
    border-left: 4px solid #4caf50;
    padding: 20px;
    margin: 20px 0;
    background-color: #f9f9f9;
    font-style: italic;
  }

  .quote-icon {
    font-size: 3rem;
    color: #4caf50;
    line-height: 1;
  }

  .quote-author {
    text-align: right;
    font-weight: bold;
    color: #666;
  }
</style>
```

### 行内引用（q）

用于短小的行内引用。

```html
<p>
  正如孔子所说：
  <q cite="https://zh.wikipedia.org/wiki/论语"> 学而时习之，不亦说乎？ </q>
</p>

<p>
  根据牛顿第三定律：
  <q>作用力与反作用力大小相等，方向相反。</q>
</p>

<!-- 多语言引用 -->
<p lang="en">
  Shakespeare wrote:
  <q lang="en" cite="https://www.shakespeare.com/hamlet">
    To be, or not to be, that is the question.
  </q>
</p>

<!-- 浏览器会自动添加引号 -->
<!-- 中文：使用「」或"" -->
<!-- 英文：使用"" -->
<!-- 法文：使用《》 -->
```

### 来源引用（cite）

用于指明引用作品的标题。

```html
<!-- 引用书籍 -->
<p>
  更多信息请参考：
  <cite>《JavaScript高级程序设计》</cite>
</p>

<!-- 引用文章 -->
<p>根据<cite>W3C HTML规范</cite>的规定...</p>

<!-- 引用网页 -->
<p>
  数据来源：
  <cite>
    <a href="https://www.w3.org">W3C官方网站</a>
  </cite>
</p>

<!-- 艺术作品 -->
<figure>
  <img src="mona-lisa.jpg" alt="蒙娜丽莎" />
  <figcaption>
    列奥纳多·达·芬奇的
    <cite>蒙娜丽莎</cite>
  </figcaption>
</figure>

<!-- 电影引用 -->
<p>
  我最喜欢的电影是
  <cite>《肖申克的救赎》</cite>， 其中有一句经典台词：
  <q>希望是美好的，也许是人间至善。</q>
</p>
```

## 综合示例

### 完整的文章结构示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>HTML文本标签完整示例</title>
    <style>
      body {
        font-family: "Microsoft YaHei", sans-serif;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      article {
        background: #fff;
        padding: 30px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      h1 {
        color: #2c3e50;
        border-bottom: 3px solid #3498db;
      }

      .meta {
        color: #7f8c8d;
        font-size: 0.9em;
        margin-bottom: 30px;
      }

      blockquote {
        background: #f8f9fa;
        border-left: 5px solid #3498db;
        padding: 15px 20px;
        margin: 20px 0;
      }

      .important {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        padding: 15px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <article>
      <header>
        <h1>HTML文本与内容标签详解</h1>
        <div class="meta">
          作者：<strong>前端开发者</strong> | 发布时间：<time
            datetime="2024-01-20"
            >2024年1月20日</time
          >
        </div>
      </header>

      <section>
        <h2>引言</h2>
        <p>
          HTML（HyperText Markup Language）是构建网页的基础。 正如<cite
            >Tim Berners-Lee</cite
          >所说：
          <q>The Web as I envisaged it, we have not seen it yet.</q>
        </p>

        <blockquote>
          <p>好的HTML结构是Web可访问性和SEO的基础。</p>
          <footer>— 来自<cite>《Web开发最佳实践》</cite></footer>
        </blockquote>
      </section>

      <section>
        <h2>主要内容</h2>

        <div class="important">
          <p><strong>注意：</strong>以下内容需要重点关注。</p>
        </div>

        <h3>一、标题的正确使用</h3>
        <p>标题层级应该像这样组织：</p>

        <ol>
          <li>使用唯一的<code>&lt;h1&gt;</code>作为页面主标题</li>
          <li>
            使用<code>&lt;h2&gt;</code>作为主要章节
            <ul>
              <li>使用<code>&lt;h3&gt;</code>作为子章节</li>
              <li>避免跳过标题层级</li>
            </ul>
          </li>
        </ol>

        <h3>二、文本格式化示例</h3>
        <p>在HTML中，我们可以使用多种标签格式化文本：</p>

        <dl>
          <dt><code>&lt;strong&gt;</code></dt>
          <dd>表示<strong>重要性</strong>，不仅视觉上粗体，还有语义意义</dd>

          <dt><code>&lt;em&gt;</code></dt>
          <dd>表示<em>强调</em>，通常显示为斜体</dd>

          <dt><code>&lt;mark&gt;</code></dt>
          <dd>用于<mark>高亮标记</mark>重要文本</dd>
        </dl>

        <h3>三、引用示例</h3>
        <p>下面展示不同类型的引用：</p>

        <blockquote>
          <p>这是块级引用，通常用于引用大段内容。</p>
          <p>可以包含多个段落。</p>
          <footer>— 引用来源</footer>
        </blockquote>

        <p>
          行内引用：爱因斯坦说过，
          <q>想象力比知识更重要。</q>
        </p>
      </section>

      <section>
        <h2>总结</h2>
        <p>正确使用HTML文本标签：</p>

        <ul>
          <li>遵循语义化原则</li>
          <li>保持标题层级完整</li>
          <li>合理使用文本格式化标签</li>
          <li>正确标注引用来源</li>
        </ul>

        <p>
          <small>注：本文仅供参考，实际使用时请参考最新规范。</small>
        </p>
      </section>

      <hr />

      <footer>
        <p>相关资源：</p>
        <ul>
          <li><a href="#">HTML规范文档</a></li>
          <li><a href="#">CSS样式指南</a></li>
          <li><a href="#">Web可访问性指南</a></li>
        </ul>

        <p>版权信息：&copy; 2024 前端技术博客</p>
      </footer>
    </article>
  </body>
</html>
```

### 技术文档示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>API文档示例</title>
  </head>
  <body>
    <h1>API参考文档</h1>

    <section id="introduction">
      <h2>简介</h2>
      <p>
        本文档提供了<abbr title="Application Programming Interface">API</abbr
        >的详细说明。
      </p>
    </section>

    <section id="methods">
      <h2>方法列表</h2>

      <dl>
        <dt id="getUser">
          <code>GET /api/users/:id</code>
        </dt>
        <dd>
          <p>获取指定ID的用户信息。</p>

          <h4>参数：</h4>
          <ul>
            <li><code>id</code> <small>(必需)</small> - 用户ID</li>
            <li><code>fields</code> <small>(可选)</small> - 返回字段</li>
          </ul>

          <h4>返回值：</h4>
          <pre><code>{
  "id": 1,
  "name": "张三",
  "email": "zhangsan@example.com"
}</code></pre>

          <h4>状态码：</h4>
          <ol>
            <li><kbd>200</kbd> - 成功</li>
            <li><kbd>404</kbd> - 用户不存在</li>
            <li><kbd>500</kbd> - 服务器错误</li>
          </ol>
        </dd>
      </dl>
    </section>

    <section id="notes">
      <h2>注意事项</h2>
      <div class="important">
        <p><strong>重要：</strong>所有API请求都需要认证。</p>
        <p>请确保在请求头中包含有效的<code>Authorization</code>令牌。</p>
      </div>
    </section>
  </body>
</html>
```

## 总结

HTML 文本与内容标签是构建网页内容的基础工具。正确使用这些标签不仅可以创建结构良好的文档，还能：

### 关键要点

1. **语义化优先**：选择能准确描述内容含义的标签
2. **层级清晰**：保持标题和列表的层次结构完整
3. **可访问性**：为屏幕阅读器等辅助技术提供良好支持
4. **SEO 友好**：帮助搜索引擎理解页面内容结构
5. **响应式设计**：配合 CSS 创建适应不同设备的布局

### 最佳实践清单

- ✓ 每个页面只使用一个`<h1>`
- ✓ 按顺序使用标题层级（h1→h2→h3...）
- ✓ 使用语义化标签（`<strong>`而非`<b>`）
- ✓ 为列表添加适当的类名和 ID
- ✓ 引用内容注明出处
- ✓ 使用`<abbr>`标签解释缩写
- ✓ 为代码片段使用`<code>`标签

通过合理组合使用这些标签，可以创建出结构清晰、语义明确、易于维护的 HTML 文档。
