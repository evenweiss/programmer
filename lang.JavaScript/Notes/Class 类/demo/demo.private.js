class Circle {
  #x;
  #y = 30;
  constructor(x) {
    this.x = x;
  }
}

class LittleCircle extends Circle {}
console.log(new Circle(10)); // { x: 10, y: 30 }