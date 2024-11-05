// database.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const mongoURI = 'mongodb+srv://charcuterietemplates:Sj1fcMT4BpLsOpC6@cluster0.3ycbz.mongodb.net'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const designerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Add password field
  social: String,
  phone: String,
  payment_method: String,
  payment_details: {
    paypal_email: String,
    venmo_username: String,
    cashapp_username: String
  }
});

// Middleware to hash password before saving to the database
designerSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Designer = mongoose.model('Designer', designerSchema);

module.exports = Designer;
