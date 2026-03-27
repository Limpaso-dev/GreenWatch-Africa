const User = require("../models/User");

// ================= GET ALL USERS =================
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({ users });

  } catch (error) {
    console.error("❌ Get Users Error:", error.message);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// ================= DELETE USER =================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("❌ Delete User Error:", error.message);

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
};