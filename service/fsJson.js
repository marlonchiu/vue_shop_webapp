// 数据提纯操作
const fs = require('fs')

fs.readFile('./data_json/goods.json', 'utf-8', function (err, data) {
  console.log(err)
  let newData = JSON.parse(data)
  let pushData = []
  let i = 0
  newData.RECORDS.map(function (value, index) {
    if (value.IMAGE1 != null) {
      i++
      console.log(value.NAME)
      pushData.push(value)
    }
  })
  console.log(i)
  // console.log(pushData)
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (error) {
    if (error) console.log('写文件操作失败')
    else console.log('写文件操作成功')
  })
})
