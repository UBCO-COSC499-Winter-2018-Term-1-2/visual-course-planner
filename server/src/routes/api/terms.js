const express = require('express');
const router = express.Router();
const Term = require('../../models/Term');


/**
 * @route GET api/terms?
 * @desc Get a term
 * @access Private
 */
router.get('/', async (req, res) => {
  const sessionId = req.query.sessionId;
  const number = req.query.number;
  let term = await Term.getTerm(number, sessionId);
  if (!term) {
    const termId = await Term.createTerm(number, sessionId);
    console.log({"Created term:": termId });
    try {
      term = await Term.getTermById(termId);
    } catch(e) {
      console.error(e);
    }
    console.log({"Retrieving created term:": term });
  }
  console.log({"Found term": term});
  term.courses = [];
  term.id = term.id.toString();
  res.send(term);
});

module.exports = router;