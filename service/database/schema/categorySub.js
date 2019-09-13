const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySubSchema = new Schema({
  ID: { unique: true, type: String },
  MALL_CATEGORY_ID: { type: String },
  MALL_SUB_NAME: { type: String },
  TYPE: { type: Number },
  SORT: { type: Number },
  COMMENTS: { type: String }
}, {
  collection: 'categorySubs'
})

mongoose.model('CategorySub', categorySubSchema)
