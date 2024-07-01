// 抽取共用 services 層
const fieldServices = require('../../services/field-services')

const fieldController = {
  getFields: (req, res, next) => {
    return fieldServices.getFields(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getFeeds: (req, res, next) => {
    return fieldServices.getFeeds(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getFavorites: (req, res, next) => {
    return fieldServices.getFavorites(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getTopFields: (req, res, next) => {
    return fieldServices.getTopFields(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getTrecs: (req, res, next) => {
    return fieldServices.getTrecs(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getField: (req, res, next) => {
    return fieldServices.getField(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  getDashboard: (req, res, next) => {
    return fieldServices.getDashboard(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = fieldController
