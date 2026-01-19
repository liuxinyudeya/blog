# BOM 全面详解

## 一、BOM 是什么？

### 1.1 基本定义

**BOM（Browser Object Model，浏览器对象模型）** 是浏览器提供的一组用于与浏览器窗口进行交互的对象集合。与专注于文档内容的 DOM 不同，BOM 关注浏览器窗口本身的行为和状态。

### 1.2 关键特性

- **非标准化**：没有 W3C 或 ECMAScript 标准，各浏览器厂商自行实现
- **浏览器相关**：提供浏览器环境特定的功能
- **全局访问**：通过 `window` 对象作为入口点
- **功能多样**：包括导航、历史、屏幕信息、浏览器信息等

## 二、BOM 与 DOM 的关系

### 2.1 结构关系

```javascript
/*
浏览器环境结构：
┌─────────────────────────────────────────────┐
│                BOM (浏览器对象模型)          │
│  ┌──────────────────────────────────────┐  │
│  │          window (全局对象)            │  │
│  │  ┌──────────────────────────────┐    │  │
│  │  │      DOM (文档对象模型)       │    │  │
│  │  │       document 对象           │    │  │
│  │  └──────────────────────────────┘    │  │
│  │  ├── location (URL信息)               │  │
│  │  ├── navigator (浏览器信息)           │  │
│  │  ├── history (浏览历史)               │  │
│  │  ├── screen (屏幕信息)                │  │
│  │  └── 其他浏览器API                   │  │
│  └──────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
*/
```

### 2.2 关系说明

| 对比维度     | BOM (浏览器对象模型)   | DOM (文档对象模型) |
| ------------ | ---------------------- | ------------------ |
| **关注点**   | 浏览器窗口本身         | 文档内容结构       |
| **标准化**   | 无官方标准，浏览器实现 | W3C 标准           |
| **入口对象** | `window`               | `document`         |
| **主要内容** | 浏览器功能、窗口控制   | 页面元素、内容     |
| **包含关系** | 包含 DOM               | 被 BOM 包含        |

### 2.3 实际代码关系

```javascript
// BOM 包含 DOM
console.log(window.document === document); // true

// 所有全局变量和函数都是 window 的属性
var globalVar = "test";
console.log(window.globalVar); // 'test'

function testFunc() {}
console.log(window.testFunc === testFunc); // true

// DOM 操作通过 BOM 访问
const element = window.document.getElementById("test");
```

## 三、BOM 数据结构

### 3.1 核心对象层次结构

```javascript
// BOM 主要对象结构
const BOMStructure = {
  // 1. 顶级对象
  window: {
    // 2. DOM 相关
    document: {}, // DOM 根节点

    // 3. BOM 核心对象
    location: {
      // URL 信息
      href: String,
      protocol: String,
      host: String,
      hostname: String,
      port: String,
      pathname: String,
      search: String,
      hash: String,
      origin: String,
      assign: Function,
      replace: Function,
      reload: Function,
    },

    navigator: {
      // 浏览器信息
      userAgent: String,
      appName: String,
      appVersion: String,
      platform: String,
      language: String,
      languages: Array,
      onLine: Boolean,
      cookieEnabled: Boolean,
      geolocation: Object,
      mediaDevices: Object,
      clipboard: Object,
      storage: Object,
    },

    history: {
      // 浏览历史
      length: Number,
      state: Object,
      back: Function,
      forward: Function,
      go: Function,
      pushState: Function,
      replaceState: Function,
    },

    screen: {
      // 屏幕信息
      width: Number,
      height: Number,
      availWidth: Number,
      availHeight: Number,
      colorDepth: Number,
      pixelDepth: Number,
      orientation: Object,
    },

    // 4. 窗口控制
    frames: Array, // 子框架集合
    parent: Window, // 父窗口
    top: Window, // 顶层窗口
    self: Window, // 当前窗口
    opener: Window, // 打开者窗口

    // 5. 对话框
    alert: Function,
    confirm: Function,
    prompt: Function,

    // 6. 定时器
    setTimeout: Function,
    setInterval: Function,
    clearTimeout: Function,
    clearInterval: Function,
    requestAnimationFrame: Function,

    // 7. 存储
    localStorage: Storage,
    sessionStorage: Storage,
    indexedDB: Object,

    // 8. 事件相关
    onload: Function,
    onunload: Function,
    onresize: Function,
    onscroll: Function,
    onerror: Function,
    addEventListener: Function,
    removeEventListener: Function,

    // 9. 其他重要API
    console: Console,
    performance: Performance,
    fetch: Function,
    XMLHttpRequest: Function,
    WebSocket: Function,
    FormData: Function,
    URL: Function,
    URLSearchParams: Function,

    // 10. 全局构造函数
    Object: Function,
    Array: Function,
    Function: Function,
    Date: Function,
    RegExp: Function,
    Promise: Function,
    Map: Function,
    Set: Function,
  },
};
```

### 3.2 对象关系图

```
window (全局对象)
├── DOM 分支
│   └── document
│       ├── body
│       ├── head
│       └── ...
│
├── BOM 核心对象
│   ├── location    ──┐
│   ├── navigator   ──┤ 浏览器环境信息
│   ├── history     ──┤
│   └── screen      ──┘
│
├── 窗口控制
│   ├── frames
│   ├── parent
│   ├── top
│   ├── self
│   └── opener
│
├── 用户交互
│   ├── alert
│   ├── confirm
│   └── prompt
│
├── 定时控制
│   ├── setTimeout
│   ├── setInterval
│   └── requestAnimationFrame
│
├── 数据存储
│   ├── localStorage
│   ├── sessionStorage
│   └── indexedDB
│
├── 网络通信
│   ├── fetch
│   ├── XMLHttpRequest
│   └── WebSocket
│
└── 其他API
    ├── console
    ├── performance
    ├── URL
    └── ...
```

## 四、BOM 的核心特性

### 4.1 全局作用域

```javascript
// window 是全局对象
console.log(this === window); // 在全局作用域中为 true

// 所有全局变量都是 window 的属性
var globalVariable = "test";
console.log(window.globalVariable); // 'test'

// 函数声明也是 window 的方法
function sayHello() {
  console.log("Hello");
}
console.log(window.sayHello === sayHello); // true

// let 和 const 声明的变量不是 window 的属性
let letVariable = "let test";
const constVariable = "const test";
console.log(window.letVariable); // undefined
console.log(window.constVariable); // undefined
```

### 4.2 浏览器环境检测

```javascript
// 检测浏览器类型和版本
class BrowserDetector {
  static detect() {
    const ua = navigator.userAgent;

    return {
      // 浏览器类型
      browser: {
        isChrome: /Chrome\/([0-9]+)/.test(ua) && !/Edge\/([0-9]+)/.test(ua),
        isFirefox: /Firefox\/([0-9]+)/.test(ua),
        isSafari: /Safari\/([0-9]+)/.test(ua) && !/Chrome\/([0-9]+)/.test(ua),
        isEdge: /Edg\/([0-9]+)/.test(ua),
        isIE: /MSIE|Trident/.test(ua),
        isOpera: /OPR\/([0-9]+)/.test(ua),
        isWeChat: /MicroMessenger/.test(ua),
      },

      // 设备类型
      device: {
        isMobile: /Mobi|Android/i.test(ua),
        isTablet: /Tablet|iPad/i.test(ua),
        isDesktop: !/Mobi|Android|Tablet|iPad/i.test(ua),
        isIOS: /iPhone|iPad|iPod/i.test(ua),
        isAndroid: /Android/i.test(ua),
      },

      // 操作系统
      os: {
        isWindows: /Windows NT/.test(ua),
        isMac: /Macintosh/.test(ua),
        isLinux: /Linux/.test(ua),
        isAndroid: /Android/.test(ua),
        isIOS: /iPhone|iPad|iPod/.test(ua),
      },

      // 版本信息
      version: {
        chrome: (ua.match(/Chrome\/([0-9]+)/) || [])[1],
        firefox: (ua.match(/Firefox\/([0-9]+)/) || [])[1],
        safari: (ua.match(/Version\/([0-9]+)/) || [])[1],
      },
    };
  }
}
```

### 4.3 跨窗口通信

```javascript
// 窗口间的通信机制
class WindowCommunication {
  // 1. 窗口引用
  openNewWindow() {
    // 打开新窗口
    const newWindow = window.open(
      "https://example.com",
      "_blank",
      "width=500,height=500"
    );

    // 操作新窗口
    setTimeout(() => {
      if (newWindow && !newWindow.closed) {
        newWindow.document.body.innerHTML = "<h1>来自父窗口的内容</h1>";
      }
    }, 1000);

    return newWindow;
  }

  // 2. postMessage 跨域通信
  setupMessageChannel() {
    // 发送消息
    const sendMessage = (targetWindow, message, targetOrigin = "*") => {
      targetWindow.postMessage(message, targetOrigin);
    };

    // 接收消息
    window.addEventListener("message", (event) => {
      // 验证消息来源
      const allowedOrigins = [
        "https://trusted-domain.com",
        window.location.origin,
      ];
      if (!allowedOrigins.includes(event.origin)) {
        console.warn("来自不受信任源的消息:", event.origin);
        return;
      }

      console.log("收到消息:", event.data);

      // 回复消息
      if (event.source) {
        event.source.postMessage({ received: true }, event.origin);
      }
    });

    return { sendMessage };
  }

  // 3. BroadcastChannel API
  setupBroadcastChannel() {
    const channel = new BroadcastChannel("app-channel");

    // 发送消息
    channel.postMessage({ type: "data", content: "Hello" });

    // 接收消息
    channel.addEventListener("message", (event) => {
      console.log("广播消息:", event.data);
    });

    // 关闭通道
    channel.close();
  }
}
```

## 五、BOM 核心 API 详解

### 5.1 window 对象 API

#### 窗口控制

```javascript
class WindowControl {
  constructor() {
    this.window = window;
  }

  // 1. 打开新窗口
  openWindow(url, options = {}) {
    const {
      name = "_blank",
      width = 800,
      height = 600,
      left = null,
      top = null,
      features = [],
    } = options;

    // 构建窗口特性字符串
    const featureList = [
      `width=${width}`,
      `height=${height}`,
      left !== null && `left=${left}`,
      top !== null && `top=${top}`,
      "scrollbars=yes",
      "resizable=yes",
      ...features,
    ]
      .filter(Boolean)
      .join(",");

    return this.window.open(url, name, featureList);
  }

  // 2. 窗口操作
  windowOperations() {
    return {
      // 关闭窗口
      close: () => {
        if (this.window.opener) {
          this.window.close();
        } else {
          console.warn("只有脚本打开的窗口才能关闭");
        }
      },

      // 调整大小
      resize: (width, height) => {
        this.window.resizeTo(width, height);
      },

      // 移动窗口
      move: (x, y) => {
        this.window.moveTo(x, y);
      },

      // 滚动窗口
      scroll: (x, y) => {
        this.window.scrollTo(x, y);
      },

      // 打印页面
      print: () => {
        this.window.print();
      },

      // 全屏
      fullscreen: () => {
        if (document.fullscreenEnabled) {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }
      },
    };
  }

  // 3. 窗口状态
  getWindowState() {
    return {
      // 窗口尺寸
      innerWidth: this.window.innerWidth,
      innerHeight: this.window.innerHeight,
      outerWidth: this.window.outerWidth,
      outerHeight: this.window.outerHeight,

      // 滚动位置
      scrollX: this.window.scrollX || this.window.pageXOffset,
      scrollY: this.window.scrollY || this.window.pageYOffset,

      // 窗口状态
      closed: this.window.closed,
      frames: this.window.frames,

      // 父窗口关系
      parent: this.window.parent,
      top: this.window.top,
      self: this.window.self,
      opener: this.window.opener,
    };
  }
}
```

#### 对话框 API

```javascript
class DialogManager {
  constructor() {
    this.window = window;
  }

  // 1. 系统对话框
  systemDialogs() {
    return {
      // 警告框（阻塞）
      alert: (message, title = "提示") => {
        return this.window.alert(message);
      },

      // 确认框（阻塞）
      confirm: (message, title = "确认") => {
        return this.window.confirm(message);
      },

      // 输入框（阻塞）
      prompt: (message, defaultValue = "", title = "输入") => {
        return this.window.prompt(message, defaultValue);
      },
    };
  }

  // 2. 异步对话框（推荐）
  asyncDialogs() {
    return {
      // 异步确认
      confirmAsync: (message) => {
        return new Promise((resolve) => {
          // 使用自定义模态框
          this.showCustomConfirm(message, resolve);
        });
      },

      // 异步输入
      promptAsync: (message, defaultValue = "") => {
        return new Promise((resolve) => {
          this.showCustomPrompt(message, defaultValue, resolve);
        });
      },

      // 异步选择文件
      selectFile: (options = {}) => {
        return new Promise((resolve, reject) => {
          const input = document.createElement("input");
          input.type = "file";

          // 设置选项
          if (options.accept) input.accept = options.accept;
          if (options.multiple) input.multiple = true;
          if (options.capture) input.capture = options.capture;

          input.onchange = (e) => {
            resolve(e.target.files);
          };

          input.oncancel = () => {
            reject(new Error("用户取消选择"));
          };

          input.click();
        });
      },
    };
  }

  // 3. 自定义对话框实现
  showCustomConfirm(message, callback) {
    const modal = this.createModal(`
            <div class="modal-content">
                <div class="modal-header">
                    <h3>确认</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn-cancel">取消</button>
                    <button class="btn-confirm">确定</button>
                </div>
            </div>
        `);

    modal.querySelector(".btn-cancel").addEventListener("click", () => {
      this.closeModal(modal);
      callback(false);
    });

    modal.querySelector(".btn-confirm").addEventListener("click", () => {
      this.closeModal(modal);
      callback(true);
    });
  }
}
```

### 5.2 location 对象 API

```javascript
class LocationManager {
  constructor() {
    this.location = window.location;
  }

  // 1. URL 解析
  parseURL() {
    return {
      // 完整URL
      href: this.location.href,

      // 协议
      protocol: this.location.protocol,

      // 主机信息
      host: this.location.host,
      hostname: this.location.hostname,
      port: this.location.port,

      // 路径信息
      origin: this.location.origin,
      pathname: this.location.pathname,
      search: this.location.search,
      hash: this.location.hash,

      // 认证信息
      username: this.location.username,
      password: this.location.password,
    };
  }

  // 2. URL 操作
  urlOperations() {
    return {
      // 跳转（记录历史）
      navigate: (url) => {
        this.location.href = url;
        // 或使用 this.location.assign(url);
      },

      // 替换（不记录历史）
      replace: (url) => {
        this.location.replace(url);
      },

      // 重新加载
      reload: (force = false) => {
        this.location.reload(force);
      },

      // 修改查询参数
      updateSearch: (params, replace = false) => {
        const url = new URL(this.location.href);

        Object.entries(params).forEach(([key, value]) => {
          if (value === null || value === undefined) {
            url.searchParams.delete(key);
          } else {
            url.searchParams.set(key, value);
          }
        });

        if (replace) {
          this.location.replace(url.toString());
        } else {
          this.location.href = url.toString();
        }
      },

      // 修改hash（单页应用路由）
      updateHash: (hash) => {
        this.location.hash = hash;
      },
    };
  }

  // 3. URL 构建和解析
  urlUtils() {
    return {
      // 构建完整URL
      buildURL: (base, params = {}) => {
        const url = new URL(base);

        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // 数组参数
            url.searchParams.delete(key);
            value.forEach((v) => url.searchParams.append(key, v));
          } else if (value !== null && value !== undefined) {
            url.searchParams.set(key, value);
          }
        });

        return url.toString();
      },

      // 解析查询参数
      parseQuery: () => {
        const params = new URLSearchParams(this.location.search);
        const result = {};

        for (const [key, value] of params) {
          // 处理重复的键
          if (result[key]) {
            if (Array.isArray(result[key])) {
              result[key].push(value);
            } else {
              result[key] = [result[key], value];
            }
          } else {
            result[key] = value;
          }
        }

        return result;
      },

      // 获取路径参数
      getPathSegments: () => {
        return this.location.pathname
          .split("/")
          .filter((segment) => segment.length > 0);
      },

      // 检查URL是否安全
      isSafeURL: (url) => {
        try {
          const parsed = new URL(url);
          const dangerousProtocols = ["javascript:", "data:", "vbscript:"];

          if (dangerousProtocols.includes(parsed.protocol.toLowerCase())) {
            return false;
          }

          return true;
        } catch (e) {
          return false;
        }
      },
    };
  }
}
```

### 5.3 navigator 对象 API

```javascript
class NavigatorManager {
  constructor() {
    this.navigator = window.navigator;
  }

  // 1. 浏览器信息
  getBrowserInfo() {
    return {
      // 基本信息
      userAgent: this.navigator.userAgent,
      appName: this.navigator.appName,
      appVersion: this.navigator.appVersion,
      platform: this.navigator.platform,
      product: this.navigator.product,

      // 语言和地区
      language: this.navigator.language,
      languages: this.navigator.languages,

      // 功能支持
      cookieEnabled: this.navigator.cookieEnabled,
      onLine: this.navigator.onLine,

      // 硬件信息
      hardwareConcurrency: this.navigator.hardwareConcurrency,
      deviceMemory: this.navigator.deviceMemory,
      maxTouchPoints: this.navigator.maxTouchPoints,
    };
  }

  // 2. 地理位置
  geolocation() {
    if (!this.navigator.geolocation) {
      return null;
    }

    return {
      // 获取当前位置
      getCurrentPosition: (options = {}) => {
        return new Promise((resolve, reject) => {
          const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          };

          this.navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            (error) => reject(error),
            { ...defaultOptions, ...options }
          );
        });
      },

      // 监听位置变化
      watchPosition: (success, error, options) => {
        return this.navigator.geolocation.watchPosition(
          (position) => success(position.coords),
          error,
          options
        );
      },

      // 清除监听
      clearWatch: (watchId) => {
        this.navigator.geolocation.clearWatch(watchId);
      },
    };
  }

  // 3. 媒体设备
  mediaDevices() {
    if (!this.navigator.mediaDevices) {
      return null;
    }

    return {
      // 获取媒体设备列表
      enumerateDevices: () => {
        return this.navigator.mediaDevices.enumerateDevices();
      },

      // 获取用户媒体（摄像头/麦克风）
      getUserMedia: (constraints = { audio: true, video: true }) => {
        return this.navigator.mediaDevices.getUserMedia(constraints);
      },

      // 屏幕共享
      getDisplayMedia: (constraints = { video: true }) => {
        return this.navigator.mediaDevices.getDisplayMedia(constraints);
      },
    };
  }

  // 4. 其他功能
  otherFeatures() {
    return {
      // 剪贴板
      clipboard: this.navigator.clipboard
        ? {
            readText: () => this.navigator.clipboard.readText(),
            writeText: (text) => this.navigator.clipboard.writeText(text),
            read: () => this.navigator.clipboard.read(),
            write: (data) => this.navigator.clipboard.write(data),
          }
        : null,

      // 权限API
      permissions: this.navigator.permissions
        ? {
            query: (permissionDescriptor) =>
              this.navigator.permissions.query(permissionDescriptor),
          }
        : null,

      // 存储API
      storage: this.navigator.storage
        ? {
            estimate: () => this.navigator.storage.estimate(),
            persist: () => this.navigator.storage.persist(),
            persisted: () => this.navigator.storage.persisted(),
          }
        : null,

      // 电池API
      battery: this.navigator.getBattery
        ? {
            getBattery: () => this.navigator.getBattery(),
          }
        : null,

      // 网络信息
      connection: this.navigator.connection
        ? {
            type: this.navigator.connection.effectiveType,
            downlink: this.navigator.connection.downlink,
            rtt: this.navigator.connection.rtt,
            saveData: this.navigator.connection.saveData,
          }
        : null,
    };
  }
}
```

### 5.4 history 对象 API

```javascript
class HistoryManager {
  constructor() {
    this.history = window.history;
    this.setupEventListeners();
  }

  // 1. 事件监听
  setupEventListeners() {
    // popstate 事件（前进/后退按钮）
    window.addEventListener("popstate", (event) => {
      console.log("历史记录变化:", event.state);
      this.onStateChange(event.state);
    });

    // hashchange 事件
    window.addEventListener("hashchange", (event) => {
      console.log("Hash变化:", window.location.hash);
      this.onHashChange(event);
    });
  }

  // 2. 历史记录操作
  historyOperations() {
    return {
      // 前进/后退
      back: () => this.history.back(),
      forward: () => this.history.forward(),
      go: (delta) => this.history.go(delta),

      // 添加历史记录
      pushState: (state, title, url) => {
        this.history.pushState(state, title, url);
        this.onStateChange(state);
      },

      // 替换当前记录
      replaceState: (state, title, url) => {
        this.history.replaceState(state, title, url);
        this.onStateChange(state);
      },

      // 获取状态
      getState: () => this.history.state,

      // 获取记录长度
      getLength: () => this.history.length,
    };
  }

  // 3. 单页应用路由
  setupSPARouter(routes) {
    this.routes = routes;

    // 拦截链接点击
    document.addEventListener("click", (event) => {
      const link = event.target.closest("a[data-router]");
      if (link) {
        event.preventDefault();
        const href = link.getAttribute("href");
        this.navigate(href);
      }
    });

    // 初始路由处理
    this.handleInitialRoute();
  }

  navigate(path) {
    const route = this.findRoute(path);
    if (route) {
      this.history.pushState(
        { route: route.name, params: route.params },
        route.title || document.title,
        path
      );

      this.loadRoute(route);
      document.title = route.title || document.title;
    } else {
      this.show404();
    }
  }

  // 4. 自定义历史记录栈
  createHistoryStack() {
    const stack = [];
    let index = -1;

    return {
      push: (state) => {
        // 移除当前位置之后的所有记录
        stack.splice(index + 1);
        stack.push(state);
        index = stack.length - 1;
      },

      replace: (state) => {
        if (index >= 0) {
          stack[index] = state;
        }
      },

      go: (delta) => {
        const newIndex = index + delta;
        if (newIndex >= 0 && newIndex < stack.length) {
          index = newIndex;
          return stack[index];
        }
        return null;
      },

      getCurrent: () => stack[index] || null,

      getAll: () => [...stack],

      clear: () => {
        stack.length = 0;
        index = -1;
      },
    };
  }
}
```

### 5.5 screen 对象 API

```javascript
class ScreenManager {
  constructor() {
    this.screen = window.screen;
    this.setupOrientationListener();
  }

  // 1. 屏幕信息
  getScreenInfo() {
    return {
      // 物理尺寸
      width: this.screen.width,
      height: this.screen.height,

      // 可用区域
      availWidth: this.screen.availWidth,
      availHeight: this.screen.availHeight,
      availTop: this.screen.availTop,
      availLeft: this.screen.availLeft,

      // 颜色和像素
      colorDepth: this.screen.colorDepth,
      pixelDepth: this.screen.pixelDepth,

      // 方向
      orientation: this.screen.orientation
        ? {
            type: this.screen.orientation.type,
            angle: this.screen.orientation.angle,
          }
        : null,
    };
  }

  // 2. 设备像素比
  getDevicePixelRatio() {
    return {
      ratio: window.devicePixelRatio || 1,

      // 检查是否为高分辨率屏幕
      isRetina: (window.devicePixelRatio || 1) >= 2,
      isHighDPI: (window.devicePixelRatio || 1) > 1,

      // 计算物理像素
      physicalPixels: {
        width: this.screen.width * (window.devicePixelRatio || 1),
        height: this.screen.height * (window.devicePixelRatio || 1),
      },
    };
  }

  // 3. 屏幕方向监听
  setupOrientationListener() {
    if (this.screen.orientation) {
      this.screen.orientation.addEventListener("change", () => {
        this.onOrientationChange({
          type: this.screen.orientation.type,
          angle: this.screen.orientation.angle,
        });
      });
    } else {
      // 回退方案：使用 resize 事件
      window.addEventListener("resize", () => {
        const isPortrait = window.innerHeight > window.innerWidth;
        this.onOrientationChange({
          type: isPortrait ? "portrait-primary" : "landscape-primary",
          angle: 0,
        });
      });
    }
  }

  // 4. 多显示器支持
  getMultiScreenInfo() {
    if (window.getScreenDetails) {
      return {
        getDetails: () => window.getScreenDetails(),
        isMultiScreen: true,
      };
    }

    return {
      isMultiScreen: false,
      screens: [this.getScreenInfo()],
    };
  }

  // 5. 响应式断点
  getBreakpoints() {
    const width = window.innerWidth;

    // Bootstrap 5 断点
    const breakpoints = {
      xs: width < 576, // 超小屏幕
      sm: width >= 576, // 小屏幕
      md: width >= 768, // 中等屏幕
      lg: width >= 992, // 大屏幕
      xl: width >= 1200, // 超大屏幕
      xxl: width >= 1400, // 特大屏幕
    };

    // 当前断点
    const current =
      Object.keys(breakpoints)
        .filter((key) => breakpoints[key])
        .pop() || "xs";

    return {
      current,
      all: breakpoints,
      width,
      isMobile: width < 768,
      isTablet: width >= 768 && width < 992,
      isDesktop: width >= 992,
    };
  }
}
```

## 六、BOM 的常用操作示例

### 6.1 浏览器检测和特性检测

```javascript
// 1. 浏览器检测
const BrowserUtils = {
  // 检测浏览器类型
  detectBrowser() {
    const ua = navigator.userAgent.toLowerCase();

    return {
      isChrome: /chrome/.test(ua) && !/edge/.test(ua),
      isFirefox: /firefox/.test(ua),
      isSafari: /safari/.test(ua) && !/chrome/.test(ua),
      isEdge: /edge/.test(ua),
      isIE: /msie|trident/.test(ua),
      isOpera: /opera|opr/.test(ua),
      isWeChat: /micromessenger/.test(ua),
      isQQ: /qqbrowser/.test(ua),
      isUC: /ucbrowser/.test(ua),
    };
  },

  // 检测设备类型
  detectDevice() {
    const ua = navigator.userAgent;

    return {
      isMobile: /mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua),
      isTablet: /tablet|ipad|android(?!.*mobile)/i.test(ua),
      isDesktop: !/mobile|tablet|android|iphone|ipod|ipad/i.test(ua),
      isIOS: /iphone|ipad|ipod/i.test(ua),
      isAndroid: /android/i.test(ua),
      isWindowsPhone: /windows phone/i.test(ua),
    };
  },

  // 检测操作系统
  detectOS() {
    const ua = navigator.userAgent;

    return {
      isWindows: /windows nt/i.test(ua),
      isMac: /macintosh|mac os x/i.test(ua),
      isLinux: /linux/i.test(ua),
      isIOS: /iphone|ipad|ipod/i.test(ua),
      isAndroid: /android/i.test(ua),
    };
  },

  // 检测网络状态
  detectNetwork() {
    return {
      online: navigator.onLine,
      connection: navigator.connection
        ? {
            type: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData,
          }
        : null,
    };
  },

  // 检测功能支持
  detectFeatures() {
    return {
      // Web API
      localStorage: "localStorage" in window,
      sessionStorage: "sessionStorage" in window,
      geolocation: "geolocation" in navigator,
      serviceWorker: "serviceWorker" in navigator,
      webSocket: "WebSocket" in window,
      webRTC: "RTCPeerConnection" in window,

      // HTML5 特性
      canvas: "HTMLCanvasElement" in window,
      svg: "SVGSVGElement" in window,
      video: "HTMLVideoElement" in window,
      audio: "HTMLAudioElement" in window,

      // ES6+ 特性
      promises: "Promise" in window,
      asyncAwait: typeof (async () => {}) === "function",
      arrowFunctions: typeof (() => {}) === "function",
      templateLiterals: "`${test}`" === "test",
    };
  },
};

// 2. 使用示例
const browserInfo = BrowserUtils.detectBrowser();
console.log("浏览器信息:", browserInfo);

const features = BrowserUtils.detectFeatures();
if (features.localStorage) {
  // 可以使用 localStorage
  localStorage.setItem("test", "value");
}

if (features.geolocation) {
  // 可以获取地理位置
  navigator.geolocation.getCurrentPosition((position) => {
    console.log("位置:", position.coords);
  });
}
```

### 6.2 URL 参数处理

```javascript
// URL 参数处理工具
class URLParams {
  // 1. 获取查询参数
  static getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};

    for (const [key, value] of params) {
      // 处理数组参数（如 ?tag=js&tag=html）
      if (result[key]) {
        if (Array.isArray(result[key])) {
          result[key].push(value);
        } else {
          result[key] = [result[key], value];
        }
      } else {
        result[key] = value;
      }
    }

    return result;
  }

  // 2. 设置查询参数
  static setQueryParams(params, options = {}) {
    const url = new URL(window.location.href);
    const { replace = false, clear = false } = options;

    if (clear) {
      url.search = "";
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        url.searchParams.delete(key);
      } else if (Array.isArray(value)) {
        url.searchParams.delete(key);
        value.forEach((v) => url.searchParams.append(key, v));
      } else {
        url.searchParams.set(key, value);
      }
    });

    if (replace) {
      window.history.replaceState(window.history.state, "", url.toString());
    } else {
      window.history.pushState({ params }, "", url.toString());
    }
  }

  // 3. 获取 hash 参数
  static getHashParams() {
    const hash = window.location.hash.substring(1);
    if (!hash) return {};

    try {
      return JSON.parse(decodeURIComponent(hash));
    } catch {
      return {};
    }
  }

  // 4. 设置 hash 参数
  static setHashParams(params) {
    const hash = encodeURIComponent(JSON.stringify(params));
    window.location.hash = hash;
  }

  // 5. 构建 URL
  static buildURL(base, params = {}) {
    const url = new URL(base);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  }

  // 6. 解析 URL
  static parseURL(urlString) {
    try {
      const url = new URL(urlString);

      return {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
        origin: url.origin,
        params: Object.fromEntries(url.searchParams),
      };
    } catch (error) {
      console.error("URL解析失败:", error);
      return null;
    }
  }
}

// 使用示例
// 获取当前查询参数
const params = URLParams.getQueryParams();
console.log("当前参数:", params);

// 更新参数
URLParams.setQueryParams({
  page: 2,
  sort: "desc",
  tags: ["javascript", "html"],
});

// 构建URL
const url = URLParams.buildURL("https://api.example.com/items", {
  limit: 10,
  offset: 0,
  category: "books",
});
console.log("构建的URL:", url);
```

### 6.3 浏览器存储操作

```javascript
// 浏览器存储管理器
class StorageManager {
  constructor() {
    this.storages = {
      local: window.localStorage,
      session: window.sessionStorage,
      memory: this.createMemoryStorage(),
    };

    this.setupStorageEvents();
  }

  // 1. 创建内存存储（回退方案）
  createMemoryStorage() {
    const store = new Map();

    return {
      setItem: (key, value) => store.set(key, value),
      getItem: (key) => store.get(key) || null,
      removeItem: (key) => store.delete(key),
      clear: () => store.clear(),
      key: (index) => Array.from(store.keys())[index],
      length: store.size,
    };
  }

  // 2. 存储操作
  set(key, value, options = {}) {
    const {
      type = "local", // 'local' | 'session' | 'memory'
      encrypt = false, // 是否加密
      ttl = null, // 过期时间（毫秒）
      compress = false, // 是否压缩
    } = options;

    let data = value;

    // 序列化非字符串数据
    if (typeof data !== "string") {
      data = JSON.stringify(data);
    }

    // 添加过期时间
    if (ttl) {
      const expiry = Date.now() + ttl;
      data = JSON.stringify({
        value: data,
        expiry,
        created: Date.now(),
      });
    }

    // 加密（简单示例）
    if (encrypt) {
      data = this.encrypt(data);
    }

    // 压缩（简单示例）
    if (compress) {
      data = this.compress(data);
    }

    try {
      this.storages[type].setItem(key, data);
      this.dispatchStorageEvent(key, value, type);
      return true;
    } catch (error) {
      console.error("存储失败:", error);
      return false;
    }
  }

  get(key, options = {}) {
    const {
      type = "local",
      decrypt = false,
      decompress = false,
      defaultValue = null,
    } = options;

    let data = this.storages[type].getItem(key);

    if (data === null) {
      return defaultValue;
    }

    // 解压缩
    if (decompress) {
      data = this.decompress(data);
    }

    // 解密
    if (decrypt) {
      data = this.decrypt(data);
    }

    // 尝试解析 JSON
    try {
      const parsed = JSON.parse(data);

      // 检查是否过期
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key, { type });
        return defaultValue;
      }

      // 如果有嵌套的value，返回它
      if (parsed.value !== undefined) {
        try {
          return JSON.parse(parsed.value);
        } catch {
          return parsed.value;
        }
      }

      return parsed;
    } catch {
      return data;
    }
  }

  remove(key, options = {}) {
    const { type = "local" } = options;
    this.storages[type].removeItem(key);
    this.dispatchStorageEvent(key, null, type);
  }

  clear(type = "local") {
    this.storages[type].clear();
    this.dispatchStorageEvent(null, null, type);
  }

  // 3. 存储事件
  setupStorageEvents() {
    // 监听storage事件（跨标签页）
    window.addEventListener("storage", (event) => {
      console.log("存储变化:", {
        key: event.key,
        oldValue: event.oldValue,
        newValue: event.newValue,
        url: event.url,
        storageArea: event.storageArea,
      });
    });
  }

  dispatchStorageEvent(key, newValue, storageArea) {
    const event = new CustomEvent("customstorage", {
      detail: {
        key,
        newValue,
        storageArea,
        url: window.location.href,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }

  // 4. 工具方法
  encrypt(text) {
    // 简单加密示例（实际应用应使用更安全的加密）
    return btoa(encodeURIComponent(text));
  }

  decrypt(text) {
    try {
      return decodeURIComponent(atob(text));
    } catch {
      return text;
    }
  }

  compress(text) {
    // 简单压缩示例（实际应用可使用更好的算法）
    return text.replace(/\s+/g, " ");
  }

  decompress(text) {
    return text;
  }

  // 5. 命名空间存储
  namespace(namespace, type = "local") {
    return {
      set: (key, value, options) =>
        this.set(`${namespace}.${key}`, value, { ...options, type }),

      get: (key, options) =>
        this.get(`${namespace}.${key}`, { ...options, type }),

      remove: (key) => this.remove(`${namespace}.${key}`, { type }),

      clear: () => {
        const prefix = `${namespace}.`;
        const storage = this.storages[type];

        for (let i = 0; i < storage.length; i++) {
          const key = storage.key(i);
          if (key.startsWith(prefix)) {
            storage.removeItem(key);
          }
        }
      },
    };
  }
}

// 使用示例
const storage = new StorageManager();

// 存储数据
storage.set(
  "user",
  {
    id: 1,
    name: "张三",
    email: "zhangsan@example.com",
  },
  {
    type: "local",
    encrypt: true,
    ttl: 24 * 60 * 60 * 1000, // 24小时过期
  }
);

// 获取数据
const user = storage.get("user", { decrypt: true });
console.log("用户数据:", user);

// 使用命名空间
const userStorage = storage.namespace("user");
userStorage.set("preferences", { theme: "dark", language: "zh-CN" });
const prefs = userStorage.get("preferences");
```

### 6.4 定时器和动画帧

```javascript
// 定时器和动画管理
class TimerManager {
  constructor() {
    this.timers = new Map();
    this.animations = new Map();
    this.rafId = null;
  }

  // 1. setTimeout 封装
  setTimeout(callback, delay, ...args) {
    const timerId = window.setTimeout(() => {
      callback(...args);
      this.timers.delete(timerId);
    }, delay);

    this.timers.set(timerId, {
      type: "timeout",
      startTime: Date.now(),
      delay,
      callback,
    });

    return timerId;
  }

  // 2. setInterval 封装
  setInterval(callback, interval, ...args) {
    const timerId = window.setInterval(() => {
      callback(...args);
    }, interval);

    this.timers.set(timerId, {
      type: "interval",
      startTime: Date.now(),
      interval,
      callback,
    });

    return timerId;
  }

  // 3. requestAnimationFrame 封装
  requestAnimationFrame(callback) {
    const rafId = window.requestAnimationFrame((timestamp) => {
      callback(timestamp);
      this.animations.delete(rafId);
    });

    this.animations.set(rafId, {
      callback,
      startTime: Date.now(),
    });

    return rafId;
  }

  // 4. 清理定时器
  clearTimeout(timerId) {
    window.clearTimeout(timerId);
    this.timers.delete(timerId);
  }

  clearInterval(timerId) {
    window.clearInterval(timerId);
    this.timers.delete(timerId);
  }

  cancelAnimationFrame(rafId) {
    window.cancelAnimationFrame(rafId);
    this.animations.delete(rafId);
  }

  // 5. 批量清理
  clearAll() {
    // 清理所有定时器
    this.timers.forEach((info, id) => {
      if (info.type === "timeout") {
        window.clearTimeout(id);
      } else if (info.type === "interval") {
        window.clearInterval(id);
      }
    });

    // 清理所有动画帧
    this.animations.forEach((info, id) => {
      window.cancelAnimationFrame(id);
    });

    this.timers.clear();
    this.animations.clear();
  }

  // 6. 高级定时器功能
  createAdvancedTimer(options = {}) {
    const {
      callback,
      interval = 1000,
      immediate = false,
      autoStart = true,
    } = options;

    let timerId = null;
    let isRunning = false;
    let startTime = null;
    let elapsed = 0;
    let pausedTime = null;

    const timer = {
      // 开始计时器
      start: () => {
        if (isRunning) return;

        isRunning = true;
        startTime = Date.now() - elapsed;

        const tick = () => {
          if (!isRunning) return;

          const currentTime = Date.now();
          elapsed = currentTime - startTime;

          callback(elapsed);

          if (isRunning) {
            timerId = window.setTimeout(tick, interval);
          }
        };

        if (immediate) {
          callback(0);
        }

        tick();
      },

      // 暂停计时器
      pause: () => {
        if (!isRunning) return;

        isRunning = false;
        pausedTime = Date.now();

        if (timerId) {
          window.clearTimeout(timerId);
          timerId = null;
        }
      },

      // 恢复计时器
      resume: () => {
        if (isRunning) return;

        if (pausedTime) {
          elapsed += Date.now() - pausedTime;
          pausedTime = null;
        }

        timer.start();
      },

      // 停止计时器
      stop: () => {
        isRunning = false;
        startTime = null;
        elapsed = 0;
        pausedTime = null;

        if (timerId) {
          window.clearTimeout(timerId);
          timerId = null;
        }
      },

      // 获取状态
      getState: () => ({
        isRunning,
        elapsed,
        interval,
      }),
    };

    if (autoStart) {
      timer.start();
    }

    return timer;
  }

  // 7. 防抖函数
  debounce(func, wait, immediate = false) {
    let timeout;

    return function executedFunction(...args) {
      const context = this;
      const later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      const callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  }

  // 8. 节流函数
  throttle(func, limit) {
    let inThrottle;

    return function executedFunction(...args) {
      const context = this;

      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;

        window.setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }
}

// 使用示例
const timerManager = new TimerManager();

// 创建防抖函数
const debouncedSearch = timerManager.debounce((query) => {
  console.log("搜索:", query);
}, 300);

// 输入时触发防抖搜索
document.getElementById("search").addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

// 创建节流函数
const throttledScroll = timerManager.throttle(() => {
  console.log("滚动位置:", window.scrollY);
}, 100);

// 滚动时触发节流
window.addEventListener("scroll", throttledScroll);

// 高级计时器
const progressTimer = timerManager.createAdvancedTimer({
  callback: (elapsed) => {
    const progress = (elapsed / 10000) * 100; // 10秒完成
    console.log("进度:", Math.min(progress, 100) + "%");
  },
  interval: 100,
  immediate: true,
});
```

### 6.5 浏览器事件监听

```javascript
// 浏览器事件管理器
class EventManager {
  constructor() {
    this.listeners = new Map();
    this.setupGlobalEvents();
  }

  // 1. 全局事件监听
  setupGlobalEvents() {
    // 页面生命周期事件
    this.on("load", () => this.onPageLoad());
    this.on("DOMContentLoaded", () => this.onDOMReady());
    this.on("beforeunload", (e) => this.onBeforeUnload(e));
    this.on("unload", () => this.onUnload());

    // 网络事件
    this.on("online", () => this.onNetworkOnline());
    this.on("offline", () => this.onNetworkOffline());

    // 窗口事件
    this.on("resize", () => this.onWindowResize());
    this.on("scroll", () => this.onWindowScroll());

    // 错误事件
    this.on("error", (e) => this.onError(e));
    this.on("unhandledrejection", (e) => this.onUnhandledRejection(e));
  }

  // 2. 事件监听封装
  on(event, handler, options = {}) {
    const wrappedHandler = this.wrapHandler(handler, options);
    window.addEventListener(event, wrappedHandler, options);

    // 保存监听器以便清理
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(wrappedHandler);

    return () => this.off(event, wrappedHandler);
  }

  off(event, handler) {
    window.removeEventListener(event, handler);

    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(handler);
    }
  }

  // 3. 包装处理函数
  wrapHandler(handler, options) {
    const { once = false, passive = false, capture = false } = options;

    return function wrapped(event) {
      // 执行前的预处理
      event.preventDefault = this.createPreventDefault(event);
      event.stopPropagation = this.createStopPropagation(event);

      try {
        // 执行处理函数
        const result = handler.call(this, event);

        // 处理 Promise
        if (result && typeof result.then === "function") {
          result.catch((error) => {
            console.error("事件处理异步错误:", error);
          });
        }

        return result;
      } catch (error) {
        console.error("事件处理错误:", error);
        this.onError(error);
      }
    }.bind(this);
  }

  // 4. 自定义事件
  emit(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);
  }

  // 5. 一次性事件
  once(event, handler, options = {}) {
    return this.on(event, handler, { ...options, once: true });
  }

  // 6. 事件委托
  delegate(selector, event, handler, options = {}) {
    return this.on(
      event,
      (e) => {
        if (e.target.matches(selector) || e.target.closest(selector)) {
          handler.call(e.target, e);
        }
      },
      options
    );
  }

  // 7. 页面生命周期处理
  onPageLoad() {
    console.log("页面加载完成");
    this.emit("page:loaded", { timestamp: Date.now() });
  }

  onDOMReady() {
    console.log("DOM 加载完成");
    this.emit("page:domready");
  }

  onBeforeUnload(event) {
    // 可以在这里询问用户是否离开
    const message = "确定要离开吗？未保存的数据可能会丢失。";
    event.returnValue = message;
    return message;
  }

  onUnload() {
    console.log("页面卸载");
    // 清理资源
    this.cleanup();
  }

  // 8. 网络状态处理
  onNetworkOnline() {
    console.log("网络恢复在线");
    this.emit("network:online");
  }

  onNetworkOffline() {
    console.log("网络离线");
    this.emit("network:offline");
  }

  // 9. 清理所有监听器
  cleanup() {
    this.listeners.forEach((handlers, event) => {
      handlers.forEach((handler) => {
        window.removeEventListener(event, handler);
      });
    });
    this.listeners.clear();
  }
}

// 使用示例
const eventManager = new EventManager();

// 监听自定义事件
eventManager.on("page:loaded", (e) => {
  console.log("收到页面加载完成事件:", e.detail);
});

// 事件委托
eventManager.delegate(".btn", "click", function (e) {
  console.log("按钮被点击:", this.textContent);
});

// 触发自定义事件
eventManager.emit("user:login", { userId: 123, username: "张三" });

// 一次性事件
const removeListener = eventManager.once("form:submit", () => {
  console.log("表单提交（只执行一次）");
});
```

## 七、总结

### 7.1 BOM 的核心价值

1. **浏览器环境访问**：提供访问浏览器窗口、历史、屏幕等环境信息的能力
2. **全局功能管理**：包含定时器、对话框、存储等全局功能
3. **用户交互控制**：支持导航、对话框、打印等用户交互
4. **跨窗口通信**：支持窗口间和标签页间的通信
5. **性能监控**：提供性能测量和监控能力

### 7.2 使用建议

1. **特性检测优先**：始终先检测功能是否支持再使用
2. **错误处理**：BOM API 可能因浏览器或权限问题失败，要有错误处理
3. **性能考虑**：合理使用定时器，及时清理资源
4. **安全防护**：注意 XSS、CSRF 等安全问题
5. **渐进增强**：为不支持某些功能的浏览器提供回退方案

### 7.3 浏览器兼容性

虽然 BOM 没有统一标准，但现代浏览器的大多数核心 API 已经相当一致。对于旧浏览器，需要考虑：

- 使用 polyfill 填补缺失功能
- 提供降级方案
- 进行特性检测

**记住**：BOM 是前端开发的基础，理解 BOM 能让你更好地控制浏览器环境，创建更强大、更用户友好的 Web 应用。
