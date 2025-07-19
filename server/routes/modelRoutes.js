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
    const result = await cloudinary.uploader.upload(req.file.path, {
  resource_type: "raw",
  folder: "3d_models",
    });

    fs.unlinkSync(req.file.path); // delete temp file

 const newModel = new Model3D({
  filename: req.file.originalname,
  cloudinaryUrl: result.secure_url,
  public_id: result.public_id,
});
await newModel.save();
    console.log("✅ Model uploaded to Cloudinary:", result.secure_url);


    const savedModel = await newModel.save();

    return res.status(201).json({ message: "Model uploaded successfully", model: savedModel });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    return res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ GET /api/models — List all uploaded models from MongoDB
// ✅ GET /api/models — List all uploaded models from MongoDB
router.get("/", async (req, res) => {
  try {
    const models = await Model3D.find().sort({ createdAt: -1 });
    res.status(200).json(models);
  } catch (err) {
    console.error("❌ Error fetching models:", err.message);
    res.status(500).json({ error: "Failed to fetch models" });
  }
});

const cloudinary = require("../config/cloudinary"); // or correct path
const fs = require("fs");

router.post("/models", upload.single("model"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "raw",  // necessary for .glb
      public_id: `models/${Date.now()}-${req.file.originalname}`,
    });

    // Optional: delete local file after upload
    fs.unlinkSync(filePath);

    const newModel = new Model({
      filename: req.file.originalname,
      cloudinaryUrl: result.secure_url,
    });

    await newModel.save();

    res.status(201).json({ message: "Model uploaded", model: newModel });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed", details: error.message });
  }
});



module.exports = router;
