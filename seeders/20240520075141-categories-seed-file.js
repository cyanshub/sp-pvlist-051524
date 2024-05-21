'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories',
      ['地面型系統', '廠房鐵皮屋頂', '建築水泥樓面屋頂', '畜禽舍屋頂', '校園屋頂', '其他']
        .map(item => {
          return {
            name: item,
            created_at: new Date(),
            updated_at: new Date()
          }
        })
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  }
}
