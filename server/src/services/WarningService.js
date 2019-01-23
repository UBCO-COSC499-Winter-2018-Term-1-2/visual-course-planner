const areas = {
  SCIENCE: {
    codes: ["COSC", "MATH", "PHYS", "CHEM"]
  },
  ARTS: {
    codes: ["ENGL", "PHIL"]
  }
};

const CATEGORY_TYPE = require('../models/Specialization').CATEGORY_TYPE;
// const COURSES_TYPE = require('../models/Specialization').COURSES_TYPE;


function getStandingWarnings(user, course) {
  let warnings = [];
  if (user.yearStanding < course.standingRequirement) {
    warnings.push({
      message: `${course.code} requires year ${course.standingRequirement}. Current standing: ${user.yearStanding}.`,
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
function getSpecificCoursesSpecializationWarning(plan, requirement) {
  // check specific req, then go more general
  let creditsNeeded = parseInt(requirement.credits);
  let warning = [];
  requirement.courses.split(',').map(course => course.trim()).forEach(reqCode => {
    /* Check for specific course requirement */
    const planCourse = getPlanCourse(plan, {code: reqCode});
    if (planCourse !== null) {
      creditsNeeded -= parseInt(planCourse.credits);
    }

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

function getCategorySpecializationWarning(plan, requirement) {

  let warnings = [];
  let creditsRemaining = parseInt(requirement.credits);
  plan.courses.forEach(course => {
    if (courseFitsCategoryRequirement(course, requirement)) {
      creditsRemaining -= course.credits;
    }
  });

  if (creditsRemaining > 0) {
    warnings.push({
      message: `Missing ${creditsRemaining} credits from ${requirement.courses}.`,
      type: 'specialization'
    });
  }

  return warnings;
}

// this is the order in which we check
function courseFitsCategoryRequirement(course, requirement) {
  if (requirement.type === CATEGORY_TYPE) {
    const words = requirement.courses.split(" ");

    if (words[0] === "UPPER") {
      // is upper level
      if (courseIsUpperLevel(course)) {
        if (words[1] === course.code.split(' ')[0]){
          // is a course code
          return true;
        } else if(areas.hasOwnProperty(words[1]) && areas[words[1]].codes.includes(course.code.split(' ')[0])) {
          // is an area descriptor
          return true;
        } else if (words[1] === 'GENERAL') {
          return true;
        } else {
          return false;
        }
      
      } else {
        return false;
      }
      
    } else if (areas.hasOwnProperty(words[0])) {
      if (words.length === 1) {
        // is an single word area descriptor
        if (areas[words[0]].codes.includes(course.code.split(' ')[0])) {
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }
}


function courseIsUpperLevel(course) {
  return parseInt(course.code.split(' ')[1]) >= 300;
}


module.exports = {

  courseFitsCategoryRequirement,

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
        module.exports.getSpecializationWarnings(plan, requirements)
      );
    });
    return warnings;
  },

  getSpecializationWarnings: (plan, requirements) => {
    // check if plan has number of credits from courses
    let warnings = [];
    requirements.filter(req => req.category == undefined).forEach(req => {
      warnings = warnings.concat(getSpecificCoursesSpecializationWarning(plan, req));
    });

    requirements.filter(req => req.category != undefined).forEach(req => {
      warnings = warnings.concat(getCategorySpecializationWarning(plan, req));
    });

    return warnings;
  }
};
