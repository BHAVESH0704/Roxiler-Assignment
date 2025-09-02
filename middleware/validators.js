const { body, param } = require("express-validator");

const validate = (rules) => [
  ...rules,
  (req, res, next) => {
    const { validationResult } = require("express-validator");
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json({ errors: result.array() });
    next();
  },
];

const rules = {
  register: validate([
    body("name").isString().trim().notEmpty(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 6 }),
    body("role").optional().isIn(["ADMIN", "USER", "STORE_OWNER"]),
  ]),
  login: validate([
    body("email").isEmail().normalizeEmail(),
    body("password").isString().notEmpty(),
  ]),
  createStore: validate([
    body("name").isString().trim().notEmpty(),
  ]),
  rateStore: validate([
    param("storeId").isInt({ min: 1 }),
    body("rating").isInt({ min: 1, max: 5 })
  ]),
  setRole: validate([
    param("userId").isInt({ min: 1 }),
    body("role").isIn(["ADMIN", "USER", "STORE_OWNER"])
  ])
};

module.exports = { rules };
