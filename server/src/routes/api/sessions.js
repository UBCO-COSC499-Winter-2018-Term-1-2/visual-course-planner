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
  session.id = session.id.toString();
  res.send(session);
});


/**
 * @route GET api/sessions/current
 * @desc Get a the latest session based on current time
 * @access Private
 */
router.get('/current', async (req, res) => {


  const date = new Date();
  let year = date.getFullYear();
  const month = date.getMonth();
  let season = 'W';
  if (month < 4) {
    season = 'W';
    year--;
  } else if (month < 9) {
    season = 'S';
  } else {
    season = 'W';
  }

  let session = await Session.getSession(year, season);
  if (!session) {
    const sessionId = await Session.createSession(year, season);
    session = await Session.getSessionById(sessionId);
  }
  console.log("Found session", session);
  session.id = session.id.toString();
  session.terms = [];
  res.send(session);
});
module.exports = router;