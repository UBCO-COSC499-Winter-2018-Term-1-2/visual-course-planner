const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


class Plan {

  async getPlan(pid) {
    return db
      .query("SELECT * FROM plan JOIN plan_course ON plan.id = plan_course.pid JOIN course ON plan_course.cid = course.id plan.id = ?", [pid])

      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  }


  async getPlanList(id) {
    const plans = await db.query("SELECT id, title FROM plan WHERE id = ?", [id]);
    return plans;


  }

  async favouritePlan(pid, uid) {
    return db
      .query("UPDATE plan SET isFavourite = true WHERE id = ? and uid = ?", [pid, uid])


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
      .query("UPDATE plan SET description WHERE id = ?", [id]);


  }

  render(){
    <div> 
    <button className="sidebar-button">New Degree Plan -> </button>
    </div>
  }
}

module.exports = Plan;
