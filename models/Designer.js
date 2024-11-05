// models/Designer.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const designerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  social: String,
  phone: String,
  payment_method: String,
  payment_details: {
    paypal_email: String,
    venmo_username: String,
    cashapp_username: String,
  },
});

// Hash password before saving
designerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("Designer", designerSchema);
