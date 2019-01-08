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
        number: "1",
        coursesContained: ["COSC 111", "COSC 122"],
        year: "2018",
        session: "W"

      },
      {
        number: "2",
        coursesContained: ["COSC 121", "COSC 123"],
        year: "2019",
        session: "W"

      },
      {
        number: "3",
        coursesContained: ["COSC 222", "COSC 211"],
        year: "2019",
        session: "W"

      },
      {
        number: "4",
        coursesContained: ["COSC 221", "MATH 200"],
        year: "2020",
        session: "W"

      },
      {
        number: "5",
        coursesContained: ["COSC 111", "COSC 122"],
        year: "2018",
        session: "W"

      },
      {
        number: "6",
        coursesContained: ["COSC 111", "COSC 122"],
        year: "2018",
        session: "W"

      },
      {
        number: "7",
        coursesContained: ["COSC 111", "COSC 122"],
        year: "2018",
        session: "W"

      },
      {
        number: "8",
        coursesContained: ["COSC 111", "COSC 122"],
        year: "2018",
        session: "W"
      }
    ]
  }

  //rendering semester components by mapping defaulTerms state variable
  renderSemesters = () => {
    return (this.state.defaultTerms.map((term) =>
      <Semester
        key={term.number}
        term={term.number}
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
  onCourseDragStart = (e, courseCode, sourceTerm) => {
    e.dataTransfer.setData("courseCode", courseCode);
    e.dataTransfer.setData("sourceTerm", sourceTerm);
  }

  //on drop event handler for semester component
  //need to implement removing course from source term
  //need to implement rejection of duplicate courses in a term
  onCourseDrop = (e, targetTerm) => {

    let movedCourse = e.dataTransfer.getData("courseCode");
    let sourceTerm = e.dataTransfer.getData("sourceTerm");
    const targetTermIndex = targetTerm - 1;
    const sourceTermIndex = sourceTerm - 1;
    let removedCourseIndex;
    console.log("source term: " + sourceTerm);
    console.log("target term: " + targetTerm);

    //extract source term object from the state variable
    const sourceTermObject = this.state.defaultTerms.filter((term) => {
      if ((targetTerm != sourceTerm) && (term.number == sourceTerm)) {
        console.log("filtered term: " + term.number);
        return term;
      }
    });
    console.log(sourceTermObject);

    //check if source term object extracted from state is not empty
    if(sourceTermObject.length != 0) {
     
      removedCourseIndex = sourceTermObject[0].coursesContained.indexOf(movedCourse);
      console.log("lulu");
      
      //remove course by updating state
      this.setState({
        defaultTerms: [
          ...this.state.defaultTerms.slice(0, sourceTermIndex),
          Object.assign([], this.state.defaultTerms[sourceTermIndex], sourceTermObject[0].coursesContained.splice(removedCourseIndex,1)),
          ...this.state.defaultTerms.slice(sourceTermIndex + 1)
        ]
      });
    }
    else
      removedCourseIndex = -1;
    
    //add course
    this.state.defaultTerms.filter((term) => {
      if ((targetTerm != sourceTerm) && (term.number == targetTerm)) {

        this.setState({
          defaultTerms: [
            ...this.state.defaultTerms.slice(0, targetTermIndex),
            Object.assign([], this.state.defaultTerms[targetTermIndex], term.coursesContained.push(movedCourse)),
            ...this.state.defaultTerms.slice(targetTermIndex + 1)
          ]
        });
      }
    });

    console.log(this.state);
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
  user: PropTypes.object.isRequired
};

export default PlannerArea;