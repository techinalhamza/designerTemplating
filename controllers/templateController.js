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
    res.status(500).send("Template upload failed.");
  }
};

// Get templates by designer
exports.getDesignerTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ designerId: req.user.id });
    res.json(templates);
  } catch (error) {
    res.status(500).send("Error fetching templates.");
  }
};
