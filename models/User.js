const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  name: { type: DataTypes.STRING(60), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(100), allowNull: false },
  address: { type: DataTypes.STRING(400), allowNull: false },
  role: { type: DataTypes.ENUM("USER", "STORE_OWNER", "ADMIN"), defaultValue: "USER" },
});

module.exports = User;
