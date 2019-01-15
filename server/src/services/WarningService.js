function getStandingWarnings(user, course) {
  let warnings = [];
  if (user.standing < course.standingRequirement) {
    warnings.push({
      message: `${course.code} requires year ${course.standingRequirement}. Current standing: ${user.standing}.`,
      type: "standing"
    });
  }
  return warnings;
}

function getPrereqWarnings(plan, course) {
  let warnings = [];
  const requirements = course.preRequisites;
  requirements.forEach(req => {
    const planCourse = getPlanCourse(plan, req);
    if (planCourse == null) {
      warnings.push({
        message: `${course.code} missing pre-requisite ${req.code}.`,
        type: "prereq"
      });
    } else {
      const reqYearTerm = planCourse.year.toString().concat(planCourse.term);
      const courseYearTerm = course.year.toString().concat(course.term);
      if (reqYearTerm >= courseYearTerm) {
        warnings.push({
          message: `${req.code} must be taken earlier than ${course.code}.`,
          type: "prereq"
        });
      }
    }
    
  });
  return warnings;
}

function getCoreqWarnings(plan, course) {
  let warnings = [];
  const requirements = course.coRequisites;
  requirements.forEach(req => {
    const planCourse = getPlanCourse(plan, req);
    if (planCourse == null) {
      warnings.push({
        message: `${course.code} missing co-requisite ${req.code}.`,
        type: "coreq"
      });
    } else {
      const reqYearTerm = planCourse.year.concat(planCourse.term);
      const courseYearTerm = course.year.concat(course.term);
      if (reqYearTerm > courseYearTerm) {
        warnings.push({
          message: `${planCourse.code} needs to be in the same term as ${course.code}, or earlier.`,
          type: "coreq"
        });
      }
    }
  });
  return warnings;
}

function getPlanCourse(plan, course) {
  for(let planCourse of plan.courses) {
    if (planCourse.code == course.code) {
      return planCourse;
    }
  }
  return null;
}

// TODO: probably more efficient to go through plan courses and see if what req they fit into
function getSpecializationWarning(plan, requirement) {

  // plan.courses.forEach(course => {

  // });


  // check specific req, then go more general
  let creditsNeeded = parseInt(requirement.credits);
  let warning = [];
  requirement.courses.split(',').map(course => course.trim()).forEach(reqCode => {
    /* Check for specific course requirement */
    const planCourse = getPlanCourse(plan, {code: reqCode});
    if (planCourse !== null) {
      creditsNeeded -= parseInt(planCourse.credits);
    }
    /* Check for upper level code Upper e.g. Level COSC */
    // if (reqCode ){

    // }
    /* Check for upper level area e.g. Upper Level Science */
    /* Check for upper level general e.g. Upper Level General */
    /* Check for any specific */
    /* Check for any area */
    /* Check for any general */
  });
  // TODO: notify which course is missing
  if (creditsNeeded > 0) {
    warning.push({
      message: `Missing ${creditsNeeded} credits of ${requirement.courses}.`,
      type: "missingCredits"
    });
  }
  return warning;
}

function getSpecializationWarnings(plan, requirements) {
  // check if plan has number of credits from courses
  let warnings = [];
  requirements.forEach(req => {
    warnings = warnings.concat(getSpecializationWarning(plan, req));
  });
  return warnings;
}

module.exports = {
  getWarningsForCourse: (plan, user, course) => {
    let warnings = [];
    warnings = warnings.concat(
      getStandingWarnings(user, course),
      getCoreqWarnings(plan, course),
      getPrereqWarnings(plan, course)
    );
    return warnings;
  },
  

  getWarnings: (plan, user, requirements) => {
    let warnings = [];
    plan.courses.forEach(planCourse => {
      warnings = warnings.concat(
        getStandingWarnings(user, planCourse),
        getCoreqWarnings(plan, planCourse),
        getPrereqWarnings(plan, planCourse),
        getSpecializationWarnings(plan, requirements)
      );
    });
    return warnings;
  },

  getSpecializationWarnings: (plan, requirements) => {
    // check if plan has number of credits from courses
    let warnings = [];
    requirements.forEach(req => {
      warnings = warnings.concat(getSpecializationWarning(plan, req));
    });
  
    return warnings;
  }
};
