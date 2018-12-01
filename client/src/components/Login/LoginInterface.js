import React, { Component } from 'react';
import './LoginInterface.css';
import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


<<<<<<< HEAD:client/src/components/Login/LoginMenu.js
class LoginMenu extends Component {

=======
class LoginInterface extends Component {
>>>>>>> dev:client/src/components/Login/LoginInterface.js
  render(){

    return(
    
      <div className="Menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        <form>
          <input type="text" name="email" placeholder="Email"/>
          <input type="text" name="pass" placeholder="Password"/>   
          <button className="loginbtn">Login</button> 
          <section className = "CreateAccountMenu">
            <button className="openDiffMenubtn" ><Link to = "/create-account">Create Account</Link></button> 
          </section>
        </form>        
    </div> 

    );
    }
 
  }
<<<<<<< HEAD:client/src/components/Login/LoginMenu.js

LoginMenu.propTypes = {
  toggleMenu: PropTypes.func
};

export default LoginMenu;
=======
}
LoginInterface.propTypes = {
  toggleMenu: PropTypes.func
};

export default LoginInterface;
>>>>>>> dev:client/src/components/Login/LoginInterface.js
