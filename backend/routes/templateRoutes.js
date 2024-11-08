const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dwnolb6h5",
  api_key: "143551781416216",
  api_secret: "YfkCyzpwAgVpRQHME49FS-7YMXI",
});

// Configure Multer for temporary file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { files: 4 } });

// Route for uploading a new template with images (using Cloudinary)
router.post(
  "/upload",
  authenticateToken,
  upload.array("images", 4),
  templateController.uploadTemplate // Use the uploadTemplate function directly
);

// Route for fetching all templates uploaded by the designer
router.get("/", authenticateToken, templateController.getDesignerTemplates);

// Route for fetching sales data for templates
router.get("/sales-data", authenticateToken, templateController.getSalesData);

module.exports = router;
