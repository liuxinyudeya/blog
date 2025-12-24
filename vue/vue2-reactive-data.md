# 响应式系统

可以说 vuejs 最大的特性就是响应式系统，即 当数据发生变化时，在不刷新页面的情况下，数据可以自动更新到页面上。
在这个过程中，我们主要关注两个阶段：

- 数据更新: 对于数据 count,当它发生变化时，如何使依赖 count 的数据也发生变化
- 视图更新: 当页面数据发生变化时，如何将变化后的新数据重新渲染到页面上

## 入口

当 `new Vue({...})` 时，Vue 构造函数会调用`_init()`方法。

::: code-group

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

此时我们就遇到 [Vue 生命周期](/vue/lifecycle.md) 的第一个钩子函数：`beforeCreate`。
:::info 在 `beforeCreate` 钩子函数中：
我们可以做一些初始化操作，比如设置一些初始数据。<br>
我们可以访问到组件的配置选项（options），但是此时还没有初始化 data、computed 等状态。<br>
:::
在`beforeCreate` 钩子函数之后，紧接着会执行 `initState()` 方法。<br>
`initState` 是 Vue 响应式系统的核心入口函数，在这里进行

- 初始化 props，将父组件传递的数据转换为响应式
- 初始化 methods，将方法绑定到实例上
- **初始化 data，将数据转换为响应式**
- 初始化 computed，计算属性
- 初始化 watch，侦听器

在这里我先着重讲解初始化 data 的过程，因为这是响应式系统的核心。

## 初始化 data

### initData 源码

:::tip 调用流程为：
`initData -> observe -> new Observer -> defineReactive -> Dep`
:::

需要注意 Observer 中 `this.dep = mock ? mockDep : new Dep();` ? TODO<br>
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
    // TODO 创建依赖收集器（Dep 实例） mock 模式下使用预定义的 mockDep，减少开销
    this.dep = mock ? mockDep : new Dep();

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

vue 响应式数据的设计思想应用了[发布订阅模式](/design/design.md)<br>
我们先来看`Dep` 实例:

- 内部维护了一个订阅者列表 `subs`，用于存储所有依赖该属性的 观察者`Watcher` 实例。
- 提供了 `addSub` 和 `removeSub` 方法，用于添加和移除订阅者。
- 提供了 `depend` 和 `notify` 方法，用于依赖收集和通知更新。

`defineReactive` 函数通过 **Object.defineProperty** 方法劫持了对象的属性，实现了依赖收集和派发更新的功能。

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

## 初始化 computed

### initComputed 源码

::: code-group

```js [initComputed]
// 计算属性系统的核心初始化函数，vm: Vue 实例 | computed 用户定义的 computed 对象
function initComputed(vm, computed) {
  // ...忽略部分代码...

  var userDef = computed[key]; // 获取当前计算属性的定义
  // vm._computedWatchers 用于存储每个计算属性对应的 Watcher 实例
  // 这样可以在后续访问计算属性时快速找到对应的 watcher
  var watchers = (vm._computedWatchers = Object.create(null));

  for (var key in computed) {
    // TODO 组件原型上定义的 computed 属性已经在组件初始化时挂载到了原型上 | 这里只需要处理在组件实例化时定义的 computed 属性
    // 这里的 key 就是计算属性的名称，例如：'fullName'
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

## 初始化 watch

### initWatch 源码

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
