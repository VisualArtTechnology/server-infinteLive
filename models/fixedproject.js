'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FixedProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FixedProject.belongsTo(models.CategoryProjectFixed, {foreignKey : 'categoryProjectFixedId'})
    }
  }
  FixedProject.init({
    title: DataTypes.STRING,
    descTitle: DataTypes.TEXT,
    mainImg: DataTypes.STRING,
    imgProject: DataTypes.ARRAY(DataTypes.STRING),
    embedVideo: DataTypes.ARRAY(DataTypes.STRING),
    categoryProjectFixedId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FixedProject',
  });
  return FixedProject;
};