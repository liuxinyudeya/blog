# HTML5

**HTML5**（HyperText Markup Language 5）是 HTML 的第五个主要版本，用于构建和呈现 Web 内容。

它是 Web 技术的基石，与 CSS（样式）和 JavaScript（交互）共同构成了现代 Web 开发的核心三剑客。

::: tip HTML5 的核心设计哲学

1. **语义化** - 通过语义化标签明确内容结构
2. **兼容性** - 向后兼容，不破坏现有网页
3. **设备无关** - 支持多种设备和平台
4. **开放性** - 开放标准，避免专利技术
5. **多媒体原生支持** - 内置音频、视频等媒体处理能力

:::

## HTML5 的历史与起源

### 诞生背景：Web 标准的演变需求

#### 早期 HTML 的局限

- **背景**：1990 年代，HTML4.0 和 XHTML 1.0 已无法满足现代 Web 需求
- **问题**：缺乏语义化标签、依赖插件处理多媒体、移动设备支持差
- **需求**：需要更强大、更语义化、更移动友好的标记语言

#### WHATWG 与 W3C 的分合

```
2004年：WHATWG成立
    - 苹果、Mozilla、Opera等浏览器厂商组成
    - 对W3C的XHTML 2.0方向不满
    - 创建Web Forms 2.0和Web Apps 1.0

2006年：W3C认可HTML5工作
    - W3C HTML工作组重新启动
    - 采纳WHATWG的HTML5规范为基础

2009年：W3C停止XHTML 2.0
    - 承认HTML5是未来方向
    - WHATWG负责"HTML Living Standard"
    - W3C负责"HTML5"快照版本

2014年：HTML5正式成为W3C推荐标准
    - 历时8年开发
    - 现代Web的基石确立
```

### 为什么需要 HTML5？

```html
<!-- HTML4的问题 -->

<!-- 1. 结构模糊 -->
<div id="header">
  <div class="nav">
    <ul>
      ...
    </ul>
  </div>
</div>
<!-- 这是什么？难以理解 -->

<!-- 2. 多媒体依赖插件 -->
<object data="video.flv" type="video/x-flv">
  <param name="movie" value="video.flv" />
</object>
<!-- 需要Flash播放器 -->

<!-- 3. 表单功能有限 -->
<input type="text" />
<!-- 只有基本输入类型 -->

<!-- 4. 存储能力弱 -->
<!-- 只能使用cookie，容量小且不安全 -->

<!-- HTML5的解决方案 -->
<header>
  <nav>...</nav>
</header>
<!-- 语义明确 -->

<video src="video.mp4" controls></video>
<!-- 原生视频支持 -->

<input type="email" required />
<!-- 丰富的输入类型和验证 -->

<!-- 本地存储能力 -->
<script>
  localStorage.setItem("key", "value");
</script>
```

## HTML5 的核心特性与模块

### 语义化标签革命

#### 文档结构标签

```html
<!-- HTML4的通用div -->
<div id="header">...</div>
<div id="nav">...</div>
<div id="main">
  <div id="article">...</div>
  <div id="aside">...</div>
</div>
<div id="footer">...</div>

<!-- HTML5的语义化标签 -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>
    <section>...</section>
  </article>
  <aside>...</aside>
</main>
<footer>...</footer>

<!-- 语义化的好处：
1. 搜索引擎更好理解内容
2. 屏幕阅读器更好导航
3. 开发者更容易维护
4. 代码可读性更强 -->
```

#### 内容语义化标签

```html
<!-- 文章结构 -->
<article>
  <header>
    <h1>文章标题</h1>
    <time datetime="2023-10-01">2023年10月1日</time>
  </header>

  <figure>
    <img src="image.jpg" alt="描述" />
    <figcaption>图片说明</figcaption>
  </figure>

  <section>
    <h2>章节标题</h2>
    <p>段落内容...</p>

    <!-- 引用 -->
    <blockquote cite="https://example.com">
      <p>引用内容...</p>
    </blockquote>

    <!-- 代码块 -->
    <pre><code>
function hello() {
    console.log('Hello HTML5');
}
        </code></pre>
  </section>

  <footer>
    <address>作者联系方式</address>
  </footer>
</article>

<!-- 导航和分组 -->
<nav aria-label="主要导航">
  <ul>
    <li><a href="/">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>

<aside aria-label="相关链接">
  <h2>相关文章</h2>
  <ul>
    <li><a href="#">链接1</a></li>
  </ul>
</aside>
```

### 多媒体原生支持

#### 音频和视频

```html
<!-- 视频播放器 -->
<video
  controls
  width="640"
  height="360"
  poster="thumbnail.jpg"
  preload="metadata"
>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  <!-- 降级方案 -->
  <p>您的浏览器不支持HTML5视频</p>
</video>

<!-- 音频播放器 -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  <source src="audio.ogg" type="audio/ogg" />
</audio>

<!-- 自定义控制 -->
<video id="myVideo" src="video.mp4"></video>
<div class="custom-controls">
  <button onclick="playVideo()">播放</button>
  <input type="range" id="volume" min="0" max="1" step="0.1" />
</div>

<script>
  function playVideo() {
    document.getElementById("myVideo").play();
  }
</script>
```

#### Canvas 绘图

```html
<canvas id="myCanvas" width="800" height="600"> 您的浏览器不支持Canvas </canvas>

<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // 绘制矩形
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 100);

  // 绘制文本
  ctx.font = "30px Arial";
  ctx.fillText("Hello Canvas", 50, 50);

  // 绘制路径
  ctx.beginPath();
  ctx.arc(200, 200, 50, 0, Math.PI * 2);
  ctx.stroke();

  // 图像处理
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // 修改像素
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 255 - imageData.data[i]; // 反色
    }
    ctx.putImageData(imageData, 0, 0);
  };
  img.src = "image.jpg";
</script>
```

#### SVG 矢量图形

```html
<!-- 内联SVG -->
<svg width="200" height="200">
  <circle cx="100" cy="100" r="50" fill="blue" />
  <rect x="50" y="50" width="100" height="50" fill="red" />
  <text x="100" y="100" text-anchor="middle">SVG</text>

  <!-- 动画 -->
  <circle cx="50" cy="50" r="20" fill="green">
    <animate
      attributeName="cx"
      from="50"
      to="150"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
</svg>

<!-- 外部SVG文件 -->
<img src="image.svg" alt="SVG图像" />
<object data="image.svg" type="image/svg+xml"></object>
```

### 增强的表单功能

```html
<form id="registration" novalidate>
  <!-- 输入类型扩展 -->
  <input type="email" name="email" required placeholder="输入邮箱" />

  <input type="url" name="website" placeholder="https://example.com" />

  <input
    type="tel"
    name="phone"
    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
    placeholder="123-4567-8901"
  />

  <input type="number" name="age" min="18" max="99" />

  <input type="range" name="volume" min="0" max="100" />

  <input type="date" name="birthday" />

  <input type="color" name="favcolor" />

  <input type="search" name="query" placeholder="搜索..." />

  <!-- 表单属性增强 -->
  <input
    type="text"
    name="username"
    autofocus
    autocomplete="username"
    list="suggestions"
  />

  <datalist id="suggestions">
    <option value="张三"></option>
    <option value="李四"></option>
  </datalist>

  <!-- 进度和度量 -->
  <progress value="70" max="100"></progress>
  <meter value="0.6" min="0" max="1">60%</meter>

  <!-- 输出元素 -->
  <input type="range" id="slider" value="50" min="0" max="100" />
  <output for="slider">50</output>

  <!-- 表单验证 -->
  <input
    type="text"
    name="username"
    required
    minlength="3"
    maxlength="20"
    pattern="[A-Za-z0-9]+"
    title="只能包含字母和数字"
  />

  <input type="submit" value="注册" />
</form>

<!-- 表单验证API -->
<script>
  document
    .getElementById("registration")
    .addEventListener("submit", function (e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        alert("请正确填写表单");
      }
    });

  // 自定义验证
  const emailInput = document.querySelector('input[type="email"]');
  emailInput.addEventListener("input", function () {
    if (emailInput.validity.typeMismatch) {
      emailInput.setCustomValidity("请输入有效的邮箱地址");
    } else {
      emailInput.setCustomValidity("");
    }
  });
</script>
```

### 本地存储与离线能力

#### Web Storage API

```html
<script>
  // localStorage - 持久化存储
  localStorage.setItem("username", "张三");
  const user = localStorage.getItem("username");
  localStorage.removeItem("username");
  localStorage.clear();

  // sessionStorage - 会话存储
  sessionStorage.setItem("sessionData", "临时数据");

  // 存储对象
  const userData = {
    name: "李四",
    age: 25,
    preferences: { theme: "dark" },
  };
  localStorage.setItem("user", JSON.stringify(userData));
  const savedUser = JSON.parse(localStorage.getItem("user"));

  // 存储事件监听
  window.addEventListener("storage", function (e) {
    console.log("存储变更:", e.key, e.newValue);
  });
</script>
```

#### IndexedDB

```html
<script>
  // 大型结构化数据存储
  const request = indexedDB.open("MyDatabase", 1);

  request.onupgradeneeded = function (e) {
    const db = e.target.result;

    // 创建对象存储
    const store = db.createObjectStore("users", {
      keyPath: "id",
      autoIncrement: true,
    });

    // 创建索引
    store.createIndex("name", "name", { unique: false });
    store.createIndex("email", "email", { unique: true });
  };

  request.onsuccess = function (e) {
    const db = e.target.result;

    // 添加数据
    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");

    store.add({ name: "张三", email: "zhangsan@example.com" });

    // 查询数据
    const getRequest = store.get(1);
    getRequest.onsuccess = function () {
      console.log("用户:", getRequest.result);
    };
  };
</script>
```

#### 离线应用

```html
<!-- manifest文件 (app.manifest) -->
CACHE MANIFEST # v1.0.0 CACHE: index.html styles.css app.js images/logo.png
NETWORK: api/ FALLBACK: /offline.html

<!-- HTML引用 -->
<html manifest="app.manifest"></html>
```

#### Service Workers

```javascript
// service-worker.js
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open("my-cache").then(function (cache) {
      return cache.addAll(["/", "/index.html", "/styles.css", "/app.js"]);
    })
  );
});

self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
```

### 图形与多媒体 API

#### WebGL 3D 图形

```html
<canvas id="webgl-canvas"></canvas>

<script>
  const canvas = document.getElementById("webgl-canvas");
  const gl = canvas.getContext("webgl");

  // 创建着色器程序
  const vertexShaderSource = `
    attribute vec4 aPosition;
    void main() {
        gl_Position = aPosition;
    }
`;

  const fragmentShaderSource = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
`;

  // 设置顶点数据
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  // 创建缓冲区
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
</script>
```

#### WebRTC 实时通信

```html
<video id="localVideo" autoplay muted></video>
<video id="remoteVideo" autoplay></video>

<script>
  // 获取本地媒体流
  navigator.mediaDevices
    .getUserMedia({
      video: true,
      audio: true,
    })
    .then(function (stream) {
      document.getElementById("localVideo").srcObject = stream;

      // 创建对等连接
      const peerConnection = new RTCPeerConnection();

      // 添加本地流
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      // 接收远程流
      peerConnection.ontrack = function (e) {
        document.getElementById("remoteVideo").srcObject = e.streams[0];
      };

      // 信令交换（实际应用中需要服务器）
    })
    .catch(function (error) {
      console.error("获取媒体失败:", error);
    });
</script>
```

#### Web Audio API

```html
<button onclick="playSound()">播放声音</button>

<script>
  async function playSound() {
    const audioContext = new AudioContext();

    // 创建振荡器
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);

    // 创建增益节点（控制音量）
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    // 连接节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 播放
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  }
</script>
```

## HTML5 的优缺点分析

### **HTML5 的核心优势**

#### 1. **语义化与可访问性**

- 语义化标签提升 SEO 和屏幕阅读器支持
- ARIA 属性增强无障碍访问
- 清晰的内容结构，利于维护和理解

#### 2. **多媒体原生支持**

- 告别 Flash 等插件依赖
- 原生音频、视频、图形处理能力
- 更好的性能和安全性

#### 3. **移动设备优化**

- 响应式设计友好
- 触摸事件支持
- 设备方向、地理位置 API

#### 4. **离线与存储能力**

- 本地存储减少服务器压力
- 离线应用支持
- 更好的用户体验

#### 5. **性能提升**

- 浏览器原生支持，渲染更快
- Web Workers 多线程处理
- 硬件加速图形

### **HTML5 的主要局限**

#### 1. **浏览器兼容性问题**

```html
<!-- 需要polyfill和降级方案 -->
<!--[if lt IE 9]>
  <script src="html5shiv.js"></script>
<![endif]-->

<!-- 特性检测 -->
<script>
  if (!("geolocation" in navigator)) {
    alert("您的浏览器不支持地理位置API");
  }
</script>
```

#### 2. **安全挑战**

- 本地存储数据可能被窃取
- WebSocket 可能被滥用
- 跨域请求安全限制复杂

#### 3. **性能差异**

- Canvas 和 WebGL 性能依赖设备
- 移动设备上可能耗电快
- 复杂动画可能导致卡顿

#### 4. **学习曲线**

- 大量新 API 需要学习
- 最佳实践尚未完全确立
- 不同浏览器实现有差异

#### 5. **标准仍在演进**

- 部分 API 还在草案阶段
- 浏览器支持不一致
- 需要持续关注更新

## 针对 HTML5 局限性的技术演进

### **前端框架的兴起**

#### **React (2013)**

```jsx
// 组件化开发，解决HTML复用和维护问题
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

#### **Vue.js (2014)**

```vue
<!-- 渐进式框架，更好组织HTML结构 -->
<template>
  <div class="component">
    <h1>{{ title }}</h1>
  </div>
</template>
```

#### **Angular (2016)**

```typescript
// 企业级框架，类型安全的HTML模板
@Component({
    selector: 'app-root',
    template: `<h1>{{title}}</h1>`
})
```

### **静态站点生成器**

#### **Gatsby (2015)**

- React + GraphQL
- 预渲染提升性能
- SEO 友好

#### **Next.js (2016)**

- React 服务端渲染
- 混合渲染策略
- 简化部署

#### **Nuxt.js (2016)**

- Vue.js 服务端渲染
- 约定优于配置
- 模块化架构

### **Web 组件标准**

```html
<!-- 自定义元素 -->
<my-component></my-component>

<script>
  class MyComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = "<h1>自定义组件</h1>";
    }
  }
  customElements.define("my-component", MyComponent);
</script>
```

### **PWA 渐进式 Web 应用**

```javascript
// 结合HTML5特性创建原生应用体验
// Service Worker + Web App Manifest + HTTPS
```

### **WebAssembly 高性能计算**

```html
<script>
  // 运行C++、Rust等编译的代码
  WebAssembly.instantiateStreaming(fetch("program.wasm")).then((obj) => {
    // 调用Wasm函数
    obj.instance.exports.main();
  });
</script>
```

## **一、HTML 基础篇（初级）**

**适合：0-1 年经验，掌握基础标签和语义**

### 1. **[HTML 基础语法](/html/html5/basic-grammar.md)**

- HTML 文档结构（DOCTYPE, html, head, body）
- 标签、元素、属性概念
- 注释与编码声明

### 2. **[文本与内容标签](/html/html5/text-content.md)**

- 标题标签（h1-h6）
- 段落与文本格式化（p, br, hr, strong, em）
- 列表（ul, ol, li, dl, dt, dd）
- 引用（blockquote, q, cite）

### 3. **[链接与图像](/html/html5/link-image.md)**

- 超链接（a 标签，锚点，target 属性）
- 图像（img 标签，alt 属性，响应式图片）
- 图片映射（map, area）

### 4. **[表格基础](/html/html5/basic-table.md)**

- 表格结构（table, tr, td, th）
- 表格合并（colspan, rowspan）
- 表格标题和分组（caption, thead, tbody, tfoot）

### 5. **[表单基础](/html/html5/basic-form.md)**

- 表单元素（form, input, textarea, select, button）
- 表单属性（action, method, enctype）
- 基本输入类型（text, password, radio, checkbox）

### 6. **[HTML5 新元素入门](/html/html5/html5-tags.md)**

- 语义化标签（header, nav, main, footer, article, section）
- 多媒体标签（video, audio, source）
- 新表单类型（email, url, number, date）

### 7. **[开发工具与环境](/html/html5/development-environment.md)**

- 浏览器开发者工具使用
- 代码验证（W3C Validator）
- 基本 SEO 优化（title, meta, heading 结构）

## **二、HTML 进阶篇（中级）**

**适合：1-3 年经验，能构建复杂 Web 应用**

### 1. **高级语义化**

- 微数据与微格式（Microdata, RDFa）
- ARIA 无障碍属性
- 结构化数据（JSON-LD, Schema.org）
- 语义化最佳实践

### 2. **多媒体与图形**

- Canvas API 深入
- SVG 矢量图形
- WebGL 基础
- 媒体事件与 API 控制

### 3. **高级表单技术**

- 表单验证 API
- 自定义表单控件
- 表单数据序列化
- 文件上传与处理

### 4. **存储与离线应用**

- Web Storage API（localStorage, sessionStorage）
- IndexedDB 数据库操作
- Service Workers 原理与应用
- 离线应用开发

### 5. **设备 API 集成**

- 地理位置 API
- 设备方向与运动传感器
- 摄像头与麦克风访问
- 通知 API

### 6. **性能优化**

- 资源加载优化（preload, prefetch）
- 图片优化（srcset, picture 元素）
- 延迟加载（lazy loading）
- 代码分割与异步加载

### 7. **安全与最佳实践**

- 跨域安全（CORS）
- 内容安全策略（CSP）
- XSS 防护
- 安全头部设置

## **三、HTML 高级篇（高级）**

**适合：3 年以上经验，架构设计与原理理解**

### 1. **Web 组件与自定义元素**

- Shadow DOM 深入
- 自定义元素生命周期
- 模板与插槽（template, slot）
- 组件通信与事件

### 2. **高级图形与动画**

- Canvas 性能优化
- WebGL 着色器编程
- WebGPU 下一代图形 API
- 复杂动画与交互

### 3. **实时通信技术**

- WebSocket 深入
- WebRTC 音视频通信
- 信令服务器设计
- 实时数据同步

### 4. **PWA 与离线架构**

- Service Workers 高级模式
- 缓存策略设计
- 后台同步
- 推送通知系统

### 5. **Web Assembly 集成**

- Wasm 模块加载与交互
- 高性能计算应用
- 现有代码移植
- 内存管理与优化

### 6. **架构设计与性能**

- 微前端架构中的 HTML
- 服务端渲染优化
- 静态站点生成
- 边缘计算部署

### 7. **新兴技术与标准**

- Web Components v1/v2
- Web Bluetooth API
- WebUSB API
- Web Neural Network API

### 8. **测试与质量保证**

- 无障碍测试自动化
- 性能测试策略
- 跨浏览器测试
- 代码质量与审查

### 9. **工具链与工程化**

- 静态分析工具
- 构建优化（HTML 压缩、资源哈希）
- 自动化部署
- 监控与错误追踪

## 学习资源与工具

**学习平台**

- MDN Web Docs（HTML 部分）
- W3C HTML 规范
- WHATWG HTML Living Standard
- FreeCodeCamp HTML 课程

  **开发工具**

- VS Code 及 HTML 相关插件
- 浏览器开发者工具
- HTML 验证工具
- 无障碍检测工具

  **练习平台**

- CodePen
- JSFiddle
- Glitch
- StackBlitz

  **社区资源**

- HTML 标准 GitHub 仓库
- Web Platform Tests
- Can I Use（兼容性查询）
- Web.dev 学习资源

## 技术选型指南

### **不同场景的技术选择**

| 项目类型          | 推荐技术栈               | 理由               |
| ----------------- | ------------------------ | ------------------ |
| **内容型网站**    | 原生 HTML5 + 语义化标签  | SEO 友好，加载快速 |
| **企业级应用**    | HTML5 + Web Components   | 可维护性强，组件化 |
| **移动 Web 应用** | HTML5 + PWA 技术         | 原生体验，离线支持 |
| **数据可视化**    | HTML5 + Canvas/SVG/WebGL | 图形性能好         |
| **实时应用**      | HTML5 + WebSocket/WebRTC | 实时通信能力强     |
| **静态网站**      | HTML5 + 静态站点生成器   | 部署简单，性能好   |

### **学习建议**

1. **基础优先**：先精通原生 HTML5，再学习框架
2. **标准驱动**：以 W3C 和 WHATWG 标准为参考
3. **实践为主**：通过项目掌握复杂场景
4. **兼容性意识**：了解不同浏览器支持情况
5. **性能思维**：从编码阶段考虑性能优化
6. **安全第一**：始终关注 Web 安全最佳实践

---

HTML5 作为 Web 技术的基石，其重要性不言而喻。无论是简单的静态页面还是复杂的 Web 应用，扎实的 HTML 基础都是成功的关键。

随着 Web 技术的不断发展，HTML 标准也在持续演进，保持学习、关注新特性，是每个 Web 开发者的必备素养。
