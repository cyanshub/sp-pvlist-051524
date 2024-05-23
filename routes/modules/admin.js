const express = require('express')
const router = express.Router()

// 載入 middleware: 負責上傳圖片
const upload = require('../../middleware/multer.js')

// 載入 controller
const adminController = require('../../controllers/admin-controller.js')

// 設計路由
// 設計路由: 案場相關
router.get('/fields/create', adminController.createField)
router.get('/fields', adminController.getFields)
router.post('/fields', upload.single('cover'), adminController.postField)
router.get('/fields/:id', adminController.getField)
router.get('/fields/:id/edit', adminController.editField)
router.put('/fields/:id', upload.single('cover'), adminController.putField)
router.delete('/fields/:id', adminController.deleteField)

// 設計路由: 使用者相關
router.get('/users', adminController.getUsers)
router.patch('/users/:id', adminController.patchUser)

// 設計路由: 分類相關
router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.postCategory)
router.get('/categories/:id', adminController.getCategories)
router.put('/categories/:id', adminController.putCategory)
router.delete('/categories/:id', adminController.deleteCategory)

// 設計路由: 導向後臺首頁
router.use('/', (req, res) => res.redirect('admin/fields'))

module.exports = router
