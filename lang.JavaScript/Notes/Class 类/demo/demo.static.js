/**
 * 静态方法
 * static 关键字定义一个类的静态方法。
 * 不可以通过类实例调用静态方法，而是通过类直接调用。
 * 通常用于为一个应用程序创建工具函数。
 */
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  static distance(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.hypot(dx, dy);
  }
}
const a = new Point(7, 7);
const b = new Point(4, 3);
console.log(Point.distance(a, b));

console.log('++++++++++++++++++++++++');

/**
 * class 内部的代码总是在严格模式下执行，即使没有设置 "use strict" 。
 * 因此调用静态或原型方法时，若未指定 this，则 this 值为 undefined
 */
class Animal {
  constructor() {
    this.type = 'animal'
  }
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
  static testStatic() {
    console.log("类的静态方法");
  }
}
let chicken = new Animal();
console.log(chicken.speak()); // Animal { type: 'animal' } 即类的实例对象
let speak = chicken.speak;
console.log(speak()); // undefined

console.log(Animal.eat()); // [Function: Animal]，即 class Animal 类本身
console.log(Animal.eat().testStatic()); // "类的静态方法"
let eat = Animal.eat;
console.log(eat()); // undefined

console.log(chicken.speak() === Animal.eat()); // false
console.log('++++++++++++++++++++++++');

/**
 * 若通过传统方式———基于函数的语法实现，那么根据初始的 this 值：
 * 在非严格模式下方法调用会发生自动装箱。若初始值是 undefined，this 会被设定为全局对象。
 * 严格模式下不会发生自动装箱，this 值保留传入状态。
*/
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