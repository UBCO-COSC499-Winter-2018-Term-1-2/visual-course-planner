const express = require('express');
const router = express.Router();
const warningService = require('../../services/WarningService');

router.get('/', (req, res) => {
  if (!req.body.hasOwnProperty('plan')) {
    res.status(500).send("Did not receive plan.");
  } else if (!req.body.hasOwnProperty('user')) {
    res.status(500).send("Did not receive user.");
  } else {
    const warnings = warningService.getWarnings(req.body.plan, req.body.user);
    res.send(warnings);
  }
});

router.get('/course', (req, res) => {
  if (!req.body.hasOwnProperty('plan')) {
    res.status(500).send("Did not receive plan.");
  } else if (!req.body.hasOwnProperty('user')) {
    res.status(500).send("Did not receive user.");
  } else if (!req.body.hasOwnProperty('course')) {
    res.status(500).send("Did not receive course.");
  } else {
    const warnings = warningService.getWarningsForCourse(req.body.plan, req.body.user, req.body.course);
    res.send(warnings);
  }
});

module.exports = router;