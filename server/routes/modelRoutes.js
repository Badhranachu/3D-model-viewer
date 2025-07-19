const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");
const Model3D = require("../models/Model3D");

const router = express.Router();

// Multer temp storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "temp/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// ✅ POST /api/models — Upload 3D model to Cloudinary and save to MongoDB
router.post("/", upload.single("model"), async (req, res) => {
  console.log("▶️ Upload request received");

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // use raw for 3D files
      folder: "3d_models",
    });

    // Delete temp file
    fs.unlinkSync(req.file.path);

    // Save metadata to MongoDB
    const newModel = new Model3D({
      filename: req.file.originalname,
      cloudinaryUrl: result.secure_url,
      public_id: result.public_id,
    });

    const savedModel = await newModel.save();

    res.status(201).json({ message: "Model uploaded successfully", model: savedModel });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ GET /api/models — List all uploaded models from MongoDB
router.get("/", async (req, res) => {
  try {
    res.send("Fetching all models...");
    const models = await Model3D.find().sort({ createdAt: -1 });
    res.json(models);
  } catch (err) {
    console.error("❌ Error fetching models:", err.message);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

module.exports = router;
