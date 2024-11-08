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

  const images = [];

  try {
    // Upload each image to Cloudinary and delete from server
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "templates",
      });
      images.push(result.secure_url);

      // Delete the file from local storage
      fs.unlinkSync(file.path);
    }

    // Save the template to the database with Cloudinary URLs
    const template = new Template({
      designerId: req.user.id,
      description,
      sku,
      images,
      status: "pending",
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

// Get total revenue and detailed sales data for each template
exports.getSalesData = async (req, res) => {
  const COMMISSION_RATE = 0.3; // 30% commission rate
  const PRICE_PER_TEMPLATE = 100; // Example price per template sale

  try {
    const templates = await Template.find({
      designerId: req.user.id,
      status: "approved",
    }).select("sku sales_count description images createdAt");

    let totalRevenue = 0;

    const templatesWithEarnings = templates.map((template) => {
      const earnings =
        template.sales_count * PRICE_PER_TEMPLATE * COMMISSION_RATE;
      totalRevenue += earnings;
      return {
        ...template.toObject(),
        earnings,
      };
    });

    res.json({ totalRevenue, templates: templatesWithEarnings });
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ message: "Error fetching sales data." });
  }
};
