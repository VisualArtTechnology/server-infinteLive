'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategoryRent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategoryRent.belongsTo(models.categoryRent, {foreignKey : 'categoryRentId'})
      SubCategoryRent.hasMany(models.Rent, {foreignKey:'subCategoryId'})
    }
  }
  SubCategoryRent.init({
    name: DataTypes.STRING,
    categoryRentId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategoryRent',
  });
  return SubCategoryRent;
};