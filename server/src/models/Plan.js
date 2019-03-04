const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


class Plan {

  async getPlanForUser(uid, pid) {
    return db
      .query("SELECT * FROM plan JOIN plan_course ON plan.id = plan_course.pid JOIN course ON plan_course.cid = course.id WHERE plan.uid = ? AND plan.id = ?", [uid, pid])

      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  }


  async getPlanList(id) {
    const plans = await db.query("SELECT * FROM plan WHERE uid = ?", [id]);
    return plans;


  }

  async planMakeFav(id) {
    return db
      .query("UPDATE SET isfavourite = true FROM plan WHERE uid = ?", [id])


      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });

  }


  async getNotes(id) {
    return db
      .query("SELECT description FROM plan WHERE id = ?", [id])

      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  }


  async saveNotes(id) {
    return db
      .query("UPDATE description FROM plan WHERE id = ?", [id]);


  }
}

module.exports = Plan;
