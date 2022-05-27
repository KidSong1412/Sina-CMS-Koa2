const router = require('koa-router')()
const LoginController = require('../controller/login')

router.post('/login', LoginController)

module.exports = router
