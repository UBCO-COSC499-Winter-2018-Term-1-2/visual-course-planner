const express = require('express');
const fs = require('fs');
const router = express.Router();

// @route   POST api/upload
// @desc    upload file
// @access  Private
router.post('/upload', (req, res) => {
  let uploadFile = req.files.file;
  const fileName = req.files.file.name;
  const uploadDir = `${__dirname}/../../../client/public/files`;

  const upload = () => {
    uploadFile.mv(`${uploadDir}/${fileName}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        file: `${uploadDir}/${fileName}`,
      });
    });
  };

  try {
    fs.mkdir(uploadDir, (err) => {
      if (err == null) {
        upload();
      } else {
        return res.status(500).send(err);
      }
    });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  
});

module.exports = router;