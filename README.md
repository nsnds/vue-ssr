# vue-ssr

#### vue ssr 注意点
1. 组件、插件的一些生命周期，例如 mounted ，与页面挂载有关，代码在服务端渲染生成时会失效，在页面上挂载时才会真正生效。
2. 渲染服务器应符合 vue ssr 支持的语言。
3. 服务器的负载会变大，每次客户端请求都会生成一个 vue 实例。
