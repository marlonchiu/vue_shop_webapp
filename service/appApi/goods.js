const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()
const fs = require('fs')

router.get('/', async (ctx) => {
  ctx.body = '这是goods操作首页'
})

// 插入商品信息
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf-8', (err, data) => {
    console.log(err)
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })

  ctx.body = '开始导入数据'
})

module.exports = router
