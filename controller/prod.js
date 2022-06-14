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

    await next()
  }

  static search = async (ctx, next) => {
    const {pageNum, pageSize, productName, productDesc} = ctx.query
    let condition = {}
    if (productName) {
      condition = { name: new RegExp(`^.*${productName}.*$`) }
    } else if (productDesc) {
      condition = { desc: new RegExp(`^.*${productDesc}.*$`) }
    }
    const data = await ProductModel.find(condition)
    if (data !== null) {
      ctx.body = {
        status: 0,
        data: ctx.pageFilter(data, pageNum, pageSize)
      }
    } else {
      ctx.body = {
        status: 1,
        msg: '搜索商品列表异常, 请重新尝试'
      }
    }

    await next()
  }

  static update = async (ctx, next) => {
    const product = ctx.request.body
    try {
      await ProductModel.findOneAndUpdate({ _id: product._id }, product)
      ctx.body = {
        status: 0
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '更新商品名称异常, 请重新尝试'
      }
    }
    
    await next()
  }

  static updateStatus = async (ctx, next) => {
    const { productId, status } = ctx.request.body
    try {
      await ProductModel.findOneAndUpdate({ _id: productId }, { status })
      ctx.body = {
        status: 0
      }
    } catch (e) {
      ctx.body = {
        status: 1,
        msg: '更新产品状态异常, 请重新尝试'
      }
    }

    await next()
  }
}

module.exports = ProductController