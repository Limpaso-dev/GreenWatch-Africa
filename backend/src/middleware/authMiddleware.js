const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= PROTECT ROUTES =================
const protect = async (req, res, next) => {
  try {
    let token;

    // Extract token
    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Attach user
    req.user = user;

    next();

  } catch (error) {
    console.error("❌ Auth Error:", error.message);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Session expired, please login again",
      });
    }

    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

// ================= ADMIN ONLY =================
const admin = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Admins only.",
  });
};

// ================= EXPORT =================
module.exports = {
  protect,
  admin,
};