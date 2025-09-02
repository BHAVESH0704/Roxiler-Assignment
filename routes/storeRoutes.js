const router = require("express").Router();
const { rules } = require("../middleware/validators");
const auth = require("../middleware/auth");
const { createStore, listStores, getStore, myStores } = require("../controllers/storeController");

router.get("/", listStores);
router.get("/:storeId", getStore);
router.get("/owner/mine", auth(["STORE_OWNER","ADMIN"]), myStores);
router.post("/", auth(["STORE_OWNER","ADMIN"]), rules.createStore, createStore);

module.exports = router;
