// server/models/Model3D.js
const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Model3D", modelSchema);
