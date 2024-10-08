'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ServicesUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ServicesUser.init({
    idServicesUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServicesUser',
  });
  return ServicesUser;
};