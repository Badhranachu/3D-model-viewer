const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Model3D = require("../models/Model3D");

// Cloudinary config (make sure already configured in server.js or here)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: '3d-models',
    resource_type: 'raw', // important for .glb
    format: async () => 'glb', // force format
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage });

// ✅ Upload route
router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      console.error("❌ No file uploaded or path missing.");
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    console.log("📦 Uploaded to Cloudinary:", req.file.path);

    const newModel = new Model3D({
      filename: req.file.originalname,
      filepath: req.file.path,
    });

    const savedModel = await newModel.save();
    return res.status(201).json({ success: true, model: savedModel });

  } catch (err) {
    console.error("🔥 Upload failed:", err);
    return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

module.exports = router;
