'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rent.belongsTo(models.SubCategoryRent, { foreignKey :'subCategoryId'})
    }
  }
  Rent.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    subCategoryId: DataTypes.INTEGER,
    imgProduct: DataTypes.STRING,
    url : DataTypes.STRING,
    smallImg1 : DataTypes.STRING,
    smallImg2 : DataTypes.STRING,
    smallImg3 : DataTypes.STRING,
    smallImg4 : DataTypes.STRING,
    embedVideo : DataTypes.STRING,
    img1 : DataTypes.STRING,
    img2 : DataTypes.STRING,
    img3 : DataTypes.STRING,
    img4 : DataTypes.STRING,

    details: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Rent',
  });
  return Rent;
};