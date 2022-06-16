const router = require('koa-router')()

const FileController = require('../controller/file')

router.prefix('/manage/img')

//上传图片
router.post('/upload', FileController.upload)
//删除图片
router.post('/delete', FileController.delete)

module.exports = router