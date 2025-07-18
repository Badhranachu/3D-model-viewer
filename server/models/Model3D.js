const mongoose = require("mongoose");

const model3DSchema = new mongoose.Schema({
  filename: String,
  cloudinaryUrl: String,
  public_id: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Model3D", model3DSchema);
