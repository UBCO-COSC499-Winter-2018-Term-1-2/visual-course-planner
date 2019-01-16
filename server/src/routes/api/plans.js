const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');


router.get('/:id', (req, res) => {
    const UserId = req.params.id;
    Plan.getPlanForUser(UserId, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't retrieve plan");
      }
    });
  });

  router.get('/:id', (req, res) => {
    const UserId = req.params.id;
    Plan.getPlanList(UserId, (err, data) => {
      if (err == null) {
        res.send(data);
      } else {
        console.error("Couldn't retrieve plan");
      }
    });
  });
