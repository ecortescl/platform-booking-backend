'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Calendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Calendar.init({
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    slug: DataTypes.STRING,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    bookingDuration: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Calendar',
    timestamps: false
  });

  Calendar.associate = function(models) {
    Calendar.belongsTo(models.User, { foreignKey: 'idUser'});
    Calendar.hasMany(models.Slot, {foreignKey: 'idCalendar'});
  };

  return Calendar;
};