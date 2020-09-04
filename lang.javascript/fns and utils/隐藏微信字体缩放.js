export default {
  mounted() {
    this.changeFont();
  },
  methods: {
    changeFont() {
      if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        this.handleFontSize();
      } else {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.handleFontSize,
            false
          );
        } else if (document.attachEvent) {
          //IE浏览器，非W3C规范
          document.attachEvent("onWeixinJSBridgeReady", this.handleFontSize);
        }
      }
    },
    handleFontSize() {
      // 设置网页字体为默认大小
      WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
      // 重写设置网页字体大小的事件
      WeixinJSBridge.on('menu:setfont', function() {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
      });
    }
  }
};
