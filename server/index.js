const express = require('express')
const Vue = require('Vue')
const renderer = require('vue-server-renderer').createRenderer() // 创建渲染器,把 vue 实例用渲染器渲染得到具体 html

const app = express()

const page = new Vue({
  template: `
    <div>
      <h1>{{title}}</h1>
      <div>hello, vue ssr!</div>
    </div>
  `,
  data () {
    return {
      title: '哦豁'
    }
  }
})

app.get('/', async (req, res) => {
  try {
    const html = await renderer.renderToString(page)
    console.log(html)
    res.send(html)
  } catch (err) {
    console.log(err)
    res.status(500).send('服务器内部错误')
  }
})

app.listen(3000, '0.0.0.0', () => {
  console.log('渲染服务器启动成功')
})
