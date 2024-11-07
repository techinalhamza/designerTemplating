// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authenticateAdmin = require("../middleware/authAdmin");

// Admin login route
router.post("/login", adminController.loginAdmin);

// Route for viewing pending templates
router.get(
  "/pending-templates",
  authenticateAdmin,
  adminController.getPendingTemplates
);

// Route to approve a template
router.put(
  "/approve-template/:id",
  authenticateAdmin,
  adminController.approveTemplate
);

// Route to reject a template
router.put(
  "/reject-template/:id",
  authenticateAdmin,
  adminController.rejectTemplate
);


// Route to view all approved templates
router.get("/approved-templates", authenticateAdmin, adminController.getApprovedTemplates);

module.exports = router;
