const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Model3D = require("../models/Model3D"); // Make sure this is imported

// Cloudinary storage config for .glb files
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: '3d-models',
    resource_type: 'raw', // For non-image like .glb
    format: async () => 'glb',
  },
});

const upload = multer({ storage });

// POST route to upload
router.post("/upload", upload.single("model"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "3d_models",
    });

    // Delete local file
    fs.unlinkSync(req.file.path);

    // Save Cloudinary URL to MongoDB
    const newModel = new Model3D({
      filename: req.file.originalname,
      filepath: result.secure_url,  // ✅ Cloudinary hosted URL
    });

    const savedModel = await newModel.save();

    return res.status(201).json({ success: true, model: savedModel });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
});
module.exports = router;
