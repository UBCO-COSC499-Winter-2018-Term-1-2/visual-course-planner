import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginInterface from '../components/Login/LoginInterface';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';


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