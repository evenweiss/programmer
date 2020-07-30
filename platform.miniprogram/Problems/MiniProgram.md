## #2020/07/16

##### 1. `wx.nextTick(callback)` 接口无效（兼插件`wxml-to-canvas` 的使用）

**描述：**

1. 在实际工作开发中，使用扩展组件 `wxml-to-canvas` 时，一般需要设定 canvas 尺寸：width/height 。为了避免尺寸未适用的问题，在 setData 赋值尺寸后，通过 wx:if 控制组件渲染。

   ```
   // wxml
   <wxml-to-canvas class="widget" wx:if="{{showCanvas}}" width="{{cvsWidth}}" height="{{cvsHeight}}"></wxml-to-canvas>
   
   // js
   this.setData({
     cvsWidth: 500 / dpr, // 与待绘制图片保持一致
     cvsHeight: 1248 / dpr, // 与待绘制图片保持一致
     showCanvas: true // 设置宽高后显示 canvas，避免设置的宽高未应用的问题
   });
   ```

2. 此时若直接通过组件提供的方法 renderToCanvas 渲染 canvas 会报错：`Uncaught (in promise) TypeError: Cannot read property 'clearRect' of undefined.` 即没有 canvas 对象。因此需要对 renderToCanvas 进行延时处理。

3. 尝试使用 wx.nextTick 将逻辑移至下一个时间片段中进行，在开发者工具中无 canvas 报错，但真机调试/预览/体验版等均有报错：`Error: renderToCanvas: fail canvas has not been created` 。

4. 尝试使用 setTimeout 延迟 500ms 执行逻辑，成功解决报错问题。

5. 对于测试环境（https://ecuat.tk.cn）下的图片，仍然存在加载失败的问题，生产环境正常。

**原因：**

​	3. wx.nextTick 是为了解决父子组件中 setData 和 wx:if 造成的错误而提出。经查找网上资料获悉：该 api 可能目前只能在组件中使用（暂未验证）。

**解决方案：**

​	3. 暂无。需要对逻辑做延时处理时，可以使用 setTimeout 。



## #2020/07/15

##### 1. slot 插槽渲染位置错误

**描述：**

1. 自定义组件 `mp-popup` 中在第三层嵌套（两层父级容器）使用渲染插槽，开发者工具 wxml 栏中显示该插槽渲染在组件内容最外层（与遮罩 mask 同层）。但页面显示、真机调试无异常。

2. slot 为 `<view>123456</view>` 用于测试。

3. 后 slot 使用模板引入

   ```
   <!-- 引入模板 -->
   <import src="./template.wxml"></import>
   <mp-popup show="{{showRules}}" bind:close="toCloseRules" custom-style="{{ customStyle }}" position="bottom">
     <!-- 使用模板 -->
     <template is="rules" data="{{ ruleRows }}"/>
   </mp-popup>
   ```

   开发者工具 wxml 栏中显示渲染位置正确，页面显示、实机测试无异常。

**原因：**

​	尚不明确，推测是组件内配置 `Component({options: { multipleSlots: true }})`，允许使用多个**具名**插槽导致。但，

1. `multipleSlots` 为 true 时，在开发者工具 wxml 栏中会显示**所有**插槽（包括具名和匿名）都被渲染在最外层，但页面显示、实机测试**无异常**。

2. `multipleSlots` 为 false 时，在开发者工具 wxml 栏中会显示 **`view` 标签界定的插槽**被渲染在最外层，但页面显示、实机测试**无异常**。

**解决方案：**

​	暂无。可以在只需要使用一个插槽时，`multipleSlots` 不要设定为 true，且使用引入 [模板](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html) 的方式加入插槽。

**其他：**

 1. 使用模板时，`template` 标签不会被渲染，因此插槽名 `slot="slotName"` 需要写在模板内的顶级容器中：

    ```
    // 模板 template.wxml
    <template name="slotTemplate">
      // slot 写在这里👇
      <view slot="slotName">...</view>
    <template name="rules">
    
    // 父组件
    <import src="./template.wxml">
    <view class="parent">
      // 子组件
      <child>
        <template is="slotTemplate" data="{{...data}}">
      </child>
    </view>
    ```




## #2020/06/17

##### 1. web-view中，以链接形式跳转展示的 pdf 等文件（安卓会下载文件），如 "https://www.xxx.com/folder/index.pdf" 不能正常展示。

**原因：**

​	安卓系统对这类链接会下载到本地，而小程序不支持此功能。

**解决方案：**

​	使用在线展示，网络上有各种实现方法，如

> https://www.jianshu.com/p/2f39de746900
>
> https://blog.csdn.net/itbiggod/article/details/80284539



##### 2. 滑动穿透问题，遮罩层（position: fixed）滑动时，底部内容也会滑动。

> 参考：[小程序中的几种情况下滑动穿透解决方案](https://blog.csdn.net/BetterGG/article/details/81358565)

**解决方案：**

1. 遮罩层绑定 catchtouchmove

   ```
   // 组件 wxml
   <view class="mask" bind:catchtouchmove="toDoNothing">
     ...
   </view>
   
   // 组件 js
   Compontent({
     methods: {
       toDoNothing() {}
     }
   })
   ```

   缺点：该方法会**阻止遮罩层的内容滚动**，不适用于遮罩内容也需要滚动的情况，如活动规则弹窗。

2. 使用 `scroll-view`

   ```
   // 父级 wxml
   <scroll-view scroll-y style="height:{{windowHeight}}px">
     // 底层内容
   </scroll-view>
   <组件></组件>
   
   // 父级 js
   Page({
     data: {
       windowHeight: "", // scroll-view高，防止滑动穿透
     },
     onLoad() {
       this.setData({
         windowHeight: wx.getSystemInfoSync().windowHeight
       });
     }
   })
   ```

   缺点：该方法会导致**页面下拉刷新无法正常使用**的问题，不适用于页面需要下拉刷新的情况。

3. 遮罩层显示时，父级组件同时设置固定定位。

   ```
   // 父级 wxml
   <view class="container {{showMask ? "fixed" : ""}}">
     // 父级内容
   </view>
   <mask show="{{showMask}}">遮罩层内容</mask>
   
   // 父级 wxss
   .fixed {
     position: fixed;
     left: 0,
     top: 0,
     width: 100%;
   }
   
   // 父级 js
   Page({
     data: {
       showMask: false // 控制遮罩层显示隐藏
     }
   });
   ```

   缺点：

   	1. 若同一页面存在多个遮罩层组件，对底层容器类名的设置判断条件会非常多，需要处理好各条件的关系。
   
    	2. 使用该方法会导致遮罩层显示时无法触发下拉刷新。

## #2020/06/09

##### 1. 会员绑定（滑块返回）后前往分享，返回时触发会员绑定请求的问题。

**原因：**

​	onShow 不能获取到参数 options 或 options 无变化的情况，如分享动作后返回小程序、安卓home键回到桌面后返回小程序等，options 将向上取前一次获取到的值。

1. 有scene且scene不同的两个动作先后触发不会出现该问题，如扫码进入后跳转其他小程序。

2. 有参数变化的动作不会出现该问题。如先后跳转两个小程序返回，scene同为1038但返回值不同；或分享返回小程序后跳转其他小程序后返回，分享返回无参数而小程序有。

**解决方案：**

​	新增全局变量 hasBinded 用于判断是否已经绑定。绑定后赋值为 true 。onShow 触发时先根据 hasBinded 判断是否已绑定，已绑定的不再发起绑定请求。

