// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Designer = require('./database'); // Import Designer model

const app = express();
const SECRET_KEY = "your_secret_key"; // Replace with a secure key for production

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Designer registration route
app.post('/designer-register', async (req, res) => {
  const { name, email, password, social, phone, payment_method, paypal_email, venmo_username, cashapp_username } = req.body;

  try {
    // Check if a designer with this email already exists
    const existingDesigner = await Designer.findOne({ email });
    if (existingDesigner) {
      return res.status(400).send('A designer with this email already exists.');
    }

    // Create a new designer document with password
    const newDesigner = new Designer({
      name,
      email,
      password, // Password will be hashed automatically by pre-save middleware in the schema
      social,
      phone,
      payment_method,
      payment_details: {
        paypal_email,
        venmo_username,
        cashapp_username
      }
    });

    await newDesigner.save();
    console.log('Designer registered:', newDesigner);
    res.send('Designer registration successful!');
  } catch (error) {
    console.error('Error saving designer:', error);
    res.status(500).send('Registration failed. Please try again.');
  }
});

// Designer login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const designer = await Designer.findOne({ email });
    if (!designer) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, designer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: designer._id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Login failed. Please try again." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
