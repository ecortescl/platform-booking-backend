const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('booking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;