import React, { Component } from 'react';
import './LoginInterface.css';
// import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class LoginInterface extends Component {
  render(){

    return(
    
      <div className="Menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        <form>
          <input className="login-input" type="text" name="email" placeholder="Email"/>
          <input className="login-input" type="text" name="pass" placeholder="Password"/>   
          <button className="loginbtn">Login</button> 
          {/* <section className = "CreateAccountMenu"> */}
          <button className="openDiffMenubtn" ><Link to = "/create-account">Create Account</Link></button> 
          {/* </section> */}
        </form>        
      </div> 

    );
  }
}

LoginInterface.propTypes = {
  toggleMenu: PropTypes.func
};

export default LoginInterface;
