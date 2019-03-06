const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async getSessionById(id) {
    const sessionResults = await db.query("SELECT * FROM session WHERE id = ?", [id]);
    return sessionResults[0];
  },

  async getSession(year, season) {
    const sessionResults = await db.query("SELECT * FROM session WHERE year = ? AND season = ?", [year, season]);
    return sessionResults[0];
  },

  async createSession(year, season) {
    const results = await db.query("INSERT INTO session (year, season) VALUES (?, ?)", [year, season]);
    return results.insertId;
  }
};