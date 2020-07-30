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
