'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comment.init({
    comments: DataTypes.STRING,
    idUser: DataTypes.INTEGER,
    idAppointment: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    timestamps: false
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.User, { foreignKey: 'idUser'});
    Comment.belongsTo(models.Appointment, { foreignKey: 'idAppointment'});
  };

  return Comment;
};