const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')

const db = require('./config/db')
const index = require('./routes/index')
const user = require('./routes/user')

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

module.exports = app
