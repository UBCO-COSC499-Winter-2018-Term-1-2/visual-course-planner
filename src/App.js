import React, { Component } from 'react';
//import './App.css';
import './LoginInterface.css';
import LoginMenu from './LoginProperties/LoginMenu'
import CreateAccountMenu from './LoginProperties/CreateAccountMenu'

class App extends Component {
  constructor(props){
    super(props);
    this.state = { showMenu: true};
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu = () => {
    this.setState( {showMenu: !this.state.showMenu});
  }

  render() {
    return (
        <div className="MenuBox">
          <LoginMenu />
          <CreateAccountMenu /> 
          {/* showMenu={this.state.showMenu} */}
        </div>
        
      
    );
  }
}

export default App;
