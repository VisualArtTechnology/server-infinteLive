'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoryFixed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categoryFixed.hasMany(models.Brand)
    }
  }
  categoryFixed.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoryFixed',
  });
  return categoryFixed;
};