const Mock = require('mockjs')

const util = require('./util')

module.exports = function (app) {
  // 监听请求
  app.get('/api/index', (req, res) => {
    // 响应时，返回 mock data的json数据
    const mockJson = util.getJsonFile('./data.json')
    // 将json传入 Mock.mock 方法中，生成的数据返回给浏览器
    res.json(Mock.mock(mockJson))
  })
}
