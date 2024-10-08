'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    idUserWriter: DataTypes.INTEGER,
    idUserReceiver: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    timestamps: false
  });

  Review.associate = function(models) {
    Review.belongsTo(models.User, { foreignKey: 'idUserWriter'})
    Review.belongsTo(models.User, { foreignKey: 'idUserReceiver'})
  };

  return Review;
};