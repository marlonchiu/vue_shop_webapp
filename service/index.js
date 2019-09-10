const Koa = require('koa')
const app = new Koa()

const { connect } = require('./database/init.js')

// 立即执行函数
; (async () => {
  await connect()
})()

// 验证测试是否连接成功
app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
