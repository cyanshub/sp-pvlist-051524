'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('fields', 'category_id', {
      type: Sequelize.INTEGER,
      references: { model: 'categories', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('fields', 'category_id')
  }
}
