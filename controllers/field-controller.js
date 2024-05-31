// 引入資料表 model
const { Field, Category } = require('../models')

// 載入所需的工具
const { getOffset, getPagination } = require('../helpers/pagination-helper.js')

const fieldController = {
  getFields: (req, res, next) => {
    const DEFAULT_LIMIT = 12 // 預設每頁顯示幾筆資料
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1 // 預設第一頁或從query string拿資料
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預設每頁顯示資料數或從query string拿資料
    const offset = getOffset(limit, page)
    return Promise.all([
      Field.findAndCountAll({
        raw: true,
        where: {
          // 展開運算子的優先級較低, 會比較慢判斷
          // 若 categoryId 存在, 則展開 {categoryId}; 若不存在則展開 {}
          ...categoryId ? { categoryId } : {}
        },
        offset,
        limit,
        include: [Category],
        nest: true,
        order: [['id', 'DESC']]
      }),
      Category.findAll({ raw: true })
    ])
      .then(([fields, categories]) => {
        const favoritedFieldsId = req.user?.FavoritedRestaurants ? req.user.FavoritedRestaurants.map(fr => fr.id) : []
        const data = fields.rows.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))
        return res.render('fields', {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.count)
        })
      })
      .catch(err => next(err))
  },
  getField: (req, res, next) => {
    return Field.findByPk(req.params.id, {
      include: [
        Category
        // { model: Comment, include: [{ model: User, attributes: { exclude: ['password'] } }] }, // 關聯 Comment model
        // { model: User, as: 'FavoritedUsers', attributes: { exclude: ['password'] } } // 關聯 User model
      ]
      // order: [[Comment, 'createdAt', 'DESC']]
    })
      // .then(field => {
      //   if (!field) throw new Error('該案場不存在!')
      //   // 每次查詢時, 使資料的 viewCounts + 1
      //   if (!field.viewCounts) { return field.update({ viewCounts: 1 }) }
      //   return field.increment('viewCounts', { by: 1 })
      // })
      .then(field => {
        // 防止使用者密碼外流
        field = field.toJSON()
        // const isFavorited = field.FavoritedUsers.some(f => f.id === req.user.id)
        return res.render('field', { field })
        // , isFavorited })
      })
      .catch(err => next(err))
  }
}

module.exports = fieldController
