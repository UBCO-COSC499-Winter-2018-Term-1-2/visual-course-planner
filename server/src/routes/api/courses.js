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
  Course.getCourse(courseId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Couldnt get course: " + err);
    });
});

/**
 * @route GET api/courses/
 * @desc Get all offered courses
 * @access Private
 */
router.get('/', (req, res) => {
  Course.getCourses()
    .then(data => {
      const courses = data.map(course => {
        return {
          ...course,
          preRequisites: course.preRequisites ? course.preRequisites.split(',') : [],
          coRequisites: course.coRequisites ? course.coRequisites.split(',') : []
        };
      });
      res.send(courses);
    })
    .catch(err => {
      console.error("Couldnt get courses: " + err);
    });
});

/**
 * @route GET api/courses/info
 * @desc Get all course
 * @access Private
 */
router.get('/info', (req, res) => {
  Course.getAllCourseInfo()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Couldnt get courses: " + err);
    });
});


module.exports = router;