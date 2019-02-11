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
      const sessionId = await Session.createSession(year, season);
      console.log("create session", sessionId);
      return Session.getSessionById(sessionId);
    } else {
      return session;
    }
  }
  
};