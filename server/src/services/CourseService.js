const termService = require('./TermService');
const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const course = require('../models/Course');
const sessionService = require('../services/SessionService');

class CourseService {

  async setCoursesOffered(courses) {
    parse(courses)
      .then(output => {
        output.array.forEach(element => {
          const courseExists = await this.courseInfoExists(element.code);
          if(!courseExists){
            throw new Error(`Couldnt find info for course ${element.code}`);
          }

          const session = await sessionService.ensureSession(element.year, element.season);
      
          // ensure term exists
          const termId = await termService.ensureTerm(element.term, session.id);
      
          await course.insertCourse(element.code, termId);

        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  async courseInfoExists(code) {
    const courseInfo = await course.getCourseInfo(code);
    if(courseInfo.length > 0) {
      return true;
    }
    return false;
  }

}

export default CourseService;