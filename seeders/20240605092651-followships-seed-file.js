'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 取出要關聯的 users 資料表的 users.id
    // 追蹤別人的人
    const usersFollower = await queryInterface.sequelize.query(
      'SELECT `id`, `name` FROM `users`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    // 要被追蹤的人
    const usersFollowing = await queryInterface.sequelize.query(
      'SELECT `id`, `name` FROM `users`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const followships = [] // 準備要建立的訂閱資料
    const count = usersFollower.length // 假設每個用戶最多訂閱註冊用戶數

    usersFollower.forEach(userFollower => {
      const userFollowships = new Set() // 用來跟蹤每個用戶已訂閱過的用戶
      // 隨機選擇用戶進行追蹤
      for (let i = 0; i < count; i++) {
        const userFollowing = usersFollowing[Math.floor(Math.random() * usersFollowing.length)]
        // 如果用戶尚未收藏過此案場，則建立收藏關係
        if (!userFollowships.has(userFollowing.id)) {
          followships.push({
            follower_id: userFollower.id,
            following_id: userFollowing.id,
            created_at: new Date(),
            updated_at: new Date()
          })
          userFollowships.add(userFollowing.id) // 標記用戶已訂閱的用戶
          console.log(`使用者${userFollower.name}追蹤使用者${userFollowing.name}!`)
        }
      }
    })

    await queryInterface.bulkInsert('followships', followships)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('followships', null, {})
  }
}
