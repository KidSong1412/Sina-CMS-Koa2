const uploadSingle = require('../common/uploadConfig')
const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, '..', 'public/upload')

class FileController {
  static upload = async (ctx, next) => {
    let err = await uploadSingle(ctx, next).then(res => res).catch(err => err)
    if (err) {
      ctx.body = {
        status: 1,
        msg: '上传文件失败'
      }
    } else {
      let file = ctx.request.file
      ctx.body = {
        status: 0,
        data: {
          name: file.filename,
          url: 'http://localhost:5000/upload/' + file.filename
        }
      }
    }
  }

  static delete = async (ctx, next) => {
    const { name } = ctx.request.body
    fs.unlink(path.join(dirPath, name), (err) => {
      if (err) {
        ctx.body = {
          status: 1,
          msg: '删除文件失败'
        }
      }
    })
    ctx.body = {
      status: 0
    }

    await next()
  }
}

module.exports = FileController