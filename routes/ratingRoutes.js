const router = require("express").Router();
const auth = require("../middleware/auth");
const { rules } = require("../middleware/validators");
const { rateStore, myRatings } = require("../controllers/ratingController");

router.post("/:storeId", auth(["USER","STORE_OWNER","ADMIN"]), rules.rateStore, rateStore);
router.get("/me", auth(), myRatings);

module.exports = router;
