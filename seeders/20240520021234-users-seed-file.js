'use strict'
const bcrypt = require('bcryptjs')
const salt = 10

// 載入環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      name: 'root',
      email: 'root@example.com',
      password: await bcrypt.hash(process.env.USER_PASSWORD, salt),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user1',
      email: 'user1@example.com',
      password: await bcrypt.hash(process.env.USER_PASSWORD, salt),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      name: 'user2',
      email: 'user2@example.com',
      password: await bcrypt.hash(process.env.USER_PASSWORD, salt),
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  }
}
