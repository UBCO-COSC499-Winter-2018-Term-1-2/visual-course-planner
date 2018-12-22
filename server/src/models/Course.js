const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);


class Course {
  

  async insertCourse(code, termId) {
    const results = await db.query("INSERT INTO course (code) VALUES (?)", [code, termId]);
    const courseId = results.insertId;

    await db.query("INSERT INTO course_term VALUES (?, ?)", [courseId, termId]);

    return courseId;
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

  async getCourseInfo(code) {
    const courseInfoResults = await db.query("SELECT id FROM course_info WHERE code = ?", [code]);
    return courseInfoResults;
  }
  

}

export default Course;