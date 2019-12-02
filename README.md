# vue-ssr

## vue ssr 注意点
1. 组件、插件的一些生命周期，例如 mounted ，与页面挂载有关，代码在服务端渲染生成时会失效，在页面上挂载时才会真正生效。
2. 渲染服务器应符合 vue ssr 支持的语言。
3. 服务器的负载会变大，每次客户端请求都会生成一个 vue 实例。

## 依赖
1. vue-server-renderer: 渲染器
2. cross-env: 跨平台插件
3. webpack-node-externals
4. lodash.merge

## 项目结构

```
|-- public
|-- src
|   |-- main.js - SPA 程序入口
|   |-- app.js - ssr 入口，创建 vue 实例
|   |-- entry-server.js - 服务端入口，渲染首屏
|   |-- entry-client.js - 客户端入口，挂载、激活app
|-- server - 服务端脚本
```

## 构建流程
![构建流程图](./notes/imgs/1.png)

* Server Bundle: 后端收到请求后，首屏应该渲染哪个页面，把渲染的 html 传给浏览器。
* Client Bundle: 页面相关的 js 代码，与返回的 html 进行激活成 SPA。

<font color="red">需要注意:</font> 在构建服务端包时，需要保证是单独的入口 chunk。
```js
// 方式一：
module.exports = {
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  }
}

// 方法二：
module.exports = {
  configureWebpack: () => ({
    optimization: {
      splitChunks: TARGET_NODE ? false : undefined
    }
  })
}
```


