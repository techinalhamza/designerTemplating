// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const SECRET_KEY =
  "f2c36675f1b68a6a823e598d2a47e0a93c3c7a55a24d2f88d99248eb93d3e24f9cdedb21766d3ff4f6b63770f54713ad"; // Ensure this matches the one in authController.js

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
