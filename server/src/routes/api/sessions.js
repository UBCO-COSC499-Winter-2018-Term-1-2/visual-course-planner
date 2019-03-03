const express = require('express');
const router = express.Router();
const Session = require('../../models/Session');


/**
 * @route GET api/sessions?
 * @desc Get a session
 * @access Private
 */
router.get('/', async (req, res) => {
  const year = req.query.year;
  console.log("year : " + year);
  const season = req.query.season;
  let session = await Session.getSession(year, season);
  if (!session) {
    const sessionId = await Session.createSession(year, season);
    session = await Session.getSessionById(sessionId);
  }
  console.log("Found session", session);
  session.terms = [];
  res.send(session);
});

module.exports = router;