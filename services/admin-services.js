// 引入資料表 model
const { Field, User, Category } = require('../models/index.js')

// 載入所需的工具
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
const { localFileHandler } = require('../helpers/file-helpers.js')
const { Op, literal } = require('sequelize')

const adminServices = {
  // 案場相關
  createField: (req, cb) => {
    return Category.findAll({ raw: true })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  getFields: (req, cb) => {
    const DEFAULT_LIMIT = 10
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
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

    return Promise.all([
      Field.findAndCountAll({
        where: whereClause,
        raw: true,
        offset,
        limit,
        nest: true,
        order: [['id', 'DESC']],
        include: [Category] // 查資料時, 由 include 把有關資料資料一併帶出
      }),
      Category.findAll({ raw: true })
    ])
      .then(([fields, categories]) => {
        const data = fields.rows

        return cb(null, {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.count),
          isSearched: '/admin/fields', // 決定搜尋表單發送位置為後台 index 頁面
          keyword,
          find: 'fields',
          count: fields.count // 用於 pagination-toggle
        })
      })
      .catch(err => cb(err))
  },
  postField: (req, cb) => {
    const { name, categoryId, fullAddress, totalAmount, transAmount } = req.body
    const file = req.file // 根據之前修正的form content, 把檔案從req取出來

    // 檢驗必填欄位是否存在
    if (!name) throw Object.assign(new Error('案場名稱為必填欄位!'), { status: 422 })

    // 檢查鄉鎮市區格式
    const localFormat = fullAddress.trim().slice(0, 5) === '新竹市東區' ? fullAddress.trim().slice(4, 5) : fullAddress.trim().slice(5, 6)
    if (!['鄉', '鎮', '市', '區'].includes(localFormat)) {
      throw Object.assign(new Error('地址開頭請提供縣市及鄉鎮市區!'), { status: 422 })
    }

    // 把取出的檔案 file 傳給 file-helper 處理
    return localFileHandler(file)
      .then(filePath => {
        return Field.create({
          name,
          totalAmount: totalAmount || 0,
          transAmount: transAmount || 0,
          remainAmount: totalAmount - transAmount,
          fullAddress,
          local: fullAddress.trim().slice(0, 5) === '新竹市東區' ? fullAddress.slice(0, 5) : fullAddress.slice(0, 6),
          categoryId,
          cover: filePath || null
        })
      })
      .then(newField => cb(null, { field: newField }))
      .catch(err => cb(err))
  },
  getField: (req, cb) => {
    return Field.findByPk(Number(req.params.id), {
      raw: true,
      include: ['Category'],
      nest: true
    })
      .then(field => {
        if (!field) throw Object.assign(new Error('該案場不存在!'), { status: 404 })
        return cb(null, { field })
      })
  },
  editField: (req, cb) => {
    Promise.all([
      Field.findByPk(Number(req.params.id), { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([field, categories]) => {
        if (!field) throw Object.assign(new Error('該案場不存在!'), { status: 404 })
        return cb(null, { field, categories })
      })
      .catch(err => { cb(err) })
  },
  putField: (req, cb) => {
    const { name, categoryId, fullAddress, totalAmount, transAmount } = req.body
    if (!name) throw Object.assign(new Error('案場名稱為必填欄位!'), { status: 422 })// 檢驗必填欄位是否存在
    const file = req.file // 拿到 middleware: multer 上傳的圖片
    // 使用 Promise.all 語法, 待所有非同步事件處理完才跳入下一個.then()
    // Promise.all([非同步A, 非同步B]).then(([A結果, B結果]) => {...})
    return Promise.all([
      Field.findByPk(Number(req.params.id)),
      localFileHandler(file)
    ])
      .then(([field, filePath]) => {
        if (!field) throw Object.assign(new Error('該案場不存在!'), { status: 404 })
        return field.update({
          name,
          totalAmount: totalAmount || 0,
          transAmount: transAmount || 0,
          remainAmount: totalAmount - transAmount,
          fullAddress,
          local: fullAddress.trim().slice(0, 5) === '新竹市東區' ? fullAddress.slice(0, 5) : fullAddress.slice(0, 6),
          categoryId,
          cover: filePath || field.cover
        })
      })
      .then(editField => cb(null, { field: editField }))
      .catch(err => cb(err))
  },
  deleteField: (req, cb) => {
    return Field.findByPk(Number(req.params.id))
      .then(field => {
        if (!field) throw Object.assign(new Error('該案場不存在!'), { status: 404 })
        return field.destroy()
      })
      .then(deleteField => cb(null, { filed: deleteField }))
      .catch(err => cb(err))
  },

  // 使用者相關
  getUsers: (req, cb) => {
    const DEFAULT_LIMIT = 10
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    const keyword = req.query.keyword ? req.query.keyword.trim() : '' // 取得並修剪關鍵字
    const whereClause = {
      ...keyword.length > 0
        ? {
            [Op.or]: [
              literal(`LOWER(User.name) LIKE '%${keyword.toLowerCase()}%'`),
              literal(`LOWER(User.email) LIKE '%${keyword.toLowerCase()}%'`)
            ]
          }
        : {}

    }

    return User.findAndCountAll({
      offset,
      limit,
      where: whereClause,
      raw: true,
      attributes: { exclude: ['password'] }
    })
      .then(users => {
        const data = users.rows
        return cb(null, {
          users: data,
          pagination: getPagination(limit, page, users.count),
          isSearched: '/admin/users', // 決定搜尋表單發送位置
          keyword,
          find: 'users',
          count: users.count // 用於 pagination-toggle
        })
      })
      .catch(err => cb(err))
  },
  patchUser: (req, cb) => {
    return User.findByPk(Number(req.params.id), {
      // 避免密碼資料外洩
      attributes: { exclude: ['password'] }
    })
      .then(user => {
        // 檢查使用者是否存在
        if (!user) throw Object.assign(new Error('使用者不存在!'), { status: 404 })
        if (user.email === 'root@example.com') {
          throw Object.assign(new Error('禁止變更 root 使用者權限!'), { status: 403 })
        }
        return user.update({
          isAdmin: !user.isAdmin
        })
      })
      .then(editedUser => cb(null, { user: editedUser }))
      .catch(err => cb(err))
  },

  // 案場類別相關
  getCategories: (req, cb) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(Number(req.params.id), { raw: true }) : null
    ])
      .then(([categories, category]) => cb(null, { categories, category }))
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    const { name } = req.body
    // 檢查類別名稱
    if (!name) throw Object.assign(new Error('請輸入類別名稱!'), { status: 422 })
    if (name.trim().length === 0) {
      throw Object.assign(new Error('請勿輸入空白字串'), { status: 422 })
    }
    return Category.create({ name: name.trim() }) // 防止開頭輸入空白字串
      .then(newCategory => cb(null, { category: newCategory }))
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const { name } = req.body
    // 檢查類別名稱
    if (!name) throw Object.assign(new Error('請輸入類別名稱!'), { status: 422 })
    if (name.trim().length === 0) throw Object.assign(new Error('請勿輸入空白字串'), { status: 422 })
    return Category.findByPk(Number(req.params.id))
      .then(category => {
        if (!category) throw Object.assign(new Error('該類別不存在!'), { status: 404 })
        return category.update({ name: name.trim() }) // 防止開頭更新時輸入空白字串
      })
      .then(editedCategory => cb(null, { category: editedCategory }))
      .catch(err => cb(err))
  },
  deleteCategory: (req, cb) => {
    return Category.findByPk(Number(req.params.id))
      .then(category => {
        if (!category) throw Object.assign(new Error('該類別不存在!'), { status: 404 })
        return category.destroy()
      })
      .then(deletedCategory => cb(null, { category: deletedCategory }))
      .catch(err => cb(err))
  }
}

module.exports = adminServices
