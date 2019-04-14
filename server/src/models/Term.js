const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);

const termConvert = (dbTerm) => {
  if (!dbTerm) {
    return;
  }
  return {
    id: dbTerm.id.toString(),
    number: dbTerm.number,
    sid: dbTerm.sid.toString()
  };
};

module.exports = {
  async getTerm(termNum, sessionId) {
    const termResults = await db.query("SELECT * FROM term WHERE number = ? AND sid = ?", [termNum, sessionId]);
    return termConvert(termResults[0]);
  },

  async getTermById(id) {
    const termResults = await db.query("SELECT * FROM term WHERE id = ?", [id]);
    return termConvert(termResults[0]);
  },

  async createTerm(term, sessionId) {
    const newTerm = await db.query("INSERT INTO term (number, sid) VALUES (?, ?)", [term, sessionId]);
    return newTerm.insertId;
  },

  termConvert
};