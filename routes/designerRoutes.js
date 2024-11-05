// routes/designerRoutes.js
const express = require("express");
const router = express.Router();
const designerController = require("../controllers/designerController");
const authenticateToken = require("../middleware/authMiddleware");

// Update payment info
router.put(
  "/update-payment-info",
  authenticateToken,
  designerController.updatePaymentInfo
);

module.exports = router;
