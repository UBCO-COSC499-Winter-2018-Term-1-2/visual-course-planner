import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar';
import { library } from '@fortawesome/fontawesome-svg-core';
import PlannerHeader from '../components/PlannerHeader/PlannerHeader';
import Backdrop from '../components/Backdrop/Backdrop';
import { faSignOutAlt, faHeart, faExclamationTriangle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

// Font Awesome Icon Imports
library.add(faSignOutAlt);
library.add(faHeart);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faTimes);
class Main extends Component {
  state = {
    drawerOpen : false,
    showSnackbar : false,
    currentPlan: {
      courses: [
        {
          code: "COSC 111",
          standingRequirement: 0,
          coRequisites: [],
          preRequisites: [],
          year: 2018,
          session: "W",
          term: 1
        },
        {
          code: "COSC 121",
          standingRequirement: 0,
          coRequisites: [],
          preRequisites: [ { code: "COSC 111" } ],
          year: 2018,
          session: "W",
          term: 2
        },
        {
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
      standing: 1
    },
    warnings: []
  }

  toggleCourseListSidebarHandler = () => {
    const isOpen = this.state.drawerOpen;
    this.setState(
      {drawerOpen : !isOpen}
    );
  }

  closeCourseListSidebar = () => {
    this.setState({drawerOpen: false});
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
    let backdrop;

    if(this.state.drawerOpen){
      backdrop = <Backdrop click={this.closeCourseListSidebar}/>;
    }

    return (
      <div id="main">
        <StudentInfo user={this.state.user}/>
        <PlanList/>
        <NoteArea/>
        <PlannerHeader
          planName={this.state.currentPlan.name}
          toggleSidebar={this.toggleCourseListSidebarHandler}
          optimize={this.optimizeHandler}
          showWarning={this.showSnackbar}
          numberOfWarnings={this.state.warnings.length}
          user={this.state.user}
        />
        <PlannerArea 
          plan={this.state.currentPlan}
          user={this.state.user}
          updatePlanCourses={this.updatePlanCourses}
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeSnackbar}
          warnings={this.state.warnings}
          setWarnings={this.setWarnings}
        />
       
        {/*'courseTitle','courseInfo' should come from the database */}
        <CourseListSideBar 
          show={this.state.drawerOpen} 
          close={this.closeCourseListSidebar}
        />
        {backdrop}
      </div>
    );
  }
}

export default Main;