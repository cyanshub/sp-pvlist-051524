const express = require('express')
const router = express.Router()
const admin = require('./modules/admin.js')

// 載入 controller 資料夾
const fieldController = require('../../controllers/apis/field-controller')
const userController = require('../../controllers/apis/user-controller.js')

// 載入 middleware
const { apiErrorHandler } = require('../../middleware/error-handler.js') // 報錯
const passport = require('../../config/passport.js') // 使用者登入及識別
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth.js') // 負責驗證
const upload = require('../../middleware/multer.js') // 負責上傳圖片

// 設計路由
// 設計路由: 後台區域
router.use('/admin', admin)

// 設計路由: 使用者相關
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)

// 設計路由: 案場相關(可測試首頁)
router.get('/fields', fieldController.getFields)
router.put('/users/:id', upload.single('avatar'), userController.putUser)

// 設計路由: 錯誤相關
router.use('/', apiErrorHandler)

module.exports = router
