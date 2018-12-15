const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);

class Plan {

    async getPlanForUser (id) {
        db
        .query("SELECT FROM plan JOIN ON plan.id = plan_course.pid JOIN course ON plan_course.cid = course.id WHERE plan.uid =")
    }
       

}
//const rows = await db.query("") 