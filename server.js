// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const designerRoutes = require("./routes/designerRoutes");
const templateRoutes = require("./routes/templateRoutes");
require("./config/database"); // Import database connection

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/designer", designerRoutes);
app.use("/template", templateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
