const { Template } = require("../models");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dwnolb6h5",
  api_key: "143551781416216",
  api_secret: "YfkCyzpwAgVpRQHME49FS-7YMXI",
});

// Upload a template with images to Cloudinary
exports.uploadTemplate = async (req, res) => {
  const { description, sku } = req.body;

  // Check if files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const images = []; // Array to store Cloudinary URLs

  try {
    // Loop through each uploaded file, upload it to Cloudinary, and delete from server
    for (const file of req.files) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "templates",
      });
      images.push(result.secure_url); // Store the Cloudinary URL

      // Delete the file from local server
      fs.unlinkSync(file.path);
    }

    // Save the template to the database with Cloudinary URLs
    const template = new Template({
      designerId: req.user.id,
      description,
      sku,
      images, // Store Cloudinary URLs in the template model
    });

    await template.save();
    res
      .status(201)
      .json({ message: "Template uploaded successfully", template });
  } catch (error) {
    console.error("Error uploading template:", error);
    res.status(500).json({ message: "Template upload failed" });
  }
};

// Get templates by designer
exports.getDesignerTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ designerId: req.user.id }).select(
      "description images sku status createdAt"
    );
    res.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500).send("Error fetching templates.");
  }
};

// Get sales data for approved templates by designer
exports.getSalesData = async (req, res) => {
  try {
    const templates = await Template.find({
      designerId: req.user.id,
      status: "approved",
    }).select("sku sales_count description images createdAt");

    res.json(templates);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Error fetching sales data." });
  }
};
