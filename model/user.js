const mongoose = require('mongoose')
const md5 = require('blueimp-md5')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  create_time: {
    type: String,
    default: Date.now()
  },
  role_id: String
})

const UserModel = mongoose.model('user', userSchema)

UserModel.findOne({ username: 'admin' }).then( async (user) => {
  if (!user) {
    await UserModel.create({ username: 'admin', password: md5('admin') })
  }
})

module.exports = UserModel