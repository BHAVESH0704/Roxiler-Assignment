const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { signAccess, signRefresh, verifyRefresh } = require("../utils/jwt");

const SALT_ROUNDS = 12;

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash, role: role || "USER" });

    const accessToken = signAccess({ id: user.id, role: user.role });
    const refreshToken = signRefresh({ id: user.id, role: user.role });
    await user.update({ refreshToken });

    res.status(201).json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken, refreshToken
    });
  } catch (e) {
    res.status(500).json({ message: "Registration error", error: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = signAccess({ id: user.id, role: user.role });
    const refreshToken = signRefresh({ id: user.id, role: user.role });
    await user.update({ refreshToken });

    res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken, refreshToken
    });
  } catch (e) {
    res.status(500).json({ message: "Login error", error: e.message });
  }
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ message: "Missing refreshToken" });
  try {
    const payload = verifyRefresh(refreshToken);
    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
    const accessToken = signAccess({ id: user.id, role: user.role });
    const newRefresh = signRefresh({ id: user.id, role: user.role });
    await user.update({ refreshToken: newRefresh });
    res.json({ accessToken, refreshToken: newRefresh });
  } catch (e) {
    res.status(401).json({ message: "Invalid/Expired refresh token" });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "role"]
    });
    res.json({ user });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) await user.update({ refreshToken: null });
    res.json({ message: "Logged out" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};
