import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/",
    },

    en: {
      label: "English",
      lang: "en-US",
      title: "My Documentation",
      description: "Documentation powered by VitePress",
    },
  },
  title: "liuxy blog",
  description: "liuxinyude blog",
  cleanUrls: true,
  assetsDir: "static",
  markdown: {
    // 配置代码块样式
    theme: "material-theme-palenight", // 其他内置主题参考： material-theme-palenight | github-dark | github-light | dracula | monokai 等

    // lineNumbers: true, // 配置代码款是否显示行号
  },

  themeConfig: {
    logo: "/logo-mini.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "HTML",
        items: [
          { text: "HTML 元素", link: "/html/html-elements.md" },
          { text: "HTML 属性", link: "/html/html-attributes.md" },
          { text: "SVG", link: "/html/svg.md" },
        ],
      },
      {
        text: "CSS",
        items: [
          { text: "css3", link: "/css/css.md" },
          { text: "tailwindcss", link: "/css/tailwindcss.md" },
          { text: "less", link: "/css/less.md" },
          { text: "sass", link: "/css/sass.md" },
        ],
      },
      {
        text: "JavaScript",
        items: [
          { text: "es6", link: "/javascript/es6.md" },
          { text: "JavaScript", link: "/javascript/javascript.md" },
          { text: "TypeScript", link: "/javascript/typescript.md" },
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
            link: "/vue/vue-router.md",
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
        items: [
          {
            text: "设计模式",
            link: "/o/design.md",
          },
          { text: "负载均衡", link: "/others/load-balancing.md" },
          { text: "浏览器", link: "/others/browser.md" },
          { text: "网络于协议", link: "/others/network.md" },
          { text: "开发工具", link: "/others/devtools.md" },
          { text: "Linux", link: "/others/linux.md" },
        ],
      },
    ],
    sidebar: {
      "/html/": [
        {
          text: "HTML",
          items: [
            { text: "HTML 元素", link: "/html/html-elements.md" },
            { text: "HTML 属性", link: "/html/html-attributes.md" },
            { text: "SVG", link: "/html/svg.md" },
          ],
        },
      ],
      "/css/": [
        {
          text: "CSS",
          items: [
            { text: "CSS3", link: "/css/css.md" },
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
            { text: "ES6+", link: "/javascript/es6.md" },
            { text: "JavaScript", link: "/javascript/javascript.md" },
            { text: "TypeScript", link: "/javascript/typescript.md" },
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
                { text: "Vue2响应式系统", link: "/vue/vue2-reactive-data.md" },
                { text: "Vue2视图渲染", link: "/vue/vue2-view-rendering.md" },
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
            { text: "Vue-Router", link: "/vue/vue-router.md" },
          ],
        },
      ],
      "/others/": [
        {
          text: "其他",
          items: [
            { text: "负载均衡", link: "/others/load-balancing.md" },
            { text: "浏览器", link: "/others/browser.md" },
            { text: "网络与协议", link: "/others/network.md" },
            { text: "开发工具", link: "/others/devtools.md" },
            { text: "Linux", link: "/others/linux.md" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    outline: {
      label: "本页目录",
      level: [2, 3, 4],
      position: "right",
    },
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
