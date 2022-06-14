const md5 = require('blueimp-md5')

const UserModel = require('../model/user')
const RoleModel = require('../model/role')

const LoginController = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const user = await UserModel.findOne({ username, password: md5(password) }, {
    "password": 0
  })
  if (user !== null) {
    ctx.cookies.set('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
    if (user.role_id) {
      const role = await RoleModel.findOne({ _id: user.role_id })
      if (role !== null) {
        user._doc.role = role
        ctx.body = {
          status: 0,
          data: user
        }
      }
    } else {
      user._doc.role = { menus: [] }
      ctx.body = {
        status: 0,
        data: user
      }
    }
  } else {
    ctx.body = {
      status: 1,
      msg: '用户名或密码不正确!'
    }
  }

  await next()
}

module.exports = LoginController