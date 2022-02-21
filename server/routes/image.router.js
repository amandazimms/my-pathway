const express = require('express');
const s3 = require('../modules/s3')
const router = express.Router();

// REQUESTS URL FOR POSTING OBJECT TO AWS S3 OBJECT
router.get('/', async (req, res) => {
  // console.log('In image.router to get URL');
  const url = await s3.generateUploadURL()
  // console.log('This is what came back from the url:', {url});
  res.send({url})
});

module.exports = router;
