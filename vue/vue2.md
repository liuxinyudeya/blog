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

Step1. 通过 CDN 的方式引用 Vue.js 到你的 HTML 中

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

Step2. 编写 html 结构，Script 中创建 Vue 实例。

```html
<div id="app">
  <p>计数: {{ count }}</p>
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
  });
</script>
```

通过 CDN 方式引入 vue.js,我们可以看到 vue.js 是一个立即执行函数。<br>在加载完成后会依次调用执行以下函数:

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

在实例化 Vue 时，实际上调用了`_init()`。

::: code-group

```html [index.html]
<div id="app">
  <p>计数: {{ count }}</p>
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
      }; // [!code focus]
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

:::
可以说 vuejs 最大的特性就是响应式系统，即 当数据发生变化时，在不刷新页面的情况下，数据可以自动更新到页面上。
在这个过程中，我们主要关注两个阶段：

- 数据更新: 对于数据 count,当它发生变化时，如何使依赖 count 的数据也发生变化
- 视图更新: 当页面数据发生变化时，如何将变化后的新数据重新渲染到页面上

让我们从 `new Vue({...})` 为入口，跟踪 vue.js 的启动流程。 <br>
梳理 vue.js 的两大核心特性 **响应式数据**、**视图渲染** 的设计思想与实现方式。

## 响应式数据

响应式系统是一种自动追踪数据依赖关系，并在数据变化时自动更新相关部分的编程范式。<br>
优秀的框架少不了设计模式的指导，在 Vuejs 中，实现例如：

- **单例模式**
- **发布-订阅模式**
- **观察者模式**

接下来让我们来看一下观察者模式在响应式数据实现中的应用。

当`new Vue({...})`时，Vue 构造函数调用在`initMixin()`中挂载的`_init()`.<br>
执行链路为：

> new Vue -> \_init -> initState -> initData ->observe -> defineReactive -> new Dep

在此我们主要关注 `Dep()`的实现。
::: code-group

```js [initMixin]:line-numbers {24,32}
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // ...
    /**
     * 建立子父组件的关系链，初始化生命周期参数
     * $children = []、$refs = {}、$refs = {}...
     * _isMounted = false、_isDestroyed = false...
     */
    initLifecycle(vm);
    // 初始化组件的事件系统 支持钩子事件（hook:）监听组件的生命周期
    initEvents(vm);
    // 初始化组件的渲染相关属性和方法，定义 _c $createElement 函数
    initRender(vm);
    // 调用beforeCreate钩子函数
    callHook$1(vm, "beforeCreate", undefined, false /* setContext */);
    // 在data/props可用之前，初始化组件的依赖注入（inject）
    initInjections(vm);
    /**
     * 初始化组件的数据响应式系统
     * 初始化组件的 props、methods、data、computed、watch
     * 将 props、data转换成响应式对象
     * computed、watch 转换成 watcher 对象
     */
    initState(vm);
    // 在data/props可用之后，初始化组件的提供（provide）功能，
    // 与 initInjections 配合实现依赖注入。
    initProvide(vm);
    // 调用created钩子函数
    callHook$1(vm, "created");
    if (vm.$options.el) {
      // vm.$mount(el) 挂载组件到页面上，执行渲染流程
      vm.$mount(vm.$options.el);
    }
  };
}
```

```js [initState]:line-numbers {10}
function initState(vm) {
  var opts = vm.$options;
  // 初始化 props
  if (opts.props) initProps$1(vm, opts.props);
  // 组合式API 语法糖
  initSetup(vm);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    // 初始化 data ,将数据声明为响应式数据
    initData(vm);
  } else {
    var ob = observe((vm._data = {}));
    ob && ob.vmCount++;
  }
  // 初始化计算属性 computed
  if (opts.computed) initComputed$1(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    // TODO
    initWatch(vm, opts.watch);
  }
}
```

```js [initData]:line-numbers {41}
function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn$2(
      "data functions should return an object:\n" +
        "https://v2.vuejs.org/v2/guide/components.html#data-Must-Be-a-Function",
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn$2(
          'Method "'.concat(
            key,
            '" has already been defined as a data property.'
          ),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn$2(
        'The data property "'.concat(key, '" is already declared as a prop. ') +
          "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  var ob = observe(data);
  ob && ob.vmCount++;
}
```

```js [observe]:line-numbers {14}
function observe(value, shallow, ssrMockReactivity) {
  if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  if (
    shouldObserve &&
    (ssrMockReactivity || !isServerRendering()) &&
    (isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value.__v_skip /* ReactiveFlags.SKIP */ &&
    !isRef(value) &&
    !(value instanceof VNode)
  ) {
    return new Observer(value, shallow, ssrMockReactivity);
  }
}
```

```js [Observer]:line-numbers {40}
var Observer = /** @class */ (function () {
  function Observer(value, shallow, mock) {
    if (shallow === void 0) {
      shallow = false;
    }
    if (mock === void 0) {
      mock = false;
    }
    this.value = value;
    this.shallow = shallow;
    this.mock = mock;
    // this.value = value
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (isArray(value)) {
      if (!mock) {
        if (hasProto) {
          value.__proto__ = arrayMethods;
          /* eslint-enable no-proto */
        } else {
          for (var i = 0, l = arrayKeys.length; i < l; i++) {
            var key = arrayKeys[i];
            def(value, key, arrayMethods[key]);
          }
        }
      }
      if (!shallow) {
        this.observeArray(value);
      }
    } else {
      /**
       * Walk through all properties and convert them into
       * getter/setters. This method should only be called when
       * value type is Object.
       */
      var keys = Object.keys(value);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
      }
    }
  }
  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function (value) {
    for (var i = 0, l = value.length; i < l; i++) {
      observe(value[i], false, this.mock);
    }
  };
  return Observer;
})();
```

```js [defineReactive]:line-numbers {2,20,60-66}
function defineReactive(
  obj, // 目标对象
  key, // 属性名
  val, // 当前值
  customSetter, // 自定义 setter（用于开发警告）
  shallow, // 是否浅响应式（不递归处理子属性）
  mock // 是否是 mock 模式
) {
  // 创建依赖实例，每个响应式属性都有一个独立的 Dep 实例，用于收集依赖和派发更新
  var dep = new Dep();
  // 获取对象属性的描述符，用以判断是否可以重新定义该属性
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return; // 不可配置的属性直接返回，不进行响应式处理
  }
  // 保存原有的 getter/setter，防止覆盖不可配置的属性
  var getter = property && property.get;
  var setter = property && property.set;
  // 如果未传入初始值，则从对象中获取该属性的原始值作为初始值
  if (
    (!getter || setter) &&
    (val === NO_INIITIAL_VALUE || arguments.length === 2)
  ) {
    val = obj[key];
  }
  // 递归处理对象的子属性，shallow 为 true 时，不处理子对象（Vue 3 的 shallowRef 类似）
  var childOb = !shallow && observe(val, false, mock);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // getter/setter 函数，用于拦截属性的读取和设置操作
    get: function reactiveGetter() {
      // 1. 获取值（优先使用原有 getter）
      var value = getter ? getter.call(obj) : val;

      /**
       * 2. 依赖收集(核心)
       * 当前正在计算的 观察者 ，Watcher 的引用。静态属性，全局只有一个。
       * 在页面渲染时,Dep.target 会被赋值，指向当前的渲染 Watcher 实例
       */
      if (Dep.target) {
        {
          dep.depend({
            target: obj,
            type: "get" /* TrackOpTypes.GET */,
            key: key,
          });
        }
        // 3. 如果是嵌套对象，则收集子对象的依赖（关键！），以便在子属性变化时也能触发更新
        if (childOb) {
          childOb.dep.depend();
          // 4. 数组的依赖收集
          if (isArray(value)) {
            dependArray(value);
          }
        }
      }
      // 5. 返回处理后的值
      return isRef(value) && !shallow ? value.value : value;
    },
    // setter 函数，用于拦截属性的设置操作
    set: function reactiveSetter(newVal) {
      // 1. 获取旧值
      var value = getter ? getter.call(obj) : val;
      // 2. 值没有变化，直接返回
      if (!hasChanged(value, newVal)) {
        return;
      }
      // 3. 调用自定义 setter（开发警告）
      if (customSetter) {
        customSetter();
      }
      // 4. 设置新值（优先使用原有 setter）
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        // 只有 getter 没有 setter.无法设置，直接返回
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        // ref 类型的特殊处理，直接设置 value.value 即可
        value.value = newVal;
        return;
      } else {
        // 普通属性直接赋值
        val = newVal;
      }
      // 5. 新值是对象，则递归处理子属性（关键！），以便在子属性变化时也能触发更新
      childOb = !shallow && observe(newVal, false, mock);

      // 6. 通知依赖更新（关键！）
      {
        dep.notify({
          type: "set" /* TriggerOpTypes.SET */,
          target: obj,
          key: key,
          newValue: newVal,
          oldValue: value,
        });
      }
    },
  });

  return dep;
}
```

```js [Dep]:line-numbers {2,20,60}
var Dep = /** @class */ (function () {
  // 构造函数，维护了一个观察者列表
  function Dep() {
    this._pending = false; // 标记是否有待清理的依赖,延迟清理优化标记
    this.id = uid$2++; // 全局唯一ID，Watcher 执行顺序排序和去重
    this.subs = []; // 存储所有订阅者（Watcher）
  }
  // 添加观察者对象到列表中
  Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
  };
  // 移除观察者
  Dep.prototype.removeSub = function (sub) {
    // 1. 不直接 splice，而是设为 null（关键优化）
    this.subs[this.subs.indexOf(sub)] = null;
    // 2. 延迟清理机制
    if (!this._pending) {
      this._pending = true;
      pendingCleanupDeps.push(this);
    }
  };
  // 收集依赖，添加观察者对象到 Dep 实例的 subs 中
  Dep.prototype.depend = function (info) {
    // 1. 核心：让当前 Watcher 订阅这个 Dep
    if (Dep.target) {
      Dep.target.addDep(this);
      // 2. 开发环境调试钩子

      if (info && Dep.target.onTrack) {
        Dep.target.onTrack(__assign({ effect: Dep.target }, info));
      }
    }
  };
  // 通知所有观察者对象更新数据
  Dep.prototype.notify = function (info) {
    // 1. 过滤掉 null（已标记删除的订阅者）

    var subs = this.subs.filter(function (s) {
      return s;
    });
    // 2. 同步模式下需要排序（确保执行顺序）

    if (!config.async) {
      subs.sort(function (a, b) {
        return a.id - b.id; // 按 Watcher.id 升序排序
      });
    }
    for (var i = 0, l = subs.length; i < l; i++) {
      var sub = subs[i];
      // 4. 开发环境调试钩子

      if (info) {
        sub.onTrigger && sub.onTrigger(__assign({ effect: subs[i] }, info));
      }
      // 5. 核心：触发 Watcher 更新
      sub.update();
    }
  };
  return Dep;
})();
```

:::

依赖收集时做了三层处理：

1. 收集 obj.key 的依赖 (dep.depend())
2. 收集子对象 childOb 的依赖 (childOb.dep.depend())
3. 如果是数组，收集数组元素的依赖 （dependArray()），收集依赖后当数据发生变化时: <br>
   data.count = 1; -> 调用 dep.notify() 通知所有依赖更新 -> sub.update(); 触发观察者 update()函数。

现在我们知道了依赖收集的流程：
将数据声明成响应式，在依赖收集阶段将观察者（Watcher）添加到 Dep 实例的 subs 中。当数据变化时，通过 dep.notify() 方法通知所有订阅了该数据的 Watcher 进行更新操作。
下面我们来看有哪些类型的依赖，不同类型的 watcher 的作用是什么。他们是如何实现 update()的。

### 依赖类型

1. 渲染 Watcher

   - 创建时机：组件实例化时
   - 唯一性：每个组件实例一个
   - 作用：负责组件重新渲染
   - 标识：isRenderWatcher: true

2. 计算属性 Watcher

   - 创建时机：计算属性初始化时
   - 特点：lazy: true（懒计算），dirty: true（脏检查）
   - 作用：缓存计算结果

3. 用户 Watcher

   - 创建时机：watch 选项或 $watch API
   - 特点：user: true（用户定义），可以有 deep、immediate
   - 作用：执行用户自定义回调

4. 同步 Watcher（这是你遗漏的类型）

   - 创建时机：watch 选项中设置 sync: true
   - 特点：sync: true（同步执行更新）
   - 作用：立即执行，不进入异步队列

5. 深度 Watcher

   - 创建时机：watch 选项中设置 deep: true
   - 特点：deep: true（深度监听对象所有嵌套属性）
   - 作用：监听对象内部变化

```js [watcher.js]:line-numbers {1,20}
var Watcher = /** @class */ (function () {
  function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
    recordEffectScope(
      this,
      // if the active effect scope is manually created (not a component scope),
      // prioritize it
      activeEffectScope && !activeEffectScope._vm
        ? activeEffectScope
        : vm
        ? vm._scope
        : undefined
    );
    if ((this.vm = vm) && isRenderWatcher) {
      vm._watcher = this;
    }
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
      this.before = options.before;
      {
        this.onTrack = options.onTrack;
        this.onTrigger = options.onTrigger;
      }
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$1; // uid for batching
    this.active = true;
    this.post = false;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = expOrFn.toString();
    // parse expression for getter
    if (isFunction(expOrFn)) {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = noop;
        warn$2(
          'Failed watching path: "'.concat(expOrFn, '" ') +
            "Watcher only accepts simple dot-delimited paths. " +
            "For full control, use a function instead.",
          vm
        );
      }
    }
    this.value = this.lazy ? undefined : this.get();
    console.log("?", expOrFn);
  }
  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    try {
      value = this.getter.call(vm, vm);
      console.log("getter", this.getter, value);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
      } else {
        throw e;
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value);
      }
      popTarget();
      this.cleanupDeps();
    }
    return value;
  };
  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function () {
    var i = this.deps.length;
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          var info = 'callback for watcher "'.concat(this.expression, '"');
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          );
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function () {
    this.value = this.get();
    this.dirty = false;
  };
  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function () {
    var i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  };
  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function () {
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }
    if (this.active) {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
      if (this.onStop) {
        this.onStop();
      }
    }
  };
  return Watcher;
})();
```

### computed、watch

我们先来看 用户 watcher 和 计算属性 watcher。

#### 用户 watcher

::: code-group

```js [用户 watcher]
function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
Vue.prototype.$watch = function (expOrFn, cb, options) {
  var vm = this;
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options);
  }
  options = options || {};
  options.user = true;
  var watcher = new Watcher(vm, expOrFn, cb, options);
  if (options.immediate) {
    var info = 'callback for immediate watcher "'.concat(
      watcher.expression,
      '"'
    );
    pushTarget();
    invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
    popTarget();
  }
  return function unwatchFn() {
    watcher.teardown();
  };
};
```

```js [computed watcher]
  function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
      recordEffectScope(
        this,
        // if the active effect scope is manually created (not a component scope),
        // prioritize it
        activeEffectScope && !activeEffectScope._vm
          ? activeEffectScope
          : vm
          ? vm._scope
          : undefined
      );
      if ((this.vm = vm) && isRenderWatcher) {
        vm._watcher = this;
      }
      // options
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
        this.before = options.before;
        {
          this.onTrack = options.onTrack;
          this.onTrigger = options.onTrigger;
        }
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$1; // uid for batching
      this.active = true;
      this.post = false;
      this.dirty = this.lazy; // for lazy watchers
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = expOrFn.toString();
      // parse expression for getter
      if (isFunction(expOrFn)) {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath(expOrFn);
        if (!this.getter) {
          this.getter = noop;
          warn$2(
            'Failed watching path: "'.concat(expOrFn, '" ') +
              "Watcher only accepts simple dot-delimited paths. " +
              "For full control, use a function instead.",
            vm
          );
        }
      }
      this.value = this.lazy ? undefined : this.get();
      console.log("?", expOrFn);
    }
    /**
     * Evaluate the getter, and re-collect dependencies.
     */
    Watcher.prototype.get = function () {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
        console.log("getter", this.getter, value);
      } catch (e) {
        if (this.user) {
          handleError(
            e,
            vm,
            'getter for watcher "'.concat(this.expression, '"')
          );
        } else {
          throw e;
        }
      } finally {
        // "touch" every property so they are all tracked as
        // dependencies for deep watching
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value;
    };
```

:::

#### 计算属性 watcher

::: code-group

```js [computed watcher]
function initComputed$1(vm, computed) {
  // $flow-disable-line
  var watchers = (vm._computedWatchers = Object.create(null));
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction(userDef) ? userDef : userDef.get;
    if (getter == null) {
      warn$2('Getter is missing for computed property "'.concat(key, '".'), vm);
    }
    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }
    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn$2(
          'The computed property "'.concat(
            key,
            '" is already defined in data.'
          ),
          vm
        );
      } else if (vm.$options.props && key in vm.$options.props) {
        warn$2(
          'The computed property "'.concat(
            key,
            '" is already defined as a prop.'
          ),
          vm
        );
      } else if (vm.$options.methods && key in vm.$options.methods) {
        warn$2(
          'The computed property "'.concat(
            key,
            '" is already defined as a method.'
          ),
          vm
        );
      }
    }
  }
}
```

```js [defineComputed]
function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction(userDef)) {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn$2(
        'Computed property "'.concat(
          key,
          '" was assigned to but it has no setter.'
        ),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

```js [createComputedGetter]
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        if (Dep.target.onTrack) {
          Dep.target.onTrack({
            effect: Dep.target,
            target: this,
            type: "get" /* TrackOpTypes.GET */,
            key: key,
          });
        }
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
```

:::

## 视图渲染与更新

## 视图更新

## 生命周期

## 指令实现 v-model v-if v-show

1. 点击按钮，count++ 触发 setter
2. dep.notify() 通知渲染 Watcher
3. watcher.update() → queueWatcher() → nextTick(flushSchedulerQueue)
4. 下一个 tick 执行 watcher.run()
5. watcher.get() → updateComponent()
6. vm.\_update(vm.\_render())
7. \_render() 生成新的 VNode
   - \_s(count) → "1"
   - \_v("计数: 1") → 文本 VNode
   - \_c('p', [文本 VNode]) → p 元素 VNode
8. \_update() 执行 patch
   - 传入 oldVnode（旧的虚拟 DOM）
   - 传入 vnode（新的虚拟 DOM）
   - patchVnode() 进行 diff
   - 发现文本内容变化：oldText="计数: 0" → newText="计数: 1"
   - nodeOps.setTextContent(elm, "计数: 1")
9. DOM 更新完成

## 双向数据绑定

## cdn 方式使用 vue 的工作流程
