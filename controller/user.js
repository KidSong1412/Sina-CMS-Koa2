const md5 = require('blueimp-md5')
const UserModel = require('../model/user')
const RoleModel = require('../model/role')

class UserController {
  static add = async (ctx, next) => {
    const { username, password } = ctx.request.body
    const user = await UserModel.findOne({ username })
    if (user.length) {
      ctx.body = {
        status: 1,
        msg: '此用户已存在'
      }
    } else {
      const res = await UserModel.create({ ...ctx.request.body, password: md5(password) })
      if (res.length) {
        ctx.body = {
          status: 0,
          data: res
        }
      } else {
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
    const UserData = await UserModel.findOneAndUpdate({ _id: user._id }, user, { "fields": {
      "username": 1,
      "create_time": 1
    }})
    if (UserData.length) {
      const data = Object.assign(UserData, user)
      ctx.body = {
        status: 0,
        data
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '更新用户异常, 请重新尝试'
      }
    }

    await next()
  }

  static delete = async (ctx, next) => {
    const { userId } = ctx.request.body
    const res = await UserModel.deleteOne({ _id: userId })
    if (res.length) {
      ctx.body = {
        status: 0
      }
    }

    await next()
  }

  static list = async (ctx, next) => {
    const users = await UserModel.find({ username: { '$ne': 'admin' } })
    ctx.body = users
    if (users.length) {
      RoleModel.find().then(roles => {
        ctx.body = {
          status: 0,
          data: {
            users,
            roles
          }
        }
      }).catch(error => {
        ctx.body = {
          status: 1,
          msg: '获取用户列表异常, 请重新尝试'
        }
      })
    } else {
      ctx.body = 2
    }
  }
}

module.exports = UserController