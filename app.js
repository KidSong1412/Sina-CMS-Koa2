const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')

const db = require('./config/db')
const indexRoute = require('./routes/index')
const userRoute = require('./routes/user')
const cateRoute = require('./routes/cate')
const prodRoute = require('./routes/prod')
const roleRoute = require('./routes/role')
const fileRoute = require('./routes/file')

const { pageFilter } = require('./common/common')

//跨域配置
app.use(cors({
  origin: function(ctx) {
    return 'http://localhost:3000';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

//数据库连接
db()

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))


// routes
app.use(indexRoute.routes(), indexRoute.allowedMethods())
app.use(userRoute.routes(), userRoute.allowedMethods())
app.use(cateRoute.routes(), cateRoute.allowedMethods())
app.use(prodRoute.routes(), prodRoute.allowedMethods())
app.use(roleRoute.routes(), roleRoute.allowedMethods())
app.use(fileRoute.routes(), fileRoute.allowedMethods())

//common
app.context.pageFilter = pageFilter

module.exports = app
