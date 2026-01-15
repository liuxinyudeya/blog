import { defineConfig } from "vitepress";
import path from 'path'
import { fileURLToPath } from 'url';


// 获取当前文件目录（ESM方式）
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://docs.fontawesome.com 图标网站
// https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs 表情包支持
// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {

    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../components'),
      },
    }

  },
  // 设置站点 favicon.ico | 运行时与部署时去哪里加载资源？
  head: [
    ["link", { rel: "icon", href: "/logo.svg" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "liuxy, blog, 前端, vue, javascript, css, html",
      },
    ],
    ["meta", { name: "author", content: "liuxy" }],
    ["meta", { name: "description", content: "liuxinyude blog" }],
  ],

  lang: "zh-CN",
  // locales: {
  //   root: {
  //     label: "简体中文",
  //     lang: "zh-CN",
  //     link: "/",
  //   },

  //   en: {
  //     label: "English",
  //     lang: "en-US",
  //     title: "My Documentation",
  //     description: "Documentation powered by VitePress",
  //   },
  // },
  title: "liuxy blog",
  description: "liuxinyude blog",
  cleanUrls: true,
  assetsDir: "static",
  markdown: {
    // lineNumbers: true, // 配置代码款是否显示行号 

    // 配置代码块样式
    theme: "material-theme-palenight", // 其他内置主题参考： material-theme-palenight | github-dark | github-light | dracula | monokai 等


  },

  themeConfig: {
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',

    logoDark: "/logo-dark.svg",
    logo: "/logo-mini.svg",

    socialLinks: [
      { icon: "github", link: "https://github.com/liuxinyudeya" },
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "关闭",
                },
              },
            },
          },
        },
      },
    },

    // 外部链接是否显示箭头图标
    externalLinkIcon: true,

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "HTML",
        link: "/html/html5.md",
      },
      {
        text: "CSS",
        items: [
          { text: "css3", link: "/css/css3.md" },
          { text: "tailwindcss", link: "/css/tailwindcss.md" },
          { text: "less", link: "/css/less.md" },
          { text: "sass", link: "/css/sass.md" },
        ],
      },
      {
        text: "JavaScript",
        items: [
          { text: "JavaScript", link: "/js/javascript.md" },
          { text: "TypeScript", link: "/js/typescript.md" },
        ],
      },

      {
        text: "vue生态",
        items: [
          {
            text: "vue",
            items: [
              { text: "vue2", link: "/vue/vue2.md" },
              { text: "vue3", link: "/vue/vue3.md" },
            ],
          },
          {
            text: "store",
            items: [
              { text: "vuex", link: "/vue/vuex.md" },
              { text: "pinia", link: "/vue/pinia.md" },
            ],
          },
          {
            text: "vue-router",
            link: "/vue/router.md",
          },
        ],
      },
      {
        text: "构建工具",
        items: [
          { text: "webpack", link: "/build/webpack.md" },
          { text: "vue-cli", link: "/build/vue-cli.md" },
          { text: "vite", link: "/build/vite.md" },
        ],
      },

      {
        text: "其他",
        link: "/others/design.md",
      },
    ],
    sidebar: {
      "/html/": [
        {
          text: "HTML",
          items: [
            { text: "HTML5", link: "/html/html5.md" },
            { text: "HTML 元素", link: "/html/html-elements.md" },
            { text: "HTML 属性", link: "/html/html-attributes.md" },
            { text: "DOM", link: "/html/dom.md" },
            { text: "BOM", link: "/html/bom.md" },
            
          ],
        },
      ],
      "/css/": [
        {
          text: "CSS",
          items: [
            { text: "CSS3", link: "/css/css3.md" },
            { text: "TailwindCSS", link: "/css/tailwindcss.md" },
            { text: "Less", link: "/css/less.md" },
            { text: "Sass", link: "/css/sass.md" },
          ],
        },
      ],
      "javascript/": [
        {
          text: "JavaScript",
          items: [
            { text: "ES6+", link: "/js/es6.md" },
            { text: "JavaScript", link: "/js/javascript.md" },
            { text: "TypeScript", link: "/js/typescript.md" },
            { text: "防抖", link: "/js/debounce.md" },
            { text: "节流", link: "/js/throttle.md" },
            { text: "原型链", link: "/js/prototype.md" },
            { text: "闭包", link: "/js/closure.md" },
            { text: "柯里化函数", link: "/js/currying.md" },
            { text: "匿名参数", link: "/js/anonymous.md" },
          ],
        },
      ],
      "/build/": [
        {
          text: "构建工具",
          items: [
            { text: "webpack", link: "/build/webpack.md" },
            { text: "vue-cli", link: "/build/vue-cli.md" },
            { text: "vite", link: "/build/vite.md" },
          ],
        },
      ],
      "/vue/": [
        {
          text: "Vue生态",
          items: [
            {
              text: "Vue2",
              items: [
                { text: "Vuejs2", link: "/vue/vue2.md" },
                { text: "单文件组件", link: "/vue/SFC.md" },
                { text: "构造器参数", link: "/vue/options.md" },
                { text: "响应式系统", link: "/vue/reactive-data.md" },
                { text: "模板编译", link: "/vue/template-compiler.md" },
                { text: "视图渲染", link: "/vue/view-rendering.md" },
                { text: "AST语法树", link: "/vue/ast.md" },
                { text: "生命周期", link: "/vue/lifecycle.md" },
                { text: "指令集合", link: "/vue/directive.md" },
                { text: "渐进式", link: "/vue/progressive.md" },
              ],
            },
            { text: "Vue3", link: "/vue/vue3.md" },
            {
              text: "vue store",
              items: [
                { text: "Vuex", link: "/vue/vuex.md" },
                { text: "Pinia", link: "/vue/pinia.md" },
              ],
            },
            { text: "Vue-Router", link: "/vue/router.md" },
          ],
        },
      ],

      "/others/": [
        {
          text: "其他",
          items: [
            {
              text: "组件广场",
              items: [
                { text: "组件导航", link: "/others/component/playground.md" },

              ],
            },
            {
              text: "设计模式",
              items: [
                { text: "单例模式", link: "/others/design/singleton.md" },
                { text: "代理模式", link: "/others/design/proxy.md" },
                { text: "观察者模式", link: "/others/design/observer.md" },
                { text: "工厂模式", link: "/others/design/factory.md" },
                {
                  text: "发布订阅模式",
                  link: "/others/design/publish-subscribe.md",
                },
              ],
            },
            {
              text: "算法",
              items: [
                { text: "概念", link: "/others/algorithm/algorithm.md" },
                { text: "冒泡排序", link: "/others/algorithm/bubble-sort.md" },
                { text: "快速排序", link: "/others/algorithm/quicksort.md" },
              ],
            },
            { text: "负载均衡", link: "/others/load-balancing.md" },
            { text: "ESLint", link: "/others/eslint.md" },
            { text: "浏览器", link: "/others/browser.md" },
            { text: "网络与协议", link: "/others/network.md" },
            { text: "开发工具", link: "/others/devtools.md" },
            { text: "Linux", link: "/others/linux.md" },
            { text: "SVG", link: "/others/svg.md" },
          ],
        },
      ],
    }, 
    outline: {
      label: "本页目录",
      level: [2, 3, 4],
      position: "right",
    },
    
    // 开启编辑时间
    lastUpdated: {
      text: "上次更新",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "short",
      },
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2025-present <a href="https://github.com/liuxinyudeya">刘心宇</a>',
    },
    
  },
});
