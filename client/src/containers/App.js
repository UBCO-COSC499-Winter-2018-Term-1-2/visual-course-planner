import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginMenu from '../components/Login/LoginMenu';
import CreateAccountMenu from '../components/Signup/CreateAccountMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, prefix } from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';

import SideBarToggleButton from '../components/SideBarToggleButton/SideBarToggleButton'
import CourseListSideBar from '../components/CourseListSideBar/CourseListSideBar'
import Backdrop from '../components/Backdrop/Backdrop'

// Font Awesome Icon Imports
library.add(faSignOutAlt);



class App extends Component {


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
        <div className="App">
          <SideBarToggleButton click={this.drawerClickHandler}/>
          <CourseListSideBar show={this.state.drawerOpen} close={this.closeCourseListSidebar} />
          {backdrop}

          <LoginMenu  /> 
          <ExtraStudentInfo></ExtraStudentInfo>
        </div>
       
          
        
       
        
      
    );
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('root'))
