'use strict';
const {
    Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
    class Doctor_infor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'id', as: 'priceData' });
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'id', as: 'proviceData' });
            Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'id', as: 'paymentData' });
            Doctor_infor.belongsTo(models.User, { foreignKey: 'doctorId', as: 'doctorInforData' });
            Doctor_infor.belongsTo(models.Specialty, { foreignKey: 'specialtyId', as: 'specialtyData' });
            Doctor_infor.belongsTo(models.Booking, { foreignKey: 'doctorId', as: "doctorData" })
            // Doctor_infor.hasMany(models.Alllcode, { foreignKey: 'priceId', as: "priceData" });
            // Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'provinceId', as: 'provinceData' });
            // Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'paymentId',targetKey:'keyMap', as: 'paymentData' });
        }
    }
    Doctor_infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.INTEGER,
        provinceId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        paymentId: DataTypes.INTEGER,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.TEXT('long'),
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_infor',
    });
    // Doctor_infor.sync();
    return Doctor_infor;
};