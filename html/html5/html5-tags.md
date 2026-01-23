# HTML5 新标签

## 语义化标签

### 核心语义标签

#### `<header>` - 文档或区块的页眉

```html
<!-- 网站页眉 -->
<header class="site-header">
  <h1>网站标题</h1>
  <p>网站副标题或标语</p>
</header>

<!-- 文章页眉 -->
<article>
  <header>
    <h2>文章标题</h2>
    <p>
      作者：张三 | 发布日期：<time datetime="2023-10-01">2023年10月1日</time>
    </p>
  </header>
  <!-- 文章内容 -->
</article>
```

#### `<nav>` - 导航链接区域

```html
<nav aria-label="主导航">
  <ul>
    <li><a href="/" aria-current="page">首页</a></li>
    <li><a href="/products">产品</a></li>
    <li><a href="/about">关于我们</a></li>
    <li><a href="/contact">联系我们</a></li>
  </ul>
</nav>

<!-- 页脚导航 -->
<footer>
  <nav aria-label="页脚导航">
    <a href="/sitemap">网站地图</a> | <a href="/privacy">隐私政策</a> |
    <a href="/terms">服务条款</a>
  </nav>
</footer>
```

#### `<main>` - 文档主要内容

```html
<body>
  <header>...</header>

  <main id="main-content">
    <h1>页面主标题</h1>
    <p>页面主要内容区域...</p>

    <!-- 每个页面应只有一个main元素 -->
    <!-- 不应放在article、aside、footer、header、nav等元素内 -->
  </main>

  <aside>...</aside>
  <footer>...</footer>
</body>
```

#### `<article>` - 独立内容区块

```html
<article class="blog-post">
  <header>
    <h2>HTML5语义化标签详解</h2>
    <p class="meta">
      <span>作者：李四</span>
      <time datetime="2023-10-15T14:30:00">2023年10月15日 14:30</time>
    </p>
  </header>

  <section>
    <h3>什么是语义化HTML</h3>
    <p>语义化HTML意味着使用恰当的HTML元素来表达内容的含义...</p>
  </section>

  <footer>
    <p>标签：<a href="/tag/html">HTML</a>, <a href="/tag/html5">HTML5</a></p>
    <div class="comments">
      <h4>评论</h4>
      <!-- 评论内容 -->
    </div>
  </footer>
</article>

<!-- article可以嵌套 -->
<article class="forum-post">
  <article class="reply">
    <p>我同意楼主的观点...</p>
  </article>
</article>
```

#### `<section>` - 文档中的章节

```html
<article>
  <h1>CSS Grid布局指南</h1>

  <section id="introduction">
    <h2>简介</h2>
    <p>CSS Grid是一个强大的二维布局系统...</p>
  </section>

  <section id="basic-concepts">
    <h2>基本概念</h2>
    <p>Grid布局由容器和项目组成...</p>

    <section id="grid-container">
      <h3>Grid容器</h3>
      <p>通过display: grid创建Grid容器...</p>
    </section>

    <section id="grid-item">
      <h3>Grid项目</h3>
      <p>Grid容器的直接子元素成为Grid项目...</p>
    </section>
  </section>
</article>

<!-- 独立的章节 -->
<section aria-labelledby="news-heading">
  <h2 id="news-heading">最新新闻</h2>
  <div class="news-list">
    <!-- 新闻列表 -->
  </div>
</section>
```

#### `<aside>` - 侧边栏或附属内容

```html
<!-- 主内容旁边的侧边栏 -->
<main>
  <article>
    <!-- 主文章内容 -->
  </article>

  <aside class="sidebar">
    <section class="related-articles">
      <h3>相关文章</h3>
      <ul>
        <li><a href="/article/1">HTML5新特性</a></li>
        <li><a href="/article/2">CSS3动画指南</a></li>
      </ul>
    </section>

    <section class="advertisement">
      <h3>赞助商</h3>
      <!-- 广告内容 -->
    </section>
  </aside>
</main>

<!-- 文章内的旁注 -->
<article>
  <p>HTML5于2014年正式发布<aside>W3C于2014年10月28日发布HTML5推荐标准</aside>，带来了许多新特性...</p>
</article>
```

#### `<footer>` - 文档或区块的页脚

```html
<!-- 网站页脚 -->
<footer class="site-footer">
  <div class="footer-content">
    <section class="contact-info">
      <h3>联系我们</h3>
      <address>
        <p>地址：北京市朝阳区xxx路xx号</p>
        <p>电话：<a href="tel:+861000000000">+86 10 0000 0000</a></p>
        <p>
          邮箱：<a href="mailto:contact@example.com">contact@example.com</a>
        </p>
      </address>
    </section>

    <section class="social-links">
      <h3>关注我们</h3>
      <ul>
        <li><a href="https://weibo.com" aria-label="微博">🐦</a></li>
        <li><a href="https://weixin.qq.com" aria-label="微信">💬</a></li>
      </ul>
    </section>

    <section class="copyright">
      <p>&copy; 2023 示例公司. 保留所有权利.</p>
      <p><a href="/privacy">隐私政策</a> | <a href="/terms">使用条款</a></p>
    </section>
  </div>
</footer>

<!-- 文章页脚 -->
<article>
  <!-- 文章内容 -->
  <footer class="article-footer">
    <p>
      本文采用<a href="https://creativecommons.org/licenses/by/4.0/"
        >CC BY 4.0</a
      >许可协议
    </p>
    <button class="share-button">分享文章</button>
  </footer>
</article>
```

### 文档结构示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>博客网站 - HTML5语义化示例</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <!-- 跳过导航链接（无障碍功能） -->
    <a href="#main-content" class="skip-link">跳转到主内容</a>

    <!-- 网站页眉 -->
    <header class="site-header" role="banner">
      <div class="container">
        <a href="/" class="logo">
          <img src="logo.png" alt="网站Logo" width="100" height="50" />
          <span class="site-name">技术博客</span>
        </a>

        <!-- 主导航 -->
        <nav class="main-nav" aria-label="主导航">
          <button
            class="menu-toggle"
            aria-expanded="false"
            aria-controls="nav-menu"
          >
            <span class="hamburger"></span>
            <span class="sr-only">菜单</span>
          </button>

          <ul id="nav-menu">
            <li><a href="/" aria-current="page">首页</a></li>
            <li><a href="/tutorials">教程</a></li>
            <li><a href="/articles">文章</a></li>
            <li><a href="/resources">资源</a></li>
            <li><a href="/about">关于</a></li>
          </ul>
        </nav>

        <!-- 搜索框 -->
        <form class="search-form" role="search">
          <label for="search-input" class="sr-only">搜索</label>
          <input type="search" id="search-input" placeholder="搜索..." />
          <button type="submit">🔍</button>
        </form>
      </div>
    </header>

    <!-- 面包屑导航 -->
    <nav class="breadcrumb" aria-label="面包屑导航">
      <ol>
        <li><a href="/">首页</a></li>
        <li><a href="/articles">文章</a></li>
        <li aria-current="page">HTML5语义化标签</li>
      </ol>
    </nav>

    <div class="container">
      <!-- 主要内容 -->
      <main id="main-content" class="main-content" role="main">
        <article class="blog-post">
          <header>
            <h1>HTML5语义化标签详解</h1>
            <div class="post-meta">
              <span class="author"
                >作者：<a href="/author/zhangsan">张三</a></span
              >
              <time datetime="2023-10-15T14:30:00" class="publish-date">
                发布日期：2023年10月15日
              </time>
              <span class="reading-time">阅读时间：5分钟</span>
            </div>
          </header>

          <section class="post-content">
            <h2>引言</h2>
            <p>
              HTML5引入了许多新的语义化元素，这些元素帮助我们更好地描述网页内容的结构...
            </p>

            <section>
              <h3>为什么需要语义化</h3>
              <p>语义化HTML对无障碍访问、SEO和维护性都有重要意义...</p>
            </section>

            <figure>
              <img src="html5-structure.jpg" alt="HTML5文档结构示意图" />
              <figcaption>HTML5文档结构示意图</figcaption>
            </figure>
          </section>

          <footer class="post-footer">
            <div class="tags">
              <span>标签：</span>
              <a href="/tag/html5" class="tag">HTML5</a>
              <a href="/tag/semantic" class="tag">语义化</a>
              <a href="/tag/web" class="tag">前端开发</a>
            </div>

            <div class="social-sharing">
              <button class="share-btn" data-share="wechat">微信分享</button>
              <button class="share-btn" data-share="weibo">微博分享</button>
            </div>
          </footer>
        </article>

        <!-- 评论区 -->
        <section class="comments-section" aria-labelledby="comments-heading">
          <h2 id="comments-heading">评论</h2>
          <div class="comments-list">
            <!-- 评论列表 -->
          </div>
          <form class="comment-form">
            <!-- 评论表单 -->
          </form>
        </section>
      </main>

      <!-- 侧边栏 -->
      <aside class="sidebar" role="complementary">
        <section class="author-info" aria-labelledby="author-heading">
          <h3 id="author-heading">关于作者</h3>
          <img src="author-avatar.jpg" alt="张三的头像" class="author-avatar" />
          <p>张三是一名前端开发工程师，专注于Web标准和无障碍访问...</p>
        </section>

        <section class="related-posts" aria-labelledby="related-heading">
          <h3 id="related-heading">相关文章</h3>
          <ul>
            <li><a href="/article/css-grid">CSS Grid布局完全指南</a></li>
            <li><a href="/article/javascript-es6">ES6新特性详解</a></li>
          </ul>
        </section>

        <section class="newsletter" aria-labelledby="newsletter-heading">
          <h3 id="newsletter-heading">订阅新闻</h3>
          <form class="newsletter-form">
            <label for="email-input" class="sr-only">邮箱地址</label>
            <input
              type="email"
              id="email-input"
              placeholder="输入您的邮箱"
              required
            />
            <button type="submit">订阅</button>
          </form>
        </section>
      </aside>
    </div>

    <!-- 网站页脚 -->
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <div class="footer-content">
          <section class="footer-section">
            <h3>快速链接</h3>
            <nav aria-label="页脚导航">
              <ul>
                <li><a href="/sitemap">网站地图</a></li>
                <li><a href="/privacy">隐私政策</a></li>
              </ul>
            </nav>
          </section>

          <section class="footer-section">
            <h3>联系我们</h3>
            <address>
              <p>
                邮箱：<a href="mailto:contact@example.com"
                  >contact@example.com</a
                >
              </p>
            </address>
          </section>
        </div>

        <div class="copyright">
          <p>&copy; 2023 技术博客. 保留所有权利.</p>
        </div>
      </div>
    </footer>

    <script src="scripts.js"></script>
  </body>
</html>
```

### 内容分区标签

#### `<figure>` 和 `<figcaption>`

```html
<figure>
  <img src="chart.png" alt="2023年销售数据图表" width="600" height="400" />
  <figcaption>图1: 2023年季度销售数据对比</figcaption>
</figure>

<figure>
  <pre><code>
function helloWorld() {
  console.log("Hello, World!");
}
  </code></pre>
  <figcaption>代码示例：简单的JavaScript函数</figcaption>
</figure>

<figure class="multiple-images">
  <img src="before.jpg" alt="改造前的房间" />
  <img src="after.jpg" alt="改造后的房间" />
  <figcaption>房间改造前后对比图</figcaption>
</figure>
```

#### `<time>` - 机器可读的时间日期

```html
<p>
  会议时间：
  <time datetime="2023-12-25T09:00:00+08:00">2023年12月25日上午9点</time>
</p>

<p>
  发布时间：
  <time datetime="2023-10-15">2023年10月15日</time>
</p>

<!-- 相对时间 -->
<time datetime="P2D" title="2天">2天</time>
<time datetime="PT1H30M" title="1小时30分钟">1.5小时</time>
```

#### `<mark>` - 高亮文本

```html
<p>在搜索结果中，<mark>HTML5</mark>是被高亮显示的关键词。</p>

<p>这段文字包含<mark class="highlight">重要信息</mark>，需要特别注意。</p>

<!-- 结合时间使用 -->
<p>
  截止到<mark><time datetime="2023-12-31">2023年12月31日</time></mark
  >的所有订单将享受折扣。
</p>
```

#### `<details>` 和 `<summary>` - 折叠内容

```html
<details>
  <summary>点击查看详细步骤</summary>
  <ol>
    <li>第一步：准备材料</li>
    <li>第二步：安装软件</li>
    <li>第三步：配置环境</li>
  </ol>
</details>

<details open>
  <summary>常见问题（默认展开）</summary>
  <dl>
    <dt>Q: 什么是HTML5？</dt>
    <dd>A: HTML5是HTML的最新版本，引入了许多新特性和API。</dd>
  </dl>
</details>

<!-- 嵌套使用 -->
<details>
  <summary>高级设置</summary>
  <details>
    <summary>网络设置</summary>
    <p>网络配置详情...</p>
  </details>
</details>
```

### 语义化最佳实践

1. **正确使用标题层级**

```html
<!-- 正确 -->
<main>
  <h1>页面主标题</h1>
  <section>
    <h2>章节标题</h2>
    <section>
      <h3>子章节标题</h3>
    </section>
  </section>
</main>

<!-- 避免跳过标题层级 -->
```

1. **ARIA 角色补充**

```html
<nav role="navigation" aria-label="主导航">
  <!-- 导航内容 -->
</nav>

<main role="main">
  <!-- 主要内容 -->
</main>

<aside role="complementary" aria-label="相关文章">
  <!-- 侧边内容 -->
</aside>
```

1. **无障碍考虑**

```html
<!-- 使用正确的标签 -->
<button>点击我</button>
<!-- 而不是 -->
<div onclick="doSomething()">点击我</div>

<!-- 提供替代文本 -->
<img src="logo.png" alt="公司Logo" />
<video controls>
  <track kind="captions" src="captions.vtt" srclang="zh" label="中文" />
</video>
```

## 多媒体标签

### video 元素

#### 基本用法

```html
<video controls width="640" height="360">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  您的浏览器不支持视频播放，请升级浏览器或
  <a href="video.mp4">下载视频文件</a>。
</video>
```

#### 完整属性

```html
<video
  id="myVideo"
  src="video.mp4"
  width="800"
  height="450"
  controls
  <!--
  显示播放控件
  --
>
  autoplay
  <!-- 自动播放（注意浏览器限制） -->
  muted
  <!-- 静音播放（允许自动播放） -->
  loop
  <!-- 循环播放 -->
  preload="auto"
  <!-- 预加载：auto/metadata/none -->
  poster="poster.jpg"
  <!-- 视频封面图 -->
  playsinline
  <!-- 移动端内联播放 -->
  crossorigin="anonymous"
  <!-- CORS设置 -->
  disablepictureinpicture
  <!-- 禁用画中画 -->
  controlslist="nodownload nofullscreen"
  <!-- 控制项限制 -->
  >
  <!-- 备用内容 -->
  <p>您的浏览器不支持HTML5视频</p>
</video>
```

#### 高级示例

```html
<div class="video-player">
  <video
    id="customVideo"
    width="100%"
    poster="thumbnail.jpg"
    preload="metadata"
  >
    <source src="video-high.mp4" type="video/mp4" data-quality="high" />
    <source src="video-medium.mp4" type="video/mp4" data-quality="medium" />
    <source src="video-low.mp4" type="video/mp4" data-quality="low" />

    <!-- 字幕轨道 -->
    <track
      kind="subtitles"
      src="subtitles-zh.vtt"
      srclang="zh"
      label="中文"
      default
    />
    <track
      kind="subtitles"
      src="subtitles-en.vtt"
      srclang="en"
      label="English"
    />
    <track
      kind="captions"
      src="captions-zh.vtt"
      srclang="zh"
      label="中文说明"
    />
    <track kind="chapters" src="chapters.vtt" srclang="zh" />
    <track kind="descriptions" src="descriptions.vtt" srclang="zh" />
    <track kind="metadata" src="metadata.vtt" srclang="zh" />
  </video>

  <div class="custom-controls">
    <button class="play-btn">播放/暂停</button>
    <input
      type="range"
      class="volume-slider"
      min="0"
      max="1"
      step="0.1"
      value="1"
    />
    <button class="fullscreen-btn">全屏</button>
    <select class="quality-selector">
      <option value="high">高清</option>
      <option value="medium">标清</option>
      <option value="low">流畅</option>
    </select>
  </div>
</div>
```

### audio 元素

#### 基本用法

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
  您的浏览器不支持音频播放。
</audio>
```

#### 完整属性

```html
<audio
  id="myAudio"
  controls
  autoplay
  loop
  muted
  preload="auto"
  crossorigin="anonymous"
  volume="0.8"
>
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.ogg" type="audio/ogg; codecs=vorbis" />

  <!-- 章节轨道 -->
  <track kind="chapters" src="chapters.vtt" srclang="zh" />
</audio>

<!-- 播放列表示例 -->
<div class="audio-playlist">
  <h3>播放列表</h3>
  <ul>
    <li>
      <button data-src="song1.mp3">歌曲1</button>
      <span class="duration">3:45</span>
    </li>
    <li>
      <button data-src="song2.mp3">歌曲2</button>
      <span class="duration">4:20</span>
    </li>
  </ul>

  <audio id="playlist-audio" controls></audio>
</div>
```

### source 元素

```html
<!-- 响应式视频源 -->
<video controls>
  <!-- 根据网络条件选择 -->
  <source src="video-360p.mp4" type="video/mp4" media="(max-width: 480px)" />
  <source src="video-720p.mp4" type="video/mp4" media="(min-width: 481px)" />

  <!-- 根据MIME类型支持选择 -->
  <source src="video.webm" type="video/webm; codecs=vp9,opus" />
  <source src="video.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />

  <!-- 备用源 -->
  <object data="video.swf" type="application/x-shockwave-flash">
    <param name="movie" value="video.swf" />
  </object>
</video>

<!-- 音频格式适配 -->
<audio controls>
  <source src="audio.opus" type="audio/ogg; codecs=opus" />
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.wav" type="audio/wav" />
</audio>
```

### track 元素

```html
<video controls>
  <source src="video.mp4" type="video/mp4" />

  <!-- 字幕轨道 -->
  <track
    kind="subtitles"
    src="subtitles-zh-Hans.vtt"
    srclang="zh-Hans"
    label="简体中文"
    default
  />
  <track kind="subtitles" src="subtitles-en.vtt" srclang="en" label="English" />

  <!-- 说明轨道（为视障用户提供） -->
  <track
    kind="descriptions"
    src="descriptions-zh.vtt"
    srclang="zh"
    label="中文说明"
  />

  <!-- 章节轨道 -->
  <track kind="chapters" src="chapters.vtt" srclang="zh" />

  <!-- 元数据轨道 -->
  <track kind="metadata" src="metadata.vtt" srclang="zh" />
</video>
```

#### WebVTT 字幕文件示例

```txt
WEBVTT

1
00:00:01.000 --> 00:00:04.000
这是视频的第一句字幕

2
00:00:05.000 --> 00:00:08.000
这是第二句字幕
还可以有<i>斜体</i>和<b>粗体</b>

3
00:00:09.000 --> 00:00:12.000 align:start line:90%
这是定位在屏幕90%位置的字幕

4
00:00:13.000 --> 00:00:16.000
<v 张三>张三说：这是带说话人的字幕

5
00:00:17.000 --> 00:00:20.000
<c.blue>这是蓝色字幕</c>
```

### 多媒体 API

#### JavaScript 控制示例

```javascript
// 获取视频元素
const video = document.getElementById("myVideo");

// 播放控制
function togglePlay() {
  if (video.paused) {
    video.play().catch((e) => console.error("播放失败:", e));
  } else {
    video.pause();
  }
}

// 音量控制
function setVolume(value) {
  video.volume = value;
  video.muted = value === 0;
}

// 进度控制
function seekTo(time) {
  video.currentTime = time;
}

// 播放速率
function setPlaybackRate(rate) {
  video.playbackRate = rate;
}

// 全屏控制
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch((err) => {
      console.error("全屏失败:", err);
    });
  } else {
    document.exitFullscreen();
  }
}

// 事件监听
video.addEventListener("loadedmetadata", () => {
  console.log("视频时长:", video.duration, "秒");
  console.log("视频尺寸:", video.videoWidth, "x", video.videoHeight);
});

video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  console.log("播放进度:", percent.toFixed(2) + "%");
});

video.addEventListener("ended", () => {
  console.log("播放结束");
  // 自动播放下一集等操作
});

// 自定义控件实现
class CustomVideoPlayer {
  constructor(videoElement) {
    this.video = videoElement;
    this.initControls();
    this.bindEvents();
  }

  initControls() {
    this.controls = {
      play: document.createElement("button"),
      progress: document.createElement("input"),
      volume: document.createElement("input"),
    };

    // 设置控件属性
    this.controls.play.textContent = "播放";
    this.controls.progress.type = "range";
    this.controls.progress.min = 0;
    this.controls.progress.max = 100;
    this.controls.volume.type = "range";
    this.controls.volume.min = 0;
    this.controls.volume.max = 100;
    this.controls.volume.value = 100;
  }

  bindEvents() {
    this.controls.play.addEventListener("click", () => this.togglePlay());
    this.controls.progress.addEventListener("input", (e) => {
      const time = (e.target.value / 100) * this.video.duration;
      this.video.currentTime = time;
    });
    this.controls.volume.addEventListener("input", (e) => {
      this.video.volume = e.target.value / 100;
    });

    this.video.addEventListener("timeupdate", () => {
      const percent = (this.video.currentTime / this.video.duration) * 100;
      this.controls.progress.value = percent;
    });
  }

  togglePlay() {
    if (this.video.paused) {
      this.video.play();
      this.controls.play.textContent = "暂停";
    } else {
      this.video.pause();
      this.controls.play.textContent = "播放";
    }
  }
}

// 使用自定义播放器
const player = new CustomVideoPlayer(document.getElementById("myVideo"));
```

## 新表单类型

### 输入类型概览

#### 基本输入类型

```html
<!-- 邮箱输入 -->
<input
  type="email"
  id="email"
  name="email"
  placeholder="请输入邮箱地址"
  required
  multiple
/>
<!-- 支持多个邮箱 -->

<!-- URL输入 -->
<input
  type="url"
  id="website"
  name="website"
  placeholder="https://example.com"
  pattern="https://.*"
  <!--
  自定义验证规则
  --
/>
required>

<!-- 电话号码 -->
<input
  type="tel"
  id="phone"
  name="phone"
  placeholder="138-0000-0000"
  pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
/>

<!-- 数字输入 -->
<input
  type="number"
  id="quantity"
  name="quantity"
  min="1"
  max="100"
  step="1"
  value="1"
/>

<!-- 范围滑块 -->
<input
  type="range"
  id="volume"
  name="volume"
  min="0"
  max="100"
  step="10"
  value="50"
  list="volumemarks"
/>
<!-- 关联datalist -->

<datalist id="volumemarks">
  <option value="0" label="静音"></option>
  <option value="50" label="中等"></option>
  <option value="100" label="最大"></option>
</datalist>
```

#### 日期时间类型

```html
<!-- 日期选择 -->
<input
  type="date"
  id="birthday"
  name="birthday"
  min="1900-01-01"
  max="2023-12-31"
/>

<!-- 时间选择 -->
<input
  type="time"
  id="meeting-time"
  name="meeting-time"
  min="09:00"
  max="18:00"
  step="1800"
/>
<!-- 30分钟间隔 -->

<!-- 日期时间选择（本地时间） -->
<input
  type="datetime-local"
  id="event-datetime"
  name="event-datetime"
  min="2023-01-01T00:00"
  max="2023-12-31T23:59"
/>

<!-- 月份选择 -->
<input type="month" id="month" name="month" min="2023-01" max="2023-12" />

<!-- 周选择 -->
<input type="week" id="week" name="week" min="2023-W01" max="2023-W52" />

<!-- 颜色选择 -->
<input
  type="color"
  id="color-picker"
  name="color"
  value="#ff0000"
  list="color-presets"
/>

<datalist id="color-presets">
  <option value="#ff0000">红色</option>
  <option value="#00ff00">绿色</option>
  <option value="#0000ff">蓝色</option>
</datalist>
```

#### 搜索和增强输入

```html
<!-- 搜索框 -->
<input
  type="search"
  id="search"
  name="search"
  placeholder="搜索..."
  aria-label="网站搜索"
  autocomplete="on"
  results="5"
/>
<!-- 历史记录显示数量 -->

<!-- 文件上传 -->
<input
  type="file"
  id="file-upload"
  name="file-upload"
  accept=".jpg,.jpeg,.png,.pdf"
  <!--
  接受的文件类型
  --
/>
multiple
<!-- 支持多文件 -->
capture="camera">
<!-- 移动端直接拍照 -->

<!-- 隐藏输入（用于存储数据） -->
<input type="hidden" id="user-id" name="user-id" value="12345" />

<!-- 数据列表 -->
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

### 验证与属性

#### 验证属性

```html
<form id="registration-form" novalidate>
  <!-- 禁用浏览器默认验证 -->
  <!-- 必填字段 -->
  <input
    type="text"
    id="username"
    name="username"
    required
    minlength="3"
    maxlength="20"
    pattern="[A-Za-z0-9_]+"
    title="只能包含字母、数字和下划线"
  />

  <!-- 邮箱验证 -->
  <input type="email" id="user-email" name="email" required multiple />

  <!-- 自定义验证 -->
  <input
    type="password"
    id="password"
    name="password"
    required
    minlength="8"
    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
    title="必须包含大小写字母和数字"
  />

  <!-- 密码确认 -->
  <input
    type="password"
    id="confirm-password"
    name="confirm-password"
    required
    data-validate="match"
    <!--
    自定义验证规则
    --
  />
  data-match="#password">

  <!-- 实时验证反馈 -->
  <input
    type="text"
    id="real-time"
    name="real-time"
    pattern="[A-Za-z]{3,}"
    oninput="validateField(this)"
  />

  <button type="submit">注册</button>
</form>
```

#### 自动完成

```html
<form autocomplete="on">
  <!-- 启用整个表单的自动完成 -->
  <!-- 标准自动完成类型 -->
  <input type="text" name="name" autocomplete="name" />

  <input type="email" name="email" autocomplete="email" />

  <input type="tel" name="tel" autocomplete="tel" />

  <input type="text" name="address" autocomplete="street-address" />

  <input type="text" name="city" autocomplete="address-level2" />
  <!-- 城市 -->

  <!-- 信用卡信息 -->
  <input
    type="text"
    name="cc-name"
    autocomplete="cc-name"
    placeholder="持卡人姓名"
  />

  <input
    type="text"
    name="cc-number"
    autocomplete="cc-number"
    placeholder="信用卡号"
  />

  <input
    type="month"
    name="cc-exp"
    autocomplete="cc-exp"
    placeholder="有效期"
  />
</form>
```

### 表单示例

#### 完整注册表单

```html
<form id="user-registration" class="registration-form" novalidate>
  <fieldset>
    <legend>基本信息</legend>

    <div class="form-group">
      <label for="full-name">全名 *</label>
      <input
        type="text"
        id="full-name"
        name="full-name"
        required
        minlength="2"
        maxlength="50"
        placeholder="请输入您的全名"
        autocomplete="name"
      />
      <div class="hint">请输入真实姓名，2-50个字符</div>
    </div>

    <div class="form-group">
      <label for="email">邮箱地址 *</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        placeholder="example@domain.com"
        autocomplete="email"
        multiple
      />
      <div class="hint">支持输入多个邮箱，用逗号分隔</div>
    </div>

    <div class="form-group">
      <label for="birth-date">出生日期</label>
      <input
        type="date"
        id="birth-date"
        name="birth-date"
        min="1900-01-01"
        max="2023-12-31"
        autocomplete="bday"
      />
    </div>
  </fieldset>

  <fieldset>
    <legend>账户安全</legend>

    <div class="form-group">
      <label for="username">用户名 *</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        pattern="[A-Za-z0-9_]{3,20}"
        title="3-20个字符，只能包含字母、数字和下划线"
        autocomplete="username"
      />
      <span class="availability-check"></span>
    </div>

    <div class="form-group">
      <label for="password">密码 *</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minlength="8"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$"
        title="至少8个字符，包含大小写字母和数字"
        autocomplete="new-password"
      />
      <meter id="password-strength" min="0" max="4" value="0"></meter>
    </div>

    <div class="form-group">
      <label for="confirm-password">确认密码 *</label>
      <input
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
        autocomplete="new-password"
      />
    </div>
  </fieldset>

  <fieldset>
    <legend>偏好设置</legend>

    <div class="form-group">
      <label for="theme-color">主题颜色</label>
      <input
        type="color"
        id="theme-color"
        name="theme-color"
        value="#4a90e2"
        list="theme-presets"
      />
      <datalist id="theme-presets">
        <option value="#4a90e2">蓝色</option>
        <option value="#7ed321">绿色</option>
        <option value="#f5a623">橙色</option>
      </datalist>
    </div>

    <div class="form-group">
      <label for="notification-time">通知时间</label>
      <input
        type="time"
        id="notification-time"
        name="notification-time"
        value="09:00"
        step="1800"
      />
    </div>

    <div class="form-group">
      <label for="volume-level">音量级别</label>
      <input
        type="range"
        id="volume-level"
        name="volume-level"
        min="0"
        max="100"
        step="5"
        value="75"
      />
      <output for="volume-level" id="volume-output">75%</output>
    </div>
  </fieldset>

  <div class="form-actions">
    <button type="submit" class="btn-primary">注册账户</button>
    <button type="reset" class="btn-secondary">重置表单</button>
    <button type="button" class="btn-link" onclick="saveDraft()">
      保存草稿
    </button>
  </div>

  <!-- 隐藏字段 -->
  <input type="hidden" name="referral-source" id="referral-source" />
  <input type="hidden" name="registration-date" id="registration-date" />
</form>

<!-- 关联的样式 -->
<style>
  .registration-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .form-group input:invalid {
    border-color: #e74c3c;
  }

  .form-group input:valid {
    border-color: #2ecc71;
  }

  .hint {
    font-size: 12px;
    color: #666;
    margin-top: 5px;
  }

  fieldset {
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
  }

  legend {
    padding: 0 10px;
    font-weight: bold;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }
</style>
```

### 表单 API

#### Constraint Validation API

```javascript
// 表单验证处理
const form = document.getElementById("registration-form");

// 自定义验证
form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  // 表单验证通过，提交数据
  submitForm();
});

function validateForm() {
  let isValid = true;

  // 清除之前的错误信息
  clearErrors();

  // 验证每个字段
  const fields = form.querySelectorAll("[required], [pattern]");
  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
      showError(field, getValidationMessage(field));
    }
  });

  // 自定义验证：密码确认
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  if (password.value !== confirmPassword.value) {
    isValid = false;
    showError(confirmPassword, "两次输入的密码不一致");
  }

  return isValid;
}

function validateField(field) {
  // 使用Constraint Validation API
  const isValid = field.checkValidity();

  if (!isValid) {
    field.setCustomValidity(getCustomValidationMessage(field));
  } else {
    field.setCustomValidity("");
  }

  return isValid;
}

function getValidationMessage(field) {
  const validity = field.validity;

  if (validity.valueMissing) {
    return "此字段为必填项";
  } else if (validity.typeMismatch) {
    if (field.type === "email") return "请输入有效的邮箱地址";
    if (field.type === "url") return "请输入有效的URL";
  } else if (validity.patternMismatch) {
    return field.title || "输入格式不正确";
  } else if (validity.tooShort) {
    return `至少需要${field.minLength}个字符`;
  } else if (validity.tooLong) {
    return `不能超过${field.maxLength}个字符`;
  } else if (validity.rangeUnderflow) {
    return `最小值是${field.min}`;
  } else if (validity.rangeOverflow) {
    return `最大值是${field.max}`;
  } else if (validity.stepMismatch) {
    return `请输入${field.step}的倍数`;
  } else if (validity.customError) {
    return field.validationMessage;
  }

  return "输入有误";
}

// 实时验证
form.addEventListener("input", function (event) {
  const field = event.target;

  if (field.hasAttribute("required") || field.hasAttribute("pattern")) {
    validateField(field);

    if (field.validity.valid) {
      clearError(field);
    } else {
      showError(field, field.validationMessage);
    }
  }

  // 实时密码强度检测
  if (field.id === "password") {
    updatePasswordStrength(field.value);
  }
});

// 密码强度检测
function updatePasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const meter = document.getElementById("password-strength");
  meter.value = strength;

  // 更新样式
  meter.className = "";
  if (strength < 2) {
    meter.classList.add("weak");
  } else if (strength < 4) {
    meter.classList.add("medium");
  } else {
    meter.classList.add("strong");
  }
}

// 显示/隐藏错误信息
function showError(field, message) {
  let errorElement = field.parentNode.querySelector(".error-message");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    field.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
  field.classList.add("error");
}

function clearError(field) {
  const errorElement = field.parentNode.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  field.classList.remove("error");
}

function clearErrors() {
  const errors = form.querySelectorAll(".error-message");
  errors.forEach((error) => error.remove());

  const fields = form.querySelectorAll(".error");
  fields.forEach((field) => field.classList.remove("error"));
}

// 表单数据收集
function collectFormData() {
  const formData = new FormData(form);
  const data = {};

  // 转换为普通对象
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  // 添加额外数据
  data["registration-date"] = new Date().toISOString();
  data["user-agent"] = navigator.userAgent;

  return data;
}

// 表单提交
function submitForm() {
  const data = collectFormData();

  // 显示加载状态
  showLoading();

  // 发送数据到服务器
  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("注册失败");
      }
      return response.json();
    })
    .then((result) => {
      // 注册成功
      showSuccessMessage();
      resetForm();
    })
    .catch((error) => {
      // 注册失败
      showErrorMessage(error.message);
    })
    .finally(() => {
      // 隐藏加载状态
      hideLoading();
    });
}
```

## 其他 HTML5 新特性

### `<canvas>` 绘图

```html
<canvas id="myCanvas" width="800" height="600">
  您的浏览器不支持Canvas，请升级浏览器。
</canvas>

<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // 绘制矩形
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 100);

  // 绘制圆形
  ctx.beginPath();
  ctx.arc(200, 200, 50, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();

  // 绘制文本
  ctx.font = "30px Arial";
  ctx.fillStyle = "green";
  ctx.fillText("Hello Canvas", 300, 300);
</script>
```

### SVG 集成

```html
<svg width="400" height="400">
  <!-- 圆形 -->
  <circle cx="100" cy="100" r="50" fill="red" />

  <!-- 矩形 -->
  <rect x="200" y="50" width="100" height="100" fill="blue" />

  <!-- 多边形 -->
  <polygon points="300,300 350,250 400,300 350,350" fill="green" />

  <!-- 文本 -->
  <text x="50" y="350" font-family="Arial" font-size="20" fill="black">
    SVG图形
  </text>
</svg>
```

## 兼容性与降级处理

### 特性检测

```javascript
// 检测HTML5特性支持
function supportsHTML5() {
  const features = {
    canvas: !!window.CanvasRenderingContext2D,
    video: !!document.createElement("video").canPlayType,
    localStorage: !!window.localStorage,
    sessionStorage: !!window.sessionStorage,
    geolocation: !!navigator.geolocation,
    webWorkers: !!window.Worker,
    webSockets: !!window.WebSocket,
    fileAPI: !!(
      window.File &&
      window.FileReader &&
      window.FileList &&
      window.Blob
    ),
  };

  return features;
}

// 使用Modernizr或自定义检测
if (!Modernizr.inputtypes.date) {
  // 浏览器不支持date类型，使用polyfill
  $('input[type="date"]').datepicker();
}

// 视频格式支持检测
const video = document.createElement("video");
const formats = {
  webm: 'video/webm; codecs="vp8, vorbis"',
  mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
  ogg: 'video/ogg; codecs="theora, vorbis"',
};

for (const format in formats) {
  if (video.canPlayType(formats[format])) {
    console.log(`支持 ${format} 格式`);
  }
}
```

### Polyfill 方案

```html
<!-- 对于不支持HTML5的浏览器 -->
<!--[if lt IE 9]>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- 日期选择器polyfill -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>

<script>
  // 自动为不支持date类型的浏览器应用polyfill
  document.addEventListener("DOMContentLoaded", function () {
    const dateInputs = document.querySelectorAll('input[type="date"]');

    dateInputs.forEach((input) => {
      // 检测是否支持date类型
      const testInput = document.createElement("input");
      testInput.setAttribute("type", "date");

      if (testInput.type === "text") {
        // 不支持date类型，使用flatpickr
        flatpickr(input, {
          dateFormat: "Y-m-d",
          locale: "zh",
        });
      }
    });
  });
</script>
```

### 渐进增强策略

```html
<!-- 视频的渐进增强 -->
<video controls width="640" height="360">
  <!-- 现代格式 -->
  <source src="video.webm" type="video/webm" />
  <source src="video.mp4" type="video/mp4" />

  <!-- Flash回退 -->
  <object type="application/x-shockwave-flash" data="player.swf">
    <param name="movie" value="player.swf" />
    <param name="flashvars" value="file=video.mp4" />

    <!-- 最终回退：下载链接 -->
    <p>
      您的浏览器不支持HTML5视频和Flash。 请<a href="video.mp4">下载视频文件</a
      >。
    </p>
  </object>
</video>

<!-- 语义化标签的CSS样式 -->
<style>
  /* 为旧版IE定义HTML5块级元素 */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }

  /* 渐进增强：为支持新特性的浏览器添加样式 */
  @supports (display: grid) {
    .container {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
    }
  }

  @supports not (display: grid) {
    .container {
      display: flex;
    }
    .sidebar {
      width: 300px;
    }
  }
</style>
```

**最佳实践总结**：

1. 始终使用语义正确的 HTML5 标签
2. 为多媒体内容提供备用方案和字幕
3. 利用新表单类型增强用户体验
4. 实施适当的验证和错误处理
5. 考虑无障碍访问和 SEO
6. 使用特性检测和渐进增强确保兼容性
7. 保持代码的清晰性和可维护性
