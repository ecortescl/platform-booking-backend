const { Sequelize } = require("sequelize");

const database = process.env.DB_DATABASE || "booking";
const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";
const dialect = "postgres";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});

module.exports = sequelize;
