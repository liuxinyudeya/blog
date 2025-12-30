# DOM 挂载

DOM 挂载分为两个阶段：

::: tip 首次渲染:

`模板编译 → 生成render函数 → mountComponent → 首次执行_render() → _update() → patch()创建真实DOM`
:::
::: info 视图更新:
`数据变化 → 触发setter → 通知依赖的Watcher → 执行updateComponent → _render()生成新VNode → _update() → patch()对比更新`
:::

在本节我们主要关注 在`模板编译`后生成 `AST 语法树`以及渲染函数`render`后 进行的**首次渲染**

## 流程回顾

在 创建 VUE 实例时，通过 `new vue`调用`_init`开启流程后:
::: code-group

```js [ 加载 VueJs ]
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
```

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
```

```js [initRender]
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

```js [$mount]
Vue.prototype.$mount = function (el, hydrating) {
  // ...
  if (!options.render) {
    // 模板编译
    var _a = compileToFunctions(),
      render = _a.render,
      staticRenderFns = _a.staticRenderFns;
    options.render = render;
    options.staticRenderFns = staticRenderFns;
  }
  return mount.call(this, el, hydrating);
};

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

:::

## 虚拟 DOM 创建

### mountComponent

::: code-group

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
  // 3. 定义更新组件的函数（核心渲染逻辑）
  var updateComponent;
  //  执行渲染和更新
  updateComponent = function () {
    vm._update(vm._render(), hydrating);
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
  // 这个Watcher会在构造函数中立即执行一次getter（updateComponent） 实现首次渲染
  new Watcher(
    vm, // 组件实例
    updateComponent, // getter函数（每次依赖变化时执行）
    noop, // 回调函数（这里为空函数）
    watcherOptions, // 选项配置
    true // 标记为渲染Watcher（isRenderWatcher）
  );
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

```js [Watcher]
// watcher.js - Watcher 构造函数
class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    // vm = 组件实例
    // expOrFn = updateComponent 函数
    // cb = noop（空函数）
    // options = watcherOptions
    // isRenderWatcher = true

    this.vm = vm; // 保存组件实例引用
    vm._watchers.push(this); // 添加到组件watchers数组

    // 步骤2：如果是渲染Watcher，特殊标记
    if (isRenderWatcher) {
      vm._watcher = this; // 关键：保存到 vm._watcher
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
      this.getter = expOrFn; // getter = updateComponent
    }

    // 步骤5：依赖数组初始化
    this.deps = []; // 当前watcher依赖的所有dep
    this.newDeps = []; // 新收集的依赖
    this.depIds = new Set(); // 依赖ID集合（去重用）
    this.newDepIds = new Set();

    // 步骤6：立即求值（触发首次渲染）
    this.value = this.lazy ? undefined : this.get(); // 立即执行！
  }
}
```

```js [get]
class Watcher {
  get() {
    // 步骤2.1：设置当前watcher为依赖收集目标
    pushTarget(this); // Dep.target = 当前watcher

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
创建渲染 Watcher 时，在 Watcher 构造函数中：

> // 步骤 6：立即求值（触发首次渲染）
>
> this.value = this.lazy ? undefined : this.get(); // 立即执行！

触发在 `renderMixin` 挂载 `_render`函数

### render

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
      // 6. 关键：执行render函数生成虚拟DOM
      // function() {
      //   with(this) {
      //     return _c('div',
      //       { attrs: { id: "app" } },
      //       [
      //         _c('p', [_v(_s(countStr))]),    // 访问computed: countStr
      //         _c('button', { on: { click: function($event) { count++ } } }, [_v("点击 +1")])
      //       ]
      //     )
      //   }
      // }
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

::: code-group

```js [_c]
function isDef(v) {
  return v !== undefined && v !== null;
}
vm._c = function (a, b, c, d) {
  return createElement(vm, a, b, c, d, false);
};
function createElement(
  context, // vm 实例
  tag, // 标签名（如 'div'）
  data, // 数据对象（如 { attrs: { id: "app" } }）
  children, // 子节点数组
  normalizationType, // 标准化类型
  alwaysNormalize // 是否总是标准化
) {
  // 处理参数重载（兼容不同调用方式）
  if (isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  // 如果是模板编译，alwaysNormalize = false
  // 如果是用户手写render，alwaysNormalize = true
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  // 调用真正的创建函数
  return _createElement(context, tag, data, children, normalizationType);
}
```

```js [_createElement]
/**
 * 创建虚拟DOM节点的核心函数
 * 这是Vue虚拟DOM系统的核心，负责创建VNode
 *
 * @param {Component} context - Vue组件实例
 * @param {string|Component} tag - 标签名或组件选项
 * @param {VNodeData} data - VNode数据对象（属性、事件等）
 * @param {any} children - 子节点
 * @param {number} normalizationType - 标准化类型
 * @return {VNode} 返回创建的虚拟节点
 */
function _createElement(context, tag, data, children, normalizationType) {
  // 1. 安全检查：数据对象不能是响应式的（防止内存泄漏）
  if (isDef(data) && isDef(data.__ob__)) {
    warn$2("Avoid using observed data object as !", context);
    return createEmptyVNode(); // 返回空节点防止错误
  }

  // 2. 处理动态组件语法：<component :is="currentComponent">   如果data中有is属性，使用它作为tag
  if (isDef(data) && isDef(data.is)) {
    tag = data.is; // 例如：data.is = "MyComponent"
  }
  // 3. 如果没有tag（组件is属性设置为假值），返回空节点
  if (!tag) {
    return createEmptyVNode(); // 例如：<component :is="null"></component>
  }
  // 4. 警告：避免使用非原始值作为key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    warn$2("Avoid using non-primitive value as key ", context);
  }
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
    if (isDef(data)) registerDeepBindings(data); // 注册深度绑定（用于动态class/style）
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
```

```js [VNode]
var VNode = /** @class */ (function () {
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
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }
  Object.defineProperty(VNode.prototype, "child", {
    // DEPRECATED: alias for componentInstance for backwards compat.
    /* istanbul ignore next */
    get: function () {
      return this.componentInstance;
    },
    enumerable: false,
    configurable: true,
  });
  return VNode;
})();
```

```js [createComponent]
function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== "function") {
    {
      warn$2("Invalid Component definition: ".concat(String(Ctor)), context);
    }
    return;
  }
  // async component
  var asyncFactory;
  // @ts-expect-error
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }
  data = data || {};
  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);
  // transform component v-model data into props & events
  if (isDef(data.model)) {
    // @ts-expect-error
    transformModel(Ctor.options, data);
  }
  // extract props
  // @ts-expect-error
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);
  // functional component
  // @ts-expect-error
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  }
  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;
  // @ts-expect-error
  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }
  // install component management hooks onto the placeholder node
  installComponentHooks(data);
  // return a placeholder vnode
  // @ts-expect-error
  var name = getComponentName(Ctor.options) || tag;
  var vnode = new VNode(
    // @ts-expect-error
    "vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""),
    data,
    undefined,
    undefined,
    undefined,
    context,
    // @ts-expect-error
    {
      Ctor: Ctor,
      propsData: propsData,
      listeners: listeners,
      tag: tag,
      children: children,
    },
    asyncFactory
  );
  return vnode;
}
```

:::
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
