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

  static update = async (ctx, next) => {
    const { categoryId, categoryName } = ctx.request.body
    try {
      await CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName})
      ctx.body = {
        status: 0
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '更新分类名称异常, 请重新尝试'
      }
    }

    await next()
  }

  static info = async (ctx, next) => {
    const categoryId = ctx.query.categoryId
    const data = await CategoryModel.findOne({ _id: categoryId })
    if (data !== null) {
      ctx.body = {
        status: 0,
        data
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '获取分类信息异常, 请重新尝试'
      }
    }
  }
}

module.exports = CategoryController