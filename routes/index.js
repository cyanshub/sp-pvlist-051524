const express = require('express')
const router = express.Router()
const admin = require('./modules/admin.js')

// 載入 controller 資料夾
const fieldController = require('../controllers/field-controller.js')
const userController = require('../controllers/user-controller.js')

// 載入 middleware
const { generalErrorHandler } = require('../middleware/error-handler.js')
const passport = require('../config/passport.js')
router.use('/admin', admin)

// 設計路由
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn) // 直接使用passport提供的方法進行登入驗證
router.get('/logout', userController.logOut)

router.get('/fields', fieldController.getFields)
router.get('/', (req, res) => res.redirect('/fields'))
router.use('/', generalErrorHandler)

module.exports = router
