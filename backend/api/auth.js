const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const db = require("../config/db");

// Create endpoint for signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check to see if email already in use
    const [existing_accounts] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    if (existing_accounts.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create user in database
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );

    return res.status(201).json({ message: "Account Created Successfully" });
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ message: "Server error" });
    S;
  }
});

// Create endpoint for login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find any account with matching email
    const [existing_accounts] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    // Error if no account found
    if (existing_accounts.length === 0) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const account = existing_accounts[0];

    // Compare password with stored hash, determine if matching
    const passwordCorrect = bcrypt.compareSync(password, account.password);
    if (!passwordCorrect) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Create JWT token for later authentication
    const token = jwt.encode(
      {
        userId: account.id,
        email: account.email,
        username: account.username,
        role: account.role,
        exp: Date.now() + 24 * 60 * 60 * 1000,
      },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
