const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);


class Course {

  async insertCourse(course) {
    db
      .query("INSERT INTO course (code, name, description, standingRequirement) VALUES (?, ?, ?, ?)",
        [course.code, course.name, course.description, course.standingRequirement])
      .then(results => {
        return results.insertId;
      })
      .catch(err => {
        throw err;
      });
  }

  async getCourse(id) {
    db
      .query("SELECT * FROM course WHERE course.id = ?", [id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      }); 
      
  }

  async setCourseOffered(course, term, year, season) {
    // ensure course is there
    const courseInfoResults = await db.query("SELECT id FROM course_info WHERE code = ?", [course.code]);
    if (courseInfoResults.length == 0) {
      throw new Error(`Couldn't find course ${course.code} in list of courses.`);
    }
    // ensure session exists
    let sessionId;
    const sessionResults = await db.query("SELECT id FROM session WHERE startYear = ? AND season = ?", [year, season]);
    if (sessionResults.length == 0) {
      const newSession = await db.query("INSERT INTO session (startYear, season) VALUES (?, ?)", [year, season]);
      sessionId = newSession.insertId;
    } else {
      sessionId = sessionResults[0]["id"];
    }

    // ensure term exists
    let termId;
    const termResults = await db.query("SELECT id FROM term WHERE num = ? AND sid = ?", [term, sessionId]);
    if (termResults.length == 0) {
      const newTerm = await db.query("INSERT INTO term (num, sid) VALUES (?, ?)", [term, sessionId]);
      termId = newTerm.insertId;
    } else {
      termId = termResults[0]["id"];
    }

    const insertedCourse = await db.query("INSERT INTO course (code) VALUES (?)", [course.code]);

    await db.query("INSERT INTO course_term VALUES (?, ?)", [insertedCourse.insertId, termId]);
  }
  

}

export default Course;