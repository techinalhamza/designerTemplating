// models/Template.js
const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },
    image: { type: String, required: true },
    description: { type: String },
    sku: { type: String, unique: true },
    sales_count: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
); // Enable timestamps

module.exports = mongoose.model("Template", templateSchema);
