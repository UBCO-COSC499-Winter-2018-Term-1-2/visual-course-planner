const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const course = require('../models/Course');

class CourseService {

  setCoursesOffered(courses) {
    parse(courses)
      .then(output => {
        course.setCourseOffered(output);
      })
      .catch(err => {
        
        // do something with err
      });
  }

}

export default CourseService;