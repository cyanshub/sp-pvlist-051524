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

    // 獲取所有的 users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users;',
      { type: Sequelize.QueryTypes.SELECT }
    )

    // 遍歷每個 user 並更新 follower_counts
    for (const user of users) {
      const [followshipsFollower] = await queryInterface.sequelize.query(
        'SELECT COUNT(*) AS count FROM followships WHERE following_id = ?;',
        {
          replacements: [user.id],
          type: Sequelize.QueryTypes.SELECT
        }
      )

      await queryInterface.bulkUpdate('users', {
        // 訂閱自己的人的數量
        follower_counts: followshipsFollower.count
      }, {
        id: user.id
      })
    }
  },

  async down (queryInterface, Sequelize) {
    // 回滾操作可以選擇性地清除或重置欄位
    // 這裡假設重置為 0
    await queryInterface.bulkUpdate('fields', {
      comment_counts: null,
      favorite_counts: null
    })

    await queryInterface.bulkUpdate('users', {
      follower_counts: null
    })
  }
}
