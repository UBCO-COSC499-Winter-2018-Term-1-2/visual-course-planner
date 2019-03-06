const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async createPlan(userId, name, desc, did) {
    const result = await db.query("INSERT INTO plan (title, description, uid, did) VALUES (?,?,?,?)", [name, desc, userId, did]);
    return result.insertId;
  },
  async getPlan(pid) {
    return db
      .query("SELECT * FROM plan JOIN plan_course ON plan.id = plan_course.pid JOIN course ON plan_course.cid = course.id plan.id = ?", [pid])

      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },
  async getPlanList(id) {
    const plans = await db.query("SELECT id, title FROM plan WHERE id = ?", [id]);
    return plans;
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