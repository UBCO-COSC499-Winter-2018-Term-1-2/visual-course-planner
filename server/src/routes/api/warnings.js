const express = require('express');
const router = express.Router();
const warningService = require('../../services/WarningService');

router.get('/', (req, res) => {
  if (!req.body.hasOwnPropery('plan')) {
    res.status(500).send("Did not recieve plan.");
  } else if (!req.body.hasOwnPropery('user')) {
    res.status(500).send("Did not recieve user.");
  } else {
    const warnings = warningService.getWarnings(req.body.plan, req.body.user);
    res.send(warnings);
  }
});

router.get('/course', (req, res) => {
  if (!req.body.hasOwnPropery('plan')) {
    res.status(500).send("Did not recieve plan.");
  } else if (!req.body.hasOwnPropery('user')) {
    res.status(500).send("Did not recieve user.");
  } else if (!req.body.hasOwnPropery('course')) {
    res.status(500).send("Did not recieve course.");
  } else {
    const warnings = warningService.getWarningsForCourse(req.body.plan, req.body.user, req.body.course);
    res.send(warnings);
  }
});