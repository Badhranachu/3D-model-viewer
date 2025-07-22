// backend/routes/modelRoutes.js
const express = require('express');
const multer = require('multer');
const { uploadModel, getModels } = require('../controllers/modelController');

const router = express.Router();

// Store in /uploads temporarily
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadModel);
// router.get('/', getModels);
router.get('/',(req,res)=>{
    res.send('Welcome to the 3D Model API');
    console.log('GET request to /api/models');
})

module.exports = router;
