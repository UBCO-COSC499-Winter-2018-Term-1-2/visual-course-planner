const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);


class Course {

  async getRequirementsForCourse(id) {
    db
      .query("SELECT c2.code FROM course c1 JOIN course_requirement ON cid = c1.id JOIN course c2 ON rid = c2.id WHERE c2.id = ?", [id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  }

  async getCourse(id) {
    // todo: build up course object from requirements and course info (look at data model to see what we need)
    db
      .query("SELECT * FROM course WHERE course.id = ?", [id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });  
  }
  

}

export default Course;