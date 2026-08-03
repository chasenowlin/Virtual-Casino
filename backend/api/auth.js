const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const db = require("../config/db");

// Create endpoint for signup
router.post("/signup", async (req, res) => {
  return res.status(201).json({ message: "Signup API" });
});

// Create endpoint for login
router.post("/login", async (req, res) => {
  return res.status(201).json({ message: "Login API" });
});

module.exports = router;
