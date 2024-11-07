// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const designerRoutes = require("./routes/designerRoutes");
const templateRoutes = require("./routes/templateRoutes"); // Import template routes
const adminRoutes = require("./routes/adminRoutes");
require("./config/database"); // Connect to the database

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/auth", authRoutes);
app.use("/designer", designerRoutes);
app.use("/template", templateRoutes); // Use the template routes with the "/template" prefix
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
