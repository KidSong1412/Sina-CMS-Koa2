const md5 = require('blueimp-md5')

const UserModel = require('../model/user')

const LoginController = async (ctx, next) => {
  const { username, password } = ctx.request.body
  const user = await UserModel.findOne({ username, password: md5(password) })
  if (user !== null) {
    ctx.cookies.set('userid', user._id, { maxAge: 1000 * 60 * 60 * 24 })
    // if (user.role_id) {} else {}

  } else {
    ctx.body = {
      status: 1,
      msg: '用户名或密码不正确!'
    }
  }

  await next()
}

module.exports = LoginController