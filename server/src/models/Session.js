const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async getSession(year, season) {
    const sessionResults = await db.query("SELECT id FROM session WHERE startYear = ? AND season = ?", [year, season]);
    return sessionResults;
  },

  async createSession(year, season) {
    const results = await db.query("INSERT INTO session (startYear, season) VALUES (?, ?)", [year, season]);
    return results.insertId;
  }
};