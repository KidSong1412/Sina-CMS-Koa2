const UserModel = require('../model/user')
const md5 = require('blueimp-md5')

class UserController {
  static add = async (ctx, next) => {
    const { username, password } = ctx.request.body
    const user = await UserModel.findOne({ username })
    if (user) {
      ctx.body = {
        status: 1,
        msg: '此用户已存在'
      }
    } else {
      const res = await UserModel.create({ ...ctx.request.body, password: md5(password) })
      if (res) {
        ctx.body = {
          status: 0,
          data: res
        }
      } else {
        ctx.body({
          status: 1,
          msg: '添加用户异常, 请重新尝试'
        })
      }
    }
    
    await next()
  }
}

module.exports = UserController