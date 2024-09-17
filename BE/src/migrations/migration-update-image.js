
'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'avatar', {
                type: Sequelize.BLOB('Long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'avatar', {
                type: Sequelize.BLOB('Long'),
                allowNull: true,
            })
        ])
    }
};