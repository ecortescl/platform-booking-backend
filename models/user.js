'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    idUser: DataTypes.INTEGER,
    run: DataTypes.STRING,
    names: DataTypes.STRING,
    surnames: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    specialty: DataTypes.STRING,
    registered: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};