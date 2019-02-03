import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import { library } from '@fortawesome/fontawesome-svg-core';
import PlannerHeader from '../components/PlannerHeader/PlannerHeader';
import { faSignOutAlt, faHeart, faExclamationTriangle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// Font Awesome Icon Imports
library.add(faSignOutAlt);
library.add(faHeart);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faTimes);
class Main extends Component {
  state = {
    isCourseListOpen: false,
    showSnackbar : false,
    currentPlan: {
      courses: [
        {
          id: 100,
          code: "COSC 111",
          standingRequirement: 0,
          coRequisites: [],
          preRequisites: [],
          year: 2018,
          session: "W",
          term: 1
        },
        {
          id: 101,
          code: "COSC 121",
          standingRequirement: 0,
          coRequisites: [],
          preRequisites: [ { code: "COSC 111" } ],
          year: 2018,
          session: "W",
          term: 2
        },
        {
          id: 102,
          code: "COSC 341",
          standingRequirement: 3,
          coRequisites: [],
          preRequisites: [],
          year: 2019,
          session: "W",
          term: 2
        }
      ],
      id: 0,
      name: "My Plan",
      specialization: {
        id: 1,
        name: "Major in Computer Science"
      }
    },
    user: {
      name: "Leonardo",
      yearStanding: 1
    },
    warnings: []
  }

  openCourseListSidebar = () => {
    this.setState({ isCourseListOpen : true });
  }

  closeCourseListSidebar = () => {
    this.setState({ isCourseListOpen: false });
  };

  optimizeHandler = () => {
    console.log("Optimize button clicked");
    //optimize button logic goes here
  }

  setNumberOfWarnings = (number) => {
    this.setState({numberOfWarnings: number});
  }

  setWarnings = (warnings) => {
    this.setState({
      warnings: warnings
    });
  }

  updatePlanCourses = (courses) => {
    this.setState(prevState => {
      return {
        currentPlan: {
          ...prevState.currentPlan,
          courses: courses
        }
      };
    });
  }

  showSnackbar = () => {
    this.setState({ showSnackbar: true });
  }

  closeSnackbar = () => {
    this.setState({ showSnackbar: false });
  }

  render() {
    return (
      <div id="main">
        <StudentInfo user={this.state.user}/>
        <PlanList/>
        <NoteArea/>
        <PlannerHeader
          planName={this.state.currentPlan.name}
          openCourseList={this.openCourseListSidebar}
          closeCourseList={this.closeCourseListSidebar}
          isCourseListOpen={this.state.isCourseListOpen}
          optimize={this.optimizeHandler}
          showWarning={this.showSnackbar}
          numberOfWarnings={this.state.warnings.length}
          user={this.state.user}
        />
        <PlannerArea
          isCourseListOpen={this.state.isCourseListOpen}
          closeCourseList={this.closeCourseListSidebar}
          plan={this.state.currentPlan}
          user={this.state.user}
          updatePlanCourses={this.updatePlanCourses}
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
          setWarnings={this.setWarnings}
        />    
      </div>
    );
  }
}

export default Main;