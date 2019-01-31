const express = require('express');
const router = express.Router();
const warningService = require('../../services/WarningService');
const Specialization = require('../../models/Specialization');

router.post('/', async (req, res) => {
  if (!req.body.hasOwnProperty('plan')) {
    console.log(req.body);
    res.status(500).send("Did not receive plan.");
  } else if (!req.body.hasOwnProperty('user')) {
    res.status(500).send("Did not receive user.");
  } else {
    const specReqs = await Specialization.getSpecializationRequirements(req.body.plan.specialization.id);
    const warnings = warningService.getWarnings(req.body.plan, req.body.user, specReqs);
    res.send(warnings);
  }
});

module.exports = router;