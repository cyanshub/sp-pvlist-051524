const express = require('express')
const router = express.Router()

// 載入 controller
const adminController = require('../../controllers/admin-controller.js')

// 設計路由
router.get('/fields', adminController.getFields)

module.exports = router
