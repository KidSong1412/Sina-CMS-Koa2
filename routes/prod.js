const router = require('koa-router')()

const ProductController = require('../controller/prod')

router.prefix('/manage/product')

//添加商品
router.post('/add', ProductController.add)
//获取商品分页列表
router.get('/list', ProductController.list)
//搜索商品列表
router.get('/search', ProductController.search)
//更新商品
router.post('/update', ProductController.update)
//更新商品状态
router.post('/updateStatus', ProductController.updateStatus)

module.exports = router