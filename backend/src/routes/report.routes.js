const express = require("express");
const router = express.Router();

const { 
  createReport, 
  getReports, 
  getAllReports,   // ✅ NEW
  deleteReport, 
  updateReportStatus 
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// ================= CREATE REPORT =================
router.post("/", authMiddleware, upload.single("photo"), createReport);

// ================= GET MY REPORTS =================
router.get("/", authMiddleware, getReports);

// ================= GET ALL REPORTS (ADMIN) =================
router.get("/all", authMiddleware, getAllReports);

// ================= DELETE REPORT =================
router.delete("/:id", authMiddleware, deleteReport);

// ================= UPDATE STATUS (ADMIN) =================
router.put("/:id/status", authMiddleware, updateReportStatus);

module.exports = router;