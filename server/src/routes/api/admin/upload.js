const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const courseService = require('../../../services/CourseService');
const specializationRequirementsService = require('../../../services/SpecializationRequirementsService');
const degree = require('../../../models/Degree');
const COURSE_DOCUMENT = require('../../../services/CourseService').ADMIN_COURSE_DOCUMENT;
const SPECIALIZATION_DOCUMENT = require('../../../services/CourseService').ADMIN_SPECIALIZATION_DOCUMENT;

/** 
 * @route   POST api/admin/upload/
 * @desc    upload file
 * @access  Private
 */
router.post('/', (req, res) => {
  let uploadFile = req.files.file;
  let documentType = req.body.documentType;
  console.log("Doc type: " + documentType);
  const fileName = uploadFile.name;
  if (uploadFile.mimetype !== 'text/csv') {
    return res.status(400).send("Only csv files may be uploaded.");
  }
  const uploadDir = path.resolve(`${__dirname}/../../../../../client/public/files`);
  console.log(uploadDir);
  const filePath = `${uploadDir}/${fileName}`;

  const upload = () => {
    console.log("Uploading file.");
    uploadFile.mv(filePath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({
        file: filePath,
      });
      if (documentType === COURSE_DOCUMENT) {
        console.log("setting courses");
        courseService.setCoursesOfferedFromCsv(filePath); // TODO: display courses added to the user
      } else if (documentType === SPECIALIZATION_DOCUMENT) {
        console.log("setting spec reqs");
        if (req.body.isNewDegree === "true") {
          console.log("Creating new degree for spec");
          degree.createDegree(req.body.degreeName)
            .then(id => {
              specializationRequirementsService.setSpecializationRequirementsFromCsv(filePath, {id, ...req.body.specialization});
            })
            .catch(err => {
              console.error("Couldnt set spec requirements: " + err);
            });
        } else {
          console.log("Using existing degree for spec");
          let did = req.body.degreeId;
          specializationRequirementsService.setSpecializationRequirementsFromCsv(filePath, {did, ...req.body.specialization})
            .catch(err => {
              console.error("Couldnt set spec requirements: " + err);
            });
        }

      } else {
        console.log("Couldnt identify doc type.");
      }
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