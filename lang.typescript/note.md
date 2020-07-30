# TypeScript 学习日志

*** 2020/07/29**

## 一、概念

1. JavaScript 的超集
2. 强类型
3. 编译型

## 二、数据类型

***exercise***: "/exercise-folder/About TypeScipt/01.data-type/"

### 2.1.Boolean

### 2.2. Number

### 2.3. String

### 2.4. Array 数组

##### 2.4.1. 声明：`elemType[]` / `Array<elemTYpe>`

```
const arr1: number[] = [1, 2, 3];
const arr2: Array<string> = ['a', 'b', 'c'];
```

##### 2.4.2. 赋值：

**注意**：赋值时，要求元素的类型保持对应

```
const arr3: number[];
arr3 = [1, 2, 3];
// arr3 = ['a', 2, 3]; // Error
```

### 2.5.Turple 元组

##### 2.5.1. 概念：

> Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same. 

​	已知元素数量和元素类型的特殊数组。一般用于储存不同数据类型的（已知数量的）数据。

##### 2.5.2. 声明

```
const tur1: [number, string, boolean] = [1, 'a', true];
```

##### 2.5.3. 赋值

1. 每个位置上的元素，其类型应保持对应；
2. 元素数量应保持对应（2.6版本之前，允许超出数量，但”越界元素“类型必须是要求的类型或其子类型）；

```
const tur2: [number, string, boolean];
tur2 = [2, 'b', false];

// 要求元素数量保持对应
// tur2 = [2] // Error
// tur2[3] = 'b' // Error
// 要求元素类型保持对应

// tur2 = [2, false, 'b'] // Error
// tur2[1] = 3 //  Error
```



### 2.6. Enum

##### 2.6.1 概念

> A helpful addition to the standard set of datatypes from JavaScript is the `enum`. 

​	对 JavaScript 标准类型的补充。

##### 2.6.2 声明

```
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green; // 1
```

1. 默认情况下，枚举的元素值从 0 开始，依次递增。如上例中，Red 值为 0，Green 值为 1，Blue 值为 2 。

2. 允许自定义默认值，如

   ```
   enum Color {
     Red = 10, // 10
     Green, // 11
     Blue // 12
   }
   let c: Color = Color.Green; // 11
   
   Or
   
   enum Color {
     Red, // 1
     Green = 10, // 10
     Blue // 11
   }
   let c: Color = Color.Green; // 10
   ```

##### 2.6.3 分类

1. 数值枚举

2. 字符串枚举

   **注意：**字符串枚举不会生成反向映射。

   若有反向映射，值相同的枚举成员会产生属性覆盖的问题，因此字符串枚举的反向映射并无意义。

3. 异构枚举

   **注意：**

   1. 异构枚举中，赋值为**字符串**的成员，其下一个成员必须初始化值

      ```
      enum Num {
        One,
        Two,
        Three = 30,
        Four = "D",
        Five // Error 枚举成员必须具有初始化表达式
      }
      ```

##### 2.6.4 特点

1. 反向映射：数值类型的枚举成员会生成反向的映射（键:值对映射 + 值:键对映射）

   ```
   enum Num {
     One,
     Two,
     Three = 30,
     Four = "D",
     Five = '5'
   }
   // 编译后
   {
     // 反向映射
     '0': 'One',
     '1': 'Two',
     '30': 'Three',
     // 正向映射
     One: 0,
     Two: 1,
     Three: 30,
     // 字符串无反向映射
     Four: "D",
     Five: '5'
   }
   ```

   

### 2.7. Any

### 2.8. Undefined

### 2.9. Null

### 2.10. Unknown

### 