// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Registration and login routes
router.post("/register", authController.registerDesigner);
router.post("/login", authController.loginDesigner);

module.exports = router;
