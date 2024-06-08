// 引入資料表 model
const { Field, Category, Comment, User } = require('../models')

// 載入所需的工具
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
const { getFieldsFilter } = require('../helpers/field-filter-helpers.js')
const { Op, literal } = require('sequelize') // 引入 sequelize 查詢符、啟用 SQL 語法

const fieldController = {
  getFields: (req, res, next) => {
    const DEFAULT_LIMIT = 12 // 預設每頁顯示幾筆資料
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1 // 預設第一頁或從query string拿資料
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預設每頁顯示資料數或從query string拿資料
    const offset = getOffset(limit, page)
    const keyword = req.query.keyword ? req.query.keyword.trim() : '' // 取得並修剪關鍵字

    return Promise.all([
      Field.findAndCountAll({
        raw: true,
        offset,
        limit,
        where: {
          // 展開運算子的優先級較低, 會比較慢判斷
          // 若 categoryId 存在, 則展開 {categoryId}; 若不存在則展開 {}
          ...categoryId ? { categoryId } : {},
          ...keyword.length > 0
            ? {
                [Op.or]: [
                  literal(`LOWER(Field.name) LIKE '%${keyword.toLowerCase()}%'`),
                  literal(`LOWER(Field.full_address) LIKE '%${keyword.toLowerCase()}%'`)
                ]
              }
            : {}
        },
        include: [Category],
        nest: true,
        order: [['id', 'DESC']]
      }),
      Category.findAll({ raw: true })
    ])
      .then(([fields, categories]) => {
        const favoritedFieldsId = req.user?.FavoritedFields ? req.user.FavoritedFields.map(fr => fr.id) : []

        const data = fields.rows.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        return res.render('fields', {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.count),
          isSearched: '/fields', // 決定搜尋表單發送位置為 index 頁面
          keyword
        })
      })
      .catch(err => next(err))
  },
  getField: (req, res, next) => {
    return Field.findByPk(req.params.id, {
      include: [
        Category,
        { model: Comment, include: [{ model: User, attributes: { exclude: ['password'] } }] }, // 關聯 Comment model
        { model: User, as: 'FavoritedUsers', attributes: { exclude: ['password'] } } // 關聯 User model
      ],
      order: [[Comment, 'createdAt', 'DESC']]
    })
      .then(field => {
        if (!field) throw new Error('該案場不存在!')
        field = field.toJSON()
        const isFavorited = field.FavoritedUsers.some(f => f.id === req.user.id)
        return res.render('field', { field, isFavorited })
      })
      .catch(err => next(err))
  },
  getDashboard: (req, res, next) => {
    return Field.findByPk(req.params.id, {
      include: [
        Category,
        { model: User, as: 'FavoritedUsers', attributes: { exclude: ['password'] } }, // 關聯 User model
        Comment
      ]
    })
      .then(field => {
        if (!field) throw new Error('該案場不存在!')
        const isFavorited = field.FavoritedUsers.some(f => f.id === req.user.id)

        // 每次查詢時, 使資料的 viewCounts + 1
        field.increment('viewCounts', { by: 1 })

        // 每次查詢時, 更新 commentCounts、favoriteCounts 的數字
        field.update({
          commentCounts: field.Comments.length,
          favoriteCounts: field.FavoritedUsers.length
        })

        return res.render('field-dashboard', { field: field.toJSON(), isFavorited })
      })
      .catch(err => next(err))
  },
  getFeeds: (req, res, next) => {
    return Promise.all([
      Field.findAll({
        limit: 5, // 只取前5筆資料
        order: [['createdAt', 'DESC'], ['id', 'ASC']], // 陣列第一個參數可指定關聯model, 若無可省略; 可放入多組陣列
        include: [Category], // 陣列第一個參數可指定關聯model, 若無可省略; 可放入多組陣列
        raw: true,
        nest: true
      }),
      Comment.findAll({
        limit: 10, // 只取前10筆資料
        order: [['createdAt', 'DESC'], ['id', 'ASC']],
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          Field],
        raw: true,
        nest: true
      })
    ])
      .then(([fields, comments]) => {
        if (!fields) throw new Error('該案場不存在!')
        if (!comments) throw new Error('該評論不存在!')
        return res.render('feeds', { fields, comments })
      })
      .catch(err => next(err))
  },
  getFavorites: (req, res, next) => {
    const DEFAULT_LIMIT = 12 // 預設每頁顯示幾筆資料
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1 // 預設第一頁或從query string拿資料
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預設每頁顯示資料數或從query string拿資料
    const offset = getOffset(limit, page)
    return Category.findAll({ raw: true })
      .then(categories => {
        // 取得使用者收藏案場
        let fields = req.user.FavoritedFields || []

        // 取得並修剪關鍵字
        const keyword = req.query.keyword ? req.query.keyword.trim() : ''

        // 如果偵測到有輸入關鍵字, 則依其進行 filter
        if (keyword.length > 0) fields = getFieldsFilter(fields, keyword)

        // 如果偵測到 categoryId 有輸入數值, 則依其進行 filter
        if (typeof categoryId === 'number') {
          fields = fields.filter(field => field.categoryId === categoryId)
        }

        const data = fields
          .slice(offset, offset + limit) // 對案場進行分頁
          .sort((a, b) => new Date(b.id) - new Date(a.id)) // 對案場列表進行排序

        return res.render('favorites', {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.length),
          isSearched: '/fields/favorites', // 決定搜尋表單發送位置為 favorites頁面
          keyword
        })
      })
      .catch(err => next(err))
  },
  getTrecs: (req, res, next) => {
    return Promise.all([
      Field.findAll({
        limit: 10, // 只取前10筆資料
        order: [['totalAmount', 'DESC'], ['id', 'ASC']],
        include: [Category],
        raw: true,
        nest: true
      }),
      Field.findAll({
        limit: 10, // 只取前10筆資料
        order: [['transAmount', 'DESC'], ['id', 'ASC']],
        include: [Category],
        raw: true,
        nest: true
      }),
      Field.findAll({
        limit: 10, // 只取前10筆資料
        order: [['remainAmount', 'DESC'], ['id', 'ASC']],
        include: [Category],
        raw: true,
        nest: true
      })

    ])
      .then(([fieldsTotal, fieldsTrans, fieldsRemain]) => {
        if (!fieldsTotal) throw new Error('案場不存在!')
        if (!fieldsTrans) throw new Error('案場不存在!')
        if (!fieldsRemain) throw new Error('案場不存在!')
        return res.render('trecs', { fieldsTotal, fieldsTrans, fieldsRemain })
      })
      .catch(err => next(err))
  },
  getTopFields: (req, res, next) => {
    return Promise.all([
      Field.findAll({
        order: [['favoriteCounts', 'DESC'], ['id', 'DESC']],
        limit: 10,
        raw: true
      }),
      Field.findAll({
        order: [['commentCounts', 'DESC'], ['id', 'DESC']],
        limit: 10,
        raw: true
      })
    ])
      .then(([fieldsFC, fieldsCC]) => {
        if (!fieldsFC) throw new Error('案場不存在!')
        if (!fieldsCC) throw new Error('案場不存在!')

        // 判別查詢的案場是否在使用者的收藏案場名單
        const favoritedFieldsId = req.user?.FavoritedFields ? req.user.FavoritedFields.map(fr => fr.id) : []

        const dataFC = fieldsFC.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        const dataCC = fieldsCC.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        return res.render('top-fields', { fieldsFC: dataFC, fieldsCC: dataCC })
      })
      .catch(err => next(err))
  }
}

module.exports = fieldController
