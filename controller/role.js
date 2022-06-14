const RoleModel = require('../model/role')

class RoleController {
  static add = async (ctx, next) => {
    const { roleName } = ctx.request.body
    try {
      const data = await RoleModel.create({ name: roleName })
      ctx.body = {
        status: 0,
        data
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '添加角色异常, 请重新尝试'
      }
    }

    await next()
  }
}

module.exports = RoleController