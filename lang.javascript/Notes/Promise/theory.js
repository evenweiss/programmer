// 1. 状态机
const PENDDING = 'PENDDING';
const RESOLVED = 'RESOLVED';
const REJECTED = 'REJECTED';

// 创建并初始化类
class MyPromise {
  // 初始化
  constructor() {
    this.status = PENDDING; // 初始化状态status
    this.value = undefined; // 返回值
    this.reason = undefined; // 错误原因

    // 返回值回调队列 / 错误回调队列
    this.resolves = [];
    this.rejects = [];

    // 声明 resolve / reject 函数
    const resolveFn = value => {
      if (this.status === PENDDING) {
        this.status = RESOLVED; // 状态变更
        this.value = value;
      }
      // 队列执行
      while (this.resolves.length) {
        const callback = this.resolves.shift();
        callback(value);
      }
    };
    const rejectFn = reason => {
      if (this.status === PENDDING) {
        this.status = REJECTED; // 状态变更
        this.reason = reason;
      }
      // 队列执行
      while (this.rejects.length) {
        const callback = this.rejects.shift();
        callback(reason);
      }
    };

    try {
      executor(resolveFn, rejectFn);
    } catch (e) {
      rejectFn(e);
    }
  }
  // MyPromise.then
  then(resolve, reject) {
    switch (this.status) {
      case 'RESOLVED':
        resolve(this.value);
        break;
      case 'REJECTED':
        reject(this.reason);
        break;
      case 'PENDDING':
        this.resolves.push(resolve);
        this.rejects.push(reject);
        break;
    }
  }
}

const promise = new MyPromise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resolve('done');
  }, 1500);
});
promise.then(res => {
  console.log(res);
});
