# JavaScript 基础语法

## 1. JavaScript 核心语法

JavaScript 是一种动态类型、基于原型的编程语言，支持面向对象、命令式和函数式编程风格。它遵循 ECMAScript 标准，最新版本为 ES2023。

### 1.1 基本语法规则

```javascript
// 语句以分号结尾（可选，但建议使用）
let x = 5;

// 代码块使用花括号
if (true) {
  console.log("Hello");
}

// 注释：单行注释和多行注释
// 这是单行注释

/*
  这是多行注释
  可以跨越多行
*/
```

## 2. 变量与数据类型

### 2.1 变量声明方式

#### let, const, var 的区别

| 特性       | var                      | let            | const          |
| ---------- | ------------------------ | -------------- | -------------- |
| 作用域     | 函数作用域或全局作用域   | 块级作用域     | 块级作用域     |
| 重复声明   | 允许                     | 不允许         | 不允许         |
| 变量提升   | 是（初始化为 undefined） | 是（未初始化） | 是（未初始化） |
| 暂时性死区 | 无                       | 有             | 有             |
| 初始值要求 | 可选                     | 可选           | 必须           |
| 可重新赋值 | 是                       | 是             | 否             |

**示例代码：**

```javascript
// var - 函数作用域
function varExample() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - 在if块外部可访问
}

// let - 块级作用域
function letExample() {
  if (true) {
    let y = 20;
    console.log(y); // 20
  }
  // console.log(y); // ReferenceError: y is not defined
}

// const - 块级作用域，不可重新赋值
const PI = 3.14159;
// PI = 3.14; // TypeError: Assignment to constant variable

// const 对于对象和数组
const person = { name: "Alice" };
person.name = "Bob"; // 允许 - 修改属性
// person = { name: "Charlie" }; // 不允许 - 重新赋值

const numbers = [1, 2, 3];
numbers.push(4); // 允许 - 修改数组内容
// numbers = [5, 6, 7]; // 不允许 - 重新赋值
```

### 2.2 数据类型

JavaScript 有 8 种基本数据类型：

#### 原始类型（Primitive Types）

1. **Number** - 整数和浮点数

   ```javascript
   let integer = 42;
   let float = 3.14;
   let infinity = 1 / 0; // Infinity
   let nan = "hello" * 2; // NaN (Not a Number)
   let bigInt = 1234567890123456789012345678901234567890n; // BigInt
   ```

2. **String** - 字符串

   ```javascript
   let single = "单引号";
   let double = "双引号";
   let backticks = `模板字面量 ${single}`;
   let multiline = `
     多行
     字符串
   `;
   ```

3. **Boolean** - 布尔值

   ```javascript
   let isTrue = true;
   let isFalse = false;
   ```

4. **Undefined** - 未定义

   ```javascript
   let notAssigned; // undefined
   ```

5. **Null** - 空值

   ```javascript
   let empty = null;
   ```

6. **Symbol** - 唯一标识符（ES6）

   ```javascript
   let sym1 = Symbol("description");
   let sym2 = Symbol("description");
   console.log(sym1 === sym2); // false - 每个Symbol都是唯一的
   ```

7. **BigInt** - 大整数（ES2020）

   ```javascript
   let bigNumber = 9007199254740991n;
   ```

#### 引用类型（Reference Types）

1. **Object** - 对象

   ```javascript
   let obj = {
     name: "John",
     age: 30,
     isStudent: false,
   };
   ```

2. **Array** - 数组

   ```javascript
   let arr = [1, 2, 3, "four", true];
   ```

3. **Function** - 函数

   ```javascript
   function greet(name) {
     return `Hello, ${name}!`;
   }
   ```

4. **Date, RegExp, Error** 等内置对象

#### 原始类型 vs 引用类型的关键区别

| 方面   | 原始类型             | 引用类型               |
| ------ | -------------------- | ---------------------- |
| 存储   | 栈内存（直接存储值） | 堆内存（存储引用地址） |
| 比较   | 值比较               | 引用比较               |
| 复制   | 复制值               | 复制引用               |
| 可变性 | 不可变               | 可变                   |

**示例代码：**

```javascript
// 原始类型 - 值复制
let a = 10;
let b = a; // 复制值
b = 20;
console.log(a); // 10 (不变)
console.log(b); // 20

// 引用类型 - 引用复制
let arr1 = [1, 2, 3];
let arr2 = arr1; // 复制引用
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4] (两者都改变了)
console.log(arr2); // [1, 2, 3, 4]

// 比较示例
let num1 = 5;
let num2 = 5;
console.log(num1 === num2); // true (值相等)

let obj1 = { value: 5 };
let obj2 = { value: 5 };
console.log(obj1 === obj2); // false (引用不同)
```

### 2.3 类型检测与转换

#### 类型检测方法

```javascript
// typeof 运算符
console.log(typeof 42); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (历史遗留问题)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function () {}); // "function"
console.log(typeof Symbol()); // "symbol"
console.log(typeof 10n); // "bigint"

// instanceof 运算符 - 检测对象实例
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true

// Array.isArray() - 检测数组
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

// Object.prototype.toString.call()
console.log(Object.prototype.toString.call([])); // "[object Array]"
console.log(Object.prototype.toString.call(null)); // "[object Null]"
console.log(Object.prototype.toString.call(undefined)); // "[object Undefined]"
```

#### 类型转换

```javascript
// 显式类型转换
// 转为数字
console.log(Number("123")); // 123
console.log(Number("123abc")); // NaN
console.log(parseInt("123px")); // 123
console.log(parseFloat("3.14")); // 3.14
console.log(+"42"); // 42 (一元加运算符)

// 转为字符串
console.log(String(123)); // "123"
console.log((123).toString()); // "123"
console.log(123 + ""); // "123" (隐式转换)

// 转为布尔值
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true
console.log(Boolean("")); // false
console.log(Boolean("hello")); // true
console.log(!!"hello"); // true (双非运算符)

// 隐式类型转换
console.log("5" + 3); // "53" (字符串拼接)
console.log("5" - 3); // 2 (数学运算)
console.log("5" * "2"); // 10
console.log("10" / "2"); // 5
console.log(!"hello"); // false
console.log(!!0); // false

// 严格相等 vs 抽象相等
console.log(5 == "5"); // true (类型转换后比较)
console.log(5 === "5"); // false (类型和值都必须相等)
console.log(null == undefined); // true
console.log(null === undefined); // false
```

## 3. 运算符与表达式

### 3.1 算术运算符

```javascript
let a = 10,
  b = 3;

console.log(a + b); // 13 (加法)
console.log(a - b); // 7  (减法)
console.log(a * b); // 30 (乘法)
console.log(a / b); // 3.333... (除法)
console.log(a % b); // 1  (取余)
console.log(a ** b); // 1000 (幂运算，ES7)
console.log(++a); // 11 (前置递增)
console.log(b--); // 3  (后置递减，然后b变为2)
```

### 3.2 赋值运算符

```javascript
let x = 10;
x += 5; // x = x + 5 → 15
x -= 3; // x = x - 3 → 12
x *= 2; // x = x * 2 → 24
x /= 4; // x = x / 4 → 6
x %= 4; // x = x % 4 → 2
x **= 3; // x = x ** 3 → 8
```

### 3.3 比较运算符

```javascript
console.log(5 > 3); // true
console.log(5 < 3); // false
console.log(5 >= 5); // true
console.log(5 <= 4); // false
console.log(5 == "5"); // true (值相等)
console.log(5 === "5"); // false (值和类型都相等)
console.log(5 != "5"); // false
console.log(5 !== "5"); // true
```

### 3.4 逻辑运算符

```javascript
console.log(true && false); // false (逻辑与)
console.log(true || false); // true  (逻辑或)
console.log(!true); // false (逻辑非)

// 短路求值
let value = null;
let result = value || "默认值"; // "默认值"

let obj = { name: "John" };
let name = obj && obj.name; // "John"

// 空值合并运算符 ?? (ES2020)
let count = 0;
console.log(count || 10); // 10 (0被视为falsy)
console.log(count ?? 10); // 0 (只有null/undefined时使用默认值)

// 可选链运算符 ?. (ES2020)
let user = { profile: { name: "Alice" } };
console.log(user?.profile?.name); // "Alice"
console.log(user?.address?.city); // undefined (不会报错)
```

### 3.5 位运算符

```javascript
console.log(5 & 3); // 1  (按位与: 0101 & 0011 = 0001)
console.log(5 | 3); // 7  (按位或: 0101 | 0011 = 0111)
console.log(5 ^ 3); // 6  (按位异或: 0101 ^ 0011 = 0110)
console.log(~5); // -6 (按位非)
console.log(5 << 1); // 10 (左移: 0101 << 1 = 1010)
console.log(5 >> 1); // 2  (右移: 0101 >> 1 = 0010)
console.log(-5 >>> 1); // 2147483645 (无符号右移)
```

### 3.6 三元运算符

```javascript
let age = 18;
let status = age >= 18 ? "成人" : "未成年";
console.log(status); // "成人"

// 嵌套三元运算符
let score = 85;
let grade =
  score >= 90
    ? "A"
    : score >= 80
    ? "B"
    : score >= 70
    ? "C"
    : score >= 60
    ? "D"
    : "F";
console.log(grade); // "B"
```

### 3.7 其他运算符

```javascript
// 逗号运算符
let x = (1, 2, 3); // x = 3 (返回最后一个表达式的值)

// typeof 运算符
console.log(typeof "hello"); // "string"

// instanceof 运算符
console.log([] instanceof Array); // true

// in 运算符
let obj = { a: 1, b: 2 };
console.log("a" in obj); // true
console.log("c" in obj); // false

// delete 运算符
delete obj.a;
console.log(obj); // { b: 2 }

// void 运算符
void (function () {
  console.log("立即执行");
})();

// 展开运算符 ... (ES6)
let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = [...arr1, ...arr2]; // [1, 2, 3, 4]
```

## 4. 流程控制

### 4.1 条件语句

#### if/else 语句

```javascript
// 基本形式
let temperature = 25;

if (temperature > 30) {
  console.log("天气炎热");
} else if (temperature > 20) {
  console.log("天气温暖");
} else if (temperature > 10) {
  console.log("天气凉爽");
} else {
  console.log("天气寒冷");
}

// 嵌套if语句
let age = 20;
let hasLicense = true;

if (age >= 18) {
  if (hasLicense) {
    console.log("可以驾驶");
  } else {
    console.log("需要考取驾照");
  }
} else {
  console.log("未成年不能驾驶");
}

// 条件运算符简写
let isAdult = age >= 18 ? true : false;

// 利用逻辑运算符简化
let name = "";
let displayName = name || "匿名用户";
```

#### switch 语句

```javascript
let day = 3;
let dayName;

switch (day) {
  case 1:
    dayName = "星期一";
    break; // 必须使用break，否则会继续执行下一个case
  case 2:
    dayName = "星期二";
    break;
  case 3:
    dayName = "星期三";
    break;
  case 4:
    dayName = "星期四";
    break;
  case 5:
    dayName = "星期五";
    break;
  case 6:
  case 7: // 多个case共享同一代码块
    dayName = "周末";
    break;
  default: // 所有case都不匹配时执行
    dayName = "无效日期";
    break;
}

console.log(dayName); // "星期三"

// switch使用表达式
let score = 85;
let grade;

switch (
  true // 使用true作为switch表达式
) {
  case score >= 90:
    grade = "A";
    break;
  case score >= 80:
    grade = "B";
    break;
  case score >= 70:
    grade = "C";
    break;
  default:
    grade = "D";
}

console.log(grade); // "B"
```

### 4.2 循环语句

#### for 循环

```javascript
// 基本for循环
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// 遍历数组
let fruits = ["苹果", "香蕉", "橙子"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// for...in 循环 (遍历对象属性)
let person = { name: "John", age: 30, city: "New York" };
for (let key in person) {
  console.log(key + ": " + person[key]);
}

// for...of 循环 (ES6，遍历可迭代对象)
let colors = ["红色", "绿色", "蓝色"];
for (let color of colors) {
  console.log(color);
}

// 遍历字符串
for (let char of "Hello") {
  console.log(char); // H, e, l, l, o
}

// for循环的变体
for (let i = 0; i < 10; i += 2) {
  // 步长为2
  console.log(i); // 0, 2, 4, 6, 8
}

for (let i = 10; i > 0; i--) {
  // 递减循环
  console.log(i); // 10, 9, 8, ..., 1
}
```

#### while 循环

```javascript
// 基本while循环
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}

// 使用while遍历数组
let numbers = [1, 2, 3, 4, 5];
let index = 0;
while (index < numbers.length) {
  console.log(numbers[index]);
  index++;
}

// 无限循环（需要小心使用）
// while (true) {
//   console.log("无限循环");
//   // 需要某种方式跳出循环
// }

// 使用break跳出循环
let num = 0;
while (true) {
  if (num >= 5) {
    break; // 跳出循环
  }
  console.log(num);
  num++;
}
```

#### do...while 循环

```javascript
// do...while循环至少执行一次
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

// 即使条件一开始就为false，也会执行一次
let x = 10;
do {
  console.log("这行代码会执行一次");
} while (x < 5);
```

#### 循环控制语句

```javascript
// break语句 - 完全终止循环
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // 当i等于5时终止循环
  }
  console.log(i); // 0, 1, 2, 3, 4
}

// continue语句 - 跳过当前迭代
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // 跳过偶数
  }
  console.log(i); // 1, 3, 5, 7, 9
}

// 标签语句 - 与break和continue配合使用
// 标签
outerLoop: for (let i = 0; i < 3; i++) {
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // 跳出外层循环
    }
    console.log(`i=${i}, j=${j}`);
  }
}
// 输出:
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```

## 5. 函数基础

### 5.1 函数声明与表达式

#### 函数声明

```javascript
// 函数声明（提升）
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5

// 函数声明会被提升
console.log(multiply(2, 3)); // 6 (可以在声明前调用)

function multiply(a, b) {
  return a * b;
}
```

#### 函数表达式

```javascript
// 函数表达式（匿名函数）
const subtract = function (a, b) {
  return a - b;
};

console.log(subtract(5, 3)); // 2

// 函数表达式不会被提升
// console.log(divide(10, 2)); // ReferenceError

const divide = function (a, b) {
  return a / b;
};

// 命名函数表达式
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1); // 可以在内部使用函数名
};

console.log(factorial(5)); // 120
```

#### 箭头函数 (ES6)

```javascript
// 基本语法
const add = (a, b) => {
  return a + b;
};

// 简化形式（单条返回语句）
const multiply = (a, b) => a * b;

// 单个参数可以省略括号
const square = (x) => x * x;

// 无参数需要括号
const greet = () => "Hello!";

// 返回对象需要括号
const createUser = (name, age) => ({ name, age });

// 箭头函数没有自己的this、arguments、super或new.target
const person = {
  name: "Alice",
  greet: function () {
    setTimeout(() => {
      console.log(`Hello, ${this.name}`); // 正确：箭头函数继承外部this
    }, 1000);
  },
};

person.greet(); // "Hello, Alice"
```

#### 立即调用函数表达式 (IIFE)

```javascript
// 基本IIFE
(function () {
  console.log("立即执行");
})();

// 带参数的IIFE
(function (name) {
  console.log(`Hello, ${name}`);
})("World");

// 箭头函数IIFE
(() => {
  console.log("箭头函数IIFE");
})();

// 返回值的IIFE
const result = (function (a, b) {
  return a + b;
})(10, 20);

console.log(result); // 30
```

### 5.2 参数与返回值

#### 函数参数

```javascript
// 基本参数
function greet(name, greeting = "Hello") {
  // 默认参数
  return `${greeting}, ${name}!`;
}

console.log(greet("John")); // "Hello, John!"
console.log(greet("Jane", "Hi")); // "Hi, Jane!"

// 剩余参数 (Rest parameters)
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 参数解构
function printPerson({ name, age }) {
  console.log(`${name} is ${age} years old`);
}

const person = { name: "Alice", age: 30 };
printPerson(person); // "Alice is 30 years old"

// arguments 对象（传统方式）
function showArguments() {
  console.log(arguments.length); // 参数个数
  console.log(arguments[0]); // 第一个参数
  // arguments是类数组对象，不是真正的数组
}

showArguments(1, 2, 3);
```

#### 返回值

```javascript
// 返回单个值
function add(a, b) {
  return a + b; // 返回计算结果
}

// 提前返回
function checkAge(age) {
  if (age < 0) {
    return "无效年龄"; // 提前返回
  }

  if (age < 18) {
    return "未成年";
  }

  return "成年";
}

// 返回多个值（使用数组或对象）
function getMinMax(numbers) {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return { min, max }; // 返回对象
}

const result = getMinMax([5, 2, 9, 1, 7]);
console.log(result.min, result.max); // 1 9

// 返回函数（高阶函数）
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 10
```

### 5.3 作用域与闭包基础

#### 作用域

```javascript
// 全局作用域
let globalVar = "我是全局变量";

function outerFunction() {
  // 函数作用域（局部作用域）
  let outerVar = "我是外部函数变量";

  function innerFunction() {
    // 内层函数作用域
    let innerVar = "我是内部函数变量";
    console.log(globalVar); // 可以访问
    console.log(outerVar); // 可以访问
    console.log(innerVar); // 可以访问
  }

  innerFunction();
  // console.log(innerVar); // ReferenceError: 不能访问内层作用域
}

outerFunction();
// console.log(outerVar); // ReferenceError: 不能访问函数作用域

// 块级作用域 (ES6 let/const)
if (true) {
  let blockScoped = "块级作用域变量";
  const constantBlock = "块级常量";
  var functionScoped = "函数作用域变量"; // var是函数作用域
}

// console.log(blockScoped); // ReferenceError
// console.log(constantBlock); // ReferenceError
console.log(functionScoped); // "函数作用域变量"
```

#### 闭包

```javascript
// 基本闭包
function createCounter() {
  let count = 0; // 私有变量

  return function () {
    count++; // 内部函数访问外部函数变量
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// 每个闭包有独立的状态
const counter1 = createCounter();
const counter2 = createCounter();
console.log(counter1()); // 1
console.log(counter2()); // 1 (独立计数)

// 闭包的实际应用：私有变量
function createPerson(name) {
  let age = 0; // 私有变量

  return {
    getName: function () {
      return name;
    },
    getAge: function () {
      return age;
    },
    setAge: function (newAge) {
      if (newAge >= 0) {
        age = newAge;
      }
    },
    celebrateBirthday: function () {
      age++;
    },
  };
}

const person = createPerson("Alice");
console.log(person.getName()); // "Alice"
console.log(person.getAge()); // 0
person.celebrateBirthday();
console.log(person.getAge()); // 1
person.setAge(30);
console.log(person.getAge()); // 30

// 闭包在循环中的常见问题
function createFunctions() {
  var functions = [];

  for (var i = 0; i < 3; i++) {
    // 使用立即执行函数创建闭包
    functions.push(
      (function (index) {
        return function () {
          return index;
        };
      })(i)
    );
  }

  return functions;
}

const funcs = createFunctions();
console.log(funcs[0]()); // 0
console.log(funcs[1]()); // 1
console.log(funcs[2]()); // 2

// 使用let解决循环中的闭包问题 (ES6)
function createFunctionsWithLet() {
  var functions = [];

  for (let i = 0; i < 3; i++) {
    // let有块级作用域
    functions.push(function () {
      return i;
    });
  }

  return functions;
}

const funcs2 = createFunctionsWithLet();
console.log(funcs2[0]()); // 0
console.log(funcs2[1]()); // 1
console.log(funcs2[2]()); // 2
```

## 总结

JavaScript 的核心语法涵盖了变量声明、数据类型、运算符、流程控制和函数等基础概念。理解这些基础知识对于掌握 JavaScript 编程至关重要：

1. **变量声明**：优先使用 `const` 和 `let`，避免使用 `var`
2. **数据类型**：理解原始类型和引用类型的区别，掌握类型检测和转换
3. **运算符**：熟悉各种运算符的用法和优先级
4. **流程控制**：合理使用条件语句和循环语句控制程序流程
5. **函数**：掌握函数声明、表达式、箭头函数，理解作用域和闭包

这些基础知识构成了 JavaScript 编程的基石，为进一步学习面向对象编程、异步编程、DOM 操作等高级主题打下坚实基础。
