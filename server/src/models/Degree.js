const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async getDegrees() {
    const degreeResults = await db.query("SELECT * FROM degree");
    return degreeResults;
  },

  async createDegree(degreeName) {
    const results = await db.query("INSERT INTO degree (name) VALUES (?)", [degreeName]);
    return results.insertId;
  }
};