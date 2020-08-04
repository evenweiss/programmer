// 节流 throttle
// 函数执行 => 等待 => 函数执行
// （频繁触发的情况下）第一次触发执行，等待一段时间，再次执行
function throttle(fn, duration) {
  let timer = null;
  // 注意：这里 return 的函数 不要使用箭头函数
  return function (...args) {
    let _self = this; // 绑定 this
    if (timer !== null) return;
    // console.log(arguments);
    fn.apply(_self, args);
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
    }, duration);
  };
}

// 防抖 debounce
// 等待 => 函数执行
// 多次触发不执行，直到一定时间内没有再次触发函数时，执行函数；
// 抖动时不执行函数；不再抖动时执行函数
function debounce(fn, delay) {
  let timer = null;
  // 注意不要使用箭头函数，否则绑定的this不好取
  return function (...args) {
    let _self = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(_self, args);
    }, delay);
  };
}
