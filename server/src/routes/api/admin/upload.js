const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const courseService = require('../../../services/CourseService');

/** 
 * @route   POST api/admin/upload/
 * @desc    upload file
 * @access  Private
 */
router.post('/', (req, res) => {
  let uploadFile = req.files.file;
  const fileName = uploadFile.name;
  if (uploadFile.mimetype !== 'text/csv') {
    return res.status(400).send("Only csv files may be uploaded.");
  }
  const uploadDir = path.resolve(`${__dirname}/../../../../../client/public/files`);
  console.log(uploadDir);
  const filePath = `${uploadDir}/${fileName}`;

  const upload = () => {
    uploadFile.mv(filePath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        file: filePath,
      });
      console.log("setting courses");
      courseService.setCoursesOfferedFromCsv(filePath);
    });
  };

  try {
    fs.mkdir(uploadDir, (err) => {
      if (err == null || err.code == 'EEXIST') {
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