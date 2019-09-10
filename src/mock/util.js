const fs = require('fs')
const path = require('path')
module.exports = {
  // 用于被index.js进行调用
  getJsonFile(filePath) {
    // 读取指定的json文件
    const json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    console.log(json)
    return JSON.parse(json)
  }
}
