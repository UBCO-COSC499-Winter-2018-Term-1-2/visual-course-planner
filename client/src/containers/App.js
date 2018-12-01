import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginInterface from '../components/Login/LoginInterface';
import CreateAccountMenu from '../components/Signup/CreateAccountMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, prefix } from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';

import SideBarToggleButton from '../components/SideBarToggleButton/SideBarToggleButton';
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar';
import Backdrop from '../components/Backdrop/Backdrop';

// Font Awesome Icon Imports
library.add(faSignOutAlt);



class App extends Component {


  state = {
    drawerOpen : false
  };

  constructor(){
    super();
    this.state = {
      drawerOpen: false
    };
  }


  openCourseListSidebar = () => {
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
  <div>
        <LoginInterface /> 
        <ExtraStudentInfo></ExtraStudentInfo>
      </div>
    );
  }
}

export default App;