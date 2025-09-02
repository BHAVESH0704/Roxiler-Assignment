const { Store, RatingAggregate, Rating, User } = require("../models");
const { Op } = require("sequelize");

exports.createStore = async (req, res) => {
  try {
    const ownerId = req.user.id;
    if (req.user.role !== "STORE_OWNER" && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Only STORE_OWNER or ADMIN can create stores" });
    }
    const store = await Store.create({ name: req.body.name, ownerId });
    await RatingAggregate.create({ storeId: store.id }); // init
    res.status(201).json({ store });
  } catch (e) {
    res.status(500).json({ message: "Create store failed", error: e.message });
  }
};

exports.listStores = async (req, res) => {
  try {
    const q = req.query.q?.trim();
    const where = q ? { name: { [Op.like]: `%${q}%` } } : {};
    const stores = await Store.findAll({
      where,
      include: [{ model: RatingAggregate, attributes: ["average_rating", "total_ratings"] }]
    });
    res.json({ stores });
  } catch (e) {
    res.status(500).json({ message: "List stores failed", error: e.message });
  }
};

exports.getStore = async (req, res) => {
  try {
    const store = await Store.findByPk(req.params.storeId, {
      include: [{ model: RatingAggregate, attributes: ["average_rating", "total_ratings"] },
                { model: Rating, limit: 10, order: [["id","DESC"]] }]
    });
    if (!store) return res.status(404).json({ message: "Store not found" });
    res.json({ store });
  } catch (e) {
    res.status(500).json({ message: "Get store failed", error: e.message });
  }
};

exports.myStores = async (req, res) => {
  try {
    const stores = await Store.findAll({
      where: { ownerId: req.user.id },
      include: [{ model: RatingAggregate }]
    });
    res.json({ stores });
  } catch (e) {
    res.status(500).json({ message: "My stores failed", error: e.message });
  }
};
