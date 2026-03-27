const Report = require("../models/Report");
const fs = require("fs");

// ================= CREATE REPORT =================
const createReport = async (req, res) => {
  try {
    const { type, description, location } = req.body;

    if (!type || !description || !location) {
      return res.status(400).json({
        message: "All fields (type, description, location) are required",
      });
    }

    const photo = req.file ? req.file.path : null;

    const report = await Report.create({
      type,
      description,
      location,
      photo,
      reportedBy: req.user._id,
    });

    return res.status(201).json({
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {
    console.error("❌ Create Report Error:", error.message);

    return res.status(500).json({
      message: "Failed to create report",
    });
  }
};

// ================= GET MY REPORTS =================
const getReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user._id })
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    return res.json({ reports });

  } catch (error) {
    console.error("❌ Get Reports Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};

// ================= GET ALL REPORTS (ADMIN) =================
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    return res.json({ reports });

  } catch (error) {
    console.error("❌ Get All Reports Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch all reports",
    });
  }
};

// ================= DELETE REPORT =================
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Check ownership or admin
    if (
      req.user.role !== "admin" &&
      report.reportedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this report",
      });
    }

    // ✅ Delete image if exists
    if (report.photo && fs.existsSync(report.photo)) {
      fs.unlinkSync(report.photo);
    }

    await report.deleteOne();

    return res.json({
      message: "Report deleted successfully",
    });

  } catch (error) {
    console.error("❌ Delete Report Error:", error.message);

    return res.status(500).json({
      message: "Failed to delete report",
    });
  }
};

// ================= UPDATE STATUS (ADMIN) =================
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    report.status = status;
    await report.save();

    return res.json({
      message: "Report status updated",
      report,
    });

  } catch (error) {
    console.error("❌ Update Status Error:", error.message);

    return res.status(500).json({
      message: "Failed to update report status",
    });
  }
};

module.exports = {
  createReport,
  getReports,
  getAllReports,
  deleteReport,
  updateReportStatus,
};