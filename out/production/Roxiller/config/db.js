// backend/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // database name
  process.env.DB_USER, // MySQL username
  process.env.DB_PASS, // MySQL password
  {
    host: process.env.DB_HOST, // usually localhost
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // set to true if you want SQL logs
  }
);

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("DB Connection error: ", err));

module.exports = sequelize;
