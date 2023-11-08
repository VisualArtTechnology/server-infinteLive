'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categoryProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categoryProject.hasMany(models.Project)
    }
  }
  categoryProject.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'categoryProject',
  });
  return categoryProject;
};