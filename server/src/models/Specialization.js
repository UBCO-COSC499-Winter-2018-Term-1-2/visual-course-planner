const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async createSpecialization(specialization) {
    const results = await db.query("INSERT INTO specialization (name, did) VALUES (?, ?)", [specialization.name, specialization.degreeId]);
    return results.insertId;
  }
};