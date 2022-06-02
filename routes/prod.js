const router = require('koa-router')()

const ProductController = require('../controller/prod')

router.prefix('/manage/product')

//添加商品
router.post('/add', ProductController.add)

module.exports = router