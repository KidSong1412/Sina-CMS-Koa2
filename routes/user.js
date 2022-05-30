const router = require('koa-router')()

const UserController = require('../controller/user')

router.prefix('/manage/users')

//添加用户
router.post('/add', UserController.add)
//更新用户
router.post('/update', UserController.update)
//删除用户
router.post('/delete', UserController.delete)
//获取所有用户列表
router.get('/list', UserController.list)

module.exports = router
