import React, { Component } from 'react';
//import './App.css';
import ReactDOM from 'react-dom';
import './LoginInterface.css';
import LoginMenu from './LoginProperties/LoginMenu'
import CreateAccountMenu from './LoginProperties/CreateAccountMenu'
import ExtraStudentInfo from './ExtraStudentInfo'


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
