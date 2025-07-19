const mongoose = require("mongoose");

const model3DSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    cloudinaryUrl: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  { timestamps: { createdAt: "uploadedAt" } }
);

module.exports = mongoose.model("Model3D", model3DSchema);
