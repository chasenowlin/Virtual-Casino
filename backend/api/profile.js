const router = require("express").Router();
const db = require("../config/db");
const tokenMiddleware = require("../middleware/token");

// Create endpoint for signup
router.get("/", tokenMiddleware, async (req, res) => {
  try {
    // Query database for user
    const [existing_accounts] = await db.query(
      "SELECT username, email, role FROM users WHERE id = ?",
      [req.account.userId],
    );

    if (existing_accounts.length !== 1) {
      return res.status(404).json({ message: "Account Not Found" });
    }

    return res.status(200).json({
      message: "Profile Found",
      account: existing_accounts[0],
    });
  } catch (e) {
    console.error("Profile error:", e);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
