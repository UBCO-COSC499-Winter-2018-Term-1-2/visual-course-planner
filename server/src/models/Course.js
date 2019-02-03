const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async insertCourse(code, termId) {
    const results = await db.query("INSERT INTO course (code) VALUES (?)", [code, termId]);
    const courseId = results.insertId;

    await db.query("INSERT INTO course_term VALUES (?, ?)", [courseId, termId]);

    return courseId;
  },

  async getCourse(id) {
    db
      .query("SELECT * FROM course_info WHERE course.id = ?", [id])
      .then(rows => {
        return rows[0];
      })
      .catch(err => {
        throw err;
      }); 
      
  },

  async getCourses() {
    const courseInfoResults = await db.query(`
      SELECT course.id AS id, code, credits, name, description, standingRequirement, session.startYear, session.season, term.num,
        GROUP_CONCAT(cir.rid) AS prerequisites,
        GROUP_CONCAT(cic.rid) AS corequisites
      FROM course
      JOIN course_term ON course.id = course_term.cid
      JOIN term ON course_term.tid = term.id
      JOIN session ON term.sid = session.id
      JOIN course_info AS ci ON course.code = ci.id
      LEFT JOIN course_info_requirement AS cir ON ci.id = cir.cid
      LEFT JOIN course_info_corequirement AS cic ON ci.id = cic.cid
      GROUP BY course.id, session.startYear, session.season, term.num`);
    return courseInfoResults;
  },

  async getCourseInfo(code) {
    const courseInfoResults = await db.query("SELECT * FROM course_info WHERE id = ?", [code]);
    return courseInfoResults;
  }
};