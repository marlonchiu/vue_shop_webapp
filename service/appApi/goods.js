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

  ctx.body = '开始导入商品信息数据'
})

// 插入商品大类信息
router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf-8', (err, data) => {
    console.log(err)
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      // console.log(value)
      let newCategory = new Category(value)
      // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })

  ctx.body = '开始导入商品大类数据...'
})

// 插入商品子类信息
router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf-8', (err, data) => {
    console.log(err)
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      // console.log(value)
      let newCategorySub = new CategorySub(value)
      // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })

  ctx.body = '开始导入商品子类数据...'
})

// 获取商品详情信息的接口
router.post('/getDetailGoodsInfo', async (ctx) => {
  try {
    let goodsId = ctx.request.body.goodsId
    console.log(goodsId)
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ ID: goodsId }).exec()
    ctx.body = { code: 200, message: result }
  } catch (error) {
    ctx.body = { code: 500, message: error }
  }
})

module.exports = router
