// routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Model3D = require("../models/Model3D");

// Configure cloudinary (or do this globally)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: '3d-models',
    resource_type: 'raw',
    format: async () => 'glb',
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newModel = new Model3D({
      filename: req.file.originalname,
      filepath: req.file.path,         // ✅ Cloudinary URL
      cloudinaryId: req.file.filename, // ✅ Public ID from Cloudinary
      uploadedAt: new Date()
    });

    const savedModel = await newModel.save();
    return res.status(201).json({ success: true, model: savedModel });

  } catch (err) {
    console.error("🔥 Upload failed:", err);
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});


module.exports = router;
