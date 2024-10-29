module.exports = {
  development: {
    username: "root",
    password: "",
    database: "booking",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: process.env.DB_LOGGING === "true",
  },
};
