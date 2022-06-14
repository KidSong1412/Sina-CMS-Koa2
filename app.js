const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')

const db = require('./config/db')
const index = require('./routes/index')
const user = require('./routes/user')
const cate = require('./routes/cate')
const prod = require('./routes/prod')
const role = require('./routes/role')

const { pageFilter } = require('./common/common')

//数据库连接
db()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))


// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(cate.routes(), cate.allowedMethods())
app.use(prod.routes(), prod.allowedMethods())
app.use(role.routes(), role.allowedMethods())

//common
app.context.pageFilter = pageFilter

module.exports = app
