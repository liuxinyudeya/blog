# Vue2.7.16

## 概述

[vue.js](https://cn.vuejs.org/guide/introduction.html)官网中这样介绍自己：

> Vue (发音为 /vjuː/，类似 view) 是一款用于构建用户界面的 JavaScript 框架。
>
> 它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，
>
> 帮助你高效地开发用户界面。无论是简单还是复杂的界面，Vue 都可以胜任。

通过这段介绍，我们对 Vuejs 有一个大概的印象。
::: tip 我们知道：
vue.js 是一款**前端框架**，帮我们开发**用户界面**。
:::
如果你使用过 Vuejs, 你或许还知道 Vuejs 的一些特性，比如：
::: tip

- 再数据发生变化时，vuejs 自动刷新视图
- v-if 、 v-show 、v-for、v-bind 等指令

:::

::: warning 但或许我们还不清楚:

- 什么是 基于 JavaScript 的框架？
- 什么是 基于标准 HTML、CSS 和 JavaScript 构建？
- 什么是 声明式、组件化的标称模型？
- 为什么 Vue 可以高效地开发用户界面，无论是简单还是复杂的界面？

:::

接下来让我们弄清楚其中**模糊**的概念，来印证、加深我们对 Vue 的理解。

## 创建一个 demo

预期：页面显示当前 count， 并创建一个按钮，点击按钮后 count +1

### 引入 Vue.js

Step1. 通过 CDN 的方式引用 Vue.js 到你的 HTML 中

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

### 创建 Vue 实例

Step2. 编写 html 结构、Script 中创建 Vue 实例,并配置构造函数的参数 `options`。

```html
<div id="app">
  <p>{{ countStr }}</p>
  <button @click="count++">点击 +1</button>
</div>

<script>
  const app = new Vue({
    el: "#app",
    data() {
      return {
        count: 0,
      };
    },
    computed: {
      countStr() {
        return `当前计数: ${this.count}`;
      },
    },
    watch: {
      count(newVal, oldVal) {
        console.log(`当前计数: ${newVal}`);
      },
    },
  });
</script>
```

### 启动流程

Step2. 跟踪 Vue 启动流程，找到 Vue 的初始化代码。<br>

引入`vue.js`后，进入源码中我们可以看到 主体代码 被一个 立即执行函数 包裹。<br>在加载完成后会依次调用执行以下函数:

```js [vue.js]:line-numbers {4}
(function (global, factory) {})(this, function () {
  // ... 忽略其他代码
  // 将 _init挂载到 Vue 实例上
  initMixin(Vue);
  // 将 $data、$props、$watch、$set、$del挂载到 Vue 实例上
  stateMixin(Vue);
  // 将 $on、$once、$off、$emit 事件挂载到 Vue 实例上
  eventsMixin(Vue);
  // 将 _update、$forceUpdate、$destroy 事件挂载到 Vue 实例上
  lifecycleMixin(Vue);
  // 执行installRenderHelpers(),将 $nextTick、_render挂载到 Vue 实例上
  renderMixin(Vue);
  // 初始化 Vue 的全局静态API和配置
  initGlobalAPI();
});
```

其中`initMixin`函数将 `_init` 挂载到 Vue 的原型上。

```js [initMixin()]
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // ...
  };
}
```

在实例化 Vue 时，构造函数调用`_init()`方法。

::: code-group

```html
<div id="app">
  <p>{{ countStr }}</p>
  <button @click="count++">点击 +1</button>
</div>

<script>
  // [!code focus]
  const app = new Vue({
    // [!code focus]
    el: "#app",
    // [!code focus]
    data() {
      // [!code focus]
      return {
        // [!code focus]
        count: 0,
        // [!code focus]
      };
      // [!code focus]
    },
    // [!code focus]
    computed: {
      // [!code focus]
      countStr() {
        // [!code focus]
        return `当前计数: ${this.count}`;
        // [!code focus]
      },
      // [!code focus]
    },
    // [!code focus]
    watch: {
      // [!code focus]
      count(newVal, oldVal) {
        // [!code focus]
        console.log(`当前计数: ${newVal}`); // [!code focus]
      }, // [!code focus]
    }, // [!code focus]
  }); // [!code focus]
</script>
```

```js [vue.js]
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn$2("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```
