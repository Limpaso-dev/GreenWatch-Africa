const mongoose = require("mongoose");

// ================= PHONE FORMATTER =================
const formatPhone = (phone) => {
  if (!phone) return phone;

  const normalizedPhone = phone.toString().trim().replace(/\s+/g, "");

  if (normalizedPhone.startsWith("0")) {
    return "254" + normalizedPhone.substring(1);
  }

  if (normalizedPhone.startsWith("+254")) {
    return normalizedPhone.replace("+", "");
  }

  return normalizedPhone;
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

// ✅ FIXED: NO next()
userSchema.pre("save", async function () {
  if (this.isModified("isPremium") && this.isPremium && !this.premiumSince) {
    this.premiumSince = new Date();
  }
});

// ✅ FIXED: NO next()
userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();

  if (update?.isPremium === true) {
    update.premiumSince = new Date();
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

User.formatPhone = formatPhone;
User.validatePhone = validatePhone;

module.exports = User;