'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fixeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      BrandId: {
        type: Sequelize.INTEGER,
        references : {
          model : 'Brands',
          key : 'id'
        },
        onDelete : 'cascade',
        onUpdate : 'cascade'
      },
      imgProduct: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      smallImg1 : {
        type : Sequelize.STRING
      },
      smallImg2 : {
        type : Sequelize.STRING
      },
      smallImg3 : {
        type : Sequelize.STRING
      },
      smallImg4 : {
        type : Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      embedVideo: {
        type: Sequelize.STRING
      },
      img1: {
        type: Sequelize.STRING
      },
      img2: {
        type: Sequelize.STRING
      },
      img3: {
        type: Sequelize.STRING
      },
      img4: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Fixeds');
  }
};