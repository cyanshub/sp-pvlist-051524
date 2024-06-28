// 載入共用 service 層
const adminServices = require('../../services/admin-services')

const adminController = {
  // 案場相關
  createField: (req, res, next) => {
    return adminServices.createField(req, (err, data) => err ? next(err) : res.render('admin/create-field', data))
  },
  getFields: (req, res, next) => {
    return adminServices.getFields(req, (err, data) => err ? next(err) : res.render('admin/fields', data))
  },
  postField: (req, res, next) => {
    return adminServices.postField(req, (err, data) => {
      if (err) return next(err)
      req.session.createdData = data
      req.flash('success_messages', '成功建立案場!')
      return res.redirect('/admin/fields')
    })
  },
  getField: (req, res, next) => {
    return adminServices.getField(req, (err, data) => err ? next(err) : res.render('admin/field', data))
  },
  editField: (req, res, next) => {
    return adminServices.editField(req, (err, data) => err ? next(err) : res.render('admin/edit-field', data))
  },
  putField: (req, res, next) => {
    return adminServices.putField(req, (err, data) => {
      if (err) return next(err)
      req.session.editedData = data
      req.flash('success_messages', '變更成功!')
      return res.redirect('/admin/fields')
    })
  },
  deleteField: (req, res, next) => {
    return adminServices.deleteField(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteddData = data
      req.flash('success_messages', '刪除成功!')
      return res.redirect('back')
    })
  },

  // 使用者相關
  getUsers: (req, res, next) => {
    return adminServices.getUsers(req, (err, data) => err ? next(err) : res.render('admin/users', data))
  },
  patchUser: (req, res, next) => {
    return adminServices.patchUser(req, (err, data) => {
      if (err) return next(err)
      req.session.patchedData = data
      req.flash('success_messages', '變更成功!')
      return res.redirect('/admin/users')
    })
  },

  // 案場類別相關
  getCategories: (req, res, next) => {
    return adminServices.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))
  },
  postCategory: (req, res, next) => {
    return adminServices.postCategory(req, (err, data) => {
      if (err) return next(err)
      req.session.postedData = data
      req.flash('success_messages', '新增成功!')
      return res.redirect('/admin/categories')
    })
  },
  putCategory: (req, res, next) => {
    return adminServices.putCategory(req, (err, data) => {
      if (err) return next(err)
      req.session.editedData = data
      req.flash('success_messages', '變更成功!')
      return res.redirect('/admin/categories')
    })
  },
  deleteCategory: (req, res, next) => {
    return adminServices.deleteCategory(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteddData = data
      req.flash('success_messages', '刪除成功!')
      return res.redirect('/admin/categories')
    })
  }
}

module.exports = adminController
