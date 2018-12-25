import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
<<<<<<< HEAD
=======
import Semester from '../Semester/Semester';
import './PlannerArea.css';
>>>>>>> Add hard coded state for semester

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

<<<<<<< HEAD
=======
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
  //set data uses hard coded course code!
  onCourseDragStart = (e, courseCode) => {
    e.dataTransfer.setData("courseCode", courseCode);
  }

  //on drop event handler for semester component
  onCourseDrop = (e, targetTerm) => {
    let movedCourse = e.dataTransfer.getData("courseCode");
    this.state.defaultTerms.filter((term) => {
      if (term.number == targetTerm) {
        //console.log(term.coursesContained);
        this.setState({
          defaultTerms: [
            ...this.state.defaultTerms.slice(0,term.number-1),
            Object.assign([], this.state.defaultTerms[term.number-1],term.coursesContained.push(movedCourse)),
            ...this.state.defaultTerms.slice(term.number-1)
          ]
        });
        //console.log(movedCourse + " to " + term.coursesContained);
      }
    });
    console.log(this.state); 
  }

>>>>>>> Add hard coded state for semester
  showSnackbar = () => {
    this.setState({ showSnackbar: true });
    //setTimeout(() => { this.setState({ showSnackbar: false });}, 3000); 
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