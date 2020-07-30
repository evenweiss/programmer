// 枚举
// 1.数字枚举
enum Num {
  One,
  Two,
  Three
}
let num: Num = Num.Three;
console.log(Num, num); // { '0': 'One', '1': 'Two', '2': 'Three', One: 0, Two: 1, Three: 2 } 2
// * 注意反向映射

// 2.字符串枚举
enum Str {
  Name = "Jane",
  Level = 'T4',
  Gender = "Female"
}
let str: Str = Str.Name;
console.log(Str, str); // { Name: 'Jane', Level: 'T4', Gender: 'Female' } Jane
// * 无反向映射

// 3.异构枚举
enum Person {
  id,
  name = 'Weiss',
  age = 20,
  gender = 'male'
}
let weiss: Person = Person.name;
console.log(Person, weiss); 
// { '0': 'id', '20': 'age', id: 0, name: 'Weiss', age: 20, gender: 'male' } Weiss
// * 1.1.字符串类型的成员没有反向枚举
// * 1.2.字符串类型的成员下一个成原必须初始化赋值：{ name = "Name", level } // Error