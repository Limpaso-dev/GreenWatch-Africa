const Report = require("../models/Report");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");

const normalizeText = (value) => value?.toString().trim();

const normalizePhotoPath = (photoPath) =>
  photoPath ? photoPath.replace(/\\/g, "/") : photoPath;

const formatReportResponse = (report) => {
  const formattedReport = report.toObject ? report.toObject() : report;

  return {
    ...formattedReport,
    photo: normalizePhotoPath(formattedReport.photo),
  };
};

const resolvePhotoFilePath = (photoPath) => {
  if (!photoPath) {
    return null;
  }

  if (path.isAbsolute(photoPath)) {
    return photoPath;
  }

  const sanitizedRelativePath = photoPath
    .replace(/^\/+/, "")
    .replace(/[\\/]+/g, path.sep);

  return path.resolve(__dirname, "../../", sanitizedRelativePath);
};

// ================= CREATE REPORT =================
const createReport = async (req, res) => {
  try {
    const type = normalizeText(req.body.type);
    const description = normalizeText(req.body.description);
    const location = normalizeText(req.body.location);

    if (!type || !description || !location) {
      return res.status(400).json({
        message: "All fields (type, description, location) are required",
      });
    }

    const photo = req.file ? `uploads/${req.file.filename}` : null;

    const report = await Report.create({
      type,
      description,
      location,
      photo,
      reportedBy: req.user._id,
    });

    return res.status(201).json({
      message: "Report submitted successfully",
      report: formatReportResponse(report),
    });
  } catch (error) {
    console.error("Create Report Error:", error.message);

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

    return res.json({ reports: reports.map(formatReportResponse) });
  } catch (error) {
    console.error("Get Reports Error:", error.message);

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

    return res.json({ reports: reports.map(formatReportResponse) });
  } catch (error) {
    console.error("Get All Reports Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch all reports",
    });
  }
};

// ================= DELETE REPORT =================
const deleteReport = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid report ID",
      });
    }

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      report.reportedBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this report",
      });
    }

    const photoFilePath = resolvePhotoFilePath(report.photo);

    if (photoFilePath && fs.existsSync(photoFilePath)) {
      fs.unlinkSync(photoFilePath);
    }

    await report.deleteOne();

    return res.json({
      message: "Report deleted successfully",
    });
  } catch (error) {
    console.error("Delete Report Error:", error.message);

    return res.status(500).json({
      message: "Failed to delete report",
    });
  }
};

// ================= UPDATE STATUS (ADMIN) =================
const updateReportStatus = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Invalid report ID",
      });
    }

    const status = normalizeText(req.body.status);

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
      report: formatReportResponse(report),
    });
  } catch (error) {
    console.error("Update Status Error:", error.message);

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
