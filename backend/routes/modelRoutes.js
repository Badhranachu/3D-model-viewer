// backend/routes/modelRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadModel, getModels } = require('../controllers/modelController');

const router = express.Router();

// Store in /uploads temporarily
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadModel);
router.get('/', getModels,(req, res) => {
  res.json({ message: 'GET request successful' });
});

module.exports = router;
