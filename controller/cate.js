const CategoryModel = require('../model/cate')

class CategoryController {
  static add = async (ctx, next) => {
    const { categoryName, parentId } = ctx.request.body
    try {
      const data = await CategoryModel.create({
        name: categoryName,
        parentId: parentId || '0'
      })
      ctx.body = {
        status: 0,
        data
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '添加分类异常, 请重新尝试'
      }
    }

    await next()
  }

  static list = async (ctx, next) => {
    const parentId = ctx.query.parentId || '0'
    try {
      const data = await CategoryModel.find({ parentId })
      ctx.body = {
        status: 0,
        data
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '获取分类列表异常, 请重新尝试'
      }
    }

    await next()
  }
}

module.exports = CategoryController