const express = require('express')
const fs = require('fs')
const path = require('path')
// 创建渲染器,把 vue 实例用渲染器渲染得到具体 html
const { createBundleRenderer } = require('vue-server-renderer')

const app = express()

const serverBundle = require('../dist/server/vue-ssr-server-bundle.json')
// 客户端清单
const clientManifest = require('../dist/client/vue-ssr-client-manifest.json')
const renderer = createBundleRenderer(
  serverBundle,
  {
    runInNewContext: false,
    template: fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8'),
    clientManifest
  }
)

// 需要中间件处理静态文件请求
app.use(express.static(path.join(__dirname, '../dist/client'), { index: false }))

// 路由处理交给 vue
app.get('*', async (req, res) => {
  try {
    const context = {
      url: req.url,
      title: 'VUE SSR'
    }
    const html = await renderer.renderToString(context)
    console.log(html)
    res.send(html)
  } catch (err) {
    console.log(err)
    res.status(500).send('服务器内部错误')
  }
})

app.listen(3001, '0.0.0.0', () => {
  console.log('渲染服务器启动成功')
})
