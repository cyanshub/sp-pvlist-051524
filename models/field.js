'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Field.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      Field.hasMany(models.Comment, { foreignKey: 'fieldId' })
      Field.belongsToMany(models.User, {
        through: models.Favorite, // 透過 Favorite 表來建立關聯
        foreignKey: 'fieldId', // 對 Favorite 表設定 FK
        as: 'FavoritedUsers' // 幫這個關聯取個名稱
      })
    }
  }
  Field.init({
    name: DataTypes.STRING,
    totalAmount: DataTypes.INTEGER,
    remainAmount: DataTypes.INTEGER,
    transAmount: DataTypes.INTEGER,
    fullAddress: DataTypes.STRING,
    local: DataTypes.STRING,
    cover: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Field',
    tableName: 'fields',
    underscored: true
  })
  return Field
}
