const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  cloudinaryUrl: String,
  cloudinaryId: String,
}, { timestamps: true });

module.exports = mongoose.model('Model3D', modelSchema);
