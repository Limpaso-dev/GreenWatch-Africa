const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../db");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/report.routes");

dotenv.config();

const app = express();

// Connect database
connectDB();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Serve uploads
app.use("/uploads", express.static(uploadsDir));

// Health check
app.get("/", (req, res) => {
  res.send("GreenWatch Africa Backend is running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 GreenWatch Africa server running on port ${PORT}`);
});