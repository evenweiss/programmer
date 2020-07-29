# 了不起的 TypeScript 入门教程

### 大纲：

<img src="https://user-gold-cdn.xitu.io/2020/6/8/172916652ec072e3?imageslim" alt="img text" style="zoom:50%;" />

## 一、TypeScript 是什么

​	TypeScript 是一款由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

​	TypeScript 是提供最新和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators ，以帮助建立健壮的组件。下图显示了 TypeScript 与 ES5、ES2015、ES2016 之间的关系。

![relationship](https://user-gold-cdn.xitu.io/2020/6/8/1729166d732c0165?imageslim)

#### 1.1 TypeScript 与 JavaScript 的关系

| TypeSc                                              | JavaScript                                 |
| --------------------------------------------------- | ------------------------------------------ |
| JavaScript 的超集，用于解决大型项目的代码复杂性问题 | 一种脚本语言，用于创建动态网页             |
| 编译型语言，可以在编译期间发现和纠正错误            | 作为一种解释型语言，只能在运行时发现错误   |
| 强类型，支持静态和动态类型                          | 弱类型，没有静态类型选项                   |
| 最终被编译为 JavaScript 代码，使浏览器可以理解      | 可以直接在浏览器中使用                     |
| 支持模块、泛型和接口                                | 不支持模块、泛型或接口                     |
| 支持 ES3、ES4、ES5、ES6 等                          | 不支持编译其他 ES3、ES4、ES5 或 ES6 功能   |
| 社区的支持仍在增长，而且还不是很大                  | 大量的社区支持以及大量文档和解决问题的支持 |

#### 1.2 获取 TypeScript

命令行的 TypeScript 编译器可以使用 node.js 安装

1. 安装 TypeScript

   ```
   $ npm install -g typescript
   ```

2. 编译 TypeScript 文件

   ```
   $ tsc index.ts
   # index.ts => index.js
   ```

初学者可以使用 [TypeScript PlayGround](https://www.typescriptlang.org/play/) 来学习新的语法或特性。



## 二、TypeScript 基础类型

#### 2.1 Boolean 类型

```
$ const bool: boolean = true;
# ES5: var bool = true;
```

#### 2.2 Number 类型

```
$ const num: number = 7;
# ES5: var num = 7;
```

#### 2.3 String 类型

```
$ const str: string = "hello world";
# ES5: var str = "hello world";
```

#### 2.4 Array 类型

```
$ const arr1: number[] = [1, 2, 3];
# ES5: var arr1 = [1, 2, 3];

$ const arr2: Array<number> = [1, 2, 3]; // 泛型语法
# ES5: var arr2 = [1, 2, 3];
```

#### 2.5 Enum 类型

​	使用枚举类型，我们可以定义一些带名字的常量。使用枚举可以清晰地表达意图或创建一组有区别的用例。TypeScript 支持数字的和基于字符串的枚举。

##### 2.5.1 数字枚举

```
enum Direction {
	North,
	South,
	East,
	West
}
let dir: Direction = Direction.North;
```

​	a. 默认情况下，North 的初始值为 0 ，其余成员从 1 开始依次增长。即 North、South、East、West 依次为 0、1、2、3 。

​	上面的枚举编译为 js 的代码如下：

```
var Direction;
(function (Direction) {
    Direction[Direction["North"] = 0] = "North";
    Direction[Direction["South"] = 1] = "South";
    Direction[Direction["East"] = 2] = "East";
    Direction[Direction["West"] = 3] = "West";
})(Direction || (Direction = {}));
var dir = Direction.North;
```

​	b. 我们也可以设置 North 的初始值，如：

```
enum Dirction {
	North: 3,
	South,
	East,
	West
}
```

​	如此，North、South、East、West 依次为 3、4、5、6 。

​	c. 或者，更改其他初始值，如：

```
enum Dirction {
	North,
	South: 3,
	East,
	West
}
```

​	如此，North、South、East、West 依次为 0、3、4、5。

##### 2.5.2 字符串枚举

​	TypeScript 2.4 及以后的版本，允许使用字符串枚举。在字符串枚举中，每个成员必须使用字符串字面量或另一个字符串枚举成员进行初始化。

```
enum Direction {
	NORTH = "NORTH",
	SOUTH = "SOUTH",
	EAST = "EAST",
	WEST = "WEST"
}
```

​	编译后得到 js ：

```
var Direction;
(function (Direction) {
    Direction["NORTH"] = "NORTH";
    Direction["SOUTH"] = "SOUTH";
    Direction["EAST"] = "EAST";
    Direction["WEST"] = "WEST";
})(Direction || (Direction = {}));
```

##### 2.5.3 异构枚举

​	异构枚举的成员值是数字和字符串的混合。

```
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}
```

​	编译后得到 js ：

```
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
```

​	观察上述生成的 ES5 代码可以发现，数字枚举比字符串枚举多了“反向映射”：

```
console.log(Enum.A); // 输出 0
console.log(Enum[0]); // 输出 “A”
```

​	另外，初始值为字符串的枚举成员，它的下一个成员必须有初始化表达式：

```
enum Enum {
	A = "a",
	B
} // 编译时报错

enum Enum {
	A = "a",
	B = 1
} // 正常编译
```

#### 2.6 Any 类型

​	在 TypeSc 中，任何类型都可以被归为 `any` 类型，这让 `any` 类型成为了类型系统的顶级类型（top type，也被称作全局超级类型）。

```
const anyType: any = 678;
anyType = "hello";
anyType = true;
```

​	另外， `any` 类型也是任何类型的子类型，它可以赋值给任意类型的变量。

```	
let anyType: any;
const str: string = anyType;
const num: number = anyType;
const bool: boolean = anyType;
...
```

​	Any 类型本质上是类型系统的一个逃生舱。作为开发者，这给了我们很大的自由：TypeScript 允许我们对 Any 类型的值进行任意操作，而无需事先执行任何形式的检查。如：

```
const value: any;
value.type.name;
value();
value.trim();
new value();
value[1][2];
...
```

​	以这种方式编写代码似乎不太合适。它是不可预测的，很难维持。您可能觉得在处理一些没有为其创建类型的第三方库时需要使用它，而且您不确定它们是如何工作的。另外，使用 any 可以将 TypeScript 添加到现有的 JavaScript 代码库中。

​	使用 `any` 类型可以很容易地写出类型正确但在运行时有问题的代码。没有强制的类型检查，可能会给您带来一些麻烦。

```
const uncertain: any = 'Hello world!';
uncertain.hello();
```

```
const dog: any = {
 name: 'Fluffy',
 sayHello: () => 'woof woof'
};
 
dog.hello();
```

​	如果我们使用 `any` 类型，就无法使用 TypeScript 提供的保护机制。为了解决 `any` 类型带来的问题，TypeScript 3.0 版本中引入了 `unknown` 类型。

#### 2.7 Unknown 类型

​	与 `any` 类型相同，任何类型都可以赋值给 `unknown` 。这使得 `unknown` 成为 TypeScript 类型系统的另一种顶级类型。

```
$ let value: unknown;

$ value = 123;
$ value = "hello world";
$ value = false;
$ value = undefined;
$ value = null;
$ value = [];
$ value = {};
$ value = new TypeError();
$ value = Symbol("symbol");
$ value = Math.random;
```

​	但是，与 `any` 类型不同，`unknown` 类型的变量只能赋值给 `any` 或者 `unknown` 类型的变量。

```
$ let value: unknown;
$ let anyType: any = value;
$ let unknownType: unknown = value;
```

​	与 `any` 类型不同，`unknown` 类型的变量执行操作前，必须进行某种形式的检查。

> any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 既是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查。

#### Turple 类型

​	数组一般由同类型的值组成，但有时我们需要在单个变量中储存不同类型的值。这时，我们可以使用元组 Truple 。

​	元组 Turple 是 TypeScript 的特有类型，其工作方式与数组类似。

​	元组可用于定义具有有限数量的未命名属性的类型。每个类型都有一个关联的属性。使用元组时，必须提供每个属性的值。

```
const turpleType: [string, number];
turpleType = ["hello", 123];
```

​	在上面的代码中，我们定义了一个名为 `turpleType` 的变量，它的类型是一个类型数组 `[string, number]` 。然后我们按照正确的类型依次初始化 `turpleType` 变量。

​	与数组相同，我们可以通过下标访问元组中的元素。

```
console.log(turpleType[0]); // "hello"
console.log(turpleType[1]); // 123
```

###### 注意：

​	1. 在初始化元组时，如果类型不匹配，会导致编译失败。如：

```
$ const tur: [string, number] = [123, "hello"];
# 报错
# [0]: Type 'number' is not assignable to type 'string'.
# [1]: Type 'string' is not assignable to type 'string'.
```

	2. 在初始化元组时，我们需要提供每一个属性的值，否则会编译错误。如：

```
$ const tur: [string, number] = ["hello"];
# 报错
# Property '1' is missing in type '[string]' but required in type '[string, number]'.
```

#### Void 类型

​	某种程度上来说，`void` 类型与 `any` 类型相反，它标识没有任何类型。当一个函数没有返回值时，通常会见到其返回值为 `void` 类型。

```
# ts
function fn(): void {
	console.log("this function returns nothing");
}

# 编译为js
function fn() {
    console.log("this function returns nothing");
}
```

###### 注意：

	1. 声明一个 `void` 类型的变量没有意义，它的值只能是 `undefined` 或 `null` 。

```
const voidType: void = undefined;
const voidType: void = null;
```

#### 2.10 undefined 类型 和 null 类型

​	在 TypeScript 中，undefined 和 null 有自己的类型，分别为 `undefined` 和 `null ` 。

```
$ const undefinedType: undefined = undefined;
$ const nullType: null = null;
```

​	默认情况下，`undefined` 类型和 `null` 类型是所有类型的子类型，即，你可以把这两种类型赋值给任何类型的变量。

```
const undefinedType: undefined = undefined;
const nullType: null = null;

const undefinedType2: undefined = nullType;
const nullType2: null = undefinedType;
const str: string = nullType;
...
```

**但是，如果你指定了 **`--strictNullChecks` **标记，就只能把它们赋值给 `void` 类型或者他们各自的类型。**

```
const undefinedType: undefined = undefined;
const nullType: null = null;

const undefinedType2: undefined = nullType;
const nullType2: null = undefinedType;

# tsc xxx.ts --strictNullChecks
# 报错
# Type 'null' is not assignable to type 'undefined'.
# Type 'undefined' is not assignable to type 'null'.
// -----------------------------------------------------------
const voidType: void = undefinedType;
const voidType2: void = nullType;

const undefinedType3: undefined = undefinedType;
const nullType3: null = nullType;
```

#### 2.11 Never 类型

​	`never` 类型是永不存在的值的类型，如总是会抛出异常的或没有返回值的函数的返回值类型。

```
function returnErr(message: string): never {
	throw new Error(message);
}
function noReturn() {
	while(true) {};
}
```

###### 用途：

	1. 在 TypeScript 中，可以使用 `never` 类型的特性进行全面性的检查，如：

```
type Foo: string | number;
function checkType(foo: Foo) {
	if (typeof foo === "string") {
		// do something;
	} else if (typeof foo === "number") {
		// do something;
	} else {
		const check:never = foo;
	}
}
```

​	上例中，我们将收窄为 `never` 的参数 `foo` 赋值给一个显式声明的 `never` 类型变量。在逻辑正确的情况下可以编译通过。但是，如果后来有一天你的同事改变了 `Foo` 的类型，如：

```
type Foo: string | number | boolean;
```

却没有修改函数 `checkType` 中的控制流程，这时，else 分支中，参数 `foo` 的类型收缩为 `boolean` 。而 `boolean` 类型的值是无法赋值给 `never` 类型变量的，编译会报错。通过这种方式，我们可以保证函数 `checkType` 总是穷尽了 `foo` 的所有可能的类型。

通过这个例子，我们可以得出结论：**使用 `never` 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码** 。



## 三、断言 Type Assertion

> 参考[《TypeScript 入门教程》](https://ts.xcatliu.com/basics/type-assertion.html)

类型断言用于手动指定一个值的类型。

#### 3.1 语法

```
<类型>值
```

或者

```
值 as 类型
```

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 `值 as 类型`。

形如 `<Foo>` 的语法在 tsx 中表示的是一个 `ReactNode`，在 ts 中除了表示类型断言之外，也可能是表示一个[泛型](https://ts.xcatliu.com/advanced/generics.html)。

故建议大家在使用类型断言时，统一使用 `值 as 类型` 这样的语法。

#### 3.2 用途

##### 3.2.1 将一个联合类型断言为其中一个类型

​	当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```
function getLength(arg: string | number): number {
	return arg.length;
}
# 编译报错
# Property 'length' does not exist on type 'string | number'.
# Property 'length' does not exist on type 'number'.
```

​	而有些情况下，我们需要在还不确定类型的时候就访问其中一种类型的属性或方法，如：

```
function getLength(arg: string | number): number {
	if (arg.length) {
		return arg.length;
	} else {
		return arg.toString().length;
	}
}
```

​	但这样的 ts 代码编译会报错。此时可以使用类型断言，将 arg 断言为 string：

```
function getLength(arg: string | number): number {
	if ((arg as string).length) {
		return arg.length;
	} else {
		return arg.toString().length;
	}
}
```

##### 3.2.2  将一个父类断言为更加具体的子类

​	当类之间存在继承关系时，常使用断言：

```
class ApiError extends Error {
	code: number = 0;
}
class HttpError extends Error {
	statusCode: number = 200;
}
function isApiError(error: Error): boolean {
	if (typeof (error as ApiError).code === "number") {
		return true;
	}
	return false;
}
```

##### 3.2.3 将任意类型断言为 `any`

##### 3.2.4 将 `any` 断言为一个具体的类型

#### 3.3 类型断言的限制

#### 3.4 双重断言

#### 3.5 类型断言 VS 

##### 3.5.1 VS 类型转换

##### 3.5.2 VS 类型声明

##### 3.5.3 VS 泛型

#### 3.6 注意：

1. 类型断言不是类型转换，而是类型选择，颗粒理解为在编译阶段强制性地将变量当作某个特定类型来访问。因此不可以断言一个联合类型中不存在的类型。

2. 类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误。滥用类型断言可能会导致运行时错误。

```
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}

function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}
# 编译时正常，但运行时报错。
// Uncaught TypeError: animal.swim is not a function`
```

