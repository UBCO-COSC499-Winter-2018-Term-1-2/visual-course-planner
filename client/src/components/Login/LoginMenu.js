import React, { Component } from 'react';
// import React from 'react';
import './LoginInterface.css';
import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class LoginMenu extends Component {

  render(){

    return(
    
      <div className="Menu">
        <h1>Visual Course Planner</h1>
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

LoginMenu.propTypes = {
  toggleMenu: PropTypes.func
};

export default LoginMenu;
