class Circle {
  width;
  height = 30;
  constructor(width) {
    this.width = width;
  }
}

class LittleCircle extends Circle {}
console.log(new Circle(10)); // { width: 10, height: 30 }
console.log(new LittleCircle(20)) // { width: 20, height: 30 }