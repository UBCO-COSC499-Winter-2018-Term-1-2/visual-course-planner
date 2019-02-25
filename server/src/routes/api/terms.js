const express = require('express');
const router = express.Router();
const Term = require('../../models/Term');
const Session = require('../../models/Session');


/**
 * @route GET api/terms?
 * @desc Get a course
 * @access Private
 */
router.get('/', async (req, res) => {
  const year = req.query.year;
  const season = req.query.season;
  const number = req.query.number;
  const session = await Session.getSession(year, season);
  if (!session) {
    res.status(404).send("Session does not exist");
  }
  const term = await Term.getTerm(number, session["id"]);
  if (!term) {
    res.status(404).send("Term does not exist");
  }
  console.log("Found term", term);
  res.send(term);
});

module.exports = router;