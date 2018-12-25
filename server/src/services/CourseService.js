const termService = require('./TermService');
const promisify = require('util').promisify;
const parse = promisify(require('csv-parse'));
const course = require('../models/Course');
const sessionService = require('../services/SessionService');
const readFile = promisify(require('fs').readFile);
const ADMIN_COURSE_DOCUMENT = 'courses';
const ADMIN_DEGREE_DOCUMENT = 'degree';

module.exports = {

  ADMIN_COURSE_DOCUMENT,
  ADMIN_DEGREE_DOCUMENT,

  async addOfferedCourses(courses) {
    for(const element of courses) {
      const courseExists = await this.courseInfoExists(element.code);
      if(!courseExists){
        throw new Error(`Couldnt find info for course ${element.code}`);
      }

      const session = await sessionService.ensureSession(element.year, element.season);
  
      // ensure term exists
      const term = await termService.ensureTerm(element.term, session.id);
  
      await course.insertCourse(element.code, term.id);

    }
  },

  async courseInfoExists(code) {
    const courseInfo = await course.getCourseInfo(code);
    if(courseInfo.length > 0) {
      return true;
    }
    return false;
  },

  async setCoursesOfferedFromCsv(csvFilename) {
    try {
      const file = await readFile(csvFilename);
      const courses = await this.validateAdminCourses(file);
      console.log(courses);
      await this.addOfferedCourses(courses);
      
    } catch(err) {
      console.error(err);
    }
  },

  async validateAdminCourses(csv) {
    let records = [];
    try {
      records = await parse(csv, { columns: true, trim: true });
    } catch(err) {
      throw new Error(err);
    }
    const courses = records.map(record => {
      const year = record.ACADEMIC_YEAR.substring(0, 4);
      const season = record.ACADEMIC_YEAR.substring(4);
      return {
        code: record.COURSE_CODE,
        term: record.TERM,
        year: year,
        season: season
      };
    });
    return courses;
  }
};