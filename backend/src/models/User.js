const mongoose = require("mongoose");

// ================= PHONE FORMATTER =================
const formatPhone = (phone) => {
  if (!phone) return phone;

  if (phone.startsWith("0")) {
    return "254" + phone.substring(1);
  }

  if (phone.startsWith("+254")) {
    return phone.replace("+", "");
  }

  return phone;
};

// ================= PHONE VALIDATOR =================
const validatePhone = (phone) => {
  return /^2547\d{8}$/.test(phone);
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 📱 Phone (M-Pesa critical)
    phone: {
      type: String,
      required: true,
      unique: true,
      set: formatPhone,
      validate: {
        validator: validatePhone,
        message: "Invalid phone number. Use format 07XXXXXXXX",
      },
    },

    // 💎 Premium access
    isPremium: {
      type: Boolean,
      default: false,
    },

    premiumSince: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ================= AUTO PREMIUM DATE =================
userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update?.isPremium === true) {
    update.premiumSince = new Date();
  }

  next();
});

// ================= EXPORT =================
module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);