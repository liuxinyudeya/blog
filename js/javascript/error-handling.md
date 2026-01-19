# JavaScript 错误处理

## try...catch...finally 语句

`try...catch...finally` 是 JavaScript 中处理异常的主要机制，它允许您"尝试"执行代码并"捕获"可能发生的错误。

### 基本语法

```javascript
try {
  // 尝试执行的代码
  // 可能会抛出错误的代码
} catch (error) {
  // 当 try 块中的代码抛出错误时执行
  // error 参数包含抛出的错误信息
} finally {
  // 无论是否发生错误都会执行的代码
  // 常用于清理工作
}
```

### 详细说明

#### try 块

- 包含可能抛出错误的代码
- 一旦发生错误，控制权立即转移到 catch 块
- 如果没有错误，catch 块将被跳过

```javascript
try {
  const result = riskyOperation();
  console.log("操作成功:", result);
} catch (error) {
  console.log("操作失败:", error.message);
}
```

#### catch 块

- 接收一个包含错误信息的参数
- 可以处理错误或重新抛出错误
- 参数名称可以是任何有效的标识符

```javascript
try {
  // 可能出错的代码
} catch (err) {
  // 处理错误
  console.error("发生错误:", err);

  // 重新抛出错误
  // throw err;
}
```

#### finally 块

- 无论是否发生错误都会执行
- 即使 try 或 catch 块中有 return 语句，finally 也会执行
- 常用于资源清理（如关闭文件、数据库连接等）

```javascript
function processFile(filename) {
  let fileHandle = null;

  try {
    fileHandle = openFile(filename);
    // 处理文件
  } catch (error) {
    console.error("处理文件时出错:", error);
  } finally {
    // 确保文件总是被关闭
    if (fileHandle) {
      closeFile(fileHandle);
    }
  }
}
```

### 嵌套 try-catch

```javascript
try {
  try {
    throw new Error("内部错误");
  } catch (innerError) {
    console.log("内部错误已捕获:", innerError.message);
    throw new Error("外部错误");
  }
} catch (outerError) {
  console.log("外部错误已捕获:", outerError.message);
}
```

### 条件 catch 块（现代 JavaScript）

```javascript
try {
  // 一些可能出错的代码
} catch (error) {
  if (error instanceof TypeError) {
    // 处理类型错误
    console.log("类型错误:", error.message);
  } else if (error instanceof RangeError) {
    // 处理范围错误
    console.log("范围错误:", error.message);
  } else {
    // 处理其他错误
    console.log("未知错误:", error.message);
    throw error; // 重新抛出
  }
}
```

## Error 对象

Error 对象是 JavaScript 中所有错误的基础对象，它包含错误的详细信息。

### 创建 Error 对象

```javascript
// 创建基本错误
const error = new Error("发生了一个错误");
console.log(error.message); // "发生了一个错误"
console.log(error.name); // "Error"
console.log(error.stack); // 堆栈跟踪信息
```

### Error 对象的属性

| 属性           | 描述                           | 示例                                      |
| -------------- | ------------------------------ | ----------------------------------------- |
| `name`         | 错误名称                       | `"Error"`, `"TypeError"`, `"SyntaxError"` |
| `message`      | 错误描述信息                   | `"Unexpected token"`                      |
| `stack`        | 堆栈跟踪（非标准，但广泛支持） | 包含函数调用链的字符串                    |
| `fileName`     | 发生错误的文件名（非标准）     | `"script.js"`                             |
| `lineNumber`   | 发生错误的行号（非标准）       | `25`                                      |
| `columnNumber` | 发生错误的列号（非标准）       | `10`                                      |

### Error 对象的方法

```javascript
const error = new Error("测试错误");

// toString() - 返回错误的字符串表示
console.log(error.toString()); // "Error: 测试错误"

// toSource() - 返回源代码表示（非标准）
// console.log(error.toSource());
```

### 自定义 Error 对象属性

```javascript
function createCustomError(message, code) {
  const error = new Error(message);
  error.code = code;
  error.timestamp = new Date().toISOString();
  return error;
}

try {
  throw createCustomError("数据库连接失败", "DB_CONN_001");
} catch (error) {
  console.log("错误代码:", error.code); // "DB_CONN_001"
  console.log("时间戳:", error.timestamp);
}
```

## 常见错误类型

JavaScript 提供了多种内置错误类型，每种类型都有特定的用途。

### 1. Error

基础错误类型，所有其他错误类型都继承自它。

```javascript
throw new Error("一般性错误");
```

### 2. SyntaxError

语法错误，通常在代码解析阶段抛出。

```javascript
// 触发 SyntaxError 的示例
// eval('const x = ;'); // 语法错误
// JSON.parse('{invalid json}'); // JSON 语法错误

try {
  eval("const x = ;"); // 缺少表达式
} catch (error) {
  console.log(error.name); // "SyntaxError"
}
```

### 3. TypeError

类型错误，当值不是预期类型时抛出。

```javascript
// 常见 TypeError 场景
const obj = null;
try {
  obj.someMethod(); // 尝试在 null 上调用方法
} catch (error) {
  console.log(error.name); // "TypeError"
}

// 其他示例
try {
  const num = 123;
  num.toUpperCase(); // 数字没有 toUpperCase 方法
} catch (error) {
  console.log(error.message); // "num.toUpperCase is not a function"
}
```

### 4. ReferenceError

引用错误，当引用未定义的变量时抛出。

```javascript
try {
  console.log(undefinedVariable); // 引用未定义的变量
} catch (error) {
  console.log(error.name); // "ReferenceError"
}

// 严格模式下的 ReferenceError
("use strict");
try {
  undeclaredVar = 10; // 严格模式下不允许隐式创建全局变量
} catch (error) {
  console.log(error.name); // "ReferenceError"
}
```

### 5. RangeError

范围错误，当值超出有效范围时抛出。

```javascript
// 数组长度无效
try {
  const arr = new Array(-1); // 负的数组长度
} catch (error) {
  console.log(error.name); // "RangeError"
}

// 数字方法参数超出范围
try {
  const num = 123.456;
  num.toFixed(-1); // 参数必须在 0-100 之间
} catch (error) {
  console.log(error.name); // "RangeError"
}
```

### 6. URIError

URI 错误，当全局 URI 处理函数使用不当时抛出。

```javascript
try {
  decodeURIComponent("%"); // 无效的 URI 组件
} catch (error) {
  console.log(error.name); // "URIError"
}

try {
  encodeURI("\uD800"); // 代理对不完整
} catch (error) {
  console.log(error.name); // "URIError"
}
```

### 7. EvalError

eval 错误，当 `eval()` 函数使用不当时抛出（现代 JavaScript 中很少见）。

```javascript
// 在现代 JavaScript 引擎中，EvalError 很少被抛出
// 主要为了保持与旧规范的兼容性
```

### 8. AggregateError（ES2021）

聚合错误，表示多个错误的集合。

```javascript
const error1 = new Error("第一个错误");
const error2 = new Error("第二个错误");

try {
  throw new AggregateError([error1, error2], "发生了多个错误");
} catch (error) {
  console.log(error.name); // "AggregateError"
  console.log(error.message); // "发生了多个错误"
  console.log(error.errors); // [Error, Error]
}
```

### 9. InternalError（非标准）

内部错误，JavaScript 引擎内部错误（如递归太深）。

```javascript
// 无限递归可能导致 InternalError（取决于引擎）
function infiniteRecursion() {
  infiniteRecursion();
}

try {
  infiniteRecursion();
} catch (error) {
  console.log(error.name); // 可能是 "InternalError" 或 "RangeError"
}
```

## 自定义错误

创建自定义错误类型可以提供更具体的错误信息。

### 方法 1：继承 Error 类（ES6+）

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.timestamp = new Date();
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      field: this.field,
      timestamp: this.timestamp,
      stack: this.stack,
    };
  }
}

// 使用自定义错误
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("用户名不能为空", "name");
  }
  if (!user.email.includes("@")) {
    throw new ValidationError("邮箱格式不正确", "email");
  }
}

try {
  validateUser({ name: "", email: "invalid-email" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`字段 ${error.field} 验证失败: ${error.message}`);
    console.log(JSON.stringify(error.toJSON(), null, 2));
  }
}
```

### 方法 2：传统原型继承

```javascript
function DatabaseError(message, query, code) {
  Error.call(this, message);
  this.name = "DatabaseError";
  this.query = query;
  this.code = code;
  this.timestamp = new Date();

  // 保持堆栈跟踪（V8 引擎）
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, DatabaseError);
  }
}

// 继承 Error 的原型
DatabaseError.prototype = Object.create(Error.prototype);
DatabaseError.prototype.constructor = DatabaseError;

// 使用方法
try {
  throw new DatabaseError("连接超时", "SELECT * FROM users", "CONN_TIMEOUT");
} catch (error) {
  if (error instanceof DatabaseError) {
    console.log(`数据库错误 [${error.code}]: ${error.message}`);
    console.log(`查询: ${error.query}`);
  }
}
```

### 方法 3：错误工厂函数

```javascript
function createAppError(type, message, details = {}) {
  const error = new Error(message);
  error.name = type;
  error.details = details;
  error.isOperational = true; // 标记为操作错误（非程序错误）

  return error;
}

// 预定义的错误类型
const ErrorTypes = {
  NOT_FOUND: "NotFoundError",
  VALIDATION: "ValidationError",
  AUTH: "AuthenticationError",
  PERMISSION: "PermissionError",
};

// 使用
try {
  throw createAppError(ErrorTypes.NOT_FOUND, "用户不存在", {
    userId: 123,
    resource: "User",
  });
} catch (error) {
  console.log(`${error.name}: ${error.message}`);
  console.log("详情:", error.details);
}
```

## 错误处理最佳实践

### 1. 不要静默忽略错误

```javascript
// 不好的做法 ❌
try {
  doSomethingRisky();
} catch (error) {
  // 完全忽略错误
}

// 好的做法 ✅
try {
  doSomethingRisky();
} catch (error) {
  console.error("操作失败:", error);
  // 或者重新抛出
  // throw error;
}
```

### 2. 提供有意义的错误信息

```javascript
// 不好的做法 ❌
if (!user.email) {
  throw new Error("字段无效");
}

// 好的做法 ✅
if (!user.email) {
  throw new Error("用户邮箱不能为空，请提供有效的邮箱地址");
}
```

### 3. 使用适当的错误类型

```javascript
// 不好的做法 ❌
if (index < 0 || index >= array.length) {
  throw new Error("索引无效");
}

// 好的做法 ✅
if (index < 0 || index >= array.length) {
  throw new RangeError(`索引 ${index} 超出范围 [0, ${array.length})`);
}
```

### 4. 避免在 try 块中使用过多代码

```javascript
// 不好的做法 ❌
try {
  const data = fetchData();
  const processed = processData(data);
  const result = saveData(processed);
  return result;
} catch (error) {
  console.error("操作失败");
}

// 好的做法 ✅
function processAndSave() {
  const data = fetchData();
  const processed = processData(data);
  return saveData(processed);
}

try {
  const result = processAndSave();
  return result;
} catch (error) {
  console.error("处理或保存数据失败:", error);
}
```

### 5. 使用 finally 进行资源清理

```javascript
let connection = null;

try {
  connection = openDatabaseConnection();
  const result = connection.query("SELECT * FROM users");
  return result;
} catch (error) {
  console.error("查询失败:", error);
  throw error;
} finally {
  if (connection) {
    connection.close(); // 确保总是关闭连接
  }
}
```

### 6. 区分操作错误和程序错误

```javascript
// 操作错误 - 预期可能发生的错误
function readUserConfig(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    // 文件不存在或格式错误是操作错误
    throw new Error(`无法读取配置文件 ${filePath}: ${error.message}`);
  }
}

// 程序错误 - 不应该发生的错误
function calculateAverage(numbers) {
  if (!Array.isArray(numbers)) {
    // 这是程序错误，应该立即失败
    throw new TypeError("numbers 必须是数组");
  }

  if (numbers.length === 0) {
    // 这是操作错误，可以优雅处理
    throw new Error("数组不能为空");
  }

  return numbers.reduce((a, b) => a + b) / numbers.length;
}
```

## 异步错误处理

### Promise 错误处理

```javascript
// 使用 .catch()
fetchData()
  .then((data) => processData(data))
  .catch((error) => {
    console.error("异步操作失败:", error);
    // 可以返回一个默认值或重新抛出
    return defaultValue;
  });

// 使用 async/await 的 try-catch
async function fetchAndProcess() {
  try {
    const data = await fetchData();
    const result = await processData(data);
    return result;
  } catch (error) {
    console.error("获取或处理数据失败:", error);
    throw error; // 重新抛出
  }
}

// Promise.all 的错误处理
async function fetchMultiple() {
  try {
    const results = await Promise.all([
      fetchData1(),
      fetchData2(),
      fetchData3(),
    ]);
    return results;
  } catch (error) {
    console.error("至少一个请求失败:", error);
    // 处理部分成功的情况
  }
}

// Promise.allSettled（ES2020）- 所有 Promise 完成后返回结果
async function fetchAllWithStatus() {
  const results = await Promise.allSettled([
    fetchData1(),
    fetchData2(),
    fetchData3(),
  ]);

  const successful = results.filter((r) => r.status === "fulfilled");
  const failed = results.filter((r) => r.status === "rejected");

  return { successful, failed };
}
```

### 回调函数的错误处理

```javascript
function readFileCallback(filename, callback) {
  // 模拟异步操作
  setTimeout(() => {
    if (!filename) {
      // 错误优先回调模式
      callback(new Error("文件名不能为空"), null);
    } else {
      callback(null, `文件 ${filename} 的内容`);
    }
  }, 100);
}

// 使用错误优先回调
readFileCallback("data.txt", (error, data) => {
  if (error) {
    console.error("读取文件失败:", error);
    return;
  }
  console.log("文件内容:", data);
});
```

## 全局错误处理

### window.onerror（浏览器）

```javascript
// 全局错误处理
window.onerror = function (message, source, lineno, colno, error) {
  console.error("全局错误捕获:");
  console.error("消息:", message);
  console.error("源文件:", source);
  console.error("行号:", lineno);
  console.error("列号:", colno);
  console.error("错误对象:", error);

  // 发送错误到服务器
  sendErrorToServer({
    message,
    source,
    lineno,
    colno,
    error,
  });

  // 返回 true 阻止默认错误处理
  return true;
};

// 未处理的 Promise 拒绝
window.addEventListener("unhandledrejection", function (event) {
  console.error("未处理的 Promise 拒绝:", event.reason);
  event.preventDefault(); // 阻止默认控制台错误
});
```

### process.on('uncaughtException')（Node.js）

```javascript
// 捕获未捕获的异常
process.on("uncaughtException", (error) => {
  console.error("未捕获的异常:", error);
  // 记录错误并优雅关闭
  logError(error);

  // 在记录错误后，最好退出进程
  // 因为未捕获的异常可能使应用处于不稳定状态
  setTimeout(() => process.exit(1), 1000);
});

// 捕获未处理的 Promise 拒绝
process.on("unhandledRejection", (reason, promise) => {
  console.error("未处理的 Promise 拒绝:", reason);
  // 记录并可能退出进程
});
```

### 错误边界（React）

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // 记录错误到错误报告服务
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>出了点问题</h2>
          <details>
            <summary>错误详情</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

// 使用
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>;
```

## 总结

JavaScript 的错误处理机制提供了强大的工具来构建健壮的应用程序。通过合理使用 `try...catch...finally`、各种错误类型、自定义错误以及全局错误处理，可以创建能够优雅处理异常情况的应用程序。

关键要点：

1. 使用 `try...catch` 保护可能出错的代码
2. 利用 `finally` 进行必要的资源清理
3. 选择合适的错误类型来准确描述问题
4. 创建自定义错误以提供更丰富的错误信息
5. 遵循错误处理最佳实践
6. 正确处理异步错误
7. 实现全局错误处理以捕获未处理的异常
