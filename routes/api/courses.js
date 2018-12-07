const express = require('express');
const router = express.Router();
const Course = require('../../models/Course');


/**
 * @route GET api/courses/:id
 * @desc Get a course
 * @access Private
 */
router.get('/:id', (req, res) => {
  const courseId = req.params.id;
  Course.getCourse(courseId, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("Couldnt get course.");
    }
  });
});
