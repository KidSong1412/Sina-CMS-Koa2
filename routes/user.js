const router = require('koa-router')()

const UserController = require('../controller/user')

router.prefix('/manage/users')

//添加用户
router.post('/add', UserController.add)

module.exports = router
