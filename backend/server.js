// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // For cookie handling
const multer = require("multer"); // For file uploads
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const designerRoutes = require("./routes/designerRoutes");
const templateRoutes = require("./routes/templateRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("./config/database"); // Connect to the database
const notificationRoutes = require("./routes/notificationRoutes");

const app = express();
const corsOptions = {
  origin: ["http://127.0.0.1:5500", "https://charcuterietemplates.com"], // Replace with your frontend origin if different
  // origin: "http://127.0.0.1:5500", // Replace with your frontend origin if different
  credentials: true, // Allow credentials (cookies) to be sent
};

// Middleware setup
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser()); // Enable cookies

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/auth", authRoutes);
app.use("/designer", designerRoutes);
app.use("/template", templateRoutes); // Use the template routes with the "/template" prefix
app.use("/admin", adminRoutes);

// notifiction route
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
