import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CourseListSideBar from '../CourseListSideBar/CourseListSideBar';
import Session from '../Session/Session';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import './PlannerArea.css';
import Arrow from 'react-dom-arrow';
import ScrollButton from '../ScrollButton/ScrollButton';

class PlannerArea extends Component {

  state = {
    trashColour: "white",
    courseArrows: [],
    isHoveringTerms: false
  }

  trashDragCounter = 0; // Needed for trash drag n drop


  scrollRef = React.createRef();

  tempcourseArrows = [];

  generateCourseArrows = (plan) => {
    this.tempcourseArrows.length = 0;
    plan.terms.allIds.map(termId => plan.terms.byId[termId]).forEach((term) => {
      term.courses.forEach(courseId => {
        const course = plan.courses.byId[courseId];
        console.log("Generating arrows for " + courseId);
        course.preRequisites.forEach(preReqId => {
          const preReqsIds = plan.courses.allIds.map(id => plan.courses.byId[id]).filter(course => course.code === preReqId);

          console.log("generating arrow for " + preReqId);
          preReqsIds.forEach(preReqId => {
            this.tempcourseArrows.push({
              fromSelector: '#course' + preReqId.id,
              fromSide: 'right',
              toSelector: '#course' + courseId,
              toSide: 'left',
              color: 'white',
              stroke: 2
            });
          });
        });      
      });
    });
  }	  


  //render arrows
  renderCourseArrows = () => {
    return(this.state.courseArrows.map((arrow) => {
      console.log("gui");
      return(
        <Arrow
          key={arrow.fromSelector + 'to' + arrow.toSelector}
          fromSelector={arrow.fromSelector}
          fromSide={arrow.fromSide}
          toSelector={arrow.toSelector}
          toSide={arrow.toSide}
          color={arrow.color}
          stroke={arrow.stroke}
          className="arrow"  />);
    }));
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
    axios.delete(`/api/plans/${plan.id}/term/${termId}`);
    delete plan.terms.byId[termId];
    plan.terms.allIds = plan.terms.allIds.filter(id => id !== termId);

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
        onMouseOver={this.showScrollButtons}
        onMouseLeave={this.hideScrollButtons}
      />;
    });
    return (
      <div className="session-container" ref={this.scrollRef}>
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
    this.generateCourseArrows(this.props.plan);
    this.setState({courseArrows: this.tempcourseArrows}, () => {
      var el = document.querySelector(".session-container");
      el.dispatchEvent(new Event('scroll'));
    });
  }

  //on drop event handler for term component
  //need to implement rejection of duplicate courses in a term
  onCourseDrop = (e, targetTermId) => {
    let incomingCourse = JSON.parse(e.dataTransfer.getData("course"));
    let sourceTermId = e.dataTransfer.getData("sourceTermId");
    const plan = { ...this.props.plan };

    if (plan.terms.byId[targetTermId].courses.indexOf(incomingCourse.id) === -1) {
      if (!sourceTermId) {
        console.log("Adding course to plan", incomingCourse);
        plan.terms.byId[targetTermId].courses.push(incomingCourse.id.toString());
        plan.courses.allIds.push(incomingCourse.id.toString());
        plan.courses.byId[incomingCourse.id.toString()] = incomingCourse;
        // Send course to database
        axios.post(`/api/plans/${plan.id}/course/${incomingCourse.id}`);
        delete incomingCourse.id;
      } else {
        // TODO: Moving course in plan, what does this do to the database? should be change the course id to the one thats offered in that term
        console.log("Moving course already in plan", incomingCourse);
        const courses = plan.terms.byId[sourceTermId].courses;
        courses.splice(courses.indexOf(incomingCourse.id), 1);
        plan.terms.byId[targetTermId].courses.push(incomingCourse.id);
        console.log("Moved Course: " + JSON.stringify(incomingCourse));
      }
      this.props.updatePlan(plan);

    }

    this.props.updatePlan(plan);
    this.generateCourseArrows(this.props.plan);
    this.setState({courseArrows: this.tempcourseArrows}, () => {
      var el = document.querySelector(".session-container");
      el.dispatchEvent(new Event('scroll'));
    });


  }

  onCourseDragEnterTrash = (e) => {
    e.preventDefault();
    this.trashDragCounter++;
    console.log("Enter trash");
    this.setState({
      trashColour: "#c5980f"
    });
    this.setState({courseArrows: this.tempcourseArrows}, () => {
      var el = document.querySelector(".session-container");
      el.dispatchEvent(new Event('scroll'));
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
      axios.delete(`/api/plans/${plan.id}/course/${incomingCourse.id}`);
      this.props.updatePlan(plan);
    }
    
    this.setState({
      trashColour: "white"
    });
    
  }

  hideScrollButtons = () => {
    this.setState({isHoveringTerms: false});
  }

  showScrollButtons = () => {
    this.setState({isHoveringTerms: true});
  }

  hideScrollButtons = () => {
    this.setState({isHoveringTerms: false});
  }

  // create scroll button onclick handler
  scrollButtonClickHandler = (direction) => {
    let scrollItem = this.scrollRef.current;
    let scrollDirection = direction;

    scrollDirection == "left" ? (scrollItem.scrollLeft -= 250) : (scrollItem.scrollLeft += 250); 
    console.log("scrolling:" + scrollDirection);
  }

  scrollToRight = () => {
    this.scrollRef.current.scrollLeft += 1000;
  }

  componentDidMount(){
    this.generateCourseArrows(this.props.plan);
    this.setState({courseArrows: this.tempcourseArrows}, () => {
      var el = document.querySelector(".session-container");
      el.dispatchEvent(new Event('scroll'));
    });
    console.log(this.scrollRef);
  }

  render() {
    return (
      <div id="planner-area-container" onMouseOver={this.showScrollButtons} onMouseLeave={this.hideScrollButtons}>
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
        {this.renderCourseArrows()}


        <div
          className="floating-icon remove-course"
          onDragEnter={this.onCourseDragEnterTrash}
          onDragLeave={this.onCourseDragLeaveTrash}
          onDragOver={this.onCourseDragOverTrash}
          onDrop={this.onCourseDropTrash}
        >
          <FontAwesomeIcon icon="trash" style={{ color: this.state.trashColour }}/>
        </div>

        <div className={this.state.isHoveringTerms ? "scroll-btn left" : "scroll-btn hide"}>
          <ScrollButton 
            direction="left" 
            scrollItem={this.scrollRef}  
            scrollClick={this.scrollButtonClickHandler} /> 
        </div>

        <div className={this.state.isHoveringTerms ? "scroll-btn right" : "scroll-btn hide"}>
          <ScrollButton 
            direction="right" 
            scrollItem={this.scrollRef}  
            scrollClick={this.scrollButtonClickHandler} />
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