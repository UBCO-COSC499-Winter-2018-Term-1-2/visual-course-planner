const express = require('express');
const router = express.Router();
const Plan = require('../../models/Plan');

const arrayToObject = (array) => array.reduce((obj, item) => {
  obj[item.id] = item;
  return obj;
}, {});

router.get('/:id', async (req, res) => {
  const planId = req.params.id;
  try {
    const plan = await Plan.getPlan(planId);

    const courses = await Plan.getPlanCourses(planId);
    const courseIds = courses.map(course => course.courseId);
    const coursesById = arrayToObject(courses.map(course => {
      return {
        id: course.courseId,
        preRequisites: course.prerequisites.split(','),
        coRequisites: course.corequisites.split(','),
        standingRequirement: course.standingRequirement,
        term: course.term,
        code: course.code
      };
    }));

    const terms = await Plan.getPlanTerms(planId);
    const termIds = terms.map(term => term.id);
    const termsById = arrayToObject(terms.map(term => {
      return {
        id: term.tid,
        number: term.number,
        session: term.sid,
        courses: courses.filter(course => course.term === term.id).map(course => course.courseId)
      };
    }));

    const sessions = terms.map(term => {
      return {
        id: term.sid,
        term: term.id,
        year: term.year,
        season: term.season
      };
    });
    const sessionIds = sessions.map(session => session.id);
    const sessionsById = arrayToObject(sessions);


    let formattedPlan = {
      courses: {
        byId: coursesById,
        allIds: courseIds
      },
      sessions: {
        byId: sessionsById,
        allIds: sessionIds
      },
      terms: {
        byId: termsById,
        allIds: termIds
      },
      name: plan.title,
      description: plan.description,
      specialization: plan.sid,
      isFavourite: plan.isFavourite,
      id: plan.id
    };

    res.send(formattedPlan);

  } catch(e) {
    console.error({"Couldn't retrieve plan": e});
    res.status(500).send("Couldn't retrieve plan");
  }
});

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const plans = await Plan.getPlanList(userId);
    console.log({"plans": plans});
    res.send(plans);
  } catch(e) {
    console.error({"Couldn't retrieve plan list": e });
    res.status(500).send({"Couldn't retrieve plan list": e });
  }
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
  if (!degreeId) {
    res.send("Need to set degreeId");
    return;
  }

  if (!userId) {
    res.send("Need to set userId");
    return;
  }

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
  console.log({"Checking ids": courseIds});
  for (let courseId of courseIds) {
    console.log(courseId);
    const course = await Plan.getCourseFromPlan(courseId, planId);
    console.log("got course from plan ",course);
    if (!course) {
      try {
        console.log("Saving course " + courseId + " in plan: " + planId);
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
