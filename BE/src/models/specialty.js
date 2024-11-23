'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Specialty.hasMany(models.Doctor_infor, { foreignKey: 'specialtyId', as: 'specialtyData' });
      Specialty.hasMany(models.Handbook, { foreignKey: 'specialtyId', as: 'specialtyData2' })
    }
  }
  Specialty.init({
    name: DataTypes.STRING,
    descriptionHTML: DataTypes.TEXT('LONG'),
    contentMarkDown: DataTypes.TEXT("LONG"),
    image: DataTypes.BLOB("LONG"),
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  Specialty.sync();
  return Specialty;
};