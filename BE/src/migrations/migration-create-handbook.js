'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('handbooks', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.TEXT
            },
            image: {
                allowNull: false,
                type: Sequelize.BLOB('LONG')
            },
            contentMarkdown: {
                allowNull: false,
                type: Sequelize.TEXT('LONG')
            },
            contentHTML: {
                allowNull: false,
                type: Sequelize.TEXT('LONG')
            },
            specialtyId: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('handbooks');
    }
};