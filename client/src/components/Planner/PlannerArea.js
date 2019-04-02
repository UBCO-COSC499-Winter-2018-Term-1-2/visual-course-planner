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

  trashDragCounter = 0; // Needed for trash drag n drop

  getNextTerm(latestTerm, latestSession) {
    let nextTermNumber;
    let nextTermYear = latestSession.year;
    let nextTermSeason = "W";

    if (latestTerm.number === 1) {
      nextTermNumber = 2;
      nextTermSeason = latestSession.season;
    } else {
      if (latestSession.season == "W") {
        nextTermYear = parseInt(latestSession.year) + 1;
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

  addTermToPlan = async () => {
    console.log("Adding term to plan...");
    // set initial session to random one
    const plan = {...this.props.plan};
    let mostRecentSession = {};
    let mostRecentSessionId = {};
    let latestTerm = {};

    if (plan.sessions.allIds.length === 0) {
      mostRecentSession = await axios.get('/api/sessions/current');
      mostRecentSession = mostRecentSession.data;
      console.trace(mostRecentSession);
      plan.sessions.byId[mostRecentSession.id] = mostRecentSession;
      console.log('No sessions found adding current', mostRecentSession);
      plan.sessions.allIds.push(mostRecentSession.id);
      mostRecentSessionId = mostRecentSession.id;
    } else {
      mostRecentSessionId = plan.sessions.allIds[0];
      for (const sessionId in plan.sessions.byId) {
        const currentSession = plan.sessions.byId[sessionId];
        const currentSessionDate = currentSession.year + currentSession.season;
        const mostRecentSession = plan.sessions.byId[mostRecentSessionId];
        console.log(mostRecentSession);
        const mostRecentSessionDate = mostRecentSession.year + mostRecentSession.season;
        console.log(currentSessionDate, mostRecentSessionDate);
        if (currentSessionDate > mostRecentSessionDate) {
          console.log("Earlier");
          mostRecentSessionId = sessionId;
        }
      }
      mostRecentSession = plan.sessions.byId[mostRecentSessionId];
    }
    
    latestTerm = plan.terms.byId[plan.sessions.byId[mostRecentSessionId].terms[plan.sessions.byId[mostRecentSessionId].terms.length - 1]];
    let nextTermInfo = {};
    if (latestTerm) {
      nextTermInfo = this.getNextTerm(latestTerm, mostRecentSession);
    } else {
      nextTermInfo.coursesContained = [];
      nextTermInfo.year = mostRecentSession.year;
      nextTermInfo.season = mostRecentSession.season;
      nextTermInfo.number = 1;
    }
    console.log("Adding term: ", nextTermInfo);
    let latestSession;
    if (nextTermInfo.year !== mostRecentSession.year || nextTermInfo.season !== mostRecentSession.season) {
      const latestSessionRequest = await axios.get(`/api/sessions?year=${nextTermInfo.year}&season=${nextTermInfo.season}`);
      latestSession = latestSessionRequest.data;
      plan.sessions.byId[latestSession.id] = latestSession;
      console.log('need more session', latestSession);
      plan.sessions.allIds.push(latestSession.id);
    } else {
      latestSession = mostRecentSession;
      latestSession.id = mostRecentSessionId;
      console.log('same session', latestSession);
    }
    console.log({"executing next term request": {latestSession, nextTermInfo}});
    const nextTermRequest = await axios.get(`/api/terms?sessionId=${latestSession.id}&number=${nextTermInfo.number}`);
    const nextTerm = nextTermRequest.data;
    plan.sessions.byId[latestSession.id].terms.push(nextTerm.id);
    plan.terms.byId[nextTerm.id] = nextTerm;
    plan.terms.allIds.push(nextTerm.id);
    console.log(plan);
    this.props.updatePlan(plan);
    console.log("Added term to plan");

  }

  removeTermFromPlan = async (termId) => {
    const plan = { ...this.props.plan};
    console.log({plan});
    const termCourses = plan.terms.byId[termId].courses;
    const termSessionId = plan.terms.byId[termId].session;
    console.log({"removing ": {termId, termCourses, termSessionId}});

    // Remove courses
    plan.courses.allIds = plan.courses.allIds.filter(id => termCourses.indexOf(id) === -1);
    const newCoursesById = plan.courses.byId;
    for (let course in termCourses) {
      delete newCoursesById[course];
    }
    plan.courses.byId = newCoursesById;

    // Remove session
    const previousSession = { ...plan.sessions.byId[termSessionId]};

    if (previousSession.terms.length === 1) {
      delete plan.sessions.byId[termSessionId];
      plan.sessions.allIds = plan.sessions.allIds.filter(id => id !== termSessionId);
      
    } else {
      const newSessionTerms = [ ...previousSession.terms];
      
      newSessionTerms.splice(previousSession.terms.indexOf(termId), 1);
      previousSession.terms = newSessionTerms;
      plan.sessions.byId[termSessionId] = previousSession;
    }

    // Remove term
    delete plan.terms.byId[termId];
    plan.terms.allIds = plan.terms.allIds.filter(id => id !== termId);
    console.log("plan should not have " + termId, plan);

    this.props.updatePlan(plan);
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

  //rendering term components by mapping defaultTerms state variable
  renderTerms = () => {
    if (!Object.keys(this.props.plan).length) {
      return;
    }
    console.log(this.props.plan);
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
        removeTerm={this.removeTermFromPlan}
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
    e.dataTransfer.dropEffect = "move";
  }

  //drag start event handler for course component - passed in as prop via Term
  onCourseDragStart = (e, course, sourceTerm) => {
    console.log("Setting course for drag" + JSON.stringify(course));
    e.dataTransfer.setData("course", JSON.stringify(course));
    e.dataTransfer.effectAllowed = "move";
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

    if (plan.term.byId[targetTermId].courses.indexOf(incomingCourse.id) === -1) {
      if (!sourceTermId) {
        console.log("Adding course to plan", incomingCourse);
        plan.terms.byId[targetTermId].courses.push(incomingCourse.id.toString());
        plan.courses.allIds.push(incomingCourse.id.toString());
        plan.courses.byId[incomingCourse.id.toString()] = incomingCourse;
        delete incomingCourse.id;
      } else {
        console.log("Moving course already in plan", incomingCourse);
        const courses = plan.terms.byId[sourceTermId].courses;
        courses.splice(courses.indexOf(incomingCourse.id), 1);
        plan.terms.byId[targetTermId].courses.push(incomingCourse.id);
        console.log("Moved Course: " + JSON.stringify(incomingCourse));
      }
      this.props.updatePlan(plan);

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
    if (sourceTermId) {
      const plan = { ...this.props.plan };

      const courses = plan.terms.byId[sourceTermId].courses;
      courses.splice(courses.indexOf(incomingCourse.id), 1);
      delete plan.courses.byId[incomingCourse.id];
      plan.courses.allIds.splice(plan.courses.allIds.indexOf(incomingCourse.id), 1);
      
      this.props.updatePlan(plan);
    }
    
    this.setState({
      trashColour: "white"
    });
    
  }

  render() {
    return (
      <div id="planner-area-container">
        {this.renderTerms()}

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
          className="floating-icon remove-course"
          onDragEnter={this.onCourseDragEnterTrash}
          onDragLeave={this.onCourseDragLeaveTrash}
          onDragOver={this.onCourseDragOverTrash}
          onDrop={this.onCourseDropTrash}
        >
          <FontAwesomeIcon icon="trash" style={{ color: this.state.trashColour }}/>
        </div>

        <div className='floating-icon add-term' onClick={this.addTermToPlan}>
          <FontAwesomeIcon icon="plus-circle" />
          <p>Add term</p>
        </div>

      </div>
    );
  }
}

PlannerArea.propTypes = {
  plan: PropTypes.object,
  user: PropTypes.object.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  updatePlan: PropTypes.func.isRequired,
  warnings: PropTypes.array.isRequired,
  closeCourseList: PropTypes.func.isRequired,
  isCourseListOpen: PropTypes.bool.isRequired
};

export default PlannerArea;