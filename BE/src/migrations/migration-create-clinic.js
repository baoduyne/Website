'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clinics', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      contentMarkDown: {
        type: Sequelize.TEXT('LONG'),
        allowNull: false
      },
      contentHTML: {
        type: Sequelize.TEXT('LONG'),
        allowNull: false
      },
      image: {
        type: Sequelize.BLOB('LONG'),
        allowNull: false,
      },
      backgroundImage: {
        type: Sequelize.BLOB('LONG'),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('clinics');
  }
};