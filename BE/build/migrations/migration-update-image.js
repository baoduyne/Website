'use strict';

var _require = require('../models'),
  sequelize = _require.sequelize;

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('Users', 'avatar', {
      type: Sequelize.BLOB('Long'),
      allowNull: true
    })]);
  },
  down: function down(queryInterface, Sequelize) {
    return Promise.all([queryInterface.changeColumn('Users', 'avatar', {
      type: Sequelize.BLOB('Long'),
      allowNull: true
    })]);
  }
};