'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'patientId', as: 'patientData' })
      Booking.belongsTo(models.Allcode, { foreignKey: 'timeMap', targetKey: 'keyMap', as: 'timeData' })
    }
  }
  Booking.init({
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeMap: DataTypes.STRING,
    supportFirstName: DataTypes.STRING,
    supportLastName: DataTypes.STRING,
    supportPhoneNumber: DataTypes.STRING,
    supportBirthDay: DataTypes.INTEGER,
    supportGender: DataTypes.STRING,
    note: DataTypes.TEXT('long'),
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });

  Booking.sync();

  return Booking;
};