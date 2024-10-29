'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      History.belongsTo(models.Booking, { foreignKey: 'bookingId', targetKey: 'id', as: 'bookingData' })
    }
  }
  History.init({
    bookingId: DataTypes.INTEGER,
    pillPrice: DataTypes.STRING,
    note: DataTypes.TEXT('LONG'),
  }, {
    sequelize,
    modelName: 'History',
  });
  History.sync();
  return History;
};