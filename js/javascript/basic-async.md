# JavaScript 异步编程

## 异步编程基础

### 什么是异步编程？

异步编程是一种编程模式，允许程序在等待某些操作（如 I/O 操作、网络请求、定时器等）完成时继续执行其他任务，而不是阻塞整个执行流程。

```javascript
// 同步 vs 异步示例
console.log("1. 开始任务");

// 同步操作 - 立即执行
console.log("2. 同步任务完成");

// 异步操作 - 稍后执行
setTimeout(() => {
  console.log("3. 异步任务完成");
}, 1000);

console.log("4. 继续执行其他任务");

// 输出顺序:
// 1. 开始任务
// 2. 同步任务完成
// 4. 继续执行其他任务
// 3. 异步任务完成 (1秒后)
```

### 事件循环（Event Loop）

JavaScript 使用单线程事件循环模型处理异步操作：

1. **调用栈（Call Stack）**：执行同步代码
2. **任务队列（Task Queue）**：存储待处理的异步任务
3. **事件循环**：不断检查调用栈是否为空，如果为空则从任务队列中取出任务执行

## 回调函数（Callback Functions）

回调函数是最基础的异步处理方式，将函数作为参数传递给另一个函数，在适当的时候被调用。

### 基本用法

```javascript
// 简单回调示例
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(null, data); // 第一个参数通常用于错误
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error("错误:", error);
  } else {
    console.log("数据:", data);
  }
});
```

### 常见应用场景

```javascript
// 1. 定时器回调
setTimeout(() => {
  console.log("1秒后执行");
}, 1000);

// 2. 事件监听器回调
document.getElementById("btn").addEventListener("click", () => {
  console.log("按钮被点击");
});

// 3. Node.js 文件操作回调
const fs = require("fs");
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

### 回调地狱问题

```javascript
// 多层嵌套回调 - "回调地狱"
getUser(1, (err, user) => {
  if (err) {
    console.error("获取用户失败:", err);
    return;
  }

  getUserPosts(user.id, (err, posts) => {
    if (err) {
      console.error("获取帖子失败:", err);
      return;
    }

    getPostComments(posts[0].id, (err, comments) => {
      if (err) {
        console.error("获取评论失败:", err);
        return;
      }

      console.log("用户帖子评论:", comments);
    });
  });
});
```

## Promise 基础用法

Promise 是解决回调地狱的方案，表示一个异步操作的最终完成（或失败）及其结果值。

### 创建 Promise

```javascript
// 1. 创建 Promise
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = Math.random() > 0.5;

    if (success) {
      resolve({ data: "操作成功!" });
    } else {
      reject(new Error("操作失败!"));
    }
  }, 1000);
});

// 2. 使用 Promise
myPromise
  .then((result) => {
    console.log("成功:", result.data);
  })
  .catch((error) => {
    console.error("失败:", error.message);
  })
  .finally(() => {
    console.log("操作完成（无论成功或失败）");
  });
```

### Promise 链式调用

```javascript
// Promise 链式调用示例
function getUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`获取用户 ${userId}...`);
      resolve({ id: userId, name: "张三" });
    }, 500);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`获取用户 ${userId} 的帖子...`);
      resolve(["帖子1", "帖子2", "帖子3"]);
    }, 500);
  });
}

function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`获取帖子 ${postId} 的评论...`);
      resolve(["评论1", "评论2"]);
    }, 500);
  });
}

// 链式调用
getUser(1)
  .then((user) => {
    console.log("用户:", user.name);
    return getUserPosts(user.id); // 返回新的 Promise
  })
  .then((posts) => {
    console.log("帖子数量:", posts.length);
    return getPostComments(posts[0]);
  })
  .then((comments) => {
    console.log("评论:", comments);
  })
  .catch((error) => {
    console.error("错误:", error);
  });
```

### Promise 静态方法

```javascript
// Promise.all - 等待所有 Promise 完成
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 1000);
});

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log("所有Promise完成:", values); // [1, 2, 3]
  })
  .catch((error) => {
    console.error("有Promise失败:", error);
  });

// Promise.race - 返回最先完成的 Promise
Promise.race([
  new Promise((resolve) => setTimeout(() => resolve("快"), 500)),
  new Promise((resolve) => setTimeout(() => resolve("慢"), 1000)),
]).then((result) => {
  console.log("最先完成的是:", result); // "快"
});

// Promise.allSettled - 等待所有 Promise 完成（无论成功或失败）
Promise.allSettled([
  Promise.resolve("成功"),
  Promise.reject("失败"),
  Promise.resolve("另一个成功"),
]).then((results) => {
  results.forEach((result) => {
    console.log(result.status, result.value || result.reason);
  });
});

// Promise.any - 返回第一个成功的 Promise
Promise.any([
  Promise.reject("错误1"),
  Promise.reject("错误2"),
  Promise.resolve("成功"),
])
  .then((result) => {
    console.log("第一个成功的结果:", result); // "成功"
  })
  .catch((errors) => {
    console.log("全部失败:", errors);
  });
```

## async/await 基础

async/await 是基于 Promise 的语法糖，让异步代码看起来像同步代码。

### 基本用法

```javascript
// 使用 async 声明异步函数
async function fetchData() {
  try {
    // 使用 await 等待 Promise 完成
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: "获取的数据" });
      }, 1000);
    });

    console.log("数据:", response.data);
    return response.data;
  } catch (error) {
    console.error("错误:", error);
    throw error;
  }
}

// 调用异步函数
fetchData()
  .then((data) => console.log("完成:", data))
  .catch((error) => console.error("捕获错误:", error));
```

### 错误处理

```javascript
// 1. try...catch 方式
async function getUserData(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getUserPosts(user.id);
    const comments = await getPostComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error("获取数据失败:", error);
    throw new Error("无法获取完整用户数据");
  }
}

// 2. 在调用处处理错误
async function main() {
  try {
    const data = await getUserData(1);
    console.log("用户数据:", data);
  } catch (error) {
    console.error("主函数错误:", error);
  }
}

main();

// 3. 多个异步操作的错误处理
async function fetchMultipleUrls(urls) {
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.json();
      } catch (error) {
        return { error: `无法获取 ${url}`, details: error.message };
      }
    })
  );
  return results;
}
```

### 并行执行优化

```javascript
// 错误示例 - 顺序执行（较慢）
async function getDataSequential() {
  const user = await getUser(1); // 等待 500ms
  const posts = await getUserPosts(1); // 等待 500ms
  const comments = await getPostComments(1); // 等待 500ms
  // 总等待时间: 1500ms
  return { user, posts, comments };
}

// 正确示例 - 并行执行（较快）
async function getDataParallel() {
  // 同时开始所有异步操作
  const userPromise = getUser(1);
  const postsPromise = getUserPosts(1);
  const commentsPromise = getPostComments(1);

  // 等待所有操作完成
  const [user, posts, comments] = await Promise.all([
    userPromise,
    postsPromise,
    commentsPromise,
  ]);
  // 总等待时间: 500ms
  return { user, posts, comments };
}

// 优化并行执行
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}
```

## Fetch API 基础使用

Fetch API 提供了现代、强大的网络请求能力，返回 Promise 对象。

### 基本 GET 请求

```javascript
// 最简单的 GET 请求
fetch("https://api.example.com/data")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }
    return response.json(); // 解析 JSON 数据
  })
  .then((data) => {
    console.log("数据:", data);
  })
  .catch((error) => {
    console.error("请求失败:", error);
  });

// 使用 async/await 的 GET 请求
async function fetchData() {
  try {
    const response = await fetch("https://api.example.com/data");

    if (!response.ok) {
      throw new Error(`HTTP错误! 状态码: ${response.status}`);
    }

    const data = await response.json();
    console.log("数据:", data);
    return data;
  } catch (error) {
    console.error("请求失败:", error);
    throw error;
  }
}
```

### POST 请求

```javascript
// POST 请求 - 发送 JSON 数据
async function postData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123", // 认证令牌
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "请求失败");
    }

    return await response.json();
  } catch (error) {
    console.error("POST请求失败:", error);
    throw error;
  }
}

// 使用示例
const newUser = {
  name: "李四",
  email: "lisi@example.com",
  age: 25,
};

postData("https://api.example.com/users", newUser)
  .then((user) => console.log("创建的用户:", user))
  .catch((error) => console.error("创建失败:", error));
```

### 请求配置选项

```javascript
// 完整的请求配置
const requestOptions = {
  method: "PUT", // GET, POST, PUT, DELETE, PATCH 等
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-token-here",
    "Custom-Header": "custom-value",
  },
  body: JSON.stringify({ key: "value" }), // 请求体数据
  mode: "cors", // no-cors, cors, same-origin
  cache: "no-cache", // default, no-cache, reload, force-cache, only-if-cached
  credentials: "same-origin", // include, same-origin, omit
  redirect: "follow", // manual, follow, error
  referrerPolicy: "no-referrer-when-downgrade",
  signal: undefined, // 用于取消请求的 AbortSignal
};

// 带有超时和取消功能的请求
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(`请求超时 (${timeout}ms)`);
    }
    throw error;
  }
}
```

### 处理不同类型的响应

```javascript
// 处理不同响应类型
async function handleResponse(response) {
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else if (contentType && contentType.includes("text/html")) {
    return await response.text();
  } else if (contentType && contentType.includes("image/")) {
    return await response.blob();
  } else {
    return await response.text();
  }
}

// 批量请求示例
async function fetchMultiple(urls) {
  const requests = urls.map((url) =>
    fetch(url)
      .then((response) => response.json())
      .catch((error) => ({ error: true, url, message: error.message }))
  );

  return await Promise.allSettled(requests);
}

// 上传文件
async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("description", "文件描述");

  try {
    const response = await fetch("https://api.example.com/upload", {
      method: "POST",
      body: formData,
      // 注意: 使用 FormData 时不要设置 Content-Type 头
      // 浏览器会自动设置正确的 Content-Type 和边界
    });

    return await response.json();
  } catch (error) {
    console.error("上传失败:", error);
    throw error;
  }
}
```

### 实际应用示例

```javascript
// 完整的 API 客户端示例
class ApiClient {
  constructor(baseURL, defaultOptions = {}) {
    this.baseURL = baseURL;
    this.defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...defaultOptions,
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...this.defaultOptions,
      ...options,
      headers: {
        ...this.defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await this.parseResponse(response);
        throw new Error(
          errorData.message ||
            `请求失败: ${response.status} ${response.statusText}`
        );
      }

      return await this.parseResponse(response);
    } catch (error) {
      console.error(`API请求失败 ${url}:`, error);
      throw error;
    }
  }

  async parseResponse(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  }

  // 便捷方法
  get(endpoint, options = {}) {
    return this.request(endpoint, { method: "GET", ...options });
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { method: "DELETE", ...options });
  }
}

// 使用示例
const api = new ApiClient("https://api.example.com");

// 获取用户列表
api
  .get("/users")
  .then((users) => console.log("用户列表:", users))
  .catch((error) => console.error("获取失败:", error));

// 创建新用户
api
  .post("/users", { name: "王五", email: "wangwu@example.com" })
  .then((user) => console.log("创建的用户:", user));
```

## 最佳实践总结

1. **优先使用 async/await**：让异步代码更易读、易维护
2. **合理使用 Promise 静态方法**：`Promise.all()` 用于并行操作，`Promise.race()` 用于超时控制
3. **统一错误处理**：使用 try...catch 或 .catch() 统一处理错误
4. **避免阻塞**：长时间运行的任务使用 Web Workers
5. **请求超时控制**：为网络请求设置合理的超时时间
6. **取消请求**：使用 AbortController 取消不必要的请求
7. **性能优化**：批量请求使用并行执行，避免不必要的顺序等待

## 浏览器兼容性提示

- **Fetch API**：现代浏览器全面支持，IE 不支持
- **Promise**：现代浏览器全面支持，IE 11 部分支持
- **async/await**：现代浏览器全面支持，IE 不支持

对于旧浏览器支持，考虑使用：

1. Babel 转译 async/await
2. polyfill（如 whatwg-fetch, promise-polyfill）
3. 降级方案（如使用 XMLHttpRequest）

这个完整的指南涵盖了 JavaScript 异步编程的核心概念和实际应用，从基础的回调函数到现代的 async/await 和 Fetch API，提供了丰富的代码示例和最佳实践。
