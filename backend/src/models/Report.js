const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
  type: { 
    type: String, 
    required: true,
    trim: true
  },

  description: { 
    type: String, 
    required: true,
    trim: true
  },

  location: { 
    type: String, 
    required: true,
    trim: true
  },

  photo: { 
    type: String 
  },

  status: {
    type: String,
    enum: ["pending", "resolved"],
    default: "pending"
  },

  reportedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true
  }

},
{ timestamps: true }
);

// ✅ FIXED EXPORT
module.exports = mongoose.models.Report || mongoose.model("Report", reportSchema);
