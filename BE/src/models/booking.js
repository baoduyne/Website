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
      // define association here
    }
  }
  Booking.init({
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    supportFirstName: DataTypes.STRING,
    supportLastName: DataTypes.STRING,
    supportPhoneNumber: DataTypes.STRING,
    supportBirthDay: DataTypes.INTEGER,
    supportGender: DataTypes.STRING,
    note: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Booking',
  });
  Booking.sync();
  return Booking;
};