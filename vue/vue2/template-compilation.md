# 模板编译

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

Vue 是一个[渐进式框架](/vue/vue2/progressive.md)，这意味着你可以根据需要选择性地引入 Vue 的不同部分。

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

## 编译流程

模板编译分为三个阶段: `生成ast语法树`、`、`
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
```

:::

::: code-group

```js [createCompiler]
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
/**
 * 创建编译器创建器的高阶函数
 * 使用柯里化（Currying）设计模式，实现配置的分层管理
 * @param {Function} baseCompile - 基础编译函数，包含编译核心逻辑（parse → optimize → generate）
 * @returns {Function} createCompiler - 返回一个能创建特定平台编译器的函数
 */
function createCompilerCreator(baseCompile) {
  /**
   * 创建特定平台的编译器
   * @param {Object} baseOptions - 平台基础配置选项（如Web平台、Weex平台）
   * @returns {Object} 包含compile和compileToFunctions方法的编译器对象
   */
  return function createCompiler(baseOptions) {
    /**
     * 编译模板的核心函数
     * @param {string} template - 模板字符串
     * @param {Object} options - 用户传入的编译选项（会与baseOptions合并）
     * @returns {Object} 编译结果对象
     */
    function compile(template, options) {
      // 1. 创建基础配置的原型链对象，实现配置继承
      var finalOptions = Object.create(baseOptions); // 使用Object.create确保不会污染baseOptions，同时能继承其属性

      // 2. 处理用户传入的options，合并到finalOptions中
      if (options) {
        // ...忽略部分代码...

        // 3.1 合并自定义模块（modules）
        if (options.modules) {
          // 将用户模块追加到基础模块之后
          finalOptions.modules = (baseOptions.modules || []).concat(
            options.modules
          );
        }

        // 3.2 合并自定义指令（directives）
        if (options.directives) {
          // 使用extend函数（Vue内部工具函数）合并指令
          // 先创建基础指令的原型链副本，再混合用户自定义指令
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // 3.3 复制其他选项（排除已特殊处理的modules和directives）
        for (var key in options) {
          if (key !== "modules" && key !== "directives") {
            finalOptions[key] = options[key];
          }
        }
      }
      // 4. 执行基础编译流程
      var compiled = baseCompile(template.trim(), finalOptions); // 先trim模板字符串，避免首尾空白影响解析

      // 5. 返回完整的编译结果
      return compiled;
    }
    // 返回编译器对象，提供两个不同层次的编译接口

    return {
      compile: compile, // compile: 返回包含AST、render代码字符串的原始结果
      // compileToFunctions: 进一步将代码字符串转换为可执行的渲染函数
      // createCompileToFunctionFn是另一个高阶函数，负责缓存和函数创建
      compileToFunctions: createCompileToFunctionFn(compile),
    };
  };
}
```

```js [createCompileToFunctionFn]
/**
 * 创建编译到函数的高阶函数（将编译结果转换为可执行函数）
 * 主要职责：缓存、错误处理、代码字符串到函数的转换
 * @param {Function} compile - 基础编译函数（来自createCompiler）
 * @returns {Function} compileToFunctions - 返回可直接生成渲染函数的函数
 */
function createCompileToFunctionFn(compile) {
  // 1. 创建缓存对象，用于存储已编译的模板结果
  var cache = Object.create(null); // 使用Object.create(null)创建纯净对象（无原型链，避免属性冲突）
  /**
   * 编译模板并生成渲染函数（Vue模板编译的最终用户接口）
   * @param {string} template - 模板字符串
   * @param {Object} options - 编译选项
   * @param {Component} vm - Vue组件实例（可选，用于错误定位）
   * @returns {Object} 包含render和staticRenderFns函数的对象
   */
  return function compileToFunctions(template, options, vm) {
    // 2. 复制options对象，避免修改原始参数
    options = extend({}, options);

    // 3. 缓存机制：生成缓存键，检查是否已有缓存
    var key = options.delimiters
      ? String(options.delimiters) + template // 如果使用自定义分隔符，包含在key中
      : template; // 默认只使用模板字符串作为key

    // 如果缓存命中，直接返回缓存结果
    if (cache[key]) {
      return cache[key];
    }
    // 4. 执行编译：调用下层compile函数生成AST和代码字符串
    var compiled = compile(template, options);

    // 5. 将代码字符串转换为可执行函数
    var res = {}; // 最终结果对象
    var fnGenErrors = []; // 收集函数生成阶段的错误
    // 6.1 创建主渲染函数
    res.render = createFunction(compiled.render, fnGenErrors);
    // 6.2 创建静态节点渲染函数数组
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors);
    });
    // 7. 缓存结果并返回
    return (cache[key] = res);
  };
}

// 辅助函数：将代码字符串转换为函数
function createFunction(code, errors) {
  try {
    return new Function(code); // 使用Function构造函数动态创建函数
  } catch (err) {
    // 收集错误信息，包括错误对象和原始代码
    errors.push({ err: err, code: code });
    return noop; // 返回空函数（Vue内部定义的noop函数）
  }
}

// TODO 设计模式:模板方法模式、、责任链模式、享元模式
```

:::

也可以简化成

```js
// 1. 创建 createCompilerCreator 函数
function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    // 这个函数会返回 { compile, compileToFunctions }
    // ...
  };
}

// 2. 创建实际的 createCompiler 函数
var createCompiler = createCompilerCreator(function baseCompile(
  template,
  options
) {
  // 编译逻辑...
  return { ast, render, staticRenderFns };
});

// 3. 使用 baseOptions 创建编译器实例
var _a = createCompiler(baseOptions); // 这里调用的是步骤2中的 createCompiler 函数
```

调用流程为:`createCompilerCreator(baseCompile) → createCompiler(baseOptions) → { compile, compileToFunctions }`

具体步骤：

1. createCompilerCreator 接收 baseCompile 函数（编译核心逻辑）
2. 返回 createCompiler 函数，它接收 baseOptions（平台相关配置）
3. createCompiler 函数返回一个包含 compile 和 compileToFunctions 的对象
4. \_a = createCompiler(baseOptions) 获取这个对象
5. 从 \_a 中解构出 compileToFunctions

这种设计体现了函数式编程的思想，实现了：

1. 配置分层：
   - createCompilerCreator 负责创建编译器工厂
   - createCompiler 负责根据平台配置创建具体编译器实例
   - 最终用户通过 createCompiler(baseOptions) 获取具体编译器实例
2. 代码复用：

   ```js
   // Web 平台编译器
   const { compileToFunctions } = createCompiler(webOptions);

   // Weex 平台编译器
   const { compileToFunctions } = createCompiler(weexOptions);
   // 两者共享相同的 baseCompile 核心逻辑
   ```

3. [柯里化](/js/javascript/javascript.md)（Currying）
   柯里化形式：`createCompilerCreator(baseCompile)(baseOptions)(template, options)`

   每一步都固定一些参数，最终得到特定平台的编译函数

## parse

`parse` 生成 AST

[AST](/vue/vue2/ast.md)（Abstract Syntax Tree，抽象语法树） 是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
:::code-group

```js [parse]
// 入口函数
export function parse(template, options) {
  // 1. 初始化状态
  // 2. 解析模板生成AST
  // 3. 处理AST（转换、优化）
  // 4. 返回根AST节点
}
```

```js [1.初始化准备]
export function parse(template, options) {
  // 1. 全局变量初始化
  var stack = []; // AST元素栈
  var root = null; // 根AST节点
  var currentParent = null; // 当前父节点
  var inVPre = false; // 是否在v-pre中
  var inPre = false; // 是否在<pre>标签中
  var warned = false; // 警告标志

  // 2. 警告函数封装
  function warnOnce(msg, range) {
    if (!warned) {
      warned = true;
      options.warn(msg, range);
    }
  }

  // 3. 检查根元素约束
  function checkRootConstraints(el) {
    if (el.tag === "slot" || el.tag === "template") {
      warnOnce(`不能使用 <${el.tag}> 作为组件的根元素`);
    }
    if (el.attrsMap.hasOwnProperty("v-for")) {
      warnOnce("不能使用 v-for 在根元素上");
    }
  }

  // 4. 调用HTML解析器
  parseHTML(template, {
    // 解析器选项和回调...
  });

  return root;
}
```

```js [2.HTML解析与AST构建]
parseHTML(template, {
  // 开始标签回调
  start: function (tag, attrs, unary, start, end) {
    // 1. 创建AST元素
    var element = createASTElement(tag, attrs, currentParent);

    // 2. 处理命名空间
    if (isIE && ns === "svg") {
      attrs = guardIESVGBug(attrs);
    }

    // 3. 应用前置转换
    for (var i = 0; i < preTransforms.length; i++) {
      element = preTransforms[i](element, options) || element;
    }

    // 4. 处理v-pre
    if (!inVPre) {
      processPre(element);
      if (element.pre) {
        inVPre = true;
      }
    }

    // 5. 处理结构指令
    if (inVPre) {
      processRawAttrs(element);
    } else if (!element.processed) {
      processFor(element);
      processIf(element);
      processOnce(element);
    }

    // 6. 设置根元素
    if (!root) {
      root = element;
      checkRootConstraints(root);
    }

    // 7. 管理栈和父子关系
    if (!unary) {
      currentParent = element;
      stack.push(element);
    } else {
      closeElement(element);
    }
  },

  // 结束标签回调
  end: function (tag, start, end) {
    var element = stack[stack.length - 1];
    stack.length -= 1;
    currentParent = stack[stack.length - 1];
    closeElement(element);
  },

  // 文本回调
  chars: function (text, start, end) {
    if (!currentParent) {
      // 根元素外的文本
      if (!text.trim()) return;

      warnOnce("组件模板必须包含一个根元素");
      return;
    }

    // 处理文本中的表达式
    var children = currentParent.children;
    var expression;

    if (text !== " " || children[children.length - 1]) {
      var res = parseText(text, options.delimiters);
      if (res) {
        // 表达式文本 {{message}}
        children.push({
          type: 2, // 表达式类型
          expression: res.expression,
          text: text,
          tokens: res.tokens,
          start: start,
          end: end,
        });
      } else {
        // 纯文本
        children.push({
          type: 3, // 文本类型
          text: text,
          start: start,
          end: end,
        });
      }
    }
  },

  // 注释回调
  comment: function (text, start, end) {
    if (currentParent) {
      currentParent.children.push({
        type: 3, // 注释也是类型3
        text: text,
        isComment: true,
        start: start,
        end: end,
      });
    }
  },
});
```

```js [3.AST节点处理函数]
function createASTElement(tag, attrs, parent) {
  return {
    type: 1, // 元素节点类型
    tag: tag, // 标签名
    attrsList: attrs, // 原始属性列表
    attrsMap: makeAttrsMap(attrs), // 属性映射表（快速查找）
    rawAttrsMap: {}, // 原始属性映射（包含位置信息）
    parent: parent, // 父节点
    children: [], // 子节点数组

    // 以下属性在后续处理中填充
    static: false,
    staticRoot: false,
    staticInFor: false,
    staticProcessed: false,
    hasBindings: false,

    // 指令相关
    directives: [],
    props: [],
    events: {},
    nativeEvents: {},

    // 条件渲染
    if: undefined,
    elseif: undefined,
    else: undefined,
    ifConditions: [],

    // 循环
    for: undefined,
    alias: undefined,
    iterator1: undefined,
    iterator2: undefined,

    // 插槽
    slotTarget: undefined,
    slotScope: undefined,

    // 组件
    component: undefined,
    inlineTemplate: undefined,

    // 源码位置
    start: 0,
    end: 0,
  };
}
```

```js [3.1 processFor]
function processFor(el) {
  var exp = getAndRemoveAttr(el, "v-for");
  if (exp) {
    var res = parseFor(exp);
    if (res) {
      // 解析结果：{ for: 'items', alias: 'item', iterator1: 'key', iterator2: 'index' }
      extend(el, res);
    } else {
      warn(`无效的 v-for 表达式: ${exp}`);
    }
  }
}

// v-for表达式解析
function parseFor(exp) {
  // 解析如 "item in items" 或 "(item, index) in items" 的表达式
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) return;

  var res = {};
  res.for = inMatch[2].trim(); // 迭代对象

  // 解析别名部分
  var alias = inMatch[1].trim();
  var iteratorMatch = alias.match(forIteratorRE);

  if (iteratorMatch) {
    // (value, key, index) 形式
    res.alias = iteratorMatch[1].trim();
    res.iterator1 = iteratorMatch[2].trim();
    res.iterator2 = iteratorMatch[3] && iteratorMatch[3].trim();
  } else {
    // 简单形式：item in items
    res.alias = alias;
  }

  return res;
}
```

```js [3.2 processIf]
function processIf(el) {
  var exp = getAndRemoveAttr(el, "v-if");
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el,
    });
  } else {
    if (getAndRemoveAttr(el, "v-else") != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, "v-else-if");
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}
```

```js [3.3 processKey]
function processKey(el) {
  var exp = getBindingAttr(el, "key");
  if (exp) {
    if (el.tag === "template") {
      warn("<template> 不能有 key");
    } else if (el.for) {
      // 在v-for中的key
      el.key = exp;
    } else {
      warn(`key 属性只能用在 v-for 内部`);
    }
  }
}
```

```js [3.4 processAttrs]
function processAttrs(el) {
  var list = el.attrsList;

  for (var i = 0, l = list.length; i < l; i++) {
    var name = list[i].name;
    var value = list[i].value;

    // 1. 指令处理（v-, @, : 开头）
    if (dirRE.test(name)) {
      // 标记元素有绑定
      el.hasBindings = true;

      // 解析修饰符
      var modifiers = parseModifiers(name);

      if (bindRE.test(name)) {
        // v-bind 处理
        // ...
      } else if (onRE.test(name)) {
        // v-on 处理
        // ...
      } else {
        // 其他指令（v-if, v-for, v-model等）
        // ...
      }
    } else {
      // 2. 普通属性处理
      addAttr(el, name, JSON.stringify(value));
    }
  }
}
```

:::
对于下属案例生成 AST 的路程为：

```vue
<template>
  <div id="app" :class="className">
    <h1 v-if="showTitle">{{ title }}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
    <button @click="handleClick">点击</button>
  </div>
</template>
```

:::code-group

```js [1.解析div]
// createASTElement 创建：
divElement = {
  type: 1,
  tag: "div",
  attrsList: [
    { name: "id", value: "app" },
    { name: ":class", value: "className" },
  ],
  attrsMap: { id: "app", ":class": "className" },
  parent: null,
  children: [],
  // 其他属性...
};

// 成为根节点
root = divElement;
stack = [divElement];
currentParent = divElement;
```

```js [2.解析  h1 ]
h1Element = {
  type: 1,
  tag: "h1",
  attrsList: [{ name: "v-if", value: "showTitle" }],
  if: "showTitle",
  ifConditions: [{ exp: "showTitle", block: h1Element }],
  parent: divElement,
  children: [],
};

// 添加到父元素
divElement.children.push(h1Element);
stack = [divElement, h1Element];
currentParent = h1Element;
```

```js [3.解析文本 {{ title }}]
textElement = {
  type: 2,  // 表达式类型
  expression: '_s(title)',
  text: '{{ title }}',
  tokens: [@binding: 'title']
};

h1Element.children.push(textElement);

```

```js [4.解析 ul、li  ]
// li元素处理v-for后：
liElement = {
  type: 1,
  tag: "li",
  for: "items",
  alias: "item",
  key: "item.id", // 从:key解析
  parent: ulElement,
  children: [],
};
```

```js [5.解析 button ]
buttonElement = {
  type: 1,
  tag: 'button',
  events: {
    click: {
      value: 'handleClick',
      modifiers: {}
    }
  },
  parent: divElement,
  children: [...]
};
```

:::
最终 AST 结构:

```js
{
  type: 1,
  tag: 'div',
  attrsList: [...],
  attrsMap: {...},
  parent: null,
  children: [
    {
      type: 1,
      tag: 'h1',
      if: 'showTitle',
      ifConditions: [...],
      children: [
        {
          type: 2,
          expression: '_s(title)',
          text: '{{ title }}'
        }
      ]
    },
    {
      type: 1,
      tag: 'ul',
      children: [
        {
          type: 1,
          tag: 'li',
          for: 'items',
          alias: 'item',
          key: 'item.id',
          children: [
            {
              type: 2,
              expression: '_s(item.name)',
              text: '{{ item.name }}'
            }
          ]
        }
      ]
    },
    {
      type: 1,
      tag: 'button',
      events: {
        click: {
          value: 'handleClick'
        }
      },
      children: [...]
    }
  ]
}
```

:::tip 渐进式的处理顺序

1. createASTElement() // 创建基础节点
2. preTransforms // 前置转换（v-model 等）
3. processFor() // v-for（优先级最高）
4. processIf() // v-if/v-else
5. processOnce() // v-once
6. processKey() // key
7. processRef() // ref
8. processSlotContent() // 插槽
9. processComponent() // 组件
10. processAttrs() // 其他属性

:::

生成的 AST 会用于：

静态标记（optimize 阶段）

```js
function markStatic(root) {
  // 标记静态节点
  // 标记静态根节点
}
```

代码生成（generate 阶段）

```js
function generate(ast, options) {
  var code = genElement(ast);
  return {
    render: new Function(code),
    staticRenderFns: staticFns,
  };
}
```

## optimize

optimize 是 Vue 模板编译器的优化阶段，它的核心目标是识别和标记静态内容，以便在运行时跳过不必要的计算和比较。

为什么要优化？
:::code-group

```js [优化前（未标记静态）]
function render() {
  return createElement("div", [
    createElement("h1", "静态标题"), // 每次渲染都创建
    createElement("p", "静态段落"), // 每次渲染都创建
    createElement("span", this.message), // 动态内容
  ]);
}

// 每次更新都要：
// 1. 创建所有VNode
// 2. 比较所有VNode
// 3. 更新DOM
```

```js [优化后]
// 静态内容只创建一次
const staticTitle = createElement("h1", "静态标题");
const staticParagraph = createElement("p", "静态段落");

function render() {
  return createElement("div", [
    staticTitle, // 直接复用
    staticParagraph, // 直接复用
    createElement("span", this.message), // 只处理动态的
  ]);
}

// 更新时：
// 1. 直接复用静态VNode
// 2. 只比较动态内容
// 3. 只更新变化的部分
```

:::
:::code-group

```js [optimize]
/**
 * 优化 AST：标记静态节点和静态根节点
 * @param {ASTNode} root - AST 根节点
 * @param {CompilerOptions} options - 编译器选项
 */
function optimize(root, options) {
  if (!root) return; // 边界检查：如果没有根节点，直接返回

  // 1. 生成静态键检查函数 ｜staticKeys： staticClass、staticStyle
  // isStaticKey='type,tag,attrsList,attrsMap,plain,parent,children,attrs,'staticClass,staticStyle''
  isStaticKey = genStaticKeysCached(options.staticKeys || "");

  // 2. 获取平台保留标签检查函数
  isPlatformReservedTag = options.isReservedTag || no;

  // 3. 第一轮遍历：标记所有非静态节点
  markStatic(root);

  // 4. 第二轮遍历：标记静态根节点
  markStaticRoots(root, false);
}
```

```js [markStatic]
/**
 * 标记AST节点是否为静态节点
 * 静态节点：在组件整个生命周期中不会发生变化的节点
 * 这个函数通过深度优先遍历递归标记节点树
 *
 * @param {ASTNode} node - 要标记的AST节点
 */
function markStatic(node) {
  // 第一步：标记当前节点自身的静态性 ｜ isStatic : true or false
  node.static = isStatic(node);
  // 表达式节点和文本节点已经在 isStatic 函数中处理完毕
  if (node.type === 1) {
    // 特殊处理：跳过自定义组件的插槽内容
    // 1. 组件需要能够修改插槽节点（插槽内容可能被组件修改）
    // 2. 静态插槽内容会导致热重载失败（开发时热更新失效）
    if (
      !isPlatformReservedTag(node.tag) && // 一个自定义组件标签，如 <my-component>
      node.tag !== "slot" && // <slot> 标签是Vue内置组件，需要特殊处理
      node.attrsMap["inline-template"] == null // inline-template 表示内联模板，也需要特殊处理
    ) {
      // 如果三个条件都满足，说明这是一个普通的自定义组件 直接返回，不处理其子节点（插槽内容）
      return;
    }
    // 第三步：递归处理所有子节点
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i]; // 获取当前子节点
      // 递归调用 markStatic，深度优先遍历 先处理子节点，再处理父节点（后序遍历）
      markStatic(child);
      // 关键逻辑：子节点的静态性向上传播 如果发现任意一个子节点不是静态的（child.static === false）
      // 那么当前父节点也不可能是静态的 这是为了保证：静态节点的所有子节点也必须是静态的
      if (!child.static) {
        // 设置当前节点为动态 这个设置可能会覆盖第一步中 isStatic 的结果 因为 isStatic 只检查节点自身，而这里检查了整个子树
        node.static = false;
      }
    }
    // 第四步：处理 v-if / v-else-if / v-else 条件分支
    // 条件渲染的节点有 ifConditions 属性 ifConditions 是一个数组，包含所有条件分支
    if (node.ifConditions) {
      // i 从 1 开始，因为索引 0 是当前节点自身 当前节点已经在第三步中处理过了
      for (var i = 1, l = node.ifConditions.length; i < l; i++) {
        // block 是 AST 节点，表示该条件分支的内容
        var block = node.ifConditions[i].block;
        // 关键逻辑：所有条件分支的静态性都会影响当前节点 如果任意一个条件分支不是静态的
        // 那么整个条件表达式节点也不是静态的 这是因为条件渲染是动态的，取决于条件表达式的值
        markStatic(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
    // 注意：表达式节点（type=2）和文本节点（type=3）不会进入这个if块 它们已经在第一步的 isStatic 调用中被标记了
  }
}
```

```js [markStaticRoots]
/**
 * 标记静态根节点
 * 静态根节点：可以作为优化单元被提升的静态子树
 * 与 markStatic 不同，这里标记的是适合进行静态提升的根节点
 *
 * @param {ASTNode} node - 要处理的AST节点
 * @param {boolean} isInFor - 标记当前节点是否在 v-for 循环内部
 */
function markStaticRoots(node, isInFor) {
  // 第一步：只处理元素节点 表达式节点（type=2）和文本节点（type=3）不会成为静态根节点
  if (node.type === 1) {
    // 第二步：记录静态节点是否在 v-for 循环内部
    // 条件：节点是静态的（node.static）或有 v-once 指令（node.once） v-once 节点类似于静态节点，只会渲染一次
    if (node.static || node.once) {
      // 设置 staticInFor 属性，记录节点是否在 v-for 内部
      // 这个信息在后续处理中很重要：
      // 1. 在 v-for 内部的静态节点需要特殊处理
      // 2. 影响代码生成策略
      node.staticInFor = isInFor;
    }

    // 第三步：判断当前节点是否应该标记为静态根节点
    if (
      node.static && // 节点本身必须是静态的（在 markStatic 中已经标记）
      node.children.length && // 节点必须有子节点（空节点不需要作为根提升）
      !(node.children.length === 1 && node.children[0].type === 3) // 节点的子节点不能"仅仅是单个静态文本节点"
    ) {
      node.staticRoot = true; // 满足所有条件，标记为静态根节点
      return; //一旦标记为静态根节点，立即返回，不再处理子节点
    } else {
      // 不满足条件，明确标记为非静态根节点 注意：即使节点是静态的，但只有一个文本子节点，也不标记为静态根
      node.staticRoot = false;
    }

    // 第四步：递归处理子节点（仅当当前节点不是静态根时） 当前节点被标记为 staticRoot = false 时，才需要继续检查子节点
    if (node.children) {
      // 遍历所有子节点
      for (var i = 0, l = node.children.length; i < l; i++) {
        // 递归调用 markStaticRoots 处理每个子节点

        // 传递 isInFor 参数：
        // 1. 如果当前节点有 v-for 指令（!!node.for 为 true）
        //    那么子节点肯定在 v-for 内部
        // 2. 如果当前节点已经在 v-for 内部（isInFor 为 true）
        //    那么子节点也继承这个状态
        // 3. 否则 isInFor 为 false
        markStaticRoots(node.children[i], isInFor || !!node.for);
        // !!node.for 技巧：将 node.for 转换为布尔值
        // 如果 node.for 有值（v-for 指令），则为 true
        // 如果 node.for 是 undefined，则为 false
      }
    }

    // 第五步：处理 v-if / v-else-if / v-else 条件分支 条件渲染的节点有 ifConditions 属性，包含所有分支
    if (node.ifConditions) {
      // 遍历所有条件分支（从索引 1 开始，因为索引 0 是当前节点）
      for (var i = 1, l = node.ifConditions.length; i < l; i++) {
        // 处理条件分支节点
        markStaticRoots(
          node.ifConditions[i].block, // 分支节点
          isInFor // 继承当前的 isInFor 状态
          // 注意：条件分支不继承 v-for 状态 因为 v-for 是作用在当前节点，而不是条件分支上
        );
      }
    }
  }
}
```

:::

其中 `options.staticKeys` 是 Vue 编译器选项中的一个重要配置，用于定义哪些属性可以被认为是静态的（在编译时就能确定，不会在运行时改变）。TODO

两个核心步骤:
**步骤 1：markStatic - 标记静态节点**
目标：识别哪些节点永远不会变化

```js
// 判断规则：
function isStatic(node) {
  // 类型检查
  if (node.type === 2) return false; // 表达式：{{ data }} 总是动态
  if (node.type === 3) return true; // 文本：纯文本总是静态

  // 元素节点需要满足所有条件：
  return !!(
    (
      node.pre || // 1. 有 v-pre 指令
      (!node.hasBindings && // 2. 没有动态绑定（v-bind, v-on等）
        !node.if &&
        !node.for && // 3. 没有条件/循环指令
        !isBuiltInTag(node.tag) && // 4. 不是内置组件（slot, component等）
        isPlatformReservedTag(node.tag) && // 5. 是HTML/SVG原生标签
        !isDirectChildOfTemplateFor(node) && // 6. 不是 template v-for 的直接子节点
        Object.keys(node).every(isStaticKey))
    ) // 7. 所有属性都是静态的
  );
}
```

**步骤 2：markStaticRoots - 标记静态根节点**
目标：找出可以作为优化单元的静态子树

```js
function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    // 标记为静态根节点的条件：
    // 1. 节点本身是静态的
    // 2. 有子节点
    // 3. 不是只有一个纯文本子节点（这种情况优化收益不大）
    if (
      node.static &&
      node.children.length &&
      !(node.children.length === 1 && node.children[0].type === 3)
    ) {
      node.staticRoot = true;
      return; // 静态根节点的子节点不再处理
    } else {
      node.staticRoot = false;
    }

    // 递归处理子节点
    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }

    // 处理条件分支
    if (node.ifConditions) {
      for (let i = 1; i < node.ifConditions.length; i++) {
        markStaticRoots(node.ifConditions[i].block, isInFor);
      }
    }
  }
}
```

例如:

```html
<div class="container">
  <h1>网站标题</h1>
  <nav>
    <a href="/">首页</a>
    <a href="/about">关于</a>
  </nav>
</div>
```

::: tip 优化过程：

**Step.1 markStatic 标记**：

div.static = true

h1.static = true

nav.static = true

a.static = true (所有 a 标签)

**Step.2 markStaticRoots 标记**：

div.staticRoot = true // 有多个子节点，适合作为静态根

h1.staticRoot = false // 父节点已经是静态根

nav.staticRoot = false

a.staticRoot = false

**结果：整个 div 子树被标记为静态根**
:::

## generate

`generate` 函数是 Vue 模板编译器的代码生成阶段，负责将优化后的 AST 转换为可执行的渲染函数代码字符串。
:::code-group

```js
export function generate(ast, options) {
  // 1. 初始化生成状态
  const state = new CodegenState(options);

  // 2. 生成代码字符串
  const code = ast
    ? ast.tag === "script" // 特殊处理 script 标签
      ? "null"
      : genElement(ast, state) // 核心生成函数
    : '_c("div")'; // 空模板的默认代码

  // 3. 返回渲染函数和静态渲染函数
  return {
    render: `with(this){return ${code}}`, // 渲染函数主体
    staticRenderFns: state.staticRenderFns, // 静态渲染函数数组
  };
}
```

```js [CodegenState]
// 初始化
var CodegenState = /** @class */ (function () {
  function CodegenState(options) {
    // 1. 保存编译器选项
    this.options = options; // options 包含编译器的所有配置
    this.warn = options.warn || baseWarn; // 2. 警告函数
    // 3. 提取模块中的转换函数  options.modules 是编译器模块数组 pluckModuleFunction 从每个模块中提取指定名称的函数
    this.transforms = pluckModuleFunction(options.modules, "transformCode"); // transformCode 函数用于在代码生成后对代码进行转换
    // 4. 提取模块中的数据生成函数 genData 函数用于生成元素的数据对象部分 不同平台可能有不同的数据生成逻辑
    this.dataGenFns = pluckModuleFunction(options.modules, "genData");
    // 5. 合并指令集 基础指令 + 用户自定义指令
    // baseDirectives: Vue 内置指令（如 v-model, v-show）
    // options.directives: 用户自定义指令
    // extend 是合并对象的工具函数
    this.directives = extend(extend({}, baseDirectives), options.directives);

    // 7. 判断元素是否可能是组件的函数
    // 判断逻辑：1. 有 component 属性 或 2. 不是保留标签
    // 例如：
    // - <my-component> → 不是保留标签 → 可能是组件
    // - <div> → 是保留标签 → 不是组件
    // - <component :is="comp"> → 有 component 属性 → 是组件
    this.maybeComponent = function (el) {
      return !!el.component || !isReservedTag(el.tag);
    };
    // 8. v-once 指令计数器
    this.onceId = 0; // 用于生成唯一的 v-once 标识符
    // 9. 静态渲染函数数组 存储所有静态节点的渲染函数
    this.staticRenderFns = []; // 这些函数在组件初始化时只生成一次，后续复用
    // 10. v-pre 标记 表示当前是否在处理 v-pre 指令范围内的代码
    this.pre = false;
  }
  return CodegenState;
})();
```

```js [genElement]
/**
 * 生成元素节点的渲染函数代码
 * @param {ASTElement} el - AST 元素节点
 * @param {CodegenState} state - 代码生成状态
 * @returns {string} 生成的代码字符串
 */
function genElement(el, state) {
  // 1. 处理 v-pre 指令的继承
  if (el.parent) el.pre = el.pre || el.parent.pre; // 如果父节点有 v-pre 指令，子节点也会继承
  // 2. 处理静态根节点（优先级最高）
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state); //静态根节点会被提升，只生成一次，后续复用
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state); // 3.v-once 节点只渲染一次，之后缓存结果
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state); // 4.v-for 需要生成列表渲染代码
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state); // 5.v-if 需要生成条件表达式
    // 6. 处理 template 标签（非插槽）
  } else if (el.tag === "template" && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || "void 0"; // 普通的 template 标签只渲染其子节点
  } else if (el.tag === "slot") {
    return genSlot(el, state); //   7.处理 slot 标签 插槽标签需要特殊处理
  } else {
    // 8. 处理普通元素或组件

    var code = void 0; // 最终生成的代码
    // 8.1 处理动态组件（有 component 属性）
    if (el.component) {
      code = genComponent(el.component, el, state); // 生成动态组件代码
      // 8.2 处理普通元素或静态组件
    } else {
      var data = void 0; // 元素的数据对象部分
      var maybeComponent = state.maybeComponent(el);
      // 决定是否需要生成 data 对象 条件：1. 不是普通元素 或 2. 是 v-pre 中的可能组件
      if (!el.plain || (el.pre && maybeComponent)) {
        data = genData(el, state);
      }
      // 8.3 确定 tag 名称
      var tag = void 0;
      // 检查是否是 <script setup> 中的组件
      var bindings = state.options.bindings;
      if (maybeComponent && bindings && bindings.__isScriptSetup !== false) {
        tag = checkBindingType(bindings, el.tag);
      }
      // 如果不是 script setup 组件，使用普通标签名
      if (!tag) tag = "'".concat(el.tag, "'");
      // 8.4 生成子节点代码
      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      // 8.5 组装最终代码：_c(tag, data, children)
      code = "_c("
        .concat(tag) // 标签名
        .concat(
          data ? ",".concat(data) : "" // 数据对象（可选）
        )
        .concat(
          children ? ",".concat(children) : "", // 子节点（可选）
          ")"
        );
    }
    // 9. 应用模块转换  允许平台特定的模块对生成的代码进行后处理
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code;
  }
}
```

```js [genComponent]
/**
 * 生成组件节点的渲染代码
 * 用于创建自定义组件的虚拟节点
 * @param {string} componentName - 组件名称（可能是字符串或表达式）
 * @param {ASTElement} el - 组件AST节点
 * @param {CodegenState} state - 代码生成状态对象
 * @return {string} 生成的组件渲染代码字符串
 */
function genComponent(componentName, el, state) {
  // 1. 处理组件的子内容（插槽内容）
  // 如果有inlineTemplate，则子内容为空（内联模板会单独处理）
  var children = el.inlineTemplate ? null : genChildren(el, state, true);

  // 2. 构建组件渲染函数调用
  // _c() 是 createElement 的简写，用于创建VNode
  return (
    "_c("
      // 组件名称或组件选项（第一个参数）
      .concat(componentName, ",")
      // 组件数据对象（第二个参数）
      .concat(genData(el, state))
      // 组件的子节点（第三个参数，可选）
      .concat(children ? ",".concat(children) : "", ")")
  );
}

/**
 * 函数详解：
 *
 * 1. componentName 参数：
 *    - 可以是字符串："MyComponent"
 *    - 可以是表达式：_vm.componentName（动态组件）
 *    - 可以是组件选项对象：{template: '<div>...</div>'}
 *
 * 2. el.inlineTemplate 检查：
 *    - 如果组件有内联模板，则忽略children
 *    - 内联模板会通过genData()中的inlineTemplate处理
 *    - 例：<my-component inline-template>...</my-component>
 *
 * 3. genChildren(el, state, true)：
 *    - 第三个参数为true表示生成规范化后的children
 *    - 对于组件，子内容会被作为插槽内容处理
 *
 * 4. _c() 函数：
 *    - Vue内部的createElement函数
 *    - 签名：_c(tag, data, children, normalizationType)
 */

/**
 * 生成代码示例：
 *
 * 1. 简单组件：
 *    <my-component></my-component>
 *    → _c("my-component", {tag: "my-component"})
 *
 * 2. 带属性的组件：
 *    <my-component :msg="message" @click="handleClick"></my-component>
 *    → _c("my-component", {
 *         tag: "my-component",
 *         attrs: {msg: message},
 *         on: {click: handleClick}
 *       })
 *
 * 3. 带子内容的组件：
 *    <my-component>
 *      <span>默认插槽内容</span>
 *    </my-component>
 *    → _c("my-component", {tag: "my-component"}, [_c('span', [_v("默认插槽内容")])])
 *
 * 4. 动态组件：
 *    <component :is="currentComponent"></component>
 *    → _c(_vm.currentComponent, {tag: "component"})
 *
 * 5. 内联模板组件：
 *    <my-component inline-template>
 *      <div>{{ message }}</div>
 *    </my-component>
 *    → _c("my-component", {
 *         tag: "my-component",
 *         inlineTemplate: {render: function() {return _c('div', [_v(_s(message))])}}
 *       })
 *
 * 6. 带具名插槽的组件：
 *    <my-component>
 *      <template v-slot:header>标题</template>
 *      <template v-slot:default>内容</template>
 *    </my-component>
 *    → _c("my-component", {
 *         tag: "my-component",
 *         scopedSlots: {
 *           header: function() {return [_v("标题")]},
 *           default: function() {return [_v("内容")]}
 *         }
 *       })
 */

/**
 * 与其他生成函数的配合：
 *
 * 1. genComponent() 会被 genElement() 调用：
 *    - genElement() 检测到是组件时，会调用 genComponent()
 *
 * 2. 与 genData() 的关系：
 *    - genData() 生成组件的props、events、scopedSlots等数据
 *    - genComponent() 调用 genData() 获取组件配置
 *
 * 3. 插槽内容处理：
 *    - 非作用域插槽：作为children参数传递
 *    - 作用域插槽：在genData()中作为scopedSlots处理
 *
 * 4. 组件特殊属性：
 *    - tag: 记录原始标签名（用于动态组件）
 *    - inlineTemplate: 内联模板渲染函数
 *    - scopedSlots: 作用域插槽函数
 *    - model: v-model双向绑定
 */

/**
 * 实际渲染流程：
 *
 * 1. 模板：<my-component :value="msg" @input="updateMsg">
 *           <span>子内容</span>
 *         </my-component>
 *
 * 2. AST解析后el对象包含：
 *    - tag: "my-component"
 *    - attrs: [{name: ":value", value: "msg"}]
 *    - events: {input: {value: "updateMsg"}}
 *    - children: [span元素AST]
 *
 * 3. genComponent()生成：
 *    _c("my-component", {
 *      tag: "my-component",
 *      attrs: {value: msg},
 *      on: {input: updateMsg}
 *    }, [_c('span', [_v("子内容")])])
 *
 * 4. 运行时：
 *    - Vue遇到_c("my-component")，会查找注册的my-component组件
 *    - 创建组件实例，传入props和事件监听器
 *    - children作为默认插槽内容传递给组件
 */
```

```js [genData]
/**
 * 生成VNode数据对象的代码
 * 这是Vue模板编译的核心函数，用于生成虚拟节点的属性数据
 * @param {ASTElement} el - AST元素节点
 * @param {CodegenState} state - 代码生成状态对象
 * @return {string} 生成的VNode数据对象字符串
 */
function genData(el, state) {
  // 1. 初始化数据对象字符串
  var data = "{";

  // 2. 首先处理指令（优先级最高）
  // 指令可能会修改el的其他属性，所以需要最先处理
  var dirs = genDirectives(el, state);
  if (dirs) data += dirs + ",";

  // 3. key - 用于优化列表渲染和组件复用
  if (el.key) data += "key:".concat(el.key, ",");

  // 4. ref - 用于获取DOM元素或组件实例的引用
  if (el.ref) data += "ref:".concat(el.ref, ",");

  // 5. refInFor - ref在v-for内部时的特殊标记
  if (el.refInFor) data += "refInFor:true,";

  // 6. pre - 静态节点标记，优化用
  if (el.pre) data += "pre:true,";

  // 7. component - 动态组件标记，记录原始标签名
  // 用于 <component :is="componentName"> 语法
  if (el.component) data += 'tag:"'.concat(el.tag, '",');

  // 8. 调用模块的data生成函数
  // 这些是Vue模块系统（如class、style模块）注入的生成函数
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }

  // 9. attrs - HTML属性（attribute）
  if (el.attrs) data += "attrs:".concat(genProps(el.attrs), ","); // 如 id="app", class="container" 等

  // 10. domProps - DOM属性（property）
  if (el.props) data += "domProps:".concat(genProps(el.props), ","); // 如 innerHTML, value 等

  // 11. event handlers - 事件处理器（普通事件）
  if (el.events) data += "".concat(genHandlers(el.events, false), ","); // 如 @click="handleClick"

  // 12. nativeEvents - 原生事件处理器
  if (el.nativeEvents)
    data += "".concat(genHandlers(el.nativeEvents, true), ","); // 如 @click.native="handleClick"（仅限组件）

  // 13. slot target - 插槽目标（非作用域插槽）
  if (el.slotTarget && !el.slotScope) {
    // 如 <div slot="header">，表示这个内容要插入到父组件的header插槽
    data += "slot:".concat(el.slotTarget, ",");
  }

  // 14. scoped slots - 作用域插槽
  if (el.scopedSlots)
    data += "".concat(genScopedSlots(el, el.scopedSlots, state), ","); // 生成作用域插槽的函数

  // 15. component v-model - 组件上的v-model
  if (el.model) {
    // v-model在组件上的实现，生成value和callback
    data += "model:{value:"
      .concat(el.model.value, ",callback:")
      .concat(el.model.callback, ",expression:")
      .concat(el.model.expression, "},");
  }

  // 16. inline-template - 内联模板
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += "".concat(inlineTemplate, ",");
    }
  }

  // 17. 清理末尾的逗号并闭合对象
  data = data.replace(/,$/, "") + "}";

  // 18. v-bind动态参数包装处理
  // 动态属性如 :[attributeName]="value" 需要使用_b帮助函数
  if (el.dynamicAttrs) {
    // _b是bindObjectProps函数的别名
    data = "_b("
      .concat(data, ',"') // 原始data对象
      .concat(el.tag, '",') // 标签名
      .concat(genProps(el.dynamicAttrs), ")"); // 动态属性
  }

  // 19. v-bind数据包装（自定义包装）
  if (el.wrapData) data = el.wrapData(data);

  // 20. v-on数据包装（自定义包装）
  if (el.wrapListeners) data = el.wrapListeners(data);

  return data;
}

/**
 * 生成的VNode Data对象结构示例：
 *
 * 1. 简单元素：
 *    <div id="app" class="container"></div>
 *    → {attrs: {id: "app", class: "container"}}
 *
 * 2. 带事件：
 *    <button @click="handleClick">点击</button>
 *    → {on: {click: handleClick}}
 *
 * 3. 带key的列表项：
 *    <li v-for="item in list" :key="item.id">{{item.text}}</li>
 *    → {key: item.id}
 *
 * 4. 组件：
 *    <my-component :value="msg" @input="updateMsg"></my-component>
 *    → {attrs: {value: msg}, on: {input: updateMsg}}
 *
 * 5. 带v-model的组件：
 *    <my-component v-model="msg"></my-component>
 *    → {model: {value: msg, callback: function($$v){msg=$$v}, expression: "msg"}}
 *
 * 6. 带作用域插槽：
 *    <child>
 *      <template v-slot:default="props">{{props.text}}</template>
 *    </child>
 *    → {scopedSlots: {default: function(props){return [_v(_s(props.text))]}}}
 */
```

:::
:::code-group

```js [genStatic]
/**
 * 生成静态节点的渲染函数代码
 * 静态节点会被提升为独立的静态渲染函数，只生成一次，后续复用
 *
 * @param {ASTElement} el - 静态AST元素节点
 * @param {CodegenState} state - 代码生成状态
 * @returns {string} 生成的代码字符串（静态渲染函数引用）
 */
function genStatic(el, state) {
  // 1. 标记节点已处理，避免重复处理
  el.staticProcessed = true;

  // 2. 保存当前的 v-pre 状态
  // 所有的 pre 节点都是静态根节点，所以我们可以利用这个位置来包装状态变化，
  // 并在退出 pre 节点时重置状态。
  var originalPreState = state.pre;

  // 3. 如果节点有 v-pre 指令，更新状态
  if (el.pre) state.pre = el.pre;

  // 4. 生成静态渲染函数并存储 使用 genElement 递归生成节点的代码
  // 包装成 with(this){return ...} 形式 推入 staticRenderFns 数组
  state.staticRenderFns.push(
    "with(this){return ".concat(genElement(el, state), "}")
  );

  // 5. 恢复原来的 v-pre 状态
  state.pre = originalPreState;

  // 6. 返回对静态渲染函数的引用 _m 是 renderStatic 的别名
  // 参数：静态渲染函数的索引，是否在 v-for 中
  return "_m("
    .concat(state.staticRenderFns.length - 1) // 函数索引
    .concat(el.staticInFor ? ",true" : "", ")");
}

// 示例：
// 输入：<div class="container"><h1>标题</h1></div>
// 输出：_m(0)  // 引用第 0 个静态渲染函数
```

```js [genOnce]
/**
 * 生成 v-once 节点的渲染函数代码
 * v-once 节点只渲染一次，后续直接复用缓存结果
 *
 * @param {ASTElement} el - 带有 v-once 指令的AST元素节点
 * @param {CodegenState} state - 代码生成状态
 * @returns {string} 生成的代码字符串
 */
function genOnce(el, state) {
  // 1. 标记节点已处理，避免重复处理
  el.onceProcessed = true;

  // 2. 处理 v-once 与 v-if 的组合情况
  // 如果节点同时有 v-once 和 v-if，优先处理 v-if
  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  }

  // 3. 处理在 v-for 中的 v-once 节点（最复杂的情况）
  else if (el.staticInFor) {
    // 3.1 寻找父级的 key
    var key = "";
    var parent = el.parent;

    // 向上遍历父节点，找到最近的 v-for 父节点
    while (parent) {
      if (parent.for) {
        // 找到 v-for 节点
        key = parent.key; // 获取该 v-for 的 key
        break;
      }
      parent = parent.parent; // 继续向上查找
    }

    // 3.2 如果没找到 key，发出警告 v-for 中的 v-once 必须有 key 才能正常工作
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap["v-once"] // 传递源位置信息
      );
      // 降级处理：当作普通元素处理
      return genElement(el, state);
    }

    // 3.3 生成在 v-for 中的 v-once 代码  格式：_o(renderFn, onceId, key)
    return "_o("
      .concat(genElement(el, state), ",") // 渲染函数
      .concat(state.onceId++, ",") // 唯一ID（递增）
      .concat(key, ")"); // v-for 的 key
  }

  // 4. 处理不在 v-for 中的 v-once 节点（简单情况）
  else {
    return genStatic(el, state); // 不在 v-for 中的 v-once 本质上就是静态节点
  }
}

// 示例：
// 输入：<div v-once>只渲染一次</div>
// 输出：_o(_c('div', [_v("只渲染一次")]), 1, "__once__0")
```

```js [genFor]
/**
 * 生成 v-for 节点的渲染函数代码
 * v-for 指令需要生成列表渲染的包装函数
 *
 * @param {ASTElement} el - 带有 v-for 指令的AST元素节点
 * @param {CodegenState} state - 代码生成状态
 * @param {Function} [altGen] - 替代的代码生成函数（可选）
 * @param {string} [altHelper] - 替代的运行时辅助函数名（可选）
 * @returns {string} 生成的代码字符串
 */
function genFor(el, state, altGen, altHelper) {
  // -----------------------------------------------------
  // 1. 提取 v-for 指令的参数
  var exp = el.for; // 迭代对象表达式，如 "items"
  var alias = el.alias; // 迭代别名，如 "item"

  // 可选参数：迭代索引和键名
  var iterator1 = el.iterator1 ? ",".concat(el.iterator1) : ""; // 键名，如 ",key"
  var iterator2 = el.iterator2 ? ",".concat(el.iterator2) : ""; // 索引，如 ",index"

  // 2. 组件列表的 key 检查 如果渲染的是组件列表且没有 key，发出警告
  if (
    state.maybeComponent(el) && // 可能是组件
    el.tag !== "slot" && // 不是 slot 标签
    el.tag !== "template" && // 不是 template 标签
    !el.key // 没有 key
  ) {
    state.warn(
      // 构建详细的警告信息
      "<"
        .concat(el.tag, ' v-for="')
        .concat(alias, " in ")
        .concat(exp, '">: component lists rendered with ') +
        "v-for should have explicit keys. " +
        "See https://v2.vuejs.org/v2/guide/list.html#key for more info.",
      el.rawAttrsMap["v-for"], // 源位置信息
      true /* tip */ // 标记为提示（非错误）
    );
  }

  // 3. 标记节点已处理，避免递归
  el.forProcessed = true; // avoid recursion

  // 4. 生成 v-for 包装代码
  return (
    // 第一部分：列表渲染函数调用
    "".concat(altHelper || "_l", "((").concat(exp, "),") +
    // 第二部分：迭代回调函数
    "function(".concat(alias).concat(iterator1).concat(iterator2, "){") +
    // 第三部分：循环体代码
    "return ".concat((altGen || genElement)(el, state)) +
    // 闭合括号
    "})"
  );
}

// 示例：
// 输入：<li v-for="(item, index) in items" :key="item.id">{{item.name}}</li>
// 输出：_l((items),function(item,index){return _c("li",{key:item.id},[_v(_s(item.name))])})
```

```js [genIf]
/**
 * 生成 v-if 节点的渲染函数代码
 * 这是入口函数，处理条件渲染的起始点
 *
 * @param {ASTElement} el - 带有 v-if 指令的AST元素节点
 * @param {CodegenState} state - 代码生成状态
 * @param {Function} [altGen] - 替代的代码生成函数（可选）
 * @param {string} [altEmpty] - 替代的空节点代码（可选）
 * @returns {string} 生成的代码字符串
 */
function genIf(el, state, altGen, altEmpty) {
  // 1. 标记节点已处理，避免递归
  el.ifProcessed = true; // 在 genElement 中会检查 ifProcessed，避免重复处理

  // 2. 处理条件分支链
  // el.ifConditions 包含所有条件分支（v-if, v-else-if, v-else）
  // 使用 slice() 创建副本，避免修改原数组
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}
/**
 * 递归生成条件表达式的代码
 * 将条件分支链转换为嵌套的三元表达式
 *
 * @param {Array} conditions - 条件分支数组
 * @param {CodegenState} state - 代码生成状态
 * @param {Function} [altGen] - 替代的代码生成函数
 * @param {string} [altEmpty] - 替代的空节点代码
 * @returns {string} 生成的嵌套三元表达式
 */
function genIfConditions(conditions, state, altGen, altEmpty) {
  // 1. 基线情况：没有条件分支 返回空节点或自定义的空节点代码
  if (!conditions.length) {
    return altEmpty || "_e()"; // _e() 创建空VNode
  }

  // 2. 取出第一个条件分支  使用 shift() 从数组中移除，递归处理剩余分支
  var condition = conditions.shift();

  // 3. 处理有表达式的分支（v-if, v-else-if）  condition.exp 是条件表达式，如 "show", "type === 'A'"
  if (condition.exp) {
    return "("
      .concat(condition.exp, ")?") // 条件部分：(exp)?
      .concat(genTernaryExp(condition.block), ":") // 真值部分：真值:
      .concat(genIfConditions(conditions, state, altGen, altEmpty)); // 假值部分：递归处理剩余分支
  }

  // 4. 处理无表达式的分支（v-else）  v-else 分支没有条件表达式，直接作为默认分支
  else {
    return "".concat(genTernaryExp(condition.block));
  }

  // 5. 内部函数：生成三元表达式的操作数 这个函数在闭包中，可以访问外部的 altGen 和 state
  function genTernaryExp(el) {
    return altGen
      ? altGen(el, state) // 使用自定义生成函数
      : el.once // 如果节点有 v-once
      ? genOnce(el, state) // 生成 v-once 代码
      : genElement(el, state); // 正常生成元素代码
  }
}

// 示例：
// 输入：<div v-if="show">A</div><div v-else>B</div>
// 输出：(show)?_c("div",[_v("A")]):_c("div",[_v("B")])
```

```js [genChildren]
/**
 * 生成元素子节点的渲染函数代码
 * 将子节点数组转换为渲染函数中的 children 数组
 *
 * @param {ASTElement} el - 父元素节点
 * @param {CodegenState} state - 代码生成状态
 * @param {boolean} [checkSkip] - 是否检查子节点规范化类型
 * @param {Function} [altGenElement] - 替代的元素生成函数
 * @param {Function} [altGenNode] - 替代的节点生成函数
 * @returns {string} 生成的子节点代码字符串
 */
function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  // 1. 获取子节点数组
  var children = el.children;

  // 2. 处理有子节点的情况
  if (children.length) {
    var el_1 = children[0]; // 获取第一个子节点

    // 3. 优化：单个 v-for 子节点的特殊处理
    // 条件：只有一个子节点 + 该子节点有 v-for + 不是 template/slot 标签
    if (
      children.length === 1 &&
      el_1.for && // 有 v-for 指令
      el_1.tag !== "template" && // 不是 template 标签
      el_1.tag !== "slot" // 不是 slot 标签
    ) {
      // 3.1 确定规范化类型（normalization type）
      var normalizationType_1 = checkSkip
        ? state.maybeComponent(el_1) // 检查是否可能是组件
          ? ",1" // 组件需要完全规范化
          : ",0" // 简单元素需要简单规范化
        : ""; // 不检查，不添加规范化类型

      // 3.2 生成代码：单个 v-for 节点 + 规范化类型
      return ""
        .concat((altGenElement || genElement)(el_1, state)) // 生成子节点代码
        .concat(normalizationType_1); // 添加规范化类型
    }

    // 4. 一般情况：多个子节点或单个非 v-for 子节点
    // 4.1 确定规范化类型
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent) // 计算规范化类型
      : 0; // 不需要规范化

    // 4.2 确定节点生成函数
    var gen_1 = altGenNode || genNode;

    // 5. 生成 children 数组代码
    return (
      "["
        .concat(
          // 遍历所有子节点，生成代码并用逗号连接
          children
            .map(function (c) {
              return gen_1(c, state); // 对每个子节点调用生成函数
            })
            .join(","),
          "]"
        )
        // 如果需要规范化，添加规范化类型参数
        .concat(normalizationType ? ",".concat(normalizationType) : "")
    );
  }

  // 如果没有子节点，函数隐式返回 undefined
  // 调用方需要处理这种情况
}
```

```js [genSlot]
/**
 * 生成插槽（slot）的渲染代码
 * 用于将模板中的插槽转换为对应的渲染函数代码
 * @param {ASTElement} el - 插槽的AST节点
 * @param {CodegenState} state - 代码生成状态对象
 * @return {string} 生成的渲染函数代码字符串
 */
function genSlot(el, state) {
  // 1. 获取插槽名称，默认为"default"（默认插槽）
  // el.slotName 可能包含动态绑定，如 :name="slotName"
  var slotName = el.slotName || '"default"';

  // 2. 生成插槽的默认内容（后备内容）
  // 当父组件没有提供插槽内容时，会显示这些内容
  var children = genChildren(el, state);

  // 3. 构建基础渲染函数调用 _t() 是 renderSlot 的简写
  // 初始格式: _t(slotName, [renderFunction])
  var res = "_t("
    .concat(slotName) // 插入插槽名称
    .concat(children ? ",function(){return ".concat(children, "}") : "");
  // 如果有默认内容，包装成函数：function(){return children}
  // 否则不传第二个参数

  // 4. 处理插槽的属性（作用域插槽的props）
  // 将静态属性和动态属性合并，并将属性名转换为驼峰命名
  var attrs =
    el.attrs || el.dynamicAttrs
      ? genProps(
          (el.attrs || []) // 静态属性数组
            .concat(el.dynamicAttrs || []) // 合并动态属性
            .map(function (attr) {
              return {
                // slot props are camelized
                // 插槽属性名转换为驼峰式（与组件props的命名规范一致）
                name: camelize(attr.name),
                value: attr.value,
                dynamic: attr.dynamic,
              };
            })
        )
      : null; // 没有属性则返回null

  // 5. 获取v-bind绑定的动态属性对象
  // 如 <slot v-bind="slotProps"> 或 <slot :所有属性="slotProps">
  var bind = el.attrsMap["v-bind"];

  // 6. 参数对齐处理
  // _t函数签名: _t(name, fallback, props, bindObject)
  // 如果只有props或bindObject但没有默认内容，需要补上null作为fallback参数
  if ((attrs || bind) && !children) {
    res += ",null"; // 补上第二个参数（fallback）的位置
  }

  // 7. 添加作用域插槽的属性参数（第三个参数）
  if (attrs) {
    res += ",".concat(attrs);
  }

  // 8. 添加v-bind动态绑定对象（第四个参数）
  if (bind) {
    // 如果没有attrs但有bind，需要先补上第三个参数的位置
    res += "".concat(attrs ? "" : ",null", ",").concat(bind);
  }

  // 9. 闭合函数调用，返回最终代码
  return res + ")";
}

/**
 * 最终生成的代码示例：
 *
 * 1. 普通插槽：
 *    <slot></slot> → _t("default")
 *
 * 2. 具名插槽：
 *    <slot name="header"></slot> → _t("header")
 *
 * 3. 带默认内容的插槽：
 *    <slot>默认内容</slot> → _t("default", function(){return [_v("默认内容")]})
 *
 * 4. 作用域插槽（带props）：
 *    <slot :user="user"></slot> → _t("default", null, {user: user})
 *
 * 5. 带v-bind的作用域插槽：
 *    <slot v-bind="slotProps"></slot> → _t("default", null, null, slotProps)
 *
 * 6. 完整示例：
 *    <slot name="item" :data="item" v-bind="extra">默认</slot>
 *    → _t("item", function(){return [_v("默认")]}, {data: item}, extra)
 */
```

```js [普通元素/组件处理]
var maybeComponent = state.maybeComponent(el);
if (!el.plain || (el.pre && maybeComponent)) {
  data = genData(el, state);
}

// el.plain 表示是否是"朴素"元素
// 朴素元素：没有属性、没有指令的简单元素
// 示例：
// <span>文本</span>  → plain: true
// <span class="red">文本</span> → plain: false
```

:::
