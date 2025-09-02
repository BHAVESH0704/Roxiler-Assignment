const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel");

const Store = sequelize.define("Store", {
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  address: { type: DataTypes.STRING(400), allowNull: false },
});

Store.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

module.exports = Store;
