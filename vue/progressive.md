# 渐进式

**Vue 的设计哲学**：`渐进增强`

> 你可以从最简单的方式开始，然后根据需要逐步增加复杂度
>
> 而不是一开始就必须接受全部复杂性

## 阶段 1：入门级

**CDN 引入 + 模板语法**（最简单）

```html
<!-- 1.1 最简单的用法 - 适合新手、原型、简单页面 -->
<!DOCTYPE html>
<html>
  <head>
    <!-- CDN直接引入完整版Vue -->
    <script src="https://unpkg.com/vue@2.6.14/dist/vue.js"></script>
  </head>
  <body>
    <!-- 直接在HTML中写模板 -->
    <div id="app">
      <h1>{{ title }}</h1>
      <button @click="count++">点击 {{ count }} 次</button>
      <ul>
        <li v-for="item in items">{{ item }}</li>
      </ul>
    </div>

    <script>
      // 最简单的Vue实例
      new Vue({
        el: "#app", // 从DOM自动提取模板
        data: {
          title: "我的第一个Vue应用",
          count: 0,
          items: ["项目1", "项目2", "项目3"],
        },
        methods: {
          // 可以添加方法
        },
      });
    </script>
  </body>
</html>
```

:::info 优点：

1. 零配置：不需要任何构建工具
2. 快速开始：复制粘贴就能运行
3. 简单直观：模板就在 HTML 中
4. 低学习曲线：适合 HTML/CSS 开发者

:::
**适用场景**：

- 学习 Vue 基础知识
- 快速原型验证
- 简单的活动页面
- 传统网站中的局部交互
- 教学演示

技术栈：[HTML](/html/html-attributes.md) + [CSS](/css/css.md) + [Vue.js](/vue/vue2.md)

## 阶段 2：中级

**模块化开发**：

```js
引入模块系统（但还不使用.vue文件）
// index.html
<div id="app"></div>
<script type="module">
  import Vue from './vue.esm.js'
  import App from './app.js'

  new Vue({
    el: '#app',
    render: h => h(App)
  })
</script>

// app.js - 使用render函数
export default {
  data() {
    return { message: 'Hello' }
  },
  render(h) {
    return h('div', [
      h('h1', this.message),
      h(Button, { props: { text: '点击' } })
    ])
  }
}

// button.js - 组件模块
export default {
  props: ['text'],
  render(h) {
    return h('button', this.text)
  }
}
```

:::info 优点：

1. 代码组织：模块化，便于维护
2. 组件复用：可复用的组件
3. 体积优化：使用运行时版本
4. 现代 JS 特性：ES6+语法

:::

**适用场景**：

- 中小型项目
- 需要组件复用的场景
- 团队协作项目

技术栈：HTML + [ES6 Modules](/javascript/es6.md) + Vue(runtime)

## 阶段 3：专业级

**[构建工具](/build/webpack.md) + [单文件组件](/vue/SFC.md)**：

:::code-group

```vue [App.vue]
<!-- 父组件 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <RouterView />
    <!-- 路由 -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { mapState } from "vuex"; // 状态管理

export default {
  name: "App",
  components: { HelloWorld },
  computed: {
    ...mapState(["user", "settings"]),
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

```vue [HelloWorld.vue]
<!--  子组件 -->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p v-if="showExtra">额外的内容</p>
    <button @click="toggle">切换</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      showExtra: false,
    };
  },
  methods: {
    toggle() {
      this.showExtra = !this.showExtra;
    },
  },
};
</script>

<style scoped>
.hello {
  color: #42b983;
}
</style>
```

```js [vue.config.js]
// 项目配置文件
module.exports = {
  // 构建配置
  publicPath: process.env.NODE_ENV === "production" ? "/my-app/" : "/",

  // 开发服务器
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },

  // 插件配置
  chainWebpack: (config) => {
    // 自定义webpack配置
  },
};
```

```text [完整的项目结构]
my-vue-app/
├── public/              # 静态资源
│   ├── index.html
│   └── favicon.ico
├── src/                 # 源代码
│   ├── assets/         # 图片、字体等
│   ├── components/     # 公共组件
│   ├── views/         # 页面组件
│   ├── router/        # 路由
│   ├── store/         # Vuex状态管理
│   ├── api/           # API接口
│   ├── utils/         # 工具函数
│   ├── styles/        # 全局样式
│   ├── App.vue        # 根组件
│   └── main.js        # 入口文件
├── tests/              # 测试
├── .eslintrc.js       # 代码规范
├── babel.config.js    # Babel配置
├── vue.config.js      # Vue CLI配置
└── package.json       # 依赖管理
```

:::

:::info 优点：

1. 完整工程化：构建、打包、优化
2. 开发体验：热重载、代码分割、预编译
3. 类型支持：TypeScript、编辑器智能提示
4. 测试支持：单元测试、E2E 测试
5. 生态系统：Vue Router、Vuex、Vue CLI 插件

:::

**功能特性**：

- 单文件组件：template+script+style 一体化
- 路由系统：SPA 页面导航
- 状态管理：跨组件数据共享
- 构建优化：代码分割、懒加载、tree-shaking
- 开发工具：Vue Devtools、热重载

技术栈：[Vue CLI + Webpack/Vite](/build/vue-cli.md) + [Vue Router](/vue/router.md) + [Vuex](/vue//vuex.md) + [ESLint](/others/eslint.md) + Jest

## 渐进式迁移路径示例

案例：从传统网站逐步迁移到 Vue SPA

```js
// 第1步：局部使用Vue（CDN方式）
// 只在评论区域使用Vue
<div id="comments">
  {{ commentText }}
  <button @click="submit">提交</button>
</div>
<script src="vue.js"></script>
<script>
new Vue({ el: '#comments', /* ... */ })
</script>

// 第2步：引入构建工具，模块化组织
// 将评论组件提取为单独模块
// comment-component.js
export default {
  template: `<div>...</div>`,
  // ...
}

// 第3步：重构为单文件组件
// CommentComponent.vue
<template>...</template>
<script>...</script>
<style>...</style>

// 第4步：整合路由和状态管理
// 将整个网站重构为Vue SPA
```

## 不同阶段的构建配置

```js
// 阶段1：无构建工具
// 直接引入vue.js，无构建步骤

// 阶段2：简单构建配置
// webpack.config.js (简化版)
{
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
}

// 阶段3：完整工程化配置
// 使用Vue CLI，包含：
// - Babel转译
// - CSS预处理 (Sass/Less)
// - 代码分割
// - 生产环境优化
// - PWA支持
// - 测试框架
// - 代码规范检查
```

## 渐进式设计的价值

1. 降低学习门槛
   新手可以从 HTML 开始，逐步学习 JS、组件、路由等
2. 灵活的技术选型
   可以根据项目需求选择合适的技术栈
   小项目：CDN + 模板
   中项目：构建工具 + 组件
   大项目：完整 Vue 生态系统
3. 平滑的升级路径
   项目可以从简单开始，随着需求增长逐步升级架构
   不需要一开始就做复杂的技术决策
4. 广泛的适用性
   适用于各种规模的项目：
   - 简单页面增强
   - 复杂的企业级应用
   - 移动端 H5
   - 桌面应用（Electron）

## 实际案例：电商网站的渐进升级

1. 初始版本（阶段 1）：简单产品展示页

   - 使用 CDN，模板在 HTML 中
   - 功能：产品列表、简单筛选

2. 升级到阶段 2：增加购物车功能

   - 引入 Webpack，模块化组织代码
   - 新增购物车组件、API 调用模块

3. 升级到阶段 3：完整电商平台
   - Vue CLI 项目，单文件组件
   - 功能：用户系统、订单管理、支付流程
   - 技术栈：Vue Router + Vuex + Axios + Element UI

## 渐进式与"全有或全无"框架的对比

Angular（对比）：全有或全无

- 必须使用 TypeScript
- 必须使用模块系统
- 必须使用依赖注入
- 学习曲线陡峭

Vue：渐进式

- 可以用 JavaScript 或 TypeScript
- 可以用全局变量或模块系统
- 可以用 Options API 或 Composition API
- 按需引入功能

Vue 的渐进式设计让开发者可以从最简单的 CDN 引入开始，随着项目需求增长，逐步引入模块化、构建工具、单文件组件、路由状态管理等高级特性，这种"逐步增强"的设计理念降低了学习门槛，提供了灵活的技术选型，是 Vue 框架成功的关键因素之一。
