const router = require('koa-router')()

const ProductController = require('../controller/prod')

router.prefix('/manage/product')

//添加商品
router.post('/add', ProductController.add)
//获取商品分页列表
router.get('/list', ProductController.list)

module.exports = router