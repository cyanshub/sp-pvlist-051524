// 載入共用 Services 層
const fieldServices = require('../../services/field-services')

const fieldController = {
  getFields: (req, res, next) => {
    return fieldServices.getFields(req, (err, data) => err ? next(err) : res.render('fields/fields', data))
  },
  getField: (req, res, next) => {
    return fieldServices.getField(req, (err, data) => err ? next(err) : res.render('fields/field', data))
  },
  getDashboard: (req, res, next) => {
    return fieldServices.getDashboard(req, (err, data) => err ? next(err) : res.render('fields/field-dashboard', data))
  },
  getFeeds: (req, res, next) => {
    return fieldServices.getFeeds(req, (err, data) => err ? next(err) : res.render('fields/feeds', data))
  },
  getFavorites: (req, res, next) => {
    return fieldServices.getFavorites(req, (err, data) => err ? next(err) : res.render('fields/favorites', data))
  },
  getTrecs: (req, res, next) => {
    return fieldServices.getTrecs(req, (err, data) => err ? next(err) : res.render('fields/trecs', data))
  },
  getTopFields: (req, res, next) => {
    return fieldServices.getTopFields(req, (err, data) => err ? next(err) : res.render('fields/top-fields', data))
  }
}

module.exports = fieldController
