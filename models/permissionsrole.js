'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PermissionsRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PermissionsRole.init({
    idRole: DataTypes.INTEGER,
    idPermission: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PermissionsRole',
    timestamps: false
  });

  PermissionsRole.associate = function(models) {
    PermissionsRole.belongsTo(models.Permission, { foreignKey: 'idPermission'});
    PermissionsRole.belongsTo(models.Role, { foreignKey: 'idRole'});
  };

  return PermissionsRole;
};