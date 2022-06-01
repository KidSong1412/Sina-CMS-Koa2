const md5 = require('blueimp-md5')
const UserModel = require('../model/user')
const RoleModel = require('../model/role')

class UserController {
  static add = async (ctx, next) => {
    const { username, password } = ctx.request.body
    const user = await UserModel.findOne({ username })
    if (user !== null) {
      ctx.body = {
        status: 1,
        msg: '此用户已存在'
      }
    } else {
      try {
        const res = await UserModel.create({ ...ctx.request.body, password: md5(password) })
        ctx.body = {
          status: 0,
          data: {
            _id: res._id,
            username: res.username,
            create_time: res.create_time
          }
        }
      } catch (e) {
        ctx.body = {
          status: 1,
          msg: '添加用户异常, 请重新尝试'
        }
      }
    }
    
    await next()
  }

  static update = async (ctx, next) => {
    const user = ctx.request.body
    try {
      const UserData = await UserModel.findOneAndUpdate({ _id: user._id }, user, { "fields": {
        "username": 1,
        "create_time": 1
      }})
      ctx.body = {
        status: 0,
        data: UserData
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '更新用户异常, 请重新尝试'
      }
    }

    await next()
  }

  static delete = async (ctx, next) => {
    const { userId } = ctx.request.body
    try {
      await UserModel.deleteOne({ _id: userId })
      ctx.body = {
        status: 0
      }
    } catch (e) {}

    await next()
  }

  static list = async (ctx, next) => {
    const users = await UserModel.find({ username: { '$ne': 'admin' } }, {
      "username": 1,
      "create_time": 1
    })
    if (users !== null) {
      const roles = await RoleModel.find()
      if (roles !== null) {
        ctx.body = {
          status: 0,
          data: {
            users,
            roles
          }
        }
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '获取用户列表异常, 请重新尝试'
      }
    }
  }
}

module.exports = UserController