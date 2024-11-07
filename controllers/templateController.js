// controllers/templateController.js
const { Template } = require("../models");

// Upload a template
exports.uploadTemplate = async (req, res) => {
  const { description, image, sku } = req.body;

  try {
    const template = new Template({
      designerId: req.user.id,
      description,
      image,
      sku,
    });
    await template.save();
    res
      .status(201)
      .json({ message: "Template uploaded successfully.", template });
  } catch (error) {
    console.error("Error uploading template:", error);
    res.status(500).send("Template upload failed.");
  }
};

// Get templates by designer
exports.getDesignerTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ designerId: req.user.id }).select(
      "description image sku status createdAt"
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
    // Find only approved templates by this designer
    const templates = await Template.find({
      designerId: req.user.id,
      status: "approved",
    }).select("sku sales_count description createdAt");

    res.json(templates);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Error fetching sales data." });
  }
};
