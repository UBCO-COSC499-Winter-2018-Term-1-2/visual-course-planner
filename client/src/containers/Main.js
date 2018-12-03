import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar';
import Backdrop from '../components/Backdrop/Backdrop';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      drawerOpen : false,
      showSnackbar : false,
      planName: "BA Major Computer Science"
    };
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

  warningSystemHandler = () => {
    this.setState({ showSnackbar: true });
    //setTimeout(() => { this.setState({ showSnackbar: false });}, 3000); 
  }

  closeWarningSnackbarHandler = () => {
    this.setState({ showSnackbar: false });
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
          planName={this.state.planName}
          toggleSidebar={this.toggleCourseListSidebarHandler}
          optimize={this.optimizeHandler}
          numberOfWarnings={5}
          showWarning={this.warningSystemHandler}
          showSnackbar={this.state.showSnackbar}
          closeSnackbar={this.closeWarningSnackbarHandler}
          warningMessage="Pre-reqs missing for COSC 304"/>
       
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