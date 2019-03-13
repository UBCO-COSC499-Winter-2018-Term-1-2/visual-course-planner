const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);

module.exports = {
  async createPlan(userId, name, desc, sid) {
    const result = await db.query("INSERT INTO plan (title, description, uid, sid) VALUES (?,?,?,?)", [name, desc, userId, sid]);
    return result.insertId;
  },
  async getPlan(pid) {
    console.log("getting plan " + pid);
    return db
      .query("SELECT id, time, title, description, isFavourite, sid FROM plan WHERE plan.id = ?", [pid])
      .then(rows => {
        return rows[0];
      })
      .catch(err => {
        throw err;
      });
  },
  async getPlanCourses(pid) {
    const planCourses = await db.query(`
      SELECT course.id AS courseId, GROUP_CONCAT(cir.rid) AS prerequisites, GROUP_CONCAT(cic.rid) as corequisites, code, standingRequirement, course_term.tid AS term
      FROM plan_course
      JOIN course ON cid = course.id
      JOIN course_info ON course.code = course_info.id
      JOIN course_term ON course.id = course_term.cid
      LEFT JOIN course_info_requirement AS cir ON course.code = cir.cid
      LEFT JOIN course_info_corequirement AS cic ON course.code = cic.cid
      WHERE pid = ?
      GROUP BY course.id, course_term.tid`, [pid]);
    return planCourses;
  },
  async getPlanTerms(pid) {
    const planTerms = await db.query("SELECT * FROM plan_term JOIN term ON tid = term.id JOIN session ON term.sid = session.id WHERE pid = ?", [pid]);
    return planTerms;
  },
  async getPlanSessions(pid) {
    const planSessions = await db.query("SELECT session.id AS id, session.year, session.season, GROUP_CONCAT(plan_term.tid) AS terms FROM plan_term JOIN term ON tid = term.id JOIN session ON term.sid = session.id WHERE pid = ? GROUP BY session.id", [pid]);
    return planSessions;
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
    return db.query("SELECT pid, cid FROM plan_course WHERE cid = ? AND pid = ?", [cid, pid])
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
  },
  async setTerms(id, terms) {
    console.log({["Deleting terms in " + id]: terms});
    await db.query("DELETE FROM plan_term WHERE pid = ?", [id]);
    const termObjs = terms.map(term => [id, term]);
    if (termObjs.length > 0) {
      console.log({"TERM OBJECTS:":termObjs});
      await db.query("INSERT INTO plan_term VALUES ?", [termObjs]);
    }
  },

  async removeCourses(pid) {
    await db.query("DELETE FROM plan_course WHERE pid = ?", [pid]);
  }
};