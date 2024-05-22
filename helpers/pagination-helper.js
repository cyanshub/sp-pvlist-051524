// 計算偏移量: 搭配 sequelize 查詢的偏移功能
const getOffset = (limit = 10, page = 1) => (page - 1) * limit // 回傳篇移量

// 計算頁碼器所需資訊:頁碼陣列、總共幾頁、在第幾頁、下一頁、上一頁
const getPagination = (limit = 10, page = 1, total = 100) => {
  const totalPage = Math.ceil(total / limit)
  const pages = Array.from({ length: totalPage }, (_, index) => index + 1)
  const currentPage = page < 1 ? 1 : page < totalPage ? page : totalPage
  const prev = currentPage - 1 < 1 ? 1 : currentPage - 1
  const next = currentPage + 1 > totalPage ? totalPage : currentPage + 1

  return {
    pages, totalPage, currentPage, prev, next
  }
}

module.exports = { getOffset, getPagination }
