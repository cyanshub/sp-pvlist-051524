'use strict'
const counts = 17 // 生成用戶數量
const bcrypt = require('bcryptjs')
const salt = 10

// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 將 bcrypt.hash 的處理邏輯移到外部
    const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, salt)

    await queryInterface.bulkInsert('users',
      Array.from({ length: counts }, (_, index) => ({
        name: `user${index + 3}`,
        email: `user${index + 3}@example.com`,
        password: hashedPassword,
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    const limit = counts // 要刪除的留言數量

    // 查詢前 N 條留言的 ID
    const usersToDelete = await queryInterface.sequelize.query(
      'SELECT id FROM users ORDER BY id DESC LIMIT :limit',
      {
        replacements: { limit },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )

    // 提取 ID 列表
    const idsToDelete = usersToDelete.map(user => user.id)

    if (idsToDelete.length > 0) {
      // 刪除查詢到的留言
      await queryInterface.bulkDelete('users', {
        id: idsToDelete
      })
    } else {
      console.log('No users found to delete')
    }
  }
}
