const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');

router.get('/cloudinary-test', async (req, res) => {
  try {
    const result = await cloudinary.api.ping();
    res.send('✅ Cloudinary Connected: ' + JSON.stringify(result));
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Cloudinary Connection Failed');
  }
});

module.exports = router;
