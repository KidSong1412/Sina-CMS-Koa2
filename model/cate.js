const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: true,
    default: '0'
  }
})

const CategoryModel = mongoose.model('category', CategorySchema)

module.exports = CategoryModel