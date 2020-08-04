let detain = document.querySelector('.detain-popup');
init();

// 初始化
function init() {
  detain.hidden = true;
  sessionStorage.setItem('$_can_i_leave', '0'); // 是否可以离开页面：'1'-允许离开，不弹窗；'0'-不允许离开，显示弹窗
  window.history.pushState(null, null, document.URL); // 推一层历史
  window.addEventListener('popstate', handleHistoryChange, false); // 监听页面历史变化
}

// 页面历史变化事件处理函数
function handleHistoryChange() {
  let canILeave = sessionStorage.getItem('$_can_i_leave'); // 是否允许离开
  if (canILeave === '0') {
    // 1.不允许离开时，显示弹窗
    detain.hidden = false;
    // 下次允许离开
    sessionStorage.setItem('$_can_i_leave', '1');
    // 推一条历史记录，页面为显示弹窗的当前页面
    window.history.pushState(null, null, document.URL);
  } else {
    // 2.不允许离开时
    if (!detain.hidden) {
      // 2.1 弹窗显示中：关闭弹窗
      detain.hidden = true;
    } else {
      // 2.2 弹窗已关闭：关闭页面
      closeWindow();
    }
  }
}

// 关闭当前页面
function closeWindow() {
  let agent = navigator.userAgent;
  if (agent.includes('MSIE')) {
    if (agent.includes('MSIE 6.0')) {
      window.opener = null;
      window.close();
    } else {
      window.open('', '_top');
      window.top.close();
    }
  } else if (agent.includes('Firefox')) {
    window.location.href = 'about:blank'; // 火狐默认状态非window.open的页面window.close是无效的
  } else {
    window.opener = null;
    window.open('', '_self', '');
    window.close();
  }
}
