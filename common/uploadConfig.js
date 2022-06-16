const multer = require('@koa/multer')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, '..', 'public/upload')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, function (err) {
        if (!err) {
          cb(null, dirPath)
        }
      })
    } else {
      cb(null, dirPath)
    }
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})
const upload = multer({ storage })
module.exports = uploadSingle = upload.single('image')