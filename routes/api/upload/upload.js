const express = require('express');
const router = express.Router();

// @route   POST api/upload
// @desc    upload file
// @access  Private
router.post('/upload', (req, res) => {
  console.log(req.files);
  let uploadFile = req.file;
  const fileName = req.file.name;
  console.log(`${__dirname}/public/files/${fileName}`);
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      res.json({
        file: `public/${req.files.file.name}`,
      });
    },
  );
});

module.exports = router;