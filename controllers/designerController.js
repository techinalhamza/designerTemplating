// controllers/designerController.js
const { Designer } = require("../models");

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
    res.status(500).send("Error updating payment information.");
  }
};
