---
---

<script setup>
    import VueFeatures from '@components/vue-features/VueFeatures.vue'
</script>

# 视图渲染

VueJs 有 `完整` 和 `运行时` 两个版本。

完整版本包含**编译器**，可在运行时编译模板，运行时版 不包含编译器，需要**预编译**。

从简单到复杂，按需使用、逐步集成，根据你的需求引入不同版本。这也是[渐进式框架](/vue/vue2/progressive.md)的体现。

## 测试用例

本章案例使用 CDN 引入完整版 JS，对模板进行运行时编译。

子组件通过`Vue.component`的方式进行全局注册。

<VueFeatures />

案例涉及的 Vue 特性有：

1. vue 内置指令
   - `v-pre、v-once、v-bind、v-on、v-model、v-show、v-if、v-for`
2. 父子组件通信
3. 插槽与作用域

### 案例代码

:::code-group

```html [ index.html ]
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>

<div id="app">
  <div class="single-card">
    <!-- 1. v-pre 示例 -->
    <div class="card-header">
      <div>
        <p>Vue核心特性</p>
        <span v-pre>{{ count }}</span>
      </div>
      <svg width="200" height="60">
        <circle cx="150" cy="30" r="20" fill="white" opacity="0.3"></circle>
        <circle cx="150" cy="30" r="15" fill="white"></circle>
      </svg>
    </div>

    <div class="card-body">
      <product-card :tags="productTags" @send-message="sendMessage">
        <!-- 具名插槽 -->
        <template v-slot:footer="slotProps">
          {{ slotProps.tags ? `${slotProps.tags.length}个标签` : '无标签' }}
        </template>
      </product-card>
    </div>

    <div class="card-footer">
      <span>📌 count: {{ count }}</span>
      <span v-once>📌 v-once count: {{ count }}</span>
    </div>
  </div>
</div>
```

```js [javascript 逻辑]
// 商品卡片组件
Vue.component("product-card", {
  template: template, // 子组件template
  props: {
    tags: {
      type: Array,
      default: () => ["新品", "热销"],
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    countClass() {
      return this.count < 0
        ? "negative"
        : this.count === 0
        ? "positive-odd"
        : "positive-even";
    },
  },
  watch: {
    count(newVal, oldVal) {
      console.log("count变化了，从${oldVal}变为${newVal}");
    },
  },
  mounted() {
    console.log("Child $options.render:", this.$options.render);
    console.log(
      "Child $options.staticRenderFns:",
      this.$options.staticRenderFns
    );
  },
  methods: {
    incrementCount() {
      this.count += 1;
    },
    decrementCount() {
      this.count -= 1;
    },
    sendMessage() {
      this.$emit("send-message", this.count);
    },
  },
});

new Vue({
  el: "#app",
  data: {
    count: 0,
    productTags: ["新品", "热销", "充足"],
  },
  methods: {
    sendMessage(data) {
      console.log("子组件 count 发生变化", data);
      this.count = data;
    },
  },
});
```

```html [子组件template]
<div class="product-card-container">
  <!-- 默认插槽 -->
  <slot>
    <div class="row">
      <span
        v-for="(tag, index) in tags"
        :key="index"
        :data-tag="tag"
        class="tag"
        >{{ tag }}</span
      >

      <button @click="decrementCount">-1</button>

      <span class="count">{{ count }}</span>

      <button @click="incrementCount">+1</button>

      <div :class="countClass">
        <span v-if="count < 0">负数</span>
        <span v-else-if="count === 0">为零</span>
        <span v-else>正数</span>
      </div>
      <span v-show="count>0">v-show</span>
    </div>
  </slot>

  <div class="footer">
    <!-- 具名插槽 -->
    <slot name="footer" :tags="tags"></slot>
    <button @click="sendMessage()">向父组件发送消息</button>
  </div>
</div>
```

```css [ css 样式 ]
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

#app {
  width: 100%;
  max-width: 800px;
}

.single-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.single-card:hover {
  transform: translateY(-5px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0 15px;
  text-align: center;
  position: relative;
}

.card-header > div:first-child {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.card-header p {
  font-size: 24px;
  font-weight: bold;
}

.card-header span {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 14px;
}

.card-header svg {
  display: block;
  margin: 0 auto;
}

.card-body {
  padding: 15px;
  /* min-height: 300px; */
}

.product-card-container {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 25px;
  border: 2px solid #e9ecef;
}

.product-card-container .row .count {
  color: black;
}

.product-card-container .row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.product-card-container .row:last-child {
  margin-bottom: 0;
}

.tag {
  background: #667eea;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.product-card-container button {
  background: #667eea;
  color: white;
  border: none;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-card-container button:hover {
  background: #764ba2;
  transform: scale(1.1);
}

.product-card-container button:active {
  transform: scale(0.95);
}

.product-card-container .row span {
  font-size: 24px;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.product-card-container .row > div {
  margin-left: 20px;
  padding: 10px 20px;
  border-radius: 10px;
  background: rgba(102, 126, 234, 0.1);
  font-weight: bold;
}

.footer {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.footer button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.card-footer {
  background: #f8f9fa;
  padding: 20px 30px;
  border-top: 1px solid #e9ecef;
  text-align: center;
  font-size: 14px;
  color: #6c757d;
}

.card-footer span {
  background: white;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #667eea;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-header > div:first-child {
    flex-direction: column;
    gap: 10px;
  }

  .product-card-container .row {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .single-card {
    margin: 10px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.single-card {
  animation: fadeIn 0.6s ease-out;
}

/* 状态颜色 */
.positive-even {
  color: #10b981 !important;
}

.positive-odd {
  color: #f59e0b !important;
}

.negative {
  color: #667eea !important;
}
```

:::

### 渲染函数

根组件和子组件的渲染函数如下:

:::code-group

```js [ code结构 ]
//  var code = generate(ast, options);
var code = {
  render: "", // ...
  staticRenderFns: [], // ...
};
```

```js [根组件 render]
render: function() {
  with(this) {
    return _c(
      'div',
      { attrs: { "id": "app" } },
      [
        _c(
          'div',
          { staticClass: "single-card" },
          [
            // 卡片头部
            _c(
              'div',
              { staticClass: "card-header" },
              [
                _m(0),  // 静态渲染函数 0
                _v(" "), // 文本节点（空格）
                _c(
                  'svg',
                  { attrs: { "width": "200", "height": "60" } },
                  [
                    _c('circle', {
                      attrs: {
                        "cx": "150", "cy": "30", "r": "20",
                        "fill": "white", "opacity": "0.3"
                      }
                    }),
                    _v(" "),
                    _c('circle', {
                      attrs: {
                        "cx": "150", "cy": "30", "r": "15",
                        "fill": "white"
                      }
                    })
                  ]
                )
              ]
            ),

            _v(" "),

            // 卡片主体
            _c(
              'div',
              { staticClass: "card-body" },
              [
                _c(
                  'product-card',
                  {
                    attrs: { "tags": productTags },
                    on: { "send-message": sendMessage },
                    scopedSlots: _u([
                      {
                        key: "footer",
                        fn: function(slotProps) {
                          return [
                            _v(
                              "\n                        " +
                              _s(slotProps.tags ? `${slotProps.tags.length}个标签` : '无标签') +
                              "\n                    "
                            )
                          ]
                        }
                      }
                    ])
                  }
                )
              ],
              1  // 子节点规范化类型
            ),

            _v(" "),

            // 卡片底部
            _c(
              'div',
              { staticClass: "card-footer" },
              [
                _c('span', [
                  _v("📌 count: " + _s(count))
                ]),
                _v(" "),
                _m(1)  // 静态渲染函数 1
              ]
            )
          ]
        )
      ]
    )
  }
}
```

```js [根组件 staticRenderFns]
// 静态渲染函数 0
staticRenderFns[0]: function() {
  with(this) {
    return _c(
      'div',
      [
        _c('p', [
          _v("Vue核心特性")
        ]),
        _v(" "),
        _c('span', { pre: true }, [
          _v("{{ count }}")
        ])
      ]
    )
  }
}
// 静态渲染函数 1
staticRenderFns[1]: function() {
  with(this) {
    return _c('span', [
      _v("📌 v-once count: " + _s(count))
    ])
  }
}

```

```js [子组件 render]
 render: function() {
  with(this) {
    return _c('div',
      { staticClass: "product-card-container" },
      [
        _t("default",
          function() {
            return [
              _c('div',
                { staticClass: "row" },
                [
                  _l((tags), function(tag, index) {
                    return _c('span',
                      {
                        key: index,
                        staticClass: "tag",
                        attrs: { "data-tag": tag }
                      },
                      [_v(_s(tag))]
                    )
                  }),
                  _v(" "),
                  _c('button',
                    { on: { "click": decrementCount } },
                    [_v("-1")]
                  ),
                  _v(" "),
                  _c('span',
                    { staticClass: "count" },
                    [_v(_s(count))]
                  ),
                  _v(" "),
                  _c('button',
                    { on: { "click": incrementCount } },
                    [_v("+1")]
                  ),
                  _v(" "),
                  _c('div',
                    { class: countClass },
                    [
                      (count < 0) ?
                        _c('span', [_v("负数")]) :
                      (count === 0) ?
                        _c('span', [_v("为零")]) :
                        _c('span', [_v("正数")])
                    ]
                  ),
                  _v(" "),
                  _c('span',
                    {
                      directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: (count > 0),
                        expression: "count>0"
                      }]
                    },
                    [_v("v-show")]
                  )
                ],
                2
              )
            ]
          }
        ),
        _v(" "),
        _c('div',
          { staticClass: "footer" },
          [
            _t("footer", null, { "tags": tags }),
            _v(" "),
            _c('button',
              { on: { "click": function($event) { return sendMessage() } } },
              [_v("向父组件发送消息")]
            )
          ],
          2
        )
      ],
      2
    )
  }
}
```

:::

在本节，我们关注在**模板编译**后生成抽象语法树[AST](/vue/vue2/ast.md)和渲染函数`render`后，进行的**首次渲染**。

## 源码流程

### 初始化阶段

从**加载 vuejs 后** 到 `new vue`实例化前的初始化阶段，对于**模板渲染**流程会做一些准备工作：

::: code-group

```js [ VueJS IIFE ]
(function (global, factory) {
  /** 忽略代码 */
})(this, function () {
  "use strict";
  // 1. 定义 Vue 构造函数
  function Vue(options) {
    // ... 实例初始化逻辑
    this._init(options); // 内部调用 initRender
  }

  // 2. 一系列初始化函数调用
  initMixin(Vue); // 初始化 _init 方法
  stateMixin(Vue); // 初始化 $data, $props, $set, $delete, $watch
  eventsMixin(Vue); // 初始化 $on, $once, $off, $emit
  lifecycleMixin(Vue); // 初始化 _update, $forceUpdate, $destroy
  renderMixin(Vue); // 初始化 _render, $nextTick 和渲染辅助函数

  // 3. 初始化全局 API
  initGlobalAPI(Vue); // 初始化 Vue.use, Vue.mixin, Vue.extend 等

  // 4. 平台特定初始化（Web 平台）
  Vue.config.mustUseProp = mustUseProp;
  Vue.config.isReservedTag = isReservedTag;
  Vue.config.getTagNamespace = getTagNamespace;
  Vue.config.isUnknownElement = isUnknownElement;

  // 5. 安装平台特定的指令和组件
  // v-model, v-show
  extend(Vue.options.directives, platformDirectives);
  // Transition, TransitionGroup
  extend(Vue.options.components, platformComponents);

  // 6. 挂载 __patch__ 和 $mount 方法
  Vue.prototype.__patch__ = inBrowser ? patch : noop;
  Vue.prototype.$mount = function (el, hydrating) {
    // ...
  };
  // 7. 返回 Vue 构造函数
  return Vue;
});
```

```js [初始化函数调用]
function lifecycleMixin(Vue) {
  // [!code hl]
  Vue.prototype._update = function (vnode, hydrating) {
    // ... 更新虚拟DOM到真实DOM
  };

  Vue.prototype.$forceUpdate = function () {
    // ... 强制重新渲染
  };

  Vue.prototype.$destroy = function () {
    // ... 销毁实例
  };
}

function renderMixin(Vue) {
  // 挂载渲染辅助函数： _v, _s, _l 等
  installRenderHelpers(Vue.prototype); // [!code hl]

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };
  // [!code hl]
  Vue.prototype._render = function () {
    // ... 执行渲染函数生成虚拟DOM
  };
}

// 初始化渲染相关的实例属性和方法 _c
function initRender(vm) {
  // 绑定内部使用的 createElement 函数|内部版本用于模板编译生成的渲染函数，不进行标准化处理
  vm._c = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false); // [!code hl]
  };
  // 绑定用户使用的 createElement 函数|公开版本用于用户手写的渲染函数，始终进行标准化处理
  vm.$createElement = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
}
```

```js [initGlobalAPI]
var ASSET_TYPES = ["component", "directive", "filter"];

function initGlobalAPI(Vue) {
  // ... 忽略其他代码
  initExtend(Vue); // Vue.extend 方法
  initAssetRegisters(Vue); // Vue.component, Vue.directive, Vue.filter
}
/**
 * 每个实例构造函数（包括 Vue）都有一个唯一的 cid（构造函数 ID）
 * 这使得我们可以为原型继承创建包装的"子构造函数"并缓存它们
 */
function initExtend(Vue) {
  Vue.cid = 0; // Vue 基类的构造函数 ID 设为 0
  var cid = 1; // 用于分配子构造函数的唯一 ID，从 1 开始

  /**
   * 类继承方法：创建 Vue 的子类（组件构造函数）
   * @param {Object} extendOptions - 组件选项对象
   * @returns {Function} Sub - 子类构造函数
   */
  Vue.extend = function (extendOptions) {
    // ... 忽略其他代码
  };
}
/**
 * 初始化资源注册方法：component、directive、filter
 * 这些方法用于全局注册组件、指令和过滤器
 * @param {GlobalAPI} Vue - Vue 构造函数
 */
function initAssetRegisters(Vue) {
  /**
   * 资源注册/获取方法
   * @param {string} id - 资源名称（组件名、指令名、过滤器名）
   * @param {Function|Object} definition - 资源定义
   * @returns {Function|Object|void} - 返回资源定义或已注册的资源
   */
  ASSET_TYPES.forEach(function (type) {
    // ...忽略其他代码
  });
}
```

```js [ 平台特定初始化（Web平台）]
// 在 IIFE 中直接执行的平台初始化代码

// 1. 配置平台特定检查函数
Vue.config.mustUseProp = mustUseProp; // 哪些属性必须用 prop 绑定
Vue.config.isReservedTag = isReservedTag; // 是否是保留标签（HTML/SVG标签）
Vue.config.getTagNamespace = getTagNamespace; // 获取标签的命名空间（如 SVG）
Vue.config.isUnknownElement = isUnknownElement; // 检查是否是未知元素

// 2. 安装平台内置指令和组件
extend(Vue.options.directives, platformDirectives); // 包含 v-model, v-show
extend(Vue.options.components, platformComponents); // 包含 Transition, TransitionGroup

// 3. 安装 __patch__ 方法（虚拟DOM转为真实DOM的核心）
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// 4. 定义 $mount 方法
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

:::

### 运行时阶段

通过 `new vue` 构造函数创建 Vue 实例时：

::: code-group

```js [_init]
Vue.prototype._init = function (options) {
  var vm = this; // 保存当前实例引用
  // ... 忽略部分代码 ...

  initLifecycle(vm); // 初始化生命周期相关属性，但不触发任何钩子函数
  initEvents(vm); // 初始化事件监听器，但不触发任何事件
  initRender(vm); // 初始化渲染函数，但不挂载到 DOM // [!code hl]
  // 调用 beforeCreate 生命周期钩子 | 此时：数据观测、事件/侦听器配置还未初始化
  callHook$1(vm, "beforeCreate", undefined, false /* setContext */);

  // Vue 响应式系统的核心 | 初始化状态：props, methods, data, computed, watch
  initState(vm);

  // 调用 created 生命周期钩子 | 此时：数据观测已完成，事件/侦听器已配置，但 DOM 还未挂载
  callHook$1(vm, "created");

  // 如果提供了 el 选项，自动挂载
  if (vm.$options.el) {
    vm.$mount(vm.$options.el); // 渲染组件到 DOM，自动挂载实例 // [!code hl]
  }
};

// 声明原始版本 $mount
Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating); // [!code hl]
};
// 缓存原始的 $mount
var mount = Vue.prototype.$mount;

// 重写 $mount 方法增加模板编译能力，生成渲染函数后调用原始的 $mount 方法
Vue.prototype.$mount = function (el, hydrating) {
  // 生成渲染函数
  // ...流程省略

  // 调用原始的 $mount 方法，开始挂载流程
  return mount.call(this, el, hydrating); // 即调用 mountComponent //[!code hl]
};
```

```js [mountComponent]
/**
 * Vue组件挂载的核心函数
 * 负责将组件实例挂载到DOM上，建立响应式系统与视图的关联
 *
 * @param {Component} vm - Vue组件实例
 * @param {Element} el - 挂载的目标DOM元素
 * @param {boolean} hydrating - 是否服务端渲染补水
 * @returns {Component} 返回组件实例
 */
function mountComponent(vm, el, hydrating) {
  // ...忽略部分代码...

  // 1. 保存挂载的DOM元素到实例
  vm.$el = el;
  // 2. 调用beforeMount生命周期钩子
  callHook$1(vm, "beforeMount");
  // 3. 定义更新组件的函数（核心渲染逻辑）执行渲染和更新
  var updateComponent = function () {
    vm._update(vm._render(), hydrating); // [!code hl]
  };
  // 5. 配置渲染Watcher的选项
  var watcherOptions = {
    before: function () {
      // 关键条件：只有当组件已经挂载且未被销毁时
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "beforeUpdate");
      }
    },
  };
  // 6. 创建渲染Watcher（连接响应式系统和视图的关键）
  // 这个Watcher会在构造函数中立即执行一次getter（updateComponent）实现首次渲染
  new Watcher( // [!code hl]
    vm, // 组件实例// [!code hl]
    updateComponent, // getter函数（每次依赖变化时执行）// [!code hl]
    noop, // 回调函数（这里为空函数）// [!code hl]
    watcherOptions, // 选项配置// [!code hl]
    true // 标记为渲染Watcher（isRenderWatcher）// [!code hl]
  ); // [!code hl]
  // 7. 设置hydration标志为false（表示客户端渲染完成）
  hydrating = false;

  // 8. 执行在setup()中通过flush: "pre"排队的watchers
  // 这些是Composition API中设置的预刷新watchers
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run(); // 执行预排队的watchers
    }
  }
  // 9. 如果是根组件，调用mounted钩子
  // 注意：子组件的mounted会在其inserted钩子中调用
  if (vm.$vnode == null) {
    vm._isMounted = true; // 标记为已挂载
    callHook$1(vm, "mounted"); // 调用mounted生命周期钩子
  }
  return vm; // 10. 返回组件实例（链式调用支持）
}
```

```js [渲染Watcher]
// watcher.js - Watcher 构造函数
class Watcher {
  constructor(
    vm, // 组件实例
    expOrFn, // updateComponent 函数
    cb, //noop（空函数）
    options, //watcherOptions
    isRenderWatcher // isRenderWatcher = true
  ) {
    this.vm = vm; // 保存组件实例引用
    vm._watchers.push(this); // 添加到组件watchers数组

    // 步骤2：如果是渲染Watcher，特殊标记
    if (isRenderWatcher) {
      vm._watcher = this; // 关键：保存到 vm._watcher// [!code hl]
    }

    // 步骤3：解析选项
    if (options) {
      this.deep = !!options.deep; // 深度监听
      this.user = !!options.user; // 用户定义的watcher
      this.lazy = !!options.lazy; // 惰性求值（computed）
      this.sync = !!options.sync; // 同步执行
      this.before = options.before; // beforeUpdate钩子
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }

    // 步骤4：设置getter函数
    this.cb = cb; // noop空函数
    this.id = ++uid; // 唯一ID

    // expOrFn就是updateComponent函数
    if (typeof expOrFn === "function") {
      this.getter = expOrFn; // getter = updateComponent // [!code hl]
    }

    // 步骤5：依赖数组初始化
    this.deps = []; // 当前watcher依赖的所有dep
    this.newDeps = []; // 新收集的依赖
    this.depIds = new Set(); // 依赖ID集合（去重用）
    this.newDepIds = new Set();

    // 步骤6：立即求值（触发首次渲染）
    this.value = this.lazy ? undefined : this.get(); // 立即执行！ // [!code hl]
  }
}
```

```js [get]
class Watcher {
  get() {
    // 步骤2.1：设置当前watcher为依赖收集目标
    pushTarget(this); // Dep.target = 渲染watcher // [!code hl]

    let value;
    const vm = this.vm;

    try {
      // 步骤2.2：执行updateComponent函数
      value = this.getter.call(vm, vm);
      // 等价于：value = updateComponent.call(vm, vm);
      // 也就是执行：vm._update(vm._render(), hydrating)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`);
      } else {
        throw e;
      }
    } finally {
      // 步骤2.3：清理依赖收集状态
      if (this.deep) {
        traverse(value); // 深度遍历收集依赖
      }
      popTarget(); // Dep.target = 之前watcher（或null）
      this.cleanupDeps(); // 清理旧依赖
    }

    return value;
  }
}
```

:::

### 生成虚拟 DOM

`_render`函数负责将模板编译后的结果转换为虚拟 DOM（VNode）。

在组件初始化阶段 `renderMixin`会将 `_render`挂载到 Vue.prototype 上。

:::code-group

```js [_render]
function renderMixin(Vue) {
  /**
   * Vue 实例的渲染方法
   * 负责执行 render 函数生成虚拟DOM（VNode）
   * 这是连接编译后的模板和虚拟DOM的关键桥梁
   *
   * @return {VNode} 返回生成的虚拟DOM节点
   */
  Vue.prototype._render = function () {
    var vm = this;
    // 解构获取渲染所需的选项
    var _a = vm.$options,
      render = _a.render, // 编译后的render函数或用户手写的render函数
      _parentVnode = _a._parentVnode; // 父组件的虚拟节点 ｜ null

    // 处理作用域插槽（仅当组件已挂载且有父组件时）
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(
        vm.$parent,
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    // 4. 设置父级虚拟节点（根组件为null）
    vm.$vnode = _parentVnode; // vm.$vnode = null

    // 5. 开始渲染，生成虚拟DOM
    var vnode;
    try {
      // 设置当前渲染实例（用于Composition API）
      setCurrentInstance(vm); // 设置vm为当前实例
      // 标记当前正在渲染的实例（用于开发工具）
      currentRenderingInstance = vm; // currentRenderingInstance = app实例

      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      // ...
    } finally {
      // 8. 清理当前渲染实例标记
      currentRenderingInstance = null; // 重置为null
      setCurrentInstance(); // 清除当前实例
    }
    // 9. 处理数组返回值（如果render返回数组且只有一个元素）
    if (isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }

    // 10. 确保返回的是VNode实例
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode(); // 创建空节点作为降级
    }
    // 11. 设置父级关系（根组件的parent为null）
    vnode.parent = _parentVnode;
    // 12. 返回生成的虚拟DOM
    return vnode;
  };
}
```

```js [VNode]
/**
 * 虚拟节点类（Virtual Node）
 * Vue.js 虚拟DOM系统的核心数据结构
 * 用于在内存中表示DOM结构，实现高效的DOM更新
 */
var VNode = /** @class */ (function () {
  /**
   * 构造函数 - 创建VNode实例
   * @param {string|undefined} tag - 标签名（HTML元素/组件名）
   * @param {VNodeData|undefined} data - 节点数据（属性/事件/指令等）
   * @param {Array<VNode>|string|undefined} children - 子节点数组
   * @param {string|undefined} text - 文本内容（仅文本节点）
   * @param {Node|undefined} elm - 对应的真实DOM元素
   * @param {Component|undefined} context - 所属的Vue组件上下文
   * @param {VNodeComponentOptions|undefined} componentOptions - 组件选项
   * @param {Function|undefined} asyncFactory - 异步组件工厂函数
   */
  function VNode(
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactory
  ) {
    // ==================== 核心属性 ====================

    //  节点标签
    this.tag = tag; // 字符串：HTML标签名（'div'）、组件名（'MyComponent'）

    /**
     * 节点数据对象（VNodeData类型）
     * 包含属性、事件、指令等配置信息
     * 结构：
     * {
     *   attrs: { id: 'app' },        // HTML属性
     *   on: { click: handler },      // 事件监听
     *   class: ['foo', { bar: true }], // 动态类名
     *   style: { color: 'red' },     // 内联样式
     *   key: 'unique-id',            // 唯一标识（diff优化）
     *   ref: 'myRef',                // 引用标识
     *   directives: [],              // 自定义指令
     *   slot: 'header',              // 插槽名称
     *   // ... 其他属性
     * }
     */
    this.data = data;

    // 子节点数组
    this.children = children; // Array<VNode>：元素节点 ｜ 文本节点使用text属性，不设置children

    // 文本内容
    this.text = text; // 字符串：文本节点的内容

    // 对应的真实DOM元素（引用）｜ 初始创建时为undefined
    this.elm = elm; //  patch阶段将VNode渲染为真实DOM后设置

    // ==================== 命名空间 ====================

    // XML命名空间（主要用于SVG和MathML） 用于确保SVG/MathML元素正确创建
    this.ns = undefined; // 'svg'：SVG命名空间 ｜ 'math'：MathML命名空间 ｜ undefined：HTML命名空间

    // ==================== 上下文相关 ====================

    // 所属Vue组件实例（渲染上下文）
    this.context = context;

    // 函数式组件的上下文（仅函数式组件使用）
    this.fnContext = undefined; // 函数式组件没有实例，通过fnContext访问父组件上下文

    this.fnOptions = undefined; // 函数式组件的Vue选项（仅函数式组件使用）

    this.fnScopeId = undefined; // 函数式组件的作用域ID（用于scoped CSS）

    // ==================== 标识与优化 ====================

    /**
     * 节点的唯一标识（从data.key提取）
     * diff算法用于：
     * 1. 识别相同节点（即使位置改变）
     * 2. 复用DOM元素（提升性能）
     * 3. 列表渲染优化（v-for）
     * 示例：<div v-for="item in list" :key="item.id">
     */
    this.key = data && data.key;

    // ==================== 组件相关 ====================

    /**
     * 组件选项（仅组件VNode使用）
     * 包含：
     * {
     *   Ctor: ComponentConstructor,  // 组件构造函数
     *   propsData: Object,           // props数据
     *   listeners: Object,           // 事件监听器
     *   children: VNodeChildren,     // 子VNode（插槽内容）
     *   tag?: string                 // 组件标签名
     * }
     */
    this.componentOptions = componentOptions;

    /**
     * 组件实例（仅组件VNode使用）
     * - 初始为undefined
     * - 在initComponent时创建并赋值
     * - 用于访问组件数据和方法
     */
    this.componentInstance = undefined;

    // ==================== 结构关系 ====================

    // 父VNode（用于构建VNode树）
    this.parent = undefined;

    // ==================== 特殊节点标志 ====================

    // 是否为原始HTML（v-html指令）
    this.raw = false; // true表示children包含原始HTML字符串

    /**
     * 是否为静态节点
     * - true：不会变化，可跳过diff和patch
     * - false：动态节点，需要响应式更新
     * 静态节点优化：
     * 1. 首次渲染后缓存
     * 2. 复用而非重新创建
     * 3. 跳过diff算法
     */
    this.isStatic = false;

    // 是否作为根节点插入 true：首次插入到父容器 ｜ false：作为子节点插入
    this.isRootInsert = true; // 用于过渡动画的生命周期钩子调用

    // 是否为注释节点 true：<!-- 注释 --> ｜false：普通节点
    this.isComment = false; // 注释节点用于占位（如v-if条件渲染）

    // 是否为克隆节点 true：由静态节点克隆而来 ｜ false：原始创建的节点
    this.isCloned = false; // 用于静态节点的优化复用

    // 是否为v-once节点 true：只渲染一次，之后跳过更新 ｜ false：正常响应式更新
    this.isOnce = false; // 用于优化不会改变的内容

    // ==================== 异步组件相关 ====================

    // 异步组件工厂函数 ｜ 用于动态加载组件
    this.asyncFactory = asyncFactory; // 示例：() => import('./AsyncComponent.vue')

    // 异步组件的元数据 包含加载状态、错误处理等信息
    this.asyncMeta = undefined;

    // 是否为异步组件占位符  true：异步组件加载前的占位节点 ｜ false：普通节点或已加载的异步组件
    this.isAsyncPlaceholder = false;
  }

  return VNode;
})();
```

```js [_c]
function isDef(v) {
  return v !== undefined && v !== null;
}
/**
 * 创建虚拟DOM节点的工厂函数
 * @param {Component} context - 组件上下文（this），用于确定作用域
 * @param {string | Component} tag - 标签名或组件定义
 * @param {Object | Array | string | number | boolean | null} data - 节点数据（属性、事件等）
 * @param {any} children - 子节点
 * @param {number} normalizationType - 子节点规范化类型
 * @param {boolean} alwaysNormalize - 是否始终规范化
 * @returns {VNode} 虚拟节点
 */
function createElement(
  context, // vm 实例，提供数据、方法等访问
  tag, // 可以是HTML标签名（'div'）、组件选项对象或异步组件函数
  data, // 包含props、attrs、on等属性的对象，可选 数据对象（如 { attrs: { id: "app" } }）
  children, // 子虚拟节点数组或文本节点
  normalizationType, // 子节点规范化策略：0-不处理，1-简单处理，2-完全处理
  alwaysNormalize // 是否强制使用完全规范化（内部标志）
) {
  /**
   * 情况1：处理参数重载（当data被省略时）
   *
   * 支持两种调用方式：
   * 1. createElement('div', { id: 'foo' }, [children])  // 标准调用
   * 2. createElement('div', [children])                // 省略data，直接传children
   *
   * 检测逻辑：如果data是数组或原始值，说明用户省略了data参数
   * 此时需要将参数向前移动：data -> undefined, children -> data, normalizationType -> children
   */
  if (isArray(data) || isPrimitive(data)) {
    // 重载参数处理
    normalizationType = children; // 原来的children参数实际是normalizationType
    children = data; // 原来的data参数实际是children
    data = undefined; // data参数未被提供，设为undefined
  }
  /**
   * 情况2：处理alwaysNormalize标志
   *
   * 当alwaysNormalize为true时（如从模板编译来的调用），
   * 强制使用完全规范化策略（ALWAYS_NORMALIZE = 2）
   * 这确保了来自模板的子节点会被深度规范化
   */
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE; // 值为2，表示完全规范化
  }
  // 调用真正的创建函数 此时所有参数都已正确处理和标准化
  return _createElement(context, tag, data, children, normalizationType);
}
```

```js [_createElement]
/**
 * 创建虚拟DOM节点的核心函数 这是Vue虚拟DOM系统的核心，负责创建VNode
 *
 * @param {Component} context - Vue组件实例
 * @param {string|Component} tag - 标签名或组件选项
 * @param {VNodeData} data - VNode数据对象（属性、事件等）
 * @param {any} children - 子节点
 * @param {number} normalizationType - 标准化类型
 * @return {VNode} 返回创建的虚拟节点
 */
function _createElement(context, tag, data, children, normalizationType) {
  // 1. 安全检查：数据对象不能是响应式的（防止内存泄漏） isDef 检查对象是否为null或undefined
  if (isDef(data) && isDef(data.__ob__)) {
    warn$2("Avoid using observed data object as !", context);
    return createEmptyVNode(); // 返回空节点防止错误
  }

  // 2. 处理动态组件语法：<component :is="currentComponent">   如果data中有is属性，使用它作为tag
  if (isDef(data) && isDef(data.is)) tag = data.is; // 例如：data.is = "MyComponent"
  // 3. 如果没有tag（组件is属性设置为假值），返回空节点
  if (!tag) return createEmptyVNode(); // 例如：<component :is="null"></component>
  // 4. 警告：避免使用非原始值作为key

  // 5. 支持单个函数子节点作为默认作用域插槽  用于简化作用域插槽语法
  if (isArray(children) && isFunction(children[0])) {
    data = data || {};
    data.scopedSlots = { default: children[0] }; // 将第一个子节点作为默认插槽
    children.length = 0; // 清空children数组
  }
  // 6. 标准化子节点（将children转换为VNode数组）
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children); // 完全标准化（用于用户手写的render函数）
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children); // 简单标准化（用于模板编译的render函数）
  }
  var vnode, ns; // ns: namespace（命名空间，用于SVG/MathML）
  // 7. 根据tag的类型创建不同的VNode
  if (typeof tag === "string") {
    var Ctor = void 0; // 组件构造函数
    // 获取命名空间（主要用于SVG和MathML）
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    // 7.1 检查是否是平台内置元素（HTML/SVG标签）
    if (config.isReservedTag(tag)) {
      // 平台内置元素（div、span、svg等）
      // 警告：.native修饰符只能用于组件
      if (isDef(data) && isDef(data.nativeOn) && data.tag !== "component") {
        warn$2("The .native modifier for v-on is only ", context);
      }
      // 创建普通元素VNode
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      // 7.2 检查是否是组件（排除pre标记的和未注册的）
      (!data || !data.pre) &&
      isDef((Ctor = resolveAsset(context.$options, "components", tag)))
    ) {
      // 是已注册的组件
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // 7.3 未知元素或未列出的命名空间元素 运行时检查，因为可能在父节点标准化子节点时分配命名空间
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // 8. tag是组件选项对象/构造函数（直接传入，不是字符串） 例如：_c(MyComponent, ...)
    vnode = createComponent(tag, data, context, children);
  }
  // 9. 处理返回值
  if (isArray(vnode)) {
    return vnode; // 返回数组（可能是renderSlot返回的数组）
  } else if (isDef(vnode)) {
    // 成功创建VNode
    if (isDef(ns)) applyNS(vnode, ns); // 应用命名空间
    if (isDef(data)) registerDeepBindings(data); // 注册深度绑定（用于动态class/style）｜触发属性 getter
    return vnode;
  } else return createEmptyVNode();
}
```

```js [createComponent]
/**
 * 创建组件 VNode 的核心函数
 * 用于将组件定义转换为组件的虚拟节点
 * @param {Function|Object} Ctor - 组件构造函数或组件选项对象
 * @param {Object} data - 组件的数据对象（属性、事件等）
 * @param {Vue} context - 当前组件上下文（父组件实例）
 * @param {Array} children - 子节点数组
 * @param {string} tag - 组件标签名
 * @returns {VNode|undefined} - 组件 VNode 或 undefined
 */
function createComponent(Ctor, data, context, children, tag) {
  // 1. 如果 Ctor 未定义，直接返回
  if (isUndef(Ctor)) return;

  // 2. 获取基础构造函数（通常是 Vue 构造函数）
  var baseCtor = context.$options._base;

  // 3. 如果 Ctor 是普通对象，将其转换为构造函数
  // 这是处理组件选项对象的情况，例如：{ template: '<div></div>' }
  if (isObject(Ctor)) {
    // 使用 Vue.extend 将选项对象转换为构造函数
    Ctor = baseCtor.extend(Ctor);
  }

  // 4. 验证 Ctor 是否为有效的构造函数或异步组件工厂函数

  // 5. 处理异步组件
  var asyncFactory;
  // 异步组件没有 cid 属性（cid 是同步组件的唯一标识符）
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor; // 保存异步组件工厂函数
    // 解析异步组件，可能返回 undefined（表示正在加载）
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // 返回一个占位符节点，用于异步组件 这个节点会被渲染为注释节点，但会保留所有原始信息
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  // 6. 确保 data 存在（为 null 或 undefined 时设为空对象）
  data = data || {};

  // 7. 解析构造函数的选项，处理全局 mixin 的情况
  resolveConstructorOptions(Ctor);

  // 8. 处理组件上的 v-model 指令 将 v-model 数据转换为 props 和 events
  if (isDef(data.model)) transformModel(Ctor.options, data);

  // 9. 从 VNode 数据中提取 props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // 10. 处理函数式组件 函数式组件没有实例，渲染方式不同
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }

  // 11. 提取监听器（listeners） 这些监听器需要作为子组件的监听器，而不是 DOM 监听器
  var listeners = data.on;

  // 12. 将原生事件监听器（.native 修饰符）移动到 data.on 这样它们会在父组件 patch 时被处理为 DOM 事件
  data.on = data.nativeOn;

  // 13. 处理抽象组件（如 <transition>、<keep-alive>）
  // 抽象组件只保留 props、listeners 和 slot，不保留其他数据
  if (isTrue(Ctor.options.abstract)) {
    // 抽象组件不保留任何东西，除了 props、listeners 和 slot
    var slot = data.slot; // 保存 slot 信息
    data = {}; // 清空 data
    if (slot) data.slot = slot; // 恢复 slot
  }

  // 14. 在占位符节点上安装组件管理钩子 这些钩子将在 patch 过程中被调用，用于组件的创建、更新等
  installComponentHooks(data);

  // 15. 返回一个占位符 VNode 组件的真实 DOM 将在 patch 阶段创建
  var name = getComponentName(Ctor.options) || tag;

  // 创建组件 VNode
  var vnode = new VNode(
    // 组件 VNode 的标签格式："vue-component-{cid}-{name}"
    "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
    data, // 处理后的数据（包含组件钩子）
    undefined, // 组件 VNode 没有 children，children 作为组件实例的 $slots
    undefined, // 文本节点为空
    undefined, // 注释节点为空
    context, // 组件上下文（父组件）
    // 组件选项
    {
      Ctor: Ctor, // 组件构造函数
      propsData: propsData, // 提取的 props 数据
      listeners: listeners, // 事件监听器
      tag: tag, // 原始标签名
      children: children, // 子节点（作为插槽内容）
    },
    asyncFactory // 异步组件工厂函数（如果是异步组件）
  );

  return vnode;
}
```

:::

### 挂载真实 DOM

`_update(vnode,hydrating)` 方法是将虚拟 DOM 转换为真实 DOM 的核心入口。

- vnode - 新的虚拟节点树（由\_render 生成）
- hydrating - 是否服务端渲染激活（SSR hydration）

::: code-group

```js [_update]
function lifecycleMixin(Vue) {
  /**
   * Vue实例的更新方法 - 虚拟DOM渲染到真实DOM的核心入口
   *
   * @param {VNode} vnode - 新的虚拟节点树（由_render生成）
   * @param {boolean} hydrating - 是否服务端渲染激活（SSR hydration）
   *
   * @description
   * 这个方法负责将VNode转换为真实DOM，是Vue响应式系统、虚拟DOM和真实DOM的桥梁。
   * 每个Vue实例在创建渲染Watcher时都会调用此方法。
   */
  Vue.prototype._update = function (vnode, hydrating) {
    // 保存当前Vue实例引用
    var vm = this;

    // 保存之前的DOM元素和VNode引用（用于后续清理和引用更新）
    var prevEl = vm.$el; // 之前的真实DOM根元素
    var prevVnode = vm._vnode; // 之前的虚拟DOM树（_vnode是渲染结果）

    /**
     * 设置当前激活的Vue实例
     * 用于在创建子组件时正确设置父组件上下文
     *
     * @returns {Function} restoreActiveInstance - 恢复之前激活实例的函数
     *
     * @example
     * const restore = setActiveInstance(parentVM);
     * // 此时创建的子组件会知道它的父组件是parentVM
     * const childVNode = createComponent(...);
     * restore(); // 恢复之前的激活实例
     */
    var restoreActiveInstance = setActiveInstance(vm);

    /**
     * 保存新的VNode到实例
     * _vnode属性存储当前实例的渲染结果VNode
     * 下次更新时会作为prevVnode使用
     */
    vm._vnode = vnode;

    /**
     * Vue原型上的__patch__方法在不同平台注入
     * - Web平台：使用DOM操作
     * - Weex平台：使用原生操作
     * - 小程序：使用小程序API
     * 这是Vue跨平台的关键设计
     */

    if (!prevVnode) {
      /**
       * 首次渲染（mount）阶段
       * prevVnode不存在，说明是第一次渲染
       *
       * @param {HTMLElement|string} vm.$el - 挂载目标元素（真实DOM或选择器）
       * @param {VNode} vnode - 新的虚拟节点树
       * @param {boolean} hydrating - SSR激活标志
       * @param {boolean} false - removeOnly参数（仅transition-group使用）
       *
       * @returns {HTMLElement} - 新的根DOM元素
       */
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      /**
       * 后续更新（update）阶段
       * prevVnode存在，说明是响应式更新
       * 只需传入新旧VNode进行差异化更新（diff算法）
       */
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    /**
     * 恢复之前的激活实例
     * 确保组件树的激活实例状态正确
     */
    restoreActiveInstance();

    /**
     * 更新DOM元素上的__vue__引用
     * 用于开发者工具和调试，建立DOM元素和Vue实例的双向引用
     */

    // 清理旧元素上的引用
    if (prevEl) {
      prevEl.__vue__ = null;
    }

    // 设置新元素上的引用
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }

    /**
     * 处理高阶组件（HOC）的$el更新
     *
     * 场景：父组件渲染子组件，子组件的模板中包含父组件的根元素
     * 需要确保父组件的$el引用正确的DOM元素
     *
     * @example
     * // ParentComponent（高阶组件）
     * <template>
     *   <div class="parent">
     *     <child-component />
     *   </div>
     * </template>
     *
     * // ChildComponent
     * <template>
     *   <span>Child</span>
     * </template>
     *
     * 这种情况下，ParentComponent.$el应该是child-component渲染出的span元素
     */
    var wrapper = vm; // 从当前组件开始
    while (
      wrapper &&
      wrapper.$vnode && // 当前组件有占位VNode（由父组件创建）
      wrapper.$parent && // 有父组件
      wrapper.$vnode === wrapper.$parent._vnode // 当前组件是父组件的渲染结果
    ) {
      // 更新父组件的$el为当前组件的$el
      wrapper.$parent.$el = wrapper.$el;
      // 继续向上查找
      wrapper = wrapper.$parent;
    }

    /**
     * updated钩子由调度器调用，确保：
     * 1. 所有子组件先更新
     * 2. 父组件在子组件更新完成后才调用updated
     *
     * 这样可以保证在父组件的updated钩子中访问子组件时，子组件已经更新完成
     */
  };
}
```

```js [__patch__]
var baseModules = [ref, directives];
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({
  nodeOps: nodeOps, // 平台特定的DOM操作
  modules: modules, // 各种功能的模块集合
});

//  __patch__ 声明，在浏览器环境下使用patch函数，否则为noop（空操作）
Vue.prototype.__patch__ = inBrowser ? patch : noop;

/**
 * ref模块 - 处理组件和DOM元素的引用
 * Vue中的ref有三种用途：
 * 1. 在普通元素上使用ref，指向DOM元素
 * 2. 在子组件上使用ref，指向组件实例
 * 3. 在v-for中使用ref，指向包含DOM元素或组件实例的数组
 */
var ref = {
  // create钩子 - 在元素/组件创建时调用
  create: function (_, vnode) {
    registerRef(vnode);
  },
  /**
   * update钩子 - 在元素/组件更新时调用
   * 如果ref发生变化（不同的ref名称），需要先注销旧的，再注册新的
   */
  update: function (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      // ref名称改变，先移除旧引用，再添加新引用
      registerRef(oldVnode, true); // true表示移除
      registerRef(vnode); // 注册新引用
    }
  },
  // destroy钩子 - 在元素/组件销毁时调用
  destroy: function (vnode) {
    registerRef(vnode, true); // 移除引用
  },
};

/**
 * directives模块 - 处理自定义指令的生命周期
 * Vue指令有5个生命周期钩子：
 * 1. bind: 只调用一次，指令第一次绑定到元素时
 * 2. inserted: 被绑定元素插入父节点时调用
 * 3. update: 所在组件的VNode更新时调用
 * 4. componentUpdated: 所在组件的VNode及其子VNode全部更新后调用
 * 5. unbind: 只调用一次，指令与元素解绑时
 */
var directives = {
  create: updateDirectives, // 元素创建时
  update: updateDirectives, // 元素更新时
  destroy: function unbindDirectives(vnode) {
    // 元素销毁时，用空节点触发unbind钩子
    updateDirectives(vnode, emptyNode);
  },
};
// 只有新旧VNode中有指令时才需要处理
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode; // 是否是创建阶段
  var isDestroy = vnode === emptyNode; // 是否是销毁阶段

  // 标准化指令（将指令配置转换为统一格式）
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = []; // 需要调用inserted钩子的指令
  var dirsWithPostpatch = []; // 需要调用componentUpdated钩子的指令
  var key, oldDir, dir;
  // 处理新指令
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // 新指令 - 调用bind钩子
      callHook(dir, "bind", vnode, oldVnode);
      // 如果定义了inserted钩子，稍后调用
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // 已存在的指令 - 调用update钩子
      dir.oldValue = oldDir.value; // 保存旧值，供指令使用
      dir.oldArg = oldDir.arg; // 保存旧参数
      callHook(dir, "update", vnode, oldVnode);
      // 如果定义了componentUpdated钩子，稍后调用
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  // 处理inserted钩子 - 只有在创建阶段才需要处理，因为插入操作只在首次渲染时发生
  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      // 创建阶段：将inserted钩子合并到VNode的insert钩子中
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      // 更新阶段：直接调用inserted
      callInsert();
    }
  }
  // 处理componentUpdated钩子
  if (dirsWithPostpatch.length) {
    // 将componentUpdated钩子合并到VNode的postpatch钩子中
    // 确保在组件及其子组件全部更新后才调用
    mergeVNodeHook(vnode, "postpatch", function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  // 处理不再存在的指令（调用unbind钩子）
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // 指令不存在于新VNode中，调用unbind
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
```

```js [createPatchFunction]
/**
 * 创建patch函数的工厂函数
 *
 * @param {Object} backend - 后端配置
 * @param {Array} backend.modules - 功能模块数组
 * @param {Object} backend.nodeOps - 平台特定的DOM操作
 * @returns {Function} patch - 核心的patch函数
 *
 * 设计哲学：
 * 1. 模块化：每个功能独立成模块（class、style、events等）
 * 2. 可插拔：不同平台提供不同的模块和nodeOps
 * 3. 声明式钩子：模块通过钩子函数参与VNode生命周期
 * 4. 性能优化：提前组织钩子，避免运行时动态查找
 */
function createPatchFunction(backend) {
  var i, j;
  var cbs = {}; // 钩子回调集合

  // 从backend中提取模块和平台操作
  var modules = backend.modules,
    nodeOps = backend.nodeOps;

  // ==================== 核心设计：模块钩子收集 ====================
  /**
   * hooks数组定义了VNode的生命周期钩子
   * 这些钩子会在patch过程的不同阶段被调用
   */
  var hooks = ["create", "activate", "update", "remove", "destroy"];

  // 遍历所有钩子类型
  for (i = 0; i < hooks.length; ++i) {
    // 为每个钩子类型初始化空数组
    cbs[hooks[i]] = [];

    // 遍历所有模块，收集该钩子的回调函数
    for (j = 0; j < modules.length; ++j) {
      // 如果模块定义了当前钩子，则添加到回调数组
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  // ==================== 其他内部函数定义 ====================
  // ... 各种patch辅助函数（createElm、patchVnode等）...

  // ==================== 返回实际的patch函数 ====================
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // ... patch实现 ...
  };
}
```

:::
::: code-group

```js [patchVnode]
/**
 * 更新虚拟节点
 * 比较新旧节点差异，并根据差异更新实际DOM。
 */
function patchVnode(
  oldVnode, // 旧虚拟节点
  vnode, // 新虚拟节点
  insertedVnodeQueue, // 已插入节点的队列（用于触发 inserted 钩子）
  ownerArray, // 父级的 children 数组（用于优化）
  index, // 在父级 children 中的索引
  removeOnly // 仅在过渡组中使用，防止在离开时移除元素
) {
  // 1. 如果新旧节点引用相同，直接返回（无需更新）
  if (oldVnode === vnode) {
    return;
  }
  // 2. 处理 vnode 重用和克隆的情况
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // 克隆被重用的 vnode（确保它们是独立的对象）
    vnode = ownerArray[index] = cloneVNode(vnode);
  }
  // 3. 获取实际 DOM 元素，并赋给新 vnode
  var elm = (vnode.elm = oldVnode.elm);
  // 4. 处理异步组件占位符
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    if (isDef(vnode.asyncFactory.resolved)) {
      // 异步组件已解析，
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
    } else {
      // 保持异步占位符状态
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }
  // 5. 处理静态节点（性能优化）
  // 静态节点不需要更新，直接复用旧的组件实例
  if (
    isTrue(vnode.isStatic) && // 新节点是静态的
    isTrue(oldVnode.isStatic) && // 旧节点也是静态的
    vnode.key === oldVnode.key && // key 相同
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce)) // 是克隆节点或一次性节点
  ) {
    vnode.componentInstance = oldVnode.componentInstance; // 复用组件实例
    return;
  }
  var i;
  var data = vnode.data; // 新节点的数据对象（包含指令、钩子等）
  // 6. 调用 prepatch 钩子（如果存在）
  // 主要用于组件更新前的准备工作
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode); // 执行 prepatch 钩子
  }
  // 7. 获取新旧节点的子节点
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  // 8. 执行更新钩子
  if (isDef(data) && isPatchable(vnode)) {
    // 执行所有模块的 update 钩子（如 attrs、class、events、style、directives 等）
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    // 执行用户定义的 update 钩子
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // 9. 核心：更新节点内容
  if (isUndef(vnode.text)) {
    // 新节点不是文本节点（可能有 children）
    if (isDef(oldCh) && isDef(ch)) {
      // 新旧节点都有 children，进行 diff 算法
      if (oldCh !== ch)
        // 引用不同才需要更新
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
    } else if (isDef(ch)) {
      // 只有新节点有 children
      {
        checkDuplicateKeys(ch); // 开发环境检查重复 key
      }
      // 如果旧节点是文本节点，先清空文本
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
      // 添加新 children
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      // 只有旧节点有 children
    } else if (isDef(oldCh)) {
      // 移除所有旧 children
      removeVnodes(oldCh, 0, oldCh.length - 1);
      // 旧节点是文本节点
    } else if (isDef(oldVnode.text)) {
      // 新节点没有内容，清空文本
      nodeOps.setTextContent(elm, "");
    }
    // 新节点是文本节点，且文本内容发生变化
  } else if (oldVnode.text !== vnode.text) {
    nodeOps.setTextContent(elm, vnode.text);
  }
  // 10. 调用 postpatch 钩子（如果存在）
  // 主要用于组件更新后的清理工作
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode);
  }
}
```

```js [updateChildren]
/**
 * 虚拟DOM Diff算法的核心函数
 * 用于比较新旧子节点数组，并最小化DOM操作更新
 * @param {HTMLElement} parentElm - 父级DOM元素
 * @param {Array} oldCh - 旧的子节点数组
 * @param {Array} newCh - 新的子节点数组
 * @param {Array} insertedVnodeQueue - 已插入的vnode队列（用于生命周期钩子）
 * @param {Boolean} removeOnly - 是否只移除不移动（用于<transition-group>）
 */
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // 初始化指针和变量
  var oldStartIdx = 0; // 旧节点数组开始索引
  var newStartIdx = 0; // 新节点数组开始索引
  var oldEndIdx = oldCh.length - 1; // 旧节点数组结束索引
  var oldStartVnode = oldCh[0]; // 旧节点数组开始节点
  var oldEndVnode = oldCh[oldEndIdx]; // 旧节点数组结束节点
  var newEndIdx = newCh.length - 1; // 新节点数组结束索引
  var newStartVnode = newCh[0]; // 新节点数组开始节点
  var newEndVnode = newCh[newEndIdx]; // 新节点数组结束节点
  var oldKeyToIdx, // 旧节点key到索引的映射表
    idxInOld, // 新节点在旧节点数组中的索引
    vnodeToMove, // 需要移动的节点
    refElm; // 插入的参考节点

  // removeOnly是<transition-group>的特殊标记，确保在离开过渡期间元素保持正确的相对位置
  var canMove = !removeOnly;
  {
    checkDuplicateKeys(newCh); // 开发环境下检查新节点是否有重复的key
  }
  // 双指针算法核心：当新旧数组都未遍历完时循环
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 情况1：旧开始节点为undefined（可能已被处理过）
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // 跳过已处理的节点
      // 情况2：旧结束节点为undefined（可能已被处理过）
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
      // 情况3：旧开始节点 vs 新开始节点（头头比较）
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 相同节点，进行patch更新
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 双指针同时向右移动
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
      // 情况4：旧结束节点 vs 新结束节点（尾尾比较）
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 双指针同时向左移动
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
      // 情况5：旧开始节点 vs 新结束节点（头尾比较 - 节点右移）
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 将旧开始节点移动到旧结束节点之后
      canMove &&
        nodeOps.insertBefore(
          parentElm,
          oldStartVnode.elm,
          nodeOps.nextSibling(oldEndVnode.elm)
        );
      // 旧开始指针右移，新结束指针左移
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
      // 情况6：旧结束节点 vs 新开始节点（尾头比较 - 节点左移）
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 将旧结束节点移动到旧开始节点之前
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 旧结束指针左移，新开始指针右移
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
      // 情况7：以上情况都不匹配，使用key查找
    } else {
      // 如果还没有建立旧节点的key映射表，则创建
      if (isUndef(oldKeyToIdx))
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // 根据新开始节点的key在旧节点中查找索引
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
      // 情况7.1：新节点在旧节点中不存在
      if (isUndef(idxInOld)) {
        // 创建新节点并插入到旧开始节点之前
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
        // 情况7.2：新节点在旧节点中存在
      } else {
        vnodeToMove = oldCh[idxInOld];
        // 情况7.2.1：是相同节点
        if (sameVnode(vnodeToMove, newStartVnode)) {
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          // 将已处理的旧节点标记为undefined
          oldCh[idxInOld] = undefined;
          // 移动节点到旧开始节点之前
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          // 情况7.2.2：key相同但元素不同，当作新节点处理
        } else {
          createElm(
            newStartVnode,
            insertedVnodeQueue,
            parentElm,
            oldStartVnode.elm,
            false,
            newCh,
            newStartIdx
          );
        }
      }
      // 新开始指针右移，继续处理下一个新节点
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 循环结束后处理剩余节点
  if (oldStartIdx > oldEndIdx) {
    // 找到插入的参考节点（新结束节点的下一个兄弟节点）
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    // 批量添加新节点
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );
    // 情况B：新节点遍历完，旧节点还有剩余（需要删除节点）
  } else if (newStartIdx > newEndIdx) {
    // 批量删除旧节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

```js [sameVnode]
function sameVnode(a, b) {
  return (
    a.key === b.key && // key相同
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag && // 标签名相同
      a.isComment === b.isComment && // 是否都是注释节点
      isDef(a.data) === isDef(b.data) && // 是否有data属性
      sameInputType(a, b)) || // 如果是input，类型是否相同
      (isTrue(a.isAsyncPlaceholder) && // 或者都是异步占位符
        isUndef(b.asyncFactory.error)))
  );
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i; // 建立key到索引的映射
  }
  return map;
}
```

:::

`patch` 函数是 Vue.js 的核心，它负责将虚拟 DOM 转换为实际的 DOM 并进行高效的更新。

在首次渲染时，`patch` 函数会将虚拟 DOM（VNode）转换为实际的 DOM 并插入到页面中。

后续每当组件的响应式数据发生变化时，会触发重新渲染过程， 它会通过比较新旧 VNode 来最小化对真实 DOM 的操作，从而提高性能。

::: code-group

```js [patch]
function createPatchFunction(backend) {
  /**
   * patch函数 - Vue虚拟DOM核心算法，负责将VNode转换为真实DOM
   *
   * @param {VNode|HTMLElement} oldVnode - 旧VNode或真实DOM元素（首次挂载时）
   * @param {VNode} vnode - 新的虚拟DOM节点
   * @param {boolean} hydrating - 是否启用服务端渲染激活（hydration）
   * @param {boolean} removeOnly - 仅用于<transition-group>的特殊标志，确保移除顺序正确
   * @returns {HTMLElement} - 新创建或更新的DOM元素
   */
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // 如果新VNode不存在，但旧VNode存在，则需要销毁旧节点
    // 组件销毁、v-if条件为false、父组件移除子组件
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode); // 调用销毁钩子，清理指令、事件监听器等资源
      return;
    }
    // ==================== 初始化变量 ====================
    var isInitialPatch = false; // 是否为初始patch（首次挂载）
    var insertedVnodeQueue = []; // 待执行的插入钩子队列

    if (isUndef(oldVnode)) {
      // ==================== 首次渲染 ====================// [!code hl]
      isInitialPatch = true; // 标记为初始patch
      createElm(vnode, insertedVnodeQueue); // 创建新元素及其子元素，构建完整的DOM树
    } else {
      // ==================== 更新渲染 ====================// [!code hl]

      // 判断oldVnode是否是真实DOM元素（首次挂载到现有DOM）
      var isRealElement = isDef(oldVnode.nodeType);

      // 相同VNode，进行精细化patch
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // 精细化更新现有根节点
        patchVnode(
          oldVnode, // 旧VNode
          vnode, // 新VNode
          insertedVnodeQueue, // 插入钩子队列
          null, // ownerArray（用于列表diff）
          null, // index（用于列表diff）
          removeOnly // 仅用于transition-group
        );
        // 不同节点 需要替换
      } else {
        // ... 忽略部分代码

        // 执行完全替换：创建新元素，插入DOM，移除旧元素
        var oldElm = oldVnode.elm; // 旧DOM元素
        var parentElm = nodeOps.parentNode(oldElm); // 父元素

        // 创建新节点
        createElm(
          vnode, // 新VNode
          insertedVnodeQueue, // 插入钩子队列
          oldElm._leaveCb ? null : parentElm, // 父元素（特殊情况为null）
          nodeOps.nextSibling(oldElm) // 插入位置：在旧元素之前
        );

        // 当根组件被替换时（如动态组件切换），需要更新祖先组件的$el引用
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent; // 从父节点开始
          var patchable = isPatchable(vnode); // 是否可patch（有真实DOM）
          while (ancestor) {
            // 清理祖先组件的旧资源
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor); // 调用模块的destroy钩子
            }

            ancestor.elm = vnode.elm; // 更新祖先的DOM引用为新的根元素

            if (patchable) {
              // 祖先组件有真实DOM（可patch） 重新调用create钩子（attrs、class、style等模块）
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }

              var insert_1 = ancestor.data.hook.insert; // 获取insert钩子
              if (insert_1.merged) {
                // 钩子已合并（数组形式） 从索引1开始，避免重新调用组件的mounted钩子
                for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                  insert_1.fns[i_10](); // 执行其他合并的钩子（如指令的inserted）
                }
              }
            } else {
              // 祖先组件是抽象组件（如keep-alive、transition） 只更新ref引用
              registerRef(ancestor);
            }
            ancestor = ancestor.parent; // 继续向上处理父组件
          }
        }
        // 销毁旧节点
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0); // 有父元素，从DOM中移除旧节点
          // 没有父元素，但oldVnode有tag（特殊情况）
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode); //直接调用销毁钩子清理资源
        }
      }
    }
    // 执行插入钩子
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    // 返回新创建或更新的DOM元素
    return vnode.elm;
  };
}
```

```js [createElm]
function createPatchFunction(backend) {
  /**
   * createElm - 将虚拟节点(VNode)转换为真实DOM元素的核心函数
   *
   * @param {VNode} vnode - 要创建的虚拟节点
   * @param {Array} insertedVnodeQueue - 插入钩子队列（用于收集需要执行insert钩子的VNode）
   * @param {HTMLElement} parentElm - 父DOM元素（可选，用于插入位置）
   * @param {HTMLElement} refElm - 参考DOM元素（可选，插入到refElm之前）
   * @param {boolean} nested - 是否嵌套创建（用于根节点判断）
   * @param {Array} ownerArray - 父VNode的children数组（用于克隆检测）
   * @param {number} index - 在ownerArray中的索引
   * @returns {void|boolean} - 组件创建时返回true，否则无返回值
   */
  function createElm(
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    // ==================== 第1步：检测和解决VNode复用问题 ====================
    /**
     * 问题场景：VNode在渲染列表中被复用
     * 当VNode已经有关联的DOM元素，并且它是从父组件的children数组中获取的时，
     * 需要克隆这个VNode，避免修改原始VNode的引用
     *
     * 示例：
     * const vnode1 = h('div', 'Hello'); // 第一次渲染
     * const vnode2 = vnode1; // 同一个引用  // 第二次渲染，同一个VNode被复用
     * 如果不克隆，修改vnode2.elm会影响vnode1.elm
     */
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index] = cloneVNode(vnode);
    }
    // ==================== 第2步：设置根节点插入标志 ====================
    /**
     * isRootInsert: 标记是否为根节点插入
     * 用途：transition组件的入场动画检查
     * 只有根节点（非嵌套创建）才需要执行入场动画
     */
    vnode.isRootInsert = !nested;
    // ==================== 第3步：尝试创建组件（优先级最高） ====================
    /**
     * 优先尝试创建组件，如果是组件VNode，组件内部会处理自己的DOM创建
     * createComponent成功时返回true，直接返回，不执行后面的DOM创建逻辑
     */
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return; // 组件创建成功，直接返回
    }
    // ==================== 第4步：准备创建普通DOM元素 ====================
    var data = vnode.data; // VNode数据（attrs、class、on等）
    var children = vnode.children; // 子VNode数组
    var tag = vnode.tag; // 标签名
    // ==================== 情况A：有标签名（元素节点） ====================

    if (isDef(tag)) {
      // ============ 子步骤4.1：创建DOM元素 ============
      /**
       * 根据命名空间创建元素：
       * - SVG/MathML：使用createElementNS
       * - HTML：使用createElement
       */
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      // ============ 子步骤4.2：设置作用域CSS ============
      /**
       * 处理scoped CSS，为元素添加data-v-xxxxx属性
       * 只在组件根元素和具有v-bind指令的元素上设置
       */
      setScope(vnode);
      // ============ 子步骤4.3：递归创建子节点 ============
      /**
       * 深度优先遍历：先创建子元素，再处理当前元素
       * 这样可以确保子元素完全创建后再设置父元素的属性
       */
      createChildren(vnode, children, insertedVnodeQueue);
      // ============ 子步骤4.4：调用创建钩子 ============
      /**
       * 调用所有模块的create钩子：
       * 1. attrs.create：设置HTML属性
       * 2. klass.create：设置class
       * 3. events.create：绑定事件
       * 4. domProps.create：设置DOM属性
       * 5. style.create：设置样式
       * 6. ref.create：注册ref
       * 7. directives.create：指令bind钩子
       */
      if (isDef(data)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      // ============ 子步骤4.5：插入到DOM树 ============
      /**
       * 将创建好的元素插入到父元素中
       * 注意：子元素已经通过createChildren插入到当前元素中
       */
      insert(parentElm, vnode.elm, refElm);
      // ============ 子步骤4.6：清理v-pre计数 ============
      if (data && data.pre) creatingElmInVPre--; // v-pre作用域结束
      // ==================== 情况B：注释节点 ====================
    } else if (isTrue(vnode.isComment)) {
      // 创建注释节点：<!-- 注释内容 -->
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
      // ==================== 情况C：文本节点 ====================
    } else {
      // 创建文本节点
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
}
```

```js [createElement]
/**
 * 平台相关的 DOM 操作 API 集合
 * Vue 将 DOM 操作抽象为统一的接口，便于跨平台（Web、Weex、SSR）和测试
 * Object.freeze 冻结对象，防止被修改，确保操作的安全性和一致性
 * __proto__: null 设置为 null 以创建一个没有原型的纯对象，提升性能
 */

var nodeOps = /*#__PURE__*/ Object.freeze({
  __proto__: null, // 设置原型为 null，创建纯字典对象
  // 在 Web 平台相当于：
  createElement: createElement, // document.createElement(tagName)
  createElementNS: createElementNS, // document.createElementNS(namespace, tagName)
  createTextNode: createTextNode, // document.createTextNode(text)
  createComment: createComment, // document.createComment(text)
  insertBefore: insertBefore, // parentNode.insertBefore(newNode, referenceNode)
  removeChild: removeChild, // parentNode.removeChild(childNode)
  appendChild: appendChild, // parentNode.appendChild(childNode)
  parentNode: parentNode, // node.parentNode
  nextSibling: nextSibling, // node.nextSibling
  tagName: tagName, // element.tagName
  setTextContent: setTextContent, // node.textContent = text
  setStyleScope: setStyleScope, // element.setAttribute(scopeId, '')
});
```

```js [setScope]
/**
 * setScope - 为DOM元素设置作用域CSS标识
 *
 * 作用：实现Vue的scoped CSS功能，确保组件的样式只作用于当前组件
 * TODO ？？？？ 升成时机与作用
 * 原理：为元素添加唯一属性（如data-v-123456），CSS选择器通过属性选择器限制作用范围
 *
 * 应用场景：
 * 1. 组件根元素（自动添加scopeId）
 * 2. 组件内部元素（继承父组件scopeId）
 * 3. 插槽内容（使用宿主组件的scopeId）
 *
 * @param {VNode} vnode - 虚拟节点
 */
function setScope(vnode) {
  var i; // 用于临时存储scopeId
  // ==================== 情况1：函数式组件的作用域ID ====================
  // 函数式组件有自己的fnScopeId（通过functional: true + scoped CSS生成）
  if (isDef((i = vnode.fnScopeId))) {
    nodeOps.setStyleScope(vnode.elm, i);
  } else {
    // ==================== 情况2：普通组件的作用域ID ====================
    // 非函数式组件，需要从组件树中查找scopeId
    var ancestor = vnode;
    while (ancestor) {
      // 向上遍历祖先VNode，找到第一个有scopeId的组件
      if (
        isDef((i = ancestor.context)) && // 有组件上下文
        isDef((i = i.$options._scopeId)) // 组件有scopeId
      ) {
        nodeOps.setStyleScope(vnode.elm, i);
      }
      ancestor = ancestor.parent;
    }
  }
  // ==================== 情况3：插槽内容的特殊处理 ====================
  // 插槽内容需要同时使用宿主组件的scopeId 这是因为插槽内容虽然定义在子组件中，但实际渲染在父组件的作用域
  if (
    isDef((i = activeInstance)) && // 当前激活的组件实例
    i !== vnode.context && // 不是当前VNode所属组件
    i !== vnode.fnContext && // 不是函数式组件上下文
    isDef(
      (i = i.$options._scopeId) // 激活组件有scopeId
    )
  ) {
    nodeOps.setStyleScope(vnode.elm, i);
  }
}
```

```js [createChildren]
/**
 * createChildren - 递归创建VNode的所有子节点
 *
 * @param {VNode} vnode - 父VNode
 * @param {Array<VNode>|string} children - 子节点数组或文本
 * @param {Array} insertedVnodeQueue - 待执行的插入钩子队列
 *
 * 功能：
 * 1. 处理数组形式的子节点（深度优先递归创建）
 * 2. 处理文本子节点（直接创建文本节点）
 * 3. 检查重复的key（开发环境）
 * 4. 构建完整的DOM子树
 *
 * 设计思想：深度优先遍历，先创建子节点，再处理父节点属性
 */
function createChildren(vnode, children, insertedVnodeQueue) {
  // ==================== 情况1：children是数组 ====================
  /**
   * 最常见的情况：元素有多个子节点
   * 示例：<div><span>1</span><span>2</span></div>
   * children = [spanVNode1, spanVNode2]
   */
  if (isArray(children)) {
    // 遍历所有子节点，递归创建
    for (var i_1 = 0; i_1 < children.length; ++i_1) {
      // 对每个子节点调用createElm
      createElm(
        children[i_1], // 子VNode
        insertedVnodeQueue, // 传递插入队列
        vnode.elm, // 父DOM元素（当前VNode的elm）
        null, // 参考元素（null表示追加到末尾）
        true, // nested=true表示嵌套创建
        children, // ownerArray：父VNode的children数组
        i_1 // 在数组中的索引
      );
    }
    // ==================== 情况2：children是原始值，但vnode.text存在 ====================
    /**
     * 特殊情况：元素只有文本内容
     * 示例：<div>Hello</div>
     * 注意：这里的children是undefined，但vnode.text是"Hello"
     */
  } else if (isPrimitive(vnode.text)) {
    /**
     * 为什么需要这个分支？
     * 场景：当VNode只有文本内容时，如：
     * const vnode = { tag: 'div', text: 'Hello' }
     * 这时children是undefined，但vnode.text存在
     */
    nodeOps.appendChild(
      vnode.elm, // 父DOM元素
      nodeOps.createTextNode(
        String(vnode.text) // 创建文本节点
      )
    );
  }
  // 情况3：children既不是数组，vnode.text也不是原始值
  // 例如：children = undefined, vnode.text = undefined
  // 什么都不做（空元素）
}
```

```js [insert]
/**
 * insert - DOM插入操作的统一封装
 *
 * @param {HTMLElement} parent - 父元素，插入操作的目标容器
 * @param {HTMLElement} elm - 要插入的子元素
 * @param {HTMLElement} ref - 参考元素，新元素将插入在ref之前
 *
 * 使用场景：
 * 1. 首次渲染创建新元素
 * 2. 列表更新重新排序
 * 3. 动态组件切换
 */
function insert(parent, elm, ref) {
  // 安全性检查：父元素必须存在
  if (isDef(parent)) {
    // 情况1：有参考元素（插入到特定位置）
    if (isDef(ref)) {
      // 额外安全检查：确保ref确实是parent的子元素
      if (nodeOps.parentNode(ref) === parent) {
        // 安全地在ref之前插入
        nodeOps.insertBefore(parent, elm, ref);
      }
      // 如果ref不是parent的子元素，不执行插入操作
      // 这是防御性编程，避免破坏DOM结构
    } else {
      // 情况2：无参考元素（追加到末尾）
      nodeOps.appendChild(parent, elm);
    }
  }
  // 如果parent不存在，不执行任何操作
  // 这种情况在特殊场景下出现（如过渡动画处理）
}

// 封装的好处
// 1. 跨平台统一：不同平台获取父节点方式不同
// 2. 便于mock：测试时可以替换实现
// 3. 错误处理：可以添加额外的错误检查

/**
 * 获取节点的父节点
 * 封装了原生parentNode属性
 *
 * @param {Node} node - DOM节点
 * @returns {Node|null} 父节点或null
 */
function parentNode(node) {
  return node.parentNode;
}
/**
 * 在参考节点前插入新节点
 * 封装了原生insertBefore方法
 *
 * @param {Node} parentNode - 父节点
 * @param {Node} newNode - 要插入的新节点
 * @param {Node} referenceNode - 参考节点
 */
function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}
/**
 * 追加子节点到末尾
 * 封装了原生appendChild方法
 *
 * @param {Node} node - 父节点
 * @param {Node} child - 要追加的子节点
 */
function appendChild(node, child) {
  node.appendChild(child);
}
```

```js [invokeInsertHook]
/**
 * 调用组件插入钩子的函数
 * 处理Vue组件生命周期中insert钩子的执行时机
 *
 * @param {VNode} vnode - 当前虚拟节点
 * @param {Array} queue - 待执行insert钩子的组件队列
 * @param {boolean} initial - 是否是初始挂载阶段
 */
function invokeInsertHook(vnode, queue, initial) {
  // 延迟执行组件根节点的insert钩子，确保在元素真正插入DOM后再调用

  /**
   * 情况1：初始挂载且存在父节点 -> 延迟执行
   *
   * 为什么需要延迟？
   * 1. 在组件初始挂载时，子组件需要在父组件完全插入DOM后才能执行insert钩子
   * 2. 确保在insert钩子中可以安全访问DOM元素
   * 3. 避免因DOM操作顺序导致的布局抖动
   */
  if (isTrue(initial) && isDef(vnode.parent)) {
    // 将待执行的insert队列暂存到父节点的data中
    // 等待父组件完成DOM插入后再统一执行
    vnode.parent.data.pendingInsert = queue;

    /**
     * 示例场景：
     *
     * 父组件A
     *   ↓ 渲染
     * 子组件B (queue中包含B的insert钩子)
     *
     * 执行流程：
     * 1. invokeInsertHook(B, [B], true) // B有父组件A，设置A.data.pendingInsert = [B]
     * 2. A组件完成DOM插入后，从pendingInsert取出队列执行
     */
  } else {
    /**
     * 情况2：非初始挂载 或 没有父节点 -> 立即执行
     *
     * 包含两种情况：
     * 1. 组件更新时：组件已经在DOM中，可以直接执行insert钩子
     * 2. 根组件：没有父节点，无需等待
     */
    // 遍历队列，立即执行所有组件的insert钩子
    for (var i_6 = 0; i_6 < queue.length; ++i_6) {
      queue[i_6].data.hook.insert(queue[i_6]);
    }
  }
}
```

:::

## 流程图

### 首次渲染

```text
模板编译阶段（仅完整版需要）
    ↓
new Vue() 实例化
    ↓
vm._init() 初始化
    ├── initLifecycle(vm)
    │   └── 建立父子关系：$parent/$children/$root
    │
    ├── initEvents(vm)
    │   └── 初始化父组件传递的事件监听器
    │
    ├── initRender(vm)         ← 关键初始化
    │   ├── vm.$slots = resolveSlots(...)
    │   ├── vm.$scopedSlots = emptyObject
    │   ├── vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    │   └── vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
    │
    ├── callHook(vm, 'beforeCreate')
    │   └── 此时 data、methods、computed 都不可用
    │
    ├── initInjections(vm)
    │   └── 解析 inject 选项，从祖先组件获取数据
    │
    ├── initState(vm)          ← 核心响应式初始化
    │   ├── initProps()
    │   │   └── 响应式处理 props，设置 props 代理
    │   │
    │   ├── initMethods()
    │   │   └── 将 methods 绑定到 vm 实例
    │   │
    │   ├── initData()
    │   │   ├── 获取 data 函数返回值
    │   │   ├── proxy(vm, '_data', key) // 数据代理
    │   │   └── observe(data, true) // 递归响应式处理
    │   │       └── new Observer(value)
    │   │           ├── def(value, '__ob__', this)
    │   │           ├── walk(value) // 对象处理
    │   │           └── observeArray(value) // 数组处理
    │   │
    │   ├── initComputed()
    │   │   ├── 创建 computed watcher (lazy: true)
    │   │   └── defineComputed(vm, key, userDef)
    │   │
    │   └── initWatch()
    │       └── createWatcher(vm, key, handler)
    │
    ├── initProvide(vm)
    │   └── 解析 provide 选项，供后代组件使用
    │
    └── callHook(vm, 'created')
        └── 此时 data、methods、computed 已可用
        ↓
$mount(el) 挂载调用
    ↓
[编译版 $mount] 模板编译处理
    ├── 检查 options.render 是否存在？
    │   ├── 存在：跳过编译
    │   └── 不存在：执行编译
    │       ├── 获取 template 字符串
    │       │   ├── 从 options.template
    │       │   ├── 从 el.outerHTML
    │       │   └── 如果都没有，返回空字符串
    │       │
    │       ├── compileToFunctions(template, options)
    │       │   ├── 编译模板为 AST
    │       │   ├── 优化 AST (静态节点标记)
    │       │   └── 生成 render 函数代码字符串
    │       │
    │       └── 设置到 options.render
    │
    └── 调用原始 $mount
        ↓
mountComponent(vm, el, hydrating)
    ↓
callHook(vm, 'beforeMount')
    ↓
创建渲染 Watcher ← 核心连接点
    └── new Watcher(vm, updateComponent, noop, { before: function() {...} }, true)
        ↓
首次执行 watcher.get()
    ├── pushTarget(watcher)     ← Dep.target = 当前渲染 Watcher
    │
    ├── 执行 updateComponent()
    │   ├── vm._render()        ← 首次生成虚拟 DOM
    │   │   ├── 获取 vm.$options.render 函数
    │   │   ├── 设置 vm.$vnode = _parentVnode
    │   │   ├── render.call(vm._renderProxy, vm.$createElement)
    │   │   │   └── 执行渲染函数
    │   │   │       └── 访问响应式数据 → 触发 getter → dep.depend()
    │   │   └── 返回 vnode
    │   │
    │   └── vm._update(vnode, hydrating)
    │       ├── 获取 prevVnode = vm._vnode
    │       ├── 设置 vm._vnode = vnode
    │       ├── 如果是首次渲染 (!prevVnode)
    │       │   ├── vm.$el = vm.__patch__(
    │       │   │   vm.$el,    // 旧的 VNode (null)
    │       │   │   vnode,     // 新的 VNode
    │       │   │   hydrating, // false
    │       │   │   false      // removeOnly
    │       │   │ )
    │       │   └── patch() 详细过程：
    │       │       ├── createElm(vnode, insertedVnodeQueue)
    │       │       │   ├── 创建组件节点
    │       │       │   ├── 创建元素节点
    │       │       │   ├── 创建注释节点
    │       │       │   └── 创建文本节点
    │       │       │
    │       │       ├── invokeCreateHooks(vnode)
    │       │       ├── insert(parentElm, vnode.elm)
    │       │       └── invokeInsertHook(vnode)
    │       │
    │       └── 如果不是首次渲染（重新渲染）
    │           └── vm.$el = vm.__patch__(prevVnode, vnode)
    │
    └── popTarget()             ← Dep.target = null
        ↓
hydrating = false               ← 标记客户端渲染完成
    ↓
检查 vm.$vnode == null         ← 确认是根组件
    ↓
vm._isMounted = true            ← 标记已挂载
    ↓
callHook(vm, 'mounted')         ← 调用 mounted 钩子
    ↓
渲染完成，建立完整依赖关系

```

### 更新渲染

```text
数据变化触发更新
    ↓
响应式数据 setter 被调用
    ├── const value = getter ? getter.call(obj) : newVal
    ├── if (newVal === value) return
    ├── childOb = !shallow && observe(newVal)
    └── dep.notify()           ← 关键：通知所有依赖的 Watcher
        ↓
dep.notify()
    ├── 遍历 dep.subs 数组中的所有 watcher
    └── 对每个 watcher 调用 watcher.update()
        ↓
watcher.update()
    ├── 如果是 lazy watcher（计算属性）
    │   └── this.dirty = true  // 标记脏数据
    │
    ├── 如果是 sync watcher（同步执行）
    │   └── this.run()         // 立即执行
    │
    └── 否则（渲染 Watcher 和用户 Watcher）
        └── queueWatcher(this)  // 加入更新队列
            ↓
queueWatcher(watcher)
    ├── 判断 watcher.id 是否已在队列中
    │   ├── 已在队列中：跳过
    │   └── 不在队列中：
    │       ├── 如果 flushing = false（队列未在执行）
    │       │   ├── 将 watcher 加入 queue 数组
    │       │   └── has[id] = true
    │       │
    │       └── 如果 flushing = true（队列正在执行）
    │           ├── 找到合适的位置插入
    │           └── has[id] = true
    │
    └── 如果 !waiting（未等待执行）
        ├── waiting = true
        └── nextTick(flushSchedulerQueue)  // 下一个 tick 执行
            ↓
下一个 tick 到达
    ↓
flushSchedulerQueue()  // 刷新调度队列
    ├── flushing = true
    ├── 队列排序（确保正确更新顺序）
    │   └── queue.sort((a, b) => a.id - b.id)
    │       排序规则：
    │       1. 组件从父到子（父组件先更新）
    │       2. 用户自定义 watcher 在渲染 watcher 之前
    │       3. 如果一个组件在父组件 watcher 期间被销毁，跳过
    │
    ├── 遍历执行队列中的每个 watcher
    │   ├── 清空 has[id] 标记
    │   ├── 如果是渲染 watcher，执行 before 钩子
    │   │   └── if (watcher.before) watcher.before()
    │   │       └── callHook(vm, 'beforeUpdate')
    │   │
    │   └── watcher.run()       // 执行 watcher
    │       ├── 如果是用户 watcher
    │       │   ├── this.get()  // 获取新值
    │       │   └── this.cb.call(this.vm, value, oldValue)
    │       │
    │       └── 如果是渲染 watcher
    │           ├── this.get()  // 执行 updateComponent
    │           │   ├── pushTarget(this)
    │           │   ├── updateComponent()
    │           │   │   ├── vm._render()    // 重新生成 VNode
    │           │   │   │   ├── 如果有父组件且已挂载，更新作用域插槽
    │           │   │   │   │   └── vm.$scopedSlots = normalizeScopedSlots(...)
    │           │   │   │   ├── 执行 render 函数
    │           │   │   │   └── 生成新的 vnode
    │           │   │   │
    │           │   │   └── vm._update(vnode, false) // 不是 hydration
    │           │   │       ├── 获取 prevVnode = vm._vnode
    │           │   │       ├── 设置 vm._vnode = vnode
    │           │   │       └── vm.__patch__(prevVnode, vnode)
    │           │   │           ├── patchVnode(oldVnode, vnode)
    │           │   │           │   ├── 如果是相同节点
    │           │   │           │   ├── 执行 prepatch 钩子
    │           │   │           │   ├── 更新属性/事件监听器
    │           │   │           │   ├── 处理子节点（核心 diff）
    │           │   │           │   │   ├── 新旧子节点都存在且不同
    │           │   │           │   │   │   └── updateChildren(elm, oldCh, ch)
    │           │   │           │   │   │       ├── 头头比较
    │           │   │           │   │   │       ├── 尾尾比较
    │           │   │           │   │   │       ├── 头尾比较
    │           │   │           │   │   │       ├── 尾头比较
    │           │   │           │   │   │       ├── 创建 key 映射
    │           │   │           │   │   │       └── 查找可复用的节点
    │           │   │           │   │   │
    │           │   │           │   │   ├── 只有新子节点
    │           │   │           │   │   │   └── addVnodes()
    │           │   │           │   │   │
    │           │   │           │   │   └── 只有旧子节点
    │           │   │           │   │       └── removeVnodes()
    │           │   │           │   │
    │           │   │           │   └── 执行 postpatch 钩子
    │           │   │           │
    │           │   │           └── 触发 insert 钩子
    │           │   │
    │           │   └── popTarget()
    │           │
    │           ├── 清理旧依赖
    │           │   └── this.cleanupDeps()
    │           │       ├── 遍历旧依赖
    │           │       └── 移除不再需要的依赖
    │           │
    │           └── 如果是 computed watcher，标记为可用
    │               └── this.dirty = false
    │
    └── 重置调度状态
        ├── resetSchedulerState()
        ├── 调用 activated 钩子（keep-alive 组件）
        └── 调用 updated 钩子
            └── callHook(vm, 'updated')
                ↓
更新完成，等待下一次变化
```

## diff 算法

Diff 算法采用同级比较、双端比较的策略，在保证性能的同时实现高效的 DOM 更新。

Vue2 只进行同层级节点的比较，不进行跨层级比较，时间复杂度从 O(n³) 降低到 O(n)。

:::code-group

```js [patchVnode]
// 简化版 diff 流程
function patchVnode(oldVnode, newVnode) {
  // 1. 如果节点相同，直接返回
  if (oldVnode === newVnode) return;

  // 2. 如果都是文本节点，更新文本
  if (oldVnode.text && newVnode.text) {
    if (oldVnode.text !== newVnode.text) {
      oldVnode.elm.textContent = newVnode.text;
    }
  }

  // 3. 如果都有子节点，进行子节点diff
  else if (oldVnode.children && newVnode.children) {
    updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
  }

  // 4. 其他情况处理...
}
```

```js [updateChildren]
function updateChildren(parentElm, oldCh, newCh) {
  // 指针初始化  // [!code hl]
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let newEndIdx = newCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];

  // 双端比较  // [!code hl]
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 四种比较情况
    if (sameVnode(oldStartVnode, newStartVnode)) {
      // 情况1：头头相同
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 情况2：尾尾相同
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 情况3：头尾相同 - 需要移动节点
      patchVnode(oldStartVnode, newEndVnode);
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 情况4：尾头相同 - 需要移动节点
      patchVnode(oldEndVnode, newStartVnode);
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      // 情况5：都不相同 - 使用 key 查找
      const idxInOld = findIdxInOld(
        newStartVnode,
        oldCh,
        oldStartIdx,
        oldEndIdx
      );
      if (idxInOld !== undefined) {
        // 找到可复用节点
        const vnodeToMove = oldCh[idxInOld];
        patchVnode(vnodeToMove, newStartVnode);
        parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm);
        oldCh[idxInOld] = undefined;
      } else {
        // 创建新节点
        createElm(newStartVnode, parentElm, oldStartVnode.elm);
      }
      newStartVnode = newCh[++newStartIdx];
    }
  }

  // 处理剩余节点 // [!code hl]
  if (oldStartIdx > oldEndIdx) {
    // 添加新节点
    addVnodes(parentElm, newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    // 删除旧节点
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}
```

```js [sameVnode]
function sameVnode(a, b) {
  return (
    // 1. key 必须相同
    a.key === b.key &&
    // 2. 标签名相同
    a.tag === b.tag &&
    // 3. 是否都是注释节点
    a.isComment === b.isComment &&
    // 4. 是否都有 data 属性（表示有相同的属性、事件等）
    isDef(a.data) === isDef(b.data) &&
    // 5. 对于 input 元素，type 必须相同
    sameInputType(a, b)
  );
}

// 1. key 相同是首要条件：如果设置了 key，必须完全相同

// 2. 标签类型相同：div 和 span 不会被认为是相同节点

// 3. ✅ 重点：只检查 data 是否存在，不检查内容！ data 属性值不同时，会在后续的 patchVnode 阶段进行更深层次的比较

// 4. 特殊处理 input 元素：不同 type 的 input 不认为是相同节点

// 相同的节点
const vnode1 = { key: "a", tag: "div", data: { class: "item" } };
const vnode2 = { key: "a", tag: "div", data: { class: "item updated" } };
// sameVnode(vnode1, vnode2) → true

// 不同的节点
const vnode3 = { key: "a", tag: "div", data: { class: "item" } };
const vnode4 = { key: "b", tag: "div", data: { class: "item" } };
// sameVnode(vnode3, vnode4) → false (key不同)

const vnode5 = { key: "a", tag: "div", data: { class: "item" } };
const vnode6 = { key: "a", tag: "span", data: { class: "item" } };
// sameVnode(vnode5, vnode6) → false (tag不同)
```

:::

### 双端比较

:::code-group

```html [新旧节点]
<!-- 旧：A → B → C → D -->
<!-- 新：D → C → A → B -->

<div id="parent">
  <div key="A">A</div>
  <div key="B">B</div>
  <div key="C">C</div>
  <div key="D">D</div>
</div>
```

```js [1.初始化指针]
// 初始状态指针位置：
// 旧节点: [A, B, C, D]
//         ↑        ↑
//       oldStart oldEnd

// 新节点: [D, C, A, B]
//         ↑        ↑
//       oldStart oldEnd

let oldStartIdx = 0; // 指向 oldChildren[0] = A
let oldEndIdx = 3; // 指向 oldChildren[3] = D
let newStartIdx = 0; // 指向 newChildren[0] = D
let newEndIdx = 3; // 指向 newChildren[3] = B

let oldStartVnode = oldChildren[0]; // A
let oldEndVnode = oldChildren[3]; // D
let newStartVnode = newChildren[0]; // D
let newEndVnode = newChildren[3]; // B

// 当前真实DOM：A B C D
```

```js [第1轮比较]
// 旧头A vs 新头D ❌
// 旧尾D vs 新尾B ❌
// 旧头A vs 新尾B ❌
// 旧尾D vs 新头D ✅ 匹配成功！

// 旧尾D匹配新头D，将D移动到最前面
parentElm.insertBefore(D.el, A.el);

// 移动前：A B C D
// 移动后：D A B C

oldEndIdx--; // (3→2，指向C)
newStartIdx++; // (0→1，指向C)

// 当前指针：
// oldStartIdx = 0;  (指向A)
// oldEndIdx = 2;  (指向C)
// newStartIdx = 1;  (指向C)
// newEndIdx = 3;  (指向B)

// 当前DOM：D A B C
```

```js [第2轮比较]
// 旧头A vs 新头C ❌
// 旧尾C vs 新尾B ❌
// 旧头A vs 新尾B ❌
// 旧尾C vs 新头C ✅ 匹配成功！

// 旧尾C匹配新头C，将C移动到A之前
parentElm.insertBefore(C.el, A.el);

// 移动前：D A B C
// 移动后：D C A B
oldEndIdx--; // (2→1，指向B)
newStartIdx++; // (1→2，指向A)

// 当前指针：
// oldStartIdx = 0; (指向A)
// oldEndIdx = 1; (指向B)
// newStartIdx = 2; (指向A)
// newEndIdx = 3; (指向B)

// 当前DOM：D C A B
```

```js [第3轮比较]
// 旧头A vs 新头A ✅ 匹配成功！

// 旧头A匹配新头A，无需移动，只进行patch更新
patchVnode(A, A);

// 无需移动，DOM保持不变：D C A B

oldStartIdx++; // (0→1，指向B)
newStartIdx++; // (2→3，指向B)

// 当前指针：
// oldStartIdx = 1 (指向B)
// oldEndIdx = 1 (指向B)
// newStartIdx = 3 (指向B)
// newEndIdx = 3 (指向B)

// 当前DOM：D C A B
```

```js [第4轮比较]
// 旧头B vs 新头B ✅ 匹配成功！

// 旧头B匹配新头B，无需移动
patchVnode(B, B);

// 无需移动，DOM保持不变：D C A B

// 指针变化
oldStartIdx++; // (1→2)
newStartIdx++; // (3→4)

// 循环结束
oldStartIdx(2) > oldEndIdx(1); // ✅
newStartIdx(4) > newEndIdx(3); // ✅

// 最终DOM： D C A B ✅
```

:::
要点总结:

1. 指针移动策略
   - 从两端向中间收缩
   - 每次匹配成功移动一对指针
   - 优先处理无需移动 DOM 的情况（情况 1、2）
2. DOM 操作最小化
   - 只有情况 3 和 4 需要移动 DOM
   - 情况 1 和 2 只需更新节点内容
   - 避免不必要的 DOM 重排
3. 算法效率
   - 理想情况（顺序不变）：O(n)，只需情况 1/2 比较
   - 翻转情况（完全逆序）：O(n)，只需情况 3/4 比较
   - 混合情况：在 O(n)基础上进行少量 DOM 移动
4. 实际 DOM 操作计数

   - D 移动到 A 之前（1 次移动）
   - C 移动到 A 之前（1 次移动）
   - A 无需移动（0 次）
   - B 无需移动（0 次）
   - 总移动次数：2 次（而不是重新创建 4 个节点）

5. 边界情况处理:当四种情况都不匹配时，会退回到 key 查找

### Key 查找

当四种双端比较全部失败时会触发 Key 查找机制，通常出现在节点顺序完全打乱的情况。

:::code-group

```js [Key 查找函数实现]
function findIdxByKey(key, oldCh, start, end) {
  // 遍历oldCh查找匹配的key
  for (let i = start; i <= end; i++) {
    const vnode = oldCh[i];
    // 跳过已处理的节点（undefined）
    if (vnode !== undefined && vnode.key === key) {
      return i;
    }
  }
}

// Vue2实际实现更复杂，会建立key到index的映射表
function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  for (let i = beginIdx; i <= endIdx; i++) {
    const key = children[i].key;
    if (key !== undefined) {
      map[key] = i;
    }
  }
  return map; // 例如：{A:0, B:1, C:2, D:3}
}

// 节点移动逻辑简化版
if (idxInOld !== undefined) {
  vnodeToMove = oldCh[idxInOld];

  // patch更新
  patchVnode(vnodeToMove, newStartVnode);

  // 标记已处理
  oldCh[idxInOld] = undefined;

  // 移动到正确位置
  parentElm.insertBefore(vnodeToMove.elm, oldStartVnode.elm);
} else {
  // 创建新节点
  createElm(newStartVnode, parentElm, oldStartVnode.elm);
}
```

```html [新旧节点]
<!-- 旧：A → B → C → D → E (key: a,b,c,d,e) -->
<!-- 新：C → E → B → A → F (key: c,e,b,a,f) // 新增F节点，移除D节点 -->

<div id="parent">
  <div key="a">A</div>
  <div key="b">B</div>
  <div key="c">C</div>
  <div key="d">D</div>
  <div key="e">E</div>
</div>
```

```js [初始状态]
// 初始状态指针位置：
// 旧节点: [A, B, C, D, E]
//         ↑           ↑
//       oldStart    oldEnd

// 新节点: [C, E, B, A, F]
//         ↑           ↑
//       oldStart    oldEnd

let oldStartIdx = 0; // 指向 oldChildren[0] = A
let oldEndIdx = 4; // 指向 oldChildren[3] = E
let newStartIdx = 0; // 指向 newChildren[0] = C
let newEndIdx = 4; // 指向 newChildren[3] = F

let oldStartVnode = oldChildren[0]; // A
let oldEndVnode = oldChildren[4]; // E
let newStartVnode = newChildren[0]; // C
let newEndVnode = newChildren[4]; // F

// 当前真实DOM：A B C D E
```

```js [第一轮比较]
// 旧头A vs 新头C ❌ (key不同: a≠c)
// 旧尾E vs 新尾F ❌ (key不同: e≠f)
// 旧头A vs 新尾F ❌ (key不同: a≠f)
// 旧尾E vs 新头C ❌ (key不同: e≠c)

// 触发 Key 查找：

// 1. 建立key映射表
const oldKeyToIdx = {
  a: 0, // A
  b: 1, // B
  c: 2, // C
  d: 3, // D
  e: 4, // E
};

// 2. 用新开始节点C(key='c')查找
const idxInOld = oldKeyToIdx["c"]; // 找到匹配节点： 旧节点索引2是C

// 将找到的C节点移动到最前面
parentElm.insertBefore(C.el, A.el);
// 标记旧节点C为已处理
oldCh[2] = undefined;

// 真实DOM变化：
// 移动前：A B C D E
// 移动后：C A B D E  (C移动到最前面)

newStartIdx++; // (0→1，指向E)
// 旧节点索引2(C)标记为undefined

// 当前指针：
// oldStartIdx = 0 (指向A)
// oldEndIdx = 4 (指向E)
// newStartIdx = 1 (指向E)
// newEndIdx = 4 (指向F)

// 当前DOM：C A B D E
```

```js [第二轮]
// 旧头A vs 新头E ❌
// 旧尾E vs 新尾F ❌
// 旧头A vs 新尾F ❌
// 旧尾E vs 新头E ✅ 匹配成功！

// 旧尾E匹配新头E，将E移动到A之前
parentElm.insertBefore(E.el, A.el);

// 移动前：C A B D E
// 移动后：C E A B D  (E移动到A之前)

// 当前指针：
// oldStartIdx = 0 (指向A)
// oldEndIdx = 3 (指向D)
// newStartIdx = 2 (指向B)
// newEndIdx = 4 (指向F)

// 当前DOM：C E A B D
```

```js [第三轮]
// 旧头A vs 新头B ❌
// 旧尾D vs 新尾F ❌
// 旧头A vs 新尾F ❌
// 旧尾D vs 新头B ❌

// 用新开始节点B(key='b')查找
const idxInOld = oldKeyToIdx["b"]; // 找到索引1

// 找到匹配节点： 旧节点索引1是B: 将B移动到A之前
parentElm.insertBefore(B.el, A.el);
// 标记旧节点B为已处理
oldCh[1] = undefined;

// 移动前：C E A B D
// 移动后：C E B A D  (B移动到A之前)

newStartIdx++; //(2→3，指向A)
// 旧节点索引1(B)标记为undefined

// 当前指针：
// oldStartIdx = 0 (指向A)
// oldEndIdx = 3 (指向D)
// newStartIdx = 3 (指向A)
// newEndIdx = 4 (指向F)

// 当前DOM：C E B A D
```

```js [第四轮]
// 旧头A vs 新头A ✅ 匹配成功！

// 旧头A匹配新头A，无需移动
patchVnode(A, A);

// DOM保持不变：C E B A D

oldStartIdx++; // (0→1，跳过undefined的B，指向下一个非undefined)
newStartIdx++; // (3→4，指向F)

// 由于oldCh[1]是undefined，继续向后查找：
while (oldStartIdx <= oldEndIdx && oldCh[oldStartIdx] === undefined) {
  oldStartIdx++;
}
// oldStartIdx 变为 2（指向C，但C已经是undefined，继续）
// oldStartIdx 变为 3（指向D）

// 当前指针：
// oldStartIdx = 3 (指向D)
// oldEndIdx = 3 (指向D)
// newStartIdx = 4 (指向F)
// newEndIdx = 4 (指向F)

// 当前DOM：C E B A D
```

```js [第五轮]
// 旧头D vs 新头F ❌
// 旧尾D vs 新尾F ❌
// 旧头D vs 新尾F ❌
// 旧尾D vs 新头F ❌

// 触发 Key 查找：用新开始节点F(key='f')查找
const idxInOld = oldKeyToIdx["f"]; // undefined，找不到
// 找不到匹配节点 ⇒ 创建新节点: 创建F节点并插入到D之前
const newF = createElm(F);
parentElm.insertBefore(newF, D.el);

// 创建前：C E B A D
// 创建后：C E B A F D  (F插入到D之前)

newStartIdx++; // (4→5)

// 当前指针：
// oldStartIdx = 3 (指向D)
// oldEndIdx = 3 (指向D)
// newStartIdx = 5 (超出范围)
// newEndIdx = 4 (指向F)

// 当前DOM：C E B A F D

// 此时:
// 不满足  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx)退出循环 。
// 新节点已处理完，但旧节点还有剩余 ⇒ 进行 节点剩余处理
```

:::

### 剩余节点处理

:::code-group

```js [剩余节点处理逻辑]
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // ...忽略其他代码

  // 剩余节点处理  // [!code hl]
  if (oldStartIdx > oldEndIdx) {
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx,
      newEndIdx,
      insertedVnodeQueue
    );
  } else if (newStartIdx > newEndIdx) {
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

```js [新增剩余节点]
function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx) {
  for (let i = startIdx; i <= endIdx; ++i) {
    const ch = vnodes[i];
    if (ch != null) {
      // 创建真实DOM并插入
      parentElm.insertBefore(createElm(ch), refElm);
    }
  }
}

// 在updateChildren函数中
if (oldStartIdx > oldEndIdx) {
  // 新节点有剩余，需要新增
  const refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
  addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
}
```

```js [删除剩余节点]
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (let i = startIdx; i <= endIdx; ++i) {
    const ch = vnodes[i];
    if (ch != null) {
      // 从父节点移除
      parentElm.removeChild(ch.elm);
    }
  }
}

// 在updateChildren函数中
if (newStartIdx > newEndIdx) {
  // 旧节点有剩余，需要删除
  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
}
```

:::

#### 批量新增节点

`refElm` 是一个真实 DOM 元素，用作新节点插入时的位置参考点。它告诉算法："将新节点插入到这个参考节点之前"。

```js [refElm]
// 计算 refElm 的公式
const refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
// 分解：
// 1. newEndIdx: 新节点数组中当前处理的结束索引
// 2. newEndIdx + 1: 新节点数组中紧跟在当前处理范围后面的第一个节点
// 3. newCh[newEndIdx + 1]: 这个节点对象（如果存在）
// 4. newCh[newEndIdx + 1].elm: 这个节点对应的真实DOM元素

// 旧节点: [A, B, C]
// 新节点: [A, B, C, D, E]

// 双端比较结束后：
// oldStartIdx = 3, oldEndIdx = 2  // 旧节点处理完
// newStartIdx = 3, newEndIdx = 4  // 新节点D、E未处理

// 计算 refElm：
newCh[newEndIdx + 1] = newCh[5]; // undefined
// ⇒ refElm = null 在末尾添加
```

:::code-group

```html [新旧节点]
<!-- 旧：A → B → C -->
<!-- 新：A → B → C → D → E -->
<div id="parent">
  <div key="A">A</div>
  <div key="B">B</div>
  <div key="C">C</div>
</div>
```

```js [处理过程]
//
// 1.初始状态 指针位置：
// oldStartIdx = 0 (指向A) oldEndIdx = 2 (指向C)
// newStartIdx = 0 (指向A) newEndIdx = 4 (指向E)
// 当前DOM：A B C

// 2.处理过程：
// A匹配A → 指针移动
// B匹配B → 指针移动
// C匹配C → 指针移动

// 3.处理后的状态： 指针位置：
// oldStartIdx = 3 (> oldEndIdx=2，循环结束)
// newStartIdx = 3 (指向D) newEndIdx = 4 (指向E)
// 当前DOM：A B C (未变化)

// 4.检查剩余情况

// 循环结束后检查
if (oldStartIdx > oldEndIdx) {
  // 新节点有剩余：需要新增D、E
  const refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
  for (let i = newStartIdx; i <= newEndIdx; i++) {
    createElm(newCh[i], parentElm, refElm);
  }
}
```

```js [新增剩余节点]
// 1.找到参考节点：refElm = newCh[newEndIdx + 1]?.elm

// 这里 newEndIdx + 1 = 5，超出范围，所以 refElm = null
// 当 refElm 为 null 时，使用 appendChild

// 2.创建并插入新节点： D F

// 创建 D 节点
const nodeD = document.createElement("div");
nodeD.textContent = "D";
nodeD.setAttribute("key", "D");
parentElm.appendChild(nodeD); // refElm为null，添加到末尾

// 创建 E 节点
const nodeE = document.createElement("div");
nodeE.textContent = "E";
nodeE.setAttribute("key", "E");
parentElm.appendChild(nodeE); // 添加到末尾

// 真实DOM变化过程：
// 初始状态：A B C
// 添加D后：A B C D
// 添加E后：A B C D E
// 最终结果：A B C D E
```

:::

#### 批量删除节点

:::code-group

```html [新旧节点]
<!-- 旧：A → B → C → D → E -->
<!-- 新：A → C → E -->
<div id="parent">
  <div key="A">A</div>
  <div key="B">B</div>
  <div key="C">C</div>
  <div key="D">D</div>
  <div key="E">E</div>
</div>
```

```js [处理过程]
// 1.初始状态 指针位置：
// newStartIdx = 0 (指向A) newEndIdx = 2 (指向E)
// oldStartIdx = 0 (指向A) oldEndIdx = 4 (指向E)
// 当前DOM：A B C D E

// 2.处理过程：
// 旧头A vs 新头A ✅ 匹配
patchVnode(A, A);
oldStartIdx++; // 0→1
newStartIdx++; // 0→1

// oldStartIdx = 1 (指向B) oldEndIdx = 4 (指向E)
// newStartIdx = 1 (指向C) newEndIdx = 2 (指向E)
// DOM状态： A B C D E

// 第3步：处理 B、C（使用key查找）

// B节点处理：
// 四种匹配都不成功
// key查找：新节点中没有B
// B被标记为undefined（在key查找时跳过）

// C节点处理：
// 通过key查找找到C
// 将C移动到B的位置
// oldCh[2]是C，移动到oldStartVnode(B)之前
parentElm.insertBefore(C.el, B.el);
oldCh[2] = undefined; // 标记C为已处理

// 移动前：A B C D E
// 移动后：A C B D E  (C移动到B前面)

// 旧尾E vs 新尾E ✅ 匹配
patchVnode(E, E);
oldEndIdx--; // 4→3
newEndIdx--; // 2→1

// oldStartIdx = 1 (指向B，但B已标记undefined，继续后移)
// → 2 (指向undefined的C，继续后移)
// → 3 (指向D)
// oldEndIdx = 3 (指向D)
// newStartIdx = 1 (指向C) newEndIdx = 1 (指向C)

// 此时 newStartIdx(1) > newEndIdx(1) ✅ 新节点处理完成
// 但 oldStartIdx(3) <= oldEndIdx(3) ✅ 旧节点还有剩余
// DOM状态： A C B D E
```

```js [删除剩余节点]
// 删除剩余旧节点：B、D
if (oldStartIdx <= oldEndIdx) {
  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
}

// 删除过程：
// B节点：已被标记undefined，但DOM中仍然存在
// 从父节点中移除
parentElm.removeChild(B.el);

// D节点： 在oldCh[3]位置
// 从父节点中移除
parentElm.removeChild(D.el);

// 初始状态：A B C D E
// C移动后： A C B D E
// 删除B后： A C D E
// 删除D后： A C E
// 最终结果：A C E
```

:::

## 总结

::: tip 核心渲染流程概览
`模板/渲染函数 → 响应式数据绑定 → 虚拟DOM → 真实DOM → 异步批量更新`
:::

### 编译三大阶段

:::code-group

```js [编译阶段]
// 模板 → 渲染函数
// <template> → parse → AST → optimize → generate → render function

// 1. Parse：模板解析为 AST（抽象语法树）
// 2. Optimize：静态标记（优化关键，标记静态节点）
// 3. Generate：生成渲染函数代码

// 模板
<div id="app">{{ message }}</div>;

// 编译后的渲染函数
function render() {
  with (this) {
    return _c("div", { attrs: { id: "app" } }, [_v(_s(message))]);
  }
}
```

```js [响应式阶段]
// 数据响应式建立
// data → Observer → defineReactive → Dep → Watcher

// 1. Observer：递归遍历对象属性，转换为响应式
// 2. Dep：依赖收集器，每个属性对应一个 Dep
// 3. Watcher：观察者，连接数据变化和视图更新

// 数据劫持
Object.defineProperty(obj, key, {
  get() {
    // 依赖收集：Dep.target && dep.depend()
    return val;
  },
  set(newVal) {
    // 触发更新：dep.notify()
    val = newVal;
  },
});
```

```js [ 渲染阶段 ]
// 虚拟DOM → 真实DOM
// render function → VNode tree → patch → real DOM

// 1. render()：执行渲染函数，生成 VNode 树
// 2. patch()：比较新旧 VNode，更新 DOM
// 3. diff算法：最小化 DOM 操作

// 当视图依赖的多个响应式数据变化时，也只会触发一次渲染更新
// 异步更新队列：nextTick → flushSchedulerQueue
watcher.update = function () {
  queueWatcher(this);
};

function queueWatcher(watcher) {
  if (!has[watcher.id]) {
    queue.push(watcher);
    has[watcher.id] = true;
    nextTick(flushSchedulerQueue);
  }
}
```

:::

### 虚拟 DOM 与 Diff 算法

VNode 结构:

```js
class VNode {
  constructor(tag, data, children, text, elm, context, componentOptions) {
    this.tag = tag; // 标签名
    this.data = data; // 属性、样式、事件等
    this.children = children; // 子节点
    this.text = text; // 文本内容
    this.elm = elm; // 对应的真实 DOM
    this.context = context; // 组件上下文
    this.key = data && data.key; // 优化 key
    this.isStatic = false; // 是否为静态节点
  }
}
```

Diff 算法核心：双端比较

```js
// 四种匹配情况
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
  // 1. 旧头 vs 新头
  if (sameVnode(oldStartVnode, newStartVnode)) {
    patchVnode(oldStartVnode, newStartVnode);
    oldStartIdx++;
    newStartIdx++;
  }
  // 2. 旧尾 vs 新尾
  else if (sameVnode(oldEndVnode, newEndVnode)) {
    patchVnode(oldEndVnode, newEndVnode);
    oldEndIdx--;
    newEndIdx--;
  }
  // 3. 旧头 vs 新尾
  else if (sameVnode(oldStartVnode, newEndVnode)) {
    patchVnode(oldStartVnode, newEndVnode);
    // 移动 DOM：旧头移动到旧尾之后
    parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling);
    oldStartIdx++;
    newEndIdx--;
  }
  // 4. 旧尾 vs 新头
  else if (sameVnode(oldEndVnode, newStartVnode)) {
    patchVnode(oldEndVnode, newStartVnode);
    // 移动 DOM：旧尾移动到旧头之前
    parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm);
    oldEndIdx--;
    newStartIdx++;
  }
  // 5. key查找（四种都不匹配）
  else {
    // 建立 key → index 映射表
    // 查找可复用节点，移动或创建
  }
}
```

Diff 算法的三种情况处理：

|     情况     |        操作         | 时间复杂度 |
| :----------: | :-----------------: | :--------: |
|   顺序相同   | 顺序比较，无需移动  |    O(n)    |
| 顺序部分变化 | 双端比较 + key 查找 |    O(n)    |
|   完全乱序   |    key 映射查找     |    O(n)    |

### 性能优化策略

:::code-group

```js [静态节点优化]
// 编译阶段标记静态节点
{
  isStatic: true,      // 静态节点标记
  isOnce: false,       // v-once 标记
  staticInFor: false   // 在 v-for 中的静态节点
}

// patch 阶段跳过静态节点比较
function patchVnode() {
  if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm;
    vnode.componentInstance = oldVnode.componentInstance;
    return; // 直接复用，跳过比较
  }
}
```

```js [异步更新队列]
// 数据变化合并为一次更新
function queueWatcher(watcher) {
  const id = watcher.id;

  // 去重：同一个 watcher 只添加一次
  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // 正在刷新，按顺序插入
      let i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }

    // 使用 nextTick 延迟执行
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}
```

```js [计算属性缓存]
// 计算属性依赖缓存
const computedWatcherOptions = { lazy: true };

function initComputed(vm, computed) {
  const watchers = (vm._computedWatchers = Object.create(null));

  for (const key in computed) {
    const getter = computed[key];

    // 创建计算属性 watcher，lazy: true 表示延迟求值
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );

    // 定义计算属性到 vm 上
    defineComputed(vm, key, userDef);
  }
}
```

:::

### 平台抽象与跨平台

平台相关 API 抽象：

```js
// nodeOps：平台无关的 DOM 操作接口
const nodeOps = {
  createElement: (tag) => document.createElement(tag),
  createTextNode: (text) => document.createTextNode(text),
  insertBefore: (parent, child, ref) => parent.insertBefore(child, ref),
  removeChild: (parent, child) => parent.removeChild(child),
  // ...
};

// 不同平台实现
- Web平台：使用 document API
- Weex平台：使用 Weex 原生 API
- SSR平台：不操作真实 DOM
- 测试平台：Mock 实现
```

模块系统:

```js
// 平台特定模块
const platformModules = [
  attrs, // 属性处理
  klass, // class 处理
  events, // 事件处理
  domProps, // DOM 属性
  style, // 样式处理
  transition, // 过渡动画
];

// 核心模块
const coreModules = [
  ref, // ref 引用
  directives, // 指令系统
];
```

### 最佳实践

:::code-group

```js [模板优化]
// 推荐做法
<template>
  <!-- 使用 key 提升 diff 效率 -->
  <div v-for="item in list" :key="item.id">{{ item.name }}</div>

  <!-- 静态内容使用 v-once -->
  <div v-once>{{ staticContent }}</div>

  <!-- 避免深层嵌套 -->
  <component :is="currentComponent" />
</template>
```

```js [数据优化]
// 推荐做法
export default {
  data() {
    return {
      // 扁平化数据结构
      user: { id: 1, name: "John" },

      // 大数组使用 Object.freeze() 避免响应式开销
      largeList: Object.freeze(bigArray),
    };
  },

  computed: {
    // 使用计算属性缓存
    filteredList() {
      return this.list.filter((item) => item.active);
    },
  },

  methods: {
    // 避免在模板中直接调用方法
    getFormattedDate() {
      // 改为计算属性
    },
  },
};
```

```js [ 组件设计]
// 推荐做法
export default {
  name: "OptimizedComponent",

  // 使用函数式组件提升性能
  functional: false, // 根据需求设置

  // 合理使用生命周期
  beforeDestroy() {
    // 清理定时器、事件监听等
  },

  // 使用异步组件懒加载
  components: {
    "heavy-component": () => import("./HeavyComponent.vue"),
  },

  // 合理使用 keep-alive
  // 在父组件中：<keep-alive><component /></keep-alive>
};
```

:::

### 核心要点

:::tip 渲染三大支柱
`响应式系统`：数据变化自动触发更新

`虚拟DOM`：JavaScript 对象描述 DOM，diff 算法优化更新

`组件系统`：可复用、可组合的代码单元
:::

:::tip 性能核心
`异步更新队列`：合并多次数据变化为一次渲染

`静态节点优化`：编译时标记，运行时跳过

`高效的diff算法`：双端比较 + key 优化
:::

Vue2 的视图渲染机制在简洁性、性能和开发体验之间取得了很好的平衡。

虽然 Vue3 在某些方面有改进，但 Vue2 的设计依然经典，理解其渲染机制对于深入理解前端框架工作原理具有重要意义。
