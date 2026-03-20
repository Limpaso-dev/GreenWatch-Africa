const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ✅ FIXED (lowercase)

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check if token exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      // Extract token
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from DB (without password)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "Not authorized, user not found",
        });
      }

      // ✅ Attach FULL user (includes role)
      req.user = user;

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = authMiddleware;