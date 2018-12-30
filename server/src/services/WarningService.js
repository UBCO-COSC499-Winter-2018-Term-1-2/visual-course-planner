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

function getWarningsForSpecializationRequirement(plan, requirement) {
  // check if plan has number of credits from courses

  let creditsNeeded = parseInt(requirement.credits);
  let warnings = [];
  requirement.courses.split(',').map(course => course.trim()).forEach(reqCode => {
    const planCourse = getPlanCourse(plan, {code: reqCode});
    if (planCourse !== null) {
      creditsNeeded -= parseInt(planCourse.credits);
    }
  });
  // TODO: notify which course is missing
  if (creditsNeeded > 0) {
    warnings.push({
      message: `Missing ${creditsNeeded} credits of ${requirement.courses}.`,
      type: "missingCredits"
    });
  }
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
  

  getWarnings: (plan, user) => {
    let warnings = [];
    plan.courses.forEach(planCourse => {
      warnings = warnings.concat(
        getStandingWarnings(user, planCourse),
        getCoreqWarnings(plan, planCourse),
        getPrereqWarnings(plan, planCourse)
      );
    });
    return warnings;
  },

  getPlanWarningsForSpecializationRequirements: (plan, requirements) => {
    let warnings = [];

    requirements.forEach(req => {
      warnings = warnings.concat(
        getWarningsForSpecializationRequirement(plan, req)
      );
    });

    return warnings;
  }

};

