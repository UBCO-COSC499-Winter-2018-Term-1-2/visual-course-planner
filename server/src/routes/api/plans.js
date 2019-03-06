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

router.post('/new', async (req, res) => {
  const userId = req.body.userId;
  const degreeId = req.body.degreeId;

  try {
    const planId = await Plan.createPlan(userId, "untitled", "", degreeId);
    res.status(200).send("Plan created: " + planId);
    console.log("Plan created: " + planId);
  } catch (e) {
    res.status(500).send({"Error occured": e});
    console.error(e);
  }
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

router.post('/:id/save', async (req, res) => {
  const planId = req.params.id;
  const plan = req.body.plan;
  const notes = plan.description;
  const isFavourite = plan.isFavourite;
  const name = plan.name;

  const courseIds = plan.courses.allIds;

  for (let courseId in courseIds) {
    const course = await Plan.getCourseFromPlan(courseId, planId);
    if (!course) {
      try {
        await Plan.setPlanCourse(courseId, planId);
        // TODO: need to make sure course are removed as well
      } catch (e) {
        console.error({"Error occured while saving plan courses": e});
      }
    }
  }
  try { // should probably use a transaction
    await Plan.saveNotes(planId, notes);
    await Plan.setFavourite(planId, isFavourite);
    await Plan.setName(planId, name);
    res.status(200).send("Saved planId " + planId);
  } catch(e) {
    console.error({"failed to save": e});
    res.status(500).send("Failed to save");
  }
});


module.exports = router;
