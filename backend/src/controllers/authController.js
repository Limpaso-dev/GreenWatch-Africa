const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= GENERATE TOKEN =================
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= HELPERS =================
const normalizeEmail = (email) => email?.toString().trim().toLowerCase();
const sanitizeString = (value) => value?.toString().trim();

// ================= REGISTER =================
const registerUser = async (req, res) => {
  console.log("📝 REGISTER REQUEST:", req.body);

  try {
    const name = sanitizeString(req.body.name);
    const email = normalizeEmail(req.body.email);
    const password = req.body.password?.toString();
    const phone = User.formatPhone(req.body.phone);

    // ✅ VALIDATION
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "All fields (name, email, password, phone) are required",
      });
    }

    if (!User.validatePhone(phone)) {
      return res.status(400).json({
        message: "Invalid phone number. Use format 07XXXXXXXX",
      });
    }

    // ✅ CHECK EXISTING USER
    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists (email or phone)",
      });
    }

    // ✅ HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ ASSIGN ROLE
    const role = email === "admin@gmail.com" ? "admin" : "user";

    // ✅ CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // ✅ RESPONSE
    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isPremium: user.isPremium,
      },
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR FULL:", error);

    // Duplicate key error (email/phone)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User already exists (email or phone)",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message:
          Object.values(error.errors)[0]?.message ||
          "Invalid user data",
      });
    }

    // Fallback
    res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email);
    const password = req.body.password?.toString();

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // include password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isPremium: user.isPremium,
      },
    });

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};

// ================= GET CURRENT USER =================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (error) {
    console.error("❌ GET ME ERROR:", error);

    res.status(500).json({
      message: error.message || "Failed to fetch user",
    });
  }
};

// ================= EXPORT =================
module.exports = {
  registerUser,
  loginUser,
  getMe,
};