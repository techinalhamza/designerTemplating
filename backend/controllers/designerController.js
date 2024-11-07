// controllers/designerController.js
const { Designer } = require("../models");

// Get designer profile
exports.getProfile = async (req, res) => {
  try {
    const designer = await Designer.findById(req.user.id).select("-password"); // Exclude password from response
    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }
    res.json({
      name: designer.name,
      email: designer.email,
      phone: designer.phone,
      payment_method: designer.payment_method,
      payment_details: designer.payment_details,
    });
  } catch (error) {
    console.error("Error fetching designer profile:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch profile. Please try again." });
  }
};

// Update payment information
exports.updatePaymentInfo = async (req, res) => {
  const { payment_method, paypal_email, venmo_username, cashapp_username } =
    req.body;

  try {
    const updatedDesigner = await Designer.findByIdAndUpdate(
      req.user.id,
      {
        payment_method,
        payment_details: { paypal_email, venmo_username, cashapp_username },
      },
      { new: true }
    );

    res.json({
      message: "Payment information updated successfully.",
      updatedDesigner,
    });
  } catch (error) {
    console.error("Error updating payment information:", error);
    res.status(500).json({ message: "Error updating payment information." });
  }
};
