# Eslint<Badge type="tip" text="^9.39.2" /> & Prettier<Badge type="tip" text="^3.8.1" /> 协作

在编码开发阶段，使用 [Eslint](/others/devtools/eslint.md) 和 [Prettier](/others/devtools/prettier.md)协作配合：

- ESLint：专注于代码质量检查，发现潜在 bug、代码异味和最佳实践问题
- Prettier：专注于代码风格格式化，统一缩进、引号、换行等格式问题

我们可以选择:

- 集成使用: 让 Prettier 作为 ESLint 规则运行。
- 分开使用：每个工具专注自己的职责，通过配置避免冲突。

本案例选择 分开使用，并在 VS Code中集成 Eslint 和 Prettier 插件

## 安装依赖与配置

### 安装依赖

```bash
npm install --save-dev eslint prettier

# ESLint 9 核心包和插件
npm install --save-dev @eslint/js @eslint/eslintrc
npm install --save-dev eslint-plugin-vue eslint-plugin-unused-imports @vue/eslint-config-prettier

# Prettier 相关
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

```

### 配置依赖

:::code-group

```js [eslint.config.js]
import eslint from "@eslint/js";
import vuePlugin from "eslint-plugin-vue";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  // 基础配置
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
  },

  // ESLint 推荐规则
  eslint.configs.recommended,

  // Vue 3 配置 - 选择正确的配置级别
  ...vuePlugin.configs["flat/recommended"],

  // Prettier 配置（必须放在 Vue 配置之后）
  prettierConfig,

  // 自定义规则
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // Vue 规则
      "vue/multi-word-component-names": "off",
      "vue/component-name-in-template-casing": ["error", "PascalCase"],

      // 未使用变量/导入规则
      "no-unused-vars": "warn",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 生产环境限制
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
  },

  // 文件类型特定配置
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vuePlugin.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // 忽略文件
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/*.min.js",
      "**/public/**",
      "**/index.html",
    ],
  },
];
```

```json [ .prettierrc ]
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 100,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "htmlWhitespaceSensitivity": "ignore",
  "vueIndentScriptAndStyle": false,
  "overrides": [
    {
      "files": "*.vue",
      "options": {
        "parser": "vue"
      }
    },
    {
      "files": "*.html",
      "options": {
        "parser": "html"
      }
    }
  ]
}
```

```json [ package.json ]
{
  "scripts": {
    "lint": "eslint .",
    "lint:report": "eslint . --format json > eslint-report.json",
    "format": "prettier --write .", // [!code hl]
    "format:check": "prettier --check ." // [!code hl]
  },
  "devDependencies": {
    "@eslint/js": "^9.39.2",
    "eslint": "^9.39.2",
    "eslint-plugin-vue": "^10.7.0",
    "globals": "^17.1.0",
    "prettier": "3.8.1"
  }
}
```

:::

完成上述步骤后，即可执行`package.json`脚本对项目代码质量检查与格式统一

若想要在代码开发阶段编辑器高亮提示，可进一步在 VS Code 集成 Eslint 、Prettier 插件

## 安装插件与配置

### 安装插件

1. 在 VSCode 扩展商店搜索 "ESLint"，安装由 Microsoft 提供的 ESLint 插件。

![VS code截图](/images/others/devtools/eslint/vscode-plugin-eslint.png)

2. 在 VS Code 扩展商店搜索 "Prettier"，安装 Prettier 官方插件：

![prettier插件](/images/others/devtools/prettier/vscode-plugin-prettier.png)

### 配置插件

根据自身需求修改用户、工作区、文件夹级别`settings`：

```json
{
  // 启用 ESLint
  "eslint.enable": true,

  // 为以下文件类型启用 ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue",
    "typescript",
    "typescriptreact",
    "html"
  ],
  // 全局关闭，避免不必要的格式化
  "editor.formatOnSave": false,

  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.fixAll": "never" // 禁用其他修复
  },

  // 只在支持的语言中启用
  "[javascript]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  // ...其他需要配置的语言
}
```

## 总结与扩展

### 总结

完成配置后，工程项目将获得：

- 一致的代码风格：无论团队成员使用何种编辑器，代码格式都保持统一
- 高质量的代码：通过 ESLint 规则提前发现潜在问题
- 高效的开发体验：自动化工具减少了手动格式化和代码审查的时间成本
- 可维护的代码库：统一的代码规范使得项目更易于理解和维护

### 扩展

根据项目需求，还可以进一步集成：

- TypeScript：添加 @typescript-eslint 插件增强类型检查
- 测试工具：配置针对测试文件的特殊规则
- CI/CD 集成：在流水线中加入代码质量检查步骤
- 自定义插件：根据团队规范开发特定规则的 ESLint 插件
