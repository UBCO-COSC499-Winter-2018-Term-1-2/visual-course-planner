import db from '../dbconnection';

class Course {

  getRequirementsForCourse(id, cb) {
    db.query("SELECT c2.code FROM course c1 JOIN course_requirement ON cid = c1.id JOIN course c2 ON rid = c2.id WHERE c2.id = ?", [id], cb);
  }

  getCourse(id, cb) {
    db.query("SELECT * FROM course WHERE course.id = ?", [id], cb);
  }
  

}

export default Course;