require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// mysql connection
const db = require("./config/db");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./api/auth"));

// Start Backend
const PORT = process.env.BACKEND_PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
