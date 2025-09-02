const { Rating, RatingAggregate, Store } = require("../models");
const { sequelize } = require("../models");

async function recomputeAggregate(storeId, t) {
  // recompute from Ratings table (safe & simple)
  const stats = await Rating.findAll({
    where: { storeId },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("id")), "total"],
      [sequelize.fn("SUM", sequelize.col("rating")), "sum"]
    ],
    raw: true,
    transaction: t
  });
  const total = Number(stats[0].total || 0);
  const sum = Number(stats[0].sum || 0);
  const avg = total ? (sum / total).toFixed(2) : "0.00";

  await RatingAggregate.upsert({
    storeId,
    total_ratings: total,
    sum_ratings: sum,
    average_rating: avg
  }, { transaction: t });
}

exports.rateStore = async (req, res) => {
  const { storeId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  const t = await sequelize.transaction();
  try {
    const store = await Store.findByPk(storeId, { transaction: t });
    if (!store) {
      await t.rollback();
      return res.status(404).json({ message: "Store not found" });
    }

    // upsert user's rating for this store
    const [r, created] = await Rating.findOrCreate({
      where: { userId, storeId },
      defaults: { userId, storeId, rating },
      transaction: t
    });

    if (!created) {
      r.rating = rating;
      await r.save({ transaction: t });
    }

    await recomputeAggregate(storeId, t);
    await t.commit();

    res.status(201).json({ message: "Rating saved" });
  } catch (e) {
    await t.rollback();
    res.status(500).json({ message: "Rating failed", error: e.message });
  }
};

exports.myRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { userId: req.user.id }, order: [["id","DESC"]] });
    res.json({ ratings });
  } catch (e) {
    res.status(500).json({ message: "Failed", error: e.message });
  }
};
