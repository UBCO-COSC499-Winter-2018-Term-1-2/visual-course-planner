const Term = require('../models/Term');


class TermService {
  async termExists(num, sessionId) {
    const termResults = await Term.getTerm(num, sessionId);
    if (termResults.length > 0) {
      return termResults[0];
    }
    return false;
    
  }

  async ensureTerm(num, sessionId) {
    const term = await this.termExists(num, sessionId);
    if (!term) {
      const newTerm = await Term.createTerm(num, sessionId);
      return newTerm.insertId;
    } else {
      return term;
    }
  }
  
}

export default TermService;