'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Handbook extends Model {

        static associate(models) {
            Handbook.belongsTo(models.Specialty, { foreignKey: 'specialtyId', targetKey: 'id', as: 'SecialtyData2' })
        }
    }
    Handbook.init({
        contentMarkdown: DataTypes.TEXT('LONG'),
        contentHTML: DataTypes.TEXT('LONG'),
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Handbook',
    });
    Handbook.sync();
    return Handbook;
};