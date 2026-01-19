# DOM 操作

## DOM 树结构理解

### 什么是 DOM？

DOM（Document Object Model，文档对象模型）是将 HTML 或 XML 文档表示为树状结构的编程接口。DOM 树由节点（Node）组成，每个节点代表文档的一部分。

### DOM 树结构

```html
<!-- HTML 结构示例 -->
<!DOCTYPE html>
<html>
  <head>
    <title>示例页面</title>
  </head>
  <body>
    <div id="container">
      <h1 class="title">标题</h1>
      <p>段落内容</p>
      <ul>
        <li>列表项1</li>
        <li>列表项2</li>
      </ul>
    </div>
  </body>
</html>
```

对应的 DOM 树结构：

```
document
├── html
│   ├── head
│   │   └── title
│   │       └── "示例页面"
│   └── body
│       └── div#container
│           ├── h1.title
│           │   └── "标题"
│           ├── p
│           │   └── "段落内容"
│           └── ul
│               ├── li
│               │   └── "列表项1"
│               └── li
│                   └── "列表项2"
```

### 节点类型

| 节点类型  | 描述             | 示例                              |
| --------- | ---------------- | --------------------------------- |
| Document  | 整个文档的根节点 | `document`                        |
| Element   | HTML 元素节点    | `<div>`, `<p>`, `<h1>`            |
| Text      | 元素内的文本内容 | "标题", "段落内容"                |
| Attribute | 元素的属性节点   | `id="container"`, `class="title"` |
| Comment   | 注释节点         | `<!-- 注释 -->`                   |

### 节点关系

```javascript
// 访问节点关系
const element = document.querySelector("p");

// 父节点
console.log(element.parentNode); // 父节点
console.log(element.parentElement); // 父元素

// 子节点
console.log(element.childNodes); // 所有子节点（包括文本节点）
console.log(element.children); // 所有子元素

// 兄弟节点
console.log(element.previousSibling); // 前一个兄弟节点
console.log(element.previousElementSibling); // 前一个兄弟元素
console.log(element.nextSibling); // 后一个兄弟节点
console.log(element.nextElementSibling); // 后一个兄弟元素
```

## 元素选择器

### getElementById

通过元素的 id 属性获取单个元素。

```javascript
// 获取 id 为 "container" 的元素
const container = document.getElementById("container");
console.log(container); // 返回单个元素或 null

// 特性：
// 1. 只返回第一个匹配的元素
// 2. 性能最优
// 3. 只能通过 document 对象调用
```

### getElementsByClassName

通过类名获取元素集合。

```javascript
// 获取所有 class 包含 "title" 的元素
const titles = document.getElementsByClassName("title");
console.log(titles); // 返回 HTMLCollection

// 特性：
// 1. 返回实时集合（live collection）
// 2. 可以同时指定多个类名
// 3. 可以在任何元素上调用

// 指定多个类名
const elements = document.getElementsByClassName("title active");
```

### getElementsByTagName

通过标签名获取元素集合。

```javascript
// 获取所有 <p> 元素
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs); // 返回 HTMLCollection

// 获取特定元素下的子元素
const container = document.getElementById("container");
const containerParagraphs = container.getElementsByTagName("p");
```

### querySelector

使用 CSS 选择器获取第一个匹配的元素。

```javascript
// 获取第一个匹配的元素
const firstTitle = document.querySelector(".title");
const firstParagraph = document.querySelector("p");
const specificElement = document.querySelector("#container .title");

console.log(firstTitle); // 返回单个元素或 null

// 在特定元素内查询
const container = document.getElementById("container");
const titleInContainer = container.querySelector(".title");
```

### querySelectorAll

使用 CSS 选择器获取所有匹配的元素集合。

```javascript
// 获取所有匹配的元素
const allTitles = document.querySelectorAll(".title");
const allParagraphs = document.querySelectorAll("p");
const complexSelection = document.querySelectorAll(
  "#container li, #container p"
);

console.log(allTitles); // 返回 NodeList

// 特性：
// 1. 返回静态集合（static collection）
// 2. 支持复杂的 CSS 选择器
// 3. 可以在任何元素上调用

// NodeList 的遍历
allTitles.forEach((title, index) => {
  console.log(`标题 ${index}:`, title);
});

// 将 NodeList 转换为数组
const titlesArray = Array.from(allTitles);
```

### 选择器对比

| 方法                   | 返回值         | 实时性 | 性能 | 选择器复杂度 |
| ---------------------- | -------------- | ------ | ---- | ------------ |
| getElementById         | Element        | N/A    | 最优 | 简单         |
| getElementsByClassName | HTMLCollection | 实时   | 优秀 | 简单         |
| getElementsByTagName   | HTMLCollection | 实时   | 优秀 | 简单         |
| querySelector          | Element        | N/A    | 良好 | 复杂         |
| querySelectorAll       | NodeList       | 静态   | 良好 | 复杂         |

### 选择器使用建议

```javascript
// 性能优先的选择
const byId = document.getElementById("myId"); // 最快
const byClass = document.getElementsByClassName("myClass")[0]; // 次快

// 复杂选择时使用
const complex = document.querySelector(".parent > .child.active"); // 灵活

// 获取多个元素时
const allWithQuery = document.querySelectorAll(".item"); // 推荐
const allWithClass = document.getElementsByClassName("item"); // 实时更新时使用
```

## 元素操作

### 创建元素

```javascript
// 创建新元素
const newDiv = document.createElement("div");
const newParagraph = document.createElement("p");
const newButton = document.createElement("button");

// 创建文本节点
const textNode = document.createTextNode("这是一段文本");

// 创建文档片段（优化性能）
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = `项目 ${i}`;
  fragment.appendChild(li);
}
```

### 添加元素

```javascript
// 获取父元素
const container = document.getElementById("container");

// 1. appendChild - 添加到子元素列表末尾
const newElement = document.createElement("p");
newElement.textContent = "新段落";
container.appendChild(newElement);

// 2. insertBefore - 在指定元素前插入
const referenceElement = container.querySelector(".title");
const newElement2 = document.createElement("h2");
newElement2.textContent = "副标题";
container.insertBefore(newElement2, referenceElement);

// 3. insertAdjacentElement - 更灵活的插入
// 位置参数：'beforebegin', 'afterbegin', 'beforeend', 'afterend'
const targetElement = document.querySelector(".target");
const newElement3 = document.createElement("span");
newElement3.textContent = "新内容";
targetElement.insertAdjacentElement("beforebegin", newElement3);
targetElement.insertAdjacentElement("afterbegin", newElement3);
targetElement.insertAdjacentElement("beforeend", newElement3);
targetElement.insertAdjacentElement("afterend", newElement3);

// 4. 使用 innerHTML（注意安全风险）
container.innerHTML += "<p>新内容</p>"; // 不推荐，会重新解析所有子元素
```

### 删除元素

```javascript
// 1. removeChild - 移除子元素
const container = document.getElementById("container");
const elementToRemove = container.querySelector(".to-remove");
if (elementToRemove) {
  container.removeChild(elementToRemove);
}

// 2. remove - 直接移除元素自身
const element = document.querySelector(".to-remove");
if (element) {
  element.remove();
}

// 3. 清空所有子元素
while (container.firstChild) {
  container.removeChild(container.firstChild);
}

// 或使用
container.innerHTML = "";
```

### 修改属性

```javascript
const element = document.querySelector("#myElement");

// 1. 标准属性
element.id = "newId";
element.className = "class1 class2"; // 替换所有类
element.classList.add("new-class"); // 添加类
element.classList.remove("old-class"); // 移除类
element.classList.toggle("active"); // 切换类
element.classList.contains("active"); // 检查类

// 2. 自定义属性
element.setAttribute("data-custom", "value"); // 设置属性
const value = element.getAttribute("data-custom"); // 获取属性
element.hasAttribute("data-custom"); // 检查属性
element.removeAttribute("data-custom"); // 移除属性

// 3. data-* 属性
element.dataset.userId = "123"; // 设置 data-user-id
console.log(element.dataset.userId); // 获取 data-user-id

// 4. 布尔属性
element.disabled = true; // 添加 disabled 属性
element.checked = false; // 移除 checked 属性
```

### 修改样式

```javascript
const element = document.querySelector("#myElement");

// 1. 直接修改 style 属性（内联样式）
element.style.color = "red";
element.style.backgroundColor = "#f0f0f0";
element.style.fontSize = "16px";
element.style.marginTop = "10px";

// 2. 批量修改样式
Object.assign(element.style, {
  color: "blue",
  fontSize: "18px",
  padding: "10px",
});

// 3. 获取计算样式
const computedStyle = window.getComputedStyle(element);
console.log(computedStyle.color);

// 4. 修改 class 来应用样式
element.classList.add("active", "highlight");
element.classList.remove("inactive");
element.className = "new-class"; // 替换所有类

// 5. 样式操作实用函数
function setStyles(element, styles) {
  Object.entries(styles).forEach(([property, value]) => {
    element.style[property] = value;
  });
}

setStyles(element, {
  color: "green",
  display: "flex",
  alignItems: "center",
});
```

### 修改内容

```javascript
const element = document.querySelector("#content");

// 1. textContent - 获取或设置纯文本内容
element.textContent = "新的文本内容";
console.log(element.textContent);

// 2. innerText - 获取或设置可见文本（考虑CSS样式）
element.innerText = "新的可见文本";
console.log(element.innerText);

// 3. innerHTML - 获取或设置HTML内容（注意XSS风险）
element.innerHTML = "<strong>加粗文本</strong>和<span>普通文本</span>";
console.log(element.innerHTML);

// 4. outerHTML - 获取或替换整个元素
console.log(element.outerHTML);
// element.outerHTML = '<div>新元素</div>'; // 替换整个元素

// 5. 插入HTML
element.insertAdjacentHTML("beforeend", "<p>追加的HTML</p>");

// 安全地插入HTML（防XSS）
function safeInsertHTML(element, position, html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  const fragment = template.content;

  switch (position) {
    case "beforebegin":
      element.parentNode.insertBefore(fragment, element);
      break;
    case "afterbegin":
      element.insertBefore(fragment, element.firstChild);
      break;
    case "beforeend":
      element.appendChild(fragment);
      break;
    case "afterend":
      if (element.nextSibling) {
        element.parentNode.insertBefore(fragment, element.nextSibling);
      } else {
        element.parentNode.appendChild(fragment);
      }
      break;
  }
}
```

## 事件处理

### 事件监听（addEventListener）

```javascript
const button = document.querySelector("#myButton");

// 基本用法
button.addEventListener("click", function (event) {
  console.log("按钮被点击了！");
  console.log("事件类型:", event.type);
  console.log("目标元素:", event.target);
});

// 使用箭头函数
button.addEventListener("click", (event) => {
  console.log("this指向:", this); // 注意箭头函数的this
});

// 带选项的监听器
button.addEventListener("click", handleClick, {
  capture: false, // 是否在捕获阶段触发
  once: true, // 是否只触发一次
  passive: false, // 是否被动监听（提升滚动性能）
  signal: abortSignal, // 用于取消监听
});

// 命名函数便于移除
function handleClick(event) {
  console.log("处理点击事件");
}

// 移除事件监听
button.removeEventListener("click", handleClick);
```

### 事件对象

```javascript
element.addEventListener("click", function (event) {
  // 事件基本信息
  console.log("事件类型:", event.type);
  console.log("目标元素:", event.target);
  console.log("当前目标:", event.currentTarget);
  console.log("事件阶段:", event.eventPhase); // 1:捕获, 2:目标, 3:冒泡

  // 鼠标事件特有属性
  console.log("鼠标位置 - X:", event.clientX, "Y:", event.clientY);
  console.log("页面位置 - X:", event.pageX, "Y:", event.pageY);
  console.log("屏幕位置 - X:", event.screenX, "Y:", event.screenY);
  console.log("按钮:", event.button); // 0:左键, 1:中键, 2:右键
  console.log("按键:", event.buttons); // 按下的所有按钮

  // 键盘事件特有属性
  console.log("按键:", event.key);
  console.log("键码:", event.keyCode); // 已弃用
  console.log("代码:", event.code);
  console.log("是否按着Ctrl:", event.ctrlKey);
  console.log("是否按着Shift:", event.shiftKey);
  console.log("是否按着Alt:", event.altKey);
  console.log("是否按着Meta:", event.metaKey);

  // 表单事件特有属性
  console.log("输入的值:", event.target.value);

  // 事件控制方法
  event.preventDefault(); // 阻止默认行为
  event.stopPropagation(); // 阻止事件传播
  event.stopImmediatePropagation(); // 阻止其他监听器执行
});
```

### 事件冒泡与捕获

```html
<div id="grandparent" style="padding: 50px; background: lightblue;">
  <div id="parent" style="padding: 30px; background: lightgreen;">
    <button id="child" style="padding: 10px;">点击我</button>
  </div>
</div>

<script>
  const grandparent = document.getElementById("grandparent");
  const parent = document.getElementById("parent");
  const child = document.getElementById("child");

  // 事件捕获阶段（从上到下）
  grandparent.addEventListener(
    "click",
    function () {
      console.log("捕获 - 爷爷元素");
    },
    true
  );

  parent.addEventListener(
    "click",
    function () {
      console.log("捕获 - 父元素");
    },
    true
  );

  child.addEventListener(
    "click",
    function () {
      console.log("捕获 - 子元素");
    },
    true
  );

  // 事件冒泡阶段（从下到上）
  grandparent.addEventListener(
    "click",
    function () {
      console.log("冒泡 - 爷爷元素");
    },
    false
  );

  parent.addEventListener(
    "click",
    function () {
      console.log("冒泡 - 父元素");
    },
    false
  );

  child.addEventListener(
    "click",
    function () {
      console.log("冒泡 - 子元素");
    },
    false
  );

  // 点击按钮后的输出顺序：
  // 1. 捕获 - 爷爷元素
  // 2. 捕获 - 父元素
  // 3. 捕获 - 子元素
  // 4. 冒泡 - 子元素
  // 5. 冒泡 - 父元素
  // 6. 冒泡 - 爷爷元素
</script>
```

### 事件委托

```javascript
// 传统方式（低效）
const listItems = document.querySelectorAll("li");
listItems.forEach((item) => {
  item.addEventListener("click", function () {
    console.log("点击了:", this.textContent);
  });
});

// 事件委托方式（高效）
const list = document.querySelector("ul");
list.addEventListener("click", function (event) {
  // 检查点击的是否是 li 元素
  if (event.target.tagName === "LI") {
    console.log("点击了:", event.target.textContent);
  }

  // 更精确的匹配
  if (event.target.matches("li.item")) {
    console.log("点击了特定项目:", event.target.dataset.id);
  }
});

// 动态添加元素也能正常工作
setTimeout(() => {
  const newItem = document.createElement("li");
  newItem.textContent = "新项目";
  list.appendChild(newItem);
  // 无需为新元素单独添加事件监听
}, 1000);
```

### 常见事件类型

#### 鼠标事件

```javascript
element.addEventListener("click", handleEvent); // 单击
element.addEventListener("dblclick", handleEvent); // 双击
element.addEventListener("mousedown", handleEvent); // 鼠标按下
element.addEventListener("mouseup", handleEvent); // 鼠标释放
element.addEventListener("mousemove", handleEvent); // 鼠标移动
element.addEventListener("mouseover", handleEvent); // 鼠标进入
element.addEventListener("mouseout", handleEvent); // 鼠标离开
element.addEventListener("mouseenter", handleEvent); // 鼠标进入（不冒泡）
element.addEventListener("mouseleave", handleEvent); // 鼠标离开（不冒泡）
element.addEventListener("contextmenu", handleEvent); // 右键菜单
```

#### 键盘事件

```javascript
element.addEventListener("keydown", function (event) {
  // 按键按下
  console.log("按键按下:", event.key);
  console.log("组合键:", {
    ctrl: event.ctrlKey,
    shift: event.shiftKey,
    alt: event.altKey,
  });

  // 特定按键处理
  if (event.key === "Enter") {
    console.log("按下了回车键");
    event.preventDefault(); // 阻止表单提交等默认行为
  }

  if (event.key === "Escape") {
    console.log("按下了ESC键");
  }

  // Ctrl + S 保存
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault();
    console.log("保存操作");
  }
});

element.addEventListener("keyup", function (event) {
  // 按键释放
  console.log("按键释放:", event.key);
});

element.addEventListener("keypress", function (event) {
  // 字符键按下（已弃用，建议使用 keydown）
  console.log("字符键:", event.key);
});
```

#### 表单事件

```javascript
const form = document.querySelector("form");
const input = document.querySelector("input");

// 输入事件
input.addEventListener("input", function (event) {
  console.log("输入值:", event.target.value);
});

input.addEventListener("change", function (event) {
  console.log("值已改变:", event.target.value);
});

// 焦点事件
input.addEventListener("focus", function () {
  console.log("获得焦点");
});

input.addEventListener("blur", function () {
  console.log("失去焦点");
});

// 表单提交
form.addEventListener("submit", function (event) {
  console.log("表单提交");

  // 表单验证
  const isValid = validateForm();
  if (!isValid) {
    event.preventDefault(); // 阻止表单提交
    console.log("表单验证失败");
  }
});

// 重置表单
form.addEventListener("reset", function () {
  console.log("表单已重置");
});
```

#### 窗口事件

```javascript
// 窗口大小变化
window.addEventListener("resize", function () {
  console.log("窗口大小:", window.innerWidth, "x", window.innerHeight);
});

// 页面滚动
window.addEventListener("scroll", function () {
  console.log("滚动位置:", window.scrollY);

  // 防抖处理
  clearTimeout(window.scrollTimeout);
  window.scrollTimeout = setTimeout(() => {
    console.log("滚动停止");
  }, 100);
});

// 页面加载完成
window.addEventListener("load", function () {
  console.log("所有资源加载完成");
});

// DOM 内容加载完成
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM 加载完成，可以操作元素");
});
```

#### 触摸事件（移动端）

```javascript
element.addEventListener("touchstart", function (event) {
  const touch = event.touches[0];
  console.log("触摸开始:", touch.clientX, touch.clientY);
});

element.addEventListener("touchmove", function (event) {
  event.preventDefault(); // 防止滚动
  const touch = event.touches[0];
  console.log("触摸移动:", touch.clientX, touch.clientY);
});

element.addEventListener("touchend", function (event) {
  console.log("触摸结束");
});

element.addEventListener("touchcancel", function (event) {
  console.log("触摸取消");
});
```

### 自定义事件

```javascript
// 创建自定义事件
const customEvent = new CustomEvent("myCustomEvent", {
  detail: {
    message: "自定义事件数据",
    timestamp: new Date(),
  },
  bubbles: true,
  cancelable: true,
});

// 触发自定义事件
element.addEventListener("myCustomEvent", function (event) {
  console.log("自定义事件触发:", event.detail);
});

element.dispatchEvent(customEvent);

// 继承自 Event 的特定事件类型
const progressEvent = new ProgressEvent("progress", {
  lengthComputable: true,
  loaded: 50,
  total: 100,
});
```

### 事件处理最佳实践

```javascript
// 1. 使用事件委托处理动态内容
document.addEventListener("click", function (event) {
  if (event.target.matches(".dynamic-item")) {
    handleDynamicItemClick(event);
  }
});

// 2. 防抖和节流
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

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

// 使用防抖
window.addEventListener(
  "resize",
  debounce(function () {
    console.log("调整大小");
  }, 250)
);

// 使用节流
document.addEventListener(
  "scroll",
  throttle(function () {
    console.log("滚动");
  }, 100)
);

// 3. 一次性事件
button.addEventListener("click", function handleClick() {
  console.log("只执行一次");
  button.removeEventListener("click", handleClick);
});

// 或使用 once 选项
button.addEventListener(
  "click",
  function () {
    console.log("只执行一次");
  },
  { once: true }
);

// 4. 使用 AbortController 管理事件监听
const controller = new AbortController();

button.addEventListener(
  "click",
  function () {
    console.log("点击事件");
  },
  { signal: controller.signal }
);

// 取消所有通过该 signal 注册的事件监听
controller.abort();
```

### 跨浏览器兼容性处理

```javascript
// 事件监听兼容性处理
function addEvent(element, event, handler, options) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, options);
  } else if (element.attachEvent) {
    element.attachEvent("on" + event, handler);
  } else {
    element["on" + event] = handler;
  }
}

// 事件对象兼容性处理
function getEvent(event) {
  return event || window.event;
}

// 目标元素兼容性处理
function getTarget(event) {
  const evt = getEvent(event);
  return evt.target || evt.srcElement;
}

// 阻止默认行为兼容性处理
function preventDefault(event) {
  const evt = getEvent(event);
  if (evt.preventDefault) {
    evt.preventDefault();
  } else {
    evt.returnValue = false;
  }
}

// 阻止事件传播兼容性处理
function stopPropagation(event) {
  const evt = getEvent(event);
  if (evt.stopPropagation) {
    evt.stopPropagation();
  } else {
    evt.cancelBubble = true;
  }
}
```

## 总结

本文档详细介绍了 JavaScript DOM 操作的核心概念和技术，包括：

1. **DOM 树结构理解** - 理解文档的节点层次结构
2. **元素选择器** - 各种获取 DOM 元素的方法及其特点
3. **元素操作** - 创建、修改、删除元素的完整操作指南
4. **事件处理** - 事件监听、事件对象、事件传播机制和常见事件类型

掌握这些知识是进行前端开发的基础，能够帮助开发者高效地操作网页内容，实现丰富的交互功能。在实际开发中，建议根据具体需求选择合适的方法，并注意代码的性能和可维护性。
