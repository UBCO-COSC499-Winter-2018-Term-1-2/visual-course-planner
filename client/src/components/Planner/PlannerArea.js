import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import Term from '../Term/Term';
import axios from 'axios';
import './PlannerArea.css';

class PlannerArea extends Component {

  state = {
    terms: [
    ]
  }

  insertCoursesIntoTerms = () => {
    let terms = [{
      id: 1,
      coursesContained: [],
      year: 2018,
      session: "W",
      number: 1
    }];

    this.props.plan.courses.forEach(course => {
      terms = terms.concat(this.getTermsForCourse(terms, course));
      const indexOfTerm = terms.findIndex(existingTerm => course.term === existingTerm.number && course.year === existingTerm.year && course.session === existingTerm.session);
      if (indexOfTerm === -1) {
        console.error(`Couldn't find term after creating it. \nTerms: ${JSON.stringify(terms)}\nCourse: ${JSON.stringify(course)}`);
      }
      terms[indexOfTerm].coursesContained.push(course);
    }); 

    return terms;
  }

  getTermsForCourse(currentTerms, course) {
    let termsToAdd = [];
    const indexOfTerm = currentTerms.findIndex(existingTerm =>  {
      console.log(`Comparing ${JSON.stringify(existingTerm)} with ${JSON.stringify(course)}`);

      return course.term === existingTerm.number && course.year === existingTerm.year && course.term === existingTerm.number;
    });
    if (indexOfTerm !== -1) {
      return [];
    } else {
      let lastTerm = {};
      lastTerm = currentTerms[currentTerms.length - 1];

      while(lastTerm.number != course.term || lastTerm.year != course.year || lastTerm.session != course.session) {

        console.log("Term not found, adding term after term: " + JSON.stringify(lastTerm));
        
        const nextTerm = this.getNextTerm(lastTerm, course);
        termsToAdd.push(nextTerm);
        lastTerm = nextTerm; 

        console.log("Added term: " + JSON.stringify(nextTerm));
        console.log("Terms to add: " + JSON.stringify(termsToAdd));
      }
      return termsToAdd;
    }
  }
    

  getNextTerm(currentTerm) {
    let nextTermNumber;
    let nextTermYear = currentTerm.year;
    let nextTermSession = "W";

    if (currentTerm.number === 1) {
      nextTermNumber = 2;
      nextTermSession = currentTerm.session;
    } else {
      if (currentTerm.session == "W") {
        nextTermYear = currentTerm.year + 1;
        nextTermSession = "S";
      }
      nextTermNumber = 1;
    }
    const nextTermId = currentTerm.id + 1;
    
    const nextTerm = {
      id: nextTermId,
      coursesContained: [],
      year: nextTermYear,
      number: nextTermNumber,
      session: nextTermSession
    };

    return nextTerm;
  }

  updateWarnings() {
    this.getWarnings()
      .then(warnings => {
        this.props.setWarnings(warnings);
      })
      .catch(err => {
        console.error(err);
      });
  }

  objectsAreSame(x, y) {
    var objectsAreSame = true;
    for(var propertyName in x) {
      if(x[propertyName] !== y[propertyName]) {
        objectsAreSame = false;
        break;
      }
    }
    return objectsAreSame;
  }

  componentDidUpdate(prevProps) {
    let same = true;
    
    if (prevProps.plan.courses.length !== this.props.plan.courses.length) {
      this.updateWarnings();
    } else {
      for (let i = 0; i < prevProps.plan.courses.length; i++) {
        if (!this.objectsAreSame(prevProps.plan.courses[i], this.props.plan.courses[i])) {
          same = false;
        }
      }
      if (!same) {
        this.updateWarnings();
      }
    }
  }

  // When we drag a course into the plan, it will have a term associated with it. When its dropped, we can just call map plan to terms
  mapPlanToTerms = () => {
    console.log("Mapping plan to terms...");
    return this.insertCoursesIntoTerms();
  }

  //rendering term components by mapping defaultTerms state variable
  renderTerms = () => {
    const terms = this.mapPlanToTerms().map((term) => (
      <Term
        key={term.id}
        term={term}
        coursesContained={term.coursesContained}
        onCourseDragOver={this.onCourseDragOver}
        onCourseDragStart={this.onCourseDragStart.bind(this)}
        onCourseDrop={this.onCourseDrop}
      />
    ));
    return (
      <div id="term-view">
        {terms}
      </div>
    );
  }

  //drag over event handler for term component - passed in as prop
  onCourseDragOver = (e) => {
    e.preventDefault();
  }

  //drag start event handler for course component - passed in as prop via Term
  onCourseDragStart = (e, course, sourceTerm) => {
    e.dataTransfer.setData("course", JSON.stringify(course));
    e.dataTransfer.setData("sourceTerm", JSON.stringify(sourceTerm));
  }

  //on drop event handler for term component
  //need to implement removing course from source term
  //need to implement rejection of duplicate courses in a term
  onCourseDrop = (e, targetTerm) => {

    let movedCourse = JSON.parse(e.dataTransfer.getData("course"));

    movedCourse.term = targetTerm.number;
    movedCourse.year = targetTerm.year;
    movedCourse.session = targetTerm.session;

    console.log("Moved Course: " + JSON.stringify(movedCourse));
    let courses = [ ...this.props.plan.courses];
    const updatedCourseIndex = this.props.plan.courses.findIndex(x => x.code === movedCourse.code);
    courses.splice(updatedCourseIndex, 1);
    courses = [ ...courses, movedCourse];
    console.log(courses);
    this.props.updatePlanCourses(courses);
  }

  getWarnings = async () => {
    try {
      const response = await axios.post('api/warnings', 
        {
          plan: this.props.plan,
          user: this.props.user
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      return response.data;
      
    } catch(err) {
      console.log(err);
    }  
  }

  componentDidMount() {
    this.updateWarnings();
  }

  render() {
    return (
      <div id="planner-area">
        <div id="session-container">
          <this.renderTerms />
        </div>

        <WarningSnackbar
          showSnackbar={this.props.showSnackbar}
          closeSnackbar={this.props.closeSnackbar}
          warnings={this.props.warnings}
        />
      </div>
    );
  }
}

PlannerArea.propTypes = {
  plan: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  updatePlanCourses: PropTypes.func.isRequired,
  setWarnings: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired
};

export default PlannerArea;