const adminController = {
  getFields: (req, res, next) => {
    return res.render('admin/fields.hbs')
  }
}

module.exports = adminController
