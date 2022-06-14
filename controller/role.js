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

  static list = async (ctx, next) => {
    const data = await RoleModel.find()
    if (data !== null) {
      ctx.body = {
        status: 0,
        data
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '获取角色列表异常, 请重新尝试'
      }
    }

    await next()
  }

  static update = async (ctx, next) => {
    const role = ctx.request.body
    role.auth_time = Date.now()
    try {
      const oldData = await RoleModel.findOneAndUpdate({ _id: role._id }, role)
      ctx.body = {
        status: 0,
        data: {...oldData._doc, ...role}
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '更新角色异常, 请重新尝试'
      }
    }

    await next()
  }
}

module.exports = RoleController