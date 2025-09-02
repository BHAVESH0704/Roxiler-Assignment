const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const RatingAggregate = sequelize.define("RatingAggregate", {
  storeId: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true },
  total_ratings: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  sum_ratings: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
  average_rating: { type: DataTypes.DECIMAL(5,2), defaultValue: 0.00 }
}, { tableName: "rating_aggregates" });

module.exports = RatingAggregate;
