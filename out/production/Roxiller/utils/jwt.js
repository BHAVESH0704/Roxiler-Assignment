// backend/utils/jwt.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES });
};

module.exports = { generateAccessToken, generateRefreshToken };
