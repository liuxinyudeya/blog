import DefaultTheme from "vitepress/theme";
import "./custom.css";
import VitePressMermaid from "../plugins/vitepress-mermaid/index.vue";

// 1. 引入 fontawesome 核心库和图标
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons"; // 导入所有品牌图标

// 2. 将图标添加到库中，这里添加了整个 Solid 风格图标集
library.add(fas, fab);
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("vitepress-mermaid", VitePressMermaid);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.component("FontAwesomeIcon", FontAwesomeIcon);
  },
};
