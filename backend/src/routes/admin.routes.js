const express = require("express");
const router = express.Router();

const Report = require("../models/report"); // ✅ correct path
const authMiddleware = require("../middleware/authMiddleware");

// ================= GET ALL REPORTS (ADMIN ONLY) =================
router.get("/reports", authMiddleware, async (req, res) => {
  try {
    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    // ✅ return clean array (better for frontend)
    res.status(200).json(reports);

  } catch (error) {
    console.error("GET REPORTS ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= DELETE REPORT (ADMIN ONLY) =================
router.delete("/reports/:id", authMiddleware, async (req, res) => {
  try {
    // Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.deleteOne();

    res.status(200).json({ message: "Report deleted successfully" });

  } catch (error) {
    console.error("DELETE REPORT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


// ================= OPTIONAL: UPDATE REPORT STATUS =================
router.put("/reports/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);

  } catch (error) {
    console.error("UPDATE REPORT ERROR:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;