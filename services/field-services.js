// 引入資料表 model
const { Field, Category, Comment, User } = require('../models/index.js')

// 載入所需的工具
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
const { filterKeyword } = require('../helpers/array-helpers.js')
const { Op, literal } = require('sequelize') // 引入 sequelize 查詢符、啟用 SQL 語法

const fieldController = {
  getFields: (req, cb) => {
    const DEFAULT_LIMIT = 12 // 預設每頁顯示幾筆資料
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1 // 預設第一頁或從query string拿資料
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預設每頁顯示資料數或從query string拿資料
    const offset = getOffset(limit, page)
    const keyword = req.query.keyword ? req.query.keyword.trim() : '' // 取得並修剪關鍵字
    const whereClause = {
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
    }

    // 關聯出使用者收藏的案場
    const userAuthId = req.user.id
    const includeClause = [{ model: Field, as: 'FavoritedFields' }]

    return Promise.all([
      Field.findAndCountAll({
        raw: true,
        offset,
        limit,
        where: whereClause,
        include: [Category],
        nest: true,
        order: [['id', 'DESC']]
      }),
      Category.findAll({ raw: true }),
      User.findByPk(userAuthId, {
        include: includeClause
      })
    ])
      .then(([fields, categories, userAuth]) => {
        const favoritedFieldsId = userAuth?.FavoritedFields ? userAuth.FavoritedFields.map(fr => fr.id) : []

        const data = fields.rows.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        return cb(null, {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.count),
          isSearched: '/fields', // 決定搜尋表單發送位置為 index 頁面
          keyword,
          find: 'fields'
        })
      })
      .catch(err => cb(err))
  },
  getField: (req, cb) => {
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
        return cb(null, { field, isFavorited })
      })
      .catch(err => cb(err))
  },
  getDashboard: (req, cb) => {
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

        return cb(null, { field: field.toJSON(), isFavorited })
      })
      .catch(err => cb(err))
  },
  getFeeds: (req, cb) => {
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
        return cb(null, { fields, comments })
      })
      .catch(err => cb(err))
  },
  getFavorites: (req, cb) => {
    const userAuthId = req.user.id
    const DEFAULT_LIMIT = 12 // 預設每頁顯示幾筆資料
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1 // 預設第一頁或從query string拿資料
    const limit = Number(req.query.limit) || DEFAULT_LIMIT // 預設每頁顯示資料數或從query string拿資料
    const offset = getOffset(limit, page)
    return Promise.all([
      Category.findAll({ raw: true }),
      User.findByPk(userAuthId, {
        include: [
          { // 收藏的案場
            model: Field,
            as: 'FavoritedFields',
            order: [['createdAt', 'DESC']] // 指定按照 createdAt 字段降序排序
          }]
      })
    ])
      .then(([categories, userAuth]) => {
        userAuth = userAuth.toJSON()

        // 取得使用者收藏案場
        let fields = userAuth.FavoritedFields || []

        // 取得並修剪關鍵字
        const keyword = req.query.keyword ? req.query.keyword.trim() : ''

        // 如果偵測到有輸入關鍵字, 則依其進行 filter
        if (keyword.length > 0) fields = filterKeyword(fields, keyword)

        // 如果偵測到 categoryId 有輸入數值, 則依其進行 filter
        if (typeof categoryId === 'number') {
          fields = fields.filter(field => field.categoryId === categoryId)
        }

        const data = fields
          .slice(offset, offset + limit) // 對案場進行分頁
          .sort((a, b) => new Date(b.id) - new Date(a.id)) // 對案場列表進行排序

        return cb(null, {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.length),
          isSearched: '/fields/favorites', // 決定搜尋表單發送位置為 favorites頁面
          keyword,
          find: 'fields'
        })
      })
      .catch(err => cb(err))
  },
  getTrecs: (req, cb) => {
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
        return cb(null, { fieldsTotal, fieldsTrans, fieldsRemain })
      })
      .catch(err => cb(err))
  },
  getTopFields: (req, cb) => {
    // 關聯出使用者收藏的案場
    const userAuthId = req.user.id
    const includeClause = [{ model: Field, as: 'FavoritedFields' }]
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
      }),
      User.findByPk(userAuthId, {
        include: includeClause
      })
    ])
      .then(([fieldsFC, fieldsCC, userAuth]) => {
        if (!fieldsFC) throw new Error('案場不存在!')
        if (!fieldsCC) throw new Error('案場不存在!')

        // 判別查詢的案場是否在使用者的收藏案場名單
        const favoritedFieldsId = userAuth?.FavoritedFields ? userAuth.FavoritedFields.map(fr => fr.id) : []

        const dataFC = fieldsFC.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        const dataCC = fieldsCC.map(r => ({
          ...r,
          isFavorited: favoritedFieldsId.includes(r.id)
        }))

        return cb(null, { fieldsFC: dataFC, fieldsCC: dataCC })
      })
      .catch(err => cb(err))
  }
}

module.exports = fieldController
