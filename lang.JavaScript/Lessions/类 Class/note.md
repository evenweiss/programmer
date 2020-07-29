ES6 引入的 JavaScript 类实质上是对 JavaScript 现有的基于原型继承的语法糖。
类语法不会为 JavaScript 引入新的面向对象的继承模型。

## 一、定义类

类实际上是一个“特殊的函数”。与函数相同，类语法由类表达式和类声明两个部分构成。

#### 1. 类表达式

1. 类表达式可以是具名的，也可以是匿名的。

2. 具名类表达式的名称是类内的一个属性，可以通过类本身（而不是类实例）的 name 属性获取。 

```
// 匿名类
const Person = class {
  contructor(name) {
  	this.name = name;
  }
}
console.log(Person.name); // 'Person'

// 具名类
const Rect1 = class Rect2 {
  constructor(width, height) {
  	this.width = width;
  	this.height = height;
  }
}
console.log(Rect1.name); // 'Rect2'
```



#### 2. 类声明

使用关键字 class 声明一个类。

```
class Angle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

**提升**

类声明与函数声明的一个重要区别在于，函数声明会**提升**而类声明不会。

```
const p = new Person('Jane'); // 报错 RefrenceError

class Person {
  contructor(name) {
  	this.name = name;
  }
}
```



## 二、类体及方法定义

#### 1. 严格模式

类声明和类表达式的主体都执行再严格模式下。

#### 2. 构造函数

`constructor` 用于创建和初始化一个由class类创建的对象。

#### 3. 原型方法

```
class Rect {
  getDistance(x, y) {
  	return Math.hypot();
  }
}
const obj = new Rect();
console.log(obj.getDistance(10, 20));
```



#### 4. 静态方法

`static` 定义一个类的一个静态方法。

调用静态方法不需要实例化该类，也不能通过类实例调用静态对象。

```
class Rect {
  static getDistance(x, y) {
  	return Math.hypot();
  }
}
// 通过类本身调用静态方法
console.log(Rect.getDistance(10, 20));
```

#### 5. 包装 this

1. class 类体的代码总是在严格模式下执行；
2. 当调用静态/原型方法时，若不指定 *this* 值，则 *this* 始终指向 `undefined` 。

```
class Rect {
  constructor(x, y) {
  	this.x = x;
  	this.y = y;
  }
  static getDistance() {
  	return this;
  }
  getPoint() {
  	return this;
  }
}
const rect = new Rect();

let getPoint = rect.getPoint;
console.log(getPoint()); // undefined
console.log(rect.getPoint()); // Rect {}

let getDistance = Rect.getDistance;
console.log(getDistance()); // undefined
console.log(Rect.getDistance()); // class Rect
```

**与类不同**，基于函数的语法：

1. 在非严格模式下，依据初始值不同，方法调用会发生自动装箱。若初始值时 `undefined` ，*this* 值会被设为全局对象。
2. 在严格模式下不会发生自动装箱，*this* 值将保留传入状态。

```
function Animal2() {
  this.type = 'animal';
}

Animal2.prototype.shout = function() {
  return this;
}
Animal2.say = function() {
  return this;
}
Animal2.test = function() {
  return 'this is function test';
}

const duck = new Animal2();
let shout = duck.shout;
console.log(1, shout()); // 全局对象
console.log(2, duck.shout()); // Animal2 { type: 'animal' } 即实例对象

let say = Animal2.say;
console.log(3, say()); // 全局对象
console.log(4, Animal2.say()); // 函数 Animal2
console.log(5, Animal2.say().test()); // this is function test
```



#### 6. 实例属性

1. 实例属性必须定义在类的方法里：

   ```
   class Animal {
     constructor(name) {
       this.name = name;
     }
   }
   ```

2. 静态的/原型的数据属性必须定义在类定义外面：

   ```
   Animal.prototype.color = 'red';
   Animal.weight = '15kg';
   ```

   

#### 7. 公有/私有/特权

> 公共和私有字段声明是JavaScript标准委员会[TC39](https://tc39.es/)提出的[实验性功能（第3阶段）](https://github.com/tc39/proposal-class-fields)。浏览器中的支持是有限的，但是可以通过[Babel](https://babeljs.io/)等系统构建后使用此功能。

1. 公有字段：子类、实例对象均可以继承和访问的属性/方法。

   ```
   class Circle {
     width;
     height = 30;
     constructor(width) {
       this.width = width;
     }
   }
   
   class LittleCircle extends Circle {}
   console.log(new Circle(10)); // { width: 10, height: 30 }
   consoe.log(new LittleCircle(20)) // { width: 20, height: 30 }
   ```

2. 私有字段

   ```
   class Circle {
     width;
     height = 30;
     constructor(x, y) {
       this.x = x;
       this.y = y;
     }
   }
   
   class LittleCircle extends Circle {}
   console.log(Circle.height, LittleCircle.height);
   console.log(new Circle());
   ```

   

