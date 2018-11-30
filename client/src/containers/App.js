import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginInterface from '../components/Login/LoginInterface';
import CreateAccountMenu from '../components/Signup/CreateAccountMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';

import SideBarToggleButton from '../components/SideBarToggleButton/SideBarToggleButton'
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar'
import Backdrop from '../components/Backdrop/Backdrop'

// Font Awesome Icon Imports
library.add(faSignOutAlt);

class App extends Component {
  constructor(){
    super();
    this.state = {
      drawerOpen: false
    };
  }

  openCourseListSidebar = () => {
    console.log("clickeed");
    const isOpen = this.state.drawerOpen;
    this.setState({
        drawerOpen : !isOpen
    });
  }

  closeCourseListSidebar = () => {
    this.setState({
      drawerOpen: false
    });
  };



  render() {

    return (
        <div className="App">
          <SideBarToggleButton click={this.openCourseListSidebar}/>
          <CourseListSideBar show={this.state.drawerOpen} close={this.closeCourseListSidebar} />
           {this.state.drawerOpen ? <Backdrop click={this.closeCourseListSidebar} /> : null }

          <LoginInterface /> 
          {/* toggleMenu={this.toggleMenu} */}
          <CreateAccountMenu /> 
          {/* showMenu={this.state.showMenu} */}
          <ExtraStudentInfo></ExtraStudentInfo>
        </div>
    );
  }
}

export default App;