'use strict'
const axios = require('axios')
const urlMale = 'https://randomuser.me/api/?gender=male&results=50'
const urlFemale = 'https://randomuser.me/api/?gender=female&results=50'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 獲取所有的 users id
    const users = await queryInterface.sequelize.query(
      'SELECT id, name FROM users;',
      { type: Sequelize.QueryTypes.SELECT }
    )

    // 同時發送兩個請求
    const results = await Promise.all([
      axios.get(urlMale),
      axios.get(urlFemale)
    ])
      .then(([responseMale, responseFemale]) => {
        const seenPictures = new Set()
        const results = [...responseMale.data.results, ...responseFemale.data.results]
          .map(result => { // 過濾掉重複出現的結國
            const uniquePicture = result.picture.large
            return seenPictures.has(uniquePicture) ? null : (seenPictures.add(uniquePicture), result)
          }).filter(Boolean) // 過濾掉為 null 的 result

        // Fisher-Yates 洗牌演算法
        for (let i = results.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [results[i], results[j]] = [results[j], results[i]]
          console.log(results[i].picture.large)
        }
        return results
      })
      .catch(err => console.log(err))

    // 遍歷每個 user 並更新 avatar
    for (let i = 1; i < users.length; i++) {
      // 更新 users 資料表
      await queryInterface.sequelize.query(
        'UPDATE users SET name = :name, avatar = :avatar WHERE id = :id',
        {
          replacements: {
            name: `user${i}`,
            avatar: results[i].picture.large,
            id: users[i].id
          }
        }
      )

      console.log('更新使用者', users[i].name, '使用圖像:', results[i].picture.large)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('users', {
      avatar: null
    })
  }
}
