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
