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
            // Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' });
            // Doctor_infor.belongsTo(models.Allcode, { foreignKey: 'proviceId', targetKey: 'keyMap', as: 'proviceData' });
        }
    }
    Doctor_infor.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.INTEGER,
        provinceId: DataTypes.INTEGER,
        paymentId: DataTypes.INTEGER,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_infor',
    });
    //Doctor_infor.sync({ alter: true });
    return Doctor_infor;
};