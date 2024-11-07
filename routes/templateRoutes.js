// routes/templateRoutes.js
const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authenticateToken = require("../middleware/authMiddleware");

// Route for uploading a new template (requires authentication)
router.post("/upload", authenticateToken, templateController.uploadTemplate);

// Route for fetching all templates uploaded by the designer (requires authentication)
router.get("/", authenticateToken, templateController.getDesignerTemplates); // Route for GET /

// Route for fetching sales data (requires authentication)
router.get("/sales-data", authenticateToken, templateController.getSalesData);

module.exports = router;
