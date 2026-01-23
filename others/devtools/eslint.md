# ESLint

## 一、ESLint 是什么？

### 1.1 核心定义

[ESLint](https://eslint.org) 是一个开源的 **JavaScript/TypeScript 代码质量检查工具**，由 Nicholas C. Zakas 于 2013 年创建。

它通过静态代码分析来识别和报告代码中的问题模式，帮助开发者编写更规范、更可维护的代码。

### 1.2 核心特性

- **可配置性强**：支持自定义规则和配置
- **插件化架构**：可扩展支持各种框架和库
- **自动修复**：支持自动修复部分问题
- **集成友好**：与编辑器和构建工具无缝集成

### 1.3 技术原理

::: tip 技术原理
`源代码 → 解析器 → AST → 规则检查 → 问题报告/自动修复`
:::

1. **解析阶段**：使用 Espree（默认）或其他解析器将代码转换为 AST
2. **遍历阶段**：深度优先遍历 AST
3. **检查阶段**：应用配置的规则进行检查
4. **报告阶段**：输出检查结果或自动修复

### 1.4 支持的 JavaScript 变体

| 语言/框架       | 是否原生支持 | 需要插件/解析器             |
| --------------- | ------------ | --------------------------- |
| JavaScript ES5+ | ✅           | -                           |
| TypeScript      | ⚠️           | `@typescript-eslint/parser` |
| React (JSX)     | ✅           | -                           |
| Vue.js          | ⚠️           | `eslint-plugin-vue`         |
| Node.js         | ✅           | -                           |
| ES Modules      | ✅           | -                           |

## 二、ESLint 有什么用？

### 2.1 核心价值

#### 2.1.1 代码质量保证

```javascript
// 问题代码示例
const x = 10;
if ((x = 5)) {
  // 误用赋值操作符
  console.log("x is 5");
}

// ESLint 会检测到：
// 1. 缺少分号（如果配置了 semi 规则）
// 2. 条件语句中使用赋值操作符
```

#### 2.1.2 一致性维护

- 统一代码风格（缩进、命名约定等）
- 遵循最佳实践和编码规范
- 避免常见错误和反模式

#### 2.1.3 团队协作标准化

- 新成员快速适应项目规范
- 减少代码审查中的风格争议
- 自动化代码质量检查

### 2.2 实际应用场景

#### 场景 1：新项目代码规范设置

```bash
# 初始化 ESLint 配置
npx eslint --init

# 交互式配置向导会询问：
# 1. 如何使用 ESLint？
# 2. 项目使用什么模块系统？
# 3. 使用哪个框架？
# 4. 是否使用 TypeScript？
# 5. 代码运行环境？
# 6. 配置文件格式？
```

#### 场景 2：代码审查自动化

```yaml
# GitHub Actions 配置
- name: Run ESLint
  run: npx eslint .

- name: Run ESLint with auto-fix
  run: npx eslint --fix .
```

#### 场景 3：开发时实时反馈

```json
// VS Code 配置
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 三、ESLint 配置详解

### 3.1 配置文件类型和优先级

1. **命令行选项**：最高优先级
2. **项目级配置文件**（按优先级）：
   - `.eslintrc.js`
   - `.eslintrc.cjs`
   - `.eslintrc.yaml` / `.eslintrc.yml`
   - `.eslintrc.json`
   - `.eslintrc`
   - `package.json` 中的 `eslintConfig` 字段
3. **用户主目录配置**：`~/.eslintrc`

### 3.2 配置结构详解

#### 3.2.1 基本配置结构

```javascript
// .eslintrc.js
module.exports = {
  // 解析器配置
  parser: "espree",

  // 解析器选项
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },

  // 环境配置
  env: {
    browser: true,
    node: true,
    es2022: true,
  },

  // 全局变量
  globals: {
    jQuery: "readonly",
    $: "readonly",
  },

  // 插件
  plugins: ["react", "vue"],

  // 规则扩展
  extends: ["eslint:recommended", "plugin:react/recommended"],

  // 规则配置
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "single"],
  },

  // 文件覆盖配置
  overrides: [
    {
      files: ["*.test.js", "*.spec.js"],
      rules: {
        "no-unused-expressions": "off",
      },
    },
  ],

  // 忽略规则的文件/目录
  ignorePatterns: ["dist/", "node_modules/"],
};
```

### 3.3 主要配置选项详解

#### 3.3.1 解析器配置 (parser)

```javascript
parser: '@typescript-eslint/parser',
// 说明：指定代码解析器
// 常用值：
//   'espree' - ESLint 默认解析器（支持 ES5-ES2022）
//   '@typescript-eslint/parser' - TypeScript 解析器
//   'vue-eslint-parser' - Vue 单文件组件解析器
//   'babel-eslint'（已弃用）→ 使用 '@babel/eslint-parser'
```

#### 3.3.2 解析器选项 (parserOptions)

```javascript
parserOptions: {
  ecmaVersion: 2022,
  // 说明：指定 ECMAScript 版本
  // 取值：3, 5, 6/2015, 7/2016, ..., 2022 或 'latest'
  // 默认：5

  sourceType: 'module',
  // 说明：指定模块类型
  // 取值：'script'（传统脚本）| 'module'（ES 模块）
  // 默认：'script'

  ecmaFeatures: {
    jsx: true,
    // 说明：是否启用 JSX 语法支持
    // 默认：false

    impliedStrict: true,
    // 说明：是否启用严格模式
    // 默认：false

    globalReturn: false,
    // 说明：是否允许在全局作用域中使用 return
    // 默认：false
  }
}
```

#### 3.3.3 环境配置 (env)

```javascript
env: {
  browser: true,
  // 说明：启用浏览器全局变量，如 window, document

  node: true,
  // 说明：启用 Node.js 全局变量，如 process, __dirname

  es2022: true,
  // 说明：启用 ES2022 全局变量和语法

  jest: true,
  // 说明：启用 Jest 测试框架全局变量

  mocha: true,
  // 说明：启用 Mocha 测试框架全局变量

  jquery: true,
  // 说明：启用 jQuery 全局变量
}
```

#### 3.3.4 全局变量 (globals)

```javascript
globals: {
  // 变量名: 可写性
  jQuery: 'readonly',  // 只读，不能重新赋值
  $: 'readonly',

  // 可写变量
  myGlobal: 'writable',  // 可读可写

  // 废弃变量
  deprecatedVar: 'off',  // 禁用该全局变量检查
}
```

#### 3.3.5 插件 (plugins)

```javascript
plugins: [
  'react',           // eslint-plugin-react
  'vue',             // eslint-plugin-vue
  '@typescript-eslint',  // @typescript-eslint/eslint-plugin
  'import',          // eslint-plugin-import
  'jsx-a11y',        // eslint-plugin-jsx-a11y
  'prettier',        // eslint-plugin-prettier
  'jest',            // eslint-plugin-jest
  'testing-library'  // eslint-plugin-testing-library
],
// 说明：加载 ESLint 插件
// 注意：插件名可以省略 'eslint-plugin-' 前缀
```

#### 3.3.6 规则扩展 (extends)

```javascript
extends: [
  'eslint:recommended',
  // 说明：ESLint 官方推荐规则集

  'plugin:react/recommended',
  // 说明：React 插件推荐配置

  'plugin:vue/vue3-recommended',
  // 说明：Vue 3 推荐配置

  'airbnb',
  // 说明：Airbnb 代码规范

  'airbnb-typescript',
  // 说明：Airbnb TypeScript 规范

  'plugin:@typescript-eslint/recommended',
  // 说明：TypeScript 推荐配置

  'plugin:prettier/recommended',
  // 说明：Prettier 集成配置（必须放在最后）
],
// 说明：继承共享配置，按顺序应用，后面的配置会覆盖前面的
```

#### 3.3.7 规则配置 (rules)

```javascript
rules: {
  // 规则级别
  'semi': 'error',          // 错误级别（红色波浪线）
  'quotes': 'warn',         // 警告级别（黄色波浪线）
  'no-console': 'off',      // 关闭规则

  // 带选项的规则
  'indent': ['error', 2, { SwitchCase: 1 }],
  // 数组格式：[级别, 选项1, 选项2, ...]

  // 复杂规则
  'max-len': [
    'error',
    {
      code: 100,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true
    }
  ],

  // TypeScript 规则
  '@typescript-eslint/explicit-function-return-type': [
    'warn',
    {
      allowExpressions: true,
      allowHigherOrderFunctions: true
    }
  ],

  // Vue 规则
  'vue/multi-word-component-names': ['error', {
    ignores: ['index', 'default', 'App']
  }],
},
// 规则级别说明：
// "off" 或 0 - 关闭规则
// "warn" 或 1 - 警告级别
// "error" 或 2 - 错误级别
```

#### 3.3.8 文件覆盖配置 (overrides)

```javascript
overrides: [
  {
    // 针对 TypeScript 文件
    files: ["*.ts", "*.tsx"],
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "error",
    },
  },
  {
    // 针对测试文件
    files: ["**/*.test.js", "**/*.spec.js"],
    env: {
      jest: true,
    },
    rules: {
      "no-unused-expressions": "off",
    },
  },
  {
    // 针对配置文件
    files: ["*.config.js", "*.config.ts"],
    env: {
      node: true,
    },
  },
];
```

#### 3.3.9 忽略模式 (ignorePatterns)

```javascript
ignorePatterns: [
  "node_modules/", // 忽略 node_modules
  "dist/", // 忽略构建目录
  "build/", // 忽略构建目录
  "coverage/", // 忽略测试覆盖率报告
  "*.min.js", // 忽略压缩文件
  "*.d.ts", // 忽略 TypeScript 声明文件
  "!.eslintrc.js", // 不忽略配置文件（! 表示不忽略）
];
```

### 3.4 规则类别详解

#### 3.4.1 可能的错误 (Possible Errors)

```javascript
rules: {
  // 常见错误检测
  'no-console': 'warn',           // 禁用 console
  'no-debugger': 'error',         // 禁用 debugger
  'no-alert': 'warn',             // 禁用 alert

  // 语法错误
  'no-dupe-keys': 'error',        // 对象中禁止重复键
  'no-dupe-args': 'error',        // 函数中禁止重复参数
  'no-duplicate-case': 'error',   // switch 中禁止重复 case

  // 逻辑错误
  'no-constant-condition': 'error', // 禁止常量作为条件
  'no-compare-neg-zero': 'error',   // 禁止与 -0 比较
  'no-cond-assign': 'error',        // 禁止条件语句中的赋值
}
```

#### 3.4.2 最佳实践 (Best Practices)

```javascript
rules: {
  // 代码质量
  'curly': ['error', 'all'],          // 强制使用花括号
  'eqeqeq': ['error', 'always'],      // 强制使用 === 和 !==
  'no-eval': 'error',                 // 禁用 eval()
  'no-implied-eval': 'error',         // 禁止隐式 eval

  // 代码风格
  'default-case': 'error',            // switch 必须有 default
  'default-case-last': 'error',       // default 必须在最后
  'dot-notation': 'error',            // 强制使用点号访问属性

  // 错误处理
  'no-throw-literal': 'error',        // 禁止抛出字面量
  'prefer-promise-reject-errors': 'error', // Promise.reject 必须使用 Error
}
```

#### 3.4.3 变量相关 (Variables)

```javascript
rules: {
  // 变量声明
  'no-undef': 'error',                // 禁用未声明的变量
  'no-unused-vars': ['error', {      // 禁止未使用变量
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],

  // 变量作用域
  'block-scoped-var': 'error',        // 强制块作用域变量
  'no-shadow': 'error',               // 禁止变量声明覆盖外层作用域
  'no-redeclare': 'error',            // 禁止重复声明

  // 变量使用
  'no-use-before-define': ['error', { // 禁止在定义前使用
    functions: false,
    classes: true,
    variables: true
  }],
}
```

#### 3.4.4 代码风格 (Stylistic Issues)

```javascript
rules: {
  // 缩进和空格
  'indent': ['error', 2, {            // 2 空格缩进
    SwitchCase: 1,                    // switch case 缩进 1 级
    VariableDeclarator: { multiline: true }
  }],

  // 分号和引号
  'semi': ['error', 'always'],        // 强制分号
  'quotes': ['error', 'single', {     // 强制单引号
    avoidEscape: true,
    allowTemplateLiterals: true
  }],

  // 代码布局
  'brace-style': ['error', '1tbs', {  // 大括号风格
    allowSingleLine: true
  }],
  'comma-dangle': ['error', 'always-multiline'], // 尾随逗号
  'comma-spacing': ['error', {        // 逗号空格
    before: false,
    after: true
  }],
}
```

#### 3.4.5 ES6+ 特性 (ECMAScript 6+)

```javascript
rules: {
  // 箭头函数
  'arrow-parens': ['error', 'always'],  // 箭头函数参数括号
  'arrow-spacing': ['error', {          // 箭头函数空格
    before: true,
    after: true
  }],

  // 模板字符串
  'prefer-template': 'error',           // 优先使用模板字符串
  'template-curly-spacing': ['error', 'never'], // 模板字符串空格

  // 解构赋值
  'prefer-destructuring': ['error', {   // 优先使用解构
    array: true,
    object: true
  }],

  // 类和对象
  'object-shorthand': ['error', 'always'], // 对象属性简写
  'prefer-arrow-callback': 'error',     // 优先使用箭头函数回调
}
```

### 3.5 常用插件规则

#### 3.5.1 TypeScript 规则 (@typescript-eslint)

```javascript
rules: {
  // TypeScript 特定规则
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-unused-vars': ['error', {
    argsIgnorePattern: '^_',
    varsIgnorePattern: '^_'
  }],

  // 覆盖 ESLint 规则
  'no-use-before-define': 'off',
  '@typescript-eslint/no-use-before-define': ['error'],

  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error'],
}
```

#### 3.5.2 Vue.js 规则 (eslint-plugin-vue)

```javascript
rules: {
  // Vue 2/3 基础规则
  'vue/multi-word-component-names': 'error',
  'vue/no-unused-components': 'error',
  'vue/no-unused-vars': 'error',

  // 模板相关
  'vue/html-indent': ['error', 2],
  'vue/html-self-closing': ['error', {
    html: {
      void: 'always',
      normal: 'always',
      component: 'always'
    }
  }],

  // 脚本相关
  'vue/script-indent': ['error', 2, {
    baseIndent: 1,
    switchCase: 1
  }],

  // 样式相关
  'vue/no-parsing-error': 'error',
}
```

#### 3.5.3 React 规则 (eslint-plugin-react)

```javascript
rules: {
  // React 特定规则
  'react/react-in-jsx-scope': 'off', // React 17+ 不需要
  'react/prop-types': 'off',         // TypeScript 项目可关闭
  'react/jsx-filename-extension': ['error', {
    extensions: ['.jsx', '.tsx']
  }],

  // JSX 相关
  'react/jsx-indent': ['error', 2],
  'react/jsx-indent-props': ['error', 2],
  'react/jsx-curly-spacing': ['error', {
    when: 'never',
    children: true
  }],

  // Hooks 规则
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
}
```

#### 3.5.4 Import/Export 规则 (eslint-plugin-import)

```javascript
rules: {
  // 导入/导出规范
  'import/order': ['error', {
    groups: [
      'builtin',
      'external',
      'internal',
      ['parent', 'sibling', 'index']
    ],
    'newlines-between': 'always'
  }],

  'import/no-unresolved': 'error',
  'import/named': 'error',
  'import/default': 'error',
  'import/export': 'error',
  'import/no-duplicates': 'error',
  'import/no-extraneous-dependencies': ['error', {
    devDependencies: ['**/*.test.js', '**/*.spec.js']
  }],
}
```

## 四、Vue 3 + TypeScript + Vite 项目完整案例

### 4.1 项目初始化配置

#### 4.1.1 项目结构

```txt
vue3-ts-project/
├── .vscode/
│   └── settings.json
├── .husky/
│   └── pre-commit
├── src/
│   ├── components/
│   ├── views/
│   └── App.vue
├── .eslintrc.js
├── .eslintignore
├── package.json
└── vite.config.ts
```

#### 4.1.2 依赖安装

```bash
# 安装 ESLint 及相关依赖
npm install --save-dev eslint

# Vue 3 相关
npm install --save-dev eslint-plugin-vue @vue/eslint-config-typescript

# TypeScript 相关
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin

# 其他工具
npm install --save-dev eslint-plugin-import eslint-plugin-prettier

# Prettier 集成
npm install --save-dev prettier eslint-config-prettier
```

#### 4.1.3 package.json 配置

```json
{
  "name": "vue3-ts-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .vue,.js,.jsx,.ts,.tsx --fix",
    "type-check": "vue-tsc --noEmit",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vue/eslint-config-typescript": "^11.0.0",
    "eslint": "^8.45.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-import": "^2.28.0",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-vue": "^9.17.0",
    "husky": "^8.0.0",
    "lint-staged": "^13.2.0",
    "prettier": "^3.0.0",
    "typescript": "^5.1.0",
    "vite": "^4.3.0",
    "vue-tsc": "^1.8.0"
  }
}
```

### 4.2 完整 ESLint 配置示例

#### 4.2.1 .eslintrc.js 配置文件

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  extends: [
    // ESLint 推荐规则
    "eslint:recommended",

    // TypeScript 推荐规则
    "plugin:@typescript-eslint/recommended",

    // Vue 3 推荐规则
    "plugin:vue/vue3-recommended",

    // TypeScript 的 Vue 配置
    "@vue/eslint-config-typescript",

    // Prettier 集成（必须放在最后）
    "plugin:prettier/recommended",
  ],

  parser: "vue-eslint-parser",

  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    extraFileExtensions: [".vue"],
  },

  plugins: ["@typescript-eslint", "vue", "import"],

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },

  rules: {
    // 关闭不需要的规则
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",

    // 自定义规则
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
        ],
        pathGroups: [
          {
            pattern: "vue",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],

    // 代码风格
    semi: ["error", "always"],
    quotes: ["error", "single", { avoidEscape: true }],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],

    // Vue 特定规则
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],

    "vue/component-tags-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],

    // TypeScript 规则
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],

    // 最佳实践
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "prefer-const": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
  },

  overrides: [
    {
      files: ["*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".vue"],
      },
      rules: {
        // Vue 文件中的特定规则
        "vue/block-order": [
          "error",
          {
            order: ["template", "script", "style"],
          },
        ],
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        // TypeScript 文件的特定规则
        "@typescript-eslint/explicit-function-return-type": [
          "warn",
          {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
          },
        ],
      },
    },
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      env: {
        jest: true,
      },
      rules: {
        // 测试文件的特定规则
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
      },
    },
    {
      files: ["vite.config.ts", "*.config.ts", "*.config.js"],
      env: {
        node: true,
      },
      rules: {
        // 配置文件的特定规则
        "import/no-default-export": "off",
      },
    },
  ],

  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
    "*.min.js",
    "*.d.ts",
    "!.eslintrc.js",
  ],
};
```

#### 4.2.2 .eslintignore 文件

```gitignore
# 依赖目录
node_modules
dist
build

# IDE 文件
.vscode
.idea
*.swp
*.swo

# 构建产物
*.log
*.lock
*.tmp
*.temp

# 环境文件
.env
.env.local
.env.*.local

# 测试相关
coverage
.nyc_output

# 其他
*.min.*
public/
```

### 4.3 编辑器集成（VS Code）

#### 4.3.1 .vscode/settings.json

```json
{
  // ESLint 配置
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html"
  ],
  "eslint.options": {
    "extensions": [".js", ".jsx", ".ts", ".tsx", ".vue"]
  },

  // 保存时自动修复
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },

  // 文件关联
  "files.associations": {
    "*.vue": "vue"
  },

  // 语言特定设置
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },

  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    }
  },

  // 禁用 VS Code 的内置验证以避免冲突
  "javascript.validate.enable": false,
  "typescript.validate.enable": false,

  // 其他设置
  "editor.formatOnSave": true,
  "editor.formatOnPaste": false,
  "editor.formatOnType": false,

  // 导入路径智能提示
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative",

  // Vue 开发扩展
  "volar.autoCompleteRefs": true,
  "volar.completion.preferredTagNameCase": "pascal",
  "volar.completion.preferredAttrNameCase": "kebab",

  // 工作区信任设置
  "security.workspace.trust.untrustedFiles": "open"
}
```

#### 4.3.2 .vscode/extensions.json（推荐安装的扩展）

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint", // ESLint
    "esbenp.prettier-vscode", // Prettier
    "vue.volar", // Vue Language Features
    "vue.vscode-typescript-vue-plugin", // TypeScript Vue Plugin
    "bradlc.vscode-tailwindcss", // Tailwind CSS
    "mhutchie.git-graph", // Git Graph
    "eamodio.gitlens", // GitLens
    "ms-vscode.vscode-typescript-next", // TypeScript Nightly
    "usernamehw.errorlens", // Error Lens
    "wix.vscode-import-cost" // Import Cost
  ]
}
```

### 4.4 Git 工作流集成

#### 4.4.1 Husky 配置

```bash
# 安装 Husky
npm install --save-dev husky
npx husky install

# 添加 pre-commit 钩子
npx husky add .husky/pre-commit "npx lint-staged"

# 添加 commit-msg 钩子（可选）
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

#### 4.4.2 lint-staged 配置

```json
{
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,html,css,scss,less,yml,yaml}": ["prettier --write"],
    "*.{css,scss,less}": ["stylelint --fix"]
  }
}
```

#### 4.4.3 commitlint 配置（可选）

```javascript
// commitlint.config.js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"],
    ],
    "subject-case": [0],
  },
};
```

### 4.5 CI/CD 集成（GitHub Actions）

#### 4.5.1 .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run TypeScript type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Build project
        run: npm run build
```

## 五、最佳实践总结

### 5.1 配置策略

#### 5.1.1 渐进式配置

```javascript
// 1. 从基础配置开始
extends: ['eslint:recommended']

// 2. 添加框架支持
extends: ['eslint:recommended', 'plugin:vue/recommended']

// 3. 添加 TypeScript 支持
extends: ['eslint:recommended', 'plugin:vue/recommended', '@typescript-eslint/recommended']

// 4. 集成 Prettier（最后添加）
extends: ['eslint:recommended', 'plugin:vue/recommended', '@typescript-eslint/recommended', 'plugin:prettier/recommended']
```

#### 5.1.2 团队统一配置

```javascript
// 创建共享配置包
// @my-team/eslint-config-vue
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 团队统一规则
  }
};

// 项目中引用
extends: ['@my-team/vue']
```

### 5.2 规则配置原则

#### 5.2.1 规则分类管理

```javascript
// 按类别组织规则
rules: {
  // 1. 错误预防
  'no-console': 'error',
  'no-debugger': 'error',

  // 2. 代码质量
  'eqeqeq': ['error', 'always'],
  'curly': ['error', 'all'],

  // 3. 代码风格（与 Prettier 配合）
  'semi': ['error', 'always'],
  'quotes': ['error', 'single'],

  // 4. 框架特定
  'vue/multi-word-component-names': 'error',

  // 5. 项目特定
  'import/order': 'error',
}
```

#### 5.2.2 环境敏感规则

```javascript
rules: {
  'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

  // 开发环境允许 console.log
  'no-console': ['warn', { allow: ['warn', 'error'] }],
}
```

### 5.3 性能优化

#### 5.3.1 缓存配置

```json
{
  "scripts": {
    "lint": "eslint . --cache --cache-location .eslintcache"
  }
}
```

#### 5.3.2 忽略非必要文件

```javascript
// .eslintignore
node_modules/
dist/
*.min.js
coverage/
```

#### 5.3.3 增量检查

```bash
# 只检查修改的文件
eslint --fix $(git diff --name-only HEAD | grep -E '\.(js|ts|vue)$')

# 使用 lint-staged 只检查暂存文件
```

### 5.4 常见问题解决

#### 5.4.1 ESLint 与 Prettier 冲突

```javascript
// 解决方案
extends: [
  'eslint:recommended',
  'plugin:prettier/recommended' // 必须放在最后
]

// 或者手动配置
extends: ['eslint:recommended'],
plugins: ['prettier'],
rules: {
  'prettier/prettier': 'error'
}
```

#### 5.4.2 解析器配置

```javascript
// Vue + TypeScript 项目
parser: 'vue-eslint-parser',
parserOptions: {
  parser: '@typescript-eslint/parser',
  sourceType: 'module'
}
```

#### 5.4.3 导入解析

```javascript
settings: {
  'import/resolver': {
    node: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
    },
    typescript: {
      alwaysTryTypes: true
    }
  }
}
```

### 5.5 监控和维护

#### 5.5.1 定期更新规则

```bash
# 检查可更新规则
npm outdated

# 更新依赖
npm update eslint @typescript-eslint/eslint-plugin eslint-plugin-vue

# 检查新版本引入的规则变更
npx eslint-config-prettier-check
```

#### 5.5.2 代码质量报告

```bash
# 生成详细报告
npx eslint . --format json --output-file eslint-report.json

# 使用 HTML 报告
npx eslint . --format html --output-file eslint-report.html
```

#### 5.5.3 自定义规则开发

```javascript
// 创建自定义规则
// rules/my-custom-rule.js
module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "禁止使用特定的函数",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name === "deprecatedFunction") {
          context.report({
            node,
            message: "禁止使用 deprecatedFunction，请使用 newFunction 代替",
          });
        }
      },
    };
  },
};
```

通过以上完整配置和实践，ESLint 可以帮助 Vue 项目团队保持代码质量一致性和可维护性.

结合 [Prettier](/others/devtools/prettier.md) 实现代码风格的自动化管理，提升开发效率和团队协作效果。
