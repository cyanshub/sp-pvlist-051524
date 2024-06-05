'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      // 使用者與評論的關聯
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      // 使用者與案場的關聯
      User.belongsToMany(models.Field, {
        through: models.Favorite, // 透過 Favorite 表來建立關聯
        foreignKey: 'userId', // 對 Favorite 表設定 FK
        as: 'FavoritedFields' // 幫這個關聯取個名稱
      })
      // 使用者自關聯: 撈出追蹤自己的人
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followingId',
        as: 'Followers'
      })
      // 使用者自關聯: 撈出自己追蹤的人
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followerId',
        as: 'Followings'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    followerCounts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  })
  return User
}
