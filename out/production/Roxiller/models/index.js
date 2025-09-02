const sequelize = require("../config/db");
const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");
const RatingAggregate = require("./RatingAggregate");

// relations
User.hasMany(Store, { foreignKey: "ownerId" });
Store.belongsTo(User, { foreignKey: "ownerId" });

User.hasMany(Rating, { foreignKey: "userId" });
Store.hasMany(Rating, { foreignKey: "storeId" });
Rating.belongsTo(User, { foreignKey: "userId" });
Rating.belongsTo(Store, { foreignKey: "storeId" });

Store.hasOne(RatingAggregate, { foreignKey: "storeId" });
RatingAggregate.belongsTo(Store, { foreignKey: "storeId" });

module.exports = { sequelize, User, Store, Rating, RatingAggregate };
