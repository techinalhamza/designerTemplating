// controllers/templateController.js
const { Template } = require("../models");

// Upload a template with images
exports.uploadTemplate = async (req, res) => {
  const { description, sku } = req.body;

  // Check if files were uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  const images = req.files.map((file) => file.path); // Store file paths in an array

  try {
    const template = new Template({
      designerId: req.user.id,
      description,
      sku,
      images, // Store image paths in the template model
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
