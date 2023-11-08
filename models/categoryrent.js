'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class categoryRent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categoryRent.hasMany(models.SubCategoryRent,{foreignKey : 'categoryRentId'})

    }
  }
  categoryRent.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'categoryRent',
  });
  return categoryRent;
};