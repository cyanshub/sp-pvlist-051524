'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 案場使用者的被追蹤次數
    await queryInterface.addColumn('users', 'follower_counts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })

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
    await queryInterface.removeColumn('users', 'follower_counts')
  }
}
