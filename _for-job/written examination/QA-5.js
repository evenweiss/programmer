// bind 函数实现
if (!Function.prototype.bind) {
  Function.prototype.bind = function () {
    let self = this;
    let context = [].shift.call(arguments);
    let args = [].shift.call(arguments);
    return function () {
      self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    };
  };
}
