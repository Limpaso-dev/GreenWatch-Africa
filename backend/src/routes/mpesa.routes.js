const express = require("express");
const router = express.Router();

const {
  stkPush,
  mpesaCallback,
} = require("../controllers/mpesaController");

const { protect } = require("../middleware/authMiddleware");

// ================= ROUTES =================

// 💳 Initiate STK Push (Protected)
router.post("/stk", protect, stkPush);

// 🔁 M-Pesa Callback (MUST be public)
router.post("/callback", mpesaCallback);

// 🧪 Health check (very useful)
router.get("/test", (req, res) => {
  res.json({
    message: "M-Pesa route working ✅",
  });
});

module.exports = router;