const express = require('express')
const router = express.Router()

// 載入 controller 資料夾
const fieldController = require('../controllers/field-controller.js')

// 設計路由
router.get('/fields', fieldController.getFields)
router.use('/', (req, res) => res.redirect('/fields'))

module.exports = router
