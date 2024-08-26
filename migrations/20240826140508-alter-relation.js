'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // followships
    await queryInterface.changeColumn('followships', 'follower_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.changeColumn('followships', 'following_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    // comments
    await queryInterface.changeColumn('comments', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.changeColumn('comments', 'field_id', {
      type: Sequelize.INTEGER,
      references: { model: 'fields', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    // favorites
    await queryInterface.changeColumn('favorites', 'user_id', {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })

    await queryInterface.changeColumn('favorites', 'field_id', {
      type: Sequelize.INTEGER,
      references: { model: 'fields', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  async down (queryInterface, Sequelize) {
    // followships
    await queryInterface.changeColumn('followships', 'follower_id', {
      type: Sequelize.INTEGER
    })

    await queryInterface.changeColumn('followships', 'following_id', {
      type: Sequelize.INTEGER
    })

    // comments
    await queryInterface.changeColumn('comments', 'user_id', {
      type: Sequelize.INTEGER
    })

    await queryInterface.changeColumn('comments', 'field_id', {
      type: Sequelize.INTEGER
    })

    // favorites
    await queryInterface.changeColumn('favorites', 'user_id', {
      type: Sequelize.INTEGER
    })

    await queryInterface.changeColumn('favorites', 'field_id', {
      type: Sequelize.INTEGER
    })
  }
}
