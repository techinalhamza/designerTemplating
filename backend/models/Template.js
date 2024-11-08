// models/Template.js
const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designer",
      required: true,
    },
    images: [{ type: String }], // Store multiple image paths
    description: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    sales_count: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
