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
    term = await Term.getTerm(termId);
    console.log("Created term:", term , termId);
  }
  console.log("Found term", term);
  term.courses = [];
  term.id = term.id.toString();
  res.send(term);
});

module.exports = router;