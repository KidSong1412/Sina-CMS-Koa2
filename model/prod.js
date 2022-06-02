const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  categoryId: {
    type: String,
    required: true
  }, //所属分类id
  pCategoryId: {
    type: String,
    required: true
  }, //所属分类的父类id
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  desc: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }, //商品状态: 1、在售, 2、已下架
  imgs: {
    type: Array,
    default: []
  }, //图片文件名的json字符串
  detail: {
    type: String
  }
})

const ProductModel = mongoose.model('product', ProductSchema)

module.exports = ProductModel