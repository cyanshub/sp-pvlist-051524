// 引入資料表 model
const { Field, User, Category } = require('../models')

// 載入所需的工具
const { getOffset, getPagination } = require('../helpers/pagination-helpers.js')
const { localFileHandler } = require('../helpers/file-helpers.js')
const { Op, literal } = require('sequelize')

const adminController = {
  // 案場相關
  createField: (req, res, next) => {
    return Category.findAll({ raw: true })
      .then(categories => res.render('admin/create-field', { categories }))
      .catch(err => next(err))
  },
  getFields: (req, res, next) => {
    const DEFAULT_LIMIT = 10
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)
    const keyword = req.query.keyword ? req.query.keyword.trim() : '' // 取得並修剪關鍵字

    return Promise.all([
      Field.findAndCountAll({
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

        return res.render('admin/fields', {
          fields: data,
          categories,
          categoryId,
          pagination: getPagination(limit, page, fields.count),
          isSearched: '/admin/fields', // 決定搜尋表單發送位置為後台 index 頁面
          keyword
        })
      })
      .catch(err => next(err))
  },
  postField: (req, res, next) => {
    const { name, categoryId, fullAddress, totalAmount, transAmount } = req.body
    const file = req.file // 根據之前修正的form content, 把檔案從req取出來

    // 檢驗必填欄位是否存在
    if (!name) throw new Error('案場名稱為必填欄位!')

    // 檢查鄉鎮市區格式
    const localFormat = fullAddress.trim().slice(0, 5) === '新竹市東區' ? fullAddress.trim().slice(4, 5) : fullAddress.trim().slice(5, 6)
    if (!['鄉', '鎮', '市', '區'].includes(localFormat)) throw new Error('地址開頭請提供縣市及鄉鎮市區!')

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
      .then(newField => {
        res.redirect('/admin')
        return { field: newField }
      })
      .catch(err => next(err))
  },
  getField: (req, res, next) => {
    return Field.findByPk(req.params.id, {
      raw: true,
      include: ['Category'],
      nest: true
    })
      .then(field => {
        if (!field) throw new Error('該案場不存在!')
        return res.render('admin/field', { field })
      })
  },
  editField: (req, res, next) => {
    Promise.all([
      Field.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([field, categories]) => {
        if (!field) throw new Error('該案場不存在!')
        res.render('admin/edit-field', { field, categories })
      })
      .catch(err => { next(err) })
  },
  putField: (req, res, next) => {
    const { name, categoryId, fullAddress, totalAmount, transAmount } = req.body
    if (!name) throw new Error('案場名稱為必填欄位!') // 檢驗必填欄位是否存在
    const file = req.file // 拿到 middleware: multer 上傳的圖片
    // 使用 Promise.all 語法, 待所有非同步事件處理完才跳入下一個.then()
    // Promise.all([非同步A, 非同步B]).then(([A結果, B結果]) => {...})
    return Promise.all([
      Field.findByPk(req.params.id),
      localFileHandler(file)
    ])
      .then(([field, filePath]) => {
        if (!field) throw new Error('該案場不存在!')
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
      .then(editField => {
        req.flash('success_messages', '變更成功!')
        res.redirect('back')
        return editField
      })
      .catch(err => next(err))
  },
  deleteField: (req, res, next) => {
    return Field.findByPk(req.params.id)
      .then(field => {
        if (!field) throw new Error('該案場不存在!')
        return field.destroy()
      })
      .then(deleteField => {
        res.redirect('/admin/fields')
        return deleteField
      })
  },

  // 使用者相關
  getUsers: (req, res, next) => {
    return User.findAll({
      raw: true,
      attributes: { exclude: ['password'] }
    })
      .then(users => res.render('admin/users', { users }))
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => {
    return User.findByPk(req.params.id, {
      // 避免密碼資料外洩
      attributes: { exclude: ['password'] }
    })
      .then(user => {
        // 檢查使用者是否存在
        if (!user) throw new Error("User didn't exist!")
        if (user.email === 'root@example.com') {
          const err = new Error('error_messages', '禁止變更 root 使用者權限!')
          err.status = 404
          throw err
        }
        return user.update({
          isAdmin: !user.isAdmin
        })
      })
      .then(editedUser => {
        res.redirect('/admin/users')
        return editedUser
      })
      .catch(err => next(err))
  },

  // 案場類別相關
  getCategories: (req, res, next) => {
    return Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
      .then(([categories, category]) => res.render('admin/categories', { categories, category }))
      .catch(err => next(err))
  },
  postCategory: (req, res, next) => {
    const { name } = req.body
    // 檢查類別名稱
    if (!name) throw new Error('請輸入類別名稱!')
    if (name.trim().length === 0) throw new Error('請勿輸入空白字串')
    return Category.create({ name: name.trim() }) // 防止開頭輸入空白字串
      .then(newCategory => {
        res.redirect('/admin/categories')
        return newCategory
      })
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { name } = req.body
    // 檢查類別名稱
    if (!name) throw new Error('請輸入類別名稱!')
    if (name.trim().length === 0) throw new Error('請勿輸入空白字串')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!name) throw new Error('該類別不存在!')
        return category.update({ name: name.trim() }) // 防止開頭更新時輸入空白字串
      })
      .then(editedCategory => {
        res.redirect('/admin/categories')
        return editedCategory
      })
  },
  deleteCategory: (req, res, next) => {
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error('該類別不存在!')
        return category.destroy()
      })
      .then(deletedCategory => {
        res.redirect('/admin/categories')
        return deletedCategory
      })
  }
}

module.exports = adminController
