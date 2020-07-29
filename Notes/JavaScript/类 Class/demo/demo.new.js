// basis
class Person {
  constructor(name) {
    this.name = name;
  }
  get words() {
    return `hello, ${this.name}!`;
  }
  upperName() {
    if (typeof this.name === 'string') {
      let firstLetter = this.name.slice(0, 1);
      let fommatedName = this.name.toLowerCase();
      fommatedName = firstLetter.toUpperCase() + fommatedName.slice(1);
      console.log(fommatedName);
    }
  }
}

const someone = new Person('jane');
someone.upperName();
console.log(someone);

// 实例的属性必须定义在类的方法内
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

// 静态的或原型的方法必须定义在类定义的外面
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeHeight = 40;