# Prettier

## 一、Prettier 是什么？

### 1.1 核心定义

[Prettier](https://prettier.io) 是一个**固执己见的代码格式化工具**，由 Facebook 团队于 2017 年创建并开源。它通过解析代码并将其重新打印为符合预定义规则的格式，强制执行一致的代码风格。

### 1.2 核心特性

- **固执己见**：提供精心设计的默认设置，减少配置决策
- **确定性输出**：相同输入总是产生相同输出
- **语言无关**：支持 20+ 种编程语言和文件格式
- **零配置即可用**：开箱即用，无需繁琐配置

### 1.3 技术原理

:::tip 技术原理
`原始代码 → 解析器 → AST → 打印机 → 格式化代码`

:::

1. **解析阶段**：将代码解析为抽象语法树（AST）
2. **转换阶段**：丢弃所有原始格式信息
3. **打印阶段**：根据规则重新打印格式化后的代码

### 1.4 支持的语言

| 语言           | 文件扩展名               | 是否原生支持 |
| -------------- | ------------------------ | ------------ |
| JavaScript/JSX | `.js`, `.jsx`            | ✅           |
| TypeScript/TSX | `.ts`, `.tsx`            | ✅           |
| Vue            | `.vue`                   | ✅           |
| CSS/SCSS/Less  | `.css`, `.scss`, `.less` | ✅           |
| HTML           | `.html`                  | ✅           |
| JSON/JSON5     | `.json`, `.json5`        | ✅           |
| Markdown       | `.md`, `.mdx`            | ✅           |
| YAML           | `.yml`, `.yaml`          | ✅           |
| GraphQL        | `.graphql`, `.gql`       | ✅           |
| 其他语言       | 通过插件支持             | 🔌           |

## 二、Prettier 有什么用？

### 2.1 核心价值

#### 2.1.1 消除代码风格争议

```javascript
// 格式化前：团队成员可能有不同风格
// const getUser =(id)=> {
//   return users.find((u)=>u.id===id);
// };

// 格式化后：统一、清晰的风格
const getUser = (id) => {
  return users.find((u) => u.id === id);
};
```

#### 2.1.2 提升代码可读性

- 自动调整缩进、空格、换行
- 统一引号、分号使用
- 优化长行拆分

#### 2.1.3 提高开发效率

- 减少手动格式化时间
- 专注业务逻辑而非代码格式
- 自动化代码维护

### 2.2 实际应用场景

#### 场景 1：团队协作标准化

```bash
# 项目初始化时设置
npx prettier --init
# 创建统一配置
echo '{}' > .prettierrc.json
```

#### 场景 2：代码审查优化

```js
// Git Diff 示例 - 只显示逻辑变更
const x = 1; // [!code --]
const x = 2; // [!code ++]
// 而不是显示格式变更
// prettier-ignore
const x=1; // [!code --]
const x = 1; // [!code ++]
```

#### 场景 3：CI/CD 集成

```yaml
# GitHub Actions 配置
- name: Check Formatting
  run: npx prettier --check .
```

## 三、Prettier 全部配置详解

### 3.1 配置方式优先级

1. **命令行参数**：最高优先级
2. **配置文件**：项目级配置
3. **编辑器配置**：VS Code 等
4. **默认配置**：最低优先级

### 3.2 完整配置选项（按类别分类）

#### 3.2.1 基础格式化配置

```json
{
  "printWidth": 80,
  // 说明：每行最大字符数，超过则自动换行
  // 取值范围：正整数，推荐 80-120
  // 默认值：80

  "tabWidth": 2,
  // 说明：每个缩进级别的空格数
  // 取值范围：正整数
  // 默认值：2

  "useTabs": false,
  // 说明：是否使用制表符缩进
  // 取值：true/false
  // 默认值：false（使用空格）

  "semi": true,
  // 说明：语句末尾是否添加分号
  // 取值：true/false
  // 默认值：true

  "singleQuote": false,
  // 说明：是否使用单引号
  // 取值：true/false
  // 默认值：false（双引号）

  "quoteProps": "as-needed",
  // 说明：对象属性的引号处理方式
  // 取值：
  //   "as-needed" - 仅在需要时添加引号
  //   "consistent" - 如果一个属性需要引号，则全部加引号
  //   "preserve" - 保持原始引号
  // 默认值："as-needed"

  "jsxSingleQuote": false,
  // 说明：JSX中是否使用单引号
  // 取值：true/false
  // 默认值：false

  "trailingComma": "es5",
  // 说明：多行时的尾随逗号策略
  // 取值：
  //   "none" - 无尾随逗号
  //   "es5" - ES5兼容的尾随逗号（对象、数组）
  //   "all" - 尽可能添加尾随逗号（函数参数等）
  // 默认值："es5"

  "bracketSpacing": true,
  // 说明：对象括号间是否有空格
  // 取值：true/false
  // 示例：true → { foo: bar }, false → {foo: bar}
  // 默认值：true

  "bracketSameLine": false,
  // 说明：多行HTML/JSX元素的结束>是否在最后一行的末尾
  // 取值：true/false
  // 默认值：false

  "arrowParens": "avoid",
  // 说明：箭头函数参数的括号策略
  // 取值：
  //   "avoid" - 单个参数时省略括号：x => x
  //   "always" - 总是有括号：(x) => x
  // 默认值："avoid"

  "endOfLine": "lf",
  // 说明：换行符类型
  // 取值：
  //   "lf" - Unix/Linux风格（\n）
  //   "crlf" - Windows风格（\r\n）
  //   "cr" - 旧Mac风格（\r）
  //   "auto" - 自动检测
  // 默认值：根据系统自动选择

  "rangeStart": 0,
  "rangeEnd": Infinity
  // 说明：仅格式化文件的一部分
  // 用途：处理大文件或特定范围
  // 默认值：0 到 Infinity
}
```

#### 3.2.2 Markdown 特定配置

```json
{
  "proseWrap": "preserve",
  // 说明：Markdown文本的换行策略
  // 取值：
  //   "always" - 超过printWidth时换行
  //   "never" - 不自动换行
  //   "preserve" - 保持原样
  // 默认值："preserve"

  "singleAttributePerLine": false
  // 说明：HTML元素是否每个属性单独一行
  // 取值：true/false
  // 默认值：false
}
```

#### 3.2.3 文件覆盖配置（overrides）

```json
{
  "overrides": [
    {
      "files": "*.md",
      "options": {
        "printWidth": 80,
        "proseWrap": "always"
      }
    },
    {
      "files": ["*.json", "*.json5"],
      "options": {
        "tabWidth": 4
      }
    },
    {
      "files": "*.yml",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

### 3.3 其他配置方式

#### 3.3.1 package.json 配置

```json
{
  "name": "my-project",
  "prettier": {
    "printWidth": 100,
    "singleQuote": true
  }
}
```

#### 3.3.2 JavaScript 动态配置

```javascript
// .prettierrc.js
module.exports = {
  // 根据环境变量动态配置
  printWidth: process.env.NODE_ENV === "production" ? 80 : 100,

  // 读取其他配置
  semi: require("./eslint-config").rules["semi"] !== "off",

  // 函数式配置
  trailingComma: (() => {
    return Math.random() > 0.5 ? "all" : "es5";
  })(),
};
```

## 四、Vue 项目最佳实践（完整案例）

### 4.1 Vue 3 + TypeScript + Vite 项目配置

#### 4.1.1 项目结构

```text
my-vue-project/
├── .vscode/
│   └── settings.json
├── .husky/
│   └── pre-commit
├── src/
│   ├── components/
│   ├── views/
│   └── App.vue
├── .prettierrc.json
├── .prettierignore
├── package.json
└── vite.config.ts
```

#### 4.1.2 完整配置示例

:::code-group

```json [package.json]
{
  "name": "my-vue-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:staged": "lint-staged",
    "prepare": "husky install",
    "lint": "eslint . --ext .vue,.js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "@vue/eslint-config-prettier": "^8.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "@vue/tsconfig": "^0.4.0",
    "eslint": "^8.45.0",
    "eslint-plugin-vue": "^9.15.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.0",
    "prettier": "^3.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.3.0",
    "vue-tsc": "^1.4.0"
  },
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
    "*.{json,md,html,css,scss,less}": ["prettier --write"]
  }
}
```

```json [.prettierrc.json]
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "vueIndentScriptAndStyle": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "lf",
  "embeddedLanguageFormatting": "auto",
  "singleAttributePerLine": false,
  "overrides": [
    {
      "files": "*.vue",
      "options": {
        "parser": "vue",
        "htmlWhitespaceSensitivity": "ignore",
        "vueIndentScriptAndStyle": true
      }
    },
    {
      "files": ["*.json", "*.json5"],
      "options": {
        "tabWidth": 4,
        "singleQuote": false
      }
    },
    {
      "files": "*.md",
      "options": {
        "printWidth": 80,
        "proseWrap": "always",
        "singleQuote": false
      }
    },
    {
      "files": "*.yml",
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

```txt [.prettierignore]
# 依赖目录
node_modules
dist
build
.coverage

# 构建产物
*.log
*.lock
*.tmp
*.temp

# IDE文件
.vscode
.idea
*.swp
*.swo

# 环境文件
.env
.env.local
.env.*.local

# 系统文件
.DS_Store
Thumbs.db

# 测试相关
coverage
.nyc_output

# 其他
*.min.*
```

:::

:::code-group

```vue [ 格式化前：]
<template>
  <div class="user-card" @click="handleClick">
    <img :src="avatar" alt="avatar" class="avatar" />
    <div class="user-info">
      <h3>{{ fullName }}</h3>
      <p v-if="bio">{{ bio }}</p>
      <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "UserCard",
  props: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: null },
    tags: { type: Array as () => string[], default: () => [] },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const fullName = computed(() => `${props.firstName} ${props.lastName}`);
    function handleClick() {
      emit("click");
    }
    return { fullName, handleClick };
  },
});
</script>

<style scoped>
.user-card {
  display: flex;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}
.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
}
.user-info {
  flex: 1;
}
.user-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}
.user-info p {
  margin: 0 0 12px 0;
  color: #666;
  line-height: 1.5;
}
.tags {
  display: flex;
  gap: 8px;
}
.tag {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #555;
}
</style>
```

```vue [ 格式化后：]
<template>
  <div class="user-card" @click="handleClick">
    <img :src="avatar" alt="avatar" class="avatar" />
    <div class="user-info">
      <h3>{{ fullName }}</h3>
      <p v-if="bio">{{ bio }}</p>
      <div class="tags">
        <span v-for="tag in tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "UserCard",
  props: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String, default: "" },
    bio: { type: String, default: null },
    tags: { type: Array as () => string[], default: () => [] },
  },
  emits: ["click"],
  setup(props, { emit }) {
    const fullName = computed(() => `${props.firstName} ${props.lastName}`);

    function handleClick() {
      emit("click");
    }

    return { fullName, handleClick };
  },
});
</script>

<style scoped>
.user-card {
  display: flex;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.3s;
}

.user-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
}

.user-info {
  flex: 1;
}

.user-info h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.user-info p {
  margin: 0 0 12px 0;
  color: #666;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #555;
}
</style>
```

:::
4.2 编辑器集成（VS Code）

**.vscode/settings.json**：

```json
{
  // Prettier 配置
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.formatOnType": false,

  // 语言特定格式化
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "on",
      "strings": "on",
      "other": "on"
    }
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // Prettier 插件配置
  "prettier.requireConfig": true,
  "prettier.useEditorConfig": false,
  "prettier.documentSelectors": ["**/*.vue"],

  // Vue 特定配置
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",

  // ESLint 集成
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "eslint.options": {
    "extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
  },

  // 保存时自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  }
}
```

### 4.3 Git 钩子配置

**.husky/pre-commit**：

```bash
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

echo "🚀 Running pre-commit checks..."

# 运行 lint-staged
npx lint-staged

# 如果有测试，可以在这里运行
# npm test

echo "✅ Pre-commit checks passed!"
```

### 4.4 CI/CD 集成（GitHub Actions）

**.github/workflows/format-check.yml**：

```yaml
name: Code Format Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  format:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Check formatting
        run: npm run format:check

      - name: Run ESLint
        run: npm run lint

      - name: TypeScript type check
        run: npx tsc --noEmit
```

### 4.5 高级配置技巧

#### 4.5.1 条件配置

```javascript
// .prettierrc.js
module.exports = {
  // 根据项目类型配置
  printWidth: isVueProject ? 100 : 80,

  // 根据文件大小动态配置
  ...(isLargeFile ? { printWidth: 120 } : {}),

  // 环境特定配置
  endOfLine: process.env.CI ? "lf" : "auto",

  // 团队偏好配置
  singleQuote: teamPreferences.useSingleQuote || true,
};
```

#### 4.5.2 共享配置

```json
{
  "extends": ["@company/prettier-config", "prettier-config-standard"],
  "overrides": [
    {
      "files": "*.vue",
      "options": {
        "printWidth": 100
      }
    }
  ]
}
```

### 4.6 故障排除指南

#### 常见问题 1：格式化不生效

```bash
# 检查配置文件是否存在
ls -la .prettierrc*

# 检查编辑器是否使用项目配置
npx prettier --check .

# 查看当前生效的配置
npx prettier --debug-check src/App.vue
```

#### 常见问题 2：与 [ESLint](/others/devtools/eslint.md) 冲突

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/typescript/recommended",
    "prettier", // 必须放在最后
  ],
  rules: {
    // 关闭与 Prettier 冲突的规则
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/component-definition-name-casing": "off",
  },
};
```

## 五、最佳实践总结

### 5.1 配置策略

1. **团队统一**：项目使用相同的 Prettier 配置
2. **版本控制**：将配置文件纳入版本控制
3. **最小配置**：尽量使用默认值，只修改必要选项

### 5.2 工作流集成

1. **编辑器**：保存时自动格式化
2. **Git 钩子**：提交前自动检查和修复
3. **CI/CD**：持续集成中验证格式

### 5.3 Vue 项目特别注意事项

1. **Vue 文件解析**：确保配置 `vueIndentScriptAndStyle`
2. **模板格式化**：使用 `htmlWhitespaceSensitivity: "ignore"`
3. **样式块**：保持 SCSS/Less 支持

### 5.4 性能优化

1. **忽略文件**：合理配置 `.prettierignore`
2. **增量格式化**：对大型项目使用 `--write` 而非全局格式化
3. **缓存机制**：利用编辑器缓存提升速度

通过以上完整配置和实践，可以确保 Vue 项目中的代码始终保持一致的、高质量的格式，提升团队协作效率和代码可维护性。
