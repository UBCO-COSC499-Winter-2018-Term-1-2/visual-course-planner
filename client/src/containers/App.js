import React, { Component } from 'react';
//import './App.css';
import '../components/Login/LoginInterface.css';
import LoginMenu from '../components/Login/LoginMenu';
import CreateAccountMenu from '../components/Signup/CreateAccountMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ExtraStudentInfo from '../components/Signup/ExtraStudentInfo';

// Font Awesome Icon Imports
library.add(faSignOutAlt);

class App extends Component {
  // constructor(){
  //   super();
  //   this.state = { showMenu: true};
  //   this.toggleMenu = this.toggleMenu.bind(this);
  // }

  // toggleMenu = () => {
  //   this.setState( {showMenu: !this.state.showMenu});
  // }

  render() {
    return (
      <div className="App">
        <LoginMenu  /> 
        {/* toggleMenu={this.toggleMenu} */}
        <CreateAccountMenu /> 
        {/* showMenu={this.state.showMenu} */}
        <ExtraStudentInfo></ExtraStudentInfo>
      </div>
    );
  }
}

export default App;

// ReactDOM.render(<App />, document.getElementById('root'))
