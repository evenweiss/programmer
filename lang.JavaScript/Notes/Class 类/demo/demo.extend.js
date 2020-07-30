// 继承 Extend
class People {
  constructor(race, planet) {
    this.race = race;
    this.planet = planet;
  }
  get word() {
    return this.generateRandomWord();
  }
  generateRandomWord() {
    let base = 'abcdefghijklmnopqrstuvwxyz';
    return base[Math.floor(Math.random() * 26)];
  }
  speak() {
    console.log('parent.speak');
  }
}

class Person extends People {
  constructor(race, planet, name) {
    super(race, planet);
    this.name = name;
  }
  speak() {
    super.speak();
    console.log('child.speak');
  }
}

let jane = new Person('humber', 'The Earth', 'Jane');
console.log(jane);
console.log(jane.word);
console.log(jane.generateRandomWord());
jane.speak();
console.log('====================');

// ! 类不能继承常规对象，若要继承，使用 setPrototypeOf
const Animal = {
  speak() {
    console.log(`${this.name}, is the best friend of its owner.`);
  }
};
class Dog {
  constructor(name) {
    this.name = name;
  }
}
Object.setPrototypeOf(Dog.prototype, Animal);
const scooby = new Dog('Scooby');
scooby.speak();
