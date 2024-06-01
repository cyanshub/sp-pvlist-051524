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
      User.hasMany(models.Comment, { foreignKey: 'userId' })
      User.belongsToMany(models.Field, {
        through: models.Favorite, // 透過 Favorite 表來建立關聯
        foreignKey: 'userId', // 對 Favorite 表設定 FK
        as: 'FavoritedFields' // 幫這個關聯取個名稱
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  })
  return User
}
