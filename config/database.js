const { Sequelize } = require("sequelize");
const config = require("./config/config.js");

const environment = process.env.NODE_ENV || "development";
const envConfig = config[environment];

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  {
    host: envConfig.host,
    dialect: envConfig.dialect,
    logging: envConfig.logging,
  }
);

module.exports = sequelize;
