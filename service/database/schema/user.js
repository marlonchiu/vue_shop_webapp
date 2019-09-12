// 定义一个用户Schema

const mongoose = require('mongoose') // 引入Mongoose
const Schema = mongoose.Schema // 声明Schema
let ObjectId = Schema.Types.ObjectId // 声明Object类型

// 创建用户Schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: { unique: true, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
})

// 发布模型
mongoose.model('User', userSchema)
