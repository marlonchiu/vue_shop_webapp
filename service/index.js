const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
// 引入connect
const { connect, initSchemas } = require('./database/init.js')

// 立即执行函数
; (async () => {
  await connect()
  initSchemas()

  // 测试插入一条数据
  const User = mongoose.model('User')
  let oneUser = new User({ userName: 'jspang', password: '123456' })
  oneUser.save().then(() => {
    console.log('插入成功')
  })

  // 测试读取插入的数据
  let users = await User.findOne({}).exec()
  console.log('------------------')
  console.log(users)
  console.log('------------------')
})()

// 验证测试是否连接成功
app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})
