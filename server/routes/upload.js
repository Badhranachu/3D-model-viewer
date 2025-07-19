// routes/upload.js
const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Model3D = require("../models/Model3D");

const router = express.Router();

// Cloudinary config (or load via global config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup multer with cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "3d_models",
    resource_type: "raw",
    format: async () => "glb", // Optional, you can remove if file extensions vary
    public_id: (req, file) => file.originalname.split('.')[0],
  }
});
const upload = multer({ storage });

// ✅ POST /api/models/upload
router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const newModel = new Model3D({
      filename: req.file.originalname,
      cloudinaryUrl: req.file.path,
      public_id: req.file.filename
    });

    const savedModel = await newModel.save();
    return res.status(201).json({ success: true, model: savedModel });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

module.exports = router;
