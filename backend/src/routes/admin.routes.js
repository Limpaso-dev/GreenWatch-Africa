const express = require("express");
const router = express.Router();

const {
  getUsers,
  deleteUser,
} = require("../controllers/adminController");

// ✅ FIXED IMPORT
const { protect, admin } = require("../middleware/authMiddleware");

// ================= GET ALL USERS =================
router.get("/users", protect, admin, getUsers);

// ================= DELETE USER =================
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;