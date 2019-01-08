import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import Semester from '../Semester/Semester';
import './PlannerArea.css';

class PlannerArea extends Component {

  state = {
    warnings: [],
    showSnackbar: false,
    defaultTerms: [
      {
        id: "1",
        coursesContained: [],
        year: "2018",
        session: "W",
        term: "1"
      }
    ]
  }

  insertCourseIntoTerm = (course, year, term) => {
    let found = false;
    this.state.defaultTerms.forEach(stateTerm => {
      if (stateTerm.year === year && stateTerm.term === term) {
        found = true;
        const index = this.state.defaultTerms.findIndex(x=> x.id === stateTerm.id);
        if (index === -1) {
          // handle error
        } else {
          this.setState({
            defaultTerms: [
              ...this.state.defaultTerms.slice(0,index),
              Object.assign({}, this.state.defaultTerms[index], {coursesContained: [...stateTerm.coursesContained, course]}),
              ...this.state.defaultTerms.slice(index+1)
            ]
          });
        }
      }
    });
    if (!found) {
      this.setState(prevState => {
        const prevStateLastItem = prevState.defaultTerms[prevState.defaultTerms.length - 1];
        return {
          // this adds a term to default terms, and sets the id to id of the last term + 1
          defaultTerms: [
            ...prevState.defaultTerms,
            {
              id: (parseInt(prevStateLastItem.id) + 1).toString(),
              coursesContained: [course],
              year: prevStateLastItem.term === "2" ? (parseInt(prevStateLastItem.year) + 1).toString() : prevStateLastItem.year,
              term: prevStateLastItem.term === "2" ? "1" : "2"

            }
          ]
        };
      });
    }
  }

  componentDidMount = () => {
    this.mapPlanToTerms();
  }

  mapPlanToTerms = () => {
    this.props.plan.courses.forEach(course => {
      this.insertCourseIntoTerm(course, course.year, course.term);
    });
  }

  //rendering semester components by mapping defaulTerms state variable
  renderSemesters = () => {
    return (this.state.defaultTerms.map((term) =>
      <Semester
        key={term.id}
        term={term.id}
        coursesContained={term.coursesContained}
        onCourseDragOver={this.onCourseDragOver}
        onCourseDragStart={this.onCourseDragStart.bind(this)}
        onCourseDrop={this.onCourseDrop} />
    ));
  }

  //drag over event handler for semester component - passed in as prop
  onCourseDragOver = (e) => {
    e.preventDefault();
  }

  //drag start event handler for course component - passed in as prop via Semester
  onCourseDragStart = (e, course) => {
    e.dataTransfer.setData("course", JSON.stringify(course));
  }

  //on drop event handler for semester component
  //need to implement removing course from source term
  //need to implement rejection of duplicate courses in a term
  onCourseDrop = (e, targetTerm) => {

    let movedCourse = JSON.parse(e.dataTransfer.getData("course"));
    let sourceTerm = movedCourse.term;
    const targetTermIndex = targetTerm - 1;
    const sourceTermIndex = sourceTerm - 1;
    let removedCourseIndex;
    console.log("source term: " + sourceTerm);
    console.log("target term: " + targetTerm);

    //extract source term object from the state variable
    const sourceTermObject = this.state.defaultTerms.filter((term) => {
      if ((targetTerm != sourceTerm) && (term.id == sourceTerm)) {
        console.log("filtered term: " + term.id);
        return term;
      }
    });
    console.log(sourceTermObject);

    //check if source term object extracted from state is not empty
    if(sourceTermObject.length != 0) {
     
      removedCourseIndex = sourceTermObject[0].coursesContained.findIndex(course=> course.code === movedCourse.code);
      console.log(removedCourseIndex);
      
      //remove course by updating state
      this.setState({
        defaultTerms: [
          ...this.state.defaultTerms.slice(0, sourceTermIndex),
          Object.assign([], this.state.defaultTerms[sourceTermIndex], sourceTermObject[0].coursesContained.splice(removedCourseIndex,1)),
          ...this.state.defaultTerms.slice(sourceTermIndex + 1)
        ]
      });
    } else {
      removedCourseIndex = -1;
    }

    //add course
    movedCourse.term = targetTerm;
    this.state.defaultTerms.forEach((term) => {
      if ((targetTerm != sourceTerm) && (term.id == targetTerm)) {

        this.setState({
          defaultTerms: [
            ...this.state.defaultTerms.slice(0, targetTermIndex),
            Object.assign([], this.state.defaultTerms[targetTermIndex], term.coursesContained.push(movedCourse)),
            ...this.state.defaultTerms.slice(targetTermIndex + 1)
          ]
        });
      }
    });
    console.log("Moved Course: " + JSON.stringify(movedCourse));
    let courses = [...this.props.plan.courses];
    const updatedCourseIndex = this.props.plan.courses.findIndex(x => x.code === movedCourse.code);
    courses.splice(updatedCourseIndex, 1);
    courses.push(movedCourse);

    this.props.updatePlanCourses(courses);
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  render() {
    return (
      <div id="planner-area">
        <PlannerHeader
          plan={this.props.plan}
          toggleSidebar={this.props.toggleSidebar}
          optimize={this.props.optimize}
          showWarning={this.showSnackbar}
          setWarnings={this.setWarnings}
          warnings={this.state.warnings}
          user={this.props.user}
        />

        <div id="semester-view">
          <this.renderSemesters />
        </div>

        <WarningSnackbar
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
        />
        <div id="session-container">

        </div>
      </div>
    );
  }
}

PlannerArea.propTypes = {
  plan: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  optimize: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updatePlanCourses: PropTypes.func.isRequired
};

export default PlannerArea;