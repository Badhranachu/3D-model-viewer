// backend/controllers/modelController.js
const Model3D = require('../models/model3D');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadModel = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload(file.path, {
  resource_type: 'auto', // ✅ Let Cloudinary auto-detect type
  folder: '3d-models',
  use_filename: true,
  unique_filename: false,
  overwrite: true,
});


    const model = new Model3D({
      name: file.originalname,
      cloudinaryUrl: result.secure_url,
      public_id: result.public_id,
    });

    await model.save();
    fs.unlinkSync(file.path);

    // ✅ Respond in expected format
    res.status(201).json({
      success: true,
      data: {
        _id: model._id,
        name: model.name,
        cloudinaryUrl: model.cloudinaryUrl,
        publicId: model.public_id,
      },
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload model' });
  }
};


const getModels = async (req, res) => {
  try {
    const models = await Model3D.find();
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
};

module.exports = { uploadModel, getModels };
