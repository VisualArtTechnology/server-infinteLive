'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tools.belongsTo(models.toolsCategory)
    }
  }
  Tools.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    toolsCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tools',
  });
  return Tools;
};