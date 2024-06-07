'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 獲取所有的 fields
    const fields = await queryInterface.sequelize.query(
      'SELECT id FROM fields;',
      { type: Sequelize.QueryTypes.SELECT }
    )

    // 遍歷每個 field 並更新 commentCounts 和 favoriteCounts
    for (const field of fields) {
      const [comments] = await queryInterface.sequelize.query(
        'SELECT COUNT(*) AS count FROM comments WHERE field_id = ?;',
        {
          replacements: [field.id],
          type: Sequelize.QueryTypes.SELECT
        }
      )

      const [favorites] = await queryInterface.sequelize.query(
        'SELECT COUNT(*) AS count FROM favorites WHERE field_id = ?;',
        {
          replacements: [field.id],
          type: Sequelize.QueryTypes.SELECT
        }
      )

      await queryInterface.bulkUpdate('fields', {
        comment_counts: comments.count,
        favorite_counts: favorites.count
      }, {
        id: field.id
      })
    }
  },

  async down (queryInterface, Sequelize) {
    // 回滾操作可以選擇性地清除或重置欄位
    // 這裡假設重置為 0
    await queryInterface.bulkUpdate('fields', {
      comment_counts: 0,
      favorite_counts: 0
    })
  }
}
