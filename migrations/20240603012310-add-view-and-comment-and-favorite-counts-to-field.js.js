'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 案場查看次數
    await queryInterface.addColumn('fields', 'view_counts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    // 案場評論次數
    await queryInterface.addColumn('fields', 'comment_counts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    // 案場收藏次數
    await queryInterface.addColumn('fields', 'favorite_counts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('fields', 'view_counts')
    await queryInterface.removeColumn('fields', 'comment_counts')
    await queryInterface.removeColumn('fields', 'favorite_counts')
  }
}
