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
    idUser: DataTypes.INTEGER,
    idService: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ServicesUser',
    timestamps: false
  });
  
  ServicesUser.associate = function(models) {
    ServicesUser.belongsTo(models.Service, { foreignKey: 'idService'});
    ServicesUser.belongsTo(models.User, { foreignKey: 'idUser'});
  };

  return ServicesUser;

};