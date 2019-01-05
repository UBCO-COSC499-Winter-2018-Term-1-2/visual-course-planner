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
      const reqYearSemester = planCourse.year.concat(planCourse.semester);
      const courseYearSemester = course.year.concat(course.semester);
      if (reqYearSemester >= courseYearSemester) {
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
      const reqYearSemester = planCourse.year.concat(planCourse.semester);
      const courseYearSemester = course.year.concat(course.semester);
      if (reqYearSemester > courseYearSemester) {
        warnings.push({
          message: `${planCourse.code} needs to be in the same semester as ${course.code}, or earlier.`,
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

// TODO: probably more effciect to go through plan courses and see if what req they fit into
function getSpecializationWarning(plan, requirement) {
  // check specific req, then go more general
  let creditsNeeded = parseInt(requirement.credits);
  let warning = {};
  requirement.courses.split(',').map(course => course.trim()).forEach(reqCode => {
    /* Check for specific course requirement */
    const planCourse = getPlanCourse(plan, {code: reqCode});
    if (planCourse !== null) {
      creditsNeeded -= parseInt(planCourse.credits);
    }
    /* Check for upper level code Upper e.g. Level COSC */
    /* Check for upper level area e.g. Upper Level Science */
    /* Check for upper level general e.g. Upper Level General */
    /* Check for any specific */
    /* Check for any area */
    /* Check for any general */
  });
  // TODO: notify which course is missing
  if (creditsNeeded > 0) {
    warning = {
      message: `Missing ${creditsNeeded} credits of ${requirement.courses}.`,
      type: "missingCredits"
    };
  }
  return warning;
}

function getSpecializationWarnings(plan, requirements) {
  // check if plan has number of credits from courses
  let warnings = [];
  requirements.forEach(req => {
    warnings.push(getSpecializationWarning(req));
  });

  return warnings;
}


// need to parse course field of csv and put into spec course info table
// function parseCourses(courses) {
//   const courseCodes = ["COSC"];
//   const areas = ["SCIENCE", "ARTS"];
//   const words = courses.split(',');

//   if (words[0] === "GENERAL") {
//     // general electives
//   } else if (words[0] === '') {

//   }
// }

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
  }

};

