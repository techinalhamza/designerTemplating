const express = require("express");
const router = express.Router();
const templateController = require("../controllers/templateController");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

// Configure Multer for temporary file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Temporary local storage
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage: storage, limits: { files: 4 } });

// Route for uploading a new template with images (using Cloudinary)
router.post(
  "/upload",
  authenticateToken,
  upload.array("images", 4),
  async (req, res) => {
    const { description, sku } = req.body;
    const images = [];

    try {
      // Upload each image to Cloudinary and delete from server
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "templates",
        });
        images.push(result.secure_url);

        // Remove the image from local storage
        fs.unlinkSync(file.path);
      }

      // Call the controller to save the template with Cloudinary URLs
      await templateController.saveTemplate(req, res, {
        description,
        sku,
        images,
      });
    } catch (error) {
      console.error("Error uploading template:", error);
      res.status(500).json({ message: "Template upload failed" });
    }
  }
);

// Route for fetching all templates uploaded by the designer
router.get("/", authenticateToken, templateController.getDesignerTemplates);

// Route for fetching sales data for templates
router.get("/sales-data", authenticateToken, templateController.getSalesData);

module.exports = router;
