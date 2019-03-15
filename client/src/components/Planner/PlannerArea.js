import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlannerHeader from '../PlannerHeader/PlannerHeader';
import WarningSnackbar from '../WarningSnackbar/WarningSnackbar';
import Semester from '../Semester/Semester';
import './PlannerArea.css';
import Arrow from 'react-dom-arrow';
import ScrollButton from '../ScrollButton/ScrollButton';

class PlannerArea extends Component {

  state = {
    warnings: [],
    showSnackbar: false,
    defaultTerms: [
      {
        number: "1",
        coursesContained: ["COSC 111", "COSC 122"],
        targetCourse: ["COSC 121", "COSC 123"],
        year: "2018",
        session: "W"

      },
      {
        number: "2",
        coursesContained: ["COSC 121", "COSC 123"],
        targetCourse: ["COSC 222", "COSC 211"],
        year: "2019",
        session: "W"

      },
      {
        number: "3",
        coursesContained: ["COSC 222", "COSC 211"],
        targetCourse: ["COSC 221", "MATH 200"],
        year: "2019",
        session: "W"

      },
      {
        number: "4",
        coursesContained: ["COSC 221", "MATH 200"],
        targetCourse: ["COSC 304", "COSC 360"],
        year: "2020",
        session: "W"

      },
      {
        number: "5",
        coursesContained: ["COSC 304", "COSC 360"],
        targetCourse: ["COSC 320", "COSC 341"],
        year: "2018",
        session: "W"

      },
      {
        number: "6",
        coursesContained: ["COSC 320", "COSC 341"],
        targetCourse: ["COSC 445", "COSC 328"],
        year: "2018",
        session: "W"

      },
      {
        number: "7",
        coursesContained: ["COSC 445", "COSC 328"],
        targetCourse: ["COSC 421", "COSC 499"],
        year: "2018",
        session: "W"

      },
      {
        number: "8",
        coursesContained: ["COSC 421", "COSC 499"],
        targetCourse: ["COSC 445", "COSC 328"],
        year: "2018",
        session: "W"
      }
    ],
    courseArrows: []
  }
  courseRefs = new Map();
  scrollRef = React.createRef();

  generateCourseRefs = () => {
    this.state.defaultTerms.forEach((term) => {
      term.coursesContained.forEach((course) => {
        let courseRef = React.createRef();
        this.courseRefs.set(course, courseRef);
      });
    });
  }

  tempcourseArrows = [];

  generateCourseArrows = () => {
    this.state.defaultTerms.forEach((term) => {
      for (let i = 0; i < term.coursesContained.length; i++) {
        let courseIndex = 0;
        const sourceCourse = term.coursesContained[courseIndex];
        const targetCourse = term.targetCourse[courseIndex];

        this.tempcourseArrows.push(
          {
            fromSelector: '#' + sourceCourse.split(" ").join(""),
            fromSide: 'right',
            toSelector: '#' + targetCourse.split(" ").join(""),
            toSide: 'left',
            color: 'white',
            stroke: 2
          }
        );

        /*
        this.state.courseArrows.push( 
          <SteppedLineTo from="" to="" 
            fromAnchor = {sourceXY.toString()} 
            toAnchor = {targetXY.toString()} />);
            */

        courseIndex++;
        
      }
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
          stroke={arrow.stroke}  />);
    }));
  }

  //rendering semester components by mapping defaulTerms state variable
  renderSemesters = () => {
    this.generateCourseRefs();
    return (this.state.defaultTerms.map((term) =>
      <Semester
        key={term.number}
        term={term.number}
        coursesContained={term.coursesContained}
        onCourseDragOver={this.onCourseDragOver}
        onCourseDragStart={this.onCourseDragStart.bind(this)}
        onCourseDrop={this.onCourseDrop}
        courseRefMap={this.courseRefs}
        showXY={this.showElementCoordinates.bind(this)} />
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

    this.generateCourseArrows();
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

  showElementCoordinates = (e, courseRef) => {
    let element = courseRef.current.getBoundingClientRect().left;
    alert(element);
  }

  // create scroll button onclick handler
  scrollButtonClickHandler = (e, scrollRef, direction) => {
    let scrollItem = scrollRef.current;
    let scrollDirection = direction;

    scrollDirection == "left" ? (scrollItem.scrollLeft -= 250) : (scrollItem.scrollLeft += 250); 
  }

  componentDidMount(){
    this.generateCourseArrows();
    //console.log(this.state.courseArrows);
    //this.renderCourseArrows();
    this.setState({courseArrows: this.tempcourseArrows});
    console.log(this.state.courseArrows);
    console.log(this.scrollRef);
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

        <div id="semester-view" ref={this.scrollRef}>
          <this.renderSemesters />
        </div>

        <div id="scroll-button-container">
          <ScrollButton 
            direction="left" 
            scrollItem={this.scrollRef} 
            onClick={this.scrollButtonClickHandler.bind(this)} />
          
          <ScrollButton 
            direction="right" 
            scrollItem={this.scrollRef} 
            onClick={this.scrollButtonClickHandler.bind(this)}/>
        </div>

        <WarningSnackbar
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
        />
        <div id="session-container"></div>
        
        <this.renderCourseArrows /> 
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