'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FixedProjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      descTitle: {
        type: Sequelize.STRING
      },
      mainImg: {
        type: Sequelize.STRING
      },
      imgProject: {
        type: Sequelize.ARRAY(DataTypes.STRING)
      },
      embedVideo : {
        type : Sequelize.ARRAY(DataTypes.STRING)
      },
      categoryProjectFixedId : {
        type : Sequelize.INTEGER,
        references : {
          model : 'CategoryProjectFixeds',
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FixedProjects');
  }
};