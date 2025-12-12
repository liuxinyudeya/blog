import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // 设置站点 favicon.ico | 运行时与部署时去哪里加载资源？
  head: [["link", { rel: "icon", href: "/logo.svg" }]],

  title: "liuxy blog",
  description: "liuxinyude blog",
  cleanUrls: true,
  assetsDir: "static",

  themeConfig: {
    logo: "/logo-mini.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/markdown-examples" },
      { text: "html", link: "/html/html.md" },
      {
        text: "css",
        items: [
          { text: "css3", link: "/css/css.md" },
          { text: "tailwindcss", link: "/css/tailwindcss.md" },
          { text: "less", link: "/css/less.md" },
          { text: "sass", link: "/css/sass.md" },
        ],
      },
      { text: "javascript", link: "/javascript/javascript.md" },

      {
        text: "vue生态",
        items: [
          { text: "vue", items: [{ text: "vue2", link: "/vue/vue2.md" }] },
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
        text: "设计模式",
        link: "/design.md",
      },
    ],

    sidebar: [
      {
        text: "示例",
        items: [
          { text: "vue2", link: "/vue/vue2.md" },
          { text: "Markdown 示例", link: "/markdown-examples" },
          { text: "运行时 API 示例", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    footer: {
      message:
        'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright:
        'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>',
    },
  },
});
