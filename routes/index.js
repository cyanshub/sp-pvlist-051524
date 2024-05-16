const express = require('express')
const router = express.Router()
const admin = require('./modules/admin.js')

// 載入 controller 資料夾
const fieldController = require('../controllers/field-controller.js')
const userController = require('../controllers/user-controller.js')

// 載入 middleware
const { generalErrorHandler } = require('../middleware/error-handler.js')
router.use('/admin', admin)

// 設計路由
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)

router.get('/fields', fieldController.getFields)
router.get('/', (req, res) => res.redirect('/fields'))
router.use('/', generalErrorHandler)

module.exports = router
