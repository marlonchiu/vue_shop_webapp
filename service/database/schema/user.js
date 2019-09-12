// 定义一个用户Schema
const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 声明Schema
let ObjectId = Schema.Types.ObjectId // 声明Object类型
const bcrypt = require('bcrypt') // 数据加密加盐处理
const SALT_WORK_FACTOR = 10

// 创建用户Schema
const userSchema = new Schema({
  userId: { type: ObjectId },
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, { // 数据库默认集合会加s，这里为了保持一致，设置集合名字
  collection: 'user'
})
// 每次存储数据时都要执行
userSchema.pre('save', function (next) {
  // let user = this  this就是user
  console.log(this)
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

// 登录的比对实例方法
userSchema.methods = {
  // 密码比对的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
/**
 * 上面的代码声明了一个实例方法，方法叫做comparePassword，
 * 然后传递两个参数，一个是客户端密码，一个是数据库取出来的密码。
 * 用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了
 */

// 发布模型
mongoose.model('User', userSchema)
