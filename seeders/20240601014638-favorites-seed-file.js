'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 取出要關聯的 users 資料表的 users.id
    const users = await queryInterface.sequelize.query(
      'SELECT `id` FROM `users`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    // 取出要關聯的 fields 資料表的 fields.id
    const fields = await queryInterface.sequelize.query(
      'SELECT `id` FROM `fields`;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const favorites = [] // 準備要建立的收藏資料
    const count = 90 / 2 // 假設每個用戶最多收藏90間案場, 設定只收一半

    users.forEach(user => {
      const userFavorites = new Set() // 用來跟蹤每個用戶已收藏過的案場
      // 隨機選擇餐廳進行評論
      for (let i = 0; i < count; i++) { // 假設每個用戶最多收藏90間案場
        const field = fields[Math.floor(Math.random() * fields.length)]
        // 如果用戶尚未收藏過此案場，則建立收藏關係
        if (!userFavorites.has(field.id)) {
          favorites.push({
            user_id: user.id,
            field_id: field.id,
            created_at: new Date(),
            updated_at: new Date()
          })
          userFavorites.add(field.id) // 標記用戶已評論過這家餐廳
          console.log(`使用者${user.id}收藏案場${field.id}!`)
        }
      }
    })

    await queryInterface.bulkInsert('favorites', favorites)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('favorites', null, {})
  }
}
