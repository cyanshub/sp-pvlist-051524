// 抽取共用 services 層
const adminServices = require('../../services/admin-services')

const adminController = {
  getFields: (req, res, next) => {
    return adminServices.getFields(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  postField: (req, res, next) => {
    return adminServices.postField(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getField: (req, res, next) => {
    return adminServices.getField(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  putField: (req, res, next) => {
    return adminServices.putField(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  deleteField: (req, res, next) => {
    return adminServices.deleteField(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getUsers: (req, res, next) => {
    return adminServices.getUsers(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  patchUser: (req, res, next) => {
    return adminServices.patchUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getCategories: (req, res, next) => {
    return adminServices.getCategories(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  postCategory: (req, res, next) => {
    return adminServices.postCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  putCategory: (req, res, next) => {
    return adminServices.putCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  deleteCategory: (req, res, next) => {
    return adminServices.deleteCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }

}

module.exports = adminController
