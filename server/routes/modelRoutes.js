const express = require("express");
const multer = require("multer");
const path = require("path");
const Model3D = require("../models/Model3D");

const router = express.Router();

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage: storage });

// ✅ POST /api/models — Upload a model
router.post("/", upload.single("model"), async (req, res) => {
  console.log("▶️ Upload request received");

  if (!req.file) {
    console.log("❌ No file received");
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const newModel = new Model3D({
      filename: req.file.filename,
      filepath: req.file.path.replace(/\\/g, "/"),
    });

    const savedModel = await newModel.save();
    console.log("✅ Saved model:", savedModel);
    res.status(201).json({ message: "Model uploaded successfully", model: savedModel });
  } catch (err) {
    console.error("❌ Upload failed:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET /api/models — Get all uploaded models
// GET /api/models
// GET all models with full filepath URL
router.get("/", async (req, res) => {
  try {
    const models = await Model.find().sort({ uploadedAt: -1 });

    // Add full URL prefix for Render deployment
    const updatedModels = models.map((model) => ({
      ...model._doc,
      filepath: `https://3d-model-api.onrender.com/${model.filepath}`,
    }));

    res.json(updatedModels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch models", error });
  }
});


module.exports = router;
