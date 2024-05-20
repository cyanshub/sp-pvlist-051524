const adminController = {
  getFields: (req, res, next) => {
    return res.render('admin/fields.hbs')
  },
  getUsers: (req, res, next) => {
    return res.render('admin/users.hbs')
  },
  getCategories: (req, res, next) => {
    return res.render('admin/categories.hbs')
  }
}

module.exports = adminController
