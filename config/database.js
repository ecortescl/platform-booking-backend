const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('booking', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;