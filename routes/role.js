const router = require('koa-router')()

const RoleController = require('../controller/role')

router.prefix('/manage/role')

//添加角色
router.post('/add', RoleController.add)
//获取角色列表
router.get('/list', RoleController.list)
//更新角色(设置权限)
router.post('/update', RoleController.update)

module.exports = router