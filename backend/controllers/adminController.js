const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Admin, Template } = require("../models"); // Destructure both Admin and Template from models
const SECRET_KEY =
  "f2c36675f1b68a6a823e598d2a47e48eb93d3e24f9cdedb21766d3ff4f6b63770f54713ad0a93c3c7a55a24d2f88d992"; // Replace with an actual secure key

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate a token with a role claim
    const token = jwt.sign({ id: admin._id, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Login failed. Please try again." });
  }
};

// View pending templates
exports.getPendingTemplates = async (req, res) => {
  try {
    const pendingTemplates = await Template.find({ status: "pending" });
    res.json(pendingTemplates);
  } catch (error) {
    console.error("Error fetching pending templates:", error);
    res.status(500).json({ message: "Error fetching pending templates." });
  }
};

// Approve a template
exports.approveTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ message: "Template not found." });
    }
    res.json({ message: "Template approved successfully", template });
  } catch (error) {
    console.error("Error approving template:", error);
    res.status(500).json({ message: "Error approving template." });
  }
};

// Reject a template
exports.rejectTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    if (!template) {
      return res.status(404).json({ message: "Template not found." });
    }
    res.json({ message: "Template rejected successfully", template });
  } catch (error) {
    console.error("Error rejecting template:", error);
    res.status(500).json({ message: "Error rejecting template." });
  }
};

// Get all approved templates
exports.getApprovedTemplates = async (req, res) => {
  try {
    const approvedTemplates = await Template.find({ status: "approved" });
    res.json(approvedTemplates);
  } catch (error) {
    console.error("Error fetching approved templates:", error);
    res.status(500).json({ message: "Error fetching approved templates." });
  }
};
