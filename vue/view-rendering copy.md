<script setup>
    import VueFeatures from '@components/vue-features/VueFeatures.vue'
</script>

# 视图渲染

VueJs 有 `完整` 和 `运行时` 两个版本。

完整版本包含**编译器**，可在运行时编译模板，运行时版 不包含编译器，需要**预编译**。

从简单到复杂，按需使用、逐步集成，根据你的需求引入不同版本。这也是[渐进式框架](/vue/progressive.md)的体现。

## 测试用例

本章案例使用 CDN 引入完整版 JS，对模板进行运行时编译。父组件使用`Vue.component`的方式全局注册的子组件。接下来让我们开始探索 VueJs 的渲染流程。

<VueFeatures />

案例涉及的 Vue 核心特性有：

1. vue 内置指令
   - [v-pre](/vue/directive.md#v-pre)、[v-once](/vue/directive.md#v-once)、[v-bind](/vue/directive.md#v-bind)、[v-on](/vue/directive.md#v-on)、[v-model](/vue/directive.md#v-model)、[v-show](/vue/directive.md#v-show)、[v-if](/vue/directive.md#v-if)、[v-for](/vue/directive.md#v-for)
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

在本节我们主要关注 在`模板编译`后生成 `AST 语法树`以及渲染函数`render`后 进行的**首次渲染**

## 源码流程

### 初始化阶段

从`加载vuejs` 到 `new vue`开启流程前的初始化阶段，对于**模板渲染**流程会做一些准备工作：

::: code-group

```js [ 加载 VueJs ]
var ASSET_TYPES = ["component", "directive", "filter"];
// 初始化全局 API 的核心函数
function initGlobalAPI(Vue) {
  // 忽略其他代码

  // 设置基础构造函数引用，用于 Vue.extend()
  Vue.options._base = Vue;

  initExtend(Vue); // 定义 Vue.extend() // [!code hl]

  initAssetRegisters(Vue); // 定义 Vue.component(), Vue.directive(), Vue.filter() // [!code hl]
}
function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    // @ts-expect-error function is not exact same type
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        /* istanbul ignore if */
        if (type === "component") {
          validateComponentName(id);
        }
        if (type === "component" && isPlainObject(definition)) {
          // @ts-expect-error
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && isFunction(definition)) {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}

function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
function renderMixin(Vue) {
  installRenderHelpers(Vue.prototype);
  Vue.prototype.$nextTick = function (fn) {};
  Vue.prototype._render = function () {};
}
renderMixin();
```

```js [vue.component]

```

```js [initRender]
// 在 _init 中会调用 initRender 方法，该方法会初始化渲染相关的属性和方法
function initRender(vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = (vm.$vnode = options._parentVnode); // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode
    ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
    : emptyObject;
  vm._c = function (a, b, c, d) {
    // [!code hl]
    return createElement(vm, a, b, c, d, false);
  };
  vm.$createElement = function (a, b, c, d) {
    // [!code hl]
    return createElement(vm, a, b, c, d, true);
  };

  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive(
      vm,
      "$attrs",
      (parentData && parentData.attrs) || emptyObject,
      function () {
        !isUpdatingChildComponent && warn$2("$attrs is readonly.", vm);
      },
      true
    );
    defineReactive(
      vm,
      "$listeners",
      options._parentListeners || emptyObject,
      function () {
        !isUpdatingChildComponent && warn$2("$listeners is readonly.", vm);
      },
      true
    );
  }
}
```

:::

### 运行时阶段

通过 `new vue` 构造函数调用`_init()`方法创建 Vue 实例时：
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

### render 阶段

### update 阶段

## 渲染 watcher

在生成`render`、`staticRenderFns`函数后，在组件挂载阶段会创建一个**渲染 watcher**。

Watcher 构造函数为:`function Watcher(vm, expOrFn, cb, options, isRenderWatcher)`。创建 **渲染 Watcher** 的参数为:

1. `vm`：当前 Vue 组件实例，Watcher 会持有这个实例引用，用于访问组件数据和方法。
2. `expOrFn`：Watcher 的 getter 函数。
3. `cb`：noop，空函数。视图更新已在 updateComponent 中处理。
4. `isRenderWatcher`：true，标记这是一个渲染 Watcher。

核心为 **expOrFn** 的定义:

```js
var updateComponent = function () {
  vm._update(vm._render(), hydrating);
};
```

`updateComponent`会被赋值给渲染 Watcher 的 getter 函数

代码继续执行触发渲染 Watcher 的 `get` 方法。

```js [get]
class Watcher {
  // 忽略其他代码...
  get() {
    // 设置当前watcher为依赖收集目标
    pushTarget(this); // Dep.target = 渲染watcher // [!code hl]
    const vm = this.vm;
    //  执行 updateComponent 函数
    this.getter.call(vm, vm);
    // 等价于：value = updateComponent.call(vm, vm);
    // 也就是执行：vm._update(vm._render(), hydrating)
  }
}
```

## \_render

其中需要我们注意的有:

1. `var render = _a.render;` 渲染函数有三种来源:
   - 模板编译生成的渲染函数
   - 用户手动编写的 render 函数
   - 函数式组件的 render 函数
2. `var _parentVnode = _a._parentVnode;`父组件的虚拟节点，用于：
   - 确定组件层级关系
   - 处理插槽和作用域插槽
   - 根组件的 \_parentVnode 为 null

其中 `vm._renderProxy`为渲染代理对象

在 Vue 实例初始化时 `initProxy`设置

- 开发环境：使用 Proxy 包装，提供更好的错误提示
- 生产环境或不支持 Proxy：直接使用 vm

生成的 render 函数为：

```js
function() {
      with(this) {
        return _c('div',
          { attrs: { id: "app" } },
          [
            _c('p', [_v(_s(countStr))]),    // 访问computed: countStr
            _c('button', { on: { click: function($event) { count++ } } }, [_v("点击 +1")])
          ]
        )
      }
    }
```

### VNode 类型分类

```js
// 1. 元素节点
const elementVNode = new VNode(
  "div",
  { attrs: { id: "app" } },
  [childVNodes],
  undefined,
  undefined,
  vm
);

// 2. 文本节点
const textVNode = new VNode(
  undefined,
  undefined,
  undefined,
  "Hello World",
  undefined,
  vm
);

// 3. 注释节点
const commentVNode = new VNode();
commentVNode.text = " 注释内容 ";
commentVNode.isComment = true;

// 4. 组件节点
const componentVNode = new VNode(
  "MyComponent",
  { props: { msg: "Hello" } },
  undefined,
  undefined,
  undefined,
  vm,
  {
    Ctor: MyComponent,
    propsData: { msg: "Hello" },
    listeners: { "custom-event": handler },
  }
);

// 5. 异步组件占位符
const asyncVNode = new VNode(
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  () => import("./AsyncComponent.vue")
);
asyncVNode.isAsyncPlaceholder = true;
```

常见情况

::: code-group

```js [普通HTML元素]
// 模板：<div id="app" class="container">Hello</div>
// 编译后：
_c('div',
  {
    attrs: { id: "app" },
    staticClass: "container"
  },
  [_v("Hello")]
)

// _createElement 执行过程：
// 1. tag = 'div' (string)
// 2. config.isReservedTag('div') → true
// 3. 创建普通VNode
vnode = new VNode('div', data, [_v("Hello")], ...);
```

```js [动态组件]
// 模板：<component :is="currentView"></component>
// 编译后：
_c(data.is, data, children); // data中包含is属性

// _createElement 执行过程：
// 1. 检查 data.is → tag = data.is（动态设置tag）
// 2. 假设currentView = "HomePage"
// 3. tag = "HomePage" (string)
// 4. resolveAsset查找组件 → 找到HomePage组件
// 5. createComponent(HomePageCtor, ...)
```

```js [组件]
// 模板：<my-button @click="handleClick">确定</my-button>
// 编译后：
_c("my-button", { on: { click: handleClick } }, [_v("确定")]);

// _createElement 执行过程：
// 1. tag = 'my-button' (string)
// 2. config.isReservedTag('my-button') → false
// 3. resolveAsset查找'my-button'组件 → 找到
// 4. createComponent(MyButtonCtor, data, ...)
```

```js [带key的v-for列表项]
// 模板：<li v-for="item in items" :key="item.id">{{item.name}}</li>
// 编译后：
_c(
  "li",
  { key: item.id }, // key必须是原始值
  [_v(_s(item.name))]
);

// _createElement 执行过程：
// 1. 检查data.key → item.id（假设是数字）
// 2. isPrimitive(item.id) → true（数字是原始值）
// 3. 继续执行，不会警告
```

:::

生成 VNode 虚拟节点后，我们来看如何渲染 VNode 生成真实 DOM。

## **patch**

Vue 的 patch 系统采用模块化设计

通过组合不同的模块处理不同功能

createPatchFunction 是 Vue 虚拟 DOM 系统的核心工厂函数，采用 "高阶函数 + 模块化插件" 的设计模。

## 首次渲染

### 流程图

```text
模板编译阶段（仅完整版需要）
    ↓
new Vue() 实例化
    ↓
vm._init() 初始化
    ├── initLifecycle(vm)
    ├── initEvents(vm)
    ├── initRender(vm)         ← 初始化 $createElement 等
    ├── callHook(vm, 'beforeCreate')
    ├── initInjections(vm)
    ├── initState(vm)          ← 关键：数据响应式处理
    │   ├── initProps()
    │   ├── initMethods()
    │   ├── initData()
    │   ├── initComputed()
    │   └── initWatch()
    ├── initProvide(vm)
    └── callHook(vm, 'created')
        ↓
$mount(el) 挂载
    ↓
模板编译（运行时编译版本）
    ↓
mountComponent() 挂载组件
    ↓
callHook(vm, 'beforeMount')
    ↓
创建渲染Watcher ← 核心连接点
    ↓
Watcher.get() 立即执行
    ├── pushTarget(watcher)     ← 设置 Dep.target
    ├── updateComponent()       ← 执行更新函数
    │   ├── vm._render()        ← 生成虚拟DOM
    │   │   └── render.call(vm._renderProxy) 执行渲染函数
    │   │       └── 访问响应式数据 → 触发getter → dep.depend() 收集依赖
    │   └── vm._update(vnode)   ← 更新DOM
    │       └── patch()         ← 核心patch算法
    │           ├── createElm() ← 创建真实DOM
    │           └── invokeInsertHook() ← 调用插入钩子
    ├── popTarget()             ← 清除 Dep.target
    └── cleanupDeps()           ← 清理旧依赖
        ↓
hydrating = false               ← 标记客户端渲染完成
    ↓
vm.$vnode == null 检查
    ↓
vm._isMounted = true            ← 标记已挂载
    ↓
callHook(vm, 'mounted')         ← 调用mounted钩子
```

## 更新渲染

对于数据变化，触发渲染 watcher 的回调函数，执行 updateComponent 方法，进而触发 vm.\_render() 和 vm.\_update()。

:::code-group

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
   *
   * patch算法遵循以下原则：
   * 1. 同层比较：只比较同一层级的节点，不跨层级比较
   * 2. 深度优先：递归处理子节点
   * 3. 双端比较：列表节点使用双端比较算法
   * 4. 就地复用：相同key的节点尽量复用DOM
   */
  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    // ==================== 情况1：新VNode为空（销毁场景） ====================
    /**
     * 场景：组件销毁、v-if条件为false、父组件移除子组件
     * 示例：<div v-if="false"></div> 当条件为false时
     *
     * 逻辑：如果新VNode不存在，但旧VNode存在，则需要销毁旧节点
     */
    if (isUndef(vnode)) {
      // vnode为undefined/null，表示需要销毁旧节点
      if (isDef(oldVnode))
        // 调用销毁钩子，清理指令、事件监听器等资源
        invokeDestroyHook(oldVnode);
      return;
    }
    // ==================== 初始化变量 ====================
    var isInitialPatch = false; // 是否为初始patch（首次挂载）
    var insertedVnodeQueue = []; // 待执行的插入钩子队列
    // ==================== 情况2：旧VNode为空（首次挂载） ====================
    /**
     * 场景：组件首次渲染、动态创建组件、keep-alive组件激活
     * 逻辑：没有旧节点，直接创建新节点
     */
    if (isUndef(oldVnode)) {
      isInitialPatch = true; // 标记为初始patch
      createElm(vnode, insertedVnodeQueue); // 创建新元素及其子元素，构建完整的DOM树
    } else {
      // ==================== 情况3：新旧VNode都存在（更新场景） ====================
      /**
       * 场景：响应式数据变化、条件渲染切换、列表更新等
       */

      // 判断oldVnode是否是真实DOM元素（首次挂载到现有DOM）
      var isRealElement = isDef(oldVnode.nodeType);
      // ==================== 情况3.1：相同VNode，进行精细化patch ====================
      /**
       * sameVnode条件：
       * 1. key相同（如果都有key）
       * 2. 标签名相同
       * 3. 都是注释节点或都不是
       * 4. 数据对象都存在或都不存在
       * 5. 对于input元素，type必须相同
       *
       * 这是性能优化的关键：80%的更新走这个快速路径
       */
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
      } else {
        // ==================== 情况3.2：完全不同节点，需要替换 ====================
        /**
         * 场景：
         * 1. 标签名不同（div -> span）
         * 2. key不同（列表重新排序）
         * 3. 从真实DOM挂载（首次渲染）
         */
        // ==================== 子情况3.2.1：挂载到真实DOM元素 ====================
        /**
         * 场景：new Vue({ el: '#app' }) 首次挂载
         * oldVnode是真实的DOM元素，不是VNode
         */
        if (isRealElement) {
          // 检查是否是服务端渲染的内容，是否可以成功激活
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            // 服务端渲染标记：data-server-rendered="true"
            oldVnode.removeAttribute(SSR_ATTR); // 移除标记
            hydrating = true; // 开启激活模式
          }
          if (isTrue(hydrating)) {
            // 尝试激活：复用服务端生成的DOM，只绑定事件和数据
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              // 激活成功
              invokeInsertHook(vnode, insertedVnodeQueue, true); // 调用插入钩子
              return oldVnode;
            } else {
              // 激活失败：客户端和服务端HTML结构不匹配
              warn$2(
                "The client-side rendered virtual DOM tree is not matching  ..."
              );
              // 回退到客户端完整渲染
            }
          }
          // 不是服务端渲染，或激活失败｜ 创建一个空节点来替换它
          oldVnode = emptyNodeAt(oldVnode);
        }
        // ==================== 子情况3.2.2：替换现有元素 ====================
        /**
         * 现在oldVnode一定是VNode（经过emptyNodeAt转换）
         * 执行完全替换：创建新元素，插入DOM，移除旧元素
         */

        var oldElm = oldVnode.elm; // 旧DOM元素
        var parentElm = nodeOps.parentNode(oldElm); // 父元素
        // 创建新节点
        createElm(
          vnode, // 新VNode
          insertedVnodeQueue, // 插入钩子队列
          // 极端边缘情况：如果旧元素正在离开过渡，不要立即插入
          // 仅发生在transition + keep-alive + 高阶组件组合时
          oldElm._leaveCb ? null : parentElm, // 父元素（特殊情况为null）
          nodeOps.nextSibling(oldElm) // 插入位置：在旧元素之前
        );

        /**
         * 当根组件被替换时（如动态组件切换），需要更新祖先组件的$el引用
         * 示例：<component :is="currentComponent">
         * 切换组件时，需要更新父组件的DOM引用
         */
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent; // 从父节点开始
          var patchable = isPatchable(vnode); // 是否可patch（有真实DOM）
          while (ancestor) {
            // 清理祖先组件的旧资源
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor); // 调用模块的destroy钩子
            }
            // 更新祖先的DOM引用为新的根元素
            ancestor.elm = vnode.elm;
            if (patchable) {
              // 祖先组件有真实DOM（可patch）
              // 重新调用create钩子（attrs、class、style等模块）
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
          // 有父元素，从DOM中移除旧节点
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          // 没有父元素，但oldVnode有tag（特殊情况）  直接调用销毁钩子清理资源
          invokeDestroyHook(oldVnode);
        }
      }
    }
    // ==================== 执行插入钩子 ====================
    /**
     * 插入钩子包括：
     * 1. 指令的inserted钩子
     * 2. 组件的mounted钩子
     * 3. transition的enter钩子
     *
     * 为什么最后统一调用？
     * - 确保所有DOM操作完成后再执行钩子
     * - 避免钩子执行时DOM状态不一致
     */
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    // ==================== 返回新DOM元素 ====================
    /**
     * 返回新创建或更新的DOM元素
     * 这是组件$el属性的来源
     */
    return vnode.elm;
  };
}
```

```js [sameVnode]
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    a.asyncFactory === b.asyncFactory &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error)))
  );
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");

function sameInputType(a, b) {
  if (a.tag !== "input") return true;
  var i;
  var typeA = isDef((i = a.data)) && isDef((i = i.attrs)) && i.type;
  var typeB = isDef((i = b.data)) && isDef((i = i.attrs)) && i.type;
  return typeA === typeB || (isTextInputType(typeA) && isTextInputType(typeB));
}
```

:::

### 精细化更新

:::code-group

```js [patchVnode]
/**
 * 虚拟节点更新函数 - Vue diff算法的核心
 * 负责更新两个相同节点(oldVnode和vnode)的差异
 *
 * @param {VNode} oldVnode - 旧虚拟节点
 * @param {VNode} vnode - 新虚拟节点
 * @param {Array} insertedVnodeQueue - 插入队列，用于收集需要执行insert钩子的组件
 * @param {Array} ownerArray - 父节点的children数组（用于vnode重用优化）
 * @param {number} index - 当前节点在ownerArray中的索引
 * @param {boolean} removeOnly - 特殊标志，用于<transition-group>
 */
function patchVnode(
  oldVnode,
  vnode,
  insertedVnodeQueue,
  ownerArray,
  index,
  removeOnly
) {
  // ========== 1. 快速路径：完全相同，无需更新 ==========
  if (oldVnode === vnode) {
    return; // 同一个对象引用，直接返回
  }
  // ========== 2. 克隆重用的vnode（优化场景）==========
  if (isDef(vnode.elm) && isDef(ownerArray)) {
    // 场景：在updateChildren中，vnode是从ownerArray中复用的
    // 需要克隆以避免多个vnode引用同一个elm导致的副作用
    vnode = ownerArray[index] = cloneVNode(vnode);
  }
  // ========== 3. 复用DOM元素 ==========
  // 复用旧节点的DOM元素（这是diff算法的核心优化）
  var elm = (vnode.elm = oldVnode.elm);
  // ========== 4. 处理异步组件占位符 ==========
  if (isTrue(oldVnode.isAsyncPlaceholder)) {
    // 异步组件加载完成
    if (isDef(vnode.asyncFactory.resolved)) {
      hydrate(oldVnode.elm, vnode, insertedVnodeQueue); // 激活异步组件
    } else {
      // 异步组件仍在加载，保持占位符状态
      vnode.isAsyncPlaceholder = true;
    }
    return;
  }
  // ========== 5. 静态节点优化 ==========
  /**
   * 静态节点：不会改变的内容，可以完全复用
   * 条件：
   * 1. 新旧节点都是静态节点 (isStatic)
   * 2. key相同
   * 3. 新节点是克隆的或一次性节点 (isOnce)
   */
  if (
    isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    vnode.componentInstance = oldVnode.componentInstance; // 完全复用组件实例和DOM
    return; // 静态节点无需进一步处理
  }

  // ========== 6. 执行 prepatch 钩子 ==========
  var i;
  var data = vnode.data;
  if (isDef(data) && isDef((i = data.hook)) && isDef((i = i.prepatch))) {
    i(oldVnode, vnode); // 组件prepatch生命周期
  }
  // ========== 7. 获取新旧子节点 ==========
  var oldCh = oldVnode.children;
  var ch = vnode.children;
  // ========== 8. 更新属性和事件 ==========
  // isPatchable 找到组件根标签
  if (isDef(data) && isPatchable(vnode)) {
    // 执行所有更新模块（class、style、events、attrs等）
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
    // 执行组件的update钩子
    if (isDef((i = data.hook)) && isDef((i = i.update))) i(oldVnode, vnode);
  }
  // ========== 9. 核心：处理子节点更新 ==========
  // 新节点不是文本节点
  if (isUndef(vnode.text)) {
    // 新旧都有子节点
    if (isDef(oldCh) && isDef(ch)) {
      if (oldCh !== ch)
        // 最复杂的情况：双端diff算法
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      // 如果只有新节点有子节点
    } else if (isDef(ch)) {
      {
        // 开发环境检查key重复
        checkDuplicateKeys(ch);
      }
      // 清空旧文本内容（如果存在）
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
      // 添加新子节点
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      // 只有旧节点有子节点
    } else if (isDef(oldCh)) {
      // 移除所有旧子节点
      removeVnodes(oldCh, 0, oldCh.length - 1);
      // 旧节点是文本节点
    } else if (isDef(oldVnode.text)) {
      // 清空文本内容
      nodeOps.setTextContent(elm, "");
    }
    // 新节点是文本节点且文本改变
  } else if (oldVnode.text !== vnode.text) {
    // 更新文本内容
    nodeOps.setTextContent(elm, vnode.text);
  }
  // ========== 10. 执行postpatch钩子 ==========
  if (isDef(data)) {
    if (isDef((i = data.hook)) && isDef((i = i.postpatch))) i(oldVnode, vnode); // 组件postpatch生命周期
  }
}
```

```js [componentVNodeHooks]
var componentVNodeHooks = {
  init: function (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ));
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = (vnode.componentInstance = oldVnode.componentInstance);
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },
  insert: function (vnode) {
    var context = vnode.context,
      componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },
  destroy: function (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  },
};
```

:::

#### diff 算法

:::code-group

```js [updateChildren]
/**
 * Vue的双端diff算法核心函数
 * 对比新旧子节点数组，以最小代价更新DOM
 * 时间复杂度：O(n)
 *
 * @param {Element} parentElm - 父DOM元素
 * @param {Array} oldCh - 旧子节点数组
 * @param {Array} newCh - 新子节点数组
 * @param {Array} insertedVnodeQueue - 插入队列
 * @param {boolean} removeOnly - 仅用于<transition-group>的特殊标志
 */
function updateChildren(
  parentElm,
  oldCh,
  newCh,
  insertedVnodeQueue,
  removeOnly
) {
  // ========== 1. 初始化指针 ==========
  // 旧节点数组的双指针
  var oldStartIdx = 0; // 旧头指针
  var newStartIdx = 0; // 新头指针
  var oldEndIdx = oldCh.length - 1; // 旧指针尾
  var oldStartVnode = oldCh[0]; // 旧头节点
  var oldEndVnode = oldCh[oldEndIdx]; // 旧尾节点
  var newEndIdx = newCh.length - 1; // 新指针尾
  var newStartVnode = newCh[0]; // 新头节点
  var newEndVnode = newCh[newEndIdx]; // 新尾节点
  // 辅助变量
  var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
  // ========== 2. 特殊标志处理 ==========
  // removeOnly仅用于<transition-group>，确保在离开过渡期间元素保持正确相对位置
  // canMove控制是否可以移动DOM元素（默认可以移动）
  var canMove = !removeOnly;
  // ========== 3. 开发环境检查 ==========
  // 检查新节点数组中是否有重复的key（开发环境）
  {
    checkDuplicateKeys(newCh);
  }

  // ========== 4. 双指针遍历算法核心 ==========
  // 循环条件：新旧指针都没有越界
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // ----- 4.1 处理已被移动的节点 -----
    // 如果旧头节点已被处理过（设置为undefined），指针右移
    if (isUndef(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // 移动到下一个节点
      // 如果旧尾节点已被处理过，指针左移
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
      // ----- 4.2 情况1：头头相同 -----
      // old: [A, B, C, D]    new: [A, B, E, F]
      //       ↑                     ↑
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 深度比较并更新节点
      patchVnode(
        oldStartVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 双方头指针同时右移
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
      // ----- 4.3 情况2：尾尾相同 -----
      // old: [A, B, C, D]    new: [E, F, C, D]
      //             ↑                     ↑
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(
        oldEndVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 双方尾指针同时左移
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
      // ----- 4.4 情况3：旧头新尾相同（右移） -----
      // old: [A, B, C, D]    new: [B, C, D, A]
      //       ↑                         ↑
      // 说明：A节点从开头移动到了末尾
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(
        oldStartVnode,
        newEndVnode,
        insertedVnodeQueue,
        newCh,
        newEndIdx
      );
      // 将旧头节点移动到旧尾节点之后
      canMove &&
        nodeOps.insertBefore(
          parentElm, // 父元素
          oldStartVnode.elm, // 要移动的节点
          nodeOps.nextSibling(oldEndVnode.elm) // 目标位置：尾节点的下一个兄弟节点
        );
      // 旧头指针右移，新尾指针左移
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
      // ----- 4.5 情况4：旧尾新头相同（左移） -----
      // old: [A, B, C, D]    new: [D, A, B, C]
      //             ↑               ↑
      // 说明：D节点从末尾移动到了开头
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(
        oldEndVnode,
        newStartVnode,
        insertedVnodeQueue,
        newCh,
        newStartIdx
      );
      // 将旧尾节点移动到旧头节点之前
      canMove &&
        nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      // 旧尾指针左移，新头指针右移
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
      // ----- 4.6 情况5：四端比较都失败 -----
      // 需要建立key到索引的映射，进行查找匹配
    } else {
      // 4.6.1 首次进入时创建key到oldCh索引的映射
      if (isUndef(oldKeyToIdx))
        // 创建 {key: index} 映射表
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // 4.6.2 查找新头节点在旧数组中的位置
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key] // 通过key查找
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx); // 无key时遍历查找
      // 4.6.3 情况5.1：新节点在旧数组中不存在
      if (isUndef(idxInOld)) {
        // 创建新元素，插入到当前旧头节点之前
        createElm(
          newStartVnode,
          insertedVnodeQueue,
          parentElm,
          oldStartVnode.elm,
          false,
          newCh,
          newStartIdx
        );
        // 4.6.4 情况5.2：找到可复用的旧节点
      } else {
        // 获取要移动的节点
        vnodeToMove = oldCh[idxInOld];
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 深度更新节点
          patchVnode(
            vnodeToMove,
            newStartVnode,
            insertedVnodeQueue,
            newCh,
            newStartIdx
          );
          // 将旧数组对应位置设为undefined（表示已处理）
          oldCh[idxInOld] = undefined;
          // 移动到旧头节点之前
          canMove &&
            nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
        } else {
          // 4.6.5 情况5.3：key相同但节点不同（如标签不同）
          // 视为全新节点创建
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
      // 新头指针右移
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // ========== 5. 循环结束后处理剩余节点 ==========

  // 5.1 旧节点遍历完了，新节点还有剩余 → 添加新节点
  // old: [A, B]    new: [A, B, C, D]
  //       ↑                    ↑
  if (oldStartIdx > oldEndIdx) {
    // 获取参考节点：新尾节点下一个节点的DOM元素
    refElm = isUndef(newCh[newEndIdx + 1])
      ? null // 没有下一个节点，追加到末尾
      : newCh[newEndIdx + 1].elm; // 插入到这个节点之前
    // 批量添加新节点
    addVnodes(
      parentElm,
      refElm,
      newCh,
      newStartIdx, // 剩余新节点的起始位置
      newEndIdx, // 剩余新节点的结束位置
      insertedVnodeQueue
    );
    // 5.2 新节点遍历完了，旧节点还有剩余 → 删除旧节点
    // old: [A, B, C, D]    new: [A, B]
    //
  } else if (newStartIdx > newEndIdx) {
    // 批量删除旧节点
    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
  }
}
```

```js [辅助函数]
/**
 * 创建从key到旧节点索引的映射表
 * 用于快速查找节点
 * 时间复杂度：O(n)，但避免了多次遍历
 */
function createKeyToOldIdx(children, beginIdx, endIdx) {
  let i, key;
  const map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) {
      map[key] = i; // {key1: index1, key2: index2, ...}
    }
  }
  return map;
}

/**
 * 当节点没有key时，遍历查找相同节点
 * 时间复杂度：O(n)，用于处理无key的情况
 */
function findIdxInOld(node, oldCh, start, end) {
  for (let i = start; i <= end; i++) {
    const c = oldCh[i];
    if (isDef(c) && sameVnode(node, c)) {
      return i;
    }
  }
}
```

:::
算法实例分析

实例 1：简单顺序更新

```js
// 旧：A B C D
// 新：A B E F

// 执行流程：
1. 头头比较：A-A ✓，patch，指针移动 → B-B
2. 头头比较：B-B ✓，patch，指针移动 → C-E
3. 头头比较失败，其他比较都失败
4. 查找E在旧数组中的位置，未找到
5. 创建E，插入到C之前
6. 查找F，未找到，创建F
7. 删除剩余的C D

```

DOM 操作：创建 E、F，删除 C、D

实例 2：节点移动

```js
// 旧：A B C D
// 新：B D A C

// 执行流程：
1. 头头：A-B ✗，尾尾：D-C ✗，头尾：A-C ✗，尾头：D-B ✗
2. 查找B在旧数组位置，找到index=1
3. 移动B到开头（A之前）
4. 查找D位置，找到index=3，移动D到A之前
5. 查找A位置，找到index=0，移动A到C之前
6. 查找C位置，找到index=2，已在对的位置


```

DOM 操作：3 次移动操作（insertBefore）

:::tip 四端快速匹配
优先处理 4 种常见情况（顺序不变、首尾移动）

大多数场景能在 O(1)时间内解决
:::

:::tip key 的重要性
// 有 key：O(1)查找 → 高效

idxInOld = oldKeyToIdx[newStartVnode.key];

// 无 key：O(n)遍历 → 低效

idxInOld = findIdxInOld(newStartVnode, oldCh, ...);
:::

:::tip 批量操作
// 循环结束后统一添加/删除剩余节点

// 减少 DOM 操作次数

addVnodes() // 批量添加

removeVnodes() // 批量删除
:::

设计思路:

1. 假设优先

   - 假设大多数操作是：新增、删除、顺序不变
   - 四端比较覆盖了大部分常见情况

2. 最小移动

   - 优先尝试复用现有节点
   - 通过指针移动确定最小 DOM 操作集合

3. 真实 DOM 操作延迟

   - 只在必要时进行 DOM 操作
   - 批量处理减少重排/重绘

## 设计模式

递归模式（Recursion Pattern）

```js
// 典型的递归结构
function createTree(node) {
  // 1. 创建当前节点
  createNode(node);

  // 2. 递归创建子节点
  if (hasChildren(node)) {
    for (const child of node.children) {
      createTree(child); // 递归调用
    }
  }
}
```

Vue 的实现特点：

1. 深度优先：先处理深层节点
2. 尾递归优化：createElm 是尾调用形式
3. 迭代安全：通过 ownerArray/index 防止无限循环

模板方法模式（Template Method）

```js
// createElm是模板，createChildren是其中一步
function createElm(vnode) {
  // 步骤1：尝试创建组件
  if (createComponent(vnode)) return;

  // 步骤2：创建DOM元素
  vnode.elm = createElement(vnode);

  // 步骤3：递归创建子节点（模板方法）
  createChildren(vnode, children, queue);

  // 步骤4：调用创建钩子
  invokeCreateHooks(vnode, queue);

  // 步骤5：插入到父元素
  insert(parent, vnode.elm, ref);
}
```

### 时序图

在这里创建渲染 watcher 后 会执行 render 函数,流程时序图如下：

```js
new Watcher() 开始
    ↓
Watcher 构造函数执行
    ↓
参数初始化
    ↓
判断是否为渲染Watcher → 是 → 保存到 vm._watcher
    ↓
设置 getter = updateComponent
    ↓
设置 lazy、sync 等选项
    ↓
this.value = this.get() ← 关键：立即执行！
    ↓
pushTarget(this) ← Dep.target = 当前Watcher
    ↓
try { value = this.getter.call(vm, vm) } ← 执行updateComponent
    ↓
├→ 执行 vm._render()
│   ├→ 执行编译的render函数
│   ├→ 访问响应式数据 → 触发getter
│   ├→ dep.depend() → 收集当前Watcher
│   └→ 返回虚拟DOM
    ↓
├→ 执行 vm._update(vnode)
│   ├→ patch() 创建真实DOM
│   └→ 插入到页面
    ↓
popTarget() ← Dep.target = null
    ↓
this.cleanupDeps() ← 清理旧依赖
    ↓
构造函数完成
```

视图渲染流程有两个核心分支：**首次渲染** 和 **更新渲染**

::: tip 首次渲染:

`模板编译 → 生成 AST 和 render函数`

`↓`

`创建渲染Watcher → vm._update(vm._render(), hydrating)`

`↓`

`vm._render() → _c() → 生成虚拟DOM`

`↓`

`vm._render() → patch() → 创建真实DOM`

:::

::: info 更新渲染:

`数据变化 → 触发setter → 通知依赖的Watcher → 执行updateComponent`

`↓`

`vm_render() → _c() → 生成新VNode`

`↓`

`vm._update() → patch() → 精细化比较新旧VNode → 更新真实DOM`

:::
