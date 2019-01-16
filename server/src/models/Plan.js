const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);

class Plan {

    async getPlanForUser (uid,pid) {
        db
        .query("SELECT * FROM plan JOIN plan_course ON plan.id = plan_course.pid JOIN course ON plan_course.cid = course.id WHERE plan.uid = ? AND plan.id = ?",[uid,pid])
    
        .then(rows => {
        return rows;
      })
        .catch(err => {
        throw err;
      });
  }



  async getPlanList (id) {
      db
      .query("SELECT * FROM plan WHERE uid = ?", [id])

      .then(rows => {
        return rows;
      })
        .catch(err => {
        throw err;
      });

  }
    
  async planMakeFav (id) {
    db
    .query("UPDATE SET isfavourite = true FROM plan WHERE uid = ?", [id])


    .then(rows => {
      return rows;
    })
      .catch(err => {
      throw err;
    });

  }
}
//const rows = await db.query("") 