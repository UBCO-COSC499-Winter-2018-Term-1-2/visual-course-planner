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
  console.log(user.standing, course.standingRequirement);
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
  requirements.forEach(reqCode => {
    const req = getPlanCourse(plan, reqCode);
    if (req == null) {
      warnings.push({
        message: `${course.code} missing pre-requisite ${reqCode}.`,
        type: "prereq"
      });
    } else {
      const reqTerm = plan.terms.byId[req.term];
      const reqSession = plan.sessions.byId[reqTerm.session];
      const reqYearTerm = reqSession.year + reqSession.season + reqTerm.number;

      const courseTerm = plan.terms.byId[course.term];
      const courseSession = plan.sessions.byId[courseTerm.session];
      const courseYearTerm = courseSession.year + courseSession.season + courseTerm.number;

      if (reqYearTerm >= courseYearTerm) {
        warnings.push({
          message: `${reqCode} must be taken earlier than ${course.code}.`,
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
  requirements.forEach(reqCode => {
    const req = getPlanCourse(plan, reqCode);
    if (req == null) {
      warnings.push({
        message: `${course.code} missing co-requisite ${reqCode}.`,
        type: "coreq"
      });
    } else {
      const reqTerm = plan.terms.byId[req.term];
      const reqSession = plan.sessions.byId[reqTerm.session];
      const reqYearTerm = reqSession.year + reqSession.season + reqTerm.number;

      const courseTerm = plan.terms.byId[course.term];
      const courseSession = plan.sessions.byId[courseTerm.session];
      const courseYearTerm = courseSession.year + courseSession.season + courseTerm.number;

      if (reqYearTerm > courseYearTerm) {
        warnings.push({
          message: `${req.code} needs to be in the same term as ${course.code}, or earlier.`,
          type: "coreq"
        });
      }
    }
  });
  return warnings;
}

function getPlanCourse(plan, courseCode) {
  for(let currentId of plan.courses.allIds) {
    const course = plan.courses.byId[currentId];
    if (course.code === courseCode) {
      return course;
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
    const planCourse = getPlanCourse(plan, reqCode);
    if (planCourse !== null) {
      creditsNeeded -= parseInt(planCourse.credits);
    }

  });
  // TODO: notify which course is missing
  if (creditsNeeded > 0) {
    warning.push({
      message: `Missing ${creditsNeeded} credits of:\n${requirement.courses}.`,
      type: "missingCredits"
    });
  }
  return warning;
}

function getCategorySpecializationWarning(plan, requirement) {

  let warnings = [];
  let creditsRemaining = parseInt(requirement.credits);
  let courseSet = new Set();
  plan.courses.allIds.map(id => plan.courses.byId[id]).forEach(course => {
    if (courseFitsCategoryRequirement(course.code, requirement)) {
      if (!courseSet.has(course.code)) {
        creditsRemaining -= course.credits;
      }
      courseSet.add(course.code);
    }
  });

  if (creditsRemaining > 0) {
    warnings.push({
      message: `Missing ${creditsRemaining} credits from:\n${requirement.category}.`,
      type: 'specialization'
    });
  }

  return warnings;
}

// this is the order in which we check
function courseFitsCategoryRequirement(courseCode, requirement) {
  if (requirement.type === CATEGORY_TYPE) {
    const words = requirement.category.split(" ");

    if (words[0] === "UPPER") {
      // is upper level
      if (courseIsUpperLevel(courseCode)) {
        if (words[1] === courseCode.split(' ')[0]){
          // is a course code
          return true;
        } else if(areas.hasOwnProperty(words[1]) && areas[words[1]].codes.includes(courseCode.split(' ')[0])) {
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
        if (areas[words[0]].codes.includes(courseCode.split(' ')[0])) {
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
  return parseInt(course.split(' ')[1]) >= 300;
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
    plan.courses.allIds.forEach(courseId => {
      const course = plan.courses.byId[courseId];
      warnings = warnings.concat(
        getStandingWarnings(user, course),
        getCoreqWarnings(plan, course),
        getPrereqWarnings(plan, course),
      );
    });
    warnings = warnings.concat(
      module.exports.getSpecializationWarnings(plan, requirements)
    );
    
    console.log(warnings);
    return warnings;
  },

  getSpecializationWarnings: (plan, requirements) => {
    // check if plan has number of credits from courses
    let warnings = [];
    requirements.filter(req => req.category == null).forEach(req => {
      warnings = warnings.concat(getSpecificCoursesSpecializationWarning(plan, req));
    });

    requirements.filter(req => req.category != null).forEach(req => {
      warnings = warnings.concat(getCategorySpecializationWarning(plan, req));
    });
    return warnings;
  }
};
