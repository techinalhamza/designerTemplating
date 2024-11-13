const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  designerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Designer",
    required: true,
  },
  description: { type: String, required: true },
  sku: { type: String, required: true },
  images: [String],
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Templated"],
    default: "Pending",
  },
  upcCode: { type: String, default: null },
  sales_count: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Template = mongoose.model("Template", templateSchema);
module.exports = Template;
