const getStandingWarning = (user, course) => {
  let warnings = [];
  if (user.standing < course.standingRequirement) {
    warnings.concat({
      message: `${course.code} requires year ${course.standingRequirement}. Current standing: ${user.standing}`,
      type: "standing"
    });
  }
  return warnings;
};

const getPrereqWarnings = (plan, course) => {
  let warnings = [];
  const requirements = course.preRequisites;
  requirements.forEach(req => {
    const reqYearSemester = req.year.concat(req.semester);
    const courseYearSemester = course.year.concat(course.semester);
    if (!planHasCourse(plan, req) || reqYearSemester >= courseYearSemester) {
      warnings.concat({
        message: `${course.code} missing pre-requisite ${req.code}`,
        type: "prereq"
      });
    }
  });
  return ;
};

const getCoreqWarnings = (plan, course) => {
  let warnings = [];
  const requirements = course.coRequisites;
  requirements.forEach(req => {
    const reqYearSemester = req.year.concat(req.semester);
    const courseYearSemester = course.year.concat(course.semester);
    if (!planHasCourse(plan, req) || reqYearSemester >= courseYearSemester) {
      warnings.concat({
        message: `${course.code} missing co-requisite ${req.code}`,
        type: "coreq"
      });
    }
  });
  return warnings;
};

function planHasCourse(plan, course) {
  return plan.courses.has(course.code);
}

module.exports = {
  getWarningsForCourse: (plan, user, course) => {
    let warnings = [];
    warnings.concat(getStandingWarning(user, course));
    warnings.concat(getCoreqWarnings(plan, course));
    warnings.concat(getPrereqWarnings(plan, course));

    return warnings;
  },
  

  getWarnings: () => {
    const courseWarnings = this.props.plan.courses.map(function(course) {
      return this.getWarningsForCourse(this.props.plan, course);
    }.bind(this));

    Promise
      .all(courseWarnings)
      .then(warnings => {
        return warnings;
      })
      .catch(err => {
        console.log(err);
      });
  }

};

