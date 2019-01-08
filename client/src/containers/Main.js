import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar';
import { library } from '@fortawesome/fontawesome-svg-core';
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
          year: "2018",
          term: "1"
        },
        {
          code: "COSC 121",
          standingRequirement: 0,
          coRequisites: [],
          preRequisites: [ { code: "COSC 111" } ],
          year: "2018",
          term: "2"
        }],
      id: 0,
      name: "BA Major Computer Science",
      specialization: {
        id: 1,
        name: "Major in Computer Science"
      }
    },
    user: {
      name: "Leonardo"
    }

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
        <PlannerArea 
          plan={this.state.currentPlan}
          toggleSidebar={this.toggleCourseListSidebarHandler}
          optimize={this.optimizeHandler}
          user={this.state.user}
          updatePlanCourses={this.updatePlanCourses}
        />
       
        {/*'courseTitle','courseInfo' should come from the database */}
        <CourseListSideBar 
          show={this.state.drawerOpen} 
          close={this.closeCourseListSidebar}
          courseTitle="COSC 111"
          courseInfo="This Course is the best course with the best prof Dr.Abdallah." />
        {backdrop}
      </div>
    );
  }
}

export default Main;