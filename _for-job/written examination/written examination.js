// 1. HTML5有那些新特性，移除了哪些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？

// 2. 谈谈对 BFC（块级格式化上下文 Block Fommatting Context）规范的理解

// 3. 什么是事件委托？

// 4. javascript 如何判断一个对象为空？

// 5. bind, call, apply 的区别有哪些？如何实现 bind？

// 6. 简单谈下对原型链的理解。

// 7. 运行结果
function fun() {
  this.a = 10;
  this.b = function () {
    console.log(this.a);
  };
}
fun.prototype = {
  b: function () {
    this.a = 20;
    console.log(this.a);
  },
  c: function () {
    this.a = 30;
    console.log(this.a);
  }
};

let myFn = new fun();
myFn.b();
myFn.c();
console.log('========================================');

// 8. 运行结果
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
console.log(new Foo().getName);
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
console.log('========================================');

// 9. 运行结果
function fn2(n, o) {
  console.log(o);
  return {
    fn2: function (m) {
      return fn2(m, n);
    }
  };
}
var a = fn2(0);
a.fn2(1);
a.fn2(2);
a.fn2(3);

var b = fn2(0).fn2(1).fn2(2).fn2(3);

var c = fn2(0).fn2(1);
c.fn2(2);
c.fn2(3);

// 10. 深浅拷贝的区别，如何实现深拷贝

// 11. 防抖函数

// 12. 一个页面从输入url 到页面加载显示完成，期间都发生了什么？

// 13. 性能优化的方法

// 14. MVVM 框架是什么？与其他框架（jQuery）的区别

// 15. Vue 组件通信的方法

// 16. Vue 双向绑定原理

// 17. Vue computed 如何实现？

// 18. vue-router 实现原理

// 19. 为什么虚拟 DOM 能够提高性能？