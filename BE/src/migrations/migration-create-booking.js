'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      statusId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeMap: {
        type: Sequelize.STRING,
        allowNull: false
      },
      supportFirstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      supportLastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      supportPhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      supportBirthDay: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      supportGender: {
        type: Sequelize.STRING,
        allowNull: true
      },
      note: {
        type: Sequelize.TEXT('LONG'),
        allowNull: false
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.DATE
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};