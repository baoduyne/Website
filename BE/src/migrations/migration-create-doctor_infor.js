'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('doctor_infors', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                // allowNull: false
            },
            clinicId: {
                type: Sequelize.INTEGER,
                // allowNull: false
            },
            specialtyId: {
                type: Sequelize.INTEGER,
                // allowNull: false
            },

            priceId: {
                type: Sequelize.INTEGER,
                // allowNull: false,
            },
            provinceId: {
                type: Sequelize.INTEGER,
                // allowNull: false
            },
            paymentId: {
                type: Sequelize.INTEGER,
                // allowNull: false
            },
            addressClinic: {
                type: Sequelize.STRING,
                // allowNull: false
            },
            nameClinic: {
                type: Sequelize.STRING,
                // allowNull: false
            },
            note: {
                type: Sequelize.TEXT,
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                // defaultValue: 0
            },

            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('doctor_infors');
    }
};