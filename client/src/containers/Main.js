import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar';
import Backdrop from '../components/Backdrop/Backdrop';

class Main extends Component {
  state = {
    drawerOpen : false,
    showSnackbar : false,
    currentPlan: {
      id: 0,
      name: "BA Major Computer Science"
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

  render() {
    let backdrop;

    if(this.state.drawerOpen){
      backdrop = <Backdrop click={this.closeCourseListSidebar}/>;
    }

    return (
      <div id="main">
        <StudentInfo/>
        <PlanList/>
        <NoteArea/>
        <PlannerArea 
          planId={this.state.currentPlan.planId}
          planName={this.state.currentPlan.name}
          toggleSidebar={this.toggleCourseListSidebarHandler}
          optimize={this.optimizeHandler}
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