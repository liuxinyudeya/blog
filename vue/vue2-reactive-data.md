# 响应式系统

**响应式系统** 是 vuejs 的一大特性。即 当数据发生变化时，在不刷新页面的情况下，数据可以自动更新到页面上。

在这个过程中，我们主要关注两个阶段：

- 数据更新: 对于自定义属性 count,当它发生变化时，如何使依赖 count 的数据也发生变化
- 视图更新: 当页面数据发生变化时，如何将变化后的新数据重新渲染到页面上

## new Vue()

在上文中我们已经知道：`initMixin()`函数已经将`_init()`函数挂载到 Vue 的原型上。

当 `new Vue({...})` 时，Vue 构造函数会调用`_init()`。

::: code-group

```js [ new Vue ]
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn$2("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```

```js [initMixin]
//  Vue 构造函数的核心初始化方法
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // 保存当前实例引用
    // ... 忽略部分代码 ...

    // 调用 beforeCreate 生命周期钩子 | 此时：数据观测、事件/侦听器配置还未初始化
    callHook$1(vm, "beforeCreate", undefined, false /* setContext */);

    // Vue 响应式系统的核心 | 初始化状态：props, methods, data, computed, watch
    initState(vm);

    // 调用 created 生命周期钩子 | 此时：数据观测已完成，事件/侦听器已配置，但 DOM 还未挂载
    callHook$1(vm, "created");

    // 如果提供了 el 选项，自动挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el); // 渲染组件到 DOM，自动挂载实例
    }
  };
}
```

```js [initState]
// 这是 Vue 响应式系统的核心入口
function initState(vm) {
  var opts = vm.$options; // 获取组件的配置选项

  // 初始化 props，将父组件传递的数据转换为响应式
  if (opts.props) initProps$1(vm, opts.props);

  // 组合式API setup()函数初始化 | 执行时机在 props 之后，data 之前
  initSetup(vm);

  // 将 methods 中的方法绑定到实例上
  if (opts.methods) initMethods(vm, opts.methods);

  if (opts.data) {
    initData(vm); // 初始化 data 选项，转换为响应式数据
  } else {
    // 如果没有 data 选项，创建一个空对象作为 _data
    var ob = observe((vm._data = {}));
    // 递增 vmCount，用于跟踪有多少组件实例使用了这个响应式对象
    ob && ob.vmCount++;
  }
  // 初始化计算属性
  if (opts.computed) initComputed$1(vm, opts.computed);
  // 初始化侦听器（watch）
  if (opts.watch) initWatch(vm, opts.watch);
}
```

:::

在`_init`中我们会看到 [Vue 生命周期](/vue/lifecycle.md) 的前两个钩子函数：`beforeCreate`、`created`。

他们分别在 `initState` 函数之前、之后执行。

:::info 在 `beforeCreate` 钩子函数中：
我们可以做一些初始化操作，比如设置一些初始数据。

我们可以访问到组件的配置选项（options），但是此时还没有初始化 data、computed 等状态。
:::

在`beforeCreate` 钩子函数之后，紧接着会执行 `initState()` 函数。
::: tip `initState()` 是 Vue 响应式系统的核心入口函数，在这里将进行:

- 初始化 props，将父组件传递的数据转换为响应式
- 初始化 methods，将方法绑定到实例上
- **初始化 data，将数据转换为响应式**
- 初始化 computed，计算属性
- 初始化 watch，侦听器
  :::

在`initState()` 函数执行后，会执行 `created` 钩子函数。

:::info 在 `create` 钩子函数中：
数据已初始化完成，可以访问和修改 data、computed、methods 等

DOM 尚未挂载，不能操作 DOM 元素

常用于：数据初始化、API 调用、事件监听、初始化第三方库
:::

在这里我先来看 **初始化 data** 的过程，因为这是响应式系统的核心。

## 初始化 data

### initData 源码

:::tip 调用流程为：
`initData -> observe -> new Observer -> defineReactive -> Dep`
:::

在 Observer 中，调用 `defineReactive` 方法，将对象声明为响应式数据。<br>

:::code-group

```js [initData]
/**
 * 初始化组件实例的 data 选项
 * 这是 Vue 响应式系统的核心函数，负责将 data 转换为响应式数据
 *
 * @param {Component} vm - Vue 组件实例
 */
function initData(vm) {
  // 从组件选项中获取 data 定义
  var data = vm.$options.data;
  // ... 忽略部分代码 ...

  // 将 data 对象转换为响应式
  var ob = observe(data);

  // 如果观察成功（返回 Observer 实例），递增 vmCount
  // vmCount 用于跟踪有多少个组件实例在使用这个响应式对象
  ob && ob.vmCount++;
}
```

```js [observe]
/**
 * 观察数据对象，使其变为响应式｜这是 Vue 响应式系统的核心入口函数
 * @param {*} value - 要观察的数据值
 * @param {boolean} shallow - 是否浅观察（只观察第一层属性）
 * @param {boolean} ssrMockReactivity - 是否在 SSR 环境下模拟响应式
 * @returns {Observer|undefined} - 返回 Observer 实例或 undefined
 */
function observe(value, shallow, ssrMockReactivity) {
  // 如果数据已经被观察过，直接返回已有的 Observer 实例
  // 避免重复创建 Observer，提高性能并确保数据一致性
  if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  // 所有条件必须同时满足才会创建新的 Observer 实例
  if (
    shouldObserve && // 条件1：全局响应式开关
    (ssrMockReactivity || !isServerRendering()) && // 条件2：允许响应式的环境
    (isArray(value) || isPlainObject(value)) && // 条件3：可观察的数据类型
    Object.isExtensible(value) && // 条件4：对象可扩展
    !value.__v_skip /* ReactiveFlags.SKIP */ && // 条件5：未标记为跳过响应式
    !isRef(value) && // 条件6：不是 ref 对象
    !(value instanceof VNode) // 条件7：不是虚拟节点
  ) {
    return new Observer(value, shallow, ssrMockReactivity);
  }
}
```

```js [Observer]
// 这是 Vue 响应式数据转换的核心实现 负责将普通对象/数组转换为响应式对象
var Observer = /** @class */ (function () {
  /**
   * Observer 构造函数
   * @param {Object|Array} value - 需要被观察的数据
   * @param {boolean} shallow - 是否浅观察（只观察第一层属性）
   * @param {boolean} mock - 是否为 mock 模式（SSR 环境使用）
   */
  function Observer(value, shallow, mock) {
    // ... 忽略部分代码 ...

    this.value = value; // 存储原始数据值
    // 对象级别的依赖收集器，用于管理对象级别的更新通知
    this.dep = mock ? mockDep : new Dep();
    this.vmCount = 0; // 记录当前 Observer 实例被多少个组件使用
    def(value, "__ob__", this); // 将 Observer 实例标记在原始数据上，便于访问

    var keys = Object.keys(value);
    // 遍历对象的所有属性
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // 对每个属性调用 defineReactive，使其成为响应式属性
      defineReactive(
        value, // 目标对象
        key, // 属性名
        NO_INIITIAL_VALUE, // 初始值（特殊值表示未初始化）
        undefined, // 自定义 setter（可选）
        shallow, // 浅观察标记
        mock // mock 模式标记
      );
    }
  }
  return Observer;
})();
```

```js [Dep]
// 依赖收集器类｜每个响应式属性都有一个对应的 Dep 实例，用于管理依赖收集和派发更新
var Dep = /** @class */ (function () {
  function Dep() {
    this._pending = false; // 标记是否有待清理的订阅者（用于性能优化）
    this.id = uid$2++; // 每个 Dep 实例的唯一标识符
    this.subs = []; // 存储所有订阅了该依赖的 Watcher（订阅者数组 // [!code hl]
  }
  // 添加订阅者（Watcher） 该方法在属性被访问时调用，用于收集依赖
  Dep.prototype.addSub = function (sub) {
    this.subs.push(sub);
  };
  // 通知所有订阅者更新 该方法在属性值变化时调用，通知所有订阅者进行更新
  // [!code hl]
  Dep.prototype.notify = function (info) {
    // 遍历所有订阅者，触发更新
    for (var i = 0, l = subs.length; i < l; i++) {
      var sub = subs[i];
      sub.update(); // 调用 Watcher 的 update 方法// [!code hl]
    }
  };
  // 移除订阅者（Watcher） 该方法在组件销毁时调用，用于移除不再需要的订阅者
  Dep.prototype.removeSub = function (sub) {};
  // 依赖收集函数，用于在 getter 中自动将当前 Watcher 添加到 Dep 的订阅者列表中
  Dep.prototype.depend = function (info) {
    // Dep.target 是当前正在计算的 Watcher（全局唯一）
    if (Dep.target) Dep.target.addDep(this); // 让当前 Watcher 订阅这个 Dep
    // ... 忽略部分代码 ...
  };
  return Dep;
})();
```

:::

vue 响应式数据的设计思想应用了[发布订阅模式](/others//design/publish-subscribe.md)<br>
我们先来看`Dep` 实例:

- 内部维护了一个订阅者列表 `subs`，用于存储所有依赖该属性的 观察者`Watcher` 实例。
- 提供了 `addSub` 和 `removeSub` 方法，用于添加和移除订阅者。
- 提供了 `depend` 和 `notify` 方法，用于依赖收集和通知更新。

在 Observer 中需要注意的是：

先通过 `this.dep = mock ? mockDep : new Dep()` 创建了一个对象级别的依赖收集器。

而后通过遍历对象的所有属性，并调用 `defineReactive` 方法将它们转换为响应式属性。每个响应式属性都会创建一个对应的 Dep 实例，用于管理对该属性的依赖收集和更新通知。

:::info 他们的层级关系可以理解为：
对象 user (有一个 dep)

├── 属性 name (有一个 dep)

├── 属性 age (有一个 dep)

└── 属性 address (有一个 dep)

:::
this.dep = new Dep() 的作用是为整个对象创建一个依赖收集器，用于：

- 对象整体替换时的依赖通知
- 数组变异方法调用时的依赖通知
- 嵌套对象的依赖收集
- 计算属性或 $watch 中对整个对象的观察

### defineReactive

`defineReactive` 函数通过 **Object.defineProperty** 劫持对象的 getter、setter 属性，实现了依赖收集和派发更新的功能。

::: code-group

```js [defineReactive]
/**
 * 这是 Vue 2 响应式系统的核心函数 将对象属性转换为响应式属性
 * @param {Object} obj - 目标对象
 * @param {string} key - 属性名
 * @param {*} val - 初始值（可选）
 * @param {Function} customSetter - 自定义 setter（主要用于开发警告）
 * @param {boolean} shallow - 是否浅层响应式（Vue 3 的 shallowRef 类似）
 * @param {boolean} mock - 是否模拟模式（测试用）
 * @returns {Dep} 返回该属性对应的 Dep 实例
 */
function defineReactive(obj, key, val, customSetter, shallow, mock) {
  // 1. 创建依赖收集器，每个响应式属性都有一个独立的 Dep 实例
  var dep = new Dep(); // 用于收集所有依赖该属性的 Watcher

  // 2. 获取对象属性的原始描述符 | 判断该属性是否可配置（configurable）
  var property = Object.getOwnPropertyDescriptor(obj, key);
  // 如果属性不可配置（比如 Object.freeze 处理的属性），直接返回
  if (property && property.configurable === false) return;

  // 3. 保存原有的 getter/setter｜这样可以兼容已经定义了 getter/setter 的属性
  var getter = property && property.get;
  var setter = property && property.set;

  // 4. 获取初始值
  if (
    (!getter || setter) && // 没有 getter 或有 setter
    (val === NO_INIITIAL_VALUE||arguments.length===2) // 无初始值｜参数长度是2
  ) {
    val = obj[key]; // 则从对象中获取该属性的当前值作为初始值
  }

  var childOb = !shallow && observe(val, false, mock ); // 5. 递归处理子对象

  // 6. 使用 Object.defineProperty 重新定义属性
  Object.defineProperty(obj, key, { ... });// [!code hl]

  return dep; // 8. 返回 Dep 实例（主要用于测试和内部使用）
}
```

```js [ get | set ]
// 使用 Object.defineProperty 重新定义属性
Object.defineProperty(obj, key, {
  enumerable: true, // 保持可枚举性
  configurable: true, // 保持可配置性
  // 拦截读取操作，进行依赖收集 ｜ 当访问属性时触发
  get: function reactiveGetter() {
    // 6.1 获取属性值 优先使用原有的 getter（如果存在），否则使用闭包保存的 val
    var value = getter ? getter.call(obj) : val;

    // 6.2 Dep.target 是当前正在计算的 Watcher（全局唯一）渲染时 指向 Render Watcher
    if (Dep.target) {
      // 6.2.1 收集当前属性的依赖
      dep.depend({ target: obj, type: "get", key: key }); // [!code hl]
      if (childOb) {
        // 6.2.2 嵌套对象，收集子对象的依赖
        childOb.dep.depend();
        // 6.2.3 如果是数组，需要特殊处理｜数组的下标访问不会被 Object.defineProperty 拦截
        if (isArray(value)) dependArray(value);
      }
    }
    // 6.3 返回值｜如果值是 ref 且不是浅层响应式，返回 ref.value 否则直接返回值
    return isRef(value) && !shallow ? value.value : value;
  },

  // 拦截赋值操作，派发更新｜当修改属性时触发
  set: function reactiveSetter(newVal) {
    var value = getter ? getter.call(obj) : val; // 7.1 获取旧值
    // 7.2 值没有变化，直接返回
    if (!hasChanged(value, newVal)) return;

    // 7.4 设置新值
    if (setter) setter.call(obj, newVal); // 如果原有 setter，调用它
    else if (getter) return; // 只有 getter 没有 setter，无法设置，直接返回
    else val = newVal; // 普通情况：直接设置闭包变量 val

    // 7.5 新值是对象，递归转换为响应式
    childOb = !shallow && observe(newVal, false, mock);

    // 7.6 通知所有依赖该属性的 Watcher 更新（核心逻辑）
    // [!code hl]
    dep.notify({
      type: "set", // 操作类型
      target: obj, // 目标对象
      key: key, // 属性名
      newValue: newVal, // 新值
      oldValue: value, // 旧值
    });
  },
});
```

:::

- Step.1 当将某个属性的值设置为响应式时，会创建一个 `Dep` 实例并绑定到该属性上。（每一个响应式属性都有一个对应的 `Dep` 实例。）<br>
- Step.2 劫持属性的 `getter` 方法,在属性被访问时，将当前正在计算的 `Watcher` 实例添加到该属性的依赖列表中。
- Step.3 劫持属性的 `setter` 方法,当属性值被修改时，会触发属性的 `setter` 方法，当属性值变化时通过调用 `notify()` 方法通知所有订阅了该属性的 `Watcher`调用 `update` 方法来更新。

被收集的**依赖** ，其实就是各种各样的 `Watcher` 实例。下面我们来看有哪些 `Watcher`实例。

## Watcher

### Watcher 类型

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

4. 同步 Watcher

   - 创建时机：watch 选项中设置 sync: true
   - 特点：sync: true（同步执行更新）
   - 作用：立即执行，不进入异步队列

5. 深度 Watcher

   - 创建时机：watch 选项中设置 deep: true
   - 特点：deep: true（深度监听对象所有嵌套属性）
   - 作用：监听对象内部变化

### Watcher 源码

:::code-group

```js [watcher]
// ...忽略部分代码...
var Watcher = /** @class */ (function () {
  function Watcher(
    vm, // Vue 组件实例
    expOrFn, // 要观察的表达式或函数
    cb, // 值变化时的回调函数
    options, // 配置选项
    isRenderWatcher // 是否是渲染 watcher
  ) {
    // 建立与 Vue 实例的关联 如果是渲染 watcher，将其挂载到实例上
    if ((this.vm = vm) && isRenderWatcher) vm._watcher = this; // 每个组件只有一个渲染 watcher

    // 回调函数
    this.cb = cb; // [!code hl]
    // 活跃状态标记
    this.active = true;
    // 脏数据标记（用于惰性 watcher）
    this.dirty = this.lazy;

    // 表达式字符串（用于调试和错误信息）
    this.expression = expOrFn.toString();

    // 解析表达式，获取 getter 函数
    if (isFunction(expOrFn)) {
      // 如果已经是函数，直接作为 getter
      this.getter = expOrFn; // [!code hl]
    } else {
      // 否则解析路径表达式（如 'obj.a.b'）
      this.getter = parsePath(expOrFn); // [!code hl]
    }

    // 计算初始值（惰性 watcher 不立即求值）
    this.value = this.lazy ? undefined : this.get(); // [!code hl]
  }

  // 核心方法：求值并重新收集依赖
  Watcher.prototype.get = function (dep) {};
  // 添加依赖：将当前 watcher 加入到 dep 的订阅者列表中
  Watcher.prototype.addDep = function (dep) {};
  // 清理依赖：比较新旧依赖列表，移除不再需要的依赖关系
  Watcher.prototype.cleanupDeps = function () {};
  // 订阅者接口：当依赖变化时被调用，执行回调函数并重新求值
  Watcher.prototype.update = function (dep) {};
  // 调度器接口：执行回调函数，并重新求值
  Watcher.prototype.run = function (dep) {};
  // 求值并标记为已计算（非脏数据）
  Watcher.prototype.evaluate = function () {};
  // 依赖收集：在访问响应式数据时，将当前 watcher 添加到其依赖的 dep 中
  Watcher.prototype.depend = function () {};
  // 销毁 watcher，移除所有依赖的订阅关系，防止内存泄漏
  Watcher.prototype.teardown = function () {};

  return Watcher;
})();
```

```js [get]
// 核心方法：执行 getter 函数，触发依赖收集
Watcher.prototype.get = function () {
  // ...忽略部分代码...

  // 将当前 watcher 设置为全局的 target
  pushTarget(this);

  var value;
  var vm = this.vm;

  // 执行 getter 函数
  // 在 getter 中会调用 dep.depend() 将当前 watcher 添加到依赖中
  value = this.getter.call(vm, vm); // [!code hl]

  // 恢复之前的 target watcher
  popTarget();

  // 清理依赖：比较新旧依赖，移除不再需要的依赖
  this.cleanupDeps();

  return value;
};

// 当前正在计算的 Watcher（全局唯一）
// [!code hl]
Dep.target = null;
// Watcher 栈（用于处理嵌套场景）
var targetStack = [];

// 将当前 Watcher 推入栈中，并设置为 Dep.target
function pushTarget(target) {
  targetStack.push(target); // / 1. 压栈：保存当前上下文
  Dep.target = target; // 2. 设置：作为当前活动的 Watcher
}

// 从栈中弹出当前 Watcher，并恢复上一个 Watcher
function popTarget() {
  targetStack.pop(); // 1. 出栈：移除当前 Watcher
  Dep.target = targetStack[targetStack.length - 1]; // 2. 恢复：上一个 Watcher
}
```

```js [update]
// 依赖变化时，根据配置执行更新
Watcher.prototype.update = function () {
  if (this.lazy) {
    this.dirty = true; // 惰性 watcher：只标记为脏数据，不立即求值
  } else if (this.sync) {
    this.run(); // 同步模式：立即执行，不经过异步队列
  } else {
    queueWatcher(this); // 默认：加入异步更新队列
  }
};

// 调度器接口：执行回调函数，并重新求值
Watcher.prototype.run = function () {
  // ... 忽略部分代码...
  // [!code hl]
  var value = this.get(); // 获取新值（会重新收集依赖）

  // 判断是否需要执行回调
  if (value !== this.value || isObject(value) || this.deep) {
    var oldValue = this.value; // 保存旧值
    this.value = value; // 更新值

    // 调用回调函数
    // [!code hl]
    this.cb.call(this.vm, value, oldValue); // 内部 watcher：直接调用回调
  }
};
//...忽略部分代码...
function queueWatcher(watcher) {
  // 获取 watcher 的唯一标识符 每个 Watcher 实例在创建时都会获得一个自增的 id
  var id = watcher.id;
  // 将 watcher 加入队列
  queue.push(watcher);
  has[id] = true; // 标记该 watcher 已加入队列

  // config.async 配置项控制更新是否异步
  if (!config.async) {
    // 直接执行，不经过异步队列
    // [!code hl]
    flushSchedulerQueue(); // 最后调用 watcher.run() 方法
    return;
  }
  nextTick(flushSchedulerQueue); // 延迟执行，加入异步队列
}
```

```js [flushSchedulerQueue]
// 刷新调度队列，执行所有待更新的 watcher
function flushSchedulerQueue() {
  // ...忽略部分代码...
  var watcher, id;
  /**
   * 步骤1：对队列进行排序
   * 排序确保：
   * 1. 组件从父到子更新（因为父组件总是在子组件之前创建）
   * 2. 组件的用户 watcher 在其渲染 watcher 之前运行（因为用户 watcher 在渲染 watcher 之前创建）
   * 3. 如果一个组件在父组件的 watcher 运行期间被销毁，它的 watchers 可以被跳过
   */
  queue.sort(sortCompareFn);
  // 步骤2：遍历并执行队列中的所有 watcher
  for (index$1 = 0; index$1 < queue.length; index$1++) {
    watcher = queue[index$1]; // 获取当前要处理的 watcher
    // 对于渲染 watcher，触发 beforeUpdate 生命周期钩子
    if (watcher.before) watcher.before();

    /**
     * 执行 watcher 的更新
     * - 对于渲染 watcher：重新渲染组件
     * - 对于 computed watcher：重新计算值
     * - 对于用户 watcher：执行用户回调
     */
    watcher.run(); // [!code hl]
  }
  // ...忽略部分代码...

  callActivatedHooks(activatedQueue); // callHook$1(vm, "activated");

  callUpdatedHooks(updatedQueue); // callHook$1(vm, "updated");
}
```

:::

Watcher 是观察者，负责：

- 观察数据变化
- 收集依赖关系
- 数据变化时执行回调（如更新视图）

### 构造函数

他们的构造器函数如下:

```js
// 1. 渲染 Watcher (Render Watcher)
// 来源：Vue 内部自动创建，每个组件只有一个
new Watcher(
  vm,
  updateComponent,
  noop,
  {
    before() {
      /* 触发 beforeUpdate 钩子 */
    },
  },
  true
); // 第五个参数 isRenderWatcher = true

// 2. 用户 Watcher (User Watcher)
// 来源：用户通过 watch 选项或 $watch 方法创建
new Watcher(vm, expOrFn, cb, {
  user: true, // 标记为用户 watcher
  deep: false, // 可配置
  sync: false, // 可配置
});

// 3. 计算属性 Watcher (Computed Watcher)
// 来源：computed 选项初始化时创建
new Watcher(vm, getter, noop, {
  lazy: true, // 惰性求值
});
```

### 创建时机

```js
// 初始化顺序
function initState(vm) {
  // 1. 先初始化 computed
  if (opts.computed) initComputed(vm, opts.computed);

  // 2. 再初始化 watch
  if (opts.watch) initWatch(vm, opts.watch);
}

// 挂载阶段
Vue.prototype.$mount = function () {
  // 3. 最后创建渲染 watcher
  new Watcher(vm, updateComponent, noop, null, true);
};
```

所以 watcher 创建顺序通常是： `计算属性 watcher -> 用户 watcher -> 渲染 watcher`

## 初始化 computed

### initComputed 源码流程

在`初始化 data` 后，会执行 `initComputed` 函数。

`initComputed`会遍历 **computed** 对象中定义的每个属性，并为它们创建对应的计算属性的 **getter** 和 **setter**（虽然通常只有 getter）。

::: code-group

```js [initComputed]
var computedWatcherOptions = { lazy: true };

// 计算属性系统的核心初始化函数，vm: Vue 实例 | computed 用户定义的 computed 对象
function initComputed(vm, computed) {
  // ...忽略部分代码...
  // vm._computedWatchers 用于存储每个计算属性对应的 Watcher 实例
  // 这样可以在后续访问计算属性时快速找到对应的 watcher
  var watchers = (vm._computedWatchers = Object.create(null));
  var isSSR = isServerRendering(); // 判断是否是服务端渲染

  for (var key in computed) {
    var userDef = computed[key]; // 获取当前计算属性的定义
    // 如果是函数，直接使用该函数作为 getter；否则，尝试获取其 get 方法
    var getter = isFunction(userDef) ? userDef : userDef.get;

    if (!isSSR) {
      // 为每个计算属性创建专用的 watcher
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop, // 回调函数，计算属性不需要执行回调，所以传入 noop 即可
        computedWatcherOptions // {lazy: true}
      );
    }

    // 只有当属性不在 vm 上时才定义  | 避免避免覆盖已定义的 props、data 、methods 等属性
    if (!(key in vm)) defineComputed(vm, key, userDef); // 定义计算属性到 Vue 实例
  }
}
/**
 * 定义计算属性到 Vue 实例
 * @param {Object} target - 目标对象（Vue 实例）
 * @param {string} key - 属性名
 * @param {Function|Object} userDef - 用户定义
 */
function defineComputed(target, key, userDef) {
  // 判断是否应该缓存（非 SSR 环境才缓存）
  var shouldCache = !isServerRendering(); // 客户端缓存 true
  // ...忽略部分代码...

  sharedPropertyDefinition.get = shouldCache
    ? createComputedGetter(key) // 客户端：带缓存的 getter // [!code hl]
    : createGetterInvoker(userDef); // 服务端：直接调用
  sharedPropertyDefinition.set = noop; // 函数形式没有 setter

  // 使用 Object.defineProperty 定义属性
  Object.defineProperty(target, key, sharedPropertyDefinition);
}
```

```js [createComputedGetter]
// 创建带缓存的 computed getter 函数
function createComputedGetter(key) {
  return function computedGetter() {
    // 获取该计算属性对应的 watcher,这里 this 指向 Vue 实例，key 是计算属性的名称
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      //  dirty 默认为 true 表示需要重新计算
      if (watcher.dirty) {
        watcher.evaluate(); // 执行计算，更新 watcher.value 并清除 dirty 标志 // [!code hl]
      }
      // 依赖收集 | 如果当前有活动的 watcher（通常是渲染 watcher），则进行依赖收集
      if (Dep.target) {
        watcher.depend(); // 将计算属性的依赖传递给当前 watcher // [!code hl]
      }
      // 返回计算值
      return watcher.value; // 可能是缓存的值，也可能是刚计算的新值 // [!code hl]
    }
  };
}
// 创建不带缓存的 getter（用于 SSR）
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this); // 服务端渲染：每次访问都直接计算，不进行缓存 // [!code hl]
  };
}
```

:::

### initComputed 要点

我们注意到在 Vue 的计算属性实现中，有两个核心要点 `defineComputed`、`new Watcher`。

它们各自承担不同的职责。下面让我们来看它们的职责与协作：

**Watcher 的作用：计算逻辑 + 依赖管理**

```js
// Watcher 负责：
// 1. 执行计算逻辑（getter函数）
// 2. 收集依赖（哪些响应式数据被访问）
// 3. 缓存计算结果
// 4. 管理脏检查状态
new Watcher(vm, getter, noop, { lazy: true });
```

**defineComputed 的作用：属性访问器 + 缓存调度**

```js
// defineComputed 负责：
// 1. 将计算属性挂载到 vm 实例
// 2. 创建智能的 getter 函数
// 3. 调度何时重新计算（脏检查）
// 4. 建立与渲染 watcher 的连接
Object.defineProperty(vm, "countStr", {
  get: function computedGetter() {
    // 这里调用 watcher 的方法
    if (watcher.dirty) {
      watcher.evaluate(); // 委托给 watcher 计算
    }
    // ...
  },
});
```

二者的协作关系可以类比为餐厅系统去理解:

- Watcher：就像厨师，负责实际烹饪（计算）
- defineComputed：就像服务员，负责接收订单和上菜
- 顾客：就像模板/代码，只关心点菜和吃饭

```js
// 顾客（模板）点菜
{{ countStr }}

// 服务员（defineComputed）接收订单
get: function() {
  // 检查是否需要烹饪
  if (watcher.dirty) {
    // 叫厨师（watcher）烹饪
    watcher.evaluate();
  }
  // 上菜（返回值）
  return watcher.value;
}

// 厨师（watcher）烹饪
evaluate() {
  this.value = this.get();  // 执行计算逻辑
  this.dirty = false;       // 标记为已烹饪
}
```

**Watcher 的职责（计算者）：**

```js
class Watcher {
  evaluate() {
    this.value = this.get(); // 1. 执行计算
    this.dirty = false; // 2. 更新脏标记
  }

  update() {
    if (this.lazy) {
      this.dirty = true; // 3. 标记为需要重新计算
    }
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend(); // 4. 收集上级依赖
    }
  }

  get() {
    pushTarget(this);
    const value = this.getter.call(this.vm, this.vm); // 5. 实际计算
    popTarget();
    return value;
  }
}
```

**defineComputed 的职责（调度者）：**

```js
function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers[key];

    if (watcher) {
      // 1. 检查是否需要计算（调度决策）
      if (watcher.dirty) {
        watcher.evaluate(); // 委托给 watcher
      }

      // 2. 建立依赖链（连接渲染 watcher）
      if (Dep.target) {
        watcher.depend(); // 委托给 watcher
      }

      // 3. 返回结果
      return watcher.value;
    }
  };
}
```

### 计算属性的完整生命周期

```js
// 1. 初始化阶段
initComputed() {
  // 创建 watcher（计算者）
  watchers[key] = new Watcher(vm, getter, noop, { lazy: true });

  // 定义属性（调度者）
  defineComputed(vm, key, userDef);
}

// 2. 访问阶段（用户访问 vm.countStr
computedGetter() {
  // 调度者检查：需要计算吗？
  if (watcher.dirty) {
    // 委托给计算者执行
    watcher.evaluate();  // → watcher.get() → 执行实际计算
  }

  // 调度者建立依赖链
  if (Dep.target) {
    watcher.depend();  // 委托给计算者收集依赖
  }

  // 返回结果
  return watcher.value;
}

// 3. 更新阶段（依赖数据变化时）
// watcher.update() → watcher.dirty = true
// 下次访问时会重新计算
```

**这种设计实际上是[代理模式](/others//design/proxy.md)的应用：**

- defineComputed 是代理（Proxy）
- Watcher 是真实主题（Real Subject）

```js
// 代理：控制访问，添加额外逻辑
const computedGetter = {
  get() {
    // 1. 缓存检查
    // 2. 权限检查（这里没有）
    // 3. 记录日志（这里没有）
    // 4. 延迟初始化

    // 委托给真实对象
    return watcher.evaluate();
  },
};

// 真实主题：实际执行业务逻辑
const watcher = {
  evaluate() {
    // 实际的计算逻辑
    return this.getter();
  },
};
```

现有代码:

```js
// 定义计算属性
computed: {
  countStr() {
     return `当前计数: ${this.count}`;
  }
}


```

它的完整生命周期为：
::: tip 生命周期：

1. 初始化：new Watcher() + defineComputed()
2. 首次访问：脏检查 → evaluate() → 计算 → 缓存
3. 再次访问：直接返回缓存
4. 依赖变化：watcher.update() → dirty = true
5. 重新访问：脏检查 → 重新计算

如果只有 Watcher：步骤 2-5 需要手动管理

如果只有 defineComputed：无法实现步骤 4 的自动通知

:::

由于它：

- 关注点分离：Watcher 专注计算，defineComputed 专注访问控制
- 复用性：Watcher 可以被其他功能复用（如 $watch）
- 扩展性：可以独立修改计算逻辑或访问逻辑
- 集成性：defineComputed 将计算属性集成到 Vue 的属性系统中

所以这种设计让计算属性既能享受 Watcher 的智能依赖追踪，又能像普通属性一样方便使用，是 Vue 响应式系统优雅设计的体现。

### 使用场景

- **基础数据派生 / 格式转换**

将现有数据做格式化、拼接、类型转换等纯计算操作（如时间格式化、金额单位转换、字符串拼接），利用缓存避免重复计算。

```js
// Vue 2 选项式
data() {
  return {
    username: 'zhangsan',
    createTime: 1735689600000, // 时间戳
    amount: 1234 // 分（需转为元）
  };
},
computed: {
  // 字符串拼接：派生用户展示名
  displayName() {
    return `用户名：${this.username.toUpperCase()}`;
  },
  // 时间格式化：时间戳转日期字符串
  formatCreateTime() {
    return new Date(this.createTime).toLocaleDateString();
  },
  // 数值转换：分转元（保留2位小数）
  formatAmount() {
    return (this.amount / 100).toFixed(2);
  }
}

// Vue 3 组合式
import { ref, computed } from 'vue';
const username = ref('zhangsan');
const createTime = ref(1735689600000);
const amount = ref(1234);

const displayName = computed(() => `用户名：${username.value.toUpperCase()}`);
const formatCreateTime = computed(() => new Date(createTime.value).toLocaleDateString());
const formatAmount = computed(() => (amount.value / 100).toFixed(2));
```

- **列表筛选 / 排序**

根据筛选条件、排序规则，对原始列表做过滤 / 排序派生新列表（如电商商品筛选、待办事项过滤）。

```js
// Vue 2 待办事项筛选
data() {
  return {
    todos: [
      { id: 1, text: '学习Vue', done: false },
      { id: 2, text: '写代码', done: true }
    ],
    filterType: 'all' // all/active/completed
  };
},
computed: {
  filteredTodos() {
    switch (this.filterType) {
      case 'active':
        return this.todos.filter(todo => !todo.done);
      case 'completed':
        return this.todos.filter(todo => todo.done);
      default:
        return [...this.todos]; // 返回新数组，避免修改原列表
    }
  },
  // 派生：未完成事项数量
  activeTodoCount() {
    return this.todos.filter(todo => !todo.done).length;
  }
}

// 模板中直接使用
// <div>{{ activeTodoCount }} 个未完成事项</div>
// <ul><li v-for="todo in filteredTodos" :key="todo.id">{{ todo.text }}</li></ul>
```

- **多数据联动计算（依赖多个响应式数据）**

最终值由多个数据共同决定（如购物车总价、表单是否可提交、权限判断）

```js
// Vue 3 购物车总价计算
const cartItems = ref([
  { id: 1, price: 99, quantity: 2 },
  { id: 2, price: 199, quantity: 1 },
]);
const discount = ref(0.8); // 折扣

// 派生：购物车总价（原价*数量*折扣）
const totalPrice = computed(() => {
  const originTotal = cartItems.value.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
  return (originTotal * discount.value).toFixed(2);
});

// 示例2：表单是否可提交（多字段校验）
const form = ref({ username: "", password: "", agree: false });
const canSubmit = computed(() => {
  // 用户名非空 + 密码长度≥6 + 同意协议
  return (
    form.value.username && form.value.password.length >= 6 && form.value.agree
  );
});
```

- **双向绑定的复杂值处理（带 setter 的计算属性）**

需要对[双向绑定](/vue/directive.md#双向绑定)的数据做 “读写分离” 处理（如 v-model 绑定的数值需做范围限制、格式转换）

```js
// Vue 2 带 setter 的计算属性（金额输入框：用户输入元，实际存储分）
data() {
  return {
    amountInCent: 0 // 实际存储：分
  };
},
computed: {
  amountInYuan: {
    // 读：分转元（展示给用户）
    get() {
      return (this.amountInCent / 100).toFixed(2);
    },
    // 写：用户输入元 → 转为分存储
    set(val) {
      const num = Number(val);
      if (isNaN(num)) {
        this.amountInCent = 0;
        return;
      }
      // 限制金额范围：≥0
      this.amountInCent = Math.max(0, Math.round(num * 100));
    }
  }
}

// 模板中双向绑定
// <input v-model="amountInYuan" type="number" placeholder="请输入金额（元）">
```

- **依赖缓存优化**

模板中需要多次访问同一计算结果（如页面多处展示同一派生值），用 computed 缓存替代 methods 重复执行。

```js
// computed 仅在 firstName/lastName 变化时计算一次，多次访问取缓存
computed: {
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
// 模板中直接用：<div>{{ fullName }}</div> <span>{{ fullName }}</span>
```

- **状态判断**

派生 “是否满足某个条件” 的布尔值（如是否登录、是否超出限制、是否选中全部），简化模板中的条件判断。

```js
// Vue 3 状态判断
const user = ref({ isLogin: false, role: "guest" });
const list = ref([{ checked: true }, { checked: false }]);

// 是否登录
const isLoggedIn = computed(() => user.value.isLogin);
// 是否为管理员
const isAdmin = computed(
  () => user.value.isLogin && user.value.role === "admin"
);
// 是否选中全部列表项
const isAllChecked = computed(() => list.value.every((item) => item.checked));
```

## 初始化 watch

### initWatch 源码流程

`$watch`是 **initWatch** 的核心。在初始化 **computed** 后，会执行 `initWatch` 函数来初始化用户定义的 **watch** 配置。

:::code-group

```js [initWatch]
// 初始化 watch 选项，watch:用户定义的 watch 选项
function initWatch(vm, watch) {
  // 遍历 watch 对象的所有属性
  for (var key in watch) {
    var handler = watch[key];
    // 如果 handler 是数组（支持同一个属性多个监听器）
    if (isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else createWatcher(vm, key, handler); // 创建观察者
  }
}

/**
 * 创建观察者（Watcher）
 * @param {Component} vm - Vue 实例
 * @param {string} expOrFn - 要观察的表达式或函数
 * @param {*} handler - 处理函数（可以是函数、字符串、对象）
 * @param {Object} options - 观察选项
 * @returns {Function} 取消观察的函数
 */
function createWatcher(vm, expOrFn, handler, options) {
  // 如果 handler 是对象形式：{ handler: fn, deep: true, immediate: true }
  if (isPlainObject(handler)) {
    options = handler; // options 接收 handler 对象的所有配置属性
    handler = handler.handler; // handler 改为真正的处理函数
  }
  // 如果 handler 是字符串（如 "methodName"）
  if (typeof handler === "string") {
    handler = vm[handler]; // 从 Vue 实例的方法中获取处理函数
  }
  // 调用 Vue 实例的 $watch 方法
  return vm.$watch(expOrFn, handler, options);
}
```

```js [$watch]
/**
 * Vue 原型上的 $watch 方法（公共 API）
 * @param {string|Function} expOrFn - 要观察的表达式或函数
 * @param {Function|Object} cb - 回调函数或配置对象
 * @param {Object} options - 观察选项
 * @returns {Function} 取消观察的函数
 */
Vue.prototype.$watch = function (expOrFn, cb, options) {
  var vm = this;
  // 如果 cb 是对象形式（如 $watch('a', { handler: fn, immediate: true })）
  // // 递归调用 createWatcher 处理对象形式的 cb
  if (isPlainObject(cb)) return createWatcher(vm, expOrFn, cb, options);

  options = options || {}; // 确保 options 是对象
  // 标记这是用户定义的 watcher（与内部渲染 watcher、计算属性 watcher 区分）
  options.user = true;

  // 创建 Watcher 实例，用于观察表达式或函数的变化
  var watcher = new Watcher(vm, expOrFn, cb, options);

  // 如果设置了 immediate: true，立即执行一次回调
  if (options.immediate) {
    // ...忽略部分代码...
    // 执行回调，传入当前值作为参数
    invokeWithErrorHandling(cb, vm, [watcher.value], vm, "callback for...");
  }
  // 返回取消观察的函数
  return function unwatchFn() {
    watcher.teardown(); // 清理 watcher，移除所有依赖
  };
};
```

:::

将源码转换为流程图我们可以得到：

```text
initWatch(vm, watch)
    |
    v
遍历 watch 对象
    |
    |-------------------------------
    |                              |
Array.isArray(handler)           不是数组
    |                              |
    v                              v
遍历数组中的每个 handler        createWatcher(vm, key, handler)
    |                              |
    v                              v
createWatcher(vm, key, handler[i]) 处理 handler
    |                              |
    |------------------------------|
    |
    v
handler 是对象？ → 提取 handler.handler
    |
    v
handler 是字符串？ → 从 vm[handler] 获取方法
    |
    v
调用 vm.$watch(expOrFn, handler, options)
    |
    v
创建 Watcher 实例
    |
    v
返回 unwatch 函数（但 initWatch 中不保存）
```

**自定义 watch 的完整生命周期**:

```js
// 数据变化时
data: { count: 0 }

// 修改数据
this.count++

// 执行流程：
1. count setter 触发
2. dep.notify() → 通知所有 watcher
3. watcher.update() 被调用
4. queueWatcher(watcher) → 加入队列
5. nextTick(flushSchedulerQueue) → 异步执行
6. 执行 watcher.run() → 调用回调

```

### 深度观察

在`vm.$watch`时，传入三个入参 expOrFn, handler, options，其中:

- expOrFn 是要观察的表达式或函数
- handler 是回调函数或者配置对象
- **options** 是可选的观察选项。

::: tip 其中 options 中可以配置深度观察、立即执行等选项。

- immediate: Boolean 立即执行
- deep: Boolean 深度观察
- sync: Boolean 同步执行

:::
当配置 **deep** 为 true 时，会深度观察对象内部属性的变化。这对于监听复杂数据结构非常有用。

:::code-group

```js [ get ]
Watcher.prototype.get = function () {
  pushTarget(this); // 1. 设置当前 watcher 为依赖收集目标
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm); // 2. 执行 getter，触发初始依赖收集
  } finally {
    // 3. 关键：深度遍历收集依赖
    if (this.deep) traverse(value); // 深度遍历对象
    popTarget(); // 4. 恢复之前的 watcher
    this.cleanupDeps(); // 5. 清理旧依赖
  }
  return value;
};

var seenObjects = new _Set(); // 存储已访问对象的 ID，防止循环引用

function traverse(val) {
  _traverse(val, seenObjects); // 深度遍历
  seenObjects.clear(); // 清空集合，避免内存泄漏
  return val; // 返回原值（方便链式调用）
}
```

```js [ traverse ]
// 用于深度遍历对象以收集所有嵌套属性的依赖
function _traverse(val, seen) {
  var i, keys; // 循环变量
  var isA = isArray(val); // 判断是否为数组
  if (
    (!isA && !isObject(val)) || // 条件1：不是数组也不是对象
    val.__v_skip || // 条件2：标记了跳过响应式
    Object.isFrozen(val) || // 条件3：对象被冻结
    val instanceof VNode // 条件4：虚拟DOM节点
  ) {
    return; // 不再继续递归
  }
  if (val.__ob__) {
    // 如果对象是响应式的（有 Observer 实例）
    var depId = val.__ob__.dep.id; // 获取依赖收集器的唯一ID
    if (seen.has(depId)) {
      return; // 已经访问过这个对象，防止无限递归
    }
    seen.add(depId); // 记录这个对象已被访问
  }
  if (isA) {
    // 处理数组情况
    i = val.length;
    // 倒序遍历， 比 for 循环更快（少一次变量声明和比较）
    while (i--) _traverse(val[i], seen); // val[i]触发响应式数据 getter 收集依赖 // [!code hl]
  } else if (isRef(val)) {
    _traverse(val.value, seen); // ref 对象（Vue 3 特有）访问 .value 属性  // [!code hl]
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) _traverse(val[keys[i]], seen); // 普通对象 遍历循环 // [!code hl]
  }
}
```

:::

这个函数是 Vue 响应式系统实现 深度观察（deep watch） 的核心机制，确保即使对象嵌套很深，任何属性的变化都能被检测到并触发更新。

### watch 的各种写法

**写法 1：函数形式（最常用）**:

```js
watch: {
  // 直接定义函数
  count(newVal, oldVal) {
    console.log('count changed:', newVal, oldVal);
  }
}
```

写法 2：字符串形式（方法名）

```js
methods: {
  onCountChanged(newVal, oldVal) {
    console.log('count changed');
  }
},
watch: {
  count: 'onCountChanged'  // 指向 methods 中的方法
}
```

**写法 3：对象形式（配置选项）**:

```js
watch: {
  count: {
    handler(newVal, oldVal) {
      console.log('count changed');
    },
    deep: true,      // 深度观察
    immediate: true, // 立即执行
    flush: 'sync'    // 同步执行
  }
}
```

**写法 4：数组形式（多个处理器）**:

```js
watch: {
  count: [
    // 处理器1：函数
    function handler1(newVal, oldVal) {
      console.log("handler1");
    },
    // 处理器2：方法名
    "onCountChanged",
    // 处理器3：对象形式
    {
      handler: function handler3(newVal, oldVal) {
        console.log("handler3");
      },
      immediate: true,
    },
  ];
}
```

### 使用场景

**实时数据联动**：

筛选条件、查询参数变更后，实时更新列表、图表或统计数据（如电商商品筛选、后台管理系统的表格筛选）。

```js
// 避免在 handler 中写过重的逻辑（如大量 DOM 操作），否则会导致页面卡顿。

// Vue 2 选项式
watch: {
  filterType: {
    handler(val) {
      // 筛选条件变化 → 重新请求列表数据
      this.fetchGoodsList(val);
    },
    immediate: true // 页面加载时先执行一次，初始化列表
  }
}

// Vue 3 组合式
watch(() => filterType, (val) => {
  fetchGoodsList(val);
}, { immediate: true });
```

**表单实时验证**：

表单字段变更时实时验证（如手机号格式、密码强度、验证码长度校验），提升用户体验

```js
// Vue 2 带防抖的手机号验证
import { debounce } from 'lodash';
watch: {
  phone: {
    handler: debounce(function(val) {
      this.phoneValid = /^1[3-9]\d{9}$/.test(val); // 验证手机号格式
    }, 300), // 输入防抖 300ms，避免频繁校验
    immediate: true
  }
}
```

**[防抖](/javascript/es6.md) / [节流](/javascript/throttle.md)**：

数据变化触发异步请求（如搜索联想、分页切换、筛选条件提交）。

```js
// Vue 3 搜索联想请求（带错误处理）
watch(
  () => searchKey,
  async (val) => {
    if (!val) {
      this.suggestList = [];
      return;
    }
    try {
      // 防抖后请求接口，避免频繁调用
      const res = await getSearchSuggest(val);
      this.suggestList = res.data;
    } catch (err) {
      this.$message.error("联想词加载失败"); // 必须加错误处理
    }
  },
  {
    handler: debounce(handler, 300),
    immediate: true,
  }
);
```

**路由参数监听**：

监听路由参数 / 路径变化（如详情页切换 ID 重新请求数据、标签页切换更新页面内容）。

```js
// Vue 2 监听路由 ID 参数
watch: {
  '$route.params.id': {
    handler(val) {
      this.fetchDetail(val); // ID 变化 → 重新请求详情
    },
    immediate: true
  }
}

// Vue 3 组合式API
import { useRoute } from 'vue-router';
const route = useRoute();
watch(() => route.params.id, (val) => {
  fetchDetail(val);
}, { immediate: true });
```

**组件间状态联动（跨组件通信）**：

监听父组件传递的 props、全局状态（如 Vuex/Pinia）变化，实现子组件状态联动。

```js
// Vue 2 子组件监听 props 变化
props: ['parentValue'],
watch: {
  parentValue: {
    handler(val) {
      this.childValue = val; // 同步父组件值到子组件
      // 如需回传，配合 $emit
      this.$emit('update:parentValue', val + 1);
    },
    immediate: true
  }
}
```

**动画 / DOM 操作触发**：

数据变更后执行 DOM 操作、动画效果（如列表更新后滚动到指定位置、元素显隐动画）。

```js
// 配合 $nextTick（确保 DOM 已更新），避免操作未渲染的 DOM。
// Vue 2 列表更新后滚动到底部
watch: {
  listData: {
    handler() {
      this.$nextTick(() => {
        // DOM 已更新，执行滚动操作
        const scrollBox = this.$refs.scrollBox;
        scrollBox.scrollTop = scrollBox.scrollHeight;
      });
    },
    deep: true
  }
}
```

**状态缓存 / 过期清理**：

监听缓存数据变化，设置过期时间（如本地缓存的用户信息、临时筛选条件）。

```js
// Vue 3 监听缓存状态，设置过期清理
let cacheTimer = null;
watch(
  () => cacheData,
  (val) => {
    // 清除旧定时器
    clearTimeout(cacheTimer);
    // 5 分钟后清理缓存
    cacheTimer = setTimeout(() => {
      this.cacheData = null;
      localStorage.removeItem("cacheKey");
    }, 5 * 60 * 1000);
  },
  { immediate: true }
);
```
