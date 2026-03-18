const Report = require("../models/Report");

// ================= CREATE REPORT =================
const createReport = async (req, res) => {
  try {
    const { type, description, location } = req.body;

    if (!type || !description || !location) {
      return res.status(400).json({
        message: "All fields (type, description, location) are required"
      });
    }

    const photo = req.file ? req.file.path : null;

    const report = await Report.create({
      type,
      description,
      location,
      photo,
      reportedBy: req.user._id
    });

    res.status(201).json({
      message: "Report submitted successfully",
      report
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= GET ALL REPORTS =================
const getReports = async (req, res) => {
  try {
    const reports = await Report
      .find()
      .populate("reportedBy", "name email")
      .sort({ createdAt: -1 });

    res.json({ reports });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= DELETE REPORT =================
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    // Admin OR owner
    if (
      req.user.role !== "admin" &&
      report.reportedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this report"
      });
    }

    await report.deleteOne();

    res.json({
      message: "Report deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// ================= UPDATE STATUS (ADMIN ONLY) =================
const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found"
      });
    }

    // Only admin can update status
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    report.status = status;
    await report.save();

    res.json({
      message: "Report status updated",
      report
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createReport,
  getReports,
  deleteReport,
  updateReportStatus
};