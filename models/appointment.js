'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Appointment.init({
    state: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    idUserClient: DataTypes.INTEGER,
    idUserProfessional: DataTypes.INTEGER,
    idSlot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
    timestamps: false
  });

  Appointment.associate = function(models) {
    Appointment.belongsTo(models.User, {  as: 'client',foreignKey: 'idUserClient'});
    Appointment.belongsTo(models.User, {  as: 'professional',foreignKey: 'idUserProfessional'});
    Appointment.belongsTo(models.Slot, { foreignKey: 'idSlot'});
    Appointment.hasMany(models.Comment, { foreignKey: 'idAppointment'})
  };

  return Appointment;
};