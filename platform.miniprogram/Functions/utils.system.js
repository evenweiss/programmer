const systemInfo = wx.getSystemInfoSync(); // 当前运行系统信息
const menuButtonRect = wx.getMenuButtonBoundingClientRect(); // 胶囊菜单尺寸位置

/**
 * 计算屏幕各区域高度
 * @param {Boolean} withDangerArea 是否考虑危险区域（用于判断底部是否需要空余一部分作为 Home Indicator 占用区域）
 * @return {Object} 返回各区域高度计算结果
 */
const computeSystemHeight = withDangerArea => {
  // 状态栏/窗口/屏幕高度
  let { statusBarHeight, windowHeight, screenHeight } = systemInfo;
  // 胶囊按钮顶边 距 状态栏底边
  let minusStatusBarBottom = menuButtonRect.top - statusBarHeight;
  // 胶囊按钮高度
  let menuButtonHeight = menuButtonRect.height;
  // 标题栏高度
  let titleBarHeight = '';
  if (systemInfo.system.includes('iOS')) {
    // iOS 标题栏固定 44px
    titleBarHeight = 44;
  } else {
    // 安卓机胶囊按钮在标题栏垂直居中，即
    titleBarHeight = minusStatusBarBottom + menuButtonHeight + minusStatusBarBottom;
  }
  // 安全区域高度
  let safeAreaHeight = systemInfo.safeArea.height;
  // 危险区域总高度：顶部状态栏 + 底部 Home Indicator
  let dangerAreaHeight = screenHeight - safeAreaHeight;
  // 危险区域底部高度
  let dangerAreaBottomHeight = dangerAreaHeight - statusBarHeight;
  // 内容区域高度
  let mainHeight =
    screenHeight - statusBarHeight - titleBarHeight - (withDangerArea ? dangerAreaBottomHeight : 0);
  return {
    screenHeight, // 屏幕高度
    windowHeight, // 布局窗口高度
    safeAreaHeight, // 安全区域高度
    dangerAreaHeight, // 危险区域总高度
    dangerAreaBottomHeight, // 底部 Home Indicator 区域高度
    statusBarHeight, // 状态栏高度
    titleBarHeight, // 标题栏高度
    mainHeight // 可用内容区域高度
  };
};

module.exports = { computeSystemHeight };
