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
    run: DataTypes.STRING,
    names: DataTypes.STRING,
    surnames: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    location: DataTypes.STRING,
    specialty: DataTypes.STRING,
    registered: DataTypes.BOOLEAN,
    idRole: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });

  User.associate = function(models) {
    User.belongsTo(models.Role, { foreignKey: 'idRole'});
    User.hasMany(models.Review, { foreignKey: 'idUserWriter'})
    User.hasMany(models.Review, { foreignKey: 'idUserReceiver'})
    User.hasMany(models.Calendar, { foreignKey: 'idUser'});
    User.hasMany(models.Appointment, { foreignKey: 'idUserClient'})
    User.hasMany(models.Appointment, { foreignKey: 'idUserProfessional'})
    User.hasMany(models.Comment, { foreignKey: 'idUser'});
    User.hasMany(models.ServicesUser, { foreignKey: 'idUser'});
  };

  return User;
};