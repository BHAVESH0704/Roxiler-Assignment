const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./userModel");
const Store = require("./storeModel");

const Rating = sequelize.define("Rating", {
  rating: { type: DataTypes.INTEGER, allowNull: false },
});

Rating.belongsTo(User, { foreignKey: "userId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

module.exports = Rating;
