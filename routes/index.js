const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/stores", require("./storeRoutes"));
router.use("/ratings", require("./ratingRoutes"));
router.use("/admin", require("./adminRoutes"));

module.exports = router;
