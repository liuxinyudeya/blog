# 响应式系统

可以说 vuejs 最大的特性就是响应式系统，即 当数据发生变化时，在不刷新页面的情况下，数据可以自动更新到页面上。
在这个过程中，我们主要关注两个阶段：

- 数据更新: 对于数据 count,当它发生变化时，如何使依赖 count 的数据也发生变化
- 视图更新: 当页面数据发生变化时，如何将变化后的新数据重新渲染到页面上

## 入口

当`new Vue({...})`时，Vue 构造函数会调用`_init()`方法（在`initMixin()`中挂载）。
::: code-group

```js [initMixin]:line-numbers {82}
/**
 * 初始化 Vue 的原型方法
 * 这个函数是 Vue 构造函数的核心初始化方法
 */
function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // 保存当前实例引用

    // ... 忽略部分代码 ...

    // 调用 beforeCreate 生命周期钩子
    // 此时：数据观测、事件/侦听器配置还未初始化
    callHook$1(vm, "beforeCreate", undefined, false /* setContext */);

    // 初始化状态：props, methods, data, computed, watch
    // 这是 Vue 响应式系统的核心
    initState(vm);

    // 调用 created 生命周期钩子
    // 此时：数据观测已完成，事件/侦听器已配置，但 DOM 还未挂载
    callHook$1(vm, "created");

    // 如果提供了 el 选项，自动挂载
    if (vm.$options.el) {
      // 渲染组件到 DOM，自动挂载实例
      vm.$mount(vm.$options.el);
    }
  };
}
```

```js [initState]:line-numbers {23,34,39}
/**
 * 初始化 Vue 实例的状态（State）
 * 这是 Vue 响应式系统的核心入口函数
 * 负责初始化 props、methods、data、computed、watch 等状态
 *
 * @param {Component} vm - Vue 组件实例
 */
function initState(vm) {
  // 获取组件的配置选项
  var opts = vm.$options;

  // 初始化 props，将父组件传递的数据转换为响应式
  if (opts.props) initProps$1(vm, opts.props);

  // Composition API 的 setup() 函数初始化
  //  setup() 的执行时机在 props 之后，data 之前
  initSetup(vm);

  // 将 methods 中的方法绑定到实例上
  if (opts.methods) initMethods(vm, opts.methods);

  if (opts.data) {
    initData(vm); // 初始化 data 选项，转换为响应式数据
  } else {
    // 如果没有 data 选项，创建一个空对象作为 _data
    // 并使其变为响应式
    var ob = observe((vm._data = {}));

    // 递增 vmCount，用于跟踪有多少组件实例使用了这个响应式对象
    ob && ob.vmCount++;
  }

  // 初始化计算属性
  if (opts.computed) initComputed$1(vm, opts.computed);

  if (opts.watch && opts.watch !== nativeWatch) {
    // 初始化侦听器（watch）
    // nativeWatch 检查是为了避免在 Firefox 中 Object.prototype.watch 的影响
    initWatch(vm, opts.watch);
  }
}
```

:::

## 初始化 data

:::code-group

```js [initData]:line-numbers {72}
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

```js [observe]:line-numbers {14}
/**
 * 观察数据对象，使其变为响应式
 * 这是 Vue 响应式系统的核心入口函数
 *
 * @param {*} value - 要观察的数据值
 * @param {boolean} shallow - 是否浅观察（只观察第一层属性）
 * @param {boolean} ssrMockReactivity - 是否在 SSR 环境下模拟响应式
 * @returns {Observer|undefined} - 返回 Observer 实例或 undefined
 */
function observe(value, shallow, ssrMockReactivity) {
  // ==================== 1. 已观察过的快速返回 ====================

  // 如果数据已经被观察过，直接返回已有的 Observer 实例
  // 避免重复创建 Observer，提高性能并确保数据一致性
  if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }

  // ==================== 2. 创建新 Observer 的条件检查 ====================

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
    // 所有条件都满足，创建新的 Observer 实例
    return new Observer(value, shallow, ssrMockReactivity);
  }
  // 如果不符合条件，返回 undefined
  // 注意：对于基础类型（string、number、boolean、null、undefined）会返回 undefined
}
```

```js [Observer]:line-numbers {42}
/**
 * Vue 响应式系统的核心 - Observer 类
 * 负责将普通对象/数组转换为响应式对象
 * 这是 Vue 响应式数据转换的核心实现
 */
var Observer = /** @class */ (function () {
  /**
   * Observer 构造函数
   * @param {Object|Array} value - 需要被观察的数据
   * @param {boolean} shallow - 是否浅观察（只观察第一层属性）
   * @param {boolean} mock - 是否为 mock 模式（SSR 环境使用）
   */
  function Observer(value, shallow, mock) {
    // ... 忽略部分代码 ...

    // 创建依赖收集器（Dep 实例）
    // mock 模式下使用预定义的 mockDep，减少开销
    this.dep = mock ? mockDep : new Dep();
    // ============ 对象处理 ============

    /**
     * 遍历对象的所有属性并将它们转换为 getter/setter
     * 这个方法只应在值类型为 Object 时调用
     */
    var keys = Object.keys(value);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // 对每个属性调用 defineReactive 转换为响应式
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
在`Observer`函数中，调用`defineReactive`函数，将对象的每个属性转换为 getter/setter。这个过程是 Vue 响应式系统的核心：

```js [defineReactive]:line-numbers {10,42}
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

执行链路为：

> 加载 vuejs -> ... initMixin ...
>
> -> new Vue -> \_init
>
> -> initState -> initData ->observe -> defineReactive -> new Dep

在此我们主要关注 `Dep()`的实现。

依赖收集时做了三层处理：

1. 收集 obj.key 的依赖 (dep.depend())
2. 收集子对象 childOb 的依赖 (childOb.dep.depend())
3. 如果是数组，收集数组元素的依赖 （dependArray()），收集依赖后当数据发生变化时: <br>
   data.count = 1; -> 调用 dep.notify() 通知所有依赖更新 -> sub.update(); 触发观察者 update()函数。

现在我们知道了依赖收集的流程：

- 将数据声明成响应式，在依赖收集阶段将观察者（Watcher）添加到 Dep 实例的 subs 中。
- 当数据变化时，通过 dep.notify() 方法通知所有订阅了该数据的 Watcher 进行更新操作。

下面我们来看有哪些类型的依赖，不同类型的 watcher 的作用是什么。他们是如何实现 update()的。

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

```js [watcher.js]:line-numbers {1,20}
/**
 * Vue 响应式系统的核心 - Watcher 类
 * 负责依赖收集和派发更新的观察者
 * 连接响应式数据和视图更新的桥梁
 */
var Watcher = /** @class */ (function () {
  /**
   * Watcher 构造函数
   * @param {Component} vm - Vue 组件实例
   * @param {string|Function} expOrFn - 要观察的表达式或函数
   * @param {Function} cb - 值变化时的回调函数
   * @param {Object} options - 配置选项
   * @param {boolean} isRenderWatcher - 是否是渲染 watcher
   */
  function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
    // ==================== 1. Effect Scope 管理 ====================

    // 记录 effect scope (Vue 3 Composition API 概念)
    // 用于自动清理副作用，防止内存泄漏
    recordEffectScope(
      this,
      // 作用域优先级：
      // 1. 手动创建的 activeEffectScope（不是组件作用域）优先
      // 2. 然后是组件的 vm._scope
      // 3. 最后是 undefined
      activeEffectScope && !activeEffectScope._vm
        ? activeEffectScope
        : vm
        ? vm._scope
        : undefined
    );

    // ==================== 2. 实例关系建立 ====================

    // 建立与 Vue 实例的关联
    if ((this.vm = vm) && isRenderWatcher) {
      // 如果是渲染 watcher，将其挂载到实例上
      vm._watcher = this; // 每个组件只有一个渲染 watcher
    }

    // ==================== 3. 选项配置处理 ====================

    if (options) {
      // 深度观察：递归追踪嵌套属性的变化
      this.deep = !!options.deep;
      // 用户定义的 watcher：需要特殊错误处理
      this.user = !!options.user;
      // 惰性 watcher：用于计算属性，延迟求值
      this.lazy = !!options.lazy;
      // 同步执行：跳过异步队列，立即执行
      this.sync = !!options.sync;
      // before 钩子：在更新前调用（用于渲染 watcher）
      this.before = options.before;

      // 开发环境下的调试钩子
      {
        // 追踪依赖时调用
        this.onTrack = options.onTrack;
        // 触发更新时调用
        this.onTrigger = options.onTrigger;
      }
    } else {
      // 默认配置
      this.deep = this.user = this.lazy = this.sync = false;
    }

    // ==================== 4. 基本属性初始化 ====================

    // 回调函数
    this.cb = cb;
    // watcher 的唯一标识（用于批量更新）
    this.id = ++uid$1;
    // 活跃状态标记
    this.active = true;
    // 是否在队列中（用于 post 更新）
    this.post = false;
    // 脏数据标记（用于惰性 watcher）
    this.dirty = this.lazy;

    // ==================== 5. 依赖管理相关属性 ====================

    // 当前依赖的 Dep 实例列表
    this.deps = [];
    // 新一轮收集的依赖（临时存储）
    this.newDeps = [];
    // 当前依赖的 ID 集合（用于去重）
    this.depIds = new _Set();
    // 新一轮依赖的 ID 集合（临时存储）
    this.newDepIds = new _Set();

    // ==================== 6. 表达式解析 ====================

    // 表达式字符串（用于调试和错误信息）
    this.expression = expOrFn.toString();

    // 解析表达式，获取 getter 函数
    if (isFunction(expOrFn)) {
      // 如果已经是函数，直接作为 getter
      this.getter = expOrFn;
    } else {
      // 否则解析路径表达式（如 'obj.a.b'）
      this.getter = parsePath(expOrFn);
    }

    // ==================== 7. 初始求值 ====================

    // 计算初始值（惰性 watcher 不立即求值）
    this.value = this.lazy ? undefined : this.get();
  }

  /**
   * 求值并重新收集依赖
   * 核心方法：执行 getter 函数，触发依赖收集
   */
  Watcher.prototype.get = function () {
    // 将当前 watcher 设置为全局的 target
    // 这样在访问响应式数据时，就能将当前 watcher 收集为依赖
    pushTarget(this);

    var value;
    var vm = this.vm;

    try {
      // 执行 getter 函数
      // 这会访问响应式数据，触发它们的 getter
      // 在 getter 中会调用 dep.depend() 将当前 watcher 添加到依赖中
      value = this.getter.call(vm, vm);
    } catch (e) {
      // 错误处理
      if (this.user) {
        // 用户 watcher：友好错误提示
        handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
      } else {
        // 内部 watcher：直接抛出
        throw e;
      }
    } finally {
      // 深度观察：递归遍历对象的所有属性
      if (this.deep) traverse(value);

      // 恢复之前的 target watcher
      popTarget();

      // 清理依赖：比较新旧依赖，移除不再需要的依赖
      this.cleanupDeps();
    }

    return value;
  };

  /**
   * 添加一个依赖
   * 由 Dep 实例调用，建立 watcher 和 dep 的双向关系
   */
  Watcher.prototype.addDep = function (dep) {
    var id = dep.id;

    // 避免重复添加同一个依赖
    if (!this.newDepIds.has(id)) {
      // 记录到新依赖集合中
      this.newDepIds.add(id);
      this.newDeps.push(dep);

      // 如果是新的依赖（之前没有），还需要让 dep 也记住这个 watcher
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };

  /**
   * 清理依赖
   * 比较新旧依赖列表，移除不再需要的依赖关系
   */
  Watcher.prototype.cleanupDeps = function () {
    var i = this.deps.length;

    // 遍历旧依赖，移除不在新依赖中的依赖
    while (i--) {
      var dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        // 从 dep 的订阅者列表中移除当前 watcher
        dep.removeSub(this);
      }
    }

    // 交换依赖集合，准备下一轮收集

    // 交换 ID 集合
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear(); // 清空新集合

    // 交换 Dep 实例列表
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0; // 清空新列表
  };

  /**
   * 订阅者接口
   * 当依赖发生变化时被调用
   */
  Watcher.prototype.update = function () {
    /* istanbul ignore else */
    if (this.lazy) {
      // 惰性 watcher：只标记为脏数据，不立即求值
      this.dirty = true;
    } else if (this.sync) {
      // 同步模式：立即执行，不经过异步队列
      this.run();
    } else {
      // 默认：加入异步更新队列
      queueWatcher(this);
    }
  };

  /**
   * 调度任务接口
   * 由调度器调用，执行实际的更新
   */
  Watcher.prototype.run = function () {
    if (this.active) {
      // 获取新值（会重新收集依赖）
      var value = this.get();

      // 判断是否需要执行回调
      if (
        // 值发生变化
        value !== this.value ||
        // 对象或数组，即使引用相同也可能需要回调（因为内部可能发生了变化）
        isObject(value) ||
        // 深度观察，即使引用相同也需要回调
        this.deep
      ) {
        // 保存旧值
        var oldValue = this.value;
        // 更新值
        this.value = value;

        if (this.user) {
          // 用户 watcher：错误处理包装
          var info = 'callback for watcher "'.concat(this.expression, '"');
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          );
        } else {
          // 内部 watcher：直接调用回调
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };

  /**
   * 对 watcher 求值
   * 只对惰性 watcher（计算属性）调用
   */
  Watcher.prototype.evaluate = function () {
    // 计算当前值
    this.value = this.get();
    // 标记为已计算（不再是脏数据）
    this.dirty = false;
  };

  /**
   * 依赖其收集的所有依赖
   * 用于计算属性的依赖向上传递
   */
  Watcher.prototype.depend = function () {
    var i = this.deps.length;

    // 遍历所有依赖，让它们也收集当前的渲染 watcher
    while (i--) {
      this.deps[i].depend();
    }
  };

  /**
   * 从所有依赖的订阅列表中移除自己
   * 用于销毁 watcher，防止内存泄漏
   */
  Watcher.prototype.teardown = function () {
    // 从 effect scope 中移除
    if (this.vm && !this.vm._isBeingDestroyed) {
      remove$2(this.vm._scope.effects, this);
    }

    if (this.active) {
      // 从所有依赖的订阅者列表中移除自己
      var i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }

      // 标记为非活跃状态
      this.active = false;

      // 调用停止回调
      if (this.onStop) {
        this.onStop();
      }
    }
  };

  return Watcher;
})();
```

## 初始化 user watcher

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
```

:::

## 初始化 computed watcher

::: code-group

```js [watcher.js]:line-numbers {1,20}
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
      // ...错误提示
    }
  }
}
```

```js [watcher.js]:line-numbers {1,20}
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

```js [watcher.js]:line-numbers {1,20}
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
