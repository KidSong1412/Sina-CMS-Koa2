const pageFilter = (dataArr, pageNum, pageSize) => {
  pageNum = pageNum * 1
  pageSize = pageSize * 1
  const total = dataArr.length
  const pages = Math.floor((total + pageSize - 1) / pageSize)
  const start = pageSize * (pageNum - 1)
  const end = start + pageSize <= total ? start + pageSize : total
  const list = []
  for (let i = start; i < end; i++) {
    list.push(dataArr[i])
  }

  return {
    pageNum,
    pageSize,
    total,
    pages,
    list
  }
}

module.exports = {
  pageFilter
}