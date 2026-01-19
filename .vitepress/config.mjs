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
        link: "/html/html5/html5.md",
      },
      {
        text: "CSS",
        items: [
          { text: "css3", link: "/css/css3/css3.md" },
          { text: "less", link: "/css/less/less.md" },
          { text: "sass", link: "/css/sass/sass.md" },
          { text: "tailwindcss", link: "/css/tailwindcss/tailwindcss.md" },
        ],
      },
      {
        text: "JavaScript",
        items: [
          { text: "JavaScript", link: "/js/javascript/javascript.md" },
          { text: "ECMAScript", link: "/js/ecmascript/ecmascript.md" },
          { text: "TypeScript", link: "/js/typescript/typescript.md" },
        ],
      },

      {
        text: "vue生态",
        items: [
          {
            text: "vue",
            items: [
              { text: "vue2", link: "/vue/vue2/vue2.md" },
              { text: "vue3", link: "/vue/vue3/vue3.md" },
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
          { text: "webpack", link: "/build/webpack/webpack.md" },
          { text: "vue-cli", link: "/build/vue-cli/vue-cli.md" },
          { text: "vite", link: "/build/vite/vite.md" },
        ],
      },
      { text: "演练场", link: "/playground/playground.md" },
      {
        text: "其他",
        link: "/others/others.md",
      },


    ],
    sidebar: {
      "/html/": [
        {
          text: "相关内容",
          items: [
            {
              text: "HTML5",
              collapsed: false,
              items: [
                { text: "目录导航", link: "/html/html5/html5.md" },
                { text: "基础语法", link: "/html/html5/basic-grammar.md" },
                { text: "文本与内容标签", link: "/html/html5/text-content.md" },
                { text: "链接与图像", link: "/html/html5/link-image.md" },
                { text: "表格基础", link: "/html/html5/basic-table.md" },
                { text: "表单基础", link: "/html/html5/basic-form.md" },
                { text: "HTML5 标签", link: "/html/html5/html5-tags.md" },
                { text: "开发与环境", link: "/html/html5/development-environment.md" },
              ]
            },
          ],
        },
      ],
      "/css/": [
        {
          text: "相关内容",
          items: [
            {
              text: "CSS3",
              collapsed: false,
              items: [
                { text: "目录导航", link: "/css/css3/css3.md" },
                { text: "基础语法", link: "/css/css3/basic-syntax.md" },
                { text: "基础盒模型", link: "/css/css3/basic-box-model.md" },
                { text: "基本布局", link: "/css/css3/basic-layout.md" },
                { text: "文本与字体", link: "/css/css3/text-font.md" },
                { text: "背景与颜色", link: "/css/css3/background-color.md" },
                { text: "基础响应式", link: "/css/css3/basic-reactive.md" },
                { text: "工具与环境", link: "/css/css3/development-environment.md" },
              ]
            },
            {
              text: "Less", collapsed: false, items: [
                { text: "Less", link: "/css/less/less.md" },
              ]
            },
            {
              text: "Sass", collapsed: false, items: [
                { text: "Sass", link: "/css/sass/sass.md" },
              ]
            },
            {
              text: "TailwindCSS", collapsed: false, items: [
                { text: "TailwindCSS", link: "/css/tailwindcss/tailwindcss.md" },
              ]
            },
          ],
        },
      ],
      "/js/": [
        {
          text: "相关内容",
          items: [
            {
              text: "JavaScript",
              collapsed: false,
              items: [
                { text: "目录导航", link: "/js/javascript/javascript.md" },
                { text: "基础语法", link: "/js/javascript/basic-syntax.md" },
                { text: "内置对象与数据结构", link: "/js/javascript/objects-structures.md" },
                { text: "DOM 文档对象模型 ", link: "/js/javascript/basic-dom.md" },
                { text: "BOM 浏览器对象模型", link: "/js/javascript/basic-bom.md" },
                { text: "基础异步编程", link: "/js/javascript/basic-async.md" },
                { text: "错误处理", link: "/js/javascript/error-handling.md" }, 
              ]
            },

            {
              text: "ECMAScript",
              collapsed: false,
              items: [
                { text: "ECMAScript", link: "/js/ecmascript/ecmascript.md" },
              ]
            },
            {
              text: "TypeScript",
              collapsed: false,
              items: [
                { text: "TypeScript", link: "/js/typescript/typescript.md" },
              ]
            },

          ],
        },
      ],

      "/vue/": [
        {
          text: "Vue生态",
          items: [
            {
              text: "Vue2",
              collapsed: false,
              items: [
                { text: "VueJs2", link: "/vue/vue2/vue2.md" },
                { text: "响应式数据", link: "/vue/vue2/reactive-data.md" },
                { text: "模板编译", link: "/vue/vue2/template-compilation.md" },
                { text: "AST 抽象语法树", link: "/vue/vue2/ast.md" },
                { text: "视图渲染", link: "/vue/vue2/view-rendering.md" },
                { text: "渐进式框架", link: "/vue/vue2/progressive.md" },
              ],
            },
            {
              text: "Vue3",
              collapsed: false,
              items: [
                { text: "VueJs3", link: "/vue/vue3/vue3.md" },
              ]
            },
            {
              text: "vue store",
              collapsed: false,
              items: [
                { text: "Vuex", link: "/vue/vuex.md" },
                { text: "Pinia", link: "/vue/pinia.md" },
              ],
            },
            { text: "Vue-Router", link: "/vue/router.md" },
          ],
        },
      ],
      "/build/": [
        {
          text: "构建工具",
          items: [
            {
              text: "webpack",
              collapsed: false,
              items: [
                { text: "webpack", link: "/build/webpack/webpack.md" },
              ],
            },
            {
              text: "vue-cli",
              collapsed: false,
              items: [
                { text: "vue-cli", link: "/build/vue-cli/vue-cli.md" },
              ],
            },
            {
              text: "vite",
              collapsed: false,
              items: [
                { text: "vite", link: "/build/vite/vite.md" },
              ],
            },
          ],
        },
      ],

      "/others/": [
        {
          text: "相关内容",
          items: [
            {
              text: "Nginx",
              collapsed: false,
              items: [
                { text: "Nginx", link: "/others/nginx/nginx.md" },

              ]
            },

            {
              text: "网络与协议",
              collapsed: false,
              items: [
                { text: "网络基础", link: "/others/network/network.md" },

              ]
            },
            {
              text: "浏览器",
              collapsed: false,
              items: [
                { text: "浏览器工作原理", link: "/others/browser/browser.md" },
              ]
            },

            {
              text: "What happened",
              collapsed: false,
              items: [
                { text: "What happened", link: "/others/what-happened/what-happened.md" },
              ]
            },

            {
              text: "操作系统", collapsed: false, items: [
                { text: "Windows", link: "/others/os/windows.md" },
                { text: "Mac", link: "/others/os/mac/mac.md" },
                { text: "Linux", link: "/others/os/mac/linux.md" },
              ]

            },
            {
              text: "设计模式",
              collapsed: false,
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
              collapsed: false,
              items: [
                { text: "概念", link: "/others/algorithm/algorithm.md" },
                { text: "冒泡排序", link: "/others/algorithm/bubble-sort.md" },
                { text: "快速排序", link: "/others/algorithm/quicksort.md" },
              ],
            },
            {
              text: "开发相关工具",
              collapsed: false,
              items: [
                { text: "Git", link: "/others/devtools/git.md" },
                { text: "ESLint", link: "/others/devtools/eslint.md" },
                { text: "Prettier", link: "/others/devtools/prettier.md" },
              ]
            },
            {
              text: "something",
              collapsed: false,
              items: [
                { text: "something", link: "/others/something/something.md" },
              ]
            },


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
        '技术改变生活，博客记录成长',
      copyright:
        '版权所有 © 2025-至今 <a href="https://github.com/liuxinyudeya">刘心宇</a>',
    },
    notFound: {
      code: "404",
      title: "哎呀，页面走丢了！",
      quote: "生活就像一盒巧克力，你永远不知道下一颗是什么味道～",
      link: "/",
      linkText: "返回首页",
    },

  },
});
