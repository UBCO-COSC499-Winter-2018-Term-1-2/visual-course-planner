const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async createSpecialization(specialization) {
    const results = await db.query("INSERT INTO specialization (name, did) VALUES (?, ?)", [specialization.name, specialization.degreeId]);
    return results.insertId;
  },

  async createSpecializationRequirement(requirementObj, specId) {
    const req = requirementObj.requirements;
    const exception = requirementObj.exceptions;
    const hasException = req.exception.length > 0 ? true : false;

    const COURSES_TYPE = 'courses';
    const CATEGORY_TYPE = 'category';

    if (req.type === COURSES_TYPE) {
      const results = await db.query("INSERT INTO credit_requirement (credits, category, spid) VALUES (?, ?, ?)", [req.credits, null, specId]);
      const crid = results.insertId;
      req.course.forEach(async course => { 
        db.query("INSERT INTO credit_requirement_course_info (crid, cid) VALUES (?, ?, ?)", [crid, course]);
      });
    } else if (req.type === CATEGORY_TYPE) {
      db.query("INSERT INTO credit_requirement (credits, category, spid) VALUES (?, ?, ?)", [req.credits, req.type, specId]);
    }

    if (hasException) {  
      if (exception.type === COURSES_TYPE) {
        const exception = await db.query("INSERT INTO exception (category) VALUES (NULL)");
        const eid = exception.insertId;
        exception.courses.forEach(course => {
          db.query("INSERT INTO exception_course_info (eid, cid) VALUES (?, ?)", [eid, course]);
        });
      } else if (exception.type === CATEGORY_TYPE) {
        const exception = await db.query("INSERT INTO exception (category) VALUES (?)", [exception.courses]);
      }
    }
  },

  async getSpecializationRequirements(specId) {
    const results = await db.query("SELECT credits, courses FROM credit_requirement WHERE spid = ?", [specId]);
    return results;
  }
};