# JavaScript 内置对象与数据结构

## 概述

JavaScript 提供了丰富的内置对象和数据结构，用于处理不同类型的数据和复杂操作。这些对象和数据结构是 JavaScript 语言的核心组成部分。

## String 字符串操作

### 字符串创建

```javascript
// 字面量创建
const str1 = "Hello World";
const str2 = "Hello World";
const str3 = `Hello World`;

// 构造函数创建
const str4 = new String("Hello World");
```

### 常用字符串方法

#### 基本操作

```javascript
const str = "JavaScript is awesome";

// 获取长度
str.length; // 21

// 访问字符
str.charAt(0); // 'J'
str[0]; // 'J' (ES6)

// 字符编码
str.charCodeAt(0); // 74

// 子字符串
str.substring(0, 10); // 'JavaScript'
str.substr(0, 10); // 'JavaScript'
str.slice(0, 10); // 'JavaScript'
str.slice(-7); // 'awesome'

// 大小写转换
str.toUpperCase(); // 'JAVASCRIPT IS AWESOME'
str.toLowerCase(); // 'javascript is awesome'
```

#### 搜索与匹配

```javascript
const str = "JavaScript is awesome and JavaScript is powerful";

// 查找位置
str.indexOf("Script"); // 4
str.lastIndexOf("is"); // 30
str.search(/script/i); // 4

// 包含检查
str.includes("awesome"); // true
str.startsWith("Java"); // true
str.endsWith("powerful"); // true

// 匹配正则
str.match(/is/g); // ['is', 'is']
str.matchAll(/is/g); // 迭代器
```

#### 修改与替换

```javascript
let str = "Hello World";

// 替换
str.replace("World", "JavaScript"); // 'Hello JavaScript'
str.replace(/o/g, "0"); // 'Hell0 W0rld'

// 重复
str.repeat(2); // 'Hello WorldHello World'

// 填充
str.padStart(15, "*"); // '****Hello World'
str.padEnd(15, "*"); // 'Hello World****'

// 修剪
const spaced = "  Hello World  ";
spaced.trim(); // 'Hello World'
spaced.trimStart(); // 'Hello World  '
spaced.trimEnd(); // '  Hello World'
```

#### 分割与连接

```javascript
const str = "apple,banana,orange";

// 分割为数组
str.split(","); // ['apple', 'banana', 'orange']
str.split(",", 2); // ['apple', 'banana']

// 从数组连接
const arr = ["Hello", "World"];
arr.join(" "); // 'Hello World'
```

#### 模板字符串 (ES6+)

```javascript
const name = "John";
const age = 30;

// 基本模板
const greeting = `Hello, ${name}! You are ${age} years old.`;

// 多行字符串
const multiLine = `
  This is
  a multi-line
  string
`;

// 标签模板
function highlight(strings, ...values) {
  return strings.reduce(
    (result, str, i) => `${result}${str}<strong>${values[i] || ""}</strong>`,
    ""
  );
}
highlight`Hello ${name}, welcome to ${"JavaScript"}!`;
```

## Array 数组方法

### 数组创建

```javascript
// 字面量创建
const arr1 = [1, 2, 3];
const arr2 = [];
const arr3 = new Array(1, 2, 3);
const arr4 = Array.of(1, 2, 3);

// 创建指定长度的数组
const arr5 = new Array(5); // 长度为5的空数组
const arr6 = Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
```

### 数组修改方法

#### 添加/删除元素

```javascript
const arr = [1, 2, 3];

// 末尾添加
arr.push(4, 5); // arr = [1, 2, 3, 4, 5], 返回新长度 5

// 末尾删除
arr.pop(); // 返回 5, arr = [1, 2, 3, 4]

// 开头添加
arr.unshift(0); // arr = [0, 1, 2, 3, 4], 返回新长度 5

// 开头删除
arr.shift(); // 返回 0, arr = [1, 2, 3, 4]

// 任意位置添加/删除
arr.splice(2, 0, "a", "b"); // arr = [1, 2, 'a', 'b', 3, 4]
arr.splice(2, 2); // 返回 ['a', 'b'], arr = [1, 2, 3, 4]
```

### 数组遍历方法

#### 基本遍历

```javascript
const arr = [1, 2, 3, 4, 5];

// forEach - 遍历数组
arr.forEach((item, index, array) => {
  console.log(item, index);
});

// map - 映射新数组
const doubled = arr.map((x) => x * 2); // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evens = arr.filter((x) => x % 2 === 0); // [2, 4]

// reduce - 累积计算
const sum = arr.reduce((acc, cur) => acc + cur, 0); // 15
const max = arr.reduce((a, b) => Math.max(a, b)); // 5

// reduceRight - 从右向左累积
const rightSum = arr.reduceRight((acc, cur) => acc + cur, 0); // 15
```

#### 查找与测试

```javascript
const arr = [5, 12, 8, 130, 44];

// find - 查找第一个符合条件的元素
const found = arr.find((x) => x > 10); // 12

// findIndex - 查找第一个符合条件的索引
const index = arr.findIndex((x) => x > 10); // 1

// findLast / findLastIndex (ES2023)
const lastFound = arr.findLast((x) => x > 10); // 130
const lastIndex = arr.findLastIndex((x) => x > 10); // 3

// some - 是否有元素符合条件
const hasEven = arr.some((x) => x % 2 === 0); // true

// every - 是否所有元素都符合条件
const allPositive = arr.every((x) => x > 0); // true

// includes - 是否包含某元素
const has8 = arr.includes(8); // true
const has8atIndex2 = arr.includes(8, 2); // true (从索引2开始搜索)
```

### 数组转换与排序

#### 排序与反转

```javascript
const arr = [3, 1, 4, 1, 5, 9];

// 排序
arr.sort(); // [1, 1, 3, 4, 5, 9]
arr.sort((a, b) => a - b); // 数字升序
arr.sort((a, b) => b - a); // 数字降序

// 自定义排序
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 20 },
];
users.sort((a, b) => a.age - b.age);

// 反转
arr.reverse(); // [9, 5, 4, 3, 1, 1]
```

#### 扁平化与连接

```javascript
// 连接数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2, 5); // [1, 2, 3, 4, 5]

// 扁平化数组
const nested = [1, [2, [3, [4]]]];
nested.flat(); // [1, 2, [3, [4]]]
nested.flat(2); // [1, 2, 3, [4]]
nested.flat(Infinity); // [1, 2, 3, 4]

// 扁平化并映射 (ES2019)
const arr = [1, 2, 3];
arr.flatMap((x) => [x, x * 2]); // [1, 2, 2, 4, 3, 6]
```

### 数组复制与填充

```javascript
const arr = [1, 2, 3, 4, 5];

// 创建副本
const copy1 = arr.slice(); // 浅拷贝
const copy2 = [...arr]; // ES6扩展运算符
const copy3 = Array.from(arr); // ES6 Array.from

// 填充数组
const filled = new Array(5).fill(0); // [0, 0, 0, 0, 0]
arr.fill(9, 1, 3); // [1, 9, 9, 4, 5]

// 复制到指定位置
const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(0, 3); // [4, 5, 3, 4, 5]
```

### 数组迭代器

```javascript
const arr = ["a", "b", "c"];

// 获取迭代器
const iterator = arr.values(); // 值迭代器
const keys = arr.keys(); // 键迭代器
const entries = arr.entries(); // 键值对迭代器

// 使用for...of遍历
for (const value of arr) {
  console.log(value);
}

for (const [index, value] of arr.entries()) {
  console.log(index, value);
}
```

## Object 对象操作

### 对象创建

```javascript
// 字面量创建
const obj1 = {
  name: "John",
  age: 30,
  greet() {
    return `Hello, ${this.name}`;
  },
};

// 构造函数创建
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const obj2 = new Person("Jane", 25);

// Object.create
const proto = { greeting: "Hello" };
const obj3 = Object.create(proto);
obj3.name = "Bob";

// ES6类
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}
```

### 对象属性操作

#### 访问与设置属性

```javascript
const obj = { name: "John", age: 30 };

// 点表示法
obj.name; // 'John'
obj.name = "Jane";

// 方括号表示法
obj["age"]; // 30
const prop = "age";
obj[prop] = 31;

// 计算属性名 (ES6)
const prefix = "user";
const dynamicObj = {
  [`${prefix}Name`]: "John",
  [`${prefix}Age`]: 30,
};
```

#### 属性描述符

```javascript
const obj = { name: "John" };

// 获取属性描述符
const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
/*
{
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true
}
*/

// 定义属性描述符
Object.defineProperty(obj, "age", {
  value: 30,
  writable: false, // 不可写
  enumerable: true, // 可枚举
  configurable: false, // 不可配置
});

// 定义多个属性
Object.defineProperties(obj, {
  email: {
    value: "john@example.com",
    writable: true,
  },
  phone: {
    value: "123-456-7890",
    enumerable: false,
  },
});
```

### 对象遍历与复制

#### 遍历对象

```javascript
const obj = { a: 1, b: 2, c: 3 };

// for...in (包括原型链)
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}

// Object.keys
Object.keys(obj); // ['a', 'b', 'c']

// Object.values
Object.values(obj); // [1, 2, 3]

// Object.entries
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

// 遍历键值对
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

#### 对象复制与合并

```javascript
const source = { a: 1, b: 2 };
const target = { b: 3, c: 4 };

// 浅拷贝
const shallowCopy1 = { ...source };
const shallowCopy2 = Object.assign({}, source);

// 深拷贝
const deepCopy = JSON.parse(JSON.stringify(source));
// 或者使用第三方库如 lodash.cloneDeep

// 合并对象
const merged1 = { ...source, ...target }; // { a: 1, b: 3, c: 4 }
const merged2 = Object.assign({}, source, target); // { a: 1, b: 3, c: 4 }

// 嵌套合并
const obj1 = { a: { b: 1 } };
const obj2 = { a: { c: 2 } };
const merged = { ...obj1, ...obj2 }; // { a: { c: 2 } } - 注意：a被完全替换
```

### 对象方法

#### 原型与继承方法

```javascript
const obj = { a: 1, b: 2 };

// 原型链操作
Object.getPrototypeOf(obj); // 获取原型
Object.setPrototypeOf(obj, proto); // 设置原型

// 继承检查
obj instanceof Object; // true
Object.prototype.isPrototypeOf(obj); // true

// 属性检查
obj.hasOwnProperty("a"); // true
"a" in obj; // true (包括原型链)

// 属性枚举
Object.getOwnPropertyNames(obj); // ['a', 'b'] (包括不可枚举)
Object.keys(obj); // ['a', 'b'] (仅可枚举)
```

#### 对象操作实用方法

```javascript
const obj = { a: 1, b: 2, c: 3 };

// 冻结对象
Object.freeze(obj); // 对象不可修改
Object.isFrozen(obj); // true

// 密封对象
Object.seal(obj); // 可修改属性值，但不能添加/删除属性
Object.isSealed(obj); // true

// 防止扩展
Object.preventExtensions(obj); // 不能添加新属性
Object.isExtensible(obj); // false

// 创建副本并设置原型
const newObj = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
);
```

### ES6+ 对象增强

#### 属性简写

```javascript
const name = "John";
const age = 30;

// 属性值简写
const obj = { name, age }; // { name: 'John', age: 30 }

// 方法简写
const obj2 = {
  name,
  greet() {
    return `Hello, ${this.name}`;
  },
};
```

#### 解构赋值

```javascript
const obj = { a: 1, b: 2, c: 3, d: 4 };

// 基本解构
const { a, b } = obj; // a = 1, b = 2

// 重命名
const { a: first, b: second } = obj; // first = 1, second = 2

// 默认值
const { a, b, e = 5 } = obj; // e = 5

// 剩余参数
const { a, ...rest } = obj; // rest = { b: 2, c: 3, d: 4 }

// 嵌套解构
const nested = { a: { b: { c: 1 } } };
const {
  a: {
    b: { c },
  },
} = nested; // c = 1
```

## Date 日期时间对象

### 创建日期对象

```javascript
// 当前时间
const now = new Date();

// 指定日期时间
const date1 = new Date("2023-12-25");
const date2 = new Date("2023-12-25T10:30:00");
const date3 = new Date(2023, 11, 25); // 月份从0开始
const date4 = new Date(2023, 11, 25, 10, 30, 0);
const date5 = new Date(1703464200000); // 时间戳
```

### 日期获取方法

```javascript
const date = new Date("2023-12-25T10:30:45");

// 获取时间戳
date.getTime(); // 毫秒时间戳
date.valueOf(); // 毫秒时间戳
Date.now(); // 当前时间戳

// 获取日期部分
date.getFullYear(); // 2023
date.getMonth(); // 11 (0-11)
date.getDate(); // 25
date.getDay(); // 1 (星期几，0-6)

// 获取时间部分
date.getHours(); // 10
date.getMinutes(); // 30
date.getSeconds(); // 45
date.getMilliseconds(); // 0

// UTC时间
date.getUTCFullYear(); // 2023
date.getUTCHours(); // 2 (UTC时间)
```

### 日期设置方法

```javascript
const date = new Date();

// 设置日期时间
date.setFullYear(2024);
date.setMonth(0); // 一月
date.setDate(15);
date.setHours(14);
date.setMinutes(30);
date.setSeconds(0);
date.setMilliseconds(0);

// 设置时间戳
date.setTime(1703464200000);
```

### 日期格式化与解析

```javascript
const date = new Date("2023-12-25T10:30:45");

// 转换为字符串
date.toString(); // "Mon Dec 25 2023 10:30:45 GMT+0800"
date.toDateString(); // "Mon Dec 25 2023"
date.toTimeString(); // "10:30:45 GMT+0800"
date.toISOString(); // "2023-12-25T02:30:45.000Z"
date.toUTCString(); // "Mon, 25 Dec 2023 02:30:45 GMT"
date.toLocaleString(); // 本地格式的字符串

// 本地化格式化
date.toLocaleDateString("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}); // "2023年12月25日星期一"

date.toLocaleTimeString("zh-CN", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}); // "10:30:45"
```

### 日期计算与比较

```javascript
const date1 = new Date("2023-12-25");
const date2 = new Date("2023-12-31");

// 日期差（毫秒）
const diffMs = date2 - date1; // 518400000 (6天)

// 日期差（天）
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

// 日期比较
date1 < date2; // true
date1.getTime() === date2.getTime(); // false

// 日期加减
const date = new Date("2023-12-25");
date.setDate(date.getDate() + 7); // 加7天
date.setMonth(date.getMonth() + 1); // 加1个月
date.setFullYear(date.getFullYear() + 1); // 加1年
```

## Math 数学对象

### 数学常数

```javascript
Math.PI; // 圆周率 π ≈ 3.14159
Math.E; // 自然对数的底数 e ≈ 2.71828
Math.LN2; // 2的自然对数 ≈ 0.693
Math.LN10; // 10的自然对数 ≈ 2.303
Math.LOG2E; // 以2为底e的对数 ≈ 1.443
Math.LOG10E; // 以10为底e的对数 ≈ 0.434
Math.SQRT2; // 2的平方根 ≈ 1.414
Math.SQRT1_2; // 1/2的平方根 ≈ 0.707
```

### 基本数学运算

```javascript
// 绝对值
Math.abs(-5); // 5

// 向上取整
Math.ceil(4.2); // 5
Math.ceil(-4.2); // -4

// 向下取整
Math.floor(4.8); // 4
Math.floor(-4.8); // -5

// 四舍五入
Math.round(4.4); // 4
Math.round(4.5); // 5

// 取整
Math.trunc(4.9); // 4
Math.trunc(-4.9); // -4

// 最大值最小值
Math.max(1, 2, 3, 4, 5); // 5
Math.min(1, 2, 3, 4, 5); // 1

// 数组中的最大值最小值
const arr = [1, 2, 3, 4, 5];
Math.max(...arr); // 5
Math.min(...arr); // 1
```

### 指数与对数运算

```javascript
// 幂运算
Math.pow(2, 3); // 8
2 ** 3; // 8 (ES7)

// 平方根
Math.sqrt(16); // 4

// 立方根
Math.cbrt(27); // 3

// 指数函数
Math.exp(1); // e^1 ≈ 2.718

// 自然对数
Math.log(Math.E); // 1

// 以10为底的对数
Math.log10(100); // 2

// 以2为底的对数
Math.log2(8); // 3
```

### 三角函数

```javascript
// 角度转弧度
const degrees = 45;
const radians = degrees * (Math.PI / 180);

// 三角函数（参数为弧度）
Math.sin(Math.PI / 2); // 1
Math.cos(Math.PI); // -1
Math.tan(Math.PI / 4); // 1

// 反三角函数
Math.asin(1); // π/2
Math.acos(0); // π/2
Math.atan(1); // π/4
Math.atan2(1, 1); // π/4
```

### 随机数与舍入

```javascript
// 随机数 [0, 1)
Math.random(); // 0.123456789

// 指定范围随机整数
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 四舍五入到指定精度
const num = 3.14159;
num.toFixed(2); // "3.14" (返回字符串)
Math.round(num * 100) / 100; // 3.14 (返回数字)

// 安全整数
Number.MAX_SAFE_INTEGER; // 9007199254740991
Number.MIN_SAFE_INTEGER; // -9007199254740991
Math.isSafeInteger(42); // true
```

## 正则表达式

### 正则表达式创建

```javascript
// 字面量创建
const regex1 = /pattern/flags;
const regex2 = /ab+c/i;

// 构造函数创建
const regex3 = new RegExp('pattern', 'flags');
const regex4 = new RegExp('ab+c', 'i');

// 动态创建
const pattern = 'hello';
const flags = 'gi';
const regex5 = new RegExp(pattern, flags);
```

### 正则表达式标志

```javascript
// g - 全局匹配
const regex1 = /a/g;

// i - 不区分大小写
const regex2 = /hello/i;

// m - 多行匹配
const regex3 = /^start/m;

// s - 点号匹配所有字符（包括换行符）
const regex4 = /a.b/s;

// u - Unicode模式
const regex5 = /\u{61}/u;

// y - 粘性匹配
const regex6 = /a/y;
```

### 正则表达式方法

#### 字符串方法中使用正则

```javascript
const str = "Hello world, hello universe";

// test - 测试是否匹配
/hello/i.test(str); // true

// exec - 执行匹配
const regex = /hello/gi;
let match;
while ((match = regex.exec(str)) !== null) {
  console.log(match[0], match.index);
}

// match - 匹配结果
str.match(/hello/gi); // ['Hello', 'hello']
str.matchAll(/hello/gi); // 返回迭代器

// search - 搜索位置
str.search(/world/); // 6

// replace - 替换
str.replace(/hello/gi, "hi"); // 'hi world, hi universe'

// split - 分割
"1,2,3".split(/,/); // ['1', '2', '3']
```

#### 正则表达式对象方法

```javascript
const regex = /ab+c/;

// test
regex.test("abc"); // true
regex.test("ac"); // false

// exec
regex.exec("abcabc"); // ['abc', index: 0, input: 'abcabc']
regex.exec("ac"); // null

// toString
regex.toString(); // '/ab+c/'

// source
regex.source; // 'ab+c'

// flags
regex.flags; // ''
/ab+c/gi.flags; // 'gi'
```

### 正则表达式模式

#### 字符类

```javascript
// 简单字符类
/[abc]/; // 匹配 a、b 或 c
/[^abc]/; // 匹配除 a、b、c 外的字符
/[a-z]/; // 匹配小写字母
/[A-Z]/; // 匹配大写字母
/[0-9]/; // 匹配数字
/[a-zA-Z0-9]/; // 匹配字母数字

// 预定义字符类
/./; // 匹配除换行符外的任意字符
/\d/; // 匹配数字 [0-9]
/\D/; // 匹配非数字 [^0-9]
/\w/; // 匹配单词字符 [a-zA-Z0-9_]
/\W/; // 匹配非单词字符 [^a-zA-Z0-9_]
/\s/; // 匹配空白字符
/\S/; // 匹配非空白字符
```

#### 量词

```javascript
// 基本量词
/a*/; // 0次或多次
/a+/; // 1次或多次
/a?/; // 0次或1次
/a{3}/; // 恰好3次
/a{3,}/; // 3次或更多
/a{3,5}/; // 3到5次

// 贪婪与非贪婪
/a*?/; // 非贪婪匹配
/a+?/;
/a??/;
/a{3,5}?/;
```

#### 分组与引用

```javascript
// 捕获组
/(\d{4})-(\d{2})-(\d{2})/;

// 非捕获组
/(?:\d{4})-\d{2}-\d{2}/;

// 命名捕获组 (ES2018)
/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

// 引用捕获组
/(\w+) \1/; // 匹配重复单词

// 先行断言
/\d+(?=%)/; // 匹配后面是%的数字
/\d+(?!%)/; // 匹配后面不是%的数字

// 后行断言 (ES2018)
/(?<=\$)\d+/; // 匹配前面是$的数字
/(?<!\$)\d+/; // 匹配前面不是$的数字
```

#### 位置匹配

```javascript
// 边界匹配
/^start/; // 匹配开头
/end$/; // 匹配结尾
/\bword\b/; // 匹配单词边界
/\Bword\B/; // 匹配非单词边界
```

### 常用正则表达式

```javascript
// 邮箱验证
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 手机号验证（中国大陆）
/^1[3-9]\d{9}$/;

// 身份证验证（18位）
/^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dX]$/;

// URL验证
/^https?:\/\/[^\s/$.?#].[^\s]*$/;

// 密码强度（至少8位，包含大小写字母和数字）
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// 提取HTML标签内容
/<([^>]+)>([^<]+)<\/\1>/;

// 日期格式验证（YYYY-MM-DD）
/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
```

## Set、Map、WeakSet、WeakMap

### Set 集合

#### Set 基本操作

```javascript
// 创建Set
const set = new Set();

// 添加元素
set.add(1);
set.add(2);
set.add(3);
set.add(3); // 重复元素不会被添加
set.add("hello");
set.add({ a: 1, b: 2 });

// 检查元素
set.has(1); // true
set.has(4); // false

// 删除元素
set.delete(2); // true
set.delete(4); // false

// 清空Set
set.clear();

// 获取大小
set.size; // 元素数量
```

#### Set 遍历操作

```javascript
const set = new Set([1, 2, 3, 4, 5]);

// 遍历Set
set.forEach((value) => {
  console.log(value);
});

// for...of 遍历
for (const value of set) {
  console.log(value);
}

// 获取迭代器
set.values(); // 值迭代器
set.keys(); // 键迭代器（与values相同）
set.entries(); // [value, value] 迭代器
```

#### Set 实用操作

```javascript
// 数组去重
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)]; // [1, 2, 3, 4, 5]

// 集合运算
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// 并集
const union = new Set([...setA, ...setB]); // Set {1, 2, 3, 4, 5, 6}

// 交集
const intersection = new Set([...setA].filter((x) => setB.has(x))); // Set {3, 4}

// 差集
const difference = new Set([...setA].filter((x) => !setB.has(x))); // Set {1, 2}
```

### Map 映射

#### Map 基本操作

```javascript
// 创建Map
const map = new Map();

// 添加键值对
map.set("name", "John");
map.set("age", 30);
map.set({ key: "obj" }, "object value"); // 对象作为键

// 获取值
map.get("name"); // 'John'
map.get("age"); // 30

// 检查键
map.has("name"); // true

// 删除键值对
map.delete("age"); // true

// 清空Map
map.clear();

// 获取大小
map.size; // 键值对数量
```

#### Map 遍历操作

```javascript
const map = new Map([
  ["name", "John"],
  ["age", 30],
  ["city", "New York"],
]);

// 遍历Map
map.forEach((value, key) => {
  console.log(key, value);
});

// for...of 遍历
for (const [key, value] of map) {
  console.log(key, value);
}

// 获取迭代器
map.keys(); // 键迭代器
map.values(); // 值迭代器
map.entries(); // 键值对迭代器
```

#### Map 与 Object 比较

```javascript
// Map优势
const map = new Map();

// 1. 键可以是任意类型
map.set({}, "value");
map.set([], "value");
map.set(function () {}, "value");

// 2. 保持插入顺序
map.set("z", 1);
map.set("a", 2);
map.set("b", 3);
// 遍历顺序: z, a, b

// 3. 性能更优（频繁增删）
// 4. 大小属性
map.size; // 直接获取

// 5. 迭代更方便
for (const [key, value] of map) {
  // 直接迭代
}
```

### WeakSet 弱引用集合

#### WeakSet 特性与使用

```javascript
// 创建WeakSet
const weakSet = new WeakSet();

// 只能添加对象
const obj1 = { a: 1 };
const obj2 = { b: 2 };

weakSet.add(obj1);
weakSet.add(obj2);

// 检查对象
weakSet.has(obj1); // true

// 删除对象
weakSet.delete(obj1);

// WeakSet没有size属性，不能遍历
// weakSet.size // undefined
// weakSet.forEach() // 不存在

// 主要用途：存储对象引用而不阻止垃圾回收
```

#### WeakSet 使用场景

```javascript
// 场景1：跟踪对象是否已被处理
const processedObjects = new WeakSet();

function processObject(obj) {
  if (processedObjects.has(obj)) {
    console.log("Object already processed");
    return;
  }

  // 处理对象
  processedObjects.add(obj);
}

// 场景2：私有成员
const privateData = new WeakSet();

class MyClass {
  constructor() {
    privateData.add(this);
  }

  isPrivate() {
    return privateData.has(this);
  }
}
```

### WeakMap 弱引用映射

#### WeakMap 特性与使用

```javascript
// 创建WeakMap
const weakMap = new WeakMap();

// 键必须是对象
const key1 = { id: 1 };
const key2 = { id: 2 };

weakMap.set(key1, "value1");
weakMap.set(key2, "value2");

// 获取值
weakMap.get(key1); // 'value1'

// 检查键
weakMap.has(key1); // true

// 删除键值对
weakMap.delete(key1);

// WeakMap没有size属性，不能遍历
// weakMap.size // undefined
// weakMap.forEach() // 不存在
```

#### WeakMap 使用场景

```javascript
// 场景1：私有属性存储
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    privateData.set(this, { name, age });
  }

  getName() {
    return privateData.get(this).name;
  }

  getAge() {
    return privateData.get(this).age;
  }
}

// 场景2：DOM元素关联数据
const elementData = new WeakMap();

function setElementData(element, data) {
  elementData.set(element, data);
}

function getElementData(element) {
  return elementData.get(element);
}

// 场景3：缓存计算结果
const cache = new WeakMap();

function computeExpensiveValue(obj) {
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const result = /* 复杂计算 */;
  cache.set(obj, result);
  return result;
}
```

## 总结对比

### 集合类型比较

| 特性      | Array        | Set        | Map          | WeakSet        | WeakMap      |
| --------- | ------------ | ---------- | ------------ | -------------- | ------------ |
| 存储内容  | 有序元素集合 | 唯一值集合 | 键值对集合   | 弱引用对象集合 | 弱引用键值对 |
| 键类型    | 数字索引     | 值本身     | 任意类型     | 对象           | 对象         |
| 值类型    | 任意         | -          | 任意         | -              | 任意         |
| 重复值    | 允许         | 不允许     | 键不允许重复 | 对象引用不重复 | 键不允许重复 |
| 顺序      | 有序         | 插入顺序   | 插入顺序     | 无序           | 无序         |
| 可迭代    | 是           | 是         | 是           | 否             | 否           |
| size 属性 | length       | 有         | 有           | 无             | 无           |
| 垃圾回收  | 强引用       | 强引用     | 强引用       | 弱引用         | 弱引用       |

### 使用建议

1. **数组(Array)**：用于有序列表，需要索引访问
2. **集合(Set)**：用于存储唯一值，快速存在性检查
3. **映射(Map)**：用于键值对存储，键可以是任意类型
4. **弱引用集合(WeakSet/WeakMap)**：用于需要自动垃圾回收的场景，避免内存泄漏

这些内置对象和数据结构为 JavaScript 提供了强大的数据处理能力，掌握它们的使用对于编写高效、可维护的代码至关重要。
