import React, { Component } from 'react';
import PlannerArea from '../components/Planner/PlannerArea';
import StudentInfo from '../components/StudentInfo/StudentInfo';
import PlanList from '../components/PlanList/PlanList';
import './Main.css';
import NoteArea from '../components/Notes/NoteArea';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar'
import Backdrop from '../components/Backdrop/Backdrop'

class Main extends Component {
  constructor(props){
    super(props);
  }

  state = {
    drawerOpen : false
  };

  drawerClickHandler = () => {
    const isOpen = this.state.drawerOpen;
    this.setState(
      {drawerOpen : !isOpen}
    );
  }

  closeCourseListSidebar = () => {
    this.setState({drawerOpen: false});
  };



  render() {
    let backdrop;

    if(this.state.drawerOpen){
      backdrop = <Backdrop click={this.closeCourseListSidebar}/>
    }

    return (
      <div id="main">
        <StudentInfo/>
        <PlanList/>
        <NoteArea/>
        <PlannerArea toggleSidebar={this.drawerClickHandler}/>
        <CourseListSideBar show={this.state.drawerOpen} close={this.closeCourseListSidebar} />
        {backdrop}
      </div>
    );
  }
}

export default Main;