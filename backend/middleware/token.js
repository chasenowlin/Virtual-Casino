const jwt = require("jwt-simple");

const token = (req, res, next) => {
  const token = req.headers["x-auth"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now()) {
      return res.status(401).json({ message: "Token expired" });
    }

    req.account = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = token;
