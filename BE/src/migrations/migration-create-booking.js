'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      //     statusId: DataTypes.STRING,
      // doctorId: DataTypes.INTEGER,
      // patientId: DataTypes.INTEGER,
      // date:DataTypes.Date,
      // timeType:DataTypes.STRING,
      // roleid: DataTypes.STRING
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
      timeType: {
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
      supportGender: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};