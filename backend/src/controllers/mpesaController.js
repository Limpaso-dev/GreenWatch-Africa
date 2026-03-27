const axios = require("axios");
const User = require("../models/User");

// ================= GET ACCESS TOKEN =================
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(
      `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
    ).toString("base64");

    const { data } = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    return data.access_token;

  } catch (error) {
    console.error("❌ Access Token Error:", error.response?.data || error.message);
    throw new Error("Failed to get access token");
  }
};

// ================= FORMAT PHONE =================
const formatPhone = (phone) => {
  if (!phone) return null;

  if (phone.startsWith("0")) {
    return "254" + phone.substring(1);
  }

  if (phone.startsWith("+254")) {
    return phone.replace("+", "");
  }

  return phone;
};

// ================= STK PUSH =================
const stkPush = async (req, res) => {
  try {
    let { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    phone = formatPhone(phone);

    // 🔥 DEBUG LOG
    console.log("📲 STK Request for:", phone);

    const token = await getAccessToken();

    // Timestamp
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:TZ.]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      process.env.SHORTCODE +
      process.env.PASSKEY +
      timestamp
    ).toString("base64");

    // 🔥 DEBUG ENV CHECK
    if (!process.env.SHORTCODE || !process.env.PASSKEY) {
      return res.status(500).json({
        message: "M-Pesa credentials missing",
      });
    }

    const { data } = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: 100,
        PartyA: phone,
        PartyB: process.env.SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "GreenWatch",
        TransactionDesc: "Premium Access",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ✅ FIXED
        },
        timeout: 10000,
      }
    );

    console.log("✅ STK Push Response:", data);

    return res.status(200).json({
      message: "STK Push sent successfully",
      data,
    });

  } catch (error) {
    console.error("❌ STK Push Error FULL:", error.response?.data || error.message);

    return res.status(500).json({
      message: "STK Push failed",
      error: error.response?.data || error.message,
    });
  }
};

// ================= CALLBACK =================
const mpesaCallback = async (req, res) => {
  try {
    const callback = req.body?.Body?.stkCallback;

    if (!callback) {
      console.log("⚠️ Invalid callback structure");
      return res.json({ message: "Invalid callback" });
    }

    console.log("📥 CALLBACK RECEIVED:", JSON.stringify(callback, null, 2));

    const resultCode = callback.ResultCode;

    if (resultCode === 0) {
      const metadata = callback.CallbackMetadata?.Item || [];

      const phone = metadata.find(i => i.Name === "PhoneNumber")?.Value;

      if (!phone) {
        console.log("⚠️ Phone not found in callback");
        return res.json({ message: "Phone missing" });
      }

      const user = await User.findOneAndUpdate(
        { phone: phone.toString() },
        { isPremium: true },
        { new: true }
      );

      if (user) {
        console.log(`💎 PREMIUM ACTIVATED for ${user.email}`);
      } else {
        console.log("⚠️ No user found for phone:", phone);
      }

    } else {
      console.log("❌ Payment failed:", callback.ResultDesc);
    }

    return res.json({ message: "Callback received" });

  } catch (error) {
    console.error("❌ Callback Error:", error.message);

    return res.json({ message: "Callback error handled" });
  }
};

module.exports = {
  stkPush,
  mpesaCallback,
};