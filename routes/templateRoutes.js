// routes/templateRoutes.js
const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authenticateToken = require("../middleware/authMiddleware");

// Template routes
router.post("/upload", authenticateToken, templateController.uploadTemplate);
router.get("/", authenticateToken, templateController.getDesignerTemplates);

module.exports = router;
