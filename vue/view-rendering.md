# 视图渲染

上文中我们了解了 VUE 的响应式数据的设计与实现,接下来我们来看看视图是如何渲染的。

::: tip Vue 的视图渲染过程实际上分为 三个阶段：

模板编译（可选，只在运行时编译时需要）

虚拟 DOM 创建（render 阶段）

真实 DOM 更新（patch 阶段）
:::

**大致流程为**:

```js
// 1. 模板编译阶段（只在运行时编译时存在）
template → parse(解析) → optimize(优化) → generate(生成渲染函数)

// 2. 创建虚拟 DOM 阶段
render() → createElement() → VNode

// 3. 更新真实 DOM 阶段
patch() → diff → DOM 操作
```

## Vue 的渐进式

Vue 是一个[渐进式框架](/vue/progressive.md)，这意味着你可以根据需要选择性地引入 Vue 的不同部分。

对于下述示例，在使渲染视图的过程中我们可以清晰的感受到这一点:

```html [index.html]
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
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

在示例中我们使用了 Vue 的`模板编译`、`响应式数据`和`虚拟 DOM` 三个特性。

通过 CDN 方式引入 Vue.js，使用完整版（包含编译器）的 Vue.js。

## 初始化

加载 VUE.js 后会做一些初始化工作:

```js [ 加载 Vue.js 后]
// 文件加载顺序和覆盖关系：
// 1.首先加载：基础版本
Vue.prototype.$mount = function (el, hydrating) {
  // ← 基础版本
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// 保存基础版本的引用
var mount = Vue.prototype.$mount; // ← 保存到变量 mount

// 2. 然后加载： 完整版本
Vue.prototype.$mount = function (el, hydrating) {
  // ← 完整版本（覆盖）
  // ... 模板编译逻辑

  // 最后调用保存的基础版本
  return mount.call(this, el, hydrating); // ← 调用基础版本
};

function initMixin(Vue) {
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
}
initMixin(Vue); // 初始化 Vue 的原型方法

// new Vue 实例时，会调用 _init 方法进行初始化
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn$2("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}
```

初始化完成后，当我们创建 vue 实例时，会执行`_init()`开启流程。

## 模板编译

模板变异的流程顺序为：

`new Vue()` → `_init()` → `$mount()` → `compileToFunctions()` → `TODO`

:::code-group

```js [ vm.$mount ]
// Vue 实例的挂载方法
Vue.prototype.$mount = function (el, hydrating) {
  // 1. 处理 el 参数：如果提供了 el，则通过 query 方法获取对应的 DOM 元素
  // query 函数内部：如果是字符串选择器，使用 document.querySelector；如果是 DOM 元素，直接返回
  el = el && query(el); // 获取用户配置的el 选项{ el: "#app", ... }

  // 2. 校验当前要挂载的元素是否是 <body> 或 <html>
  if (el === document.body || el === document.documentElement) {
    warn$2(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this; // 返回当前 Vue 实例（this 指向实例），保证链式调用不中断
  }
  // 3. 获取当前 Vue 实例的配置选项
  // 这里的 options 合并了用户传入的选项、全局混入的选项和默认选项
  var options = this.$options;
  /**
   * 如果用户没有提供 render 方法，则尝试从 el 或 template 中获取模板并编译为渲染函数
   * 如果用户已经提供了 render 函数，直接调用基础版本的 $mount 方法 mount.call(this, el, hydrating)
   *  实际上是调用了 runtime-only 版本的 $mount 这个版本会执行渲染和挂载，不包含模板编译逻辑
   */
  // 4. 模板编译的核心逻辑：如果没有提供render函数，需要编译模板
  if (!options.render) {
    var template = options.template; // 获取用户配置的template选项
    // 4.1 处理template选项（优先级最高）
    if (template) {
      // 情况1：template是字符串类型
      if (typeof template === "string") {
        // 子情况1.1：字符串以"#"开头，表示ID选择器（如template: '#app-template'）
        if (template.charAt(0) === "#") {
          // 通过ID获取对应DOM元素的innerHTML作为模板
          template = idToTemplate(template);

          // 子情况1.2：普通HTML字符串（如template: '<div>Hello</div>'） 直接使用，无需特殊处理
        }
        // 情况2：template是DOM元素节点
      } else if (template.nodeType) {
        template = template.innerHTML; // 获取DOM元素的innerHTML作为模板
      } else return this; // 情况3：template是其他无效类型（如对象、数组、函数等）

      // 4.2 没有template选项，但有el选项
    } else if (el) {
      // 获取挂载元素的outerHTML作为模板
      // 例如：<div id="app">{{ message }}</div>，这个div的内容就是模板
      template = getOuterHTML(el);
    }
    // 5. 如果成功获取到模板字符串，开始编译过程
    if (template) {
      // 5.1 核心编译函数：compileToFunctions  将模板字符串编译为可执行的render函数
      var _a = compileToFunctions(
          template, // 要编译的模板字符串
          {
            outputSourceRange: true, // 输出源码位置信息，用于错误追踪
            shouldDecodeNewlines: shouldDecodeNewlines, // 是否解码HTML实体中的换行符
            shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref, // 是否解码href属性中的换行符
            delimiters: options.delimiters, // 自定义插值分隔符，默认是{{ }}，可改为[[ ]]等
            comments: options.comments, // 是否保留模板中的注释
          },
          this // 当前Vue实例，作为编译时的上下文
        ),
        // 解构编译结果
        render = _a.render, // 生成的渲染函数
        staticRenderFns = _a.staticRenderFns; // 静态渲染函数数组（用于优化）

      // 5.3 将编译结果保存到options中
      options.render = render; // 保存渲染函数，供后续_render方法使用
      options.staticRenderFns = staticRenderFns; // 保存静态渲染函数，用于性能优化

      // 注意：如果template为空，且没有render函数，会在后续的mountComponent中处理
    }
  }
  // 6. 调用基础的$mount方法（运行时版本）进行实际挂载
  // mount是在文件开头保存的基础$mount方法引用：var mount = Vue.prototype.$mount; mount.call确保正确的this指向和参数传递
  return mount.call(this, el, hydrating);
};
```

```js [compileToFunctions]
/**
 * Web平台特定的基础编译选项配置对象
 * 这些选项是编译模板时的默认配置，针对Web环境的特定行为进行优化
 */
var baseOptions = {
  expectHTML: true, // 期望输入是HTML，启用HTML解析器
  modules: modules, // 编译模块数组（class、style、model等处理模块）
  directives: directives, // 平台内置指令集合（v-show、v-model等）
  isPreTag: isPreTag, // 判断是否为<pre>标签的函数（<pre>标签内的空格需要保留）
  isUnaryTag: isUnaryTag, // 判断是否为自闭合标签的函数（如<img>、<br>、<input>等）
  mustUseProp: mustUseProp, // 判断哪些属性必须使用DOM元素的property而非attribute
  canBeLeftOpenTag: canBeLeftOpenTag, // 判断哪些标签可以省略闭合标签（如<p>、<li>在某些上下文中）
  isReservedTag: isReservedTag, // 判断是否为HTML/SVG保留标签（非自定义组件）
  getTagNamespace: getTagNamespace, // 获取标签的命名空间（如SVG、MathML）
  staticKeys: genStaticKeys$1(modules), // 生成静态键名集合，用于优化静态节点检测
};

var _a = createCompiler(baseOptions), // 创建编译器实例，传入Web平台配置
  compileToFunctions = _a.compileToFunctions; // 解构获取 compileToFunctions 函数

/**
 * 编译器创建器的工厂函数
 * 这是一个高阶函数，接收基础编译函数 baseCompile，返回创建编译器的函数
 *
 * @param {Function} baseCompile - 基础编译函数，实现 parse → optimize → generate 流程
 * @returns {Function} createCompiler - 创建编译器的工厂函数
 */
var createCompiler = createCompilerCreator(function baseCompile(
  template, // 模板字符串
  options // 编译选项（会与 baseOptions 合并）
) {
  // 1. PARSE（解析）：模板字符串 → 抽象语法树（AST）
  var ast = parse(template.trim(), options); // 去除首尾空白，避免不必要的空白节点

  // 2. OPTIMIZE（优化）：标记AST中的静态节点 条件：options.optimize !== false（默认优化，可配置关闭）
  if (options.optimize !== false) {
    // 优化后，静态节点会标记 static: true 后续更新时，静态节点跳过diff，提升性能
    optimize(ast, options);
  }

  // 3. GENERATE（生成）：AST → 渲染函数代码字符串
  var code = generate(ast, options);

  // 返回编译结果对象
  return {
    ast: ast, // 抽象语法树，可用于代码分析、服务端渲染等
    render: code.render, // 主渲染函数的代码字符串
    staticRenderFns: code.staticRenderFns, // 静态节点渲染函数的代码字符串数组
  };
});
```

```js [createCompilerCreator]
function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };
      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength_1 = template.match(/^\s*/)[0].length;
          warn = function (msg, range, tip) {
            var data = typeof msg === "string" ? { msg: msg } : msg;
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength_1;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength_1;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(
            options.modules
          );
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== "modules" && key !== "directives") {
            finalOptions[key] = options[key];
          }
        }
      }
      finalOptions.warn = warn;
      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }
    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile),
    };
  };
}
```

```js [createCompileToFunctionFn]
function createCompileToFunctionFn(compile) {
  var cache = Object.create(null);
  return function compileToFunctions(template, options, vm) {
    options = extend({}, options);
    var warn = options.warn || warn$2;
    delete options.warn;
    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function("return 1");
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn(
            "It seems you are using the standalone build of Vue.js in an " +
              "environment with Content Security Policy that prohibits unsafe-eval. " +
              "The template compiler cannot work in this environment. Consider " +
              "relaxing the policy to allow unsafe-eval or pre-compiling your " +
              "templates into render functions."
          );
        }
      }
    }
    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key];
    }
    // compile
    var compiled = compile(template, options);
    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn(
              "Error compiling template:\n\n".concat(e.msg, "\n\n") +
                generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn(
            "Error compiling template:\n\n".concat(template, "\n\n") +
              compiled.errors
                .map(function (e) {
                  return "- ".concat(e);
                })
                .join("\n") +
              "\n",
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) {
            return tip(e.msg, vm);
          });
        } else {
          compiled.tips.forEach(function (msg) {
            return tip(msg, vm);
          });
        }
      }
    }
    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors);
    });
    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          "Failed to generate render function:\n\n" +
            fnGenErrors
              .map(function (_a) {
                var err = _a.err,
                  code = _a.code;
                return "".concat(err.toString(), " in\n\n").concat(code, "\n");
              })
              .join("\n"),
          vm
        );
      }
    }
    return (cache[key] = res);
  };
}
```

:::

## 虚拟 DOM 创建

## 真实 DOM 更新

## 初始化 render 源码流程

我们先来看 VUE 实例化的过程中，是如何渲染视图的。

::: code-group

```js [_init]
function Vue(options) {
  if (!(this instanceof Vue)) {
    warn$2("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

/  Vue 构造函数的核心初始化方法
function initMixin(Vue) {
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
      vm.$mount(vm.$options.el); // 渲染组件到 DOM，自动挂载实例 //// [!code hl]
    }
  };
}
```

```js [initRender]
// 初始化渲染相关功能
function initRender(vm) {
  // 1. 初始化虚拟节点相关属性
  vm._vnode = null; // 当前实例的子虚拟DOM树的根节点（渲染时设置）
  vm._staticTrees = null; // 缓存通过 v-once 创建的静态树（优化性能）

  // 2. 获取选项和上下文信息
  var options = vm.$options; // 组件配置选项
  var parentVnode = (vm.$vnode = options._parentVnode); // 父组件中的占位节点
  var renderContext = parentVnode && parentVnode.context; // 渲染上下文（父组件实例）

  // 3. 处理插槽 ｜ options._renderChildren  子节点数组（插槽内容） renderContext 渲染上下文
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  // 4. 处理作用域插槽 ｜ vm.$parent  父组件实例  parentVnode.data.scopedSlots, // 父节点中的作用域插槽数据
  vm.$scopedSlots = parentVnode
    ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots)
    : emptyObject; // 如果没有父节点，使用空对象

  // 5. 创建元素生成函数（内部版本）
  vm._c = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  // 6. 创建元素生成函数（公共版本）
  vm.$createElement = function (a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  // 7. 初始化响应式属性 $attrs 和 $listeners（仅开发环境） 这些属性用于简化高阶组件(HOC)的创建 需要是响应式的，以便使用它们的HOC能及时更新
  var parentData = parentVnode && parentVnode.data; // 父节点数据
  {
    // 7.1 定义响应式 $attrs 属性
    defineReactive(
      vm,
      "$attrs", // 属性名
      (parentData && parentData.attrs) || emptyObject, // 初始值：父节点的 attrs 或空对象
      function () {
        !isUpdatingChildComponent && warn$2("$attrs is readonly.", vm);
      },
      true
    );
    defineReactive(
      vm,
      "$listeners", // 属性名
      options._parentListeners || emptyObject, // 初始值：父监听器或空对象
      function () {
        !isUpdatingChildComponent && warn$2("$listeners is readonly.", vm);
      },
      true
    );
  }
}
```

```js [_update]
function _update(oldVnode, vnode) {
  // 1. 判断VNode状态
  // emptyNode是Vue内部表示空节点的常量
  var isCreate = oldVnode === emptyNode; // 是否为创建阶段（旧节点为空）
  var isDestroy = vnode === emptyNode; // 是否为销毁阶段（新节点为空）

  // 2. 标准化指令（normalizeDirectives函数）
  // 将指令配置转换为统一格式，便于后续处理
  var oldDirs = normalizeDirectives(
    oldVnode.data.directives, // 旧节点指令
    oldVnode.context // 旧节点上下文
  );
  var newDirs = normalizeDirectives(
    vnode.data.directives, // 新节点指令
    vnode.context // 新节点上下文
  );

  // 3. 初始化钩子收集数组
  var dirsWithInsert = []; // 需要执行 inserted 钩子的指令
  var dirsWithPostpatch = []; // 需要执行 componentUpdated 钩子的指令

  var key, oldDir, dir;

  // 4. 遍历新指令集合，处理指令创建和更新
  for (key in newDirs) {
    oldDir = oldDirs[key]; // 旧指令
    dir = newDirs[key]; // 新指令

    if (!oldDir) {
      // 4.1 新指令 - 执行 bind 钩子
      callHook(dir, "bind", vnode, oldVnode);

      // 如果该指令定义了 inserted 钩子，收集到数组等待后续执行
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // 4.2 已存在指令 - 执行 update 钩子
      // 保存旧值供指令使用
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;

      callHook(dir, "update", vnode, oldVnode);

      // 如果指令定义了 componentUpdated 钩子，收集到数组
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  // 5. 处理 inserted 钩子（元素插入后执行）
  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };

    if (isCreate) {
      // 5.1 创建阶段：延迟到元素插入DOM后执行
      // mergeVNodeHook 将callInsert合并到VNode的insert钩子中
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      // 5.2 更新阶段：立即执行（元素已存在于DOM中）
      callInsert();
    }
  }

  // 6. 处理 componentUpdated 钩子（组件更新后执行）
  if (dirsWithPostpatch.length) {
    // 合并到VNode的postpatch钩子中
    mergeVNodeHook(vnode, "postpatch", function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }

  // 7. 处理指令移除（unbind钩子）
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // 旧指令存在但新指令不存在，说明指令被移除
        // 执行 unbind 钩子
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
```

:::

`initRender` 方法主要负责初始化渲染相关的属性，并为当前实例创建 `createElement` 函数,为后续的虚拟 DOM 创建和渲染做准备。

## $mount 挂载 DOM

`initRender` 方法初始化渲染系统后，进行 `initState` 初始化响应式系统，然后判断是否需要自动挂载。

如果组件配置了 `el` 选项，Vue 会自动调用 `$mount` 方法将实例挂载到 DOM 上。

`$mount` 是 Vue 实例挂载到 DOM 的核心方法，它负责将虚拟 DOM 转换为真实 DOM 并插入到页面中。

### $mount 版本

VUE 中存在两个 版本的 render 函数，一个是运行时版本（runtime），另一个是完整版（full）。

· 运行时版本：不包含模板编译器，因此无法使用 template 或 render 选项。

· 完整版：包含模板编译器，可以使用 template 或 render 选项。

Vue2 有两个 $mount 方法是为了实现架构上的平台分离和版本拆分：

基础运行时版本提供核心挂载逻辑，完整版本在运行时版本基础上添加模板编译器，这样既支持了多平台适配，又让用户可以选择更小的运行时版本来优化打包体积。

运行时版本是现代 Vue 项目的标准选择，通过构建时预编译实现更小的体积和更好的性能，需要配合 vue-loader 等构建工具使用，或者手动编写 render 函数。

```js
// 完整版本的调用链：
完整版 $mount()
  → 编译 template 为 render
  → 调用运行时版 $mount()
  → mountComponent()
  → 创建渲染 Watcher

// 运行时版本的调用链：
运行时版 $mount()
  → mountComponent()
  → 创建渲染 Watcher
```

**使用运行时版本（Runtime-only）的案例**:
::: code-group

```js [ 现代 Vue CLI 项目 ]
// vue-cli 创建的默认项目结构
// main.js
import Vue from 'vue'  // 默认指向 vue.runtime.esm.js
import App from './App.vue'

new Vue({
  render: h => h(App)  // 必须使用 render 函数
}).$mount('#app')

// App.vue（单文件组件）
<template>
  <!-- 在构建时会被 vue-loader 预编译为 render 函数 -->
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

```js [ Webpack 配置明确指定运行时版本 ]
// webpack.config.js
module.exports = {
  // ...
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js", // 明确指定运行时版本
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader", // 预编译模板
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
    ],
  },
};

// 组件使用方式：
// ComponentA.vue
export default {
  // 方式1：单文件组件（推荐）
  template: `<div>{{ message }}</div>`, // 构建时编译

  // 方式2：手写 render 函数
  render(h) {
    return h("div", this.message);
  },

  data() {
    return { message: "Hello" };
  },
};
```

```js [ 只使用渲染函数的纯 JS 项目 ]
// 不使用 .vue 文件，纯 JavaScript 项目
// index.html
<div id="app"></div>

<script type="module">
import Vue from 'https://unpkg.com/vue@2.6.14/dist/vue.runtime.esm.js'

// 定义组件，全部使用 render 函数
const App = {
  render(h) {
    return h('div', [
      h('h1', 'Hello Runtime Vue'),
      h('button', {
        on: { click: this.increment }
      }, `Count: ${this.count}`)
    ])
  },

  data() {
    return { count: 0 }
  },

  methods: {
    increment() {
      this.count++
    }
  }
}

new Vue({
  render: h => h(App)
}).$mount('#app')
</script>
```

```js [ 需要严格 CSP 合规的项目 ]
// Content Security Policy 严格限制的环境
// CSP 禁止使用 eval、new Function()

// 运行时版本满足 CSP，因为：
// 1. 不包含编译器
// 2. 不使用 new Function() 动态编译
// 3. 所有代码都是预编译的

// main.js
import Vue from "vue/dist/vue.runtime.esm.js"; // CSP 安全版本

// 所有组件必须预编译或使用 render 函数
const CSPCompliantComponent = {
  render(h) {
    return h("div", "CSP Safe Content");
  },
};

new Vue({
  render: (h) => h(CSPCompliantComponent),
}).$mount("#app");
```

```js [ 性能敏感的移动端应用 ]
// 移动端需要最小化包体积和最快加载速度

// vite.config.js（使用 Vite）
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()], // 自动使用运行时版本 + 预编译

  // 自动 tree-shaking，移除未使用的代码
  build: {
    target: "es2015",
    minify: "terser",
  },
});

// 组件全部预编译，运行时零编译开销
```

```js [ 大型企业级应用 ]
// 大型项目通常有严格的构建流程
// package.json
{
  "dependencies": {
    "vue": "^2.6.14"
  },
  "devDependencies": {
    "vue-template-compiler": "^2.6.14",  // 构建时编译器
    "babel-plugin-transform-vue-jsx": "^3.7.0"  // JSX 支持
  }
}

// 使用 JSX 替代模板（不需要编译器）
// UserProfile.jsx
import Vue from 'vue'

export default {
  name: 'UserProfile',

  props: ['user'],

  render() {
    return (
      <div class="profile">
        <h2>{this.user.name}</h2>
        <p>Email: {this.user.email}</p>
        <button onClick={this.handleClick}>Edit</button>
      </div>
    )
  },

  methods: {
    handleClick() {
      this.$emit('edit', this.user)
    }
  }
}
```

```js [ 微前端架构中的子应用 ]
// 微前端场景，子应用需要独立构建和运行
// child-app.js
import Vue from "vue/dist/vue.runtime.esm.js";

// 子应用入口
export function mount(container, props) {
  const ChildApp = {
    render(h) {
      return h("div", [
        h("h3", `子应用: ${props.appName}`),
        h("p", `来自主应用的数据: ${props.data}`),
      ]);
    },
  };

  return new Vue({
    render: (h) => h(ChildApp),
  }).$mount(container);
}

// 主应用加载
import("./child-app.js").then((module) => {
  module.mount("#child-container", {
    appName: "用户管理",
    data: window.sharedData,
  });
});
```

```js [库/插件开发]
// 开发 Vue 插件，需要最小化依赖
// my-plugin.js
import Vue from "vue";

// 插件定义
const MyPlugin = {
  install(Vue, options) {
    // 插件组件使用 render 函数
    Vue.component("my-component", {
      render(h) {
        return h(
          "div",
          {
            class: "my-component",
          },
          this.$slots.default
        );
      },
    });

    // 指令也直接定义
    Vue.directive("focus", {
      inserted: function (el) {
        el.focus();
      },
    });
  },
};

// 用户使用
import Vue from "vue/dist/vue.runtime.esm.js";
import MyPlugin from "./my-plugin.js";

Vue.use(MyPlugin);

new Vue({
  render: (h) =>
    h("div", [
      h("my-component", "Hello"),
      h("input", { directives: [{ name: "focus" }] }),
    ]),
}).$mount("#app");
```

:::

**在本次案例中我们主要以完整版案例进行分析**

### 完整版 $mount

::: code-group

```js [$mount ]
/**
 * 完整版 $mount 方法 - 包含模板编译器
 * 这是 Vue 完整版（含编译器）的核心挂载方法
 * @param {string|Element} el - DOM元素或选择器字符串
 * @param {boolean} hydrating - 是否服务端渲染激活模式
 * @returns {Component} Vue实例本身（链式调用支持）
 */
Vue.prototype.$mount = function (el, hydrating) {
  // 1. 转换el参数：如果el是选择器字符串，转换为DOM元素
  el = el && query(el);

  // 2. 安全限制：禁止挂载到body或html根元素
  if (el === document.body || el === document.documentElement) {
    warn$2("Do not mount Vue to <html>...");
    return this; // 终止挂载
  }
  // 3. 获取当前实例的配置选项
  var options = this.$options;
  // 4. 核心逻辑：如果没有render函数，需要编译模板
  if (!options.render) {
    var template = options.template;
    // 4.1 处理template选项（优先级高于el）
    if (template) {
      if (typeof template === "string") {
        // 字符串类型：可能是HTML字符串或#id选择器
        if (template.charAt(0) === "#") {
          // #id选择器：从DOM中获取对应元素的innerHTML
          template = idToTemplate(template);
          // 元素不存在或内容为空时警告
          if (!template) {
            warn$2(
              "Template element not found or is empty: ".concat(
                options.template
              ),
              this
            );
          }
        }
        // 如果是普通HTML字符串，直接使用（如 template: '<div>...</div>'）
      } else if (template.nodeType) {
        template = template.innerHTML; // DOM元素类型：直接获取其innerHTML
      } else {
        {
          // 无效的template类型：非字符串非DOM元素
          warn$2("invalid template option:" + template, this);
        }
        return this; // 终止挂载
      }
    } else if (el) {
      // 4.2 没有template选项但有el：从挂载元素获取outerHTML
      template = getOuterHTML(el);
    }
    // 5. 如果有模板内容，开始编译
    if (template) {
      // 5.1 性能测量：记录编译开始时间点（开发环境）
      if (config.performance && mark) mark("compile");

      // 5.2 核心编译：模板字符串 → render函数
      var _a = compileToFunctions(
          template, // 模板字符串
          {
            outputSourceRange: true, // 输出源码位置，便于错误追踪
            shouldDecodeNewlines: shouldDecodeNewlines, // 是否解码换行符&#10;
            shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref, // href属性特殊处理
            delimiters: options.delimiters, // 自定义插值分隔符，默认{{ }}
            comments: options.comments, // 是否保留模板中的注释
          },
          this // 组件实例，用于错误处理上下文
        ),
        render = _a.render, // 生成的渲染函数
        staticRenderFns = _a.staticRenderFns; // 静态节点渲染函数数组
      // 5.3 保存编译结果到options
      options.render = render; // 后续渲染使用
      options.staticRenderFns = staticRenderFns; // 静态优化使用
      // 5.4 性能测量：记录编译结束并计算耗时
      if (config.performance && mark) {
        mark("compile end");
        measure(
          "vue ".concat(this._name, " compile"), // 测量名称
          "compile", // 开始标记
          "compile end" // 结束标记
        );
      }
    }
  }
  // 6. 调用基础的$mount方法（运行时版本）进行实际挂载
  return mount.call(this, el, hydrating);
};
```

:::

## 虚拟 DOM

## Diff 算法

## 模板编译过程

## 强制更新方法

```

```
