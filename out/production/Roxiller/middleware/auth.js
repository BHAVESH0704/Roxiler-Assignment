const { verifyAccess } = require("../utils/jwt");

const auth = (roles = []) => {
  const allowed = Array.isArray(roles) ? roles : [roles];
  return (req, res, next) => {
    const hdr = req.headers["authorization"];
    if (!hdr) return res.status(401).json({ message: "Missing Authorization header" });
    const token = hdr.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing Bearer token" });

    try {
      const decoded = verifyAccess(token);
      req.user = decoded;
      if (allowed.length && !allowed.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (e) {
      return res.status(401).json({ message: "Invalid/Expired token" });
    }
  };
};

module.exports = auth;
