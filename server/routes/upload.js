const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
router.post('/upload', upload.single('model'), (req, res) => {
  try {
    res.status(200).json({
      message: 'Upload success',
      url: req.file.path,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
