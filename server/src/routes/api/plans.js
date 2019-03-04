const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');


router.get('/:id', (req, res) => {
  const planId = req.params.id;
  Plan.getPlan(planId)
    .then(plans => {
      res.send(plans);
    })
    .catch(err => {
      console.error({"Couldn't retrieve plan": err});
    });
});

router.get('/user/:id', (req, res) => {

  Plan.getPlanList(req.params.id)
    .then(plan => {
      res.send(plan);
    })
    .catch(err => {
      console.error({"Couldn't retrieve plan": err });
    });
});

router.post('/:pid/user/:uid/favourite', (req, res) => {
  const userId = req.params.uid;
  const planId = req.params.pid;
  Plan.favouritePlan(planId, userId)
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.error({"unable to favourite plan": err});

    });
});


router.get('/:id', (req, res) => {
  const UserId = req.params.id;
  Plan.getNotes(UserId, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("No notes");
    }
  });
});


module.exports = router;
