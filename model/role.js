const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  }, //角色名称
  auth_name: String, //授权人
  auth_time: Number, //授权时间
  create_time: {
    type: Number,
    default: Date.now()
  },
  menus: Array //所有有权限操作的菜单path的数组
})

const RoleModel = mongoose.model('role', RoleSchema)

module.exports = RoleModel