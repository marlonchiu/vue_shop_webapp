// Mongoose是一个开源的封装好的实现Node和MongoDB数据通讯的数据建模库
const mongoose = require('mongoose')
const db = 'mongodb://localhost/smile-db'
/**
 * glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件。
 * resolve: 将一系列路径或路径段解析为绝对路径。
 */
const glob = require('glob')
const { resolve } = require('path')

// 可以一次性引入所有的Schema文件
// 使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}

// mongoose.Promise = global.Promise

/**
 * 当连接断开时，我们需要把连接次数加1，
 * 并重新连接数据库。当重连次数超过3次后，
 * 我们抛出了异常，并用reject()通知了promise
 */
exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', (err) => {
      console.log('***********数据库断开***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        // 进行重连
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    // 数据库出现错误的时候
    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })

    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })
}
