// 抽取共用 services 層
const fieldServices = require('../../services/field-services')

const fieldController = {
  getFields: (req, res, next) => {
    return fieldServices.getFields(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = fieldController
