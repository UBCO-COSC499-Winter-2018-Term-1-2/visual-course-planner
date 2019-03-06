const Term = require('../models/Term');


module.exports = {
  async termExists(num, sessionId) {
    const termResults = await Term.getTerm(num, sessionId);
    if (termResults) {
      return termResults;
    }
    return false;
    
  },

  async ensureTerm(num, sessionId) {
    const term = await this.termExists(num, sessionId);
    if (!term) {
      const newTermId = await Term.createTerm(num, sessionId);
      return Term.getTermById(newTermId);
    } else {
      return term;
    }
  }
  
};