const router = require('koa-router')()

const CategoryController = require('../controller/cate')

router.prefix('/manage/category')

//添加分类
router.post('/add', CategoryController.add)
//获取分类
router.get('/list', CategoryController.list)

module.exports = router