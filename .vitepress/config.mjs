import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "blog",

  title: "liuxy blog",
  description: "liuxinyude blog",

  themeConfig: {
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "示例", link: "/markdown-examples" },
      {
        text: "文档",
        items: [{ text: "vue2", link: "/vue/vue2.md" }],
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
  },
});
