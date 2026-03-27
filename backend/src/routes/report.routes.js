const express = require("express");
const router = express.Router();

const {
  createReport,
  getReports,
  getAllReports,
  deleteReport,
  updateReportStatus,
} = require("../controllers/reportController");

// ✅ FIXED IMPORT
const { protect, admin } = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

// ================= CREATE REPORT =================
router.post("/", protect, upload.single("photo"), createReport);

// ================= GET MY REPORTS =================
router.get("/", protect, getReports);

// ================= GET ALL REPORTS (ADMIN) =================
router.get("/all", protect, admin, getAllReports);

// ================= DELETE REPORT =================
router.delete("/:id", protect, deleteReport);

// ================= UPDATE STATUS (ADMIN) =================
router.put("/:id/status", protect, admin, updateReportStatus);

module.exports = router;