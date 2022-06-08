const ProductModel = require('../model/prod')

class ProductController {
  static add = async (ctx, next) => {
    const product = ctx.request.body
    ctx.body = product
    try {
      const data = await ProductModel.create(product)
      ctx.body = {
        status: 0,
        data
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '添加产品异常, 请重新尝试'
      }
    }

    await next()
  }

  static list = async (ctx, next) => {
    const { pageNum, pageSize } = ctx.query
    const data = await ProductModel.find()
    if (data !== null) {
      ctx.body = {
        status: 0,
        data: ctx.pageFilter(data, pageNum, pageSize)
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '获取商品列表异常, 请重新尝试'
      }
    }
  }
}

module.exports = ProductController