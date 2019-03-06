const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async createPlan(userId, name, desc, did) {
    const result = await db.query("INSERT INTO plan (title, description, uid, did) VALUES (?,?,?,?)", [name, desc, userId, did]);
    return result.insertId;
  },
  async getPlan(pid) {
    console.log("getting plan " + pid);
    return db
      .query("SELECT id, time, title, description, isFavourite FROM plan WHERE plan.id = ?", [pid])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },
  async getPlanCourses(pid) {
    const planCourses = await db.query(`
      SELECT course.id AS courseId, GROUP_CONCAT(cir.rid) AS prerequisites, GROUP_CONCAT(cic.rid) as corequisites, code, standingRequirement, course_term.tid AS term, 
      FROM plan_course
      JOIN course ON cid = course.id
      JOIN course_info ON course.code = course_info.id
      JOIN course_term ON course.id = course_term.cid,
      LEFT JOIN course_info_requirement AS cir ON course.code = cir.cid
      LEFT JOIN course_info_corequirement AS cic ON course.code = cic.cid
      WHERE pid = ?
      GROUP BY course.id`, [pid]);
    return planCourses;
  },
  async getPlanTerms(pid) {
    const planCourses = await db.query("SELECT * FROM plan_term JOIN term ON tid = term.id JOIN session ON term.sid = session.id WHERE pid = ?", [pid]);
    return planCourses;
  },
  async getPlanList(uid) {
    const plans = await db.query("SELECT id, title, isFavourite FROM plan WHERE uid = ?", [uid]);
    return plans.map(plan => {
      return {
        ...plan,
        isFavourite: plan.isFavourite === 0 ? false : true
      };
    });
  },
  async setFavourite(pid, fav) {
    return db.query("UPDATE plan SET isFavourite = ? WHERE id = ?", [fav, pid])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },
  async getNotes(id) {
    return db
      .query("SELECT description FROM plan WHERE id = ?", [id])

      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },
  async saveNotes(id, desc) {
    return db.query("UPDATE plan SET description = ? WHERE id = ?", [desc, id])
      .then(res => {
        return res;
      });
  },
  async getCourseFromPlan(cid, pid) {
    return db.query("SELECT * FROM plan_course WHERE cid = ? AND pid = ?", [cid, pid])
      .then(results => {
        return results[0];
      })
      .catch(err => {
        throw err;
      });
  },
  async setPlanCourse(cid, pid) {
    return db.query("INSERT INTO plan_course VALUES (?, ?)", [pid, cid])
      .then(results => {
        return results;
      })
      .catch(err => {
        throw err;
      });
  },
  async setName(id, name) {
    return db.query("UPDATE plan SET title = ? WHERE id = ?", [name, id])
      .then(res => {
        return res;
      });
  }
};