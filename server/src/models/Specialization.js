const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async createSpecialization(specialization) {
    const results = await db.query("INSERT INTO specialization (name, did) VALUES (?, ?)", [specialization.name, specialization.degreeId]);
    return results.insertId;
  },

  async createSpecializationRequirement(req, specId) {
    const results = await db.query("INSERT INTO credit_requirement (credits, courses, spid) VALUES (?, ?, ?)", [req.credits, req.courses, specId]);
    return results.insertId;
  },

  async getSpecializationRequirements(specId) {
    const results = await db.query("SELECT credits, courses FROM credit_requirement WHERE spid = ?", [specId]);
    return results;
  }
};