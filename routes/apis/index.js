const express = require('express')
const router = express.Router()
const admin = require('./modules/admin.js')

// 載入 controller 資料夾
const fieldController = require('../../controllers/apis/field-controller')
const userController = require('../../controllers/apis/user-controller.js')
const commentController = require('../../controllers/apis/comment-controller.js')

// 載入 middleware
const { apiErrorHandler } = require('../../middleware/error-handler.js') // 報錯
const passport = require('../../config/passport.js') // 使用者登入及識別
const { authenticated, authenticatedAdmin } = require('../../middleware/api-auth.js') // 負責驗證
const upload = require('../../middleware/multer.js') // 負責上傳圖片

// 設計路由
// 設計路由: 後台區域
router.use('/admin', authenticated, authenticatedAdmin, admin)

// 設計路由: 使用者登入相關
router.post('/signup', userController.signUp)
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)

// 設計路由: 使用者相關
router.post('/favorite/:fieldId', authenticated, userController.addFavorite)
router.delete('/favorite/:fieldId', authenticated, userController.removeFavorite)
router.get('/users/top', authenticated, userController.getTopUsers)
router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)
router.get('/users/:id', authenticated, userController.getUser)
router.get('/users/:id/edit', authenticated, userController.editUser)
router.put('/users/:id', authenticated, upload.single('avatar'), userController.putUser)
router.put('/avatars/:userId', authenticated, userController.putAvatar)

// 設計路由: 案場相關(可測試首頁)
router.get('/fields', authenticated, fieldController.getFields)
router.get('/fields/feeds', authenticated, fieldController.getFeeds)
router.get('/fields/favorites', authenticated, fieldController.getFavorites)
router.get('/fields/top', authenticated, fieldController.getTopFields)
router.get('/fields/trecs', authenticated, fieldController.getTrecs)
router.get('/fields/:id', authenticated, fieldController.getField)
router.get('/fields/:id/dashboard', authenticated, fieldController.getDashboard)

// 設計路由: 留言功能相關
router.post('/comments', authenticated, commentController.postComment)
router.delete('/comments/:id', authenticated, commentController.deleteComment)

// 設計路由: 錯誤相關
router.use('/', apiErrorHandler)

module.exports = router
