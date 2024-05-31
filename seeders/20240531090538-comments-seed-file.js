'use strict'
const faker = require('faker')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 取出要關聯的 users 資料表的 users.id
    const users = await queryInterface.sequelize.query('SELECT `id` FROM `users`;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })

    // 取出要關聯的 fields 資料表的 fields.id
    const fields = await queryInterface.sequelize.query('SELECT `id` FROM `fields`;', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })

    // 產生 comments 種子資料
    await queryInterface.bulkInsert('comments',
      Array.from({ length: 100 }, () => ({
        text: faker.lorem.sentence(),
        user_id: users[Math.floor(Math.random() * users.length)].id,
        field_id: fields[Math.floor(Math.random() * fields.length)].id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    )
  },

  async down (queryInterface, Sequelize) {
    const limit = 100 // 要刪除的留言數量

    // 查詢前 N 條留言的 ID
    const commentsToDelete = await queryInterface.sequelize.query(
      'SELECT id FROM comments ORDER BY id DESC LIMIT :limit',
      {
        replacements: { limit },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )

    // 提取 ID 列表
    const idsToDelete = commentsToDelete.map(comment => comment.id)

    if (idsToDelete.length > 0) {
      // 刪除查詢到的留言
      await queryInterface.bulkDelete('comments', {
        id: idsToDelete
      })
    } else {
      console.log('No comments found to delete')
    }
  }
}
