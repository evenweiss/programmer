### # 2020/07/30

#### 1. 移动端使用 rem 布局，在部分华为机型上超出屏幕的问题

**描述**

​	在开发移动端应用时，常使用 rem 单位以适配各个尺寸的屏幕。

​	但在部分华为机型中，rem 计算不准，根元素的 font-size 与设置值不符（一般偏大），导致元素超出屏幕、屏幕横向滑动的问题。

**解决办法**

1. 计算获取实际 `body.fontsize` => 与设置值进行比较 => 重新校正

   ```
   /**
    * rem 适配
    * @param {number} sketchWide 设计稿尺寸，默认为 750
    */
   (function (doc, win, sketchWide = 750) {
     let docEl = doc.documentElement;
     let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
     let recalc = function () {
       let clientWidth = docEl.clientWidth;
       if (!clientWidth) {
         return;
       }
       let setFs = ''; // 设置的 font-size
       if (clientWidth < 320) {
         setFs = (100 * 320) / sketchWide;
       } else {
         if (clientWidth > 540) {
           setFs = (100 * 540) / sketchWide;
         } else {
           setFs = 100 * (clientWidth / sketchWide);
         }
       }
       // 设置根元素 font-size
       docEl.style.fontSize = setFs + 'px';
       // 根元素实际的 fontsize
       let realityFs = parseFloat(window.getComputedStyle(html).fontSize);
       // 与设置值不相等时，计算缩放比例
       if (realityFs !== setFs) {
         // 计算缩放比例 存在公式：
         // 1.原实际字体大小 realityFs / 原设置字体大小 setFs = 新实际字体大小 newRealityFs / 新设置字体大小 newSetFs
         // 2.新实际字体大小 newRealityFs = 原设置字体大小 setFs
         let scale = realityFs / setFs;
         // 新的设置 font-size
         let newSetFs = setFs / scale;
         docEl.style.fontSize = newSetFs + 'px';
       }
     };
     if (!doc.addEventListener) {
       return;
     }
     win.addEventListener(resizeEvt, recalc, false);
     doc.addEventListener('DOMContentLoaded', recalc, false);
   })(document, window, 750);
   ```

2. 考虑使用 `vw` 或 百分比设置宽度。

### #2020/07/14

#### 1. transition 过渡动画--“抽屉”表现异常

使用过渡 transition 制作"抽屉"动效时，常使用 `max-height` 属性:

```
// 初始状态
.tag {
  max-height: 0;
  overflow: hidden;
  transition: max-height 1000ms linear;
}
// 结束状态
.tag.active {
  max-height: 100px;
}
```

结束状态的 `max-height` 设定一个元素高度不能达到的值。

**描述：**

```
1. 过渡动画过快，"抽屉"完全打开（达到“内容全部显示”的高度 height）的时间短于设定的过渡时间 `transition-duration`。
```
 2. 在过渡动画返回（"抽屉"关闭）时，动画有明显延迟。

**原因：**

1. 因为直到 max-height 达到设定值，过渡动画才会结束，过渡时长 `transition-duration` 为整个过程的时长。故而，当过渡结束状态的 `max-height` 的值过大（远大于实际高度 height）时，会明显感受到过渡动画过快。

2. 同理，当过渡动画（"抽屉"关闭）返回时，从结束状态的 `max-height` 值开始缩小。由于该值远大于元素实际高度 height，在 `max-height` 过渡到与 height 相同之前，不会看到元素高度变化。而 max-height > height 的这段时间，就是延迟时间。

**解决方案：**

1. 预估一个比实际 height 大但相近的 max-height 。但这种方法需要估算实际的height，在动态获取数据时使用难度较大。

2. 通过 JavaScript 计算得到 height（行数 * 行高），设定 max-height = height。但这种方法在页面内容存在不确定折行时，使用难度较大。

3. 精确计算高度，操作 DOM 实现 transition

   ```
   const setTransition = (element, minus) => { // time: 过渡时间，可缺省
     if (typeof window.getComputedStyle == "undefined") return;
     
     // 本行2015-05-20新增，mac Safari下，貌似auto也会触发transition, 故要none下~
     element.style.transition = "none";
     element.style.height = "auto";
     
     const height = window.getComputedStyle(element).height;
     element.style.height = height;
     element.offsetWidth = element.offsetWidth;
   
     time && element.style.transition = "height "+ time +"ms";
     
     const targetHeight = window.getComputedStyle(element).height;
     element.style.height = targetHeight;
   };
   ```

   但操作 DOM 仍然不被 Vue 等框架推荐使用。