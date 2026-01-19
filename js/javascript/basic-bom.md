# BOM（浏览器对象模型）

## 1. BOM 基础概念

### 1.1 什么是 BOM

**浏览器对象模型（Browser Object Model）** 是 JavaScript 与浏览器交互的接口。BOM 提供了独立于网页内容的、与浏览器窗口进行交互的对象和方法。

### 1.2 BOM 与 DOM 的区别

| 特性     | BOM            | DOM          |
| -------- | -------------- | ------------ |
| 范围     | 浏览器窗口相关 | 文档内容相关 |
| 标准     | 无统一标准     | W3C 标准     |
| 核心对象 | window         | document     |

### 1.3 BOM 结构

```
window (全局对象)
├── document (DOM)
├── location
├── history
├── navigator
├── screen
├── frames
└── ...
```

## 2. window 对象详解

### 2.1 window 对象的特殊地位

```javascript
// window 是全局对象，以下写法等价
var globalVar = "Hello";
console.log(globalVar); // "Hello"
console.log(window.globalVar); // "Hello"

// 全局函数也是 window 的方法
function sayHello() {
  console.log("Hello World");
}
window.sayHello(); // "Hello World"
```

### 2.2 窗口操作

```javascript
// 获取窗口尺寸
const windowWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const windowHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

// 打开新窗口
const newWindow = window.open(
  "https://example.com",
  "_blank",
  "width=600,height=400,resizable=yes"
);

// 关闭当前窗口
// window.close();  // 只能关闭由脚本打开的窗口

// 窗口移动和调整
window.moveTo(100, 100); // 移动到指定坐标
window.moveBy(50, 50); // 相对移动
window.resizeTo(800, 600); // 调整到指定尺寸
window.resizeBy(-100, -50); // 相对调整
```

### 2.3 对话框

```javascript
// 警告框
window.alert("这是一条警告信息");

// 确认框
const isConfirmed = window.confirm("确定要删除吗？");
if (isConfirmed) {
  console.log("用户点击了确定");
}

// 输入框
const userName = window.prompt("请输入您的姓名", "默认姓名");
if (userName) {
  console.log(`欢迎，${userName}`);
}
```

### 2.4 页面加载事件

```javascript
// DOM 加载完成（不等待图片等资源）
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM 已加载完成");
});

// 页面完全加载（包括所有资源）
window.addEventListener("load", function () {
  console.log("页面完全加载完成");
});

// 页面卸载前（用户离开页面时）
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  e.returnValue = ""; // Chrome 需要设置 returnValue
  return "您有未保存的更改，确定要离开吗？";
});
```

## 3. location 对象

### 3.1 属性详解

```javascript
// 完整的 URL 信息
console.log("href:", location.href); // 完整 URL
console.log("protocol:", location.protocol); // 协议 (http: 或 https:)
console.log("host:", location.host); // 主机名+端口号
console.log("hostname:", location.hostname); // 主机名
console.log("port:", location.port); // 端口号
console.log("pathname:", location.pathname); // 路径部分
console.log("search:", location.search); // 查询字符串（包含 ?）
console.log("hash:", location.hash); // 锚点（包含 #）
console.log("origin:", location.origin); // 协议+主机名+端口
```

### 3.2 方法详解

```javascript
// 1. assign() - 加载新文档（会在历史记录中生成记录）
function navigateToNewPage() {
  location.assign("https://example.com/newpage");
}

// 2. replace() - 替换当前文档（不会生成历史记录）
function replaceCurrentPage() {
  location.replace("https://example.com/another");
}

// 3. reload() - 重新加载页面
function reloadPage(force = false) {
  if (force) {
    location.reload(true); // 强制从服务器重新加载
  } else {
    location.reload(); // 可能从缓存加载
  }
}

// 4. 操作 URL 各部分
function modifyURL() {
  // 修改 hash（常用于单页应用路由）
  location.hash = "#section2";

  // 修改查询参数
  location.search = "?page=2&sort=desc";

  // 修改路径
  location.pathname = "/newpath";
}
```

### 3.3 实用示例：解析 URL 参数

```javascript
// 获取 URL 查询参数
function getQueryParams() {
  const params = {};
  const search = location.search.substring(1);

  if (search) {
    search.split("&").forEach((pair) => {
      const [key, value] = pair.split("=");
      params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });
  }

  return params;
}

// 构建带参数的 URL
function buildURL(base, params) {
  const url = new URL(base);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });
  return url.toString();
}
```

## 4. history 对象

### 4.1 基本属性和方法

```javascript
// 历史记录长度
console.log("历史记录数量:", history.length);

// 导航方法
function navigateHistory() {
  // 后退一页
  history.back();

  // 前进一页
  history.forward();

  // 前进/后退 n 页
  history.go(-2); // 后退两页
  history.go(1); // 前进一页
  history.go(0); // 刷新当前页
}
```

### 4.2 History API（HTML5）

```javascript
// 添加历史记录（不刷新页面）
function pushStateExample() {
  const state = { page: "home", data: { title: "首页" } };
  const title = "首页标题";
  const url = "/home";

  history.pushState(state, title, url);
}

// 替换当前历史记录
function replaceStateExample() {
  const state = { page: "about", data: { title: "关于" } };
  const title = "关于我们";
  const url = "/about";

  history.replaceState(state, title, url);
}

// 监听 popstate 事件（用户点击前进/后退时触发）
window.addEventListener("popstate", function (event) {
  console.log("location:", location.href);
  console.log("state:", event.state);

  // 根据 state 更新页面内容
  if (event.state) {
    updatePageContent(event.state);
  }
});

// 获取当前 state
const currentState = history.state;
console.log("当前 state:", currentState);
```

### 4.3 单页应用路由示例

```javascript
class SimpleRouter {
  constructor() {
    this.routes = {};
    this.bindEvents();
    this.init();
  }

  // 注册路由
  route(path, callback) {
    this.routes[path] = callback;
  }

  // 初始化
  init() {
    window.addEventListener("popstate", () => this.handleRouting());
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();
        this.navigate(e.target.href);
      }
    });
    this.handleRouting();
  }

  // 处理路由
  handleRouting() {
    const path = location.pathname || "/";
    const handler = this.routes[path];

    if (handler) {
      handler();
    } else {
      this.routes["/404"]?.();
    }
  }

  // 导航到新页面
  navigate(url) {
    history.pushState(null, "", url);
    this.handleRouting();
  }
}

// 使用示例
const router = new SimpleRouter();
router.route("/", () => console.log("首页"));
router.route("/about", () => console.log("关于页面"));
```

## 5. navigator 对象

### 5.1 浏览器信息

```javascript
// 用户代理字符串（注意：可能被修改，不可完全信任）
console.log("User Agent:", navigator.userAgent);

// 浏览器信息检测函数
function detectBrowser() {
  const ua = navigator.userAgent.toLowerCase();

  return {
    isChrome: /chrome/.test(ua) && !/edge/.test(ua),
    isFirefox: /firefox/.test(ua),
    isSafari: /safari/.test(ua) && !/chrome/.test(ua),
    isEdge: /edge/.test(ua),
    isIE: /msie|trident/.test(ua),
    isMobile: /mobile/.test(ua),
    isTablet: /tablet/.test(ua),
  };
}

// 语言和地理位置
console.log("语言:", navigator.language || navigator.userLanguage);
console.log("可用语言:", navigator.languages);

// 在线状态
console.log("是否在线:", navigator.onLine);

// 监听网络状态变化
window.addEventListener("online", () => {
  console.log("网络已连接");
});

window.addEventListener("offline", () => {
  console.log("网络已断开");
});
```

### 5.2 功能检测

```javascript
// 检测浏览器支持的功能
function checkBrowserCapabilities() {
  const capabilities = {
    // 存储相关
    localStorage: "localStorage" in window,
    sessionStorage: "sessionStorage" in window,

    // 多媒体
    geolocation: "geolocation" in navigator,
    getUserMedia: "getUserMedia" in navigator.mediaDevices,

    // 图形
    canvas: "HTMLCanvasElement" in window,
    webGL: (() => {
      try {
        return (
          !!window.WebGLRenderingContext &&
          !!document.createElement("canvas").getContext("webgl")
        );
      } catch (e) {
        return false;
      }
    })(),

    // 其他
    serviceWorker: "serviceWorker" in navigator,
    pushManager: "PushManager" in window,
    webSocket: "WebSocket" in window,

    // 设备特性
    touch: "ontouchstart" in window,
    vibration: "vibrate" in navigator,
  };

  return capabilities;
}
```

### 5.3 地理位置 API

```javascript
// 获取当前位置
function getCurrentLocation() {
  if (!navigator.geolocation) {
    console.error("浏览器不支持地理位置");
    return;
  }

  const options = {
    enableHighAccuracy: true, // 高精度模式
    timeout: 5000, // 超时时间（毫秒）
    maximumAge: 0, // 不缓存位置
  };

  navigator.geolocation.getCurrentPosition(
    // 成功回调
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      console.log("纬度:", latitude);
      console.log("经度:", longitude);
      console.log("精度:", accuracy, "米");
    },
    // 失败回调
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.error("用户拒绝提供位置");
          break;
        case error.POSITION_UNAVAILABLE:
          console.error("位置信息不可用");
          break;
        case error.TIMEOUT:
          console.error("请求位置超时");
          break;
      }
    },
    options
  );
}

// 持续监听位置变化
function watchLocation() {
  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log("位置更新:", position.coords);
    },
    (error) => {
      console.error("位置监听错误:", error.message);
    }
  );

  // 停止监听
  // navigator.geolocation.clearWatch(watchId);
}
```

## 6. 定时器（Timers）

### 6.1 setTimeout

```javascript
// 基本用法
const timeoutId = setTimeout(() => {
  console.log("2秒后执行");
}, 2000);

// 带参数
setTimeout(
  (name, age) => {
    console.log(`姓名: ${name}, 年龄: ${age}`);
  },
  1000,
  "张三",
  25
);

// 清除定时器
clearTimeout(timeoutId);
```

### 6.2 setInterval

```javascript
// 基本用法
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`计数: ${count}`);

  if (count >= 5) {
    clearInterval(intervalId);
    console.log("定时器已停止");
  }
}, 1000);

// 动画示例
function animateElement(elementId) {
  const element = document.getElementById(elementId);
  let position = 0;
  let direction = 1;

  const animationId = setInterval(() => {
    position += 5 * direction;
    element.style.left = position + "px";

    if (position >= 200 || position <= 0) {
      direction *= -1; // 反向
    }
  }, 16); // 约 60fps
}
```

### 6.3 高级定时器技巧

```javascript
// 1. 防抖动（Debounce）
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// 使用示例
const handleResize = debounce(() => {
  console.log("窗口大小改变");
}, 250);

window.addEventListener("resize", handleResize);

// 2. 节流（Throttle）
function throttle(func, limit) {
  let inThrottle;

  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 3. 递归 setTimeout（替代 setInterval）
function recursiveTimeout(callback, interval) {
  let timeoutId;

  function execute() {
    callback();
    timeoutId = setTimeout(execute, interval);
  }

  timeoutId = setTimeout(execute, interval);

  return {
    clear: () => clearTimeout(timeoutId),
  };
}

// 4. 精确计时器
class AccurateTimer {
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.expected = 0;
    this.timeoutId = null;
    this.driftHistory = [];
  }

  start() {
    this.expected = Date.now() + this.interval;
    this.timeoutId = setTimeout(this.step.bind(this), this.interval);
  }

  step() {
    const now = Date.now();
    const drift = now - this.expected;

    // 记录误差
    this.driftHistory.push(drift);
    if (this.driftHistory.length > 10) {
      this.driftHistory.shift();
    }

    // 执行回调
    this.callback();

    // 调整下一次执行时间
    this.expected += this.interval;
    const adjustedInterval = this.interval - drift;

    this.timeoutId = setTimeout(
      this.step.bind(this),
      Math.max(0, adjustedInterval)
    );
  }

  stop() {
    clearTimeout(this.timeoutId);
  }

  getAverageDrift() {
    if (this.driftHistory.length === 0) return 0;
    return this.driftHistory.reduce((a, b) => a + b) / this.driftHistory.length;
  }
}
```

### 6.4 定时器与事件循环

```javascript
// 理解 JavaScript 事件循环
console.log("开始");

setTimeout(() => {
  console.log("setTimeout 回调");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 回调");
});

console.log("结束");

// 输出顺序：
// 开始
// 结束
// Promise 回调（微任务）
// setTimeout 回调（宏任务）
```

## 7. 性能优化建议

### 7.1 定时器优化

```javascript
// 1. 及时清理定时器
class TimerManager {
  constructor() {
    this.timers = new Set();
  }

  setTimeout(callback, delay, ...args) {
    const timerId = setTimeout(() => {
      callback(...args);
      this.timers.delete(timerId);
    }, delay);

    this.timers.add(timerId);
    return timerId;
  }

  clearAll() {
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();
  }
}

// 2. 使用 requestAnimationFrame 替代 setTimeout 做动画
function animateWithRAF(element) {
  let position = 0;

  function step(timestamp) {
    // timestamp 是高精度时间戳
    position += 1;
    element.style.transform = `translateX(${position}px)`;

    if (position < 200) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
```

### 7.2 内存管理

```javascript
// 避免内存泄漏
function setupPage() {
  const data = getLargeData(); // 获取大量数据

  // 错误示例：定时器持有大对象引用
  setInterval(() => {
    processData(data); // data 无法被垃圾回收
  }, 1000);

  // 正确示例：使用弱引用或及时清理
  const intervalId = setInterval(() => {
    // 处理数据
  }, 1000);

  // 页面卸载时清理
  window.addEventListener("beforeunload", () => {
    clearInterval(intervalId);
    // 解除引用
    data = null;
  });
}
```

## 总结

BOM 提供了丰富的浏览器交互功能，正确使用这些 API 可以：

1. **提升用户体验**：通过历史记录管理实现流畅的页面导航
2. **增强功能**：利用地理位置、设备信息等提供个性化服务
3. **优化性能**：合理使用定时器，避免性能问题
4. **提高兼容性**：通过特性检测优雅降级

记住要始终考虑浏览器兼容性，并进行充分的错误处理，以确保代码的健壮性。
