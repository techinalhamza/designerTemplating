// controllers/authController.js
const { Designer } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

// Register a new designer
exports.registerDesigner = async (req, res) => {
  const {
    name,
    email,
    password,
    social,
    phone,
    payment_method,
    paypal_email,
    venmo_username,
    cashapp_username,
  } = req.body;

  try {
    const existingDesigner = await Designer.findOne({ email });
    if (existingDesigner)
      return res.status(400).send("A designer with this email already exists.");

    const newDesigner = new Designer({
      name,
      email,
      password,
      social,
      phone,
      payment_method,
      payment_details: { paypal_email, venmo_username, cashapp_username },
    });
    await newDesigner.save();
    res.send("Designer registration successful!");
  } catch (error) {
    res.status(500).send("Registration failed.");
  }
};

// Login designer
exports.loginDesigner = async (req, res) => {
  const { email, password } = req.body;

  try {
    const designer = await Designer.findOne({ email });
    if (!designer || !(await bcrypt.compare(password, designer.password))) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: designer._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed." });
  }
};
