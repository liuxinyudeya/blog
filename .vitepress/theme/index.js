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

// 导入 Vitepress 路由 API
import { useRouter } from "vitepress";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("vitepress-mermaid", VitePressMermaid);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.component("FontAwesomeIcon", FontAwesomeIcon);

    // 创建一个全局 mixin，在组件初始化后获取路由并添加守卫
    app.mixin({
      mounted() {
        // 只在客户端执行
        if (typeof window === "undefined") return;

        // 通过 useRouter() 获取路由实例
        const router = useRouter();

        // 检查是否已添加过守卫（避免重复添加）
        if (window.__VITEPRESS_ROUTE_GUARD_ADDED__) return;
        window.__VITEPRESS_ROUTE_GUARD_ADDED__ = true;

        // 添加路由后置守卫
        router.onAfterRouteChange = (to) => {
          (console.log("路由切换到：", to), window._hmt);
          if (window._hmt) {
            // window._hmt.push(["_trackPageview", to]);
          }
        };
      },
    });
  },
};
