const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../db");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

dotenv.config();

const app = express();

// ================= CONNECT DB =================
connectDB();

// ================= TRUST PROXY =================
app.set("trust proxy", 1);

// ================= ENSURE UPLOADS DIR =================
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked by CORS:", origin);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
  })
);

// ================= LOGGER =================
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`, req.body);
  next();
});

// ================= STATIC =================
app.use("/uploads", express.static(uploadsDir));

// ================= ROUTES =================
const authRoutes = require("./routes/auth.routes");
const reportRoutes = require("./routes/report.routes");
const adminRoutes = require("./routes/admin.routes");
const mpesaRoutes = require("./routes/mpesa.routes");

app.get("/", (req, res) => {
  res.send("GreenWatch Africa Backend is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/mpesa", mpesaRoutes);

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);

  let statusCode = err.status || 500;

  if (err.name === "MulterError") {
    statusCode = 400;
  }

  if (
    err.message === "Only image files (jpg, jpeg, png) are allowed" ||
    err.message === "CORS not allowed"
  ) {
    statusCode = err.message === "CORS not allowed" ? 403 : 400;
  }

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
});

// ================= START =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
