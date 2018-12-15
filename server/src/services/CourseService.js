const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const course = require('../models/Course');

class CourseService {

  setCoursesOffered(courses) {
    parse(courses)
      .then(output => {
        output.array.forEach(element => {
          course.setCourseOffered(element).catch(err => {
            console.error(err);
          });
        });
      })
      .catch(err => {
        console.error(err);
        // do something with err
      });
  }

}

export default CourseService;