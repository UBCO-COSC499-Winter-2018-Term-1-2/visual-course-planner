const Session = require('../models/Session');


module.exports = {
  async sessionExists(year, season) {
    const sessionResults = await Session.getSession(year, season);
    if (sessionResults.length > 0) {
      return sessionResults[0];
    }
    return false;
    
  },

  async ensureSession(year, season) {
    const session = await this.sessionExists(year, season);
    if (!session) {
      const newSession = await Session.createSession(year, season);
      return newSession.insertId;
    } else {
      return session;
    }
  }
  
};