// routes/templateRoutes.js
const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer");

// Configure Multer storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Create a unique filename
  },
});

// Multer upload configuration (limit to 4 images)
const upload = multer({ storage: storage, limits: { files: 4 } });

// Route for uploading a new template with images (requires authentication)
router.post(
  "/upload",
  authenticateToken,
  upload.array("images", 4),
  templateController.uploadTemplate
);

// Route for fetching all templates uploaded by the designer (requires authentication)
router.get("/", authenticateToken, templateController.getDesignerTemplates);

// Route for fetching sales data (requires authentication)
router.get("/sales-data", authenticateToken, templateController.getSalesData);

module.exports = router;
