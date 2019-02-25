import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CourseListSideBar from '../CourseListSideBar/CourseListSideBar';
import Session from '../Session/Session';
import axios from 'axios';
import './PlannerArea.css';

class PlannerArea extends Component {

  state = {
    trashColour: "white"
  }

  trashDragCounter = 0;

  getNextTerm(currentTerm) {
    let nextTermNumber;
    let nextTermYear = currentTerm.year;
    let nextTermSeason = "W";

    if (currentTerm.number === 1) {
      nextTermNumber = 2;
      nextTermSeason = currentTerm.session;
    } else {
      if (currentTerm.session == "W") {
        nextTermYear = currentTerm.year + 1;
        nextTermSeason = "S";
      }
      nextTermNumber = 1;
    }
    
    const nextTerm = {
      coursesContained: [],
      year: nextTermYear,
      number: nextTermNumber,
      season: nextTermSeason
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

  addTermToPlan() {
    const latestTerm = this.props.plan.terms.allIds[this.props.plan.terms.allIds.length - 1];
    const nextTerm = this.getNextTerm(latestTerm);
    const findTerm = axios.get(`/api/terms?year=${nextTerm.year}&season=${nextTerm.season}&number=${nextTerm.number}`);
    findTerm;
  }

  objectsAreSame(x, y) {
    let objectsAreSame = true;
    for(let propertyName in x) {
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
      same = false;
    } else {
      for (let course in prevProps.plan.courses.byId) {
        if (!this.objectsAreSame(prevProps.plan.courses.byId[course], this.props.plan.courses.byId[course])) {
          same = false;
        }
      }
    }
    if (!same) {
      this.updateWarnings();
    }
  }

  //rendering term components by mapping defaultTerms state variable
  renderTerms = () => {
    const sessions = this.props.plan.sessions.allIds.map(sessionId => {
      const session = this.props.plan.sessions.byId[sessionId];
      const terms = session.terms.map(termId => {
        const term = this.props.plan.terms.byId[termId];
        const courses = term.courses.map(courseId => {
          return { ...this.props.plan.courses.byId[courseId], id: courseId };
        });
        return { ...term, id: termId, courses };
      });
      return <Session
        key={sessionId}
        session={session}
        terms={terms}
        onCourseDragOver={this.onCourseDragOver}
        onCourseDrop={this.onCourseDrop}
        onCourseDragStart={this.onCourseDragStart}
      />;
    });
    return (
      <div className="session-container">
        {sessions}
      </div>
    );
  }

  //drag over event handler for term component - passed in as prop
  onCourseDragOver = (e, termId) => {
    if (!termId) {
      return;
    }
    // const term = this.props.plan.terms.byId[termId];
    e.preventDefault();
  }

  //drag start event handler for course component - passed in as prop via Term
  onCourseDragStart = (e, course, sourceTerm) => {
    console.log("Setting course for drag" + JSON.stringify(course));
    e.dataTransfer.setData("course", JSON.stringify(course));
    if(sourceTerm) {
      e.dataTransfer.setData("sourceTermId", sourceTerm);
    }
  }

  //on drop event handler for term component
  //need to implement rejection of duplicate courses in a term
  onCourseDrop = (e, targetTermId) => {
    let incomingCourse = JSON.parse(e.dataTransfer.getData("course"));
    let sourceTermId = e.dataTransfer.getData("sourceTermId");
    const plan = { ...this.props.plan };

    if (!sourceTermId) {
      console.log("Adding course to plan", incomingCourse);
      plan.terms.byId[targetTermId].courses.push(incomingCourse.id.toString());
      plan.courses.allIds.push(incomingCourse.id.toString());
      plan.courses.byId[incomingCourse.id.toString()] = incomingCourse;
      delete incomingCourse.id;

      this.props.updatePlan(plan);
    } else {
      console.log("Moving course already in plan", incomingCourse);
      const courses = plan.terms.byId[sourceTermId].courses;
      courses.splice(courses.indexOf(incomingCourse.id), 1);
      plan.terms.byId[targetTermId].courses.push(incomingCourse.id);
      console.log("Moved Course: " + JSON.stringify(incomingCourse));

      this.props.updatePlan(plan);
    }  
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

  onCourseDragEnterTrash = (e) => {
    e.preventDefault();
    this.trashDragCounter++;
    console.log("Enter trash");
    this.setState({
      trashColour: "#c5980f"
    });
  }

  onCourseDragLeaveTrash = () => {
    this.trashDragCounter--;
    console.log("leave trash", this.trashDragCounter);
    if (this.trashDragCounter === 0) {
      this.setState({
        trashColour: "white"
      });
    }
  }

  onCourseDragOverTrash = (e) => {
    e.preventDefault();
  }

  onCourseDropTrash = (e) => {
    e.preventDefault();
    this.trashDragCounter = 0;
    let incomingCourse = JSON.parse(e.dataTransfer.getData("course"));
    let sourceTermId = e.dataTransfer.getData("sourceTermId");
    const plan = { ...this.props.plan };

    const courses = plan.terms.byId[sourceTermId].courses;
    courses.splice(courses.indexOf(incomingCourse.id), 1);
    plan.courses.allIds.splice(plan.courses.allIds.indexOf(incomingCourse.id), 1);
    
    this.props.updatePlan(plan);
    this.setState({
      trashColour: "white"
    });
    
  }

  componentDidMount() {
    this.updateWarnings();
  }

  render() {
    return (
      <div id="planner-area-container">
        <this.renderTerms />

        <CourseListSideBar 
          isOpen={this.props.isCourseListOpen} 
          close={this.props.closeCourseList}
          onCourseDragStart={this.onCourseDragStart.bind(this)}
        />

        <WarningSnackbar
          showSnackbar={this.props.showSnackbar}
          closeSnackbar={this.props.closeSnackbar}
          warnings={this.props.warnings}
        />

        <div
          className="floating-icon"
          onDragEnter={this.onCourseDragEnterTrash}
          onDragLeave={this.onCourseDragLeaveTrash}
          onDragOver={this.onCourseDragOverTrash}
          onDrop={this.onCourseDropTrash}
        >
          <FontAwesomeIcon icon="trash" style={{ color: this.state.trashColour }}/>
        </div>

      </div>
    );
  }
}

PlannerArea.propTypes = {
  plan: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  setWarnings: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired,
  closeCourseList: PropTypes.func.isRequired,
  isCourseListOpen: PropTypes.bool.isRequired
};

export default PlannerArea;