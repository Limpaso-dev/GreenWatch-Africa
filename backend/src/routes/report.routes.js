const express = require("express");
const router = express.Router();

const { 
  createReport, 
  getReports, 
  deleteReport, 
  updateReportStatus 
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// Create report
router.post("/", authMiddleware, upload.single("photo"), createReport);

// Get reports
router.get("/", authMiddleware, getReports);

// Delete
router.delete("/:id", authMiddleware, deleteReport);

// Update status (ADMIN)
router.put("/:id/status", authMiddleware, updateReportStatus);

module.exports = router;