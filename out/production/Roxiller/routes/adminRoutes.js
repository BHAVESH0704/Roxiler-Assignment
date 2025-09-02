const router = require("express").Router();
const auth = require("../middleware/auth");
const { rules } = require("../middleware/validators");
const { listUsers, setRole } = require("../controllers/adminController");

router.get("/users", auth(["ADMIN"]), listUsers);
router.patch("/users/:userId/role", auth(["ADMIN"]), rules.setRole, setRole);

module.exports = router;

