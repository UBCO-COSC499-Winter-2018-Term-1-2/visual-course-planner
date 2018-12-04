import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginInterface from '../components/Login/LoginInterface';
import { library } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter } from 'react-router-dom';
import { faSignOutAlt, faHeart, faExclamationTriangle, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';

// Font Awesome Icon Imports
library.add(faSignOutAlt);
library.add(faHeart);
library.add(faExclamationTriangle);
library.add(faPlus);
library.add(faTimes);

class App extends Component {

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


  render() {

    return (
      <div>
        <BrowserRouter>
          <LoginInterface /> 
        </BrowserRouter>
        <ExtraStudentInfo></ExtraStudentInfo>
      </div>
        
      
    );
  }
}

export default App;