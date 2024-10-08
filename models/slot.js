'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Slot.init({
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    state: DataTypes.STRING,
    date: DataTypes.DATE,
    idCalendar: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Slot',
    timestamps: false
  });

  Slot.associate = function(models) {
    Slot.hasOne(models.Appointment, { foreignKey: 'idSlot'});
    Slot.belongsTo(models.Calendar, { foreignKey: 'idCalendar'})
  };

  return Slot;
};