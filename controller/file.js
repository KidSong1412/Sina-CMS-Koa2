class FileController {
  static upload = async (ctx, next) => {

    await next()
  }
}

module.exports = FileController