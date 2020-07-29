# Deno 学习日志

## 一、概念

> 官网 https://deno.land/

一个安全的 `JavaScript` 和 `TypeScript` 的运行时（A **secure** runtime for **JavaScript** and **TypeScript**）。

## 二、vs Node

1. 不再使用 `npm`（node_modules 地狱）；
2. 不再使用 `package.json`；
3. 所有异步调用都返回 Promise ；
4. 对于资源存取需要单独授权（类似 Android）；
5. 第三方模块通过 URL 导入，`import { serve } from 'https://deno.land/std@0.62.0/http/server.ts';`

## 三、特点

1. 沙盒机制，更安全的运行环境 (file, net, ...)
2. 原生支持 JavaScript 和 TypeScript
3. 异步处理采用 Promise
4. 仅一个可执行文件
5. 内置多种工具
6. 有一套可信赖的标准库
7. ...

## 四、安装



## 五、运行

  ```
# Error
deno run welcome.ts
# 授权运行
deno run --allow-net welcome.ts
  ```



