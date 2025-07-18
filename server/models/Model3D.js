const mongoose = require('mongoose');

const model3DSchema = new mongoose.Schema({
  filename: String,
  filepath: String,        // ✅ Cloudinary URL stored here
  cloudinaryId: String,    // ✅ Optional
  uploadedAt: Date
});

module.exports = mongoose.model("Model3D", model3DSchema);
