const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/sina_cms_koa', { useNewUrlParser: true }).then(() => {
    console.log('数据库连接成功!')
  }).catch(error => {
    console.error('数据库连接失败', error)
  })
}